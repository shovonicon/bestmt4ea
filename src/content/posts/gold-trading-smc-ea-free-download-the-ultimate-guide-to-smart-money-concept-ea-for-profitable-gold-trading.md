---
wpId: 127028
title: "Gold Trading SMC EA: What Smart Money Concepts Do in Code"
slug: "gold-trading-smc-ea-free-download-the-ultimate-guide-to-smart-money-concept-ea-for-profitable-gold-trading"
description: "A free Apache-2.0 SMC expert advisor for MetaTrader 5, plus an honest look at what order blocks, fair value gaps and displacement become once code defines them."
publishedAt: "2026-02-13T20:37:39.000Z"
updatedAt: 2026-09-29
categories:
  - "Free Forex EA"
categoryPaths:
  - "/category/free-forex-ea/"
tags:
  - "smart money concepts"
  - "order blocks"
  - "fair value gaps"
  - "XAUUSD"
  - "open source"
quickAnswer: "A gold trading SMC EA turns Smart Money Concepts into fixed rules: it draws order blocks and fair value gaps, measures displacement in ATR multiples, watches for liquidity sweeps, and trades only inside London and New York hours. The EA does not make SMC smarter. It makes SMC repeatable, and it removes the discretion that gave the concept its original edge."
keyTakeaways:
  - "Smart Money Concepts are discretionary by design. An Expert Advisor forces every blurry idea into a number, and those numbers are where the strategy actually lives."
  - "The file offered on this page is the Sharing is Caring trade copier by wait4signal, released under GPL-3.0 as readable MQL5 source rather than a compiled binary."
  - "Displacement, fair value gap size and session windows are all derived from Average True Range and fixed UTC constants, so changing one input changes the strategy rather than just its sensitivity."
  - "Liquidity on XAUUSD is broker-specific: the wicks the EA reads are printed by your feed, not by a central exchange, so the same rule produces different signals at different brokers."
  - "The equity bagging rule closes everything at minus four percent, which caps a loss but re-arms the floor against a smaller balance. That is management, not an edge."
  - "Start on a demo account. Loss of capital is possible in live trading, and a gold drawdown looks different on a live spread than it does in the Strategy Tester."
faqs:
  - question: "Does a Gold Trading SMC EA actually trade Smart Money Concepts?"
    answer: "It trades a mechanical approximation of them. Order blocks, fair value gaps and breaks of structure are converted into candle patterns with numeric thresholds. The EA is faithful to the pattern and not to the judgement behind it, which is why two traders running the same file get different opinions about whether it works."
  - question: "Can I use this SMC EA on MetaTrader 4?"
    answer: "No. The source file is MQL5 and uses MetaTrader 5 features such as the CTrade library, indicator handles and CopyBuffer. MQL4 uses a different API, so it will not compile on MetaTrader 4 without a full rewrite."
  - question: "What is the displacement threshold and why does it matter?"
    answer: "Displacement is how the EA decides a candle is a real institutional push rather than noise. It is expressed as a multiple of Average True Range, with a floor of about 1.2 and a volatility-based reduction above it. Change that multiplier and you have changed which candles qualify as order blocks and breaks of structure."
  - question: "Why is a liquidity sweep different from broker to broker?"
    answer: "XAUUSD is an over-the-counter CFD, so there is no single consolidated tape. The highs and lows your EA reads come from your broker's price feed. During fast news moves two regulated brokers can print different wicks, so one says liquidity was swept and the other says it was not."
  - question: "Is the equity bagging system a stop loss?"
    answer: "It is a portfolio rule, not a structural one. It closes every open position on the symbol when equity drops four percent from the current balance, then re-arms that floor against the new, smaller balance. It bounds a loss instead of preventing one, and repeated hits compound downward."
  - question: "Do I need a VPS to run this SMC EA?"
    answer: "You need a machine that stays on with a stable connection, because the EA checks for new bars on every tick. A VPS also matters for the session filter: the code reads GMT from the local system clock, so a machine set to the wrong timezone will gate the wrong hours."
  - question: "How long should I test it on demo before going live?"
    answer: "At least one full month on the same broker, symbol and spread you intend to trade, after backtesting in the Strategy Tester. Gold spreads widen sharply around data releases, and a demo run is the only cheap way to see how often your settings collide with that."
sources:
  - label: "MT5-SMC-trading-bot — the Apache-2.0 Smart Money Concepts expert advisor dissected in this guide (Vignesh Kumaravel)"
    url: "https://github.com/KVignesh122/MT5-SMC-trading-bot"
  - label: "Sharing is Caring — GPL-3.0 MetaTrader 5 trade copier (wait4signal)"
    url: "https://github.com/wait4signal/sharing-is-caring"
  - label: "Apache License, Version 2.0"
    url: "https://www.apache.org/licenses/LICENSE-2.0"
  - label: "GNU General Public License v3.0"
    url: "https://www.gnu.org/licenses/gpl-3.0.html"
  - label: "MQL5 reference — iATR (Average True Range) indicator handle"
    url: "https://www.mql5.com/en/docs/indicators/iatr"
  - label: "MQL5 reference — SymbolInfoInteger and SYMBOL_SPREAD"
    url: "https://www.mql5.com/en/docs/marketinformation/symbolinfointeger"
primaryKeyword: "gold trading SMC EA"
installSteps:
  - name: "Read the settings file first"
    text: "Open Sharing-Is-Caring-settings.md and read the input list before you compile anything. It explains the copy modes and every parameter the expert exposes."
  - name: "Download the source files"
    text: "Clone or download Sharing-Is-Caring.mq5 and TradeUtil.mqh from the GPL-3.0 repository. You are getting real source, not a compiled binary."
  - name: "Open the MetaTrader 5 data folder"
    text: "In MetaTrader 5, open the File menu and choose Open Data Folder. That is the folder the terminal actually reads."
  - name: "Copy into MQL5/Experts"
    text: "Place Sharing-Is-Caring.mq5 and TradeUtil.mqh in the MQL5/Experts folder, then open the expert in MetaEditor and press Compile."
  - name: "Attach it and pick a copy mode"
    text: "Attach the expert to one chart on each terminal. Set COPY_MODE to PROVIDER on the account you trade and to RECEIVER, with the provider account number, on the ones that should follow, then enable Algo Trading."
download:
  origin: "opensource"
  license: "GPL-3.0"
  licenseUrl: "https://www.gnu.org/licenses/gpl-3.0.html"
  author: "wait4signal"
  sourceUrl: "https://github.com/wait4signal/sharing-is-caring"
  version: "latest"
  platform: "MT5"
  externalUrl: "https://github.com/wait4signal/sharing-is-caring"
seo:
  title: "Gold Trading SMC EA FREE Download – The Ultimate Guide to Smart Money Concept EA for Profitable Gold Trading 2026"
  description: "A free Apache-2.0 SMC expert advisor for MetaTrader 5, plus an honest look at what order blocks, fair value gaps and displacement become once code defines them."
  canonical: "https://bestmt4ea.com/gold-trading-smc-ea-free-download-the-ultimate-guide-to-smart-money-concept-ea-for-profitable-gold-trading/"
  ogImage: "https://bestmt4ea.com/wp-content/uploads/2026/07/post_127028_featured.webp"
sourceUrl: "https://bestmt4ea.com/gold-trading-smc-ea-free-download-the-ultimate-guide-to-smart-money-concept-ea-for-profitable-gold-trading/"
draft: false
---

Smart Money Concepts work beautifully on a chart and badly in a spreadsheet.

On XAUUSD, SMC is a story. You see price dip under yesterday's low, you see the sweep, you see the fat green candle that follows, you draw a box around the last down candle before the move, and you wait. You do not measure anything. You recognise it. That is discretion, and discretion is where the edge lives.

Then you hand the same idea to a robot.

A robot cannot recognise. It can only compare. It needs a rule for what counts as a sweep. It needs a number for what counts as a strong candle. It needs to decide which candle gets the box, when that box has been used up, and how old is too old. None of those decisions were visible while you were trading by eye. Inside an Expert Advisor they become input fields with default values, and nobody explains what the defaults cost you.

That is the real problem with a gold trading SMC EA. Not that Smart Money Concepts are wrong. Not that automation is wrong. It is that the concept is discretionary, the machine is literal, and the translation between them is silent.

Here is what that silence costs.

## The quiet haircut you take the moment you automate

Picture a trader — call him Daniel, trading a 2,000 dollar account on a MetaTrader 5 broker with XAUUSD spreads near 25 points in London.

He finds a free SMC expert advisor on a forum thread. The chart screenshots look right, the logic reads sensibly, and when he runs it himself in the Strategy Tester on XAUUSD H1, six months show a profit factor above 1.5. So he goes live without changing a single input.

Week one is lovely. The EA buys a bullish order block during the London session, rides about 40 dollars of gold, closes into New York. Plus 180 dollars. Daniel stops watching.

Week two brings a rate decision. Gold moves 60 dollars in a day. The EA keeps closing out: every time equity falls four percent below the balance it started from, it shuts everything and re-arms the floor against a slightly smaller number. On that account size at default sizing, four percent is a 20 dollar move in gold. It fires. It fires again. He finishes the week near 1,900 and cannot explain a single one of the closes.

Week three he decides the EA is "too strict". He turns off the ATR filters, because the ATR filters sound like the problem. What he has actually done is delete the displacement test, the fair value gap minimum, and every volatility adaptation in one click. The EA now treats essentially every imbalance on a gold chart as a valid signal. Eleven trades. Eight losses. He is at 1,240.

He never changed his strategy. He never even read it. He changed three numbers whose meaning he did not know, on a concept he was applying mechanically for the first time.

That is the haircut. You do not lose the edge because gold is hard. You lose it because the part of SMC you trusted was never in the code to begin with, and nobody told you which part went missing.

So let's go find it. This is not a setup walkthrough and it is not a strategy catalogue. It is a tour of where Smart Money Concepts break when a robot has to define them, using one real, free, open-source EA as the specimen: [MT5-SMC-trading-bot](https://github.com/KVignesh122/MT5-SMC-trading-bot) by Vignesh Kumaravel of SkyBlue Fintech in Singapore, released under Apache-2.0 as readable MQL5 source.

## What is a gold trading SMC EA, in plain terms?

It is an Expert Advisor for MetaTrader 4 or MetaTrader 5 that trades XAUUSD using rules borrowed from Smart Money Concepts — order blocks, fair value gaps, liquidity sweeps and breaks of structure. Its job is not to be smarter than you. Its job is to apply the same definition, at the same speed, every single time, without fatigue.

That distinction matters more than any feature list. A robot's advantage is consistency, not insight. It will not hesitate before an entry, it will not revenge-trade after a loss, and it will not widen a stop because it feels like the market owes it a recovery. It also will not notice that today is different.

Smart Money Concepts exist to explain why price does what it does near certain levels. Institutions work large orders, they cannot fill them all at one price, and the leftovers show up as repeatable footprints. Order blocks mark where heavy buying or selling was left unfinished. Fair value gaps mark where price moved so fast it skipped a range, leaving an imbalance that often gets revisited. Liquidity sweeps mark where price reached for the resting orders above or below an obvious level. A break of structure marks the moment the market stops making lower highs.

A human reads all four as one story. A robot reads them as four independent pattern tests that can disagree with each other. That is not a flaw you can engineer away. It is the starting condition.

If you want to see how other tools approach the same problem, our library of [free MT4 and MT5 downloads](/free-download-forex-ea-indicator/) is the fastest way to compare designs side by side.

## What do order blocks, fair value gaps, liquidity sweeps and break of structure mean to a robot?

Each one becomes a pattern match on candle data followed by a trigger price. The human version is a judgement about intent. The code version is a true-or-false test, and the test has a number in it.

### What is an order block when code draws it?

The discretionary version is the last opposing candle before a big directional move. The code version is a loop. The EA scans backward through candle history, looking for a candle that closed lower while the candle after it closed higher, and it will only accept that pair if the second candle passes a displacement test. The first match wins, then it stops looking.

Three consequences fall out of that sentence.

Only one order block exists at a time. A human will stack three overlapping blocks and treat the cluster as a stronger zone. The EA keeps the most recent one and discards the rest.

The scan has a horizon. In this EA it walks back up to 120 bars. Anything older is not a weaker signal; it is not a signal. The block simply does not exist to the machine.

The entry is not the block. The EA locates the zone, then computes a Fibonacci retracement between the most recent swing high and swing low and waits for price to reach the 61.8 percent level. So the box you see on the chart is a filter, and the line you never notice is the trigger.

If drawing the zone yourself is what you enjoy, a dedicated [order blocks indicator for MT4 and MT5](/order-blocks-indicator-for-mt4-mt5-free-download-7-powerful-benefits-smart-traders-cant-ignore/) is a fairer comparison, because it shows you the same edges without also placing trades.

### What is a fair value gap when a robot measures it?

A fair value gap is a hole: candle A's high and candle C's low never touch, because candle B moved too far too fast. Code checks that in three steps, then compares the hole's size against a minimum.

The minimum is the interesting part. It is not a fixed number of dollars. It is derived from Average True Range, so on gold it grows when gold grows, and it shrinks when the market goes quiet. Below the threshold, the gap is not a weaker gap. It does not exist.

Then there is memory. This EA stores fair value gaps by drawing rectangles on your chart and naming them. When it checks whether price is touching a gap, it does not query a data model — it reads the objects sitting on the canvas. That has an uncomfortable implication: the EA's memory of the market *is* your chart. Change the timeframe, load a new template, clear the objects, or let too much history unload, and the gap is gone. A stale rectangle from three weeks ago is still a live signal zone, because nothing expires it.

A discretionary trader throws away old gaps without thinking. The machine keeps them until something deletes them.

For a deeper read on imbalance logic, our [fair value gap and balanced price range guide](/fair-value-gaps-fvg-indicator-free-download-powerful-trading-edge-with-7-proven-benefits/) covers how different indicators define the same word differently.

### What is a liquidity sweep when the feed decides the wick?

A sweep means price reached for resting orders above an old high or below an old low, then reversed. To automate it, you first need an objective pool of liquidity. The machine cannot be told "that obvious high". It has to be given a rule: the prior session high, the prior day high, two highs within a few points of each other.

Now comes the breakdown. Those highs come from your broker's feed. XAUUSD is a contract for difference traded over the counter, so there is no single consolidated tape. During a fast move, two regulated brokers can print different wicks on the same minute. One sweep is real, the other never happened. Your EA is not analysing gold. It is analysing *your broker's version* of gold.

This is why the same file can look brilliant on one account and broken on another with identical settings. Our [buy-side and sell-side liquidity indicator](/buyside-sellside-liquidity-indicator-free-download-powerful-guide-to-smart-trading-success/) is worth reading for the same reason: once you see the levels drawn, you start noticing how much the drawing depends on the feed.

### What is a break of structure when a swing needs five bars?

Structure needs swings, and swings need confirmation. The EA here confirms a swing high only when five bars on each side are strictly lower. That means the swing cannot be known until five bars after it formed. Structure arrives late. It has to.

Break of structure then fires when price trades beyond that confirmed swing level while also passing the displacement test. Change of character is the same test in the opposite direction. And in this file, structure trades are gated behind a regime filter: the EA will only take a break of structure when the ADX reading is at least 18, or when a 30-period efficiency ratio exceeds 0.30. Breakouts in rangy, drifting markets are skipped on purpose.

A human marks structure in real time and revises. The machine marks it once, late, and revises never. We cover the same distinction, with the two labels side by side, in our guide to [break of structure and change of character](/bos-and-choch-market-structure-indicator-free-download-ultimate-proven-guide-for-smart-traders/).

## Why does displacement decide whether the strategy works at all?

Because displacement is the word the EA uses for "this candle meant something", and in code that word is a multiple of Average True Range. Everything downstream inherits it: which candles form order blocks, which breaks count as real, which gaps are large enough to trade.

The test in this file is not one condition. It is a score, and two of three must pass:

- Range of the candle is at least the threshold multiplied by ATR.
- The candle's body is at least 60 percent of its total range.
- The previous candle's body is at least 0.4 times ATR, a mild continuation check.

The threshold is adaptive. When the ATR filters are on, it is calculated from the ratio of ATR to price — roughly 1.8 minus a hundred times that ratio, floored at 1.2. On gold the practical effect is that the required displacement sits somewhere near 1.4 to 1.5 times ATR. When volatility explodes, the requirement relaxes toward the floor. When the market dulls, it tightens.

Read that again, because it usually surprises people. The EA becomes *more* willing to call something displacement exactly when spreads are widest and slippage is worst. That is deliberate — big candles are big regardless — but it means your worst-execution moments are also your most permissive entry moments.

Three practical consequences:

**Setting a fixed threshold freezes the strategy.** If you type a number into the displacement minimum, you disable the adaptation and one number now has to fit quiet Tokyo, the London open, and a US inflation print. It will not.

**Turning off the ATR filters does not make the EA looser. It makes displacement free.** In this code, disabling ATR filters makes the displacement test return true immediately, and drops the gap minimum to a flat few points. Every imbalance becomes a signal. If you have ever wondered why an EA's trade count explodes after you "simplify" it, this is why.

**History depth changes your signals.** ATR is computed over the bars your terminal has loaded. Two traders, same broker, same symbol, same settings, different chart history — different entries. That is not a bug in the EA. That is what the word "mechanical" actually means.

## Why does the fair value gap threshold matter more on gold than on EURUSD?

Because gold is quoted in dollars while a gap is measured in points. A three-point gap on EURUSD is a real technical event. A three-point gap on XAUUSD is three cents of skipped price, and it means nothing.

That mismatch is why the threshold has to come from volatility rather than from a fixed constant. When the ATR filters are active, the minimum gap is derived from ATR and shrinks in quiet conditions and expands in fast ones. When they are switched off, the code falls back to a flat minimum of a few points — and on gold that flat minimum is effectively no minimum at all.

There is a second, quieter failure: the EA cannot tell *why* price returned to a gap. Rebalancing through an imbalance and rejecting an imbalance look identical to a touch test. The machine sees a price inside a rectangle and acts. A human sees a price slicing through a gap on rising volume and stands aside.

That is the honest limitation. Not "the code is wrong". The code is right about the geometry and blind to the reason. You fix that with filters and thresholds, never with the same simplicity you had on the chart.

## Why is liquidity a broker-specific word on XAUUSD?

Because every level a liquidity sweep depends on is printed by your broker, and gold has no central order book. The wick that swept yesterday's low at one broker may never have existed at another.

Take spreads. This EA refuses to trade when the current spread exceeds 120 points. On gold that is a generous net, and generous is the point: the author would rather skip a good setup than open into a 200-point spread. But compare that with a broker at 25 points in London and 90 points during a US data release, and you can see how the same trade filter behaves completely differently on two accounts that both look "normal".

Take session boundaries. The file hard-codes three windows in GMT:

| Window in the code | Hours (GMT) | What the constant misses |
|---|---|---|
| Asian session, blocked | 01:00 – 07:00 | Early London positioning and the Tokyo fix begin before the filter lifts |
| London | 07:00 – 16:00 | Gold liquidity concentrates at the London open and around the US cash open, not evenly across nine hours |
| New York | 12:00 – 21:00 | The COMEX open and the main US data releases land at specific minutes, not windows |

Those hours come from a constant block. There is no timezone handling beyond the terminal's own clock. The code reads GMT from the machine it runs on, which means a VPS configured to the wrong timezone shifts your entire session filter by hours — and you will never see it in a backtest, because the Strategy Tester runs on your machine's clock too.

Then there is the deeper point. A human calling a sweep is making a claim about who got hurt. A machine calling a sweep is making a claim about a number on a chart. Both can be right. Only one of them can explain why.

If you trade session-based approaches, our [ICT kill zones indicator for MT4 and MT5](/ict-kill-zones-indicator-mt4-mt5-free-download-powerful-proven-2025-trading-edge/) is a useful cross-check because it draws the windows explicitly, so you can see whether the constant in your EA lines up with the one on your chart.

## What does session filtering really change?

It changes which losses you survive, which is a much bigger claim than "it reduces trades". On gold, the Asian session produces the weakest follow-through and the messiest ranges, and a concept that depends on displacement and continuation starves there.

The filter in this EA blocks 01:00 to 07:00 GMT and allows London and New York. Expect it to cut the sample roughly in half compared with running around the clock.

One detail is worth understanding before you judge the EA by its chart. The session check lives inside the trade execution path, not inside signal detection. The EA still detects order blocks, still draws fair value gaps, still marks breaks of structure during the blocked hours. It simply refuses to convert any of them into an order.

That is correct behaviour, and it is also a trap for anyone who judges the tool by watching it. At three in the morning your chart will be full of pretty signals that will never be taken. The signals are not trades. Count them separately.

## Which SMC rules survive being written down?

Here is the comparison that matters most on this whole page. The left column is what you believe you are trading. The middle column is what the file actually does. The right column is the part nobody tells you changed.

| What you think the rule is | What the code does | What silently changed |
|---|---|---|
| There is an order block here | Last opposite-close candle before a candle that passes the displacement score, first match inside 120 bars | Only one block is live; stacked zones collapse into a single box; older blocks do not exist |
| Price displaced | Two of three: range versus adaptive ATR threshold, body at least 60 percent of range, prior candle body at least 0.4 ATR | A number tuned to volatility replaces a visual judgement, and it loosens as volatility rises |
| That is a fair value gap | Three-candle imbalance whose size clears a minimum derived from ATR | Sub-threshold gaps are invisible, and gap memory lives as chart objects that anything can erase |
| Liquidity got swept | Swing highs and lows from your broker's feed, confirmed five bars either side | Your feed's wicks become the level, and a different broker produces a different sweep |
| Structure broke | Trade beyond a five-bar-confirmed swing, plus displacement, plus ADX at 18 or efficiency ratio 0.30 | Structure is only known five bars late, and range-bound breaks are skipped by design |
| I would only take this in London | Session gate blocks 01:00 to 07:00 GMT and allows London and New York, evaluated against the machine clock | Kill zones are approximate, and the wrong VPS timezone moves your whole trading day |
| I would stop out and stand aside | Close everything at four percent below the current balance, then re-arm the floor against the smaller balance | Mitigation is a portfolio rule, not a structural one. There is no "this level is dead now" |

Read the right-hand column as a list of things you must now manage yourself. That is the real job of running an automated SMC system on gold.

## What exactly is in the SMC EA this guide dissects?

It is one file of readable MQL5 source, released under Apache-2.0, that you can audit line by line before it ever touches an account. That last point is the whole reason it is worth your time.

The repository is [MT5-SMC-trading-bot](https://github.com/KVignesh122/MT5-SMC-trading-bot) by Vignesh Kumaravel of SkyBlue Fintech, Singapore. The useful detail is not the feature list. It is that you get `EA_Script.mq5` — real source, not a compiled `.ex5` binary whose contents you have to take on faith. Most free gold EAs on forums are binaries. This one is not, and for a concept as interpretation-heavy as Smart Money Concepts, that is a meaningful difference.

| Item | Detail |
|---|---|
| File | `EA_Script.mq5` — a single expert advisor with full source |
| Platform | MetaTrader 5 |
| Licence | Apache-2.0 — use, modify and redistribute, keeping the notices intact |
| Author | Vignesh Kumaravel (SkyBlue Fintech, Singapore) |
| Strategy modes | Order blocks, fair value gaps, break of structure, or Auto to combine them |
| Volatility filters | ATR-driven displacement scoring and gap sizing, both adapt to the market |
| Session filter | Blocks the Asian session, trades London and New York hours |
| Regime filter | ADX at 18 or higher, or a 30-period efficiency ratio at 0.30 or higher |
| Risk layer | Lots per 1,000 dollars of balance, ATR-based stop loss and take profit, equity bagging thresholds |
| Execution guards | One trade per bar, one position per symbol at a time, spread ceiling of 120 points |

Now the parts that deserve their own paragraph.

**Sizing is per balance, not per risk.** Lots are calculated as a fixed fraction of account balance per 1,000 dollars. That is simple and it is not the same as sizing by stop distance, so a 1.5 ATR stop on a quiet day risks less money than the same setting on a wild day.

**The stops are ATR-based.** Stop loss sits at 1.5 ATR from entry and take profit at 2.5 ATR, which gives a nominal reward-to-risk above one. Nominal is the operative word: hit rate decides whether it pays.

**The bagging system is the most interesting and the most dangerous part.** When equity rises eight percent or falls four percent from the current balance, every position on the symbol closes and the thresholds re-arm against the new balance. It bounds a loss. It does not prevent one, and after a bad run the floor is measured from a smaller number, so the next four percent is a smaller dollar amount. Manageable, not comforting.

**The regime filter is doing more work than it looks.** Requiring ADX at 18 before taking structure trades removes a large class of breakouts that fail in drifting markets. It also removes plenty that would have worked. That is the trade.

**One honest warning about the repository readme.** It advertises very large annual returns on XAUUSD. Those are the author's own figures, presented without an independent, forward-tested track record, and we have not reproduced them. Treat them as marketing. The reason to download this EA is the readable source, not the promised number.

## What does this EA not do?

It does not simulate discretion, it does not know what news is, and it has no memory beyond the objects on your chart.

- **It has no news filter.** The only protection around a data release is the spread ceiling and the ATR adaptation. Gold can move 40 dollars on a print without the spread ever exceeding 120 points on some brokers.
- **It does not expire anything.** Fair value gaps stay live as rectangles until something removes them. Time does not retire a level.
- **It does not hedge yet.** There is a hedge magic number in the inputs, and the readme marks it as reserved for future work. Do not assume a feature exists because a variable does.
- **It does not compare signals.** One validation per bar, first match wins. During a busy London open the first valid setup gets the trade and the better one five minutes later is discarded.
- **It does not run on MetaTrader 4.** MQL5 handles, the CTrade library and CopyBuffer are not MQL4. Porting means rewriting.
- **It does not protect you from a losing month.** Loss of capital is possible. The bagging rule limits the size of a bad sequence, not the fact of one.

## How should you test an SMC EA before you fund it?

Demo first, and on the broker you actually intend to use. The whole point of a demo run is to see how the mechanical rules collide with real spreads, real execution and real session timing.

Work through it in this order:

1. **Read the source before you compile it.** If a rule in this post does not match a line in the file, trust the file.
2. **Compile it yourself in MetaEditor.** If it does not compile cleanly, stop there. You learned something for free.
3. **Backtest on XAUUSD with Every Tick, then ignore the headline number.** Open the worst month, count the losing streak, and look at the equity curve's shape rather than its final value.
4. **Change one input at a time, and write down why.** If you cannot explain why the displacement minimum moved from auto to a fixed number, put it back to auto.
5. **Run it on demo for at least a month, on the same broker, symbol and sizing.** Compare trade timestamps against the backtest. If your demo takes trades at hours the backtest skipped, your session filter and your clock disagree.
6. **Go live with the smallest size your broker allows, and expect drawdown.** Gold at 4 ounces moves 4 dollars for every dollar of gold, and the bagging floor will fire.

If your main concern is surviving the drawdown rather than optimising entries, the ideas in our guide to a [drawdown reduction EA](/drawdown-reduction-ea-free-download-7-powerful-benefits-every-trader-must-know/) map directly onto this problem, because portfolio-level rules are the ones that keep an account alive long enough to be judged.

## Where this leaves you

Smart Money Concepts are discretionary. That is not a weakness, and it is not a marketing line. It is the reason the concept works for a person who can look at gold and read intent.

The moment you automate it, you are choosing a different thing. You are choosing mechanical order block detection, an ATR-derived displacement threshold, a measured fair value gap minimum, a broker-specific definition of liquidity, and a fixed session window that is really three numbers in GMT. That version is repeatable, auditable and tireless. It is also not the version in your head, and the sooner you accept that, the better you will run it.

If you want an open-source tool of your own to run, the file on this page is a different kind of expert: **Sharing is Caring** by wait4signal, a MetaTrader 5 trade copier released under GPL-3.0. It carries no strategy of its own — it copies whatever trades you or another expert open on one terminal onto as many others as you choose, local or remote, at the same lots or sized to each account's balance. For a concept as mechanical as the one dissected above, that is the natural companion: whatever rule set you finally trust, you can run the identical trades on a demo, a small live account and a funded one at once, instead of mirroring them by hand and getting three different answers.

If you would rather compare options before committing to one file, start with our [free MT4 and MT5 EA library](/free-download-forex-ea-indicator/) and our honest [best MT4 EA picks](/best-mt4-ea/) — then come back with a specific question about a specific rule instead of a specific promise.
