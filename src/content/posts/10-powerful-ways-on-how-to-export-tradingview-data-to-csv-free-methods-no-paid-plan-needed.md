---
wpId: 2029
title: "Export TradingView Data to CSV Free: 4 Methods That Work"
slug: "10-powerful-ways-on-how-to-export-tradingview-data-to-csv-free-methods-no-paid-plan-needed"
description: "Export TradingView chart data to CSV without a paid plan. Four honest methods, what each one captures, and the limits to check before you trust the numbers."
publishedAt: "2026-10-22T00:00:00.000Z"
updatedAt: "2026-10-22T00:00:00.000Z"
seo:
  title: "Export TradingView Data to CSV Free: 4 Methods That Work 2026"
  description: "Export TradingView chart data to CSV without a paid plan. Four honest methods, what each one captures, and the limits to check before you trust the numbers."
  canonical: "https://bestmt4ea.com/10-powerful-ways-on-how-to-export-tradingview-data-to-csv-free-methods-no-paid-plan-needed/"
  ogImage: "https://bestmt4ea.com/wp-content/uploads/2026/07/post_2029_featured.webp"
sourceUrl: "https://bestmt4ea.com/10-powerful-ways-on-how-to-export-tradingview-data-to-csv-free-methods-no-paid-plan-needed/"
categories:
  - "AI-Powered Trading Tools"
  - "Brokers & Trading Platforms"
categoryPaths:
  - "/category/ai-powered-trading-tools/"
  - "/category/brokers-trading-platforms/"
tags: []
quickAnswer: "To export TradingView data to CSV on a free account, you have four realistic routes: copy the values from the Data Window into a spreadsheet, export from a paid chart-data feature if your plan includes it, plot your indicator values with a Pine Script and read them out, or pull candles from a broker or public data feed. Each route captures different fields, and a free copy-paste export only covers what is on screen."
primaryKeyword: "export TradingView data to CSV free"
keyTakeaways:
  - "Free accounts can copy visible values, but the copy only covers the bars currently on screen."
  - "Chart-data export depends on your plan. Check your account before you plan a workflow around it."
  - "Pine Script lets you write indicator values to the Data Window, which you can then copy into a CSV."
  - "Always compare an exported file against the chart on a few bars before you backtest with it."
faqs:
  - question: "Can I export TradingView data to CSV for free?"
    answer: "Yes, in a limited way. A free account can copy the values shown in the Data Window or the price scale for the bars on screen. Full historical exports depend on your plan, so check what your account includes before you build a process around it."
  - question: "Why does my copied data stop at a certain date?"
    answer: "Because TradingView only holds the bars loaded into the chart. Scroll the chart further back to load more history, then copy again. Copy only what is loaded, and note the first and last timestamp in your file."
  - question: "Does a Pine Script indicator export data?"
    answer: "It writes values to the chart, and the Data Window shows them for each bar. You can then copy those rows. The script does not write a file on its own, so the CSV step is still a copy-paste or a manual save."
  - question: "Is exported TradingView data good enough for backtesting an EA?"
    answer: "It is good enough to study a pattern, but it is not a substitute for tick data. A candle export hides intra-bar order and spread changes. Use it to check an idea, then test the EA in the MetaTrader Strategy Tester on data from your broker."
sources:
  - label: "TradingView support: Pine Script documentation"
    url: "https://www.tradingview.com/pine-script-docs/"
  - label: "MetaQuotes: MetaTrader 5 Strategy Tester documentation"
    url: "https://www.metatrader5.com/en/terminal/help/algotrading/testing"
installSteps:
  - name: "Download the guide"
    text: "Use the download button on this page to get the TradingView CSV Export Guide as a PDF."
  - name: "Choose your method"
    text: "Read the method table and pick the route your plan and project support."
  - name: "Run the five checks"
    text: "Count rows, check order, prices, time zone and a three-bar sample before you calculate."
  - name: "Keep a record"
    text: "Name the file with symbol, timeframe, source and date, and keep the raw export unchanged."
download:
  name: "TradingView CSV Export Guide"
  origin: "own"
  license: "Free to use, print and share with credit to bestmt4ea.com"
  version: "1.0"
  platform: "MT4/MT5"
  fileKey: "resources/tradingview-csv-export-guide.pdf"
draft: false
---

If you trade, analyse or build models, you have probably searched for a way to export TradingView data to CSV without paying for a higher plan. The problem is real. A chart holds the candles you need for a study, but the file you want is locked behind a button you cannot see, a copy that stops at the edge of the screen, or a script that prints values nowhere useful.

The cost of guessing is high. A spreadsheet built from a partial copy looks finished. The averages, the win rates and the drawdowns all calculate, and they calculate on the wrong bars. You then spend an afternoon tuning a strategy that was never tested on the history you thought it was. The file looked right, so nobody checked it.

The fix is not a secret tool. It is a short, repeatable process: know which route captures which fields, copy from the right place, confirm the first and last timestamp, and compare a few rows against the chart before you trust the file. This guide walks through the four routes that work on a free account, and shows where each one falls short.

## Can You Export TradingView Data to CSV Without a Paid Plan?

Yes, but only in part. A free account gives you direct access to what is on the screen, and that is enough for many small studies. It does not give you a one-click download of years of history. Treat any claim of a full free export with suspicion, including the ones that promise it in a headline.

Here is the honest split. What you can capture for free is the set of bars loaded into your chart, with the values the chart displays for them. What you cannot count on is a complete historical file, the exact tick data behind each candle, or an export button that works the same way across every market. Plans and features change, so check your own account settings before you plan a workflow around any single option.

Know this boundary before you start. It decides which route fits your project, and it stops you building a backtest on a sample you did not mean to use.

## Why Your Export Stops at the Wrong Point

Most failed exports have one cause. The chart only holds the bars that are loaded, and TradingView loads more history as you scroll left. If you copy after a short look at the chart, your file starts at the oldest bar you happened to see, not at the start of the period you meant to study.

A second cause is the timeframe. A 15-minute chart and a daily chart give different row counts for the same date range, so a file exported from the wrong chart can look like a different market. Always label the symbol, the timeframe and the exchange in the file name, so you can tell the exports apart later.

A third cause is the price scale. Copying from a view that is zoomed or auto-scaled can hide rows that sit outside the visible range. Reset the chart to show the full history you need before you copy.

## Method One: Copy the Data Window Into a Spreadsheet

This is the simplest free route, and it works on every plan. Open the chart, hover over a bar, and the Data Window shows its open, high, low and close values, along with volume where the market reports it. Move the cursor across the bars, and the values change with it.

For a file, the practical step is to copy the values for the range you need. Set the chart to the period, load the history by scrolling, and read the rows. Paste them into a spreadsheet, then add a header row with the fields in order: time, open, high, low, close, volume. Save the sheet as CSV.

The limit is manual work. Reading every bar by hand is slow, and a long history takes many steps. Use this route for a short study, a single pattern or a sample to check another method. It is not the way to build a ten-year dataset.

Keep the first and last timestamp in a note beside the file. That single habit prevents most of the mismatches described above, because you can see the coverage at a glance before you run any calculation.

## Method Two: Use the Chart-Data Export If Your Plan Includes It

Some TradingView plans include a chart-data export. When it is available, it writes the bars for the active chart to a file, which is faster and cleaner than copying by hand. The menu location and the rows it includes can change between versions, so read the current option on your own screen rather than trusting an old screenshot.

Check three things before you rely on it. Confirm that the file covers the range you asked for, not only the bars on screen. Confirm the column order and the time format, because a spreadsheet may read a timestamp in a different time zone from the one you expected. Then compare the first ten rows and the last ten rows against the chart.

If your account does not include the feature, do not look for a workaround that breaks the terms of your plan. Use Method One for small studies, or move the history work to a data source you are allowed to download from.

## Method Three: Write Indicator Values With Pine Script

This route is the one most traders miss. Pine Script is TradingView's own scripting language, and a script can calculate any value you want for every bar. The script draws the value on the chart, and the Data Window shows it next to the price, so you can copy it with the candles.

A basic example is a moving average or a custom signal plotted as a line. Once it is on the chart, the Data Window shows the value for each bar. You then copy the rows that matter, with the candle values and your calculated column together, into a sheet.

This method gives you data you cannot get from the candles alone. You can export a custom signal, a session flag or a volatility reading, and build a dataset around your own idea. The cost is that you must write and check the script yourself, and an error in the calculation will carry into every row you copy. Test the script on a few bars where you already know the answer.

The reference for the language is the official Pine Script documentation, which lists the functions and the plotting options. Start with a short script that plots one value, confirm it matches a manual calculation, and only then build the larger dataset.

## Method Four: Pull Candles From Your Broker or a Public Feed

For a long history, the most reliable source is often the one your EA will trade on. Your broker's MetaTrader terminal can export historical bars for a symbol, and those bars match the prices your EA sees. For a test that will run in the MetaTrader Strategy Tester, this is the better base, because the data comes from the same place as the live feed.

A public data feed is another option for research that does not need to match a single broker. Check the licence and the usage terms before you download or redistribute the data. Some feeds are free for personal study and restricted for commercial use, and you must respect that.

The trade-off is that different sources disagree. A candle from a broker and a candle from a charting platform can have different open and close values on the same minute, because each one records a different price stream. Pick one source for a project and keep it. Mixing sources in one file creates errors that are hard to find later.

## How to Check the File Before You Use It

Every route above can produce a file with a hidden fault. Run these checks before you calculate anything.

Confirm the count. Compare the number of rows with the number of bars you expect for the period and timeframe. A daily file for one year should have roughly 250 rows, not 240 or 290, unless you know why.

Confirm the order. Timestamps should rise from top to bottom. A file that is out of order will break any calculation that depends on the previous bar.

Confirm the prices. Check that the high is never below the open or close, and the low is never above them. A single impossible row often points to a copy-paste mistake.

Confirm the time zone. Note whether the timestamps are in your local time or the exchange time. A shift of a few hours moves a session boundary and changes every session-based result.

Compare a sample. Pick three bars from the file and find the same three on the chart. If any value differs, stop and find the cause before you continue.

## What the Export Cannot Tell You

A candle export is a summary. It records the open, high, low, close and volume for each bar, and it does not show the order in which prices moved inside that bar. A strategy that enters and exits within one candle can look profitable on a candle export and fail on real tick data, because the fill order was never recorded.

Spread is the other gap. A candle export usually shows the traded price, not the bid and ask you would pay. For a scalping strategy, the spread can decide the result, and a file without it overstates the gain. Add a spread assumption to your test, and treat the result as a rough guide until you test on data that includes it.

Finally, past data does not forecast the next period. An exported history is useful for studying how a setup behaved, and it is weak evidence for how it will behave next month. Use it to form a hypothesis, then test the hypothesis on data you did not use to build it.

## Build a Repeatable Export Process

Doing the export once is easy. Doing it correctly every time is what protects your results. Write the process down and follow it for every file.

Start by naming the file with the symbol, timeframe, source, date range and the date you exported it. A name like XAUUSD_M15_source_2025-01-01_to_2025-12-31_exported-2026-10-23.csv tells you what the file holds without opening it.

Next, record the method you used and the plan or tool it depended on. If the export depended on a feature, note the date, because features change and a future you will need to know what produced the file.

Then run the five checks in the previous section, and write the result beside the file. A file you have checked is worth far more than a file you simply have.

Last, keep the raw export unchanged. Make any cleaning or calculations in a copy. When a result looks wrong, you can always return to the raw file and trace the problem.

## Choose the Right Route for Your Project

Pick the route from the question you are asking, not from the method that sounds easiest.

If you want to study one pattern across a few weeks, Method One is enough. Copy the bars, check the count, and work on the pattern.

If you want a dataset that includes your own calculated signal, Method Three is the one to learn. Write the indicator, test it on a few bars, and copy the values with the candles.

If you want a long history for backtesting an EA, use the broker's MetaTrader data, because it matches the feed your EA will trade on. Use Method Four, and keep the source fixed for the whole project.

If your plan includes the chart-data export and you need a clean file for a short period, Method Two saves time. Check the coverage and the time zone before you rely on it.

Whichever route you choose, the test that matters is the one run on demo money. A clean export tells you the data is right. It does not tell you the strategy works in live conditions, with real spreads, slippage and your own mistakes.

## Compare the Four Routes Side by Side

The table below sets the routes against the questions traders ask most often. Use it to narrow the choice before you start copying.

| Question | Data Window copy | Chart-data export | Pine Script values | Broker or public feed |
|---|---|---|---|---|
| Works on a free account | Yes | Depends on your plan | Yes | Yes, depending on the source |
| Covers full history in one step | No | Yes, if included | Only the loaded bars | Yes |
| Includes your own calculated fields | No | No | Yes | Only if you calculate them |
| Needs writing code | No | No | Yes, a short script | No |
| Matches your EA's price feed | Not certain | Not certain | Not certain | Yes, if it is your broker |
| Manual effort per file | High | Low | Medium | Low once set up |

Read the table as a set of trade-offs rather than a ranking. The Data Window copy is the cheapest to start and the slowest to scale. The broker feed is the best match for an EA test and the most setup work. The Pine Script route is the only one that gives you a custom column for free, and it is also the easiest to get wrong on a silent calculation error.

## Why a Candle Export Can Mislead an EA Test

A common mistake is to treat a clean spreadsheet as proof that a strategy works. The spreadsheet is clean because the export is simple, not because the strategy is sound. Three things drive the gap between a candle study and a live result.

The first is the fill. A candle shows where price went during the bar, not the order it went there. When your rule says buy above a level and sell below a second level inside the same candle, the export cannot tell you which level was reached first. The backtest will often assume a favourable order, and the live account will not.

The second is the spread. A candle export records one price per field, and a live trade pays the spread on every entry and exit. On a slow timeframe the spread is a small share of the move. On a scalping timeframe it can be the whole edge. A strategy that wins by a few pips a trade can lose once the spread is counted.

The third is the sample. A few hundred bars from one quiet month can make almost any rule look good. A rule that works only in one trending year has not been tested across the conditions that matter, including sideways markets and sudden news moves. Count the number of trades before you believe the win rate. Ten trades is an anecdote.

When you build an EA test on an exported file, record all three assumptions in the test log: the fill rule, the spread, and the number of trades. A result without these three is not yet a result.

## A Worked Example of the Five Checks

Imagine you have exported one year of 15-minute bars for a gold symbol, and you want to study a breakout rule. Here is how the five checks look in practice.

Count. A 15-minute chart runs for around 96 bars per trading day on a market open most of the day. Your file should therefore hold a number of rows close to the expected total for the trading days in the year, not a number that is far above or far below it. If the count is far lower, the copy stopped early. If it is far higher, the file probably includes duplicate rows from a second paste.

Order. Sort the file by timestamp in your spreadsheet and check that the sort does not change the row count. An out-of-order block often comes from a paste that landed above the header, and it makes any rolling calculation read the wrong previous bar.

Prices. Filter for rows where the high is below the close or the low is above the open. Each one is impossible for a valid candle. Fix the source row, not the formula that reads it.

Time zone. Find the first bar of a known session, such as the daily open, and check that it appears at the time you expect in your own zone. If it sits three hours away, your session filters are reading the wrong hours.

Sample. Pick three bars from the middle of the file, for example the bar at the start of a London session, a bar during a news release, and a bar at the end of a session. Find the same three on the chart and compare all six values. Any mismatch means the copy or the source is wrong.

Run the five checks every time, not only on the first file. A file that passed last month can fail after a copy from a different chart or a changed setting, and the checks cost only a few minutes.

## Common Errors and How to Avoid Them

Most export errors repeat. Learn the pattern and you will catch them early.

Mixed timeframes in one sheet. Pasting a 1-hour block under a 15-minute block creates rows that look like one series. Keep one timeframe per file, and put the timeframe in the file name.

Header drift. A header that reads close in one file and Close in another breaks lookups in some tools. Use one fixed header set and check it before you merge files.

Decimal and separator settings. A spreadsheet set to a comma decimal separator reads 1.2345 as a date or as text. Set the locale before you import, and check one price against the chart.

Hidden rows and filters. A filter left on in the spreadsheet hides rows, and a sum over the visible cells ignores them. Clear filters before you calculate, or the totals will look smaller than they are.

Auto-formatting of dates. Some spreadsheets turn a timestamp into a date and drop the time. Keep the timestamp as text in the raw file and convert a copy when you need to.

Stale copies. A file saved last week may hold the old bars if the chart changed since. Re-export before any new test, and record the export date in the name.

## When a Free Method Is Not Enough

There is a point where a free route stops being the right tool. You will know it has arrived when the work stops being a study and becomes a production process, with many symbols, many years and a need for exact timing.

Signs that you have reached that point include a need to test across several symbols at once, a need for tick-level detail to model fills, a need to repeat the same export every week without manual copying, and a need to share the data with a team that must reproduce your numbers. Each of these asks for a source you can document and repeat, such as your broker's history, a licensed data vendor, or a script you control end to end.

Choosing a paid source is a business decision, and it should follow the cost of a wrong result. A small study does not justify a large data bill. A live account risk does. Compare the cost of the data against the money you would risk on a strategy built on a flawed file.

## Next Steps: Test the Idea on a Demo Account

Once you have a file you trust, turn the idea into a test. Build a short list of rules, write them down before you run anything, and test them on a period you did not use to design the rules. Record the spread assumption, the commission and the slippage you expect.

If your idea is an EA, load it into the Strategy Tester with the same data source you used for the study, then run it on a demo account before any live money. Watch the drawdown, not only the profit. A strategy that makes money on average and loses heavily in one stretch will break most accounts before the average recovers.

If your rule depends on a stop distance, work out that distance from volatility before you fix it, and compare it with [how the ATR multiplier sets a stop loss](/the-best-atr-multiplier-for-stop-loss-a-comprehensive-guide/). A stop chosen by eye usually fails on a file you did not build it from. If your rule uses a band or a line from a chart tool, read [the Supertrend indicator for MT5](/best-free-supertrend-indicator-for-mt5/) before you copy its values into a sheet, because its output changes when the lookback changes. Rules built on zones need the same care, so see [the order block indicator for TradingView](/best-order-block-indicator-tradingview/) for how zones are drawn and when they are invalidated. If the EA will not load after you move it to a new terminal, [the compile error guide](/how-to-fix-compile-errors-in-mql4-complete-step-by-step-guide/) covers the usual causes.

Keep the test log. Write the date, the settings, the period, the result and one sentence on what surprised you. The log is the record that tells you whether the idea holds up, and it is the only evidence you should weigh before you decide to risk real capital.

Trading carries a real risk of loss. Past results, including results from an exported dataset, do not guarantee future performance. Start small, test on demo, and only commit capital you can afford to lose.
