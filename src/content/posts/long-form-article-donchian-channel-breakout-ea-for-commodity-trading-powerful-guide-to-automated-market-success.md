---
title: "Donchian Channel Breakout EA: A Testing Guide"
slug: "long-form-article-donchian-channel-breakout-ea-for-commodity-trading-powerful-guide-to-automated-market-success"
description: "How a Donchian breakout works, how an EA turns it into rules, why commodity CFDs such as gold need their own tests, and how to verify the EA before demo."
publishedAt: 2026-11-02T00:00:00.000Z
updatedAt: 2026-11-02T00:00:00.000Z
categories:
  - "MT4 & MT5 Expert Advisors"
categoryPaths:
  - "/category/mt4-mt5-expert-advisors/"
tags: []
primaryKeyword: "donchian channel breakout ea for commodity trading"
quickAnswer: "A Donchian channel plots the highest high and lowest low over a set number of bars, and a breakout strategy trades when price closes beyond that range. An EA automates the rule, but automation adds execution risk. Commodity CFDs such as gold can gap and move with thin liquidity, so test the EA on the exact instrument, record its spread and slippage, and verify the code before any demo or live use."
keyTakeaways:
  - "A Donchian channel is the highest high and lowest low over a fixed lookback, which makes the breakout rule simple to write."
  - "A breakout EA is a set of rules, so its results depend on the lookback, the stop and the exit, all of which must be recorded."
  - "Commodity CFDs often have wider spreads, larger overnight costs and bigger gaps than major currency pairs."
  - "Verify the EA's code and its trade log against a manual check before trusting its results."
  - "Test the EA on the same instrument and broker you plan to trade, with the same spread and lot size."
faqs:
  - question: "What is a Donchian channel?"
    answer: "A Donchian channel is a band drawn from the highest high and lowest low over a chosen number of bars. Richard Donchian developed the idea as a trend tool, and traders use the upper and lower lines as breakout levels."
  - question: "Why use a Donchian breakout in an EA?"
    answer: "The rule is short and objective. It enters on a close beyond a band, which can be coded and tested without interpretation. That simplicity is useful for testing, but it does not guarantee that the breakout will persist."
  - question: "Is commodity trading different from forex for an EA?"
    answer: "Often yes. Commodity CFDs such as gold can have wider spreads, larger point values, different trading hours and sharper gaps around news. An EA tested on EURUSD may behave very differently on XAUUSD, so each instrument needs its own test."
  - question: "What lookback should a Donchian EA use?"
    answer: "There is no proven lookback. Common values include 20 and 55 bars, but the choice must be fixed before the test. Changing the lookback to fit a sample is an optimisation that needs the out-of-sample method described elsewhere in this guide."
  - question: "How do I check that an EA is doing what its code says?"
    answer: "Compare its trade log with a manual check of the same bars for a sample of trades. Confirm the entry bar, the channel values, the stop and the exit. Any difference between the code and the chart should be found and explained before the results are trusted."
  - question: "Can a Donchian EA be trusted on a live account?"
    answer: "Not on the strength of a backtest alone. A live account needs a demo period on the same instrument, verification of the code, a stress test of the worst run, and a small lot size until a long record exists."
sources:
  - label: "MetaTrader 4 trading platform help"
    url: "https://www.metatrader4.com/en/trading-platform/help"
  - label: "CFTC: consumer education on commodity and derivatives trading"
    url: "https://www.cftc.gov/"
  - label: "Investor.gov: the US SEC investor education site"
    url: "https://www.investor.gov/"
download:
  name: "EA verification checklist (PDF)"
  origin: "own"
  license: "Free for personal and educational use"
  licenseUrl: "https://bestmt4ea.com/disclaimer/"
  version: "1.0"
  fileKey: "resources/ea-verification-checklist.pdf"
  updatedAt: 2026-11-02T00:00:00.000Z
---

## Why does the Donchian channel appeal to automated trading?

The Donchian channel is one of the oldest and simplest trend tools in common use. It draws two lines on the chart: the highest high and the lowest low over a fixed number of bars. When price closes above the upper line, the market has reached a level not seen in that window, and traders call it a breakout. When price closes below the lower line, the opposite holds. The idea needs no oscillator, no moving average crossover and no interpretation of shapes.

That objectivity is why the channel is so often turned into an expert advisor. Every element of a breakout rule can be written as code: the lookback, the entry on a close, the stop and the exit. An EA applies the rule to every bar without hesitation, which removes some of the emotional errors that trouble manual traders. The same objectivity, however, means that every weakness in the rule is also automated, and the EA will repeat it faithfully.

This guide explains how the channel works, how an EA turns it into a rule, why commodity CFDs need their own tests, and how to verify the EA before it is used in demo or live. It does not promise that a Donchian breakout will profit on any instrument, and it does not present one lookback as the correct choice.

## How is a Donchian channel calculated?

For a chosen lookback of N bars, the upper line is the highest high of the last N bars, including the current bar or excluding it, depending on the definition used. The lower line is the lowest low over the same window. The middle line is often the average of the two. Because the channel uses extremes rather than averages, it widens after a sharp move and narrows when price stays inside a tight range.

The definition matters more than many users realise. Some implementations exclude the current bar, so that the breakout is measured against the prior range. Others include it, which means a bar that makes a new high is defining its own breakout level. These two versions produce different entries, and a test of one does not describe the other. Write the definition down, and check the EA's code to confirm which version it uses.

## What are the common lookbacks?

Lookbacks of 20 and 55 bars are commonly mentioned in discussions of the channel. A shorter lookback reacts faster and produces more signals, many of them weak. A longer lookback reacts slowly and produces fewer signals, each one arriving after a larger move. Neither is established as the best choice, and the result depends heavily on the instrument and the timeframe.

Choose the lookback before the test begins, for a stated reason, and keep it for the whole sample. A lookback chosen by testing many values and keeping the one with the best result is an optimisation, and it must be tested on fresh data before it is trusted. The method for that test is described in the [EA optimisation guide](/9-powerful-mt4-ea-optimization-settings-for-eurusd-m5-to-boost-performance-fast/).

## How does an EA turn the channel into rules?

A typical breakout EA has four rules. The entry rule opens a buy when the bar closes above the upper channel line, or a sell when it closes below the lower line. The stop rule places the stop at a fixed distance, at the opposite channel line or at a multiple of the average range. The exit rule closes the trade at a target, at the opposite channel line, or after a time limit. The sizing rule sets the lot from the risk per trade and the stop distance.

Each rule has choices, and each choice changes the result. A stop at the opposite channel line produces a stop distance that varies with the channel width, which can make the risk per trade unequal. A stop of a fixed distance keeps the risk steady but can sit inside normal noise. A trailing exit captures long moves but gives back profit on reversals. The EA's settings should make these choices explicit, and the test should record which one was used.

Watch for a hidden rule: the handling of a signal that appears while a trade is already open. Some EAs ignore new signals until the position closes, others add to the position, and others reverse it. Adding to a losing position in a breakout system can magnify losses, so check how the EA behaves in that case.

## Why do commodity CFDs need their own test?

Commodity CFDs such as gold differ from major currency pairs in several ways. Spreads are often wider in points, the point value per lot can be larger, and trading hours may differ from those of the forex market. Gold in particular can gap sharply around economic releases, and a breakout EA can be stopped out by a gap that bypasses the stop entirely.

Overnight costs can also be larger. A swap charge on a commodity CFD may differ from a forex swap, and a position held over several days can accumulate a meaningful cost. A breakout strategy often holds trades for a long time, so the swap belongs in every result.

Finally, the liquidity profile differs. Some commodity sessions are thinner than the forex sessions, and an EA that trades a breakout at a quiet hour may fill at a price far from the signal. Test the EA on the exact symbol, at the broker and the account type you plan to use, and record the spread at entry for every trade.

## How do you verify the EA's code and its trade log?

Verification comes before trust. Begin by reading the code, or by asking a qualified reviewer to read it, and check the channel calculation, the entry comparison, the stop and exit logic and the handling of open positions. A short review often finds an off-by-one error in the lookback, a stop placed on the wrong side, or a condition that never triggers.

Then compare the EA's trade log with a manual check of the same bars. Choose a sample of at least twenty trades. For each one, open the chart at the entry bar and check the channel values, the close that triggered the entry, the stop level and the exit. Record any difference. A difference that the code explains is acceptable, but it must be documented. A difference the code does not explain must be investigated before the results are used.

Repeat the check after any change to the EA, since a small edit can change the entry bar. Keep the verification record with the EA file, so that a later reader knows which version was checked.

## How should the EA be tested on demo?

A demo test should use the same instrument, broker, account type, spread assumption and lot rule as the planned live use. Run the EA for a period that includes trending and quiet conditions, and include at least one period with scheduled news in the commodity's market.

Record every trade with its entry, stop, target, exit, spread at entry, swap charged and R-multiple. Record the signals the EA skipped, and the reason if it logs one. Judge the sample after enough trades to show a pattern, and split the results by trend condition and by session.

Compare the demo results with the backtest on the same period. A large difference in trade count, average result or drawdown suggests that the backtest model does not describe the live execution, and that difference should be understood before the EA is trusted.

## How do you stress test a breakout EA?

A breakout system spends long periods losing small amounts in a range, then wins on a few large moves. The worst run is therefore often a long sequence of small losses, not a single large one. Find the longest losing run in the sample, measure its total loss in money, and check the account against it.

Scale the worst run to a larger one, perhaps twice as long, and check whether the account and the margin could survive. The method is the same as the stress test described in the [drawdown guide](/10-best-free-tools-for-analyzing-mt4-robot-drawdowns-powerful-guide-for-safe-forex-trading/), and the result should set the lot size.

Consider the worst gap. Find the largest single-bar move in the sample and measure how far it would have carried a position beyond its stop. If that loss exceeds the risk limit in your plan, the stop is not protecting the account in the way the plan assumes, and the lot size must be reduced.

## What mistakes do traders make with breakout EAs?

The first mistake is to optimise the lookback until the backtest looks good, and then to present the result as a tested rule. The second is to ignore the commodity's own costs and to use forex assumptions. The third is to trust the EA's log without checking it against the chart.

A fourth mistake is to let the EA run without a limit on the number of open trades or on total exposure. A breakout system can open several positions in a trending market, and their combined risk may exceed the plan. A fifth is to change the EA's settings after a losing run, which removes the test. A sixth is to forget that breakouts in a strong trend can produce a long run of wins that makes the next losing run feel like a failure of the method.

## How does a breakout EA fit with other methods?

Breakout rules work best in trending conditions, and they suffer in ranges. A trend filter on a higher timeframe can keep the EA out of ranges, though the filter adds a condition and reduces the trade count. The [trendline breakout guide](/trendline-breakout-vs-false-breakout-how-to-identify-and-trade-them-effectively/) explains how a real break differs from a false one, which is the same problem the Donchian rule faces.

Support and resistance levels can also provide context. A breakout that occurs at a well-known level may behave differently from one in open space. The [support and resistance guide](/how-to-identify-support-and-resistance-in-forex-proven-strategies-for-traders/) explains how to mark those levels before the signal occurs.

## What does a worked Donchian trade look like?

Consider a 20-bar Donchian channel on the four-hour chart of a gold CFD. Over the previous twenty bars the highest high is 2,350.00 and the lowest low is 2,302.00, so the channel is 48 points wide. A bar closes at 2,356.00, above the upper line, and the EA opens a buy at the next bar's open, which fills at 2,356.40 after a spread of 0.40 points.

The EA's stop rule places the stop at the lower channel line, 2,302.00, and the exit rule closes at the opposite line or at a target of twice the risk. The stop distance is therefore about 54 points, and the target is about 108 points above the entry. With a risk limit of 1% on a 5,000 balance, the lot size must be small enough that a 54-point move costs no more than 50, which depends on the point value of the contract. The worked example shows that the stop distance, not the signal, sets the size.

Now suppose the next four bars drift back into the channel and close at 2,340.00. The EA holds the trade, because its rule exits only at the stop or the target. The floating loss is about 16 points. The trade is still open, and the record must show that the EA held a losing position through a retreat, which is a feature of the rule that the test should measure.

The example shows why the exit rule matters as much as the entry. A breakout system that holds through retreats must survive the drawdowns those retreats cause, and the drawdown test is the place to check whether it can.

## How do you measure the channel width over time?

The width of the channel changes with volatility, and a fixed rule can behave differently in a wide channel and a narrow one. A wide channel makes the stop distance larger, which reduces the lot size at a fixed risk, and a narrow channel makes the stop tighter, which can increase the number of stop-outs from noise.

Record the channel width in points at each entry, and split the results by width band. A table of trades by width shows whether the rule performs differently in tight and wide conditions. If it does, the EA may need a width filter, and that filter must be tested as its own sample rather than added to the existing result.

Measure the width as a percentage of price as well as in points, so that the comparison holds when the instrument's price level changes over time. Gold at very different prices can produce very different point widths for the same percentage move.

## How do you check a gap against the EA's stop?

Commodity CFDs can gap through a stop, especially around scheduled releases or at the open of a new session. A breakout EA placed a stop at the channel line, and the gap then leaves the fill far beyond it. The loss on that trade can be several times the planned risk, and it must be recorded at its real size.

Find the largest single-bar move in the sample and measure how far it would have carried a position beyond the stop. Compare that figure with the loss limit in your plan. If the largest gap exceeds the limit, the stop is not the protection the plan assumes, and the lot size must be reduced to a level that survives the gap, or the instrument should not be traded with that EA.

Note the sessions in which gaps occur. A gap at the open of a session that the EA trades is a different risk from one at a session the EA avoids, and the result should show which applies.

## How do you compare the EA with a simple benchmark?

A useful benchmark for a breakout EA is a rule with the same entry and no filter, or a random entry with the same exit. If the EA performs no better than the benchmark, the entry is not adding information, and the result is produced by the market's general movement and the exit rule alone.

Run the benchmark over the same period, with the same costs and lot size. Compare the average result per trade, the drawdown and the number of trades. A difference that is small compared with the variation between samples is not evidence that the EA's entry adds value, and the record should say so.

This comparison is one of the most useful checks a tester can make, and it is often skipped, partly because a benchmark that performs about as well as the EA is an uncomfortable result to record. It turns a single result into a question with an answer.

## What does a demo log for a breakout EA contain?

A demo log for a breakout EA records each signal, whether it was traded, the channel values, the width at entry, the spread at entry, the fill price, the stop and target, the exit, the swap charged and the R-multiple. It also records the number of open trades at the time of each signal, so that the effect of the EA's position limit can be seen.

Keep a weekly summary line with the number of signals, the number traded, the number of stops and targets and the net R. The weekly line makes it easy to see whether the EA is firing as expected, and it gives an early warning if a setting or a feed has changed. Review the log at the end of each month, and decide in writing whether the EA continues, changes or stops.

## How do you handle several signals in a single trend?

A breakout in a strong trend can produce several signals in quick succession, as each new high or low triggers a new entry. An EA without a limit on open trades may stack several positions in the same direction, and their combined exposure can exceed the risk plan many times over. Decide before the test whether the EA will add to a trend, take only the first signal, or cap the number of open trades.

Record the position limit in the journal and check it against the trade log. A limit that the EA ignores in practice is a serious finding, and it should stop the test until the cause is found. Stacked positions also share a single stop distance in some EAs, which changes the risk of the whole group, and that behaviour must be checked explicitly.

## How should you handle a change in the instrument's contract size?

Commodity CFDs sometimes change their contract size, point value or trading hours, and the brokers' notices of such changes are easy to miss. A change in contract size changes the money risked per point, so an EA with a fixed lot can carry a different risk after the change. Check the contract specification at the start of each test and at the start of each month of live use, and keep a dated copy of each specification in the journal so that any change can be dated and explained later. Compare the copies whenever a result looks unexpectedly different from the one before.

Record the specification in the journal with the date. If the specification changes during a test, split the sample at the change and treat the two halves as separate tests, because their risk per point is no longer comparable.

## How do you decide when to retire a breakout EA?

A retirement rule should be written before the EA trades live, not after a poor month. Useful criteria include a worst drawdown beyond the plan's limit, a sample that fails the benchmark comparison over a long period, a change in the instrument's specification that alters the risk per point, or a verification check that finds the code no longer matches its description. Any one of these can justify a pause, and the rule should say what happens next.

Retiring an EA means stopping it, closing or managing its open trades as described in the removal guide, archiving its records and noting the reason. A retired EA is not a failure of the process. The record of why it was retired is often the most useful thing the test produces, because it shows which assumption did not hold. Store that record with the EA's file and its verification checklist, so the next person to examine the idea starts from the evidence rather than from the sales claims that usually surround it, and that is worth the few minutes the archive takes to assemble, since the same archive will be needed again if the idea is ever revisited, and a complete one saves a great deal of reconstruction work later on. Write a short note at the front of each archive that says what the folder contains and where the original files came from.

## What does this guide not promise?

This guide does not promise that a Donchian breakout EA will profit on gold, oil, silver or any other commodity. Breakout systems have long periods of loss, and the market can change its behaviour in ways that a backtest does not capture. The EA is a set of rules, and the rules may not fit the instrument you choose.

The guide also does not recommend any particular EA, vendor or lookback. The method described here applies to any breakout EA, and the result of applying it may be that the EA does not meet your standard.

## What is the offer in this guide?

The offer is the EA verification checklist, a printable checklist for confirming that an expert advisor does what its description says before it is trusted. It covers the code review, the manual check of the trade log, the demo conditions and the record keeping. Use it for the Donchian EA and for any other advisor you test.

The checklist does not validate a strategy. It checks the mechanics, so that the results you judge are the results of the rules you intended to test.

## How do you start this week?

Start by writing the Donchian rule in plain words: the lookback, whether the current bar is included, the entry close, the stop, the exit and the handling of a signal during an open trade. Then check the EA's code against that description.

Next, select twenty trades from the EA's log and check each one on the chart, using the verification checklist. Record the differences. Then move to a demo account on the exact commodity symbol and broker you plan to use, and run the EA unchanged, recording every trade and every skipped signal. After thirty trades, review the sample and the worst losing run.

For the statistics behind judging a set of trades, read the [Monte Carlo testing guide](/monte-carlo-test-for-mt4-backtesting-the-complete-robustness-guide-for-traders/), and for the arithmetic of stops and targets, the [risk-reward guide](/how-to-calculate-risk-reward-ratio-in-forex-powerful-guide-for-traders/).

For more free tools and checklists, visit the [resource library](/blog/).
