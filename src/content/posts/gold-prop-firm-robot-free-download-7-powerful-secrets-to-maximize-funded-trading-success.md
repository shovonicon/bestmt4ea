---
wpId: 127233
title: "Gold Prop Firm Rules: Why Your EA Fails a Challenge"
slug: "gold-prop-firm-robot-free-download-7-powerful-secrets-to-maximize-funded-trading-success"
description: "Your gold EA fails prop firm challenges on the rulebook, not the market. Daily loss limits, drawdown, consistency and news bans decide which XAUUSD systems run."
publishedAt: "2026-02-13T22:22:43.000Z"
updatedAt: "2026-09-29"
seo:
  title: "Gold Prop Firm Rules: Why Your EA Fails a Challenge"
  description: "Your gold EA fails prop firm challenges on the rulebook, not the market. Daily loss limits, drawdown, consistency and news bans decide which XAUUSD systems run."
  canonical: "https://bestmt4ea.com/gold-prop-firm-robot-free-download-7-powerful-secrets-to-maximize-funded-trading-success/"
  ogImage: "https://bestmt4ea.com/wp-content/uploads/2026/07/post_127233_featured.webp"
sourceUrl: "https://bestmt4ea.com/gold-prop-firm-robot-free-download-7-powerful-secrets-to-maximize-funded-trading-success/"
categories:
  - "Gold (XAUUSD) Trading"
  - "Gold EA & Robots"
categoryPaths:
  - "/category/gold-xauusd-trading/"
  - "/category/gold-ea-robots/"
tags: []
draft: false
quickAnswer: "A gold EA fails a prop firm challenge on the rulebook, not on the market. Daily loss limits cap what one bad session can cost, maximum drawdown caps the whole run, consistency rules forbid carrying the result on one big day, and news or weekend bans remove the trades gold EAs trade most. Match the rulebook to the system before you pay a fee."
keyTakeaways:
  - "The rulebook is a specification, not a market test: read the daily loss limit, drawdown type, consistency rule, news window and weekend rule before you look at any EA."
  - "A daily loss limit counts the fall from the day's starting equity, so grids and martingale systems are structurally unable to comply."
  - "Trailing drawdown and intraday equity measurement disqualify systems with deep historical dips even when total profit is positive."
  - "Consistency rules (best day ≤ 30–50% of total profit) rule out news-spike and single-big-winner systems by design."
  - "Sizing each position off the daily allowance — not the account balance — is what keeps three losses inside a 5% day."
faqs:
  - question: "Do prop firms allow gold EAs and robots at all?"
    answer: "Most firms allow expert advisors, but almost none allow them unconditionally. The usual limits are automated news trading around high-impact releases, high-frequency or latency strategies, copy trading and signal mirroring, and any grid or martingale structure without a hard stop. Some firms require the EA to run on their own server, and some require written approval before you attach one. Treat the rulebook as the contract it is and read the section on automated trading before you install anything."
  - question: "What is the difference between static and trailing drawdown in practice?"
    answer: "Static drawdown is a fixed floor set from your starting balance — on a $100,000 account with 10% static drawdown, the floor stays at $90,000 for the whole challenge. Trailing drawdown moves up with your equity or balance high, so the floor follows you and never falls. Trailing is far harder: a green day that turns red can end an account that was never in overall loss."
  - question: "Can a grid EA ever pass a prop firm challenge?"
    answer: "Realistically, no. A grid holds losing positions open and adds to them, which means floating loss keeps growing while the position count grows faster. That floating loss is measured against your daily limit and your maximum drawdown at the same moment, so a single adverse move breaches both. Some firms also ban grid and martingale structures by name. If your EA has no hard stop per position, assume it is ineligible."
  - question: "How do I know the daily loss limit has been reached before the firm does?"
    answer: "Calculate it yourself from the day's starting equity, subtract commissions and swap, and stop earlier than the firm would. A practical approach is a hard shutdown at 60–70% of the firm's daily figure, so a slippage event or a re-quote cannot push you over. A server-side equity guard inside the EA is better than a mental rule, because the EA is what is placing the trades."
  - question: "Does the consistency rule appear on funded accounts too?"
    answer: "It depends on the firm. Some apply consistency only during evaluation, some apply a payout rule that caps how much of your total profit a single day or single trade may represent, and some apply both. A firm may also refuse a payout if your winning days cluster into one instrument or one strategy. Check the payout section of the agreement, not just the challenge objectives."
  - question: "Is a free open-source position size calculator enough to pass?"
    answer: "No. A position size calculator fixes one part of the problem — how many lots to trade so a stop-out stays inside your daily allowance. It cannot read your firm's rules, cannot stop you trading a banned news window, and cannot make a system profitable. It is a compliance tool, not an edge. Use it to make your sizing arithmetic exact, and keep the strategy decision separate."
sources:
  - label: "FTMO — Trading objectives and rules"
    url: "https://ftmo.com/en/trading-objectives/"
  - label: "EarnForex PositionSizer — Apache-2.0 source repository"
    url: "https://github.com/EarnForex/PositionSizer"
  - label: "US Federal Reserve — FOMC meeting calendar"
    url: "https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm"
  - label: "Apache License 2.0 — full licence text"
    url: "https://opensource.org/license/apache-2-0"
primaryKeyword: "gold prop firm rules"
installSteps:
  - name: "Open the source repository"
    text: "Go to github.com/EarnForex/PositionSizer and open either the MQL4 or the MQL5 folder, depending on which MetaTrader you use. The licence and full README sit in the same repository."
  - name: "Find your MetaTrader data folder"
    text: "In MetaTrader 4 or MetaTrader 5, click File, then Open Data Folder. This is the folder the terminal actually reads from, not the Documents folder you may expect."
  - name: "Copy the expert advisor into place"
    text: "Open MQL4/Experts or MQL5/Experts inside the data folder and copy the Position Sizer source files into it."
  - name: "Compile in MetaEditor"
    text: "Open the .mq4 or .mq5 file in MetaEditor and press Compile. A clean compile produces a .ex4 or .ex5 file that you built from readable source yourself."
  - name: "Attach it and set your numbers"
    text: "Drag Position Sizer onto a XAUUSD chart, enable AutoTrading, then set account currency, leverage, risk percentage and your intended stop distance in the inputs."
  - name: "Run the rulebook test on demo"
    text: "Trade it on a demo account with your firm's exact daily loss and maximum drawdown figures for at least 60 days before you spend money on a challenge."
download:
  origin: "opensource"
  license: "Apache-2.0"
  licenseUrl: "https://www.apache.org/licenses/LICENSE-2.0"
  author: "EarnForex"
  sourceUrl: "https://github.com/EarnForex/PositionSizer"
  version: "latest"
  platform: "MT4/MT5"
  externalUrl: "https://github.com/EarnForex/PositionSizer"
  updatedAt: "2026-09-29"
---

Most traders who fail a prop firm challenge tell the same story. The market turned. The broker hunted the stop. The strategy stopped working.

Sometimes one of those is true. Most of the time it is not. The account ended because of a number in a document that was skimmed once at checkout and never opened again.

Here is the version that costs people the most money: on a challenge account, the market decides very little you cannot survive. The rulebook decides everything. A gold (XAUUSD) EA can be up 9% on the month and still be worthless, because 9% stops mattering the moment one session costs 5.1% against a 5% daily loss limit.

If you have been searching for a free gold prop firm robot, this page is the part most download pages leave out. The robot is not the hard part. The rules are the hard part, and the rules change which robots are even usable.

## Why does the rulebook decide your result before the market does?

Because a prop firm does not score your profit. It scores your compliance, and one breach ends the account no matter what the equity curve would have done. A system that would have finished the month up 8% is worth exactly nothing if it takes four red days in a row and trips the daily limit on the fourth.

Read a firm's objectives as a specification rather than a punishment. It tells you precisely which systems are eligible and which are not, and that is more useful than any backtest. Firms sell evaluations, not capital; the rules are written so that a small minority of accounts survive the process. That is not a reason to skip the process. It is a reason to choose a system that is designed for it.

Everything you sign belongs to one of six rule families.

| Rule family | Typical limit in 2026 | What it actually forces you to change |
|---|---|---|
| **Daily loss limit** | 4–5% of the day's starting balance or equity | Position size per trade, and whether the EA can hold floating losses at all |
| **Maximum overall drawdown** | 6–10%, static or trailing | The entire equity curve — one deep historical dip disqualifies a system |
| **Profit target** | 8–10% in phase 1, often 5% in phase 2 | How much of the result one day is allowed to produce |
| **Consistency rule** | Best day ≤ 30–50% of total profit | Rules out systems that earn in one or two large trades |
| **News trading ban** | No opening or closing within 2–5 minutes of a high-impact release | Rules out most gold news scalpers by definition |
| **Weekend / holding rules** | Flat before the Friday close, or no new trades within N hours of it | Rules out swing systems and hold-to-recovery designs |

Two of those do most of the damage: the daily limit and the maximum drawdown. Gold moves violently enough to reach a 5% daily boundary inside a single economic release, and it can do it in minutes. That is the whole problem in one sentence — the instrument with the best intraday opportunity is also the instrument most likely to breach a daily cap before you can react.

This is why you should read a firm's [prop firm rules before you install any EA](/prop-firm-ea-free-download-7-powerful-truths-every-trader-must-know/), and why the [gold EA category](/category/gold-xauusd-trading/gold-ea-robots/) is full of systems that were never built for a rulebook.

## What does the daily loss limit actually measure?

It measures the fall from the day's starting equity, not the number of losing trades — so what matters is your worst floating moment, not your worst closed trade. Most firms calculate it from the higher of balance and equity at the day's start, count unrealised losses, and reset at a fixed server time that is usually midnight Central European Time.

Three details decide whether your EA can comply.

**Balance-based or equity-based.** If the firm counts equity, an open position that is 3% underwater already counts against the limit. If it counts balance, only closed losses count. Most modern firms count equity, which is the stricter and the more common reading.

**The reset time, not your time.** A day is not your day. If the server resets at 00:00 CET, a losing trade that runs past that boundary lands on the next day's allowance. An EA that never closes positions before the rollover will eventually hand you a breach that looks like it came from nowhere.

**Unrealised losses stack.** Three positions each 1.5% underwater are not three small problems. They are one 4.5% drawdown, measured the same way the firm measures it.

### Why a grid or martingale EA cannot coexist with a daily limit

A grid adds to losing positions and waits for a reversal. While it waits, the floating loss grows and the position count grows with it. The maximum adverse excursion of the basket is not a stop-loss distance; it is a number nobody knows in advance. Against a fixed daily number, that is not a strategy with risk — it is a strategy with an unknown exposure, and one adverse move breaches the daily limit and the maximum drawdown at the same moment. Many firms also ban grid and martingale structures by name, so the question often does not even reach the arithmetic.

If your EA cannot close every position at a hard loss level, assume it is ineligible. That single filter removes most of the free gold robots you will find.

## How does a maximum drawdown rule make a profitable EA unusable?

Because the rule limits the shape of the equity curve, not its direction, and a system with a deep dip is rejected even when it ends the period in profit. Two accounts can finish up 6% and be treated completely differently, depending on how low they went on the way there.

Static drawdown sets a fixed floor from the starting balance. On a $100,000 account with a 10% static limit, the floor sits at $90,000 for the whole challenge and never moves.

Trailing drawdown moves with your high-water mark. On the same account with a 6% trailing limit, the floor climbs as soon as you are in profit. Get to $104,000 and the floor is $97,760 — you can never let the account fall below roughly $2,240 of loss from that high point, even though you are well ahead of where you started. Intraday trailing is harsher again: some firms track the highest equity reached mid-session, so a spike that reverses within the same hour still raises the floor.

The arithmetic then has a cruelty of its own. Lose 10% and you need 11.1% to get back to where you were. Lose 20% and you need 25%. On a challenge, you usually do not get the time.

### What this means before you pay a fee

Pull up the EA's longest tested period and find its worst peak-to-valley equity dip, not its worst losing streak. If that dip is anywhere close to the firm's drawdown figure, the system is not eligible, however good the average month looks. Myfxbook-style curve analysis is enough for this check; the curve and the drawdown numbers are right there.

Then read whether the limit is balance-based or equity-based, and whether it trails. Those two questions move the effective limit more than 3% on some firms, which is the difference between a system that fits and a system that does not. The [EA settings category](/category/mt4-mt5-expert-advisors/ea-settings-optimization/) covers the parameter tuning side of this.

## What is a consistency rule, and why does it ban your best EA?

A consistency rule caps how much of your total profit one day is allowed to contribute — commonly 30% to 50% — and it exists because firms do not want to fund a gamble that happened to land. The rule does not care how well you trade. It cares that your winning days look similar to each other.

Here is the trap in numbers. Phase 1 target: 8% on a $100,000 account, so $8,000. Your EA has a good Non-Farm Payroll morning and makes $5,000. That single day is 62.5% of the target, and under a 40% consistency rule the challenge is failed even though nothing else went wrong.

Systems that earn in one or two big trades are disqualified by construction. That includes gold news-spike EAs, trend systems that hold one position for a week and take most of the move, and any recovery logic that makes back several losing days in one session. It also includes the version of discipline most traders default to under pressure: raise the lot size on the day you decide to catch up.

What survives is duller. A system that produces many small, similar days, with a tight stop and a modest target, is the shape the rule rewards. If two flat weeks of 0.3% days and one 4% week are an option, the flat weeks are what passes.

## Do news trading bans kill gold EAs?

For a large share of them, yes — because gold's cleanest intraday moves cluster in the two to five minutes around US Non-Farm Payroll, CPI and FOMC announcements, which are exactly the windows the bans cover. If your EA needs a spike to pay, and the spike window is closed, the EA has no edge left to trade.

Typical wording looks like this: no opening or closing a position from two minutes before to two minutes after a high-impact release, and sometimes you must be flat through the window entirely. Some firms publish a list of covered events; others use a third-party calendar and apply a generic rule. Either way, the burden of proof is on you.

The ban is partly protective, and it is worth understanding why. Around a release, gold spreads can widen from around 15 points to well over 100 points on some brokers, and stops fill far from their level. A limitation that keeps you out of that auction also keeps you out of your worst fills. Real violation risk is not only the rule itself — it is a stop triggered by a widened spread, logged at a price you never chose.

Practical consequence: any gold EA you consider must have a working news filter, and you must verify it against the firm's specific event list rather than a generic setting. A filter that pauses trading during a calendar flag is not the same thing as a filter that closes an open position before the window. You can map the FOMC dates from the Federal Reserve's published calendar and the jobs report dates from the Bureau of Labor Statistics, then overlay them on your own log.

## Do weekend holding rules matter for a gold EA?

They matter a lot, because gold can gap on weekend geopolitical news and many firms will not let you carry that risk at all. Rules come in three rough versions: close everything before the Friday close, do not open new trades within a set number of hours of the close, or allow weekend holding but disqualify any weekend-related result.

Slippage on a Sunday open is not theoretical. Gold has opened tens of dollars away from Friday's close after a weekend headline, and a stop-loss order becomes a market order at whatever price is available. If your EA holds through the weekend with a stop 1% below entry, the stop is a suggestion on Sunday night.

There is a cost side too. Swap on gold is charged per night and triples on Wednesdays at many brokers, and a position held from Friday to Monday can carry three days of swap. A swing system that looks healthy on a chart of price alone can look very different once financing and a weekend gap are included. If your system needs to hold for days, check the holding clause of the specific firm before anything else.

## Which gold EA types survive a prop firm rulebook?

Fixed-stop, session-filtered systems survive; anything that holds floating loss, hunts news spikes or earns from one large trade does not. The table below compares the common types against the four rules that eliminate systems most often.

| System type | 5% daily loss limit | 10% max drawdown | Consistency rule | News ban | Verdict |
|---|---|---|---|---|---|
| **Trend following, fixed ATR stop** | Passes — each trade capped | Passes if historical dip is shallow | Passes — many similar days | Passes — no news dependency | **Usable** |
| **London / New York session breakout** | Passes with small size | Passes if dip is tracked | Passes | Passes with a working filter | **Usable** |
| **Level mean reversion, hard stop** | Borderline — needs tight size | Borderline | Passes | Passes with a filter | **Usable with limits** |
| **News-spike scalper** | Fails on widened spreads | Fails on gap risk | Fails by design | **Banned outright** | **Not viable** |
| **Grid, no stop** | Fails — floating loss compounds | Fails at the same moment | Fails on one recovery day | Usually banned by name | **Not viable** |
| **Martingale recovery** | Fails — size doubles into loss | Fails | Fails | Usually banned by name | **Not viable** |
| **High-frequency / latency** | Passes numerically | Passes numerically | Passes | Banned on most platforms | **Not viable** |
| **Copy trading / signal mirroring** | Depends on the source | Depends on the source | Depends | Depends | **Check the clause** |

Three other constraints worth checking in the same pass:

- **Where the EA runs.** Some firms require automation to run on their own server or VPS. Yours may not be attachable at all.
- **Instruments and lot caps.** A maximum lot size or a ban on holding two correlated positions changes what the EA can do with gold and silver at the same time.
- **Approval clauses.** A few firms require you to declare and get approval for an EA. Running one without approval is a breach, even if the EA never breaks a number.

## How do you size positions so three losses cannot breach a 5% daily limit?

Risk a fixed fraction of the day's allowance per position, not a fixed fraction of the account — and divide by the maximum number of positions the EA can hold at once. That one change is the difference between a compliant account and a terminated one.

Work the arithmetic. A $100,000 account with a 5% daily limit has $5,000 of room for the day. If your EA can be in three positions simultaneously, then each position may take no more than about $1,600 before the day's cap is reached. Size for a third of the allowance, not for the whole of it, and leave room for spread, commission and one slippage event.

Then convert that loss allowance into lots. For XAUUSD at most brokers, a standard lot is 100 ounces, so a $1.00 move in gold is $100 per lot. To lose no more than $400 with a $4.00 stop, you trade 1.00 lot; with a $2.00 stop, 2.00 lots; with an $8.00 stop, 0.50 lots. Notice what did not enter the calculation: how bullish you feel, how much you want to make back, and how large the last winner was.

Two traps sit on either side of that formula. Commission and swap are real costs that a lot calculation often ignores, so a trade with a $400 stop distance can lose $430 by the time it closes. And correlated exposure is invisible in the lot number: long gold and long silver, or long gold and short dollar index, is closer to one position at double size than to two positions.

This is the piece a position size calculator solves, and it is where the free download on this page comes in.

## What exactly do you get here?

You get a working risk calculator plus the method for applying it under a rulebook. The calculator is **Position Sizer** by EarnForex — a free, open-source expert advisor for MetaTrader 4 and MetaTrader 5 that computes lot size from your risk, account size, currency, commission and stop distance, and can place the trade for you once you accept the number.

Here is the honest breakdown.

| Item | Detail |
|---|---|
| **Tool** | Position Sizer expert advisor (position-size and risk calculator) |
| **Author** | EarnForex |
| **Licence** | Apache-2.0 — free to use, modify and redistribute with attribution |
| **Platform** | MetaTrader 4 and MetaTrader 5, source included for both |
| **Ships as** | Readable MQL4 / MQL5 source, not a black-box binary |
| **Inputs** | Risk percentage, account currency, leverage, stop distance, commission, symbol |
| **Output** | Lot size, risk in currency, margin requirement, potential profit and loss |
| **Cost** | Nothing. It is an open-source project, not a product of ours |
| **Best use** | Making your per-trade loss allowance exact before a challenge, and enforcing it afterwards |

### What the Position Sizer actually does

It turns a stop distance into a number of lots, and it does the arithmetic with the symbol's tick value and your account currency rather than with a rule of thumb. That matters on gold specifically: $1 of movement is $100 per standard lot at most brokers, but contract size and tick value vary by broker, and the difference between an assumed and a real value is a breach.

The source is included, which is the part that appeals if you have been burned before. You can read how the calculation is done, compile it yourself, and change the inputs without asking anyone's permission. That is not true of a compiled `.ex4` picked up from a file host, where you cannot see what the code does.

Set the risk input to your daily allowance divided by your maximum simultaneous positions, cap the lot, and let the tool produce the number before you ever click buy. If you want a second opinion on the arithmetic, it is a five-minute cross-check against a spreadsheet.

### What it does not do

Be clear about the limits, because they are the reason these accounts still get breached with a good calculator installed:

- **It does not read your firm's rulebook.** No tool can. You have to load the daily figure, the drawdown type and the event windows yourself.
- **It does not stop a breach.** It sizes trades. It cannot force your EA to close a grid, and it cannot flatten your book before the rollover.
- **It does not filter news.** Position Sizer is not a news filter, and it will not keep you out of an NFP window.
- **It does not make an unprofitable system profitable.** Sizing fixes the size of a loss, not the existence of one. A system with negative expectancy loses more slowly at a smaller size — that is all.
- **It is provided as-is under Apache-2.0, without warranty.** Verify the lot figure against your own arithmetic on a small test trade before you rely on it.

If your problem is a strategy that does not work, a position calculator will not fix it. If your problem is that a working strategy keeps breaching a rule, the arithmetic is the first place to look — and that is the problem it exists to solve.

## How do you test a gold EA against a rulebook before paying a fee?

Replay the rulebook, not just the strategy: three gates first, then a forward test, then, only if both are clean, a challenge. Most traders test the wrong thing, which is why they discover the problem after the fee has cleared.

**Gate 1 — worst single day.** Take the EA's live or forward-tested daily results and find the largest single-day loss. If it is more than 60% of the firm's daily limit, do not proceed yet. If it exceeds the limit, the system is ineligible no matter how good the average is.

**Gate 2 — worst peak-to-valley equity dip.** Find the deepest equity drop from a high point, and compare it against the drawdown figure and its type. If the firm uses trailing drawdown, apply the trailing calculation rather than the static floor.

**Gate 3 — best-day share.** Take the total profit over the test and calculate what fraction the best day produced. If one day exceeds roughly 25%, it will collide with a 30% consistency rule sooner or later.

Then forward test on demo for 60 to 90 days, on the same instrument, with a similar spread, and with the daily shutdown rule active — because a rule that never triggered during a backtest has never been tested at all. Keep a manual log of every day that came within 70% of the daily limit. Those near misses are what a bad week looks like before it becomes a breach.

Two more things are worth doing during the forward test. Run it through at least one high-impact release, so the news filter is proven rather than assumed. And record whether your EA ever finished a session holding an open position over the rollover — if it did, you have found your future breach.

Only after those three gates and the forward test do you spend money on an evaluation. If you want a sense of the instrument's daily range before you size anything, a look at how [gold behaves on one-minute charts](/gold-1-minute-grid-forex-ea-reviews-7-powerful-truths-you-must-know-before-investing/) is a useful reality check on what a $4 stop means in practice.

## What should you change the moment you move to a funded account?

Lower the risk, add a hard daily shutdown, cap the trade count and remove compounding — because a funded account is not a challenge with more money in it. The objective changes from "reach a number" to "keep the account", and those two goals pull in different directions.

- **Cut per-trade risk to roughly a third of the daily allowance.** If the firm's daily limit is 5%, size positions so a full stop-out costs 0.4–0.5% — not 1.6%.
- **Add a server-side equity guard.** Hard shutdown at 60–70% of the daily figure, so slippage cannot finish the job.
- **Cap trades per day.** Three to five entries is enough for most gold EAs; a system that wants twenty is a system that wants to spend your allowance.
- **Delete the compounding input.** Fixed size, or size recalculated from the day's starting equity only.
- **Keep the instrument and the session the same.** Changing the pair, the timeframe and the risk at once makes every result unreadable.
- **Give up the comeback trade.** The single most common breach path on a funded account is a second, larger trade taken after the first one loses.

The argument for restraint is not modesty. It is that a 10% overall drawdown figure is not a budget to spend — it is the distance between you and an account with no equity left. A firm's own published [trading objectives and rules](https://ftmo.com/en/trading-objectives/) are written in exactly this language, and reading one before you attach an EA is cheaper than reading it after.

## Where should you start today?

Download the Position Sizer, open your firm's rulebook, and turn the daily loss limit into a lot size before you place another trade. That is the whole action. It takes under an hour and it is the step that most challenge accounts skip.

Here is the sequence. Write the firm's daily limit and maximum drawdown on one line. Write the maximum number of positions your EA can hold on the next. Divide the first by the second, take two-thirds of the result, and that is the risk per position. Then load it into the calculator, attach it to your XAUUSD chart, and confirm the lot figure matches your own arithmetic.

Then leave it on demo for 90 days with the shutdown rule active, and only pay for a challenge when the worst day is comfortably inside the limit. Compare the tool against a spreadsheet before you trust it, and check the licence — Apache-2.0, credit to EarnForex — if you plan to modify and redistribute it. If you want to see how the sizing argument fits the wider gold toolkit, the [free download library](/free-download-forex-ea-indicator/) and the [best MT4 EA set](/best-mt4-ea/) are the next stops.

No EA can promise a funded account. No calculator can promise one either. What both can do is remove one class of failure — the arithmetic one — and leave you fighting only the market. Trading gold on leverage carries a high risk of losing your capital, and a challenge account is no different. Test on demo first, risk money you can afford to lose, and treat the rulebook as the specification it was always meant to be.
