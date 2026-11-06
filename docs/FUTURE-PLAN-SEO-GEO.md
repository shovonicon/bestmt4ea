# Future plan: SEO, AI GEO and content calendar

Status: **PLAN ONLY. Nothing here is built yet.** Source: the owner's Bengali plan
(reproduced verbatim in the appendix). This file restates it in English and checks
each step against `AGENTS.md`, `docs/CONTENT-STANDARD.md`, the schema and content
gates, and the owner's standing decisions. Where the plan conflicts with a rule, the
conflict is listed under **Decisions needed** rather than silently resolved.

## 1. Goal

Make BestMT4EA the recognised, verified algo-trading platform in Google Search,
AI Overviews, Perplexity and ChatGPT search, covering both **MT4 and MT5**.

Reference sites (structure and UX only, never copied text, per the duplicate-content rule):

| Reference | Use it for |
|---|---|
| bestforexeas.com | Free indicators, demo EAs, educational hub |
| tradersunion.com | Broker comparison table, country selector |
| forexbrokers.com | Broker regulation, fees and features section |
| mql5.com | Technical setup, coding authority, product specs |
| myfxbook.com | Verified live track record, drawdown, performance data |

## 2. Workflow

### Phase 1, month 1: technical and on-page

- **Branding:** make "MT4 & MT5" explicit in the meta title and H1 without dropping
  MT5 search traffic. Keep titles at 30–60 characters (`npm run check:titles`).
- **Schema (JSON-LD):**
  - Product pages: `SoftwareApplication`.
  - Broker pages: `FinancialService` plus comparison-table markup.
  - Blog: `FAQPage` and `Article`.
- **Toxic link clean-up:** export the backlink list, review it, and submit a
  disavow file in Search Console. This is destructive to the disavow list, so it
  needs owner sign-off on the list first.

### Phase 2, month 2: broker hub and free resources

- Broker comparison engine modelled on tradersunion and forexbrokers: spread,
  latency, regulation, VPS support, with filters.
- 3–5 free indicators and trial EAs in the bestforexeas style, plus a lot-size and
  drawdown calculator page.

### Phase 3, month 3: AI GEO

- **Atomic answers:** a 40–60 word direct answer under each H2/H3, written so an AI
  engine can quote it. The project's quick-answer rule (40–75 words) already fits.
- **Structured HTML tables** for drawdown, win rate and monthly return, in the
  Myfxbook style.
- **Query fan-out FAQ** under each page: deposit requirements, prop-firm rules, and
  similar follow-up questions.

### Phase 4, ongoing: off-page authority

- Trustpilot reviews from real buyers.
- Forum presence on Reddit, MQL5 and Myfxbook community areas with verified results.

## 3. Six-month content calendar

| Month | Theme | Items |
|---|---|---|
| 1 | Core products and category pages | Setup guides and Myfxbook drawdown explanations on 12 existing EA pages; 3 new landing pages: Best Gold (XAUUSD) EA, Best Prop Firm MT5 EA, Low Drawdown Forex Robots |
| 2 | Free resources and calculators | 10 free MT4/MT5 indicator download pages; 2 interactive tools: Forex Lot Size Calculator, EA Drawdown Risk Calculator |
| 3 | Broker directory and country guides | Main "Best Forex Brokers for Automated Trading" page with country filter; 10 broker reviews (IC Markets, Pepperstone, RoboForex, etc.); 5 country guides (UK, Australia, UAE, Singapore, EU) |
| 4 | Comparison and case studies | 8 comparison articles (Grid vs Scalping EA, MT4 vs MT5 for algorithmic trading, etc.); monthly performance and risk audit from Myfxbook data |
| 5 | Technical guides and VPS | How to backtest MT5 EAs with high-quality data; best low-latency VPS setup for MetaTrader; prop-firm risk management and drawdown rules for EAs |
| 6 | AI trends and refresh | Annual "Top 20 AI Forex Robots for 2026/2027" ranking; refresh older posts with new performance data and FAQs; live-test case study on a real account |

Total new or rewritten pages in this calendar is roughly **50+**.

## 4. Decisions needed (conflicts with current rules)

These need an owner decision before any phase starts. None is resolved in this plan.

1. **Free downloads are on hold.** Memory records that the `/free-downloads/` hub is
   on hold until the rest of the SEO plan is done. Phase 2 (10 free indicator pages,
   3–5 free EAs, calculators) directly reopens that hold. **Owner decision (answered):**
   Phase 2 waits until Phase 1 ships.
2. **Free downloads cannot be our paid EAs.** Per the status file, our own EAs are
   priced products. Free items must be authored tools or genuinely open-source
   files, with `origin: opensource` credits where applicable. "Free indicator" and
   "trial EA" entries need that sourcing, and the reuse cap of 4 posts per file
   applies.
3. **Ranking copy must use the Abs. Gain sort key.** The "Top 20 AI Forex Robots"
   ranking and any broker or EA ranking must name the same key the table sorts by
   (`live.absGainPct`). Monthly return may be shown beside the rank, never used as
   the rank.
4. **Monthly performance audit (month 4) has no data source yet.** The monthly
   breakdown is not captured anywhere: the Myfxbook monthly chart is signed-in only,
   the collector no longer requests it, and the Monthly log tab was removed on the
   owner's instruction. The audit needs either a new data capture decision or a
   narrower audit built from monthly summary figures we do hold.
5. **Schema must stay honest.**
   - `SoftwareApplication` ratings (`aggregateRating`) may only use genuine reviews.
     Do not add rating markup until Trustpilot or another real review source exists.
   - Prices come from real licence tiers. No `price: 0` (enforced by
     `npm run check:schema`).
   - Product schema never names this site as the brand of a third-party system.
6. **Trustpilot solicitation (phase 4).** Asking buyers for reviews is fine; paying
   for them, gating them on a positive result, or seeding them ourselves is not, and
   breaches the policy the project already holds. The plan should say "invite all
   buyers", not "collect 50+".
7. **"Natural mentions" on Reddit, MQL5 and Myfxbook (phase 4).** Forum participation
   must disclose any affiliation, follow each community's self-promotion rules, and
   must not be staged. Confirm this is the intent before any posting.
8. **Affiliate and broker pages.** Every broker link goes through
   `src/lib/affiliates.ts` with `rel="sponsored nofollow noopener"` and a visible
   disclosure. No ad or affiliate CTA may sit next to a download button. The broker
   restriction lists are verified monthly (`docs/BROKER-COUNTRY-CHECK.md`); the
   UAE and Singapore guides (month 3) need the same regulatory verification before
   publication.
9. **Unverifiable claims.** Titles such as "How to Backtest MT5 EAs with 99% Quality
   Data" and words such as "verified", "top" and "best" need evidence on the page or
   softer wording. Honest risk language and demo-first advice are required by the
   policy section of `AGENTS.md`.
10. **Volume against the content standard.** Only 3 of 153 posts currently meet the
    standard. Every new post or review in the calendar must hit 3,500–7,500 words, a
    `download:` block, and the 0.25 Jaccard duplicate limit. Product pages are
    exempt from the word floor but not from the data rules. The calendar's roughly
    50 pages therefore need the same resource pipeline as Phase R; the calendar
    should be sized to that capacity, not the other way round.
11. **Tradersunion, forexbrokers, mql5, myfxbook and bestforexeas are reference
    sites only.** Their layouts may inform ours. Their text must not be reused,
    which the duplicate-content check would catch anyway.
12. **Phase 1 disavow** is irreversible in effect on Search Console's stored file
    and needs owner sign-off on the list.

## 5. Acceptance checks per phase

Each phase is done when these pass, not when pages exist:

- `npm run release:check` passes (25/25 gates, deployed).
- `npm run check:titles`, `check:schema`, `check:links`, `check:downloads`,
  `check:rendered` all pass for the new URLs.
- Search Console shows the new URLs indexed, and any ranking claim is measured
  against the Abs. Gain key.
- For GEO work: a sample set of target queries is checked in AI answer engines,
  with results recorded in `docs/IMPLEMENTATION-STATUS.md`. Do not claim citation
  gains without that record.

## 6. Session protocol

When this plan is started, add its next task to the **Next task** section of
`docs/IMPLEMENTATION-STATUS.md`, and do not begin Phase 1 until the decisions in
section 4 are answered.

---

## Appendix A: original plan (verbatim, Bengali)

<pasted_content id="5a89">
BestMT4EA.com: পূর্ণাঙ্গ SEO, AI GEO পরিকল্পনা ও কর্মপ্রবাহ

১. মূল পরিকল্পনা ও লক্ষ্য (Strategic Plan)

* লক্ষ্য: Google Search, AI Overviews (Gemini/SGE) এবং Perplexity/ChatGPT সার্চে BestMT4EA-কে শীর্ষ ভেরিফায়েড অ্যালগো-ট্রেডিং প্ল্যাটফর্ম হিসেবে প্রতিষ্ঠা করা।

* ৫টি রেফারেন্স সাইটের সমন্বয়:

   1. bestforexeas.com: ফ্রি ইন্ডিকেটর, ডেমো EA এবং শিক্ষামূলক ব্লগ হাব।

   2. tradersunion.com: ব্রোকার তুলনামূলক টেবিল ও দেশভিত্তিক ফিল্টার (Country Selector)।

   3. forexbrokers.com: ব্রোকার রেগুলেশন, ফি এবং ফিচার তুলনা সেকশন।

   4. mql5.com: টেকনিক্যাল সেটআপ, কোডিং অথরিটি ও প্রোডাক্ট স্পেসিফিকেশন।

   5. myfxbook.com: ভেরিফায়েড লাইভ ট্র্যাক রেকর্ড, ড্রডাউন ও স্বচ্ছ পারফরম্যান্স ডেটা।

২. ধাপে ধাপে কর্মপ্রবাহ (Step-by-Step Workflow)
ধাপ ১: টেকনিক্যাল ও অন-পেজ অপটিমাইজেশন (মাস ১)

* ব্র্যান্ডিং সমন্বয়: মেটা টাইটেল ও H1-এ "MT4 & MT5 AI Forex Robots" স্পষ্ট করা, যাতে MT5 সার্চ ট্রাফিক না হারায়।

* স্কিমা মার্কআপ (JSON-LD):

   * প্রোডাক্ট পেজে: `SoftwareApplication` (রেটিং, প্রাইস, প্ল্যাটফর্ম)।

   * ব্রোকার পেজে: `FinancialService` ও তুলনা টেবিল স্কিমা।

   * ব্লগে: `FAQPage` এবং `Article` স্কিমা।

* টক্সিক লিংক ছাঁটাই: পুরনো স্প্যামি ব্যাকলিংক Google Search Console-এর Disavow টুলে সাবমিট করা।

ধাপ ২: ব্রোকার হাব ও ফ্রি রিসোর্স তৈরি (মাস ২)

* ব্রোকার কম্প্যারিজন ইঞ্জিন: tradersunion ও forexbrokers-এর আদলে ব্রোকার তালিকা তৈরি (স্প্রেড, ল্যাটেন্সি, রেগুলেশন ও VPS সাপোর্ট ফিল্টারসহ)।

* ফ্রি টুলস ও লিড ম্যাগনেট: bestforexeas-এর মতো ৩-৫টি ফ্রি ইন্ডিকেটর/ট্রায়াল EA এবং লট সাইজ ও ড্রডাউন ক্যালকুলেটর পেজ যুক্ত করা।

ধাপ ৩: AI GEO (Generative Engine Optimization) কার্যকর করা (মাস ৩)

* Atomic Answers: প্রতিটি আর্টিকেলের H2/H3 হেডিংয়ের শুরুতে ৪০-৬০ শব্দের সরাসরি উত্তর লেখা, যা AI ইঞ্জিন সরাসরি উদ্ধৃত করতে পারে।

* স্ট্রাকচার্ড এইচটিএমএল টেবিল: myfxbook-এর মতো রোবটের ড্রডাউন, উইন রেট ও মান্থলি রিটার্ন পরিষ্কার টেবিলে রাখা।

* Query Fan-Out FAQ: ব্যবহারকারীদের সম্ভাব্য সম্পূরক প্রশ্ন (ডিপোজিট রিকোয়ারমেন্ট, প্রপ ফার্ম রুলস) প্রতিটি পেজের নিচে যুক্ত করা।

ধাপ ৪: অফ-পেজ অথরিটি ও ট্রাস্ট বৃদ্ধি (চলমান)

* Trustpilot রিভিউ: সাইটের ক্রেতাদের মাধ্যমে ট্রাস্টপাইলটে ৫০+ ভেরিফায়েড রিভিউ সংগ্রহ করা।

* ফোরাম প্রেজেন্স: Reddit, MQL5 এবং Myfxbook কমিউনিটিতে ভেরিফায়েড রেজাল্ট শেয়ার করে প্রাকৃতিক মেনশন তৈরি করা।

৩. ৬ মাসের কন্টেন্ট ক্যালেন্ডার (6-Month Content Plan)

* ১ম মাস (কোর প্রোডাক্ট ও ক্যাটাগরি পেজ):

   * ১২টি বিদ্যমান EA পেজে বিস্তারিত সেটআপ গাইড ও Myfxbook ড্রডাউন ব্যাখ্যা।

   * ৩টি নতুন হাই-ইনটেন্ট ল্যান্ডিং পেজ: Best Gold (XAUUSD) EA, Best Prop Firm MT5 EA, Low Drawdown Forex Robots।

* ২য় মাস (ফ্রি রিসোর্স ও ক্যালকুলেটর):

   * ১০টি ফ্রি MT4/MT5 ইন্ডিকেটর ডাউনলোড পেজ (bestforexeas স্টাইল)।

   * ২টি ইন্টারেক্টিভ টুল: Forex Lot Size Calculator ও EA Drawdown Risk Calculator।

* ৩য় মাস (ব্রোকার ডিরেক্টরি ও কান্ট্রি গাইড):

   * মূল Best Forex Brokers for Automated Trading পেজ (কান্ট্রি ফিল্টারসহ)।

   * ১০টি ব্রোকার রিভিউ (IC Markets, Pepperstone, RoboForex ইত্যাদি)।

   * ৫টি কান্ট্রি-স্পেসিফিক গাইড (UK, Australia, UAE, Singapore, EU)।

* ৪র্থ মাস (তুলনামূলক বিশ্লেষণ ও কেস স্টাডি):

   * ৮টি কম্প্যারিজন আর্টিকেল (যেমন: Grid vs Scalping EA, MT4 vs MT5 for Algorithmic Trading)।

   * Myfxbook লাইভ ডেটার ভিত্তিতে মাসিক পারফরম্যান্স ও রিস্ক অডিট রিপোর্ট।

* ৫ম মাস (টেকনিক্যাল গাইড ও VPS টিউটোরিয়াল):

   * How to Backtest MT5 EAs with 99% Quality Data।

   * Best Low-Latency VPS Setup for MetaTrader।

   * Prop Firm Risk Management & Drawdown Rules for EAs।

* ৬ষ্ঠ মাস (AI ট্রেন্ড ও কন্টেন্ট রিফ্রেশ):

   * Top 20 AI Forex Robots for 2026/2027 বার্ষিক র‍্যাংকিং গাইড।

   * পূর্ববর্তী সব ব্লগে নতুন পারফরম্যান্স ডেটা ও FAQ আপডেট করা।

   * রিয়েল অ্যাকাউন্টে লাইভ টেস্টের ফলাফল নিয়ে বিস্তারিত কেস স্টাডি প্রকাশ।
</pasted_content id="5a89">
