/**
 * Trading tools registry — ported from the reference `lib/tools-data.ts`
 * (Strive Algo). Drives `/tools/` and the `/tools/<slug>/` pages.
 *
 * `icon` is a key into the icon map in `src/pages/tools/index.astro`; the
 * `category` decides the label and lets a tool be withdrawn by flipping
 * `available`.
 */

export type ToolCategory = 'live-data' | 'calculator';

export interface TradingTool {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  category: ToolCategory;
  icon: string;
  available: boolean;
}

/**
 * Platform installers.
 *
 * These are files, not web tools, so they deliberately do not live in
 * `TRADING_TOOLS`: that list drives `/tools/<slug>/`, and an installer has no
 * page to open — the card *is* the download. They are hosted in the public R2
 * bucket so anyone can take one without an account, which is the same deal as
 * every other free tool here.
 *
 * The MT4 build is also the file the licence-build runner installs (the
 * `MT4_INSTALLER_URL` repo secret points at the same object), so if these move,
 * that secret has to move with them.
 */
export interface PlatformDownload {
  name: string;
  shortName: string;
  description: string;
  platform: 'MT4' | 'MT5';
  fileKey: string;
  sizeLabel: string;
}

export const PLATFORM_DOWNLOADS: PlatformDownload[] = [
  {
    name: 'MetaTrader 4 Terminal',
    shortName: 'MT4 Terminal',
    description:
      'The Exness build of MetaTrader 4 for Windows. Install it to run any MT4 expert advisor or indicator, including every system on this site.',
    platform: 'MT4',
    fileKey: 'tools/exness4setup.exe',
    sizeLabel: '1.3 MB',
  },
  {
    name: 'MetaTrader 5 Terminal',
    shortName: 'MT5 Terminal',
    description:
      'The Exness build of MetaTrader 5 for Windows. Needed for MT5 robots — MT4 cannot run MT5 code, and the two terminals install side by side without conflict.',
    platform: 'MT5',
    fileKey: 'tools/exness5setup.exe',
    sizeLabel: '5.1 MB',
  },
];

export const TRADING_TOOLS: TradingTool[] = [
  {
    slug: 'live-forex-rates',
    name: 'Live Forex Rates',
    shortName: 'Forex Rates',
    description:
      'Real-time bid/ask prices for major, minor, and exotic currency pairs updated every second.',
    category: 'live-data',
    icon: 'activity',
    available: true,
  },
  {
    slug: 'live-charts',
    name: 'Live Trading Charts',
    shortName: 'Live Charts',
    description:
      'Interactive TradingView charts with technical indicators, drawing tools, and multi-timeframe analysis.',
    category: 'live-data',
    icon: 'candlestick',
    available: true,
  },
  {
    slug: 'economic-calendar',
    name: 'Economic Calendar',
    shortName: 'Eco Calendar',
    description:
      'Upcoming high-impact news events, central bank decisions, and economic data releases with expected vs actual values.',
    category: 'live-data',
    icon: 'calendar',
    available: true,
  },
  {
    slug: 'pip-calculator',
    name: 'Pip Value Calculator',
    shortName: 'Pip Calculator',
    description:
      'Calculate the monetary value of a single pip for any currency pair, lot size, and account currency.',
    category: 'calculator',
    icon: 'hash',
    available: true,
  },
  {
    slug: 'position-size-calculator',
    name: 'Position Size Calculator',
    shortName: 'Position Size',
    description:
      'Determine the optimal lot size based on your account balance, risk percentage, and stop loss distance.',
    category: 'calculator',
    icon: 'target',
    available: true,
  },
  {
    slug: 'profit-loss-calculator',
    name: 'Profit/Loss Calculator',
    shortName: 'Profit/Loss',
    description:
      'Estimate potential profit or loss for a trade based on entry price, exit price, and position size.',
    category: 'calculator',
    icon: 'trending-up',
    available: true,
  },
  {
    slug: 'compounding-calculator',
    name: 'Compounding Calculator',
    shortName: 'Compounding',
    description:
      'Project account growth over time with compound interest based on monthly return percentage and reinvestment.',
    category: 'calculator',
    icon: 'bar-chart',
    available: true,
  },
  {
    slug: 'lot-size-calculator',
    name: 'Lot Size Calculator',
    shortName: 'Lot Size',
    description: 'Convert between standard, mini, and micro lots and calculate the notional value of your position.',
    category: 'calculator',
    icon: 'layers',
    available: true,
  },
  {
    slug: 'margin-calculator',
    name: 'Margin Calculator',
    shortName: 'Margin',
    description: 'Calculate the required margin for opening a position based on leverage, lot size, and currency pair.',
    category: 'calculator',
    icon: 'shield',
    available: true,
  },
  {
    slug: 'risk-reward-calculator',
    name: 'Risk/Reward Calculator',
    shortName: 'Risk/Reward',
    description: 'Evaluate trade setups by comparing potential reward to risk with visual ratio analysis.',
    category: 'calculator',
    icon: 'scale',
    available: true,
  },
  {
    slug: 'drawdown-calculator',
    name: 'Drawdown Calculator',
    shortName: 'Drawdown',
    description: 'Calculate recovery requirements after a drawdown and model worst-case equity curve scenarios.',
    category: 'calculator',
    icon: 'trending-down',
    available: true,
  },
  {
    slug: 'swap-calculator',
    name: 'Swap Calculator',
    shortName: 'Swap',
    description: 'Estimate overnight swap fees for holding positions across daily rollover based on broker rates.',
    category: 'calculator',
    icon: 'repeat',
    available: true,
  },
];

export const getAvailableTools = (): TradingTool[] => TRADING_TOOLS.filter((tool) => tool.available);
export const getToolBySlug = (slug: string): TradingTool | undefined =>
  TRADING_TOOLS.find((tool) => tool.slug === slug);
