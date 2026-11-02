---
title: "Bollinger Band Width: A Squeeze Strategy Explained"
slug: "bollinger-band-width-indicator-trading-strategy"
description: "How Bollinger Band width measures volatility, what a squeeze does and does not tell you, and how to test a squeeze breakout rule on demo with a tracker."
publishedAt: 2026-11-02T00:00:00.000Z
updatedAt: 2026-11-02T00:00:00.000Z
categories:
  - "Technical Analysis"
categoryPaths:
  - "/category/technical-analysis/"
tags: []
primaryKeyword: "bollinger band width indicator strategy"
quickAnswer: "Bollinger Band width measures how far apart the upper and lower bands sit, relative to the middle band. When the width falls to a low for its recent history, volatility is compressed, a state traders call a squeeze. A squeeze does not show direction. Test a written breakout rule on demo, track every squeeze in a log, and judge the method only after a large enough sample."
keyTakeaways:
  - "Band width is the distance between the upper and lower bands, divided by the middle band, shown as a percentage."
  - "A squeeze is a low reading of band width compared with its recent history, not a fixed number."
  - "A squeeze shows that volatility is low. It does not show which way the next move will go."
  - "A breakout rule needs an entry, a stop, a target and a rule for false breaks, all written before the test."
  - "Track every squeeze, including the ones that never break out, so the sample shows the full picture."
faqs:
  - question: "What is Bollinger Band width?"
    answer: "It is the difference between the upper and lower Bollinger Bands divided by the middle band, usually shown as a percentage. It rises when price moves more widely and falls when price is quiet, which makes it a simple measure of relative volatility."
  - question: "What is a Bollinger squeeze?"
    answer: "A squeeze is a period when band width is at a low for its recent history, often the lowest value over the last several months of bars. It means volatility is compressed. It does not predict the direction of the next move."
  - question: "Does a squeeze tell me which way price will break?"
    answer: "No. A squeeze tells you that a large move is possible, not which direction it will take. Direction has to come from a separate rule, such as a close beyond a level, and that rule must be tested independently."
  - question: "How many bars should I use for the squeeze lookback?"
    answer: "Many traders use the last 100 to 150 bars, but the number is a choice you must write down before the test. Change it only at the start of a new sample, because a different lookback produces a different set of squeezes."
  - question: "Is the Bollinger squeeze a reliable strategy?"
    answer: "No strategy is reliable by definition. A squeeze rule can be tested, and the test may show a useful pattern or none at all. Many squeezes end without a clear breakout, and the failures should be counted in the record."
  - question: "What default settings does the tracker use?"
    answer: "The tracker uses a 20-bar simple moving average for the middle band and two sample standard deviations for the outer bands, which matches the common default. You can change the period in the formulas, but record the change in your journal."
sources:
  - label: "CFTC: consumer education on foreign currency trading"
    url: "https://www.cftc.gov/"
  - label: "MetaTrader 4 trading platform help"
    url: "https://www.metatrader4.com/en/trading-platform/help"
  - label: "Investor.gov: the US SEC investor education site"
    url: "https://www.investor.gov/"
download:
  name: "Bollinger band width tracker (Excel)"
  origin: "own"
  license: "Free for personal and educational use"
  licenseUrl: "https://bestmt4ea.com/disclaimer/"
  version: "1.0"
  fileKey: "downloads/bollinger-band-width-tracker.xlsx"
  updatedAt: 2026-11-02T00:00:00.000Z
---

## Why do traders watch the width of the bands?

Bollinger Bands are one of the most common indicators on a forex chart. They draw a middle line, usually a 20-period simple moving average, and two outer lines placed a set number of standard deviations above and below it. The outer lines widen when price moves sharply and narrow when price settles. Many traders watch the bands to judge whether price is stretched or quiet.

Most of the attention goes to price touching the outer bands. Band width, the measure of how far apart the bands sit, receives less attention, though it carries a different and arguably more useful message. Width tells you how volatile the market has been relative to its recent past, and that information is the basis of the squeeze idea discussed in this guide.

This guide explains how band width is calculated, what a squeeze is and is not, how to write a breakout rule that uses a squeeze, and how to test it on a demo account with the tracker. It does not promise that a squeeze will be followed by a profitable move. It treats the idea as a hypothesis, and it sets out the work needed to test it fairly.

## How is Bollinger Band width calculated?

The middle band is the simple average of the last twenty closing prices. The standard deviation is calculated over the same twenty closes, and the upper band is the middle band plus two standard deviations. The lower band is the middle band minus two standard deviations. Each band therefore moves with the price, and their spread reflects how dispersed the recent closes have been.

Band width is the upper band minus the lower band, divided by the middle band, and multiplied by one hundred to show a percentage. Dividing by the middle band makes the measure relative. A width of 1% on a pair at 1.1000 and a width of 1% on a pair at 150.00 both describe the same proportional volatility, which allows comparison across instruments and across time.

The tracker in this guide performs the same steps for every row you enter. Enter one closing price per row, oldest first, and the sheet calculates the middle band, the two standard deviations, the outer bands and the width. The formulas start on the twentieth row, because a 20-period average needs twenty closes before it exists.

## What is a squeeze?

A squeeze is a period when band width is low compared with its own recent history. It is a relative judgement. A width of 0.8% may be a squeeze on one pair and an ordinary reading on another, depending on how volatile each has been. The tracker defines a squeeze as the lowest width in the last 120 rows, which makes the definition consistent across pairs and periods.

A squeeze means that recent closes have been tightly clustered, and that volatility is compressed. Markets do not stay compressed indefinitely, and many traders watch squeezes because a period of low volatility is often followed by a period of higher volatility. That is a tendency to test, not a law, and some squeezes end quietly without any large move.

Note what a squeeze does not tell you. It does not say which way price will move. It does not say how far the move will go. It does not say when the move will start. Those questions need separate rules, and each must be tested on its own. A squeeze is the condition under which a rule might apply, not the rule itself.

## How do you write a squeeze breakout rule?

A breakout rule describes the entry, the direction and the exit. A simple version might read as follows. On the one-hour chart, identify a squeeze as defined by the tracker. Mark the high and the low of the last ten bars that formed the squeeze. If price closes above the high, consider a buy. If price closes below the low, consider a sell. Place the stop on the other side of the box, and set the target at twice the stop distance.

The rule must also say what happens when the breakout fails. A common approach is to exit if price closes back inside the box within a fixed number of bars. Without this rule, the test will include trades that were already invalid, and the result will be distorted. Write the failure rule in the journal before the sample begins.

The rule should also state what to do about news. A squeeze often ends on a scheduled release, and the breakout can be sharp and short-lived. Decide in advance whether to skip signals within thirty minutes of a high-impact event, and record every skipped signal, so the effect of the filter can be measured later.

## How do you test the rule on demo?

A fair test uses the same spread and lot size you plan to trade live. It covers both trending and quiet conditions, because a squeeze rule might work in one and fail in the other. Choose one pair and one timeframe for the whole sample. Changing the pair or the timeframe in the middle of a test makes the result impossible to interpret.

For each squeeze, record the date, the width value, the box high and low, and whether a breakout occurred. If a breakout occurred, record the direction, the entry, the stop, the target, the exit and the R-multiple. If no breakout occurred, record the squeeze as expired, and note how many bars passed before it ended. Expired squeezes are a large part of the sample, and they must be counted.

Judge the sample after it contains at least thirty closed trades. Calculate the win rate, the average R-multiple and the profit factor. Compare the trades that followed squeezes with the trades in the same period that did not, to see whether the squeeze is adding information beyond the general movement of the market.

## Why do most squeezes not produce a clean breakout?

Many squeezes end without a clear move. Price drifts in the box, then reverses, then drifts again, and the squeeze expires without a decisive close outside it. A trader who takes every apparent breakout will see many small losses from false breaks, and the win rate can look poor even when the squeeze idea has some value.

False breaks are common in quiet periods, because a small number of orders can move price past a level and then withdraw. A close outside the box does not always mean the market has chosen a direction. The rule for confirmation, such as waiting for a second close or requiring a minimum distance beyond the box, is designed to reduce that noise, but it also reduces the number of trades.

The honest response is to test the confirmation rules as part of the method. Record the false breaks, measure how many there were, and compare the results with a rule that waits for confirmation. The difference shows whether the extra delay is worth the cost in missed trades.

## How do spreads and costs affect a squeeze trade?

A squeeze often produces a narrow box, and a narrow box means a small stop distance. A small stop combined with a fixed spread can make the cost of the trade large in relation to the risk. A box of 15 pips with a spread of 2 pips spends more than a tenth of the stop on entry, and that cost reduces the effective reward of the trade.

Measure the spread at the time of each signal, not only the average. Spreads often widen around the events that tend to end squeezes, so the cost at the moment of breakout may be higher than the normal figure. Record the spread in the journal for every trade, and include it in the R-multiple calculation.

Swap charges apply when a squeeze trade is held past the broker's rollover time. A breakout that runs for several days accumulates a financing cost, and the test should include it. The result after all costs is the figure that matters for a live account, and a method that looks profitable before costs may not be after them.

## How does a squeeze compare with other volatility tools?

Band width is one of several volatility measures. The average true range measures the typical size of each bar, and a falling average true range also indicates quiet conditions. The standard deviation of returns measures dispersion directly. Each gives a slightly different view of volatility, and they often agree in broad terms.

The advantage of band width is that it is simple to calculate and easy to see on a chart. The disadvantage is that it depends on the twenty-period average and on the two-standard-deviation setting, so a change to either changes the squeeze. A test should record the settings, and the same settings should be used for the whole sample.

Compare the squeeze rule with a simpler volatility filter, such as a rule that trades only when the average true range is above a threshold. If the simpler filter performs as well, the extra complexity of the bands may not be needed. Testing the alternatives is a sound habit, and it keeps the method honest.

## What does a month of squeeze testing look like?

In week one, set up the tracker on one pair and one timeframe with at least two hundred bars of history, and mark every squeeze by hand before you look at the breakouts. Record the box and the width for each. The aim is to see how often squeezes occur and how long they last, without yet trading them.

In week two, write the breakout rule, the failure rule and the news rule, and test them on the historical squeezes you have marked. Record each hypothetical trade in the log, and check the rule against the chart for mistakes. Do not change the rule to improve the result on the historical data, because that would fit the rule to the past.

In week three, open a demo account and trade the rule, using the spread and lot size from your plan. Record every squeeze, including the expired ones, and every trade. In week four, review the sample, split it by news period and by trend, and read the losing trades. Decide whether the rule deserves a longer test, or whether it should be set aside.

## How do you read a squeeze on a chart, step by step?

Start with the chart and the tracker side by side. Find the most recent bar and look at its width value in the tracker. Then look back over the last one hundred and twenty bars and find the lowest width in that window. If the current width equals that lowest value, the bar is in a squeeze under the rule in this guide. If it is above the lowest value, the market is not compressed by this definition, however quiet it may look by eye.

Next, look at the shape of the bands. In a squeeze, the upper and lower bands run close together and often look nearly flat. Price tends to oscillate around the middle band without touching either outer band for a period. That visual pattern is useful, but it is a description of the same information the width measures, so it does not add a separate test.

Mark the high and the low of the squeeze. Use the last ten bars that formed the compression, or another fixed number that you have written down. These two levels become the boundaries of the box that the breakout rule uses. Draw them on the chart, note the time, and do not move them after the first trade is taken.

Finally, check the broader context on a higher timeframe. A squeeze on the one-hour chart that sits inside a strong daily trend is a different event from one that sits in a range on the daily. Record the higher-timeframe trend in the journal, so the sample can be split later. Where the box sits on a known level, the same care used to draw [support and resistance](/how-to-identify-support-and-resistance-in-forex-proven-strategies-for-traders/) applies, because a box drawn at a level you can name is easier to defend than one drawn at random.

## What does a squeeze look like in a worked sample?

Imagine a sample on the one-hour chart of EURUSD. Over the last one hundred and twenty bars, the lowest width is 0.82%, and the current bar reads 0.84%. The tracker does not mark the current bar as a squeeze, because it is not the lowest value. On the next bar the width falls to 0.81%, which is the new lowest in the window, so the tracker marks a squeeze.

The trader marks the high and the low of the last ten bars. Suppose the box runs from 1.0872 to 1.0903, a range of 31 pips. The breakout rule says to buy on a close above 1.0903 and sell on a close below 1.0872. Over the next six bars, price stays inside the box, and then one bar closes at 1.0916, above the top. The rule calls for a buy at the next open, with the stop placed back inside the box at 1.0890 and a target twice the stop distance.

That trade is one row in the log. The record also includes the spread at entry, which was 1.5 pips, and the R-multiple of the result when the trade was closed. If the price had instead stayed inside the box for twenty bars and then drifted out in the other direction, the squeeze would have been recorded as a breakout in the opposite direction, or as expired, depending on the rule. The example shows that the rule must be written precisely, or the same chart can be logged in several ways.

## How do you separate a squeeze from an ordinary quiet market?

An ordinary quiet market is one where volatility is low but not at the lowest level of its recent history. The width may be near average for the quiet period, and the bands may still be moderately apart. The tracker treats such a market as ordinary, because only the lowest reading in the window counts as a squeeze.

The distinction matters because the two conditions may behave differently. A squeeze defined as the lowest width in six months is a rarer and more extreme condition than a quiet week in a moderately volatile market. A rule that trades both will mix two populations, and the results will be hard to interpret. Keep the definition strict, and record any near-squeezes separately, as you would with rejected patterns.

Be aware of the effect of the lookback. A longer window makes the squeeze rarer and more extreme. A shorter window makes it more common and less meaningful. Choose the lookback before the test, record it in the journal and keep it fixed. A change in the lookback is a new test, and the old sample cannot be reused for it.

## What does a losing squeeze teach you?

A losing squeeze is common, and it should be read as carefully as a winning one. The first question is whether the breakout rule was followed exactly. Was the close beyond the box, or was the trade taken on an intrabar touch? Was the entry at the next open, or was it taken earlier than the rule allowed? Execution errors are the easiest to fix, and they are often the cause of a poor result.

The second question is whether the news filter was applied. Many losing squeezes end on a scheduled release, and a rule that does not skip those periods will include trades that were always likely to fail. Compare the losses inside and outside the news windows. A clear difference suggests that the filter should be part of the rule.

The third question is whether the box was too narrow. A box of a few pips on a volatile pair can be broken by ordinary noise, and the stop then sits inside normal movement. Look at the box width of each loss, and compare it with the average true range of the pair. If most losses came from very narrow boxes, a minimum box width may improve the rule, and that change should be tested in a new sample.

## What does a demo session with the tracker look like?

A demo session with the tracker begins before the market opens for the day. Paste the most recent closes into the tracker, check the squeeze column for the current bar, and note the box if a squeeze has formed. Check the economic calendar for the day, and mark any high-impact releases so that the news rule can be applied.

During the session, place a trade only when the rule says so, and only after the close that triggers it. Record the entry, the stop, the target and the spread at the time. If a squeeze expires without a breakout, record the expiry and the number of bars that passed. Expired squeezes are a large part of the sample, and they should be logged with the same care as trades.

At the end of the session, enter the closes for the day into the tracker, check that the formulas have calculated correctly, and write one line in the journal about the most important thing you observed. A short daily note makes the monthly review much easier, because the reasons for each decision are already written down.

## How often does a squeeze occur on one pair?

Frequency is one of the first facts a tester should measure, and it is often overlooked. A squeeze defined as the lowest width in the last one hundred and twenty bars can occur on many bars in a row, because once a new low is set, the next few bars may also be near it. A run of consecutive squeeze bars is therefore one event, not many, and the log should treat it that way.

Count the number of separate squeeze episodes over a long history, not the number of squeeze bars. An episode begins on the first bar of a run and ends when the width rises out of the lowest band. Divide the total number of episodes by the number of months you measured, and you have a rate you can compare across pairs and timeframes.

The rate tells you whether the test will produce a meaningful sample in a reasonable time. If a pair produces only two squeeze episodes a month, a thirty-trade sample will take well over a year, and the test should be planned accordingly. If it produces many, the sample will grow quickly, but each squeeze may be less distinct. Either way, the rate belongs in the first week's notes, before any trade is placed.

## What does this guide not promise?

This guide does not promise that a Bollinger squeeze will lead to a profitable trade, and no indicator can promise that. Band width describes past volatility, and the market can change its behaviour at any time. A squeeze that resolved well in one year may fail in the next, and a method built on one indicator can be overtaken by events the indicator does not measure.

The guide also does not describe a complete trading plan. A plan built on a squeeze needs the lookback, the squeeze definition, the breakout rule, the failure rule, the news rule, the stop, the target, the position size, the maximum daily loss and the review routine. Each affects the result, and the test should record all of them.

## What is the offer in this guide?

The offer is the Bollinger band width tracker, a free spreadsheet that calculates the middle band, the standard deviation, the upper and lower bands and the band width for up to three hundred closes. It marks a squeeze when the width is the lowest of the last one hundred and twenty bars, and it leaves a column for you to record the breakout outcome.

Use the tracker on one pair and timeframe for each sample. Paste the closing prices from your chart platform into column B, oldest first, and read the squeeze column as the data arrives. Keep the completed file with your journal, and review it at the end of each month.

The tracker is educational. It calculates the indicator for the closes you enter and cannot tell you which squeeze will break out. Check the results against your platform's own Bollinger Bands for the first few rows, because platforms can differ slightly in their standard deviation method.

## How do you start this week?

Start by choosing one pair and one timeframe, and write down the settings you will use: the twenty-period average, the two standard deviations and the one-hundred-and-twenty-bar squeeze lookback. Keep these fixed for the whole test.

Next, copy the closes for the last two hundred bars into the tracker, and mark every squeeze by eye and by formula. Count how many occurred and how long each one lasted. Do not trade anything yet. This first pass shows you how often the condition appears, which is the first fact you need.

Then write the breakout, failure and news rules, test them on the historical squeezes, and open a demo account only when the rules are written and checked. For a wider introduction to the terms used in this guide, read the [forex basics guide](/what-is-forex-trading-for-absolute-beginners/), and for the arithmetic of stops and targets, use the [risk-reward guide](/how-to-calculate-risk-reward-ratio-in-forex-powerful-guide-for-traders/).

For more free tools and checklists, visit the [resource library](/blog/).
