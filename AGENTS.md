# AGENTS.md — read this first

This file is the entry point for **any AI or developer** working in this repo. Read it
before touching anything. The two documents it points to are the detailed standards:

- `docs/CONTENT-STANDARD.md` — editorial rules (copy framework, length, downloads, ads).
- `docs/DESIGN-SYSTEM.md` — the visual system (strivealgo.com parity).
- `docs/AI-POST-BRIEF.md` — the copy-paste brief to hand an AI for one post.

## What this project is

| Thing | Role |
|---|---|
| `bestmt4ea.com` | Main store / licensing site. This repo is its rebuild. |
| `strivealgo.com` | **Design reference** — colours, fonts, background, animations, site chrome. |
| `bestforexeas.com` | **Content + layout reference** — homepage structure, ranking tables, blog flow. |
| Repo | Astro 7 (static) + Tailwind 4 + Cloudflare Worker, deployed via Wrangler. |

Stack: `astro.config.mjs` (static output, sitemap), `wrangler.jsonc` (assets + R2 `FILES`
binding), `src/content.config.ts` (content collections), `scripts/` (build + content tools).

## Audience

**Worldwide forex traders**, beginner to intermediate, mostly on **MT4/MT5**. They are
looking for free downloads that solve a real problem, and honest reviews they can trust.

## The three iron rules

Every post and every product review must satisfy all three. No exceptions.

1. **3,500–7,500 words — posts only.** Long-form guides and article-style reviews.
   Below the floor they won't rank; above it, it's padding. **Product pages are
   exempt**: they earn the buying decision with charts drawn from real data, specs,
   licence tiers and honest limits instead — see §3b of the content standard.
2. **A `download:` block on every post.** It must solve a real problem — an EA, indicator,
   preset, checklist, calculator or template. `origin: own` (ours, hosted) or
   `origin: opensource` (credited, with `author` + `sourceUrl`).
3. **No duplicate content.** Posts are compared pairwise with 8-word shingles. Jaccard
   similarity **≥ 0.25 fails the build**. The 150 imported WordPress posts share heavy
   structural boilerplate — rewrites must vary the structure, not swap nouns.

## Copy framework (every post and review)

Alex-Hormozi-style direct response, in this order:

**Powerful headline → Problem → Agitate (short story) → Solution → Offer breakdown → Closing CTA.**

Simple, direct, second-person language. Full word budgets and rules live in
`docs/CONTENT-STANDARD.md`; the per-post brief is `docs/AI-POST-BRIEF.md`.

## Design

Match **`strivealgo.com` exactly**: pure-black `#000` base with fixed emerald radial glows,
`#00c190` brand, **Sora** headings + **Manrope** body + JetBrains Mono, glow-shadow cards
(`.brand-card`), pulsing `.live-dot`, and the site chrome — **reading progress bar**,
**back-to-top arrow**, and the **floating Telegram button**. Tokens are in
`docs/DESIGN-SYSTEM.md` and implemented in `src/styles/global.css`.

## Monetisation

Free downloads drive organic **SEO + AI/GEO** traffic. That traffic is monetised by
**Google AdSense** and a **broker/product affiliate registry**.

- Ads: `AdSlot` renders nothing unless `PUBLIC_ADSENSE_CLIENT` is set. **Never** place an
  ad or affiliate CTA adjacent to a download button — policy violation.
- Affiliates: every affiliate link goes through `src/lib/affiliates.ts` and renders with
  `rel="sponsored nofollow noopener"` plus a visible disclosure. Never hard-code a
  tracking URL in content.

## Policy safety (Google + Meta/Facebook)

No guarantee, "risk-free", "get rich", or income claims. No fake scarcity. No ads that
look like download links. Always: honest risk language, demo-first advice, real licence
and source, and YMYL-grade E-E-A-T (author box, sources, visible dates).

## Session protocol (continuous work)

Read `docs/IMPLEMENTATION-STATUS.md` first, every session. Continue the task it
names under **Next task**. Never wait between sessions — start the next phase
immediately. End every completion report with the model used, e.g.
`Model used: meta/muse-spark-1.3-contributor`. After implementation sessions
that change rendered pages, show the site (local server + screenshots of
homepage and a migrated page at desktop/mobile), then stop the server.

**Resuming a multi-day session.** A user-level SessionStart hook
(`~/.commandcode/hooks/session-progress.mjs`) injects this file's **Resume
anchor** section at the start of every session, and the last session id is kept
in `.commandcode/session.json`. To pick work back up, run `cmd -c` in this
project — or `cmd -r "<session name>"` / `/resume`. Do not `/clear`. Before
stopping for the day, run `/checkpoint` to rewrite the anchor with what changed
and the exact next action.

Model policy: normal work + rewrites → `meta/muse-spark-1.3-contributor`
(alts: `deepseek/deepseek-v4.1-flash`, `Qwen/Qwen3.8-Max`); complex coding /
review → `deepseek/deepseek-v4.1-flash`; critical planning → `gpt-5.6-sol:low`
(alts: `deepseek/deepseek-v4.1-flash`, `zai-org/GLM-5.3`). Check `/usage` for limits; if a premium model is capped,
continue on the Contributor model and resume premium work after reset.

## Commands

```bash
npm run dev                    # local dev
npm run build                  # redirects + astro build
npm run release:check          # THE gate — runs everything below + dry-run deploy
npm run check:content          # content report (non-blocking)
npm run check:content:strict   # strict-all: exits 1 on any violation
npm run check:content:changed  # gate only content changed since the hash baseline
npm run check:debt             # content debt may only shrink vs content-debt.json
npm run check:rendered         # rendered-HTML structure of post pages (1 H1, no dup sections)
npm run check:canonicals       # one absolute self-canonical per page (incl. emoji routes)
npm run check:schema           # no zero prices, invented brand, or build-time dates
npm run check:links            # every internal href in dist/ resolves + uses canonical slashes
npm run check:downloads        # download blocks, licences and attribution
npm run check:downloads:live   # every download target actually resolves (network)
npm run check:routes           # redirect manifest vs live routes
npm run check:preview          # live probe vs wrangler dev (emoji encodings, redirects)
npm run test:worker            # Worker redirect-unit tests
npm run test:e2e               # Playwright + axe browser tests (desktop + mobile)
npm run build:inventory        # regenerate src/data/inventory.json (--check to verify)
npm run changed-files          # list changed content (--write to re-baseline)
npm run content:strip-dups     # remove body FAQ/Sources/Install dupes (dry run; --write)
npm run new-post <slug>        # scaffold a post that meets the standard
npm run rewrite-queue          # prioritised list of posts still needing a rewrite
npm run deploy                 # release:check (predeploy) + wrangler deploy
```

Run `npm run release:check` before shipping anything — `npm run deploy` now runs
it automatically via the `predeploy` hook, so a broken build cannot ship.

## Hard-won context (do not regress)

- Only **3 of 153 posts** currently meet the standard. The rest are WordPress imports and
  are being rewritten in phased batches — see the rollout plan in
  `docs/CONTENT-STANDARD.md`.
- `DownloadCard` builds hosted links via `src/lib/files.ts` (`publicUrl`). Hosted files
  resolve to the R2 public domain (`PUBLIC_R2_PUBLIC_URL`).
- Redirects live in the Worker manifest (`src/generated/redirects.json`, built
  by `scripts/build-redirects.mjs`, validated by `scripts/check-routes.mjs`).
  Never ship a static `public/_redirects` (Cloudflare's 2000-rule cap).
- Use `url()` from `src/lib/urls.ts` for every internal link — the site serves
  **trailing slashes** (`trailingSlash: 'always'`), and `check-links` fails the
  build on a link that omits one. `absoluteUrl()` / `resolveImage()` do the same
  for canonicals, OG and schema URLs.
- Build listings from `src/lib/content.ts` (`getPublicPosts`, `getPublicProducts`,
  `getPublicPages`, `getDownloadPosts`), never raw `getCollection` — those helpers
  are what exclude drafts, future-dated entries and system pages.
- **Build time is never a freshness claim.** `monthYear` labels the catalogue in
  titles; the only dates allowed next to data or in structured data are the real
  verification dates in `src/data/site-verification.json`. No `dateModified` from
  build time, and sitemap `lastmod` comes from content `updatedAt`/`publishedAt`.
- Product schema never publishes `price: 0`, never hardcodes availability, and
  never names this site as the brand of a third-party system. `check-schema`
  enforces all three.
- Fonts are **self-hosted** (`public/fonts/`, `src/styles/fonts.css` generated by
  `scripts/fetch-fonts.mjs`). Never re-add a Google Fonts `<link>`; the build
  should contain no third-party font request.
- Hidden mega-menu panels must keep `visibility: hidden` — opacity alone leaves
  their links in the tab order. `test:e2e` pins the keyboard contract
  (ArrowDown, Escape, focus restore) and the 44px touch targets.
- Legal pages (`/disclaimer`, `/dmca-policy`, `/affiliate-disclosure`) are required for
  AdSense review and are linked from the footer.
