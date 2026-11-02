---
title: "Free Tools for Analysing MT4 EA Drawdowns"
slug: "10-best-free-tools-for-analyzing-mt4-robot-drawdowns-powerful-guide-for-safe-forex-trading"
description: "Measure an EA's drawdown from MT4 reports and a spreadsheet, understand depth and duration, and stress test the worst case before sizing a live account."
publishedAt: 2026-11-02T00:00:00.000Z
updatedAt: 2026-11-02T00:00:00.000Z
categories:
  - "EA Settings & Optimization Guides"
categoryPaths:
  - "/category/mt4-mt5-expert-advisors/ea-settings-optimization/"
tags: []
primaryKeyword: "free tools for analyzing mt4 robot drawdowns"
quickAnswer: "Drawdown is the fall from a peak in account equity to the next low, and it is the figure that tests whether an expert advisor is survivable. You can measure it from MT4's built-in statement, a spreadsheet of closed trades, or a simple stress test. Measure both depth and duration, and check the worst case rather than the average before deciding whether the advisor's risk fits your account."
keyTakeaways:
  - "Drawdown is measured from a peak in equity to the following trough, and it is shown as an amount and as a percentage."
  - "Maximum drawdown is the largest such fall in the sample, and recovery time is how long the account took to return to the peak."
  - "The MT4 report gives a starting point, but a spreadsheet built from the trade list lets you check the figures and test scenarios."
  - "A stress test scales the worst observed losing run to a larger one, to see whether the account would survive a worse period."
  - "Judge an advisor by the worst drawdown you can accept, not by the average result."
faqs:
  - question: "What is drawdown in an EA report?"
    answer: "Drawdown is the decline in account equity from a high point to a later low. A report shows the maximum drawdown, which is the largest such decline in the period, usually in money and in percent of the balance."
  - question: "Where do I find drawdown in MT4?"
    answer: "The Account History and the Report tab in the terminal show the statement. Look for the maximum drawdown lines in the summary. The figures depend on the period and on whether the report counts balance or equity, so check the definition the report uses."
  - question: "Why does recovery time matter?"
    answer: "A drawdown of a given depth can take a long time to recover, during which the account is exposed and the trader may lose patience. The recovery time tells you how long the strategy can stay below its peak, which is a practical measure of endurance."
  - question: "Is a small drawdown in a backtest reassuring?"
    answer: "Only if the backtest is honest. A small drawdown from a short history, with a fixed spread and no stress test, can be a poor guide to the worst period the advisor will meet. Check the length of the sample and the conditions it covers."
  - question: "What is a stress test for an EA?"
    answer: "A stress test takes the worst losing run in the sample and asks what happens if a larger or longer run occurs. It shows the drawdown and the margin needed to survive, and it helps decide whether the lot size is safe for the account."
  - question: "Do I need paid software to analyse drawdown?"
    answer: "No. A spreadsheet and the trade list from the terminal are enough for most of the work described here. Paid tools may save time, but they do not change the definition of drawdown, and their output still needs checking."
sources:
  - label: "MetaTrader 4 trading platform help"
    url: "https://www.metatrader4.com/en/trading-platform/help"
  - label: "CFTC: consumer education on foreign currency trading"
    url: "https://www.cftc.gov/"
download:
  name: "Grid EA drawdown stress test (PDF)"
  origin: "own"
  license: "Free for personal and educational use"
  licenseUrl: "https://bestmt4ea.com/disclaimer/"
  version: "1.0"
  fileKey: "resources/grid-ea-drawdown-stress-test.pdf"
  updatedAt: 2026-11-02T00:00:00.000Z
---

## Why is drawdown the number that matters most?

Traders often judge an expert advisor by its profit. A report that shows a large net gain for the period looks like a success, and the headline figure is easy to remember. Drawdown tells a different and more useful story. It measures how far the account fell from its best point before recovering, and it shows whether the advisor could have been survived by a real person with real money in the account.

An advisor with a high profit and a deep drawdown may be impossible to trade. The account can fall so far that the trader stops the advisor during the fall, locking in the loss, or the margin required for the open positions can trigger a stop-out. In either case the profit in the report never reaches the account. Drawdown is therefore the first test of whether a result is usable.

This guide explains how to measure drawdown from the tools that already exist on your computer, including the MT4 statement and a spreadsheet, how to read depth and duration, and how to run a simple stress test. It recommends categories of method rather than particular products, because a free tool's output still has to be checked, and the method is what makes the check possible.

## What exactly is drawdown?

Drawdown is a fall in equity from a peak to a later trough. Equity is the account balance plus or minus the floating profit or loss on open trades. If the equity rises to 10,000 and then falls to 8,500 before climbing again, the drawdown is 1,500, which is 15% of the peak.

Two measures are commonly reported. Maximum drawdown is the largest peak-to-trough fall in the sample. Relative drawdown expresses that fall as a percentage of the peak, which makes it easier to compare accounts of different sizes. Both figures depend on the period and on whether the calculation uses balance or equity, so the definition should be checked before any comparison is made.

It is also useful to track the running drawdown, which is the fall from the most recent peak at any moment. The running figure shows how exposed the account was on each day, not only at its worst point, and it reveals how often the account spent time below its high.

## How do you read the MT4 statement?

The MT4 terminal produces a statement for the account history. The summary includes the net profit, the number of trades, the profit factor and figures for drawdown. The lines are labelled as absolute and relative, and the statement names the period it covers. Read the definition in the statement before quoting any number.

The statement is a useful starting point, but it is a summary. It does not show the sequence of losses, the length of each fall, or the time it took to recover. For those details, you need the list of trades in order, which the account history tab can export. The list is the raw material for any further analysis.

Note the account type and the leverage in place during the test. A drawdown measured on a large balance with low lot sizes is not comparable with one measured on a small balance with high lot sizes, even if the percentages look similar. Record those conditions with the statement, so the figure can be understood later.

## How do you build a drawdown sheet in a spreadsheet?

A drawdown sheet starts with the closed trades, one row per trade, in the order they closed. Include the close time, the profit or loss, and any commission and swap. Add a column for the cumulative equity, which is the starting balance plus the running total of results. Then add a column for the running peak, which is the highest cumulative equity so far.

The drawdown for each row is the peak minus the current equity, and the percentage is that difference divided by the peak. The maximum drawdown is the largest value in the drawdown column. The recovery time is the number of rows between the trough and the first row where the equity again reaches the peak. These formulas are simple and can be checked against the statement.

Build the sheet once and keep the formulas visible, so the calculation can be audited. If your sheet and the MT4 statement disagree, find the difference before drawing any conclusion. A common cause is a difference in how swaps or commissions are counted, and the difference should be recorded in the notes.

## What is the difference between depth and duration?

Depth is how far the account fell. Duration is how long it stayed below its peak. Both matter, and they measure different things. A shallow drawdown that lasts for months can be harder to endure than a deep one that recovers in a week, because the trader must keep trading through a long period of disappointment.

Record both for every major drawdown in the sample. A simple table with the start date, the trough date, the recovery date, the depth in money and in percent, and the number of trades in the fall is enough. The table shows whether the advisor tends to produce short sharp falls or long slow ones.

Watch for drawdowns that do not recover at all within the sample. A period that ends below the peak is an open drawdown, and it should be reported as such. An advisor whose sample ends in an open drawdown has not yet demonstrated recovery, and that uncertainty belongs in the judgement.

## Why should the worst drawdown matter more than the average?

The average drawdown can be small even when the worst drawdown is very large. A sample with many small falls and one very deep fall will show a modest average, and that average hides the risk that a trader would face in the bad period. The worst case is the one that tests the account.

Ask a direct question of the sample: what was the largest drawdown, and could I have survived it with the account and the lot size I plan to use? If the answer is no, the advisor is not suitable at that size, however good its average looks. Lower the lot, use a larger account or do not use the advisor.

Be honest about the limits of the sample. A history of one year may not contain the worst period the advisor will ever meet. The worst observed drawdown is a lower bound on the worst possible, and that is the reason for the stress test described below.

## What is a stress test, and how do you run one?

A stress test asks what would happen if the worst observed losing run were larger or longer than in the sample. It does not predict the future. It shows the consequences of a scenario that the history may not contain, so that the lot size can be chosen with a margin of safety.

To run a simple stress test, take the worst losing run in the sample, measured in money, and multiply it by a factor, such as two or three. Subtract the result from the account balance, and check whether the account still has enough margin to hold the open positions at that level. If the account would reach its stop-out level, the lot size is too large for the scenario.

A second scenario asks how long a losing run could last. Take the longest run of losing trades, and extend it. Multiply the average loss per trade by the extended number of trades and check the total. The result shows whether the account could survive a long period of losses, even if each individual loss is small.

The grid drawdown stress test included with this guide sets out these scenarios in a printable form. It is most useful for advisors that add to losing positions, because the exposure in those cases grows with each step.

## How do leverage and margin interact with drawdown?

Leverage determines how much margin an open position requires. High leverage lets a trader open a large position with a small deposit, and it also means that a moderate fall in price can use up most of the free margin. Drawdown in equity and margin level are linked, and a deep drawdown can trigger margin calls before the trader expected them.

When you run a stress test, include the margin figures, not only the equity figures. Check the margin level at the worst point of each scenario, and compare it with the stop-out level in the broker's contract. The margin analysis often shows a limit that the equity analysis does not, especially on accounts with high leverage.

The [leverage guide](/7-powerful-reasons-why-the-best-leverage-for-beginners-in-forex-leads-to-safer-profits/) explains how margin is calculated, and it is a useful reference when setting the stress test scenarios.

## What tools can you use without paying?

Several free methods are enough for most traders. The MT4 statement and the account history give the basic figures. A spreadsheet built from the trade list gives the running drawdown, the recovery times and the stress scenarios. A text file with the trade list, if the platform exports one, can be imported into the spreadsheet for analysis.

Free online calculators and free trials of paid tools exist, and some are useful. Before relying on any of them, check how they define drawdown, whether they count balance or equity, and how they treat commissions and swaps. A tool that uses a different definition will give a different number, and the difference should be understood before any decision is taken.

The advantage of building the sheet yourself is that you know exactly what it calculates. The disadvantage is that it takes time. For a beginner, the time is usually worth spending, because the process teaches the structure of the risk.

## How do you compare advisors fairly?

Compare advisors on the same period, with the same starting balance, the same lot rule and the same spread assumption. An advisor tested on a volatile year and another tested on a quiet year cannot be compared on drawdown without adjustment. Record the conditions of each test beside its result.

Compare the depth, the duration, the recovery time and the stress outcome of each advisor, not only the headline figure. A table with these columns makes the comparison clearer. An advisor that wins on profit but loses on the stress test is weaker for a small account than one that earns less and survives the worst case.

## What mistakes do traders make with drawdown?

The most common mistake is to report the net profit and leave out the drawdown. A second is to measure drawdown on a short sample and treat the result as the limit. A third is to forget that drawdown is measured on equity, not on balance, and to misread a report that uses one definition as if it used the other.

A fourth mistake is to ignore the open drawdown at the end of the sample. An advisor that ended in a deep open fall may look fine on a report that counts only closed trades. A fifth is to change the lot size mid-sample, which changes the drawdown and makes the period impossible to compare with others.

## How do you read a drawdown chart?

A drawdown chart plots the running drawdown against time, with the percentage fall shown below the equity peak. Read it from left to right. Each downward slope is a fall, and each return to zero is a recovery. The depth of each valley is the drawdown, and the width of the valley is the duration. A chart of this kind shows at a glance how often the account was below its peak and for how long.

Look for patterns in the shape. A series of similar, shallow valleys suggests a steady strategy with frequent small losses. A single deep valley followed by a long recovery suggests a strategy that depends on a few large wins. A valley that deepens in steps, each new fall starting before the last one recovered, suggests that the advisor is adding exposure during a losing period, which is the pattern to examine most closely.

Label the deepest valley on the chart and record its dates. That valley is the scenario the stress test should start from, because it is the worst event the sample contains.

## What should a drawdown review record for each episode?

A drawdown episode is a single fall from a peak to its recovery, or to the end of the sample if it has not recovered. For each episode, record the peak date and balance, the trough date and balance, the recovery date, the depth in money and percent, the number of trades in the episode, the largest single loss within it, and whether the advisor changed its lot size during the fall.

These records make it possible to compare episodes objectively. Over several episodes, the table often shows whether the largest falls came from a single bad trade, from a run of ordinary losses, or from a change in the advisor's behaviour. Each of those causes calls for a different response.

Keep the episode table in the same workbook as the drawdown sheet, so that it updates when new trades are added. A table that is maintained by hand tends to fall behind the data, and an out-of-date review is of little use.

## How do you check whether a drawdown came from one trade?

A single large loss can create a deep drawdown that looks like a strategy problem when it is actually an outlier. To check, remove the largest single loss from the sample and recalculate the drawdown. If the depth falls sharply, the drawdown depended on that trade, and the question becomes whether such a trade can recur.

Look at the cause of the outlier. Was the stop too wide, was there a news release, was there a gap, or was the lot size larger than normal? The answer tells you whether the outlier is a risk the advisor takes on purpose, which must be accepted or limited, or an accident of execution that should be investigated.

Be careful not to delete outliers from the record. Removing them to improve the figure is a form of manipulation. The recalculation is a test of dependence, and the original figure should remain in the report alongside it.

## How do you run a second, independent check?

An independent check reduces the chance of a spreadsheet error. Ask a colleague, or a second version of yourself after a day, to rebuild the drawdown from the same trade list without seeing the first result. Compare the maximum drawdown, the recovery dates and the episode count. Disagreements point to a formula error or a difference in definition, and both are worth finding.

Keep a checksum for the trade list, such as the total profit and the number of trades. If the list changes, the checksum changes, and the old drawdown figure can no longer be quoted without a note. A checksum is a simple discipline that prevents a stale result from being presented as current.

## How do you connect drawdown to position sizing?

Position sizing is the bridge between a drawdown figure and a decision about the account. The worst drawdown in the sample, expressed as a percentage of the balance at a given lot size, tells you what the account would have experienced. If the lot size were doubled, the same sequence of trades would produce roughly twice the drawdown in money, and the question becomes whether that doubled figure is acceptable.

A useful exercise is to calculate the lot size at which the worst observed drawdown would equal a chosen limit, such as a fraction of the balance that you are prepared to lose in a bad period. That lot size is a ceiling, not a target. It also leaves room for a worse period than the sample contained, which is why the stress test matters. Choose a size below the ceiling, record the reason, and revisit it when the account balance changes.

Remember that drawdown scales with lot size but recovery time does not scale in the same way. A larger lot shortens the time to recover in a winning period but lengthens the exposure in a losing one. The trade-off is a judgement that belongs in the review, not something the arithmetic settles alone.

## What do you do when the drawdown is too large?

When the worst drawdown is larger than your limit, there are three honest options. You can reduce the lot size until the scenario fits the limit. You can increase the account balance, which reduces the drawdown as a percentage, though it does not reduce the money at risk per trade. Or you can decline to use the advisor at that size, and look for an approach whose history fits your standard.

A second check worth making is to ask whether the same limit would have held in a different sample, such as the first half of the history alone. If the limit is breached in one half and not the other, the account's tolerance depends on the market conditions, and that dependence should be written into the plan. Avoid the temptation to adjust the limit to fit the result. A limit set after seeing the drawdown is no longer a limit. Write the standard before the review, and apply it honestly, including on the occasions when the answer is inconvenient and the account balance would prefer a different one. A standard that is applied only when it is convenient is not a standard, and the record will show that gap clearly to anyone who reads it later. If the advisor fails the standard, record the failure, and keep the record with the sample it came from.

## How often should the drawdown review be repeated?

A drawdown review is not a one-time task. Repeat it at a fixed interval, such as each month for an active advisor and each quarter for a slower one, and repeat it whenever the account balance, the lot size or the broker changes. Each repetition adds the new trades to the sheet, recalculates the episodes and updates the stress test against the new worst case.

Keep the dates of each review in the journal. A series of reviews shows whether the drawdown is growing, stable or shrinking over time, and that trend is often more informative than any single figure. A rising worst drawdown across reviews is an early warning that the advisor's behaviour may be changing, and it deserves a fresh look before the next trade. Record the reason for each review in one line as well, so the reasons are visible when the trend is read. A review that finds nothing new is still worth recording, because a long run of unchanged figures is itself evidence about how stable the advisor has been, and it shows that the review was carried out rather than skipped. Keep the record in the same place each time, so the series can be read in one view, and so that a missing review stands out at a glance.

## What does this guide not promise?

This guide does not promise that any expert advisor will keep its drawdown within a given limit in the future. A historical drawdown describes the past sample, and the worst period may be ahead. The stress test reduces the risk of surprise but cannot remove it.

The guide also does not endorse any particular tool or advisor. The methods described here work with free sources and can be applied to any advisor, and the result may be that an advisor does not meet your standard.

## What is the offer in this guide?

The offer is the grid EA drawdown stress test, a printable worksheet for testing the worst case of an advisor that adds to losing positions. It covers the settings audit, three failure scenarios and the margin and stop-out arithmetic. Work through it with the trade list and the spreadsheet from this guide.

The worksheet does not compute the drawdown for you. It gives you the structure for asking the right questions, and it records the answers, so that the decision on lot size can be defended later.

## How do you start this week?

Start with one advisor and its account history for the longest period you have. Export the trade list, and build the drawdown sheet with the cumulative equity, the running peak and the drawdown column. Check the maximum drawdown against the MT4 statement, and note any difference.

Then list the drawdowns by depth and duration, and identify the worst. Run the simple stress test on that worst run, and check the margin level at the worst point. Record the result, and decide whether the lot size fits the account. For the statistics behind judging a sample, read the [Monte Carlo testing guide](/monte-carlo-test-for-mt4-backtesting-the-complete-robustness-guide-for-traders/), and for the return measures the [Sortino ratio guide](/how-to-calculate-sortino-ratio-for-forex-eas-7-powerful-steps-to-improve-trading-performance/).

For more free tools and checklists, visit the [resource library](/blog/).
