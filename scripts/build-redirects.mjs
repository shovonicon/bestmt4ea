/**
 * Yoast SEO redirects -> Cloudflare Worker manifest.
 *
 * Reads the exported Yoast redirect CSV, normalises every path (Yoast stores
 * decoded paths, so emoji slugs must be percent-encoded), flattens redirect
 * chains to their final destination, and emits ONE manifest that
 * `worker/index.ts` serves at the edge:
 *
 *   src/generated/redirects.json   { generatedAt, source, rules: [{from,to,status}] }
 *
 * Strictness (any violation exits 1 — a bad redirect must never deploy):
 *
 *   - conflicting duplicate sources fail (same source, different target)
 *   - cycles and chains deeper than MAX_DEPTH fail
 *   - statuses outside 301/302/307/308/410/451 fail
 *   - local targets that resolve to no live route fail, EXCEPT retired
 *     category archives listed in RETIRED_TARGETS, which are remapped to a
 *     live fallback and recorded in the manifest
 *   - sources that collide with a live route are dropped and recorded
 *     (legacy WordPress rows for /disclaimer/, /dmca-policy/, ... must never
 *     shadow real pages)
 *   - external origins are skipped (a rule redirecting an external URL is
 *     meaningless here)
 *
 * Nothing is served from `public/_redirects` anymore — the static file is
 * deleted by this script so the 2000-rule Cloudflare cap cannot bite again.
 *
 * Usage: node scripts/build-redirects.mjs
 */

import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname } from 'node:path';
import { getLiveRoutes, canon, cmpKey, isExternal } from './routes.mjs';

const CSV_CANDIDATES = [
  'wordpress-seo-redirects (2).csv',
  'wordpress-seo-redirects.csv',
];
const OUT_JSON = 'src/generated/redirects.json';
const LEGACY_STATIC = 'public/_redirects';
const LEGACY_JSON = 'src/data/redirects.json';
const MAX_DEPTH = 10;

const REDIRECT_STATUSES = new Set([301, 302, 307, 308]);
const GONE_STATUSES = new Set([410, 451]);

/**
 * Retired WordPress category archives: taxonomy entries with no posts behind
 * them, so Astro emits no `/category/...` page for them. Hundreds of legacy
 * rows point at these; dropping the rules would resurrect dead links, and
 * failing would block deployment on legacy data. They consolidate into the
 * live blog index instead. Each remap is recorded in the manifest.
 */
const RETIRED_TARGETS = new Map(
  [
    '/category/strategies-best-practices/',
    '/category/fundamental-analysis/',
    '/category/beginners-guides-forex-basics/',
    '/category/forex-trading-strategies/forex-swing-trading/',
    '/category/chart-patterns/',
    '/category/technical-analysis/',
    '/category/prop-firm-reviews/',
    '/category/trading-psychology/',
    '/category/forex-broker-reviews/',
    '/category/mt4-mt5-expert-advisors/ea-development-mql4-mql5/',
  ].map((from) => [cmpKey(from), '/blog/']),
);

/* ------------------------------------------------------------------- csv */

/** Minimal RFC4180-ish parser for the subset Yoast emits. */
function parseCsvLine(line) {
  const out = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (quoted) {
      if (ch === '"') {
        if (line[i + 1] === '"') { field += '"'; i++; } else { quoted = false; }
      } else field += ch;
    } else if (ch === '"') {
      quoted = true;
    } else if (ch === ',') {
      out.push(field); field = '';
    } else field += ch;
  }
  out.push(field);
  return out;
}

/* ------------------------------------------------------------------- run */

const failures = [];
const fail = (msg) => failures.push(msg);

async function main() {
  const csvPath = CSV_CANDIDATES.find((p) => existsSync(p));
  if (!csvPath) {
    console.error(`No redirect CSV found. Looked for: ${CSV_CANDIDATES.join(', ')}`);
    process.exit(1);
  }

  const raw = await readFile(csvPath, 'utf8');
  const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
  const rows = lines.slice(1).map(parseCsvLine); // drop header

  const live = getLiveRoutes();

  const map = new Map(); // cmpKey(source) -> { from, to, status }
  const dropped = []; // { from, to, reason }
  const remapped = []; // { fromRule, retiredTarget, fallback }
  let skippedExternal = 0;

  for (const row of rows) {
    const [originRaw, targetRaw, typeRaw] = row;
    const status = Number((typeRaw || '301').trim());

    if (!REDIRECT_STATUSES.has(status) && !GONE_STATUSES.has(status)) {
      fail(`Unsupported status ${typeRaw || '(empty)'} for source ${originRaw}`);
      continue;
    }

    const from = canon(originRaw ?? '');
    const to = isExternal(targetRaw ?? '') ? String(targetRaw).trim() : canon(targetRaw ?? '');
    if (!from || !to) {
      fail(`Empty source or target in row: ${JSON.stringify(row).slice(0, 160)}`);
      continue;
    }
    if (isExternal(from)) {
      skippedExternal++;
      continue;
    }

    const k = cmpKey(from);

    // A rule that points at itself would loop at the edge.
    if (!isExternal(to) && cmpKey(to) === k) {
      fail(`Self-redirect (would loop): ${from}`);
      continue;
    }

    // Legacy rows that shadow real pages lose to the page, loudly.
    if (live.has(k)) {
      dropped.push({ from, to, status, reason: 'source collides with a live route' });
      continue;
    }

    if (map.has(k)) {
      const kept = map.get(k);
      if (kept.to !== to || kept.status !== status) {
        fail(`Conflicting duplicate source ${from}: kept ${kept.to} ${kept.status}, dropped ${to} ${status}`);
      }
      continue;
    }
    map.set(k, { from, to, status });
  }

  /* --- flatten chains --------------------------------------------------- */
  for (const [k, rule] of map) {
    if (isExternal(rule.to) || GONE_STATUSES.has(rule.status)) continue;
    let cursor = rule;
    const seen = new Set([k]);
    let hops = 0;
    for (;;) {
      const nextKey = cmpKey(cursor.to);
      const next = map.get(nextKey);
      if (!next) break;
      if (seen.has(nextKey)) {
        fail(`Redirect cycle involving ${rule.from}`);
        break;
      }
      seen.add(nextKey);
      cursor = next;
      if (++hops > MAX_DEPTH) {
        fail(`Unresolved redirect chain (depth > ${MAX_DEPTH}) from ${rule.from}`);
        break;
      }
    }
    rule.to = cursor.to;
    rule.status = cursor.status;
    rule.hops = hops;
  }

  /* --- drop no-ops created by flattening -------------------------------- */
  for (const [k, rule] of [...map]) {
    if (!isExternal(rule.to) && cmpKey(rule.to) === k) {
      fail(`Flattening produced a self-redirect (cycle): ${rule.from}`);
      map.delete(k);
    }
  }

  /* --- resolve targets --------------------------------------------------- */
  // A flattened target that is itself a source would double-redirect.
  for (const rule of map.values()) {
    if (!isExternal(rule.to) && map.has(cmpKey(rule.to)) && cmpKey(rule.to) !== cmpKey(rule.from)) {
      fail(`Unresolved chain: target of ${rule.from} is itself a redirect source (${rule.to})`);
    }
  }
  // Every local target must be a live route — or a known-retired archive.
  const retiredCounts = new Map();
  for (const rule of map.values()) {
    if (isExternal(rule.to)) continue;
    const tk = cmpKey(rule.to);
    if (live.has(tk)) continue;
    const fallback = RETIRED_TARGETS.get(tk);
    if (fallback) {
      remapped.push({ rule: rule.from, retiredTarget: rule.to, fallback });
      retiredCounts.set(tk, (retiredCounts.get(tk) || 0) + 1);
      rule.to = fallback;
      continue;
    }
    fail(`Missing local target ${rule.to} (source ${rule.from}) — not a live route`);
  }

  if (failures.length > 0) {
    console.error(`\nRedirect build FAILED with ${failures.length} error(s):`);
    for (const f of failures) console.error(`  - ${f}`);
    process.exit(1);
  }

  /* --- emit ------------------------------------------------------------- */
  const rules = [...map.values()]
    .map(({ from, to, status }) => ({ from, to, status }))
    .sort((a, b) => a.from.localeCompare(b.from));

  const manifest = {
    generatedAt: new Date().toISOString(),
    source: csvPath,
    count: rules.length,
    dropped,
    retiredRemaps: [...retiredCounts.entries()].map(([target, count]) => ({
      retiredTarget: target,
      fallback: RETIRED_TARGETS.get(target),
      rules: count,
    })),
    rules,
  };

  await mkdir(dirname(OUT_JSON), { recursive: true });
  await writeFile(OUT_JSON, JSON.stringify(manifest, null, 2), 'utf8');

  // Stop shipping static `_redirects`; remove legacy artefacts if present.
  if (existsSync(LEGACY_STATIC)) await rm(LEGACY_STATIC);
  if (existsSync(LEGACY_JSON)) await rm(LEGACY_JSON);

  console.log(`Read ${rows.length} rows from ${csvPath}`);
  if (skippedExternal) console.log(`Skipped ${skippedExternal} external-origin rows`);
  console.log(`Dropped ${dropped.length} legacy sources colliding with live routes`);
  for (const d of dropped) console.log(`  - ${d.from} -> ${d.to} (${d.reason})`);
  const chains = [...map.values()].filter((r) => (r.hops || 0) > 0).length;
  console.log(`Flattened ${chains} redirect chains`);
  console.log(`Remapped ${remapped.length} rules from retired archives to live fallbacks`);
  for (const r of manifest.retiredRemaps) {
    console.log(`  - ${r.retiredTarget} -> ${r.fallback} (${r.rules} rules)`);
  }
  console.log(`Wrote ${OUT_JSON} with ${rules.length} rules — PASS`);
}

main().catch((err) => {
  console.error('Redirect build failed:', err.message);
  process.exit(1);
});
