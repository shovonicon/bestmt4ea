# AI post brief

Copy-paste this into an AI when writing or rewriting **one** post on bestmt4ea.com.
It is the working version of `docs/CONTENT-STANDARD.md`.

---

## Your task

Write one long-form post for **bestmt4ea.com**, read by **worldwide forex traders**
(beginner to intermediate, mostly on MT4/MT5).

Write it as a **direct-response sales page in Alex Hormozi's style**, in this exact
order:

**Powerful headline → Problem → Agitate (short story) → Solution → Offer breakdown → Closing CTA.**

Language rules: plain, direct, second person ("you"). Short sentences. Explain a
jargon term once, then use it. No hype, no filler, no corporate tone.

## Hard requirements

1. **3,500–7,500 words.** Long-form only.
2. **A `download:` block.** It must solve the real problem the page describes.
3. **No duplicate content.** Do not reuse the structure of another post — vary the
   outline, not just the nouns. (8-word shingles, Jaccard ≥ 0.25 fails the build.)
4. **Policy-safe.** Never guarantee returns, never say "risk-free" or "get rich",
   never promise income, never fake scarcity.
5. **Answer-first.** Lead with the answer, then elaborate.

## Banned phrases

`guaranteed`, `risk-free`, `can't lose`, `get rich`, `make $X per month`,
`only N left`, `100% profitable`, `no loss`, `passive income guaranteed`.

Replace with honest framing: what it does, what it does not do, and the drawdown.

## Frontmatter

```yaml
---
title: "…"                 # ≤60 chars, primary keyword, outcome or pain
slug: "…"
description: "…"           # 150–160 chars
publishedAt: 2026-09-28
updatedAt: 2026-09-28
categories: ["…"]
tags: ["…"]

quickAnswer: "…"           # 40–75 words, self-contained, directly answers the title
keyTakeaways:              # 3–6 bullets
  - "…"
faqs:                      # 4–8 Q&As → FAQPage schema
  - question: "…"
    answer: "…"
sources:                   # ≥2 primary sources → E-E-A-T
  - label: "…"
    url: "https://…"
primaryKeyword: "…"

installSteps:              # only if the post carries a download
  - name: "…"
    text: "…"

download:
  origin: own              # or opensource (+ author + sourceUrl)
  license: "…"
  licenseUrl: "https://…"
  platform: "MT4/MT5"
  fileKey: "…"             # hosted, or externalUrl
  externalUrl: "https://…"
---
```

## Ownership rule (no duplicated sections)

`faqs`, `sources` and `installSteps` live in **frontmatter only**. The layout
renders them (plus FAQPage + HowTo schema) — never repeat them in the body.

The Markdown body therefore contains: opening (Problem → Agitate), the solution
H2s, the offer breakdown (including a specs table and "what it does not do"),
and the closing CTA. **Do not write** a body H1, an FAQ section, a Sources
section, or an Install-steps section.

## Structure

1. **Opening (Problem → Agitate)** — 500–800 words total. Name the problem in the
   reader's own words, then one concrete short story that raises the cost of inaction.
2. **Solution (H2s)** — 1,200–2,500 words. Question-shaped H2s. Each H2 answers its
   own question in the first two sentences, then elaborates.
3. **Offer breakdown** — 600–1,500 words. Exactly what they get: components, specs,
   licence, and **what it does not do**.
4. **Closing CTA** — 150–300 words. One action, restated benefit.

## GEO / AI-answer rules

- `quickAnswer` is the highest-leverage block — write it to be quoted verbatim.
- Question-shaped H2s; self-contained sections.
- Use **tables** for any comparison data.
- Name entities explicitly: "MetaTrader 5", "XAUUSD", "Myfxbook", "drawdown".
- Use the current month/year where genuinely relevant (`src/lib/dates.ts`).

## Before you publish — self-check

- [ ] 3,500–7,500 words.
- [ ] `quickAnswer` is 40–75 words and answers the title directly.
- [ ] 3–6 takeaways, 4–8 FAQs, ≥2 sources, ≥4 internal links.
- [ ] `download:` present, with licence (+ author/source if `opensource`).
- [ ] `installSteps` present (download posts) — in frontmatter, not the body.
- [ ] No body H1 / FAQ / Sources / Install section anywhere in the Markdown.
- [ ] No banned phrase anywhere.
- [ ] Structure differs from the other posts on the topic (dedupe check).
- [ ] Risk language present; demo-first advice included.
- [ ] `npm run check:content` is clean for this post.
