/**
 * Performance data for product pages.
 *
 * Two sources, merged:
 *
 *  1. `editorial` (below) — figures transcribed from each product's published
 *     Myfxbook record, with `sourceUrl` so any reader can verify them. This is
 *     the fallback and it is always labelled with an "as of" date.
 *
 *  2. `myfxbook-live.json` — written by scripts/sync-myfxbook.mjs. When present
 *     and fresh it overrides the editorial figures.
 *
 * Live syncing note: Myfxbook returns HTTP 403 to plain server-side requests
 * (Cloudflare bot protection), so the sync script needs a real browser engine.
 * Until that is wired up, the sanctioned live option is Myfxbook's own embed
 * widget, supplied per account via `widgetHtml` in myfxbook-accounts.json.
 *
 * `accountType` is never assumed. A demo account must never be presented as a
 * live one, so it is recorded explicitly and surfaced in the UI.
 */

import liveData from '../data/myfxbook-live.json';
import accounts from '../data/myfxbook-accounts.json';

export type AccountType = 'real' | 'demo';

export type EditorialPerf = {
  verified: boolean;
  /** Whether the tracked account holds live funds or is a demo. */
  accountType?: AccountType;
  sourceUrl?: string;
  accountId?: string;
  lastSynced?: string;
  strategy?: string;
  totalGainPct?: number;
  monthlyGainPct?: number;
  profitFactor?: number;
  totalTrades?: number;
  maxDrawdownPct?: number;
  avgWinRatePct?: number;
  minCapitalUsd?: number;
  broker?: string;
  terminal?: string;
  conflicts?: string[];
};

export type LiveStats = {
  accountType?: AccountType;
  currency?: string;
  broker?: string;
  leverage?: string;
  terminal?: string;
  sourceUrl?: string;
  accountId?: string;
  gainPct?: number;
  absGainPct?: number;
  dailyPct?: number;
  monthlyPct?: number;
  drawdownPct?: number;
  balance?: number;
  equity?: number;
  profit?: number;
  deposits?: number;
  withdrawals?: number;
  trades?: number;
  pips?: number;
  lots?: number;
  profitFactor?: number;
  sharpeRatio?: number;
  longsWon?: number;
  longsTotal?: number;
  longsWinPct?: number;
  shortsWon?: number;
  shortsTotal?: number;
  shortsWinPct?: number;
  avgTradeLength?: string;
  updatedLabel?: string;
};

export type PerfView = {
  hasData: boolean;
  verified: boolean;
  accountType?: AccountType;
  isLiveAccount: boolean;
  sourceUrl?: string;
  accountId?: string;
  widgetHtml?: string;
  lastVerified?: Date;
  stale: boolean;
  totalGainPct?: number;
  monthlyGainPct?: number;
  profitFactor?: number;
  totalTrades?: number;
  maxDrawdownPct?: number;
  avgWinRatePct?: number;
  minCapitalUsd?: number;
  terminal?: string;
  broker?: string;
  strategy?: string;
  live?: LiveStats;
  editorial?: EditorialPerf;
  conflicts: string[];
};

const MFX = 'https://www.myfxbook.com/members/Bestmt4ea';

/**
 * Figures transcribed from each published Myfxbook record (checked 2026-09-28).
 * `accountType` reflects what Myfxbook reports for the tracked account.
 */
export const editorial: Record<string, EditorialPerf> = {
  'obsidian-aether-eurusd-ea-ai-grid-scalper-for-mt5': {
    verified: true,
    accountType: 'real',
    sourceUrl: `${MFX}/obsidian-aether-eurusd-ea-ai/12080504`,
    accountId: '12080504',
    lastSynced: '2026-09-28',
    strategy: 'AI Adaptive Grid',
    totalGainPct: 147.21,
    monthlyGainPct: 22.94,
    profitFactor: 3.36,
    totalTrades: 414,
    maxDrawdownPct: 80.14,
    minCapitalUsd: 2000,
    broker: 'Fusion Markets',
    terminal: 'MetaTrader 5',
    conflicts: [
      'Product page publishes 144.04% gain / 25.01% monthly / 62.97% drawdown / PF 6.09 / 392 trades; Myfxbook shows 147.21% / 22.94% / 80.14% / 3.36 / 414.',
      'bestmt4ea.com homepage lists 15.16% monthly and 17.27% drawdown for the same account.',
      'Sharpe ratio published as 0 on the product page; Myfxbook reports 0.45.',
      'Equity was ~€1,060 against a €4,932 balance at last check, i.e. deep floating exposure on a grid system.',
    ],
  },
  'onix-stratos-xauusd-ea-ai-smart-scalper-for-mt5': {
    verified: true,
    accountType: 'demo',
    sourceUrl: `${MFX}/onix-stratos-xauusd-ea-ai/12144557`,
    accountId: '12144557',
    lastSynced: '2026-09-28',
    strategy: 'AI Smart Scalping',
    totalGainPct: 9.39,
    monthlyGainPct: 6.82,
    maxDrawdownPct: 5.54,
    minCapitalUsd: 2000,
    terminal: 'MetaTrader 5',
    conflicts: [
      'Myfxbook lists this as a DEMO account; bestmt4ea.com badges it "LIVE".',
      'Myfxbook reports -29,231 pips against a +9.39% gain, which is internally inconsistent.',
    ],
  },
  'zenith-matrix-ea-ai-gold-scalper-for-mt5': {
    verified: true,
    accountType: 'demo',
    sourceUrl: `${MFX}/zenith-matrix-xauusd-ea-ai/12049339`,
    accountId: '12049339',
    lastSynced: '2026-09-28',
    strategy: 'AI Gold Scalping',
    totalGainPct: 90.43,
    monthlyGainPct: 17.85,
    maxDrawdownPct: 47.85,
    minCapitalUsd: 1000,
    terminal: 'MetaTrader 5',
    conflicts: ['Myfxbook lists this as a DEMO account; the homepage badges it "LIVE".'],
  },
  'mythos-epic-ea-ai-gold-scalper-for-mt5': {
    verified: true,
    accountType: 'demo',
    sourceUrl: `${MFX}/mythos-epic-xauusd-ea-ai/12049330`,
    accountId: '12049330',
    lastSynced: '2026-09-28',
    strategy: 'AI Gold Scalping',
    totalGainPct: 73.65,
    monthlyGainPct: 14.53,
    maxDrawdownPct: 41.41,
    minCapitalUsd: 1000,
    terminal: 'MetaTrader 5',
    conflicts: ['Myfxbook lists this as a DEMO account; the homepage badges it "LIVE".'],
  },
  'equinox-cosmos-ea-ai-gbpjpy-scalper-for-mt5': {
    verified: true,
    accountType: 'demo',
    sourceUrl: `${MFX}/equinox-cosmos-gbpjpy-ea-ai/12033689`,
    accountId: '12033689',
    lastSynced: '2026-09-28',
    strategy: 'AI GBPJPY Scalping',
    totalGainPct: 32.66,
    monthlyGainPct: 6.85,
    maxDrawdownPct: 63.9,
    minCapitalUsd: 1000,
    terminal: 'MetaTrader 5',
    conflicts: ['Myfxbook lists this as a DEMO account; the homepage badges it "LIVE".'],
  },
  'nexora-manus-ea-ai-gold-scalper-for-mt5': {
    verified: true,
    accountType: 'demo',
    sourceUrl: `${MFX}/nexora-manus-xauusd-ea-ai/12059490`,
    accountId: '12059490',
    lastSynced: '2026-09-28',
    strategy: 'AI Gold Scalping',
    totalGainPct: 51.46,
    monthlyGainPct: 12.0,
    maxDrawdownPct: 37.4,
    minCapitalUsd: 1000,
    terminal: 'MetaTrader 5',
    conflicts: ['Myfxbook lists this as a DEMO account; the homepage badges it "LIVE".'],
  },
  'ava-aigpt5-ea': {
    verified: false,
    lastSynced: '2026-09-28',
    strategy: 'AI Gold Scalping',
    minCapitalUsd: 1000,
    terminal: 'MetaTrader 4',
    conflicts: [
      'Badged "MyFxBook Tracked" but no Myfxbook account is published, so nothing is verifiable.',
      'Homepage lists 28.5% drawdown and 12.4% monthly; the review page lists 8.5% drawdown.',
    ],
  },
  'fxcore100-ea': {
    verified: false,
    lastSynced: '2026-09-28',
    strategy: 'Multi-Currency Trend',
    minCapitalUsd: 1000,
    terminal: 'MetaTrader 4',
    conflicts: [
      'Badged "MyFxBook Tracked" but no Myfxbook account is published.',
      'Homepage lists 6.4% monthly / 29.5% drawdown; the review page lists 6-12% / 9.5%.',
    ],
  },
  'elysium-vortex-eurcad-ea-ai-eurcad-scalper-for-mt5': {
    verified: false,
    lastSynced: '2026-09-28',
    strategy: 'AI EURCAD Scalping',
    minCapitalUsd: 1000,
    terminal: 'MetaTrader 5',
    conflicts: ['Badged "MyFxBook Tracked" but no Myfxbook account is published.'],
  },
  'apex-quant-ea-ai-bitcoin-scalper-for-mt5': {
    verified: false,
    lastSynced: '2026-09-28',
    strategy: 'AI Bitcoin Scalping',
    minCapitalUsd: 500,
    terminal: 'MetaTrader 5',
    conflicts: [
      'Gain listed as 82% on the directory page and N/A on the product page.',
      'Monthly listed as 14.2% on one page and 10-20% on another.',
    ],
  },
};

type LiveFile = {
  fetchedAt?: string | null;
  staleAfterDays?: number;
  accounts?: Record<string, LiveStats>;
};

const live: LiveFile = liveData as LiveFile;

const accountConfig = accounts as Record<
  string,
  { accountId?: string; accountUrl?: string; widgetHtml?: string } | string
>;

export function getWidgetHtml(slug: string): string | undefined {
  const entry = accountConfig[slug];
  return typeof entry === 'object' ? entry.widgetHtml : undefined;
}

/** Merged view used by the product page. */
export function getPerformance(slug: string): PerfView | undefined {
  const edit = editorial[slug];
  const liveStats = live.accounts?.[slug];
  const widgetHtml = getWidgetHtml(slug);

  if (!edit && !liveStats && !widgetHtml) return undefined;

  const fetchedAt = live.fetchedAt ? new Date(live.fetchedAt) : undefined;
  const staleAfterDays = live.staleAfterDays ?? 3;
  const stale = fetchedAt ? Date.now() - fetchedAt.getTime() > staleAfterDays * 86_400_000 : true;

  // Live data wins, but the editorial record is authoritative about account type
  // until a sync actually confirms it.
  const accountType = liveStats?.accountType ?? edit?.accountType;

  return {
    hasData: Boolean(edit || liveStats),
    verified: Boolean(edit?.verified || liveStats),
    accountType,
    isLiveAccount: accountType === 'real',
    sourceUrl: liveStats?.sourceUrl ?? edit?.sourceUrl,
    accountId: liveStats?.accountId ?? edit?.accountId,
    widgetHtml,
    lastVerified: fetchedAt ?? (edit?.lastSynced ? new Date(edit.lastSynced) : undefined),
    stale,
    totalGainPct: liveStats?.gainPct ?? edit?.totalGainPct,
    monthlyGainPct: liveStats?.monthlyPct ?? edit?.monthlyGainPct,
    profitFactor: liveStats?.profitFactor ?? edit?.profitFactor,
    totalTrades: liveStats?.trades ?? edit?.totalTrades,
    maxDrawdownPct: liveStats?.drawdownPct ?? edit?.maxDrawdownPct,
    avgWinRatePct: edit?.avgWinRatePct,
    minCapitalUsd: edit?.minCapitalUsd,
    terminal: liveStats?.terminal ?? edit?.terminal,
    broker: liveStats?.broker ?? edit?.broker,
    strategy: edit?.strategy,
    live: liveStats,
    editorial: edit,
    conflicts: edit?.conflicts ?? [],
  };
}
