/**
 * WordPress -> Astro content exporter for bestmt4ea.com
 *
 * Pulls every product, page and post from the live WordPress REST API (which is
 * open, no auth) together with its Yoast SEO metadata, taxonomy terms and
 * featured image, converts the HTML body to Markdown, and writes one file per
 * item into src/content/<collection>/<slug>.md.
 *
 * Slugs are preserved exactly, so the Astro routes can rebuild the original
 * permalinks and nothing loses rankings.
 *
 * Usage:
 *   node scripts/wp-export.mjs            # use .wp-cache if present
 *   node scripts/wp-export.mjs --refresh  # ignore cache, refetch everything
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import TurndownService from 'turndown';
import gfmPlugin from 'turndown-plugin-gfm';

const BASE = 'https://bestmt4ea.com';
const CACHE_DIR = '.wp-cache';
const CONTENT_DIR = 'src/content';
const DATA_DIR = 'src/data';
const REFRESH = process.argv.includes('--refresh');

const gfm = gfmPlugin?.gfm ?? gfmPlugin?.default?.gfm ?? gfmPlugin;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ------------------------------------------------------------------ tunables */

/** WooCommerce pages that exist only to run the old shop — not ported as pages. */
const SYSTEM_PAGE_SLUGS = new Set([
  'cart',
  'checkout',
  'my-account',
  'review-order',
  'wishlist',
  'communication-preferences',
  'shop',
]);

/* --------------------------------------------------------------- utilities */

/** Decode the HTML entities WordPress puts in rendered titles/excerpts. */
const NAMED = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  hellip: '…', mdash: '—', ndash: '–', lsquo: '‘', rsquo: '’',
  ldquo: '“', rdquo: '”', copy: '©', reg: '®', trade: '™',
  laquo: '«', raquo: '»', middot: '·', bull: '•',
};

function decodeEntities(input = '') {
  return String(input)
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&([a-z]+);/gi, (m, name) => NAMED[name.toLowerCase()] ?? m);
}

/** Strip tags and decode entities — for meta descriptions. */
function textOnly(html = '') {
  return decodeEntities(String(html).replace(/<[^>]*>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

function toIso(value) {
  if (!value) return undefined;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}

/* ----------------------------------------------------- YAML serialisation */

function yamlValue(value, indent = 0) {
  const pad = ' '.repeat(indent);
  if (value === null || value === undefined) return 'null';
  if (typeof value === 'string') return JSON.stringify(value);
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    const items = value.map((item) => `${pad}  - ${yamlValue(item, indent + 2)}`);
    return `\n${items.join('\n')}`;
  }
  if (typeof value === 'object') {
    const keys = Object.keys(value).filter((k) => value[k] !== undefined);
    if (keys.length === 0) return '{}';
    const lines = keys.map((k) => `${pad}  ${k}: ${yamlValue(value[k], indent + 2)}`);
    return `\n${lines.join('\n')}`;
  }
  return JSON.stringify(String(value));
}

function toFrontmatter(obj) {
  const lines = ['---'];
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined) continue;
    lines.push(`${key}: ${yamlValue(value, 0)}`);
  }
  lines.push('---');
  return lines.join('\n');
}

/* ------------------------------------------------------------ markdown conv */

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
  emDelimiter: '_',
});

if (gfm) turndown.use(gfm);

turndown.remove(['script', 'style', 'noscript', 'form']);
turndown.keep(['iframe', 'video', 'audio', 'details', 'summary']);

// Images are migrated for PRODUCTS only. Posts and pages are exported
// text-only, so their inline <img> tags are dropped rather than left pointing
// at wp-content URLs that will 404 once DNS moves.
let imagesEnabled = true;

// Make relative links and images absolute so nothing breaks after the move.
turndown.addRule('absoluteLinks', {
  filter: (node) =>
    (node.nodeName === 'A' || node.nodeName === 'IMG') &&
    Boolean(node.getAttribute('href') || node.getAttribute('src')),
  replacement: (content, node) => {
    const fix = (url) => (!url ? url : url.startsWith('//') ? `https:${url}` : url.startsWith('/') ? `${BASE}${url}` : url);
    if (node.nodeName === 'IMG') {
      if (!imagesEnabled) return '';
      const src = fix(node.getAttribute('src'));
      const alt = node.getAttribute('alt') || '';
      const title = node.getAttribute('title');
      return src ? `![${alt}](${src}${title ? ` "${title}"` : ''})` : '';
    }
    const href = fix(node.getAttribute('href'));
    const title = node.getAttribute('title');
    return href ? `[${content}](${href}${title ? ` "${title}"` : ''})` : content;
  },
});

function htmlToMarkdown(html) {
  if (!html) return '';
  return turndown
    .turndown(html)
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/* ------------------------------------------------------------- wp fetching */

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'bestmt4ea-migrator/1.0 (+migration to Astro)',
      Accept: 'application/json',
    },
  });
  if (res.status === 400 || res.status === 404) return { empty: true, status: res.status };
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return { data: await res.json(), totalPages: Number(res.headers.get('x-wp-totalpages') || 1) };
}

async function fetchAll(path, { perPage = 100 } = {}) {
  const all = [];
  for (let page = 1; ; page++) {
    const sep = path.includes('?') ? '&' : '?';
    const target = `${BASE}${path}${sep}per_page=${perPage}&page=${page}`;
    const { empty, data, totalPages } = await fetchJson(target);
    if (empty) break;
    if (!Array.isArray(data) || data.length === 0) break;
    all.push(...data);
    process.stdout.write(`\r  ${path} -> page ${page}/${totalPages} (${all.length} items)`);
    if (page >= totalPages) break;
    await sleep(120);
  }
  process.stdout.write('\n');
  return all;
}

async function cached(name, loader) {
  const file = join(CACHE_DIR, `${name}.json`);
  if (!REFRESH && existsSync(file)) {
    const raw = await readFile(file, 'utf8');
    return JSON.parse(raw);
  }
  const data = await loader();
  await writeFile(file, JSON.stringify(data), 'utf8');
  return data;
}

/* ----------------------------------------------------------------- mapping */

function yoastFrom(item) {
  const y = item?.yoast_head_json;
  if (!y) return {};
  return {
    title: y.title ? decodeEntities(y.title) : undefined,
    description: y.description ? decodeEntities(y.description) : undefined,
    canonical: y.canonical,
    robots: Array.isArray(y.robots) ? Object.values(y.robots).join(', ') : undefined,
    ogImage: y.og_image?.[0]?.url,
  };
}

function featuredFrom(item) {
  const media = item?._embedded?.['wp:featuredmedia']?.[0];
  return media?.source_url;
}

function termNames(item) {
  const groups = item?._embedded?.['wp:term'];
  if (!Array.isArray(groups)) return [];
  return groups
    .flat()
    .filter(Boolean)
    .map((t) => ({ name: decodeEntities(t.name), taxonomy: t.taxonomy, slug: t.slug }));
}

/** WooCommerce Store API product -> normalised shape. */
function mapStoreProduct(p) {
  const catNames = (p.categories || []).map((c) => decodeEntities(c.name));
  const brandNames = (p.brands || []).map((b) => decodeEntities(b.name));
  const prices = p.prices || {};
  const minor = Number(prices.currency_minor_unit ?? 2);
  const toMajor = (v) => (v == null ? undefined : Number(v) / 10 ** minor);

  return {
    wpId: p.id,
    slug: p.slug,
    title: decodeEntities(p.name),
    platform: /mt4/i.test(p.name) && /mt5/i.test(p.name) ? 'MT4/MT5' : /mt4/i.test(p.name) ? 'MT4' : /mt5/i.test(p.name) ? 'MT5' : 'none',
    productCategories: catNames,
    brands: brandNames,
    tags: (p.tags || []).map((t) => decodeEntities(t.name)),
    currency: prices.currency_code || 'EUR',
    price: prices.price != null ? String(toMajor(prices.price)) : undefined,
    regularPrice: prices.regular_price != null ? String(toMajor(prices.regular_price)) : undefined,
    salePrice: prices.sale_price != null ? String(toMajor(prices.sale_price)) : undefined,
    priceMin: toMajor(prices.price_range?.min_amount),
    priceMax: toMajor(prices.price_range?.max_amount),
    sku: p.sku || undefined,
    stockStatus: p.is_in_stock ? 'instock' : 'outofstock',
    ratingAverage: p.average_rating ? Number(p.average_rating) : undefined,
    ratingCount: typeof p.review_count === 'number' ? p.review_count : undefined,
    productType: p.type || 'unknown',
    variants: (p.variations || []).map((v) => ({
      id: v.id,
      sku: v.sku || undefined,
      price: v.prices?.price != null ? String(toMajor(v.prices.price)) : undefined,
      name: (v.attributes || []).map((a) => `${a.name}: ${a.value}`).join(' / ') || v.sku || undefined,
    })),
    gallery: (p.images || []).map((img) => img.src).filter(Boolean),
    description: p.description || '',
    shortDescription: p.short_description || '',
  };
}

/* ------------------------------------------------------------------- writer */

async function writeEntry(collection, slug, frontmatter, body) {
  const dir = join(CONTENT_DIR, collection);
  await mkdir(dir, { recursive: true });
  const safeSlug = slug || `untitled-${frontmatter.wpId ?? Date.now()}`;
  const file = join(dir, `${safeSlug}.md`);
  const content = `${toFrontmatter(frontmatter)}\n\n${body}\n`;
  await writeFile(file, content, 'utf8');
  return file;
}

/* ---------------------------------------------------------------------- run */

async function main() {
  await mkdir(CACHE_DIR, { recursive: true });
  await mkdir(DATA_DIR, { recursive: true });

  console.log('Fetching WordPress content from', BASE);

  const [wpProducts, storeProducts, storeCategories, wpCategories, brands] = await Promise.all([
    cached('wp-products', () => fetchAll('/wp-json/wp/v2/product?_embed=1')),
    cached('store-products', () => fetchAll('/wp-json/wc/store/v1/products')),
    cached('store-product-categories', () => fetchAll('/wp-json/wc/store/v1/products/categories')),
    cached('wp-categories', () => fetchAll('/wp-json/wp/v2/categories')),
    cached('wp-brands', () => fetchAll('/wp-json/wp/v2/product_brand').catch(() => [])),
  ]);

  const [posts, pages] = await Promise.all([
    cached('posts', () => fetchAll('/wp-json/wp/v2/posts?_embed=1')),
    cached('pages', () => fetchAll('/wp-json/wp/v2/pages?_embed=1')),
  ]);

  const storeBySlug = new Map(storeProducts.map((p) => [p.slug, p]));
  const wpProductById = new Map(wpProducts.map((p) => [p.id, p]));

  const inventory = { generatedAt: new Date().toISOString(), source: BASE, counts: {}, urls: [] };

  /* --- products ------------------------------------------------------- */
  let productCount = 0;
  for (const sp of storeProducts) {
    const store = mapStoreProduct(sp);
    const wp = wpProductById.get(sp.id);
    const body = wp?.content?.rendered ? htmlToMarkdown(wp.content.rendered) : htmlToMarkdown(store.description);
    const summary = wp?.excerpt?.rendered ? textOnly(wp.excerpt.rendered) : textOnly(store.shortDescription);

    const frontmatter = {
      wpId: store.wpId,
      title: store.title,
      slug: store.slug,
      description: summary.slice(0, 300),
      publishedAt: toIso(wp?.date) ?? new Date().toISOString(),
      updatedAt: toIso(wp?.modified),
      featuredImage: featuredFrom(wp) ?? store.gallery[0],
      seo: yoastFrom(wp),
      sourceUrl: wp?.link ?? `${BASE}/product/${store.slug}/`,
      platform: store.platform,
      productCategories: store.productCategories,
      brands: store.brands,
      tags: store.tags,
      price: store.price,
      regularPrice: store.regularPrice,
      salePrice: store.salePrice,
      currency: store.currency,
      priceMin: store.priceMin,
      priceMax: store.priceMax,
      sku: store.sku,
      stockStatus: store.stockStatus,
      ratingAverage: store.ratingAverage,
      ratingCount: store.ratingCount,
      productType: store.productType,
      variants: store.variants,
      gallery: store.gallery.slice(1),
      systemPage: false,
      draft: false,
    };

    await writeEntry('products', store.slug, frontmatter, body);
    inventory.urls.push({ type: 'product', url: `/product/${store.slug}/`, source: frontmatter.sourceUrl, title: store.title });
    productCount++;
  }

  /* --- posts ---------------------------------------------------------- */
  let postCount = 0;
  for (const post of posts) {
    const terms = termNames(post);
    const cats = terms.filter((t) => t.taxonomy === 'category');
    const frontmatter = {
      wpId: post.id,
      title: decodeEntities(post.title?.rendered),
      slug: post.slug,
      description: textOnly(post.excerpt?.rendered).slice(0, 300),
      publishedAt: toIso(post.date) ?? new Date().toISOString(),
      updatedAt: toIso(post.modified),
      seo: yoastFrom(post),
      sourceUrl: post.link,
      categories: cats.map((c) => c.name),
      categoryPaths: cats.map((c) => `/category/${c.slug}/`),
      tags: terms.filter((t) => t.taxonomy === 'post_tag').map((t) => t.name),
      draft: false,
    };
    imagesEnabled = false;
    const postBody = htmlToMarkdown(post.content?.rendered);
    imagesEnabled = true;
    await writeEntry('posts', post.slug, frontmatter, postBody);
    inventory.urls.push({ type: 'post', url: `/${post.slug}/`, source: post.link, title: frontmatter.title });
    postCount++;
  }

  /* --- pages ---------------------------------------------------------- */
  let pageCount = 0;
  for (const page of pages) {
    const isSystem = SYSTEM_PAGE_SLUGS.has(page.slug);
    if (isSystem) continue;
    const frontmatter = {
      wpId: page.id,
      title: decodeEntities(page.title?.rendered),
      slug: page.slug,
      description: textOnly(page.excerpt?.rendered).slice(0, 300),
      publishedAt: toIso(page.date) ?? new Date().toISOString(),
      updatedAt: toIso(page.modified),
      seo: yoastFrom(page),
      sourceUrl: page.link,
      menuOrder: page.menu_order ?? 0,
      systemPage: false,
      draft: false,
    };
    imagesEnabled = false;
    const pageBody = htmlToMarkdown(page.content?.rendered);
    imagesEnabled = true;
    await writeEntry('pages', page.slug, frontmatter, pageBody);
    inventory.urls.push({ type: 'page', url: `/${page.slug}/`, source: page.link, title: frontmatter.title });
    pageCount++;
  }

  /* --- taxonomy reference --------------------------------------------- */
  await writeFile(
    join(DATA_DIR, 'taxonomies.json'),
    JSON.stringify(
      {
        productCategories: storeCategories.map((c) => ({ id: c.id, name: decodeEntities(c.name), slug: c.slug, count: c.count })),
        brands: brands.map((b) => ({ id: b.id, name: decodeEntities(b.name), slug: b.slug, count: b.count })),
        blogCategories: wpCategories.map((c) => ({ id: c.id, name: decodeEntities(c.name), slug: c.slug, count: c.count, parent: c.parent, path: c.link })),
      },
      null,
      2,
    ),
    'utf8',
  );

  inventory.counts = {
    products: productCount,
    posts: postCount,
    pages: pageCount,
    productCategories: storeCategories.length,
    brands: brands.length,
    blogCategories: wpCategories.length,
  };

  await writeFile(join(DATA_DIR, 'inventory.json'), JSON.stringify(inventory, null, 2), 'utf8');

  console.log('\nExport complete:');
  console.table(inventory.counts);
  console.log(`URLs recorded in ${DATA_DIR}/inventory.json (for parity checks).`);
}

main().catch((err) => {
  console.error('\nExport failed:', err.message);
  process.exit(1);
});
