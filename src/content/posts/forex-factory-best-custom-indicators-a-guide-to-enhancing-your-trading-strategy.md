---
wpId: 4220
title: "Forex Factory Custom Indicators: How to Test Them Safely"
slug: "forex-factory-best-custom-indicators-a-guide-to-enhancing-your-trading-strategy"
description: "Learn how to check forex factory custom indicators on a demo account before you trade. Spot repainting, confirm the file, and set honest risk limits too."
publishedAt: "2025-12-11T15:22:58.000Z"
updatedAt: "2026-10-22T00:00:00.000Z"
seo:
  title: "Forex Factory Custom Indicators: Test Them Safely (2026)"
  description: "Learn how to check forex factory custom indicators on a demo account before you trade. Spot repainting, confirm the file, and set honest risk limits too."
  canonical: "https://bestmt4ea.com/forex-factory-best-custom-indicators-a-guide-to-enhancing-your-trading-strategy/"
  ogImage: "https://bestmt4ea.com/wp-content/uploads/2026/07/post_4220_featured.webp"
sourceUrl: "https://bestmt4ea.com/forex-factory-best-custom-indicators-a-guide-to-enhancing-your-trading-strategy/"
categories:
  - "MT4/MT5 Indicator Reviews"
  - "Free Forex Indicators for MT4 & MT5"
  - "Forex Trading Strategies"
categoryPaths:
  - "/category/forex-indicator-reviews/"
  - "/category/free-forex-indicator/"
  - "/category/forex-trading-strategies/"
tags: []
draft: false
primaryKeyword: "forex factory custom indicators"
quickAnswer: "Custom indicators can help you read a chart, but only after you test them. Install the file in your MQL4 or MQL5 Indicators folder, confirm its name, check whether old signals change, then log its signals on a demo account for a fixed period. Treat the result as evidence for your own rules, not as a promise of profit."
keyTakeaways:
  - "A clean chart is not proof. Test every custom indicator on candles it has not seen."
  - "Check for repainting by noting a signal, letting the bar close, and reloading the chart."
  - "Confirm the exact file name and file type before you install anything."
  - "Log every signal on a demo account and review the log against your written rules."
  - "Risk per trade matters more than any single indicator signal."
faqs:
  - question: "Are forex factory custom indicators safe to use?"
    answer: "They can be used with care. Only install files you have checked, keep to compiled MT4 or MT5 indicator files, and test any tool on a demo account before it touches real money."
  - question: "How do I know if a custom indicator repaints?"
    answer: "Note where a signal appears, wait for the candle to close, then reload the chart. If the old arrow moved, disappeared or appeared in a new place, the indicator repaints."
  - question: "Where do MT4 and MT5 indicator files go?"
    answer: "Open the platform data folder from the File menu, then place the file in the MQL4 Indicators folder for MT4 or the MQL5 Indicators folder for MT5. Restart the platform so it appears in the Navigator."
  - question: "Can a backtest prove that an indicator works?"
    answer: "No. A backtest shows how the tool looked on past data, which can be fitted to that data. It is a warning sign to check, not proof that the tool will work on new candles."
  - question: "What should I do if a file is an .exe?"
    answer: "Do not run it. An MT4 or MT5 indicator is normally a compiled .ex4 or .ex5 file, or a source .mq4 or .mq5 file. An executable file is not an indicator and should not be opened on your computer."
sources:
  - label: "MetaTrader 5 Help: Algorithmic trading and testing"
    url: "https://www.metatrader5.com/en/terminal/help/algotrading/testing"
  - label: "MetaTrader 4 Help: Trading platform"
    url: "https://www.metatrader4.com/en/trading-platform/help"
installSteps:
  - name: "Open the platform data folder"
    text: "In MT4 or MT5, choose File, then Open Data Folder. Open the MQL4 folder for MT4 or the MQL5 folder for MT5."
  - name: "Copy the indicator file into Indicators"
    text: "Place the .ex4 or .ex5 file in the Indicators folder. Confirm the file name matches the one you intended to download before you copy it."
  - name: "Restart the platform"
    text: "Close and reopen MetaTrader so it scans the Indicators folder again. The indicator should appear under Indicators in the Navigator window."
  - name: "Attach the indicator on a demo chart"
    text: "Open a demo account, open a chart, and drag the indicator from the Navigator onto it. Check the inputs and note the settings you used."
  - name: "Check for repainting and log signals"
    text: "Record each signal with its time, price and your rule. Reload the chart later and confirm that past signals have not moved."
download:
  name: "Indicator Library (shared Drive folder)"
  origin: "shared"
  license: "Shared as-is from the Trading Tools Drive folder; not independently verified by bestmt4ea.com"
  externalUrl: "https://drive.google.com/drive/folders/1w99fcnzD_vfU_tSlc4Pz8zOEX81t5-_l?usp=sharing"
  platform: "MT4/MT5"
---

## Why a Clean Chart Is Not Enough

You open your chart. It is covered in lines, arrows, boxes and coloured bars. Someone says a new custom indicator will show you the exact moment to enter. You download it, attach it, and watch the arrows appear. The chart looks clear. It looks like the missing piece.

That feeling is the problem. A clean chart is not the same as a working method. Most custom indicators are built to look good on past candles. Whether they help you on future trades is a different question, and most traders never test it.

If you trade on MT4 or MT5, you have probably felt this. You want an edge. You want fewer mistakes. You want a tool that tells you when to act and when to wait. So you search for forex factory custom indicators, or a phrase like it, and you start collecting files.

Then the files pile up. Each one has a different name, a different author and a different promise. Some come with a short description. Some come with nothing but a screenshot. You open one, look at the arrows, and feel a small hope that this is the one. Then you open the next.

Three gaps show up again and again:

- You cannot see how the indicator was built, because you only have the compiled file.
- You do not know whether its signals move after they appear on the chart.
- You do not have a written rule for when to ignore it.

Each of these gaps is simple to describe. Each one is easy to overlook when the chart looks convincing. Together they explain why many traders keep switching tools without ever learning whether the tool helped them.

This is the problem this guide solves. It will not tell you which indicator to trust. It will show you how to test any custom indicator, including the ones you find in shared folders, so that you can make your own decision with evidence rather than with a screenshot.

## A Short Story About One Chart

This is a made-up example to show how the problem plays out. It is not a real trader's record.

Consider a trader named Maya. She trades on MT4 in the evenings, after her day job. She has a small account, a busy schedule and a strong wish to stop guessing. One weekend she finds an indicator that draws arrows on the chart. She installs it, attaches it to her usual pair, and scrolls back through the last few weeks. The arrows line up with several big moves. She feels she has found something.

On Monday she starts trading the arrows live. The first few signals look good. She feels confident, so she starts taking every arrow without waiting for her own setup to confirm it. She also increases her position size because she "trusts the tool" now.

Then a trend day arrives. A signal appears late, after price has already moved. She checks the chart again and sees that an arrow on the previous candle is no longer where it was. It has shifted. She had never noticed this because she had only looked at the chart after the moves were complete. She closes the trade with a loss that is larger than she planned, and she closes the platform in frustration.

Maya did not have a bad day because she is careless. She had a bad process. She treated an unknown tool as if it were proven. She did not record her signals. She did not check whether the indicator changed its own history. She also let a few good trades raise her confidence and her position size at the same time, which is the most dangerous combination in trading.

Her story has three lessons. First, a tool that looks good on past data may behave differently on new candles. Second, a small run of wins says very little about the next run. Third, the moment you feel most sure is often the moment you should slow down and check your rules.

Many traders reach the same point, usually after a few weeks of enthusiasm. The good news is that the fix is practical. You do not need advanced coding skills. You need a test plan, a demo account and a notebook or spreadsheet. The rest of this guide shows you how to build that plan.

## The Solution: Treat Every Indicator as a Hypothesis

The simplest way to think about a custom indicator is as a hypothesis. The author is saying: when this line does this, the market is more likely to do that. Your job is to test that claim on data you did not use to build the claim.

A hypothesis has three parts you can check:

1. **What it says.** Write down the exact condition the indicator claims to show. For example, "an arrow means the trend has turned up." If you cannot say it in one sentence, you do not understand the tool yet.
2. **When it says it.** Note whether the signal appears on the current candle, or only after the candle closes. This is the single most important detail for avoiding surprises.
3. **What you will do with it.** Decide what you will do when the signal appears. Will you wait for a second confirmation? Will you use it only in one session? Will you use it only as a filter for your own setup? Write the answer down before you watch the chart.

Once you have these three parts, the test becomes straightforward. You run the indicator forward on a demo account, you record every signal, and you compare the record to your written rules. You are not looking for a dramatic result in a few days. You are looking for consistency, clarity and any sign that the tool changes its own history.

### What repainting means and why it matters

Repainting is a term you will hear often in indicator discussions. It describes an indicator whose past values change after they have been drawn. A signal might appear at one price, then move to another, or vanish completely when you reload the chart. If that happens, the historical arrows you looked at were not the arrows you would have seen in real time.

Repainting is not always a sign of a scam. Some indicators are built to use the current candle, and that can make them look better than they really are on the chart. The point is that you need to know which kind you are testing before you trust it.

To check for repainting, use this simple routine:

- Attach the indicator to a demo chart and wait for a new candle to form.
- When a signal appears, write down its time, direction and price.
- Wait until that candle closes.
- Reload the chart, or switch timeframes and back again, so the platform redraws the history.
- Compare the old signal with what you wrote down. If it moved, appeared or disappeared, the indicator repaints at least in part.

This check takes a few minutes per signal. It is one of the most valuable habits you can build, because it catches a problem that a screenshot never shows.

### Why a backtest is only a warning sign

Many traders also try to test indicators by scrolling back through old candles and counting how many arrows looked right. This is called eyeballing a backtest. It can be useful for spotting obvious problems, but it has serious limits.

First, you already know where the big moves were. That knowledge makes it easy to see arrows that seem to fit. Second, many custom indicators have inputs that can be adjusted until they fit a chart closely. A tool that fits the past perfectly may fail on new candles, because it learned the noise of one period rather than a repeatable pattern.

The Strategy Tester in MetaTrader 5 is built to run Expert Advisors, which are automated trading programs. Its documentation covers how to test automated systems over history, and it is worth reading if you plan to automate a rule later. For a plain indicator, however, the most honest test is forward testing: watching it run on a demo account as new candles form. You can read the official [MetaTrader 5 help on algorithmic trading testing](https://www.metatrader5.com/en/terminal/help/algotrading/testing) to understand what the tester does and does not show.

Treat any backtest result as a reason to look more closely. Never treat it as a promise that the tool will work next week.

### Logging signals so the test has a result

A test without a record is just a feeling. The easiest way to turn a feeling into evidence is to log every signal. You do not need special software. A spreadsheet with a few columns is enough.

Record these fields for each signal:

- The date and time the signal appeared.
- The pair and timeframe.
- The direction the indicator showed.
- Whether it was a signal you would have taken under your own rules.
- What you did, and what happened, without drama.
- Whether the signal moved when you reloaded the chart.

After a fixed number of signals or a fixed period, review the log. Look for patterns rather than single trades. Are most of the useful signals occurring in one session? Do most of them come after a large candle, when entries are already stretched? Do the signals you took differ from the ones you skipped? These questions help you refine your rules, and they show you whether the indicator adds anything to your method.

For a related approach to rules and inputs, the guide on [non-repainting divergence settings](/non-repainting-divergence-indicator-settings-for-forex-trading-strategies/) explains how to think about settings and signal timing. The same logic applies to any custom tool.

## What the Shared Trading Tools Folder Is, and What It Is Not

This section matters more than any other. Read it before you download anything.

The download on this page is a shared Google Drive folder named Trading Tools. It was shared by the site owner as-is. The folder is a collection of files that bestmt4ea.com has not written, tested as a whole, or verified for licence, safety or behaviour. We have not confirmed what each file does, who wrote it, or whether the code is safe to run. We make no claims about results, accuracy, win rate or profit from anything inside it.

Because the folder is shared, its contents can change. A file you see today may be replaced or removed later. Treat the folder as a starting point for your own testing, not as a finished product.

Here is what this download is:

- A shared folder of indicator-related files, provided by the site owner as-is.
- A place to find candidate tools for your own demo testing.
- A reminder that every file must be checked before it is used.

Here is what this download is not:

- It is not a bestmt4ea.com product, and we do not sell or support the files inside it.
- It is not verified or licensed by us. The licence line on this page reflects only what the folder says about itself, and we have not independently checked it.
- It is not a list of recommended trading tools with proven performance.
- It is not a substitute for testing. No file in it should be traded on a live account without your own demo test.

### Confirm the file before you install it

Before you copy anything into your platform, check three things.

First, confirm the file name matches the file you intended to download. If the name is different, stop. Do not guess what it is.

Second, confirm the file type. On MT4, an indicator is normally a compiled .ex4 file, or a source .mq4 file that must be compiled. On MT5, the matching types are .ex5 and .mq5. These are the only file types that belong in your Indicators folder for this purpose.

Third, be careful with anything else. An .exe file is a program, not a chart indicator. Do not run it. A .zip archive may contain several files of different types, so extract it into its own empty folder, look at each file name, and install only the ones that match the indicator format. If you are unsure about a file, do not install it. Ask an experienced trader, or leave it out.

Scanning the file with your own security software before you open it is also a sensible step. A safe chart is one you control, and a file you do not understand can damage your computer long before it affects your trades.

### If an indicator fails to load

Sometimes a file will not appear in the Navigator, or it will show an error when you attach it. This is common, and it does not always mean the tool is bad. It can mean the file was compiled for a different platform version, or that it depends on another file you do not have. If you see compile or load errors, our guide on [fixing compile errors in MQL4](/how-to-fix-compile-errors-in-mql4-complete-step-by-step-guide/) walks through the usual causes. Do not try to fix a file by changing code you do not understand. If the error persists, remove the file from your Indicators folder and move on.

## How to Check Any Custom Indicator in Six Steps

The following process works for any indicator, from any source. It is designed to be boring on purpose. Boring tests protect your account.

### Step 1: Write the rule before you look

Open a blank note. Write one sentence that describes what you expect the indicator to show, and one sentence that describes what you will do when it does. Keep it short. For example: "When the arrow appears after a pullback in an uptrend, I will look for a long entry only if price holds the last swing low." If you cannot write this, you are not ready to trade the tool.

### Step 2: Install on a demo account, not a live one

Open a demo account in your MetaTrader platform. Keep your live account closed for this test. Demo accounts do not give you the feeling of real money, so you must be stricter with yourself. Set a fixed test window, such as two weeks or a set number of signals, and do not change the window halfway through.

To install the file, open your platform and choose File, then Open Data Folder. In MT4, open the MQL4 folder. In MT5, open the MQL5 folder. Copy the indicator file into the Indicators folder inside it. Confirm the file name one more time before you copy.

### Step 3: Restart and attach

Close the platform and open it again. This forces the platform to scan the Indicators folder. Open the Navigator window, expand Indicators, and find your tool. Drag it onto a chart. Note every input setting, because a change in settings can change the signals completely.

Use the same pair and timeframe for the whole test. If you change the timeframe, start a new log, because the signals will not be comparable.

### Step 4: Check for repainting

Wait for the first signal. Write down its time, direction and price in your log. Let the candle close. Then reload the chart or switch timeframes and back, and compare the signal with your notes. Repeat this check on several signals. If any past signal moved, appeared or disappeared, mark the indicator as repainting in your notes. You can still study it, but you should not treat its live arrows as final.

### Step 5: Log every signal and your decision

For each signal, record whether it matched your written rule, whether you would have taken it, and what happened after. Be honest about signals you skipped. They are as important as the ones you took. A log that only records your wins is not a test. It is a diary.

Keep your position size the same as your normal plan throughout the test. Do not raise it because the arrows look good. Changing size during a test makes the results impossible to read.

At the top of the log, write the start date, your account type, the platform, and every input setting you used. Six weeks from now, you will not remember which settings you tested. The header lets you prove exactly what you measured.

### Step 6: Review and decide

At the end of the test window, read your log without rushing. Ask whether the indicator helped you follow your rules more consistently, or whether it pushed you to trade more often. Ask whether any signal moved after it appeared. Ask whether the tool added anything your own setup did not already show.

Then make one of three decisions. Keep testing if the results are unclear. Drop the indicator if it repaints or if it leads you to break your rules. Or, if it passes your checks, keep it as one filter inside a complete plan, and continue to review it regularly. Market conditions change, and a tool that worked in one period may not suit the next. Write the decision in your log with the date, so the next review starts from what you actually concluded rather than from memory.

For a practical look at how a single input can change stop placement, read about the [ATR multiplier for stop loss](/the-best-atr-multiplier-for-stop-loss-a-comprehensive-guide/). Many custom indicators rely on volatility measures, and understanding them makes your tests more meaningful.

### A note on MT5 testing

MT5 offers more built-in testing features than MT4, and many traders on that platform eventually move toward automated rules. If you build an Expert Advisor from an indicator, test it in the Strategy Tester first, then on a demo account, before any live use. An Expert Advisor that depends on a repainting indicator can look perfect in a backtest and fail in live trading. This is one reason the forward test on a demo account remains the final check.

If you run into problems with an Expert Advisor after a platform update, the guide on [why an EA stops working after an update](/mt4-ea-not-working-after-update-fix-best-proven-solutions/) covers the most common causes and fixes.

## The Honest Limits: Drawdown, Costs and Bad Days

No indicator removes losing trades. Every tool, including the most carefully tested one, will show you signals that fail. The question is not whether losses happen. The question is how large they are, how often they happen, and whether your plan can survive a run of them.

### Drawdown is part of the process

Drawdown is the drop from a peak in your account value to a later low. Every trader faces it. A good indicator can still produce a long run of losing signals in a market that does not suit it. A bad week can happen to anyone. The honest response is to plan for drawdown before it arrives, not to hope it will not come.

A common approach is to risk a small, fixed percentage of your account on each trade, such as one percent. This is not a promise of safety. It is a way to keep one bad signal from doing lasting damage. Calculate your position size from your stop loss and your account size before you take any trade. If the stop loss is wide, the position must be smaller.

### Costs change the result

Spreads, commissions and slippage all reduce what you keep from a signal. A tool that looks profitable on a chart can look much less attractive once you add the cost of entering and exiting. Check the spread on your broker's demo account at the times you plan to trade, and note it in your log so you can compare the cost of each signal later. Be especially careful around high-impact news releases, when spreads can widen and fills can differ from the price you saw on the chart.

### Market conditions change

An indicator built to follow trends may struggle in a range. A tool that works on one pair may behave differently on another. A signal that looked clean in one month may become noisy in the next. Your log is the best defence against this. Review it at regular intervals, not only when you are losing. Look for changes in how the indicator behaves, not just in how much money you made or lost.

### Your own behaviour is part of the system

Many traders blame the indicator for losses that came from breaking their own rules. They enter early, skip the stop loss, add to a losing position or trade more often after a win. An indicator cannot stop you from doing these things. Only your written rules and your discipline can. This is why the rule you wrote in step one matters so much. It gives you something to measure your own behaviour against.

## Your Next Step

You now have a practical way to approach any custom indicator, including the files in the shared Trading Tools folder. Start small and stay disciplined.

Pick one indicator. Write one rule. Open a demo account. Set a test window that you will not change. Log every signal, including the ones you skip. Check for repainting by reloading the chart after each candle closes. Keep your position size the same as your normal plan. At the end of the window, review the log and decide what to do next.

If you finish the test with a clear answer, you have done something most traders never do. You have replaced a hope with evidence. If the answer is unclear, that is useful too. It tells you to keep your rules simple and keep testing before you add risk.

Use the Trading Tools folder as one source of candidate files, and remember that it is shared as-is. Confirm the file name, confirm the file type, and never run an executable you do not understand. Then let the demo chart do the talking.

Start your test today. Write the rule, open the demo account, and log your first signal before you look at the next arrow.
