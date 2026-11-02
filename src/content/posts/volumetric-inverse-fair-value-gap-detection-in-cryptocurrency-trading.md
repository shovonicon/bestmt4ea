---
title: "Fair Value Gaps in Crypto: A Detection Guide"
slug: "volumetric-inverse-fair-value-gap-detection-in-cryptocurrency-trading"
description: "How fair value gaps are defined in crypto charts, how to add volume to the test, why inverse gaps need their own rules, and how to log them on a demo account."
publishedAt: 2026-11-02T00:00:00.000Z
updatedAt: 2026-11-02T00:00:00.000Z
categories:
  - "Technical Analysis"
categoryPaths:
  - "/category/technical-analysis/"
tags: []
primaryKeyword: "volumetric inverse fair value gap detection in cryptocurrency trading"
quickAnswer: "A fair value gap is a price region left by a fast move, where the candles on either side do not overlap. In cryptocurrency charts these gaps are common and volatile. Detecting them needs a fixed definition, a volume check to judge whether the move was active, and a rule for inverse gaps that fill and fail. Test each rule on demo before risking real funds."
keyTakeaways:
  - "A fair value gap is a three-candle pattern in which the first and third candles do not overlap, leaving an empty price region."
  - "Volume helps judge whether the move that created a gap was active, but volume data differs between exchanges and must be recorded consistently."
  - "An inverse gap is one that price fills and then rejects, which needs its own rule and its own test."
  - "Crypto markets trade around the clock and can gap on thin liquidity, so spreads and slippage must be measured."
  - "Log every gap you detect, including the ones you reject, before judging whether the pattern adds information."
faqs:
  - question: "What is a fair value gap?"
    answer: "A fair value gap is a three-candle pattern where the high of the first candle and the low of the third candle do not overlap in an upward move, or the reverse in a downward move. The empty region between them is the gap."
  - question: "Why add volume to fair value gap detection?"
    answer: "Volume helps show whether the fast move that created the gap had strong participation. It does not prove the gap will be respected, but it gives the detection rule a measurable condition that can be recorded and tested."
  - question: "What is an inverse fair value gap?"
    answer: "An inverse gap is a gap that price has already filled and then moved back through, turning its role around. Traders describe it as a level whose function has flipped. It needs its own definition, so it is tested separately."
  - question: "Do fair value gaps always fill?"
    answer: "No. Many gaps are never revisited, and some are filled and then continue in the original direction. The fill rate is something to measure in your own sample, not an assumption to build a rule on."
  - question: "Are crypto fair value gaps different from forex gaps?"
    answer: "Often yes. Crypto markets trade continuously and can move sharply on thin liquidity, so a gap may form during a quiet hour on one exchange and not on another. Record the exchange and data source for every sample."
  - question: "Is volumetric gap detection suitable for beginners?"
    answer: "It is an advanced method because it combines three tools: the gap definition, the volume data and the inverse rule. A beginner should first learn support, resistance and position sizing, then test gap detection on demo."
sources:
  - label: "CFTC: consumer education on digital assets and virtual currency"
    url: "https://www.cftc.gov/"
  - label: "Investor.gov: the US SEC investor education site on crypto assets"
    url: "https://www.investor.gov/"
download:
  name: "Order block identification worksheet (PDF)"
  origin: "own"
  license: "Free for personal and educational use"
  licenseUrl: "https://bestmt4ea.com/disclaimer/"
  version: "1.0"
  fileKey: "resources/order-block-identification-worksheet.pdf"
  updatedAt: 2026-11-02T00:00:00.000Z
---

## Why do fair value gaps appear so often in crypto charts?

Cryptocurrency charts are famous for sudden moves. A large order, a liquidation cascade or a single headline can push price several percent in a few minutes, and the candles that form during such a move often fail to overlap with the candles on either side. Those non-overlapping regions are what traders call fair value gaps, and they appear on crypto charts far more often than many beginners expect.

The concept sounds precise, and the definition is simple enough to write down. The difficulty is that a gap is only as useful as the rule that finds it. Two traders can look at the same chart and mark different gaps, because one includes a wick, another requires a full body, and a third ignores gaps smaller than a certain size. Without a fixed rule, the pattern is in the eye of the beholder.

This guide explains how to define a fair value gap, how to add a volume condition, how to treat inverse gaps and how to log the results on a demo account. It does not promise that any gap will be filled or that a trade will profit. Crypto prices can move in ways that break every rule, and the method described here is for measuring behaviour, not for predicting it.

## What is a fair value gap?

A fair value gap is a three-candle pattern. In a rising move, the first candle's high sits below the third candle's low, and the middle candle is strong enough to create that separation. The empty region between the first candle's high and the third candle's low is the gap. In a falling move, the pattern is reversed: the first candle's low sits above the third candle's high.

The idea behind the gap is that the market moved through a price region so quickly that trades did not take place across the whole range. Traders who think in terms of order flow argue that price may later return to fill that region, because the imbalance that created the gap may not have been fully resolved. That is a hypothesis, and it is the thing the test needs to measure.

Be precise about the definition before you mark anything. Decide whether the gap uses wicks or bodies, whether it requires a minimum size measured in percent of price, and whether the middle candle must be a certain multiple of the average range. Each choice changes the count of gaps, and each must be written in the journal before the sample starts.

## How do you detect a gap in practice?

A practical detection routine works on closed candles only. Take the last three closed candles. Check whether the high of the first candle is below the low of the third candle, in a rising move, or whether the low of the first candle is above the high of the third candle, in a falling move. If the condition holds, measure the gap in percent of the current price and check it against your minimum size rule.

Write the routine as numbered steps so that anyone following it would find the same gaps. Include the timeframe, the wick rule, the minimum size and the rule for overlapping gaps, where two gaps sit close together. The routine should also say how far back the test looks, so that old gaps and new gaps are counted under the same conditions.

Record the candle data source for every sample. Crypto prices differ between exchanges, and a gap on one exchange may not appear on another, especially in thin markets. A detection that works on one feed may behave differently on another, and that difference should be visible in the journal.

## How does volume change the detection?

Volume is the amount traded during each candle. A gap formed on heavy volume suggests that many participants took part in the move, while a gap on light volume may reflect a few orders moving through a thin book. Adding a volume condition is a way to separate gaps that formed in active conditions from gaps that formed in quiet ones.

A simple volume rule compares the volume of the middle candle with the average volume of the previous twenty candles. If the middle candle's volume is above that average by a fixed multiple, the gap passes the volume condition. The multiple is a choice to write down, and it should be tested as a parameter, not optimised on the same data.

Be careful with volume data. Exchanges report volume differently, some include wash trading, and volume in a thin market can be dominated by a few large orders. Record the exchange, the pair and the volume source for each sample. A volume rule that works on one exchange may not transfer to another.

## What is an inverse fair value gap?

An inverse gap is a gap that price has already returned to and moved through. Traders describe the level as one whose role has flipped: a region that acted as a support zone may act as a resistance zone after it is broken, and the reverse. The inverse gap is therefore a different event from a fresh gap, and it needs its own definition.

A common inverse rule requires price to fill the original gap, meaning it trades back into the region, and then to close beyond the far edge of the gap in the original direction. The rule then looks for a retest of the gap from the other side. This adds several conditions, and each one must be recorded and measured separately.

Because the inverse pattern depends on a fill and a retest, it is more prone to ambiguity than the fresh gap. A fill can be a single wick or a close, and a retest can be a touch or a sustained test. Write the exact condition for each, and decide in advance whether a partial fill counts.

## How do you measure whether a gap is filled?

Fill rate is the share of gaps that price later trades back into. Measure it over a long history, using the same detection rule and the same time window for each gap. A gap counts as filled when price trades into its region, and the record should note how many candles passed before the fill occurred.

Measuring the fill is more informative than assuming it. Many traders believe that gaps always fill, and a careful count often shows that a large share never do, or that they fill only after a long delay. A long delay makes the gap a poor reference for a short trade, because the entry and stop would sit far apart.

Record the time to fill as well as the fact of the fill. Split the results by volume band and by timeframe. If gaps with heavy volume fill more quickly than those with light volume, that finding is worth testing again on a fresh sample.

## What rules should a demo test use?

A demo test needs an entry rule, a stop, a target and an exit. For a fresh gap, one approach is to enter on a retest of the gap region in the direction of the original move, with the stop beyond the far edge of the gap and the target at a fixed multiple of the stop distance. For an inverse gap, the entry follows the retest from the other side, with the stop placed beyond the broken level.

Set the risk per trade before the test, and size the position from the stop distance and the account balance. Crypto stops can be wide in percentage terms, and a fixed position size in coins can carry a very different risk from one day to the next. Size from the money you are prepared to lose, not from the coin amount that looks convenient.

Include the costs in the record. Exchange fees, the spread at entry, the funding charge on perpetual contracts and any slippage on a fast move all reduce the result. A rule that looks profitable before costs may not be profitable after them, and the costs can be large in crypto.

## How do you handle thin liquidity and gaps?

Thin liquidity is one of the main reasons crypto gaps form. A small order can move price through several levels when few other orders stand in the way. The same thin book can make a stop fill far from its trigger price, and that can turn a planned loss into a larger one.

Measure the spread and the depth of the book at the time of each signal, if your platform provides the data. Where it does not, record the spread shown by the platform at entry, and note any trade placed during a known quiet period, such as the early hours of a weekend. Trades in thin conditions should be recorded separately, so you can see whether they perform differently.

Consider whether a minimum liquidity rule belongs in the strategy. A rule that skips signals in very thin conditions may remove the worst fills, at the cost of fewer trades. Test the rule with and without the filter, and record each variant as its own sample.

## What does a fair test look like over a month?

In week one, define the detection routine, the volume rule and the inverse rule, and write them as numbered steps. Apply them to a historical set of candles and mark every gap by hand as well as by formula. Compare the two lists and correct any disagreement in the rule, not in the list.

In week two, measure the fill rate and the time to fill on the historical data, split by volume band. Do not trade yet. This step tells you how often the pattern appears and how often it resolves, which are the basic facts the test needs.

In week three, open a demo account on the exchange you will use, and trade the fresh-gap rule with the risk and size from your plan. Record every signal, including those skipped under the liquidity filter. In week four, review the sample, split it by timeframe and by inverse status, and read the losing trades. Decide whether to extend the test, change the definition in a new sample, or set the idea aside. Write that decision and its reasons into the journal before the next sample begins, so the choice is visible to you later and cannot be quietly revised.

## What mistakes do traders make with gap detection?

The first mistake is changing the definition to include a gap that looks important. Once the rule admits exceptions, the sample stops measuring the rule and starts measuring the trader's judgement. Keep a list of near-misses, and test whether a looser rule performs better in a separate sample.

The second mistake is trading the gap before it is confirmed on a closed candle. A gap that appears mid-candle can close differently, and a trade placed on the unfinished candle cannot be reproduced in the test.

The third mistake is ignoring the stop distance in percentage terms. A crypto gap that spans several percent of price may need a stop that consumes a large share of the risk, and the position size must be reduced to compensate. A trader who keeps the coin size fixed will carry a much larger risk on that trade.

## How does gap detection fit with other tools?

Gaps are one kind of structure among many. Support and resistance levels, trendlines and volatility measures can all help describe the context in which a gap forms. The [support and resistance guide](/how-to-identify-support-and-resistance-in-forex-proven-strategies-for-traders/) explains how to mark the levels consistently, and a gap that sits on a known level has a clearer context than one in open space.

A trend filter on a higher timeframe can also separate gaps formed with the trend from those formed against it. The [trendline breakout guide](/trendline-breakout-vs-false-breakout-how-to-identify-and-trade-them-effectively/) explains how to tell a real break from a false one, which is often the situation that follows a gap fill.

Avoid stacking too many conditions. A gap rule with a volume filter, a trend filter, a liquidity filter and an inverse rule has so many conditions that the number of trades may be too small to judge. Start with the simplest version, measure it, and add one condition at a time.

## What does a worked gap sample look like?

Consider a sample on the one-hour chart of a major crypto pair over three months. The routine finds one hundred and twelve fresh gaps that pass the minimum size rule. Of those, sixty-eight pass the volume rule, which requires the middle candle to trade at least 1.5 times the average of the previous twenty candles. The fill rate for the volume group is about 61% within forty-eight candles, while the fill rate for the rest is about 44%.

The trader then tests the retest entry on the volume group, with a stop beyond the far edge of the gap and a target of twice the stop distance. Of the sixty-eight signals, twenty-two reach a retest and are traded. Twelve reach the target and ten hit the stop, giving a win rate of about 55%. The average R-multiple after a fee of 0.1% per side is about 0.2.

The honest reading is that the sample shows a modest positive average, a volume effect on fill rate and a trade count too small to draw a firm conclusion. The trader records that reading, notes that the fee assumption matters, and plans a longer sample on a second exchange before any further decision.

## How do you check the detection against a chart you can see?

Before any number is trusted, the routine should be checked by eye. Choose twenty gaps the routine has found and twenty candles it has rejected, and look at each one on the chart without the formula results beside it. Decide for each whether you would have marked it as a gap under the written definition. Then compare your decisions with the routine's output.

Disagreements are useful. If you marked a candle as a gap that the routine rejected, the difference is almost always in the wick rule or the minimum size. Fix the written rule, then check again on a fresh set of candles. Do not fix an individual row in the log, because a single corrected row hides the rule that produced the error.

This check takes a short session, and it should be repeated whenever the routine changes. It also builds the skill of reading gaps on a chart, which the formula cannot replace.

## How should volume be compared between periods?

Volume changes over time. A month of high activity can make ordinary volume look small, and a quiet month can make a large move look significant. A volume rule that compares each candle with the average of the previous twenty candles adjusts for this partly, but it does not solve the problem over long periods.

Measure the volume average over the same window for every gap, and record the window in the journal. If the sample spans a period of very different activity, split the results by period as well as by volume band. A volume effect that appears in one period and disappears in another should be treated with caution, and it should be tested again on a separate sample before it is used in a rule.

## What does a losing inverse gap teach you?

An inverse gap that loses is informative. The first question is whether the fill was clean. A fill that touched the gap and immediately reversed is different from one that spent several candles inside the region, and the two may need different rules. Record the number of candles spent inside the gap, and split the results by that figure.

The second question is whether the retest was a true retest or a second visit that broke through. Many losing inverse trades come from a retest that failed because the level had lost its role entirely. Note the broader trend and the nearest structure at the time, so the review can show whether the failure has a pattern.

The third question is the stop. An inverse stop placed beyond the broken level may sit a long way from the entry if the gap was large. Check the distance in percent and in money, and make sure the position size keeps the loss within the limit in your plan.

## How do you record a gap that is never filled?

Some gaps stay open for a long time, or for good. Those gaps still belong in the record, because they are part of the sample. A gap that is never revisited is a valid observation about the market, and leaving it out would bias the fill rate upward. Record the gap with its date, its size and a note that it is open, and check it at a fixed interval, such as the end of each week.

Open gaps also need a closing rule. Decide how long a gap stays in the sample before it is treated as expired, such as a fixed number of days or candles. Write that rule before the test and apply it to every gap. An expiry rule keeps the sample finite, and it stops a trader from keeping an old gap alive because it looks useful.

## How do you keep the routine consistent across a long test?

A routine that changes during a test is no longer a test, however small the change looks on paper. A single altered wick rule can add or remove dozens of gaps, and the results of the two versions cannot be combined. Keep a copy of the written definition in the journal, with the date it was adopted. If you find an error in the routine, record the error, correct the definition and start a new sample from the date of the correction. The earlier sample stays in the record as a result from a different rule.

Consistency also depends on the tools. If the charting platform updates its candle data or its volume calculation, the routine may produce different gaps on the same chart. Check the routine against a fixed set of candles after each platform update, and record the check in the journal, so that a change in output can be traced to a change in the tool and not to the market. Keep that fixed set of candles saved as a file, so the same check can be repeated exactly months later, when the question of whether the tool changed is no longer easy to answer from memory.

## What does this guide not promise?

This guide does not promise that fair value gaps will fill, that inverse gaps will hold, or that any rule built on them will be profitable. Crypto markets are volatile, they can move on news or on a single large order, and they can break every pattern at once. A method that worked in one period can stop working without warning.

A test that is run for a few weeks will rarely show these risks, and a trader who has not read the exchange's terms and withdrawal rules before the test begins has missed one of the most important checks available, because they tend to appear rarely and all at once, and a demo account will not reproduce them. Crypto trading also carries risks that go beyond price. Exchanges can fail, withdrawals can be restricted and custody arrangements vary. A demo test does not capture those risks, and they should be considered before any funds are placed on an exchange.

## What is the offer in this guide?

The offer is the order block identification worksheet, a printable worksheet for marking structures on a chart and recording the reasoning behind each mark. It is used here as a companion for the gap routine: mark the candles, the level and the volume condition, then record the decision before the outcome is known. The worksheet is a record-keeping tool, and it does not identify any gap for you.

Use it with your demo journal for every signal, including the gaps you did not trade. Compare the worksheet entries with the formula results each week, and correct any disagreement in the routine, not in the entries.

## How do you start this week?

Start by writing the gap definition as numbered steps, including the wick rule, the minimum size and the volume rule. Apply it to two weeks of historical candles on one exchange, and mark every gap by hand. Compare the two lists and fix the rule where they disagree.

Next, measure the fill rate and the time to fill, split by volume band. Then open a demo account on the same exchange, trade the fresh-gap rule with the risk from your plan, and record every signal. After thirty trades, review the sample and read the losing trades.

For the basics of reading a chart and marking levels, read the [pip guide](/what-is-a-pip-in-forex-simple-explanation-the-ultimate-beginner-friendly-guide/), and for the arithmetic of stops and targets the [risk-reward guide](/how-to-calculate-risk-reward-ratio-in-forex-powerful-guide-for-traders/).

For more free tools and checklists, visit the [resource library](/blog/).
