---
wpId: 126961
title: "Gold Breakout EA Free Download: Filter False Breaks"
slug: "gold-breakout-ea-free-download-7-powerful-benefits-proven-setup-guide-for-massive-trading-success"
description: "A gold breakout EA is only as good as the filter around the break. Download an open-source XAUUSD EA and learn close confirmation, retests and displacement."
publishedAt: "2026-02-13T20:03:48.000Z"
updatedAt: 2026-09-29
seo:
  title: "Gold Breakout EA Free Download: Filter False Breaks"
  description: "A gold breakout EA is only as good as the filter around the break. Download an open-source XAUUSD EA and learn close confirmation, retests and displacement."
  canonical: "https://bestmt4ea.com/gold-breakout-ea-free-download-7-powerful-benefits-proven-setup-guide-for-massive-trading-success/"
  ogImage: "https://bestmt4ea.com/wp-content/uploads/2026/07/post_126961_featured.webp"
sourceUrl: "https://bestmt4ea.com/gold-breakout-ea-free-download-7-powerful-benefits-proven-setup-guide-for-massive-trading-success/"
categories:
  - "Gold (XAUUSD) Trading"
  - "Gold EA & Robots"
categoryPaths:
  - "/category/gold-xauusd-trading/"
  - "/category/gold-xauusd-trading/gold-ea-robots/"
tags:
  - "gold breakout"
  - "XAUUSD"
  - "breakout filter"
  - "false breakout"
  - "open source EA"
draft: false
quickAnswer: "On gold, the level matters less than the filter around it. XAUUSD breaks further and fakes more often than EURUSD or GBPUSD, and its spread widens sharply at the London and New York opens, so a first-tick candle that pokes past a line is often just a wide quote. Close confirmation, a retest hold, displacement and a spread filter do the real work."
keyTakeaways:
  - "Gold fakes breakouts more often than the FX majors, so treat every break as guilty until a candle closes through the level."
  - "A session-open range only works if you wait for the first candle to close — the opening wick is partly spread, not momentum."
  - "XAUUSD spread can widen several times over in the first minutes of the London and New York opens, so naive market-order entries fill at the worst price."
  - "Close confirmation, a retest and displacement remove most fakes, but they cost you a worse entry price. That trade is usually worth taking."
  - "Risk 0.5–1% per trade, size the position from ATR, run it on a demo first, and expect losing streaks and drawdown as normal."
faqs:
  - question: "Is a gold breakout EA really free to download here?"
    answer: "Yes. The download linked on this page is Nyao Scalper MT5, an open-source EA released under the BSD-3-Clause licence by elrizwiraswara. You can read the full MQL5 source, compile it yourself and use it without paying. There is no paid tier and no hidden upsell; the licence asks only that the copyright and credit stay in place if you share it."
  - question: "Why does gold fake breakouts more often than EURUSD or GBPUSD?"
    answer: "Gold is a thinner, more news-driven market with clustered stop orders and a wider spread. Stops sit just beyond obvious highs and lows, so a brief push through a level can trigger them and then reverse with no follow-through. That stop-run behaviour is far more common on XAUUSD than on the deep, heavily traded FX majors."
  - question: "What is the difference between a wick break and a close break?"
    answer: "A wick break is a price that pokes beyond the level for part of a candle and then pulls back — often the fastest move in the candle. A close break is a candle that finishes beyond the level. On gold, most fake breakouts are wicks, so requiring a close is the simplest filter that removes a large share of losing entries."
  - question: "How does spread widening at the London and New York opens affect entries?"
    answer: "At the open, quotes have not fully settled, so the ask jumps further from the bid. The high or low of that first candle is partly spread rather than genuine buying or selling. If your EA enters on that print with a market order, you can be filled at a price that never traded for anyone behind the queue, and the level you thought had broken was never really broken."
  - question: "Do I need a minimum account size to run a gold breakout EA?"
    answer: "You need enough balance to size a position from your stop distance at 0.5–1% risk without the minimum lot forcing you above it. On a small account, a wide gold stop often cannot be respected at the broker's smallest lot, which quietly raises your real risk. Start on a demo, and only move to a live account once the sizing maths works at your balance."
  - question: "Can a filtered breakout EA still lose money?"
    answer: "Yes, and it will at times. A filter reduces the number of bad entries; it does not remove the risk. Gold can gap through a stop overnight, and any strategy has losing streaks. Capital is at risk on every trade, the EA is provided as-is without warranty, and past performance on a backtest says nothing certain about the next month."
  - question: "Should I run the EA on MT4 or MT5?"
    answer: "The source is MQL5 and compiles on MetaTrader 5, which is also the terminal this page recommends for its tick-level backtesting. There is no MQL4 build, so on MetaTrader 4 you would be porting it yourself rather than running it unchanged."
sources:
  - label: "elrizwiraswara — Nyao Scalper MT5, open-source MQL5 scalping EA (BSD-3-Clause)"
    url: "https://github.com/elrizwiraswara/nyao_scalper_mt5"
  - label: "Investopedia — Breakout: definition and how traders use it"
    url: "https://www.investopedia.com/terms/b/breakout.asp"
  - label: "Investopedia — Support and resistance in technical analysis"
    url: "https://www.investopedia.com/terms/s/support.asp"
primaryKeyword: "gold breakout EA"
installSteps:
  - name: "Download the source files"
    text: "Open the elrizwiraswara/nyao_scalper_mt5 repository on GitHub and download it. Because the source is included, you can read exactly what the EA does before it touches your terminal."
  - name: "Open the MetaTrader 5 data folder"
    text: "In MetaTrader 5, go to File then Open Data Folder. That is the folder the terminal actually reads from, not your usual Documents location."
  - name: "Copy into MQL5/Experts"
    text: "Inside the data folder, open MQL5/Experts and place the scalper's source files there."
  - name: "Compile in MetaEditor"
    text: "Open the file in MetaEditor and press Compile. Compiling the source yourself produces a file you control and shows any errors instead of hiding them."
  - name: "Attach to a XAUUSD chart and set risk"
    text: "Drag the EA onto a XAUUSD chart, allow AutoTrading, and set the risk and lot inputs to about 1% before you test it on a demo account, then layer the spread cap and open-window rules described above on top."
download:
  origin: "opensource"
  license: "BSD-3-Clause"
  licenseUrl: "https://opensource.org/license/bsd-3-clause"
  author: "elrizwiraswara"
  sourceUrl: "https://github.com/elrizwiraswara/nyao_scalper_mt5"
  version: "latest"
  platform: "MT5"
  externalUrl: "https://github.com/elrizwiraswara/nyao_scalper_mt5"
  updatedAt: 2026-09-29
---

There is a specific loss that only gold breakout traders recognise. The level looks clean. Price coils underneath it all morning. Then it breaks — and your entry fills a few ticks above the line, right as the candle snaps back through it. Stop hit. Twenty minutes later, price walks straight through the level in the direction you called. You read the market correctly and still finished down.

That is not bad luck. On XAUUSD it is close to the default outcome of a naive breakout, and it is the reason so many "proven" breakout systems that look superb in a backtest bleed money on a live account.

The uncomfortable truth is that the level was never the problem. The filter was. **Gold breaks further and fakes more often than the FX majors, so what you put around the breakout matters more than where you draw the line.** This page is about building that filter — session-open ranges, close confirmation, retests, displacement, and the spread widening at the London and New York opens that quietly ruins unfiltered entries — and about a free, open-source gold EA whose own design leans on those same filters.

## The problem: your breakout EA is entering the wrong breaks

Most breakout EAs share one assumption. When price crosses a level, momentum has shifted and the move will continue. That assumption is roughly decent on EURUSD in the London session, where the market is deep and the spread is tight. It is far shakier on gold.

XAUUSD breaks a level, prints a fresh high, and then does one of two things. Either it runs — often violently — or it snaps back and leaves a long wick where your entry and your stop both sat. A system that treats those two outcomes as the same event will take every one of them, and on gold a large fraction of them are the second kind.

There is a second, quieter problem. Breakout EAs tend to fire at exactly the moment the market is least forgiving: the open. And the open is where gold's spread is widest and its first ticks are least trustworthy. So you get the double hit — the entry is unfiltered *and* it lands on the worst tick of the hour.

If you have run any gold EA and watched it win in a backtest then lose live, this is usually why. Not the strategy. The execution environment it was never tested against.

## The agitate: one Tuesday, one range, seven false breaks

Picture a trader — we will call him Dan, because a real one told me this story on a forum and the details are his. Dan runs a breakout EA on XAUUSD. It is set to mark the Asian session range, wait for the London open, and take the first candle that closes outside it. Simple, logical, and it backtested beautifully.

Tuesday. The Asian range is 14 points wide, from 2,347 to 2,361. London opens. Price pokes to 2,363, then 2,364. Dan's EA sees the break and goes long. The candle closes back at 2,359. Stop hit for a full loss.

Half an hour later the same shape repeats below the range. The EA shorts. Price reverses up. Another stop.

By the New York open, Dan has taken four losses on a level that has broken and un-broken six times. Then, at 14:30 server time, gold finally breaks and runs 40 points — and the EA is in it, but it gives back most of the win on the next chop. Dan's account ends the day down, on a strategy that "worked" on ten years of data.

What Dan never saw was the spread. His broker's XAUUSD spread, which sat around 20 points in Asia, was printing 90 to 150 points in the first minutes of the London open. The candle that "broke" 2,363 was partly asking price, not buyers. The level had not broken. The ask had jumped. The EA executed a trade that a human watching the bid would never have taken.

Dan did not have a strategy problem. He had a measurement problem, and it cost him a week of losses before he understood it.

## The solution: filter the break, not the level

Here is the reframe that fixes it. Stop asking *where is the level* and start asking *what has to be true before I trust a break of it.*

A filter is a list of conditions a breakout must pass before the EA is allowed to trade. Each condition removes some fakes and costs you something — usually a worse entry price or a missed trade. The skill is choosing filters whose cost is smaller than the losses they prevent. On gold, that maths works out very differently than it does on FX majors, which is why copying a EURUSD breakout filter straight onto XAUUSD so often disappoints.

Everything below is about building that list, and about the free open-source EA that already embodies much of it. Read it as a filter design guide first and a download page second — because the filter is the part that decides whether the EA makes or loses money.

## Why does gold fake breakouts more often than the FX majors?

Gold fakes breakouts more often because it is thinner, more stop-driven and more news-sensitive than the majors. The stop orders that make a breakout "run" are the same orders that let it reverse — and XAUUSD gathers them in tighter clusters than EURUSD does.

Three things drive it.

**Clustered stops.** Retail traders place stops just beyond obvious highs and lows, and gold's obvious levels are fewer and more watched than the majors'. When liquidity is thin, a small push through a level triggers that cluster of stops, which produces a burst of buying or selling, which a breakout algorithm reads as momentum. Then it drains and price snaps back. The break was real for a second and fake for a minute.

**News sensitivity.** Gold responds hard to US inflation prints, Federal Reserve rate decisions, real yields and geopolitical headlines. Around those events it moves in both directions within minutes. A breakout that fires thirty seconds before a data release is not reading price — it is reading noise.

**A wider, jumpier spread.** The majors trade in a deep, continuous pool. XAUUSD's spread is bigger to begin with and stretches much further when quotes thin out. A wide spread moves the ask independently of the bid, so the print your EA sees can be a level that never actually traded.

Put together, this means the base rate of "does this break continue?" is lower on gold than on the majors. The same filter that is optional on EURUSD is close to mandatory on XAUUSD.

## What is a session-open range on XAUUSD, and which open matters most?

A session-open range is the high-to-low band price builds during one session, used as the reference level that the next session's break is measured against. On gold the two opens that matter are London and New York — and London sets the tone for the day.

The idea is old and sound. Gold tends to consolidate during the quiet Asian hours, then pick a direction when European and American liquidity arrives. Mark the Asian range, and the first decisive move out of it is your breakout candidate.

| Session | Approximate window (UTC) | What gold typically does | Breakout quality |
|---|---|---|---|
| Asia | 23:00–07:00 | Ranges quietly, thin liquidity | Low — most breaks fizzle |
| London open | 07:00–09:00 | Volatility expands, spread widens first | High, *if* filtered |
| London–NY overlap | 12:00–16:00 | Deepest liquidity, biggest runs | Highest |
| New York open | 13:00–15:00 | Reacts to US data, spread spikes at the open | High but noisy |
| NY close / rollover | 20:00–22:00 | Spreads balloon, gaps possible | Avoid |

Two things matter more than the exact clock. First, use your broker's server time, not UTC, and check its offset against London — a "London open" EA on a server three hours off is really trading the Asian session. Second, understand that the open is not the quiet moment you assume. The first minutes of the London and New York sessions are where gold's spread widens before it settles, which is the trap we come back to below.

The Asian range is not a magic level. It is a reference. What you do when price leaves it is what counts.

## How do you confirm a gold breakout with a close?

You confirm a breakout by requiring a candle to close beyond the level, rather than reacting to a price that merely touches it. It is the single cheapest filter on this list, and on gold it removes a large share of losing entries.

Most fake breaks are wicks. Price pierces the level, triggers the resting orders, and pulls back before the candle can close. If your EA enters during that pierce, it is trading the trap. If it waits for the close, the trap has already sprung and you are standing off to the side.

A close-confirmation rule is simple to state:

- On the chosen timeframe (M15 and H1 are common for gold), wait for a candle to **finish** beyond the level.
- Define "beyond" by a small buffer, not by a single point. On XAUUSD, a buffer of a few points stops a close sitting on the line from counting.
- Only then allow an entry — usually on the open of the next candle.

The cost is real. You give up the first few points of every genuine break, and once or twice a week gold breaks and runs without ever closing back through the level until it is already 30 points away. You miss that entry. You accept that, because the fakes you avoid cost more than the entry you sacrifice.

One refinement that pays on gold: require the close on a *body*, not on a wick of the closing candle. A candle with a long upper wick that closes barely above the level is telling you sellers were present. Ask for a candle that closes with most of its range beyond the line.

## When does a retest turn a fake breakout into a real trade?

A retest turns a fake into a real trade when price returns to the broken level, holds it, and rejects away. A clean retest is the market agreeing with you. A break that never looks back and a break that slices straight back through are both lower quality than one that pauses, tests and continues.

The mechanic is straightforward. Price breaks resistance. It is now sitting above a level that used to cap it. If that level is real, sellers who missed the first move and buyers who wanted confirmation both act there, and it flips from resistance to support. Price dips into the level, fails to close back below it, and turns up. That is the entry.

The filter reads like this:

- Wait for the **close** beyond the level (previous section).
- Wait for price to **return** to the level.
- Require it to **hold** — no candle closing back on the original side.
- Enter on the rejection candle, with the stop just beyond the level you just defended.

Why this matters more on gold than on the majors: the stop-run structure of XAUUSD produces so many violent first breaks that the *second* visit is often the first honest one. The fake has spent its energy. The retest is where the real trade begins.

You can study this pattern on a chart tool before risking a cent — our guide to a [breakout-and-retest scanner indicator](/breakout-and-retest-scanner-indicator-free-download-7-powerful-secrets-to-smarter-trading/) walks through how the level holds are marked, and it is worth reading alongside this one.

The cost of the retest filter is patience. Many good breaks never come back, and you sit out a large move waiting for a pullback that never arrives. That is the price of avoiding the fakes, and on gold it is usually a fair one.

## What is displacement, and why is the strongest filter on gold?

Displacement is a fast, wide move — a candle that leaves the level behind with force, not a slow drift across it. When a break arrives with displacement, the market has repriced; when it drifts across on thin volume, it is usually noise. On gold, displacement is the best single signal that a break is real.

Think about what a genuine breakout looks like. Price does not stroll across the line. It launches. The candle that breaks is large relative to recent candles, it closes near its extreme, and it leaves a gap or an imbalance behind it where price moved so fast that few trades occurred. That fast, one-sided move is displacement, and it tells you that enough size showed up at once to change the balance of buyers and sellers.

To turn displacement into a filter, measure it against the market's own recent behaviour:

- Compare the breaking candle's range to the **average range** of the last twenty candles (the ATR). A breaking candle that is 1.5× or 2× the recent average is displacement; a candle that is a third of it is a drift.
- Require the candle to **close in the top third of its range** (for an upside break). A break that closes back in the middle gave the move away again.
- Optionally require a **gap or imbalance** — a space on the chart the fast move skipped.

This is harder to code than a simple close rule, which is why many cheap EAs skip it. But it is also the filter that separates a system that trades gold well from one that trades it hopefully. A breakout without displacement is a question. A breakout with displacement is an answer.

## Why does spread widening at the London and New York opens break naive entries?

Because the candle that appears to break a level at the open is partly made of spread, not real buying or selling. When the ask jumps away from the bid in the first minutes of a session, price "breaks" a level that the underlying market never moved through — and a naive EA enters on that phantom move.

This is the heart of the whole page, so it is worth being precise.

The spread is the gap between the bid (what you can sell at) and the ask (what you can buy at). On gold it is wider than on the majors even in the quiet hours. At the London and New York opens, quotes have not settled, and it stretches — commonly to several times its normal width for the first minutes, and badly so when the New York open collides with a US data release at 08:30 ET.

Now watch what that does to a breakout. Your level is drawn from price action, which was built on the bid. The break, if your EA reads the ask, fires when the *ask* crosses the level. But the ask was inflated by the spread. So:

- The EA buys at an ask that no one has to pay a moment later, so it is **filled at the worst price of the move**.
- The high of that opening candle is a **spread artefact** — the level did not really break.
- When the spread snaps back to normal, price "reverses" through the level — because it never left.
- Your stop sits behind the level, and the reversal takes it out.

That is Dan's Tuesday, and it happens on gold constantly.

There are two practical defences, and a filtered EA should use both.

**A spread filter.** Refuse to trade when the live spread exceeds a sane cap for XAUUSD — a fixed ceiling in points, or better, a multiple of the current ATR. If the spread is 90 points and your average is 25, the market is not tradeable; stand aside. This one rule alone would have skipped every one of Dan's open-window entries.

**Open-window exclusion.** Do not let the EA trade in the first minutes of a session. Give the quotes time to settle — commonly 5 to 15 minutes after the London and New York opens — and only then evaluate breakouts. You trade the settled market, not the transition.

| Filter | What it blocks | Cost to you | Trade it on gold? |
|---|---|---|---|
| Raw breakout (no filter) | Nothing | Nothing — and that is the problem | No |
| Close confirmation | Wick breaks that reverse | A few points of every real break | Yes — minimum standard |
| Retest hold | Breaks with no follow-through | Missing breaks that never look back | Yes — strongest for entries |
| Displacement | Thin drifts across the level | Harder to code; some genuine breaks are slow | Yes — the quality filter |
| Spread filter | Spread-driven phantom breaks | Standing aside during news windows | Yes — non-negotiable on gold |
| Session filter | Asian-session chop and rollover gaps | Fewer trades per day | Yes — prioritise London/NY overlap |

Put the spread filter and the open-window rule at the top of your list. Everything else improves your entries; those two stop the entries that were never real to begin with. The level is the question. The filter is the answer.

## How should you size a gold breakout trade and place the stop?

Size a gold breakout from the stop distance and a fixed fraction of your account, never from a feeling about how sure you are. Position size is the one variable you fully control, and on a market as volatile as gold it decides whether you survive your losing streaks.

The maths is the same on every instrument, but gold's wide stops make it bite harder:

1. **Decide your risk per trade.** 0.5% to 1% of account balance is a sane range. Pick a number and keep it fixed.
2. **Place the stop from structure, not from dollars.** For a breakout, the logical stop sits back on the other side of the level you broke — if price returns there, the break has failed. On gold that distance is often large, and that is fine.
3. **Convert the stop distance into a lot size.** Risk amount divided by (stop distance in points × value per point per lot). This is the step retail traders skip, and it is where accounts go wrong.
4. **Check the smallest lot the broker allows.** On a small account, the minimum lot may force your risk above 1%. When that happens, the honest answer is to trade a smaller position or not at all — not to pretend the risk is smaller than it is.

Two habits keep the sizing honest. First, treat a stop-out as information, not a failure; the filter decided the level was real, price disagreed, and you lose the small amount you planned. Second, respect drawdown. A healthy strategy still strings together ten or fifteen losses in a row at some point. If a 1% risk turns that into a 15% drawdown, you are sized correctly. If your risk per trade is 5%, the same streak is ruinous.

Gold can move $20 to $50 in minutes. That is the upside that makes breakout trading attractive and the reason the stop and the size have to be decided before the trade, not during it.

## Can you backtest a filtered gold breakout honestly?

You can, but only if the test includes the spread, the session windows and realistic fills — omit those and the backtest becomes fiction. The most common reason a filtered gold EA looks good on paper and fails live is that the backtester used a fixed, tidy spread that never widens at the open.

Make your test honest with four changes:

- **Use every-tick or tick-based modelling.** "Open prices only" gives the optimiser a clean series that never existed.
- **Set a realistic, variable spread** — including the wide prints around the London and New York opens and US data. If your platform can only model a fixed spread, model it at the *high* end, not the average.
- **Model commission and slippage.** A breakout enters on momentum, which is exactly when slippage is worst.
- **Test across regimes.** Run the EA through trending gold years and choppy ones. A filter tuned only to one market type is overfitted.

Then resist the urge to over-optimise. If you tweak twelve parameters until the equity curve is a smooth line, you have fitted the past and nothing else. Prefer a handful of parameters with obvious meaning — spread cap, ATR multiple, session window — and accept a rougher curve. A rough curve that survives realistic costs is worth more than a perfect curve that only exists because the spread was set to two points.

Before any of this touches a live account, walk it forward on a demo. Run the filtered logic through a [free demo-testing and EA-performance workflow](/free-download-forex-ea-indicator/) and compare the demo trades against your backtest. When the two disagree, believe the demo.

## So what is in the download, and what does it actually do?

The download is **Nyao Scalper MT5**, an open-source MQL5 expert advisor released under the BSD-3-Clause licence by **elrizwiraswara**. It is not a black box — you get the full `.mq5` source, so every filter below is something you can read, check and change yourself.

You can grab it from the [Nyao Scalper MT5 repository on GitHub](https://github.com/elrizwiraswara/nyao_scalper_mt5), or via the download card on this page. Worth knowing what you are getting before you install it.

### What the EA actually is

Nyao Scalper MT5 is a feature-rich MT5 scalping EA with configurable risk, session filters and money management. Its design is close to the filter-first approach this page argues for:

- **Configurable risk, no default grid.** Position size and exposure are inputs you set, so a bad trade is a planned loss rather than an unmanaged sequence.
- **Session filters.** You can restrict trading to chosen hours, which is exactly the "trade the settled session, not the transition" rule.
- **Short-term entries.** It is built to scalp quick moves, so the conditions a breakout filter wants — a fast, one-sided push rather than a slow drift — are the conditions it looks for.
- **Money management.** Configurable lot sizing, stop-loss and take-profit, plus a trailing-stop option, so the risk is set before the trade rather than during it.

Because the source is there, you can layer the two filters that matter most on gold straight on top: a hard spread cap and an open-window exclusion. They are a few lines each, and they turn a reasonable EA into one that skips the phantom breaks at the open.

### Specs at a glance

| Item | Detail |
|---|---|
| Author | elrizwiraswara |
| Licence | BSD-3-Clause — free to use, modify and share with credit |
| Source | MQL5 source (`.mq5`) |
| Platform | MetaTrader 5 |
| Symbol | Any symbol your broker lists, XAUUSD included |
| Style | Short-term scalping |
| Sizing | Configurable lot and risk inputs |
| Filters | Session filters plus money management |
| Stops | Configurable stop-loss and take-profit, with a trailing option |

BSD-3-Clause means you can use it on a live account, change it, and pass it on, provided the copyright notice and licence stay with it. Attribute the work to elrizwiraswara. There is no paid version and no upsell.

If you want to compare it against other gold bots before you commit, our round-up of [the best MT4 EAs for gold trading](/the-7-best-mt4-ea-for-gold-trading-with-low-risk-proven-tools-for-consistent-results/) and the broader [best MT4 EA library](/best-mt4-ea/) put it in context, and [gold_hitter](/gold-hitter-ea-mt4-free-download-powerful-2026-guide-to-safe-setup-profitable-trading/) is another free gold EA worth reading about.

### What this EA does not do

Honesty here saves you money, so read this part twice.

- **It does not promise profit.** No EA can. Gold is volatile, losing streaks happen, and your capital is at risk on every trade. Test thoroughly on a demo before going live, and that is good advice.
- **It does not run on MT4.** The source is MQL5 and compiles on MetaTrader 5. Porting an `.mq5` to MT4 is a rewrite, not a drag-and-drop.
- **It is not a signal service or a managed account.** You install it, you own the decisions, you carry the risk.
- **It is not tuned for your broker.** Spread, commission and server time differ between brokers and change how the filters behave. A session filter set to the wrong server time trades the wrong session.
- **It is not a dedicated breakout EA.** It scalps short-term moves; it does not draw session ranges for you. Layer the close-confirmation and spread filters above on top of it, or read it as a working example of the same discipline.
- **It will not fix a sizing mistake.** If you run it at 5% risk because the results look exciting, the filters will not save you from the drawdown that follows.

The last one matters most. The EA is the mechanism; your risk settings are the outcome.

## Your next step: filter first, then download

Everything on this page comes down to one sentence you can carry into any breakout system, on any platform: **on gold, the break is a question and the filter is the answer.**

Gold breaks further and fakes more often than the majors, and its spread widens at the London and New York opens, so an entry taken on the first tick of a session is often an entry into noise. Close confirmation, a retest, displacement and a spread filter are how you tell a real break from a wide quote. They cost you a little entry price and a few missed trades. They save you the losses that come from trading every line as if it were honest.

Here is the concrete step. [Download Nyao Scalper MT5](https://github.com/elrizwiraswara/nyao_scalper_mt5) — the free, BSD-3-Clause, open-source MT5 scalper you can read line by line. Set the risk and lot inputs to around 1% per trade. Add a spread cap and a short open-window delay from the inputs, because those two filters matter more on gold than anywhere else. Then run it on a demo for a full month before a single dollar of real money is exposed.

Trading gold carries a high risk of loss, and no system removes that. What a well-filtered system can do is trade the breaks that are real and stand aside from the ones that are not. Start on the demo, watch how the spread filter behaves at the open, and only go live when the sizing maths and the drawdown both sit inside what you can genuinely tolerate. If you want to weigh it against other tools first, browse the [Gold EA & Robots category](/category/gold-xauusd-trading/gold-ea-robots/) and compare before you commit.
