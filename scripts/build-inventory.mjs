/**
 * Regenerate the content inventory from the current source.
 *
 * `src/data/inventory.json` is the parity record of what this site publishes —
 * used to compare the Astro build against the WordPress origin. It used to be
 * written only by `scripts/wp-export.mjs`, so it drifted as soon as content was
 * added or removed here. The release workflow now rebuilds it from the content
 * collections, so it always describes what is actually shipping.
 *
 * Usage:
 *   node scripts/build-inventory.mjs            # write src/data/inventory.json
 *   node scripts/build-inventory.mjs --check    # fail if it is out of date
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';

/**
 * Read the site URL from the environment rather than `src/lib/site.ts`, which
 * uses Vite's `import.meta.env` and cannot be imported by a plain Node script.
 */
const SITE_URL = (process.env.PUBLIC_SITE_URL || 'https://bestmt4ea.com').replace(/\/+$/, '');

const OUT = 'src/data/inventory.json';
const CHECK = process.argv.includes('--check');

const decode = (value) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

function readCollection(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const { data } = matter(readFileSync(join(dir, file), 'utf8'));
      return {
        slug: decode(String(data.slug ?? file.replace(/\.md$/, ''))),
        title: String(data.title ?? ''),
        draft: data.draft === true,
      };
    });
}

const posts = readCollection('src/content/posts');
const pages = readCollection('src/content/pages');
const products = readCollection('src/content/products');

const taxonomies = JSON.parse(readFileSync('src/data/taxonomies.json', 'utf8'));
const productCategories = taxonomies.productCategories ?? [];
const blogCategories = taxonomies.blogCategories ?? [];

const urls = [
  ...products.map((entry) => ({ type: 'product', url: `/product/${entry.slug}/`, title: entry.title })),
  ...posts.map((entry) => ({ type: 'post', url: `/${entry.slug}/`, title: entry.title })),
  ...pages.map((entry) => ({ type: 'page', url: `/${entry.slug}/`, title: entry.title })),
]
  .map((entry) => ({ ...entry, source: `${SITE_URL}${encodeURI(entry.url)}` }))
  .sort((a, b) => a.url.localeCompare(b.url));

const inventory = {
  generatedAt: new Date().toISOString(),
  source: SITE_URL,
  generatedBy: 'scripts/build-inventory.mjs',
  counts: {
    products: products.length,
    posts: posts.length,
    pages: pages.length,
    productCategories: productCategories.length,
    brands: 2,
    blogCategories: blogCategories.length,
  },
  urls,
};

const next = `${JSON.stringify(inventory, null, 2)}\n`;

if (CHECK) {
  const current = existsSync(OUT) ? readFileSync(OUT, 'utf8') : '';
  const currentUrls = (() => {
    try {
      return JSON.stringify(JSON.parse(current).urls);
    } catch {
      return '';
    }
  })();
  if (currentUrls !== JSON.stringify(inventory.urls)) {
    console.error(`inventory is out of date — run: node scripts/build-inventory.mjs`);
    process.exit(1);
  }
  console.log(`inventory check PASS: ${urls.length} URL(s) match the current content.`);
  process.exit(0);
}

writeFileSync(OUT, next, 'utf8');
console.log(
  `Wrote ${OUT}: ${urls.length} URL(s) — ${products.length} products, ${posts.length} posts, ${pages.length} pages.`,
);
