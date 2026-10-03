/**
 * Internal link check over the built site.
 *
 * Broken internal links are the cheapest SEO and trust failure to ship and the
 * easiest to catch, so every `href` in `dist/` that points at this site is
 * resolved against the actual build output:
 *
 *   - `/foo/`    -> dist/foo/index.html
 *   - `/foo`     -> dist/foo/index.html or dist/foo.html
 *   - `/a.b.css` -> the file itself
 *
 * External links, `mailto:`, `tel:` and bare fragments are skipped. Download
 * links (`data-download-link`) are excluded here — `check-downloads.mjs` owns
 * those, and they are expected to point at storage rather than at a page.
 *
 * Usage: node scripts/check-links.mjs
 */

import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
const ASSET_EXT = /\.(?:html|xml|txt|json|css|js|mjs|map|webp|png|jpe?g|gif|svg|ico|avif|woff2?|ttf|otf|pdf|zip|ex4|ex5|mq4|mq5|set|csv)$/i;

/** Every .html file under dist, as forward-slash relative paths. */
function htmlFiles(dir = DIST) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...htmlFiles(full));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const decode = (value) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

/** Does this site-relative path resolve to something in dist? */
function resolves(pathname) {
  const clean = decode(pathname);
  if (clean === '/' || clean === '') return existsSync(join(DIST, 'index.html'));
  const rel = clean.replace(/^\/+/, '');
  if (existsSync(join(DIST, rel))) {
    try {
      if (!statSync(join(DIST, rel)).isDirectory()) return true;
    } catch {
      /* fall through */
    }
  }
  if (ASSET_EXT.test(rel)) return existsSync(join(DIST, rel));
  return existsSync(join(DIST, rel, 'index.html')) || existsSync(join(DIST, `${rel}.html`));
}

const errors = [];
const nonCanonical = [];
let pages = 0;
let checked = 0;

for (const file of htmlFiles()) {
  pages++;
  const html = readFileSync(file, 'utf8');
  const page = relative(DIST, file).replace(/\\/g, '/');
  const seen = new Set();

  for (const m of html.matchAll(/<a\b[^>]*?href="([^"]+)"/g)) {
    const raw = m[1];
    if (!raw.startsWith('/') || raw.startsWith('//')) continue;
    if (raw.startsWith('/#')) continue;
    const pathname = raw.split('#')[0].split('?')[0];
    if (!pathname || pathname === '/') continue;
    if (seen.has(pathname)) continue;
    seen.add(pathname);

    // Trailing-slash policy: a route must be linked in its canonical form, or
    // it costs a redirect and competes with itself in search.
    if (!pathname.endsWith('/') && !ASSET_EXT.test(pathname)) {
      nonCanonical.push({ page, target: pathname });
      continue;
    }

    checked++;
    if (!resolves(pathname)) errors.push({ page, target: pathname });
  }
}

if (nonCanonical.length > 0) {
  const byTarget = new Map();
  for (const e of nonCanonical) byTarget.set(e.target, (byTarget.get(e.target) ?? 0) + 1);
  console.error(
    `\ncheck-links FAILED: ${nonCanonical.length} internal link(s) missing the trailing slash across ${byTarget.size} target(s).`,
  );
  console.error('\nNon-canonical targets (use url() from src/lib/urls.ts):');
  for (const [target, n] of [...byTarget].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))) {
    console.error(`  ${String(n).padStart(4)}x ${target}`);
  }
  process.exit(1);
}

if (errors.length > 0) {
  const byTarget = new Map();
  for (const e of errors) byTarget.set(e.target, (byTarget.get(e.target) ?? 0) + 1);

  console.error(`\ncheck-links FAILED: ${errors.length} broken internal link(s) across ${byTarget.size} target(s).`);
  console.error('\nBroken targets:');
  for (const [target, n] of [...byTarget].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))) {
    console.error(`  ${String(n).padStart(4)}x ${target}`);
  }
  console.error('\nSample pages:');
  for (const e of errors.slice(0, 10)) console.error(`  - ${e.page} -> ${e.target}`);
  process.exit(1);
}
console.log(
  `check-links PASS: ${checked} internal link(s) across ${pages} page(s) resolve and use canonical trailing slashes.`,
);
