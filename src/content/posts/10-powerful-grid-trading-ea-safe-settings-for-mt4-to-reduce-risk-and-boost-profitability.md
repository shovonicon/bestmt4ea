---
title: "Grid Trading EA Safe Settings for MT4: Cap the Drawdown"
slug: "10-powerful-grid-trading-ea-safe-settings-for-mt4-to-reduce-risk-and-boost-profitability"
description: "Grid trading EA safe settings for MT4, explained honestly: control exposure, stress-test the drawdown and know the stop-out number before you go live."
publishedAt: 2025-12-07T02:25:17.000Z
updatedAt: 2026-10-07T00:00:00.000Z
categories:
  - "EA Settings & Optimization"
  - "MT4/MT5 Expert Advisors"
tags: []
quickAnswer: "Grid trading EA safe settings for MT4 are the controls that decide how much of your account one bad run can take: a wide grid step, a small base lot, no doubling after a loss, a hard cap on levels, a real stop, and a drawdown limit that closes everything. They reduce exposure. They do not remove risk, and the free stress-test worksheet proves the numbers before you trade."
keyTakeaways:
  - "A grid EA does not need a bad setting to fail; it needs a market that moves one way for long enough, which is why you add the settings up before you attach it."
  - "Grid step, base lot, lot multiplier and maximum levels are one decision, not four. Change any one and the exposure at the last level changes."
  - "Leverage is the hidden variable: higher leverage lets the grid open more levels, so it can grow a loss larger before the broker stops it, not smaller."
  - "Test three scenarios in writing before you go live: a sustained one-way trend, a news spike, and a weekend gap."
  - "The free Grid EA Settings Audit & Stress Test worksheet turns the settings, the margin maths and the decision into numbers you can sign."
faqs:
  - question: "What are the safest grid settings for an MT4 EA?"
    answer: "There is no single safe preset, because the settings depend on your balance, your leverage and the broker's stop-out level. The honest starting point is a wider grid step, a small base lot, a lot multiplier that does not double after a loss, a firm cap on maximum levels, a real stop loss or drawdown limit, and a time filter that keeps the EA out of thin and news-driven markets. Then you check, on paper, that the worst-case exposure fits your account."
  - question: "Can a grid trading EA blow my account?"
    answer: "Yes. Grid and averaging systems can carry many open positions at once, so a sustained trend can grow floating loss faster than the market returns to close the basket. High leverage makes this worse rather than safer, because it lets the EA open more levels before the broker's stop-out level is reached. That is why the exposure maths matters more than any single input."
  - question: "Does a grid EA need martingale to work?"
    answer: "No. A grid places orders at set price steps; martingale is a separate choice to increase lot size after a loss. You can run a grid with fixed lot sizes at every level, which caps the growth of exposure, or with a mild multiplier such as a small increase instead of doubling. A grid without aggressive scaling is not automatically profitable, but its worst case is easier to calculate and survive."
  - question: "Which currency pairs suit a grid EA best?"
    answer: "Pairs that spend more time ranging and carry tighter typical spreads tend to suit grid logic better than pairs that trend hard or spike on news. Traders often look at EUR/USD, AUD/NZD or AUD/CAD, while treating GBP pairs and exotic crosses with far more caution because of wider spreads and sharper moves. Whichever pair you choose, check its behaviour around your broker's rollover and major news times."
  - question: "What leverage should I use with a grid EA?"
    answer: "Lower leverage is the more protective setting for most grid systems, because it caps how many levels the account can actually fund before margin runs out. Higher leverage widens the room to keep adding positions, which can turn a recoverable floating loss into an account-level event. Check your broker's contract specification and stop-out level, then work out the exposure at the last level your EA could reach."
  - question: "How do I test a grid EA before using real money?"
    answer: "Run a demo account that mirrors the live setup, keep one configuration for a fixed period, and log exposure, spread and floating drawdown daily rather than only the balance. Backtest the same file in the MetaTrader Strategy Tester over a range that includes trending periods, and compare the demo fills with the backtest assumptions. Do not switch to live capital until the behaviour matches what you documented."
  - question: "Is a basket take profit a sign that a grid EA is safe?"
    answer: "No. A basket take profit means the whole group of open trades closes together once the combined position is slightly positive, so the EA only needs a small retracement to end the cycle. That is what makes the equity curve look calm: many small wins, and the entire risk parked in the basket that has not recovered yet. Judge the design by the drawdown, not by how often it banks a small profit."
  - question: "Where does the free stress-test worksheet fit in?"
    answer: "It is the working record for the method on this page. You audit each setting, run the three stress scenarios, calculate margin and stop-out at your broker's specification, and complete a decision record with a proceed or do-not-proceed verdict. It does not analyse a specific EA and it predicts no result; it turns your own numbers into a written cap you cannot revise while a losing position is open."
sources:
  - label: "MQL5 Documentation"
    url: "https://www.mql5.com/en/docs"
  - label: "MetaTrader 5 Help — Strategy Tester and Automated Trading"
    url: "https://www.metatrader5.com/en/terminal/help"
  - label: "Investopedia — Margin and Stop-Out"
    url: "https://www.investopedia.com"
primaryKeyword: "grid trading ea safe settings for mt4"
download:
  origin: "own"
  license: "Free to use, print and share with credit to bestmt4ea.com"
  version: "1.0"
  fileKey: "resources/grid-ea-drawdown-stress-test.pdf"
---

## Why do grid EA safe settings keep working right up until they stop?

You open MetaTrader on a Sunday, attach a grid expert advisor to EUR/USD, and set the inputs a download page called conservative. A small base lot. A thirty-pip step. A gentle multiplier. A basket take profit of a few dollars. Monday and Tuesday, the account ticks upward in tiny steps, and the equity curve looks like a staircase climbing a hill. You start to relax. You think about increasing the lot size next month.

Then a central-bank week arrives. Price runs one direction for three sessions, and it does not come back the way the range did. The EA keeps adding positions at every step, and each added level is bigger than the one before it. Floating loss grows faster than the small wins ever did. By Thursday you are not watching profit any more; you are watching margin level, hoping a retracement arrives before the broker decides for you. The retracement comes too late, or it does not come at all, and the account you spent months building is closed out at the worst possible price.

That trader did not lose because of one careless input. They lost because nobody added the inputs up under stress before real money did it for them. Every number on that settings screen was reasonable on its own. The combination, in a one-way market, was not.

This is the trap of grid trading. It is popular for real reasons. It does not need you to predict direction, it trades ranging markets while others sit on their hands, and it produces a lot of small wins that feel like progress. But those wins are not the whole picture, and the part of the picture that matters most — how much you are exposed to when the grid is fully loaded — is invisible until the market stretches the grid open.

This guide changes the order of events. Instead of learning about drawdown after it happens, you calculate it first. You will see how a grid builds exposure level by level, which settings actually decide survival, how leverage quietly controls the ending, and how to stress three scenarios in writing before you risk anything. You will also see how to size a grid so that one bad run is survivable, which pairs and sessions deserve more caution, and a red-flag list for evaluating any grid EA you download. Then you turn all of it into one page you sign.

The direct answer is plain. Grid trading EA safe settings for MT4 are the controls that keep exposure inside a limit, not magic numbers that make a grid safe. There is no safe preset, because safety depends on your balance, your leverage and your broker's stop-out level. What you can do is bound the damage: a wider grid step, a smaller base lot, a multiplier that does not double after a loss, a hard cap on levels, a real stop or drawdown limit, and a time filter that keeps the EA out of thin and news-driven markets. Then you prove, on paper, that the worst case fits your account. Nothing here predicts a result, and no setting removes the risk. Losses are possible on any trade, and leveraged trading of this kind can move quickly against you.

The free download with this guide is a printable worksheet built for exactly that proof. It is not an EA and it is not a backtest. It is a settings audit and stress test you fill in by hand, so that the decision is made once, calmly, instead of in the middle of a losing position.

## What are grid trading EA safe settings, in one sentence?

Safe settings are the group of inputs that together cap how much of your account the grid can expose when it goes wrong. They are not a preset you copy from a forum, because the right numbers depend on your balance, your leverage, your broker's stop-out level and the pair you trade. The same step and lot that are cautious on a five-thousand-dollar account can be reckless on a two-hundred-dollar one.

A grid expert advisor opens buy or sell positions at fixed intervals, called grid levels, above and below an initial entry. It does not try to be right about direction. It tries to survive long enough for price to wander back through its levels and let the basket close profitably. That design means the EA usually holds several positions at once, and possibly many if the market keeps moving against the first order.

Once you accept that, "safe settings" stops meaning "settings that make money" and starts meaning "settings that keep the worst case knowable and survivable." You are choosing, in advance, the largest basket you are willing to hold, the largest floating loss you are willing to see, and the point at which you switch everything off. Every input either helps enforce those limits or quietly widens them.

Three ideas run through this whole page, so define them once:

- **Exposure** is the total size of all open positions, not just the first one. On a grid it grows with every level.
- **Floating loss** is the loss on open trades that have not closed yet. It is the number that actually decides whether the account survives.
- **Drawdown** is the drop from your account's peak equity to its lowest point. On a grid, the deepest drawdown usually comes from a basket that stayed open for hours or days.

Everything below is a way of keeping those three numbers inside lines you chose. Automation does not remove risk, and past behaviour does not promise future behaviour. What automation does give you is a chance to define the limit before the market tests it.

## How does a grid trading EA actually build exposure level by level?

It builds exposure in a chain, and each link is bigger than the last when a multiplier is in play. The first order uses the base lot. If price moves one grid step against that order, the EA opens a second position, often larger. Another step, another position. The chain continues until price turns, until the basket closes at a small profit, or until margin forces the issue.

That chain is why four settings, not one, decide your worst case. The grid step controls how far price must move before a new level opens. The base lot sets the size of the first trade. The lot multiplier sets how fast each added level grows. The maximum level count sets where the chain has to stop. Change any one of them and the exposure at the last level changes, often by more than you expect.

A worked example makes this concrete. Suppose the base lot is 0.01 and the multiplier is 1.5. Level one is 0.01 lots, level two is 0.015, level three is about 0.0225, and so on. By the tenth level the running total across all positions is roughly 1.13 lots — more than a hundred times the first order. A multiplier of 2.0 reaches the same kind of total even sooner. Nothing about that growth is visible on the inputs screen; it only appears when you add the levels up.

This is the part most traders never do. They read a single number, like "step 30 pips," and decide it feels calm. They do not multiply it out. The worksheet with this guide makes you do the multiplication by hand, level by level, so the total size of the basket at its last permitted level stops being a surprise.

Two common additions change the chain further. Martingale increases lot size after a losing cycle to recover the previous loss, which pushes the growth rate up. Averaging adds to a losing position to improve the average entry, which lengthens the chain at the same price. Neither is automatically wrong, and neither is a promise of recovery. If a download page leans on either one without explaining the maximum exposure, treat that silence as a finding, not a detail. If you want a closer look at how recovery logic behaves, the notes on a [martingale EA with a recovery system](/best-martingale-ea-for-mt4-with-a-recovery-system/) are a useful companion.

The single most useful habit here is simple: write the cumulative lots at every level your EA is allowed to open. That one column tells you more about your risk than any screenshot of a rising equity curve.

## Which settings decide whether a grid EA survives a trend?

Six controls do most of the work: grid step, base lot, lot multiplier, maximum levels, stop loss or drawdown limit, and the time and news filters. Read them together, because a generous value in one can hide a dangerous one in another. The table below describes what each control really does and the direction that reduces exposure.

| Setting | What it controls | The safer direction, and why |
|---|---|---|
| Grid step (pips) | How far price must move before exposure grows | Wider steps mean fewer levels and more room, so a small move does not start a chain |
| Base lot | Exposure at the very first level | Smaller base lots shrink every later level, because each one is a multiple of the first |
| Lot multiplier | How fast each added level grows | A flat 1.0 or a mild multiplier keeps the chain's growth slow and calculable |
| Max levels / max trades | The point the EA must stop adding | A firm, small cap prevents an open-ended chain; an unlimited grid has no defined worst case |
| Stop loss / drawdown limit | Whether a loss can be bounded at all | Many grids disable the stop, so a working drawdown circuit breaker is essential |
| Time and news filters | Whether it trades into thin or spiking markets | Filters keep the EA out of the moments that stretch grids fastest |

Start with the maximum level count, because it defines the shape of everything else. If the EA can open twenty levels, your worst case is twenty levels deep and you must fund that possibility. If it can open six, you only have to survive six. An EA with no cap is not a setting you tune; it is a decision to accept an unknown worst case, which is the opposite of a safe setting.

Next, make the stop real. A genuine stop loss sits on each position and is honoured by the platform, so the loss is bounded and visible in the history. Many grid systems skip it deliberately, relying on the basket eventually turning positive. That choice is the whole risk. If there is no stop, write that fact down in plain words and then decide whether a drawdown limit can stand in for it. A drawdown limit that closes all positions at a chosen equity level is the closest thing to a circuit breaker, and it only counts if you have seen it trigger on demo.

Then look at the filters. A time filter keeps the EA away from thin hours and rollover. A news filter keeps it out of scheduled releases. Both reduce the chance that the grid opens levels into a gap or a spike where the next price is far from the last. You can read the reasoning behind that control in the guide to [disabling an EA around news automatically](/10-powerful-ways-to-use-news-time-trading-disable-ea-automatically-for-safer-forex-trading/).

Finally, remember that these controls only work if you test them. A stop, a drawdown limit and a news filter are all things that should be observed firing during a demo period. An untested control is a hope. Before any live decision, confirm on demo that each limit you rely on actually triggers and closes the basket cleanly.

## Why does leverage decide the ending of a grid, not the strategy?

Leverage sets how much margin each added level consumes, and margin decides how much equity is left when the last permitted level opens. That means leverage does not just scale your profit and loss; it controls how far the chain can run before the broker's stop-out level is reached. This is the part that catches people out, because higher leverage feels like more room to recover.

The mechanics are worth working through slowly. Margin required per lot is the contract size multiplied by price, divided by leverage. Margin level is equity divided by used margin, expressed as a percentage. When margin level falls to the broker's stop-out threshold — commonly around 50%, though it varies — the broker begins closing positions. A grid that keeps opening levels eats into equity from two sides at once: each new position uses more margin, and the floating loss on the existing ones grows.

The result is counter-intuitive. On a one-thousand-dollar account, a grid that reaches roughly 1.13 cumulative lots faces a very different ending at 1:500 leverage than at 1:100. At 1:500 the margin per lot is small, so the account can fund the tenth level — and then a single adverse move can remove most of the balance. At 1:100 the same tenth level cannot be opened at all, because there is not enough margin, which caps the damage much earlier. Higher leverage did not protect the account; it removed the natural brake.

That single insight changes how you read a download page. An EA that advertises a need for high leverage is telling you something about how many levels it wants to open. It is asking for more room to grow a loss. Lower leverage, where your broker allows the choice, is the more protective setting for a grid, because it stops the chain sooner.

So the leverage check belongs in your setup, not in the fine print. Record your account leverage, the contract size from the broker's specification, the maximum cumulative lots your EA could reach, the margin that size would use, your broker's stop-out percentage, and the equity level at which that stop-out would trigger. That sequence turns an abstract risk into one number: the floating loss that would end the account. The worksheet walks through it with a worked comparison so you can repeat the arithmetic with your own figures. This is not a prediction of what will happen; it is the size of the event you are choosing to accept, and it comes from your broker's real contract specification, which will differ from the illustration.

## How do you stress-test a grid before it trades real money?

You stress-test it against the three conditions that break grids in practice, and you write the numbers down before you switch it on. The goal is not to guess which one arrives. The goal is to know, in advance, what your exposure would be and what you would do. Three scenarios cover most of the damage: a sustained one-way trend, a news spike, and a weekend gap.

A sustained one-way trend is the classic grid killer. Price moves hundreds of pips in one direction over two or three sessions, often around a rate decision or a strong data run, and the EA keeps adding levels into the move. Your exposure at the worst point is not the first order; it is the whole basket, at its deepest, against you. Write that number down, then decide your action now, while your judgement is calm: close manually at a set equity level, let the drawdown limit fire, or stop the EA and hold.

A news spike is faster and nastier. A release can move price sixty pips in seconds, widen the spread several times over, and fill orders far from where the chart printed. A grid that opens levels into that moment can be filled worse than its own settings assumed, and its basket take profit may be further away than the spike is deep. The action here is usually to be flat or switched off through the release, and to confirm your news filter actually works.

A weekend gap is the one you cannot trade out of, because there is no price between Friday's close and Sunday's open. If the grid carries open positions over the weekend, the market can open beyond a level the EA planned to use. There is no next tick to manage. The action is to decide how much open exposure, if any, you are comfortable carrying across the close.

The point of running all three in writing is that it forces the decision out of the moment. When the market is moving against you, you are not at your most objective, and the version of your judgement that matters is the one you recorded beforehand. Fill in the exposure at the worst point for each scenario, the percentage of the account it represents, and the action you will take. If any scenario has no number, you have found the gap before the market did.

Backtesting belongs alongside this, but it does not replace it. The MetaTrader Strategy Tester can show how a set of inputs behaved on historical data, and a careful practitioner will use it to reject fragile designs rather than to approve a system. If you want the method for that, the [step-by-step backtesting tutorial](/forex-tester-online-backtesting-with-eas-tutorial-the-ultimate-step-by-step-guide/) covers the settings and the honesty checks. Even a clean test, though, is only a model of the past, and it cannot tell you how your specific broker will fill your specific basket in a real spike.

## Why is a small basket take profit a warning sign, not a selling point?

Because a basket take profit is what makes the curve look calm while the real risk sits in the basket that has not closed. The EA needs only a small retracement to close all its open trades at a modest combined profit, so it banks frequent small wins. What it does not show on the headline is the position that has not recovered yet, still open, still growing, waiting for a move that may not come.

Think about the asymmetry. Each completed cycle earns a few dollars, and each cycle is closed quickly. That produces a high proportion of winning cycles, which looks reassuring. But a single basket that runs many levels deep can carry a floating loss that is many times larger than dozens of those small wins combined. The strategy is not really many small trades; it is one large open risk with a lot of noise around it.

This is why judging a grid by its win rate or by how often it takes profit is a mistake. Ask instead what happens to the basket when price does not return: how deep can it go, how big is the floating loss at that depth, and what ends it. Those questions point at the drawdown, which is the number that decides whether the account survives. A system that closes nine cycles for a few dollars and then meets one deep basket has not been made safe by the nine wins; it has been made fragile by the tenth position.

There is nothing wrong with a basket take profit as a mechanism. It is how many grids work. The problem is treating it as evidence of safety. It is a design choice that shapes the distribution of outcomes, and it moves risk from the frequency of losses to the size of the worst one. Your stress test and your leverage check are the tools that measure that worst one.

## How do you size a grid so one bad run cannot end the account?

You size it from the account's loss limit backwards, not from a lot-size rule you read somewhere. First decide the largest floating loss you are willing to accept, then work out the maximum cumulative lots the EA could hold, and only then choose a base lot that keeps the worst case inside that limit. Most traders do this in the wrong order, picking a lot size first and discovering the limit later.

Start with the constraint. If you trade a funded challenge or an account with daily and total loss rules, those rules decide how much heat you can take before the account is closed. Your basket at its deepest must stay well inside them, with room for spread widening and slippage. If you do not know the exact loss rules of the account you plan to use, stop and read them before choosing any number. An EA cannot respect a limit you never calculated.

Then translate the strategy into exposure. A grid that can hold ten levels does not risk double a grid that holds five; it risks several times more, because each level is larger than the last. Work out the total lots at the deepest permitted level, convert that to a loss at a realistic adverse move, and compare it with your limit. If the basket would breach the limit in the trend scenario you wrote down, the base lot is too large or the maximum level count is too high — or both.

| Decision | What to fix first | Why it matters |
|---|---|---|
| Largest floating loss you accept | Set the number before anything else | Every other setting is chosen to keep inside this line |
| Maximum cumulative lots | Cap the levels, then size the base lot | The deepest basket, not the first order, is the real exposure |
| Base lot | Choose last, from the exposure limit | A smaller base shrinks the whole chain proportionally |
| Base lot per balance | Use a conservative ratio you can defend | A figure like 0.01 lots per larger balance unit keeps the basket fundable |
| Drawdown limit | Confirm it triggers on demo | A limit you have not seen fire is not yet a control |

A practical rule many traders start from is a small base lot relative to balance — for example, around 0.01 lots for every thousand dollars, adjusted for the pair and leverage — but the right ratio is the one your own stress test produces, not a number copied from a page. The formula that matters is the one you can write down and defend: this balance, these settings, this maximum exposure, this is the loss I accept, and this is the equity level at which I close everything.

Test each control on demo before you trust it. Watch the drawdown limit fire, watch the news filter skip a release, watch the EA stop adding levels at its cap. The purpose of sizing is not to make the grid profitable; it is to make the worst case something you can survive and explain. Do that, and a normal losing sequence becomes an inconvenience rather than an ending.

## Which pairs and sessions reduce the risk of a grid EA?

Ranging pairs with tighter spreads in calmer sessions tend to be gentler on grid logic, while hard-trending pairs and news-heavy sessions stretch it the most. That does not make any pair safe, and it does not predict behaviour, but it does change how often the grid is tested. Because grid systems profit from price wandering back, conditions that wander suit them better than conditions that run.

Look for pairs that spend more time in ranges than in long trends, and that carry a tighter typical spread, since every level you open pays the spread again. EUR/USD is often discussed for grid use because of its liquidity and relatively tight spread, and some traders also consider quieter crosses such as AUD/NZD or AUD/CAD. GBP pairs and exotic crosses deserve far more caution: wider spreads and sharper moves mean each added level costs more and the grid can be stretched faster.

Sessions matter as much as the pair. Liquidity, spread and direction change through the Asian, London and New York periods, and a grid that looks calm in quiet hours may meet a completely different market when London or New York is active. Ask which hours the EA is allowed to trade, and check whether it is barred from the thin hours and the rollover window where spreads widen. A time filter is one of the cheapest protections you can add, and it costs you only the trades you would have taken in the worst moments.

News is the other session-level risk. Scheduled releases such as NFP, CPI and central-bank decisions can move price and spread far more than a grid's steps assume. A news filter, or a schedule that disables the EA around known events, keeps the grid from opening levels into a spike. Confirm both filters on demo rather than assuming they work from the settings list.

The honest conclusion is that no pair or session makes grid trading gentle. What careful pair and session selection does is reduce how often the grid meets the conditions that break it, which buys you time and lowers the frequency of the hardest tests. It does not remove the risk, and it does not turn a badly sized grid into a safe one.

## How do you tell safe settings from marketing on a grid EA download?

You check the exposure maths, not the curve. A download page can show a smooth line and still describe a system whose worst case is unknown, because a smooth historical curve is exactly what a deep-but-not-yet-triggered grid looks like. Read the offer for what it tells you about maximum levels, lot growth, stops and limits. Where those are missing, the page has answered your question.

Use a short checklist before you install anything. Does the page state the maximum number of positions the EA can hold, and how the lot grows at each level? Does it explain where the drawdown limit sits, or whether there is one at all? Does it say which hours and news events it avoids? Does it present a trade list with the deepest exposure, or only a headline profit figure? A serious maker can answer these without giving away the code, because they are about risk, not secrets.

Verify what you can yourself. Install on demo, set one configuration, and compare its behaviour with the claims: does it respect the level cap, does the drawdown limit fire when the account reaches the level you set, does the news filter actually keep it out of releases? Keep the settings file and the daily statements, because they are your record when marketing tries to rewrite history. If you want to track how a robot behaves over time, the free tools in this [EA performance monitoring guide](/top-10-free-tools-for-mt4-ea-performance-monitoring-powerful-ways-to-track-improve-results/) help you keep the equity, drawdown and trade list in view.

Two red flags should end the conversation. The first is a page that talks about recovery and wins but never about the deepest basket, because that is the risk you are buying. The second is pressure to fund an account before you have seen a demo, a trade list or a settings file. Sound evaluation takes time, and anyone who rushes you past the testing stage benefits from your haste.

For a wider view of how to judge automated systems on evidence rather than claims, the method in the [EUR/USD expert advisor vetting guide](/eur-usd-expert-advisor-ea-overview-free-download-guide/) applies directly to grid EAs: understand the logic, demand the risk numbers, test the behaviour, and only then decide. You can also compare how accounts are presented in public at the [top-ranking hub](/top-ranking/), and study the loss-control mindset in the [drawdown reduction guide](/drawdown-reduction-ea-free-download-7-powerful-benefits-every-trader-must-know/). Tools support judgement; none of them removes the risk.

## What is in the Grid EA Settings Audit & Stress Test worksheet?

The worksheet is one printable document that turns the method on this page into numbers you fill in and sign. It has four parts, and each part exists because leaving it out is how grids surprise their owners. It is a downloadable resource, not software and not an EA, and it analyses no specific product.

The first part is a settings audit. It lists the inputs that matter — base lot, grid step, lot multiplier, maximum levels, basket take profit, stop loss, drawdown limit, trading hours and news filter — and asks you to record what each one controls, the value you have chosen, and the cap you will not let it exceed. Filling the value column from the EA's own inputs rather than its documentation is deliberate: you want the numbers the robot will actually run, not the ones a page describes.

The second part is three stress scenarios. For a sustained one-way trend, a news spike and a weekend gap, you write down your exposure at the worst point, the percentage of the account it represents, and the action you have already decided to take. This is the part that moves the decision out of the moment, because a losing basket is a bad time to think clearly.

| Part | What you do | What it produces |
|---|---|---|
| 1 — Settings audit | Record each setting, its value and your cap | A table of every input that can widen exposure |
| 2 — Stress scenarios | Run trend, news and weekend-gap cases | The worst-point exposure and your response for each |
| 3 — Margin and stop-out | Work out margin per lot, stop-out equity and the loss that triggers it | The single number that decides the ending |
| 4 — Decision record | Answer six questions and pick a verdict | A signed proceed or do-not-proceed record |

The third part is the margin and stop-out arithmetic. It shows the formulas for margin per lot and margin level, includes a worked comparison of how the same grid ends under different leverage, and then gives you blank fields for your own balance, leverage, contract size, maximum cumulative lots, stop-out level and the loss that would trigger it. It uses the stated assumptions, and your broker's contract specification will differ; that is exactly why you complete it with your own figures.

The fourth part is a decision record. Six questions — the worst-case loss you accept, the equity level at which you close everything, the maximum levels you permit, the conditions in which you switch it off, how and how often you will check it, and the demo period you completed — and then a single verdict: proceed, or do not proceed. There is a place to sign and date it.

**What the worksheet does not do.** It does not provide or analyse a specific EA, and it will not tell you that any system is safe. It does not predict returns, does not contain performance figures, and does not replace your broker's contract specification or your own demo testing. It does not make a grid safe — it makes your exposure, your margin numbers and your decision visible on paper, so that the limit is something you chose rather than something the market chose for you. It is educational, it is not investment advice, and it assumes you have already decided that leveraged trading risk is something you can afford to take.

It is free to use, print and share with credit to bestmt4ea.com, and it carries version 1.0. Print it, and treat a new EA build as a new candidate that needs its own completed sheet.

## What should you do before you switch your grid EA on?

Fill in the worksheet first, and let the numbers make the decision. Open the EA's inputs, write the values it will actually use, cap the maximum levels, and multiply the levels out until you can see the total lots at the deepest permitted point. Then run the three stress scenarios, complete the margin and stop-out arithmetic with your broker's real contract specification, and answer the six decision questions. If any scenario has no number, or the worst-case loss is money you cannot afford to lose, the verdict is already written: do not proceed.

If every scenario has a number and a cap you will respect, move to a demo that mirrors your intended live setup, keep one configuration, and log exposure and floating drawdown daily rather than only the balance line. Watch the drawdown limit fire and the news filter work before you trust them. Only when the behaviour matches what you documented does live capital enter the picture, and even then it enters small, under the same controls.

This is the honest trade-off of grid trading. Done with wide steps, a small base lot, a firm level cap and a real limit, a grid can be a defined risk you choose to take. Run with doubling lots, unlimited levels and no stop, it is an open-ended bet dressed up as automation. The difference is not on the settings screen by default; it is in the arithmetic you do before you click. That arithmetic is what the free worksheet is for, and it costs nothing but the time it takes to fill in honestly.

Download the worksheet, print it, and use it on every grid EA you consider — including the next version of one you already run. Then, if you want context while you evaluate, compare cost structures through a [broker shortlist](/best-forex-brokers/), read how managed accounts present risk and return on the [copy trading page](/copy-trading/), and keep the [shop](/shop/) for later, once your own numbers say a system has earned a longer test. Tools support judgement. They do not replace it.

> Trading foreign exchange on margin carries a high level of risk and may not be suitable for every reader. Grid, martingale and averaging systems can hold many positions at once, leverage magnifies both favourable and adverse moves, automation can malfunction or disconnect, and historical simulation does not predict future performance. Losses are possible on any trade, and a normal losing sequence can end an account that was sized incorrectly. Test every system on demo, cap your maximum exposure before you trade, and never commit funds you cannot afford to lose.
