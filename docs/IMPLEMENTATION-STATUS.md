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

- Updated: 2026-10-07
- Focus: PLATFORM, now **LIVE at https://bestmt4ea.com** on the owner's own Cloudflare account. Content rollout still paused until Phase R.
- Last done: **Launched, then fixed what PageSpeed found.** Deployed to the owner's account (D1 `b3ba8e3e`, four migrations, catalogue seeded, 10 secrets with a fresh `SESSION_SECRET`) and cut the apex over from WordPress using **two Worker routes rather than a custom domain** — the apex already holds a proxied A record (Cloudflare 100117), so the route rides in front of it: the WordPress origin and every mail record are untouched, and revert is deleting two lines. R2 split so `templates/` and `builds/` can never be public; nine EA templates uploaded and verified by size. Build pipeline made platform-aware (`.mq4`→`.ex4` with MT4's MetaEditor, `.mq5`→`.ex5` with MT5's) because eight of ten EA products are MT5 and could not build at all. Then a PageSpeed pass: **AdSense was loaded from `BaseLayout` on every page** — 181 KB of JS and 6.4s of main-thread work for ads most pages never show — and now loads from `AdSlot`, once, only where a unit renders; **my own CSP was blocking AdSense telemetry** (`adtrafficquality.google`), which was the console error behind best-practices 73; 447 dead `[--color-x]` values fixed across 52 files; cache headers added; 38 images resized. Homepage **mobile 62→84, desktop 90→96, best practices 73→100, LCP 7.4s→4.0s, TBT 500ms→0ms**.
- This session: **checked myfxbook-sync — the `publish` job is broken.** Its `collect` job 403s (Myfxbook blocks GitHub IPs; collection is local by design), but `publish` fails with **"Authentication error [code: 10000]"** on the D1 query — reproduced locally with an invalid token, so the `CLOUDFLARE_API_TOKEN` repo secret is **invalid or wrong scope**. Data is still fresh (`myfxbook-live.json` fetchedAt 2026-10-05T23:01Z, matches D1) only because it was synced manually. Owner must set a valid token (Workers Scripts: Edit + D1: Edit). Also ran `npm audit fix`: the two **high** vulns (`source-map-js`, `http-cache-semantics`) are fixed; 8 moderate remain behind breaking `--force` downgrades (`esbuild` via `drizzle-kit`, `sprintf-js` via `gray-matter`) that should stay deferred. The "two unreferenced large PNGs (747 KB)" note is stale — the only unreferenced images now are two small root files (33 KB): `BESTMT4EA-Logo-GreenBlue-Dark.png` and `bestmt4ea-favicon dark.webp`.
- This session: **fixed the licence-build compiler for the MT5 templates.** The builder's `bindLicence()` only matched the MQL4-style `int Account` / `datetime Expire` declaration, so the four MT5 templates that declare the gate as `const long c_AccountID` / `const datetime c_Expire` (apex, elysium, equinox, nexora) failed every build with "no int Account line to bind" and stayed PENDING forever. It now matches both styles (verified against all 9 templates, including the trial `-1` marker). This was why licence **BMT4-FYPJ-VAMS-9WHM** (equinox, account 101111) was "still not delivered" — after the fix and a workflow run the `.ex5` is now READY in the private bucket (`builds/…/equinox-cosmos-ea-ai-gbpjpy-scalper-for-mt5-101111.ex5`) and the build queue is empty. Pushed to `main` (`7fc6d1b`).
- This session: **wired Cloudflare Turnstile into the sign-in flow — live.** The widget (site key `0x4AAAAAAFPByHrDou0ULSww`, public, in `src/lib/site.ts`) renders on `/login`; `/auth/request` verifies the token against Turnstile's `siteverify` before emailing a link, skipped when `TURNSTILE_SECRET_KEY` is unset. The secret is set in production (`wrangler secret list` shows it), the code is deployed (`release:check` PASSED, `Current Version ID b84996a6`), and the live login page renders the `cf-turnstile` widget + `api.js` script (verified via `curl`; the CSP already allow-lists `challenges.cloudflare.com`). Pushed `92b3d3d`. Checkout/Stripe were left alone (already session-gated; the magic-link email was the open abuse vector).
- This session: **switched the USDT rail from TRC20 (Tron) to BEP-20 (BSC).** `src/server/bsc.ts` (Etherscan V2 multichain, `chainid=56`) replaces the TronGrid client — BscScan's API now lives under Etherscan. USDT contract `0x55d398326f99059fF775485246999027B3197955` (18 dp); wallet linking is MetaMask (`window.ethereum`, EVM `0x…`); `tron_wallet_address` renamed `usdt_wallet_address` (migrations 0004 + 0005 applied local + remote); the matcher now also verifies the transfer sender against the payer's linked wallet. Secrets `ETHERSCAN_API_KEY` + `USDT_RECEIVING_ADDRESS` set, old `TRON_RECEIVING_ADDRESS` deleted, `CRON_SECRET` rotated across main Worker + cron Worker + GitHub, and the **cron Worker `bestmt4ea-cron` deployed** (`5594bd88`) so the 60s USDT poll now runs. Deployed `f4ce4c9e`; pushed `fd54f87`. `astro check` 0 errors, 24/24 unit tests pass.
- This session: **found `public/_headers` is inert for SSR routes.** It only reaches static assets, so every rule for `/login`, `/dashboard`, `/checkout`, `/admin` (and `/api/*`) never applied — `curl` confirmed `/login` and `/checkout` had neither `Cache-Control` nor `X-Robots-Tag`. Moved the `private, no-store` + `noindex, nofollow` headers into `src/middleware.ts` for those paths and dropped the inert rules from `_headers`. Verified live: `/login` + `/checkout` now return both, while the product page keeps its `public, s-maxage=300`. Deployed `6033fc32`; pushed `4acc8ec`.
- This session: **SEO / AI-indexing pass.** (1) **`robots.txt` rewritten** — one shared rule set listing ~18 answer engines (`GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `anthropic-ai`, `PerplexityBot`, `Google-Extended`, `CCBot`, `meta-externalagent`, `Bytespider`, …) alongside the wildcard, the private surfaces (`/api/`, `/admin/`, `/dashboard/`, `/checkout/`, `/login/`, `/auth/`, `/logout/`) Disallowed, and **both** `/sitemap-index.xml` and `/sitemap_index.xml` referenced. (2) **`/sitemap_index.xml` now resolves** — the middleware serves the generated index asset under the old Yoast path via `ASSETS.fetch`. (3) **Sitemap upgraded** — each product entry carries an `<image:image>` block (its featured image), and the private + `custom-404` pages are now **excluded** (they carry `noindex`, so listing them contradicted it). (4) Added a curated **`/llms.txt`** for AI engines. Deployed `cbb36a6a`. Note: the first zone reads looked stale (`robots.txt` old, `llms.txt` 404) — transient edge cache; both are correct on the zone now, verified alongside the sitemap.
- This session: **admin portal + premium customer surfaces, shipped.** `/admin/*` now renders through one shell (`AdminLayout` + `src/styles/admin.css` — grouped sidebar, top bar, identity) with a dashboard grouped by Money / Customers / Delivery, a "Needs attention" panel, and a new **audit log** page; the login + 2FA pages are premium too (both had a malformed `focus:border-[var(--color-accent]` that silently killed the focus ring). **Recovery codes were dead code** — `createRecoveryCodes()` was never called, so a lost authenticator had no way back in: enrolment now mints ten, shows them once on `/admin/recovery-codes/`, clears them on read, and they are a uniform `XXXXX-XXXXX`. **Orders gain Approve** (the same `settleOrder()` the Stripe webhook and USDT rail use → payment row, entitlement, PENDING licence) **and Delete** (refused for an order that granted access — reversing a real purchase is a refund's job). Also: the branded **OG banner** is the site-wide default (wp-content paths fall back to it), `/login` gained a rate-limited 6-digit **code-exchange** endpoint beside the magic link, and the customer dashboard got section icons / avatar / quick-access cards. Verified locally end to end (password → TOTP → codes → all 8 admin pages 200; approve settles, delete refuses a granted order). Deployed `cf35762e` / `e8ea85d6` / `5c17ed32`; pushed `4b2d150` / `c4af1c7` / `793171a`.
- This session (Phase R, started): **post 1 of 119 shipped.** Widened the gates for the education-first brief — `LIMITS.MAX_FAQS` 8 → 15, and `installSteps` is now required only for an *installable* download (one that sets `platform`, i.e. an EA/indicator); a resource (checklist, calculator, journal) is exempt. `check-content`, `check-downloads` and `new-post` follow, and `rewrite-queue` re-tiers to money+gold / EA reviews / indicators / educational (the stale free-download-hub block is gone). Authored **resource 1** — `resources/eurusd-ea-evaluation-checklist.{html,pdf}`, rendered by the new `scripts/build-resources.mjs` — and uploaded it to the **public** bucket `bestmt4ea-public`. Rewrote `eur-usd-expert-advisor-ea-overview-free-download-guide` (694 → ~4,550 words, risk-first, 12 question-shaped H2s); it passes `check:content --files`, `check:downloads`, `check:downloads:live` and the dupe scan. Privacy policy updated to permit download email capture. **Three infra bugs found on the way:** (1) `wrangler r2 object put` defaults to **local** storage — without `--remote` nothing reaches the bucket, which is what made the public URL look broken; (2) `src/lib/files.ts` fell back to the dead host `files.bestmt4ea.com` (no `PUBLIC_R2_PUBLIC_URL` in `.env`), so *every* hosted link would 404 — the fallback is now the working r2.dev base, in `files.ts` and both download checks; (3) `check-rendered-html`'s "ad above the download card" rule now searches from `.longform`, because the permitted desktop rails sit earlier in the DOM. Deployed `9ee35838`. **Next post held until the owner says go.**
- This session: **post ad layout rebuilt to match the reference build (TBK).** In-article AdSense units are now injected into the body at 5/35/65/90% depth by `src/lib/rehype-in-article-ads.mjs` (slot `6721931734` — already identical to TBK's), replacing the layout's single in-article slot so a post never carries both. Added TBK's three ad components, re-styled to this design system and this site's rules: `SidebarAd` (the VPS house creative — figures taken from `products/vps.md`, and **no rating line**, because §4 forbids displaying the imported 5.00/11 count), `FixedSideAd` (the 300×600 skyscrapers at ≥1700px) and `BottomBannerAd` (990×250). Copied `public/ads/bestmt4ea-copy-trading-300x600.webp` from TBK; the broker creatives stay on the broker's CDN. **Two deliberate divergences from TBK:** its hard-coded Exness tracking URLs would breach §7, so both broker links go through `src/lib/affiliates.ts` with `rel="sponsored nofollow noopener"` plus a disclosure; and `astro.config.mjs` now needs `loadEnv` — Vite loads `.env` *after* the config is evaluated, so reading `process.env` there meant the injection silently did nothing. Verified live: 7 units (2 rails + 1 after-content + 4 injected, every one after the download card), one push per injected unit, both skyscrapers, the sidebar creative and the banner. `PartnerFallback` then gained a `keys` prop so the rail fallback is **Exness + VPS** (RoboForex dropped, the VPS creative stacked under the Exness card). Deployed `0873d66b`, then `5c78ad8e`.
- Next action:
  1. **Repo secrets — DONE.** All set and verified: `BESTMT4EA_APP_URL`, `CRON_SECRET`, `BESTMT4EA_INGEST_URL`, `PERF_INGEST_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` (`5ff0c7ebf3f351599d17794b77e01267`), and a now-working **`CLOUDFLARE_API_TOKEN`** — the myfxbook-sync `publish` job reads D1 and deploys clean (`Current Version ID 43fcc7b5`). `MT4_INSTALLER_URL` is optional — the `tools-mt4` release (`exness4setup.exe`) is the fallback. `MYFXBOOK_SESSION` remains optional (monthly chart).
  2. **Stripe webhook — DONE.** Registered at `https://bestmt4ea.com/api/webhooks/stripe/` and a real delivery verified the endpoint secret matches what the Worker holds. **Leave the WooCommerce webhook alone** — `https://bestmt4ea.com/wp-json/wc-stripe/v1/webhook` is deliberately untouched: the owner will decide about it, and it must not be disabled, deleted or "fixed" (see AGENTS.md).
  3. **Smoke-test a live order** end to end: a $0 checkout with the comp email, a licence activation, a download. Google sign-in and the post-payment redirect both build from `APP_URL` = the apex, so they are testable now.
  4. **MT5 builds need MT5's MetaEditor on this machine** (`metaeditor64.exe`), or `METAEDITOR_MT5` set. Without it an MT5 build fails with a clear message rather than shipping a bad artefact.
  5. Then the Phase R rewrites, plus the standing small items: `npm audit fix`, deleting the two unreferenced large PNGs (747 KB of deploy weight), and the `/customer-feedback/` provenance decision.
  6. **Mint recovery codes for the live admin.** The enrolment that should have issued them never did — sign in, open `/admin/recovery-codes/`, press **Generate a new set**, and keep them offline.
  7. **Cloudflare Email Routing is blocked by an old MX.** The zone still holds the Brevo record `@ MX 0 mail.bestmt4ea.com`, so Email Routing refuses to install `route1/2/3.mx.cloudflare.net` ("non-Cloudflare MX records conflict"). Delete that MX, then merge to a **single** SPF — `v=spf1 include:_spf.mx.cloudflare.net include:spf.sendinblue.com ~all` — and leave the Brevo DKIM CNAMEs alone. Needed before `ceo@bestmt4ea.com` can receive mail.
  8. **Wrong-network USDT has no automatic path.** `fetchBep20Transfers` reads BSC (`chainid=56`) only, so a transfer on another chain is invisible: the payment sits `WAITING` → `EXPIRED` and the order stays pending. Settle by hand — verify the tx on the right explorer, recover the funds if the address is shared (any EVM chain), then **Approve** the order.
  9. **Phase R is underway — 1 of 119 rewritten.** Next steps when the owner green-lights: the email-capture flow (migration + `POST /api/downloads/` + `DownloadCard` capture mode — the privacy policy already permits it), the `PremiumEaCta` / `CopyTradingCta` components, the `CONTENT-STANDARD` / `AI-POST-BRIEF` / `AGENTS` doc updates, and the remaining resources. Note `check-downloads` caps source reuse at **4 posts per file**, so 119 posts need ~30 distinct resources, not 8–12.
- Last done: **Free downloads removed from the site** (decision: ship the main pages only). Deleted the 34 posts carrying a `download:` block, the `free-download-forex-ea-indicator` hub page + its route, the `/licences/` registry and `src/data/download-sources.json`; cleaned the hub links out of Header/Footer/homepage/404/LongFormLayout and the e2e spec; dropped the free product (`2000-trading-tools`) + its file + free download event from the local D1. **Also fixed a pre-existing red redirect build**: the WordPress SEO CSV had 38 dead targets (the deleted posts, the emptied `gold-xauusd-trading` archive, the withdrawn `2000-trading-tools`, a stale `forex-vps` slug, 2 never-imported posts) — all remapped in `RETIRED_TARGETS`. **Email split:** sign-in mail sends through the Cloudflare `EMAIL` binding (`send_email` restored, `EMAIL_FROM_*` unchanged); `src/emails/brevo.ts` is retained on the shelf for the free-download flow later. **Sitemap audit** against the live Yoast sitemap (211 URLs) found 38 with no page and no redirect; all 38 now 301 via `src/data/redirects-manual.json` — the 31 deleted free-download posts + their hub → `/top-ranking/`, the 3 gold archives emptied by the deletion → `/blog/`, 3 WooCommerce pages (`/wishlist/`, `/review-order/`, `/communication-preferences/`) → `/shop/`. `npm run release:check` PASSES (51.1s, 2377 rules). **Storefront wired and verified end to end.** `product_plans` is now seeded from `product-plans.json` (27 tiers across 10 products — real tier prices, durations and account allowances, nothing invented); the product and VPS pages carry a real `<form id="checkout-form">` posting to `/api/checkout/` (the plan radios already carried `plan`, so it works with no JS); the four `/checkout/*` pages exist (`/checkout/`, `/usdt/`, `/return/`, `/cancel/`); a `$0` trial settles through the same `settleOrder` instead of a provider; licence creation is now gated on `type === 'ea'` rather than `platform !== 'none'`, and VPS is seeded as `service` so it no longer demands a licence; a purchase receipt email (`order-confirmation`) is sent from the single settlement path. Verified locally over real HTTP: trial purchase → order `paid` + payment row + entitlement + PENDING licence → activate (ACTIVE) → **download streamed from the private R2 bucket**. 14/14 browser assertions passed, an unowned file returns 403 `not_entitled`, anonymous returns 401. Created the R2 bucket `bestmt4ea-files` (it did not exist) and migrated + seeded remote D1 (13 products, 27 plans, 10 EAs).
- Next action (superseded — the current list is at the top of this section):
  1. **Upload the product files — the one thing blocking delivery.** `product_files` is **0** on remote D1 and the R2 bucket holds no binaries, so a paid *or* trial customer gets a licence but an empty Downloads page. The owner has the MQL5 sources and a ZIP for the direct-purchase products: upload each object to `bestmt4ea-files` and add its `product_files` row (`product_id`, `r2_key`, `filename`), or hand over the folder path to be wired.
  2. **Set production secrets, then deploy.** `wrangler secret put SESSION_SECRET` (plus `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `TRON_RECEIVING_ADDRESS`, `TRONGRID_API_KEY`, `CRON_SECRET`, `PERF_INGEST_TOKEN`); verify `bestmt4ea.com` for Cloudflare Email Service (the `EMAIL` binding exists but needs the domain onboarded); register the Stripe webhook at `https://bestmt4ea.com/api/webhooks/stripe/`; then `npm run deploy` — the domain cutover is the last, owner-approved step.
  3. **Free downloads, later:** the 34 posts are deleted, so rebuilding means re-authoring content, not re-enabling it. **When they return, delete their 301s from `redirects-manual.json` in the same change** — `check-routes` fails if a redirect source becomes a live route. Same for the 3 gold categories if they refill.
  4. P11 live checks for on-demand routes, then the Phase R rewrites.
- Also this session: **clean / concise / minimal redesign pass for conversion** (owner asked twice; the first, denser pass was rejected). Rebuilt `/best-forex-brokers/` to the homepage bar — centred hero with gradient H1, `CountUp` proof strip, the two platforms we build on, a clean ranked list where **only #1 RoboForex and #2 Exness** are highlighted, then one FAQ and one CTA. Rebuilt `ProductCard` minimal (one badge, **Total gain + Max drawdown**, price, a single "Get licence" CTA) so the homepage EA directory, `/shop/`, `/top-ranking/` and product categories all share it. Files: `src/layouts/BrokersLayout.astro`, `src/components/{BrokerCard,ProductCard}.astro`, `src/styles/global.css`. `astro check` 0 errors; axe 0 blocking with one H1 and no overflow on `/`, `/shop/`, `/top-ranking/`, `/best-forex-brokers/` at desktop + mobile. Screenshots in `test-results/` (ignored).
- Also this session: **site-wide Obsidian promo ad** — `src/components/ObsidianPromo.astro` (ported from the Strive Algo featured banner) mounted once in `BaseLayout`, using real `getPerformance` figures; hidden on the Obsidian product page and the account/checkout routes. **Table consolidated:** `ComparisonRegistry` now replaces `RankingTable` on `/top-ranking/` and `/brand/[brand]/` too (matches `/`), and `RankingTable.astro` was deleted. **Brokers page:** "The full list" rebuilt from the Strive Algo `app/best-forex-brokers/page.tsx` card-row markup, and both missing pairs (Apex BTCUSD, Elysium EURCAD) added to `product-detail.json`.
- Also this session: **`/tools/` ported from the Strive Algo folder** — `src/data/tools.ts` (12 tools), `src/pages/tools/index.astro`, `src/pages/tools/[slug].astro`, and 10 components under `src/components/tools/` (9 calculators re-written as Astro + vanilla-JS, 1 TradingView widget component for rates/chart/calendar). All 12 pages prerender; calculators verified in-browser (pip 2 lots EURUSD $20.00 / XAUUSD $2.00; compounding $3,138 over 12 months; margin $1,085 at 1:100; R:R 2.00). `release:check` PASSED (57.6s) — 180 pages, 8,288 links. **`/copy-trading/` ported too** — new `src/layouts/CopyTradingLayout.astro` + `src/data/copy-trading.json`, routed from `[slug].astro` like BrokersLayout (markdown body no longer rendered). **Deliberate content deviation:** seeded from THIS site's own page, not the Strive numbers — Strive advertises `$2.3M+ AUM / 350+ traders` against this site's `$230K+ / 15+`, and Strive's copy carries an income projection (`10% per month → $10,000 in 24 months`) plus profit-specific testimonials, which break the no-income-claims rule the site is held to. Brokers are plain text (as in the reference), so the page needs no affiliate disclosure. `release:check` PASSED (61.0s).
- Also this session: **page fixes.** `/product-category/forex-robot/` was a live 301 target rendering "0 products" (WooCommerce's category name is not in our imported product frontmatter) — it now falls back to the EA catalogue (11 products), and the mojibake em-dash in its title is gone. Removed the orphan **20rem ad sidebar** from `PageLayout`, which was the floating "ADVERTISEMENT" and the cramped article on `/best-mt4-ea/` and `/best-forex-ea/`; both pages also lost their junk meta description and a stray legacy banner line. `/copy-trading/`: risk disclaimer moved under the FAQ and the closing CTA is now its own card. **TradingView widgets fixed** — with `autosize: true` the fixed height belongs on the wrapper, not the widget div (`/tools/live-charts/` was rendering at 150px, now 550). **Header:** added Tools, Login and Telegram support; only Explore EAs stays highlighted. `check-links` now also accepts the app's on-demand routes (`/login/`, `/dashboard/`, `/admin/`, `/checkout/`). `release:check` PASSED (60.1s), 8,638 links.
- Also this session: **EA review directories rebuilt.** New `src/layouts/ReviewsLayout.astro` renders the `/top-ranking/` board (`ComparisonRegistry`) filtered to a platform, and `[slug].astro` routes `best-mt4-ea` / `best-mt5-ea` / `best-forex-ea` to it (markdown bodies no longer rendered). `/best-mt5-ea/` did not exist at all (the request aborted) — created `src/content/pages/best-mt5-ea.md`. One title format for all three, carrying the catalogue month from `src/lib/dates.ts`: `Best {MT4|MT5|Forex} Expert Advisors {monthYear} — Myfxbook Verified`, in both `<title>` and the H1, so it re-dates itself on every rebuild (and on the planned daily rebuild). Row counts: MT4 3, MT5 8, Forex 11. `release:check` PASSED (58.5s).
- Also this session: **menu.** The Blog dropdown is now generated from the taxonomy's *live* categories (17 paths / 16 labels) grouped into four columns — Expert Advisors, Trading Tools, Strategies, Free Downloads & Guides — plus "View All Posts →". Only categories with posts are included (mirrors `scripts/routes.mjs`), so none of the 34-category taxonomy's empty archives become dead links. Reviews → Compare Platforms carries all three review pages, and "Best MT5 EAs" now points at `/best-mt5-ea/` (it pointed at `/best-forex-ea/`). Header nav also carries Tools, Login and Telegram support (only Explore EAs highlighted). `release:check` PASSED (89.2s) — 10,495 internal links across 182 pages.
- Also this session: **sticky vertical ad rails.** Post pages (`LongFormLayout`) and tool pages (`/tools/[slug]/`) carry a 160px rail either side of the column — 600px reserved height, `position: sticky` at 6rem, so the unit stays on screen while the reader scrolls. They sit in the container gutters, shown from 1320px (the tools page's 56rem column needs that viewport before a 160px unit fits beside it) and hidden below. New slots `PUBLIC_ADSENSE_SLOT_RAIL_LEFT` / `_RIGHT` fall back to the sidebar slot. **Bug found and fixed:** inside the `.longform` grid, `.longform > *` gave the rail `grid-column: 2`, making the reading column its containing block — the left rail overlapped the article (448–608 over content 448–1152) and could only stick for one row. The rails are now siblings of the grid, positioned against the container (measured 144–304 / 1296–1456 vs content 448–1152, no overlap, sticky holds at 96px through the article). They render empty locally because AdSense fills only approved inventory. `release:check` PASSED (59.8s).
- Also this session: **ad fallback.** `AdSlot` now takes an optional `fallback` slot, revealed when AdSense reports the unit `data-ad-status="unfilled"` — or never reports at all within 4s (blocked script) — and flipped back if a late fill arrives; the empty `<ins>` is taken out of flow so it cannot push the fallback down. New `src/components/PartnerFallback.astro` fills it with the two brokers the site actually tests on (RoboForex, Exness) from `affiliates.ts`, `rel="sponsored nofollow noopener"`, a "SPONSORED" chip and a visible disclosure. Wired to the two sticky rails on post and tool pages. **Two bugs fixed en route:** a document-wide init guard missed the second rail (inline scripts run mid-parse) — now bound per unit via `document.currentScript`; and the unfilled unit's reserved box sat above the fallback. Verified: 2/2 rails revealed, sticky at 96px, 4 sponsored links per page, no overflow. `release:check` PASSED (58.5s).
- Also this session: **customer feedback + menu.** New `/customer-feedback/` (public; the route is `/customer-feedback/`, not `/reviews/`) and `/admin/reviews/` (admin-gated, drafts). `scripts/import-review-drafts.mjs` imported all 100 entries from `C:\Users\Shovon\Downloads\bestmt4ea_100_review_drafts.html` into `src/data/reviews.json` as `status: "draft"` / `provenance: "ai-draft"` — that source file labels every entry "AI DRAFT — customer approval/edit required before publication", and the review wording is generated from real WooCommerce order records, so **nothing is rendered publicly until its `status` is set to `approved`** (a deliberate act after the customer confirms). The public page shows approved reviews plus the genuine `testimonials.json` quotes; with 0 approved it renders an empty-state explaining the policy. **Menu finished:** column icons (desktop + mobile) from a `MENU_ICONS` map, hover chevrons on every link, and "Customer Reviews" added to Reviews → Compare Platforms. Verified: `astro check` 0 errors; `/reviews/` 200 with 0 drafts exposed; `/admin/reviews/` 302 to login when anonymous; `release:check` PASSED (59.9s) — 183 pages, 10,730 links.
- Also this session: **live-site reviews collected.** `src/data/site-reviews.json` holds every review the live WordPress store publishes — 12 review bodies across 9 products plus the 4 site-wide "Verified Buyer" testimonials — read page-by-page with `web_fetch` because bestmt4ea.com returns **403 to both plain HTTP and headless Chromium** (a scripted Playwright collector was written, confirmed blocked, and removed). Run-of-site counts are higher than published text: the site advertises **25 ratings but shows 12 review bodies** (VPS 11 ratings / 2 reviews; `2000-trading-tools` 3 ratings while its own tab says "There are no reviews yet"). **Nothing is rendered** — the file records integrity flags instead, because the data is not clean: the 4 testimonial names *are* 4 of the reviewers with their review text lifted from the testimonial copy, the AVA/Chris Aronson and Nexora/Bobby McTee reviews are word-for-word identical, the Onix/Bennett Carter and Apex/Mc Cluskey reviews differ by one word, and 3 reviews are explicit profit claims (`$30,000 → $40,000 in one month`) that breach the site's own no-income-claims rule. Publish-or-not is an open owner decision.
- Also this session: **Google review-policy compliance pass.** The site was publishing rating claims it could not back, so all of them came out. Removed `aggregateRating` from `productSchema` (it gave 10 products a `5.0` rating sourced from imported WooCommerce counts, not from reviews anyone could read — one product was marked up with 3 ratings while its own store page said "There are no reviews yet"); the imported-count rating panels in `ProductLayout` (hero **and** the reviews section) and `VpsLayout` (hero **and** its own rating section); the site-wide "★★★★★ 4.8 · 8,500+ traders" row on the homepage and `/top-ranking/` (`averageRating` is gone from `site-stats.json`); and `src/data/testimonials.json` with its 8 named "Verified owner" quotes plus both sections that rendered them — 4 of the 8 carried profit claims, and the section lead ("Quotes from verified owners on strivealgo.com and bestmt4ea.com") was admitting they were another site's testimonials relabelled as this one's customers. `ratingAverage`/`ratingCount` also left `content.config.ts`. **The 13 product frontmatter files keep those keys on purpose:** stripping them turns 13 untouched product pages into changed content and drags their pre-existing debt into the changed-content gate (99 violations, mostly missing quickAnswer/takeaways/FAQs); strip them in the Phase R rewrite, not an infra change. **New gate:** `check-schema` now fails on any `aggregateRating:` authored anywhere in `src/` — a source scan, because product pages are server-rendered and never appear in `dist/` (the dist walk reports **0 Product nodes**, so a dist-only rule would never have fired); verified with a decoy file (exit 1) and without (exit 0). Policy written up in `docs/CONTENT-STANDARD.md` §4. `release:check` PASSED (60.4s), 183 pages, 10,730 links.
- Also this session: **Myfxbook performance wired and verified.** The three product-page panels (Account statistics / Monthly log / Trade statistics) were rendering their empty states because **both local and remote D1 held 0 accounts and 0 snapshots** — the collector had never run; no code was broken. Ran `scripts/collect-myfxbook.mjs` (headless Chromium, because Myfxbook 403s plain fetches): 6/6 accounts ingested and **verified figure-by-figure against the live Myfxbook page** (mythos: gain 73.65% / Abs. 73.63% / daily 0.40% / monthly 14.00% / dd 41.41% / balance $1,736.31 / equity (97.64%) $1,695.37 / 103 trades / 73,635.8 pips / PF 1.96 / Sharpe 0.26 / longs (46/69) 66% — all match). **Two real bugs fixed:** (1) Myfxbook's *"Other Systems by Bestmt4ea"* table carries a `Gain` column, so it matched the summary matcher and **6 of the 30 "Account statistics" cards were other products' gains presented as this account's own metrics** — `buildRaw` now skips it by its `Name`+`Gain` header, giving 25 clean cards on all six products; (2) the Monthly log reported a single capture as a flat `+0.00%` month — a month now requires **≥2 captures** to have a change to report (`ProductLayout`). **Known limitation:** Myfxbook serves the monthly chart intermittently to anonymous visitors (measured 6 points / 0 / 0 across three consecutive loads of the same account); a reload-retry made it *worse* (5/6 empty vs 2/6) and was reverted with a comment saying so — set `MYFXBOOK_SESSION` for reliable monthly data, otherwise the month view accrues from the hourly captures. **Production seeded** with the 6 verified snapshots (remote `performance_snapshots`: 6 rows, all carrying `raw`), so the deployed pages show figures immediately; `.github/workflows/myfxbook-sync.yml` (hourly) still needs repo secrets `BESTMT4EA_INGEST_URL` + `PERF_INGEST_TOKEN` to keep it fresh on its own. `release:check` PASSED (80.8s).
- Also this session: **Myfxbook sync moved to a 24-hour cadence, with monthly reliability.** `.github/workflows/myfxbook-sync.yml` went from hourly to daily (`cron: '0 4 * * *'`) — product pages are server-rendered and read the newest snapshot per request (5-minute edge cache), so one run a day is all the freshness they need, and a gentler cadence is also kinder to Myfxbook. **New fallback:** because Myfxbook serves the monthly chart intermittently, a capture can arrive with current summary and trade figures but no months at all; `src/pages/product/[slug].astro` now reuses the most recent capture that *did* include the chart instead of blanking the Monthly log for a day. Verified end to end by POSTing a sentinel snapshot through the real ingest endpoint — the headline rendered the sentinel `88.88%` while the Monthly log still showed the older capture's 4 months — then deleting the sentinel and repairing the account `url` that the test payload had nulled (the sentinel was also only ever written locally; production was untouched by it). **Known gap, needs an owner decision:** `getPerformance()` is a build-time pure function reading the *static* `editorial` transcription, so the prerendered pages (homepage, `/shop/`, `/top-ranking/`, the header column, the Obsidian promo) still show the September transcribed figures while the SSR product page shows live D1 — obsidian currently reads 147.21% / 80.14% on the homepage against **50.86% / 92.39%** on its own page. Closing that is the Phase 2 daily static rebuild: refresh `myfxbook-live.json` from the newest D1 snapshot before each build, then rebuild + deploy unattended (needs a Cloudflare API token secret). **Heads-up:** Myfxbook started returning **403 for every account** after this session's repeated collection runs — that is rate-limiting on my IP from hammering it during debugging, not a code fault; the daily cron is far gentler and the 6 verified snapshots are already in both databases. `release:check` PASSED (139.2s).
- Also this session: **product files wired, and per-licence EA build delivery built (the licensed product had no way to ship).** Uploaded the two owner packages to the private `bestmt4ea-files` bucket and round-tripped them byte-identical: `fxcore100-ea/FXCore100-EA-v5.1.zip` (its `product_files` row already carried exactly that key, so it went live) and `golden-deer-holy-grail-indicator/Golden-Deer-Holy-Grail-Indicator.zip` (no row existed — added one, local + remote). Delivery needs no public domain: `authorizeDownload`/the download route stream `env.FILES.get(r2Key)` through the Worker, so the unresolved `files.bestmt4ea.com` only affects `DownloadCard` for posts. Note the "product_files is 0 / bucket holds no binaries" line in this doc was **stale** — 2 rows and objects already existed. **The licensed product is the problem.** `ava-aigpt5-ea` is `type: 'ea'`; its row points at `ava-aigpt5-ea/Millionaire-Gold-Miner-Pro-EA.zip`, which exists in R2 but holds one compiled `.ex4` whose embedded strings are **`XAU MINER EA`** / `https://t.me/xauminerEA` — a different vendor's product. That row is not the deliverable, and neither is the `.mq4` beside it: `int Account = 0;` means *any* account is authorised, `Expire = D'01.01.2227'` never lapses, and it is the full readable strategy source. **Owner's rule: customers receive a compiled `.ex4` built per account number + expiry.** That path was dead — `markBuildReady()` wrote an r2Key that **nothing ever served**; the portal read only `product_files`. Built the missing half: `authorizeBuildDownload()` (build is theirs · licence ACTIVE · build READY · shares the hourly cap) → `GET /api/download/build/[buildId]/` streams from the private bucket (`private, no-store`, attachment) and audits a `license_events` `build_downloaded` row, since `download_events.product_file_id` is NOT NULL; `listCustomerBuilds()` plus `/dashboard/downloads/` shows "Compiled for account #N · licensed until <date>"; `listCustomerDownloads()` now skips `type: 'ea'` so the wrong shared zip is never offered; and `POST /api/admin/build/` with a file input on `/admin/builds/` is what finally makes a build attachable (PENDING → READY). **Verified end to end** with a throwaway local fixture (2 customers, ACTIVE + SUSPENDED licences, READY + PENDING builds, local R2 objects; seeded, tested, then deleted): 8/8 gates — anonymous 401, browser 303 to `/login/`, owner + READY **200 with bytes SHA256-identical to the uploaded artifact**, PENDING 403 `build_not_ready`, another customer's build 403 `not_yours`, suspended licence 403 `license_not_active`, unknown 404 — plus 7/7 on the downloads page and the audit row confirmed. `astro check` 0 errors; `release:check` PASSED (139.0s). **Open:** the AVA row still points at the XAU MINER EA zip (it is simply no longer listed); per-account `.ex4`s must be compiled and attached on `/admin/builds/`. Also confirm redistribution rights for the 8 third-party indicators bundled in the Golden Deer zip.
- Also this session: **the licence build is automatic — no per-customer hardcoding.** The owner's objection was right: a queue plus an upload form is not automation. The chain is now purchase → customer enters their MT4 account at `/dashboard/licenses/` → `activateLicense` queues a build → **a runner compiles it** → READY → `GET /api/download/build/<id>/`. Added `scripts/build-licenses.mjs` (+ `npm run build:licenses`): pull the queue, bind `int Account` / `datetime Expire` into a copy of the product's source, compile with MetaEditor, post the artefact back. Three token-guarded endpoints (`/api/internal/builds/pending|template|ready`, `x-cron-secret`, same guard as the other cron endpoints), `src/server/builds.ts` for the conventions and the single write path `storeBuild()` (now shared with the admin upload), and `.github/workflows/build-licenses.yml` (windows-latest, every 15 min). **The MQL source never enters git:** `product-files/` is gitignored, so the template lives in the private bucket at `templates/<productId>/source.mq4` (uploaded, local + remote) and is served `no-store` only after the productId is checked against the catalogue — the endpoint cannot be turned into an arbitrary-object reader. **Verified for real on this machine** using the owner's own MT4 MetaEditor: substitution → compile → attach → customer download; the compiled 65 KB `.ex4` downloads as `ava-aigpt5-ea-90099999.ex4`, its `EX-` magic byte-identical to a known-good `.ex4`, and the earlier 8/8 route gates still hold. **Bugs the test caught:** MetaEditor writes its compile log as **UTF-16LE**, so the `Result: 0 errors` line was unreadable and every build "failed"; the queue included builds on **EXPIRED** licences (`listPendingBuilds` now requires licence ACTIVE — an ineligible entry can never be downloaded anyway); and the served filename was the raw R2 key (`90099999-1791192395312.ex4`) until the object was named after the artefact. **Hard constraint confirmed:** MT5's MetaEditor will NOT compile MQL4 (`error 208: unsupported file extension`), so the runner needs a real **MT4** terminal, whose installer MetaQuotes ships through brokers — hence `MT4_INSTALLER_URL` is a repo secret and the workflow's install step is the one piece not testable from here. **Still open:** there is **no git remote**, so the workflow cannot run until one is added; the AVA `product_files` row still points at the XAU MINER EA zip (it is simply no longer listed); and local D1 carries a leftover `smoke-customer` licence (EXPIRED, onix) from an earlier session.
- Also this session: **the repo is on GitHub and CI is wired.** Public **github.com/shovonicon/bestmt4ea** (default branch `main`), created with `gh` — installed via winget, and note `gh auth login` is unusable in this environment (no TTY: it prints nothing at all, even redirected to a file), so the device flow was driven directly using gh's own public OAuth client id, with the token piped into `gh auth login --with-token` so it never touched disk. Excluded from the public tree *before* the first push: `competitors_for_bestmt4ea.com.csv` (competitor keyword/traffic/backlink research), `.wp-cache/` (10.5 MB of scraped WordPress dumps) and `.commandcode/`; deleted the two 0-byte accidents `$null` and `console.log('`. Repo secrets set: `BESTMT4EA_APP_URL`, `CRON_SECRET`. **First run 37294557027 failed exactly as designed** — windows-latest checkout, setup-node and `npm ci` all passed, then `Install MetaTrader 4` raised its own guard because `MT4_INSTALLER_URL` is unset; that secret is the only remaining piece and only the owner can supply their broker's MT4 installer (MT5's MetaEditor cannot compile MQL4 — `error 208`). Cadence corrected from 15 minutes to 6 hours + dispatch, plus `repository_dispatch` for instant builds: a 15-minute Windows poll would have burned ~23,000 billed minutes a month. Because public Actions logs are world-readable, `build-licenses.mjs` now masks account numbers to their last four digits. **Google sign-in does not exist:** `/login` is email-magic-link only (`/auth/request` + `/auth/verify`, backed by `login_tokens`), there is no OAuth route and no `GOOGLE_*` secret anywhere — the only Google integrations in the codebase are AdSense and admin TOTP 2FA. Phase 3 of the approved plan remains unbuilt.
- Also this session: **`/login` rebuilt premium, and a sitewide token bug fixed.** The page was a bare centred form whose CTA used `bg-[--color-brand]` — **a token that does not exist** (the design system defines `--color-accent`), so the submit button painted no background at all: black text on black. The same typo appeared **13 times across 7 files** (dashboard downloads/support/licenses, admin login/verify/builds/licenses), meaning every one of those buttons was invisible; all are now repointed at `--color-accent`. `/login` now follows the site's system: glow orb + grid overlay, `.eyebrow` + `.live-dot` pill, a balanced gradient H1, and a `.brand-card` gate with a visible `.metric-label` label (never placeholder-as-label), a 54px `.btn-primary` CTA, and real states — on `?sent=1` the confirmation replaces the form and offers a way back, and errors render in a `role=alert` panel above a still-usable form, while an unknown `?error=` code renders nothing rather than an empty box. Composition is centred (`min-h-[68vh]` + `lg:items-center`) so the card sits against the taller left column instead of leaving a void above the footer. **Verified** with 12/12 Playwright assertions — CTA paints the gradient and is ≥44px tall, the input is 16px (no iOS zoom on focus), `label[for]` resolves for AT, the alert appears only in the error state, and there is no horizontal overflow at 1440 or 390 — plus `release:check` PASSED (133.5s) with 27 e2e green. Desktop and mobile screenshots reviewed. **Deliberately omitted:** a "Continue with Google" button, because that OAuth route does not exist yet — a dead button would be worse than none.
- Also this session: **Google sign-in built, blocked on one console setting.** Added `src/server/google.ts` (authorisation-code flow: consent URL, code exchange, ID-token claim checks), `GET /auth/google/` and `/auth/google/callback/`. Identity is keyed on the **verified** Google email via the existing `upsertCustomer()` + `issueSession()`, so Google and the magic link land on the same customer. `state` is minted into an HttpOnly cookie and enforced on the way back (a wrong state returns `?error=csrf`); a refusal or a failed exchange returns to login rather than a 500. The "Continue with Google" button renders **only** when `GOOGLE_CLIENT_ID` + `GOOGLE_CLIENT_SECRET` are present, so there is never a dead button. `Env` was regenerated with `npm run types` after adding the keys to `.dev.vars`. Verified with placeholder credentials (the consent URL carries the right `redirect_uri`, scope and `state`) and then against the owner's real client: **Google accepts the client id and secret but rejects the redirect URI** — `Error 400: redirect_uri_mismatch`, request details `redirect_uri=http://localhost:4321/auth/google/callback/`. The fix is console-only: add that URI, and `https://bestmt4ea.com/auth/google/callback/`, under **Authorised redirect URIs** (not "Authorised JavaScript origins") on the OAuth client. **Also flagged:** that OAuth app was named **"Potato"** with support email "Potatoemail" — which is what a customer would read on the consent screen. The console was then fixed (localhost redirect URI added, app renamed to **BESTMT4EA**) and the flow **proven live**: a real Google sign-in created the customer `svn365bd@gmail.com` carrying the Google profile name **"Md. Al Amin Sufi"** — a field only the Google callback path writes — and issued a 30-day session, taking local D1 from 2 customers / 3 sessions to 3 / 4. Google's sign-in page now reads "Sign in to continue to BESTMT4EA". Still needed for production: add the `https://bestmt4ea.com/auth/google/callback/` redirect URI, publish the consent screen if it is still in **Testing** (otherwise only test users can sign in), and set both Worker secrets after the first deploy. `astro check` 0 errors; `release:check` PASSED (128.0s).
- Also this session: **delivery split by product type, and the copy now matches it.** The rule: a `tool` (FXCore100, Golden Deer) needs **no licence** — it unlocks on the Downloads page the moment payment settles; a `service` (the VPS) is hand-delivered over **Telegram**; an `ea` needs a licence and a compiled build. The backend already behaved that way (`settleOrder` creates a licence only for `type === 'ea'`, and `vps` has no `product_files` row at all), but every post-purchase surface assumed an expert advisor — the order page told a tool buyer to "activate your licence" and a VPS buyer to "download your file", the receipt repeated it, and the VPS product page said nothing about how it arrives. Added `src/lib/delivery.ts` as the single vocabulary (`deliveryChannelFor`, `deliverySteps`, `DELIVERY_LABEL`, `TELEGRAM_FULFILMENT_URL`) and drove four surfaces from it: `/checkout/return/` and the receipt email now derive their instructions from the order's own items (so a mixed basket gets both), `/dashboard/downloads/` gains a **"Delivered over Telegram"** section via the new `listTelegramDeliveries()` — with a `@pizion` button and no download link — and its empty state now covers tools as well as EAs; the VPS page carries a Delivery panel from `vps-detail.json`. **Verified 11/11 against a throwaway fixture**: the VPS page shows the panel and never promises a dashboard download, the dashboard lists the VPS under Telegram while offering **no** VPS download (its endpoint 404s), and the tool downloads with **200 and bytes matching the uploaded zip, with no licence**. `astro check` 0 errors; `release:check` PASSED (61.9s).
- Blockers: none in the repo.
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

**Phase P11 — release gates, browser tests, cutover** (P0–P10 are DONE; the content rollout
is paused until Phase R).

Done: **P0** D1 schema + USDT engine. **P1** Astro SSR on Cloudflare. **P2** passwordless
accounts. **P3** catalogue + gated downloads. **P4** payments. **P5** premium licensing.
**P6** customer portal. **P7** admin platform. **P8** Telegram communication-only. **P9**
performance pipeline + SSR product pages. **P10** companion cron Worker.

Next, in order:

1. **P11** — restore the coverage that moved off the static build:
   - `check-rendered-html` (product structure) and `check-schema` (`Product` JSON-LD) now
     report **0 product pages** because product pages are SSR; add a **live-server** pass
     (probe `wrangler dev` / the deployed Worker) so product-page structure and Product
     schema are checked again.
   - Extend browser tests to the on-demand routes, then the DNS cutover.
2. **Phase R** — the 119 content rewrites.

Hard prerequisites before premium EX5 ships: **remove the public R2 custom domain**; the
private **build machine** for `license_builds`.

Also open: checkout/payment pages (UI), settlement emails, customer **renew** (currently a
re-purchase), a real pricing pass so `product_plans` exist, and product pages reading the
catalogue from D1.

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

## Phase P4 — payments (Stripe + USDT TRC20) (DONE 2026-10-03)

- **`src/server/orders.ts`** — `createOrder` (from plans), and the **single settlement path**
  `settleOrder`: it marks the order paid, records one payment row, and **grants the
  entitlements** (with each plan's `durationDays`). Idempotent — an already-paid order
  settles to `applied: false` and grants nothing again. `getOrder` / `markOrderFailed`.
  Nothing else may mark an order paid, so a forged or replayed payment cannot unlock
  anything.
- **`src/server/stripe.ts`** — thin wrapper over Stripe-hosted Checkout only
  (`createCheckoutSession`, `verifyCheckoutSession`, `constructWebhookEvent`). Card details
  never touch the Worker.
- **`src/server/payments.ts`** — the Stripe reconcile path (`reconcileStripeSession`) used by
  **both** the return page and the webhook, plus replay-safe `recordWebhookEvent`
  (`webhook_events.dedupe_key`).
- **`src/server/usdt-payments.ts`** — the USDT orchestration over the P0 pure engine +
  TronGrid: `createUsdtPayment` (unique amount), `pollUsdtPayments` (expire + fetch once +
  match all WAITING orders + settle), `expireUsdtPayments`.
- **Endpoints**: `POST /api/checkout` (order → card session or USDT payment),
  `GET /api/payments/usdt/[id]` (status; the browser never decides validity),
  `POST /api/webhooks/stripe`, and the secret-guarded `POST /api/internal/usdt-poll/` — the
  seam the companion cron Worker calls every 60s.

Verification: `npm run release:check` — **PASSED (72.6s)**; `vitest` 21/21. Live
`wrangler dev` + a mock TronGrid **PAYMENT SMOKE PASS (9/9)**: checkout mints a unique
amount, a premium download is refused (403) before payment, the poll matches the transfer
and settles, the order and payment go paid, the **premium download now succeeds (200)**, and
a **replay re-settles nothing** (`matched: 0`).

> P4 follow-ups (deliberate): the companion cron Worker (the 60s trigger), the checkout and
> USDT payment **pages** (UI), settlement **emails**, and a **real pricing pass** so
> `product_plans` exist in production. Stripe is implemented but **not live-tested** — no
> keys here — so it is exercised only by type-check until real keys are set.

## Phase P5 — premium licensing & EX5 delivery (DONE 2026-10-03)

Implements plan §6c: entitlement → **licence** → bound MT5 account → compiled EX5.

- **`src/server/licenses.ts`** — the licence domain:
  - `generateLicenseKey()` — non-sequential `BMT4-XXXX-XXXX-XXXX` from an alphabet with no
    `0/O/1/L` (the key is a lookup/identifier, not the security boundary).
  - `createLicense` (PENDING), `getLicense` / `getLicenseByKey` / `listLicensesForCustomer` /
    `listActiveAccounts`, `getActiveLicense` / `hasAnyLicense`.
  - Transitions, each writing a `license_events` row: `activateLicense` (bind account,
    PENDING → ACTIVE, queue a build), `extendLicense` (new window + rebuild),
    `changeLicenseAccount` (deactivate old, add new, rebuild), `suspendLicense` /
    `resumeLicense` / `revokeLicense` (REVOKED is terminal).
  - Build queue: `enqueueBuild`, `listPendingBuilds`, `markBuildReady`, `markBuildFailed`.
- **Settlement integration** — `settleOrder` now creates a **PENDING licence** for every EA
  product bought (`grantEntitlement` returns the entitlement id), so activation is the next
  customer step.
- **Download gate** — `authorizeDownload` now requires an **ACTIVE licence** (in window) for
  an `ea` product, on top of the active entitlement; free products and non-EA premium
  products are unaffected.
- **Routes** — `GET /api/licenses/` (the customer's licences + bound accounts),
  `POST /api/licenses/activate/` (bind the MT5 account), and a customer page at
  `/dashboard/licenses/`.

Verification: `npm run release:check` — **PASSED (65.2s)**; `vitest` 21/21. Live
`wrangler dev` + mock TronGrid **LICENSE SMOKE PASS (9/9)**: purchase → PENDING licence
(key `BMT4-UEUK-JCVM-KN99`) → EA download refused (403) → activation (bind account) →
download allowed (200) → a second account refused (409, `max_accounts`).

> P5 follow-ups (deliberate): the private **build machine** that consumes `license_builds`
> and uploads the compiled EX5 to R2, and admin licence/build management (P7). The **R2
> bucket is still world-readable** via its public custom domain — that must be removed before
> any premium EX5 is stored. Customer renew / account-change *requests* land in P6.

## Phase P6 — customer portal (DONE 2026-10-03)

- **`src/server/portal.ts`** — the read models: `listCustomerDownloads` returns every file
  the customer may download (the whole free library, plus premium files they hold an active
  entitlement for — and an **active licence** for an EA), applying the same rules as the
  download endpoint; `listOrdersForCustomer` returns orders with their items.
- **`requestAccountChange`** (`src/server/licenses.ts`) — records a customer's request as a
  `license_events` row (`account_change_requested`); an admin approves it in P7 via
  `changeLicenseAccount`. Recorded, not applied — account changes are limited by policy.
- **Pages** (all `prerender = false`, session-gated): `/dashboard/` (counts + nav),
  `/dashboard/licenses/` (activate a PENDING licence, request an account change on an ACTIVE
  one), `/dashboard/downloads/` (licensed + free, streamed through `/api/download`),
  `/dashboard/orders/`, `/dashboard/account/`, `/dashboard/support/` (Telegram =
  communication only).
- **Endpoint** — `POST /api/licenses/request-account-change/`.

Verification: `npm run release:check` — **PASSED (75.1s)**; `vitest` 21/21. Live
`wrangler dev` **PORTAL SMOKE PASS (10/10)**: dashboard / downloads / orders / account /
support all render for the signed-in customer, the downloads page lists the files, a
signed-out visitor is redirected to `/login/`, and an account-change request is accepted.

> P6 follow-ups: customer **renew** is currently a re-purchase (a dedicated renew flow is
> later); payment/checkout **pages** (UI) and settlement **emails** are still open.

## Phase P7 — admin platform (DONE 2026-10-03)

- **`src/lib/totp.ts`** — RFC 6238 TOTP (SHA-1 / 6 digits / 30s), WebCrypto only.
- **`src/server/admin-auth.ts`** — password verification then a **TOTP / recovery code**
  second factor; `requireAdminMfa` / `isPendingAdmin` (type predicates, so a guarded page
  narrows the session); `audit()` writes `audit_log`. Enrolment secret is minted on first
  login and shown on the verify page (authenticator QR text included).
- **`scripts/create-admin.mjs`** — `node scripts/create-admin.mjs --email … --password …`
  (hashes with the same PBKDF2 as the app).
- **`/admin` behind password + TOTP:** `login` → `verify` (enrol) → panel. Dashboard KPIs
  (customers, active licences, paid orders, revenue, pending builds, USDT waiting);
  `/admin/licenses` (suspend / resume / revoke / extend / rebuild / **approve account
  change**); `/admin/orders`, `/admin/payments` (USDT monitor), `/admin/builds`,
  `/admin/customers`.
- **Endpoints** — `POST /api/admin/login`, `POST /api/admin/verify`,
  `POST /api/admin/license` (every licence action is audited).

Verification: `npm run release:check` — **PASSED (66.4s)**; `vitest` 21/21. Live
`wrangler dev` **ADMIN SMOKE PASS (11/11)**: password accepted → unverified session blocked
from the panel → verify page shows the enrolment secret → a computed TOTP code is verified →
the panel renders → the admin suspends a licence and it flips to `SUSPENDED`.

> The gate caught **8 real type errors** here (`requireAdminMfa` returned `boolean`, so TS
> could not narrow `session`) — fixed by making both guards type predicates. P7 follow-ups:
> recovery-code display/download, admin refunds, and richer per-customer drill-downs.

## Phase P8 — Telegram is communication only (DONE 2026-10-03)

No bot, no notifications, no account linking, no file delivery over Telegram — it is a
support/contact channel (the floating button + support links, unchanged).

- **Copy fix.** Product and page content promised delivery "**via Telegram**"
  (`delivered … via **[Telegram]**`, and one "delivered directly to your Telegram"). That
  contradicted both the platform (delivery is from the dashboard) and the policy. Rewrote
  **14 files** — 10 product pages, `best-forex-ea`, `best-mt4-ea`, the free-download page,
  and the `ProductLayout` feature list — to state delivery from the **BestMT4EA dashboard**
  with Telegram as *help/support*.
- Verified none remain (`delivered in 6 Hours` / `delivered directly to your Telegram` /
  `Instant download after successful payment … Telegram` → no matches).
- Content hashes re-baselined (`changed-files --write`, 189 files) since the change is
  intentional.

Verification: `npm run release:check` — **PASSED (67.5s)**; `vitest` 21/21; `astro check` 0
errors.

## Phase P9 — MyFxBook performance pipeline (DONE 2026-10-03)

Delivers the data path the site was missing: real MyFXBook figures in D1, instead of the
hand-transcribed `src/lib/performance.ts`.

- **`src/server/performance.ts`** — `recordSnapshot` / `recordTrades` (upsert the account,
  insert the snapshot, insert trades de-duplicated by `(account, tradeId)`) and the read
  models `getLatestSnapshot` / `getSeries` over `performance_accounts` /
  `performance_snapshots` / `trades`. `ensureAccount` only patches fields that were
  actually provided, so a trades-only call cannot wipe the account type.
- **`POST /api/performance/ingest`** — the endpoint the scheduled collector POSTs to,
  guarded by `PERF_INGEST_TOKEN` (`x-ingest-token`). MyFXBook returns **403** to plain
  server-side fetches, so the scrape runs in a headless browser **outside the Worker** and
  pushes here; the browser never reaches this route.
- **`GET /api/performance/[slug]`** — public read: the latest snapshot + the recent series.
- `.dev.vars(.example)`: `PERF_INGEST_TOKEN`; `wrangler types` regenerated.

Verification: `npm run release:check` — **PASSED (63.5s)**; `vitest` 21/21. Live
`wrangler dev` **PERFORMANCE SMOKE PASS (8/8)**: ingest refused without the token (401);
a snapshot + trade accepted (200); the read returns the figures, the account type is
preserved (`demo`), the series is present, and an unknown product 404s.

> **Deferred (P9 remainder):** the *product page* does not yet render this data. Rendering
> it server-side needs `src/pages/product/[slug].astro` converted to edge-cached **SSR**,
> which removes it from `dist/client` — so `check-links` and the sitemap must first accept
> product routes as live on-demand routes. The collector that calls the ingest endpoint is
> also external (GitHub Actions / a small runner) and not part of this repo.

### P9 remainder — product-page SSR + gate updates (DONE 2026-10-03)

- **`src/pages/product/[slug].astro`** now sets `prerender = false`, resolves the product
  from the collection by `Astro.params.slug`, reads the latest snapshot from D1
  (`getLatestSnapshot`), sets `Cache-Control: public, s-maxage=300`, and passes `live` to
  the layout.
- **`ProductLayout`** accepts `live` and overlays it on the transcribed figures — the live
  numbers win, and the "track record" line becomes a real **synced** label (via
  `perf.live` + `lastVerified`).
- **Gate changes for on-demand routes:**
  - `check-links` accepts a link when the path is a **live route** (`routes.mjs`) even though
    it has no file in `dist/client`.
  - `astro.config.mjs` re-adds the product URLs to the **sitemap** via `customPages` (an SSR
    page is not in the build's page list).
  - `playwright.config.ts` runs the browser tests against **`wrangler dev`** (the real
    Worker) instead of the static `dist` server, so on-demand pages are served.

Verification: `npm run release:check` — **PASSED (71.6s)**; `check-links` 10,153 links across
207 pages; Playwright 24/24. `/product/onix-stratos-xauusd-ea-ai-smart-scalper-for-mt5/`
returns 200 and renders the ingested figures (**9.39** gain, **5.54** drawdown) with a
synced label.

> **Coverage note for P11:** `check-rendered-html` (product structure) and `check-schema`
> (`Product` JSON-LD) now see **0 product pages**, because product pages are no longer in
> `dist/client`. They still pass, but that coverage must move to a **live** check.

## Phase P10 — companion cron Worker (DONE 2026-10-03)

- **`worker-cron/`** (`bestmt4ea-cron`) — a separate Worker with **Cron Triggers**:
  `* * * * *` (every minute → `POST /api/internal/usdt-poll/`) and `0 3 * * *` (daily 03:00 →
  `/api/internal/license-expiry/` and `/api/internal/cleanup/`). It holds **no** bindings —
  it is a thin scheduler that calls the app's secret-guarded internal endpoints (the Astro
  adapter owns the main Worker entrypoint, so cron cannot live there).
- **`/api/internal/license-expiry/`** — `expireLicenses()` sweeps ACTIVE licences whose
  window has passed → EXPIRED, each writing a `license_events` row.
- **`/api/internal/cleanup/`** — drops settled/expired USDT rows older than 30 days and
  stale rate-limit windows.
- `package.json`: `cron:dev` / `cron:dry-run` / `cron:deploy`. The release gate gained a
  **Cron Worker dry-run** step (17).

Verification: `npm run release:check` — **PASSED (71.6s)** including the Cron Worker dry-run.
Live end-to-end **CRON SMOKE PASS (3/3)**, with the main app on 8788 and the cron Worker on
8789 (`--test-scheduled`): the internal endpoint refuses an unknown caller (401); the cron
Worker's daily job runs; and the prepared ACTIVE-past-expiry licence is flipped to
**EXPIRED** through the app — proving the whole cron → app → D1 path.

## Scheduled Myfxbook collector (DONE 2026-10-03)

The ingest endpoint existed since P9 but **nothing was calling it** — the collector was
described as "external and not part of this repo", so every product page except the one
seeded by the P9 smoke test still fell back to the hand-transcribed figures. That gap is
now closed.

- **`scripts/collect-myfxbook.mjs`** (`npm run collect:myfxbook`) — a Playwright collector.
  A plain `curl` of a Myfxbook account page returns **403**, so this drives a real headless
  Chromium instead, which loads the page normally. For **every** account in
  `src/data/myfxbook-accounts.json` it reads the published figures straight from the DOM —
  the summary tables (Gain / Abs. gain / Daily / Monthly / Drawdown / Balance / Equity /
  Highest / Profit / Interest / Deposits / Withdrawals), the period table (This week /
  month / year), and the three statistics tables (~20 pairs) — then derives the metrics
  (`growthPct`, `drawdownPct`, `profitFactor`, `winRatePct`, balance/equity/profit in cents,
  account type) and POSTs the whole thing to `POST /api/performance/ingest/` with
  `x-ingest-token`. Flags: `--dry-run` (scrape and print, no POST), `--only <slug>`.
  A figure that cannot be read is **omitted, never guessed**, so a Myfxbook markup change
  surfaces as a gap instead of a wrong number on a product page.
- **`.github/workflows/myfxbook-sync.yml`** — runs it **hourly** (`0 * * * *`) plus
  `workflow_dispatch`, installing Chromium, with a `concurrency` group so runs cannot
  overlap. Secrets: `BESTMT4EA_INGEST_URL`, `PERF_INGEST_TOKEN`, and optional
  `MYFXBOOK_SESSION`.
- **The monthly breakdown is the one part that needs a session.** Myfxbook's Monthly
  Analytics is a Highcharts chart fed by `/private/charts.json`, which returns **403 to
  anonymous visitors** (confirmed in a real browser, not just via curl). The collector
  already reads the chart's series when it *is* available, so setting `MYFXBOOK_SESSION`
  (a signed-in cookie) is all that is needed to light up `MonthlyGainChart`; without it the
  chart falls back to the months derivable from our own synced history.

Verification (local D1, dev server on 4321): `node scripts/collect-myfxbook.mjs --dry-run
--only onix-…` → `gain=10.44% dd=6.81% pf=1.39 periods=3 stats=20 months=0`. A full run
`PERF_INGEST_TOKEN=… node scripts/collect-myfxbook.mjs` → **Ingested 6/6 accounts**
(obsidian 46.99%/86.30%, onix 10.44%/6.81%, zenith 90.43%/47.85%, nexora 51.46%/37.42%,
mythos 73.65%/41.41%, equinox 32.66%/63.90%). All six product pages then rendered
**"Synchronized … from Myfxbook"** with **zero** transcribed fallbacks and the
"Myfxbook live feed" label. Note the live read corrected real drift: Obsidian's published
account now shows 46.99% / 86.30% against the 147.21% / 80.14% the transcription had held.
