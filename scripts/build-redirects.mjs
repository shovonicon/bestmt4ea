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
 *     archives and removed pages listed in RETIRED_TARGETS, which are remapped
 *     to a live fallback and recorded in the manifest
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
 * Retired local targets: URLs this site no longer serves that legacy WordPress
 * rows still point at. Dropping those rules would resurrect dead links, and
 * failing would block deployment on legacy data — so each is remapped to a live
 * fallback and recorded in the manifest.
 *
 *   - taxonomy archives with no posts behind them -> the blog index
 *   - the free-download posts removed from the site -> the ranked catalogue
 *   - the old VPS product slug -> the current one
 */
const RETIRED_TARGETS = new Map(
  [
    ...[
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
      '/category/gold-xauusd-trading/',
      '/how-to-install-mt4-expert-advisor-on-windows-7-powerful-steps-for-fast-easy-setup/',
      '/is-tradingview-the-best-charting-platform/',
    ].map((from) => [from, '/blog/']),
    ...[
      '/product/2000-trading-tools/',
      '/%F0%9F%93%88-gold-trend-mt4-indicator-free-download-7-powerful-benefits-every-trader-must-know/',
      '/7-best-top-gold-scalping-ea-for-beginners-with-low-drawdown-ultimate-safe-trading-guide/',
      '/ai-gold-scalping-ea-free-download-powerful-profitable-2026-guide-7-proven-insights/',
      '/best-gold-robot-for-mt4-mt5-ea-7-powerful-picks-for-consistent-trading-profits/',
      '/best-gold-scalper-ea-for-mt4-mt5-the-only-guide-you-need/',
      '/free-gold-trading-ea-free-download-7-powerful-benefits-smart-setup-guide/',
      '/gold-breakout-ea-free-download-7-powerful-benefits-proven-setup-guide-for-massive-trading-success/',
      '/gold-cycle-trader-ea-free-download-7-powerful-secrets-smart-traders-must-know/',
      '/gold-high-frequency-scalping-ea-free-download-7-powerful-truths-you-must-know-before-installing/',
      '/gold-hitter-ea-mt4-free-download-powerful-2026-guide-to-safe-setup-profitable-trading/',
      '/gold-investor-best-forex-gold-ea-free-download-powerful-proven-guide/',
      '/gold-prop-firm-robot-free-download-7-powerful-secrets-to-maximize-funded-trading-success/',
      '/gold-scalping-expert-advisor-mt4-free-download-powerful-proven-guide-7-winning-secrets/',
      '/gold-sniper-master-indicator-system-free-download-powerful-secrets-7-proven-trading-advantages/',
      '/goldbaron-xauusd-ea-forex-ea-reviews-7-powerful-truths-every-trader-must-know/',
      '/mt4-gold-scalper-ea-free-download-powerful-2026-guide-proven-setup-tips/',
      '/pharaoh-gold-ea-mt4-free-download-7-powerful-facts-every-trader-must-know-before-installing/',
      '/scalper-xauusd-ea-free-download-7-powerful-truths-you-must-know-before-installing/',
      '/the-7-best-mt4-ea-for-gold-trading-with-low-risk-proven-tools-for-consistent-results/',
      '/the-gold-reaper-forex-ea-reviews-powerful-truths-7-critical-insights-before-you-invest/',
      '/top-10-best-mt4-indicators-for-gold-xauusd-powerful-tools-for-accurate-trading/',
      '/xauusd-scalping-robot-settings-and-tips-10-powerful-strategies-for-better-trading-results/',
      '/xauusd-trading-robot-free-download-7-powerful-secrets-to-maximize-gold-profits-safely/',
    ].map((from) => [from, '/top-ranking/']),
    ['/product/forex-vps/', '/product/vps/'],
  ].map(([from, fallback]) => [cmpKey(from), fallback]),
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

  // Project-owned rules. The CSV is a generated artifact (wp-export --refresh
  // rewrites it), so hand-written redirects live in their own file and go
  // through exactly the same validation below.
  const MANUAL_JSON = 'src/data/redirects-manual.json';
  if (existsSync(MANUAL_JSON)) {
    try {
      const manual = JSON.parse(await readFile(MANUAL_JSON, 'utf8'));
      for (const rule of manual.redirects ?? []) {
        rows.push([rule.from, rule.to, String(rule.status ?? 301)]);
      }
    } catch (error) {
      fail(`Could not read ${MANUAL_JSON}: ${error.message}`);
    }
  }

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
