---
wpId: 135151
title: "Range Detector Indicator MT4/MT5 Free Download: Guide"
slug: "range-detector-indicator-mt4-mt5-free-download-powerful-7-step-guide-to-smarter-range-trading"
description: "Learn how a range detector spots sideways markets on MT4 and MT5, how to set its rules, how to test it on demo, and what its free download does not do."
publishedAt: "2026-02-20T05:23:13.000Z"
updatedAt: "2026-10-22"
seo:
  title: "Range Detector Indicator MT4/MT5 Free Download: Guide 2026"
  description: "Learn how a range detector spots sideways markets on MT4 and MT5, how to set its rules, how to test it on demo, and what its free download does not do."
  canonical: "https://bestmt4ea.com/range-detector-indicator-mt4-mt5-free-download-powerful-7-step-guide-to-smarter-range-trading/"
  ogImage: "https://bestmt4ea.com/wp-content/uploads/2026/07/post_135151_featured.webp"
sourceUrl: "https://bestmt4ea.com/range-detector-indicator-mt4-mt5-free-download-powerful-7-step-guide-to-smarter-range-trading/"
categories:
  - "Free Forex Indicator"
categoryPaths:
  - "/category/free-forex-indicator/"
tags:
  - "range trading"
  - "MT4"
  - "MT5"
  - "drawdown"
  - "risk management"
draft: false
primaryKeyword: "range detector indicator MT4 MT5 free download"
quickAnswer: "A range detector indicator is a chart tool that marks sideways price zones on MT4 and MT5, showing a support edge, a resistance edge and the box between them. It helps you tell a range from a trend before you trade. It does not place trades, predict breakouts or remove risk, so test its rules on a demo account first."
keyTakeaways:
  - "A range is a box between a support edge and a resistance edge. A detector only measures whether price has stayed inside that box long enough to call it sideways."
  - "The main settings are the lookback length, the minimum box width and a confirmation rule. Change one at a time and log what each change does on demo."
  - "Range breakouts need a full candle close outside the box. A wick that pokes through is not a breakout, and most false moves come from trading the wick."
  - "The free download points to a shared third-party folder. Check the file source, the licence and the code before you attach it to a live account."
faqs:
  - question: "What does a range detector indicator do on MT4 and MT5?"
    answer: "It scans recent candles and marks the area where price has stayed between a high edge and a low edge. The box shows you where support and resistance sit and whether the market is moving sideways or trending. It does not place trades, and it cannot tell you which way the box will break."
  - question: "Is the Range Detector Indicator MT4/MT5 free download safe to use?"
    answer: "Only after you check it. Read the source code if it is provided, scan the file with antivirus software, and run it on a demo account first. A free indicator is still code running on your terminal, so treat it with the same caution as any other software."
  - question: "Does a range detector repaint?"
    answer: "It can. Any tool that redraws its boxes after a candle closes is repainting. Test it by replaying past bars in the Strategy Tester and comparing the boxes you saw live with the boxes it draws afterwards. If they differ, do not trade it."
  - question: "Which timeframe suits range trading best?"
    answer: "There is no single best timeframe. Shorter charts such as M15 give more ranges and more false breaks. H1 and H4 give fewer, larger ranges that are often easier to read. Pick one timeframe, test it on demo for several weeks, and stick with it while you learn."
  - question: "Can I use a range detector on gold as well as forex pairs?"
    answer: "Yes, the box logic works on any instrument with price history. Gold moves in larger swings, so its ranges are wider in points and its stops need more room. Test the settings on the symbol you actually trade rather than assuming a forex setup carries over."
sources:
  - label: "MQL4 Reference: iATR, the Average True Range indicator used to measure volatility"
    url: "https://docs.mql4.com/indicators/iatr"
  - label: "MQL5 Reference: Testing Trading Strategies in the Strategy Tester"
    url: "https://www.mql5.com/en/docs/runtime/testing"
  - label: "MetaTrader 4 platform information from MetaQuotes"
    url: "https://www.metatrader4.com"
installSteps:
  - name: "Read the licence and the source notes first"
    text: "Open the shared folder and the linked EarnForex repository. Confirm the licence for the specific file you plan to use, and do not assume the whole collection shares one licence."
  - name: "Scan the file before it touches your terminal"
    text: "Run the downloaded file through antivirus software. If the file is source code, read it and look for any order-sending calls you did not expect."
  - name: "Open your MetaTrader data folder"
    text: "In MetaTrader 4 or MetaTrader 5 choose File, then Open Data Folder. That is the directory the terminal reads when it loads indicators."
  - name: "Place the file in the Indicators folder"
    text: "Inside the data folder open MQL4 or MQL5, then Indicators, and copy the file in. If it is source code, open it in MetaEditor and press Compile so the terminal can load it."
  - name: "Restart the terminal and attach it to a demo chart"
    text: "Restart the terminal, find the indicator in the Navigator, and drag it onto a demo chart for a single symbol and timeframe. Keep the default settings until you have written down your own."
  - name: "Log the boxes before you trade them"
    text: "Record every box and breakout the tool produces for at least 30 signals. Only consider live trading once the log shows the tool behaves as you expected."
download:
  origin: "shared"
  license: "Unverified third-party bundle (2,000+ EAs and indicators)"
  author: "EarnForex"
  sourceUrl: "https://github.com/EarnForex/Channel-Pattern-Detector"
  version: "latest"
  platform: "MT4/MT5"
  externalUrl: "https://drive.google.com/drive/folders/1w99fcnzD_vfU_tSlc4Pz8zOEX81t5-_l?usp=sharing"
  updatedAt: "2026-09-29"
---

A range is one of the most common market states, and one of the most expensive to misread. Price spends a large share of its time moving sideways between a floor and a ceiling. When you treat that sideways drift as the start of a trend, you buy into the top of the box, get stopped out, and then watch the market go back to where it was. Repeat that for a month and you have a lot of small losses and a strong feeling that the market is rigged against you.

It is not rigged. It is ranging, and ranging markets punish trend tactics. The problem is that on a live chart, a range looks like a trend for the first few candles of every move. You cannot always see the box clearly until price has already escaped it.

This is the problem a range detector is meant to solve. You want a tool that draws the box for you, shows where the edges sit, and tells you whether the market is currently inside a range or moving away from one. The idea is simple. The execution is where most traders go wrong.

## Why do sideways markets cost traders so much?

Sideways markets cost traders because the tactics that win in trends lose in ranges. A breakout strategy waits for price to leave a level and then joins the move. In a range, most of those exits are false: price pokes outside the box, triggers the entry, and returns inside within a few bars. The trader buys a breakout that was never a breakout.

Imagine a trader who reads a sideways gold chart as a bull trend. Over three weeks they take eleven long trades near the top of the same daily box. Each entry is logical on its own. Each stop sits just below the range low, and each time price drops into that stop before reversing. The account shrinks steadily and the trader blames bad luck. This is an illustrative composite of a common pattern, not a record of any one account. The real error was earlier: the trader never measured whether the market was trending at all.

Range trading solves that exact mistake. Before you ask where to enter, you ask whether there is anything to enter on. A range detector is one way to make that question visible on the chart.

### What is the cost of not knowing the state?

The cost is not only the losing trades. It is the trades you never evaluate. A trader who cannot tell a range from a trend cannot learn from their results, because the same setup produces both wins and losses depending on the state of the market. The journal shows noise and no pattern.

Knowing the state turns noise into data. If you record for each trade whether the market was ranging or trending, you can see which conditions your strategy survives. That is worth more than any single indicator setting.

## What does a range detector actually measure?

A range detector measures how long price has stayed within a defined band and how tight that band is. Most versions use three inputs: a lookback length, a box width rule and a confirmation rule. Understanding those three is the difference between a tool you trust and a tool that merely looks clever.

The lookback length is the number of closed candles the detector scans to find the highest high and the lowest low. A short lookback finds small, frequent boxes. A long lookback finds larger, slower boxes. Neither is correct on its own. The right length depends on the timeframe you trade and how often you want the tool to speak.

The box width rule decides whether the band is narrow enough to call a range. A common approach compares the box height with a volatility measure such as the Average True Range. If the box is shorter than a set multiple of ATR, the market is treated as ranging. This is the logic behind the MetaTrader 4 and MetaTrader 5 ATR indicator, which measures the average size of recent candles. The official reference for that calculation is linked in the sources above.

The confirmation rule is where many free tools differ. Some draw a box as soon as the width condition is met. Others wait for price to touch both edges several times before the box is drawn. The second approach gives fewer boxes, and those boxes are usually more reliable, because each edge has been tested rather than assumed.

### How do the three inputs interact?

They interact in a way that surprises most beginners. A tight width rule with a short lookback produces many small boxes that break constantly. A loose width rule with a long lookback produces a few huge boxes that cover most of a move. You need to tune the three together and look at the chart each time, not one at a time in isolation.

Keep a simple rule while you learn. Start with the default lookback, set the width multiple so that obvious ranges are caught and obvious trends are not, and require at least two touches on each edge before a box counts. Change one input only after you have watched the default behave for a full week.

## How do you set up a range detector without fooling yourself?

You set it up by making the rules explicit before you look at the results. A detector that you adjust after every losing trade will always look good in hindsight, because you are fitting it to the past. The honest approach is to fix the settings, record every signal, and judge the tool on the signals you recorded.

Work through this sequence on a demo account, using a single symbol and a single timeframe.

- Choose one symbol. Forex majors are the usual starting point because they have deep history and tight spreads. Gold works too, but its ranges are wider in points and need more stop room.
- Choose one timeframe. H1 is a sensible default for range trading. M15 gives more boxes and more false breaks. H4 gives fewer boxes that are often easier to read.
- Write the settings down. Record the lookback length, the width multiple and the confirmation rule before the first trade.
- Log every box the detector draws. Note the time, the box high, the box low and whether the box held or broke.
- Run it for at least 30 boxes before you judge it. A handful of boxes tells you nothing about the tool.

The log is the real deliverable. The indicator is only a way of producing rows for it. Traders who skip the log end up trusting the chart because it looks neat, and that is a poor reason to risk capital.

### What about settings that the download exposes?

Most range tools expose a few inputs such as colours, alert preferences and minimum range size. Colours are cosmetic. Alerts are useful only if you have decided in advance what an alert means. The minimum range size is the input that matters most, because it sets how small a box has to be before it is worth your attention. Set it using ATR on your symbol rather than a fixed number of points, so the rule adapts when volatility changes.

## How do you trade a range breakout without chasing it?

A range breakout is a move that closes outside the box and holds there. The word that matters is closes. A candle whose wick pierces the edge and then returns inside is a test of the level, not a breakout. Trading the wick is the most common way range traders lose money, and it is also the easiest to avoid.

Wait for the full candle to close outside the box. Then check whether the next candle continues in that direction or returns inside. Only if the move holds do you consider an entry, and even then you should expect some of these entries to fail. A breakout strategy wins by having a small loss on the failures and a large move on the successes, not by winning every time.

Set the stop inside the previous range. If price returns into the box, the breakout thesis is wrong, and the stop should say so. Place the take profit at a multiple of the risk, such as 1.5 or 2 times the distance to the stop, so that the reward covers the failures over time. The exact multiple is a choice you should test rather than copy.

### Why do breakouts often happen in sessions?

Breakouts often happen when a new session brings fresh volume. The London and New York opens are the most common examples, and they can push a quiet box through its edge. That does not mean every session breakout is real. It means you should check whether the breakout is happening at the same time a session is opening, and note how often that combination holds on your chart.

Session timing is worth testing, not assuming. Track breakouts by session in your log. After thirty or more events, the pattern will either be clear or it will not, and either result is useful.

## How do you trade a range reversal without catching a falling knife?

A range reversal trades inside the box: you buy near the support edge and sell near the resistance edge, targeting the opposite side. It is the mirror of the breakout strategy, and it works only while the market is actually ranging. The moment the box breaks and holds, the reversal logic becomes a losing trade generator.

The discipline is to require the box to be intact before you enter. Look for price to touch the edge, reject it with a clear candle, and begin moving back toward the middle of the range. Enter after that rejection, not while price is still falling into the edge. Waiting costs you the best price, and that is the price you pay for not buying a collapse.

Keep stops tight but not invisible. Put the stop just beyond the edge, far enough that normal spread and small wicks do not hit it. Tight stops feel safe until the first wick takes out a position that would otherwise have worked. The size of the stop should come from the box itself, not from how much you are willing to lose on a whim.

### When should a reversal trade stand aside?

Stand aside when the box is narrowing into a point, when the market has just produced a news release, or when a higher timeframe shows a clear trend. In those conditions the edges stop behaving like edges, and a reversal entry is a guess dressed as a plan.

## Which mistakes break a range strategy?

Most range strategies do not fail because the box is drawn badly. They fail because the trader does something the rules did not allow. The mistakes below are common enough to be worth writing down before you start, so you can recognise them while they are happening.

- Overtrading small boxes. A tiny box is noise. If the box is smaller than your spread plus a reasonable stop, the setup is not worth taking.
- Ignoring scheduled news. A release can blow through any box in seconds. Check the calendar before the session and stand aside around high-impact events.
- Trading without a stop. A range trade with no stop is a bet that the box will hold forever. It will not.
- Trading against a strong trend. A box can be a pause inside a larger move. Check the higher timeframe before you fade an edge.
- Relying on one indicator. A range detector tells you the state of the market. It does not tell you when to enter. Pair it with a rule for timing, such as a rejection candle or a close back inside the box.
- Changing settings after a loss. This is the mistake that makes every backtest look better than the live result. Fix the settings and judge them on a fixed sample.

The rule that ties these together is simple. Every trade should be explainable in one sentence that refers to the state of the market, the level being traded and the exit. If you cannot write that sentence before you click, do not take the trade.

## What is in this free download?

The download on this page points to a shared Trading Tools folder that holds a curated third-party collection of MetaTrader 4 and MetaTrader 5 files. The folder carries a licence note on the page, and the collection is not a single product with a single author's guarantee. Before you use anything from it, open the folder, find the file you intend to test, and confirm its author, licence and source code.

The collection named on the download card is built around the Channel Pattern Detector by EarnForex, an open-source project released under the Apache-2.0 licence, with the source published on GitHub. That project is related to range and channel detection, but the shared folder is broader than one file, so do not assume every item in it works the same way. Treat the card as a pointer to a collection and read each file yourself.

| Spec | Detail |
|---|---|
| Download type | Shared third-party folder of MT4 and MT5 files |
| Platform | MetaTrader 4 and MetaTrader 5 |
| Relevant project | EarnForex Channel Pattern Detector (Apache-2.0, source on GitHub) |
| Licence | Stated on the card as an unverified third-party bundle; check each file |
| Author | EarnForex for the linked project; other items vary |
| Cost | Free to download from the shared folder |
| Signals | Depends on the file you choose; test the signals you get |

### What it does not do

- It does not guarantee that any box will hold, that any breakout will continue, or that any reversal will work.
- It does not place trades for you unless a specific file in the folder is an Expert Advisor, and you must check that yourself.
- It does not come with a verified live track record, and no backtest result in this article should be read as a forecast.
- It does not replace a stop, a position size or a news filter. Those decisions stay with you.
- It does not fit every symbol or timeframe. The box logic needs tuning for each one you trade.
- It does not remove the risk of trading. Leverage can turn a small box break into a large loss.

Because the folder is shared rather than verified, the first job is due diligence. Read the source, check the licence, scan the file, and run it on demo. If any of those checks fail, leave the file alone.

## How should you test a range tool before you trust it?

Test it on demo, on one symbol and one timeframe, for long enough to see at least 30 boxes and 30 breakouts or reversals. Log every signal. Judge the tool on the log, never on a chart you have already tidied up.

Use the Strategy Tester to replay past bars. Step forward one candle at a time, record each box as it forms, and compare it with the box shown after the fact. If the boxes move, the tool is repainting, and that is a reason to stop using it. If they stay put, the next question is whether the signals are worth taking after costs.

Keep the test honest. Include the spread on every trade, because a range trade with a narrow target can be wiped out by spread on a volatile open. Record drawdown, not only profit, because a strategy that wins most of the time can still lose money if the losses are large. Write down how many consecutive losses you saw, and check whether your account could absorb that run at your chosen risk per trade.

### What does a fair test look like?

A fair test uses fixed settings, a fixed symbol, a fixed timeframe and a fixed period. It includes costs. It reports drawdown and the largest losing streak. It is written down before you start, so you cannot change the rules after you see the result. If your test does not meet those conditions, it is a sketch, not evidence.

Demo testing is also not the same as live trading. Demo fills are usually easier than real ones. Add a margin of caution to your demo results, and start live with a smaller size than your test assumed.

### What should a range log look like?

A useful log has one row per box and one row per resulting trade. Keep the columns the same every time, so you can sort and count without rebuilding the sheet. A spreadsheet or a plain text file is enough. The point is consistency, not software.

| Column | What to record | Why it matters |
|---|---|---|
| Date and time | The bar where the box was confirmed | Lets you check session timing later |
| Box high and box low | The two edges, in price | Shows the width you were trading |
| Box width in ATR | Box height divided by the ATR reading | Separates tight boxes from wide ones |
| Setup type | Breakout, reversal, or no trade | Keeps the two strategies from blurring together |
| Result in R | Profit or loss as a multiple of the stop | Makes results comparable across sizes |
| Held or broke | Whether the box survived the test period | Tests the box itself, not only your trade |
| Notes | Anything unusual, such as a news release | Helps you find the conditions that break the rules |

Review the log once a week. Count how many boxes held and how many broke. Count how many breakouts continued for at least one more full candle. Compare the reversals that rejected the edge with the ones that did not. These numbers tell you more than a chart screenshot, because they show how the tool behaved across many setups rather than the few you remember.

### How do you read the log without fooling yourself?

Look for patterns across many entries, not single dramatic trades. A run of five losses is normal in any strategy with a 40 to 60 percent win rate, so do not change settings after a short streak. Change settings only when the log shows a consistent problem over a meaningful sample, and when the problem points to a specific rule you can test.

Also watch for what the log leaves out. If you only write down the trades you took, you are measuring your selection, not the tool. Record every box the detector draws, including the ones you ignored, because the ignored boxes often reveal whether your filters are doing the work you think they are.

### What does a range test cost you in time?

A proper test takes time. Expect a few weeks of demo trading to produce 30 or more boxes on a single symbol and timeframe, and longer if you use a higher timeframe such as H4. That time is cheap compared with learning the same lesson on a live account. Treat the test as the price of admission, and do not skip it because the chart looks convincing on the first day.

## Where can you go next with a range approach?

Once you can identify a range reliably, you can build a broader plan around it. Many traders combine range detection with a higher-timeframe trend filter, so that they only fade a range when the larger picture is also sideways. Others use the box as a reference level and trade it with a separate momentum or price action trigger.

If you want to compare the tool you are testing with other options, the [top ranking](/top-ranking/) pages show how indicators and EAs are grouped by category and by evidence. The [customer feedback](/customer-feedback/) page explains how we handle reviews, and why we publish only feedback that customers have confirmed. For anyone who wants automation rather than a manual approach, the [shop](/shop/) lists licensed products with their stated limits, and a [forex VPS](/product/forex-vps/) can keep an MT4 or MT5 terminal running when your own computer is off. A VPS does not change the quality of a signal, so use it only once your demo results justify running a strategy unattended.

## Closing: what should you do this week?

Pick one symbol and one timeframe. Download the shared folder, find the file you want to test, and check its source, licence and author before you attach it to a chart. Set the lookback, the width rule and the confirmation rule in writing. Then trade the demo account for at least 30 boxes and log every one of them.

At the end of the test, you will know one of two things. Either the tool reproduces its boxes and gives you a clear, checkable picture of sideways markets, or it does not. Both outcomes are useful. A tool that passes the test earns a place in your routine. A tool that fails has saved you from paying for the lesson with real money.

Range trading rewards patience and punishes impatience. The box is only as good as the discipline you bring to it. Use the detector to see the state of the market, then let your rules decide the trade.

Trading forex and gold carries a high risk of loss, and leverage can magnify losses as well as gains. Most retail accounts lose money. Nothing in this article is financial advice, and no indicator, file or strategy on this page removes that risk. Past results do not predict future outcomes. Test every tool on a demo account first, and only risk money you can afford to lose.
