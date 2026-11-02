---
title: "EA Optimisation for EURUSD M5: An Honest Testing Method"
slug: "9-powerful-mt4-ea-optimization-settings-for-eurusd-m5-to-boost-performance-fast"
description: "Why optimising an EA on EURUSD M5 often overfits the past, how to split data into in-sample and out-of-sample periods, and how to test settings before demo."
publishedAt: 2026-11-02T00:00:00.000Z
updatedAt: 2026-11-02T00:00:00.000Z
categories:
  - "EA Settings & Optimization Guides"
categoryPaths:
  - "/category/mt4-mt5-expert-advisors/ea-settings-optimization/"
tags: []
primaryKeyword: "mt4 ea optimization settings for eurusd m5"
quickAnswer: "Optimising an expert advisor on EURUSD M5 searches many setting combinations for the best past result, which usually fits noise rather than a real edge. Split the history into an in-sample period for searching and an out-of-sample period for checking, keep the number of tested settings small, and confirm the chosen setting on demo before any live use."
keyTakeaways:
  - "Optimisation finds the setting that fitted the chosen data best, which is not the same as the setting that will perform best next."
  - "Split the history into in-sample and out-of-sample periods before you search, and do not look at the out-of-sample result until the search is finished."
  - "Count every combination you test. The more you test, the more likely a good result is chance."
  - "M5 charts produce many trades and a large spread cost, so test with realistic spreads and commissions."
  - "A setting that performs well on one period and poorly on the next is overfitted, whatever the headline result says."
faqs:
  - question: "What is EA optimisation?"
    answer: "Optimisation is the process of running an expert advisor's backtest across many combinations of its input settings, then choosing the combination with the best result on the chosen history. The process is useful for understanding sensitivity, but it can easily fit noise."
  - question: "Why does EURUSD M5 matter in optimisation?"
    answer: "M5 produces many trades over a short period, so the backtest has many observations. That is helpful, but the spread cost is a larger share of each small move, and results can change sharply with small changes in spread or execution."
  - question: "What is overfitting?"
    answer: "Overfitting means a setting has learned the particular noise of a past period rather than a repeatable pattern. An overfitted setting shows strong results on the data used to find it and weak results on new data."
  - question: "What is an out-of-sample test?"
    answer: "An out-of-sample test runs the chosen setting on a period that was not used to search for it. It is the most basic check against overfitting, and it should be run once, with the setting fixed, before any conclusion is drawn."
  - question: "How many settings should I test?"
    answer: "Test as few as your idea needs. Each extra combination adds a chance of finding a good-looking result by accident. Write the list of tested settings in the journal, so the total number is known and can be considered when judging the result."
  - question: "Can optimised settings be trusted on live accounts?"
    answer: "Not without a demo period that uses the same settings, the same spread and the same lot size, with no further changes. Even then, results on a live account can differ, and the sizing should stay small until a long record exists."
sources:
  - label: "MetaTrader 4 trading platform help"
    url: "https://www.metatrader4.com/en/trading-platform/help"
  - label: "CFTC: consumer education on foreign currency trading"
    url: "https://www.cftc.gov/"
download:
  name: "Backtest honesty checklist (PDF)"
  origin: "own"
  license: "Free for personal and educational use"
  licenseUrl: "https://bestmt4ea.com/disclaimer/"
  version: "1.0"
  fileKey: "resources/backtest-honesty-checklist.pdf"
  updatedAt: 2026-11-02T00:00:00.000Z
---

## Why is optimisation so tempting?

Almost every expert advisor has inputs, and almost every input can be changed. A moving-average period, a stop distance, a trailing step, a session filter, a lot size: each one is a dial. The strategy tester built into MT4 can run the advisor across a range of those dials automatically, and it will report the combination that produced the best past result. Watching the tester scroll through hundreds of runs and stop on a curve that climbs steeply is one of the most persuasive experiences in retail trading.

That persuasion is the problem. The tester does not know which result is repeatable. It knows only which result was highest on the data you gave it. A setting that fitted the particular bars of a particular year will look excellent, because the search found it precisely because it fitted those bars. The same setting may then perform poorly on the next month, which the search never saw.

This guide explains why optimisation on EURUSD M5 is especially prone to this problem, how to split data so that the search is checked honestly, how to keep the number of tests under control, and how to move a chosen setting to demo without changing it. It does not promise that any setting will perform well, and it does not recommend a particular expert advisor. It describes a method for judging whether a result is worth trusting.

## Why is M5 a difficult timeframe for optimisation?

The five-minute chart produces a large number of trades. Over a year on EURUSD, a moderately active advisor may place thousands of orders, which sounds like a large and reassuring sample. The sample is large in count, but each trade is small in price movement, and the spread is a bigger share of each one than it would be on a higher timeframe.

Spread and commission are therefore decisive. A setting that targets a few pips may look profitable in a backtest that uses a fixed, narrow spread, and unprofitable on a live account where the spread widens around news or rollover. An optimiser that ignores that difference will favour settings that happen to be sensitive to the modelled spread, which is exactly the kind of fit that fails in live trading.

M5 also has a high density of noise. Many small reversals look like signals on the chart, and an advisor that trades them will produce a large number of marginal trades. Optimisation can then tune the settings to filter out the marginal trades that happened to lose in the past, and the filter may do nothing useful in the future.

## What does it mean to split the data?

Splitting the data means dividing the history into at least two periods. The first period is the in-sample set, which is used to search for settings. The second period is the out-of-sample set, which is kept aside and used only to check the setting you chose. The search must not see the out-of-sample period, and the out-of-sample result must not influence which setting is chosen.

A simple split uses the first two-thirds of the history for searching and the final third for checking. The split point should be chosen before the search begins, and it should be recorded in the journal. A split that is moved after a poor result has been seen is no longer a check.

Some traders prefer more than one out-of-sample period, so that a setting must perform acceptably across several separate stretches of time. That approach is more demanding, and it is a good discipline if the advisor is intended for long-term use. Whichever split you use, the rule must be written down and applied once.

## How do you keep the search small?

A search with many variables tested across many values can produce thousands of combinations. Even if none of them has a real edge, a few will look good by chance. The more combinations you test, the larger the apparent result of the best one, and the less that result tells you about the future.

A small search is therefore a discipline. Choose the two or three inputs that your strategy idea depends on most, and test only a short list of values for each. Write the full list of tested combinations in the journal, and count them. The count matters when you judge the best result, because a result that is the best out of several thousand deserves much less trust than one that is the best out of twelve.

Avoid searching the same data again and again with slightly different settings. Each cycle is another test on the same bars, and the risk of fitting the noise grows with every cycle. If a second search is needed, use a different period as the in-sample set, and record the change.

## How do you read an optimisation report?

The strategy tester produces a table of results, one row for each combination. The columns usually include the net profit, the profit factor, the drawdown and the number of trades. Sorting by net profit brings the highest result to the top, and that is the row most traders look at first.

Read the table more carefully. Look at the number of trades for each row, because a setting that trades rarely may show a high profit on a few lucky trades. Look at the drawdown, because a high profit with a deep drawdown may be hard to trade in practice. Look at the neighbouring settings, because a setting that sits alone at the top, with poor results on either side, is more likely to be fitted to noise than one that sits in a broad region of good results.

A robust setting usually has neighbours that perform reasonably well. If the best setting is surrounded by losing combinations, the advisor is sensitive to small changes, and that sensitivity will show up as losses when the live spread or the execution differs slightly from the model.

## What is the out-of-sample check?

Once the search is finished and a setting is chosen, run that setting once on the out-of-sample period, with no changes. Record the result. This is the moment the setting meets data it has not seen, and the result is the most honest estimate you have of how it will behave next.

If the out-of-sample result is much weaker than the in-sample result, the setting is probably overfitted. That does not mean the advisor is worthless, but it does mean the in-sample figure should not be quoted or relied upon. If the out-of-sample result is similar in direction and size, the setting has survived a first check, which is a useful but limited finding.

Do not go back and adjust the setting after seeing the out-of-sample result. Any adjustment makes that period part of the search, and it is then no longer an out-of-sample test. If the setting fails, the honest response is to accept the failure, record it, and either search again on a new in-sample period or abandon the approach.

## How should spread and commission be modelled?

Model the spread that your broker actually charges on EURUSD, not the figure from a single quote. Check the typical spread during the hours your advisor trades, and note how it widens around news releases and rollover. Use a fixed spread in the tester only as a simplification, and test the advisor again with a more realistic spread before drawing any conclusion.

Include commission where your account charges one, and include the swap if the advisor holds positions overnight. On M5, a small change in these costs can turn a profitable setting into a losing one, so the costs belong inside the test, not added afterwards.

Run a sensitivity check. Increase the spread in the tester by a small amount, such as one pip, and see how much the result changes. A setting whose profit collapses with a small increase in cost is fragile, and that fragility should be recorded and weighed.

## How does a demo test follow the optimisation?

Once a setting has survived the out-of-sample check, move it to a demo account with the same settings, the same lot size and the same broker conditions. Do not change any input during the demo period. A change during the demo is a new test, and the demo result should be judged on the setting as it was chosen.

Record every trade, including the time, the spread at entry and the reason the advisor opened it, if the advisor logs that. Compare the demo results with the out-of-sample result in trade count, average result per trade and drawdown. A close match is encouraging, and a large gap is a warning that the backtest model does not describe the live conditions.

Allow enough time. On M5, a few days may produce many trades, but the sample is still exposed to the conditions of those days. A demo period that spans several weeks, with varied news and volatility, gives a better picture than a short burst.

## What mistakes do traders make with optimisation?

The most common mistake is to stop at the first good-looking result. The second is to optimise on the full history and then describe the result as a test. The third is to change the settings after a poor demo period and treat the new run as if the old one never happened.

A quieter mistake is to read the tester's ranking as a recommendation. The tester sorts by the figure you choose, and it does not know your risk tolerance, your account size or your broker's conditions. The ranking is a list of past fits, not a list of settings to trust.

Finally, do not assume that a backtest is the same as a live result. The backtest uses the data it was given, the spread it was told to use and an execution model that may be far simpler than the real market. Each of those can differ on a live account, and the difference is the risk you are taking.

## What does a worked optimisation look like?

Imagine a search over three inputs of an advisor on EURUSD M5: a fast moving-average period with five values, a slow period with five values, and a stop distance with four values. That is one hundred combinations. The in-sample period covers the first two-thirds of the history, and the out-of-sample period covers the final third. The search runs only on the in-sample period, and the journal records all one hundred combinations before the first result is read.

The best in-sample row shows a net profit that looks impressive, with a profit factor well above one and a modest drawdown. Before accepting it, the trader looks at the neighbours. The setting sits in a small cluster of good results, but the rows one step away on either side lose money. That pattern suggests a fit to a few particular bars, not a broad region of strength.

The trader then selects a setting from the centre of the good region, a little less impressive on paper, and runs it once on the out-of-sample period. The result is positive but much smaller, with a higher drawdown. That is an honest outcome: the setting survived, with the in-sample figure overstating what the search found. The trader records both numbers, and notes that the out-of-sample sample is still small.

The example shows the sequence that matters. The count of tested combinations is known, the choice is made from the region rather than the peak, and the out-of-sample figure is reported beside the in-sample figure rather than replacing it.

## How do you tell a region from a peak?

A peak is a single setting that stands above its neighbours. A region is a group of adjacent settings that all perform reasonably well. A region is more likely to reflect a repeatable feature of the strategy, because small changes to its inputs do not destroy the result.

To check, sort the results in the table by the input values rather than by profit. Look at a small grid around the best row. If most of the grid is profitable, with gentle changes between neighbours, the setting sits in a region. If only the best row is profitable and the rest of the grid is flat or negative, the setting is a peak, and it should be treated with suspicion.

Regions do not always hold in the future, but they are a better starting point than peaks. A trader who chooses from a region accepts a lower in-sample figure in exchange for a setting that is less sensitive to small changes in the market.

## Why does the number of trades matter?

A high profit factor from a few trades is weak evidence. Ten trades can produce a large average by chance, and a single good week can drive the whole result. Before judging any row, check how many trades it produced. A common minimum for a first look is a few hundred trades across the sample, and the number should be stated beside every result.

On M5, the number of trades is usually large, so this check is less often a problem than on higher timeframes. It still matters for settings that filter heavily. A filter that cuts the trade count by ninety percent may look better on profit factor and worse on everything that depends on sample size, including the confidence interval around the result.

Record the trade count for every row you examine, and do not compare a setting with a thousand trades to one with forty as if they were equal evidence.

## What should the demo period measure?

The demo period measures whether the chosen setting behaves as the out-of-sample test suggested. It is not a second chance to optimise. Compare the demo results with the out-of-sample figures for trade frequency, average result per trade, drawdown and the spread paid per trade. A large difference in any of these is worth investigating before any further trading.

Pay attention to the trades that the backtest would not have predicted. Trades opened during news, during rollover or during a broker maintenance window may behave differently from the modelled bars. Record them, and check whether they cluster in a way that suggests a cost or execution effect the tester did not include.

Finally, decide in advance how long the demo period will run and what result will count as a pass, and write that standard into the journal before the first demo trade is placed. A standard set after the results are visible is not a standard at all, and it cannot protect the account from the decision it was supposed to inform. A period of several weeks, with a standard written in the journal, prevents the common habit of extending a demo until it looks good.

## How do you record the search so it can be reviewed?

A search record is a short document kept with the results. It states the advisor and its version, the in-sample and out-of-sample periods, the list of inputs and their values, the total number of combinations, the spread model and the commission. It also states the selection rule, such as choosing from the centre of the largest region of positive results, and the reason that rule was chosen.

Keep the record unchanged after the search is finished. If you later change the selection rule or the settings, write a new record rather than editing the old one. A reviewer, or your future self, should be able to see exactly what was tested and what was chosen, and when.

## How do you handle a setting that fails out of sample?

A failed out-of-sample test is common, and it is valuable. It tells you that the search found something specific to its own period. The temptation is to run the search again with a different split until the new check passes. That approach turns the out-of-sample period into part of the search, and it removes the protection the split was meant to provide.

The honest options are narrower. You can accept the failure and abandon the setting. You can change the idea behind the advisor, write a new hypothesis and test it on a fresh in-sample period. Or you can keep the failed result in the journal as evidence that the search was overfitted, and move on. All three are legitimate. Re-splitting the same data until it passes is not.

Record the failed run with the same care as a passed one. A journal that holds only successful tests gives a false picture of how often the method works, and a future reviewer will be misled by it.

## Why should the spread be tested at more than one level?

A single spread assumption is a single bet on the cost of trading. Real spreads on EURUSD vary through the day and across news, and an advisor that depends on a narrow spread may be exposed to a wide one at the worst possible moment. Testing at two or three spread levels, such as the typical figure and a higher figure for the busiest hours, shows how much the result depends on that cost.

If the result survives a moderately higher spread, the setting has a margin of safety. If it collapses, the setting is fragile, and the fragility should be treated as part of the risk. The sensitivity check does not need to be complicated. Run the chosen setting twice, once at the modelled spread and once at a higher figure, and record both results beside each other in the journal.

## How does the choice of data period change the result?

The period you choose for the search shapes the result as much as the settings do. A history that includes a strong trend will reward settings that follow trends, and a history dominated by ranges will reward settings that fade moves. Neither is a fault of the advisor, but either can make a search look successful for reasons that will not carry forward.

Check the character of each period before the search begins. Note the broad direction of the market, the typical daily range and the number of news events in the window. Record these facts in the search record, so a later reader can see whether the in-sample period was unusual. If the out-of-sample period differs sharply in character from the in-sample period, a failure there may reflect the change in conditions rather than overfitting, and that distinction should be written down.

This is a reason to use more than one out-of-sample period where possible, and to write down, before the search, which kinds of market the chosen periods cover and which they leave out. Settings that hold across periods of different character are more robust than those that hold only in one kind of market.

## What does this guide not promise?

This guide does not promise that any EA setting will perform well on EURUSD M5, and it does not claim that optimisation is useless. Used honestly, optimisation shows how sensitive a strategy is to its inputs, and that sensitivity is valuable information. Used carelessly, it produces confident-looking numbers that describe the past and nothing else.

The guide also does not endorse any expert advisor. The method applies to any advisor, and the result of applying it may be that the advisor does not meet the standard. A failed test is a useful result, and it should be recorded in the same way as a passed one.

## What is the offer in this guide?

The offer is the backtest honesty checklist, a printable checklist of the checks that a backtest should pass before it is trusted. It covers the data split, the number of tests, the spread model, the out-of-sample run and the demo conditions. Work through it for every optimisation you run, and keep the completed checklist with the results.

The checklist does not improve any result. It makes it harder to present a fitted result as a tested one, which is the main purpose of the method described in this guide.

## How do you start this week?

Start by choosing the one or two inputs your strategy idea depends on, and write a short list of values to test for each. Count the combinations and write the number in the journal. Choose the in-sample and out-of-sample split and record it before you run anything.

Run the search on the in-sample period only. Choose a setting from the broad region of good results, not from the single best row. Then run that setting once on the out-of-sample period, and record the result without changing anything.

If the out-of-sample result survives, move the setting to a demo account and run it unchanged for several weeks. For the statistics behind judging a set of trades, read the [Monte Carlo testing guide](/monte-carlo-test-for-mt4-backtesting-the-complete-robustness-guide-for-traders/), and for risk-adjusted measures the [Sortino ratio guide](/how-to-calculate-sortino-ratio-for-forex-eas-7-powerful-steps-to-improve-trading-performance/). The [risk-reward guide](/how-to-calculate-risk-reward-ratio-in-forex-powerful-guide-for-traders/) explains how to check whether the stop and target make sense before a setting is accepted.

For more free tools and checklists, visit the [resource library](/blog/).
