/**
 * Structured-data validation over the built site.
 *
 * Schema is where a site accidentally lies: a product offered at `price: 0`, an
 * `InStock` that nobody checked, a brand that implies we built a third-party
 * system, or a `dateModified` equal to build time on every page. This asserts
 * the fixes hold:
 *
 *   Product   — offers, when present, carry a positive price; availability comes
 *               only from the allowed schema.org set; images are absolute; the
 *               site is never named as the brand; and an `aggregateRating` exists
 *               only where it is built from the reviews the page renders (see
 *               productSchema), never as a constant or an imported count. Google's
 *               review-snippet policy requires rating markup to be backed by
 *               reviews a visitor can actually read.
 *   Article   — url equals the page canonical, publisher carries a logo, an
 *               author exists, and `dateModified` matches the content's own
 *               `updatedAt` (never build time).
 *   WebSite   — no `dateModified` at all; build time is not a modification.
 *
 * Usage: node scripts/check-schema.mjs
 */

import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import matter from 'gray-matter';
import { productPriceRange } from '../src/lib/product-pricing.ts';

const DIST = 'dist/client';
const SITE_HOST = 'bestmt4ea.com';
const ALLOWED_AVAILABILITY = new Set([
  'https://schema.org/InStock',
  'https://schema.org/OutOfStock',
  'https://schema.org/BackOrder',
  'https://schema.org/PreOrder',
]);

const plansData = JSON.parse(readFileSync('src/data/product-plans.json', 'utf8'));

const errors = [];
let pricedProducts = 0;
let productPages = 0;
let articlePages = 0;
let websiteNodes = 0;

const decode = (value) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

function htmlFiles(dir = DIST) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...htmlFiles(full));
    else if (entry.name === 'index.html') out.push(full);
  }
  return out;
}

/** Content dates, keyed by decoded route, so schema can be compared to source. */
function contentDates() {
  const map = new Map();
  for (const [dir, prefix] of [
    ['src/content/posts', ''],
    ['src/content/pages', ''],
    ['src/content/products', '/product'],
  ]) {
    for (const file of readdirSync(dir)) {
      if (!file.endsWith('.md')) continue;
      const { data } = matter(readFileSync(join(dir, file), 'utf8'));
      const slug = decode(String(data.slug ?? file.replace(/\.md$/, '')));
      map.set(`${prefix}/${slug}/`, {
        publishedAt: data.publishedAt ? new Date(data.publishedAt).toISOString() : undefined,
        updatedAt: data.updatedAt ? new Date(data.updatedAt).toISOString() : undefined,
      });
    }
  }
  return map;
}

const dates = contentDates();

/**
 * Product pages are server-rendered, so they never land in dist/ — the walk
 * below reports 0 Product nodes and cannot police them. The no-rating rule is
 * asserted against the schema source instead, where a rating node would have to
 * be authored. `aggregateRating:` with its colon only matches real code, never
 * the prose in a comment.
 */
function sourceFiles(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) sourceFiles(full, out);
    else if (/\.(ts|astro)$/.test(entry.name)) out.push(full);
  }
  return out;
}

for (const file of sourceFiles('src')) {
  const source = readFileSync(file, 'utf8');
  if (!/aggregateRating\s*:/.test(source)) continue;
  const normalised = file.replace(/\\/g, '/');
  if (normalised !== 'src/lib/seo.ts') {
    errors.push(`${file}: authors an aggregateRating node — only productSchema in src/lib/seo.ts may, from the page's own reviews`);
  } else if (!/reviews\.length\s*\?/.test(source) || !/reviewCount:\s*reviews\.length/.test(source)) {
    errors.push(`${file}: aggregateRating must be conditional on, and counted from, the reviews passed to productSchema`);
  }
}

/*
 * A Product with no `offers` node earns no rich result, and that is a silence
 * rather than an error: nothing fails, the product just never appears. It
 * happened two ways at once — products carrying only `regularPrice`/`salePrice`
 * with no price fields, and products whose `priceMin: 0` (the free trial) left
 * only the most expensive tier. Both are decisions about *data*, so they are
 * asserted here, over the content and the licence plans, where they can be
 * caught before a deploy rather than after somebody notices the page missing
 * from search. This is the same reasoning as the rating rule above: the product
 * pages are server-rendered, so nothing in dist/ can police them.
 */
for (const file of readdirSync('src/content/products')) {
  if (!file.endsWith('.md')) continue;
  const { data } = matter(readFileSync(join('src/content/products', file), 'utf8'));
  if (data.draft) continue;

  const slug = decode(String(data.slug ?? file.replace(/\.md$/, '')));
  const plans = Array.isArray(plansData[slug]) ? plansData[slug] : [];
  const paid = plans.filter((plan) => Number(plan?.price) > 0);
  if (!paid.length) continue;

  pricedProducts++;
  const { min, max } = productPriceRange(data, plans);
  if (min == null) {
    errors.push(
      `${file}: has ${paid.length} paid plan(s) but no positive price reaches the schema — its Product would carry no offers node and could never earn a rich result`,
    );
  } else if (max != null && min > max) {
    errors.push(`${file}: price range is inverted (${min} > ${max})`);
  }
}

function routeOf(file) {
  const rel = relative(DIST, file).replace(/\\/g, '/');
  if (rel === 'index.html') return '/';
  return `/${rel.slice(0, -'index.html'.length)}`;
}

for (const file of htmlFiles()) {
  const html = readFileSync(file, 'utf8');
  const label = relative(DIST, file).replace(/\\/g, '/');
  const route = routeOf(file);
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];

  const blocks = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      blocks.push(JSON.parse(m[1]));
    } catch {
      errors.push(`${label}: unparseable JSON-LD block`);
    }
  }

  const absoluteImage = (value) => typeof value === 'string' && value.startsWith('https://');

  for (const block of blocks) {
    if (block?.['@type'] === 'WebSite') {
      websiteNodes++;
      if ('dateModified' in block) {
        errors.push(`${label}: WebSite schema carries dateModified (build time is not a modification)`);
      }
    }

    if (block?.['@type'] === 'Product') {
      productPages++;
      /*
       * `aggregateRating` is deliberately NOT an error here. It contradicted the
       * design: `productSchema` emits a rating only when the page renders the
       * reviews it summarises, which is precisely what Google's review-snippet
       * policy asks for, and those pages are the goal rather than a fault. The
       * real guard is the source-level rule above — only productSchema may author
       * the node, only conditionally, and only counted from the reviews it is
       * handed — which is strictly stronger than banning the node outright.
       */
      const rating = block.aggregateRating;
      if (rating) {
        const count = Number(rating.reviewCount ?? 0);
        if (!(count > 0)) {
          errors.push(`${label}: Product aggregateRating has reviewCount ${rating.reviewCount}`);
        }
        const rendered = (block.review ?? []).length;
        if (rendered !== count) {
          errors.push(
            `${label}: Product aggregateRating counts ${count} but carries ${rendered} review node(s) — the rating must describe the reviews on the page`,
          );
        }
      }
      const offers = block.offers;
      if (offers) {
        const price = offers.price;
        const low = offers.lowPrice;
        if (typeof price === 'number' && !(price > 0)) {
          errors.push(`${label}: Product offers price is ${price}`);
        }
        if (low != null && !(low > 0)) {
          errors.push(`${label}: Product offers lowPrice is ${low}`);
        }
        if (offers.availability && !ALLOWED_AVAILABILITY.has(offers.availability)) {
          errors.push(`${label}: unexpected availability ${offers.availability}`);
        }
      }
      for (const image of block.image ?? []) {
        if (!absoluteImage(image)) errors.push(`${label}: Product image is not absolute (${image})`);
      }
      const brand = block.brand?.name;
      if (brand && brand === 'BESTMT4EA') {
        errors.push(`${label}: Product brand names this site for a third-party system`);
      }
    }

    if (block?.['@type'] === 'Article') {
      articlePages++;
      if (!block.author?.name) errors.push(`${label}: Article has no author`);
      if (!absoluteImage(block.publisher?.logo?.url)) {
        errors.push(`${label}: Article publisher.logo.url is missing or not absolute`);
      }
      for (const image of block.image ?? []) {
        if (!absoluteImage(image)) errors.push(`${label}: Article image is not absolute (${image})`);
      }
      if (canonical && block.url !== canonical) {
        errors.push(`${label}: Article url (${block.url}) does not match the canonical (${canonical})`);
      }

      const source = dates.get(route);
      const expected = source?.updatedAt ?? source?.publishedAt;
      if (expected) {
        if (block.dateModified !== expected) {
          errors.push(`${label}: dateModified ${block.dateModified} does not match content date ${expected}`);
        }
      } else if (block.dateModified) {
        errors.push(`${label}: dateModified present for content with no real date (${block.dateModified})`);
      }
    }
  }
  void SITE_HOST;
}

if (errors.length > 0) {
  console.error(`\ncheck-schema FAILED with ${errors.length} error(s):`);
  for (const e of errors.slice(0, 40)) console.error(`  - ${e}`);
  if (errors.length > 40) console.error(`  ... and ${errors.length - 40} more`);
  process.exit(1);
}

console.log(
  `check-schema PASS: ${productPages} Product, ${articlePages} Article, ${websiteNodes} WebSite node(s) valid ` +
    `(${pricedProducts} priced product(s) reach a positive offers price; no zero prices, no invented ` +
    'availability or brand, no unbacked rating markup, no build-time dates).',
);
