/**
 * Publish step: D1 -> src/data/myfxbook-live.json
 *
 * The prerendered pages — the homepage, /shop/, /top-ranking/, the header column,
 * the Obsidian promo, the review boards, the product cards — do not read the
 * database. They read this file at build time. Only the SSR product page reads D1
 * per request, which is why the two disagreed.
 *
 * This used to scrape Myfxbook directly with a plain fetch. That cannot work:
 * Myfxbook 403s plain server-side fetches, which is exactly why the collector
 * drives a real browser. There is now one scraper (collect-myfxbook.mjs -> the
 * token-guarded ingest endpoint -> D1) and this is a pure reader, so it can never
 * be blocked and the figures cannot drift between the two paths.
 *
 * `fetchedAt` is the newest snapshot's capture time, not the time of this run: if
 * collection has stopped, the pages should say the figures are stale rather than
 * claim they are fresh.
 *
 * Usage:
 *   node scripts/sync-myfxbook.mjs            # every mapped account
 *   node scripts/sync-myfxbook.mjs <slug>     # one
 *   node scripts/sync-myfxbook.mjs --tolerant # warn instead of failing (predeploy)
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';

const ACCOUNTS_FILE = 'src/data/myfxbook-accounts.json';
const OUT_FILE = 'src/data/myfxbook-live.json';
const DB = 'bestmt4ea';
const STALE_AFTER_DAYS = 3;

const onlySlug = process.argv.slice(2).find((a) => !a.startsWith('--'));
// --local reads the local D1 instead of the deployed one, so the whole chain can be
// checked on a developer machine without touching production.
const LOCAL = process.argv.slice(2).includes('--local');
/*
 * `--tolerant` is for the `predeploy` hook. A slightly stale file is still worth
 * deploying, and a blocked or unauthenticated wrangler must not be able to stop a
 * deploy outright — you should still be able to ship a copy fix from a train. On a
 * hard failure the existing file is left untouched and the pages report the last known
 * figures as stale, which is the honest outcome.
 */
const TOLERANT = process.argv.slice(2).includes('--tolerant');

const num = (value) => {
  if (value === null || value === undefined || value === '') return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
};
const cents = (value) => {
  const n = num(value);
  return n === undefined ? undefined : n / 100;
};

/** Every snapshot, newest first — there are only a handful per account. */
function readSnapshots() {
  const sql =
    // Snapshots are keyed by our own account id; the accounts file is keyed by the
    // Myfxbook number, so join across and expose that number as `account_id`.
    'SELECT a.myfxbook_account_id AS account_id, s.captured_at, s.raw, s.growth_pct, s.drawdown_pct, ' +
    's.profit_factor, s.win_rate_pct, s.balance_cents, s.equity_cents, s.profit_cents, s.open_trades ' +
    'FROM performance_snapshots s JOIN performance_accounts a ON a.id = s.account_id ' +
    'ORDER BY s.captured_at DESC';
  // `--command`, not `--file`: a file goes through D1's import endpoint, which
  // needs write permission even for a SELECT. Running wrangler's entry script with
  // Node directly needs no shell (npx is npx.cmd on Windows), so the SQL reaches
  // wrangler as one argument and is not split on its spaces.
  const wranglerBin = fileURLToPath(new URL('../node_modules/wrangler/bin/wrangler.js', import.meta.url));

  let out;
  try {
    out = execFileSync(process.execPath, [wranglerBin, 'd1', 'execute', DB, LOCAL ? '--local' : '--remote', '--json', '--command', sql], {
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
    });
  } catch (err) {
    // execFileSync's message is just "Command failed" — wrangler's own reason
    // (auth, permissions, a bad query) is on stderr/stdout.
    const detail = `${err.stderr ?? ''}${err.stdout ?? ''}`.trim().slice(-600);
    throw new Error(`wrangler d1 execute failed${detail ? `: ${detail}` : ''}`);
  }
  const start = out.indexOf('[');
  if (start === -1) throw new Error(`unexpected wrangler output: ${out.slice(0, 200)}`);
  const parsed = JSON.parse(out.slice(start));
  return parsed[0]?.results ?? [];
}

/**
 * Collapse a snapshot into the shape the pages read. The `metrics` block the
 * collector sends is the primary source; the indexed columns are the fallback, so
 * rows written before that block was stored still publish.
 */
function toStats(row) {
  /*
   * `raw` arrives as TEXT from the SQL path, not as an object. Without parsing it,
   * the metrics block is silently ignored and only the indexed columns survive —
   * three figures out of the dozen the pages show. The local fixture caught it.
   */
  let payload = row.raw;
  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload);
    } catch {
      payload = null;
    }
  }
  const m = payload?.metrics ?? {};
  const stats = {
    accountId: String(row.account_id),
    accountType: m.accountType,
    currency: m.currency,
    broker: m.broker,
    leverage: m.leverage,
    terminal: m.terminal,
    sourceUrl: m.sourceUrl,
    gainPct: num(m.gainPct) ?? num(row.growth_pct),
    absGainPct: num(m.absGainPct),
    dailyPct: num(m.dailyPct),
    monthlyPct: num(m.monthlyPct),
    drawdownPct: num(m.drawdownPct) ?? num(row.drawdown_pct),
    balance: num(m.balance) ?? cents(row.balance_cents),
    equity: num(m.equity) ?? cents(row.equity_cents),
    profit: num(m.profit) ?? cents(row.profit_cents),
    deposits: num(m.deposits),
    withdrawals: num(m.withdrawals),
    trades: num(m.trades),
    pips: num(m.pips),
    lots: num(m.lots),
    profitFactor: num(m.profitFactor) ?? num(row.profit_factor),
    sharpeRatio: num(m.sharpeRatio),
    longsWon: num(m.longsWon),
    longsTotal: num(m.longsTotal),
    longsWinPct: num(m.longsWinPct),
    shortsWon: num(m.shortsWon),
    shortsTotal: num(m.shortsTotal),
    shortsWinPct: num(m.shortsWinPct),
    avgTradeLength: m.avgTradeLength,
    updatedLabel: m.updatedLabel,
  };

  // Drop the empty keys so the file stays readable and the UI's "is this figure
  // present" checks are not fooled by a key that exists but is undefined.
  return Object.fromEntries(Object.entries(stats).filter(([, v]) => v !== undefined && v !== null));
}

async function main() {
  const accounts = JSON.parse(await readFile(ACCOUNTS_FILE, 'utf8'));
  const byId = new Map();
  for (const [slug, entry] of Object.entries(accounts)) {
    if (slug.startsWith('_') || typeof entry !== 'object' || !entry?.accountId) continue;
    if (onlySlug && slug !== onlySlug) continue;
    byId.set(String(entry.accountId), slug);
  }

  const rows = readSnapshots();
  const newest = new Map();
  for (const row of rows) {
    const id = String(row.account_id);
    if (!newest.has(id)) newest.set(id, row); // rows arrive newest first
  }

  const accounts_out = {};
  const problems = [];
  let newestCapture = 0;

  for (const [accountId, slug] of byId) {
    const row = newest.get(accountId);
    if (!row) {
      problems.push(`${slug}: no snapshot in D1 — the collector has not ingested it`);
      continue;
    }
    accounts_out[slug] = toStats(row);
    newestCapture = Math.max(newestCapture, Number(row.captured_at) || 0);
    console.log(`  ${slug.padEnd(48)} gain=${accounts_out[slug].gainPct ?? '?'}%  dd=${accounts_out[slug].drawdownPct ?? '?'}%`);
  }

  const result = {
    fetchedAt: newestCapture ? new Date(newestCapture).toISOString() : null,
    staleAfterDays: STALE_AFTER_DAYS,
    accounts: accounts_out,
  };

  await mkdir(dirname(OUT_FILE), { recursive: true });
  await writeFile(OUT_FILE, JSON.stringify(result, null, 2) + '\n', 'utf8');

  console.log(`\nWrote ${OUT_FILE}: ${Object.keys(accounts_out).length} account(s), newest capture ${result.fetchedAt ?? 'none'}`);
  if (problems.length) {
    console.log('\nProblems:');
    for (const p of problems) console.log(`  - ${p}`);
    if (!TOLERANT) process.exitCode = 2;
  }
}

main().catch((err) => {
  console.error('Publish failed:', err.message);
  if (TOLERANT) {
    console.error(
      'Continuing anyway (--tolerant): the existing file is unchanged, so the pages keep the last known figures and report them as stale.',
    );
    return;
  }
  process.exit(1);
});
