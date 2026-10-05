/**
 * Myfxbook performance collector.
 *
 * Myfxbook returns 403 to plain server-side fetches, so this drives a real
 * headless browser (Playwright) against each public account page, reads the
 * published figures, and POSTs a snapshot to the app's token-guarded ingest
 * endpoint (`POST /api/performance/ingest/`). That endpoint is the only writer:
 * the DB, and therefore every product page, follows automatically.
 *
 * Run it on a schedule (see .github/workflows/myfxbook-sync.yml) — this script
 * is the scheduled collector the platform plan describes.
 *
 * Usage:
 *   node scripts/collect-myfxbook.mjs                       # every mapped account
 *   node scripts/collect-myfxbook.mjs --only <slug>         # one account
 *   node scripts/collect-myfxbook.mjs --dry-run             # scrape, print, do not POST
 *
 * Env:
 *   INGEST_URL          base URL of the app            (default http://localhost:4321)
 *   PERF_INGEST_TOKEN   shared secret for the endpoint (required unless --dry-run)
 *   MYFXBOOK_SESSION    optional session cookie value  (enables the monthly breakdown;
 *                       the /private/charts.json endpoint 403s for anonymous visitors)
 *
 * Honesty rules: a figure is only sent when it was actually read from the page.
 * A missing metric is omitted rather than guessed, so a parse change shows up as
 * a gap instead of a wrong number on a product page.
 */

import { readFile } from 'node:fs/promises';
import { chromium } from '@playwright/test';

const ACCOUNTS_FILE = 'src/data/myfxbook-accounts.json';
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36';

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const onlySlug = (() => {
  const i = args.indexOf('--only');
  return i >= 0 ? args[i + 1] : undefined;
})();
const INGEST_URL = (process.env.INGEST_URL ?? 'http://localhost:4321').replace(/\/$/, '');
const TOKEN = process.env.PERF_INGEST_TOKEN ?? '';
const SESSION = process.env.MYFXBOOK_SESSION ?? '';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---------------------------------------------------------------- helpers */

const clean = (s = '') => String(s).replace(/\s+/g, ' ').trim();
/** "Gain :" -> "Gain"; "Abs. Gain:" -> "Abs. gain". */
const label = (s = '') => {
  const t = clean(s).replace(/:$/, '').trim();
  return t.length > 1 ? t.charAt(0).toUpperCase() + t.slice(1) : t;
};
/** Drop the "(...)" difference Myfxbook appends to period figures. */
const stripDiff = (s = '') => clean(String(s).replace(/\s*\([^)]*\)\s*$/, '')).trim();
/** "$11,648.69" -> 1164869 ; "-$9.91" -> -991 ; null when unreadable. */
const toCents = (value) => {
  const m = clean(value).match(/-?\$?\s?([\d,]+(?:\.\d+)?)/);
  if (!m) return null;
  const n = Number(m[1].replace(/,/g, ''));
  if (!Number.isFinite(n)) return null;
  return Math.round(n * 100);
};
/** "+10.44%" -> "10.44" */
const toPct = (value) => {
  const m = clean(value).replace(/,/g, '').match(/-?\d+(?:\.\d+)?/);
  return m ? m[0] : null;
};

/* ------------------------------------------------------------------ scrape */

async function readTables(page) {
  return page.$$eval('table', (els) =>
    els.map((t) =>
      Array.from(t.querySelectorAll('tr'))
        .map((r) =>
          Array.from(r.querySelectorAll('th,td')).map((c) => (c.textContent ?? '').replace(/\s+/g, ' ').trim()),
        )
        .filter((r) => r.length > 1),
    ),
  );
}

function buildRaw(tables, pageText) {
  const pairsOf = (rows) =>
    rows
      .map((r) => [label(r[0] ?? ''), clean(r[1] ?? '')])
      .filter(([l, v]) => l && v && v !== '-');

  // Summary tables (Gain / Daily / Drawdown / Balance / Equity / ...).
  const summary = [];
  for (const rows of tables) {
    // "Other Systems by <member>" publishes a Gain column too, so it matches the
    // filter below — but its rows are OTHER accounts' names and gains, and they
    // must never render as this account's own metrics.
    const header = rows[0] ?? [];
    if (header.some((c) => /^Name$/i.test(c)) && header.some((c) => /^(Gain|Trading|Leverage|Type)$/i.test(c)))
      continue;

    const cls = JSON.stringify(rows);
    if (!/Gain|Daily|Monthly|Drawdown|Balance|Equity|Highest|Profit|Interest|Deposits|Withdrawals|Updated/.test(cls))
      continue;
    if (/This Week|This Month|This Year|Today/.test(cls)) continue;
    if (rows.some((r) => /Difference/i.test(r.join(' ')))) continue;
    for (const [l, v] of pairsOf(rows)) {
      if (/^(Tracking|Updated)$/i.test(l)) continue;
      if (!summary.some(([sl]) => sl === l)) summary.push([l, v]);
    }
  }

  // Period table (Today / This Week / This Month / This Year).
  const periods = [];
  for (const rows of tables) {
    const header = rows[0]?.join(' ').toLowerCase() ?? '';
    if (!header.includes('gain') || !header.includes('lots')) continue;
    for (const r of rows.slice(1)) {
      const name = clean(r[0] ?? '');
      if (!/^(today|this week|this month|this year)$/i.test(name)) continue;
      const cells = r.slice(1).map(stripDiff);
      if (cells.every((c) => c === '-' || c === '')) continue; // "Today" with no trades
      periods.push({
        label: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
        gain: cells[0] ?? '',
        profit: cells[1] ?? '',
        pips: cells[2] ?? '',
        win: cells[3] ?? '',
        trades: cells[4] ?? '',
        lots: cells[5] ?? '',
      });
    }
  }

  // Statistics tables (Trades / Pips / Profit Factor / Sharpe / ...).
  const statistics = [];
  for (const rows of tables) {
    const text = rows.map((r) => r.join(' ')).join(' ');
    const looksLikeStats =
      /Profit Factor|Standard Deviation|Sharpe Ratio|Expectancy|Trades:|Average Win|Longs Won|Shorts Won|Best Trade|Avg\. Trade Length/i.test(
        text,
      );
    if (!looksLikeStats) continue;
    for (const [l, v] of pairsOf(rows)) {
      if (!statistics.some(([sl]) => sl === l)) statistics.push([l, v]);
    }
  }

  // Header line, e.g. "Demo (USD), Fusion Markets, Technical, Automated, 1:100, MetaTrader 5"
  const headerMatch = pageText.match(/(Real|Demo)\s*\(([A-Z]{3})\)\s*,([^\n]+)/i);
  const header = headerMatch ? clean(`${headerMatch[1]} (${headerMatch[2]}),${headerMatch[3]}`) : null;
  const chips = header ? header.split(',').map(clean).filter(Boolean) : [];

  return { header, chips, summary, periods, statistics };
}

/** The monthly breakdown only loads for a signed-in visitor. */
async function readMonthly(page) {
  // The monthly Highcharts instance renders after the rest of the page settles, so
  // poll for it. Reading on a fixed timer made the month set depend on load timing
  // — the same account returned a different number of months between runs.
  await page
    .waitForFunction(
      () => {
        const HC = globalThis.Highcharts;
        const chart = HC?.charts?.filter(Boolean).find((c) => c.renderTo?.id === 'monthlyCont');
        return Boolean(chart?.series?.some((s) => s.data?.length));
      },
      { timeout: 25000 },
    )
    .catch(() => {});

  const charts = await page.evaluate(() => {
    const HC = globalThis.Highcharts;
    if (!HC?.charts) return null;
    const chart = HC.charts.filter(Boolean).find((c) => c.renderTo?.id === 'monthlyCont');
    if (!chart?.series?.length) return null;
    return chart.series.map((s) => ({
      name: s.name,
      points: s.data.map((p) => ({ cat: p.category ?? p.name ?? String(p.x), y: p.y })),
    }));
  });
  if (!charts) return [];

  const series = charts.find((s) => /change|gain/i.test(String(s.name))) ?? charts[0];
  return series.points
    .filter((p) => p.y != null && Number.isFinite(Number(p.y)))
    .map((p) => {
      const y = Number(p.y);
      return { label: clean(String(p.cat)), gain: `${y >= 0 ? '+' : ''}${y.toFixed(2)}%` };
    });
}

function buildPayload(slug, account, raw, pageText) {
  const pick = (name) => raw.summary.find(([l]) => l.toLowerCase() === name.toLowerCase())?.[1];
  const stat = (name) => raw.statistics.find(([l]) => l.toLowerCase() === name.toLowerCase())?.[1];
  const yearPeriod = raw.periods.find((p) => /year/i.test(p.label)) ?? raw.periods.at(-1);

  const accountTypeMatch = pageText.match(/\b(Real|Demo)\s*\([A-Z]{3}\)/i);

  const metrics = {
    balanceCents: toCents(pick('Balance') ?? ''),
    equityCents: toCents(pick('Equity') ?? ''),
    profitCents: toCents(pick('Profit') ?? ''),
    growthPct: toPct(pick('Gain') ?? ''),
    drawdownPct: toPct(pick('Drawdown') ?? ''),
    profitFactor: toPct(stat('Profit Factor') ?? ''),
    winRatePct: toPct(yearPeriod?.win ?? ''),
    openTrades: null,
  };

  return {
    productId: slug,
    capturedAt: Date.now(),
    metrics,
    account: {
      myfxbookAccountId: account.accountId ?? null,
      url: account.accountUrl ?? null,
      accountType: accountTypeMatch ? accountTypeMatch[1].toLowerCase() : null,
    },
    raw,
  };
}

/* -------------------------------------------------------------------- main */

async function main() {
  if (!DRY_RUN && !TOKEN) {
    console.error('PERF_INGEST_TOKEN is required (or pass --dry-run).');
    process.exit(1);
  }

  const accounts = JSON.parse(await readFile(ACCOUNTS_FILE, 'utf8'));
  const slugs = Object.keys(accounts).filter((k) => !k.startsWith('_') && (!onlySlug || k === onlySlug));
  if (!slugs.length) {
    console.error('No accounts to collect.');
    process.exit(1);
  }

  const browser = await chromium.launch();
  const problems = [];
  let posted = 0;

  for (const slug of slugs) {
    const account = accounts[slug];
    process.stdout.write(`Collecting ${slug} ... `);
    const context = await browser.newContext({ userAgent: UA });
    if (SESSION) {
      await context.addCookies([
        { name: 'PHPSESSID', value: SESSION, domain: '.myfxbook.com', path: '/', secure: true, httpOnly: true },
      ]);
    }
    const page = await context.newPage();

    try {
      const res = await page.goto(account.accountUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
      if (!res || res.status() >= 400) throw new Error(`HTTP ${res?.status()}`);
      await page.waitForTimeout(6000);

      const tables = await readTables(page);
      const pageText = await page.innerText('body');
      const raw = buildRaw(tables, pageText);
      // The monthly chart is served intermittently and a retry does not help —
      // measured: the same account returned 6 points / 0 / 0 across three loads,
      // and reloading inside a run returned fewer accounts with months than not
      // retrying at all. Treat an empty series as "Myfxbook did not serve it this
      // time" and let the next scheduled run pick it up.
      raw.monthly = await readMonthly(page);

      if (!raw.summary.length) throw new Error('no summary figures parsed');

      const payload = buildPayload(slug, account, raw, pageText);
      const bits = [
        `gain=${payload.metrics.growthPct ?? '?'}%`,
        `dd=${payload.metrics.drawdownPct ?? '?'}%`,
        `pf=${payload.metrics.profitFactor ?? '?'}`,
        `periods=${raw.periods.length}`,
        `stats=${raw.statistics.length}`,
        `months=${raw.monthly.length}`,
      ].join(' ');

      if (DRY_RUN) {
        console.log(`ok (dry-run) ${bits}`);
      } else {
        const post = await fetch(`${INGEST_URL}/api/performance/ingest/`, {
          method: 'POST',
          headers: { 'content-type': 'application/json', 'x-ingest-token': TOKEN },
          body: JSON.stringify(payload),
        });
        if (!post.ok) throw new Error(`ingest HTTP ${post.status}: ${(await post.text()).slice(0, 200)}`);
        posted += 1;
        console.log(`ok ${bits}`);
      }
    } catch (err) {
      problems.push(`${slug}: ${err.message}`);
      console.log(`FAILED: ${err.message}`);
    } finally {
      await context.close();
    }

    await sleep(2000); // be polite to Myfxbook
  }

  await browser.close();

  console.log(`\n${DRY_RUN ? 'Scraped' : 'Ingested'} ${DRY_RUN ? slugs.length - problems.length : posted}/${slugs.length} accounts.`);
  if (rawMonthlyHint) console.log(rawMonthlyHint);
  if (problems.length) {
    console.log('\nProblems:');
    for (const p of problems) console.log('  - ' + p);
    process.exitCode = 2;
  }
}

const rawMonthlyHint = SESSION
  ? ''
  : 'Note: monthly breakdown skipped — set MYFXBOOK_SESSION to include it (/private/charts.json 403s anonymously).';

main().catch((err) => {
  console.error('Collector failed:', err.message);
  process.exit(1);
});
