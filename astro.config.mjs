import { readdirSync, readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import matter from 'gray-matter';
import { rehypeTableAccessibility } from './src/lib/rehype-table-a11y.mjs';

const SITE = process.env.PUBLIC_SITE_URL || 'https://bestmt4ea.com';

/**
 * Sitemap `lastmod` must come from the content itself.
 *
 * Without this the sitemap either omits `lastmod` or, worse, dates every URL to
 * build time — which tells search engines the whole site changed on every
 * deploy and is exactly the false freshness signal this project removed from
 * structured data. Only entries with a real `updatedAt`/`publishedAt` get a
 * date; anything else is left without one.
 */
function contentDates() {
  const map = new Map();
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
      const date = data.updatedAt ?? data.publishedAt;
      if (!date) continue;
      const slug = decode(String(data.slug ?? file.replace(/\.md$/, '')));
      map.set(toPath(slug), new Date(date));
    }
  }
  return map;
}

const dates = contentDates();

export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
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
        return item;
      },
    }),
  ],
  markdown: {
    rehypePlugins: [rehypeTableAccessibility],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
