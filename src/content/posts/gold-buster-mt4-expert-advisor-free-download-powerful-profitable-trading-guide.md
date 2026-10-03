---
wpId: 127126
title: "Gold Recovery EA: Gold Buster MT4 Margin Math"
slug: "gold-buster-mt4-expert-advisor-free-download-powerful-profitable-trading-guide"
description: "A gold recovery EA examined honestly: how a recovery multiplier compounds lot size, what balance each ladder step demands, and where gold ladders break."
publishedAt: "2026-02-13T21:35:31.000Z"
updatedAt: 2026-09-29
seo:
  title: "Gold Buster MT4 EA: Free XAUUSD Robot Review & Setup 2026"
  description: "Gold Buster MT4 EA and other gold recovery systems, with the maths left in: lot multipliers, floating equity, margin levels and the balance each step needs."
  canonical: "https://bestmt4ea.com/gold-buster-mt4-expert-advisor-free-download-powerful-profitable-trading-guide/"
  ogImage: "https://bestmt4ea.com/wp-content/uploads/2026/07/Best-MT4-EA-—-AI-Powered-Forex-Robots-for-MT4-MT5.webp"
sourceUrl: "https://bestmt4ea.com/gold-buster-mt4-expert-advisor-free-download-powerful-profitable-trading-guide/"
categories:
  - "Gold (XAUUSD) Trading"
  - "Gold EA & Robots"
categoryPaths:
  - "/category/gold-xauusd-trading/"
  - "/category/gold-ea-robots/"
tags: []
draft: false
quickAnswer: "A gold recovery EA multiplies its lot size after every losing step, so the balance curve looks smooth while the real risk hides in floating equity. Each step multiplies the lot and the capital you must hold, so the requirement grows by roughly the multiplier itself. At 1.7 with $1.50 steps, one ordinary $15 move in XAUUSD can stop out a $2,000 account."
keyTakeaways:
  - "A recovery multiplier compounds the lot size geometrically: 0.01 lots at 1.7 becomes 0.24 by step seven and 2.02 by step eleven."
  - "The balance needed to survive step n grows by roughly the multiplier each step, because the newest leg dominates both the loss and the margin."
  - "Balance curves look smooth because losing baskets are never closed; the drawdown lives in equity and margin level, which most verified trackers report separately."
  - "Gold's 100-ounce contract, wide news spreads and Sunday gaps make XAUUSD a harder market for recovery ladders than EURUSD."
  - "Before funding anything, compute the step at which margin level would breach your broker's stop-out, and test on a demo account first."
faqs:
  - question: "Is the Gold Buster MT4 EA the same thing as a recovery EA?"
    answer: "Gold Buster is a name used by several unrelated free builds, and the ones that advertise a very smooth equity curve are almost always recovery or averaging systems. The tell is the settings file: a lot multiplier, a step distance and a maximum number of steps. If you see those three inputs, you are looking at a ladder, whatever the download page calls it."
  - question: "What is the difference between a grid and a recovery system?"
    answer: "A grid opens positions at set price intervals without necessarily increasing the size of each one. A recovery system adds a multiplier, so each new position is bigger than the last. Recovery is therefore a grid with a compounding lot size, which is why its capital requirement grows geometrically while a flat grid's grows roughly in a straight line."
  - question: "How do I calculate the balance I need for a recovery ladder?"
    answer: "Take the floating loss your open basket would show at that step, then add half of the margin the basket would require, assuming a 50 per cent stop-out level. Do that for every step from one to your maximum, and the largest number is your minimum viable balance. If your account is smaller than that figure, the ladder cannot finish."
  - question: "Does a recovery EA need a stop loss?"
    answer: "A stop loss on the individual trades defeats the recovery logic, because the whole idea is to hold losers open until price returns. The honest substitute is an equity stop: a rule that closes everything and stops trading if account equity falls by a set percentage. Without that, the stop-out is your stop loss, and it fires at the worst possible moment."
  - question: "Why does a 1.7 multiplier grow so fast?"
    answer: "Because 1.7 compounds. Ten multipliers of 1.7 raise the lot by 1.7 to the power of nine, which is about 118 times the base size. The first few steps look harmless, and that is exactly why the ladder is easy to start and hard to stop."
  - question: "Can I test a recovery EA on a demo account first?"
    answer: "Yes, and you should. Run it in the MetaTrader 4 or MetaTrader 5 Strategy Tester on XAUUSD, then forward test on a demo account for at least three months that includes a strong trending period. A ladder that survives a quiet ranging market has not been tested yet."
sources:
  - label: "ersingencturk — FreeExpertAdvisor, a BSD-3-Clause MetaTrader 4 expert advisor with full MQL4 source"
    url: "https://github.com/ersingencturk/FreeExpertAdvisor"
  - label: "MQL4 language reference — order and account property functions"
    url: "https://docs.mql4.com/"
  - label: "Investopedia — Martingale (betting system)"
    url: "https://www.investopedia.com/terms/m/martingalesystem.asp"
primaryKeyword: "gold recovery EA"
installSteps:
  - name: "Get the source from GitHub"
    text: "Open the FreeExpertAdvisor repository and download the FreeExpertAdvisor.mq4 source file. Take it from the original author's page rather than a mirror, so you know what you are compiling."
  - name: "Open your MetaTrader data folder"
    text: "In MetaTrader 4, go to File, then Open Data Folder. That is the directory the terminal actually reads, and it is different from the folder the installer used."
  - name: "Copy the file into the Experts folder"
    text: "Place FreeExpertAdvisor.mq4 in MQL4/Experts. An expert advisor is the correct destination for this file, because it places trades on the chart you attach it to."
  - name: "Compile it in MetaEditor"
    text: "Open MetaEditor from the terminal toolbar, select the file and press Compile. You should see zero errors, and an .ex4 file appears next to the source."
  - name: "Attach it to a demo chart"
    text: "Drag the expert onto a demo chart, allow algorithmic trading, and read the two inputs that matter: the dynamic-lots risk percentage and the hard stop in points. Test it on demo before you use those numbers on a live account."
download:
  origin: "opensource"
  license: "BSD-3-Clause"
  licenseUrl: "https://opensource.org/license/bsd-3-clause"
  author: "ersingencturk"
  sourceUrl: "https://github.com/ersingencturk/FreeExpertAdvisor"
  version: "latest"
  platform: "MT4"
  externalUrl: "https://github.com/ersingencturk/FreeExpertAdvisor"
  updatedAt: 2026-09-29
---

A gold recovery EA sells you a straight line. You open the verified trading history, and the balance curve climbs in neat steps: up, up, up, with barely a dip in two years. The download page calls one of them Gold Buster. Others are called Gold Sniper, Gold Reaper or Gold Investor. They all show the same picture, because they all do the same thing — losing trades are never closed as losses, they are held open until price comes back.

So you fund a $2,000 account, set the base lot to 0.01, leave the recovery multiplier at 1.7, and press start. For three weeks it behaves exactly like the curve. Then gold does something gold does several times a month: it moves $15 in a straight line without coming back. Your equity empties, the terminal prints a stop out, and the curve you trusted turns out to have been plotted on a different axis than the one that killed the account.

That is the whole story of recovery systems, and it fits into one sentence: **a recovery system is a bet that the market returns before your margin does.** Every multiplier, every grid step, every "recovery zone" setting and every smooth balance curve is decoration on that single bet.

This page is the arithmetic of that bet on gold. If you came looking for a Gold Buster MT4 free download review that tells you whether to install it, this is that too — but the honest answer is that the settings file matters far less than whether your balance can survive step six. We will compute that number together, and you will see why it is almost always larger than the account the download page suggests.

## What is a recovery system on gold, and what is it really betting on?

A recovery system opens additional positions when the first one moves against it, and each new position is larger than the last by a fixed multiplier. The goal is not to be right about direction; the goal is to hold enough size that a modest bounce back to the average entry price turns the whole basket into a small profit. When that happens, every trade in the basket closes at once, the balance jumps up, and the curve prints another clean step.

The bet is therefore about time and distance, not about prediction. You are saying: gold will come back within X dollars of adverse movement, before my equity falls below my broker's stop-out level. Those are the only two numbers that matter. The entry signal — moving averages, RSI, breakouts, whatever the EA advertises — only decides when the ladder starts. It has almost no influence on whether the ladder finishes.

Recovery appears under several names. Averaging down and dollar-cost averaging describe the same mechanic without a multiplier. A grid opens positions at fixed intervals, usually with equal size. Martingale doubles. A "recovery multiplier" of 1.5 to 1.8 is a softened Martingale, and it is the version most gold EAs ship with, because doubling looks obviously reckless to a buyer. If you want the full-strength version explained, our breakdown of the [martingale recovery approach on MetaTrader 4](/best-martingale-ea-for-mt4-with-a-recovery-system/) covers the doubling case and why it fails faster. Most of the builds we catalogue under [Gold EA & Robots](/category/gold-xauusd-trading/gold-ea-robots/) use a multiplier somewhere in that range.

There is one more thing worth naming before the maths. In a normal trading system, a losing trade is a loss and it is over. In a recovery system, a losing trade is converted into a liability that sits on the account's equity, invisible in the balance figure, until the basket closes or the account dies. The rest of this page is about the size of that liability.

## How does a recovery multiplier compound your lot size?

The lot size at step n is the base lot multiplied by the multiplier raised to the power of n minus one. That is compound growth, and it is exactly the same mechanic as compound interest, pointed in the direction you do not want.

Take a base of 0.01 lots and a multiplier of 1.7. The first trade is 0.01. The second is 0.017, which your broker rounds to 0.02 because most gold accounts step in hundredths. The third is 0.0289, or 0.03. By trade seven the theoretical size is 0.24 lots, and by trade eleven it is 2.02 lots — two hundred times the first trade, from a multiplier that sounds modest.

| Step | Theoretical lot | Broker lot (0.01 step) | Size vs step 1 | Cumulative lots open |
| --- | --- | --- | --- | --- |
| 1 | 0.0100 | 0.01 | 1× | 0.01 |
| 2 | 0.0170 | 0.02 | 2× | 0.03 |
| 3 | 0.0289 | 0.03 | 3× | 0.06 |
| 4 | 0.0491 | 0.05 | 5× | 0.11 |
| 5 | 0.0835 | 0.08 | 8× | 0.19 |
| 6 | 0.1420 | 0.14 | 14× | 0.33 |
| 7 | 0.2414 | 0.24 | 24× | 0.57 |
| 8 | 0.4103 | 0.41 | 41× | 0.98 |
| 9 | 0.6976 | 0.70 | 70× | 1.68 |
| 10 | 1.1859 | 1.19 | 119× | 2.87 |
| 11 | 2.0160 | 2.02 | 202× | 4.89 |

Now change the multiplier and watch the same table bend. With 1.5 and a 0.02 base, ten steps end at 0.77 lots and a total of 2.27 lots. With 2.0 and a 0.01 base, ten steps end at 5.12 lots and a total of 10.23 lots. At a gold price of $2,400, that final basket carries about $2.45 million of notional exposure — on an account that probably started with a few thousand dollars.

| Multiplier (base lot) | Lot at step 5 | Lot at step 10 | Total lots at step 10 | Notional at $2,400 gold |
| --- | --- | --- | --- | --- |
| 1.5 (0.02) | 0.10 | 0.77 | 2.27 | $544,000 |
| 1.7 (0.01) | 0.08 | 1.19 | 2.87 | $688,000 |
| 2.0 (0.01) | 0.16 | 5.12 | 10.23 | $2,455,000 |

The lesson is that the multiplier, not the base lot, decides how big things get. Nobody funds an account planning to trade 5 lots of gold. A 2.0 multiplier gets them there in nine steps, and nine steps is a normal week in a trending market.

## Why does the equity curve look smooth until it does not?

A recovery system does not remove drawdown; it moves it from the balance curve to the equity curve, where fewer people look. Balance only changes when a trade closes. Because every losing basket is held open until it turns profitable, the balance column records a series of small wins and never records the losses that were floating in between.

Equity, on the other hand, includes unrealised profit and loss, so it carries the whole open basket. When you look at the account on the day the ladder is deep, balance might read $2,410 while equity reads $1,180. Same account, same second, two very different numbers. The first one is the number on the marketing screenshot.

There are three specific reasons the smoothness lasts as long as it does.

The first is that drawdowns are unrealised. A $900 floating loss feels like a position, not a loss, so nothing in the trader's routine registers it as a warning — not the balance, not the win rate, not the number of trades.

The second is that the gates that would normally stop you are all set to trigger late. A recovery EA usually has no stop loss per trade, a grid spacing wide enough to absorb ordinary noise, and a maximum-steps setting high enough to be irrelevant most months. Those defaults make the system look disciplined, because it rarely hits a limit. They also mean that when a limit is finally hit, it is hit all at once.

The third is a reporting artefact. Many verified trackers separate balance and equity drawdown, and some default to showing the balance curve, which for a recovery system is nearly monotone. Our [grid trading settings guide](/10-powerful-grid-trading-ea-safe-settings-for-mt4-to-reduce-risk-and-boost-profitability/) shows how the same distortion appears with flat grids, where the drawdown is at least bounded by the position count.

So when the curve breaks, it does not break gradually. It goes from a clean step to a stop out in one event, because the basket that was absorbing everything was also the thing that had to be right.

## How do you compute the balance at which the next step becomes unaffordable?

The step becomes unaffordable when your equity divided by the margin your open basket requires falls to your broker's stop-out level. Margin level equals equity divided by used margin, expressed as a percentage, and most retail brokers close positions when that figure drops to somewhere between 20 and 50 per cent.

That gives a formula you can run by hand in a minute:

**Minimum balance to survive step n ≈ floating loss of the basket at step n + 0.5 × (total lots open × 100 × gold price ÷ leverage)**

The first term is the loss already on the account. The second is half the margin you would need, which is the reserve you must keep if the stop-out sits at 50 per cent. The 100 is the contract size: one standard lot of XAUUSD is 100 troy ounces, so a $1.00 move in gold is $100 per lot.

Two details make this simpler than it looks.

Leverage only affects the margin term, not the loss term. A $300 floating loss is $300 whether your account is 1:100 or 1:500. What leverage changes is how much of your equity is locked as margin while that loss sits there.

The requirement compounds. Because each new leg is larger than every leg before it, the margin and the loss are both dominated by the last two steps. That makes the minimum balance grow by roughly the multiplier at every step, which is why the numbers below accelerate even though the position sizes only grow by a fixed ratio.

The other input you need is your broker's contract specification for XAUUSD: contract size, margin currency, stop-out level and whether gold is on the same leverage tier as forex. Many brokers apply a separate, lower leverage to gold than to currencies, which raises the margin figure and makes the ladder more expensive than a quick calculation suggests.

## What does the full recovery ladder look like with real numbers?

Here is the whole thing worked through: a $2,000 account, base lot 0.01, multiplier 1.7, a $1.50 step between entries, gold starting at $2,400.00, 1:500 leverage on gold and a 50 per cent stop-out. The "equity" column is what you would see at the moment the step opens, with the basket still open.

| Step | Lot | Gold price | Total lots | Floating loss | Equity | Margin needed (1:500) | Margin level |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 0.01 | 2,400.00 | 0.01 | $0 | $2,000 | $4.80 | 41,600% |
| 2 | 0.02 | 2,398.50 | 0.03 | $1.50 | $1,998 | $14 | 13,889% |
| 3 | 0.03 | 2,397.00 | 0.06 | $6 | $1,994 | $29 | 6,933% |
| 4 | 0.05 | 2,395.50 | 0.11 | $15 | $1,985 | $53 | 3,766% |
| 5 | 0.08 | 2,394.00 | 0.19 | $32 | $1,968 | $91 | 2,164% |
| 6 | 0.14 | 2,392.50 | 0.33 | $60 | $1,940 | $158 | 1,228% |
| 7 | 0.24 | 2,391.00 | 0.57 | $110 | $1,890 | $273 | 694% |
| 8 | 0.41 | 2,389.50 | 0.98 | $195 | $1,805 | $468 | 385% |
| 9 | 0.70 | 2,388.00 | 1.68 | $342 | $1,658 | $802 | 207% |
| 10 | 1.19 | 2,386.50 | 2.87 | $594 | $1,406 | $1,370 | 103% |
| 11 | 2.02 | 2,385.00 | 4.89 | $1,025 | $976 | $2,333 | 42% |

Read the last two rows again. Step 10 sits at a margin level of 103 per cent, which means almost the entire account is tied up as margin on open losing positions. Step 11 needs more margin than the account has equity, so the broker never gets to open it — the stop-out fires first and closes the basket at a loss of roughly a thousand dollars.

Now notice how far gold had to move for that: $15.00. Not a crash, not a crisis, not a flash event. A $15 range in XAUUSD happens on an ordinary Tuesday, and gold regularly covers $40 or more around US inflation and rate decisions.

The next table turns the same ladder into a funding requirement using the formula above. This is the number people never compute before installing the EA.

| Step | Minimum balance to survive | Multiple of previous step |
| --- | --- | --- |
| 1 | $2 | — |
| 2 | $9 | 3.63× |
| 3 | $20 | 2.34× |
| 4 | $41 | 2.03× |
| 5 | $77 | 1.86× |
| 6 | $139 | 1.81× |
| 7 | $246 | 1.77× |
| 8 | $429 | 1.75× |
| 9 | $743 | 1.73× |
| 10 | $1,279 | 1.72× |
| 11 | $2,191 | 1.71× |

The multiple column is the finding. Beyond about step five, each additional step costs you the multiplier times more capital — 1.71× at step eleven, converging on 1.7, which is the multiplier you set. A recovery ladder is not a system that needs a bit of extra capital per step. It needs 1.7 times the previous requirement, every single time, forever.

And that is before leverage changes. Run the identical ladder on a 1:100 gold account and step eleven needs $6,856 instead of $2,191. Same multiplier, same base lot, same $15 move. The only difference is how much of your equity the broker holds as margin.

## What makes gold different from EURUSD in a recovery ladder?

Gold's contract size, spread behaviour and gap risk all push a recovery ladder harder than a major currency pair does. One standard lot of XAUUSD is 100 ounces, so a $10 move against you costs $1,000 per lot, while one lot of EURUSD moves about $100 for an equivalent-looking 100-pip move.

Start with contract size. Because gold's notional per lot is large and its price is high, the same 0.01 base lot carries far more value than it does on a currency pair. Traders who are used to sizing 0.01 lots on EURUSD and then switching to XAUUSD without recalculating are effectively trading several times their intended risk.

Then add spread. Gold spreads are quoted in cents, and a normal $0.20 spread per ounce is $20 per lot round trip. Around US data releases, that can widen to $1.00 or more per ounce, which is $100 per lot. On a basket holding five lots, a spread widening alone can turn a break-even exit into a four-figure loss, and it happens at exactly the moment your ladder is at its deepest. Choosing a broker with genuinely tight gold spreads is not a minor optimisation here — if you want to compare account types on that basis, our [broker comparison](/best-forex-brokers/) covers what to look for.

Swap is the third cost. Holding a gold basket overnight attracts financing, and on a large basket that charge is substantial. A recovery system's whole premise is holding positions open, so you are paying the overnight cost on the exact positions you are least able to afford it on.

The fourth is gaps. Gold trades nearly around the clock but not continuously, and the Sunday reopen regularly produces a gap from Friday's close. A gap does not give your ladder a chance to add a step at a better price; it teleports price past the next level, so you fill at a worse price than the settings file assumed. A weekend gap through the middle of a deep basket is how many of these accounts die, with no news event to point at.

Add volatility and you have the last piece. XAUUSD moves in ranges that would be extraordinary in EURUSD, which means the ladders that survive a currency pair's daily noise get tested in a single session on gold. Our review of [low-drawdown gold scalping approaches](/7-best-top-gold-scalping-ea-for-beginners-with-low-drawdown-ultimate-safe-trading-guide/) is a useful contrast: those systems are built to avoid stacking positions precisely because gold makes stacking expensive.

If you are running a hedged version of this idea instead, the same maths applies to the combined exposure — our notes on a [correlation hedge expert advisor](/smart-correlation-hedge-ea-free-download-powerful-7-step-guide-to-smarter-forex-hedging/) explain why a hedge changes the shape of the drawdown but not its size.

## Which settings decide whether the ladder survives?

Four inputs decide survivability, and each one is on the inputs tab of any recovery EA: the multiplier, the step distance, the maximum number of steps and the base lot. Everything else — entry signal, time filter, trailing stop on the basket — is secondary.

The multiplier controls how fast the capital requirement compounds. Moving from 1.5 to 1.7 does not sound like much, but at step ten it is the difference between 0.77 lots and 1.19 lots on a similar base, and between a $544,000 and a $688,000 basket. Moving to 2.0 multiplies the endgame again.

The step distance decides how much adverse movement you can absorb before the ladder deepens. A wider step means fewer steps for a given move, which sounds better, but it also means each step adds a bigger loss when it triggers. A $1.50 step on gold is common, and it is also roughly a fifth of a normal daily range.

The maximum steps setting is the one to read most carefully. If it is set to something like 20, the system cannot reach it, which is why the backtest never shows a blown account. What actually stops it is the margin, not the setting.

The base lot is the lever with the most room to hurt you, because it scales the entire ladder. Halving the base lot halves every single requirement in the tables above. If your balance cannot survive step eleven at 0.01, the correct response is not a bigger account — it is a smaller base lot, or a different system.

Then check your broker's stop-out level and whether gold is on a separate margin tier. A broker that stops out at 20 per cent gives you more room than one at 50 per cent, and a broker that margins gold at 5 per cent rather than 2 per cent asks for much more of your equity. None of that is in the EA's settings file, and all of it decides the outcome.

## How do you model all of this before you risk money?

Use a risk percentage to convert the numbers in your settings file into dollars before you fund anything. That is the download on this page: an open-source MetaTrader 4 expert advisor that sizes each position from a risk percentage of your balance and a hard stop, and whose MQL4 source you can read before you run it.

The tool is FreeExpertAdvisor by ersingencturk, released under the BSD-3-Clause licence, with the source published on GitHub. It does place trades, and its design is the opposite of the ladder on this page: one position at a time, a real stop loss on every trade, and no martingale or averaging layer that grows the size after a loss. Its dynamic-lots input reads your risk percentage, its hard-stop input sets the distance, and the lot size follows from those two. That is the arithmetic a recovery ladder quietly skips.

| Component | Detail |
| --- | --- |
| What it is | MQL4 expert advisor for MetaTrader 4 |
| Author | ersingencturk |
| Licence | BSD-3-Clause, source published in the repository |
| Platform | MetaTrader 4 |
| Cost | Free |
| Output | One position at a time, sized from a risk percentage and a hard stop |
| Places trades | Yes — never more than one position at a time, always with a stop loss |

The workflow that makes it useful as a reference takes ten minutes. Open a demo chart on a low-spread account, attach the expert and allow algorithmic trading. Turn dynamic lots on and enter the risk percentage you would actually take on one trade — 1 per cent is the usual baseline, and it is what most responsible risk frameworks assume. Set the hard stop to the distance you planned, then compare the size it opens with against your recovery EA's base lot. If the base lot is larger than that figure, the ladder starts over-sized and every subsequent step inherits the mistake.

Then rebuild the tables from this page for your own numbers. Work out the floating loss and margin at each step using your broker's contract specification, find the step where your equity would breach the stop-out, and write that step number down. That number is your real limit, and it is usually much smaller than the maximum steps setting suggests.

Finally, run it. Put the EA in the Strategy Tester on XAUUSD, then forward test on demo for at least three months covering a strong trend. A recovery system that has only been tested through a ranging market has not been tested at all. If you want a starting point for comparison, our [free EA and indicator library](/free-download-forex-ea-indicator/) has builds you can test on demo, and the [shop](/shop/) lists tools we have looked at in more detail.

## What does the download not do?

FreeExpertAdvisor does not know your EA's ladder, and it will not calculate your recovery risk for you. It sizes one position at one risk level from one stop distance, and it holds only that one position. Everything about steps, baskets and floating equity is your job, using the tables above as the template.

It also does not raise the risk you have already accepted, does not build a recovery ladder, and does not arrive with an audited live track record. Read the source and you will find the opposite of the design this page warns about: a fixed stop on every trade and no multiplier adding size after a loss. A robot cannot make a bad plan safe, but it can refuse to make the bet larger than the number you set.

And it does not remove the possibility of loss. No tool does. Trading gold with leverage can lose you the entire balance of the account it is funded with, and a recovery system can lose it faster than a directional strategy, because a month of unremarkable profits can be given back in a single trend. Test on a demo account first, risk only money you can afford to lose, and treat any published track record as history rather than a forecast.

## What is the honest verdict on gold recovery systems?

Most gold recovery systems are not scams; they are honest implementations of a strategy that has a known, and rather abrupt, failure mode. The failure mode is a sustained trend in the wrong direction with insufficient balance to absorb it, and gold produces those conditions regularly.

That does not make recovery useless. A recovery overlay on a system with a genuine directional edge, sized small enough to survive the worst plausible run, is a defensible design. What is not defensible is the version sold on download pages: a low base lot, a 1.7 multiplier, twenty steps, no equity stop, and a marketing curve that only ever shows the balance column. The $2,000 account in the table above is the least aggressive configuration in that family, and it does not survive a $15 move.

Two things separate the survivable version from the fatal one. The first is an equity stop — a hard rule that closes everything and halts trading when equity falls by a set percentage, whether or not the basket has recovered. The second is knowing your limit as a number before you start, which is what the funding table gives you.

If you cannot state, right now, the price level at which your gold basket would breach your broker's stop-out, you do not yet know what you are running.

That is the whole point of this page, and it is also the reason the download is a single-position expert advisor with a real stop rather than a ladder that answers every loss with a bigger trade.

## Download the file, then size your own limit

Do the arithmetic before you fund anything. Download the open-source expert advisor, attach it to a demo chart on a low-spread account, and watch how it sizes one position from a risk percentage and a fixed stop — then take the ladder apart step by step with the numbers above until you find the step your balance cannot pay for.

If that step arrives before the move your account has to survive, the system is not for that account. Reduce the base lot, or walk away, or pick a design that does not stake the whole balance on the market coming back.

The download is free, BSD-3-Clause licensed, published by its original author, and you can read the source before you compile it. It will not make anyone money on its own. What its inputs do is tie every position to a risk percentage chosen in advance, and that is the habit a recovery ladder skips.

Start on a demo account. Keep the risk per trade near 1 per cent. And remember the sentence this page opened with: a recovery system is a bet that the market returns before your margin does.
