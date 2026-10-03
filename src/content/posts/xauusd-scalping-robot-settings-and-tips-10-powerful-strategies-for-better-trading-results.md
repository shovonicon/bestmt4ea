---
wpId: 1729
title: "XAUUSD Scalping Robot Settings for MT4 and MT5"
slug: "xauusd-scalping-robot-settings-and-tips-10-powerful-strategies-for-better-trading-results"
description: "XAUUSD scalping robot settings for MT4 and MT5: stop distance, risk per trade, spread caps and session windows, plus an open-source MT5 bot to test them on."
publishedAt: "2025-12-07T02:40:23.000Z"
updatedAt: "2026-09-28T00:00:00.000Z"
seo:
  title: "XAUUSD Scalping Robot Settings for MT4 and MT5"
  description: "XAUUSD scalping robot settings for MT4 and MT5: stop distance, risk per trade, spread caps and session windows, plus an open-source MT5 bot to test them on."
  canonical: "https://bestmt4ea.com/xauusd-scalping-robot-settings-and-tips-10-powerful-strategies-for-better-trading-results/"
  ogImage: "https://bestmt4ea.com/wp-content/uploads/2026/07/post_1729_featured.webp"
sourceUrl: "https://bestmt4ea.com/xauusd-scalping-robot-settings-and-tips-10-powerful-strategies-for-better-trading-results/"
categories:
  - "Installation & Setup"
categoryPaths:
  - "/category/installation-setup/"
tags: []
draft: false
primaryKeyword: "xauusd scalping robot settings"
quickAnswer: "The settings that matter on a XAUUSD scalping robot are a 2.00 to 3.00 dollar stop distance, 0.25 to 0.5 percent risk per trade, a maximum spread of 20 to 35 points, and trading only the London open through the New York overlap. Treat any preset as a starting point, prove the lot size on a demo account, and keep the stop wider than gold's ordinary noise."
keyTakeaways:
  - "A published preset is a starting point, not an optimum. It was tuned on the author's broker, spread and latency, and none of those are yours."
  - "Position size decides survival on XAUUSD. Work from the stop distance and the risk percentage to the lot size, never from a fixed lot backwards."
  - "Set a maximum spread you genuinely see outside news. Between 20 and 35 points is normal on a raw gold feed, and a cap there will block trades that deserve to be blocked."
  - "Trade the London open into the New York overlap and switch the robot off in the thin evening and Asian hours, where spread is the largest part of the target."
  - "Backtest a year on real ticks, then two weeks on demo with the exact settings, then go live at half risk. Leverage on gold works in both directions and losses happen."
  - "Exposure and volatility filters can be tested for free on an open-source MetaTrader 5 robot whose position-sizing, spread and session rules you can read line by line."
faqs:
  - question: "What are the most important XAUUSD scalping robot settings?"
    answer: "Five inputs decide most of the outcome: stop distance, risk per trade, maximum spread, session window and maximum number of concurrent positions. Entry logic matters less than people expect on gold, because the spread and the stop distance are what convert a signal into a result. Set the stop first as a property of the market, then risk as a property of your account, then let position size follow from those two."
  - question: "What stop distance should a gold scalping robot use?"
    answer: "For M5 scalping on XAUUSD in 2026, a stop of 2.00 to 3.00 dollars of price is the honest working range, which is 200 to 300 points on a two-decimal feed. Below 1.50 dollars the stop sits inside ordinary noise and will be hit by moves that had nothing to do with your signal. Above 5.00 dollars you are no longer scalping, and the required lot size shrinks to the point where the spread dominates every trade."
  - question: "Is 1 percent risk per trade safe on gold?"
    answer: "It is the outer limit, not the target. At 1 percent, five losses in a row is a 5 percent drawdown, and on gold a five-loss run is a normal event rather than a crisis. Start between 0.25 and 0.5 percent per position while you are learning how the robot behaves, cap the total daily loss at 2 percent, and only raise risk after a full month of demo results that match the backtest."
  - question: "What should I set as the maximum spread on XAUUSD?"
    answer: "Pick a number your broker quotes during at least 80 percent of your intended trading hours, which on most raw gold feeds is 20 to 35 points. Avoid the two extremes: setting the cap to zero disables the filter completely, and setting it to a number tighter than the market means the robot never trades. Remember that the cap blocks many New York trades around data releases, which is exactly the protection you want."
  - question: "Which session windows should a XAUUSD scalping robot trade?"
    answer: "The London open and the London to New York overlap, roughly 09:00 to 16:30 London time on a normal day. Gold's spread is tightest and its ranges are widest in that window, so the cost of doing business is lowest relative to the target. The late evening and Asian hours combine a thin book with a spread of 40 to 90 points, which is a large share of a scalping target."
  - question: "Can I trust a set file from a Telegram group or a vendor?"
    answer: "Use it as a starting point and nothing more. A set file is a list of numbers chosen on someone else's broker, account size and latency, and one setting inside it can silently disable another, such as a maximum spread of zero switching off the filter that protects a 2 percent risk input. Open the file, read every line, compare the fixed lot against the position-sizing code of an open-source bot you can inspect, and change what does not fit your account."
  - question: "Do XAUUSD settings work the same on MT4 and MT5?"
    answer: "The risk rules transfer; the exact values do not always. MetaTrader 5 can backtest on real ticks from your broker, which makes it the better platform for choosing a stop distance, while MetaTrader 4 is still fine for execution and has a larger library of legacy gold robots. Whichever platform runs the trade, check the symbol's digits and point size, because a third decimal place changes what a point means."
sources:
  - label: "ESMA - Product intervention measures on CFDs and binary options, including the 20:1 leverage cap on gold and the finding that 74 to 89 percent of retail CFD accounts lose money"
    url: "https://www.esma.europa.eu/press-news/esma-news/esma-agrees-prohibit-binary-options-and-restrict-cfds-protect-retail-investors"
  - label: "MQL5 Reference - Testing Trading Strategies, including tick generation modes and the note that the tester takes spread from historical data rather than modelling it"
    url: "https://www.mql5.com/en/docs/runtime/testing"
  - label: "carlosrod723 - MQL5 Trading Bot, the MIT-licensed MetaTrader 5 expert advisor distributed on this page"
    url: "https://github.com/carlosrod723/MQL5-Trading-Bot"
installSteps:
  - name: "Download the MQL5 Trading Bot repository"
    text: "Open the source link in the download panel above and use the green Code button on GitHub to download the ZIP, which contains the MQL5 expert, its indicators and the risk-management include file."
  - name: "Copy the files into your MetaTrader 5 data folder"
    text: "Put the expert in MQL5/Experts, the indicators in MQL5/Indicators and the include file in MQL5/Include. Use File then Open Data Folder to reach the right path."
  - name: "Compile the source in MetaEditor"
    text: "Press F4 for MetaEditor, open each file and press F7. A clean build writes a compiled expert beside the source, and any error message points at the exact line."
  - name: "Attach it to a XAUUSD demo chart"
    text: "Open a XAUUSD chart on a demo account, drag the expert from the Navigator, allow algorithmic trading and confirm the symbol matches the one in Market Watch."
  - name: "Read the risk inputs and set them for your account"
    text: "Set the risk percentage per trade, the daily drawdown limit and the maximum spread filter, then read how the code turns those into a lot size for XAUUSD."
  - name: "Compare the bot's arithmetic against your robot's preset"
    text: "If your live robot's fixed lot is more than double the size this bot's position-sizing code produces for a 0.5 percent risk, the preset is oversized for your account and must change before the robot trades again."
download:
  origin: "opensource"
  license: "MIT"
  licenseUrl: "https://opensource.org/license/mit"
  author: "carlosrod723"
  sourceUrl: "https://github.com/carlosrod723/MQL5-Trading-Bot"
  version: "latest"
  platform: "MT5"
  externalUrl: "https://github.com/carlosrod723/MQL5-Trading-Bot"
  updatedAt: "2026-09-28"
---

You did not write the numbers your robot is trading on. Somebody you have never met did, on a broker you have never used, with an account size that is probably not yours. Those numbers are now running on your money.

That is the whole problem with XAUUSD scalping robot settings, and it is worth saying plainly, because most pages on this topic sell the robot instead of fixing the inputs. A gold scalper can be a reasonable tool. A gold scalper running someone else's risk settings is a coin flip with a commission attached.

## The problem: your XAUUSD robot is trading a stranger's numbers

A settings file does not argue with you. It just lists values. `RiskPercent=2`, `StopLoss=150`, `MaxSpread=0`, `LotMultiplier=1.7`. Nothing in the panel explains that the third line switches off the filter that made the first line survivable, or that the fourth makes the second meaningless once a trade goes wrong.

You also cannot see, from a settings list, the three things that actually differ between your situation and the developer's:

- **Your broker's spread.** Gold is quoted with a spread that breathes. On a raw account in a calm London hour you might see 15 to 25 points. Ten minutes into a US inflation release, that same quote can be 100 points or wider, briefly, while the price is still moving. A robot targeting 400 points can absorb that. A robot targeting 150 points cannot.
- **Your account size.** A preset written for a $10,000 account produces a lot size that is four or five times too large on a $2,000 account. Nothing warns you. The robot simply risks more per trade than the author intended.
- **Your latency.** Scalping gold means competing for a price that exists for a second or two. A home connection and a broker server on another continent turn a planned entry into whatever price is left.

Add one more ingredient that is specific to gold, and the picture is complete. Gold is not a currency pair with a tight spread. One lot is 100 ounces, so a one-dollar move in the price is 100 dollars on a full lot. It gaps over weekends, it reacts to real yields, the dollar and risk appetite at the same time, and it can travel further in a thirty-second candle than in a whole quiet afternoon. On instruments like that, the settings do more work than the strategy.

Two traders can run the same expert advisor on the same day and get opposite results. The difference will not be the entry rule. It will be the stop distance, the risk percentage, the spread cap and the hours the robot was allowed to trade.

That is what this page fixes. Not which robot to buy, but the inputs that decide whether the robot you already have survives its first bad week, and how to check the arithmetic for yourself instead of trusting a file.

## Agitate: nine days on a preset someone posted

Here is a sequence of events that happened this year, with the name changed and the numbers as they were.

Nadia had 1,500 dollars in a live account she had funded slowly over a year. She picked up a free gold EA from a Telegram group, and the pinned message included a set file. The screenshots in that group were excellent. She loaded the preset on a cheap VPS and let it run.

Three properties of that file went unexamined, because nothing in the chat explained them:

1. **`MaxSpread=0` meant no spread filter at all** in that particular EA. It entered on the signal, at whatever price the broker was quoting at that instant, including during data releases.
2. **`RiskPercent=3.0` with `MaxPositions=4`.** Each signal could open up to four positions, and each was sized at 3 percent of equity from its own stop. Four positions is not diversification when they are the same instrument, in the same direction, opened inside ninety seconds.
3. **The session filter was off.** The robot traded the thin 01:00 to 04:00 window with exactly the same enthusiasm as the New York open.

Day one she was up 74 dollars and delighted. Day two flat. Days three to five bounced between plus 40 and minus 60, which is ordinary noise for a system holding several positions at once.

Day six was a US data morning. Spread on XAUUSD went from 22 points to a peak she never saw, because the robot took the trades anyway. Three positions opened in the same direction within roughly 90 seconds, each with a stop only two dollars wide. Gold turned and moved through all three stops inside four minutes. The slippage past each stop added a few more points, and because the positions were stacked the same price move closed all three at once.

Day seven, two trades in the thin Asian window cost 38 dollars in spread and commission before the market had decided anything. Day eight, another 55 dollars. On day nine she switched it off with 1,120 dollars left.

The bill: 380 dollars of trading loss, about 60 dollars of commission and swap, 11 dollars for the VPS, and nine days of checking her phone at traffic lights.

Nobody in that group was being dishonest. They shared a file that worked on their account. It did not transfer, because a preset is not a strategy. It is a set of decisions about risk and cost, and those decisions belong to the broker, the balance and the clock.

The expensive part came afterwards. Nadia's next conclusion was that gold robots do not work. In fact, three inputs on that panel were wrong for her, and each one takes about two minutes to fix once you know what it should say. The rest of this page is those inputs.

## What actually fixes a gold robot running the wrong settings

Five numbers decide most of the outcome: stop distance, risk per trade, maximum spread, session window and the position cap. Everything else in the panel is secondary, because those five determine whether you are still trading in three months.

The order matters, and it is the opposite of how most presets are built:

1. **Stop distance first**, because it is a property of the market. Gold's noise level sets the minimum, not your preference.
2. **Risk per trade second**, because it is a property of your account. It should not change when you change brokers.
3. **Position size third**, because it is the output of the first two. This is the calculation the free bot on this page implements in its own position-sizing code, and it is the one most presets get wrong.
4. **Maximum spread fourth**, because it protects the edge you just sized. A spread cap is not a filter for bad traders; it is a filter on bad prices.
5. **Session window and position cap last**, because they decide how often the other four get tested. A robot with no session filter pays the worst spread of the day with the best risk settings in the world.

Start with the ranges below, then verify them against your own broker and your own demo log. A published preset, including anything on this page, is a starting point rather than an optimum. The optimum depends on data only you have: your spread history, your balance, the hours you can actually watch the screen.

### How far should a XAUUSD scalping robot place its stop?

Wide enough that ordinary noise does not close the trade, tight enough that the loss is one you can repeat ten times in a row without changing your behaviour. On gold, that window is narrower than most presets assume.

Here is what different stop distances mean on a two-decimal XAUUSD feed, where 100 points equals one dollar of price:

| Stop distance | In points | What usually happens |
|---|---|---|
| 0.80 dollars | 80 | Noise. A quiet London hour can cover this in a single minute. |
| 1.50 dollars | 150 | The common vendor preset. Works on M1 in calm conditions and fails on a normal data day. |
| 2.00 to 3.00 dollars | 200-300 | The honest working range for M5 scalping on gold. Survives ordinary volatility. |
| 4.00 to 5.00 dollars | 400-500 | Wide for scalping, usable on M15 or in a high-volatility regime. |
| 8.00 dollars or more | 800+ | No longer scalping. Position size collapses and the target has to be huge. |

Three rules sit on top of that table:

- **Express the stop in price or in ATR, not in pips.** On gold, "pips" means different things on different feeds. A dollar distance or an ATR multiple stays meaningful when you change brokers.
- **Use ATR if the robot supports it.** A stop of 2.5 times ATR(14) on M5 widens automatically when gold is excited and tightens when it is quiet. A fixed stop needs manual review every few weeks and usually does not get it.
- **Check the broker's minimum stop level.** Some brokers refuse stops closer than a fixed number of points. A 60-point stop on a broker enforcing a 100-point minimum will be rejected, or quietly widened by the terminal.

If the panel offers a fixed 150-point stop and no ATR option, widen it to 250 or 300 points, re-run the backtest and compare the trade count. Most presets were written for a calmer gold market than the one you are trading.

### What risk percentage per trade keeps a gold scalping robot alive?

Between 0.25 and 0.5 percent of equity per position for a first live run, and never more than 1 percent while you are still learning how the robot behaves. Accounts that die on gold are usually not killed by a bad entry rule. They are killed by a 2 percent risk setting meeting a five-loss run while the spread was widening.

The arithmetic that matters more than the percentage:

**lots = (equity x risk percent) / (stop distance in price x 100)**

| Account equity | Risk per trade | Cash at risk | With a 2.50 dollar stop, the lot size is | What you can realistically trade |
|---|---|---|---|---|
| 300 dollars | 0.25% | 0.75 dollars | 0.003 | Nothing. Only a 0.75-point stop fits the 0.01 minimum, and gold does not offer that. |
| 1,000 dollars | 0.5% | 5.00 dollars | 0.02 | 0.02 lots. Workable. |
| 1,000 dollars | 1.0% | 10.00 dollars | 0.04 | 0.04 lots, if the broker accepts micro lots in 0.01 steps. |
| 5,000 dollars | 0.5% | 25.00 dollars | 0.10 | Comfortable. Trade 0.09 and keep the buffer. |
| 25,000 dollars | 0.5% | 125.00 dollars | 0.50 | Spread cost becomes the main enemy, not lot size. |

Read the first row again, because it is the most useful line here. At 300 dollars, a 2.50 dollar stop and the standard 0.01 minimum lot, you would be risking 2.50 dollars, which is 0.83 percent of the account before spread. That account has no room for a gold scalper at any risk setting. Either the balance grows, or the stop moves to a slower timeframe, or the instrument changes. No preset fixes it.

Two more rules belong in this section:

- **Round the lot size down.** If the calculation returns 0.037 lots, the answer is 0.03, not 0.04. Every platform rounds, and you get to choose the direction.
- **Cap the total, not just the trade.** Four positions at 0.5 percent is 2 percent of the account exposed at the same moment. Use the `MaxPositions`, `MaxTotalRisk` or `MaxDailyRisk` input, and set the daily figure low: a 2 percent day is a bad day, and 5 percent is a bad week that turns into a bad month.

### What maximum spread should you set on XAUUSD?

A number you genuinely see during at least 80 percent of your intended trading hours. On most raw gold feeds that is 20 to 35 points. Expect the cap to block trades around data releases, and understand that blocking them is the point.

Spread is the rent your robot pays on every trade, and gold charges a lot of it. Read it as a share of the target rather than as an abstract number:

| Spread at entry | Target | Spread as a share of the target | Verdict |
|---|---|---|---|
| 15 points | 400 points | 3.8% | Fine. The edge survives. |
| 25 points | 400 points | 6.3% | Normal for gold. |
| 25 points | 150 points | 16.7% | Your broker is now the largest single counterparty. |
| 60 points | 150 points | 40% | Stop trading. You are paying for the privilege of gambling. |
| 100 points | 400 points | 25% | Only viable with a wide stop and a high win rate. |

Ten minutes of work gives you your own number:

1. Open a XAUUSD M1 chart with a spread indicator, or watch the spread column in Market Watch.
2. Write the spread down at 09:00, 11:00, 14:30 and 21:00 in your broker's server time, on a quiet day and on a data day.
3. Take the quiet-day value at your intended hour, add 30 percent, and use that as the cap.

If your broker's average gold spread is above 40 points on a raw account, the honest conclusion is that scalping gold there is expensive. Either move the account to raw pricing or let the robot target a wider move on a slower timeframe. Our [best MT4 EA](/best-mt4-ea/) round-up lists the execution conditions worth checking before automating on any broker.

Set a slippage value as well. MetaTrader's default of 3 points is optimistic on gold; if the robot allows it, set slippage to 10 or 20 points and accept that some entries will be missed. A missed entry costs nothing, while a filled entry 15 points away from the planned price is a permanent loss of edge.

### Which session windows should a XAUUSD scalping robot trade?

The London open through the London to New York overlap, and nothing else until you have a reason. Switch the robot off in the last hour of New York and through the Asian session unless the EA was written specifically for thin conditions.

| Window (London time) | Gold liquidity | Typical spread | Suitable for scalping? |
|---|---|---|---|
| 00:00-07:00 | Thin | 30-80 points | No. Ranges are small and the spread eats a large share of them. |
| 07:00-09:00 | Building | 20-35 points | Marginal. Pre-London positioning creates false breakouts. |
| 09:00-12:00 | Deep | 15-30 points | Yes. The best cost-to-range ratio of the day. |
| 13:30-16:30 | Deepest | 15-35 points, spiking on data | Yes, with a spread cap in place. This is the overlap. |
| 16:30-20:00 | Thinning | 25-50 points | Acceptable for trend entries, poor for scalping. |
| 20:00-23:00 | Thin | 40-90 points | No. Small targets cannot survive that cost. |

Two practical details when you enter these into the panel:

- **Convert to server time.** Most MetaTrader servers run on GMT+2 or GMT+3 with daylight saving. A robot set for "08:00 to 12:00" on a GMT+2 server in winter is trading 06:00 to 10:00 London. Do the conversion once, write it in a comment beside the settings, and redo it when the clocks change.
- **Do not confuse a session filter with a news filter.** They do different jobs. If the EA has a news filter, set the block window to 30 minutes either side of high-impact releases, and stay realistic about its limits: it handles scheduled events, not surprise headlines.

Volatility filters work the same way, and most presets are missing half of one. A minimum ATR value is standard. A **maximum** ATR value is what stops the robot taking 150-point stops into a market that is moving 200 points a minute. When gold's M5 ATR triples, the settings that were sensible at 09:00 are no longer describing the same market. For context on which tools are worth loading on a gold chart at all, our guide to the [best MT4 indicators for XAUUSD](/top-10-best-mt4-indicators-for-gold-xauusd-powerful-tools-for-accurate-trading/) covers the short list that earns its screen space.

### Which timeframe and entry settings belong in a gold scalping preset?

M5 is the sane default for a gold scalping robot. M1 works only with a spread cap under 25 points and a broker you can reach with low latency. Anything above M15 is a different strategy with a different risk model, and it deserves a different preset.

| Timeframe | Signals per week (typical) | Average stop | What breaks it first |
|---|---|---|---|
| M1 | 100+ | 1.00-2.00 dollars | Spread, latency and any news spike. |
| M5 | 20-60 | 2.00-3.00 dollars | Loose spread caps and stacked positions. |
| M15 | 10-25 | 3.00-5.00 dollars | Session filters applied too narrowly; late entries. |
| H1 | 5-15 | 6.00-12.00 dollars | Not scalping. Different preset, different expectations. |

If you change timeframe, change the stop with it. Copying an M1 preset onto an H1 chart is one of the most common ways a working robot becomes a losing one, because both the target and the stop were calibrated to the noise of a faster chart.

### Do trailing stops and break-even help a gold scalper or hurt it?

They help in a trend and hurt in a range, which is another way of saying they cannot be optimised without knowing the future. Set them defensively and expect them to cost money on the choppy days that make up most of the calendar.

The reason is mechanical. A break-even trigger that moves the stop to the entry price as soon as the trade is 10 points up will be hit by gold's ordinary retracement inside a move that is still valid. The result is a row of flat trades that would have been winners, and a win rate that falls without the average win rising to compensate.

A more honest configuration:

- **Break-even:** only after the trade is 1.5 times the initial stop in profit, not after a fixed 10 points.
- **Trailing stop:** a distance at least as wide as the initial stop, activated later. A 40-point trail behind a 300-point stop is a noisy exit dressed up as management.
- **Partial close:** if the EA supports it, bank a third at one times risk and let the rest run behind a trail. Gold's winning moves are long when they happen, and this is the only management rule that reliably helps.

Test both variants in the Strategy Tester and compare the trade count, not just the final balance. If break-even removes 40 percent of the trades and improves the equity curve by 5 percent, you have learned something real about the market you are trading.

### A copy-ready settings table for XAUUSD scalping

Use this as a starting point and then prove it on your own account. Every value is a range, because the correct number depends on your broker's spread, your balance and the hours you can monitor.

| Setting | Conservative start | Working range | What breaks when you push it |
|---|---|---|---|
| Risk per trade | 0.25% | 0.25%-0.5% | Above 1%: an ordinary five-loss run becomes a 10% hole. |
| Stop distance | 2.50 dollars | 2.00-3.00 dollars on M5 | Under 1.50: noise stops you out. Over 5.00: position size collapses. |
| Take profit | 4.00 dollars | 3.00-6.00 dollars | Under twice the spread: costs eat the edge. |
| Maximum spread | 25 points | 20-35 points | At zero: no protection. Above 50: the robot barely trades. |
| Maximum positions | 1 | 1-2 | Above 3: correlated exposure, not diversification. |
| Maximum daily loss | 2% | 1.5%-3% | Above 5%: one bad day erases a month of work. |
| Session window | 09:00-16:30 London | London open to New York overlap | Trading all day keeps the worst hours and the worst spreads. |
| News block | 30 minutes either side | 15-45 minutes | No filter: you trade the spike at the widest spread of the day. |
| Minimum ATR (M5, 14) | 60 points | 50-100 points | Set too high: the robot stops trading in usable conditions. |
| Maximum ATR (M5, 14) | 400 points | 300-500 points | No cap: calm-hour stops get hit within seconds. |
| Trailing stop | Off, or one stop behind | 1-2 times the stop distance | Tighter than the stop: manufactured losses. |
| Break-even | 1.5 times the stop in profit | 1-2 times the stop | A fixed 10 points kills valid trades. |
| Magic number | Unique per chart | Unique | Duplicates: two robots manage the same position. |
| Slippage | 15 points | 10-25 points | Zero: MetaTrader either rejects the order or fills at any price. |

Nothing in that table is exciting, and that is the point. These are the numbers that decide whether the account is still funded in six months. The settings that feel clever are the ones that show up in the drawdown.

### How do you test settings without losing money while you learn?

Two stages before real money: a one-year backtest on real ticks, then at least two weeks on a demo account using the exact settings you intend to run live. Then go live at half the risk you plan to use long term, and treat the first month as paid education rather than income.

The MetaTrader 5 documentation is unusually direct about why the first stage matters. It states that during testing the spread is not modelled but taken from historical data, and it warns that the cruder tick-generation modes can manufacture a "Testing Grail" — a smooth equity curve that a live account will not reproduce. If a gold scalper looks superb in the rough modes, the documentation's own advice is to re-run it in the most detailed mode available.

A testing routine that filters out most bad configurations:

1. **Backtest a year on real ticks** on the symbol and period you will actually run. Check the trade count before the profit: under 100 trades is an anecdote, not evidence.
2. **Read the drawdown in cash.** A 12 percent peak-to-trough drawdown on a curve that ends higher is tradeable. A 45 percent drawdown is not, however it ends.
3. **Break the result apart.** If the entire profit comes from two weeks inside the sample, the settings are fitted to an event that will not repeat on schedule.
4. **Run two weeks on demo** and compare trade count, average duration and worst day against the backtest. Wide divergence means the backtest described a different market from the one your broker provides.
5. **Start live at half risk** and journal the three numbers you will need later: worst losing streak in the test, worst day in cash, and the widest spread you saw during your live hour.

Those three numbers are your stopping rule. They only exist if you write them down before the first trade.

## What exactly is in this download?

The download on this page is the **MQL5 Liquidity Sweep Bot**, an open-source expert advisor by carlosrod723, published on GitHub under the MIT licence. It is a MetaTrader 5 robot that trades smart-money setups — fractal liquidity sweeps, order blocks and Fibonacci zones — with the kind of risk and session controls this page has been describing. It is not a preset you can trust blindly, but it is a working example of the settings in the table, in code you can read before you run it.

That makes it a reference for the settings on this page rather than a rival to your own robot. Where your robot only shows you a fixed lot and a preset, this one exposes how risk per trade, daily drawdown and the spread filter are actually implemented — so you can check whether your panel says what you think it says.

| Component | Detail |
|---|---|
| Tool | MQL5 Liquidity Sweep Bot |
| Platform | MetaTrader 5 only, from the MQL5 source in the repository |
| What it does | Trades fractal liquidity sweeps and order blocks on MT5, with the risk and session controls built in |
| Main inputs | Risk percent per trade, daily drawdown limit, maximum spread, session and kill-zone hours, stop and target logic |
| Extra features | Multi-timeframe Fibonacci zones, order-block detection, partial exits, trailing stop, optional LSTM signal filter |
| Licence | MIT, which permits commercial use, modification and redistribution with attribution |
| Author | carlosrod723 |
| Cost | Free |

### What does the Liquidity Sweep Bot show that a preset file cannot?

It turns the settings debate into code you can check in a few minutes. Instead of trusting a preset's claim about risk, you read exactly how this bot converts a risk percentage into a lot size, how it caps the daily loss, how it blocks trades when the spread is too wide and how it restricts trading to the London and New York kill zones.

That closes the loop on every other section of this page:

- If its position-sizing code returns 0.02 lots for a 0.5 percent risk and you were about to trade 0.10, you now know your preset was written for an account ten times your size.
- If its daily drawdown check would have stopped trading after three losses, you now know how it treats the day your preset kept buying into.
- If its spread filter sits at 25 points, you now know what a working maximum-spread cap looks like in practice.
- If its session check only trades the kill zones, you now know how a robot that ignores the thin hours is wired differently from one that does not.

It also shows you what to look for in robots that hide their risk. Plenty of free gold EAs accept only a fixed lot size, with no drawdown or spread logic you can see. Read how this open-source bot wires those controls, then check whether your own robot's panel exposes anything comparable — and if it does not, treat the fixed lot as the warning it is.

### What it does not do

- **It does not ship presets for your broker.** Its defaults were built and backtested on the author's own symbol and account, so treat every number as a starting point.
- **It does not promise an outcome.** No tool can. It exposes its risk logic; the market decides what happens next, and losing capital is a normal possibility on any leveraged instrument.
- **It does not protect you from a bad spread.** Its spread filter only blocks trades you tell it to block; get the maximum-spread value wrong and it will still trade into a widening quote.
- **It does not remove the need for a demo run.** Run it on a demo account for at least two weeks with gold's real spreads before you judge any setting by it.
- **It does not cover every gold broker cleanly.** Its session and spread logic assume the server time and symbol naming in the code; verify those against your own account before you trust its filter times.
- **It is not a finished product to run live unmodified.** It is a reference you read and test, not a robot whose results you should take on faith.

If you would rather start from a commercial robot that already carries tested preset ranges, our own gold pages document the specifications and the settings they ship with — [Zenith Matrix EA](/product/zenith-matrix-ea-ai-gold-scalper-for-mt5/), [Nexora Manus EA](/product/nexora-manus-ea-ai-gold-scalper-for-mt5/) and [Onix Stratos XAUUSD EA](/product/onix-stratos-xauusd-ea-ai-smart-scalper-for-mt5/). The trade-off is symmetrical: you get preset ranges and support, and you give up the ability to read the code and set the numbers yourself. If readable code matters more, [EA31337 Libre](/ea31337-libre-free-download/) and the [geraked MT5 expert advisors](/geraked-mt5-expert-advisors-free-download/) are two more auditable codebases worth testing, and the free [download library](/free-download-forex-ea-indicator/) collects the tools we have licence-checked.

## How do you install the Liquidity Sweep Bot and use it with a gold robot?

Ten minutes, most of it spent finding the data folder. Do this on a demo account first.

1. **Download the repository.** Follow the source link in the download panel above and use the green Code button on GitHub to download the ZIP. It contains the MQL5 expert, its indicators and the risk-management include file.
2. **Copy the files into the terminal's data folder.** Put the expert in `MQL5/Experts`, the indicators in `MQL5/Indicators` and the include in `MQL5/Include`. Use **File → Open Data Folder** to find the path rather than guessing it.
3. **Compile it.** Press F4 for MetaEditor, open each file, press F7. A clean build writes a compiled expert beside the source. If the compiler complains, the message names the line it objects to.
4. **Attach it to a XAUUSD chart on a demo account** and allow algorithmic trading in the settings tab. Confirm that the symbol in Market Watch is spelled exactly like the chart: `XAUUSD`, `XAUUSD.m` and `GOLD` are three different symbols to the terminal.
5. **Read the risk and session inputs:** risk percent per trade, daily drawdown limit, maximum spread and the kill-zone hours. Trace each one in the code so you know what it does when it fires.
6. **Compare the bot's arithmetic against your robot's preset.** If the preset's fixed lot is more than double the size this bot's position sizing produces at 0.5 percent risk, the preset is oversized for your account and needs changing before the robot trades again.
7. **Log the numbers and repeat monthly**, or whenever the balance changes materially. A lot size that was correct at a 1,000 dollar balance is not correct at 400.

The short version of these steps appears in the install panel above, which generates the HowTo data on this page. The long version is worth doing at least once on demo, where a mistake costs nothing.

## Questions traders ask about XAUUSD scalping robot settings

**What are the most important settings on a gold scalping robot?** Stop distance, risk per trade, maximum spread, session window and the position cap. Those five decide the outcome far more than the entry rule does, because on gold they determine your cost per trade and the size of your worst run. Set the stop from the market's noise level, set risk from your account size, let position size follow from the two, and only then look at entries.

**What stop distance should a gold robot use?** For M5 scalping, 2.00 to 3.00 dollars of price, which is 200 to 300 points on a two-decimal feed. Anything under 1.50 dollars sits inside normal noise, and anything over 5.00 dollars means you are trading a slower strategy with a smaller lot size. If the robot supports ATR stops, use 2 to 3 times ATR(14) on the chart's timeframe instead of a fixed number.

**Is 1 percent risk per trade safe on gold?** It is the ceiling for an experienced operator, not a starting point. At 1 percent, five consecutive losses is a 5 percent drawdown, which is an ordinary event on gold rather than a crisis. Begin between 0.25 and 0.5 percent per position, cap the daily loss at 2 percent, and only raise risk after a month in which the demo results matched the backtest.

**What should I set as the maximum spread?** A level your broker quotes during most of your intended trading hours, usually 20 to 35 points on raw gold pricing. Setting it to zero disables the filter. Setting it far tighter than the market means the robot never opens a trade. Expect the cap to block New York entries around data releases, which is exactly what you want it to do.

**Which sessions should a XAUUSD scalping robot trade?** London from 09:00 and the London to New York overlap through 16:30 London time. Gold's spread is tightest and its ranges are widest in that window, so the cost-to-range ratio is at its best. The evening and Asian hours combine a thin book with spreads of 40 to 90 points, which is too much of a small target.

**Can I trust a set file from a Telegram group or a vendor?** As a starting point, yes, and as an optimum, no. A set file is a list of numbers chosen on someone else's broker, balance and connection, and one line can silently cancel another — a maximum spread of zero switches off the protection that made a 2 percent risk input survivable. Open the file, read every line, compare the fixed lot against the position-sizing code of an open-source bot you can inspect, and change whatever does not fit your account.

**Do these settings work the same on MT4 and MT5?** The rules transfer; the values sometimes do not. MetaTrader 5 can backtest on your broker's real ticks, which makes it the better place to choose a stop distance, while MetaTrader 4 remains fine for execution and has more legacy gold robots. On either platform, check the symbol's digits and point size, because a third decimal place changes what a point is worth.

**Do I need a VPS for gold scalping?** For live trading, almost certainly yes, because latency matters when targets are small. For choosing settings, no. Do the demo phase on your own machine first, learn what the robot does at 14:30 on a data day, and only move to a VPS when you have a configuration worth running. The VPS removes a variable; it does not fix a bad preset.

## Your next step, and what to check before a single live dollar

Take the settings table above and put it next to the preset your robot is running now. For each row, ask one question: which of these two numbers would I defend in front of somebody who has seen my account statements? Change the ones you cannot defend, starting with the risk percentage and the maximum spread.

Then download the open-source bot, attach it to a XAUUSD demo chart and read how your chosen risk translates into lots on your balance. If the number looks too small to be interesting, that is not a flaw in the tool. It is the arithmetic of trading gold with a two-dollar stop, and it is better to meet it on a demo account than in a live drawdown.

Keep the robot on demo for two weeks with the new inputs. Watch one data release and see whether your spread cap did its job. Log the worst day in cash while it is still hypothetical. When the demo behaviour matches your backtest on trade count and average duration, move to live with half the risk you eventually intend to use, and accept that a losing month is a normal part of running any system on a leveraged instrument.

If you would rather study glyphs and grid mechanics before you change a single input, [safe grid settings for MT4](/10-powerful-grid-trading-ea-safe-settings-for-mt4-to-reduce-risk-and-boost-profitability/) and the [gold EA low-risk checklist](/the-7-best-mt4-ea-for-gold-trading-with-low-risk-proven-tools-for-consistent-results/) both start from the same premise as this page: the settings decide more than the sales page. When you are ready to test the idea on a chart, start with the open-source bot, then compare what its risk logic tells you with what your robot was about to do.

Trading forex and CFDs on gold carries a high risk of loss and is not suitable for everyone. Leverage magnifies losses as readily as gains, gold can gap over weekends, and past performance — including every backtest and every preset discussed here — does not indicate future results. Test on a demo account first and only ever risk money you can afford to lose.
