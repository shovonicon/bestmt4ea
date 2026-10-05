import reviewData from '../data/reviews.json';
import { reviewMatchesProduct } from './review-match';

/** The shape the product layouts render and the schema describes. */
export interface ProductReview {
  rating: number;
  title?: string;
  body: string;
  name: string;
  createdAt: number;
}

interface StoredReview {
  status: string;
  provenance?: string;
  rating: number;
  title?: string;
  body: string;
  reviewer: string;
  location: string | null;
  month: string | null;
  product: string | null;
}

/** Same bar the homepage and /customer-feedback/ apply, so every page counts alike. */
const CONFIRMED = new Set(['customer-confirmed', 'customer-provided', 'customer-order']);

const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

/** "July 2026" -> the first of that month, UTC. Unreadable -> 0 (shown without a date). */
function monthToTime(label: string | null): number {
  const match = /^([A-Za-z]+)\s+(\d{4})$/.exec(String(label ?? '').trim());
  const month = match ? MONTHS.indexOf(match[1].toLowerCase()) : -1;
  return match && month >= 0 ? Date.UTC(Number(match[2]), month, 1) : 0;
}

const approved = ((reviewData as unknown as { reviews: StoredReview[] }).reviews ?? []).filter(
  (review) => review.status === 'approved' && CONFIRMED.has(review.provenance ?? '') && review.rating >= 1 && review.rating <= 5,
);

/** The approved customer reviews written for one catalogue product, newest first. */
export function reviewsForProduct(product: { slug: string; title: string }): ProductReview[] {
  return approved
    .filter((review) => reviewMatchesProduct(review.product, product))
    .map((review) => ({
      rating: review.rating,
      title: review.title,
      body: review.body,
      name: [review.reviewer, review.location].filter(Boolean).join(' · '),
      createdAt: monthToTime(review.month),
    }))
    .sort((a, b) => b.createdAt - a.createdAt);
}

/** Count and mean for a set of reviews, or null when there is nothing to rate. */
export function summariseReviews(reviews: Array<{ rating: number }>): { count: number; average: number } | null {
  if (!reviews.length) return null;
  return { count: reviews.length, average: reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length };
}
