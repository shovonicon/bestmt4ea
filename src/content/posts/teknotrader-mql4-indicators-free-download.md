---
title: "Free Open-Source MT4 Indicators with Full MQL4 Source"
slug: "teknotrader-mql4-indicators-free-download"
description: "Download a free, Apache-2.0 MetaTrader 4 and 5 indicator with complete source code, plus a step-by-step way to audit any MQL file before you compile it."
publishedAt: 2026-09-28
updatedAt: 2026-09-28
categories:
  - "Free Indicator"
categoryPaths:
  - "/category/free-forex-indicator/"
tags:
  - "open source"
  - "MT4"
  - "indicators"
  - "moving average"
quickAnswer: "This is a free, Apache-2.0 licensed MetaTrader indicator from EarnForex: a multi-timeframe moving average that plots the same MA from higher timeframes on your current chart, with full source. Because the source ships with it, you can read exactly how it calculates each value, compile it yourself, and check on a demo chart that closed signals never move."
keyTakeaways:
  - "Licence: Apache-2.0 — free to use, modify and share with proper attribution to EarnForex."
  - "It ships as source you can read and compile, not a compiled binary you can only trust."
  - "A multi-timeframe moving average shows trend from a higher timeframe without stacking five separate indicators on one chart."
  - "The setting that matters most is the timeframe and period pairing, and you can read in the code exactly how one maps to the other."
  - "Confirm non-repainting on demo: once a bar has closed, its moving-average value should not change."
faqs:
  - question: "Is this indicator free to use on a live account?"
    answer: "Yes. Apache-2.0 permits any use, including commercial, provided the copyright notice and licence travel with anything you redistribute. Like every indicator, it analyses price and displays information; it does not place trades, so the risk profile is different from an expert advisor."
  - question: "Why does shipping source code matter?"
    answer: "Compiled files are binary — you cannot see what they do. Source means you can audit the logic, change the parameters, and learn MQL by reading working code. For a free download especially, it removes the risk of an unknown binary running on your terminal."
  - question: "What does a multi-timeframe moving average actually do?"
    answer: "It calculates a moving average on a timeframe you choose, then draws that value on the chart of a different timeframe. So you can watch the H4 trend while you trade the M15 chart, without opening a second window or confusing two versions of the same line."
  - question: "Does it work on MetaTrader 5?"
    answer: "Yes. The repository provides source for both platforms, and you compile the version that matches your terminal. MetaTrader 4 uses MQL4 and MetaTrader 5 uses MQL5, so take the file for the terminal you actually trade."
  - question: "Does the indicator repaint?"
    answer: "Check it yourself on demo. Load it, note the value on a finished bar, and look again the next day. A moving average should change only on the bar that is still forming; if a closed bar's value shifts, something is wrong with the way it reads higher-timeframe data."
  - question: "Can I change the moving average method or period?"
    answer: "Yes, that is the point of having the source. You can adjust the period, the applied price and the smoothing method, recompile, and see the change immediately. Reading the input definitions in MetaEditor shows you exactly which options the author exposed."
sources:
  - label: "EarnForex/MTF_MA — source repository for the Multi-Timeframe Moving Average"
    url: "https://github.com/EarnForex/MTF_MA"
  - label: "Apache License 2.0 — full text"
    url: "https://www.apache.org/licenses/LICENSE-2.0"
  - label: "MQL4 Reference — indicator buffers and moving averages"
    url: "https://docs.mql4.com/"
primaryKeyword: "free open-source MT4 indicators"
installSteps:
  - name: "Download the source file"
    text: "Open the repository and download the source file rather than a compiled build, so you can read the logic before it ever reaches your terminal."
  - name: "Open the MetaTrader data folder"
    text: "In MetaTrader 4 or 5, go to File then Open Data Folder. This is the folder the terminal actually reads from, not your normal Documents directory."
  - name: "Copy into the Indicators folder"
    text: "Place the .mq4 file in MQL4/Indicators for MetaTrader 4, or the .mq5 file in MQL5/Indicators for MetaTrader 5. Keep a copy of the original somewhere else so you can compare it later."
  - name: "Compile in MetaEditor"
    text: "Open the file in MetaEditor and press F7 to compile. You are now running code you built yourself from source you can read, and any errors are visible rather than hidden."
  - name: "Attach it and set the timeframe"
    text: "Drag the indicator onto a chart, choose the higher timeframe and period you want, and confirm the line sits where you expect against your own moving average."
  - name: "Confirm no repaint on demo"
    text: "Attach it to a demo chart, note the value on a finished bar, and check tomorrow whether it moved. Only trust it once closed bars stay fixed."
download:
  origin: "opensource"
  license: "Apache-2.0"
  licenseUrl: "https://www.apache.org/licenses/LICENSE-2.0"
  author: "EarnForex"
  sourceUrl: "https://github.com/EarnForex/MTF_MA"
  version: "latest"
  platform: "MT4/MT5"
  externalUrl: "https://github.com/EarnForex/MTF_MA"
  updatedAt: 2026-09-28
---

Free indicators are usually distributed as compiled `.ex4` or `.ex5` files, which means you are running a binary that could do almost anything and you have no way to check. This download is different: it ships as **source code** under the Apache-2.0 licence, released by **EarnForex**, a developer that has published MetaTrader tools for years. That single difference changes what the download is worth.

The tool itself is modest and genuinely useful: **EarnForex Multi-Timeframe MA** plots a moving average calculated on a higher timeframe onto the chart you are actually trading. It is one of the quietest pieces of value a discretionary trader can own, because most of the error on a chart comes from looking at the wrong timeframe, not from using the wrong line. But the reason it is the download on this page is not only what it draws. It is that you can open the file, read the whole thing, compile it yourself, and see exactly which values it uses — which is what separates a tool you have verified from a tool you are guessing about.

This page has two jobs. The first is to explain what the indicator does, who it is for, and how to set it up on gold. The second, and the larger one, is to show you how to judge a source-available indicator in general, so that the next free download you install gets the same treatment rather than a blind double-click.

## What is included

One indicator for MetaTrader 4 and MetaTrader 5, with full source:

| Property | Detail |
|---|---|
| Name | Multi-Timeframe Moving Average |
| Author | EarnForex |
| Licence | Apache-2.0 — free to use, modify and redistribute |
| Platform | MetaTrader 4 (MQL4) and MetaTrader 5 (MQL5) |
| File type | Source you compile yourself |
| What it does | Plots a moving average calculated on a chosen higher timeframe onto the timeframe you are viewing |
| Inputs | Timeframe, period, applied price and moving-average method |
| Cost | Free, from the linked repository |

The idea is simple to state and useful in practice. A fifty-period moving average on an H4 chart describes a trend that a fifty-period average on M15 does not. If you trade the M15 chart but want to see the H4 trend, you have two options: switch charts constantly to compare them, or put the H4 average on the M15 chart and leave it there. The second option is what this indicator exists to do.

**Licence: Apache-2.0**, stated on the repository. Free to use, modify and share, provided the original attribution and notices are retained, and provided you note any files you changed. The author published the source rather than a locked build, which is the whole reason it is worth downloading here.

## Why a multi-timeframe moving average is the interesting part

Most indicators on a retail gold chart are trying to say something that a moving average already says better, and most of the rest are duplicates of each other wearing different colours. The multi-timeframe average is interesting for a different reason: it answers a question that no single-timeframe tool can answer, and it answers it without adding another opinion to the pile.

Here is the problem it solves. You have decided to trade the M15 chart, because that is where your entries are fast enough and your spreads are small enough. But the trend that matters to that trade was set on H4 or the daily, and your M15 average cannot see it. So you either flip between timeframes and lose your place, or you open a second chart and let the two windows drift out of sync. A multi-timeframe average collapses that into one line on one chart: the H4 trend, drawn exactly where you need it, on the timeframe where you act.

That is not a signal. It is context, and context is the part of trading that is hardest to hold in your head. A trader who can see that price is above a rising H4 average while an M15 pullback develops is making a different decision from a trader staring at M15 alone and guessing whether the dip is a buy or the start of a reversal. The line does not tell you what to do; it removes one excuse for doing the wrong thing.

The second reason it earns a place is discipline. A chart with one higher-timeframe average and one lower-timeframe trigger is a chart with a chain of command. The higher average sets the side you are allowed to trade, and the trigger decides when. Three moving averages of similar length, all describing almost the same thing, is a chart with three people shouting. This indicator lets you keep the one that carries the most information and drop the ones that only add noise, which is the same argument the ranking of [the best MT4 indicators for gold](/top-10-best-mt4-indicators-for-gold-xauusd-powerful-tools-for-accurate-trading/) makes in more detail.

## Where free indicators come from, and why the licence decides what you can do

Free indicators arrive from a handful of places, and the place they come from tells you something about what you are getting. Some come from developers who publish tools to build a reputation, and those usually ship with a licence and a repository. Some come from forums, where a member posts a compiled file with no author, no licence and no explanation. Some are stripped versions of commercial products, and some are original work that has simply been copied from one file host to another until its origin is lost.

The licence is the fastest way to tell these apart, because it is a statement about rights and obligations rather than a mood. "Free" with no licence is not permission — it is the absence of a statement, which legally means the author keeps every right and you have been granted nothing. A real open-source licence, by contrast, tells you exactly what you may do. Apache-2.0, which is what this download carries, lets you use the software, change it, build it into your own tools and redistribute it, provided the notices travel with it and you flag any modifications. That is broad permission, and it is why open-source files are the only free indicators you can fully trust: not because the author is generous, but because the terms are written down and the code is visible.

For a trader, the practical value is narrower and more important than the legal language. A licence and a repository mean you can open the file and read it. Everything else on this page depends on that. If you cannot read the code, you are not evaluating a tool; you are evaluating a sales page.

## What a compiled binary hides

A compiled `.ex4` or `.ex5` file is not a picture. It is a program that runs inside your terminal, with the permissions your terminal already holds, on an account that may carry real money. You cannot read a binary, so the only things you can observe are what it does after you have already allowed it to run. A source file is plain text, and plain text can be inspected before it touches a chart.

That difference changes which questions you can answer. With source, you can search for the function that reads higher-timeframe data and see how it handles the bar that has not finished forming — which is where repainting hides. You can check whether the tool writes files, requests DLL imports, or does anything at all beyond drawing a line. You can read the input definitions and understand exactly what each setting changes. None of that requires you to be a programmer. It requires the source to be present, and a five-minute skim to confirm the file is careful.

With a binary, you can do none of that. You can run it on a demo, watch the log, and hope it behaves — which is a reasonable fallback, but it is strictly weaker. The entire argument for choosing a source file over a compiled one is that it moves the inspection to a moment when you still have a choice about what happens next. If you want the fuller version of that reasoning applied to a specific tool category, the guide to a [non-repainting arrow indicator for forex](/best-non-repainting-arrow-indicator-for-forex/) walks through how to tell a fixed signal from a redrawn one, and the same method applies here.

## What the settings change

The indicator exposes a small set of inputs, and each of them does one thing. Reading them from the source is easy, and it removes the guesswork that usually surrounds a black-box tool.

**Timeframe.** This is the timeframe the average is calculated on, which is usually higher than the chart you are viewing. Set it to H4 while you trade M15 and you will see the H4 trend. Set it equal to your chart's own timeframe and you have recreated an ordinary moving average, which is a useful way to check the indicator is working before you trust the higher-timeframe reading.

**Period.** The number of bars the average smooths over, counted on the chosen timeframe, not on your chart. This is the setting most people get wrong. A fifty-period average on H4 covers a very different span of time from a fifty-period average on M15, and the code makes that explicit: the period belongs to the timeframe you selected.

**Method.** Moving averages come in several flavours — simple, exponential, smoothed, linear-weighted — and they differ in how much weight they give to recent prices. The smoother the method, the less it whipsaws and the more it lags. There is no version that escapes that trade-off, and reading the input list tells you which methods the author implemented rather than which one a marketing page claims.

**Applied price.** The average can be built from close, open, high, low, median or typical price. Most traders never change it, and for a trend reference the close is usually the right choice. The point is that the choice is visible and yours, not buried in a binary.

None of these settings is a secret, and none of them is magic. They are inputs you can read, change and test, and that is the honest reason to prefer a source tool: you are configuring a calculation you can see, not petitioning a black box.

## Reading the source before you trust the output

Once you have the file, the fastest useful pass is a targeted search rather than a line-by-line read. Open the `.mq4` or `.mq5` file in MetaEditor and look for four things.

First, the buffer declarations. An indicator allocates buffers for the lines it draws, and the declarations tell you how many lines there are and what each one is for. If the file draws one average, you should see one buffer dedicated to it. Extra buffers that are never plotted are worth a second look, because they can be scratch space or leftovers.

Second, the higher-timeframe read. Find where the code fetches prices from the selected timeframe. This is the part that decides whether the indicator is honest, because reading a forming higher-timeframe bar is exactly how a tool ends up changing a value that looked finished. Look at whether it waits for the higher-timeframe bar to close before it commits to a number.

Third, the file and DLL functions. Search the text for `FileOpen`, `FileWrite` and `DLL`. A moving average has no reason to touch your disk or to call outside code, and if you find those words, you have found something that needs explaining before you run it.

Fourth, the input list. The `input` and `extern` declarations are the settings you will see in the dialog, and reading them once tells you the full surface of what the tool can be asked to do. A tool whose entire behaviour is visible in a handful of inputs is a tool you can reason about.

That pass takes minutes, and it does not need you to understand every line. It needs you to notice anything that does not belong, and to be willing to ask what a function is doing before you let it run. That is the difference between installing something because a page told you to and installing something you have actually looked at, and it is the same discipline this site applies across the [free EA and indicator library](/free-download-forex-ea-indicator/).

## Attaching the indicator to a gold chart

Gold is a useful test case for a multi-timeframe average, because XAUUSD moves further per unit of time than any major currency pair and punishes a trader who is reading the wrong timeframe. The setup below is a sensible starting point rather than a rule.

Put the chart on the timeframe you actually trade — say M15 for a scalper, H1 for a swing trader. Add the indicator and set its timeframe one or two steps higher: H4 for an M15 chart, or the daily for an H1 chart. Set the period long enough to describe a trend rather than a wiggle; a fifty-period average is a common reference, and reading it on the higher timeframe is what gives it its weight.

Then use it the way it is meant to be used: as a filter, not a trigger. When price is above a rising higher-timeframe average, you are only interested in longs. When it is below a falling one, only shorts. The average does not tell you when to enter; it tells you which side of the market you are allowed to be on at all. Combining that with a shorter trigger on your own timeframe is the standard way to use it, and it is far cleaner than stacking several moving averages on a single chart.

Two details matter on gold specifically. First, gold has no single centralised price, so each broker streams its own blend of liquidity, and the higher-timeframe average is built from that feed. A trend that looks clean on one broker's chart can look choppier on another, so judge the indicator on the feed you will actually execute on. Second, XAUUSD is often quoted to two decimals, which means a "move" that looks small in points can be large in dollars. Set your expectations in price, not in pips, and the average will read more sensibly.

## How to test an indicator without fooling yourself

Any indicator can look good on a chart in hindsight, because the eye finds patterns in lines that were drawn over data you have already seen. The test that matters is a forward one, and it is cheap to run on demo.

Load the indicator on a demo gold chart and note the value on a bar that has already closed. Come back a day later and compare. If the closed bar's value has moved, the indicator is recalculating history, and nothing else about it is worth trusting until you understand why. A flicker on the forming bar is normal — the bar is not finished, so the average is still being pulled around. A change on a finished bar is not normal.

Then watch how the line behaves through a busy session. The interesting question is not whether it turned before a big move, because you can always find a bar where it did. The interesting question is whether it kept you on the correct side of the market through several ordinary days in a row. An indicator that is right fifty-one percent of the time and easy to follow will outlast one that is spectacular once a month and unreadable the rest of the time.

Finally, take a screenshot when you first load it and compare against the screenshot rather than your memory. Memory is generous to tools you want to believe in, and a screenshot is not. The same test applies to any tool you are evaluating, and the [MT4 EA and indicator catalogue](/best-mt4-ea/) applies it to the automated side of the site.

## Common mistakes with moving averages on gold

The first mistake is treating a moving average as a prediction. It is an average of prices that have already happened, and on gold, where the same level can be retested many times, the line is best read as a moving summary of where value has been, not a forecast of where it goes.

The second is choosing the period to fit the last move. Anyone can find a period that would have caught a given swing, and that period will usually fail on the next one. Pick the period from the behaviour you are trying to describe — trend versus noise — and keep it fixed while you test the rest.

The third is running several averages of similar length and calling it confluence. Two lines that move together are not confirmation; they are one line counted twice. If you want two references, make them genuinely different: a long higher-timeframe average for direction and a short trigger on your own chart for timing.

The fourth, and the most expensive on gold, is ignoring the spread. A moving average that flips you in and out as price weaves around it is fine on a quiet currency pair and ruinous on a metal whose spread widens exactly when the average is most confused. If you trade a moving-average crossover on XAUUSD, the cost of the whipsaws is part of the strategy, not an accident of your broker.

The fifth is reviewing the tool once and then never again. An indicator does not change, but the market does, and a period that described a quiet summer can look too slow by autumn. Keep a note of why you chose the settings you did, and revisit that decision when the character of gold shifts — not to chase the most recent move, but to check that the line still describes the behaviour you meant it to describe when you set it.

## What this download does not do

It is just as important to be clear about the limits.

- It does not place trades. It is an indicator; it draws a line and prints a value, nothing more.
- It does not predict the market or promise a result. No tool does, and any that says so is selling a story.
- It does not fix a weak plan. A trend reference still needs an entry rule, a stop and position sizing around it.
- It does not combine several averages for you. It shows one higher-timeframe average, and building more is your choice, made in the source.
- It does not replace the audit. It is the file you apply the audit to, not a substitute for it.
- It does not come with a warranty. Like almost all open-source software, it is provided as-is.

Read the licence before you use anything, and treat the line for what it is: a measured summary of the past, drawn honestly enough that you can inspect how it was calculated.

## Compiling and attaching the indicator

Because the file is source, the last step is not a double-click. It is a short, repeatable routine that leaves you with a binary you built yourself.

Copy the `.mq4` file into `MQL4/Indicators` for MetaTrader 4, or the `.mq5` file into `MQL5/Indicators` for MetaTrader 5. Open it in MetaEditor and press F7. A clean compile reads "0 errors, 0 warnings"; a warning is usually harmless and an error is not, so read whatever the Errors tab says before you go further. Then right-click the indicator list in the Navigator, choose Refresh, and drag the indicator onto your chart.

Set the timeframe and period, confirm the line sits where your own arithmetic says it should — calculate one value by hand on a recent bar if you want certainty — and then watch it on demo for a day to confirm closed values stay fixed. Only move it to a live chart once nothing has shifted. That sequence turns "I downloaded a file" into "I verified a file", and it is the habit worth keeping from this page.

## Risk warning

Indicators do not place trades and cannot lose money on their own, but the decisions they inform can. Trading forex and CFDs carries a high risk of losing money and is not suitable for everyone. Nothing here is financial advice, and the author's Apache-2.0 licence provides the work as-is, without warranty of any kind. Test on a demo account before applying anything to live capital, size your positions as though the worst historical day will recur, and never risk money you cannot afford to lose.

## Where to go next

Take the download, compile it yourself, and put it on a demo gold chart with a higher timeframe selected. Read the four things from the source — the buffers, the higher-timeframe read, the file and DLL search, and the input list — and you will have audited a real indicator in the time it takes to make a coffee.

Then carry the habit forward. The next free indicator you meet, wherever it comes from, deserves the same treatment, because the file you can read is always worth more than the file you can only trust. If you want more tools grouped by what they actually do, browse the [free download library](/free-download-forex-ea-indicator/), see how these sit next to automation on the [best MT4 EA page](/best-mt4-ea/), or work through the step-by-step guides under [Installation & Setup](/category/installation-setup/).
