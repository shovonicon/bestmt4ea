/**
 * Site configuration for the BESTMT4EA rebuild.
 *
 * bestmt4ea.com  = main store / licensing site (10 years live)
 * strivealgo.com = secondary marketing + review directory
 */

const url = (import.meta.env.PUBLIC_SITE_URL || 'https://bestmt4ea.com').replace(/\/$/, '');

export const site = {
  name: 'BESTMT4EA',
  legalName: 'Strive Algo',
  tagline: 'AI-Powered Forex Expert Advisors for MT4 & MT5',
  description:
    'Myfxbook-verified MT4 and MT5 expert advisors for XAUUSD, EURUSD and major pairs. Live-traded on real accounts before release.',
  /** Default social-share card (Open Graph / Twitter); a page can override it. */
  ogImage: '/media/og-banner.png',
  url,
  reviewSiteUrl: 'https://strivealgo.com',
  contactEmail: import.meta.env.PUBLIC_CONTACT_EMAIL || 'bestmt4ea@gmail.com',
  telegram: {
    support: 'https://t.me/pizion',
    community: 'https://t.me/millionaireeliteclub',
  },
  myfxbook: 'https://www.myfxbook.com/members/Bestmt4ea',

  /** Cloudflare Turnstile site key (public; the widget is rendered from it). */
  turnstileSiteKey: import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || '0x4AAAAAAFPByHrDou0ULSww',

  /** AdSense. Leave PUBLIC_ADSENSE_CLIENT unset to disable all ad units. */
  adsenseClient: import.meta.env.PUBLIC_ADSENSE_CLIENT || '',
  /**
   * Ad slot IDs from the AdSense dashboard. Named so placements stay
   * deliberate: in-article units are the ones that stay policy-safe.
   */
  adSlots: {
    inArticle: import.meta.env.PUBLIC_ADSENSE_SLOT_IN_ARTICLE || '6721931734',
    sidebar: import.meta.env.PUBLIC_ADSENSE_SLOT_SIDEBAR || '6721931734',
    belowContent: import.meta.env.PUBLIC_ADSENSE_SLOT_BELOW || '6721931734',
    /** Sticky vertical rails either side of the post reading column. */
    railLeft: import.meta.env.PUBLIC_ADSENSE_SLOT_RAIL_LEFT || import.meta.env.PUBLIC_ADSENSE_SLOT_SIDEBAR || '6721931734',
    railRight: import.meta.env.PUBLIC_ADSENSE_SLOT_RAIL_RIGHT || import.meta.env.PUBLIC_ADSENSE_SLOT_SIDEBAR || '6721931734',
  },
} as const;

/** Risk disclaimer shown on every page that carries performance data. */
export const RISK_DISCLAIMER =
  'Past performance is not indicative of future results. Trading forex and CFDs carries a high level of risk and can result in the loss of all of your capital. The results shown are specific to the broker, account type and settings used on the tracked account and will differ elsewhere. Nothing on this site is financial advice.';

/** Editorial standards for long-form posts, enforced by scripts/check-content.mjs. */
export const EDITORIAL = {
  /** Posts must fall inside this band. */
  minWords: 3500,
  maxWords: 7500,
  /** Two posts above this Jaccard similarity on 8-word shingles are flagged as duplicates. */
  duplicateThreshold: 0.25,
  /** Minimum internal links per post (topical clustering for SEO). */
  minInternalLinks: 4,
  /** Minimum outbound citations to primary sources (E-E-A-T). */
  minCitations: 2,
} as const;
