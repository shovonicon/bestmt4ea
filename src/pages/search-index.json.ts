import { getPublicPosts, getPublicProducts } from '../lib/content';

export const prerender = true;

/**
 * Title-only index for the header search. Titles and URLs are already public, so
 * this adds no new data; it is fetched on first focus of the search box only.
 * Kinds: p = product, a = article.
 */
export async function GET() {
  const [products, posts] = await Promise.all([getPublicProducts(), getPublicPosts()]);
  const items = [
    ...products.map((p) => ({ t: p.data.title, u: `/product/${p.data.slug}/`, k: 'p' })),
    ...posts.map((p) => ({ t: p.data.title, u: `/${p.data.slug}/`, k: 'a' })),
  ];
  return new Response(JSON.stringify(items), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
