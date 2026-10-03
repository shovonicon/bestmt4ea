---
wpId: 1933
title: "Best MT4 Indicators for Gold XAUUSD: Pick Three, Not Ten"
slug: "top-10-best-mt4-indicators-for-gold-xauusd-powerful-tools-for-accurate-trading"
description: "Which MT4 indicators work on gold, in what order, and with what settings. An honest ranking, plus a free Apache-2.0 MT4/MT5 price alert and demo-first tests."
publishedAt: "2025-12-07T08:45:20.000Z"
updatedAt: "2026-09-28"
seo:
  title: "Best MT4 Indicators for Gold XAUUSD: Pick Three, Not Ten"
  description: "Which MT4 indicators work on gold, in what order, and with what settings. An honest ranking, plus a free Apache-2.0 MT4/MT5 price alert and demo-first tests."
  canonical: "https://bestmt4ea.com/top-10-best-mt4-indicators-for-gold-xauusd-powerful-tools-for-accurate-trading/"
  ogImage: "https://bestmt4ea.com/wp-content/uploads/2026/07/post_1933_featured.webp"
sourceUrl: "https://bestmt4ea.com/top-10-best-mt4-indicators-for-gold-xauusd-powerful-tools-for-accurate-trading/"
categories:
  - "Installation & Setup"
categoryPaths:
  - "/category/installation-setup/"
tags:
  - "MT4 indicators"
  - "XAUUSD"
  - "gold trading"
  - "risk management"
  - "position sizing"
draft: false
primaryKeyword: "best MT4 indicators for gold XAUUSD"
quickAnswer: "There is no single best MT4 indicator for gold. Three do the job: ATR (14) for volatility and stop distance, a 50/200 EMA pair for trend direction, and RSI (14) for timing pullbacks. XAUUSD moves far more than any currency pair, so position size decides whether you survive, not indicator count. Add another tool only when it answers a question the first three cannot."
keyTakeaways:
  - "Gold rewards a chain of command, not a crowd. Three indicators with separate jobs beat ten that all try to call direction."
  - "ATR (14) is the only tool in the standard MT4 set that tells you how much room a gold trade needs. That number sets your stop and your lot size."
  - "A 50/200 EMA pair answers which way. RSI (14) answers whether this is a good price right now. No single oscillator answers both."
  - "Every standard MT4 indicator describes what price already did. None of them predicts the next candle, and none of them sizes a position for you."
  - "The free download on this page is the EarnForex Price Alert, an Apache-2.0 MT4/MT5 indicator that fires the moment gold reaches a level your written plan already chose."
  - "Test any new indicator on a demo account for at least 100 trades before it touches real capital. A backtest with high modelling quality is still only a description of the past."
faqs:
  - question: "What is the single best MT4 indicator for gold XAUUSD?"
    answer: "If you can only keep one, keep ATR (14). It measures how far gold is actually travelling, which is what your stop distance and your lot size are built from. It will never tell you which way to trade, and that is the point: direction is the cheapest part of the decision and the easiest to get wrong twice."
  - question: "How many indicators should I put on a gold chart?"
    answer: "Three, plus an alert tool. One for trend, one for volatility, one for timing. Every additional overlay multiplies the number of ways your chart can disagree with itself, and you are the one who has to resolve those disagreements in real time. Fewer tools with defined jobs produce faster, more consistent decisions."
  - question: "Which indicator is best for setting a stop loss on gold?"
    answer: "ATR (14) on the timeframe you actually trade. A stop of roughly 1.5 to 2.5 times ATR is a common starting point because it scales with conditions instead of with your mood. Then convert that distance into lot size rather than guessing the lot first and hoping the stop fits."
  - question: "Do these gold indicators work on MetaTrader 5?"
    answer: "The concepts carry over, and the download on this page does too — EarnForex Price Alert ships source for both MetaTrader 4 and MetaTrader 5, so you can compile it on whichever terminal you use. The standard set is different: MT5 ships its own equivalents of ATR, moving averages, RSI and Bollinger Bands in its navigator, so you rebuild the three-tool stack there with those files rather than with MQL4 ones."
  - question: "Why do my gold indicators show different signals on different brokers?"
    answer: "Because the underlying price feed is different. Gold has no single centralised exchange, so each broker streams its own blend of liquidity, and feeds diverge around news by more than your stop. The indicator is not broken; it is reading a different chart. Always judge a gold setup on the feed you will actually execute on."
  - question: "Do the standard MT4 indicators repaint?"
    answer: "They do not rewrite history. A 14-period ATR or a 50 EMA changes only on the bar that is still forming, then freezes when that bar closes. That is different from an arrow indicator that deletes a signal it already printed. When a vendor claims a tool is non-repainting, the real question is whether old signals ever move, not whether the latest one ticks."
  - question: "Is a paid gold-specific indicator better than the standard MT4 set?"
    answer: "Sometimes, but never because it is gold-specific. The standard set is free, documented by MetaQuotes, and open to inspection. A paid tool has to justify its price with something you can verify: published logic, a stated licence, and signals you can reproduce. Coloured arrows on a screenshot are marketing, not evidence."
sources:
  - label: "MetaQuotes — MQL4 Reference: iATR (Average True Range)"
    url: "https://docs.mql4.com/indicators/iatr"
  - label: "CME Group — Gold Futures contract specifications and price drivers"
    url: "https://www.cmegroup.com/markets/metals/precious/gold.contractSpecs.html"
  - label: "LBMA — LBMA Precious Metal Prices (the London gold benchmark)"
    url: "https://www.lbma.org.uk/prices-and-data/lbma-precious-metal-prices"
  - label: "Apache Software Foundation — Apache License 2.0"
    url: "https://www.apache.org/licenses/LICENSE-2.0"
installSteps:
  - name: "Read the licence first"
    text: "Open the repository and read the LICENSE file. It is the Apache-2.0 licence, copyright EarnForex, which permits use, modification and sharing provided the notices stay with the code. Like most trading tools, it carries no warranty and no promise of profit."
  - name: "Download the source file"
    text: "From the repository, open the source file and download it. You are getting readable MQL4 and MQL5 code, not a compiled .ex4 or .ex5, so you can check how the alerts are wired before you compile anything."
  - name: "Open your MetaTrader data folder"
    text: "In your terminal choose File, then Open Data Folder. That is the directory the platform actually reads. Your normal Documents folder is not it, and a file placed in the wrong folder simply never appears in the Navigator."
  - name: "Copy the file into the Indicators folder"
    text: "Inside the data folder, open MQL4/Indicators for MetaTrader 4 or MQL5/Indicators for MetaTrader 5, and place the source file there."
  - name: "Compile it in MetaEditor"
    text: "Right-click the file in the Navigator and choose Modify, or open it in MetaEditor and press Compile. Fixing compile errors yourself is the advantage of source: you know exactly what binary ends up on your terminal."
  - name: "Attach it to XAUUSD and set your levels"
    text: "Drag the indicator onto a gold chart and add the price levels your written plan defines, then confirm each level sits where you intended before you rely on the alert. Check your broker's digits and contract size first."
download:
  origin: "opensource"
  license: "Apache-2.0"
  licenseUrl: "https://www.apache.org/licenses/LICENSE-2.0"
  author: "EarnForex"
  sourceUrl: "https://github.com/EarnForex/PriceAlert"
  version: "latest"
  platform: "MT4/MT5"
  externalUrl: "https://github.com/EarnForex/PriceAlert"
  updatedAt: "2026-09-28"
---

## Why more indicators on your gold chart made things worse

**XAUUSD** is one troy ounce of gold priced in US dollars. On most MetaTrader 4 feeds it is quoted to two decimal places, one standard lot is 100 ounces, and a one-dollar move in the gold price is worth roughly $100 on a full lot. Check your own broker's contract specification, because digits and contract size vary — but that is the shape of the instrument sitting on your chart.

Now count the indicators on that chart.

Five or six, usually. A couple of moving averages. RSI in a lower window. MACD next to it. Bollinger Bands laid over the candles. Plus something you installed last month that draws coloured zones and arrows, because its sales page implied the other five would no longer be necessary.

Here is what all of that actually does. It gives you four opinions, and one of them is always wrong. When you are flat, the trend filter says long while the stochastic says overbought, so you wait for a better price that never arrives. When you are in a trade, the MACD histogram turns against you while the moving averages still agree with you, so you hold through a retracement that eventually takes your stop. When you close and walk away, Bollinger Bands squeeze and gold breaks out without you, and the arrow indicator's screenshot claims it called the whole move.

That is not bad luck. That is a chart with no chain of command. Every tool on it has an opinion, none of them has a job, and you are the one asked to arbitrate between them while money is moving. Arbitration in real time is the single worst thing to ask of a person under pressure.

The other half of the problem is quieter, and it does more damage.

Indicators tell you direction. They do not tell you how far gold can travel against you before it agrees with you. On EURUSD the gap between "my stop is tight" and "the noise is wide" is small enough to ignore for months. On XAUUSD that gap is the entire game. Gold's daily range in dollar terms is several times that of a major currency pair, and the range is not evenly distributed — it clusters around a handful of scheduled events. The LBMA Gold Price is auctioned twice daily in London, at 10:30 and 15:00 London time, and CME Group lists US CPI, Nonfarm Payrolls, FOMC rate decisions and moves in the dollar index as the recurring reports that drive gold prices. Those are the moments your five indicators will all fire at once, in opposite directions, with the spread at its widest.

So the real problem is not that you picked the wrong indicators. It is that you built a chart where nothing has a job, and you never solved the one variable that gold actually punishes. That variable is not direction. It is size.

This page fixes both. You will get a specific three-tool stack with settings that suit gold, an honest verdict on the other seven indicators people install, and a free, open-source MT4/MT5 alert tool that handles the part no signal indicator will handle for you — waiting at the level your plan defines, so you act on the number instead of on the feeling. If you would rather browse the wider library first, the [free MT4 and MT5 downloads](/free-download-forex-ea-indicator/) hub is the place to start.

## What one CPI morning on gold actually costs you

It is 13:24 GMT on a Thursday. US CPI prints at 13:30.

You are flat on gold. On the H1 chart your 50 and 200 EMAs are stacked upward, so the trend filter says long. RSI reads 68 and has been above 70 twice this week, which on a currency pair would make you cautious. Your Bollinger Bands have narrowed into a squeeze. The MACD histogram is faintly red, barely worth mentioning.

Three of your four tools point up. One points down. You take the long before the number, because sitting out feels like missing the trade of the week.

The print comes in hot. Gold drops sharply in ninety seconds. Your stop, set at what felt like a generous distance, is taken before the candle even closes — and the fill is worse than the stop you set, because the spread that is normally tight on gold blew out to several times its usual width during those ninety seconds.

Twenty minutes later, gold is trading well above your entry. Your trend filter was right the whole time.

You did not lose because an indicator was broken. You lost because you put a fourteen-dollar stop on an instrument that eats fourteen-dollar stops before breakfast, and because four conflicting tools gave you the confidence of one clear decision.

Now run that morning four times in a month. That is not a strategy problem and it is not a discipline problem in the way people mean it. It is arithmetic. The next ten indicators you install will not touch it, and the free download on this page is the item here that keeps you from acting before the arithmetic is done — it waits at the level your plan defines and tells you when price gets there.

## What is different about XAUUSD that changes which indicators you need?

Gold is not a currency pair with a different name. Three structural differences change how any indicator behaves on it.

**Gold has no single centralised price.** Currencies are quoted against each other through deep interbank markets with tight, broadly consistent pricing. Gold is traded across London OTC, COMEX futures and a long list of broker liquidity providers, each streaming its own blend. The LBMA Gold Price gives the market a twice-daily institutional reference, but between those auctions your broker's feed is its own thing. A signal that looks perfect on one feed can be a different signal on another.

**Gold reacts, hard, to a small calendar.** CME Group's own gold pages name US CPI, Nonfarm Payrolls, FOMC meetings, PPI and the dollar index as the recurring drivers. That is a short list, which means gold's volatility is concentrated into a few windows rather than spread evenly across the week. Most indicators assume a roughly even distribution of noise. Gold does not provide one.

**Gold's range scales differently.** Mean-reversion tools built for a 60-point EURUSD day will fire constantly on gold, because a fixed period that felt calm on FX is twitchy on a metal that moves further in the same number of minutes. The fix is not more tools. It is longer periods and a volatility measure that adapts on its own.

This is also why so many gold traders concentrate on the London and New York overlaps instead of working the whole clock. If you want the session-level version of that argument, the [gold scalping strategies](/top-10-powerful-scalping-strategies-for-gold-trading-complete-guide/) breakdown goes deeper into timing than this page needs to.

## Which MT4 indicators actually earn a slot on a gold chart?

Three of them. Here is the honest ranking of the ten tools people install on gold, with the job each one can hold and the reason most of them lose that job.

| # | Indicator | The one job it can hold | Starting setting for XAUUSD | Verdict |
|---|---|---|---|---|
| 1 | ATR (Average True Range) | Measures how far gold is travelling, so stops and lot sizes have a basis | Period 14, on the timeframe you trade | **Keep.** Non-negotiable. |
| 2 | Moving averages (EMA pair) | Answers direction, once | EMA 50 and EMA 200 on H1 or H4 | **Keep.** Two lines, not five. |
| 3 | RSI | Times entries inside an existing trend | Period 14, no fixed 30/70 trigger | **Keep.** One rendering only. |
| 4 | Bollinger Bands | Flags volatility compression before expansion | Period 20, deviation 2.0 | Optional. Useful, never standalone. |
| 5 | MACD | Momentum shifts | 12, 26, 9 | Redundant if you already have RSI plus EMAs. |
| 6 | Stochastic Oscillator | Short-term exhaustion | 5, 3, 3 | Redundant with RSI. Pick one oscillator. |
| 7 | Ichimoku Cloud | Multi-layer trend and support mapping | 9, 26, 52 | Powerful, heavy, needs its own learning curve. |
| 8 | Fibonacci retracement | Marks candidate pullback levels | Drawn from a confirmed swing | A drawing tool, not a signal. Use it, do not stack it. |
| 9 | Supply and demand zones | Marks areas of prior imbalance | No standard setting | A judgement overlay. Fine, but it is an opinion, not a measurement. |
| 10 | "Gold scalper" arrow indicators | Claims to call entries | Vendor-defined | Not in MT4 and not verifiable. Test it, never trust the screenshot. |

The pattern is worth stating plainly: the tools that survive are the ones that measure something, not the ones that opine. ATR measures. Moving averages measure. RSI measures. Most of the rest describe what a human already drew with their eyes.

Here is the same information as a working decision rather than a list.

| Question you are actually asking | Tool that answers it | What it cannot tell you |
|---|---|---|
| Which way is the market leaning? | 200 EMA, with the 50 EMA for short-term alignment | Whether this is a good price to enter |
| How much room does this trade need? | ATR (14) on your trading timeframe | Which direction to take |
| Is this a good price right now? | RSI (14) relative to recent swings | Whether the trend will continue |
| Is this price worth acting on yet? | The alert tool in the download — it fires only at the level you set | Whether that level was a good choice; that is your plan's job |

If you want a broader look at how these tools behave across different styles, our ranking of [custom MT4 indicators for scalping](/best-custom-mt4-indicators-for-scalping/) covers the fast-timeframe case in detail, and the [non-repainting trend reversal indicators](/top-10-best-trend-reversal-indicator-mt4-non-repaint-solutions/) guide is the place to go if arrow tools are your thing.

### How do the three tools work together on a gold chart?

Here is the sequence, and it only runs in one direction.

First, direction. Look at the 200 EMA on your chosen timeframe. Above it, you are only interested in longs. Below it, only shorts. That is not a prediction; it is a filter that removes half your decisions and therefore half your mistakes.

Second, room. Read ATR (14) on the same timeframe. That number is your unit of measurement for everything that follows: the minimum distance your stop needs, and the maximum size your account can justify. If ATR says gold is moving $22 a bar on H4, a six-dollar stop is not a stop. It is a lottery ticket with a time limit.

Third, timing. With direction fixed and room measured, RSI tells you whether price is currently stretched against the trend. In an uptrend, a dip toward the lower end of its recent range is where you act. In a downtrend, the mirror image. RSI does not tell you a market is oversold and therefore must reverse, because nothing in technical analysis says that.

Three tools, three jobs, one order. There is no fourth step where you ask all of them to agree unanimously.

## What settings should you change for gold, and which should you leave alone?

Change the periods, not the tools. A setting that felt balanced on a currency pair is too sensitive on gold.

| Input | Typical FX setting | Reasonable XAUUSD starting point | Why |
|---|---|---|---|
| ATR period | 14 | 14 (keep it) | ATR already adapts to volatility. Its period is not the problem. |
| EMA pair | 20 / 50 | 50 / 200 | Longer periods strip out gold's constant small whipsaws. |
| RSI period | 14 | 14 to 21 | Higher periods reduce false exhaustion signals on a fast instrument. |
| RSI levels | 30 / 70 | Track 20 / 80 zones instead | Gold trends further than FX before mean-reverting. Fixed levels misfire. |
| Bollinger Bands | 20, 2.0 | 20, 2.0 to 2.5 | Wider deviation stops gold's normal activity looking like a breakout. |
| Stochastic | 5, 3, 3 | Remove it | It duplicates RSI and adds a fourth opinion. |
| Stop distance | Fixed pips | 1.5 to 2.5 times ATR (14) | Scales with conditions rather than with hope. |

Two cautions on that table, and they matter more than the numbers.

The first is that every row is a starting point, not a rule. Gold's character changes across regimes — quiet months and violent ones behave differently, and a setting that was sensible in one is misleading in the other. Change one input at a time, keep a record of what you changed, and treat any result that only appears at one very specific setting as noise until you have seen it on data you did not use to choose it.

The second is that none of these inputs are secret. They are all visible in the standard MetaTrader 4 indicator dialogs, and the underlying maths is documented by MetaQuotes — the MQL4 reference for `iATR`, for example, defines the Average True Range function MetaTrader itself uses. You can read the specification for free. Any vendor charging you for a "gold-tuned RSI" is selling you a period input you could have typed yourself.

## How do you combine three indicators without lying to yourself?

Write the rules down before you open a chart, and make them boring.

A workable gold plan looks like this on paper:

| Step | Rule | What it prevents |
|---|---|---|
| 1 | Only trade in the direction of the 200 EMA on your chosen timeframe | Counter-trend trades in a market that trends harder than FX |
| 2 | Read ATR (14); your stop is at least 1.5 times that value from entry | Stops that sit inside normal noise |
| 3 | Use RSI to wait for a pullback into value rather than chasing the breakout | Buying the top of a news spike |
| 4 | Set an alert at the price your plan defines, and work out lot size from the stop distance before you enter | Chasing price and sizing by feeling |
| 5 | Risk a fixed small fraction of the account per trade, commonly under 1% | One bad week liquidating months of work |
| 6 | Stand aside inside 15 minutes either side of CPI, NFP and FOMC | Spread widening and slippage you cannot model |

Rule six is the one people skip, and it is the one that changes survival rates most. Your indicators do not see the spread. Your broker's execution engine absolutely does.

Two honest notes about the whole approach. First, this stack lags. The 200 EMA tells you what already happened, ATR describes a range that has already printed, and RSI is calculated from the last 14 closes. You will enter after the move begins and exit after it ends, and you will give some back at every turn. That is the price of a system that can be written down and repeated.

Second, three tools still produce losing trades. Expect them. A gold setup that meets all five conditions and still fails is not evidence that the rules are wrong; it is a normal cost of doing business in a market this volatile. The question is never "did this trade win" but "did I follow the rules, and was the size survivable".

## How do you know an indicator is working before it costs you money?

You test it, and you accept what testing can and cannot prove.

The MetaTrader 4 Strategy Tester will run an indicator-driven template over historical gold data, and the visual mode lets you watch signals fire bar by bar. Two limits are worth being blunt about. Modelling quality describes how faithfully price data was reconstructed, not whether your idea has any edge. And a backtest shows how a rule set behaved on data you already had; it says nothing about prices the market has not printed yet.

So build the habit instead of hunting the perfect metric:

- **Forward-test on a demo account for at least 100 trades.** Gold's volatility means small samples look like signal when they are noise.
- **Journal every trade with a screenshot and the reason.** If you cannot state the reason, the trade was not part of a process.
- **Judge the process, not a run of results.** Ten winners in a row tells you less than the fact that all ten followed the same written rules.
- **Watch for signals that move.** Note the bar a signal appeared on and check it a week later. If it has vanished or shifted, the tool rewrites history and nothing else about it matters.
- **Re-test after every regime change.** Gold in a quiet month and gold in a crisis month are different instruments wearing the same ticker.

If you want to see how this plays out for automated systems rather than manual ones, the [XAUUSD robot settings](/xauusd-scalping-robot-settings-and-tips-10-powerful-strategies-for-better-trading-results/) guide covers the same discipline applied to EAs, and our [best gold scalper EA](/best-gold-scalper-ea-for-mt4-mt5-the-only-guide-you-need/) review shows what an honest assessment of a gold robot looks like.

## What exactly do you get, and what does it not do?

You get the one component of the stack that no signal indicator gives you: something that waits at the price your plan already chose, instead of inventing an opinion about where price should go.

**It is not another signal.** Nothing about the download will tell you when to buy or sell gold. That is deliberate. Direction is the part you have already solved with three tools and a written rule; execution is the part traders leave to nerve, and it is where the plan quietly dies. A trader with a mediocre entry rule who acts only at planned levels survives long enough to improve. A trader with an excellent entry rule who chases every flicker does not.

The download is **EarnForex Price Alert**, a free price-alert indicator from **EarnForex**, released under the **Apache-2.0 licence**. It ships with source for MetaTrader 4 and MetaTrader 5, and you can read it before you compile it.

| What | Detail |
|---|---|
| Name | EarnForex Price Alert |
| Platform | MetaTrader 4 and MetaTrader 5 (MQL4 and MQL5 source) |
| Source | Full source you compile yourself, not a downloaded binary |
| Author | EarnForex |
| Licence | Apache-2.0 — use, modify, share, keep the notices |
| What it does | Fires an alert when price reaches a level you set, with an on-chart panel for adding and managing levels |
| What it does not do | It does not predict direction, generate signals, size a position, place or manage trades, or produce a particular result |
| Cost | Free. No sign-up, no upsell, no email required |

**What the Apache-2.0 licence actually means for you.** Apache-2.0 is one of the most permissive open-source licences in existence. You may use this software, modify it, embed it in your own tools, and share it, including commercially. The conditions are simple: the copyright notice and licence text must travel with any copy or substantial portion you redistribute, and if you modify the files you should note that you changed them. It is provided as-is, without warranty of any kind, and it carries an explicit grant of patent rights that some shorter licences leave out.

**What it does not do, stated plainly.** The indicator has to infer your symbol's digits and contract details from the terminal, and on gold those values differ between brokers, so a two-decimal feed behaves differently from a three-decimal one. It is a reminder service, not a decision: the level you type in is only as good as the plan that produced it. If your plan says nothing about where to act, an alert at a guessed level only tells you, promptly, that you guessed. Confirm each level on the chart before you rely on it with real money.

**Is this really the right download for an "indicators for gold" page?** Yes, and we would rather say so than ship you an eleventh signal tool. You can already install ATR, two EMAs and RSI from MetaTrader 4's own navigator in under a minute, for free. What you cannot install from the navigator is the discipline layer — the thing that stops you acting on the first flicker of a forming candle and makes you wait for the price your rules named in advance. The three tools tell you what to do; this is what makes you wait for it, so the sizing arithmetic above is done before an order, not after a spike. If you want portfolio-level context too, the [best MT4 EAs](/best-mt4-ea/) and [best forex EAs](/best-forex-ea/) pages cover the automation side, and the [product catalogue](/product/onix-stratos-xauusd-ea-ai-smart-scalper-for-mt5/) shows how commercial gold tools are reviewed here.

## How do you install it on MetaTrader 4?

Six steps, about four minutes, no installer needed. Because you compile the source yourself, you know exactly what is running on your terminal — which is more than can be said for a `.ex4` downloaded from a file-sharing site. The same source also compiles for MetaTrader 5, so the choice of terminal is yours.

1. **Read the licence first.** Open the repository and read the LICENSE file. It is the standard Apache-2.0 licence, copyright EarnForex. Like almost every trading tool it is provided as-is, with no warranty and no promise of profit — capital is at risk every time you trade.
2. **Download the source file.** Open the source in the repository and download it. You get readable MQL4 and MQL5 code, not a compiled binary.
3. **Open your terminal's data folder.** In MetaTrader, go to File, then Open Data Folder. This is the folder the terminal actually reads. Files placed anywhere else simply never appear.
4. **Copy it into the Indicators folder.** Inside the data folder, open `MQL4/Indicators` for MetaTrader 4 or `MQL5/Indicators` for MetaTrader 5, and drop the source file in.
5. **Compile it in MetaEditor.** Right-click the file in the Navigator and choose Modify, or open it in MetaEditor and press Compile. If MetaEditor reports errors, they will be visible in the Errors tab rather than hidden inside a binary.
6. **Attach it to a XAUUSD chart and set your levels.** Drag the indicator onto your gold chart and add the price levels your written plan already defines — the pullback zone, the invalidation point, the target. Confirm each level sits where you intended, then step away and let the alert do the waiting.

One practical note for gold specifically: if your broker quotes XAUUSD to two decimals, a level you type in is an absolute price, not a pip count. Set your alerts at prices, not at a "distance", and check the marker on the chart before you trust the notification. It is the fastest way to stop confusing gold's digit count with a normal FX pip.

## Your next step on gold

Do one thing now, and one thing for the next two weeks.

The one thing now: download the open-source price alert, attach it to a XAUUSD chart, and set the levels your written plan defines by hand, so the terminal waits for your price instead of the other way round. Then set up your chart with three tools and nothing else — the 200 EMA with the 50 EMA for direction, ATR (14) for room, RSI (14) for timing — and write the six rules from this page on a note where you can see it.

The one thing for the next two weeks: trade that stack on a demo account only, for at least 100 trades, journal every one, and set the same alerts you would use live on every planned entry even though the money is not real. The point of the exercise is not to prove the strategy works. It is to build the muscle memory that makes waiting for your level automatic, and doing the sizing arithmetic first, because that is the habit that decides whether you are still trading gold in a year.

Be clear-eyed about what you are doing. Trading gold and other leveraged products carries a high risk of losing money, losses are possible on every trade, and no indicator, setting or system changes that. Nothing on this page is financial advice. The three indicators are free and the source of the fourth tool is open, so you risk nothing by testing all of it thoroughly before any real capital is involved. If you would rather start with automation than manual trading, the [free download library](/free-download-forex-ea-indicator/) carries free EAs and indicators with their licences stated, and every one of them deserves the same demo-first treatment.
