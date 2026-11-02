# Search Console Indexing — Action Plan

**Date:** 2026-11-02  
**Source:** Search Console coverage exports + redirect manifest cross-reference

## Summary

Google indexes **152 URLs** (+ homepage). Of those, **126 have no content and no redirect rule** — they return a blank 404 to Googlebot. Additionally, **102 URLs** in the "Not found (404)" report have no redirect rule either.

### Breakdown of the 126 indexed-but-missing URLs

| Action | Count | Description |
|--------|-------|-------------|
| **REWRITE** | 36 | Educational/guide content — restore as new 3,500–7,500-word posts at the same slug |
| **301 REDIRECT** | 82 | EA/indicator downloads and reviews without source files — redirect to closest live content |
| **Already OK** | 5 | 2 live products + 3 existing 301 rules (live-chart, broker-reviews, fundamental-analysis) |
| **Category pages** | 4 | Paginated category URLs — redirect to category root |
| **Total** | ~126 | |

---

## GROUP 1 — REWRITE as new posts (36 slugs)

These are educational/strategy topics that can be written from scratch. Each needs:
- 3,500–7,500 words, Alex Hormozi copy framework
- A `download:` block (checklist, calculator, template, preset, or indicator)
- 4+ internal links using `url()` from `src/lib/urls.ts`
- Remove any 410 rule from the manifest in the same change

### Beginner guides (8)
1. `what-is-forex-trading-for-absolute-beginners` — Forex trading for beginners
2. `what-is-a-pip-in-forex-simple-explanation-the-ultimate-beginner-friendly-guide` — What is a pip
3. `how-does-the-forex-market-work-explained-simply-the-ultimate-beginners-guide` — How forex market works
4. `how-to-fund-a-forex-account-safely-10-powerful-steps-every-trader-must-follow` — Funding a forex account
5. `how-to-calculate-risk-reward-ratio-in-forex-powerful-guide-for-traders` — Risk-reward ratio
6. `7-powerful-reasons-why-the-best-leverage-for-beginners-in-forex-leads-to-safer-profits` — Leverage for beginners
7. `top-10-best-mobile-apps-for-learning-forex-trading-free` — Mobile apps for learning forex
8. `best-eur-usd-trading-strategies-for-beginners` — EURUSD strategies for beginners

### Technical analysis & strategy (10)
9. `how-to-identify-support-and-resistance-in-forex-proven-strategies-for-traders` — S&R identification
10. `fibonacci-time-zones-trading-strategy-7-powerful-techniques-for-consistent-market-success` — Fibonacci time zones
11. `harmonic-patterns-in-forex-trading-guide` — Harmonic patterns guide
12. `10-powerful-reasons-why-what-are-harmonic-patterns-in-forex-trading-can-improve-your-market-results` — Harmonic patterns deep dive
13. `understanding-the-dragonfly-doji-at-support-level` — Dragonfly doji pattern
14. `trendline-breakout-vs-false-breakout-how-to-identify-and-trade-them-effectively` — Trendline breakout guide
15. `bollinger-band-width-indicator-trading-strategy` — Bollinger Band width strategy
16. `10-best-adx-indicator-strategy-settings-for-mt4-powerful-secrets-for-winning-trades` — ADX settings for MT4
17. `7-powerful-ways-a-free-qqe-indicator-with-alerts-for-trend-confirmation-can-transform-your-trading` — QQE indicator guide
18. `volumetric-inverse-fair-value-gap-detection-in-cryptocurrency-trading` — Fair value gaps in crypto

### EA & trading tools (8)
19. `9-powerful-mt4-ea-optimization-settings-for-eurusd-m5-to-boost-performance-fast` — EA optimization settings
20. `mt4-journal-common-ea-error-messages-and-fixes-17-powerful-ways-to-solve-expert-advisor-issues` — EA error messages guide
21. `10-powerful-tips-for-the-safe-way-to-remove-mt4-expert-advisor-without-errors` — Safe EA removal
22. `monte-carlo-test-for-mt4-backtesting-the-complete-robustness-guide-for-traders` — Monte Carlo testing
23. `how-to-calculate-sortino-ratio-for-forex-eas-7-powerful-steps-to-improve-trading-performance` — Sortino ratio for EAs
24. `10-best-free-tools-for-analyzing-mt4-robot-drawdowns-powerful-guide-for-safe-forex-trading` — Free drawdown analysis tools
25. `long-form-article-donchian-channel-breakout-ea-for-commodity-trading-powerful-guide-to-automated-market-success` — Donchian channel EA guide
26. `10-powerful-ways-to-improve-daily-drawdown-protection-for-prop-firms-via-ea-including-pro-tips` — Prop firm drawdown protection

### Trading psychology & risk (4)
27. `7-powerful-ways-to-recover-from-a-losing-forex-trading-streak-and-come-back-stronger` — Losing streak recovery
28. `7-powerful-reasons-why-markets-rally-when-bad-news-comes-out-and-what-investors-should-know` — Why markets rally on bad news
29. `top-12-powerful-requirements-for-trading-forex-full-time-2` — Full-time trading requirements
30. `10-powerful-paper-trading-strategies-to-test-before-real-money-investment` — Paper trading strategies

### Scalping strategies (2)
31. `10-powerful-reasons-scalping-with-heikin-ashi-candles-can-boost-your-trading-success` — Heikin-Ashi scalping
32. `tdi-bounce-forex-scalping-strategy-7-powerful-secrets-for-consistent-profits` — TDI bounce strategy

### Other guides (4)
33. `the-ultimate-guide-to-the-best-forex-brokers-for-expert-advisors` — Best brokers for EAs
34. `king-iq-option-indicator-system-the-ultimate-powerful-strategy-guide` — IQ option indicator strategy
35. `top-10-powerful-team-trading-prop-firm-options-for-modern-traders` — Team trading prop firms
36. `7-critical-risks-of-what-is-a-martingale-strategy-in-forex-risks-and-how-traders-can-avoid-them-2` — Martingale risks

---

## GROUP 2 — 301 REDIRECT to live content (82 URLs)

These are EA downloads, indicator downloads, and reviews where we don't have the actual
EA/indicator files. They cannot satisfy the `download:` block requirement with a real
resource. Redirect to the closest hub page.

### EA free-download pages → `/best-forex-ea/` (20)

| Slug | Target |
|------|--------|
| `alphaflow-ea-free-download-powerful-guide-to-safe-smart-access` | `/best-forex-ea/` |
| `forex-robotron-ea-free-download-7-powerful-facts-you-must-know-before-installing` | `/best-forex-ea/` |
| `konstatine-robot-ea-free-download-7-powerful-facts-every-trader-must-know-before-installing` | `/best-forex-ea/` |
| `orbit-rage-final-ea-free-download-7-powerful-facts-you-must-know-before-installing` | `/best-forex-ea/` |
| `fundedea-prop-firm-ea-free-download-powerful-7-step-guide-to-smarter-funded-trading` | `/best-forex-ea/` |
| `budak-ubat-ea-free-download-7-powerful-facts-you-must-know-before-installing` | `/best-forex-ea/` |
| `gps-forex-robot-ea-free-download-7-powerful-truths-you-must-know-before-installing` | `/best-forex-ea/` |
| `ai-price-action-robot-free-download-the-ultimate-guide-to-safe-smart-trading` | `/best-forex-ea/` |
| `the-monetree-ea-free-download-7-powerful-facts-before-you-install-it` | `/best-forex-ea/` |
| `firestorm-odin-ea-v3-free-download-7-powerful-truths-you-must-know-before-you-try-it` | `/best-forex-ea/` |
| `north-east-way-ea-free-download-the-ultimate-safe-smart-2025-guide` | `/best-forex-ea/` |
| `best-forex-scalping-ea-free-download-7-powerful-truths-you-must-know-before-using-one` | `/best-forex-ea/` |
| `titan-scalper-ea-free-download-7-powerful-truths-every-trader-must-know-before-installing` | `/best-forex-ea/` |
| `crownprincefx-ea-free-download-the-ultimate-beginner-to-pro-guide` | `/best-forex-ea/` |
| `algotradesoft-innovative-ea-free-download-7-powerful-benefits-honest-insights-you-must-know` | `/best-forex-ea/` |
| `force-investor-ea-free-download-7-powerful-facts-honest-insights-smart-tips` | `/best-forex-ea/` |
| `advanced-scalper-forex-ea-mt4-free-download-7-powerful-secrets-every-trader-must-know` | `/best-forex-ea/` |
| `ai-gen-xii-chatgpt-ea-free-download-7-powerful-facts-you-must-know-before-installing` | `/best-forex-ea/` |
| `marketmaker-pro-ea-free-download-the-ultimate-guide-to-smart-automated-trading-success` | `/best-forex-ea/` |
| `mpx-scalper-free-forex-indicator-download-shocking-truth-11-safe-steps` | `/best-forex-ea/` |

### EA review pages → `/blog/` (14)

| Slug | Target |
|------|--------|
| `egcx-gold-bot-pro-ea-7-powerful-reasons-traders-are-switching-to-this-advanced-gold-trading-system` | `/blog/` |
| `infinite-wave-forex-ea-reviews-7-shocking-facts-smart-traders-must-know` | `/blog/` |
| `ea-new-player-forex-ea-reviews-7-powerful-insights-every-trader-must-know` | `/blog/` |
| `ai-forex-robot-forex-ea-reviews-9-powerful-truths-every-trader-must-know-before-buying` | `/blog/` |
| `ea-gold-stuff-forex-ea-reviews-powerful-insights-honest-pros-performance-breakdown` | `/blog/` |
| `ea-gold-algo-forex-ea-reviews-7-powerful-truths-every-trader-must-know` | `/blog/` |
| `algotradesoft-innovative-ea-7-powerful-reasons-its-a-game-changer-for-smart-traders` | `/blog/` |
| `zeno-forex-ea-reviews-7-powerful-truths-every-trader-must-know-before-investing` | `/blog/` |
| `true-strength-index-tsi-divergence-ea-free-version-powerful-insights-for-smarter-trading` | `/blog/` |
| `gold-trade-forex-ea-reviews-7-powerful-insights-you-must-know-before-investing` | `/blog/` |
| `nova-gold-x-forex-ea-reviews-7-powerful-truths-you-must-know-before-investing` | `/blog/` |
| `prizmal-lux-forex-ea-reviews-7-powerful-truths-every-trader-must-know-before-investing` | `/blog/` |
| `the-gold-phantom-forex-ea-reviews-7-shocking-truths-every-trader-must-know-before-investing` | `/blog/` |
| `xau-master-ea-forex-ea-reviews-7-powerful-truths-every-trader-must-know-before-investing` | `/blog/` |

### Indicator download pages → `/blog/` (22)

| Slug | Target |
|------|--------|
| `📈-buy-sell-forex-indicator-free-download-powerful-proven-7-step-guide-for-smart-trading` | `/blog/` |
| `📊-market-profile-trendlines-mt4-forex-indicator-free-download-powerful-proven-tool-for-precision-trading` | `/blog/` |
| `secret-profit-levels-forex-indicator-free-download-7-powerful-truths-every-trader-must-know` | `/blog/` |
| `forex-profit-boost-mt4-indicator-free-download-7-powerful-secrets-to-maximize-your-trading-profits` | `/blog/` |
| `forex-millionaire-rsi-indicator-and-strategy-free-download-7-powerful-secrets-to-maximize-profits-fast` | `/blog/` |
| `precision-trend-scalping-indicator-free-download-9-proven-tips-for-safer-smarter-scalps` | `/blog/` |
| `⚡-zeus-forex-scalping-indicator-free-download-powerful-strategy-guide-7-proven-benefits` | `/blog/` |
| `renko-star-indicator-free-download-7-powerful-reasons-traders-love-it` | `/blog/` |
| `rsi-trend-catcher-signal-forex-indicator-free-download-powerful-proven-7-step-trading-advantage` | `/blog/` |
| `auto-pivot-points-indicator-mt4-mt5-free-download-powerful-accurate-trading-tool` | `/blog/` |
| `🚀-powerful-guide-daily-dynamic-trend-multi-currency-v4-forex-indicator-free-download-explained` | `/blog/` |
| `another-good-forex-zigzag-indicator-free-download-7-powerful-reasons-traders-love-it` | `/blog/` |
| `gt-scalper-indicator-free-download-7-powerful-benefits-every-trader-must-know` | `/blog/` |
| `boom-and-crash-indicator-system-mt5-free-download-7-powerful-secrets-to-maximize-profits-safely` | `/blog/` |
| `4x-wave-indicator-system-free-download-7-powerful-benefits-every-trader-must-know` | `/blog/` |
| `sane-fx-binary-trading-indicator-mt4-free-download-powerful-proven-strategy-guide` | `/blog/` |
| `instantaneous-trend-line-levels-mt5-forex-indicator-free-download-powerful-proven-guide-7-must-know-benefits` | `/blog/` |
| `dtosc-mt4-indicator-free-download-7-powerful-benefits-every-trader-must-know` | `/blog/` |
| `scalper-inside-pro-c7-forex-indicator-free-download-7-powerful-benefits-every-trader-must-know` | `/blog/` |
| `support-resistance-breakout-arrows-forex-indicator-mt4-free-download-negative-traps-powerful-9-step-safe-setup` | `/blog/` |
| `central-pivot-range-forex-indicator-mt4-free-download-powerful-trading-edge-with-7-proven-benefits` | `/blog/` |
| `raff-channel-forex-indicator-for-mt4-free-download-powerful-proven-tool-for-traders` | `/blog/` |

### Indicator review pages → `/blog/` (11)

| Slug | Target |
|------|--------|
| `keltner-sd-supertrend-by-rakoquant-forex-indicator-reviews` | `/blog/` |
| `ag-pro-swap-engine-by-agprolabs-forex-indicator-reviews-7-powerful-truths-every-trader-must-know` | `/blog/` |
| `7-essential-honest-structure-mapping-pro-by-rabgoada9-forex-indicator-reviews-that-traders-shouldnt-ignore` | `/blog/` |
| `btc-volatility-weighted-trend-matrix-by-mentor_michael03-forex-indicator-reviews-powerful-truths-smart-warnings-7-key-insights` | `/blog/` |
| `supply-demand-zones-by-joksen-forex-indicator-reviews-powerful-insights-7-honest-pros-cons` | `/blog/` |
| `adaptive-volatility-trend-by-willyalgotrader-forex-indicator-reviews-powerful-insights-7-proven-benefits` | `/blog/` |
| `flux-pulse-orb-by-inkadinka_ka-forex-indicator-reviews-the-powerful-truth-behind-this-game-changing-tool` | `/blog/` |
| `kama-sd-bands-by-rakoquant-forex-indicator-reviews-7-powerful-insights-every-trader-must-know` | `/blog/` |
| `quantum-relative-performance-oscillator-by-pineify-forex-indicator-reviews` | `/blog/` |
| `adaptive-pivot-structure-by-willyalgotrader-forex-indicator-reviews` | `/blog/` |
| `orange-blue-trends-by-kkilbourne-forex-indicator-reviews-7-powerful-insights-traders-must-know` | `/blog/` |

### Strategy / system downloads → `/blog/` (8)

| Slug | Target |
|------|--------|
| `professional-swing-intraday-channel-breakout-mt4-forex-strategy-free-download-powerful-7-step-winning-blueprint` | `/blog/` |
| `wave-trend-oscillator-free-download-powerful-proven-guide-with-5-smart-trading-secrets` | `/blog/` |
| `gold-sand-free-download-7-powerful-safe-ways-to-access-it-today` | `/best-forex-ea/` |
| `forex-rebellion-trading-system-for-mt4-free-download-7-powerful-truths-you-must-know-before-installing` | `/blog/` |
| `forex-range-trading-strategy-free-download-powerful-7-step-blueprint-for-consistent-profits` | `/blog/` |
| `free-scalping-and-100-pips-mt4-forex-trading-strategy-free-download-powerful-7-step-blueprint-for-consistent-gains` | `/blog/` |
| `inception-metatrader-trading-system-free-download-risky-truth-9-smart-ways-to-get-it-safely` | `/blog/` |
| `🚀-kx4-pro-trading-system-free-download-powerful-proven-strategy-guide` | `/blog/` |

### Emoji-prefixed indicator/EA review pages → `/blog/` (3)

| Slug | Target |
|------|--------|
| `🚀-smart-money-engine-by-willyalgotrader-forex-indicator-reviews-powerful-truth-7-shocking-insights` | `/blog/` |
| `🚀-gcm-alpha-structure-framework-by-unigram-forex-indicator-reviews-powerful-insights-7-critical-truths` | `/blog/` |
| `📈-supertrend-slope-only-by-sudhakar_kb-forex-indicator-reviews-7-powerful-truths-every-trader-must-know` | `/blog/` |

### Category pages → category root (4)

| Slug | Target |
|------|--------|
| `category/free-forex-indicator/page/3` | `/category/free-forex-indicators-mt4-mt5/` |
| `category/forex-indicator-reviews/page/4` | `/category/forex-indicator-reviews/` |
| `category/forex-trading-strategies/forex-scalping/page/4` | `/category/forex-trading-strategies/forex-scalping/` |
| `category/fundamental-analysis/page/4` | `/category/technical-analysis/` |

---

## GROUP 3 — 404 URLs needing redirect rules (102)

These are URLs in the Search Console "Not found (404)" report that have no redirect rule.
None have traffic. Add bulk 301 or 410 rules.

### Sub-groups:

| Pattern | Count | Action |
|---------|-------|--------|
| `/category/*/page/*` | ~13 | 301 → category root |
| `/product/*` | ~8 | 301 → `/best-forex-ea/` |
| `/shop/page/*` | ~5 | 301 → `/best-forex-ea/` |
| `/tag/*` | ~2 | 301 → `/blog/` |
| `/author/admin/` | 1 | 301 → `/about/` |
| `/download/`, `/Download/` | 2 | 301 → `/best-forex-ea/` |
| `/wc-stripe/*` | ~6 | 410 Gone (dead WooCommerce endpoints) |
| `/wp-content/*` | ~5 | 410 Gone (WordPress artifacts) |
| `/wp-json/*` | ~2 | 410 Gone (WordPress API) |
| `/*/feed/` | ~8 | 410 Gone (RSS feeds for deleted posts) |
| Old post slugs (no `-2` suffix) | ~20 | 301 → `/blog/` or closest live post |
| Other | ~30 | 301 → `/blog/` |

---

## Priority order

1. **Immediate:** Add 301 redirect rules for the 82 indexed download/review URLs → stops
   the bleeding (Google sees 301 instead of blank 404)
2. **Immediate:** Add rules for the 102 SC 404s → cleans up the 404 report
3. **Batch 1 (5 posts):** Write the 5 highest-value educational rewrites (beginner guides
   that target high-volume keywords)
4. **Batches 2–7:** Write the remaining 31 educational posts in groups of 5–6
5. **Resubmit sitemap** in Search Console (user action)

## User action required

- **Resubmit sitemap** at `https://search.google.com/search-console/sitemaps?resource_id=sc-domain:bestmt4ea.com`
- **Decide** on the 14 EA review redirects: should any be rewritten as honest reviews
  instead of redirected? (They'd need real testing data.)
