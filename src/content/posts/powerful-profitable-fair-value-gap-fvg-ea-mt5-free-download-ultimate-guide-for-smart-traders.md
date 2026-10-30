---
wpId: 127190
title: "FVG EA MT5: Fair Value Gap Robot Guide and Test Plan"
slug: "powerful-profitable-fair-value-gap-fvg-ea-mt5-free-download-ultimate-guide-for-smart-traders"
description: "Learn how a fair value gap EA works on MT5, what it can and cannot do, the drawdown to expect, and the demo test plan to run before you risk any real capital."
publishedAt: "2026-02-13T22:03:12.000Z"
updatedAt: "2026-08-30T13:00:59Z"
seo:
  title: "FVG EA MT5: Fair Value Gap Robot Guide and Test Plan 2026"
  description: "Learn how a fair value gap EA works on MT5, what it can and cannot do, the drawdown to expect, and the demo test plan to run before you risk any real capital."
  canonical: "https://bestmt4ea.com/powerful-profitable-fair-value-gap-fvg-ea-mt5-free-download-ultimate-guide-for-smart-traders/"
  ogImage: "https://bestmt4ea.com/wp-content/uploads/2026/07/post_127190_featured.webp"
sourceUrl: "https://bestmt4ea.com/powerful-profitable-fair-value-gap-fvg-ea-mt5-free-download-ultimate-guide-for-smart-traders/"
categories:
  - "Free Forex EA"
  - "EA Reviews & Comparisons"
  - "MT4/MT5 Expert Advisors"
categoryPaths:
  - "/category/free-forex-ea/"
  - "/category/mt4-mt5-expert-advisors/ea-reviews-comparisons/"
  - "/category/mt4-mt5-expert-advisors/"
tags: []
draft: false
primaryKeyword: "FVG EA MT5"
quickAnswer: "An FVG EA on MetaTrader 5 is an automated program that looks for fair value gaps, which are three-candle price imbalances, and places trades when price returns to them. It can follow your rules without hesitation, but it does not predict the market, it can lose money in ranging conditions, and it needs a demo test with drawdown limits before any live use."
keyTakeaways:
  - "A fair value gap is a three-candle imbalance where price moved so fast that one candle's range did not overlap with the next. Traders expect price to return to it, but it does not always fill."
  - "An FVG EA automates the search for these gaps and the entry rules, which removes manual hesitation. It does not remove losing trades, slippage or drawdown."
  - "Test any FVG EA on a demo account in MetaTrader 5 for at least several weeks across different market conditions before you risk real money."
  - "Set the risk per trade, a maximum daily loss and a maximum drawdown before you attach the EA to a live account, and write them down."
  - "Judge the EA by its drawdown, profit factor and trade count across many months, not by one good week or one attractive equity curve."
faqs:
  - question: "What is a fair value gap in forex trading?"
    answer: "A fair value gap is an area on a chart where a fast move left a blank space between the high or low of the first candle and the low or high of the third candle in a three-candle pattern. Traders use it as a zone to watch for a possible return of price."
  - question: "Does an FVG EA guarantee profits?"
    answer: "No. No expert advisor can guarantee profits. An FVG EA automates a set of rules, and those rules can produce losing trades, long losing streaks and drawdowns. Only a demo test and a live track record you can verify show how a specific setup behaves."
  - question: "Which timeframe should I use with an FVG EA on MT5?"
    answer: "There is no universal answer. Lower timeframes such as M5 and M15 produce more signals and more noise, while H1 and H4 produce fewer signals. Pick one timeframe, test it on demo, and compare the drawdown with the trade count before you change it."
  - question: "Do I need a VPS to run an FVG EA?"
    answer: "A VPS is not required, but it helps if you want the EA running when your computer is off or your internet connection drops. Check your broker's execution speed and your own uptime needs before paying for one."
  - question: "Is an FVG EA suitable for beginners?"
    answer: "A beginner can run one, but should first learn basic risk management, how drawdown works and how to read the Strategy Tester. Run the EA on a demo account until you understand every setting."
sources:
  - label: "MetaQuotes: MetaTrader 5 platform"
    url: "https://www.metatrader5.com/"
  - label: "MQL5 community and documentation"
    url: "https://www.mql5.com/en/docs"
  - label: "UK Financial Conduct Authority consumer guidance"
    url: "https://www.fca.org.uk/"
download:
  name: "2000+ EA & Indicator Library (shared bundle)"
  origin: "shared"
  license: "No licence stated - third-party files shared as-is, unverified"
  fileSize: "about 577 MB in three zip parts"
  externalUrl: "https://drive.google.com/drive/folders/1w99fcnzD_vfU_tSlc4Pz8zOEX81t5-_l?usp=sharing"
---

Every week, another trader asks the same question: is there an automated tool that can find fair value gaps for me and trade them on MetaTrader 5? You have probably seen the screenshots. A clean chart, a neat rectangle drawn across a candle gap, a set of green arrows, and an equity curve that climbs in a straight line. Then you install something, attach it to a chart, and watch it open a trade that moves against you within minutes.

That gap between the screenshot and your real account is the problem this guide is about. You want a robot that handles the boring part of spotting imbalances, so you stop missing setups while you work, sleep or run your life. You also want a tool you can trust, with rules you understand and losses you can survive. Most search results promise the first thing and say very little about the second.

Here is the uncomfortable truth. A fair value gap expert advisor, usually shortened to FVG EA, can automate the scan for a pattern and the execution of rules you configure. It cannot tell you where the market will go next. It cannot promise that every gap fills, and it cannot stop the losing streaks that every rule-based system goes through. A robot that trades a sound idea with poor risk settings can still empty an account.

Consider an illustrative composite, a made-up trader who combines the stories many readers describe. Call him Daniel. He is a day job employee who trades part time. He found an FVG EA, read a long sales page, and moved a sum he could not afford to lose onto a live account on the first day. The first week looked excellent. The second week opened a run of stop losses on a choppy range that did not resemble the backtest. By the end of the month his balance had dropped by a third, and he had not yet looked at the drawdown in the Strategy Tester. He did not do anything dramatic. He skipped the testing step, and the market did what markets do.

Daniel's story is not a warning against all automation. It is a warning against skipping the parts of the process that protect you. If you run an FVG EA on a demo account first, write down your drawdown limit, and review the results over many market conditions, you will know more about it than most sellers ever will. If you skip those steps, you are relying on luck, and luck is not a strategy.

This article walks through what a fair value gap is, how the pattern is usually defined, what an FVG EA typically does on MT5, how entries and exits are set, which timeframes people use, how to test the robot honestly, and what risk controls you should require before any live trade. It ends with a clear list of what this kind of tool does not do, and a demo-first plan you can follow this week.

## What is a fair value gap, in plain terms?

A fair value gap is a visible imbalance on a price chart. It forms when price moves so quickly in one direction that a three-candle pattern leaves an empty space. In a bullish version, the high of the first candle sits below the low of the third candle, and the middle candle is a large, strong candle that carried price across the space. The area between those two levels is the gap. Nothing traded there during the impulse, or at least not much did.

Traders who use this concept believe that the market tends to return to these areas before it continues. The idea comes from the view that aggressive buying or selling can leave orders unfilled, and that price often comes back to balance them. This is a belief about how the market behaves, not a law. Some gaps are revisited quickly. Some are never revisited, and price simply moves on. Treat the FVG as a zone to watch, not a promise that price will come back to it.

The concept is widely discussed in smart money and institutional style trading, and you will see terms like order block, liquidity sweep and break of structure used alongside it. Those terms describe different ideas, and a robot built around FVGs will not necessarily use any of the others. When someone tells you an EA combines all of them, ask for the exact rule for each one. A vague description is a red flag, because an automated system needs precise conditions.

For a beginner, the important point is simple. An FVG is a rule about where a zone is and how it is measured. It is not a rule about what happens next. Once you accept that, the rest of this guide is easier to follow, because you will stop expecting every gap to behave the same way.

## How do you spot a bullish and bearish FVG on your chart?

Before you trust an EA to do the spotting, you should be able to spot the pattern yourself. That skill also helps you check whether the robot is finding the same things you would find on a chart.

In a bullish FVG, price rallies strongly. The first candle closes the impulse, the second candle is a large expansion candle, and the third candle opens above the first candle's high, leaving a gap between the first candle's high and the third candle's low. If you draw a box from the first candle's high up to the third candle's low, you have the zone. A common approach is to watch for price to pull back into that box, then look for a confirming candle that shows buyers defending it.

In a bearish FVG, the logic is reversed. Price drops aggressively, and the gap sits between the first candle's low and the third candle's high. A pullback up into the zone can give sellers a place to re-enter, if the rest of your rules agree.

Three checks help you avoid the most common mistakes. First, check the size of the gap. A tiny gap caused by a spread spike or a thin candle is often noise, which is why many EAs include a minimum gap size setting. Second, check the context. A gap that forms against a strong higher-timeframe trend behaves differently from one that forms with the trend. Third, check whether the gap has already been revisited. A gap that price has already passed through is no longer the clean zone the textbook diagram shows.

When you manually mark gaps on a chart for a week, you will start to see how many there are. On a busy pair during an active session, there can be many. That number is useful. It tells you that an EA with loose rules will take a large number of trades, and that a strict filter may leave long stretches with nothing to do. Both behaviours change your risk, and both should appear in your test results.

## What does an FVG EA on MetaTrader 5 actually do?

An expert advisor is a program that runs inside MetaTrader 5 and reacts to price data using rules written in MQL5, the language MetaQuotes provides for the platform. An FVG EA is a specific kind of EA. It checks the price history on the chart for three-candle patterns that meet its gap rules, stores or redraws the zones, and watches for price to reach them. When your conditions are met, it sends an order to your broker through the platform.

In practice, most FVG EAs with a clear description do some combination of the following. They scan the chart for valid three-candle imbalances. They apply a trend filter so that bullish gaps are used only in some conditions and bearish gaps in others. They enforce a minimum gap size. They choose an entry point, such as the middle of the gap or the far edge. They place a stop loss and a take profit, sometimes by a fixed number of pips or by a ratio. They may limit the number of open trades, and they may stop trading after a daily loss limit is hit.

What they do not do is equally important. A standard FVG EA does not read the news, does not know what a central bank is about to say, and does not understand the fundamentals behind a currency. It does not adjust itself to a change in volatility unless the developer has programmed that behaviour and you have tested it. It does not know your personal risk tolerance unless you enter it.

The phrase "smart" in a product name does not describe how the code works. Ask the seller, or read the settings panel yourself, and identify every rule as a precise condition. If you cannot list the conditions for entry, exit, stop loss, take profit and risk, you do not yet understand the EA, and you should not run it with real money.

Finally, check whether the EA is open-source, from a known developer, or sold as a closed file. Closed files are common in this market, and they are not automatically dangerous. They do, however, make it harder to verify behaviour, which is one more reason to test on demo for longer than feels necessary.

## How are entries, stop losses and targets usually set?

Entries are the part of an FVG strategy that changes the most between versions. The three common approaches are the full gap entry, the midpoint entry and the confirmation candle entry. A full gap entry places an order at the far edge of the zone, which can give a better price but may not fill when price only touches the edge. A midpoint entry splits the difference and is often seen as a balance between fill chance and price. A confirmation candle entry waits for a candle that closes in the direction of the trade inside the zone, which reduces false signals but usually gives a worse price and fewer trades.

Stop losses are where many traders lose money without realising why. A stop placed just beyond the far edge of the gap is simple, but it can be too tight on a volatile pair, especially around spread widening. A stop placed far away gives the trade more room, but it increases the loss on each trade. Whatever you choose, the stop must be defined in your terms, because the EA will follow the number you set, not the number the sales page suggests.

Take profit levels are commonly set by a risk-to-reward ratio, such as 1:2 or 1:3, or by a nearby structure point. A ratio does not make a trade more likely to win. It sets the size of the win compared with the loss. A strategy that wins only four trades out of ten can still make money with a 1:2 ratio, and a strategy that wins six trades out of ten can still lose money if its losses are much larger than its wins. You need the win rate, the average win and the average loss together to judge a strategy.

When you test an FVG EA, record the win rate, the average win and loss, and the total number of trades. Those three numbers tell you more about the robot's behaviour than any single headline figure. They also make it easier to notice when a result depends on a handful of lucky trades.

## Which timeframes and trading sessions suit FVG trading?

Traders use the FVG concept on many timeframes, and the right one depends on how often you want the EA to trade and how much time you can give to monitoring it. Lower timeframes such as M5 and M15 generate more gaps and more signals, which means more trades, more spread cost and more exposure to noise. Higher timeframes such as H1 and H4 generate fewer signals, which means fewer trades, but each gap tends to be larger and the moves can be cleaner.

Many traders favour H1 for a balance between signal count and noise, while others use M15 for more trades or H4 for swing-length moves. These are habits, not facts. The only way to know which one works for a specific EA is to test it on the same pairs, over the same months, with the same risk settings, and compare the drawdown as well as the profit.

Sessions also matter. Liquidity is usually higher during the London and New York sessions, and spreads on major pairs are typically tighter then. Some FVG EAs perform better in those windows, and some perform worse during the quieter Asian session when gaps are smaller and more erratic. If your EA allows session filters, test with and without them. If it does not, consider whether you can run it only during the hours you are available to check it.

For gold traders, the picture changes again. XAUUSD can move in large, fast bursts around news releases and sometimes leaves big gaps, but it can also spike and reverse violently. A gap-based robot that works on a calm major pair can behave very differently on gold. Test on the instrument you actually plan to trade, and read the drawdown numbers carefully. The gold indicators guide linked at the end of this article covers the instrument in more depth.

## How do you backtest and forward-test an FVG EA honestly?

The MetaTrader 5 Strategy Tester is the built-in tool for historical testing. You open it from the View menu or with the keyboard shortcut, choose the EA, the symbol, the timeframe and the date range, and run the test. It can show trades, equity curves and a results table. It can also run in visual mode, which lets you watch the EA place orders bar by bar, and that is one of the best ways to find rules that do something you did not expect.

Historical testing has known limits. The results depend on the quality of the historical data your broker supplies. Spreads and commissions may be set to defaults that differ from your account. Execution in a live market can include slippage and requotes that a test does not reproduce. A large number of parameter combinations can produce a beautiful curve that simply fits the past. That last problem is called over-optimisation, and it is the most common way traders fool themselves with an EA.

A practical test plan works in stages. First, run a backtest over a long period, ideally several years, with realistic spreads for your broker. Second, run the same settings on a period the optimiser did not see. If the result collapses, the settings were probably fitted to the first period. Third, run the EA on a demo account in real time for at least several weeks. A demo account shows you how the robot behaves with live spreads, live news and live internet delays, which a backtest cannot.

When you forward-test, log every trade. Note the entry, stop, target, result, the session and whether the trade was taken according to the rules. Compare the live demo results with the backtest. If the demo trade count, win rate and drawdown are far from the backtest, do not go live. Find out why first.

It is also worth testing the EA on more than one broker or account type if you can. Broker differences in spread, minimum stop distance and execution quality change results, sometimes significantly. A robot that looks steady on one broker may behave differently on another.

## What risk controls should you require before going live?

Risk control is where a sound idea and a sound outcome separate. The most common and the most important control is the risk per trade. Many traders keep it at 1 to 2 percent of account equity on any single trade, and some choose less. The point is to ensure that a normal losing streak does not destroy the account. Ten losses in a row at 1 percent each is painful, but survivable. Ten losses at 10 percent each is not.

A maximum daily loss limit stops the EA from trading after a bad day. Some EAs include this as a setting. If yours does not, you can use a broker-side tool or your own monitoring, but you need a rule. A maximum drawdown limit goes further. It is the level at which you stop the EA entirely and review what happened before you restart it. Write the number down before you go live, because after a loss it is very hard to choose one calmly.

Position sizing needs the same discipline. Fixed lot sizing is simple, but it does not adapt to account size or stop distance. Percentage risk sizing adapts, but only if the stop distance is sensible. Check how the EA calculates lot size, and test it with a few different account sizes to see whether the trades are still proportionate.

Finally, decide what you will do when the robot is losing. Will you wait for a set number of trades, a set number of days, or a set drawdown level before you review it? Will you change any settings during a drawdown? The safest rule is to avoid changing settings in the middle of a losing run, because that is exactly when optimisation bias is strongest.

Remember that loss of capital is possible on every trade you open with any EA. Nothing in this guide removes that risk. What it does is give you a plan for the losses you will eventually take.

## Who should use an FVG EA, and who should not?

An FVG EA may suit a trader who already understands the pattern, can read the settings and has time to monitor the robot. It may also suit a busy trader who checks the account a few times a day and wants a defined set of rules executed consistently. It can help someone who tends to hesitate, move stops or close winners too early, because the rules are fixed and visible.

It is a poor fit for someone who expects the robot to replace learning. If you do not understand what a stop loss does, the EA will not teach you. It is also a poor fit for anyone who plans to fund a live account from money they cannot afford to lose, or who will change the settings every time a trade goes wrong.

Trading on a prop firm account or using borrowed money adds more pressure, and automated trading can make that pressure worse, because a losing run can break a rule set by the firm before you notice. If that describes you, test the EA on demo for longer, and read the firm's rules carefully before you connect any bot.

## What do you get, and what does it not do?

Because this guide is about evaluating the approach rather than selling a specific product, the offer breakdown below describes what a typical FVG EA package contains and what you should verify in writing before you pay or install anything. Check each row against the seller's own documentation, and treat anything they cannot show you as unverified.

| Item | What to check | Why it matters |
|---|---|---|
| Platform | MetaTrader 5, build compatible with your terminal | An EA written for MT4 will not run on MT5 |
| Gap rules | Exact definition of the three-candle pattern and minimum gap | Vague rules make results impossible to reproduce |
| Entry options | Full, midpoint or confirmation candle, and the default | Changes fill rate and average price |
| Risk controls | Risk per trade, daily loss limit, maximum drawdown setting | Protects the account during losing runs |
| Licence | Clear licence terms and who owns the code | Shapes what you can use and share |
| Support | Who answers questions, and how quickly | Important when settings need adjusting |
| Track record | Live or demo, verified or unverified, with dates | A demo record is not a live record |

### What it does not do

An FVG EA does not predict price. It does not guarantee that gaps fill, that trades win, or that the account grows. It does not protect you from slippage during fast markets, gap openings on the weekend or news spikes. It does not replace a demo test, and it does not replace your own review of its results. It does not adjust to a fundamental change in the market unless you change it, and it does not tell you when to stop.

Any claim of a fixed monthly return should make you cautious. Returns in this market vary widely from month to month, and the same settings can lose money in one regime and make money in another. Look for drawdown, profit factor and trade count across long periods before you look at the best month.

## How do you run a demo-first plan this week?

Start with a demo account on the same broker you would use live, if you have one. Install the EA in the MQL5 Experts folder through File, then Open Data Folder, restart MetaTrader 5, attach the EA to the chart, and enable AutoTrading. Confirm that the settings you see match the ones you intended to use, and write them down.

Next, run a historical test over a period of several years with realistic spreads. Save the report. Then run the same settings on a later period and compare. If the two periods tell different stories, do not go live until you understand the difference.

After that, forward-test on demo for at least several weeks. Log every trade. Each day, check whether the EA followed its rules, whether any trade was placed outside them, and whether any setting was changed. At the end of the period, compare the demo results with the backtest, and decide whether the drawdown is one you could accept on a real account.

Only after that stage should you consider a small live account, and only with money you can afford to lose. Keep the risk per trade low, keep the daily and drawdown limits in place, and review the results every week. Scaling up should be slow, and it should follow the evidence rather than your excitement after a good run.

## Next step: test first, then decide

If you want to see how other automated tools compare on drawdown, trade frequency and documentation, start with the rankings on the [top ranking](/top-ranking/) page, then read [customer feedback](/customer-feedback/) to see what real users report about support and reliability. If you need a machine that stays online, the [VPS](/product/vps/) page explains what uptime means for an EA. For a broader view of gold tools, see the [gold indicators guide](/top-10-best-mt4-indicators-for-gold-xauusd-powerful-tools-for-accurate-trading/). Visit the [shop](/shop/) when you are ready to compare licensed products, and read the [disclaimer](/disclaimer/) before you make any decision.

Your next action is small and specific. Open a demo account, load the EA, write down your drawdown limit, and run it for several weeks before you decide anything else. The robot will still be there after the test. Your capital may not be if you skip it.
