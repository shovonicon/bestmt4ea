/**
 * Public collection helpers.
 *
 * One place decides what is publicly listed, so every index, archive, hub and
 * the sitemap agree: drafts and future-dated entries are not public, legal and
 * system pages are not indexable content, and every listing sorts the same way.
 *
 * It also fails the build on slug problems instead of dropping content for
 * them. `[slug].astro` used to `continue` past a duplicate or a slug that a
 * dedicated route already owns, which silently loses a page; here that throws.
 */

import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import unpublishedData from '../data/unpublished.json';

/**
 * Products withdrawn from sale (`src/data/unpublished.json`). They leave every
 * listing and the sitemap, their route 404s, and the Worker redirects the old
 * URL. `scripts/routes.mjs` and `astro.config.mjs` read the same file so the
 * live-route set and the sitemap agree with this one.
 */
export const UNPUBLISHED_PRODUCT_SLUGS = new Set(
  (unpublishedData.products ?? []).map((entry: { slug: string }) => entry.slug),
);

/** True when a product URL must not be served or listed. */
export function isUnpublishedProduct(slug: string): boolean {
  return UNPUBLISHED_PRODUCT_SLUGS.has(slug);
}

/**
 * Slugs served by a dedicated `src/pages/` route. `[slug].astro` must not emit
 * these or it shadows the real listing; a content file using one is a mistake.
 */
export const RESERVED_SLUGS = new Set([
  'blog',
  'shop',
  'top-ranking',
  'product',
  'brand',
  'product-category',
  'category',
  'login',
  'logout',
  'dashboard',
  'auth',
  'checkout',
  'api',
  'admin',
]);

/**
 * A WordPress page deliberately superseded by a dedicated route: the old blog
 * archive. Naming it here keeps the shadowing explicit — anything else that
 * collides with a reserved route fails the build instead of quietly
 * disappearing.
 */
export const SUPERSEDED_SLUGS = new Set(['blog']);

/** A date in the future means the entry is not published yet. */
export const isFutureDated = (date?: Date): boolean => Boolean(date && date.getTime() > Date.now());

/** Not a draft, and not scheduled ahead of the build. */
export function isPublic(entry: { data: { draft?: boolean; publishedAt?: Date } }): boolean {
  return !entry.data.draft && !isFutureDated(entry.data.publishedAt);
}

const recency = (entry: CollectionEntry<'posts'> | CollectionEntry<'products'> | CollectionEntry<'pages'>) =>
  (entry.data.updatedAt ?? entry.data.publishedAt).valueOf();

/** Newest first — the order every listing and the sitemap use. */
export const byRecencyDesc = (a: any, b: any) => recency(b) - recency(a);

/** Stable alphabetical order for pages and products. */
export const byTitle = (a: any, b: any) => String(a.data.title).localeCompare(String(b.data.title));

export async function getPublicPosts(): Promise<CollectionEntry<'posts'>[]> {
  return (await getCollection('posts')).filter(isPublic).sort(byRecencyDesc);
}

export async function getPublicProducts(): Promise<CollectionEntry<'products'>[]> {
  return (await getCollection('products'))
    .filter((entry) => isPublic(entry) && !isUnpublishedProduct(entry.data.slug))
    .sort(byTitle);
}

/** Pages that are indexable content — legal/system pages are excluded. */
export async function getPublicPages(): Promise<CollectionEntry<'pages'>[]> {
  return (await getCollection('pages')).filter((page) => isPublic(page) && !page.data.systemPage).sort(byTitle);
}

/** The free-download library: public posts carrying a `download:` block. */
export async function getDownloadPosts(): Promise<CollectionEntry<'posts'>[]> {
  return (await getPublicPosts()).filter((post) => Boolean(post.data.download));
}

/**
 * A product is free only when every price signal is zero. A variable product
 * keeps a non-zero `priceMax` even though its `price` reads "0", so a paid tier
 * is never mistaken for a giveaway. This is the same rule `scripts/seed-catalog.mjs`
 * writes to `products.is_free`.
 */
export function isFreeProduct(entry: {
  data: { price?: string; priceMin?: number; priceMax?: number };
}): boolean {
  const num = (value: unknown) => {
    const n = Number(value ?? 0);
    return Number.isFinite(n) ? n : 0;
  };
  return num(entry.data.price) === 0 && num(entry.data.priceMin) === 0 && num(entry.data.priceMax) === 0;
}

/**
 * Fail loudly on a slug that cannot be served.
 *
 * Duplicate root slugs, or a root slug a dedicated route already owns, mean a
 * page would vanish; the build must stop rather than drop it.
 */
export function assertRootSlugIntegrity(
  posts: CollectionEntry<'posts'>[],
  pages: CollectionEntry<'pages'>[],
): void {
  const owners = new Map<string, string[]>();

  for (const [collection, entries] of [
    ['post', posts],
    ['page', pages],
  ] as const) {
    for (const entry of entries) {
      const slug = String((entry.data as { slug: string }).slug);
      const key = slug.toLowerCase();
      if (!owners.has(key)) owners.set(key, []);
      owners.get(key)!.push(`${collection}:${(entry as any).id ?? slug}`);
    }
  }

  const problems: string[] = [];
  for (const [slug, sources] of owners) {
    if (RESERVED_SLUGS.has(slug) && !SUPERSEDED_SLUGS.has(slug)) {
      problems.push(`slug "${slug}" is reserved by a dedicated route (${sources.join(', ')})`);
    }
    if (sources.length > 1) {
      problems.push(`duplicate slug "${slug}" claimed by ${sources.join(' and ')}`);
    }
  }

  if (problems.length) {
    throw new Error(`Slug integrity failed:\n  - ${problems.join('\n  - ')}`);
  }
}

/** Products live under `/product/<slug>/`; only duplicates are a problem. */
export function assertUniqueProductSlugs(products: CollectionEntry<'products'>[]): void {
  const seen = new Map<string, string>();
  const problems: string[] = [];
  for (const product of products) {
    const slug = String(product.data.slug).toLowerCase();
    if (seen.has(slug)) problems.push(`duplicate product slug "${slug}" (${seen.get(slug)}, ${product.id})`);
    else seen.set(slug, product.id);
  }
  if (problems.length) {
    throw new Error(`Product slug integrity failed:\n  - ${problems.join('\n  - ')}`);
  }
}
