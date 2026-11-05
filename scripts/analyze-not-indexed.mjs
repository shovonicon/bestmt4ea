#!/usr/bin/env node
/**
 * "Crawled - currently not indexed" analysis (SEO recovery, Phase 3).
 *
 * Sorts every URL Search Console reports as crawled-but-not-indexed into what
 * should happen to it, and ranks the live content pages by the search demand
 * they used to earn, so the rewrite queue starts with the pages worth fixing.
 *
 * Inputs are two JSON files (Search Console exports are .xlsx; convert once):
 *   --urls   ["https://bestmt4ea.com/...", ...]
 *   --pages  [{ "url": "...", "clicks": 0, "impressions": 0, "position": 0 }, ...]
 *            (the "Pages" sheet of a Performance on Search export)
 *
 * Each URL lands in exactly one bucket, judged against the CURRENT site:
 *   gone      the Worker already answers 410 (rule or legacy pattern)
 *   redirect  the Worker already 301s it
 *   live      a real page: post, product, page, category, tool or hub
 *   missing   no rule and no page: it 404s and needs a decision
 *
 * Usage:
 *   node scripts/analyze-not-indexed.mjs --urls u.json --pages p.json [--out docs/SEO-NOT-INDEXED.md]
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { getLiveRoutes, cmpKey } from './routes.mjs';
import { buildMap, matchRedirect } from '../worker/match.mjs';
import { countWords } from '../src/lib/reading.ts';

const arg = (name, fallback) => {
  const i = process.argv.indexOf(name);
  return i > -1 ? process.argv[i + 1] : fallback;
};
const urlsFile = arg('--urls');
const pagesFile = arg('--pages');
const outFile = arg('--out', 'docs/SEO-NOT-INDEXED.md');
if (!urlsFile || !pagesFile) {
  console.error('Usage: node scripts/analyze-not-indexed.mjs --urls u.json --pages p.json [--out file.md]');
  process.exit(1);
}

/** Served by src/middleware.ts rather than by a file in the build. */
const MIDDLEWARE_FILES = new Set(['/sitemap.xml', '/sitemap_index.xml']);

const MIN_WORDS = 3500;
const MAX_WORDS = 7500;

const urls = JSON.parse(readFileSync(urlsFile, 'utf8'));
const pages = JSON.parse(readFileSync(pagesFile, 'utf8'));
const manifest = JSON.parse(readFileSync('src/generated/redirects.json', 'utf8'));
const redirects = buildMap(manifest.rules);
const live = getLiveRoutes();

const slugOf = (file, fm) => {
  const raw = String(fm.slug || file.replace(/\.md$/, ''));
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
};

/** path key -> { kind, slug, words, hasDownload, hasQuickAnswer, faqs, sources } */
const content = new Map();
for (const [dir, kind, prefix] of [
  ['src/content/posts', 'post', '/'],
  ['src/content/pages', 'page', '/'],
  ['src/content/products', 'product', '/product/'],
]) {
  if (!existsSync(dir)) continue;
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
    const parsed = matter(readFileSync(join(dir, file), 'utf8'));
    const fm = parsed.data;
    const key = cmpKey(`${prefix}${slugOf(file, fm)}/`);
    if (content.has(key)) continue;
    content.set(key, {
      kind,
      slug: slugOf(file, fm),
      words: countWords(parsed.content),
      hasDownload: Boolean(fm.download),
      hasQuickAnswer: Boolean(fm.quickAnswer),
      faqs: (fm.faqs ?? []).length,
      sources: (fm.sources ?? []).length,
    });
  }
}

const parse = (u) => {
  try {
    const url = new URL(u);
    let path = url.pathname;
    const isFile = /\.[a-z0-9]{2,5}$/i.test(path);
    if (!isFile && !path.endsWith('/')) path += '/';
    return { path, hasQuery: Boolean(url.search), isFile };
  } catch {
    return null;
  }
};

const impressionsByPath = new Map();
for (const row of pages) {
  const p = parse(row.url);
  if (!p) continue;
  const k = cmpKey(p.path);
  const cur = impressionsByPath.get(k) ?? { clicks: 0, impressions: 0, position: row.position };
  cur.clicks += row.clicks ?? 0;
  cur.impressions += row.impressions ?? 0;
  impressionsByPath.set(k, cur);
}

const buckets = { gone: new Map(), redirect: new Map(), live: new Map(), missing: new Map(), files: new Map(), unparseable: [] };
const addTo = (bucket, key, sample, extra = {}) => {
  const cur = bucket.get(key) ?? { path: sample, variants: 0, ...extra };
  cur.variants += 1;
  bucket.set(key, cur);
};

for (const u of urls) {
  const p = parse(u);
  if (!p) {
    buckets.unparseable.push(u);
    continue;
  }
  const key = cmpKey(p.path);
  const match = matchRedirect(redirects, p.path, '');
  if (match.kind === 'pass' && p.isFile && (MIDDLEWARE_FILES.has(key) || existsSync(join('dist/client', p.path)))) addTo(buckets.files, key, p.path);
  else if (match.kind === 'gone') addTo(buckets.gone, key, p.path);
  else if (match.kind === 'redirect') addTo(buckets.redirect, key, p.path, { to: match.location });
  else if (live.has(key)) addTo(buckets.live, key, p.path);
  else addTo(buckets.missing, key, p.path);
}

/* ------------------------------------------------------------- live pages */

const liveRows = [...buckets.live.entries()].map(([key, v]) => {
  const c = content.get(key);
  const demand = impressionsByPath.get(key) ?? { clicks: 0, impressions: 0, position: null };
  const issues = [];
  if (c?.kind === 'post') {
    if (c.words < MIN_WORDS) issues.push(`thin (${c.words} words)`);
    else if (c.words > MAX_WORDS) issues.push(`long (${c.words} words)`);
    if (!c.hasDownload) issues.push('no download');
    if (!c.hasQuickAnswer) issues.push('no quickAnswer');
    if (c.faqs < 4) issues.push(`${c.faqs} FAQs`);
    if (c.sources < 2) issues.push(`${c.sources} sources`);
  }
  return {
    path: v.path,
    kind: c?.kind ?? 'route',
    words: c?.words ?? null,
    variants: v.variants,
    clicks: demand.clicks,
    impressions: demand.impressions,
    position: demand.position,
    issues,
  };
});
liveRows.sort((a, b) => b.impressions - a.impressions || (a.words ?? 1e9) - (b.words ?? 1e9));

const livePosts = liveRows.filter((r) => r.kind === 'post');
const thinPosts = livePosts.filter((r) => r.issues.some((i) => i.startsWith('thin')));
const compliantPosts = livePosts.filter((r) => r.issues.length === 0);
const withDemand = livePosts.filter((r) => r.impressions > 0);

/* ----------------------------------------------------------------- report */

const total = urls.length;
const uniquePaths =
  buckets.gone.size + buckets.redirect.size + buckets.live.size + buckets.missing.size + buckets.files.size;
const count = (m) => [...m.values()].reduce((n, v) => n + v.variants, 0);
const pct = (n) => `${((n / total) * 100).toFixed(1)}%`;
const esc = (s) => String(s).replace(/\|/g, '\\|');
const trunc = (s, n = 90) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);

const lines = [];
const out = (s = '') => lines.push(s);

out('# Crawled, currently not indexed: analysis');
out();
out(`Generated by \`scripts/analyze-not-indexed.mjs\` against the current build. Source: Search Console coverage export (${total} URLs; Search Console exports at most 1,000 rows per report) and the Performance on Search "Pages" sheet.`);
out();
out('The buckets are judged against the site as it is now, not as it was when Google crawled.');
out();
out('| Bucket | URLs | Share | Unique paths | What it means |');
out('| --- | ---: | ---: | ---: | --- |');
out(`| Already 410 (gone) | ${count(buckets.gone)} | ${pct(count(buckets.gone))} | ${buckets.gone.size} | Google's list is stale. Nothing to do; they drop out on the next crawl. |`);
out(`| Already redirected | ${count(buckets.redirect)} | ${pct(count(buckets.redirect))} | ${buckets.redirect.size} | Same: the old URL is handled. |`);
out(`| Live page | ${count(buckets.live)} | ${pct(count(buckets.live))} | ${buckets.live.size} | A real page Google chose not to index. The quality question. |`);
if (buckets.files.size) out(`| Static file (served from the build) | ${count(buckets.files)} | ${pct(count(buckets.files))} | ${buckets.files.size} | A real file in dist/client or a middleware special case (sitemap). Not a 404. |`);
out(`| Missing (404) | ${count(buckets.missing)} | ${pct(count(buckets.missing))} | ${buckets.missing.size} | No rule and no page. Needs a decision. |`);
if (buckets.unparseable.length) out(`| Unparseable | ${buckets.unparseable.length} | ${pct(buckets.unparseable.length)} | - | Malformed rows in the export. |`);
out();
out(`${uniquePaths} unique paths in total; the rest are query-string variants of the same path.`);
out();

out('## Live pages Google declined to index');
out();
out(`${livePosts.length} are posts, ${liveRows.length - livePosts.length} are other routes. Of the posts, ${thinPosts.length} are below the ${MIN_WORDS}-word floor and ${compliantPosts.length} already meet every machine-checkable rule. ${withDemand.length} had search impressions before the migration.`);
out();
out(compliantPosts.length >= livePosts.length * 0.8
  ? `**Reading:** most of these posts already meet the standard, so thin content is not the current blocker. Google most likely crawled the old thin imports and has not recrawled the rewritten versions. For those the fix is a recrawl signal (sitemap, internal links, request indexing), not another rewrite. Only the posts with listed issues need rewriting.`
  : `**Reading:** many of these posts still miss the standard, so rewriting them is the first fix.`);
out();

const table = (rows, limit) => {
  out('| # | Path | Impressions | Clicks | Pos. | Words | Issues |');
  out('| ---: | --- | ---: | ---: | ---: | ---: | --- |');
  rows.slice(0, limit).forEach((r, i) => {
    out(
      `| ${i + 1} | \`${esc(trunc(decodeURIComponent(r.path)))}\` | ${r.impressions} | ${r.clicks} | ${r.position ?? '-'} | ${r.words ?? '-'} | ${esc(r.issues.join(', ') || 'meets rules')} |`,
    );
  });
  out();
};

out('### Posts, ranked by pre-migration impressions (request-indexing order; rewrite only those with issues)');
out();
table(livePosts.filter((r) => r.impressions > 0), 40);

out('### Posts with no recorded demand, thinnest first');
out();
table(
  livePosts.filter((r) => r.impressions === 0).sort((a, b) => (a.words ?? 0) - (b.words ?? 0)),
  25,
);

const otherLive = liveRows.filter((r) => r.kind !== 'post');
if (otherLive.length) {
  out('### Other live routes');
  out();
  out('| Path | Kind | Variants | Impressions |');
  out('| --- | --- | ---: | ---: |');
  for (const r of otherLive.slice(0, 40)) {
    out(`| \`${esc(trunc(decodeURIComponent(r.path)))}\` | ${r.kind} | ${r.variants} | ${r.impressions} |`);
  }
  out();
}

out('## Missing: no rule, no page');
out();
if (buckets.missing.size === 0) out('None.');
else {
  out('| Path | Variants |');
  out('| --- | ---: |');
  for (const v of [...buckets.missing.values()].slice(0, 60)) {
    out(`| \`${esc(trunc(decodeURIComponent(v.path), 110))}\` | ${v.variants} |`);
  }
}
out();
out('## How to use this');
out();
out('1. Gone and redirected URLs need no work. Re-submit the sitemap and let Google recrawl.');
out('2. Live posts that meet the rules: ask Google to recrawl them in the order of the first table (Search Console, URL Inspection, Request indexing, about 10 a day), and keep linking to them internally.');
out('3. Live posts with listed issues: rewrite them (`npm run rewrite-queue` consumes `src/data/seo-priority.json`).');
out('4. Decide each missing path: redirect to an equivalent page, or 410.');

writeFileSync(outFile, lines.join('\n') + '\n', 'utf8');

console.log(`Wrote ${outFile}`);
console.log(
  `urls=${total} unique=${uniquePaths} gone=${count(buckets.gone)} redirect=${count(buckets.redirect)} live=${count(buckets.live)} missing=${count(buckets.missing)}`,
);
console.log(
  `live posts=${livePosts.length} thin=${thinPosts.length} compliant=${compliantPosts.length} with-demand=${withDemand.length}`,
);
