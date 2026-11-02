---
title: "QQE Indicator for MT4: Trend Confirmation Explained"
slug: "7-powerful-ways-a-free-qqe-indicator-with-alerts-for-trend-confirmation-can-transform-your-trading"
description: "What the QQE indicator measures, how its smoothed RSI and trailing level work, what its alerts do and do not show, and how to test a confirmation rule on demo."
publishedAt: 2026-11-02T00:00:00.000Z
updatedAt: 2026-11-02T00:00:00.000Z
categories:
  - "Technical Analysis"
categoryPaths:
  - "/category/technical-analysis/"
tags: []
primaryKeyword: "qqe indicator for mt4"
quickAnswer: "The QQE, short for Quantitative Qualitative Estimation, is a smoothed version of the relative strength index with a trailing level around it. It helps show when momentum has shifted relative to that level. Alerts only tell you a condition was met, not that the trade will work. Treat QQE as one confirmation in a written rule, and test it on demo before relying on it."
keyTakeaways:
  - "QQE is built on a smoothed RSI with a trailing level, which reduces some of the noise of a raw RSI line."
  - "Its colour changes and crossings describe momentum shifts, which are conditions to test rather than guaranteed signals."
  - "Alerts report that a condition occurred. They do not report whether the trade would have been profitable."
  - "Confirmation rules add a condition, which lowers the number of trades. Test whether the added condition improves the result."
  - "Write the settings, alert rules and exit rules before testing, and keep the same settings for the whole sample."
faqs:
  - question: "What does QQE stand for?"
    answer: "QQE stands for Quantitative Qualitative Estimation. It is a family of indicators built on a smoothed RSI with a trailing level, designed to filter some of the noise in the raw RSI line."
  - question: "How is QQE different from RSI?"
    answer: "QQE smooths the RSI and adds a trailing band around it. That makes the line less jumpy, but it also makes it slower. The indicator is still a momentum measure, so it describes past price movement."
  - question: "Do QQE alerts mean I should trade?"
    answer: "No. An alert tells you a condition occurred on the chart. Whether to trade depends on your written rule, the price structure, the stop and the risk. An alert is a prompt to check a rule, not an instruction."
  - question: "What settings do traders use for QQE?"
    answer: "Common settings include an RSI period of 14 and a smoothing factor of 5, but these are conventions. Record any setting you test, and do not change it during a sample."
  - question: "Can QQE be used on any timeframe?"
    answer: "It can be applied to any timeframe, but its behaviour changes with the bar length. A setting that works on the hourly chart may not suit the five-minute chart, so each timeframe should be tested separately."
  - question: "Is QQE a free indicator I can trust?"
    answer: "Free does not mean verified. Check the code or the platform's build before using any custom indicator, run a repaint test, and confirm the values against a reference calculation before you rely on the alerts."
sources:
  - label: "MetaTrader 4 trading platform help"
    url: "https://www.metatrader4.com/en/trading-platform/help"
  - label: "Investor.gov: the US SEC investor education site"
    url: "https://www.investor.gov/"
download:
  name: "Indicator repaint test checklist (PDF)"
  origin: "own"
  license: "Free for personal and educational use"
  licenseUrl: "https://bestmt4ea.com/disclaimer/"
  version: "1.0"
  fileKey: "resources/indicator-repaint-test-checklist.pdf"
  updatedAt: 2026-11-02T00:00:00.000Z
---

## Why does a free QQE indicator attract so much interest?

Among the custom indicators that circulate for MT4, the QQE is one of the most requested. It arrives as a small file, it draws a few lines and coloured bars beneath the chart, and it often comes with a claim that its alerts will show the right moment to trade. That combination makes it attractive to a beginner who wants a clear signal, and it is exactly why the indicator needs careful handling.

This guide explains what the QQE measures, how its components work, what alerts do and do not report, and how to test a confirmation rule before any money is risked. It does not recommend a specific download, and it does not promise that any setting will improve results. The indicator is a tool to describe momentum, and its value depends on how it is used.

Before you use any free indicator, confirm where it came from, read the code if you can, and run a repaint test. The checklist that comes with this guide is designed for that step. An indicator that changes its past values will make a backtest look better than live trading can ever be.

## What does the QQE measure?

The QQE is built on the relative strength index, or RSI. The RSI compares the size of recent up moves with recent down moves over a set period, and it is scaled from zero to one hundred. A high reading suggests strong recent gains; a low reading suggests strong recent losses. The QQE takes that raw RSI, smooths it, and then adds a trailing level around the smoothed line.

The smoothing reduces the jumpiness of the raw RSI. A raw RSI can cross its midline many times in a few bars, which generates many false readings. The smoothing slows the line so that crossings are less frequent. The trailing level is a second line that moves with the smoothed RSI and changes only when the smoothed value moves beyond it. Crossings of the smoothed line through the trailing level are what most QQE rules use.

This structure means the QQE is a momentum indicator with a built-in filter. Its job is to describe when momentum has shifted in a way that is slower and steadier than the raw RSI. It is not a trend indicator in the sense of a moving average, and it does not measure trend strength the way the ADX does.

## What are the common settings?

Most QQE versions expose two main inputs: the RSI period and the smoothing factor. A commonly seen combination is an RSI period of 14 and a smoothing factor of 5. Some versions add a multiplier for the trailing level, which changes how far the band sits from the smoothed line.

These settings are conventions. A period of 14 is the original RSI default, and a smoothing factor of 5 is a common choice in published versions. Neither is proven to be best on any pair or timeframe. A shorter RSI period makes the indicator more responsive and noisier. A longer period makes it slower and smoother. A higher smoothing factor delays the line further.

Whatever settings you use, record them in the journal and keep them fixed for the sample. Changing the settings after seeing the results is the same as starting a new test, and the old sample should be kept as a record of the earlier version.

## What do the colours and crossings mean?

Many QQE versions colour the histogram or the line to show whether the smoothed value is above or below its midline, or whether it is rising or falling. A colour change is a description of a momentum shift on the bar that just closed. It is a condition to record, not a command to trade.

A crossing of the smoothed line through the trailing level is the event most rules use. A cross upward suggests that momentum has moved into a stronger state, and a cross downward suggests the opposite. Traders often combine the cross with a higher-timeframe trend or a support or resistance level, which adds a second condition and reduces the number of trades.

Be careful with the exact bar on which the cross is measured. Many indicators show the cross on the current, unfinished bar, which may change before the bar closes. A rule that acts on an unfinished bar is not testable, because the value that appeared during the trade may differ from the value at close. Wait for the bar to close, and check that the indicator's value does not change afterwards.

## What do QQE alerts actually report?

An alert is a notification that a condition has occurred on the chart. For a QQE alert, the condition is usually a cross or a colour change. The alert reports that the condition happened. It does not report the result of a trade, the probability of a move, or whether the move will reach a target before the stop is hit.

This distinction matters because alerts create a feeling of action. A trader who receives an alert at night may feel obliged to open a position, even when the rule would not allow it. The safer use is to treat the alert as a prompt to check the chart against the written rule, and to act only if every condition in the rule is met, including the news filter and the risk limit.

Record every alert in the journal, including the ones you did not act on. The unacted alerts are part of the sample, because they show how often the indicator fires and how the rule would have performed.

## How do you build a confirmation rule?

A confirmation rule uses the QQE as one condition alongside others. A simple version might read as follows. On the one-hour chart, if price is above a rising moving average on the four-hour chart, and the QQE smoothed line crosses above its trailing level on a closed bar, consider a buy. Place the stop below the most recent swing low, and target twice the stop distance.

Each added condition makes the rule stricter and reduces the number of trades. That is useful if the extra condition removes losing trades, but it can also remove profitable ones, and the test must show which effect dominates. Test the rule with and without the confirmation, as two separate samples, and compare the results with the same spread and lot size.

Write the exit rule as carefully as the entry. A rule that exits only when the QQE reverses may hold losing trades for a long time. A rule that exits at a fixed target or at the stop is easier to measure. Choose one exit method for the sample and keep it.

## How do you test QQE on demo?

Start with a repaint test. Load the indicator on a chart, record its values on a set of closed bars, and then reload the chart after new bars have formed. If any recorded value has changed, the indicator repaints, and the test cannot be trusted until that is fixed or replaced.

Then trade the rule on a demo account with the spread and lot size from your plan. Record every signal, the settings used, the entry, the stop, the target, the exit and the spread. Include the signals you did not trade, because they show how often the rule fires and whether the filter is working.

A sample of thirty closed trades is a reasonable minimum for a first look. Split the results by timeframe, by trend condition and by news period, and compare the averages. A rule that works only in one split is a rule with a condition, and that condition belongs in the description of the rule.

## What mistakes do traders make with QQE?

The first mistake is trusting an unknown indicator. A free file may contain code that is hard to read, that changes values after the bar closes, or that behaves differently from its description. Verify the indicator before trusting any alert from it.

The second mistake is changing the settings after a loss. This makes the sample meaningless, because the rule that was tested is no longer the rule being traded. Keep the settings fixed, and start a new sample if you want to test a different setting.

The third mistake is entering on every alert. An alert does not carry a risk limit, a stop or a target. Each trade needs all of those set before entry, and the alert is only the start of the check.

## How does QQE fit with other tools?

The QQE pairs naturally with a trend filter, because momentum signals work differently in a strong trend than in a range. A moving average on a higher timeframe can separate the two, and the trend tag can be recorded in the journal. The [trendline breakout guide](/trendline-breakout-vs-false-breakout-how-to-identify-and-trade-them-effectively/) explains how a breakout differs from a false break, which can help when the QQE and price disagree.

It also pairs with structure. A QQE cross at a marked support level has a clearer context than one in open space. The [support and resistance guide](/how-to-identify-support-and-resistance-in-forex-proven-strategies-for-traders/) explains how to mark the levels consistently, so the level is fixed before the signal occurs.

Avoid stacking too many indicators. Each one adds a condition, and the rule becomes hard to test and hard to trade. A rule with two or three conditions is usually easier to measure than one with six.

## What does a worked QQE sample look like?

Imagine a sample of thirty trades on the one-hour chart of EURUSD, using the confirmation rule with a higher-timeframe trend filter. The trader records twenty-six signals that pass the trend filter and four that fail it. Of the twenty-six, fifteen reach the target and eleven hit the stop. The average R-multiple is about 0.35 after a spread of one pip per trade, and the profit factor is about 1.6.

The figures look encouraging, but the trader checks the spread on each trade and finds that it widened to three pips around two news releases. Both losses on those releases were larger than the stop distance, because the fill came after a fast move. The trader marks those trades as news-affected and splits the sample. Without the news trades, the average R-multiple rises. With them, the picture is less clear.

The honest reading is that the sample shows a modest positive result, a clear news effect and a need for a larger sample before any conclusion. The trader writes that reading in the journal, and plans the next sample with a news rule written before the test begins.

## How do you read QQE on a real chart, step by step?

Begin with the chart at the timeframe you intend to test, and make sure the indicator is loaded with the settings written in your journal. Look at the position of the smoothed line relative to its midline, then at its position relative to the trailing level. Note whether the line has just crossed or has been on one side for several bars. A cross and a long run on one side describe different states, and the rule should say which one it needs.

Next, check the bar that just closed. Wait until the bar has finished before you record any reading. A value read during the bar may change, and the rule has to be testable on closed bars. If your platform displays the current bar, mark it differently in your notes, and do not treat it as a completed signal.

Finally, check the context. Look at the higher-timeframe trend, the nearest support or resistance level and the time of the next scheduled release. Record each of these with the signal. The reading of the indicator is only one part of the picture, and the journal should show the rest.

## How do QQE settings change the number of signals?

A shorter RSI period produces a more responsive line, which crosses its trailing level more often. More crossings mean more signals, and more signals mean more trades to measure, but also more noise. A longer period produces fewer crossings, and each one tends to come later in the move. The trade-off is between speed and reliability, and it has no universal answer.

A higher smoothing factor delays the line further, and it reduces the number of signals in the same way. A test that compares two smoothing factors should use the same data, the same entry rule and the same exit rule. Count the signals each setting produces before comparing the results, because a setting that produces very few trades may show a good average result that rests on too few observations to mean anything.

Record the signal count for every setting you test. The count tells you how long a sample will take to grow and how sensitive the result is to a small number of trades.

## What happens around news and rollover?

Indicators built on past bars assume the market behaves in a steady way. Scheduled news breaks that assumption, because a release can produce several bars of movement in a few minutes, and the smoothing then lags behind the true state of the market. A QQE cross that appears just after a release may describe the spike rather than a sustained shift in momentum.

Rollover, the daily point at which the broker closes and reopens the trading day, can also affect bars and spreads. A bar that spans rollover may show an unusual range, and the spread at that moment is often wider. Mark signals that occur within thirty minutes of a release or of rollover, and keep them in a separate group in the summary. The comparison shows whether the indicator is performing differently in those periods.

A rule that avoids trading in these windows is simpler to test than one that trades through them. Write the window in the rule, and count the signals you skipped, so the effect of the filter is visible.

## How should a QQE journal be kept?

A useful QQE journal has one row per signal, with columns for the date and time, the pair, the timeframe, the settings, the reading on the closed bar, the higher-timeframe trend, the nearest level, the spread at the signal, whether the signal was traded, the entry, the stop, the target, the exit and the R-multiple. It also has a column for notes, where you describe anything unusual about the bar or the chart.

Keep the journal in the same file as your demo trades, or link it by date and time, so that every signal can be traced to its result. Do not delete signals that you chose not to trade. A journal that records only executed trades hides the cost of the filter and the frequency of the signal, and it makes the rule look better than it is.

At the end of each week, add a summary line: the number of signals, the number traded, the number that reached target and the number that hit the stop. The weekly line makes it easy to see whether the rule is firing as expected, and it gives an early warning if a setting or a feed has changed.

## What does a QQE review look like after a month?

After a month, begin the review with the signal count and the trade count. If the rule fired far more or far less often than you expected, check the settings, the timeframe and the chart feed before looking at the results. A count that does not match the expected behaviour is often a configuration problem.

Next, split the sample by trend condition, by news period and by level. Compare the results in each group, and record which groups have enough trades to be judged. Groups with only a few trades should be marked as too small, and they should not be used to justify a change.

Finally, read the losing trades. For each one, record whether the signal was valid under the rule, whether the stop was placed correctly and whether any news or rollover effect was present. Write the conclusion in one or two sentences. The conclusion should describe what the sample shows, and it should name the next question to test.

## Why is a reference calculation worth doing?

A reference calculation is a check that the indicator on your chart produces the numbers its description says it should. For a QQE built on RSI, that means computing the RSI for a short series of closes by hand or in a spreadsheet, applying the same smoothing, and comparing the result with the indicator's value at the same bar. A small difference can come from rounding, but a large or consistent one means the indicator is not doing what you think.

This check takes about an hour and it is one of the most useful things a tester can do. It also gives you confidence that the values you record in the journal are the values the rule depends on. Keep the calculation sheet with the journal, and note the date and the version of the indicator you checked.

## How do you handle a QQE that behaves differently across brokers?

Different brokers supply different prices, and an indicator fed by one broker's data will show slightly different values from the same indicator fed by another. The difference is often small, but it can change which bar produces a cross, and that can change the signal count. If you test a rule on one broker's demo and trade it on another's live account, the sample may not describe the live behaviour.

The practical response is to test on the broker you will use, with the same data source, and to note the broker in the journal. If you change brokers, treat the change as a new sample. This is a simple step, and it prevents a common surprise where a rule that looked stable on one feed behaves differently on another. Record the feed or server name beside each sample, so that a later reader can see which data the result came from and whether the comparison is fair.

## How should you decide when a QQE version is no longer usable?

A version of the indicator should be retired when it fails the repaint check, when its values differ from the reference calculation beyond rounding, or when its author's description no longer matches its behaviour. Any of those findings means the indicator cannot be trusted for testing. Retire it, keep its files and its test results in the journal, and start a new sample with a verified version.

A retired version is still useful, because the record of why it failed tells the next tester what to check first. Retiring an indicator is not a failure of the method, and it is often the most useful result a test can produce. It is the same discipline that applies to a rule: a tool that cannot be checked should not be used to make decisions about real money.

## What does this guide not promise?

This guide does not promise that the QQE, or any other indicator, will improve trading results. An indicator describes past price movement, and the market can behave differently from its history at any time. A rule that works in one period may fail in the next.

The guide also does not endorse a particular free indicator, and it does not suggest that a free download is worse than a paid one. What matters is that the indicator is verified, its settings are recorded and its alerts are tested as conditions rather than as commands.

## What is the offer in this guide?

The offer is the indicator repaint test checklist. It is a printable checklist for checking whether an indicator changes its past values, and it should be completed before any QQE rule is tested. It covers the steps for loading the indicator, recording values, reloading the chart and comparing the results.

Use the checklist with the QQE and with any other indicator in your rule. Keep the completed checklist with your demo journal. The checklist is a verification step, not evidence that the indicator is useful.

## How do you start this week?

Start by identifying the QQE version you have, and check its source or documentation. Record the settings on your chart. Then run the repaint checklist on a set of closed bars, and note any value that changes after reloading.

Next, write the confirmation rule with its trend filter, its stop, its target, its exit and its news rule. Open a demo account and trade the rule with the spread and lot size from your plan. Record every signal, including the ones you skipped. After thirty closed trades, split the sample and read the losing trades.

For the basics of how the market moves between the bars you trade, read the [pip guide](/what-is-a-pip-in-forex-simple-explanation-the-ultimate-beginner-friendly-guide/), and for the arithmetic of stops and targets, the [risk-reward guide](/how-to-calculate-risk-reward-ratio-in-forex-powerful-guide-for-traders/).

For more free tools and checklists, visit the [resource library](/blog/).
