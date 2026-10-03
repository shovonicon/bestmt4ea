# Editorial standard

This governs every page on bestmt4ea.com. `scripts/check-content.mjs` enforces
the machine-checkable parts.

Read alongside:
- `docs/DESIGN-SYSTEM.md` — how a page looks.
- `docs/AI-POST-BRIEF.md` — the copy-paste brief for writing one post.
- `AGENTS.md` — the three iron rules, in short.

---

## 0. Who we write for

**Worldwide forex traders, beginner to intermediate, on MT4/MT5.** They are looking
for a free download that solves a real problem, or an honest review they can trust
before spending money.

**Voice:** plain, direct, second person ("you"). Short sentences. Explain a term once
(`XAUUSD`, `drawdown`, `profit factor`), then use it. No hype, no jargon walls, no
filler. If a sentence would not survive being read aloud, cut it.

**Never:** guarantee returns, call anything "risk-free", imply income, or use fake
scarcity. See §4.

---

## 1. The direct-response skeleton (mandatory)

Every post and every product review follows this order. It is an Alex-Hormozi-style
direct-response page, not an essay.

| # | Section | Words | What goes here |
|---|---|---|---|
| 1 | **Powerful headline** (H1) | — | Contains the primary keyword. States the outcome or the pain — not the product name. |
| 2 | **Problem** | 250–400 | Name the reader's biggest problem in their own words. |
| 3 | **Agitate — short story** | 250–400 | One concrete, relatable scenario. Raise the cost of doing nothing. |
| 4 | **Solution** | 1,200–2,500 | How it works, step by step. The download is the mechanism. |
| 5 | **Offer breakdown** | 600–1,500 | Exactly what they get — components, specs, licence, and what it does *not* do. |
| 6 | **Closing CTA** | 150–300 | One clear next action (download / demo / Telegram), restated benefit. |

Maps onto the existing frontmatter: headline → `title`; problem + agitate → the
opening prose and `quickAnswer`; solution → body; breakdown → `keyTakeaways` + specs;
CTA → the `download` block.

---

## 2. The three layouts

| Layout | File | Used for | URL |
|---|---|---|---|
| **Long form** | `src/layouts/LongFormLayout.astro` | Every post: guides, reviews, tutorials, and free-download pages | `/<slug>/` |
| **Product** | `src/layouts/ProductLayout.astro` | Licensed EAs, indicators, VPS | `/product/<slug>/` |
| **Page** | `src/layouts/PageLayout.astro` | About, Contact, Brokers, legal | `/<slug>/` |

`LongFormLayout` is one renderer with two orders. A post becomes a free-download
page purely by adding a `download:` block to its frontmatter — `/[slug].astro`
switches the order on `entry.data.download`, so the two states can never drift
apart.

Reading layout: a centered ~44rem prose column (65–75ch) with wider breakouts for
the download card and other panels, an inline desktop table of contents, a
collapsible mobile one, and **no ad sidebar**. Ads sit inside the reading column
and are always at least one full section away from a download action.

---

## 3. Length

**Posts** (guides, tutorials and article-style reviews) must be **3,500–7,500 words**.

Below 3,500 the page rarely outranks the incumbent for a competitive term. Above
7,500 it becomes padded and readers bounce before the CTA.

This is a floor, not a target to hit with filler. If a topic genuinely resolves in
2,000 words, publish it as a Page, not a Post.

**Product pages are exempt from the word band.** See §3b.

---

## 3b. Product pages

A product page exists so someone can decide. It is judged on **evidence, not length** —
padding it to a word count makes it worse at its job.

**Required on every product page:**

- **A metrics panel** built from the real figures in `src/lib/performance.ts` —
  return, drawdown, profit factor, trade count — each shown with the date it was
  checked.
- **A chart drawn from real data** (`ProductChart`): this system against the rest of
  the catalogue on return versus maximum drawdown. **Never draw a curve, sparkline
  or equity series we do not actually have.** An invented chart is a false claim and
  is treated as a policy violation, not a design choice.
- **A specifications table**: platform, strategy, licence tiers, minimum capital,
  price and currency.
- **Account type stated** — live or demo. A demo record is never presented as live.
- **A verification status** — verified, unverified, or awaiting sync — and a plain
  sentence explaining what that status means for the buyer.
- **What it does not do**, next to the benefits rather than buried.
- **Risk warning** and a demo-first recommendation.

**Never:** invent a performance figure or an account, publish `price: 0`, badge a
demo account as live, or imply a result.

---

## 4. Policy safety (Google + Meta/Facebook)

Both platforms police financial marketing. These are hard bans.

**Never write:**
- Guaranteed / assured returns, "risk-free", "can't lose", "get rich".
- Specific income or profit promises ("make $5,000 a month").
- Fake scarcity or countdown pressure ("only 3 licences left").
- Before/after money imagery or screenshots implying typical results.
- An ad or affiliate CTA that could be mistaken for a download button.

**Always include:**
- Honest risk language (loss of capital is possible).
- Demo-first advice — test before risking real money.
- The real licence and source for any third-party file.
- YMYL-grade E-E-A-T: a named author box, cited sources, visible dates.

---

## 5. A download on every post

Every post ships a `download:` block. It must solve a real problem — an EA, indicator,
preset, checklist, calculator, spreadsheet or template.

```yaml
download:
  origin: own            # our build, hosted
  # or: origin: opensource  # third-party, must be credited
  license: "GPL-3.0"
  licenseUrl: "https://…"
  author: "…"            # opensource only
  sourceUrl: "https://…" # opensource only
  version: "latest"
  platform: "MT4/MT5"
  fileKey: "eas/mt4/foo/foo.ex4"   # hosted
  # or: externalUrl: "https://…"   # link to the origin
```

- `origin: opensource` **requires** `author` + `sourceUrl` — the schema rejects the
  build without them.
- Hosted files resolve through `src/lib/files.ts` to the R2 public domain.
- Never redistribute a commercial EA. Link to it instead.

---

## 6. Ad placement (policy-driven, not preference)

AdSense prohibits ads that can be **mistaken for a download or purchase link**.
That constraint dictates the placement:

- ✅ In-article, after the answer box and at least one content section.
- ✅ Sidebar (desktop only).
- ✅ Below the article, above the FAQ.
- ❌ **Never adjacent to a download button or checkout CTA.**
- ❌ Never above the answer box — it pushes the answer below the fold.
- ❌ Never on checkout, cart, or legal pages.
- ❌ Maximum one unit per 500 words.

On **free-download pages** the install steps sit between the download card and the
first ad unit specifically to create that separation. Do not reorder it.

`AdSlot` renders nothing when `PUBLIC_ADSENSE_CLIENT` is unset, so dev and preview
builds carry no ad code.

**Turn Google Auto Ads OFF** in the AdSense dashboard. Auto Ads place units wherever
Google chooses — including beside a download button — which breaches the rule above.
Only the manual slots we control are safe.

Pages opt out with `showAds: false` (legal pages, Brokers, Copy Trading). A page
without ads also renders without the sidebar column — full width.

---

## 7. Affiliate links

Every affiliate link goes through `src/lib/affiliates.ts` and renders with
`rel="sponsored nofollow noopener"` plus a visible disclosure on the page. Never
hard-code a tracking URL in content.

- Disclosure line appears **before** the first affiliate link.
- An affiliate CTA may sit in-content or in the sidebar — **never** against the
  download card (§6).

---

## 8. Duplicate content

Posts are compared pairwise using 8-word shingles and Jaccard similarity.
**Anything at or above 0.25 fails the build.**

This matters because the 150 imported WordPress posts share heavy structural
boilerplate ("…7 powerful truths you must know before installing"). Rewrites
must vary the structure, not just swap nouns.

Three acceptable fixes for a flagged pair:
1. Merge them into one stronger post and 301 the weaker one.
2. Rewrite the weaker one around a genuinely different search intent.
3. Delete it — a thin post competing with your own strong post splits equity.

Merged or deleted URLs must be added to the redirect CSV consumed by
`scripts/build-redirects.mjs` (regenerate the Worker manifest afterwards).

---

## 9. SEO checklist

- One H1 per page; H2/H3 in a logical outline, never skipped levels.
- Title ≤ 60 chars, meta description 150–160 chars.
- Canonical URL set — one absolute, self-referential canonical per page, with a
  trailing slash. `check-canonicals` fails the build otherwise; a page that
  canonicalises to a *different* URL (e.g. `/best-mt4-ea/` pointing at the
  homepage) competes with itself and is treated as an error.
- Internal links: ≥ 4 per long post, to related posts and product pages. Every
  internal link is built with `url()` from `src/lib/urls.ts` and carries the
  trailing slash — `check-links` fails the build on a link that omits one.
- Descriptive alt text on every image.
- Structured data: `Article` + `BreadcrumbList` + `FAQPage` (+ `HowTo` on
  download pages, `Product` on product pages).
- No orphan pages — everything reachable from `/blog`, `/shop` or a category.

---

## 10. AI / GEO checklist

Optimising for AI answer engines is mostly discipline, not trickery:

- **Answer-first.** The `quickAnswer` block is what gets extracted.
- **Question-shaped H2s.** "How much does a gold EA need to start?" beats
  "Capital requirements".
- **Self-contained sections.** Each section should make sense lifted out of
  context, because that is how it will be quoted.
- **Tables for comparison data.** Machines parse tables far more reliably than prose.
- **Named entities.** Use "MetaTrader 5", "XAUUSD", "Myfxbook" explicitly.
- **Citable sources.** Outbound links to primary sources raise trust.
- **Visible dates.** `datePublished` / `dateModified` in frontmatter and in the
  author box.
- **Freshness.** The current **month and year** should appear where it is genuinely
  relevant — titles, ranking headings, "Updated …" labels — via `src/lib/dates.ts`
  (`monthYear`). Rebuild at least monthly so it stays true.
- `robots.txt` allows GPTBot, ClaudeBot, PerplexityBot and Google-Extended; keep
  it that way.

---

## 11. Attribution (non-negotiable)

The free-download library contains **only our own builds and open-source tools**.
Third-party commercial EAs are never redistributed.

For `origin: opensource`, frontmatter must include `author` and `sourceUrl` —
the schema rejects the build without them, and `DownloadCard` renders the credit
plus a link to the source.

---

## 12. Rollout (the 150 imported posts)

Only **3 of 153 posts** currently meet this standard. The rest are WordPress imports
averaging ~960 words. Rewrite in phases, money pages first:

1. **Batch 0** — the three finished posts are the reference examples.
2. **Batch 1** — money pages: `free-download-forex-ea-indicator`, `best-mt4-ea`,
   `best-forex-ea`, `top-ranking`, top gold-EA posts.
3. **Batch 2** — the free-download library; each post gets a real `download` asset.
4. **Batch 3** — remaining educational guides.
5. **Batch 4** — product reviews (the 13 products).
6. **Dedupe pass** — merge / rewrite / delete flagged pairs and redirect them.

Use `scripts/rewrite-queue.mjs` to drive the order and `docs/AI-POST-BRIEF.md` to
write each one.

---

## 13. Enforcement

```bash
npm run check:content           # report
npm run check:content:strict    # exit 1 on any violation (use in CI)
```

`--strict` fails on: word count outside the band, missing `quickAnswer` / `faqs` /
`sources` / `download`, missing `primaryKeyword`, banned claim phrases, and any
duplicate pair at or above 0.25.

Until the rollout is far enough along the report is non-blocking, because failing
on 150 legacy posts would make the gate useless. Flip it to blocking once the
rewritten set is the majority.
