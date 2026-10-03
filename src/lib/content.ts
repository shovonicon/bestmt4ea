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
  'free-download-forex-ea-indicator',
  'licences',
  'login',
  'logout',
  'dashboard',
  'auth',
  'checkout',
  'api',
]);

/**
 * WordPress pages deliberately superseded by a dedicated route: the old blog
 * archive page and the thin free-download listing, both replaced by real hubs.
 * Naming them here keeps the shadowing explicit — anything else that collides
 * with a reserved route fails the build instead of quietly disappearing.
 */
export const SUPERSEDED_SLUGS = new Set(['blog', 'free-download-forex-ea-indicator']);

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
  return (await getCollection('products')).filter(isPublic).sort(byTitle);
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
