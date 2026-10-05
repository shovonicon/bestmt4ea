/**
 * Shared live-route derivation for redirect tooling.
 *
 * `getLiveRoutes()` mirrors the Astro routing (`src/pages/**` +
 * `src/content.config.ts`) so `build-redirects.mjs` and `check-routes.mjs`
 * agree on which URLs serve real content:
 *
 *   - `/` (homepage)
 *   - posts + pages at `/<slug>/` (first wins; RESERVED slugs are served by
 *     their dedicated static route, mirroring `[slug].astro`)
 *   - products at `/product/<slug>/`
 *   - used blog categories at `/category/<path>/` (mirrors `[...path].astro`)
 *   - product categories at `/product-category/<slug>/`
 *   - platform hubs `/brand/mt4/` + `/brand/mt5/`
 *   - static hubs `/blog/`, `/shop/`, `/top-ranking/`
 *
 * Comparison helpers normalise percent-encoding once (`canon`) and ignore a
 * trailing slash (`key`), so an emoji target written as `%F0%9F%9A%80-...`
 * matches the decoded-emoji route Astro serves.
 */

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';

const ROOT = process.cwd();

/** Slugs served by a dedicated route — mirrors `[slug].astro` RESERVED. */
export const RESERVED_SLUGS = new Set([
  'blog',
  'shop',
  'top-ranking',
  'product',
  'brand',
  'product-category',
  'category',
]);

/** Static hub routes served by dedicated `src/pages/**` files. */
const STATIC_ROUTES = [
  '/blog/',
  '/shop/',
  '/top-ranking/',
  '/brand/mt4/',
  '/brand/mt5/',
];

export const isExternal = (value) => /^https?:\/\//i.test(String(value));

/**
 * Decode then re-encode so `%f0%9f%9a%80`, `%F0%9F%9A%80` and the raw emoji
 * all collapse to one canonical form. External URLs pass through untouched.
 */
export function canon(path) {
  let p = String(path).trim();
  if (!p) return '';
  if (isExternal(p)) return p;
  if (p.includes('%')) {
    try {
      p = decodeURIComponent(p);
    } catch {
      /* leave as-is */
    }
  }
  if (!p.startsWith('/')) p = `/${p}`;
  return encodeURI(p);
}

/** Compare paths ignoring a trailing slash. */
export const key = (path) => path.replace(/\/+$/, '') || '/';

/** Canonical comparison key: normalised + slash-insensitive + lowercase. */
export const cmpKey = (path) => key(canon(path)).toLowerCase();

function contentEntries(collection) {
  const dir = join(ROOT, 'src/content', collection);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const fm = matter(readFileSync(join(dir, f), 'utf8')).data;
      let slug = String(fm.slug || f.replace(/\.md$/, ''));
      try {
        slug = decodeURIComponent(slug);
      } catch {
        /* leave as-is */
      }
      return { slug, draft: fm.draft === true };
    });
}

/**
 * Products withdrawn from sale — mirrors `src/data/unpublished.json`, which
 * `src/lib/content.ts` and `astro.config.mjs` also read. Their `/product/...`
 * route is not live, so a redirect from it is allowed to exist.
 */
function unpublishedProductSlugs() {
  const file = join(ROOT, 'src/data/unpublished.json');
  if (!existsSync(file)) return new Set();
  try {
    const data = JSON.parse(readFileSync(file, 'utf8'));
    return new Set((data.products || []).map((entry) => entry.slug));
  } catch {
    return new Set();
  }
}

/**
 * Every live route, canonicalised for comparison. Drafts are included —
 * Astro still emits them (no draft filter in `getStaticPaths`).
 */
export function getLiveRoutes() {
  const live = new Set(['/']);
  const add = (route) => {
    live.add(cmpKey(route));
  };
  for (const s of STATIC_ROUTES) add(s);

  const seen = new Set();
  for (const entry of [...contentEntries('posts'), ...contentEntries('pages')]) {
    const k = entry.slug.toLowerCase();
    if (seen.has(k) || RESERVED_SLUGS.has(k)) continue;
    seen.add(k);
    add(`/${entry.slug}/`);
  }
  const unpublished = unpublishedProductSlugs();
  for (const entry of contentEntries('products')) {
    if (unpublished.has(entry.slug)) continue;
    const k = `product/${entry.slug}`.toLowerCase();
    if (seen.has(k)) continue;
    seen.add(k);
    add(`/product/${entry.slug}/`);
  }

  const taxPath = join(ROOT, 'src/data/taxonomies.json');
  if (existsSync(taxPath)) {
    const tax = JSON.parse(readFileSync(taxPath, 'utf8'));
    const usedCategories = new Set();
    for (const f of readdirSync(join(ROOT, 'src/content/posts')).filter((f) => f.endsWith('.md'))) {
      const fm = matter(readFileSync(join(ROOT, 'src/content/posts', f), 'utf8')).data;
      for (const c of fm.categories || []) usedCategories.add(c);
    }
    for (const cat of tax.blogCategories || []) {
      if (!usedCategories.has(cat.name)) continue;
      const rel = String(cat.path || '')
        .replace(/^https?:\/\/[^/]+/, '')
        .replace(/^\/category\//, '')
        .replace(/\/+$/, '');
      if (rel) add(`/category/${rel}/`);
    }
    for (const cat of tax.productCategories || []) {
      if (cat.slug) add(`/product-category/${cat.slug}/`);
    }
  }
  return live;
}
