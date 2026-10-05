/**
 * Central affiliate registry.
 *
 * Every affiliate or partner URL lives here — never hard-code a tracking URL in
 * content. Consumers render through `AffiliateLink` / `AffiliateCta`, which apply
 * `rel="sponsored nofollow noopener"` and the disclosure requirement.
 *
 * Policy: an affiliate link must never sit adjacent to a download button.
 */

export type AffiliateProgram = 'broker' | 'platform' | 'service' | 'product';

export interface AffiliateOffer {
  /** Human label used in listings and tables. */
  label: string;
  /** Destination URL, including any tracking parameters. */
  url: string;
  program: AffiliateProgram;
  /** Optional one-line description for CTA components. */
  note?: string;
  /** Official brand logo served from `public/`. */
  logo?: string;
}

export const affiliates = {
  roboforex: {
    label: 'RoboForex',
    url: 'https://my.roboforex.com/en/?a=lwek',
    program: 'broker',
    note: 'FSC Belize · from $10 · MT4, MT5, RTrader',
    logo: '/media/brands/roboforex.svg',
  },
  exness: {
    label: 'Exness',
    url: 'https://one.exness.link/a/te38he38',
    program: 'broker',
    note: 'FCA, CySEC · from $1 · free VPS',
    logo: '/media/brands/exness.svg',
  },
  'fusion-markets': {
    label: 'Fusion Markets',
    url: 'https://fusionmarkets.com/?refcode=111982',
    program: 'broker',
    note: 'Seychelles FSA · from $10 · zero-spread accounts',
  },
  xm: {
    label: 'XM',
    url: 'https://clicks.pipaffiliates.com/c?c=210814&l=en&p=0',
    program: 'broker',
    note: 'ASIC, CySEC, FCA · from $5',
  },
  fbs: {
    label: 'FBS',
    url: 'https://fbs.partners/?ibl=238183&ibp=2416958',
    program: 'broker',
    note: 'ASIC, CySEC, FCA · from $10',
  },
  markets4you: {
    label: 'Markets4you',
    url: 'https://www.markets4you.online/?affid=u7k2fpy',
    program: 'broker',
    note: 'BVI FSC · from $1',
  },
  icmarkets: {
    label: 'IC Markets',
    url: 'https://icmarkets.com/?camp=74056',
    program: 'broker',
    note: 'Seychelles FSA · from $200 · raw spreads',
  },
  avatrade: {
    label: 'AvaTrade',
    url: 'https://www.avatrade.com/?act=show-real-registry&tag=193586',
    program: 'broker',
    note: 'ASIC, FSCA · from $100',
  },
  vantage: {
    label: 'Vantage',
    url: 'https://www.vantagemarkets.com/open-live-account/?affid=MTQxOTM5',
    program: 'broker',
    note: 'FCA · from $100',
  },
  xbtfx: {
    label: 'XBTFX',
    url: 'https://my.xbtfx.io/register?xbt=6854',
    program: 'broker',
    note: 'ASIC, CySEC, FCA · from $10',
  },
  fxtm: {
    label: 'FXTM',
    url: 'http://www.forextime.com/register/open-account?raf=f4ee50ae',
    program: 'broker',
    note: 'FSC Mauritius · from $10',
  },
  binance: {
    label: 'Binance',
    url: 'https://accounts.binance.com/register?ref=135593621',
    program: 'platform',
    note: 'Crypto exchange · DASP',
  },
  tradingview: {
    label: 'TradingView',
    url: 'https://www.tradingview.com/?aff_id=122391',
    program: 'platform',
    note: 'Charting platform · free tier',
  },
} as const satisfies Record<string, AffiliateOffer>;

export type AffiliateKey = keyof typeof affiliates;

/** rel applied to every sponsored outbound link. */
export const AFFILIATE_REL = 'sponsored nofollow noopener';

/** Visible disclosure shown on any page that carries an affiliate link. */
export const AFFILIATE_DISCLOSURE =
  'Some links on this page are affiliate links. If you open one and sign up, we may earn a commission at no extra cost to you. It never changes what we publish.';

export function getAffiliate(key: string): AffiliateOffer | undefined {
  return (affiliates as Record<string, AffiliateOffer>)[key];
}
