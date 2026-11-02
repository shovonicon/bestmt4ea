---
title: "ADX Indicator Settings for MT4: A Tested Guide"
slug: "10-best-adx-indicator-strategy-settings-for-mt4-powerful-secrets-for-winning-trades"
description: "What the ADX measures, which MT4 settings traders commonly use, how to read trend strength without treating it as a signal, and how to test ADX rules on demo."
publishedAt: 2026-11-02T00:00:00.000Z
updatedAt: 2026-11-02T00:00:00.000Z
categories:
  - "Technical Analysis"
categoryPaths:
  - "/category/technical-analysis/"
tags: []
primaryKeyword: "adx indicator settings for mt4"
quickAnswer: "The Average Directional Index, or ADX, measures how strong a trend is, not which way it points. The default MT4 setting is a 14-period calculation with a level of 25 used as a rough trend threshold. Use the ADX to filter conditions, record its value at each entry, and test any rule on a demo account before relying on it."
keyTakeaways:
  - "ADX measures trend strength on a scale from zero upward. It does not show whether the trend is up or down."
  - "The common default is a 14-period setting, with 20 to 25 often used as a rough line between weak and strong trends."
  - "Read the plus and minus directional lines together with the ADX to see which side is leading."
  - "ADX lags price, because it is built from past bars, so it describes conditions rather than predicting them."
  - "Test one ADX rule at a time, with the period and threshold written down before the first trade."
faqs:
  - question: "What are the default ADX settings in MT4?"
    answer: "MT4 uses a period of 14 by default. The indicator plots the ADX line along with the plus DI and minus DI lines. The default period is a convention, not a proven optimum, so record any change you test."
  - question: "What ADX value means a strong trend?"
    answer: "Many traders treat a value above 25 as a strong trend and a value below 20 as weak or sideways. These thresholds are rules of thumb. Your own test should check whether the threshold you choose separates useful conditions from noise."
  - question: "Does a rising ADX mean price will go up?"
    answer: "No. A rising ADX shows that the trend is strengthening, whichever direction it runs. The direction comes from the plus DI and minus DI lines, and even that needs a separate rule before it becomes a signal."
  - question: "Why does ADX react slowly?"
    answer: "The ADX is smoothed from directional movement over the chosen period, so it reacts after price has already moved. That delay is useful for filtering conditions but poor for timing an entry precisely."
  - question: "Can I optimise ADX settings to improve results?"
    answer: "You can test different periods and thresholds, but optimising on the same history you use to judge the result fits the rule to the past. Use a separate period of data to check any setting you choose, and report the sample honestly."
  - question: "Is ADX useful for beginners?"
    answer: "It is one of the easier indicators to understand, because it describes trend strength in a single line. A beginner should learn to read it alongside price and support levels, rather than relying on it alone."
sources:
  - label: "MetaTrader 4 trading platform help"
    url: "https://www.metatrader4.com/en/trading-platform/help"
  - label: "CFTC: consumer education on foreign currency trading"
    url: "https://www.cftc.gov/"
download:
  name: "Indicator repaint test checklist (PDF)"
  origin: "own"
  license: "Free for personal and educational use"
  licenseUrl: "https://bestmt4ea.com/disclaimer/"
  version: "1.0"
  fileKey: "resources/indicator-repaint-test-checklist.pdf"
  updatedAt: 2026-11-02T00:00:00.000Z
---

## Why do traders look for ADX settings at all?

The Average Directional Index is one of the indicators most often recommended to beginners, and it is easy to see why. It produces a single line that rises when a trend is strong and falls when the market is quiet. A trader who wants to avoid choppy conditions can glance at one number and decide whether to trade the day or wait.

The difficulty is that the indicator is often presented with a set of settings and thresholds that sound authoritative, and very little explanation of how they were chosen. Searches for ADX settings for MT4 tend to return a list of numbers, with the claim that one combination wins. This guide takes a different approach. It explains what the ADX measures, what the common settings do, how to read the lines, and how to test a rule before any money is risked.

No setting in this guide is presented as the best. The defaults are conventions, and the thresholds are rules of thumb. What matters is that the setting is written down, that it is applied the same way to every trade, and that the result is judged on a sample large enough to mean something.

## What does the ADX actually measure?

The ADX is built from two smaller measurements, the plus directional movement and the minus directional movement. Each bar is compared with the one before it. If the high rose more than the low fell, the bar adds to plus directional movement. If the low fell more than the high rose, it adds to minus directional movement. These movements are smoothed over the chosen period and expressed as directional indicators, the plus DI and minus DI.

The ADX is then calculated from the gap between the two directional indicators, smoothed again. A large gap means one side has been dominant, which is what a trend looks like in this method. A small gap means neither side has taken control, and the ADX falls. That is why the ADX is described as trend strength rather than trend direction. A strong downtrend and a strong uptrend can produce the same ADX value.

Understanding this structure helps avoid a common mistake, which is to read a rising ADX as a bullish signal. The rising line says the market is moving more decisively. It does not say which way.

## What do the default MT4 settings mean?

In MT4, the standard ADX indicator uses a period of 14 by default. That number determines how many bars are used for the smoothing. A shorter period reacts faster and produces more fluctuations. A longer period reacts more slowly and produces a smoother line. The default of 14 was chosen by the indicator's original designer for daily charts, and many traders use it on other timeframes without testing whether it still makes sense there.

The indicator displays three lines: the ADX itself, usually shown in a heavier line, and the plus DI and minus DI. Some traders hide the directional lines and read only the ADX, while others use the directional lines to decide direction and the ADX to decide whether the trend is worth trading. Both approaches use the same data, and the difference is in the rule.

The platform's help documentation describes these lines and their calculation in more detail, and it is the right place to check any setting before you rely on it. If the platform's build differs from the description in a guide, trust the platform's documentation and record the version you used.

## What thresholds do traders use?

A widely quoted rule of thumb treats an ADX reading above 25 as a strong trend, and a reading below 20 as weak or sideways conditions. Some traders use 20 as the threshold for strength instead. The region between the two is often treated as transitional.

These thresholds are a starting point for a test, not a verified boundary. A threshold that separates useful conditions on one pair may not do so on another. A threshold chosen after looking at past charts will tend to fit those charts better than the next period. The only honest way to choose a threshold is to fix it in advance and test it on a sample that was not used to choose it.

A practical method is to record the ADX value at each entry and then split the results into bands, such as below 20, from 20 to 25, and above 25. If the bands show clearly different outcomes over a large sample, the threshold may be useful. If the outcomes look the same in every band, the ADX is adding little to that rule.

## How do the plus DI and minus DI lines help?

The plus DI and minus DI lines show which side of the market is leading. When the plus DI sits above the minus DI, upward movement has been stronger recently. When the minus DI is above the plus DI, downward movement has been stronger. Many traders use the crossing of these lines as a directional filter, buying when the plus DI crosses above the minus DI and selling in the opposite case.

A crossing rule is simple to write and easy to test, but it has a weakness. The lines cross often in quiet markets, and each cross can produce a trade that goes nowhere. Adding the ADX threshold as a condition, so that trades are taken only when the trend is strong, reduces that noise. The combination is a two-part rule: direction from the directional lines, strength from the ADX.

Be careful with the exact moment of the cross. A rule that enters on the bar where the cross appears may be entering at the extreme of a short move. Test whether waiting for the bar to close, or requiring the gap between the lines to widen, improves the result, and record each variant as its own sample.

## Why does ADX lag, and what does that mean for trading?

The ADX is calculated from past bars and smoothed over a period. By the time the indicator rises above a threshold, the trend has usually been running for some time. This delay is inherent in the design. It is useful for filtering conditions, because it tells you the market is already moving, but it is poor for catching the start of a move.

The lag has a practical consequence. A rule that waits for the ADX to cross 25 may enter after much of the move has already happened, and the stop will then sit a long way from the entry. That affects the risk-reward profile of the trade. A trader should measure the distance from entry to stop and to target before accepting the rule, as explained in the [risk-reward guide](/how-to-calculate-risk-reward-ratio-in-forex-powerful-guide-for-traders/).

Lag also means the indicator can stay high after a trend has ended, because the smoothing has not yet caught up. A trader who uses a high ADX as permission to trade may be trading the end of a move. Record the ADX trend as well as its level, so you can see whether it is rising or falling at entry.

## How do you combine ADX with price structure?

The ADX is most useful when it is combined with price structure rather than used alone. A common approach is to identify a support or resistance level on a higher timeframe, and then to take trades in the direction of a clear break only when the ADX confirms that the trend is strong. The [support and resistance guide](/how-to-identify-support-and-resistance-in-forex-proven-strategies-for-traders/) explains how to draw the levels that such a rule depends on.

Another combination is with a volatility measure, such as band width. A strong ADX together with a widening band width suggests a market that is both trending and moving. A strong ADX with narrow bands may indicate a trend that is losing momentum. Either combination can be written as a rule and tested, but each adds another condition, and each condition reduces the number of trades. Keep the number of conditions small enough that the sample can still grow.

Structure also helps to define the stop. A stop placed beyond a recent swing is easier to justify than one placed at an arbitrary distance from the entry. Measure the stop in pips and check it against the average range of the pair, so that normal movement does not trigger it.

## How do you test an ADX rule on demo?

Write the rule before you open the demo account. State the period, the threshold, the directional condition, the entry bar, the stop and the target. Include the spread and lot size you will use live. Then trade the rule for a fixed sample, and record every trade, including the ones that would have been taken under a slightly different threshold.

Record the ADX value and the plus DI and minus DI at entry, so you can split the sample later. A sample of thirty trades is a sensible minimum for a first look. A rule that performs well only on a few trades is more likely to be chance than skill, and the summary should show the number of trades clearly.

Split the results by trend strength band and by direction. If the rule performs better in one band, that finding should be tested again on a new sample before it is trusted. A rule that is adjusted after each sample is no longer being tested, and the record loses its value.

## What mistakes do traders make with ADX?

The most common mistake is reading the ADX as a direction signal. A rising line tells you strength, not direction, and a trader who buys on every rising ADX will take many losing trades in strong downtrends. Always pair the ADX with the directional lines or with price structure.

The second mistake is changing the period or the threshold after a poor run. A poor run is part of any honest sample, and changing the settings to recover it is the same as starting a new test without saying so. Record the change, start a new sample and keep the old one in the journal.

The third mistake is ignoring the spread on short-term charts. A low ADX threshold on a fast timeframe can generate many small trades, and the spread on each one can outweigh the price movement. Record the spread at each entry and include it in the result.

## How does ADX fit into a complete plan?

ADX is a tool for describing conditions. A complete plan adds the rules for entry, stop, target, position size, the maximum loss per day, news periods and review. ADX sits in the condition part of the plan, deciding whether a particular rule is allowed to trade. It does not replace the other parts, and a plan that depends on it alone will be fragile.

It also helps to decide in advance which market conditions you will not trade. A rule that is silent in weak trends is a rule with a clear boundary, and that boundary can be checked against the record. If you cannot say when the rule should not trade, the rule is not yet defined.

Write the silent conditions as clearly as the active ones. A line such as "no trades when the ADX is below 20 or when the directional lines are within two points of each other" is a complete boundary, and it can be checked against the journal. A line that says only "trade when the trend is strong" leaves the decision open to mood, and that is the weakness the test is designed to remove.

## What does a worked ADX reading look like?

Imagine a one-hour chart of GBPUSD with the default setting of 14. Over the last twenty bars, the ADX has risen from 18 to 27, the plus DI sits at 31 and the minus DI at 14. The reading says three things. The trend has strengthened, since the ADX moved above 25. The upward side is leading, since the plus DI is well above the minus DI. And the gap between the two directional lines is wide, which is consistent with a market that has been moving in one direction.

Now suppose the next bar shows the ADX at 28, but the plus DI has fallen to 24 and the minus DI has risen to 22. The trend is still strong, but the lead has nearly disappeared. A rule that requires a clear directional lead would not trade this bar. A rule that required only a high ADX would still be eligible. The example shows why the two lines should be read together, and why a rule should state which one it depends on.

In the record, the trader notes the three values at the entry bar: the ADX, the plus DI and the minus DI. The notes are the raw material for later review. Without them, a trader cannot tell whether a losing trade was entered in a strong trend with a clear lead, or in a fading trend with the lines almost level.

## How do you handle ranging markets with an ADX rule?

A ranging market is one where the ADX stays low for a long period. In that condition, a rule that trades trends should stay silent, and a rule that trades ranges may become eligible. Many traders find that the most useful use of the ADX is to define that boundary: trade the trend rule when the ADX is above the threshold, and trade the range rule when it is below.

Be careful, though, with the range rule. A low ADX does not mean a range has formed. It means the directional movement has been small, which can happen in a range, but also at the start of a new trend or in a quiet period before a news release. The range rule should therefore include its own test for a range, such as a flat moving average or a price that has touched both boundaries several times.

Keep the two rules in separate samples. Mixing trend and range trades in the same sample makes it impossible to see which rule produced which result, and it can hide a failure in one behind a success in the other.

## How do you review a month of ADX records?

At the end of a month, review the journal in three passes. The first pass counts the trades, the rule variants and the expired signals. The second pass splits the results by ADX band, by direction and by time of day. The third pass reads each losing trade and asks whether the rule was followed, whether the stop sat at the invalidation point and whether the reading at entry was close to a threshold.

Pay particular attention to trades taken close to the threshold. A trade entered at an ADX of 25.1 under a rule that requires 25 is a borderline case, and a series of such trades can make the rule look worse or better than it is. Mark borderline trades in the journal, and compare them with the trades entered well above the threshold. If the borderline trades perform very differently, the threshold may be in the wrong place.

Write the conclusion in one or two sentences at the end of the review. The sentence should say what the sample shows, not what the trader hoped it would show. A clear note makes the next month's review faster and more honest.

## How does ADX relate to risk and position size?

The ADX does not change the risk of a trade. The risk is set by the stop distance and the lot size, and the indicator does not alter either. A trader who uses a strong ADX reading as a reason to increase the size is confusing a condition with a guarantee, and the loss on a losing trade will be larger for the same reason the trade was taken.

A better use is to keep the risk per trade fixed, whatever the ADX says. If the rule trades more often in strong trends, the total risk across trades will be higher in those periods, and that exposure should be planned for. The maximum loss per day and per week in your plan applies in every condition, including a strong trend.

The [pip guide](/what-is-a-pip-in-forex-simple-explanation-the-ultimate-beginner-friendly-guide/) explains how to convert a stop distance into money, which is the figure that should set the lot size regardless of what the indicator shows.

## How do you compare two ADX periods fairly?

Testing a 14-period setting against a 10-period or 20-period setting is a common step, and it is easy to do unfairly. The fair comparison runs both periods over the same data, with the same entry and exit rules, the same spread and the same lot size. Only the period changes. If the two samples cover different dates, or if one uses a different threshold, the comparison measures something else.

Decide in advance how the comparison will be judged. A sensible standard is the average result per trade in R-multiples, the number of trades and the largest losing run. A setting that wins on average but produces a long losing run may be harder to trade than the figure suggests. Write the standard down before the test, and apply it to both samples.

Remember that a comparison of two settings is itself a test of many possibilities. If you try ten periods and choose the best, the winner is likely to be partly luck. The honest approach is to test a small number of settings chosen for a reason, and to confirm the chosen one on a fresh period of demo trading.

## What is a sensible review routine for an ADX rule?

A sensible review routine has three cadences. Each day, record the ADX values at entry for every trade and note any borderline readings. Each week, check the summary sheet, count the trades and look at the largest loss against the plan. Each month, run the full review described earlier, and decide whether the rule continues, changes or stops.

The routine protects against two opposite errors. The first is abandoning a rule after a short poor run, which is common in the first week of a demo test. The second is continuing a rule long after the record has shown that it does not meet the standard you set. A fixed routine, with a fixed standard, makes both decisions easier to make from evidence rather than mood.

Keep the review notes in the same journal as the trades. A review that sits in a separate document tends to be skipped, and the link between the decision and the evidence is lost.

## Why should the timeframe be recorded with every ADX result?

The same ADX setting produces different readings on different timeframes, because each bar covers a different span of price. A 14-period ADX on a five-minute chart describes about an hour of movement, while the same setting on a daily chart describes nearly three months. A threshold that suits one timeframe may be meaningless on another, so the timeframe belongs in every log row and in the description of the rule.

Keep one timeframe for each sample. A test that mixes five-minute and hourly trades cannot tell you which timeframe produced which result. If you want to compare timeframes, run them as separate samples, with the same rules, and judge them against the same standard.

## What does this guide not promise?

This guide does not promise that any ADX setting will improve your results. The indicator is a description of past price movement, and it can be right about trend strength and still produce losing trades. The thresholds are conventions that many traders use, and the market does not need to respect them.

The guide also does not recommend a specific combination of settings. The defaults and thresholds described here are the ones commonly seen, and they are presented so that you can test them, not so that you can copy them.

## What is the offer in this guide?

The offer is the indicator repaint test checklist, a printable checklist for testing whether an indicator changes its past values after new bars arrive. Before you trust any ADX rule, confirm that the indicator and your rule do not repaint, because a repainting indicator will make a backtest look better than live trading can ever be.

Work through the checklist on the ADX and on any other indicator you combine with it. Keep the completed checklist with your demo journal. The checklist is a verification step, not a guarantee that the indicator is useful.

## How do you start this week?

Start by reading the platform's documentation for the ADX and confirming the settings on your chart. Write your rule with the period, the threshold, the directional condition and the stop. Keep it on one page.

Next, run the repaint checklist on the indicator. Then open a demo account, trade the rule with the spread and lot size from your plan, and record every trade with its ADX value at entry. After thirty trades, split the results by strength band and review the losing trades.

For a broader view of how trends and ranges develop, read the [trendline breakout guide](/trendline-breakout-vs-false-breakout-how-to-identify-and-trade-them-effectively/), and for the basic terms used throughout, the [pip guide](/what-is-a-pip-in-forex-simple-explanation-the-ultimate-beginner-friendly-guide/).

For more free tools and checklists, visit the [resource library](/blog/).
