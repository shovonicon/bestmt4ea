---
title: "EA Not Working? The MT4 & MT5 Fix List, Updates Included"
slug: "mt4-ea-not-working-after-update-fix-best-proven-solutions"
description: "Your expert advisor stopped trading, never started, or works on demo but not live. Work this diagnostic list in order before you change a single setting."
publishedAt: 2026-10-22
updatedAt: 2026-10-22
categories:
  - "MT4 & MT5 Expert Advisors"
  - "EA Settings & Optimization Guides"
categoryPaths:
  - "/category/mt4-mt5-expert-advisors/"
  - "/category/mt4-mt5-expert-advisors/ea-settings-optimization/"
tags: []
draft: false
quickAnswer: "An expert advisor that is not trading is usually blocked by one of a handful of causes: AutoTrading is off, the chart shows a crossed EA icon, the symbol name has a broker suffix the EA does not recognise, the account mode changed, or a terminal or broker update altered something the EA depended on. Diagnose from the Experts log first, not from the settings panel."
keyTakeaways:
  - "The Experts and Journal logs name the real cause of almost every 'EA not working' case. Read them before touching a single input."
  - "After a terminal update, check the boring things first: AutoTrading state, chart attachments, DLL and WebRequest permissions, and whether the update moved your data folder."
  - "Demo-works-live-doesn't is normally an environment difference: spreads, execution, symbol properties, or MT5 netting versus hedging, not a broken EA."
  - "An EA that has simply not met its entry conditions is not broken. Give it a full session on the right chart before concluding anything."
  - "Change one thing at a time and record it. Five simultaneous fixes teach you nothing and often trade one fault for another."
faqs:
  - question: "Why did my EA stop working after a MetaTrader update?"
    answer: "Updates can reset permissions (AutoTrading, DLL imports, WebRequest URLs), recompile files with a stricter compiler, restart the terminal without re-attaching cleanly, or, when the data folder path changes, leave the terminal looking at an empty folder. Work the update checklist in this guide in order; one of those items is the cause in the great majority of cases."
  - question: "My EA works on demo but not on my live account. What differs?"
    answer: "Four things commonly differ: spreads are wider live, execution slips where demo fills instantly, the live symbol's properties (swap, stop level, contract size) differ from the demo server, and on MT5 the live account may be netting while the EA expects hedging. Compare the symbol specification on both accounts line by line."
  - question: "The EA is attached and smiling but has not traded all week. Is it broken?"
    answer: "Not necessarily. Many strategies trade rarely by design, and a crossed or sad icon means disabled, while a normal icon with no trades often means conditions were never met. Check the Experts log for initialisation and any filter messages, confirm the chart symbol and timeframe are the recommended ones, and judge over the vendor's stated trading frequency, not your patience."
  - question: "What does the crossed-out EA icon on the chart mean?"
    answer: "It means algorithmic trading is disabled for that chart or terminal: the AutoTrading or Algo Trading button is off, or the permission was removed in the EA's attach dialog or in Tools, Options, Expert Advisors. The EA is loaded but forbidden from placing orders."
  - question: "Can a broker stop my EA from working?"
    answer: "A broker can change symbol specifications, spreads, stop levels, or the server the account connects to, and some account types restrict algorithmic trading. If the log shows errors like trade is disabled or invalid stops that began suddenly across all your EAs, ask the broker what changed on the server before debugging the EA."
  - question: "Should I reinstall the EA when it stops working?"
    answer: "Almost never as a first step. Reinstalling discards your settings and logs, which are the evidence you need. Save the .set file and a copy of the logs first; if it comes to a reinstall, you can restore your exact configuration and compare behaviour."
sources:
  - label: "MetaQuotes: MQL5 documentation — trading functions and return codes"
    url: "https://www.mql5.com/en/docs"
  - label: "MetaQuotes: MetaTrader 5 help — algorithmic trading"
    url: "https://www.metatrader5.com/en/terminal/help"
  - label: "MetaQuotes: MQL4 documentation"
    url: "https://docs.mql4.com/"
primaryKeyword: "EA not working MT4 MT5 fix"
download:
  name: "EA Troubleshooting Field Guide: Log Errors Decoded"
  origin: "own"
  license: "Free to use, print and share with credit to bestmt4ea.com"
  version: "1.0"
  fileKey: "resources/ea-troubleshooting-field-guide.pdf"
installSteps:
  - name: "Read the Experts log first"
    text: "Open the Experts tab at the bottom of the terminal and read the most recent entries for your EA, noting the first error or warning after it was attached."
  - name: "Work the check families in order"
    text: "Check the icon and AutoTrading state, then chart symbol and timeframe, then account mode, then the log error codes, in that order."
  - name: "Change one thing at a time"
    text: "Change exactly one thing, then watch the EA through the next session it would normally trade, and record the change and the result."
  - name: "Match unknown codes to the field guide"
    text: "If the log shows a retcode or error you do not recognise, match it against the field guide PDF before contacting the vendor."
---

An expert advisor that will not trade is a special kind of frustrating. It sits on the chart looking alive. The terminal is connected, the market is moving, and the robot does nothing, or worse, it did something last week and has quietly stopped. Your money is not yet lost, but your confidence in the whole setup drains a little more every session it stays silent.

This guide is a diagnostic list, written in the order a technician would actually work: read the evidence the terminal already collected, separate the five families of causes, and fix the one you actually have. It covers the three situations traders write to us about most. The EA never traded from the day it was installed. The EA traded and then stopped, very often straight after a MetaTrader or Windows update. And the classic: the EA works beautifully on a demo account and refuses to perform on the live account funded with your money. Each has its own list, because each has its own causes, and applying the wrong list is how an afternoon of debugging becomes a week.

## Rule zero: the log is the diagnosis

Every version of this problem starts in the same place, and it is not the settings panel. At the bottom of the terminal are two tabs, Experts and Journal, and they record what the platform did and what your EA said, line by line, with timestamps. The Experts tab carries your EA's own messages: initialisation, the reason it gives for not trading, and the exact error or return code when an order is refused. The Journal tab carries the terminal's side: connections, modifications, and platform events.

Read them with two questions in mind. When did the behaviour change, and what is the first unusual line at or before that moment? The first error is the cause; everything after it is the EA coping with the cause. A log that shows "initialised successfully" and then silence for a week tells a different story from a log repeating "trade is disabled" every hour, and both differ again from a log full of requotes and invalid stops. Until you know which story you are in, every fix is a guess, and guessed fixes have a nasty habit of hiding the real fault behind a new one.

If the log means nothing to you yet, that is fine, and it is precisely what the field guide attached to this article is for: it decodes the common error numbers and return codes into plain language with the fix order for each. Keep it open while you work through the lists below.

## Family one: the EA is forbidden from trading

More silent EAs are forbidden than broken. MetaTrader gives you several independent switches, and any one of them stops trading while leaving the EA looking attached and healthy.

Start with the chart itself. In MT4 a small icon beside the EA's name in the top-right of the chart shows its state; a crossed or unhappy icon means trading is disabled for that EA. In MT5 the same information is in the navigator and the chart's indicator list. Then the global switch: the AutoTrading button in MT4 or Algo Trading in MT5 on the main toolbar must be on. Then the platform options: under Tools, Options, Expert Advisors, algorithmic trading must be allowed, and the sub-options matter too, because an option that disables algorithmic trading when the account, profile or chart changes can switch your EA off the moment you switch charts, which looks exactly like an EA that randomly stops.

Then the EA's own attach dialog. When you drag an EA onto a chart, the dialog has its own permission for allowing live trading, and it can be off even when everything else is on. Remove the EA and re-attach it slowly, reading the dialog instead of accepting it from muscle memory. Finally, if the EA uses a library file, the DLL permission is its own checkbox in the same places, and an EA that needs a DLL and is denied one often fails quietly or with a single log line at initialisation that is easy to scroll past. For the next step, read [Gold Scalping EA for Beginners: Low Drawdown, Real Rules](/7-best-top-gold-scalping-ea-for-beginners-with-low-drawdown-ultimate-safe-trading-guide/).

Work these switches in that order, from the chart outward, and resist the urge to change inputs at the same time. Permissions first, strategy second.

## Family two: the EA is on the wrong stage

An EA trades a specific symbol, on a specific timeframe, under specific account rules, and it is unforgiving about all three. The classic trap is the broker suffix. Your chart may be named EURUSD.m, EURUSD.pro or xEURUSD while the EA was written to look for exactly "EURUSD". Some EAs detect suffixes gracefully; many do not, and the failure mode is silence, because from the EA's point of view its symbol does not exist. If your broker uses suffixed symbols, check the EA's inputs for a suffix setting, and if there is none, ask the vendor directly whether their product supports your broker's naming.

Timeframe is the second trap. An EA designed for M15 does not become an H1 strategy because you attached it to an H1 chart; it becomes an M15 strategy reading hourly bars, which produces either silence or nonsense. The vendor's recommended timeframe is part of the product. The third trap is account mode on MT5: an EA written for hedging accounts, which hold several positions on one symbol, misbehaves on netting accounts, which merge them, and the symptoms range from positions closing early to the EA refusing to open a second trade. Check your account type in the terminal and compare it with what the EA expects before you debug anything else on MT5.

The last stage problem is the quietest: the EA is fine and its conditions simply have not occurred. A breakout system in a dead range, a night scalper attached during a holiday week, a trend follower in a market that has gone sideways for a fortnight. The log will show clean initialisation and the vendor's stated frequency will tell you how long silence is normal. Judge an EA against its own design tempo, not against your hope of daily action.

## Family three: it worked, then an update happened

Terminal updates are the number one trigger for "it stopped on Tuesday". An update can restart the platform in a state where the EA needs its permissions re-confirmed, it can recompile your files with a newer, stricter compiler that rejects code the old one accepted, it can re-point the terminal at a fresh data folder that does not contain your files at all, and it can arrive with a Windows update that restarted the whole machine and left the terminal closed or logged into the wrong account.

Work this list in order after any update. One: is the terminal connected, and to the right account? An investor-password login looks connected and cannot trade. Two: is the EA still attached to the right charts, with its icon in the healthy state, and is AutoTrading on? Three: open the data folder from inside the terminal and confirm your EA files are actually in the Experts folder the terminal is using; a new data folder is betrayed by missing templates, missing profiles and a suspiciously clean Navigator. Four: check the Experts log for a compile failure on the EA's file, because an update that recompiles and fails leaves the EA present but dead, and the fix is the compile-error process: first error first, then recompile. Five: re-check the two permission families updates love to reset, DLL imports and the WebRequest URL whitelist, which any EA using a news filter or a licence server depends on. A licence-checked EA whose server call is blocked fails in a way designed to look like it simply decided not to trade.

Brokers update things too. A server migration changes your login server name; a specification change alters stop levels, contract sizes or session times; a symbol can be moved to close-only mode around corporate actions or holidays. When every EA on an account develops the same new complaint on the same morning, the efficient hypothesis is the environment, and a message to the broker asking what changed on the server this week will beat a weekend of private debugging. If this topic is new to you, [Best Free Alternatives to TradingView for Custom Indicators](/best-free-alternatives-to-tradingview-for-custom-indicators/) covers the basics.

## Family four: demo works, live does not

This is the case that makes traders feel cheated, and it is almost never cheating. It is four ordinary differences between the demo environment and the live one, each sufficient on its own.

Spreads. Demo feeds are frequently tighter and calmer than live feeds from the same broker. A scalping EA whose edge is a few points can be profitable at a demo spread of 8 and hopeless at a live spread of 16 with the same code, the same settings and the same week. Record your live spread at your actual trading hours for several days before you accuse the EA. Execution. Demo orders fill instantly at the requested price; live orders travel to a real market and slip, especially in the first minute of a session and around news. Strategies that enter and exit at exact prices are the most sensitive, and their live results degrade first. Symbol properties. Swap rates, stop levels, margin requirements and contract sizes are set per server, and brokers routinely run demo servers with friendlier numbers than live ones. Compare the Specification window for your symbol on both accounts, line by line; it takes five minutes and ends arguments. Account mode, again, because it deserves repeating for this family: demo accounts are usually hedging on MT5, many live accounts are netting, and an EA moved between them without anyone noticing is the single most common demo-live mystery we see.

Notice what is absent from that list: the EA's code. The binary does not know which account it is on. When behaviour differs between accounts, something in the environment differs, and the productive question is always "what exactly is different here", answered from the specification window, the spread, and the log, rather than "why is it broken".

## Family five: the EA trades, but badly, and calls it working

A final family deserves honesty: the EA that runs perfectly and loses steadily. Nothing in this guide's checklists will fix it, because nothing is malfunctioning. The strategy is unsuited to current conditions, or to your broker's costs, or it was never sound. The diagnostic that matters here is comparison: run the same EA, same settings, in the strategy tester over the same recent period and compare its simulated behaviour with the live record. If tester and live roughly agree and both lose, the strategy is the problem and more debugging is just delay. If the tester profits and live loses with the same settings, you are back in family four, measuring spreads and execution. Knowing which of those two situations you are in is worth more than any single fix, because it tells you whether to repair the setup or retire the robot.

## Family seven: the account itself says no

Sometimes the EA, the terminal and the machine are all healthy, and the account refuses the trades. The log gives this family away because the errors are about permission and money, not about the EA's logic. "Not enough money" is the bluntest: the EA tried to open its configured lot size and the free margin was not there. This appears after a balance drop, after a leverage reduction by the broker, when several EAs share one account and each assumes the margin is its own, and when an auto-lot formula sized for a larger balance meets a smaller one. The cure is arithmetic, not optimism: compute the margin for the EA's lot size at your current leverage, and reduce position size in the settings rather than letting the account discover the limit trade by trade.

Margin's quieter cousin is the margin stop-out level itself. Brokers set the level at which positions are force-closed, and an EA designed around one broker's fifty percent stop-out behaves differently on an account that liquidates at eighty or at twenty, especially grid and basket systems that plan to use deep margin. If you move an EA between brokers, the stop-out level in the account specification is part of the strategy's environment, and nobody's settings sheet mentions it until it matters.

Regulated-account rules form the third member of the family. FIFO and no-hedging rules on some US accounts make a hedging EA's second position an error, not a trade. Swap-free and cent accounts change symbol properties in ways some EAs detect badly. And instruments themselves retire: a broker renames a symbol, moves an index to a new contract, or sets a pair to close-only for a period, after which the EA's orders on the old name fail with trade-disabled errors while everything else looks normal. When the account says no, the fix is at the account level: sizes, broker settings, or the instrument list, and no amount of EA reinstalling touches it.

## Family six: the machine underneath stopped helping

A growing share of EAs run on a VPS, and the VPS adds its own failure modes that look exactly like EA faults. Windows Update restarts the server in the night and the terminal comes back logged out, or logged in, but with AutoTrading off because the restart closed it ungracefully. The VPS provider migrates or reboots hosts and your session is simply gone until you log in and look. The disk fills with log files, because a chatty EA on a fast timeframe can write gigabytes of logs in a month, and a terminal on a full disk stops in ways that produce no helpful message at all. The clock drifts or the timezone differs from what you assumed when you set the EA's trading hours, so a session filter that should open the European morning is quietly filtering it out. Compare this with [Disable Your MT4 EA During News: 9 Methods Compared](/how-to-disable-mt4-ea-during-news-events-9-powerful-methods-for-safer-trading/) before you decide.

None of these are fixed inside the EA's settings, which is why traders debug the robot for days. The checks are environmental and quick: log into the VPS and look at the terminal as it actually is right now, not as you left it; confirm the account, the connection bars, and the AutoTrading state; check free disk space; check the terminal's server time against the session hours in your EA's inputs; and read the Journal tab for disconnection clusters, which leave a clear pattern of drops and reconnects. If you run EAs on a VPS, the weekly ten-minute health check in our VPS checklist exists precisely because every fault in this family is cheap to spot early and expensive to discover from a silent week.

There is a home-computer version of this family too: the laptop that slept, the power cut, the family member who closed the "weird chart program". If your EA matters, it belongs on a machine whose whole job is to stay awake, but wherever it runs, when it stops, check the machine before you check the strategy.

## A twenty-minute diagnostic session, in order

When you sit down to fix a silent EA, give yourself twenty disciplined minutes before you change anything at all, because most causes in this guide announce themselves inside that window. Minutes zero to three: open the Experts and Journal tabs, find when the behaviour changed, and write down the first unusual line with its timestamp. Minutes three to six: the permission sweep — chart icon state, AutoTrading button, Options permissions, the EA's own attach dialog, DLL and WebRequest settings if the EA uses them. Minutes six to nine: the stage sweep — exact chart symbol name including any suffix, timeframe against the vendor's recommendation, MT5 account mode against the EA's expectation. Minutes nine to thirteen: environment changes — did the terminal update, did Windows restart, did the broker email about a server migration, is the VPS session the one you think it is, how much disk is free. Minutes thirteen to seventeen: compare against demo if the fault is live-only — spread right now, specification window open on both accounts, the same settings file loaded in both places. Minutes seventeen to twenty: write down the single most likely cause and the single change that tests it.

That last step is the one people skip and the one that matters most. A diagnosis written as one sentence — "most likely the update reset the WebRequest whitelist, because the EA also stopped fetching its news filter at the same hour" — turns the next hour into an experiment with an answer. An unwritten hunch turns it into a random walk through settings, after which the EA may trade again for reasons nobody knows, leaving the fault armed for next month. Fix slowly, record everything, and let the EA's silence end with knowledge rather than luck.

## Symptoms that mean stop, not fix

Most of this guide is about restoring an EA to trading, so it is worth naming the cases where the correct action is to keep it off. If the log shows the EA opening trades at sizes you did not set, or modifying positions it did not open, stop it and investigate before anything else; magic number collisions with another EA are the usual cause, and both robots come off until their numbers are unique. If an update changed the EA's behaviour in ways the vendor cannot explain, the EA stays off until they can. If the fault appeared together with balance or position discrepancies you cannot reconcile against the account history, the terminal is not your problem: contact the broker with the deal tickets, in writing, first. And if fixing the fault seems to require removing a stop loss, widening a grid, or raising risk so the EA "can work", the fault is not the problem. The strategy asking you to disarm it is.

## How to ask for help so you actually get it

Whether you ask the vendor, a forum, or us, the quality of the answer is set by the quality of the report. "EA not working" gets sympathy. A report that gets solutions contains: the terminal and build number, the EA name and version, the broker and account type (hedging or netting on MT5), the symbol exactly as named on your chart, the timeframe, what the EA does or fails to do, when it changed, and the first error line from the Experts log around that time. Attach the .set file you are running. That package takes ten minutes to assemble and lets a competent reader reproduce your setup instead of guessing at it. Vendors who respond to that package with a real answer are also telling you something about whether to buy their next product.

And keep the record habit after the fix: one line in a notebook, or better, a settings record, noting what changed and when. EAs stop working again, updates keep coming, brokers keep migrating servers, and the second occurrence of any fault in this guide should take you ten minutes, because the first one taught you where your particular setup hides its switches. You can also check [Fix Compile Errors in MQL4 & MQL5: A Step-by-Step Guide](/how-to-fix-compile-errors-in-mql4-complete-step-by-step-guide/) for a second view.

## When the EA itself is simply at end of life

Every family above assumes the EA could work again if the right switch, folder or setting were found. There is a last possibility the checklists cannot fix, and it deserves a section of its own because traders resist it longest: the product has quietly reached the end of its life, and no environment you build will revive it, because the thing that stopped working is the EA itself.

End of life has recognisable signatures. The vendor has gone silent — no updates for a long stretch, support questions answered slowly or not at all, a sales page still cheerful while the comments underneath fill with unaddressed faults. The EA depends on something that no longer exists: a licence server that has been switched off, a news feed that changed its address, a broker feature or symbol it was built around that has been retired. Or the platform has moved past it: the code compiled under a lenient compiler years ago, the language has since tightened twice, and resurrecting it would mean paying a developer to modernise a strategy whose author has left the building. In each case the terminal, the account and you are all healthy. The dependency the EA stood on is what died.

The honest test is a short one. Can the vendor, contacted once with a proper report of the kind described below, name the cause and provide a working build for the current terminal? If they can, it was an ordinary fault. If they cannot, or do not answer, believe the evidence and make the retirement decision deliberately rather than by drift: export the trade history and the settings file for your records, close out the test accounts it was running on, and write one line in your settings record saying when it was retired and why. That line matters because dead EAs have a way of being rediscovered in old folders during optimistic weeks, and the note is what stops you re-running this month's entire investigation next spring.

Retiring a robot is not an admission that buying it was foolish. Products age, vendors move on, and platforms evolve underneath code that cannot evolve with them. The traders who lose most to end-of-life EAs are not the ones who bought them; they are the ones who kept a silent, unmaintained system attached to a live account for a year because stopping felt like defeat. A diagnosed retirement, recorded and closed, is the last fix this guide can offer — and on the day the signatures above are what your log is showing you, it is the correct one.

## The smallest version, for the next time

Because this will happen again, here is the whole guide compressed into the card to keep beside the terminal. Silent EA: read the log's first error. Icon crossed or unhappy: permissions. Log clean, no trades: chart symbol, suffix, timeframe, or conditions unmet. Broke after an update: permissions again, data folder, recompile check, WebRequest and DLL lists. Works on demo only: spread, execution, symbol specification, netting versus hedging. Trades but loses: tester comparison, then judge the strategy, not the setup. Errors about money: margin arithmetic and the account's own rules. Stopped overnight on a VPS: machine first, robot second.

Pin that sequence wherever you trade. Ninety percent of "my EA stopped working" is one line on that card, and the remaining ten percent is a vendor or broker question that the card's evidence lets you ask properly.

Work the families in order, trust the log over your memory, and change one thing at a time. A silent EA is not a mystery; it is a message you have not read yet.
