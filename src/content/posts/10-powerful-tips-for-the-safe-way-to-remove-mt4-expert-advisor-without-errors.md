---
title: "Removing an MT4 Expert Advisor Safely: Step by Step"
slug: "10-powerful-tips-for-the-safe-way-to-remove-mt4-expert-advisor-without-errors"
description: "How to remove an MT4 expert advisor without leaving orphaned trades, stray settings or error messages, with a checklist for records, open positions and files."
publishedAt: 2026-11-02T00:00:00.000Z
updatedAt: 2026-11-02T00:00:00.000Z
categories:
  - "MT4 & MT5 Expert Advisors"
categoryPaths:
  - "/category/mt4-mt5-expert-advisors/"
tags: []
primaryKeyword: "how to remove mt4 expert advisor safely"
quickAnswer: "To remove an MT4 expert advisor safely, first decide what happens to its open trades, then stop it from trading, close or hand over its positions, save its settings and logs, and only then delete the file. Removing the advisor from the chart without checking open orders can leave trades without management, and deleting the file without a record makes the history impossible to review."
keyTakeaways:
  - "Decide what happens to every open position before you detach the advisor from the chart."
  - "Detaching an advisor does not close its trades. Open positions stay on the account and need a manual decision."
  - "Save the settings file, the journal and the trade history before you delete anything."
  - "Remove any leftover pending orders that the advisor created, so they do not trigger later without management."
  - "Record the removal in your journal, with the date, the reason and the state of the account afterwards."
faqs:
  - question: "Do open trades close when I remove an expert advisor?"
    answer: "No. Removing an advisor from a chart does not close its trades. Open positions and pending orders stay on the account. Some advisors also set stops and targets that continue to work after removal, while others depend on the advisor to manage the position."
  - question: "Should I close trades before removing an advisor?"
    answer: "That is a decision for each position. Closing a trade may lock in a loss or a gain, and leaving it open means someone must watch it. Decide per trade, record the reason, and make sure every open position has a stop and a plan."
  - question: "Can I delete the EA file after removing it from the chart?"
    answer: "You can, but keep a copy first. The file holds the logic that produced the trades, and you may need it to review the history or to reproduce a test. Store the copy with its version number and the date it was removed."
  - question: "What about pending orders left by the EA?"
    answer: "Pending orders stay active until they are filled, cancelled or expired. An advisor that is removed can no longer manage them, so a pending order can fill later without any protection. Review and cancel pending orders by hand unless you have a specific plan for them."
  - question: "How do I stop an EA without leaving the terminal in a bad state?"
    answer: "Disable automated trading in the terminal, remove the advisor from the chart, and then check the Experts and Journal tabs for final messages. Restarting the terminal after removal clears most leftover processes, but check the account first."
  - question: "Should I keep the settings of a removed advisor?"
    answer: "Yes. Settings are part of the record of what the advisor did. Save them with the trade history, so that a later review can match the trades to the settings that produced them."
sources:
  - label: "MetaTrader 4 trading platform help"
    url: "https://www.metatrader4.com/en/trading-platform/help"
  - label: "Investor.gov: the US SEC investor education site"
    url: "https://www.investor.gov/"
download:
  name: "EA installation checklist (PDF)"
  origin: "own"
  license: "Free for personal and educational use"
  licenseUrl: "https://bestmt4ea.com/disclaimer/"
  version: "1.0"
  fileKey: "resources/ea-installation-checklist.pdf"
  updatedAt: 2026-11-02T00:00:00.000Z
---

## Why is removing an expert advisor a risky step?

Most traders think of removing an expert advisor as a simple action. They drag it off the chart, delete the file and move on. That approach works when the advisor has no open trades, no pending orders and no records that matter. It fails in the more common case where the advisor has been running for weeks, has left positions on the account and has produced a history that someone will later need to understand.

The risk is not the removal itself. It is what the removal leaves behind. A trade that was managed by the advisor, with a trailing stop and a partial close, is suddenly managed by nothing. A pending order placed at the advisor's instruction can fill at a moment when no one is watching. A settings file that was not saved can be impossible to recreate, and a log that was not kept can make the trades impossible to explain.

This guide sets out a removal method in order. It starts with the open positions, then the pending orders, then the records, and only then the files. The method takes some time, and it is much less stressful than discovering an unmanaged position after the advisor has been deleted.

## What should you check before you touch anything?

Start by listing everything the advisor is responsible for. Open the Trade tab in the terminal and note each open position and pending order whose magic number matches the advisor. Note the ticket number, the pair, the direction, the lot size, the stop and the target. If a position has no stop, record that as well, because it is the most urgent item on the list.

Next, check the advisor's settings for any feature that acts after removal. Some advisors place stops and targets with the broker, which continue to work. Others rely on the advisor to move stops, to close partial positions or to cancel orders at a certain time. Those advisors leave the account in a state that needs a manual plan.

Finally, look at the account history for the last few days. Confirm that the advisor's recent trades match your expectations, and note any errors that were logged near the removal date. A removal is easier to reason about when you know the last thing the advisor did.

## How do you decide what to do with each open trade?

For each open position, there are three choices. You can keep the trade open and manage it by hand, with a stop and a target you set now. You can close it at the current price, accepting whatever profit or loss results. Or you can set a plan to close it at a specific time or level. Each choice should be made deliberately, and recorded with its reason.

Keeping a trade open means someone must watch it, and a trade left without management can move against you while you are away from the screen. If you keep it, set a stop that matches your plan's risk limit, and confirm that the stop is valid under the broker's minimum distance. Check the stop level in the contract specification before entering it.

Closing a trade locks in its current result. That is often the simplest option when the position is not part of a plan you intend to continue. Record the closing price and the reason, so that the trade is accounted for in the history.

## What about pending orders?

Pending orders are the most dangerous leftovers. A buy stop or a sell limit that the advisor placed will fill whenever the market reaches its price, and no advisor will be there to manage the position afterwards. If the advisor is removed, a pending order can become an open position with no stop, at a moment you did not plan for.

Review every pending order with the advisor's magic number. Cancel the orders you do not want, and record each cancellation. If you want to keep an order, set a stop and a target for the resulting position, and decide who will manage it. A pending order that is kept without a plan is an unmanaged risk, and it should be treated as one.

## How do you stop the advisor cleanly?

Stopping an advisor cleanly is a sequence. First, switch off automated trading in the terminal using the Algo Trading button, so that no new orders can be sent while you work. Then, if you want the advisor to stop managing trades but not to disappear from the account, remove it from the chart. The removal prevents further actions, and the open trades remain as they were.

After removal, check the Experts and Journal tabs for final messages. An advisor sometimes logs a shutdown message or an error that happened as it was removed, and that message belongs in the record. Copy the messages into the journal before clearing the tabs.

Restarting the terminal after the removal can clear leftover processes, but do not restart until the account has been checked. A restart does not close trades, and it does not cancel orders, so the account check must come first.

## What records must be kept?

Before you delete anything, save the advisor's settings file. In MT4 the settings are stored with the chart or with the advisor's own file, and the exact location depends on how the advisor was installed. Copy the file to a folder that is labelled with the advisor name, its version and the removal date.

Save the trade history for the advisor's magic number, either by exporting the account history or by copying the relevant rows from the terminal. Save the Experts log for the period the advisor was running. These records are the evidence for any later review, and they are much harder to reconstruct after the advisor has been deleted.

Keep the advisor's file itself, not only its settings. The file holds the logic that produced the trades. If you ever need to test the same behaviour again, or to explain a result, the file is the only reliable way to do so. Store it with its version number, so that the copy is not confused with a later update.

## When is it safe to delete the file?

Delete the file only after the open positions, the pending orders, the settings, the history and the logs have all been dealt with. The file is the last item, not the first. A deletion that happens before the records are saved removes the one thing that could explain what happened, and it cannot be undone without a backup.

If you are not certain that the records are complete, keep the file a little longer. Storage costs very little, and a file that you later wish you had kept is a loss that cannot be recovered. A simple rule is to keep the file for at least as long as the trade history you would need to review.

## How do you record the removal in the journal?

Write a removal entry in the trade journal with the same care as a trade entry. Record the date and time, the advisor name and version, the reason for removal, the open positions and what was done with each one, the pending orders that were cancelled, the files that were saved and where they are stored, and the state of the account afterwards.

The reason for removal matters, because it is the most useful thing to review later. An advisor removed because it was producing errors points to a different lesson from one removed because the test was complete or because the results were poor. Write the reason in one or two honest sentences.

Include the account balance and the open risk after removal. A removal that leaves an account with high open exposure is a risk event, and it should be recorded as one, even if the advisor itself did nothing wrong.

## What mistakes should you avoid?

The most common mistake is removing an advisor with open trades and assuming they will close themselves. They will not, unless the broker's stops are set. Check every position before removal.

The second mistake is deleting the file and then discovering that the settings were not saved. Save the settings before the file is touched, and check that the saved copy opens correctly.

The third mistake is leaving pending orders on the account. A cancelled order cannot fill, and a forgotten one can. Review the pending list after removal, not only before it.

The fourth mistake is restarting the terminal before the account has been checked. The restart is harmless to the trades, but it can hide the state of the account behind a flurry of reconnection messages. Check first, then restart.

## What should you do after the removal?

After the removal, watch the account for the rest of the trading day. Confirm that no order was placed by the removed advisor, that every open position has a stop, and that the Experts log is quiet. If something unexpected appears, act on it at once, and record the event.

Review the removal entry at the end of the week. Check that the saved records are complete and readable, and that the journal entry explains the decision clearly. A removal reviewed in this way is one that can be trusted later.

## How do you handle an advisor that cannot be removed cleanly?

Sometimes an advisor refuses to stop. It may keep sending requests after its chart is closed, or the terminal may show a process that does not respond. In that case, do not force the terminal to close while trades are open without first checking the account. A forced shutdown can leave the terminal in an unclear state, and the next start may reattach the advisor with its old settings.

The safer order is to switch off automated trading, check the account for any new orders, and then close the terminal normally. If the terminal does not close, check the operating system's task list for the process, and end it only after the account has been checked. Record the steps, because an advisor that cannot be removed cleanly is a signal of a fault in its code or its installation, and that fault should be investigated before the advisor is used again.

Reattachment is another risk. An advisor that is removed and then reattached to the same chart may read stale settings or old state variables. If you plan to reuse the advisor later, treat that reattachment as a new start, check every setting, and run the installation checklist again rather than assuming the old configuration still holds.

## How do you handle trades managed by a trailing stop?

A trailing stop is one of the most common features that depends on the advisor staying on the chart. The advisor moves the stop as the price moves in the trade's favour, and when the advisor is removed the stop stays where it was last set. The trade is then protected only up to that level, and it will not follow the market any further.

Before removal, note the current stop level for each trailing position and decide whether it is still appropriate. If the stop is at a sensible level, record it and keep the trade with a manual plan to review it. If the stop is too far from the price, consider moving it to a level that matches your risk plan, and record the change. A trailing stop that was reasonable under the advisor's rules may not be reasonable under your own.

Be aware of the time cost. A trailing trade that needs manual management will take attention, and that attention should be budgeted before you decide to keep it open. If you cannot watch the trade, closing it is often the more disciplined choice.

## How do you handle a partially closed position?

Some advisors close part of a position at a first target and leave the rest to run. If the advisor is removed between those steps, the remaining position may have a stop or target that no longer matches the plan. Check the lot size left open, the stop on that remaining lot and the target that was intended for it.

Write the intended plan for the remaining lot into the journal before removal, so that the manual management follows the original plan. If the plan is unclear, close the remainder, record the reason, and avoid the situation where a position is open without a defined exit.

## What should be checked on the broker side?

Some brokers keep a record of automated trading activity, and some restrict expert advisors on certain account types. After removing an advisor, check with the broker that no further automated action is expected and that the account settings are as you intended. A quick message to support confirming the account state can prevent confusion later, especially if the broker sends notifications about the advisor's old activity.

Check the account's margin level and the free margin after removal. An advisor that was carrying a large position may have left the account near a margin threshold, and the closing or holding of its positions should be reviewed in light of that level. The [leverage guide](/7-powerful-reasons-why-the-best-leverage-for-beginners-in-forex-leads-to-safer-profits/) explains how the margin figures relate to the position size.

## How do you plan a removal before the advisor is stopped?

A planned removal starts several days before the advisor is actually taken off the chart. Decide the date, write a short plan, and list the steps in the order they will be done. The plan should name the open positions, the pending orders, the records to be saved and the person or the rule that will manage any trade left open. A plan written in advance keeps the removal from becoming an improvised emergency.

Use the plan to set a checkpoint before the removal. Confirm that the account is in a state you understand: the balance, the open exposure, the margin level and the list of trades are all recorded at the checkpoint. The checkpoint gives you a reference point, so that anything that changes afterwards can be traced to a specific action.

If the advisor is being removed because it has failed, the plan should also state what the failure was and how it will be checked before any future use. A removal that leaves the failure unexplained is likely to be repeated when the advisor is reinstalled.

## What happens when two advisors share an account?

Many accounts run more than one advisor, and the advisors may share the same symbols. Removing one of them can change the behaviour of the others, especially if they manage positions by the same symbol but different magic numbers, or if one of them closes positions opened by another. Before removing any advisor from a shared account, list the positions by magic number and confirm which advisor owns each one.

If an advisor is removed from a shared account, check that the remaining advisors still have the stops and targets they expect. An advisor that counts open positions to decide whether to trade may behave differently once a position it used to count has disappeared. Record the state of each remaining advisor after the removal, and check it at the next trading session.

The cleanest arrangement is one advisor per magic number and, where possible, one terminal per strategy. That separation makes removal far simpler, and it reduces the chance that one advisor's error affects another's trades.

## How do you archive a removed advisor properly?

An archive is a folder that holds everything needed to understand the advisor later. Create a folder named with the advisor name, its version and the removal date. Inside it, place the advisor file, the settings file, the saved trade history, the Experts log extract, the journal entry for the removal and a short readme that explains what the advisor did and why it was removed.

Store the archive somewhere that survives a change of computer, such as an external drive or a backup service. Check that the archived files open correctly, and check the readme for clarity. An archive that cannot be read in five years is of little use, so the check is worth doing once and noting in the readme.

Do not overwrite an archive when an advisor is later reinstalled. Create a new folder for each version, so the history of the advisor can be followed in order. A comparison between versions is often the most useful review a trader can make, and it depends on the earlier archives being intact. Label each archive with the version number on the outside of its folder as well as inside the readme, so that the history can be read at a glance years later, and so that a reader who has never seen the advisor can find the right folder without opening every file.

## What does a clean removal look like on the day?

On the day of removal, follow the plan in order, without skipping a step because it feels routine. Start with the checkpoint, then switch off automated trading, then review the positions and orders, then cancel or keep each one as decided, then save the records, and only then remove the advisor from the chart. Tick each step on the checklist as it is completed, and note the time, so that the sequence can be reconstructed.

Once the advisor is off the chart, stay with the account for a short while. Watch the trade list and the Experts log for any unexpected activity, and confirm that the position count matches the plan. A removal that looks complete on paper can still surface a surprise, and a few minutes of attention is a small price for catching one.

## Why should removal be reviewed against the original goal?

An advisor is usually installed to test or to run a specific idea, and removal is the point at which that idea either ends or changes. Before closing the file, compare the removal with the goal the advisor was set up for. Did the test finish? Did the idea meet the standard written in the journal at the start? Or was the advisor removed for a reason unrelated to its results, such as a broker change or a computer problem?

That comparison belongs in the removal record. It turns a technical step into a learning step. A trader who removes many advisors without recording the goal and the outcome will find it hard to know which ideas were worth the effort, and the same mistakes tend to repeat.

Write the answer in one or two sentences in the journal: what the advisor was for, what it showed, and what happens next. If the answer is that the idea failed, record it honestly, and resist the urge to reinstall the advisor on a different symbol without a new test. A new symbol is a new sample, and it needs its own plan, its own checkpoint and its own record from the first trade, written down before the first order is placed.

## What does this guide not promise?

This guide does not promise that every advisor can be removed without any residual effect, because some advisors create behaviour that is specific to their own code. The method here describes the general steps, and each advisor may need an extra check.

It does not give advice on whether to close or keep a particular position, because that depends on your plan, your risk limit and your account. The guide sets out the decision and the record, and leaves the choice to you.

## What is the offer in this guide?

The offer is the EA installation checklist, a printable checklist that covers the steps for installing an advisor and confirming it is set up correctly. It is useful in reverse as well, because the same checks that confirm a clean installation also confirm a clean removal: settings saved, trading switch set, open positions reviewed and records kept.

Keep the checklist with your removal records. Work through it at each removal, and note any step you skipped and why.

## How do you start this week?

If you have an advisor you no longer intend to run, start with the list. Open the Trade tab, find every position and pending order with its magic number, and write them down. Decide what to do with each one, and record the decision.

Then save the settings file, the trade history and the Experts log to a dated folder. Once those are saved and checked, cancel the pending orders you do not want, remove the advisor from the chart and check the Experts tab. Only then store the advisor file with its version number.

For more on checking what an advisor did over a period, read the [drawdown analysis guide](/10-best-free-tools-for-analyzing-mt4-robot-drawdowns-powerful-guide-for-safe-forex-trading/) once it is published, and the [error message guide](/mt4-journal-common-ea-error-messages-and-fixes-17-powerful-ways-to-solve-expert-advisor-issues/) for reading messages the advisor produced before it was removed.

For more free tools and checklists, visit the [resource library](/blog/).
