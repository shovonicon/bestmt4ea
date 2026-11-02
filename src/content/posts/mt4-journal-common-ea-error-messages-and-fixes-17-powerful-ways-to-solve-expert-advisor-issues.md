---
title: "MT4 Journal EA Error Messages and What They Mean"
slug: "mt4-journal-common-ea-error-messages-and-fixes-17-powerful-ways-to-solve-expert-advisor-issues"
description: "A plain guide to common MT4 journal error codes an expert advisor produces, what each usually means, and how to check the cause before changing anything."
publishedAt: 2026-11-02T00:00:00.000Z
updatedAt: 2026-11-02T00:00:00.000Z
categories:
  - "MT4 & MT5 Expert Advisors"
categoryPaths:
  - "/category/mt4-mt5-expert-advisors/"
tags: []
primaryKeyword: "mt4 journal ea error messages"
quickAnswer: "The MT4 Experts and Journal tabs record why an expert advisor could not place, modify or close an order. Common codes include 4109 for trading not allowed, 134 for insufficient margin, 130 for invalid stops and 138 for a requote. Read the code, find the matching cause, check one thing at a time, and change settings only after you know the reason."
keyTakeaways:
  - "The Journal and Experts tabs log each failed trading action with a numeric code and a short description."
  - "Many errors come from settings the account does not allow, such as stop distances below the broker's minimum or a lot size outside the allowed range."
  - "Error 4109 usually means automated trading is switched off in the terminal or the account."
  - "Change one thing at a time and record the result, so you know which change fixed the problem."
  - "An error is information about the trade, not a reason to remove a rule that worked."
faqs:
  - question: "Where do I find EA error messages in MT4?"
    answer: "Open the Terminal window at the bottom of the platform and select the Experts tab for messages from expert advisors, or the Journal tab for general platform messages. Errors include a code, the function that failed and sometimes the price involved."
  - question: "What does error 134 mean?"
    answer: "Error 134 means there is not enough free margin to open the requested position. Check the account balance, the lot size and the leverage, and reduce the position size if the margin required is more than the account can support."
  - question: "What does error 130 mean?"
    answer: "Error 130 means the stop loss or take profit is invalid. Usually the stop is too close to the current price, or it is on the wrong side of the market. Check the broker's minimum stop distance in the contract specification."
  - question: "Why do I see error 4109?"
    answer: "Error 4109 means trading is not allowed. Check that automated trading is switched on in the terminal, that the expert advisor allows trading in its settings, and that the account permits automated trading."
  - question: "Is a requote error dangerous?"
    answer: "A requote, usually error 138, means the broker offered a different price from the one requested. It is common during fast markets. It is a reason to check slippage settings and to avoid entering during news, not necessarily a fault in the advisor."
  - question: "Should I edit the EA code to fix errors?"
    answer: "Not until you know the cause. Editing code without understanding the error can change the logic of the strategy and invalidate any test you have run. Record the error, check the settings and broker specification first, and only then consider a code change in a separate version."
sources:
  - label: "MetaTrader 4 trading platform help"
    url: "https://www.metatrader4.com/en/trading-platform/help"
  - label: "MQL4 documentation on trade error codes"
    url: "https://www.metatrader4.com/"
download:
  name: "MQL compile error fix guide (PDF)"
  origin: "own"
  license: "Free for personal and educational use"
  licenseUrl: "https://bestmt4ea.com/disclaimer/"
  version: "1.0"
  fileKey: "resources/mql-compile-error-fix-guide.pdf"
  updatedAt: 2026-11-02T00:00:00.000Z
---

## Why does the journal matter more than the chart?

When an expert advisor fails to trade, the chart often shows nothing. The order does not appear, the stop is not set, and the account balance is unchanged. The answer is almost always in the terminal's Experts and Journal tabs, where the platform records each failed action with a numeric code and a short message. Learning to read those messages is one of the most practical skills a user of automated trading can build.

Many traders react to a failed trade by changing settings at random. They reduce the lot, widen the stop, turn off a filter, or reinstall the advisor, and sometimes the problem appears to go away for a while. Without knowing the cause, the change is a guess, and the next failure may return in a different form. The journal is the record that turns a guess into a diagnosis.

This guide explains the common error codes an MT4 expert advisor produces, what each one usually means, and how to check the cause before changing anything. It does not offer a fix for every advisor, because the cause depends on the broker, the account and the code. It gives you a method for finding the cause and recording what you did about it.

## Where do the messages come from?

The Experts tab shows messages written by expert advisors and indicators running on the platform. An advisor writes to this log when it calls a trading function and the function returns an error, when it prints information about its state, or when it hits a condition it was programmed to report. The Journal tab shows platform-level messages, such as connection events, loading of files and terminal startup.

To see the messages, open the Terminal window at the bottom of the platform and choose the tab you need. The Experts tab is usually the first place to look when an advisor is not trading. Messages are time-stamped, so you can match them with the bar or the event that triggered the action.

Keep the log. Copy the relevant lines into your journal, with the date, the pair, the timeframe and what you expected the advisor to do. A pasted log is the raw evidence for any diagnosis, and it is much easier to reason about once it is written down.

## What does error 4109 mean?

Error 4109 means that trading is not allowed. It is one of the most common messages, and it usually has a simple cause. The terminal's Automated Trading button may be switched off, the expert advisor's own settings may disallow trading, or the account may not permit automated trading at all.

Check each in turn. Confirm that the Algo Trading button on the toolbar is active. Open the advisor's settings and confirm that the option to allow live trading is ticked. Then check with the broker that the account type allows expert advisors. The fix is a setting, not a code change, and it should be recorded in the journal once it is confirmed.

## What does error 134 mean?

Error 134 means the account does not have enough free margin to open the requested position. Margin is the deposit the broker holds against an open trade, and free margin is the balance left after that deposit is set aside. If the lot size is larger than the account can support at the chosen leverage, the broker refuses the order.

The fix is usually to reduce the lot size or to increase the account balance, not to change the advisor's logic. Check the margin required for the lot you are trying to open, using the contract specification and the leverage on the account. The [leverage guide](/7-powerful-reasons-why-the-best-leverage-for-beginners-in-forex-leads-to-safer-profits/) explains how margin relates to notional exposure, and the calculator in that guide does the arithmetic.

Be cautious about a common response to error 134, which is to raise the leverage to make the margin requirement smaller. That reduces the margin shown, but it does not reduce the risk of the position, and it can make the next error worse.

## What does error 130 mean?

Error 130 means the stop loss or take profit is invalid. The most common cause is a stop that sits too close to the current price. Every broker sets a minimum distance between the market and a stop or a target, often called the stop level, and an order that falls inside that distance is refused.

Check the minimum stop level in the broker's contract specification for the pair. Then check the advisor's stop distance in points, and convert it to pips for comparison. A stop that is five pips away on a pair with a minimum of ten will always fail, however well the rule is written. The correct fix is to widen the stop or to change the rule so that it respects the broker's minimum.

Also check the side of the market. A buy stop-loss placed above the price, or a sell stop-loss placed below it, is invalid for an ordinary market order. A logic error in the advisor can place stops on the wrong side, especially after a change to the entry code.

## What does error 131 mean?

Error 131 means the requested trade volume is invalid. The lot size may be below the broker's minimum, above its maximum, or not a multiple of the allowed step. Many brokers allow a minimum of 0.01 lots and a step of 0.01, and an advisor that calculates a size such as 0.0037 will be refused.

Check the minimum, the maximum and the step in the contract specification, and make sure the advisor rounds its calculated size to the allowed step before sending the order. A rounding bug is a common source of this error, and it often appears only when the account balance is unusual.

## What does error 138 mean?

Error 138 is a requote. The broker has offered a different price from the one the advisor requested, usually because the market moved between the request and the fill. Requotes are common during fast markets and around news releases, when prices change more quickly than the connection can follow.

A requote is information about execution, not usually a fault in the logic. Check the slippage setting in the advisor and the order type it uses. Consider whether the advisor should avoid entering during news or during the first moments of a session. Record the time of each requote, because a cluster at a certain hour tells you when execution is weakest.

## What does error 136 mean?

Error 136 means that the broker has no quote for the requested price, which is often described as off quotes. The price feed is temporarily unavailable, perhaps during a maintenance window or a sudden gap in liquidity. The advisor cannot trade until a price is available again.

Do not respond to error 136 by increasing the retry rate. A flood of retries can slow the terminal and can send duplicate orders when the connection recovers. Check whether the errors cluster around the broker's known maintenance times, and record them. A pattern tells you when the advisor should not be trading.

## What does error 146 mean?

Error 146 means the trade context is busy. The terminal can process only one trading request at a time, and another request is still being handled. This happens when two advisors send orders at the same moment, or when a single advisor sends several requests in quick succession.

Check how many advisors are running on the terminal and whether any of them is sending requests in a loop. Running several advisors on one terminal can cause this error, and separating them onto different terminals can remove it. A retry after a short pause is often the correct response, but it must be limited, so that a single fault does not create many duplicate trades.

## What does error 4106 mean?

Error 4106 means the symbol is unknown. The advisor is trying to trade or read data for a symbol that the terminal does not recognise. The cause is often a symbol name that differs slightly from the broker's name, such as a suffix or a prefix added by one broker and not another.

Check the symbol names in the Market Watch window, and compare them with the name in the advisor's settings. If you move an advisor from one broker to another, the symbol name is a common point of failure. Update the name in the settings, and test the advisor on demo before it trades live.

## What do the other common messages mean?

The journal records many other messages that are not trading errors. Messages about loading a file, such as a missing indicator or a failed attempt to read a CSV, usually mean the advisor expected a file that is not in the terminal's data folder. The fix is to place the file in the right location or to correct the path in the code.

Messages about history data, such as a request for bars that are not available, usually mean the chart has not loaded enough history. Open the chart, scroll back to load more bars, and then reattach the advisor. Messages about a failed connection usually concern the broker's server, and they are best checked against the broker's status information.

When a message is not in this guide, copy its full text, look up the code in the platform's documentation, and record what you found. A new code is a learning opportunity, and the journal entry will help the next diagnosis.

## How do you diagnose an error in a fixed order?

Start by reading the message in full, including the code, the function and the time. Then check the three most common causes in order: the terminal's trading switch, the account's margin, and the broker's minimum distances and lot sizes. Most errors are explained by one of these three.

Next, reproduce the error on demo, using the same settings. If the error appears on demo, the cause is in the settings or the logic, and you can investigate calmly. If it appears only on the live account, the cause may be the broker, the account type or the connection, and you should check those first.

Change one thing at a time. Record the change, the time and the result. A single change that removes the error is a diagnosis. Several changes that together remove the error are not, because you will not know which one mattered, and the next error may come back for the reason you never identified.

## What should you do if an error repeats?

A repeated error is a sign that the advisor is attempting the same action under the same conditions and failing each time. Stop the advisor before it creates more failed orders, or in the worst case, more duplicate orders. Most platforms let you remove the advisor from the chart or switch off the trading button quickly.

Check whether the repeated errors have created any open positions, pending orders or partial fills. Review the account history and the open trades before you restart anything. A repeated error can leave an account in a state that the advisor does not expect, and that state needs to be cleared by hand.

Record the episode in full. Note the error, the number of repeats, the settings, the account and what was done to stop it. A written account of an incident is one of the most useful documents a trader can keep, and it helps prevent the same failure from happening again.

## Why should you be cautious about code changes?

Editing an advisor's code to suppress an error is tempting, because the messages look like a problem to be removed. Suppressing a message does not remove its cause. An advisor that ignores a failed order may carry on as if the trade exists, and the mismatch between its internal state and the account can produce much larger problems later.

If a code change is needed, make it in a separate copy of the file, test it on demo, and record the version. Keep the original, so you can compare the behaviour of the two. A code change that alters the logic of the strategy also invalidates any test run on the previous version, and that test should be marked as belonging to the earlier code.

## How do you read a whole journal entry, line by line?

A single error line is often part of a longer sequence. Before diagnosing it, read the lines just above and below. An advisor that logs a successful order, followed by an error on the stop, may have opened a position that now has no protection. A string of identical errors after a restart may mean the advisor is repeating a failed initial step. The context changes the diagnosis, and a single line read alone can send you in the wrong direction.

Read the timestamps as well. Errors that appear at the same minute each day may point to a broker maintenance window, a scheduled report or a news release. Errors that appear only when the terminal has been open for several days may point to a memory or connection issue. Note the pattern in your log, because the pattern is often the clue that identifies the cause.

## How do you check the account after an error?

After any error that involved an order, check the account before restarting the advisor. Look at the open positions, the pending orders and the account history for the last hour. Confirm that every open position has the stop and target the advisor intended, and that no duplicate order exists. A mismatch between what the advisor believes and what the account holds is the most dangerous outcome of an error, and it is easy to miss when attention has moved on to the message itself.

If a mismatch exists, close or correct it by hand before the advisor is allowed to trade again. Record what you found and what you did. A short note with the ticket numbers is enough, and it becomes the basis for checking whether the same mismatch recurs.

## Why should a rule be tested after every fix?

A fix to an error can change the timing of trades, the size of orders or the way the advisor handles a condition. Any such change is a change to the strategy, and the change should be tested on demo before it returns to live trading. Run the advisor on demo for a period that includes the conditions that produced the error, and confirm that the error no longer appears and that the trades look as expected.

Record the test in the same way as any other test. State the version, the settings, the period and the result. A fix that is tested in this way gives you confidence that the advisor is behaving as intended. A fix that is applied without a test may remove one error and create another that is harder to see.

## How do you keep an error log that is useful over months?

A useful error log has a fixed structure. Each entry records the date and time, the advisor name and version, the pair and timeframe, the message code and text, the settings in effect, the account type, what was observed on the account, and what was changed. Keeping the same fields for every entry makes the log searchable, so a future search for error 130 returns every occurrence in one place.

Review the log monthly. Count the entries by code, and look for codes that appear more often than expected. A rising count of one code often signals a change in the broker, the connection or the market conditions, even when the advisor has not changed. Early notice lets you act before the problem causes a financial loss.

Keep the log separate from the trade journal, but link them by date and ticket number, and treat any entry without a ticket number as an event that still needs a check against the account history. The error log explains why an order failed or was modified. The trade journal records the result of the orders that did go through. Read together, they show the full picture of a period of trading.

## Which settings most often cause errors?

Across many advisors, a small set of settings produces most of the errors. Stop distances that do not respect the broker's minimum appear first, followed by lot sizes that are not rounded to the allowed step, and then slippage values that are too tight for the market being traded. Check these three settings before anything else when an advisor begins to produce errors.

Magic numbers also matter. A magic number identifies the orders an advisor placed, so the advisor can find and manage them. Two advisors on the same account with the same magic number can each try to modify the other's trades, and the resulting errors are confusing. Give each advisor and each pair its own magic number, and record the list in the journal.

Time settings can cause errors too. An advisor that trades only in a session, or that avoids a window around news, must use the broker's server time, which may differ from your local time by several hours. A setting entered in local time can place trades at the wrong moment, and the error log may show a cluster at an hour that surprises you. Check the server time offset in the settings before trusting any time filter, and recheck it after the broker changes its daylight-saving rules, because the offset can change twice a year.

## When should you ask for help, and what should you send?

Some errors are beyond a single trader's diagnosis, especially when they involve the broker's server or a code path you cannot read. When you ask for help, send the information that lets someone reproduce the problem: the exact error lines, the advisor name and version, the settings file, the broker and account type, the server time, and a description of what you expected to happen. Missing details slow the diagnosis and often lead to the wrong guess.

Before sending anything, reread the log once yourself, looking line by line for anything personal or private, because a settings file often contains details that are easy to overlook, such as a broker login stored in a custom input. Do not send your account password, your full account number or any API key with the log. A helpful request needs the trading facts, not the credentials, and a clear description of the symptom is worth more to the person helping than a long, unfiltered dump of every line in the log, and it is faster to read. Remove those details before sharing, and check that the settings file does not contain a key or password in plain text.

## What does this guide not promise?

This guide does not promise that every error can be fixed, and it does not describe every error code an advisor can produce. The codes and messages depend on the platform build, the broker and the advisor's own code, and some errors have causes that only a careful investigation can find.

It also does not promise that an advisor will trade profitably once its errors are removed. An error is a failure to act, and fixing it makes the advisor act. Whether those actions are profitable is a separate question, and it must be answered by testing.

## What is the offer in this guide?

The offer is the MQL compile error fix guide, a printable guide that covers the common causes of compile and runtime problems in MQL4 code. It is a reference for reading an error and tracing it to its source, and it complements the journal method in this guide. Keep it with your error log, and add notes as you learn the specific messages your advisors produce.

The guide does not fix an advisor for you. It helps you understand the message, which is the first step toward a correct fix.

## How do you start this week?

Start by opening the Experts and Journal tabs on your terminal and reading every message from the last week. Copy the messages that concern trading into a log, with the date and the time. Group them by code.

Next, check the three common causes in order: the algo trading switch, the margin available, and the broker's minimum stop and lot sizes. Record the result of each check. Then, on demo, reproduce the most frequent error and fix it by changing one setting at a time.

Finally, keep the log going. A journal of errors, their causes and their fixes becomes a personal troubleshooting guide, and it saves time every time the same problem returns. For how to check an advisor before it trades live, read the [backtest honesty guide](/9-powerful-mt4-ea-optimization-settings-for-eurusd-m5-to-boost-performance-fast/) and keep the [pip guide](/what-is-a-pip-in-forex-simple-explanation-the-ultimate-beginner-friendly-guide/) at hand for converting stop distances.

For more free tools and checklists, visit the [resource library](/blog/).
