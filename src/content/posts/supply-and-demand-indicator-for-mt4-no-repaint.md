---
wpId: 4206
title: "Supply and Demand Indicator MT4 No Repaint Test"
slug: "supply-and-demand-indicator-for-mt4-no-repaint"
description: "Test a supply and demand indicator for MT4 for repainting with a free checklist. Compare timed screenshots, check alerts and run a demo before you trust a zone."
publishedAt: "2025-12-11T15:18:49.000Z"
updatedAt: "2026-10-22T00:00:00.000Z"
seo: 
  title: "Supply and Demand Indicator MT4 No Repaint 2026"
  description: "Test a supply and demand indicator for MT4 for repainting with a free checklist. Compare timed screenshots, check alerts and run a demo before you trust a zone."
  canonical: "https://bestmt4ea.com/supply-and-demand-indicator-for-mt4-no-repaint/"
  ogImage: "https://bestmt4ea.com/wp-content/uploads/2026/07/post_4206_featured.webp"
sourceUrl: "https://bestmt4ea.com/supply-and-demand-indicator-for-mt4-no-repaint/"
categories: 
  - "Forex Indicator Reviews"
categoryPaths: 
  - "/category/forex-indicator-reviews/"
tags: []
primaryKeyword: "supply and demand indicator mt4 no repaint"
quickAnswer: "A supply and demand indicator for MT4 is only no-repaint if its zones stay fixed after the candle that drew them closes. To check, attach it to a demo chart on M1 or M5, screenshot a new zone, wait for the candle to close plus two more candles, then screenshot again. Any move, resize or disappearance means it repaints. Then answer five selection questions and run two weeks of forward screenshots."
keyTakeaways:
  - "A zone that moves, resizes or vanishes after its candle closes is repainting, whatever the vendor calls it."
  - "Run the 30-minute repaint test on a demo chart with timed screenshots, then repeat it in the strategy tester's visual mode."
  - "Ask five questions about data source, visible inputs, stated lag, alerts and backtesting before you trust a tool."
  - "Score the tool on one clear job, agreement with price, a stated failure case and two weeks of forward screenshots."
  - "The checklist does not prove an indicator is safe, does not replace a demo run and does not measure profitability."
faqs:
  - question: "What does it mean when a supply and demand indicator for MT4 repaints?"
    answer: "It means zones change position, size or visibility after the candle that drew them has closed. The chart you saw in real time then differs from the history you studied later."
  - question: "Can a no-repaint supply and demand indicator still lag?"
    answer: "Yes. Some confirmation delay is normal when a zone needs bars to the right of a swing before it is valid. A good tool states that delay, so you can test it and plan around it."
  - question: "Is the Indicator Repaint Test Checklist only for supply and demand tools?"
    answer: "No. The checklist is written for any indicator. This guide shows how to translate its signal tests into zone terms for supply and demand tools."
  - question: "How long does the repaint test take?"
    answer: "The core repaint test takes about 30 minutes on a demo chart. The selection scorecard then recommends two weeks of forward screenshots before the tool influences any trade decision."
  - question: "Does passing the checklist mean the indicator is profitable?"
    answer: "No. The checklist tests for repainting and selection criteria. It does not measure profitability, and it does not replace a demo run on your own chart and feed."
  - question: "Should I test an indicator on a live account first?"
    answer: "No. Test on a demo account first. Consider a live account only after you understand how the tool behaves and you have set a written loss limit."
sources:
  - label: "MetaTrader 5 help: Strategy Tester"
    url: "https://www.metatrader5.com/en/terminal/help/algotrading/testing"
  - label: "MetaTrader 4 platform help"
    url: "https://www.metatrader4.com/en/trading-platform/help"
installSteps:
  - name: "Open the guide"
    text: "Download the Indicator Repaint Test Checklist from the download card on this page, then open the PDF on your device or print it."
  - name: "Read the checklist"
    text: "Read the three sections in order: the repaint test, the five selection questions and the scorecard. Then read the repaint rule at the end."
  - name: "Prepare a demo chart"
    text: "Open a demo account in MetaTrader 4, attach the supply and demand indicator to a chart on M1 or M5, and create a folder for your screenshots."
  - name: "Run the repaint test"
    text: "Capture a new zone, wait for the candle to close and two more candles to form, then capture the same area again and compare. Repeat the check in the strategy tester's visual mode."
  - name: "Score the tool"
    text: "Answer the five questions, score the four selection items, and keep two weeks of forward screenshots before any trade decision is influenced by the tool."
download:
  name: "Indicator Repaint Test Checklist"
  origin: "own"
  license: "Free to use, print and share with credit to bestmt4ea.com"
  version: "1.0"
  platform: "MT4/MT5"
  fileKey: "resources/indicator-repaint-test-checklist.pdf"
draft: false
---

If you have ever watched a supply and demand indicator draw a clean box above price, then watched that box shift or vanish a few candles later, you have already met the problem this guide is about. The box looked like a plan. It turned out to be a guess that rewrote itself after the fact.

That behaviour is called repainting. It is the most common reason traders lose confidence in an indicator, and supply and demand tools are hit harder than most. A zone is only useful if you could have seen it at the exact moment you had to decide. If the zone was drawn using information that did not exist yet, the chart you studied at the weekend is not the chart you traded on Monday.

This post shows you how to test a supply and demand indicator for MT4 for repainting before you let it influence a trade. You will learn what to look for on a demo chart, which questions to put to the seller, and how to score the tool so the decision rests on evidence instead of the sales page. The test is built around a free checklist you can download, print and use on a demo account.

Two things to set straight at the start. This guide does not tell you which indicator to buy, and it does not present any indicator as a winning system. A checklist also cannot prove that a tool is good. What it can do is catch the most common failure, an indicator that changes its story after the candle has closed. Treat it as a filter that removes weak tools early, not as a verdict on the strong ones.

## Why do supply and demand zones move after the candle closes?

Most supply and demand indicators find zones by looking for a specific kind of price action. They might look for a sharp departure from a base, a large candle body, or a swing that price failed to break. That logic is sound. The problem is timing.

Many of these rules need confirmation. A swing high, for example, is only confirmed once a few bars have printed to its right and none of them made a higher high. If the indicator draws the zone at the swing's position on the chart, the zone looks perfect in the history. But while the swing was forming, the indicator did not yet know it was a swing. Once the confirming bars arrived, the zone appeared. Sometimes the code redraws the whole structure, so the zone on screen now is not the zone that was shown a few candles ago.

You may not see this on a closed chart. A finished history is tidy. Every zone sits neatly on a bar and every swing is obvious. That tidiness is exactly why a repainting indicator is so persuasive when you scroll back. It has had the benefit of every future candle before it drew the picture.

Live trading is different. You see the zone at the moment price reaches it, and you have to decide with the information you have right then. An indicator that only looks right in hindsight gives you the answer after the question has already been asked.

Not all repainting is hidden by design. Some of it is a side effect of how the code was written, and the developer may not even know it. Some of it is a marketing choice, where the vendor calls it recalculation or optimisation and sells the result as a feature. From your chair, the effect is the same. The zone you planned around is not the zone that existed when you made the plan.

## What does a repainting zone cost a beginner?

Consider a made-up example. Maya is a beginner trader who has just found a supply and demand indicator for MT4. She opens the chart at the weekend and scrolls back. The red supply zones line up with every obvious reversal. The blue demand zones sit neatly under the lows. She is impressed, and she is ready to trust the tool before she has tested it on a single live candle.

On Monday she sees price push into a red zone above the market. She places a sell. Over the next few candles the zone moves higher and its lower edge shifts. Her stop, set from the original zone, now sits inside what the indicator considers the zone. Maya cannot tell whether her idea was wrong, whether the zone was wrong, or whether the market simply did something unexpected. So she does what most beginners do. She blames herself, moves the stop, then changes the timeframe, then changes the indicator, then changes the colours. After three weeks she has tested nothing and learned very little.

The real cost is not one trade. It is the time spent chasing a tool that cannot be evaluated, plus the confidence it drains from you. When an indicator repaints, you cannot separate a good decision from a bad one. Every outcome looks like a verdict on you. That is a poor foundation for learning, and it is especially poor for a beginner who is still building a method.

The fix is simple, but most people skip it. Test the indicator for repainting before the first trade, not after the first bad result. A demo chart costs you nothing except an afternoon. Skipping the test can cost you the one thing you cannot buy back, which is the time you spent learning the wrong lesson.

There is a second, quieter cost. Repainting tools make you distrust your own eyes. When a zone you trusted shifts, you start to doubt your reading of the market, even when your reading was fine. Over time that doubt leads to overtrading, to switching tools every month, and to ignoring your own plan. A test that takes thirty minutes can stop that cycle before it starts.

## How do you test a supply and demand indicator for repainting?

The core test takes about 30 minutes on a demo chart. It is the first section of the Indicator Repaint Test Checklist, and it works for zone indicators as well as for signal indicators. The idea is to watch the indicator in real time, then check whether anything it showed has changed after the candle closed.

Follow these steps in order.

1. Attach the indicator to a live demo chart on a low timeframe, such as M1 or M5. Repainting is easiest to catch on fast timeframes because more candles form in a short period.
2. Wait for the first zone to appear. Take a screenshot the moment it is drawn, with the time and the zone's position visible on the chart.
3. Wait for the candle to close and for two more candles to form. Take a second screenshot of the same area with the same time reference.
4. Compare the two screenshots. Did the zone move, change height, shift its edges, or vanish? Any change after the candle closed is repainting, whatever the sales page calls it.
5. Repeat the check in the MT4 Strategy Tester in visual mode. The zones that appear in the tester should appear on the same bars as on the live chart.

Why screenshots? Memory is unreliable here. When you have been staring at a chart for twenty minutes, you will remember the zone you expected, not the zone that was actually there. A screenshot with the time visible gives you a fixed reference. It also ends the argument with yourself about whether the zone really moved.

Why the strategy tester? A tool that behaves one way on a live feed and differently in the tester is telling you something important. If the tester redraws zones on bars that differ from the live chart, the history is not the history it showed you in real time. You want the two to agree.

A word about what counts as a change. A zone that stays exactly where it was drawn is not repainting. A zone that extends its edges because price has made a new extreme is a rule you need to understand, so write it down and check whether the vendor explains it. A zone that disappears completely after the candle closed is clear repainting. Use the rule from the checklist: judge the indicator only by what it showed at the moment of decision.

If a zone changes only while a candle is still forming, that is a different question. Many tools update during a live candle and then settle. That can be normal behaviour for some designs. The test that matters is what remains after the candle closes. Your job is to find out whether the settled picture still matches the picture you acted on.

Keep the demo session simple. Use one chart, one pair, one timeframe, and a folder for the screenshots. Do not change settings in the middle of the test. If you change an input, start the test again, because you have changed the tool.

## What should you ask the seller before you test?

Before you spend thirty minutes on a demo, you can often learn a lot from the vendor's own documentation. The checklist includes five questions. They separate tools that explain themselves from tools that hide behind a sales page. The right answers are not always perfect. What matters is whether the answer is clear enough for you to test.

| Question | Good answer | Bad answer |
|---|---|---|
| What data does it use? | Closed candles, stated in the description | A proprietary AI formula with no inputs you can see |
| Can you see and change the inputs? | Periods, sources and thresholds are exposed | A locked black box |
| Does it lag honestly? | The vendor states the delay, for example confirms after one or two bars | A list of big promises with no stated delay |
| Alerts | Fire on candle close, and you can configure them | Fire mid-candle and re-fire as the zone flickers |
| Backtest honesty | Works in the tester with the same rules as live | Not suitable for backtesting, which usually means the history is redrawn |

Let us look at each one.

What data does it use? A supply and demand indicator should say which candles it reads. If the description says it uses closed candles, you have a clear rule to test. If the description only says it uses advanced artificial intelligence, you have nothing to test against. You cannot check a rule that is not written down.

Can you see and change the inputs? Honest tools expose their settings. You should be able to see the period used to find swings, the size threshold for a zone, and any filter that affects the drawing. A locked box is not automatically a scam, but it stops you from understanding the behaviour you are testing. If you cannot see the inputs, you cannot tell whether a change you observe came from the market or from a hidden setting.

Does it lag honestly? Some delay is normal. A tool that confirms a swing after two bars will always be a little late, and that is fine if the vendor says so and your plan accounts for it. The bad answer is a page full of big claims with no stated delay. You should believe at most one of those claims, and a sales page that claims all of them is not giving you a reason to trust it.

Alerts are the next check. Alerts that fire mid-candle and re-fire as the zone flickers are a warning sign. They tell you the indicator is reacting to a candle that has not finished forming. Alerts that fire on candle close, and that you can configure, give you a clean trigger to test against.

Backtest honesty is last. A tool should work in the strategy tester using the same rules it uses live. If the vendor says the tool is not suitable for backtesting, treat that as a red flag. Often the real meaning is that the history gets redrawn when you run the tester, which is the same problem as repainting seen from a different angle.

Use the answers as a filter, not a conclusion. A vendor with clear answers still has to pass the demo test. A vendor with vague answers may still be honest, but you are now testing without a map. Make your decision with both sources of evidence, and write down which answers you received.

Watch for what is missing too. If you cannot find a description of the data, the inputs or the alert behaviour anywhere, the absence is itself information. A tool that wants you to trust it should be willing to explain how it works.

## How do you score an indicator before it earns a place in your plan?

The checklist finishes with a short selection scorecard. It is meant to stop you adopting a tool because it looks good on one screen. Four items are on the list, and each one asks you to be specific.

First, the tool should answer one question well. Trend, momentum, levels and volatility are four different questions. An indicator that promises all four is usually doing none of them carefully. A supply and demand tool should be judged on whether its zones tell you something useful about where price might react. It does not need to tell you the trend, the momentum and the news at the same time.

Second, the tool should agree with price more often than it argues with it. This sounds vague, but you can make it concrete. Look at how often the zones are respected when price reaches them, and how often they are simply ignored. If you need three extra filters just to make the zones usable, the zones are not doing the work on their own. The checklist puts it plainly: if you need three filters to make it usable, it is not the tool.

Third, you should be able to explain, in one sentence, what would make the signal wrong. This is one of the most useful tests on the list. If you cannot describe a failure case, you cannot manage it. For a supply and demand zone, a sensible answer might be that the zone is invalid when price breaks through it with strong momentum and the zone does not hold on a retest. If nothing could make the tool wrong, the tool is decoration, not analysis.

Fourth, run two weeks of forward screenshots before the tool influences a single trade decision. Forward means the screenshots are taken as the market unfolds, not reconstructed later. This is the step most people skip, and it is the one that protects you most. Two weeks of your own evidence is worth more than any review, including this one.

Score the tool honestly against all four items. A tool that fails one of them is not necessarily useless, but it is not ready for your plan. A tool that fails two or more should be parked. Parking a tool is not failure. It is how you keep your attention for the ones worth testing.

It helps to keep the scorecard in one place. A simple note with the date, the pair, the timeframe and the screenshot filename is enough. You do not need a complicated spreadsheet on day one. You need a record you can read back when you are tempted to change tools.

If you want a related perspective, the guide on [order blocks for MT4 and MT5](/order-blocks-indicator-for-mt4-mt5-free-download-7-powerful-benefits-smart-traders-cant-ignore/) covers a different zone method, and the [best order block indicator for TradingView](/best-order-block-indicator-tradingview/) looks at how similar zones are judged on another platform. Reading both helps you see which parts of the test carry over and which are specific to one tool.

## What does the checklist cover, and what does it NOT do?

The Indicator Repaint Test Checklist is a single printable guide with three working sections and one closing rule. It is written for any indicator, not only supply and demand tools. Here is what each part does.

Section one is the repaint test. It takes about 30 minutes on a demo chart. It covers attaching the indicator to a low-timeframe demo chart, screenshotting the moment a signal or zone appears, waiting for the candle to close and two more candles to form, comparing the two images, and repeating the check in the strategy tester's visual mode.

Section two is the table of questions that separate tools from toys. It lists the five questions covered earlier in this guide: data source, visible inputs, honest lag, alert behaviour and backtest honesty. For each question it gives a good answer and a bad answer, so you know what to listen for when you read a vendor's description or ask a support question.

Section three is the selection scorecard. It has four items: one clear job, agreement with price, a stated failure case, and two weeks of forward screenshots before trading decisions are influenced.

The checklist closes with a short rule. Judge an indicator only by what it showed at the moment of decision. A signal you could not have seen in real time was never a signal. That is the principle the whole test is built to protect.

Now the important part. Here is what the checklist does not do.

It does not prove an indicator is safe. Passing every test on the list tells you the tool did not repaint during your sample and that its rules are clear enough to evaluate. It does not tell you the tool is safe to trade, or that it will suit your plan, your pair or your broker's conditions.

It does not prove the indicator will not repaint on your broker feed. Your broker's price data can differ from the data the vendor used when building the tool. The repaint test runs on the feed in front of you, which is the right way to test, but a pass on one feed is a result for that feed only. Re-test if you change brokers, symbols or timeframes.

It does not replace a demo run. The checklist is a filter before the demo, and the demo is where you learn how the tool behaves with your own eyes and your own rules. Skipping the demo because the checklist looked fine is the same mistake as skipping the checklist because the sales page looked good.

It does not measure profitability. It does not give win rates, expectancy or returns. Repainting is a question of whether the information was there at the time. Profitability is a separate question that needs its own forward testing, and this checklist is not designed to answer it.

It does not cover position sizing, stop placement or drawdown planning. Those are risk decisions, and they belong in your trading plan. The checklist is about the indicator, not about how much you risk on any one idea.

Finally, the checklist does not replace reading the indicator's code or documentation where that is available. If you have the source, you can check directly whether the zones use confirmed bars. The checklist gives you a practical test when you do not.

## How do you apply the checklist to a zone indicator?

The checklist was written with signal indicators in mind, so a few translations help for supply and demand tools. In the repaint test, treat a zone that moves its edges, changes its height, shifts its position or disappears after the candle closed as the equivalent of a signal that changed. Record the zone's top and bottom prices in your notes as well as the screenshot, because a small visual shift can be hard to judge by eye.

When you answer the five questions, look for how the tool defines a zone. Does it use the body of a candle or the wick? Does it require a specific number of bars before it draws a zone? Does it extend zones until they are broken? Each of those choices affects how the tool behaves in a live market, and each one can be tested. A good vendor should be able to name the choice, even if they do not show you the code.

When you score the tool, the failure-case sentence matters most for zones. A supply zone that price breaks through with strong momentum is no longer acting as supply. Write down what would make a zone invalid for you, then check whether the tool's behaviour matches your rule. If the tool keeps a broken zone on screen with no marker, you have learned something about the tool and something about how you should read it.

Consider the timeframe as well. Zones on M1 and M5 behave differently from zones on H1 or H4. The repaint test is easiest on low timeframes, but the decision you care about may happen on a higher one. If your plan uses the tool on H1, run at least part of your forward test on H1 too.

Check your setup before you judge the tool. If an indicator loads but nothing draws after a terminal update, the problem may be the build rather than the indicator. The guide on [fixing an MT4 EA after an update](/mt4-ea-not-working-after-update-fix-best-proven-solutions/) covers the usual causes. Fix the setup first, then return to the test.

If you are comparing this kind of zone tool with trend-following options, the [best free SuperTrend indicator for MT5](/best-free-supertrend-indicator-for-mt5/) shows how a different method is set up. The same repaint test applies to it, but the failure cases look different, so write your own rule for each tool.

## Where do you go from here?

You now have a clear process. Pick one supply and demand indicator you are considering. Read its description and ask the five questions. Run the thirty-minute repaint test on a demo chart. Score the tool against the four selection items. Then run two weeks of forward screenshots before you let the tool influence a single trade decision.

That process will not tell you which indicator to buy, and it will not promise that any tool will work for you. What it does is protect you from the most damaging mistake in this category, which is trusting a zone that was drawn with hindsight. It also gives you evidence you can read back later, instead of a memory of how the chart looked at the weekend.

Download the Indicator Repaint Test Checklist from the download card on this page. It is free to use, print and share with credit to bestmt4ea.com. Print it, keep it next to your demo platform, and work through it in order. Do not skip the screenshots. Do not skip the forward test. Those two steps hold most of the value.

Start on a demo account today. Choose one chart, one pair and one timeframe, and run the repaint test before anything else. If the tool passes, keep watching it in forward mode. If it fails, park it and move on. Both results are useful, and both save you the cost of learning the wrong lesson with real money.

Trading forex and CFDs carries a high risk of loss, and most retail accounts lose money. Use a demo account until you understand the tool and your own reaction to it, and set a written loss limit before you trade any live account.
