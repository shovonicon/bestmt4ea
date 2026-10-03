# Implementation status (resumable)

Read this at the start of every session, before any other file except `AGENTS.md`.
Update it at the end of every session: completed phase, verification results,
remaining blockers, and the exact next task.

Plan: `~/.commandcode/plans/bestmt4ea-remediation-and-rollout.md` — the **merged
platform + content-rollout plan** (keep Astro, platform-first). Phases 0–8 below are
DONE history; the platform program (P0–P11) and the content rollout (Phase R)
supersede the earlier "Next.js migration" notes.

## Resume anchor

Auto-injected at session start by `.commandcode/hooks/session-progress.mjs`.
Keep it short — about 12 lines. `/checkpoint` rewrites it.

- Updated: 2026-10-03
- Session: dc409e13-ec30-4e6c-bde8-23e584f22e52
- Focus: PLATFORM (Astro SSR + Cloudflare D1/R2). Content rollout paused until Phase R.
- Last done: **P3 DONE (core)** — catalogue + free downloads. `scripts/seed-catalog.mjs` (+ `db:seed:local/remote`) seeds the 13 products + FAQs into D1; migration `0001` made `download_events.entitlement_id` nullable for free downloads. `src/server/{entitlements,downloads}.ts` gate by active entitlement with a free-product bypass and a per-customer 30/hour cap; `/api/download/[fileId]` streams the private R2 object only to a signed-in customer (never a public URL). `release:check` PASSED (63.5s); live DOWNLOAD SMOKE PASS (5/5); vitest 21/21.
- Next action:
  1. Phase P4 — payments: Stripe hosted checkout + webhook; wire the USDT TRC20 engine + the 60s cron; grant entitlements on settlement.
  2. P3 follow-ups: product pages reading the catalogue from D1; real per-tier `product_plans` (needs a pricing pass — not invented); upload the free-download library to R2 `free/`.
  3. Confirm plan §4 decisions (product-page cache, admin URL, EX5 build machine, TRON wallet + TronGrid key, licence max-accounts).
- Blockers: none
- Resume: reopen this project and run `cmd -c`, or `cmd -r "<session name>"`. Run `/checkpoint` before stopping.

## Session protocol

1. Read this file first.
2. Continue the task named under **Next task** — do not restart or re-plan.
3. After each phase: verify with the listed commands, record results below.
4. End every completion report with: `Model used: <id> (<effort>)`.
5. After implementation sessions that change rendered pages: start the local
   server, show homepage + one migrated download post (+ product page when
   products change) at desktop and mobile, capture screenshots, then stop it.

## Model policy

- Normal work + content rewrites: `meta/muse-spark-1.3-contributor`
  (alts: `deepseek/deepseek-v4.1-flash`, `Qwen/Qwen3.8-Max`)
- Complex coding / review / content QA: `deepseek/deepseek-v4.1-flash`
- Critical planning / architecture: `gpt-5.6-sol:low`
  (alts: `deepseek/deepseek-v4.1-flash`, `zai-org/GLM-5.3`)
- Limits: check `/usage`. If a premium model hits its limit, continue on
  `meta/muse-spark-1.3-contributor` and resume premium work after reset.

## Phase 0 — migration contract and resumable status (DONE 2026-09-29)

- Created `scripts/content-rules.mjs` (shared codes: word/answer/takeaway/faq/
  source/download/keyword/policy/dupes + new ownership, title/desc, source-URL,
  future-date, install-steps rules).
- Updated `scripts/new-post.mjs` scaffold and `docs/AI-POST-BRIEF.md`:
  frontmatter owns faqs/sources/installSteps; bodies carry no H1/FAQ/Sources/
  Install sections.
- Created `scripts/snapshot-debt.mjs`; wrote `src/data/content-debt.json`
  (166 docs flagged under the stricter shared rules; baseline for the
  Phase 3 monotonic gate).

Verification:

- `npm run check:content` — unchanged shape: 10/153 posts in band, 13 download
  posts, 0 duplicate pairs, 53 banned-claim docs.
- `node scripts/snapshot-debt.mjs` — 166 with violations (stricter rules on
  ownership/title/desc/dates), `--write` saved the baseline.

Known finding carried into Phase 2: 10 of 13 download posts rendered duplicate
FAQ/Sources sections (layout renders frontmatter + Markdown repeated it).
**Resolved in Phase 2** — body copies stripped, word band restored.

## Phase 1 — Cloudflare Worker redirects (DONE 2026-09-29)

- `scripts/build-redirects.mjs` now emits one strict manifest
  (`src/generated/redirects.json`, 2,338 rules) instead of `public/_redirects`;
  any violation (conflicting dupes, cycles, bad statuses, missing targets)
  exits 1. Deleted legacy `public/_redirects` + `src/data/redirects.json`.
- `scripts/routes.mjs` (new, shared): live routes derived from content +
  taxonomy (219 canonical routes), shared by generator and checker.
- `worker/match.mjs` (pure, dependency-free) + `worker/index.ts`: edge
  redirect/gone handler, falls through to `env.ASSETS`. Preserves query
  strings, canonicalises emoji encoding, enforces trailing slashes.
- `scripts/check-routes.mjs`: independently re-verifies manifest vs live
  routes; fails on collisions (incl. `/disclaimer/`, `/dmca-policy/`,
  `/special-discount/`), missing targets, dupes, self-redirects, chain hops.
- `scripts/worker.test.mjs`: 24 tests, dependency-free, no runner.
- `wrangler.jsonc`: `main: worker/index.ts` + `ASSETS` binding; R2 `FILES`
  binding and vars untouched. `package.json`: `check:routes`, `test:worker`.
- Resolved at build time: 3 legacy sources colliding with live routes
  dropped (`/disclaimer`, `/dmca-policy` → `/terms-conditions/`,
  `/special-discount` → `/`); 283 rules targeting 10 retired empty
  `/category/...` archives remapped to `/blog/` and recorded in manifest.

Verification:

- `node scripts/build-redirects.mjs` — PASS, 2,338 rules.
- `node scripts/check-routes.mjs` — PASS, no collisions.
- `node scripts/worker.test.mjs` — 24 passed, 0 failed.
- `npm run build` — 220 pages, no `dist/_redirects`.
- `npx wrangler deploy --dry-run` — PASS (Worker + ASSETS + FILES bindings).
- `npm run check:content` — unchanged shape (10/153 in band, 13 download
  posts, 0 dupes, 53 banned-claim docs).
- Showed homepage + Gold Investor download post at 1440×1100 and 390×844;
  server stopped afterwards.

## Phase 2 — unified long-form rendering (DONE 2026-09-29)

- `src/layouts/LongFormLayout.astro` (new): one renderer for every post, order
  switched by `entry.data.download`. Order — breadcrumb → H1 → quick answer →
  download → takeaways → install steps → ad → author/date → TOC → body → ad →
  FAQ → sources → risk warning → related.
- `src/components/InstallSteps.astro` + `src/components/ArticleSources.astro`
  (new); `TableOfContents.astro` gained `variant="collapsible"`; `seo.ts` gained
  `howToSchema`. Section markers added for testing: `data-faq`, `data-sources`,
  `data-install-steps`, `data-toc`, `data-download-card`.
- Retired `ArticleLayout.astro` + `FreeDownloadLayout.astro`; `[slug].astro`
  now renders `PageLayout` for pages and `LongFormLayout` for every post.
- Removed the 20rem ad sidebar. New `.longform` grid in `global.css`: centered
  44rem prose column, `.longform-breakout` widens cards (download card) to 56rem.
  Inline desktop TOC + collapsible mobile TOC. Ads kept clear of download
  actions — install steps always sit between the card and the first ad.
- `scripts/strip-dup-sections.mjs` (new, `npm run content:strip-dups`) removed
  the duplicated body FAQ/Sources sections from the 10 affected download posts.
  The 4 posts that fell below 3,500 words were expanded with unique narrative
  (broker-mismatch diagnosis, losing-run arithmetic, preset stress-testing,
  fair robot comparison) — band and 0 duplicate pairs preserved.
- `scripts/check-rendered-html.mjs` (new, `npm run check:rendered`) asserts one
  H1, one visible FAQ/Sources/Install section, no 20rem sidebar, `.longform`
  present, both TOCs, FAQPage/HowTo schema matching frontmatter, and no ad above
  the download action. 32 strict pages checked; 121 legacy posts counted as debt
  (they keep their only FAQ copy in the body and are migrated in the rollout).

Verification:

- `npm run build` — 220 pages, PASS.
- `npm run check:rendered` — PASS, 32 strict pages, 0 violations.
- `npm run check:routes` — PASS (2338 rules, no collisions).
- `npm run test:worker` — 24 passed.
- `npm run check:content` — 10/153 in band (all 10 are the download posts),
  13 download posts, 0 duplicate pairs, 53 banned-claim docs (unchanged).
- Showed the site locally and stopped the server.

## Phase 3 — changed-content + production release gates (DONE 2026-09-29)

- `scripts/changed-files.mjs` (new): changed-content detection **without git**.
  Content files are hashed into `src/data/content-hashes.json`; "changed" means
  the hash differs from the baseline. An absent baseline treats every file as
  changed (safe default). `--write` re-baselines.
- `scripts/check-content.mjs` extended: `--changed` and `--files a.md,b.md` run
  the FULL strict standard on the touched posts/products only (pages excluded —
  they are not long-form content); `--debt` compares per-doc violation codes
  against `src/data/content-debt.json` and fails on any new code or new doc.
  `--strict` remains strict-all for rollout measurement.
- `scripts/check-links.mjs` (new): resolves every site-relative `href` in
  `dist/` against real build output; reports broken targets grouped by URL.
- `scripts/check-downloads.mjs` (new): validates origin/licence/author/source,
  `fileKey` xor `externalUrl`, key format + extension, R2 domain configured, and
  `installSteps` present on every download post.
- `scripts/release-gate.mjs` (new): the one command. Redirect manifest →
  changed-content → debt → build → routes → rendered HTML → links → downloads →
  Worker tests → `wrangler deploy --dry-run`. Steps run through the shell so
  `npx` works on Windows.
- `package.json`: `release:check`, `check:content:changed`, `check:debt`,
  `check:links`, `check:downloads`, `changed-files`. **`predeploy` now runs
  `release:check`**, so `npm run deploy` cannot ship without passing.

Real bug found by the new gate (fixed): `Footer.astro` linked "Beginner guides"
and "Technical analysis" at two retired category archives, producing 440 broken
internal links across 220 pages. Repointed to live categories.

Verification:

- `npm run release:check` — PASSED (11.7s), all 10 steps green.
- `check-links` — 10,856 internal links across 221 pages all resolve.
- `check-downloads` — 13 download posts valid.
- `check:debt` — 166 → 162 docs with violations (4 now clean), no regressions.
- `check:content --changed` — clean.

## Phase 4 — routes, canonicals and URL policy (DONE 2026-09-29)

- `src/lib/urls.ts` (new): the single place the trailing-slash policy lives.
  `url()` normalises an internal path to exactly one trailing slash (leaving
  files, external URLs, `?query` and `#fragment` alone), `absoluteUrl()` builds
  canonicals, `canonicalFor()` prefers a `seo.canonical` override, and
  `resolveImage()` turns relative OG/featured images absolute.
- `src/lib/content.ts` (new): one definition of what is public.
  `getPublicPosts` / `getPublicProducts` / `getPublicPages` / `getDownloadPosts`
  exclude drafts, future-dated entries and `systemPage` pages, and sort
  consistently (recency for posts, title for products/pages). Every index,
  archive, hub and the Header now read through them.
- `assertRootSlugIntegrity()` fails the build on a duplicate root slug or one a
  dedicated route owns — `[slug].astro` previously `continue`d past those and
  silently dropped the page. `SUPERSEDED_SLUGS` records the two WordPress pages
  (`blog`, `free-download-forex-ea-indicator`) that are deliberately replaced by
  dedicated hubs, so the intentional shadowing is explicit.
- `astro.config.mjs`: `trailingSlash: 'always'`.
- ~45 internal links across Header, Footer, ProductCard, RankingTable, all four
  layouts and all nine listing pages now build through `url()`.
- `data.seo.robots` is passed through LongForm, Product and Page layouts.
- `/best-mt4-ea/` canonicalised to the homepage (`https://bestmt4ea.com/`) and
  so competed with it; it now self-canonicalises to `/best-mt4-ea/`.
- `scripts/check-canonicals.mjs` (new, in the release gate): asserts exactly one
  absolute self-canonical per page, comparing decoded paths so the 16 emoji
  routes pass while a wrong-target canonical fails.
- `scripts/check-links.mjs` now also fails on any internal link missing its
  trailing slash.
- `scripts/check-preview.mjs` (new, `npm run check:preview`): live probe against
  `wrangler dev`. Verified decoded and uppercase-encoded emoji paths serve the
  page, the lowercase-encoded form 307s onto the canonical route, all forms
  advertise one canonical, legacy redirects fire, legal pages are untouched,
  unknown paths 404, and `/shop` 307s to `/shop/`.

Verification:

- `npm run release:check` — PASSED (9.3s), all 11 steps green.
- `check-canonicals` — 219 pages, one self-canonical each (16 emoji routes).
- `check-links` — 10,657 internal links resolve and use canonical slashes.
- `check:preview` against `wrangler dev` — all 14 probes PASS.
- `check:routes` / `test:worker` / `check:rendered` / `check:downloads` — PASS.
- Content hashes re-baselined after the intentional `best-mt4-ea.md` change.

## Phase 5 — structured data, real freshness, downloads (DONE 2026-09-29)

- `src/data/site-verification.json` (new): real verification dates — content,
  catalogue and performance — kept separate from build time. `scripts/` code and
  pages read these instead of inventing freshness.
- `src/lib/dates.ts`: removed `isoNow`. Build time is no longer exported as a
  date anything can claim freshness with; `monthYear` remains a *label* for
  titles. Exports `contentReviewedAt` / `catalogueVerifiedAt` /
  `performanceVerifiedAt`.
- `src/lib/seo.ts`:
  - `websiteSchema()` no longer emits `dateModified` (build time is not a
    modification).
  - `productSchema()` no longer publishes `price: 0` (zero is the free-trial
    tier), no longer hardcodes `InStock` (maps the real `stockStatus`, omits
    unknown), no longer names this site as the brand of third-party systems, and
    emits absolute image URLs. Prices use `AggregateOffer` when a range exists.
  - `articleSchema()` gained the real author, a publisher logo, `mainEntityOfPage`,
    an absolute canonical `url` and absolute images.
- `src/lib/urls.ts`: `canonicalFor()` re-serialises through `URL`, so an emoji
  canonical is percent-encoded — matching both what the edge serves and what
  schema emits. Previously the tag was decoded while schema was encoded.
- Homepage badge and rankings eyebrow now read "Performance verified <real
  date>" instead of "Updated <build month>"; the footer reads "Content reviewed
  <real date>". Product pages distinguish a live sync from a transcribed record
  and say when a sync is stale.
- `astro.config.mjs`: sitemap `lastmod` now comes from each page's content
  `updatedAt`/`publishedAt` — 173 of 219 URLs carry a real date, and hub pages
  with no content date get none.
- `scripts/build-inventory.mjs` (new): regenerates `src/data/inventory.json`
  from the current content (189 URLs), so the parity artifact stops drifting.
  Runs in the release gate; `--check` verifies without writing.
- `scripts/check-schema.mjs` (new, in the gate): asserts no zero prices, no
  invented availability, no site-as-brand, absolute images, Article
  `dateModified` matching the content date, and no `dateModified` on WebSite.
- `scripts/check-downloads-live.mjs` (new, in the gate): HEAD-probes every
  download target; fails on 404/410/451, warns when a host refuses HEAD, and
  skips cleanly when offline.

Verification:

- `npm run release:check` — PASSED (16.4s), all 14 steps green.
- `check-schema` — 13 Product, 153 Article, 1 WebSite node valid.
- `check-downloads-live` — 13/13 targets resolve.
- `check-canonicals` / `check-links` / `check-routes` / `test:worker` — PASS.
- `build:inventory --check` — 189 URLs match current content.

## Phase 6 — legal and privacy content reconciled (DONE 2026-09-29)

- `privacy-policy.md` — rewritten. It had 3 malformed links to a stale test
  address (`support@test.bd.market`), a truncated meta description, a body H1
  duplicating the layout, and a claim to run newsletters and accounts that do
  not exist. It now describes the real flows: Cloudflare hosting and logs,
  Cloudflare R2 download delivery, Google AdSense, affiliate-link cookies, the
  checkout/payment provider (card details never reach us), and email/Telegram
  contact — plus accurate GDPR/UK-GDPR/CCPA rights.
- `terms-conditions.md` — rewritten. Removed the body H1 and the
  "10–15 business days" DMCA handling promise, which contradicted the DMCA
  page's "2 business days / 72 hours". There is now **one** takedown definition,
  on the DMCA page. The "all results are hypothetical" section contradicted the
  verified-track-record pages; it now states how performance is actually
  presented (account type always shown, backtests labelled, transcribed vs
  synced, dates stated). Refund terms kept, stated precisely.
- `dmca-policy.md` — the fixed response-time promises are gone. It states prompt
  handling without a number we cannot guarantee, cross-links the licence terms,
  and notes we act only as distributor or link for third-party products.
- `affiliate-disclosure.md` — added a "what it means for your data" section
  cross-linking the privacy policy.
- All five legal pages: `systemPage: true`, `showAds: false`, self-canonicals
  (no `seo.canonical` override needed), real review dates, and no redirect
  interception (`check-routes` asserts this).
- Duplicate body H1s removed from 5 more pages (`best-forex-brokers`,
  `cryptocurrency-market-capitalization`, `forex-heat-map`, `forex-screener`,
  `most-traded-cryptocurrencies`).
- `scripts/check-rendered-html.mjs` now asserts **exactly one H1 on every
  non-post page**, not just on posts, and reports legacy post/product H1 debt as
  a count instead of failing (touching those files would also demand a full
  compliant rewrite through the changed-content gate).

Verification:

- `npm run release:check` — PASSED (15.3s), all 12 checks green.
- `check-rendered-html` — 219 pages; non-post pages have exactly one H1;
  46 legacy posts + 1 legacy product with duplicate H1s counted as debt.
- Content hashes re-baselined after the legal-page rewrites.

## Phase 7 — fonts, accessibility and browser tests (DONE 2026-09-29)

- **Fonts self-hosted.** `scripts/fetch-fonts.mjs` (new) pulls exactly the used
  weights of Sora (400/600/700/800), Manrope (400–800) and JetBrains Mono
  (500/600), keeps the latin and latin-ext subsets, and writes
  `src/styles/fonts.css` (22 `@font-face` rules, 425 KB of woff2 in
  `public/fonts/`). The Google Fonts `<link>` and both preconnects are gone;
  `dist` now contains **zero** references to font CDNs. The two critical fonts
  are preloaded.
- **Header keyboard contract** (`Header.astro`):
  - closed mega-menu panels are now `visibility: hidden`, so their links are no
    longer tabbable (opacity alone left them focusable);
  - ArrowDown moves focus into the panel's first link;
  - Escape closes the menu and returns focus to the trigger, with a
    `restoringFocus` guard — without it, focusing the trigger re-fired `focusin`
    and reopened the menu immediately;
  - visibility is transitioned on close only, so the panel is visible at the
    instant `focus()` runs;
  - the mobile toggle now updates `aria-label` ("Open menu"/"Close menu") as well
    as `aria-expanded`, and Escape closes it and restores focus.
- **Touch targets**: mobile nav links, the `<details>` summaries and the nav
  toggle are now ≥44px.
- **Real a11y bug found and fixed**: `global.css` makes markdown tables
  horizontally scrollable (`display: block; overflow-x: auto`), which on a 390px
  viewport creates a scroll region with no keyboard access — axe
  `scrollable-region-focusable` (WCAG 2.1.1). `src/lib/rehype-table-a11y.mjs`
  (new) adds `tabindex="0"` to markdown tables at build time, so it works without
  JavaScript. Astro 7 defaults to Sätteri, so `@astrojs/markdown-remark` is now a
  dev dependency to host the rehype plugin.
- **Tests**: `playwright.config.ts` + `tests/e2e/a11y.spec.ts` +
  `tests/e2e/header.spec.ts` — axe (WCAG 2.0/2.1 A and AA) on 7 pages, no
  horizontal overflow, one H1 per page, the header keyboard contract and the 44px
  touch targets, all at desktop (1440×1100) and mobile (390×844). 23 tests pass,
  5 correctly skipped per viewport. `scripts/serve-dist.mjs` (new) serves `dist/`
  for the tests, because `astro preview` did not bind here.

Verification:

- `npm run release:check` — PASSED (38.3s), all 15 checks green.
- `npm run test:e2e` — 23 passed, 5 skipped, 0 failed.
- `dist` contains no `fonts.googleapis.com` / `fonts.gstatic.com` reference.

## Phase 8 — release verification (DONE 2026-09-29)

- The gate's first step was still **skipped** — `@astrojs/check` was never
  installed, so the project had no type checking at all. Now installed
  (`@astrojs/check` + `typescript`), and `astro check` runs for real:
  **0 errors, 0 warnings, 101 hints** (the hints are zod deprecation notices from
  `astro:content`).
- It immediately found **5 real type errors**, all now fixed:
  - `ProductLayout.astro` called `formatDate(perf.lastVerified)` where the value
    is `Date | undefined` — two call sites, now guarded.
  - `worker/index.ts` had implicit `any` on `request` and `env`, and passed a
    possibly-undefined `matched.location` to `new URL()`. Added an `Env`
    interface and a guard.
- `npm run release:check` — **PASSED (45.1s), all 16 steps green**, with Astro
  check running rather than skipped.

Verification of the rendered site (dev server, desktop 1440×1100 and mobile
390×844):

- Homepage, the migrated `gold-investor` download post and the `ava-aigpt5-ea`
  product page all render correctly at both sizes with the self-hosted fonts.
- DOM audit of the download post: `.longform` grid `272px | 704px | 272px`, so the
  prose column is 704px (≈70ch) while the download card breaks out to 896px —
  **no sidebar** (`aside.sticky` absent), exactly one inline and one collapsible
  TOC, exactly one FAQ / Sources / Install section, one `<h1>`, all five legal
  links in the footer, back-to-top and Telegram chrome present, and
  `scrollWidth - clientWidth === 0` (no horizontal overflow).
- Product page shows the honest labelling from Phase 5: "Figures transcribed from
  the published account record, checked 28 September 2026" with an "Unverified"
  badge and "No third-party account published for this system."

Note: the plan's final step is to stop the local server. It was left running at
`http://localhost:4321/` on the user's explicit instruction.

## Content rollout — batch 1 (DONE 2026-09-29)

First wave of the rewrite queue: the 8 highest-priority gold/XAUUSD posts, each
rewritten in parallel by its own sub-agent with a distinct angle so the pieces
could not collapse into each other.

Posts rewritten (all now in band with a download block):

| Post | Words | Download source (verified) |
|---|---|---|
| `gold-1-minute-grid-…-before-investing` | 4,020 | EarnForex Position Sizer (Apache-2.0) |
| `top-10-powerful-scalping-strategies-for-gold-trading-complete-guide` | 3,943 | TeknoTrader Custom-Indicators-MQL4 (MIT) |
| `mt4-gold-scalper-ea-…-proven-setup-tips` | 4,835 | EarnForex Position Sizer (Apache-2.0) |
| `gold-trading-smc-ea-…-profitable-gold-trading` | 4,382 | MT5-SMC-trading-bot (Apache-2.0) |
| `goldbaron-xauusd-ea-…-must-know` | 4,590 | LeonardoCiaccio Position-Size-Calculator (MIT) |
| `ai-gold-scalping-ea-…-7-proven-insights` | 4,254 | dingmaotu mql-zmq (Apache-2.0) |
| `gold-hitter-ea-mt4-…-profitable-trading` | 4,232 | EarnForex Position Sizer (Apache-2.0) |
| `pharaoh-gold-ea-mt4-…-before-installing` | 4,797 | BAKOME-Hub gold_bakome (MIT) |

Result: **in band 10 → 18**, **below band 143 → 135**, **download posts 13 → 21**,
**duplicate pairs 0 → 0**, **content debt 162 → 154 docs**.

Two things the batch proved about the process:

- **Parallel agents cannot validate each other's links.** Each agent self-checked
  its own frontmatter with `check-content --files`, which covers the shape of a
  post but not whether its internal links resolve. The batch produced **4 broken
  internal links** — three truncated post slugs and one wrong category path —
  which `check-links` caught at the gate and I fixed. Future waves must tell
  agents to verify each internal link against a real file.
- **A flaky network check can mask a real gate.** `check-downloads-live` failed
  once on a GitHub archive `.zip` that timed out at 12s (it passed on re-run and
  the file was never modified). The script now retries once, allows 20s, and
  treats a persistent network error as a warning while still failing on any
  HTTP 404/410/451.

## Content rollout — wave 2 (DONE 2026-09-29)

The remaining 13 priority-1 gold/money posts, again one sub-agent per file with a
distinct angle:

| Post | Angle | Words |
|---|---|---|
| gold-trend MT4 indicator | repaint detection | 4,483 |
| forex holy grail indicator | myth-busting "holy grail" claims | 4,125 |
| gold quantum EA | backtest vs live / walk-forward | 4,187 |
| gold breakout EA | breakout filters vs gold's spread widening | 4,324 |
| golden line v3 indicator | safe installation of a foreign indicator | 3,901 |
| free gold trading EA | the real economics of "free" | 4,413 |
| gold HFT scalping EA | latency and execution reality | 4,268 |
| gold scalping EA (7 secrets) | what actually decides survival | 3,893 |
| gold buster EA | recovery/averaging ladder maths | 3,911 |
| gold prop firm robot | prop-firm rule constraints | 3,979 |
| gold cycle trader EA | seasonal/cycle claims examined | 3,843 |
| gold sniper indicator | how to audit a signal indicator | 4,881 |
| the gold reaper EA review | review with no verified account | 4,283 |

Cumulative after waves 1–2: **in band 10 → 31**, **below band 143 → 122**,
**download posts 13 → 34**, **content debt 166 → 141 docs**, **duplicate pairs 0**.
`npm run release:check` — PASSED (50.3s), 34/34 download targets resolve.

The tightened brief worked: wave 1 (before it) produced 4 broken internal links
per 8 posts; wave 2 produced **1 across 13** — a single invented category path
(`/category/gold-xauusd-trading/gold-market-analysis/`, which does not exist),
caught by `check-links` and repointed at `/category/gold-xauusd-trading/`. The
rule that agents must copy post slugs verbatim from `src/content/posts/` and take
category paths from `src/data/taxonomies.json` should stay in every future wave.

## Download variety + product-page policy (DONE 2026-09-29)

Two policy changes requested after wave 2.

**1. Per-post variety in the asset offered.**

- `src/data/download-sources.json` (new): **60 verified open-source MetaTrader
  assets** — 19 EA, 16 library, 12 indicator, 5 risk-tool, 5 bridge, 3 script.
  Every entry was verified through the GitHub API: the repo exists, carries the
  stated `license.spdx_id`, and contains at least one `.mq4`/`.mq5` file. Seven
  candidates were rejected for shipping only `.mqh` headers.
- `scripts/check-downloads.mjs` now measures variety: it **warns above 2 uses of
  one source and fails above 4**. Before the rebalance the library had **6
  distinct sources across 34 posts — EarnForex Position Sizer alone backed 9
  posts**. After: **28 distinct sources, max reuse 2**.
- Rebalancing was not a frontmatter swap: **25 of the 34 posts name their asset
  in the prose** ("the download on this page is gold_bakome"), so each needed its
  sentences rewritten to describe the new file coherently. Six sub-agents did
  that in parallel.
- Two posts could not be rebalanced honestly and were rewritten instead:
  `ea31337-libre-free-download` (881 words) and
  `geraked-mt5-expert-advisors-free-download` (873 words) are *about* one specific
  project each, so their original download was the coherent one — they were
  restored and expanded to 3,865 and 4,273 words with the missing
  `primaryKeyword` and title fixes applied.

**2. Product pages no longer follow the word band.**

- The band is now **posts-only** (`content-rules.mjs`); a product page is judged
  on evidence (`docs/CONTENT-STANDARD.md` §3b), which `AGENTS.md` iron rule 1 now
  reflects.
- `src/components/ProductChart.astro` (new): a real-data scatter of **total gain
  against maximum drawdown** across the catalogue, highlighting the system being
  viewed, with the check date stated. It plots only figures that exist and says so
  plainly when a system has no published third-party record rather than drawing a
  guess. No equity curve, sparkline or interpolated series is ever invented.
- `check-rendered-html.mjs` now asserts every product page carries the decision
  chart, a risk warning and a drawdown figure — **13/13 product pages pass**.

Verification: `npm run release:check` — **PASSED (79.3s), all 16 steps**, 23/23
browser tests, 34/34 download targets resolve, 28 distinct sources, max reuse 2.
Content debt 141 → **132 docs**.

One bug found by the browser suite along the way: the chart's horizontal scroll
wrapper was not keyboard-reachable (axe `scrollable-region-focusable`, WCAG
2.1.1) — the same defect class as the markdown tables in Phase 7. It now carries
`tabindex="0"` plus `role="region"` and a label.

## Next task

**Phase P4 — payments (Stripe + USDT TRC20)** (P0–P3 are DONE; the content rollout is
paused until Phase R).

Done: **P0** D1 schema + USDT engine. **P1** Astro SSR on Cloudflare. **P2** passwordless
accounts (D1 `DB`, sessions, magic-link, `/login` `/auth/*` `/logout` `/dashboard`). **P3**
catalogue + gated downloads (13 products seeded; `/api/download/[fileId]` streaming with a
free bypass). Git: `b268d03` → `e587665` → `ba6a333`.

Next: **P4** — Stripe hosted Checkout + signed webhook and the self-hosted USDT TRC20 rail
(`src/server/crypto-payments.ts` + `src/server/tron.ts` already exist), reconciling through
one trust path and granting an entitlement on settlement. Then **P5** — premium licensing
+ EX5.

Open P3 follow-ups: product pages reading the catalogue from D1; real per-tier
`product_plans` (needs a pricing pass — do not invent); upload the free-download library to
R2 `free/`. Confirm plan §4 decisions as they arise.

## Phase P1 — Astro SSR on Cloudflare (DONE 2026-10-03)

- `astro.config.mjs`: `@astrojs/cloudflare` adapter, `session: false` (we use D1
  sessions, not the adapter's KV), `imageService: 'passthrough'`. `output` stays
  **`'static'`** — every public page is prerendered automatically, so **no per-page
  `prerender` flags were needed**.
- `src/pages/404.astro`: `export const prerender = false` — this single on-demand route
  is what makes the adapter build a **Worker** rather than assets-only, and lets middleware
  run for unmatched paths.
- `src/middleware.ts` (new): serves the legacy redirect manifest (410/451 + 301/302/307/308)
  through the same pure matcher (`worker/match.mjs`) the old Worker used — one
  implementation, and the same one `worker.test.mjs` exercises.
- `wrangler.jsonc`: dropped `main` and the `assets` block (the adapter owns both at build
  time, via the generated `dist/server/wrangler.json`), added `nodejs_compat`. Deploy is
  routed by `.wrangler/deploy/config.json` → the built config.
- Retired `worker/index.ts`; retargeted the five gates (`check-canonicals`, `check-links`,
  `check-schema`, `check-rendered-html`, `serve-dist`) from `dist` to **`dist/client`**
  (the adapter's static output; the server bundle is `dist/server`).

Verification: `npm run release:check` — **PASSED (68.4s)**, all steps green. `npm run
check:preview` against `wrangler dev` — **PASS**: legacy redirect fires (301), emoji
routes serve with one canonical each, unknown path 404s, `/shop` canonicalises. `astro
check` 0 errors; `vitest` 21/21.

## Phase P2 — accounts & passwordless auth (DONE 2026-10-03)

- **D1 live.** Created the `bestmt4ea` D1 database (region APAC,
  `5e9ca777-3a9b-486c-9229-30e7d3237447`), bound as `DB` with `migrations_dir: drizzle`;
  added the `EMAIL` (Cloudflare Email Service) binding and `APP_URL` / `EMAIL_FROM_*` vars.
  `npm run types` regenerates `worker-configuration.d.ts` after any `wrangler.jsonc` change.
- **`src/db/client.ts`** — one `getDb()` over the D1 binding, plus `dbBatch()`.
- **Ported primitives** (cookie names adapted to `bmt4_*`): `src/lib/{session,csrf,
  rate-limit,password,http}.ts`.
- **`src/server/auth.ts`** — passwordless magic-link + one-time code: `requestLogin`
  (HMAC-hashed token/code, 15-min TTL), `consumeTokenByLink` / `consumeTokenByCode`, and
  `upsertCustomer`. Customers have **no password** at all.
- **`src/emails/{send,magic-link}.ts`** — sends via the `EMAIL` binding, logs every attempt
  to `email_logs`, and degrades to a console log when the binding is absent.
- **Routes**: `/login`, `POST /auth/request/`, `GET /auth/verify/`, `GET /logout/`,
  `/dashboard/` (session-gated). All `prerender = false`; the new slugs are in
  `RESERVED_SLUGS`.
- **`src/middleware.ts`** now resolves the session (from D1) and a CSRF token on every
  on-demand request, after the redirect manifest.

Verification: `npm run release:check` — **PASSED (63.6s)**. `astro check` 0 errors;
`vitest` 21/21. Live `wrangler dev` **AUTH SMOKE PASS (10/10)**: login page + CSRF cookie,
magic-link request (303 `sent=1`), bad token rejected, valid token → session, dashboard
renders and greets, anonymous visitor redirected to `/login/`, logout redirects.

> Deliberately **not** in P2: admin TOTP / recovery codes (they land with the admin
> platform, P7) and Turnstile wiring (with checkout, P4).

## Phase P3 — catalogue & free downloads (DONE 2026-10-03)

- **Migration `0001_free_download_events.sql`** — `download_events.entitlement_id` is now
  nullable, so a free download (no entitlement) is still tracked.
- **`scripts/seed-catalog.mjs`** (+ `db:seed:local` / `db:seed:remote`) reads
  `src/content/products/*.md` and emits `scripts/seed-catalog.sql` (`INSERT OR REPLACE`
  into `products` + `product_faqs`). **13 products** seeded; exactly one is free
  (`2000-trading-tools`). **Plans are deliberately not seeded** — the per-tier prices are
  not in a shape we can trust, so they belong to a real pricing pass, not an invented map.
- **`src/server/entitlements.ts`** — `getActiveEntitlement` / `grantEntitlement` /
  `revokeEntitlement` (the "what was bought" record).
- **`src/server/downloads.ts`** — `authorizeDownload`: a **free** product is downloadable by
  any signed-in customer; a **premium** product needs an active entitlement (expiry +
  download count respected). A per-customer **30/hour** cap applies to both, and every
  granted download writes a `download_events` row (batched with the entitlement increment).
- **`src/pages/api/download/[fileId].ts`** — requires a customer session, runs the gate, then
  **streams the private R2 object** (`env.FILES.get`). There is no public R2 URL; the bucket
  is never exposed for these files.

Verification: `npm run release:check` — **PASSED (63.5s)**; `vitest` 21/21. Live
`wrangler dev` **DOWNLOAD SMOKE PASS (5/5)**: anonymous → 401, signed-in free download →
200 with the correct body, attachment filename set, unknown file → 404.

> P3 follow-ups: product pages still read the catalogue from content (moving them to D1 is
> the next catalogue step); hosted free files for the 34 free-download posts (all are
> external GitHub links today); the R2 public bucket is still whole-bucket — the plan keeps
> it private, so removing the public custom domain is a follow-up before premium files ship.
