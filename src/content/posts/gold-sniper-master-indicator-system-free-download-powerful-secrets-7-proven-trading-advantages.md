---
wpId: 137378
title: "Gold Signal Indicator Repaint Test: How to Audit Arrows"
slug: "gold-sniper-master-indicator-system-free-download-powerful-secrets-7-proven-trading-advantages"
description: "An arrow you cannot audit is a screenshot, not a tool. Run the repaint test, the bar-close test, then forward-test gold signals on demo before you risk money."
publishedAt: "2026-02-21T12:57:10.000Z"
updatedAt: 2026-09-29
seo:
  title: "Gold Signal Indicator Repaint Test: How to Audit Arrows"
  description: "An arrow you cannot audit is a screenshot, not a tool. Run the repaint test, the bar-close test, then forward-test gold signals on demo before you risk money."
  canonical: "https://bestmt4ea.com/gold-sniper-master-indicator-system-free-download-powerful-secrets-7-proven-trading-advantages/"
  ogImage: "https://bestmt4ea.com/wp-content/uploads/2026/07/post_137378_featured-1.webp"
sourceUrl: "https://bestmt4ea.com/gold-sniper-master-indicator-system-free-download-powerful-secrets-7-proven-trading-advantages/"
categories:
  - "Free Forex Indicator"
categoryPaths:
  - "/category/free-forex-indicator/"
tags: []
draft: false
primaryKeyword: "gold signal indicator repaint test"
quickAnswer: "No screenshot can prove a gold arrow signal works. Run three tests instead: the repaint test (does an old arrow ever move?), the bar-close test (is the signal final only when the candle closes?), and a demo forward test of at least 100 logged signals on your own broker feed. Anything you cannot reproduce in your own terminal is marketing, not a tool."
keyTakeaways:
  - "A signal you cannot audit is a screenshot, not a tool. Evidence is a timestamped log you reproduced yourself, not an image someone chose to publish."
  - "Repainting means history gets rewritten: an arrow that pointed up at 13:00 can vanish or flip when the next bars close. If an old signal moves, every backtest built on it is fiction."
  - "The repaint test is cheap: two screenshots of the same XAUUSD chart, taken at least 50 bars apart, compared arrow by arrow."
  - "The bar-close test is stricter. A real gold signal is final at the close of a completed bar. If the alert fires mid-candle, the signal is not yet a signal."
  - "The Strategy Tester audits logic, not behaviour. Only a demo forward test on your own broker feed, with 100 or more logged signals, shows what the tool really does."
  - "Demo first, always. A test that passes is not a promise, and on XAUUSD your stop can be taken before the move you predicted ever happens."
faqs:
  - question: "What does repainting actually mean on a gold arrow indicator?"
    answer: "Repainting means the indicator rewrites signals it already printed. An arrow that appeared at 13:00 is deleted, moved or flipped once the next bars close and the data becomes final. The chart you look at tonight is not the chart the market showed you live, which is why a repainting indicator produces backtests that look far better than any account that traded it in real time."
  - question: "Can I test for repainting without having the source code?"
    answer: "Yes. Take a screenshot of the last 200 bars on your MetaTrader 4 or MetaTrader 5 XAUUSD chart with the timestamps visible, wait for at least 50 new bars to form, then take the same screenshot and compare them arrow by arrow. Any historical arrow that moved, appeared late or disappeared has failed. If you can read the source, you can also check directly whether it reads the unfinished current bar."
  - question: "How many demo trades before a gold signal indicator is worth trusting?"
    answer: "One hundred logged signals is a reasonable floor, and 200 is better. Below roughly 30 trades the result is mostly noise: a normal run of winners or losers can look like an edge or a disaster. Aim for at least one month of live-market demo signals, covering both a trending phase and a ranging phase, because gold indicators usually behave very differently in each."
  - question: "Why does a gold indicator look better in the Strategy Tester than on a demo account?"
    answer: "The tester replays saved price history with approximated ticks, assumed spreads and perfect fills, while a demo account uses a live feed with real spread widening, slippage and requotes. If the indicator reads the still-forming bar, the tester gives it knowledge the live market never had. Treat the Strategy Tester as an audit of the logic, then use demo results to judge the behaviour."
  - question: "Is the Gold Sniper Master Indicator System free download a scam?"
    answer: "Judge it by whether you can audit it, not by the name. Any gold signal product that only shows arrow screenshots, hides its rules and has no stated licence is unverifiable by design, and unverified files from random download pages can carry malware. A tool whose source you can read, compile and test on a demo account is a different category of thing entirely."
  - question: "Does a gold signal indicator work the same on MetaTrader 5 as on MetaTrader 4?"
    answer: "No. MQL4 and MQL5 are different languages with different APIs, so an .ex4 or .mq4 file will not compile or run in MetaTrader 5, and an .ex5 will not run in MetaTrader 4. You need a build made for your platform. A version that simply does not exist for your terminal is a hard limit, not a settings problem you can fix."
sources:
  - label: "MetaQuotes — MQL4 Reference: indicator functions"
    url: "https://docs.mql4.com/indicators"
  - label: "MetaQuotes — MQL5 Reference: timeseries and indicator access"
    url: "https://www.mql5.com/en/docs/series"
  - label: "MetaTrader 5 Help — Strategy Tester"
    url: "https://www.metatrader5.com/en/terminal/help/algotrading/testing"
  - label: "EarnForex Float — MT4 and MT5 trend wave indicator source repository (Apache-2.0)"
    url: "https://github.com/EarnForex/Float"
  - label: "Apache License 2.0 — full licence text"
    url: "https://www.apache.org/licenses/LICENSE-2.0"
installSteps:
  - name: "Download the source, not a screenshot"
    text: "Open the repository and get the Float source file for your terminal — Float.mq4 for MetaTrader 4 or Float.mq5 for MetaTrader 5 — rather than a compiled file from a random download page. Readable source is the only version you can check for repainting before it touches your terminal."
  - name: "Read the licence and the file, in that order"
    text: "Check the LICENSE file first, which is the Apache-2.0 licence here, then read the code. Look at which bars the level calculation reads, because that single decision determines whether the levels can move after they are drawn."
  - name: "Compile it in MetaEditor"
    text: "Place the file in your MetaTrader data folder under MQL4 or MQL5, then Indicators, and compile it with MetaEditor. Compiling it yourself means you know exactly what ends up on your chart."
  - name: "Run the repaint test on XAUUSD"
    text: "Attach the indicator to a gold chart, screenshot the last 200 bars with timestamps, then come back after 50 or more new bars and compare the wave and level lines bar by bar. Any line that moved or vanished has failed the test."
  - name: "Watch the bar-close test on one measurement"
    text: "Wait for a live wave to be measured and watch whether the levels hold still while the bar is still forming. A structure drawn from an unfinished bar is provisional; a structure drawn from closed bars is one you can log and compare."
  - name: "Forward-test 100 signals on a demo account"
    text: "Open a demo at the broker whose feed you will actually trade, then take every measurement the tool gives for at least 100 logged observations without changing the settings. Record the level prices, your entry, the spread, the stop and the outcome, then review the log before any live capital is involved."
download:
  origin: "opensource"
  license: "Apache-2.0"
  licenseUrl: "https://www.apache.org/licenses/LICENSE-2.0"
  author: "EarnForex"
  sourceUrl: "https://github.com/EarnForex/Float"
  version: "latest"
  platform: "MT4/MT5"
  externalUrl: "https://github.com/EarnForex/Float"
  updatedAt: "2026-09-29"
---

You downloaded a gold arrow indicator. You attached it to XAUUSD, watched it for a week, and it looked superb. Green arrows under the lows, red arrows over the highs, every one of them landing within a few cents of a turn. So you opened a live account and took the next five arrows. Three lost. You went back to the chart to work out what you misread, and two of those "losses" were not the trades you remembered taking. The arrows had moved.

That is the entire problem in one paragraph. A gold signal you cannot audit is a screenshot, not a tool. A screenshot has no memory, so it can never tell you whether the arrow you see at 14:35 today was also there at 14:35 yesterday, or whether it appeared three candles later once the turn was already obvious. Every marketing image of a signal indicator is a photograph of the past with the unflattering parts cropped out.

This page is not a feature list and it is not an install guide. It is a procedure. You will get three tests you can run yourself on MetaTrader 4 or MetaTrader 5 — the repaint test, the bar-close test, and a demo forward test — plus a free, Apache-2.0 indicator source for both platforms that you can read and compile, because source is the only kind of signal file you can truly audit. If you want the wider library first, the [free MT4 and MT5 downloads](/free-download-forex-ea-indicator/) hub is a reasonable place to start. If you would rather just compare finished tools, the [best MT4 EA](/best-mt4-ea/) page covers robots instead of arrows.

Here is why this matters more on gold than anywhere else. XAUUSD moves several times as far in a session as EUR/USD or GBP/USD, and it does it in bursts around scheduled events — US CPI, Nonfarm Payrolls, FOMC decisions, the London gold auction. That combination, wide ranges plus clustered news, makes gold the favourite instrument of anyone selling an arrow. A signal that repaints will look spectacular on XAUUSD precisely because the moves are so large. The bigger the candles, the more impressive a hindsight arrow looks, and the more it costs you when you try to trade it live.

So the real question is never "how many signals does this indicator give?" The real question is "can I prove, on my own terminal, that the signal I would have traded was actually there before the move happened?" Most gold signal products on the market cannot answer that question, and the ones that can usually do not need to shout about it.

## Why does a screenshot of a gold signal prove nothing?

A screenshot proves that an arrow exists at a price and a time that someone chose to show you. It cannot prove the arrow was there while the market was live, because you cannot press play on an image. That is the whole argument, and no amount of arrows on one picture gets around it.

Think about what a screenshot leaves out. It leaves out the signals that were deleted before the picture was taken. It leaves out the 40 loss arrows that sat on the same chart the week before. It leaves out the exact moment the arrow first printed, which is the only timestamp that matters. It leaves out which broker's feed it was drawn on, and gold has no single central exchange — each broker blends its own liquidity, so two terminals can disagree about whether a level was even touched. It leaves out the timeframe, the spread at the moment of entry, and whether the trade that arrow suggested would have been stopped out by the wick that followed.

You can also fake a screenshot without editing a single pixel. Load an indicator, wait for the chart to fill with arrows, then scroll back and photograph only the section where the arrows line up with the turns. Nothing dishonest was typed; the picture still tells you nothing. This is why vendor galleries all look identical: they are not evidence of a method, they are evidence that arrows exist. A serious tool hands you a ledger instead — every signal with a timestamp, a price, a direction and an outcome, so you can replay it against your own broker's history and check it line by line.

That comparison is worth putting in a table, because it is the difference between marketing and a tool.

| What you see | What it actually is | What an audit needs |
| --- | --- | --- |
| Arrow on a turn, today | One moment, chosen in hindsight | Signal time, printed before the move |
| A clean profit run | A selected sample | Every signal, winners and losers included |
| No losses shown | Losses cropped or filtered | Stop distance and outcome per trade |
| "Works on gold" | A claim with no feed named | Broker, spread, timeframe, session |
| Pretty colours | A visual style | Rules you can read in the source |

To be fair to whoever made the screenshot, the picture may be perfectly honest. The problem is that it is unverifiable, and an unverifiable claim is worth exactly as much as a claim with no evidence. If you want examples of how the "non-repainting" label gets used loosely across the category, the [non-repainting arrow indicator comparison](/best-non-repainting-arrow-indicator-for-forex/) is a useful read next, and so is the wider [MT4 indicator ranking for gold](/top-10-best-mt4-indicators-for-gold-xauusd-powerful-tools-for-accurate-trading/) if you want to see which standard tools hold up instead.

Write this above your desk: if you cannot audit a signal, it is not a tool, it is an advertisement. Auditing does not require trust, a community, a Telegram channel or a vendor's word. It requires a chart, a clock and a log.

## What is repainting, and why does it break your testing?

Repainting is when an indicator rewrites a signal it has already printed. An arrow appears at 13:00 and you see it, then price reverses, more bars close, and that arrow quietly deletes itself or flips to the other side. The chart you review at the end of the day is not the chart the market showed you while it was live. Nothing was hacked and nobody lied to your face — the code simply never committed to an answer.

The mechanism is not mysterious once you can read it. Most indicators are asked to describe the bar that is still forming, which traders call the current bar, index zero, or "shift 0". In MQL4 and MQL5 the last element of a price series is the candle in progress. Its close price does not exist yet; it is whatever the bid happens to be this second. If an indicator checks "is high above the upper band?" on that unfinished candle, the answer changes with every tick, and the moment the candle closes the condition can flip to false. Either way, the value the indicator wrote for that bar gets overwritten. On the chart that is an arrow vanishing. In a backtest, it is worse than vanishing: the testing engine reads the final stored history, so the arrow it "took" is the one that survived — the one that was right.

Two other patterns cause the same effect. The first is look-ahead logic, where a rule references bars that had not happened yet when the signal fired — a zigzag-style pivot that only knows it was a pivot because three bars came after it. The second is deliberate cosmetic smoothing, where a histogram or line is redrawn for appearance and the vendor never claims it trades. Display repainting is not automatically wrong. Selling a redrawn display as a live entry signal is.

Here is why this matters beyond aesthetics. Everything downstream of the signal inherits the flaw. An EA that reads a repainting buffer will trade a signal that never existed in real time, and it will look excellent in a backtest because the backtest is reading the corrected history. A human trader will simply lose money and blame their discipline. Your account balance does not care about the label on the tool; it cares about the price at which you could actually have entered.

There is a practical limit worth stating plainly: without source code you cannot always prove repainting, but you can almost always detect it. Detection is enough. You do not need a confession; you need a repeatable test that the indicator fails.

## How do you run the repaint test on a gold arrow indicator?

You run the repaint test by comparing the same historical window at two different moments in time and checking whether the old arrows stayed put. It costs nothing, needs no source code, and takes about ten minutes of work spread across a session or two. If an old signal moves, the test is over and the verdict is already in.

Do it like this. First, open your XAUUSD chart on the timeframe you would actually trade — M15 and H1 are the honest choices for gold, because they are where people really put entries. Set the chart so you can see roughly the last 200 bars, and make sure the time axis is visible so the timestamps are in the picture. Take the screenshot and save it with the date in the file name.

Then wait. Come back after at least 50 new bars have formed on that timeframe. In a single trading session on M15 you will get through that in a day; on H1, give it a week. Do not change the indicator settings in between, do not change the chart, and do not switch brokers. Take the same screenshot — same window, same zoom, timestamps visible.

Now lay the two images side by side and check every arrow in the overlapping region. Match them by candle, not by feeling. An arrow that was under candle X and is now under candle X minus two has moved; the indicator is repainting. An arrow that was there and is now gone has been deleted; same failure. An arrow whose colour flipped has repainted. Only if every historical arrow is in exactly the same place, at exactly the same price, on exactly the same bar does the test pass.

| Step | What you do | Pass | Fail |
| --- | --- | --- | --- |
| 1 | Screenshot last 200 bars, timestamps visible | Baseline saved | — |
| 2 | Wait 50+ new bars, change nothing | Window held | Settings or broker changed |
| 3 | Re-screenshot the same window | — | — |
| 4 | Compare arrow positions bar by bar | All arrows identical | Any arrow moved, vanished or flipped |
| 5 | Repeat on a second timeframe | Same result | Result differs by timeframe |

Run the test on at least two timeframes, because a signal can be stable on H4 and unreliable on M5, where the forming bar dominates everything. If the source is available, do the code check as well: search for reads of the current bar and for any logic that references bars later than the one being evaluated. That is the same defect seen from the other side, and the two methods together are conclusive. For a worked example of the label being applied loosely, the [accurate signals no-repaint review](/accurate-signals-no-repaint-indicator-free-download-7-powerful-benefits-traders-must-know/) shows how much a claim can rest on presentation alone.

## What is the bar-close test, and why is it stricter?

The bar-close test checks whether a signal is final only when a completed candle closes. It is stricter than the repaint test because it catches provisional signals before they ever get the chance to move. A repaint test looks backwards at history; a bar-close test watches the live edge, where the money is actually at stake.

The logic is simple. A completed bar is a fact: its open, high, low and close are frozen and shared by everyone. An unfinished bar is an opinion that changes with every tick. An honest signal indicator commits on the close of bar N, which means from the perspective of the running bar N+1 the signal sits at "shift 1" and never changes again. A dishonest or careless one fires the moment a condition is true mid-candle, when it can still be undone.

You can run this test by hand in a minute. Turn on sound and pop-up alerts, or just sit and watch. When an arrow appears, ask one question: did it appear before or after the candle closed? If the alert fired at 14:22 and the H1 candle closes at 15:00, that signal was given on a bar that had 38 minutes left to run and could still be cancelled. Now watch that same candle close. Does the arrow survive? Does the alert ever fire again on the closed bar? A signal that only becomes visible after the close is the one you can trade; a signal that appears mid-candle is a provisional reading that you are being asked to gamble on.

There is a subtlety that trips people up. A tool can be perfectly honest and still alert mid-candle, if it alerts on the current price while drawing the arrow only on close. In that case the alert is a heads-up, not the signal. The thing to test is the drawn arrow and the buffer value, not the beep. This is why the test is about what the indicator commits to on the chart, not what you remember hearing.

If you can read the source, the bar-close test becomes a code review. Look for whether the drawing or buffer write is guarded by a check that the bar has closed, and whether the condition is evaluated on the completed bar rather than the forming one. If the guard is missing, every bar in the backtest was allowed to change its mind, and the results are fiction dressed as evidence. That single line is often the entire difference between a tool and a toy.

## Why do signals look better in the Strategy Tester than on a demo account?

Signals look better in the Strategy Tester because the tester replays a saved history file with approximated ticks and perfect fills, while a demo account faces a live feed with real spread, slippage and requotes. The tester is a logic audit, not a rehearsal of what trading will feel like. Confusing the two is one of the most expensive mistakes a gold trader can make.

MetaTrader's tester has real value and real blind spots. On the value side, tick-by-tick visual mode lets you step through bars and watch whether a signal appears at the moment it claims. If an arrow shows up before the bar that produced it, you have caught look-ahead logic red-handed, and no live account was needed to prove it. That is exactly what the tester is for.

The blind spots are what get people. Modelling quality is never perfect; how faithfully ticks are reconstructed depends on the broker's history, and some feeds give you little more than interpolated points between closes. Spread is usually a flat assumption, so the tester trades in a market where gold's spread never widens, which is the opposite of the truth at 13:30 on a CPI day. Fills are idealised. And the killer: if the indicator reads the still-forming bar, the tester's "current bar" is generated from history it has already seen, so the indicator effectively knows the future. It wins every argument with itself.

Use the tester to answer one question: does the logic behave the way the author claims, on complete bars, with no knowledge of the future? If yes, move on. Use a demo account to answer the only other question that matters: what does this actually do, live, on my broker's feed, with their spread, in real conditions? And keep the answer honest by not touching the settings once the test begins — the moment you start adjusting, you are back to selecting results in hindsight.

## How do you forward-test signals on a demo account so the result means something?

You forward-test by logging every signal on a demo account, in real time, with fixed rules and no second-guessing, for at least 100 entries. The result means something only if a stranger could read your log and reproduce exactly what you did. Forward testing is not watching a chart and feeling encouraged. It is producing a document.

Set it up properly before the first signal, because a forward test is only as good as its rules. Open a demo at the broker whose live feed you intend to use — this matters most on gold, where each broker blends its own liquidity. Use the same account currency and leverage you would really trade. Decide the risk per trade in advance and write it down; a fixed fraction of the balance, say half a percent, keeps the arithmetic honest across a run of losses. Trade one instrument, XAUUSD, on one or two timeframes, during the sessions you can actually watch. Do not add to winners, do not move stops, and do not skip a signal because it looks poor. Skipping signals is how a bad system quietly becomes a good story.

Then take every signal the tool gives, exactly as given. Enter at market on the bar close if that is the rule, or at the arrow price if the tool is an EA, and record what happens. The point is not to win; the point is to find out. If the tool generates four signals a week, 100 entries takes six months, which tells you something useful about the tool's pace as well. If you cannot commit to that, the honest conclusion is that you are not testing the indicator — you are testing your patience, and the indicator is not the problem.

Two numbers matter more than the rest: the gap between the signal price and your actual entry, and the maximum drawdown of the sequence. The first is the real cost of the arrow. If the tool prints a price you could never have filled, your edge exists only in the picture. The second tells you whether you would still be in the trade after the worst run, which is precisely when most people abandon a system — right before it would have recovered, or right before it would have wiped them out. Both are visible only in a log, never in a screenshot.

If the design of the tool itself is what interests you, the [non-repainting MT4 trading system build](/non-repainting-mt4-trading-system-free-download-powerful-proven-strategy-in-2026/) walks through how a committed-signal system is structured. And if you would rather not run the process yourself at all, [copy trading](/copy-trading/) is the alternative route — with its own audit problem, because you are trusting someone else's log instead of building your own.

## How many trades does a demo forward test need before it means anything?

A forward test needs at least 100 signals, and it needs them across more than one market condition. Below about 30, you are mostly reading noise. A run of eight winners in a row feels like an edge and is completely normal inside a system that wins half the time. The same is true in reverse, which is how good tools get abandoned and bad ones get funded.

Think about it in terms of what you are trying to detect. A win rate of 55% versus 50% is a small difference, and small differences need large samples to separate from luck. Twenty trades cannot do it. A hundred starts to. Two hundred is comfortable. But sample size is only half the story; the other half is variety. Gold trends hard, then chops for weeks. An indicator that reads moving averages may look superb in the trending month and dreadful in the range, and if your demo test covers only one of those phases, you have measured the market, not the tool.

Judge the sequence, not the headline number. Win rate alone is close to meaningless without the average win, the average loss and the longest losing streak. A tool that wins 40% of the time but earns three times its risk on winners is a different animal from one that wins 70% and gives it all back on one trade. Track profit factor — gross wins divided by gross losses — and track the worst peak-to-valley drop in your equity. Those two together tell you whether you would survive the run, which is the only question that matters when your capital is on the line. Free trackers such as Myfxbook or FX Blue can read a demo account and draw the curve for you, so you are not grading your own homework.

Finally, be honest about what a pass means. A tool that survives 100 logged demo signals has earned the right to be watched further, on a small live account, with money you can afford to lose. It has not earned your confidence, and it certainly has not earned a large position. Gold can move against you faster than any indicator can react, and losing capital on a trade is a normal, expected part of the process. A clean demo log reduces uncertainty; it does not delete it.

## What should you log for every signal?

You should log the signal time, the signal price, your actual entry, the spread at entry, the stop and the outcome, because those six fields are the audit trail. If your log cannot answer "what happened, and could I have taken it?", it is not a log, it is a mood diary. Write the columns before you start and fill them in as you go.

| Field | Why it is in the log |
| --- | --- |
| Date and broker time | Places the signal on a clock you can reproduce |
| Symbol and timeframe | Confirms XAUUSD, M15/H1, one feed, no drift |
| Signal price vs entry price | Exposes slippage — the true cost of the arrow |
| Spread at entry | Gold's spread widens at news; flat assumptions lie |
| Stop distance and lot | Turns every trade into the same unit of risk |
| Result in R, not just pips | Makes winners and losers comparable |
| Did the arrow move later? | The one column that catches repainting |

That last column is the reason this procedure exists. Every time you check back on a closed trade and the arrow is not where you recorded it, you write "moved" and you have caught the tool in the act. Keep the log in a spreadsheet, in the cloud, with the timestamp column intact. Nothing about this is glamorous, and that is the point: the traders who end up trusting a signal are the ones who spent an unglamorous month documenting one they did not.

## What does the Gold Sniper Master Indicator System actually claim?

The Gold Sniper Master Indicator System circulates as a gold-specific arrow product with a familiar pitch: sniper entries, noise filtering, high-probability signals, and a gallery of screenshots on XAUUSD. The honest summary is that the name describes a marketing position, not a verifiable method. You cannot audit a pitch, and the pitch is all that is usually on offer.

That is not a claim that the arrows are fake. Some gold arrow indicators are built on perfectly reasonable moving-average or breakout logic and behave like adults once you test them. The problem is that the sales page never tells you which category you are in, and it cannot, because its job is to look like the good one. The claims it makes — noise filtering, high-probability entries, gold optimisation — are not results. They are descriptors with nothing measurable behind them, and the phrase optimised for gold usually just means the default period was chosen while looking at a gold chart.

Here is the test to apply to any gold signal product, including this one under whatever name you find it. Can you see the rules? Is there a stated licence and a named author? Does it commit signals on bar close? Can you run it on a demo account and produce a log? A product that answers yes to those questions is worth your time even if it turns out to be mediocre. A product that answers no is worth nothing at any price, because its only evidence is a picture.

We do not redistribute that commercial product, and we will not pretend to have audited it. What we can do is hand you something in the other category: an open, readable indicator whose source you can compile, inspect and test with the exact procedure on this page.

## What are you actually downloading here?

You are downloading **Float**, a free indicator with source code you can read, published under the Apache-2.0 licence by EarnForex and originally developed by Barry Stander. It detects the major trend waves over a given number of bars and draws Fibonacci and DiNapoli levels across them, judging the trend from tick volume. The reason it is the download on an auditing page is simple: source is the only signal file you can genuinely inspect. You can open the MQL4 or the MQL5 file, see exactly which bars the level calculation reads and when it redraws, compile it yourself and change it if you want to. Nothing about it is hidden, which is the whole qualification.

One caveat comes from the author's own README rather than from us. Float reads tick volume to analyse trends, and the authors say plainly that tick volume is a controversial input in spot forex trading — it counts price updates rather than traded contracts. They also note that the indicator was originally written by another developer and is maintained here. That is what an auditable tool looks like: it states its limits where you can read them, instead of leaving you to discover them with money on the line.

| Field | Detail |
| --- | --- |
| Source | github.com/EarnForex/Float |
| Author | EarnForex (originally developed by Barry Stander) |
| Licence | Apache-2.0 — free to use, modify and share with the notice kept and changes noted |
| Platform | MetaTrader 4 and MetaTrader 5 (MQL4 and MQL5 source) |
| Cost | Free |
| Form | Readable MQL source, not a black-box binary |
| What it gives you | A trend-wave overlay with Fibonacci and DiNapoli levels you can audit line by line |

Read the licence before you do anything else. Apache-2.0 means you may use, modify and redistribute the code as long as the copyright notice, the licence text and a note of your changes stay with it, and it carries an explicit patent grant. It also means the author offers it as-is, with no warranty, which is the standard and honest arrangement for open-source trading tools. Compile it in MetaEditor yourself rather than trusting a prebuilt file someone else compiled. The build step takes a minute, and in that minute you have verified that the executable on your chart matches the source you read.

Then run the tests. Attach it to a gold chart on a demo account, take your baseline screenshot, run the repaint test, watch how the wave and level lines behave while a bar is still forming, and start the log. Treat the indicator as the raw material for the procedure, not as an answer to it. A readable indicator that fails your tests is still useful information; an opaque one that you never tested is not. If you want the broader set of free indicators and EAs to compare against, the [free download library](/free-download-forex-ea-indicator/) and the [indicator blog archive](/blog/) are the two places to look next.

## What this tool does not do

It does not predict price, it does not size positions for you, and it does not make a losing setup win. No indicator on any platform does those things, and any product that implies otherwise has already told you what it is. Here is the honest boundary.

- It does not see the future. Every indicator is arithmetic on prices that already happened. It describes the past with varying skill; it does not forecast.
- It does not manage risk for you. Position size, stop distance and total exposure are your decisions, and on gold they decide whether you survive far more than the entry signal does.
- It does not remove drawdown. Gold can move against any open trade quickly and hard, and losing money on a trade is a normal cost of trading, not a malfunction.
- It does not give you a fixed signal. Float redraws the wave it measures as new bars arrive, so its levels move. That is normal for a structure tool, and it is exactly why the repaint test and the log above exist: what matters is that you know it, not that anyone promises otherwise.
- It does not come with a performance claim from us, and we will not invent one. A tested tool that passes your demo log is still not a promise of future results.
- It does not replace the tests. If you skip the repaint test, the bar-close test and the demo log, you are back to trading a screenshot, just with more steps.

The last point is the one worth repeating. The failure mode this page exists to prevent is not a bad indicator; it is an untested one. A mediocre tool that you have measured is safer than a brilliant tool you have only seen pictures of, because the measured one has a number attached and the picture has a feeling.

## What should you do next?

Do the audit this week, on gold, on demo, before anything else. Download the free Apache-2.0 Float indicator, compile it yourself, and run the repaint test and the bar-close test the way this page describes. Then open the log and start filling it. One hundred signals from now you will know something real about at least one tool, which is more than a folder full of screenshots will ever tell you — and that free [MT4 and MT5 download hub](/free-download-forex-ea-indicator/) will hand you the next one to test when you are ready.

The restated benefit is simple: you stop guessing. Right now the only thing standing between you and a decision you can defend is a screenshotted chart, a clock and a spreadsheet. Use them. If the arrows hold their place across 50 new bars, if the signal commits at the close, and if 100 logged demo trades come out somewhere near break-even or better with a drawdown you can live with, you have earned the right to take it further — slowly, on a small live account, with risk you can actually afford to lose. If they do not hold, you have saved yourself a funded lesson.

And if you want to compare notes before you commit, [contact us](/contact/) with your log and we will tell you honestly what we see in it. A signal you can audit is a tool. A signal you cannot is a screenshot. The tests are free; only skipping them costs money.
