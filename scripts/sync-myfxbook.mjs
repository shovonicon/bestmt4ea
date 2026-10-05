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
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { writeFileSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { tmpdir } from 'node:os';

const ACCOUNTS_FILE = 'src/data/myfxbook-accounts.json';
const OUT_FILE = 'src/data/myfxbook-live.json';
const DB = 'bestmt4ea';
const STALE_AFTER_DAYS = 3;

const onlySlug = process.argv.slice(2).find((a) => !a.startsWith('--'));
// --local reads the local D1 instead of the deployed one, so the whole chain can be
// checked on a developer machine without touching production.
const LOCAL = process.argv.slice(2).includes('--local');

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
    'SELECT account_id, captured_at, raw, growth_pct, drawdown_pct, profit_factor, ' +
    'win_rate_pct, balance_cents, equity_cents, profit_cents, open_trades ' +
    'FROM performance_snapshots ORDER BY captured_at DESC';
  // Through a file rather than --command: a shell is needed to reach npx.cmd on
  // Windows, and a shell would split the SQL on its spaces. A file sidesteps both
  // that and the command-line length limit. On Linux/CI either approach works.
  const sqlPath = join(tmpdir(), `myfxbook-snapshots-${process.pid}.sql`);
  writeFileSync(sqlPath, `${sql};\n`, 'utf8');

  let out;
  try {
    out = execFileSync('npx', ['wrangler', 'd1', 'execute', DB, LOCAL ? '--local' : '--remote', '--json', '--file', sqlPath], {
      // Only Windows needs a shell, because npx is npx.cmd there. Elsewhere it just
      // adds Node's deprecation warning about unescaped arguments.
      shell: process.platform === 'win32',
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
    });
  } finally {
    rmSync(sqlPath, { force: true });
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
  const m = row.raw?.metrics ?? {};
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
    process.exitCode = 2;
  }
}

main().catch((err) => {
  console.error('Publish failed:', err.message);
  process.exit(1);
});
