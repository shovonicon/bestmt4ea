---
title: "Moving an EA from Demo to Live Without Changing the Edge"
slug: "demo-to-live-ea-migration"
description: "How to move an EA from demo to live without changing its edge: the fourteen things that differ at the switch, and how to control each one before you fund."
publishedAt: "2026-10-31T12:00:00.000Z"
updatedAt: "2026-10-31T12:00:00.000Z"
categories:
  - "Brokers & Trading Platforms Reviews"
  - "Forex Risk & Money Management"
categoryPaths:
  - "/category/ai-powered-trading-tools/brokers-trading-platforms/"
  - "/category/risk-money-management/"
tags: []
seo:
  title: "Demo to Live EA Migration: 14 Changes to Control"
  description: "Moving an EA from demo to live: the fourteen differences in fills, spread, swap, server time and symbols, with a control for every one before you fund."
quickAnswer: "Moving an EA from demo to live can change fills, spreads, swap, server time, symbol names, leverage and several other conditions, even when the code is identical. The strategy's edge depends on those conditions. Before funding, record each difference between demo and live, decide how the EA handles it, and run a small live test at a known size. Keep demo and live results side by side for the same period."
primaryKeyword: "demo to live ea"
keyTakeaways:
  - "The code is the same on demo and live, but the conditions it trades under are not. The edge belongs to the conditions, so a difference in conditions is a difference in strategy."
  - "Fourteen things commonly change at the switch. Most are invisible in a demo account, and each one can move the result."
  - "Record the demo results and the live results for the same period and the same instruments. Without that pairing, you cannot tell a change in the market from a change in the setup."
  - "Start live at a small, fixed size with pass criteria set in advance. Scale only after the live results fall inside the range the demo predicted."
  - "Check every symbol name, server time setting, lot step and stop level on the live account before the first trade. Most migration failures are configuration errors."
faqs:
  - question: "Why does an EA behave differently on live than on demo?"
    answer: "The code is the same, but the conditions are not. Live fills, spreads, commissions, swap, server time, symbol names and execution differ from the demo environment, and each difference can change which trades the EA takes and what each one earns. Find the differences before funding, not after."
  - question: "How long should I run an EA on demo before going live?"
    answer: "There is no fixed answer, because it depends on how often the EA trades. A system that trades rarely needs a longer demo period to produce a meaningful sample. Run it long enough to see the trade count, the spread pattern and the drawdown you expect, across more than one market condition."
  - question: "Should I start live with the full intended size?"
    answer: "No. Start with a small, fixed size and pass criteria written down in advance. Scale up only when the live results stay inside the range the demo predicted for the same period. A larger size on day one tests your nerve as much as the strategy."
  - question: "What is the most common cause of a failed migration?"
    answer: "Configuration. A wrong symbol suffix, a server time offset, a lot step that does not match the EA's input, or a stop level that rejects the EA's orders will each cause failures that look like poor performance. Check the setup on the live account before you judge the strategy."
  - question: "Can I compare demo and live results directly?"
    answer: "Only if you pair them carefully. Use the same instruments, the same time period, the same lot size and the same EA settings, and record the spread and fills for each. Without those matches, the comparison mixes the difference in conditions with the difference in strategy, and the result tells you little."
sources:
  - label: "Our broker terms guide (execution and latency clauses)"
    url: "https://bestmt4ea.com/do-brokers-allow-eas-and-scalping/"
  - label: "Our running-costs guide (spread, swap and slippage as costs)"
    url: "https://bestmt4ea.com/ea-running-costs-spread-commission-swap/"
  - label: "Our cent-account guide (minimum lot and sizing on small balances)"
    url: "https://bestmt4ea.com/cent-account-dollars-1-deposit-ea/"
download:
  origin: own
  name: "Demo to live migration checklist"
  license: "Free to use and share; provided without warranty"
  fileKey: "posts/demo-to-live-migration-checklist.txt"
---

Most expert advisors are first tested on a demo account, and the results often look encouraging. The equity curve rises, the drawdown stays within expectations and the trade log reads cleanly. The temptation at that point is to switch the same EA to a live account, keep the same settings and expect the same results.

That expectation is where many migrations fail. The EA's code does not change at the switch, but the conditions it trades under do. The fills arrive at different prices, the spread changes with the hour, the server clock may be set differently, the symbol may carry a suffix the EA does not expect, and the broker may apply a stop level that rejects orders the demo accepted. Each of these changes the trades the EA takes and what each one earns. Taken together, they can turn a strategy that worked on demo into one that loses money live, without a single line of code being edited.

This guide sets out the fourteen things that most often differ between demo and live, explains how each one changes the result, and describes how to control each one before you fund. It then covers the staged way to start live, so that a difference you missed costs a small amount rather than a large one. The aim is not to predict how your EA will perform live. It is to make sure that when it does perform differently, you know why.

The method below applies to any broker, and it does not depend on which one you use.

## The edge belongs to the conditions

An EA's edge is the expected result of its trades under the conditions in which it trades. Those conditions include the prices it receives, the costs it pays, the times it is allowed to act and the rules the broker applies to its orders. A change in any of them changes the edge, even if the signal logic is identical.

This is why the phrase "same code, different results" is not a mystery. The code decides when to trade. The conditions decide what the trade is worth. A strategy whose gross result per trade is only a little above its costs will be sensitive to small changes in those costs, and a strategy that trades often will be sensitive to small changes in fill quality repeated many times.

So the migration question is not whether the code works live. It is whether the conditions live are the ones the demo results assumed, and if they are not, how much the result changes as a result. You answer that by listing each difference, measuring it where you can and deciding in advance how the EA should handle it.

## The fourteen things that change

The list below covers the differences that most often matter. Not every one applies to every EA, but each should be checked. Most are invisible on a demo account, and several are set once in the terminal and then forgotten.

1. Fill prices and slippage. Live orders fill at the prices the market offers at the moment of execution, which can differ from the demo fill.
2. Spread, by hour and by event. The average spread you pay depends on when the EA trades, and the live spread can differ from the demo figure.
3. Commission. Raw or ECN-style accounts charge a per-lot fee that demo accounts may not reproduce.
4. Swap and rollover. Positions held across the rollover time pay or earn a charge that may not match the demo's figure.
5. Server time. The broker's server clock and its offset from your time zone decide the session filters and the rollover moment.
6. Symbol names and suffixes. A live account may use a different name for the same instrument, such as a suffix or a prefix.
7. Leverage and margin. Margin requirements can differ between the demo and live accounts, and they affect how many positions the EA can hold.
8. Lot step, minimum and maximum. The smallest size change and the largest allowed size can differ from the demo's settings.
9. Execution mode and requotes. The broker may fill orders instantly, on request or on market, and requotes can reject a trade the demo accepted.
10. Stop and freeze levels. The minimum distance for stop orders and the distance at which positions cannot be modified can reject orders the EA sends.
11. Hedging and netting rules. Some accounts allow opposing positions on the same instrument and others net them, which changes how the EA manages exits.
12. Connection and restarts. A live VPS, a broker connection that drops, or a terminal restart can stop the EA at a moment the demo never reached.
13. Account currency. The account's currency decides the pip value in your account terms, and a mismatch can distort every position size.
14. Market hours and history. Live symbols may have different trading hours, holidays and history depth from the demo, which affects indicators that need a warm-up period.

Each of these can move the result on its own. Several together can move it a great deal, and they interact. A wider live spread at a different server time, combined with a stop level that rejects the EA's tightest exit, produces a result that no single change would explain.

## Measuring the gap: pair the demo and live periods

The most useful habit in a migration is pairing. Before you can say whether a difference matters, you need the demo and live results for the same period, the same instruments, the same settings and the same lot size. Without that pairing, a difference in result could come from the market, from the calendar, from the settings or from the conditions, and you cannot separate them.

Start by choosing a period. Use the last few weeks of demo results, and run the live account on the same instruments for a period of similar length, or the same period if the live account has existed alongside the demo. Record the EA version and settings for both, and confirm they are identical. A settings change made during the period is a difference you must record.

Then compare the trades one by one where you can. Match each live trade to the demo trade that the same signal produced, if one exists, and compare the entry price, the exit price, the time and the result. The differences will show you where the conditions diverge. A trade that is missing from one side, a trade that fills at a worse price, and a trade that exits at a different time each point to a different cause, and each cause needs its own control.

## Fills and slippage

Fills are the first thing to measure, because they change every trade. Compare the price the EA requested with the price it received, on each live trade, and record the adverse slippage. Use the average of the adverse fills, not the net figure, because the favourable fills are not something you can plan around.

A demo account often fills at the quoted price, or very close to it, because the simulated execution does not reproduce the queue and the competition that live orders meet. A live fill that is a fraction of a pip worse on every trade is a real cost, and it compounds across a high trade count. Our [running-costs guide](/ea-running-costs-spread-commission-swap/) shows how a small per-trade figure becomes a large annual one.

If the live slippage is worse than the demo figure, check the time of day first. Slippage is often concentrated around the open, around news and in thin sessions, so a single average can hide a pattern. Decide whether the EA should avoid those windows, or whether the cost is acceptable at the size you trade.

## Spread by hour and event

The spread is the second thing to measure, and it varies more than most traders expect. The advertised figure is a typical value for the instrument, and the average you pay depends on the hours your EA trades. Record the spread at the moment of each order, and group the results by hour of the day.

Then look at the events. Spreads widen around scheduled releases and around sudden moves, and an EA that trades on momentum may enter precisely when the spread is widest. Check whether the EA trades in those windows, and whether the stop and target distances still make sense when the spread is larger than the demo figure.

The control here is usually a session filter. Restrict the hours the EA may trade to the periods where the measured spread is acceptable, and test that restriction on the live account before relying on it. Remember that the session filter depends on the server time, which is the fifth item in the list, so the two must be checked together.

## Swap and rollover

Swap applies to positions held across the rollover time, and its effect depends on how long the EA holds trades. A scalper that closes everything before rollover will rarely see a swap charge. A system that holds overnight will pay or earn it on every such trade.

The demo may apply swap at a figure that does not match the live rate. Check the live rates for each instrument the EA trades, in both directions, and record them with the date. Note the day on which the broker applies the tripled charge for weekend settlement, which is usually Wednesday for spot forex, and check that your EA's holding pattern and its swap estimate account for it.

If the swap is a cost, decide whether the strategy can absorb it. If it is a credit in one direction, check that the EA's results are not depending on it. A strategy whose profit relies on a swap credit is a carry trade in disguise, and that should be stated plainly in your notes rather than discovered later.

## Server time and session filters

The broker's server clock is the source of the time stamps on every trade, every candle and every rollover. It is usually set in a particular time zone, and that zone may not match your local time or the time zone assumed in your EA's session filter.

Check the offset before the first live trade. Compare the time on the live server with a reliable reference, and confirm which time zone the broker uses for its rollover and its daily candle. Then check that your EA's session times are written in the broker's server time, not in your local time. A filter written for London time, applied to a server running on a different offset, will trade in the wrong hours, and the demo may have hidden the error if its server used a different setting.

Daylight saving adds a further complication, because the broker's clock may move on a different date from the one in your own zone. Record the dates on which the offset changes, and check the filter again on each of them.

## Symbol names and suffixes

A symbol is the name the terminal uses for an instrument, and it is not always the same on every account. A live account may label EURUSD with a suffix, a prefix or a different code, and an EA that asks for the bare name may fail to find the instrument, or may attach to a different one.

Check the exact symbol name on the live account, in the market watch, before you change the EA's input. Then check that the EA reads the same name, and that it trades the instrument you intended. A suffix can also change the contract size, the minimum lot and the spread, so the symbol specification must match the one you used on demo.

Be careful with symbols that look similar. A gold or index contract may have several versions with different sizes, and selecting the wrong one changes every position's value. Confirm the contract size in the specification before you trade.

## Leverage and margin

Leverage decides how much margin a position requires, and the margin decides how many positions the account can hold and how close the account comes to a margin call. The demo account may offer a different leverage from the live one, and the live leverage may change with the instrument, the account type or the size of the position.

Check the leverage and the margin requirement on the live account for each instrument the EA trades. Calculate the margin the EA will need at its largest intended size, and compare it with the balance. An EA that opens several positions at once can exhaust the margin quickly, and a broker's margin call or stop-out rule may close positions without the EA's knowledge.

Record the margin level at which the broker acts, and the level at which the EA's own logic would stop trading. These are different numbers, and the EA should stop before the broker has to act.

## Lot step, minimum and maximum

The lot step is the smallest change in size the broker allows, and the minimum and maximum set the range. An EA that calculates a size with more decimal places than the broker allows will have the order rejected, or rounded in a way the EA did not expect.

Check the lot step, minimum and maximum on the live account for each instrument. Compare them with the values the EA uses, and check that the EA rounds its calculated size to the broker's step rather than to a step of its own. A size that rounds up to the minimum can exceed the risk the EA was designed to take, as the cent-account guide explains in detail.

If the live minimum is larger than the size your sizing rule calculates, decide in advance what the EA does. It should skip the trade, reduce the stop or accept the larger risk and record that it did so. A rule that is left to the rounding will decide for you, and the decision will be a quiet one.

## Execution mode, requotes and rejections

The execution mode determines how the broker fills an order. Some brokers fill instantly at the quoted price when the order is within a tolerance. Others use request-based execution, where the EA's order is quoted back and may be accepted or rejected. A few use market execution, which fills at whatever price is available.

A requote or a rejection is a failed trade. The EA may retry, or it may give up. If it retries blindly, it may enter at a worse price than the signal intended, or it may enter twice. Check how the EA handles a rejection, and test that path on the live account with a small size before you rely on it.

Record the rejection rate on the live account over the test period. A high rejection rate during news or at the open is a condition the strategy must handle, not a fault to ignore. Decide whether the EA should avoid those windows or accept the missed trades, and write the decision down.

## Stop and freeze levels

Brokers set a minimum distance between the current price and a stop or target order. This is the stop level. A freeze level is the distance within which an existing position cannot be modified. Both are set by the broker, and both can reject orders that the demo accepted.

Check both values on the live account for each instrument. Compare them with the stop and target distances the EA uses, and find out whether any of its orders fall inside them. An EA with a tight trailing stop may find that the broker refuses to move the stop, and the position then runs with the wrong protection. That failure is quiet, and it can persist for days if nobody looks at the logs.

Test the trailing and modification logic on the live account with a small size. A stop that appears to move on the chart may not have moved at the broker, and the only reliable check is the broker's record of the order.

## Hedging and netting rules

Some accounts allow positions to open in both directions on the same instrument, which is called hedging. Others net the positions, so that a buy and a sell on the same instrument combine into one. The rule changes how the EA manages its exits, and a mismatch causes trouble that the demo may not reveal.

If the demo account hedges and the live account nets, an EA that opens a sell while holding a buy will find that its buy has been closed or reduced, and its logic may not expect that. Check the account type, confirm the rule, and test the exit path in both directions on the live account with a small size.

The same applies to the number of positions allowed on one instrument, and to any limit the broker places on the number of open orders. Record each limit, and check that the EA stays inside it.

## Connection, restarts and the VPS

A live EA depends on a connection that the demo did not need to keep up. The terminal must reach the broker, the broker must reach the market, and the server must stay running. A dropped connection can leave a position open with no management, and a restart can reset the EA's internal state.

Check that the terminal restarts automatically after a server reboot, that the EA reloads with its settings, and that it reads the open positions correctly on restart. Test a forced restart on the live account with a small size, and check the log to see whether the EA recovered its state or started from scratch. An EA that forgets its open positions on restart can open duplicates, or fail to protect the ones it has.

Our [VPS guide](/vps-for-ea-trading-latency/) covers the server choice, the restart behaviour and the latency measurement in more detail.

## Account currency and the pip value

The account currency decides the value of a pip in the account's own terms. A pip on an account denominated in one currency is worth a different amount from a pip on an account denominated in another, even on the same instrument.

Check the account currency on the live account, and check the pip value per lot in that currency. If the EA's sizing logic assumes dollars and the account holds euros or pounds, every position size will be wrong by the exchange rate. The error is quiet, because the EA still trades, and the risk per trade is no longer the risk you intended.

The same check applies to any figure the EA reads from the account, such as the balance or the equity. Confirm the unit and the currency of each figure, and test the sizing on a small live trade before you rely on it.

## Market hours, holidays and history

The live symbols may trade on different hours from the demo, and they may close for holidays or for maintenance that the demo did not reproduce. An EA that expects a continuous market may behave badly when the market is closed, and an indicator that needs a long history may fail if the live history is shorter than the demo's.

Check the trading hours on the live account for each instrument, and note the holidays that apply. Check that the EA handles a closed market without opening trades or misreading the last price. Then check the history depth, and confirm that the indicators have enough data to warm up when the EA starts.

## Starting live: the staged approach

The safest way to move to live is in stages, with the size and the duration set in advance. The first stage is a small, fixed size, such as the minimum lot the broker allows, if that lot is consistent with your risk rules. Use the same instruments and settings as the demo, and run for a period long enough to see the trade count you expect.

Write the pass criteria before the first trade. They should include the expected trade count range, the expected average spread and slippage range, the expected drawdown, and the expected result range, all taken from the paired demo period. If the live results fall within those ranges, the migration is behaving as the demo predicted. If they fall outside, stop and find the cause before scaling up.

The second stage increases the size only after the first stage passes. Keep the increase modest, and repeat the comparison. Do not move to the full intended size until the results have held inside the predicted ranges across more than one market condition.

Throughout, keep a log. Record the time, the trade, the fill, the spread, the slippage, the swap and any error from the terminal. The log is what lets you find the cause when the result differs, and it is what you will need to review the EA later.

## Common mistakes in a migration

The most common mistake is changing the settings at the switch. A new lot size, a different session filter or an extra indicator makes the live results impossible to compare with the demo. Make the migration a single change of account, and record any settings change separately, with its own test.

The second mistake is judging the strategy from a few days. A short live period can show a large result in either direction by chance, and a migration that is judged too soon is judged on noise. Set the duration in advance, and stick to it.

The third mistake is ignoring the configuration. Most migration failures are errors in the symbol name, the server time, the lot step or the stop level, and they look like poor performance. Check the configuration first, every time.

The fourth mistake is assuming that a profitable demo means a profitable live account. The demo may have hidden costs, fills and rules that the live account applies. The migration is a test of whether those costs and rules leave the edge intact, not a formality before the real trading begins.

The fifth mistake is scaling up after a good week. A short run of good results is not evidence that the edge has survived the switch. Scale only when the pass criteria say so.

## Where to go next on this site

Before you migrate, read the contract. Our [broker terms guide](/do-brokers-allow-eas-and-scalping/) explains the clauses that decide whether an EA's trading pattern is allowed, and how the execution, latency and holding-time rules can change what happens to the orders it sends. A migration that breaks a clause will not be rescued by good configuration.

Measure the costs before you trust the result. Our [running-costs guide](/ea-running-costs-spread-commission-swap/) sets out how spread, commission, slippage and swap combine into a cost per trade and a break-even figure, and the same method applies to the live account. If your balance is small, our [cent-account guide](/cent-account-dollars-1-deposit-ea/) explains how the minimum lot can distort the sizing you tested on demo.

Our [best brokers for EA trading](/best-brokers-for-ea-trading/) and [XM review](/xm-review/) include test plans and checks you can use alongside this migration. The principle is the same in each case: pair the demo and live periods, measure the gap and decide the controls before you fund.

## Get the checklist

The checklist is a plain text form that walks through the fourteen items in order. For each one it asks you to record the demo value, the live value, the control you chose and the date you checked it. It ends with the staged pass criteria, so that they are written down before the first live trade.

Complete one copy for each account and each EA version. Keep it with your settings file, your demo and live logs, and the broker terms that applied on the date you checked them. Save a new copy whenever the broker changes its conditions, or whenever you change the EA.

## The bottom line

Moving an EA from demo to live does not change its code, but it changes the conditions the code trades under. Fills, spreads, commissions, swap, server time, symbol names, leverage, lot steps, execution rules, stop levels, hedging rules, connections, currency, market hours and history can each move the result, and together they can change it a great deal.

Pair the demo and live periods so the differences can be measured. Control each of the fourteen items before you fund. Start live at a small, fixed size with the pass criteria written in advance, and scale only when the results stay inside the range the demo predicted. Trading carries a real risk of loss, and a strategy that works on demo can lose money live when its conditions differ. The point of the migration is to find that out at a small size, not at a full one.

Model used: claude-haiku-5-5
