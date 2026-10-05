/**
 * Product pricing, read from the store's own tier data.
 *
 * `src/data/product-plans.json` holds the real licence tiers per product slug,
 * taken from each product's page. A product with no entry returns null, so a
 * caller renders "—" rather than inventing a price.
 */

import planData from '../data/product-plans.json';

export interface Plan {
  code: string;
  name: string;
  term?: string;
  months?: number;
  note?: string;
  badge?: string;
  cta?: string;
  price: number;
  compareAt?: number;
  features?: string[];
}

const planIndex = planData as unknown as Record<string, Plan[] | unknown>;

/** Every published tier for a product, or an empty list. */
export function getPlans(slug: string): Plan[] {
  const entry = planIndex[slug];
  return Array.isArray(entry) ? (entry as Plan[]) : [];
}

/** The cheapest paid tier — the "from" price. Null when there is no paid tier. */
export function priceFrom(slug: string): number | null {
  const paid = getPlans(slug).filter((plan) => plan.price > 0);
  if (paid.length === 0) return null;
  return Math.min(...paid.map((plan) => plan.price));
}

/** The store's list price for that tier, when the store itself shows a discount. */
export function compareAtFrom(slug: string): number | null {
  const from = priceFrom(slug);
  if (from == null) return null;
  const match = getPlans(slug).find(
    (plan) => plan.price === from && plan.compareAt != null && plan.compareAt > plan.price,
  );
  return match?.compareAt ?? null;
}
