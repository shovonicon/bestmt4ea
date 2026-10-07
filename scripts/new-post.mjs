#!/usr/bin/env node
/**
 * New post scaffold.
 *
 * Usage:
 *   node scripts/new-post.mjs <slug>
 *
 * Writes src/content/posts/<slug>.md with the frontmatter shape and the H2
 * section skeleton from docs/AI-POST-BRIEF.md, every field marked TODO. The
 * scaffold deliberately fails check-content until it is filled in — it is a
 * writing brief, not a publishable post.
 *
 * Refuses to overwrite an existing file, and refuses a slug containing a path
 * separator (the slug is also the root-level permalink, so it must stay flat).
 */

import { writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';

const POSTS_DIR = 'src/content/posts';

const args = process.argv.slice(2);
const rawSlug = args.find((a) => !a.startsWith('--'))?.trim();

if (!rawSlug) {
  console.error('Usage: node scripts/new-post.mjs <slug>');
  process.exit(1);
}

/**
 * The slug is used verbatim so the file name matches the requested permalink
 * (`__smoke-test__` stays `__smoke-test__`). Only unsafe input is rejected.
 */
if (/[\\/]/.test(rawSlug) || rawSlug.includes('..')) {
  console.error(`Invalid slug "${rawSlug}": it must not contain a path separator or "..".`);
  process.exit(1);
}

const outPath = join(POSTS_DIR, `${rawSlug}.md`);

if (existsSync(outPath)) {
  console.error(`Refusing to overwrite existing file: ${outPath}`);
  process.exit(1);
}

/** publishedAt / updatedAt are the day the post is created, ISO date only. */
const today = new Date().toISOString().slice(0, 10);

const template = `---
# Fill every TODO below. Shape and budgets: docs/AI-POST-BRIEF.md + docs/CONTENT-STANDARD.md.
# (This top line is a comment, not a body H1 — the layout renders the title as H1.)
title: "TODO — headline with the primary keyword, stating the outcome or the pain (max 60 chars)"
slug: "${rawSlug}"
description: "TODO — 150-160 chars. Name the outcome and the primary keyword; keep the promise honest."
publishedAt: ${today}
updatedAt: ${today}
categories:
  - "TODO"                      # see src/data/taxonomies.json
tags:
  - "TODO"
quickAnswer: "TODO — 40-75 words, self-contained, answers the title directly. This is the block AI answer engines quote verbatim, so it must make sense with no other context."
keyTakeaways:                   # 3-6 bullets -> rendered as the offer summary
  - "TODO — the single most useful concrete fact in this post."
  - "TODO"
  - "TODO"
faqs:                           # 4-15 Q&As -> FAQPage schema (question >=5 chars, answer >=20)
  - question: "TODO — the question the reader actually types into Google"
    answer: "TODO — answer it straight away in the first sentence, then justify it."
  - question: "TODO — objection the reader raises before downloading"
    answer: "TODO — answer it straight away in the first sentence, then justify it."
  - question: "TODO — how does it handle risk and drawdown?"
    answer: "TODO — answer it straight away in the first sentence, then justify it."
  - question: "TODO — what does it not do?"
    answer: "TODO — answer it straight away in the first sentence, then justify it."
sources:                        # >=2 primary sources -> E-E-A-T
  - label: "TODO — primary source (vendor docs, regulator, GitHub repo, Myfxbook)"
    url: "https://example.com/TODO"
  - label: "TODO — second primary source"
    url: "https://example.com/TODO"
primaryKeyword: "TODO"
# installSteps (>=3) are required ONLY for an installable file — an EA, indicator
# or setup, i.e. a download that sets \`platform\`. A resource — a checklist,
# calculator, trading journal or template — omits \`platform\` and needs none.
# installSteps:
#   - name: "TODO — download the file from this page"
#     text: "TODO — what to click and where the file lands once it is on your disk."
#   - name: "TODO — open the MetaTrader data folder"
#     text: "TODO — File, then Open Data Folder, then the MQL4 or MQL5 Experts folder."
#   - name: "TODO — attach on demo and enable AutoTrading"
#     text: "TODO — test in the Strategy Tester before risking real money on a live account."
download:
  origin: "own"                 # "own" = our build, hosted | "opensource" = add author + sourceUrl
  license: "TODO — e.g. MIT, GPL-3.0, or your own freeware licence name"
  licenseUrl: "https://example.com/TODO"
  version: "latest"
  # platform: "MT4/MT5"         # set ONLY for an installable EA/indicator — it then requires installSteps
  fileKey: "resources/TODO.pdf"
  # or: externalUrl: "https://example.com/TODO"   (hosted fileKey OR external link, never neither)
---

<!-- Budget: 3,500-7,500 words total. Second person, short sentences, no hype.
     Answer-first. Name entities explicitly: MetaTrader 5, XAUUSD, Myfxbook, drawdown.
     OWNERSHIP RULE: faqs/sources/installSteps live in frontmatter and are rendered
     by the layout. Do NOT write body H1, FAQ, Sources or Install sections. -->

## Problem

<!-- 250-400 words. Name the reader's biggest problem in their own words. -->
TODO

## Agitate

<!-- 250-400 words. One concrete, relatable story. Raise the cost of doing nothing. -->
TODO

## Solution

<!-- 1,200-2,500 words. Question-shaped sub-headings, each answering itself in the
     first two sentences. Use tables for comparison data. -->
TODO

### TODO — question-shaped sub-heading

TODO

## Offer breakdown

<!-- 600-1,500 words. Exactly what they get: components, specs, licence — and what it
     does NOT do. -->
| Component | Detail |
|---|---|
| Platform | MT4/MT5 |
| Licence | TODO |
| Author | TODO |
| What it does not do | TODO |

TODO

<!-- Install steps, FAQ and Sources render from frontmatter (installSteps/faqs/sources).
     Do NOT repeat them here — the layout renders FAQPage + HowTo schema from the
     same data. Continue the narrative straight into the closing CTA. -->

## Closing CTA

<!-- 150-300 words. One action, restated benefit. Never fake scarcity. -->
TODO

> **Risk warning.** Trading forex and CFDs carries a high risk of loss and is not suitable for everyone. Leverage can work against you as easily as for you. Nothing on this page is financial advice, and no result is promised or implied. Test every expert advisor and indicator on a demo account first, and never trade money you cannot afford to lose.
`;

await mkdir(dirname(outPath), { recursive: true });
await writeFile(outPath, template, 'utf8');

console.log(`Created ${outPath}`);
console.log(`Slug:    ${rawSlug}`);
console.log(`Dated:   ${today}`);
console.log('\nNext:');
console.log('  1. Fill every TODO (docs/AI-POST-BRIEF.md).');
console.log('  2. node scripts/check-content.mjs --strict  — this post must come back clean.');
console.log(`  3. Delete the scaffold if you change your mind: del "${outPath}"`);
