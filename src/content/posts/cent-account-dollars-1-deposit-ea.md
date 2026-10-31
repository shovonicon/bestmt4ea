---
title: "Cent Accounts and $1 Deposits: Can You Really Run an EA?"
slug: "cent-account-dollars-1-deposit-ea"
description: "What a cent account really does to an EA: the same lot, a 100x smaller balance, the 0.01 minimum that breaks risk sizing, and a worked $1 example in full."
publishedAt: "2026-10-31T12:00:00.000Z"
updatedAt: "2026-10-31T12:00:00.000Z"
categories:
  - "Brokers & Trading Platforms Reviews"
  - "Risk & Money Management"
categoryPaths:
  - "/category/ai-powered-trading-tools/brokers-trading-platforms/"
  - "/category/risk-money-management/"
tags: []
seo:
  title: "Cent Accounts and $1 Deposits: Can an EA Run?"
  description: "Running an EA on a cent account with a $1 deposit: why the 0.01 lot minimum breaks risk sizing, worked pip maths, costs as a share of balance, and checks."
quickAnswer: "A cent account shows your balance in cents, so a $1 deposit appears as 100 cents. The lots do not shrink, though. A 0.01 lot EURUSD position still moves about $0.10 per pip, which on a $1 balance is 10 per cent per pip. An EA that sizes by percentage risk will often round up to that minimum and risk far more than intended. Cent accounts can suit small-scale testing, but rarely a risk-controlled EA."
primaryKeyword: "cent account ea"
keyTakeaways:
  - "A cent account changes how the balance is displayed. It does not change the size of a lot, the value of a pip or the risk of a position."
  - "The minimum lot on a cent account is usually 0.01. On a very small balance, that minimum can be many times the risk your EA was designed to take."
  - "Percentage risk sizing breaks down when the calculated lot is below the minimum. The EA either rounds up or refuses to trade, and both change the result."
  - "Spreads, commissions and any fixed server bill are a much larger share of a small balance. Compare them as a percentage of the balance, not in cents."
  - "Use a cent account to test that the EA places, closes and records trades correctly. Do not treat its results as a measure of a live strategy at a useful size."
faqs:
  - question: "What is a cent account?"
    answer: "A cent account is a live account whose balance and profit are displayed in cents rather than dollars. A $1 deposit therefore appears as 100 cents. The lots, the prices and the pip values are the same as on a standard account in the same currency, so the market exposure is unchanged."
  - question: "Can I run an EA with a $1 deposit?"
    answer: "You can place trades, but the risk is very high. At a 0.01 lot minimum on EURUSD, each pip is worth about $0.10, so a 10-pip move is a loss of about $1, which is the whole deposit. Check the broker's current minimum lot and the EA's sizing before you fund anything."
  - question: "Why does my EA trade bigger than my risk setting?"
    answer: "Because the risk-based lot it calculates is below the broker's minimum, and the EA rounds up to the minimum. On a small balance, the minimum can equal or exceed the whole risk budget. Check the calculated lot before each trade, and decide what the EA should do when it falls below the minimum."
  - question: "Are cent accounts a good way to learn?"
    answer: "They can be useful for checking that an EA runs, places and closes trades, and records them correctly. They are less useful for judging a strategy, because the position sizes are too small and the costs are too large a share of the balance for the results to say much about a larger account."
  - question: "Do cent accounts have the same spreads as standard accounts?"
    answer: "Not necessarily, and the broker's terms decide it. Check the spread, commission and swap on the cent account itself, because some brokers apply different conditions to cent and standard accounts. Measure the average spread from your own fills, as with any account."
sources:
  - label: "Our Exness review (account structure and minimum deposit notes)"
    url: "https://bestmt4ea.com/exness-review/"
  - label: "Our RoboForex review (account types and EA terms)"
    url: "https://bestmt4ea.com/roboforex-review/"
  - label: "Our running-costs guide (costs as a share of balance)"
    url: "https://bestmt4ea.com/ea-running-costs-spread-commission-swap/"
download:
  origin: own
  name: "Cent account lot sizing worksheet"
  license: "Free to use and share; provided without warranty"
  fileKey: "posts/cent-account-lot-sizing.txt"
---

Cent accounts sound like the answer to a common problem. A trader has a small amount of money, wants to run an expert advisor, and sees an account that lets them deposit a single dollar and trade. The idea is appealing because it lowers the cost of entry and makes it feel as though the EA can be tested with real money at almost no risk.

The reality is more complicated. A cent account does not make the market smaller, and it does not make a pip cheaper. It changes how the balance is displayed, and that single change interacts with the minimum lot size, the EA's risk logic and the costs of every trade in ways that are easy to miss. This guide explains what a cent account does, works through a $1 example in full, and shows how to check whether an EA's sizing still means what you think it means.

Some links on this page are affiliate links. If you open one and open an account, we may earn a commission at no extra cost to you. The arithmetic below applies to any broker that offers a cent account, and it does not depend on which broker pays a commission.

## What a cent account actually changes

On a standard account, the balance is held in dollars, and a $1,000 deposit shows as $1,000. On a cent account, the same deposit is held in the same currency but displayed in cents. The $1,000 appears as 100,000 cents. A $1 deposit appears as 100 cents.

That is the whole difference in the display. The price of EURUSD is the same, the value of one pip for a given lot is the same, and the margin and the profit are calculated in the same way. The broker is simply reporting your balance and your profit in a smaller unit, so the numbers look larger.

This matters because an EA reads the numbers it is given. If its sizing logic takes the balance from the terminal, it will read 100 for a $1 deposit, not 1. A risk formula written for dollars will then produce lot sizes that are wrong by a factor of one hundred, unless the developer has adjusted for the cent unit. Whether the EA handles this correctly is a question to check, not to assume.

The more important point is that the exposure does not shrink. A 0.01 lot position on a cent account is the same market position as a 0.01 lot position on a standard account with the same currency. It moves by the same amount in price and by the same dollar amount per pip. The difference is that your balance is one hundredth of what it would be on a standard account, so the same movement is a far larger share of what you hold.

## The minimum lot is the problem

Most brokers set a minimum trade size. On a standard or micro account that minimum is often 0.01 lots, and cent accounts commonly use the same minimum. The lot size is measured in the instrument's units, so a 0.01 lot EURUSD position is one thousand units of the base currency.

A minimum lot does not care how large your balance is. It will not be reduced because you have only a dollar. If your EA calculates that the correct risk-based position is 0.0001 lots, it cannot place that trade. It must either round up to 0.01 lots, or refuse to trade. Both outcomes change the result, and the first one is the one that surprises people.

This is the central issue with a small balance, and it is why the cent account is often a worse test environment than it appears. A strategy designed to risk one per cent of a balance will, on a small enough balance, risk many times that amount on every trade, simply because the minimum lot forces a larger position. The EA is not behaving badly. It is doing what the broker's minimum requires, and the sizing logic has no way to prevent it.

For readers who want to compare cent account conditions directly, [Markets4you](affiliate:markets4you) and [Exness](affiliate:exness) publish their account terms, and [RoboForex](affiliate:roboforex) publishes its own. Read the current specification on each site, save a dated copy, and run the checks in the later sections before you open any account. The headline deposit figure is the least useful number on the page.

## The $1 example, worked in full

Consider a $1 deposit on a cent account, displayed as 100 cents. The EA is designed to risk one per cent of the balance per trade, which is one cent. It trades EURUSD with a stop loss of 10 pips.

On a standard account, one pip for a standard lot of EURUSD is worth about $10. A 0.01 lot position is one hundredth of that, so one pip is worth about $0.10. On a cent account, that same pip is worth 10 cents. The broker expresses it in cents because the balance is in cents, but the market exposure is the same.

Now work out the lot the risk formula calls for. The risk is one cent. The stop is 10 pips. One pip for a full lot is 1,000 cents on the cent account, because a full standard lot is worth $10 per pip, which is 1,000 cents. So a 10-pip stop on a full lot risks 10,000 cents. To risk one cent, the lot must be one cent divided by 10,000 cents, which is 0.0001 lots.

That lot is below the 0.01 minimum by a factor of one hundred. The EA cannot place it. If it rounds up to 0.01 lots, the trade risks 0.01 times 10,000 cents, which is 100 cents. That is the entire balance. A single losing trade of 10 pips would remove the whole deposit, and the risk the EA was designed to take, one cent, has become one hundred per cent of the account.

Put another way, on this balance each pip costs 10 per cent of the account. A ten-pip loss is a complete loss. A fifteen-pip loss is more than the account, and the broker may close the position at zero or leave a negative balance depending on its policy. Check that policy in the client agreement before you trade. The position was never sized for this balance, and the minimum made the decision for the EA.

The same logic applies to any stop distance and any currency. The smaller the balance, and the wider the stop, the more the minimum lot dominates the sizing. A wide stop on a tiny account is the worst combination, because the minimum forces a loss well beyond the risk budget before the stop is ever reached.

## Why percentage risk fails on a small balance

Percentage risk sizing is one of the most common ways an EA chooses its position size. The formula takes the balance, multiplies by a chosen percentage, divides by the stop distance in money, and outputs a lot. It works well when the output is comfortably above the minimum and the balance is large enough for the percentage to be meaningful.

It fails in two ways on a small balance. The first is the one above: the output falls below the minimum, and the EA rounds up or refuses to trade. The second is less obvious. Even when the output is above the minimum, the rounding can be coarse. A lot that should be 0.017 may be rounded to 0.02, which changes the risk by about 18 per cent. On a small balance, that rounding error is a larger share of the account, and it accumulates across many trades.

A well-built EA checks the calculated lot against the minimum before placing a trade. If the calculated lot is below the minimum, it should decide explicitly what to do: skip the trade, reduce the stop, or accept a larger risk and record that it did so. The decision should be a deliberate rule, not a side effect of rounding. Ask the developer how the EA behaves in this case, and test it on the cent account to confirm.

## Costs as a share of a small balance

Costs are where the cent account looks most attractive and is most misleading. A spread of 1.2 pips on a 0.01 lot position costs about 12 cents on a cent account, which is 12 per cent of a $1 balance. On a standard account with a $1,000 balance and the same 0.01 lot, the same spread costs 12 cents too, which is 0.012 per cent of the balance.

The cost in dollars has not changed. The share of the balance has changed by a factor of one thousand. That is the figure that matters for whether the strategy can survive its costs, because a system that loses 12 per cent of its balance per trade to the spread alone has no room for any other outcome.

The same reasoning applies to commission. A commission charged per lot is fixed in dollars for a given lot size, so on a tiny balance it can dwarf the trading result. A fixed server bill is worse still. A $12 monthly VPS against a $1 balance is more than twelve times the account each month. Costs that are negligible on a large account are the whole story on a small one.

If you want to test costs on a cent account, measure them as a percentage of the balance, not in cents. Use the method in our [running-costs guide](/ea-running-costs-spread-commission-swap/) and express each line as a share of the starting balance. The percentage tells you whether the strategy can survive its costs, and the cent figure does not.

## What a cent account is good for

Cent accounts are not useless. They can answer a narrow set of questions well, provided you do not expect them to answer the wrong ones.

They are useful for checking that an EA runs. You can confirm that it connects, reads its inputs, places orders, manages stops and targets, closes positions and writes its log. These are mechanical tests, and they do not depend on the size of the balance, although the sizing logic must be checked separately as described above.

They are also useful for checking the broker's behaviour in practice. You can see how the broker fills orders, how it reports the balance in cents, how it handles a rejected order and how its statement records each trade. These observations are worth making before you trust a larger account, and a cent account lets you make them at very low risk.

They are poor for judging a strategy. A strategy's results depend on its trade size relative to its balance, its costs relative to its gross result, and its sample size. A cent account with a 0.01 lot minimum and a $1 balance produces results that say little about the same strategy on a balance where the minimum is a small share of the risk. Do not read a small-balance profit as evidence of an edge, and do not read a small-balance loss as evidence of its absence.

## A second example: $25 and a 20-pip stop

The $1 case is extreme, so it helps to run a second example with a more common deposit. Take $25, which appears as 2,500 cents on a cent account. The EA risks one per cent of the balance, which is 25 cents. It trades EURUSD with a 20-pip stop.

A full standard lot is worth 1,000 cents per pip on the cent account, so a 20-pip stop on a full lot risks 20,000 cents. To risk 25 cents, the lot must be 25 divided by 20,000, which is 0.00125 lots. That is again far below the 0.01 minimum.

If the EA rounds up to 0.01 lots, the trade risks 0.01 times 20,000 cents, which is 200 cents. On a 2,500 cent balance, 200 cents is 8 per cent of the account. The EA was built to risk one per cent, and the minimum has made each stop-out eight times that. Five such losses in a row remove 40 per cent of the balance, and the EA would still believe it is risking one per cent per trade, because its own formula says so.

This example also shows where the problem stops. At a balance of 20,000 cents, which is $200, the same one per cent risk gives a budget of 200 cents. Divided by 20,000 cents for a 20-pip stop on a full lot, that is exactly 0.01 lots. At that balance, the minimum and the risk budget agree. Above it, the EA sizes above the minimum and the rounding error becomes small. Below it, the minimum dominates.

So the useful question is not whether a cent account is good or bad. It is what balance the minimum lot allows your risk rule to work at, given the stop distance you use. Work it out before you fund the account, and do not assume the broker's minimum will fit your strategy.

## Stop distance and balance together

The stop distance matters as much as the balance. A tighter stop needs a smaller lot for the same risk budget, so it pushes the calculated lot further below the minimum on a small balance. A wider stop does the opposite and brings the calculated lot closer to the minimum, but it also raises the loss per trade when the stop is hit.

The two are linked through the minimum. For a given balance and risk percentage, the widest stop that still gives a calculated lot at or above the minimum is the widest stop your account can safely use. Anything wider and the EA must risk more than it intends. Anything tighter and it must risk more than it intends too, because the minimum forces the same lot whatever the stop.

This is the reason to test sizing at the stop distances the EA actually uses, rather than at a single convenient figure. An EA with stops that vary from ten to forty pips will be correctly sized on some trades and badly oversized on others, and a single test run may show only one of those cases.

## How the statement reads in cents

A cent account statement reports balance, equity, margin and profit in cents. Traders who are used to dollars often misread it, and the mistake can be expensive. A profit of 150 on the statement is 1.50 in dollars, and a balance of 2,500 is $25. Check the unit on the statement heading before you compare any figure with your notes.

Some EA logs also report money in the account's own unit, so the same discrepancy can appear in your own records. If your EA writes a balance to a log file, check whether that figure is in cents or dollars, and label the log accordingly. A mixed log, where some entries are in dollars and others in cents, is very hard to reconcile later and can hide a sizing error for weeks.

Reconcile the statement against your own calculation for at least a few trades. Take the entry price, the exit price, the lot and the pip value, work out the profit in the account unit, and compare it with the statement. A match gives you confidence that the broker and the EA agree on the unit. A mismatch tells you to find out why before you trust either record.

## Questions traders ask about cent accounts

A common question is whether a cent account lets you test a strategy at real market prices with almost no risk. The answer is that it lets you test at real market prices, but the risk is not almost zero once the minimum lot is considered. The risk is set by the minimum lot and the stop distance, not by the balance, so a cent account can carry a large risk per trade relative to the balance it holds.

Another question is whether a broker's cent account is the same as its micro or standard account with a different display. In most cases the market exposure is the same, but the conditions may not be. The spread, the commission, the swap and the minimum deposit can differ, and the broker's terms decide which applies. Read the specification for the exact account, not for the family of accounts the broker advertises.

A third question is whether a profitable cent account result proves that the strategy works. It does not. A small balance with a fixed minimum lot produces results that depend on the rounding, the stop distance and the costs as a share of the balance, and a few trades can produce any result. Treat a profitable small-balance run as a reason to test more, on a balance where the sizing works, rather than as evidence of an edge.

A fourth question is how much money is enough to run an EA sensibly. There is no single answer, because it depends on the minimum lot, the stop distance, the risk percentage and the costs. The method in this guide gives the answer for a given set of inputs, and the worksheet at the end of the guide sets out the steps. Work it out for your own strategy rather than copying a figure from someone else.

## What to check before you fund a cent account

Start with the minimum lot. Find the broker's current minimum on the cent account, and confirm it in the account specification, not only in the marketing. Note the figure and the date.

Next, check the EA's sizing. Calculate the lot it would use for a typical stop on your intended balance. If the figure is below the minimum, find out what the EA does. Test it on the cent account, and record the actual position size and the actual risk, not the intended one.

Then check the costs as a share of the balance. Measure the average spread from your fills, add the commission and the server bill, and express the total as a percentage of the balance. If the total is larger than the gross edge you can reasonably expect, the account cannot support the strategy, whatever the balance.

Next, check the broker's negative-balance policy and its stop-out rules. Find out what happens if a position loses more than the balance, and whether the broker closes positions automatically. Save a dated copy of the policy, because it determines the worst case.

Finally, check the terms. Confirm that the EA is permitted on the account type, and that the account is covered by the same regulatory and protection arrangements as the broker's other accounts. Our [broker terms guide](/do-brokers-allow-eas-and-scalping/) explains which clauses to read, and our [regulation check](/broker-regulation-client-funds-check/) explains how to confirm who holds the money.

## Where to find cent accounts in our reviews

Our [Exness review](/exness-review/) covers the account structure and the minimum deposit notes, and our [RoboForex review](/roboforex-review/) covers the account types and the EA terms. Read the account section in each review, then check the current specification on the broker's own site, because account terms change.

If you compare brokers for a cent account, use the same checks for each one: the minimum lot, the spread and commission as a share of the balance, the negative-balance policy and the EA terms. A broker whose cent account is permitted for EAs, whose minimum lot suits your sizing and whose costs are measured and acceptable is a candidate. A broker that only advertises a low deposit is not, on that basis alone.

## Get the worksheet

The worksheet is a plain text form that walks through the lot sizing for a cent account. It takes your balance in cents, your risk per trade, your stop distance and the pip value for the instrument, and it shows the calculated lot, whether it is below the minimum, and the actual risk after rounding up. It also records the cost of each trade as a share of the balance.

Complete one copy for each balance and each stop distance you plan to use. Keep it with your EA settings and the broker's account specification, dated on the day you measured.

## The bottom line

A cent account changes the display of your balance, not the size of a lot or the value of a pip. A $1 deposit on a cent account is still exposed to the same market, and a 0.01 lot minimum on a small balance can turn a one-cent risk budget into the whole account. An EA that sizes by percentage risk will often break its own rules on such a balance, and costs become a much larger share of what you hold.

Use a cent account to check that an EA runs, places and records its trades correctly, and to see how the broker behaves in practice. Do not use it to judge a strategy, and do not treat small-balance results as evidence either way. Trading carries a real risk of losing money, and on a very small balance that loss can happen on a single trade.

Model used: claude-haiku-5-5
