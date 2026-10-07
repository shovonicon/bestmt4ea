import { readdirSync, readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import matter from 'gray-matter';
import { loadEnv } from 'vite';
import { rehypeTableAccessibility } from './src/lib/rehype-table-a11y.mjs';
import { rehypeInArticleAds } from './src/lib/rehype-in-article-ads.mjs';

/*
 * Vite loads `.env` *after* this config file has already been evaluated, so
 * `process.env` is still empty here. Load it explicitly: the rehype plugin below
 * needs the AdSense client at config time, and reading it late silently means no
 * in-article ad is ever injected.
 */
const env = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), '');

const SITE = process.env.PUBLIC_SITE_URL || env.PUBLIC_SITE_URL || 'https://bestmt4ea.com';

/**
 * Sitemap metadata read straight from the content.
 *
 * `lastmod` must come from the content itself: dating every URL to build time
 * tells search engines the whole site changed on every deploy, which is exactly
 * the false freshness signal this project removed from structured data. Only
 * entries with a real `updatedAt`/`publishedAt` get a date.
 *
 * The same pass collects each entry's featured image so the sitemap can carry an
 * <image:image> block, which feeds Google Images and gives answer engines a
 * little more context per URL.
 */
function scanContent() {
  const dates = new Map();
  const images = new Map();
  const sources = [
    ['src/content/posts', (slug) => `/${slug}/`],
    ['src/content/pages', (slug) => `/${slug}/`],
    ['src/content/products', (slug) => `/product/${slug}/`],
  ];
  const decode = (value) => {
    try {
      return decodeURIComponent(value);
    } catch {
      return value;
    }
  };

  for (const [dir, toPath] of sources) {
    for (const file of readdirSync(dir)) {
      if (!file.endsWith('.md')) continue;
      const { data } = matter(readFileSync(`${dir}/${file}`, 'utf8'));
      if (data.draft) continue;
      const slug = decode(String(data.slug ?? file.replace(/\.md$/, '')));
      const path = toPath(slug);

      const date = data.updatedAt ?? data.publishedAt;
      if (date) dates.set(path, new Date(date));

      const image = data.featuredImage ?? data.ogImage;
      if (image) images.set(path, String(image));
    }
  }
  return { dates, images };
}

const { dates, images } = scanContent();

/**
 * Pages that must never appear in the sitemap: the private, per-customer
 * surfaces (they carry `X-Robots-Tag: noindex`, so listing them would contradict
 * their own header) and the custom 404.
 */
const EXCLUDED_PREFIXES = ['/admin', '/dashboard', '/login', '/checkout', '/auth', '/logout'];
function isExcluded(page) {
  let pathname = page;
  try {
    pathname = new URL(page).pathname;
  } catch {
    /* leave as-is */
  }
  if (pathname === '/custom-404' || pathname === '/custom-404/') return true;
  return EXCLUDED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

/**
 * Product pages are served on demand (SSR) so their performance stays fresh,
 * which keeps them out of the build's page list — and out of the sitemap. Add
 * them back explicitly; the serialize() hook applies the same real `lastmod`.
 */
/** Products withdrawn from sale — mirrors `src/data/unpublished.json`. */
function unpublishedProductSlugs() {
  try {
    const data = JSON.parse(readFileSync('src/data/unpublished.json', 'utf8'));
    return new Set((data.products ?? []).map((entry) => entry.slug));
  } catch {
    return new Set();
  }
}

function productPaths() {
  const dir = 'src/content/products';
  const unpublished = unpublishedProductSlugs();
  const out = [];
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.md')) continue;
    const { data } = matter(readFileSync(`${dir}/${file}`, 'utf8'));
    if (data.draft) continue;
    let slug = String(data.slug ?? file.replace(/\.md$/, ''));
    try {
      slug = decodeURIComponent(slug);
    } catch {
      /* leave as-is */
    }
    if (unpublished.has(slug)) continue;
    out.push(`/product/${slug}/`);
  }
  return out;
}

export default defineConfig({
  site: SITE,
  output: 'static',
  session: false,
  adapter: cloudflare({ imageService: 'passthrough' }),
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !isExcluded(page),
      customPages: productPaths().map((path) => `${SITE}${path}`),
      serialize(item) {
        let pathname = item.url;
        try {
          pathname = new URL(item.url).pathname;
        } catch {
          /* leave as-is */
        }
        const date = dates.get(pathname);
        if (date) item.lastmod = date.toISOString();
        else delete item.lastmod;

        const image = images.get(pathname);
        if (image) {
          item.img = [{ url: /^https?:\/\//.test(image) ? image : `${SITE}${image}` }];
        }
        return item;
      },
    }),
    {
      // A browser renders a bare sitemap as an unstyled XML tree ("This XML file
      // does not appear to have any style information…"). Point the generated
      // files at public/sitemap.xsl so a human sees a readable page; crawlers
      // ignore the stylesheet and read the XML directly.
      name: 'sitemap-stylesheet',
      hooks: {
        'astro:build:done': async ({ dir }) => {
          const { readFile, writeFile } = await import('node:fs/promises');
          const { fileURLToPath } = await import('node:url');
          const { join } = await import('node:path');
          const pi = '\n<?xml-stylesheet href="/sitemap.xsl" type="text/xsl"?>';
          const root = fileURLToPath(dir);

          for (const name of ['sitemap-index.xml', 'sitemap-0.xml']) {
            const file = join(root, name);
            try {
              const xml = await readFile(file, 'utf8');
              if (xml.includes('<?xml-stylesheet')) continue;
              await writeFile(file, xml.replace(/(<\?xml[^>]*\?>)/, `$1${pi}`), 'utf8');
            } catch {
              /* that sitemap was not generated — nothing to do */
            }
          }
        },
      },
    },
  ],
  markdown: {
    /*
     * In-article ads are injected here rather than placed by the layout, so
     * density scales with article length (see rehype-in-article-ads.mjs). The
     * client and slot are read from the same env vars AdSlot uses; with no
     * client set, nothing is injected and no ad code reaches the page.
     */
    rehypePlugins: [
      rehypeTableAccessibility,
      [
        rehypeInArticleAds,
        {
          client: env.PUBLIC_ADSENSE_CLIENT || process.env.PUBLIC_ADSENSE_CLIENT || '',
          slot:
            env.PUBLIC_ADSENSE_SLOT_IN_ARTICLE ||
            process.env.PUBLIC_ADSENSE_SLOT_IN_ARTICLE ||
            '6721931734',
        },
      ],
    ],
  },
  vite: {
    plugins: [tailwindcss()],
    define: {
      // Prerendering runs inside a Workers runtime, where `new Date()` at module
      // scope is the epoch ("January 1970" in every title). Take the build date
      // from Node, where the clock is real, and hand it to src/lib/dates.ts.
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    },
  },
});
