---
wpId: 137527
title: "Stop Loss Take Profit MT4: Free Risk and Position Size Guide"
slug: "%f0%9f%93%8a-stop-loss-take-profit-mt4-forex-indicator-free-download-powerful-smart-risk-control-guide"
description: "Stop loss and take profit only protect you when the lot size behind them is right. Use this free MT4 risk guide to size each EA trade from your own risk."
publishedAt: "2026-02-21T13:58:40.000Z"
updatedAt: "2026-10-22T00:00:00.000Z"
primaryKeyword: "stop loss take profit MT4 indicator"
quickAnswer: "A stop loss limits where a trade closes, but the lot size decides what that loss costs. Work it out in order: pick the money you can lose on one trade, measure the stop in pips, then divide by the pip value per lot. The free EA Risk and Position Size Calculator guide shows this sum with worked examples, pip values and an exposure ladder. It does not place trades or predict results."
keyTakeaways:
  - "Lot size, not the stop alone, decides how much a stopped-out trade costs."
  - "Decide the money you will risk on one trade first, then work out the lots."
  - "Pip value changes by pair, so check it before you size a USD/JPY or cross trade."
  - "A percentage cap does not protect a grid or martingale EA on its own. Set a position limit and an intervention level too."
faqs:
  - question: "Does a stop loss take profit calculator make an EA safe?"
    answer: "No. A calculator only sets the size of one trade. It does not stop an EA from opening too many positions, and it does not protect you from gaps, slippage or a platform outage. Keep your cap in place."
  - question: "Is this guide an indicator or a trading system?"
    answer: "It is a free worksheet in PDF form, built from the guide in the download. It is not an indicator and it does not place, modify or close orders."
  - question: "What risk per trade should a beginner use?"
    answer: "There is no universal number. Many educators suggest 1% or less of the account, but that is a judgement to test on a demo account, not a rule that protects you from loss."
  - question: "Why does the lot size change between EUR/USD and USD/JPY?"
    answer: "The pip value depends on the quote currency and your account currency. When USD is the quote currency, one pip on a standard lot is about $10. For USD/JPY at 150.00 it is about $6.67, so the same money risk needs a different lot size."
  - question: "Can I use this method with a prop firm challenge?"
    answer: "You can use the sizing method, but the challenge rules set their own loss limits. Check the daily and total drawdown rules before you apply any cap from this guide."
sources:
  - label: "MetaTrader 5 Help: Testing Expert Advisors"
    url: "https://www.metatrader5.com/en/terminal/help/algotrading/testing"
  - label: "MetaTrader 4 Platform Help"
    url: "https://www.metatrader4.com/en/trading-platform/help"
installSteps:
  - name: "Download the guide"
    text: "Use the download card on this page to get the EA Risk and Position Size Calculator PDF. Save it somewhere you can open on both your phone and your computer."
  - name: "Read the sizing section"
    text: "Read the two formulas and the EUR/USD example first. Work the example by hand before you use your own numbers."
  - name: "Fill in your numbers"
    text: "Enter your account balance, risk percentage, stop distance in pips and the pip value for your pair. Divide the money at risk by the pip cost of the stop to get the lot size."
  - name: "Set your cap"
    text: "Write down the maximum open positions, the total drawdown you will tolerate and the equity level at which you will step in. Keep the sheet where you will see it."
seo:
  title: "Stop Loss Take Profit MT4 Risk Guide and Calculator 2026"
  description: "Stop loss and take profit only protect you when the lot size behind them is right. Use this free MT4 risk guide to size each EA trade from your own risk."
  canonical: "https://bestmt4ea.com/📊-stop-loss-take-profit-mt4-forex-indicator-free-download-powerful-smart-risk-control-guide/"
  ogImage: "https://bestmt4ea.com/wp-content/uploads/2026/07/post_137527_featured-1.webp"
sourceUrl: "https://bestmt4ea.com/%f0%9f%93%8a-stop-loss-take-profit-mt4-forex-indicator-free-download-powerful-smart-risk-control-guide/"
categories:
  - "Forex Trading Strategies"
  - "Risk & Money Management"
categoryPaths:
  - "/category/forex-trading-strategies/"
  - "/category/risk-money-management-forex-trading-strategies/"
tags: []
download:
  name: "EA Risk and Position Size Calculator"
  origin: "own"
  license: "Free to use, print and share with credit to bestmt4ea.com"
  version: "1.0"
  platform: "MT4/MT5"
  fileKey: "resources/ea-risk-position-size-calculator.pdf"
draft: false
---

Your EA can open a trade in under a second. It picks the lot size, places the stop and take profit, and then moves on without asking you. If you have never checked the numbers behind those settings, you are relying on a default you did not choose. That is the real issue behind most searches for a stop loss take profit MT4 indicator. Traders want a stop that protects them, but a stop only protects you when the lot size behind it is right.

This guide explains how to size an EA trade from the money you are willing to lose. It is built around the free EA Risk and Position Size Calculator guide, which you can get from the download card on this page. You will see the formula, worked examples on two pairs, a pip value reference, a risk-by-balance table and a grid exposure ladder. You will also see what the guide does not do. Read this post before you change a single setting on a live account.

Nothing here is a promise about results. Leveraged trading can lose money quickly, and most retail accounts that trade leveraged products lose money. The aim is narrower and more useful: to make the loss you accept a number you chose in advance, not a surprise you discover on the chart.

## Why does a stop loss alone not protect your account?

A stop loss closes a losing trade at a price you set. It does not decide how much that price costs you in cash. The cash loss depends on three things: the distance from entry to the stop in pips, the size of the position, and the value of one pip for your pair. Change any one of those and the loss changes with it.

Many beginners treat the stop as the safety feature and the lot size as a detail to fill in later. It works the other way round. The lot size decides what a given stop costs. A tight stop on a large position can cost more than a wide stop on a small one.

Consider two traders who both use a 30 pip stop on EUR/USD. The first trades 0.10 lots. The second trades 1.00 lots. Each pip on a standard lot is worth about $10, so a stopped-out trade costs the first trader about $30 and the second about $300. Both had a stop loss. Only one of them had a loss they could absorb without changing how they trade the following week.

Take profit has the same weakness in reverse. A large take profit on an oversized position looks good in a screenshot. It says nothing about whether the trade was sized sensibly in the first place. A target that is hit on a position that is too big can still leave you with a loss you cannot afford to repeat.

The core problem is not the stop itself. It is entering without a number in mind. A stop loss without a chosen loss amount is just a line on the chart.

## What happens when an EA chooses the size for you?

Picture a trader called Daniel. This is a made-up illustration, not a real account, but the pattern matches many stories traders share about expert advisors that went wrong. Daniel runs an EA on a $1,000 account. The EA starts at 0.01 lots, and Daniel never checked how far the EA would keep adding to a losing position.

For months the account looked fine. The EA closed small winners, the equity curve climbed slowly, and Daniel stopped watching the trades every day. Then price moved against the first position and kept moving. Each new level added a bigger lot, because that is how the settings were written. The EA was doing exactly what it was told.

When Daniel finally opened the chart, the floating loss was already large. The number of open lots had grown far beyond anything he had planned to hold, and there was no single stop that would close the whole basket. The account was down more than half. The EA had not malfunctioned. Nobody had decided, in advance, how much Daniel was willing to lose.

That is the uncomfortable part of automation. It does not remove risk. It repeats your settings faster than you can react to them. If those settings were never tied to a number you chose, the EA makes the decision for you, usually at the worst possible moment, and it does so without any sense of how the account is doing.

Many beginners meet this problem only after the first large loss. The better time to meet it is on a demo account, while the money is still imaginary and the decision can be made calmly.

## How do you turn a risk percentage into a lot size?

The fix is to decide the money first and the lots last. The calculator guide uses two lines, and they are the core of the whole method:

Risk per trade (money) = Account balance x Risk %
Lots = Risk per trade / (Stop distance in pips x Pip value per lot)

In plain words, you pick how much you can lose on one trade. You measure the stop in pips. You divide the money by the pip cost of the stop, and the answer is your lot size. Nothing in that sequence starts from the lot size you would like to trade.

Traders who begin with the lots they feel like trading, and then work backwards, usually end up risking more than they meant to. The stop gets moved to fit the lot size, instead of the lot size being fitted to the stop. Reversing that order is most of the discipline.

Here is the first worked example from the guide, using a $10,000 account and a 1% risk limit.

Step one. Multiply the balance by the risk percentage. $10,000 x 1% = $100 of risk per trade.

Step two. Measure the stop. In this example the stop sits 20 pips from entry.

Step three. Find the pip value. On EUR/USD with a USD account, one pip on one standard lot is worth $10.

Step four. Divide. Lots = 100 / (20 x 10) = 0.50 lots.

If the stop is hit, about $100 leaves the account, plus or minus spread and slippage. That is the whole purpose of the calculation. The number you see after entering the trade should match the number you chose before you entered it. If it does not, something in the setup is different from what you planned.

Work the example by hand a few times before you trust a spreadsheet or an EA input box. Doing the arithmetic yourself is what makes the link between stop, lots and loss stick.

## Why does the pip value change between pairs?

This is where many manual calculations go wrong. The pip value is not the same for every pair. It depends on the quote currency, which is the second currency in the pair, and on your account currency.

When USD is the quote currency, as in EUR/USD, GBP/USD, AUD/USD and NZD/USD, one pip on a standard lot is about $10 on a USD account. When USD is the base currency, the pip value moves with the exchange rate. Take USD/JPY at 150.00. One pip is 0.01 yen. Converted back to dollars at that rate, one pip on a standard lot is worth about $6.67.

Here is the USD/JPY version of the sizing sum. Take a $5,000 account with 0.5% risk, which is $25. The stop sits 25 pips from entry. Lots = 25 / (25 x 6.67), which is about 0.15 lots.

If you had used the $10 figure from EUR/USD instead, you would have calculated a different lot size. The error would not show up until the stop was hit, and that is what makes it dangerous. Check the pip value for your pair every time, especially when you switch pairs inside the same EA.

The table below gives approximate pip values for common pairs on a USD account at the rates shown. Rates move, so treat these as a starting point and confirm the live value in your own platform before you size a position.

| Pair | Quote currency | Approx. pip value per standard lot | Note |
| --- | --- | --- | --- |
| EUR/USD | USD | $10.00 | Fixed, because USD is the quote currency |
| GBP/USD | USD | $10.00 | Fixed |
| AUD/USD | USD | $10.00 | Fixed |
| NZD/USD | USD | $10.00 | Fixed |
| USD/JPY | JPY | about $6.67 | At 150.00, rises as the rate falls |
| USD/CHF | CHF | about $11.36 | At 0.88, falls as the rate rises |
| USD/CAD | CAD | about $7.35 | At 1.36 |
| EUR/GBP | GBP | about $12.50 | Depends on GBP/USD as well |

The rule of thumb is this. When USD is the quote currency, the pip value is about $10 per standard lot. When USD is the base currency, it is $10 divided by the rate. When neither currency is USD, you need an extra conversion. Indices, metals, crypto CFDs and exotic crosses have their own contract sizes, so size those with the platform's risk-per-trade field or the broker's contract specification, not with a rule of thumb.

## How much should one trade risk on your balance?

The guide includes a table that shows what a chosen percentage means in cash, at four levels: 0.25%, 0.5%, 1% and 2%. Use it to turn a percentage into a number you can picture.

| Account balance | Risk 0.25% | Risk 0.50% | Risk 1.00% | Risk 2.00% |
| --- | --- | --- | --- | --- |
| $500 | $1.25 | $2.50 | $5 | $10 |
| $1,000 | $2.50 | $5 | $10 | $20 |
| $2,500 | $6.25 | $12.50 | $25 | $50 |
| $5,000 | $12.50 | $25 | $50 | $100 |
| $10,000 | $25 | $50 | $100 | $200 |
| $25,000 | $62.50 | $125 | $250 | $500 |
| $50,000 | $125 | $250 | $500 | $1,000 |

Now ask a harder question. What would a run of losses do to this account? At 2% risk, ten losses in a row take away roughly 18% of the balance, because each loss is taken from a smaller account. At 1%, the same ten losses take away roughly 10%. The percentage you choose decides how much a bad run hurts and how long recovery takes.

Many educators suggest keeping risk to 1% or less per trade, and it is a sensible place to start on a demo account. It is a judgement, not a rule. It does not stop losses, and no percentage turns a weak strategy into a profitable one. What it does is keep any single bad trade or run of trades small enough that you can keep following your plan.

Choosing a percentage is also an emotional decision. If a 2% loss makes you move a stop, close a trade early or switch the EA off, the percentage is too high for you, whatever a table says. Pick the number you can hold through a bad week.

If you want a stop distance that adapts to volatility instead of a fixed pip count, read [how to choose an ATR multiplier for stop loss](/the-best-atr-multiplier-for-stop-loss-a-comprehensive-guide/) before you fill in the pips in the formula. The sizing method works with any stop distance, but the stop still has to make sense for the market you are trading.

## Does a percentage cap protect a grid or martingale EA?

Not on its own. A percentage risk setting assumes each trade stands alone. Grid and averaging EAs do not work that way. Each new level adds to a single losing basket, so the risk you think you are taking on one trade is really a slice of a larger position that keeps growing.

The guide shows this with an exposure ladder. The assumptions are a starting lot of 0.01, a grid step of 30 pips, a lot multiplier of 1.5, and EUR/USD at $10 per pip per standard lot. Levels are added as price moves against the first entry. The figures are unrounded, so your broker will round each lot to 0.01 and real exposure will be close to, but not exactly, the same.

Here are four rows from the ladder, chosen to show the shape of the risk:

| Level | Cumulative lots | Pips adverse | Floating loss | % of a $1,000 account |
| --- | --- | --- | --- | --- |
| 1 | 0.010 | 0 | $0 | 0.0% |
| 5 | 0.132 | 120 | $49.13 | 4.9% |
| 7 | 0.322 | 180 | $151.02 | 15.1% |
| 10 | 1.133 | 270 | $619.96 | 62.0% |

Read the last row again. Ten levels of adverse movement, 270 pips, turn a 0.01 lot start into about 1.13 lots and a 62% loss on a $1,000 account. Nothing about that sequence is unusual. It is a common way grid EAs fail. The equity curve can look smooth for months and then fall away in a short space of time.

So what should a cap look like for an EA like this? Start with three controls that work together. First, a maximum number of open positions, so the EA cannot keep adding levels indefinitely. Second, a risk percentage applied to the whole basket, not to each level as if it stood alone. Third, a total drawdown limit that you decide before the EA runs, and that sits below the level at which you would be tempted to act emotionally.

A limit you will not respect is worse than no limit, because it hides the risk you are actually carrying. If your EA lets you set a maximum drawdown, set it at a level you would keep to even on a bad day, and check that it behaves as expected on demo first. For a deeper look at the EA-side settings, read [risk management settings for grid EAs](/risk-management-settings-for-grid-ea-explained-7-powerful-ways-to-reduce-losses/).

## What should your personal cap look like on paper?

The guide ends with a one-page sheet. It has nine fields: account balance, risk per trade as a percentage, risk per trade in money, typical stop distance in pips, pip value per lot for your pair, calculated lot size, maximum simultaneous positions, maximum total drawdown you will tolerate, and the equity level at which you will intervene.

Fill in the first six from your own numbers before any trade. Fill in the last three once, then keep them where you will see them. That is the important part. A cap you write down while the position is calm is the only version that can help when the position is red and your judgement is at its weakest.

Some traders print the sheet and tape it beside the screen. Others save it as a note on their phone. The format matters less than the habit of reading it before you let an EA trade without you.

If you trade a funded challenge, the firm's own loss rules come first. Check the daily and total drawdown limits before you apply any cap from this guide, because a sizing method that looks reasonable on your own account can break a challenge rule quickly. Our notes on [expert advisors for prop firm challenges](/best-ea-for-prop-firm-challenge-passing/) explain how to think about that trade-off, but the final rules always belong to the firm.

Another control belongs on the same sheet. Decide in advance when the EA should stay quiet. Many traders pause automated systems around scheduled news releases, when spreads can widen and price can jump. The steps are covered in [how to disable an MT4 EA during news events](/how-to-disable-mt4-ea-during-news-events-9-powerful-methods-for-safer-trading/). Your cap works best when the times the EA is allowed to trade are written down too.

## What does this guide cover, and what does it not do?

Clear scope matters here, because a calculator can easily be mistaken for a promise. Here is what the guide covers.

It explains the two formulas for money at risk and lot size. It works two examples, one on EUR/USD and one on USD/JPY, so you can see why pip value changes. It gives approximate pip values for common pairs on a USD account. It shows money at risk for four percentages across seven account sizes. It presents a grid exposure ladder with its assumptions stated. It ends with a one-page cap sheet and a short disclaimer.

Now what it does not do. It does not size trades for you. You do the arithmetic and enter the lot size yourself. It does not connect to MetaTrader, and it does not place, modify or close orders. It does not predict where price will go, and it does not calculate a result for any EA, indicator or strategy. It does not give a win rate, a profit target or a drawdown forecast for any product.

It also does not replace testing. The worked figures are illustrative and use the stated assumptions. They do not add your broker's spread, commission, swap or slippage, and they do not account for gaps when a market opens away from the previous close. Verify every rate and pip value against your own broker's platform before you rely on it.

The guide is educational and is not investment advice. If you are unsure whether a percentage or a drawdown limit suits your circumstances, speak to a licensed professional who can look at your full situation.

Finally, the guide covers forex pairs in detail and indices, metals and crypto CFDs only in outline. Those instruments have different contract sizes and quote structures, so use the platform's own risk-per-trade field or the broker's specification for them.

## How do you test the numbers before you trust them?

Before you use any sizing method on a live account, run it on a demo account for long enough to see a losing streak. A couple of quiet weeks will not show you much. A longer test with a fixed rule set will show you whether your cap holds when the equity line turns down.

Keep a simple log for each trade. Write down the date, the pair, the stop distance in pips, the lot size you calculated, the money you expected to risk, and the money you actually lost or gained. Compare the expected and actual figures. If they differ by more than spread and slippage would explain, the pip value or the lot rounding is wrong somewhere.

Test the EA's own inputs as well. Many EAs have a risk setting that is not a percentage of the balance. Some use a fixed lot, some use a fixed money amount per trade, and some use a multiplier on each new level. Confirm which one your EA uses before you copy any figure from a table into its input box.

When you change the EA, change one thing at a time. If an EA behaves differently after a platform or EA update, check your sizing before you blame the code. The usual checks for that situation are covered in [what to check when an MT4 EA stops working after an update](/mt4-ea-not-working-after-update-fix-best-proven-solutions/).

Keep the demo test running for as long as it takes for the process to feel dull. Dull is a reasonable sign that the process is working.

## Which sizing mistakes show up most often?

Most sizing errors are ordinary. They are not the result of stupidity. They come from small shortcuts that feel harmless until the stop is hit. Knowing the usual ones makes them easier to spot before they cost you.

The first mistake is sizing from the chart instead of from the account. A trader sees a clean setup, picks a lot size that feels right, and only then measures the stop. The stop ends up wherever the lot size allows. If you find yourself adjusting the lots to suit the chart, stop and run the formula from the top.

The second mistake is reusing a lot size across different pairs. A 0.50 lot position on EUR/USD and a 0.50 lot position on USD/JPY do not carry the same cost per pip. Treating them as equal is how a trader ends up risking more on one pair than they meant to, without ever noticing.

The third mistake is forgetting about the stop when the trade is already open. Traders often widen a stop after entry because the price is close and they hope it will turn. That single move changes the money at risk, and it changes it after the decision that was supposed to set it. The cap you wrote down in advance should not be quietly rewritten in the middle of a trade.

The fourth mistake is counting only one trade when several are open. An EA may open a second, third or fourth position on the same idea while the first is still running. Each one carries its own risk, and together they can exceed the number on your cap sheet. Check the total exposure, not just the newest line on the chart.

The fifth mistake is trusting the broker's rounding. Lot sizes are rounded to the smallest allowed step, often 0.01. For a small account this rounding can shift the risk by a noticeable amount. It is a minor effect on one trade and a larger one across a grid. The worked figures in this guide are unrounded for that reason.

The sixth mistake is treating a take profit as a reason to size up. A large target tempts traders to increase the lots so that the reward looks worthwhile. The reward side of the trade should be read after the risk side is fixed. If the planned reward only looks good at a size you could not afford to lose, the trade is not good for your account.

Each of these errors shares one cause. The trader decided the size without writing down the money at risk first. The fix is the same every time: pick the money, measure the stop, divide, and check the total exposure before you press the button.

## Where should you start this week?

Start small and specific. Download the guide from the card on this page. Open it, read the two formulas, and work the EUR/USD example by hand with your own balance and a stop distance you actually use. Then do the same for the pair you trade most often, using a pip value you have confirmed in your own platform.

Next, fill in the cap sheet. Write down the money you will risk per trade, the maximum number of open positions, the total drawdown you will tolerate and the equity level at which you will step in yourself. Keep the sheet where you will read it before you trade.

Then test on a demo account for a meaningful stretch. Watch what the account does during a losing run. If your cap holds and your log matches the numbers, you have a process worth trying on a small live account later. If it does not hold, change the percentage or the position limit before you go any further.

Nothing in this guide tells you which EA to run, which pair to trade or when to enter. It gives you a way to decide, before the trade, how much you are prepared to lose. That decision is the part an EA cannot make for you, and the part most worth getting right. Download the guide, do the sums, and let the numbers, not the excitement of an open chart, set your size.
