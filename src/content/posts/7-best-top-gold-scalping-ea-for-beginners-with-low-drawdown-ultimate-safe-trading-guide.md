---
wpId: 2593
title: "Gold Scalping EA for Beginners: Low Drawdown, Real Rules"
slug: "7-best-top-gold-scalping-ea-for-beginners-with-low-drawdown-ultimate-safe-trading-guide"
description: "A beginner's guide to low-drawdown gold scalping EAs: what drawdown really measures, the settings that control it, and a free Apache-2.0 account guard for MT4."
publishedAt: "2025-12-09T13:18:32.000Z"
updatedAt: "2026-09-29"
seo:
  title: "Gold Scalping EA for Beginners: Low Drawdown, Real Rules"
  description: "Low drawdown on a gold scalping EA is a position-size decision before it is a strategy decision. Here is how beginners control it, plus a free account guard."
  canonical: "https://bestmt4ea.com/7-best-top-gold-scalping-ea-for-beginners-with-low-drawdown-ultimate-safe-trading-guide/"
  ogImage: "https://bestmt4ea.com/wp-content/uploads/2026/07/post_2593_featured.webp"
sourceUrl: "https://bestmt4ea.com/7-best-top-gold-scalping-ea-for-beginners-with-low-drawdown-ultimate-safe-trading-guide/"
categories:
  - "Installation & Setup"
categoryPaths:
  - "/category/installation-setup/"
tags:
  - "XAUUSD"
  - "scalping"
  - "beginner"
  - "drawdown"
  - "risk management"
draft: false
primaryKeyword: "gold scalping EA for beginners with low drawdown"
quickAnswer: "Low drawdown on a gold scalping EA is mostly a position-size decision, not a strategy feature. A beginner controls it by risking 0.25 to 0.5 percent per trade, setting a stop of 2.00 to 3.00 dollars on XAUUSD M5, capping spread, and trading only the liquid London to New York hours. This page explains how to judge drawdown honestly, plus a free Apache-2.0 account protector that closes positions at your limit."
keyTakeaways:
  - "Drawdown is measured on equity, not balance. A smooth balance curve can hide a large unrealised loss."
  - "Position size is the beginner's real drawdown control: same strategy, 0.25 percent risk versus 2 percent, is an eightfold difference in how deep a losing streak cuts."
  - "Reject any gold scalping EA built on grid or martingale. It hides risk instead of limiting it, and gold trends hard enough to defeat it."
  - "The download on this page is the Apache-2.0 Account Protector for MT4 and MT5, which closes positions and stops autotrading when your account reaches a loss limit you set in advance."
  - "Backtest on real ticks, then forward-test on demo for four weeks and thirty trades before any live order, at half your intended risk."
faqs:
  - question: "What is a good maximum drawdown for a gold scalping EA?"
    answer: "On gold, a tested maximum equity drawdown under about 15 percent is a reasonable aspiration, and under 30 percent is the outer limit most traders should accept. But the number that matters is what your account can survive: if a 25 percent drawdown would end your trading, the position size is too large before you install anything. Always plan for live drawdown to be deeper than the backtest figure."
  - question: "Why do beginners get large drawdowns on gold scalping?"
    answer: "Three reasons. They size positions too large for the account, usually by choosing a fixed lot instead of deriving it from a stop and a risk percentage. They run the EA through thin hours and news releases when the spread is widest. And they keep trading a grid or martingale system that adds to losing positions, which turns a manageable loss into a floating basket. None of those are strategy problems; all three are settings."
  - question: "What risk per trade should a beginner use on XAUUSD?"
    answer: "Between 0.25 and 0.5 percent of equity per trade while you are learning. At 0.5 percent, a run of five losses is a 2.5 percent drawdown, which a normal month absorbs. At 2 percent, the same run is a 10 percent drawdown and you will feel pressure to abandon a system that is behaving normally. Raise risk only after a full month of demo results that match the backtest."
  - question: "Should a gold scalping EA use a fixed lot or a percentage risk?"
    answer: "Percentage risk, calculated from the stop distance, is the safer default, because it keeps the money at risk constant as the balance changes and as volatility moves the stop. A fixed lot does neither: it takes more risk when the stop is wide and less when it is tight, which is backwards. Do that arithmetic before you trade, and let the download on this page be the second line of defence: it closes the positions and stops trading once your loss limit is reached."
  - question: "How much money do I need to start gold scalping with an EA?"
    answer: "Enough that the smallest lot your broker allows stays inside your risk limit. On XAUUSD, one standard lot is 100 ounces, so a 0.01 lot already moves in dollars per point. If your account is small, a stop of 2.50 dollars at 0.5 percent risk may round up to the minimum lot and exceed the limit, which is the signal to trade a cent account, a smaller symbol, or to wait. Work that arithmetic out before you install anything, and let the account protector on this page end the day when the loss limit is reached."
  - question: "Do low-drawdown gold EAs work during news events?"
    answer: "The better ones stand aside rather than trade through releases. Gold's spread widens several-fold around US CPI, Nonfarm Payrolls and FOMC decisions while price is still moving, so a scalper targeting a small range can be filled at a price that erases the edge. A session and news filter is a low-drawdown feature in practice, and you should confirm the EA has one before you trust its demo results."
  - question: "Is scalping gold on M1 suitable for a beginner?"
    answer: "Usually not as a first automation project. M1 compresses gold's spread and latency into every decision, so the same EA that looks fine on M5 can be unprofitable a timeframe down. Beginners are better served by M5 or M15 with a wider stop and fewer trades, and by using a demo account until the process is boring. Lower frequency gives you more time to notice when something is wrong."
sources:
  - label: "EarnForex — Account Protector expert advisor repository (Apache-2.0)"
    url: "https://github.com/EarnForex/Account-Protector"
  - label: "Apache License 2.0 — full licence text"
    url: "https://www.apache.org/licenses/LICENSE-2.0"
  - label: "MQL4 Reference — iATR (Average True Range), the volatility measure used for stop distance"
    url: "https://docs.mql4.com/indicators/iatr"
  - label: "MQL5 Reference — Testing Trading Strategies, tick generation and spread in the Strategy Tester"
    url: "https://www.mql5.com/en/docs/runtime/testing"
  - label: "ESMA — product intervention measures on CFDs, including the 20:1 leverage cap for gold and negative balance protection"
    url: "https://www.esma.europa.eu/press-news/esma-news/esma-adopts-final-product-intervention-measures-cfds-and-binary-options"
  - label: "World Gold Council — gold spot prices and historical market data"
    url: "https://www.gold.org/goldhub/data/gold-prices"
installSteps:
  - name: "Read the licence and disclaimer"
    text: "Open the repository and read the LICENSE file. It is the Apache-2.0 licence, maintained by EarnForex, and the README carries a short disclaimer that trading puts your capital at risk."
  - name: "Download the source for your terminal"
    text: "From the repository, open the MQL4 or the MQL5 folder and download the Account Protector source for the platform you trade. You are getting readable MQL, not a compiled binary someone else built."
  - name: "Open your MetaTrader data folder"
    text: "In MetaTrader 4 or MetaTrader 5 choose File, then Open Data Folder. That is the directory the terminal actually reads; a file placed anywhere else simply never appears in the Navigator."
  - name: "Copy it into the Experts folder and compile"
    text: "Inside the data folder open MQL4 or MQL5, then Experts, and place the source there. Open it in MetaEditor and press Compile, or right-click it in the Navigator and choose Modify."
  - name: "Attach it to a XAUUSD chart and set the limits"
    text: "Drag the expert onto a gold chart, allow algo trading, and set the conditions you want it to act on: a daily loss, an equity floor, a profit target, or a timer. The panel shows which conditions are currently satisfied and which are not."
  - name: "Deliberately trigger it on demo first"
    text: "Run it on a demo account and let one of your own limits be hit, so you can see it close the positions, remove the pending orders and switch autotrading off. A guard you have never watched fire is not a guard."
download:
  origin: "opensource"
  license: "Apache-2.0"
  licenseUrl: "https://www.apache.org/licenses/LICENSE-2.0"
  author: "EarnForex"
  sourceUrl: "https://github.com/EarnForex/Account-Protector"
  version: "latest"
  platform: "MT4/MT5"
  externalUrl: "https://github.com/EarnForex/Account-Protector"
  updatedAt: "2026-09-29"
---

If you are new to gold and you are looking for a gold scalping EA with low drawdown, you have already been told the wrong thing. Every list you open ranks EAs by how safe they sound, using numbers the vendor supplies and you cannot check. The word "low drawdown" is doing the work of a feature, when it is actually the outcome of decisions you make: how much you risk per trade, where your stop sits, which hours your robot is allowed to trade, and whether the strategy limits losses at all.

This page will not hand you seven model numbers of robots you will never find again. It will teach you what drawdown actually measures, why beginners on gold get large drawdowns even when the EA is fine, and how to set the four inputs that decide whether a losing streak is a Tuesday or a closed account. Then it gives you a free, Apache-2.0 tool for the part beginners skip under pressure: a protector that watches the account and closes the book, then stops trading, once a loss limit you chose in advance is reached.

Sizing and stopping are the real subject. On gold, more accounts die from oversizing than from bad entries, and how much you risk is the one thing you can control completely before a single trade opens — which is why the download on this page is a brake rather than another signal.

## The problem: "low drawdown" is being sold to you as a property of the robot

Drawdown is the drop from an equity peak to the following trough, expressed as a percentage. It is a measurement, not a feature. An EA does not have low drawdown the way a car has four doors; an account has low drawdown when the combination of strategy, settings and market conditions produces shallow losses.

Vendors blur that on purpose, because a drawdown number is easy to print and hard to verify. A page can claim "under 10 percent drawdown" and show a screenshot, and most beginners have no way to check whether the sample was long enough, whether it was equity or balance, or whether it was demo or live. The claim reads like a specification. It is a marketing sentence.

There is also a definition problem that trips up almost every beginner. Drawdown on **balance** ignores open positions; drawdown on **equity** includes them. A grid robot can show a gentle balance curve for months because it never closes its losers, while its equity — the number that reflects what you could actually withdraw — swings hard and then collapses. If a drawdown figure does not say "equity", treat it as unmeasured.

And gold is where this matters most. **XAUUSD** is quoted through London over-the-counter markets, COMEX futures and each broker's own liquidity blend, with the London Bullion Market Association running a twice-daily auction as the institutional reference. Between auctions your feed is its own thing, and the spread widens precisely when volatility rises — around US CPI, Nonfarm Payrolls and Federal Reserve decisions, the events that move gold hardest. A scalper taking a small target pays that wider spread on every trade in the window. Low drawdown on gold is therefore not a badge; it is a specification you set and a market you respect.

The honest version of this page, then, is not a list of EAs you should trust. It is the four inputs that produce a low-drawdown account, in the order you should set them, plus the tool that stops the account on the day those inputs get ignored.

## Agitate: the beginner who did everything the sales page said

Consider a beginner with $1,000 who did what the page told him. He chose a "low-drawdown" gold scalper, read its under-15-percent claim, installed it on a demo account, watched a profitable week, and went live. He set the lot to 0.10 because it was the smallest value that made the returns look worthwhile, and he left the stop where the EA defaulted it.

For six weeks the account drifted upward and he began to plan around it. Then gold entered a run of strong data and a sustained directional move. His stop, sized for a calm market, sat inside the noise, so it was hit repeatedly on trades that would have worked given room. The lot of 0.10 meant each of those losses cost roughly four to five times what a correctly sized position would have. A run of eight losses — an ordinary event for a scalper, not a disaster — took the account down by a fifth in a week.

Here is the part that stings. The EA was not the problem. He had been shown a drawdown claim for a strategy, ignored it, and then built a position size that produced an entirely different drawdown from his own account. He had confused the robot's numbers with his account's numbers, which is the beginner's version of everything on this page.

The fix would have taken one minute of arithmetic. A 2.50-dollar stop on gold, 0.5 percent of $1,000, and a contract size of 100 ounces gives a lot size near 0.02 — one fifth of what he ran. The same eight-loss run would have cost him about 4 percent instead of a fifth of the account. Same robot, same signals, same week; the difference is the arithmetic nobody made him do. If that distinction is new to you, the [XAUUSD scalping robot settings](/xauusd-scalping-robot-settings-and-tips-10-powerful-strategies-for-better-trading-results/) guide walks through the same inputs in more depth.

## What does drawdown actually measure, and what number is safe on gold?

Drawdown measures the decline from a peak in your account's equity to the lowest point that follows, before a new peak. It is usually quoted as a percentage of the peak. The number to care about is the maximum drawdown over a long, honestly modelled sample, and on gold the honest sample includes at least one violent move.

Two distinctions decide whether a drawdown figure is meaningful. First, equity versus balance, as above; a figure that ignores open positions is understated. Second, modelled versus real: a backtest that assumes a fixed spread will understate the drawdown of a scalper, because real spread widens exactly when the trades go wrong. Plan for live drawdown to be deeper than the backtest by a substantial margin, often double.

| Tested maximum equity drawdown | What it means for a beginner | What to do |
|---|---|---|
| Under 10 percent | Very low, but verify the sample length and that it is equity, not balance | Still forward-test; check it survives a news week |
| 10 to 20 percent | Moderate, the realistic target for a sound gold scalper | Size so this is survivable, and expect more live |
| 20 to 30 percent | The outer limit for most retail traders | Only with low risk per trade and a strong reason to believe it |
| Above 30 percent | Too deep to recommend to a beginner | Reduce risk per trade, or choose a different system |

A useful way to use the table: do not ask "is this drawdown acceptable", ask "if this drawdown happened in my first month, would I keep following the plan". If the answer is no, the position size is wrong, regardless of the strategy. That single question protects more beginner accounts than any EA feature.

### How does position size set your drawdown?

Position size is the multiplier between a strategy's losing streak and your account's pain. The strategy decides how many trades you lose in a row; the size decides what those losses cost. That is why the same EA can produce a 5 percent drawdown on one account and a 40 percent drawdown on another, on the same signals, on the same days.

The arithmetic is worth stating plainly because it is the whole lesson. If you risk a fixed fraction of equity per trade, your drawdown from a losing streak scales directly with that fraction. Risk 0.5 percent and five losses cost about 2.5 percent. Risk 2 percent and the same five losses cost about 10 percent. Risk 5 percent — which beginners reach by choosing a lot size by feel — and five losses cost roughly a quarter of the account, at which point they either double down or quit. None of those outcomes is a strategy outcome. They are all sizing outcomes.

This is the reason to derive the lot from the stop rather than choose it: the lot size should be whatever makes the money at risk equal your chosen percentage, given the stop the market requires. Wide stop, smaller lot; tight stop, larger lot; the risk stays constant. Choosing the lot first inverts that, so your risk quietly becomes larger exactly when the market is more volatile and the stop is wider. That inversion is how a "low-drawdown" robot produces a high-drawdown account.

### Which settings do the most to lower drawdown on gold?

Four settings, in this order, do most of the work. Risk per trade, stop distance, maximum spread, and the hours the EA may trade. Get those right and almost any honest scalper has a chance to be low drawdown. Leave them wrong and no strategy saves you.

Set risk at 0.25 to 0.5 percent while learning. Set the stop wider than gold's ordinary noise — on M5, 2.00 to 3.00 dollars of price is a reasonable starting range — and let the lot follow. Set the maximum spread to a value your broker genuinely quotes during your hours, which is typically around 20 to 30 points on a raw gold feed, and accept that this blocks trades; a blocked trade costs nothing. Restrict the EA to the London to New York overlap, roughly 09:00 to 16:30 London time, where the spread is tightest relative to the range.

There is a fifth, non-negotiable rule that has nothing to do with numbers: reject any gold scalper built on grid or martingale recovery. Those systems add to losing positions, so their drawdown is hidden in floating exposure until it is not. Gold's long directional moves are exactly the condition that defeats them. A beginner cannot tune that away, and should not try. Our [best gold scalper EA](/best-gold-scalper-ea-for-mt4-mt5-the-only-guide-you-need/) review treats the absence of recovery logic as the first test a robot must pass.

## How do you evaluate a gold scalping EA before trusting its drawdown claim?

You evaluate it the way you would any download, with four checks that come before the strategy: publisher, licence, source and the actual drawdown measurement. If you cannot get past those, the strategy never matters.

**Publisher and licence.** A real robot names an author and states a licence — MIT, GPL-3.0, Apache-2.0 — with a working link. "Free" with no licence is the absence of a licence, not a gift. On a beginner account, an unlicensed binary is a program that can place dozens of orders with no accountability.

**Source.** If the file is only compiled, you cannot confirm whether a stop is set on every position or whether the strategy adds to losers. Look for a public repository or readable source. If none exists, the inability to check is the finding.

**Drawdown measurement.** Ask three questions of any drawdown claim: equity or balance, over how many trades, and live or demo. A figure that fails any of them tells you nothing you can use. A verified third-party track record on Myfxbook is the common standard because it reads the account from the broker's server, but even a verified record is only as meaningful as its deposit history and its length.

**The broker fit.** Scalping is the most broker-sensitive style there is. The same robot can be quietly positive on a raw-spread ECN account and quietly negative on a standard account with a wider gold spread, because the cost per trade is a larger share of the target. Test on the feed you will execute on, not on a demo from a different broker.

If you want the evaluation applied to a set of candidates rather than a single file, the [best gold robot picks](/best-gold-robot-for-mt4-mt5-ea-7-powerful-picks-for-consistent-trading-profits/) page uses the same four-number method, and the [free download library](/free-download-forex-ea-indicator/) labels every item by publisher, platform and licence.

## What exactly do you get, and what does it not do?

The download is the **Account Protector**, a free **Apache-2.0** expert advisor by **EarnForex** that runs on both **MetaTrader 4** and **MetaTrader 5**, with full MQL4 and MQL5 source. It does not pick entries and it does not size them. It is the tool that fixes the variable that turns a low-drawdown strategy into a high-drawdown account — the moment when a losing day stops being a losing day and becomes a losing quarter — and it is the most useful thing a beginner can install alongside any robot.

Why this, rather than another scalper? Because every low-drawdown gold EA you will ever evaluate assumes two things a beginner has not built yet: that positions are sized correctly, and that somebody will stop the session when it goes wrong. Your own discipline is the weakest component in that chain, and a robot cannot be talked out of a decision in the way a tired human can. The protector makes the limit explicit and removes the negotiation: you supply a loss, equity, profit or time condition, and the software closes the open trades, deletes the pending orders and switches autotrading off. Once that line exists on your account, every EA you consider becomes easier to judge, because your worst day has a ceiling instead of a hope.

| What | Detail |
|---|---|
| Name | Account Protector |
| Platform | MetaTrader 4 and MetaTrader 5 (MQL4 and MQL5) |
| Source | Full source for both platforms, not a compiled binary |
| Author | EarnForex |
| Licence | Apache-2.0 — use, modify, share, keep the notice and state your changes |
| What it does | Monitors equity, profit and loss, and time against conditions you set, then closes positions, removes pending orders and turns autotrading off |
| What it does not do | It does not predict direction, generate signals, choose a lot size, or produce a particular result |

**What the Apache-2.0 licence means for you.** Apache-2.0 is a permissive open-source licence that also carries an explicit patent grant. You may use the software, modify it, embed it in your own tools and share it, including commercially, as long as the copyright notice, the licence text and a note of any changes you made travel with it. It is provided as-is, without warranty. For a beginner, the practical benefit is that you can read the source and see exactly which conditions are checked and precisely what happens when one of them is true, which is a better education than any tutorial about discipline.

**What it does not do, stated plainly.** It does not work out how many lots you should trade; that arithmetic is still yours, and this page has already shown you how to do it. It cannot know whether the limit you typed is the right one — set the daily loss too tight and it will stop you on an ordinary Wednesday, set it too loose and it will never fire. It closes at market, so a fast move or a gap can fill beyond the level you chose, and a book it flattens on a Friday is a book you cannot reopen until Sunday. Verify the trigger on a demo account before you rely on it, and treat the limit as a number you choose deliberately rather than a default you accept.

**How to use it with a scalping EA.** Before you let any gold scalper trade a live account, set its lot mode to risk-percentage if it has one, and check the resulting size against a stop you chose from the chart. If the EA only supports a fixed lot, calculate the lot that matches 0.5 percent risk at your stop and set that number. Then attach the protector on the same terminal and give it a daily loss condition in your account currency, comfortably inside the figure that would make you angry rather than merely annoyed. If the minimum lot your broker allows already exceeds your risk limit at a realistic gold stop, the honest conclusion is that the account is too small for that stop and timeframe. For the wider context on gold automation, the [best MT4 EA](/best-mt4-ea/) hub applies the same standard to the robot catalogue.

## How do you install the protector and set it up?

Six steps, about ten minutes, and one verification that matters more than the rest.

1. **Read the licence and disclaimer.** Open the repository and read the LICENSE file — Apache-2.0, maintained by EarnForex. The README notes that trading puts your capital at risk.
2. **Download the source for your terminal.** Open the MQL4 or the MQL5 folder and download the Account Protector source. You get readable MQL, not a compiled binary somebody else built.
3. **Open your MetaTrader data folder.** In MT4 or MT5, go to File, then Open Data Folder. This is the folder the terminal actually reads.
4. **Copy into the `Experts` folder and compile.** Place the source in `MQL4/Experts` or `MQL5/Experts`, then open it in MetaEditor and press Compile. Errors appear in the Errors tab rather than hiding in a binary.
5. **Attach to a XAUUSD chart and set the limits.** Drag the expert onto a gold chart, allow algo trading, and set the conditions you want: a daily loss, an equity floor, a profit target, a timer.
6. **Verify the trigger on demo.** Deliberately hit your own limit on a demo account and confirm the panel closes the positions, removes the pending orders and stops autotrading. A guard you have never watched fire is not a guard.

One gold-specific note: if your broker quotes XAUUSD to two decimals, a one-point move is not the same dollar value as on a five-decimal currency pair, and a standard lot is 100 ounces. Set the protector's loss condition in account currency — "flat when the day is down 1 percent" — rather than in points, because a point means different money on a two-decimal gold feed than on EURUSD. It is the fastest way to stop confusing gold's digit count with a normal FX pip, and it keeps the limit honest.

## What does a survivable losing run look like on a beginner's account?

A drawdown percentage describes the past. What decides whether you keep trading is how the account behaves through a run of losses, and beginners are rarely given a way to picture it.

Take a system with a 55 percent win rate and a two-to-one reward-to-risk ratio. Expectancy is positive, and across a thousand trades it should make money. Within any hundred trades, seven or eight consecutive losses are ordinary rather than exceptional. On a one-thousand-dollar account risking two percent per trade, that run removes roughly fifteen percent of the balance. Risk four percent and the same run removes nearly thirty. The strategy did not change; only the size did.

### The three numbers to write down before you start

- **Longest losing run in the sample.** The vendor's statement shows it. If it is six, plan for eight, because a sample is always kinder than the future.
- **Risk per trade you are genuinely willing to lose.** Not the figure that makes the projection look attractive. The one you would still accept after the eighth loss in a row.
- **The balance at which you stop.** Decide it now, while you are calm, and keep it somewhere you will see it.

Together those three convert a drawdown percentage into a decision. If a gold scalper's published drawdown is twenty percent and your stop-out level is fifteen, the system is unsuitable at your size regardless of its return, and no amount of testing changes that arithmetic.

### Why the account size chooses the EA, not the other way round

Most beginners pick a robot and then hunt for a lot size that fits the balance. That order makes a compromise inevitable. Gold's minimum stop, its spread and its tick value set a floor on what one position costs, and when that floor is a large fraction of your balance the system is unavailable to you at any setting.

Work backwards instead. Fix the risk you will accept, work out the lot for a realistic gold stop, and check whether the result clears your broker's minimum. If it does not, the honest conclusion is that this account is too small for this style of trading, and the useful move is a larger timeframe, an instrument with a smaller minimum stop, or patience. That answer is disappointing, and it is far cheaper than the alternative.

### What the first month should look like

Set the account up so the first month produces information rather than profit. Pick one instrument, one timeframe and one preset, then change nothing for thirty trades. Record every entry and exit with the spread you actually paid, so the sample describes the market you traded rather than the one in the backtest.

Expect the curve to be lumpy. A low-drawdown system still loses days, and a beginner's instinct during the first losing run is to intervene — widen a stop, double a lot to recover, or switch to a different robot mid-sample. Any of those destroys the evidence you are paying for. The value of the first month is not the balance at the end of it; it is knowing whether your settings survive contact with your broker.

At the end of the sample, compare the demo record with a backtest covering the same dates. When the two tell the same story, raise size gradually and repeat the exercise. When they do not, find the reason before adding another dollar, because a gap between demo and backtest is nearly always a condition you can name — spread, session, symbol digit count or slippage — and almost never a mystery.

## Your next step as a beginner on gold

Do two things, in this order.

First, stop ranking gold EAs by their claimed drawdown and start ranking them by what you can verify: publisher, licence, source, and a drawdown figure that states equity, a trade count and whether it was live. If a robot cannot supply those, it does not get a demo account, let alone a live one.

Second, install the Apache-2.0 account protector from this page, put it on a XAUUSD chart, and give it two numbers: the daily loss that ends your session and the equity level that ends the experiment. Then work out the lot size for a 2.50-dollar stop at 0.5 percent risk on your actual account and compare it to whatever lot your chosen EA defaults to. If the EA's default is larger, you have found the first thing to fix — and fixing it lowers your drawdown more than switching robots ever would.

Be clear-eyed about what you are doing. Gold is volatile, leverage works against you as easily as for you, and losses happen on any system. Everything here is educational, none of it is financial advice, and no result is promised or implied. Test on demo, size every position as though the worst backtest day will happen again, and only risk money you can afford to lose. If you want a curated starting point with platforms and licences stated, the [free download library](/free-download-forex-ea-indicator/) is the place to begin.
