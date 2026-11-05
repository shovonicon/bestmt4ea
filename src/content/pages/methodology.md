---
wpId: 0
title: "How We Rank and Verify Expert Advisors"
slug: "methodology"
description: "How BESTMT4EA sources performance figures, ranks expert advisors, defines verified, labels demo accounts, handles conflicts of interest and fixes errors."
publishedAt: 2026-11-05
updatedAt: 2026-11-05
seo:
  title: "How We Rank and Verify Expert Advisors"
  description: "How BESTMT4EA sources performance figures, ranks expert advisors, defines verified, labels demo accounts, handles conflicts of interest and fixes errors."
systemPage: true
showAds: false
draft: false
---

## The short version

Every performance figure on our ranking pages is read from a public, third-party Myfxbook account that is linked on the system's own page. We rank by Myfxbook **absolute gain** and show drawdown, account type and the check date beside it. "Verified" means a tracking account exists and the figures come from it. It does not mean we audited the trades, and it does not predict what your own account will do.

This page explains each part, including what we cannot tell you.

## Where do the figures come from?

Each system on the [ranking](/top-ranking/) has a public Myfxbook account, linked on its product page. Myfxbook is a third-party service that connects to a trading account and publishes its history, so we cannot edit the numbers it shows.

A collector program opens each public account page in a real browser, reads the figures that are published there, and stores a snapshot. Two rules apply to it:

- **A figure is stored only if it was read from the page.** A missing metric is left out rather than estimated, so a change on Myfxbook shows up on our site as a gap and not as a wrong number.
- **The pages read the stored snapshot.** The ranking pages are built from that snapshot. They do not call Myfxbook on each visit.

| What we show | Where it comes from | Notes |
| --- | --- | --- |
| Absolute gain (Abs. Gain) | Myfxbook live account figures | The column the ranking is sorted by. |
| Gain and monthly return | Myfxbook | Shown beside the rank, never used as the rank. |
| Maximum drawdown | Myfxbook | Shown on every row. |
| Account type (demo or live) | Myfxbook | Stated on every row. |
| Pair, platform, strategy | The system's own product page | Not a performance figure. |
| Licence price | Our store | Shown for convenience, not used in ranking. |

Where a figure has not been synced yet, the page can fall back to a record we transcribed by hand from the same Myfxbook account. Those records carry an "as of" date and a link to the source, so you can check them yourself.

## What does the check date mean?

The date next to our figures is the date the newest snapshot was captured. It is not the date the site was built. We keep those two dates apart on purpose, because a build date would make old data look fresh.

If collection stops, the check date stops moving. An old date is the warning. Where you see one, open the linked Myfxbook account and read the current figure there.

## What does "verified" mean?

On this site, **verified** has a narrow meaning. These are the labels and what they do and do not say.

| Label | What it means | What it does not mean |
| --- | --- | --- |
| Verified | A third-party tracking account exists for the system, and the figures shown are read from it. | We audited the trades, endorse the system or expect the result to repeat. |
| Live | Myfxbook lists the tracked account as holding real funds. | The result will match yours. Your broker, spread and settings differ. |
| Demo | Myfxbook lists the tracked account as a demo. Every demo row says so. | Anything about live-money results. Demo fills do not carry the slippage and requotes of a live account. |
| No public track record | We have no tracking account for this system. It shows no performance figures at all. | That the system is bad. It means there is nothing to check. |

If an account type shown on another site or badge disagrees with what Myfxbook lists for the account, we go by Myfxbook. We never present a demo account as live.

## How is the ranking calculated?

The board is sorted by Myfxbook **absolute gain**, highest first. Nothing else changes a system's position: not its price, not an affiliate arrangement, and not whether we would like it to rank higher.

Three details matter when you read it:

- **Absolute gain rewards time and risk.** A large gain at a very large drawdown can outrank a modest gain at a small one. That is why drawdown is on every row, and why you can [sort the table](/top-ranking/) by drawdown instead.
- **Systems with no figure sort last.** A system with no published record never outranks one that has one, in either sort direction.
- **The rank number follows the table.** If you re-sort or filter, the numbers renumber to match the rows you see.

The ranking covers **the systems in our own catalogue**. It is not a ranking of every expert advisor on the market. For how to judge a system we do not sell, see our [Forex Flex EA review](/forex-flex-ea-review/) and our guide to [backtesting versus forward testing](/backtesting-vs-forward-testing-verify-ea/).

## What do we refuse to publish?

- **Invented figures.** No made-up gain, drawdown, equity curve or sparkline. If we do not have the data, the cell says so.
- **A demo account labelled as live.**
- **A price of zero** shown as if it were an offer.
- **Star ratings without readable reviews behind them.** We only publish a rating when the reviews it summarises are on the same page.
- **Testimonials we cannot tie to a real customer.** A quote is published only in words the customer wrote and confirmed.
- **Promises.** We do not promise returns or income, we do not call anything safe from loss, and we do not use fake scarcity.

## Who pays us, and does it change what you see?

We sell expert advisors, and the systems on the ranking are in our own catalogue, so we benefit if you buy one. We also earn affiliate commissions from some broker and hosting links. Those links carry `rel="sponsored nofollow noopener"`, are labelled, and sit away from download buttons. The details are on our [affiliate disclosure](/affiliate-disclosure/) page, and the [broker comparison](/best-forex-brokers/) follows the same rules.

Commission does not affect the ranking, because the ranking is calculated from Myfxbook absolute gain and nothing else.

## How are guides and reviews written?

- **Answer first.** Each guide opens with a direct answer, then explains it.
- **Sources.** We cite primary sources for claims we did not measure ourselves.
- **Honest limits.** When we have not run a system, the review says so and attributes every claim to its source.
- **Real dates.** The dates on a page are the dates of real checks, not the date of the last site build.
- **Licences and downloads.** Free downloads show their licence and credit the author. We host only our own builds and open-source tools, and we link to third-party commercial products instead of copying them. See our [copyright policy](/dmca-policy/).

## What should you do with the numbers?

Treat them as a starting point for your own test, not a forecast. Myfxbook figures belong to one broker, one account type and one set of settings, and they will differ on your account. Run any system on a demo account at your own broker first, check the drawdown against what you can accept, and read the [risk disclaimer](/disclaimer/). Trading leveraged products carries a high risk of losing your capital.

## How do you report an error?

If a figure is wrong, a link is dead or a label is misleading, tell us at [bestmt4ea@gmail.com](mailto:bestmt4ea@gmail.com) or through the [contact page](/contact/). We check the Myfxbook source, correct the page if we are wrong, and fix the cause. Rights holders should use the process in our [copyright policy](/dmca-policy/).
