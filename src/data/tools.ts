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
