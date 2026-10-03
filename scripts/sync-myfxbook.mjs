/**
 * Myfxbook performance sync.
 *
 * Myfxbook publishes no supported public API for account statistics, so this
 * reads the public account page and extracts the published figures into
 * src/data/myfxbook-live.json, which the product pages consume at build time.
 *
 * Because this is screen-derived:
 *   - it is deliberately tolerant (multiple patterns per metric),
 *   - it records `accountType` (Real / Demo) so the UI can never mislabel one,
 *   - it stamps `fetchedAt`, and the UI degrades to "not verified" when the
 *     data is older than STALE_AFTER_DAYS.
 *
 * A parsing failure is never silently ignored: the metric is omitted and the
 * run reports it, because publishing a wrong performance number is worse than
 * publishing none.
 *
 * Usage:
 *   node scripts/sync-myfxbook.mjs            # all mapped accounts
 *   node scripts/sync-myfxbook.mjs --debug    # dump text + parsed values
 *   node scripts/sync-myfxbook.mjs <slug>     # one account
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

const ACCOUNTS_FILE = 'src/data/myfxbook-accounts.json';
const OUT_FILE = 'src/data/myfxbook-live.json';
const STALE_AFTER_DAYS = 3;

const args = process.argv.slice(2);
const DEBUG = args.includes('--debug');
const onlySlug = args.find((a) => !a.startsWith('--'));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ----------------------------------------------------------------- text */

const NAMED = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  hellip: '…', mdash: '—', ndash: '–', euro: '€', pound: '£', dollar: '$',
  lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”',
};

function decodeEntities(input = '') {
  return String(input)
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&([a-z]+);/gi, (m, name) => NAMED[name.toLowerCase()] ?? m);
}

/** Flatten the account page to text with row separators kept. */
function htmlToText(html) {
  const stripped = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(tr|div|p|li|h[1-6]|table)>/gi, '\n')
    .replace(/<\/t[dh]>/gi, ' | ');
  return decodeEntities(stripped)
    .replace(/<[^>]+>/g, '')
    .replace(/[ \t\u00a0]+/g, ' ')
    .replace(/\n\s*\n+/g, '\n')
    .trim();
}

/* ----------------------------------------------------------------- parse */

/** Try each pattern in order; return the first capture group that matches. */
function pick(text, patterns) {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match?.[1] != null) return match[1].trim();
  }
  return undefined;
}

/** "€4,932.28" / "-€95.20" / "€-95.20" -> signed number */
function toNumber(value) {
  if (value == null) return undefined;
  const cleaned = String(value).replace(/[^\d.,-]/g, '').replace(/,/g, '');
  if (cleaned === '' || cleaned === '-') return undefined;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : undefined;
}

function parsePercent(value) {
  return toNumber(value);
}

function parseAccount(text) {
  const missing = [];
  const need = (key, value) => {
    if (value === undefined) missing.push(key);
    return value;
  };

  // Header line: "Real (EUR), Fusion Markets, Technical, Automated, 1:500, MetaTrader 5"
  const headerMatch = text.match(/(Real|Demo)\s*\(([A-Z]{3})\)\s*,([^\n]+)/i);
  const accountType = headerMatch ? headerMatch[1].toLowerCase() : undefined;
  const currency = headerMatch?.[2];
  const headerParts = (headerMatch?.[3] ?? '').split(',').map((s) => s.trim()).filter(Boolean);
  const broker = headerParts[0];
  const leverage = headerParts.find((p) => /^\d+:\d+$/.test(p));
  const terminal = headerParts.find((p) => /MetaTrader/i.test(p));
  if (!accountType) missing.push('accountType');

  const stats = {
    accountType,
    currency,
    broker,
    leverage,
    terminal,

    gainPct: parsePercent(
      need('gainPct', pick(text, [/Gain\s*:?\s*\|?\s*([+-]?[\d.,]+)\s*%/i, /Gain\s*:?\s*([+-]?[\d.,]+%)/i])),
    ),
    absGainPct: parsePercent(
      need('absGainPct', pick(text, [/Abs\.?\s*Gain\s*:?\s*\|?\s*([+-]?[\d.,]+)\s*%/i])),
    ),
    dailyPct: parsePercent(pick(text, [/Daily\s*\|?\s*([\d.,]+)\s*%/i, /Daily\s*([\d.,]+%)/i])),
    monthlyPct: parsePercent(
      need('monthlyPct', pick(text, [/Monthly\s*:?\s*\|?\s*([\d.,]+)\s*%/i, /Monthly\s*:?\s*([\d.,]+%)/i])),
    ),
    drawdownPct: parsePercent(
      need('drawdownPct', pick(text, [/Drawdown\s*:?\s*\|?\s*([\d.,]+)\s*%/i, /Drawdown\s*:?\s*([\d.,]+%)/i])),
    ),
    balance: toNumber(pick(text, [/Balance\s*:?\s*\|?\s*([-€$£]?[\d.,]+)/i])),
    profit: toNumber(pick(text, [/Profit\s*:?\s*\|?\s*([-€$£]?[\d.,]+)/i])),
    interest: toNumber(pick(text, [/Interest\s*:?\s*\|?\s*([-€$£]?[\d.,]+)/i])),
    deposits: toNumber(pick(text, [/Deposits\s*:?\s*\|?\s*([-€$£]?[\d.,]+)/i])),
    withdrawals: toNumber(pick(text, [/Withdrawals\s*:?\s*\|?\s*([-€$£]?[\d.,]+)/i])),

    trades: toNumber(pick(text, [/Trades\s*:?\s*\|?\s*([\d,]+)/i])),
    pips: toNumber(pick(text, [/Pips\s*:?\s*\|?\s*([-\d.,]+)/i])),
    lots: toNumber(pick(text, [/Lots\s*:?\s*\|?\s*([\d.,]+)/i])),
    commissions: toNumber(pick(text, [/Commissions\s*:?\s*\|?\s*([-€$£]?[\d.,]+)/i])),
    profitFactor: toNumber(pick(text, [/Profit Factor\s*:?\s*\|?\s*([\d.,]+)/i])),
    sharpeRatio: toNumber(pick(text, [/Sharpe Ratio\s*:?\s*\|?\s*([-\d.,]+)/i])),
    standardDeviation: toNumber(pick(text, [/Standard Deviation\s*:?\s*\|?\s*([-€$£]?[\d.,]+)/i])),
    expectancyPips: toNumber(pick(text, [/Expectancy\s*\|?\s*([-\d.,]+)\s*Pips/i])),
    expectancyMoney: toNumber(pick(text, [/Expectancy\s*\|?\s*[-\d.,]+\s*Pips\s*\/\s*([-€$£]?[\d.,]+)/i])),
    avgWinPips: toNumber(pick(text, [/Average Win\s*:?\s*\|?\s*([\d.,]+)\s*pips/i])),
    avgWinMoney: toNumber(pick(text, [/Average Win\s*:?\s*\|?\s*[\d.,]+\s*pips\s*\/\s*([-€$£]?[\d.,]+)/i])),
    avgLossPips: toNumber(pick(text, [/Average Loss\s*:?\s*\|?\s*(-[\d.,]+)\s*pips/i])),
    avgLossMoney: toNumber(pick(text, [/Average Loss\s*:?\s*\|?\s*-[\d.,]+\s*pips\s*\/\s*(-?[-€$£]?[\d.,]+)/i])),
    bestTradeMoney: toNumber(pick(text, [/Best Trade \([€$£]\)\s*:?\s*\|?\s*\(?[^)]*\)?\s*([-€$£]?[\d.,]+)/i])),
    worstTradeMoney: toNumber(pick(text, [/Worst Trade \([€$£]\)\s*:?\s*\|?\s*\(?[^)]*\)?\s*(-[-€$£]?[\d.,]+)/i])),
    bestTradePips: toNumber(pick(text, [/Best Trade \(Pips\)\s*:?\s*\|?\s*\(?[^)]*\)?\s*([\d.,]+)/i])),
    worstTradePips: toNumber(pick(text, [/Worst Trade \(Pips\)\s*:?\s*\|?\s*\(?[^)]*\)?\s*(-[\d.,]+)/i])),
    avgTradeLength: pick(text, [/Avg\.?\s*Trade Length\s*:?\s*\|?\s*([\w\s.]+?)\s*(?:\n|\|)/i]),
    updatedLabel: pick(text, [/Updated\s*\|?\s*([^\n|]+)/i]),
  };

  const longs = text.match(/Longs Won\s*:?\s*\|?\s*\((\d+)\s*\/\s*(\d+)\)\s*([\d]+)\s*%/i);
  const shorts = text.match(/Shorts Won\s*:?\s*\|?\s*\((\d+)\s*\/\s*(\d+)\)\s*([\d]+)\s*%/i);
  if (longs) {
    stats.longsWon = Number(longs[1]);
    stats.longsTotal = Number(longs[2]);
    stats.longsWinPct = Number(longs[3]);
  }
  if (shorts) {
    stats.shortsWon = Number(shorts[1]);
    stats.shortsTotal = Number(shorts[2]);
    stats.shortsWinPct = Number(shorts[3]);
  }

  return { stats, missing };
}

/* ------------------------------------------------------------------ run */

async function fetchAccount(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      'Sec-Ch-Ua': '"Chromium";v="125", "Not.A/Brand";v="24"',
      'Sec-Ch-Ua-Mobile': '?0',
      'Sec-Ch-Ua-Platform': '"Windows"',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-User': '?1',
      'Upgrade-Insecure-Requests': '1',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

async function main() {
  const accounts = JSON.parse(await readFile(ACCOUNTS_FILE, 'utf8'));
  const slugs = Object.keys(accounts).filter((k) => !k.startsWith('_') && (!onlySlug || k === onlySlug));

  const result = { fetchedAt: new Date().toISOString(), staleAfterDays: STALE_AFTER_DAYS, accounts: {} };
  const problems = [];

  for (const slug of slugs) {
    const { accountUrl, accountId } = accounts[slug];
    process.stdout.write(`Syncing ${slug} ... `);
    try {
      const html = await fetchAccount(accountUrl);
      const text = htmlToText(html);
      if (DEBUG) {
        console.log('\n--- first 4000 chars of text ---\n' + text.slice(0, 4000));
      }
      const { stats, missing } = parseAccount(text);
      stats.sourceUrl = accountUrl;
      stats.accountId = accountId;
      result.accounts[slug] = stats;
      if (missing.length) {
        problems.push(`${slug}: could not parse -> ${missing.join(', ')}`);
        console.log(`partial (${missing.length} missing)`);
      } else {
        console.log(`ok  gain=${stats.gainPct}%  dd=${stats.drawdownPct}%  type=${stats.accountType}`);
      }
    } catch (err) {
      problems.push(`${slug}: fetch failed -> ${err.message}`);
      console.log(`FAILED: ${err.message}`);
    }
    await sleep(1500); // be polite to Myfxbook
  }

  await mkdir(dirname(OUT_FILE), { recursive: true });
  await writeFile(OUT_FILE, JSON.stringify(result, null, 2), 'utf8');

  console.log(`\nWrote ${OUT_FILE} (${Object.keys(result.accounts).length} accounts)`);
  if (problems.length) {
    console.log('\nProblems:');
    for (const p of problems) console.log(`  - ${p}`);
    process.exitCode = 2;
  }
}

main().catch((err) => {
  console.error('Sync failed:', err.message);
  process.exit(1);
});
