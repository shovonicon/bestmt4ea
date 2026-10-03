/**
 * Canonical-tag validation.
 *
 * Every page must declare exactly one absolute, self-referential canonical with
 * the trailing slash the site now serves. That single assertion covers three
 * Phase 4 risks at once:
 *
 *   - a missing or duplicate canonical (search consoles pick the wrong URL)
 *   - a canonical that points at a different page, e.g. `/best-mt4-ea/`
 *     canonicalising to the homepage and so competing with it
 *   - emoji routes: the built directory is the DECODED emoji, while the
 *     canonical is percent-encoded, so the comparison below decodes both sides
 *     — uppercase `%F0%9F%9A%80` and lowercase `%f0%9f%9a%80` both resolve to
 *     the same page, which is exactly what must be true in production
 *
 * Usage: node scripts/check-canonicals.mjs
 */

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = 'dist/client';
const SITE_HOST = 'bestmt4ea.com';

/**
 * Real pages are `index.html` files. Root-level files such as
 * `google<token>.html` (Search Console verification) and `404.html` are not
 * pages and carry no canonical by design.
 */
function htmlFiles(dir = DIST) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...htmlFiles(full));
    else if (entry.name === 'index.html') out.push(full);
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

/** The route a dist file represents: `dist/a/b/index.html` -> `/a/b/`. */
function routeOf(file) {
  const rel = relative(DIST, file).replace(/\\/g, '/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'index.html'.length)}`;
  return `/${rel.replace(/\.html$/, '/')}`;
}

const errors = [];
let checked = 0;
let emoji = 0;

for (const file of htmlFiles()) {
  const html = readFileSync(file, 'utf8');
  const route = routeOf(file);
  const label = relative(DIST, file).split(sep).join('/');

  const canonicals = [...html.matchAll(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"[^>]*>/g)].map((m) => m[1]);
  if (canonicals.length !== 1) {
    errors.push(`${label}: expected exactly one canonical, found ${canonicals.length}`);
    continue;
  }
  checked++;

  const canonical = canonicals[0];
  let parsed;
  try {
    parsed = new URL(canonical);
  } catch {
    errors.push(`${label}: canonical is not an absolute URL (${canonical})`);
    continue;
  }

  if (parsed.host !== SITE_HOST) {
    errors.push(`${label}: canonical host is ${parsed.host}, expected ${SITE_HOST}`);
  }

  // Compare decoded paths so encoding differences are not false positives.
  const canonicalPath = decode(parsed.pathname).replace(/\/+$/, '') || '/';
  const expectedPath = decode(route).replace(/\/+$/, '') || '/';

  if (/[^\x00-\x7F]/.test(decode(route))) emoji++;

  if (canonicalPath !== expectedPath) {
    errors.push(`${label}: canonical points elsewhere — ${parsed.pathname} (page is ${route})`);
  }
  if (!parsed.pathname.endsWith('/')) {
    errors.push(`${label}: canonical lacks a trailing slash (${parsed.pathname})`);
  }
}

if (errors.length > 0) {
  console.error(`\ncheck-canonicals FAILED with ${errors.length} error(s):`);
  for (const e of errors.slice(0, 40)) console.error(`  - ${e}`);
  if (errors.length > 40) console.error(`  ... and ${errors.length - 40} more`);
  process.exit(1);
}

if (!existsSync(join(DIST, 'sitemap-index.xml'))) {
  console.error('check-canonicals: dist/client/sitemap-index.xml missing — run a build first.');
  process.exit(1);
}

console.log(`check-canonicals PASS: ${checked} page(s) have one absolute self-canonical (${emoji} emoji route(s)).`);
