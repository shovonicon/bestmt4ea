---
title: "TDI Bounce Scalping: A Testing Guide"
slug: "tdi-bounce-forex-scalping-strategy-7-powerful-secrets-for-consistent-profits"
description: "What the Traders Dynamic Index measures, how a TDI bounce rule is written for scalping, why its bands can mislead, and how to test the rule on demo with a log."
publishedAt: 2026-11-02T00:00:00.000Z
updatedAt: 2026-11-02T00:00:00.000Z
categories:
  - "Forex Scalping Strategies & EAs"
categoryPaths:
  - "/category/forex-trading-strategies/forex-scalping/"
tags: []
primaryKeyword: "tdi bounce forex scalping strategy"
quickAnswer: "The Traders Dynamic Index combines a smoothed RSI with volatility bands and a signal line. A TDI bounce rule looks for the RSI line to touch a band and turn back toward the middle. For scalping, the rule is only as good as its costs and its fills. Write the rule precisely, test it on demo with real spreads, and judge it on a fixed sample, not on a clean-looking chart."
keyTakeaways:
  - "The Traders Dynamic Index is built from RSI, with a price line, a signal line and bands around the RSI's average."
  - "A bounce rule enters when the RSI line touches a band and turns back, which is a counter-trend idea and needs a trend filter to be tested fairly."
  - "The bands are based on past volatility, so they widen and narrow with the market and do not mark fixed levels."
  - "Scalping results are dominated by spread and fill quality, so measure both on every trade."
  - "Test the rule on the timeframe and pair you plan to trade, with a written sample size and criteria."
faqs:
  - question: "What is the Traders Dynamic Index?"
    answer: "It is a technical indicator built from the relative strength index. It typically shows a price line, a signal line and bands that are based on the RSI's average and its volatility. Its settings vary between charting tools, so check the definition used."
  - question: "What is a TDI bounce?"
    answer: "A TDI bounce is a rule that enters when the RSI-based price line touches one of the bands and turns back toward the middle. It is a counter-trend idea, which means it assumes the move has stretched and will revert."
  - question: "Why does a bounce rule need a trend filter?"
    answer: "Without one, the rule will try to fade strong trends, and each touch of a band can become a losing trade as the trend continues. A filter from a higher timeframe can separate ranges, where a bounce is more plausible, from trends, where it is more dangerous."
  - question: "Are TDI bands fixed levels?"
    answer: "No. The bands move with volatility, so their position on the chart changes over time. A band that was touched yesterday may sit in a different place today, which is one reason the rule must be tested over many conditions."
  - question: "What timeframe should I use for TDI scalping?"
    answer: "There is no fixed answer. Scalping timeframes such as M1 and M5 magnify the effect of spread, so test the rule on the timeframe you plan to trade and record the spread at each signal."
  - question: "Can a TDI EA be trusted?"
    answer: "Only after verification. Check that the EA's TDI calculation matches the indicator's definition, that its entries use real prices, and that its demo results match the backtest within the expected costs."
sources:
  - label: "MetaTrader 4 trading platform help"
    url: "https://www.metatrader4.com/en/trading-platform/help"
  - label: "CFTC: consumer education on foreign currency trading"
    url: "https://www.cftc.gov/"
download:
  name: "Scalping EA demo test log (PDF)"
  origin: "own"
  license: "Free for personal and educational use"
  licenseUrl: "https://bestmt4ea.com/disclaimer/"
  version: "1.0"
  fileKey: "resources/scalping-ea-demo-test-log.pdf"
  updatedAt: 2026-11-02T00:00:00.000Z
---

## Why do TDI bounces attract scalpers?

The Traders Dynamic Index is one of the indicators that scalpers often discuss, because it offers many readings in a short time. A chart with the TDI in the lower panel shows a price line moving between bands, and each touch of a band looks like an invitation to trade. For a scalper looking for quick, repeated opportunities, that frequency is attractive.

Frequency is also the danger. A rule that triggers often produces many trades, and each trade carries its spread and its execution risk. A scalper who trades every touch will pay the spread many times, and a small disadvantage in fills can become a large one over a sample of hundreds of trades. The attraction and the risk come from the same source.

This guide explains what the Traders Dynamic Index measures, how a bounce rule can be written, why the bands mislead when used without care, and how to test the rule on a demo account with a log. It does not claim that the TDI produces consistent profit, and it treats each rule as a hypothesis that must be measured.

## What does the Traders Dynamic Index measure?

The TDI starts from the relative strength index, a measure of recent gains against recent losses scaled from zero to one hundred. The commonly described version smooths the RSI into a price line, computes a signal line from a further smoothing, and draws bands around the RSI's average using its volatility. The exact periods and the band multiples vary between tools, so the definition used must be recorded.

The price line shows the smoothed RSI. The signal line follows it more slowly, and crossings between the two are read as momentum changes. The bands mark a range in which the RSI is considered typical, and a touch of an outer band is read as an extreme. These are conventions, and a test must use a fixed definition.

Because the bands are built from the RSI's own volatility, they widen in choppy conditions and narrow in calm ones. A band touch therefore does not mean the same thing in every market, and that variability is a key reason to test the rule across different conditions.

## How can a bounce rule be written?

A bounce rule for a scalper might read as follows. On the five-minute chart, if the TDI price line touches the lower band and then closes back above it, and the price line is turning upward, consider a buy. Place a stop a fixed number of pips below the entry, and target a fixed multiple of the stop distance. Exit if the price line crosses the signal line in the opposite direction before the target.

The rule has several parts, and each must be stated precisely. The touch must be defined: a wick touch or a close beyond the band. The turn must be defined: a change in direction over one bar or over two. The exit must be defined: the target, the stop or the opposite cross. Without these definitions, two traders reading the same chart will take different trades, and the test will measure no single rule.

Write the mirror rule for a sell, and state whether the buy and sell rules will be tested together or separately. Testing them together can hide an asymmetry, because a market that trends up may suit the buy rule and punish the sell rule, and the combined result will average the two.

## Why do the bands mislead?

The most common misreading of a TDI bounce is to treat the band as a support or resistance line. It is not. The band is a statistical envelope built from recent RSI behaviour, and it moves with volatility. A price line that touches the band in a strong trend is not showing an extreme that will revert. It may be showing a trend that has pushed the RSI into a new range.

The second misreading is to assume the bounce will occur at the same place each time. The RSI and the bands are recalculated on every bar, and the level at which a touch occurs can change from one bar to the next. A rule that depends on a particular level will therefore produce different results depending on the exact moment the bar closes.

The third misreading is to rely on the bounce in a trend. A counter-trend rule, which expects the move to revert, will fail in a strong trend far more often than it succeeds, and each failure can be large relative to a scalp's target. A trend filter on a higher timeframe is the usual way to keep the rule out of trends, and it must be tested as a condition.

## How do you add a trend filter?

A simple filter uses a moving average on a higher timeframe, such as the one-hour chart. The bounce rule trades only when the price is within a defined distance of that average, or when the average is flat. In that way the rule is limited to conditions that are closer to ranges than to strong trends.

Test the rule with and without the filter, as two separate samples, and compare the results with the same spreads and lot size. The filter reduces the number of trades, so the comparison must consider the sample size as well as the average result. A filter that removes many trades and improves the average may still give a smaller total profit.

Record the trend condition for every trade in the journal, even when the filter is not used. The record allows the rule to be split by condition later, which is often more informative than the filter itself.

## How do spreads and fills decide a scalping result?

On a five-minute chart, a bounce scalp may target a few pips, and the spread is often a substantial part of the target. A rule that targets six pips with a spread of two pips has a third of its reward consumed on entry. The rule is viable only if the win rate and the average result are high enough to cover that cost over the whole sample.

Fills matter as well. A bounce rule enters at a touch, and in fast markets the touch may be followed by a rapid move that fills the order far from the signal price. Record the signal price, the fill price and the time between them for every trade. A rule whose fills are consistently worse than its signal prices may not be tradeable at that broker, however good its chart looks.

Use the spread at the time of each signal, not the average. Spreads widen around the rollover and around news, and a bounce rule that fires in those windows will pay more than its average suggests.

## What does a demo test of the bounce rule look like?

A demo test uses the same pair, timeframe, spread assumption and lot size as the planned live trading. It runs for a sample of at least thirty closed trades, and it covers both trending and ranging conditions. The rule is written before the first trade, and it is not changed during the sample.

Record every signal, including the signals not taken. For each trade, record the time, the TDI values at entry, the trend condition, the signal and fill prices, the spread, the stop, the target, the exit and the result in R-multiples. Summarise the sample by condition and by session.

Judge the sample against written criteria. Typical criteria include a minimum number of trades, a positive average result after the real spread, a profit factor above a stated level and a largest losing run within the plan. A sample that does not meet the criteria should lead to a review, not to a change of the rule within the same sample.

## What are the common mistakes with TDI bounce rules?

The first mistake is to take every touch of a band without a filter. The second is to treat the bands as fixed levels. The third is to ignore the spread and the fill, which can turn a rule that looks profitable on the chart into a losing rule on the account.

The fourth mistake is to optimise the TDI periods until the backtest looks good, without an out-of-sample test. The fifth is to run the buy and sell rules together and to read the combined result as evidence for both. The sixth is to forget that a bounce rule is a counter-trend idea, and to keep trading it through a long trend because the recent results were good.

## How does the bounce rule fit with other tools?

The bounce rule can be combined with support and resistance levels. A touch of a band near a level that the market has respected before may have a clearer context than one in open space. The [support and resistance guide](/how-to-identify-support-and-resistance-in-forex-proven-strategies-for-traders/) explains how to mark those levels consistently.

The [Heikin-Ashi scalping guide](/10-powerful-reasons-scalping-with-heikin-ashi-candles-can-boost-your-trading-success/) covers a different scalping approach, and the same cost discipline applies to both. The [pip guide](/what-is-a-pip-in-forex-simple-explanation-the-ultimate-beginner-friendly-guide/) explains how to convert a stop and a target into money, which is the figure that should set the lot size.

## What does a worked bounce trade look like?

Consider the five-minute chart of EURUSD with the TDI in the lower panel. The price line has been moving between the bands for an hour, and the trend filter on the one-hour chart shows a flat moving average, so the condition is recorded as a range. The price line touches the lower band at a bar that closes at 1.0884, and the next bar closes with the price line turning upward and back above the band.

The rule enters at the open of the next bar. The fill is at 1.0887 after a spread of 1.3 pips, so the entry is three pips above the touch-bar close. The stop is placed 4 pips below the entry, at 1.0847, and the target is 8 pips above, at 1.0927. The trade is therefore risking 4 pips to make 8, and the spread has already consumed about a third of the first 4 pips of movement.

Twenty minutes later the price reaches 1.0912 and then reverses. The trade is closed at the exit rule's time limit at 1.0899, a result of 12 pips minus the entry, which is a gain of about 12 pips over the entry price, or roughly 2 R after the spread. The record must show the spread, the fill, the time limit and the exit, since the result depends on each of them.

The example shows why the cost discipline matters on a five-minute scalp. The same trade with a fill two pips worse would have lost a large part of its edge, and the test must record the fill as carefully as the signal.

## How do you measure whether the bands add value?

A test of the bands should compare the bounce rule with a rule that uses no bands. A simple benchmark enters in the direction of the price line's turn after a fixed number of bars, with the same stop, target and exit but without the band touch. If the bounce rule performs no better than the benchmark, the band is not adding information, and the result comes from the stop and target alone.

Run the benchmark on the same bars, with the same costs and lot size. Compare the average result per trade, the win rate, the number of trades and the largest losing run. The comparison answers the question that matters: whether the bands add anything beyond a simpler rule of the same shape.

This comparison is often unflattering, and it is often skipped. Record it either way.

## How do you handle a band that moves during a trade?

The bands recalculate on every bar, so a band that was at one level when the trade opened may be at another level when the trade closes. Some exit rules refer to the band, and a band that moves toward the price during a trade can trigger an exit without any change in the underlying move. Check whether the exit rule uses the band at entry or the band at each bar, and record the choice.

A rule that exits on the band is more sensitive to the indicator's settings than one that exits on a fixed target. For a clean test, prefer a fixed exit rule, so that the result depends on price and not on the indicator's recalculation. If a band exit is used, test it as a separate variant, and report it separately.

## What does a month of bounce testing look like?

In week one, write the rule, the mirror rule, the trend filter and the criteria, and check the TDI settings against the platform's definition. In week two, run the rule on demo without trading it, recording the signals that would have been taken, to see how often the rule fires and in which conditions. This step tests the frequency and the spread assumption before any money or any trade is at risk.

In week three, trade the rule on demo for the agreed sample, with the real spread and the real fill recorded. In week four, review the sample by condition and by session, compare it with the benchmark and read the losing trades. Decide whether the rule meets the criteria, needs a new sample or should be set aside.

## How do you know the TDI settings are right?

The settings of the TDI are conventions, and different tools use different periods and band widths. The right settings are the ones written in the test, not the ones that produce the best result. Compare the chart's TDI values with a reference calculation for a short series of bars, and check that the price line and the bands match the definition used in the rule.

Changing the settings after a poor sample is an optimisation, and it must be treated as such. Test a changed setting on a new sample, and report the change alongside the original result. A setting that is chosen because it fits the past is not a setting that has been tested.

## How do you read a band touch that happens during news?

A band touch during a scheduled release is a different event from one in a quiet session. The bands may widen sharply in the moments after the release, and a touch may reflect the spike rather than a stretched RSI. A bounce entry during that window can fill far from its signal, and the spread is often at its widest.

Mark every signal that falls within fifteen minutes of a high-impact release, and keep those signals in a separate group in the summary. If the marked group is the main source of the result, the rule is effectively a news rule, and it needs its own test under the news rules set out elsewhere in this guide series. Most scalping rules should simply avoid the release window, and the test should record how many signals that avoidance removes.

## How do you record a sample without losing track of it?

A scalping sample grows quickly, and a poorly organised journal becomes unreadable within days. Keep one row per signal, with fixed columns, and add a summary row at the end of each day. The summary should give the number of signals, the number taken, the average result after spread and the largest losing run so far.

Back up the journal daily, and check once a week that the backup opens and contains the latest rows. A sample that is lost or corrupted cannot be recovered from memory, and a test with a missing week is a test whose results cannot be fully trusted. Keep the backup in a second location, so that a single failure of the computer cannot remove the sample.

## Why should the buy and sell rules be judged separately?

Many markets have a bias in one direction during a given period, and a bounce rule may suit one side of that bias better than the other. The buy rule might succeed in a market that drifts gently upward, while the sell rule loses on the same bars. A combined result can then look average while hiding a clear asymmetry.

Report the buy and sell results separately in every summary, with their own counts, averages and losing runs. If one side performs very differently from the other, that finding belongs in the conclusion, stated plainly and with the counts that support it. It may point to a market condition the trend filter should handle, or it may suggest that only one side of the rule is worth testing further.

## How do you decide when a bounce rule has failed?

A bounce rule fails when it does not meet its written criteria over a sample that is large enough to judge. The failure should be stated plainly in the journal, with the figures that show it. It is not a failure of effort or of the trader, and it is not a reason to change the rule within the same sample. It is the outcome the test exists to find.

After a failure, there are three honest options. The first is to end the test and set the rule aside, recording the reason. The second is to write a new hypothesis, such as a different filter or a different target, and to test it on a new sample with its own criteria. The third is to keep the failed rule as a benchmark for future tests, since a rule that failed is useful to compare against. Any of these is a sound response. Changing the criteria so that the rule passes is not.

A record of failed bounce tests is valuable to a trader who returns to scalping later. It shows which ideas have already been tried, under which conditions, and with what result, so that the same test is not repeated from the beginning. Keep the record of each failed test beside its rules, its criteria and its sample, so that the reason for the failure can be read without reconstructing the test. A failed test that is recorded clearly saves more time than a passed test that is recorded vaguely, and it protects the trader from the tendency to remember only the results that felt encouraging. A complete record, with its failures in plain view, is the foundation for every decision that follows it, and it is the only record that can be checked later by someone who was not present for the test, which is the standard every record in this guide is meant to meet. Read each journal entry as if a stranger had written it, and add anything that stranger would need to understand the trade, including the spread, the fill, the trend condition and the reason the signal was taken, written in plain sentences that a reader can follow without the chart open, and a short summary line at the end of each week keeps the entries easy to scan.

## What does this guide not promise?

This guide does not promise that a TDI bounce rule will produce consistent profit, and it does not claim that the Traders Dynamic Index has any special predictive power. The indicator describes past price, and a bounce rule built on it is one hypothesis among many. Its results depend on the instrument, the broker, the costs and the conditions of the sample.

The guide also does not recommend any particular TDI tool, EA or setting. The method applies to any version, and the result of testing may be that the rule does not meet the criteria in the plan.

## What is the offer in this guide?

The offer is the scalping EA demo test log, a printable log for recording each signal, the spread, the fill and the result of a scalping rule. It suits the test described here, which covers both the bounce signal and the trend condition at each entry.

Use the log for every signal, taken or skipped, and keep it with the written rule and the criteria. The log is what turns a chart impression into a measured result.

## How do you start this week?

Start by writing the bounce rule in full, including the definition of the touch, the turn, the stop, the target and the exit. Write the mirror rule for a sell, and decide whether the two will be tested together or separately. Write the trend filter and the criteria for the sample.

Then open a demo account with the spread and lot size you plan to trade, and run the rule for the agreed sample. Record every signal with the real spread and fill. When the sample is complete, check the result against the criteria and write the decision in the journal.

For the arithmetic of a target and a stop, read the [risk-reward guide](/how-to-calculate-risk-reward-ratio-in-forex-powerful-guide-for-traders/), and for a sample of trades and its statistics, the [Monte Carlo testing guide](/monte-carlo-test-for-mt4-backtesting-the-complete-robustness-guide-for-traders/).

For more free tools and checklists, visit the [resource library](/blog/).
