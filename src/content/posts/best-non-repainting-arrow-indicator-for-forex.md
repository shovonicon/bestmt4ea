---
wpId: 4218
title: "Non-Repainting Arrow Indicator for Forex: How to Test It"
slug: "best-non-repainting-arrow-indicator-for-forex"
description: "Learn how to test any arrow indicator for repainting on a demo chart before you trust it. A free checklist covers the test, the questions and the limits."
publishedAt: "2025-12-11T15:22:43.000Z"
updatedAt: "2026-10-22T00:00:00.000Z"
seo:
  title: "Non-Repainting Arrow Indicator for Forex: Test It First"
  description: "Learn how to test any arrow indicator for repainting on a demo chart before you trust it. A free checklist covers the test, the questions and the limits."
  canonical: "https://bestmt4ea.com/best-non-repainting-arrow-indicator-for-forex/"
  ogImage: "https://bestmt4ea.com/wp-content/uploads/2026/07/post_4218_featured.webp"
sourceUrl: "https://bestmt4ea.com/best-non-repainting-arrow-indicator-for-forex/"
categories:
  - "MT4/MT5 Indicator Reviews"
categoryPaths:
  - "/category/forex-indicator-reviews/"
tags: []
draft: false
primaryKeyword: "non-repainting arrow indicator for forex"
quickAnswer: "A non-repainting arrow indicator keeps its signals fixed once the candle closes. No list can certify that for your broker feed, terminal or inputs. Test any arrow indicator yourself: watch signals on a demo chart, compare screenshots after the candle closes, then check the strategy tester. The free checklist guides each step. It does not prove safety or replace a demo run."
keyTakeaways:
  - "A repainting arrow shows a history that could not be seen in real time, so backtests on it look better than live results."
  - "Repainting is a property you test on your own chart. A label such as non-repainting on a sales page proves very little."
  - "Run the repaint test on a demo chart: screenshot each signal, wait for the candle to close, and screenshot again."
  - "Check that the strategy tester draws arrows at the same bars as the live chart before you trust a backtest."
  - "The checklist does not prove an indicator is safe, does not prove it will not repaint on your broker feed, and does not replace a demo run."
faqs:
  - question: "What does non-repainting mean for an arrow indicator?"
    answer: "It means a signal, once drawn on a closed candle, stays where it was drawn. It does not move to another bar, change size or disappear as new candles form. You confirm this by comparing screenshots taken before and after the candle closes."
  - question: "Is there one best non-repainting arrow indicator for forex?"
    answer: "No tool can be named the best for every trader. Repainting depends on the code, the inputs, the terminal and the broker feed. Test each candidate on your own demo chart and score it with the checklist."
  - question: "How long does the repaint test take?"
    answer: "The core repaint test takes about 30 minutes on a demo chart. A proper check also needs a few weeks of forward screenshots before the indicator influences any real decision."
  - question: "Can a backtest show whether an arrow indicator repaints?"
    answer: "Not reliably. A tester can redraw history using the final shape of the indicator, so the past arrows look clean. Compare the tester's arrows with screenshots taken live to find the difference."
  - question: "Does passing the checklist mean the indicator is profitable?"
    answer: "No. The checklist only tests whether signals stay fixed and whether the tool is understandable. A non-repainting indicator can still lose money, so it needs its own forward test and strict risk limits."
sources:
  - label: "MetaTrader 5 Help: Testing Trading Strategies in the Strategy Tester"
    url: "https://www.metatrader5.com/en/terminal/help/algotrading/testing"
  - label: "MetaTrader 4 Help: Trading Platform documentation"
    url: "https://www.metatrader4.com/en/trading-platform/help"
  - label: "MQL5 Reference: Strategy Testing and runtime behaviour"
    url: "https://www.mql5.com/en/docs/runtime/testing"
installSteps:
  - name: "Open the guide from the download button"
    text: "Click the download button on this page to get the Indicator Repaint Test Checklist as a PDF. Save it somewhere you can open next to your MT4 or MT5 terminal."
  - name: "Read sections 1 to 3 before you open a chart"
    text: "Read the repaint test, the question table and the selection scorecard once from start to finish. Note which questions you cannot yet answer for the indicator you are testing."
  - name: "Run the repaint test on a demo account"
    text: "Open a demo account, attach the indicator to an M1 or M5 chart, and screenshot each signal. Wait for the candle to close and two more candles, then screenshot again and compare."
  - name: "Score the indicator and keep the screenshots"
    text: "Fill in the selection scorecard, then run at least two weeks of forward screenshots before the indicator influences any trade. Keep every screenshot with its time visible."
download:
  name: "Indicator Repaint Test Checklist"
  origin: "own"
  license: "Free to use, print and share with credit to bestmt4ea.com"
  version: "1.0"
  platform: "MT4/MT5"
  fileKey: "resources/indicator-repaint-test-checklist.pdf"
---

Arrow indicators are the most sold tool in forex. A chart full of green and red arrows looks like a clear answer. The problem is that some of those arrows are not stable. They appear, move or vanish after the candle that created them has already closed. This behaviour is called repainting. It is the main reason a backtest can look excellent while live results do not.

This guide does not hand you a list of "best" arrow indicators. No list can tell you which tool repaints on your broker's feed, in your terminal, with your inputs. Instead, this guide shows you how to test any arrow indicator yourself, on a demo account, in about 30 minutes. It also gives you a free checklist so you run the same test every time.

## Why do arrow indicators repaint?

Some indicators look backward and forward at the same time. To draw an arrow at a swing high, the code may need to know that price did not go higher over the next few bars. While the current candle is still forming, that future is unknown. A poorly built indicator draws the arrow early, then moves it or deletes it once the swing is confirmed. Everything it drew earlier is redrawn to fit the final shape.

Other indicators repaint for simpler reasons. They recalculate a smoothing filter or a moving average using the live price. The value on the last bar keeps changing until the candle closes. Some vendors do this on purpose and call it "recalculation" or "optimisation". The name does not change what you see: a signal that was not there a moment ago.

Some arrow indicators do not repaint at all. An indicator that reads only closed candles, and fixes its arrow when the bar closes, behaves differently. That is a property you can test. It is not a claim you should accept from a sales page.

## What does repainting look like on a real chart?

Picture a trader who buys an arrow indicator after a long backtest. On the historical chart, the arrows line up neatly with every turn. The trader feels sure the tool works, so they open a live demo chart to watch it.

A green arrow appears on the current bar. The trader enters. Ten minutes later the candle closes, and the arrow is no longer under that bar. It has moved two candles to the left and sits under a turn that already happened. The entry was based on a signal that was not fixed when it appeared.

This is the trap. The backtest looked perfect because the tester redrew the history using the final shape of the indicator. The live chart never had that shape when the trade was taken. So the test measured something the trader could not have seen in real time.

The loss in this story is not just a bad trade. The whole test was misleading. Every past result on a repainting tool is a poor guide to what will happen next, because the numbers were produced with information that was not available at the moment of decision.

Many traders meet this problem after they have already paid for a tool, opened several positions and started to doubt their own judgement. Repainting makes the tool look like the problem, and sometimes it is. Sometimes the real problem is that nobody checked the behaviour before the trades started.

## Why is a "best arrow indicator" list not enough?

Lists tend to repeat the same claims: "non-repainting", "no lag", "high accuracy". Many lists copy each other, and few of them run the tools they describe on a live chart. Even an honest vendor cannot test your broker's feed, your server time, your terminal build or the inputs you will change later.

Repainting depends on the code, the inputs, the terminal and the data feed. A word on a page proves very little about any of those. You can read the claim, but you still have to see the behaviour for yourself.

This is also why a single good-looking screenshot is not enough. One clean example shows that the tool drew a nice arrow once. It does not show that the arrow stayed fixed across many signals, sessions and market moves.

If you use divergence signals alongside arrows, the same rule applies. Read the guide on [non-repainting divergence indicator settings for forex trading strategies](/non-repainting-divergence-indicator-settings-for-forex-trading-strategies/) before you change any input, because settings can change whether a signal stays fixed.

## The solution: test any arrow indicator before it touches a trade

The test has three parts. First, watch the signals on a live demo chart and check whether any of them change after the candle closes. Second, open the strategy tester and check that it draws the arrows at the same bars you saw live. Third, score the indicator on what it does, what you can see and how it lags.

The Indicator Repaint Test Checklist lays this out on paper, so you can run the same test on every tool you consider. You do not need to be a programmer to use it. You need a demo account, a clock you trust and the discipline to take screenshots before you look at the result.

Keep one rule in mind from the start. You judge an indicator only by what it showed at the moment of decision. A signal you could not have seen in real time was never a usable signal.

## Step 1: How do you set up a demo chart for the test?

Open a demo account in your MT4 or MT5 terminal. Use a demo account only for this test. Do not connect a live account to a tool you have not yet checked.

Attach the indicator to a chart on M1 or M5. Low timeframes make repainting easier to catch, because more candles close in a short time and more signals fire. Keep the default inputs for the first run. Changing inputs is a separate test, and you should record it as one.

Turn on the time display on the chart or in the window title, so every screenshot shows when it was taken. Close other charts that might distract you. You are watching one thing: whether the arrows stay put.

## Step 2: How do you catch a repaint after the candle closes?

When a signal appears, take a screenshot immediately. Make sure the time is visible. Do not touch the chart, change the zoom or scroll back. Any change to the view makes the comparison harder.

Next, wait for the candle that created the signal to close. Then wait for two more candles to form. Take a second screenshot at the same point in the sequence, and compare the two images.

Ask three questions. Did the arrow move to a different bar? Did its size or colour change? Did it vanish? If the answer to any of these is yes, the indicator repainted. The sales page may call that recalculation or optimisation. Your screenshots are the evidence, and they are more reliable than any description.

One signal is not enough. Aim for at least ten signals across different sessions, because a tool can behave well during quiet hours and fail during the London or New York open. Record each signal with its date, time and pair, so you can match the screenshots later.

## Step 3: Does the strategy tester match the live chart?

Open the strategy tester in visual mode and run the indicator over a recent period. Compare the arrows the tester draws with the arrows you saw live. They must appear at the same bars.

If the tester shows a clean history, but your live screenshots show different bars, the backtest is not measuring what you would have traded. Stop there and do not trust the backtest results for that tool.

Some custom indicators do not run in the tester at all, or they run without drawing the same objects. That is also a finding. Write it down in the scorecard. A tool you cannot test in the tester is harder to trust, and you should treat it with more caution.

Remember that a tester is a model of the market, not the market itself. Matching bars show that the indicator behaves the same way on history and on live data. They do not show that the strategy will make money.

## Which questions separate a real tool from a toy?

The checklist includes a table of five questions. Each one has a good answer and a bad answer. Use the table before you spend time on a long test.

The first question is what data the indicator uses. A good answer says that it uses closed candles, and the description says so. A bad answer is a vague claim about a "proprietary AI formula" with no inputs you can see.

The second question is whether you can see and change the inputs. A good tool exposes its periods, sources and thresholds. A locked black box gives you nothing to test against.

The third question is whether the tool lags honestly. A good vendor states the delay, for example that a signal is confirmed after one or two bars. A bad answer promises "no lag, no repaint, 95 percent accurate". Pick at most one of those claims to believe, and test that one.

The fourth question is about alerts. Good alerts fire on candle close and can be configured. Bad alerts fire in the middle of a candle and re-fire as the signal flickers.

The fifth question is about backtest honesty. A good tool works in the tester with the same rules as live trading. A bad answer is "not suitable for backtesting", which in practice often means the history is redrawn.

## How do you score the indicator on the selection scorecard?

The checklist's third section is a short scorecard with four items. Score each one as a yes or no, and write a short note next to it.

The first item asks whether the indicator answers one question well. Trend, momentum, levels and volatility are different questions. A tool that promises all four usually answers none of them clearly. Choose the one question you need, then judge the tool on that alone.

The second item asks whether the indicator agrees with price more often than it argues with it. If you need three extra filters just to make it usable, the tool is probably not the right one. Extra filters can hide a weak signal rather than fix it.

The third item asks whether you can explain, in one sentence, what would make the signal wrong. If nothing could make it wrong, the indicator is decoration. A useful signal has a clear failure condition, such as a break of a recent swing or a move against a higher-timeframe trend.

The fourth item asks for two weeks of forward screenshots before the indicator influences a single trade decision. This step is where many traders skip ahead. Do not skip it. A few clean days on a demo chart show very little.

## What does the Indicator Repaint Test Checklist cover?

The checklist is a single PDF with three numbered sections, a repaint rule note and a short footer. Here is what each part does.

Section 1 is the repaint test. It takes about 30 minutes on a demo chart. It asks you to attach the indicator to an M1 or M5 chart, screenshot each signal with the time visible, wait for the candle to close and two more candles to form, screenshot again, and compare. It ends by asking you to repeat the check in the strategy tester's visual mode, so the tester and the live chart are compared directly.

Section 2 is the question table. It lists the five questions covered above, with a good answer and a bad answer for each. Use it to filter out weak tools before you spend hours on a long test.

Section 3 is the selection scorecard. It has the four items described above: one clear question, agreement with price, a stated failure condition, and two weeks of forward screenshots. It is a yes-or-no tool, so keep your notes honest.

The repaint rule note sits at the end of the body. It restates the core principle: judge an indicator only by what it showed at the moment of decision. The footer repeats the risk warning. Trading forex and CFDs carries a high risk of loss, most retail accounts lose money, and nothing in the checklist is financial advice.

The checklist is written for MT4 and MT5 users, but the same logic applies to any charting platform. The steps are the same: watch live, screenshot, compare, then score.

## What does the checklist not do?

The checklist is a test. It is not a verdict, and it is not a promise of results. It does not prove that an indicator is safe to trade. A tool can pass every step and still produce losing trades, because a stable signal is not the same as a profitable one.

It does not prove that the indicator will never repaint on your broker's feed. Your feed can differ from the feed the vendor used for its demos. Server time, spread and tick data can all change how a tool draws its arrows. Run the test on your own feed, on your own terminal, and treat a pass as a result for that setup only.

It does not replace a demo run. A short session cannot show how a tool behaves across weeks, quiet sessions, fast markets and news releases. The checklist asks for forward screenshots for that reason, and it is not a substitute for them.

It also does not test how the tool behaves around news. Major releases can widen spreads and make a feed jump several pips in a single tick. A tool can look stable on a quiet Tuesday and redraw its arrows during a release. If you trade around scheduled news, add a note about those sessions to your log, and test them separately before you rely on the tool at those times.

It does not measure profit or drawdown. It does not tell you how much to risk per trade, where to place a stop or when to stop trading after a losing streak. Those are separate decisions that need their own rules and their own tests.

It does not rank indicators against each other. Your score is for your own decision. Two tools with the same score can suit very different traders.

## What should you record in your test log?

A screenshot tells you what the arrow looked like. A log tells you what you did, when you did it and what you decided. Keep the two together. Without a log, a week of screenshots becomes a folder of images that nobody can read back in a month.

Use a plain text file or a spreadsheet with one row per signal. Record the date, the time, the pair, the timeframe and the indicator version. Add the name of the first screenshot and the name of the second. Then write one line that says whether the arrow stayed in place, moved, changed size or vanished.

Add a second column for the input values. Write down every input you left at its default, and every input you changed. If you change an input partway through the test, do not mix the results. Start a new block of rows, and label it clearly, so you can see which signals came from which settings.

Add a third column for the market context. A single word is enough, such as quiet, trending, news day or range. You are not building a trading journal here. You are checking whether the tool behaves differently in different conditions. A tool that repaints only during fast markets is still a tool that repaints, and you should know that before you trade it.

When you finish the two weeks, count the rows. Count how many signals stayed fixed, and how many did not. Write that number at the top of the log. It is the most useful single figure in the whole test, because it is the one you can compare between tools.

## How do you read a mixed result?

Real tests rarely produce a perfect pass or a clear fail. You may find that most signals stayed fixed, but a few moved after the candle closed. That is a mixed result, and it needs a clear decision rule before you look at the numbers.

A simple rule is to treat any repaint as a fail for live use. The reason is that you cannot tell in advance which signal will be the one that moves. If a tool moved even one signal after the close, you cannot know which of your future trades rests on a moving arrow. That is a weak position to trade from.

A second approach is to separate the results by cause. If the repaint happened only in the first few seconds after a news release, when the feed is unstable, the tool may still be usable for a different style of trading, such as one that waits for the close. If the repaint happened on quiet sessions as well, the tool is not stable enough for any style that depends on the arrow.

Whichever rule you choose, write it down before you open the log. Deciding after you see the numbers invites you to pick the rule that keeps the tool you already like. That is the same kind of bias that makes repainting hard to spot in the first place.

Finally, do not confuse a mixed result with a good result. A tool that repaints sometimes is not safe, even if it looks mostly clean. Treat the result as information about the tool, and move on to another candidate if the evidence points against it.

## What common mistakes hide repainting?

The most common mistake is testing only the historical chart. A backtest can redraw history, so the arrows look clean. Live screenshots do not change after the fact, and they are the only honest comparison.

The second mistake is judging a tool by the last few arrows on screen. The most recent signals are often the ones still moving. Look at signals that have had at least two closed candles to settle.

The third mistake is tweaking inputs until the chart looks good. This is curve fitting. The chart will look better, but you have only taught the tool to match the past. Record any input change as a new test, and start the screenshots again.

The fourth mistake is changing the timeframe mid-test. Each timeframe is a separate test. A tool that behaves on M5 may behave differently on H1, and a clean M1 result does not prove an H4 result.

The fifth mistake is trusting the word "non-repainting" in a title or a product name. The word is a claim. The screenshots are the proof. If the two disagree, believe the screenshots.

The sixth mistake is skipping the forward test because the first week looked good. A short run can hide a problem that appears only during volatile sessions. Two weeks of forward screenshots is the minimum the checklist asks for.

## Where does this fit in a bigger plan?

An indicator is one part of a trading plan. It is not the plan. You still need position sizing, a stop, a clear entry rule and a limit on losses. These parts often cause more damage than a repainting tool does.

If you are deciding where to place a stop around an arrow signal, read the guide on [the best ATR multiplier for stop loss](/the-best-atr-multiplier-for-stop-loss-a-comprehensive-guide/). It explains how volatility can set a stop distance, which is a better starting point than a fixed number of pips.

If you are testing a trend-following arrow, you may also compare it with a dedicated trend tool. The guide to the [best free Supertrend indicator for MT5](/best-free-supertrend-indicator-for-mt5/) covers how that tool draws its line and where its signals can lag.

If you also test on TradingView, the same repaint logic applies there. The guide to the [best order block indicator on TradingView](/best-order-block-indicator-tradingview/) shows how to judge a different kind of signal, and the same questions about closed candles and visible inputs still apply.

Some traders find that an indicator will not compile or load after they edit its code. If that happens, read [how to fix compile errors in MQL4](/how-to-fix-compile-errors-in-mql4-complete-step-by-step-guide/) before you decide the tool is broken. A failed load is not the same as a repaint.

If an expert advisor that uses arrows stops working after a platform update, the problem may be a version issue rather than the indicator itself. The guide on [why an MT4 EA stops working after an update](/mt4-ea-not-working-after-update-fix-best-proven-solutions/) lists the usual causes and fixes.

## Is the free checklist worth running this week?

Yes, if you are about to use an arrow indicator on a live account, or if you have already used one and want to know whether its signals were stable. The checklist costs nothing, takes about 30 minutes for the first pass, and gives you a written record you can review later.

Here is the simple path. Download the Indicator Repaint Test Checklist from the button on this page. Read sections 1 to 3 once. Open a demo account, attach the indicator to an M1 or M5 chart and run the repaint test. Then run the strategy tester in visual mode and compare. Finish the scorecard, and keep your screenshots for at least two weeks of forward testing.

If the indicator fails any step, do not argue with the result. Move on to another candidate, or stop using arrows altogether and test a different kind of signal. A tool you cannot verify is not a tool you should trust with real money.

Trading forex and CFDs carries a high risk of loss, and most retail accounts lose money. Nothing in this guide is financial advice. Test every system on a demo account with a written loss limit before you risk real funds. Download the checklist, run the test, and let the screenshots decide.
