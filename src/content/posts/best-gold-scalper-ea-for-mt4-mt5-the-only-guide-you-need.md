---
wpId: 200034
title: "Best Gold Scalper EA for MT4/MT5"
slug: "best-gold-scalper-ea-for-mt4-mt5-the-only-guide-you-need"
description: "There is no single best gold scalper EA. Here is a free, MIT-licensed XAUUSD scalper with full source code, plus the six checks that expose a bad one."
publishedAt: "2026-05-20T12:01:42.000Z"
updatedAt: "2026-09-28T00:00:00.000Z"
seo:
  title: "Best Gold Scalper EA for MT4/MT5 2026"
  description: "There is no single best gold scalper EA. Here is a free, MIT-licensed XAUUSD scalper with full source code, plus the six checks that expose a bad one."
  canonical: "https://bestmt4ea.com/best-gold-scalper-ea-for-mt4-mt5-the-only-guide-you-need/"
  ogImage: "https://bestmt4ea.com/wp-content/uploads/2025/10/1-Gold-Scalping-EA.jpg"
sourceUrl: "https://bestmt4ea.com/best-gold-scalper-ea-for-mt4-mt5-the-only-guide-you-need/"
categories:
  - "Gold (XAUUSD) Trading"
  - "Gold EA & Robots"
categoryPaths:
  - "/category/gold-xauusd-trading/"
  - "/category/gold-ea-robots/"
tags: []
draft: false
primaryKeyword: "best gold scalper EA"
quickAnswer: "There is no single best gold scalper EA, because the result depends on your broker's spread, your latency and your risk inputs. What matters is the mechanism: fixed stops, no martingale, and source code you can audit. This page gives you a free GPL-licensed multi-strategy robot for MetaTrader 4 and 5 with the full MQL source, plus a six-point test to judge any other gold EA before you risk money."
keyTakeaways:
  - "A gold scalper EA is only as good as the spread and execution it runs on. On XAUUSD, a 30-point spread difference turns the same entry rule from positive to negative."
  - "Reject any gold EA built on martingale or an uncapped grid. Those systems hide risk inside a growing lot sequence instead of a stop-loss."
  - "The download on this page is the EA31337 multi-strategy robot: a GPL-3.0 MQL project for MetaTrader 4 and 5 that you can read, compile and change."
  - "Judge a gold EA on maximum drawdown, profit factor, average trade duration and total trade count from a third-party feed — not on the headline return."
  - "FTMO's 2-Step rules allow a 5% maximum daily loss and a 10% maximum loss, so an EA risking 2% per trade can breach a funded account in three bad trades."
  - "Compile the source and run it in the MetaTrader 5 Strategy Tester on real ticks, then forward-test on demo. Test first, live money later."
faqs:
  - question: "What is the best gold scalper EA for MT4 or MT5?"
    answer: "No single EA holds that title, because gold scalping depends on spread, latency, account size and risk inputs more than on the strategy itself. Judge any candidate with six numbers: maximum drawdown, profit factor, trade count, average trade duration, worst losing streak and its cost per trade. A small, auditable EA you have tested yourself beats a large one you cannot inspect."
  - question: "Why do most gold scalping EAs fail in the end?"
    answer: "Four reasons. They double lot size after a loss instead of taking a stop. They are tuned so tightly to past data that the settings only work on that specific history. They ignore spread, which on XAUUSD can widen from roughly 15 points to over 100 in seconds around US data. And they are run on cheap hardware far from the broker's server, so entries are late. Any of the four can wipe an account."
  - question: "Is a gold scalper EA worth running on a small account?"
    answer: "Usually it is a bad fit. At $200, the minimum lot of 0.01 on XAUUSD already risks a meaningful share of the balance per trade, and round-trip spread plus commission is a fixed cost you pay hundreds of times a month. Small accounts are better served by fewer trades and wider targets until the balance can absorb the cost per trade."
  - question: "Can a gold scalper EA pass an FTMO challenge?"
    answer: "It can, but the rules do the hard part. FTMO's 2-Step programme allows a 5% maximum daily loss and a 10% maximum loss, with a 10% then 5% profit target. At 1% risk per trade, three consecutive losses is a 3% day. Use a low risk per trade, respect the daily stop, and test the exact configuration on a free trial or demo before you pay for an evaluation."
  - question: "Does the gold scalper EA on this page work on both MT4 and MT5?"
    answer: "The download is a single MQL codebase and compiles on both MetaTrader 4 and MetaTrader 5, so it runs on whichever terminal you already use. MT4 users are not locked out. MetaTrader 5 is still the better choice for gold research because it can backtest on real ticks rather than generated ones."
  - question: "How much spread does gold scalping need?"
    answer: "A raw ECN account is the baseline. If your broker quotes XAUUSD at 25 to 35 points round trip on average, a scalper taking 40-point targets pays the broker most of its edge. Check your own terminal's spread history during the London and New York sessions rather than trusting an advertised number."
  - question: "Can I use this open-source EA commercially?"
    answer: "Yes. The project is released under the GNU GPL-3.0, which permits you to run, study, modify and use it on your own account, whether that account is personal or a funded prop account. Because it is copyleft, any modified version you distribute must stay under GPL-3.0 and keep the original notices."
  - question: "How do I verify a gold EA's live results?"
    answer: "Use a third-party tracker such as Myfxbook that reads the account from the broker's server, and ask for the track record link rather than a screenshot. Check the deposit and withdrawal history, the maximum drawdown, the average trade duration and whether the account has been running with real money or on a demo. Screenshots are marketing; a verifiable link is evidence."
sources:
  - label: "MQL5 Reference — Testing Trading Strategies (tick generation, spread simulation, Strategy Tester)"
    url: "https://www.mql5.com/en/docs/runtime/testing"
  - label: "FTMO — Trading Objectives (maximum daily loss, maximum loss, targets and the Best Day Rule)"
    url: "https://ftmo.com/en/trading-objectives/"
  - label: "ESMA — Product intervention measures on CFDs, including the 20:1 leverage cap for gold and negative balance protection"
    url: "https://www.esma.europa.eu/press-news/esma-news/esma-adopts-final-product-intervention-measures-cfds-and-binary-options"
  - label: "World Gold Council — Gold spot prices and historical price data"
    url: "https://www.gold.org/goldhub/data/gold-prices"
  - label: "EA31337 — Multi-strategy open-source trading robot (GPL-3.0)"
    url: "https://github.com/EA31337/EA31337"
  - label: "Myfxbook — third-party account verification and track records"
    url: "https://www.myfxbook.com/"
installSteps:
  - name: "Save the source into MetaTrader"
    text: "Download the repository, then in MetaTrader go to File then Open Data Folder and copy the source tree into MQL5/Experts for MetaTrader 5 or MQL4/Experts for MetaTrader 4."
  - name: "Compile it in MetaEditor"
    text: "Press F4 to open MetaEditor, open the main source file and press F7 to compile. A clean build writes a compiled file beside the source. If it throws errors, read the line numbers rather than hunting for a pre-compiled copy online."
  - name: "Attach it to a XAUUSD chart on a demo account"
    text: "Log in to a demo account, open a chart for your broker's gold symbol (XAUUSD, XAUUSD.m or GOLD depending on the broker) and drag the EA from the Navigator. The symbol name must match the one in Market Watch."
  - name: "Choose strategies and set the risk inputs before anything else"
    text: "Enable only the strategies you intend to test, set the risk percentage to 1.0 or lower, and tighten the account guard on a funded account. Press OK, then reopen the inputs and confirm every value saved."
  - name: "Enable algorithmic trading and read the log"
    text: "Turn on the AutoTrading button in the toolbar, then check the Experts tab. You should see the initialisation line with a magic number. Errors about indicators usually mean the symbol history has not downloaded yet."
  - name: "Test on real ticks, then forward-test on demo"
    text: "Run at least one full year in the Strategy Tester with real ticks enabled, then leave it running on demo for two to four weeks. Compare the live demo behaviour with the backtest before any real money is involved."
download:
  origin: "opensource"
  license: "GPL-3.0"
  licenseUrl: "https://www.gnu.org/licenses/gpl-3.0.html"
  author: "EA31337"
  sourceUrl: "https://github.com/EA31337/EA31337"
  version: "latest"
  platform: "MT4/MT5"
  externalUrl: "https://github.com/EA31337/EA31337"
  updatedAt: 2026-09-28
---

You searched for the best gold scalper EA because you want your XAUUSD trading automated. That part is reasonable. Gold moves every day, it respects technical levels that a machine can read, and no human wants to sit in front of a chart at 3am for a 40-point move.

The problem is not that good gold EAs do not exist. The problem is that you cannot tell them apart. Every list you open ranks something different, every page ends with a buy button, and almost nothing on the page tells you what the robot does when a trade goes wrong — which is the only thing that actually matters.

## You are one search away from fifty gold scalper EAs that all look the same

You have already seen the pages. Same layout. Same simulated equity curve climbing from bottom-left to top-right. Same "99% modelling quality" screenshot. Same testimonials from first names. Different logo.

So you do the sensible thing and look for reviews. Now you are deeper in. One page calls a gold EA a scam, another calls the same EA a goldmine, and both of them are affiliates for a different robot. Somewhere in the middle there is a Telegram channel showing balance screenshots with no deposit history attached.

Then you start reading the sales pages properly, and the language gives the game away. "Consistent monthly returns." "Survives every market condition." "Fully hands-free." Not one of them tells you the maximum drawdown in the worst month of the last two years, and not one of them shows the lot size sequence when the first two trades lose.

Here is the uncomfortable part: this is not a research failure on your part. The information you need is usually not published. The performance screenshots come from the vendor. The backtest was run with the vendor's own settings on the vendor's own data. The compiled file you are asked to run has no readable code inside it. You are being asked to trust a stranger with your capital and offered nothing to inspect.

And gold punishes that specific mistake more than most markets do. XAUUSD is not a clean, cheap instrument to trade mechanically. Its spread is one of the widest of any major symbol after the exotic crosses, and it is not stable. On a quiet London morning you might see 15 or 20 points round trip. Ten minutes into a US inflation release, that same spread can be 80, 120, or wider, briefly, while price is moving faster than anything else on your watchlist. A scalper that averages 40 points per winning trade cannot absorb that. It is not a matter of skill or tuning. The arithmetic does not work.

So there are three ways a gold scalper EA takes your money:

1. **It doubles down.** A losing trade is not closed, it is averaged with a bigger position. This works often enough to look clever, until one trending day in gold goes further than the model assumed.
2. **It is fitted to the past.** The parameters were chosen because they produced a beautiful curve on one specific slice of history. Change the broker, the spread or the year and the edge disappears.
3. **It is too cheap to run.** A $6-a-month VPS with 400ms of latency, on a broker 3,000 miles away, turns a planned entry into an accidental one.

None of those three show up in a screenshot.

## What a bad gold scalper cost him

Here is a real pattern, told without the brand names.

A trader we will call Daniel saves $2,400 for a gold EA. Not a fortune. Enough that losing it hurts. The vendor charges $299, and before he pays, he does the demo run: two weeks on a demo account, 11% up, 74 trades, one small losing stretch. He feels good. He has done the test everyone recommends.

He funds a live account with $2,000 and runs the default settings on a VPS he bought for $11 a month. Week one: +$61. Week two: -$34. Week three, a Wednesday with a Federal Reserve statement, gold moves hard for 90 minutes. His equity goes from $2,020 to $1,480 in the space of an hour and a half. Not because the EA had no stop — because it had no stop on the basket. Each leg had been opened as a fresh position with its own take-profit, and the losing leg was reopened at a bigger size each time.

He closes everything by hand at 4:52pm. He is down $540. He is also sitting on a screenshot that the vendor's Telegram channel posted that evening with the caption "another strong day, our clients are smiling."

Here is what that episode actually cost:

- **$299** for the licence, gone.
- **$540** of trading losses, which understates the risk badly — a 13% drawdown on a corrective day could easily have been 40% on a trend day.
- **Four months of attention**, spent arguing with the vendor's support group chat, reading about chargebacks and re-reading the sales page to see what he missed.

The money is the small part. The expensive part is what he now believes: that automated trading is a con, and that the two years he spent learning price structure were wasted.

They were not. The mistake was method, not market. He judged a gold EA by its headline return and its demo run — the two numbers that a bad EA is built to produce. Nobody gave him a list of checks that a bad EA fails.

That is what the rest of this page is.

## What actually works when you automate gold scalping

The mechanism you need is boring. You want to run a gold scalper whose entry logic is visible, whose worst case is capped by a stop-loss on every single position, and whose risk per trade is set by you rather than by the developer. Then you want to test it yourself on real ticks and on demo before a single live dollar is exposed.

You can buy that. You can also get it for free, and because this page carries a download, that is where we start — with a real, GPL-licensed open-source robot whose full MQL source you can read line by line.

### What is the EA31337 multi-strategy robot?

It is an open-source Expert Advisor for MetaTrader 4 and MetaTrader 5, written in MQL and published on GitHub by the EA31337 project under the GPL-3.0 licence. Rather than hard-coding one entry rule, it bundles a large set of individual strategies — moving averages, oscillators, breakout and other classics — that you switch on or off, and each can read its own timeframe. It will trade XAUUSD like any other symbol your broker lists, but it is a general robot, not a gold-only scalper, and that is an honest limit to keep in mind.

The risk layer is the reason it is on this page. The strategies sit on top of a shared money-management and order layer, so the same sizing and stop rules apply to every strategy you enable. Position size comes from a configurable risk setting rather than a fixed lot, and the order layer is where the stop is placed. Account-level guards are inputs you set, and the project documents them instead of hiding them inside a binary.

None of those features are exotic. What matters is that you can verify them. The project ships as MQL source. Open it in any editor and search for how the lot size is calculated, how the stop is placed, and what happens after a loss. If you do not like any of it, change it and recompile. That is not possible with a compiled `.ex5`.

The project publishes its own backtest and optimisation notes, and because it is popular it has been run on many brokers by other traders. Treat every published number as the authors' own claims, not as evidence for your account. They have not been audited on your feed, your spread or your commission, and a result on one broker does not transfer to another. The reason to download this file is not the headline return. It is that you get a complete, readable, risk-capped open-source robot to test against your own broker and your own spread.

Two other honest limits. It is a large framework with a real learning curve — you configure which strategies run and on what, so it is not a single preset you attach and forget. And it is a general-purpose tool: nothing about it is tuned for gold's spread and volatility, so treat it as a testbed for the six checks below rather than a specialist gold scalper.

### Why does a readable source file beat a compiled gold EA?

Because a compiled Expert Advisor is a black box that you are handing your account to. The `.ex5` file contains no readable logic. You cannot see the lot sequence, you cannot see whether a losing position is ever left without a stop, and you cannot see whether the entries look ahead at future bars, which is the most common way a backtest gets flattered.

| What you are checking | Open-source `.mq5` (this download) | Compiled `.ex5` from a vendor |
|---|---|---|
| Lot size calculation | Readable, verifiable, editable | Hidden |
| Stop-loss on every position | Visible in the order request | Claims only |
| Martingale or grid logic | Search for it in seconds | Undetectable |
| Look-ahead in entry logic | Auditable bar by bar | Undetectable |
| Cost | Free (GPL-3.0 licence) | Typically $99 to $499 |
| Support | Community issues, no SLA | Usually included |
| Who fixes a bug | You can | The vendor, if they still trade the account |

None of that makes an open-source EA better at predicting gold. It makes it *checkable*. For a system that will hold positions while you sleep, checkable is worth more than polished.

### Which six numbers separate a gold scalper from a lottery ticket?

Ask for these six numbers, and ask for them from a third-party tracker rather than from the vendor's own page. If a vendor cannot or will not produce them for a real-money account, that is your answer.

| Metric | What to look for | Why it decides the outcome |
|---|---|---|
| Maximum drawdown | Under 20% of account equity, measured peak to trough | It is the number that determines whether you can stay in the trade long enough for the edge to appear |
| Profit factor | Above 1.2 over at least 200 trades | Below 1.2, spread and slippage variations can erase the whole edge |
| Total trade count | At least 200, ideally 500+ | A scalper with 30 recorded trades has no statistical story, only an anecdote |
| Average trade duration | Under 60 minutes for a scalper | If it holds for days, it is not scalping, and your risk model is wrong |
| Worst losing streak | Compare it to your account size and leverage | A 12-trade losing run at 2% risk per trade is a 24% drawdown in sequence |
| Cost per trade | Spread plus commission in points | This is the EA's rent. On gold it is often the difference between positive and negative |

Read the drawdown first, and read it in currency, not as a percentage of the vendor's demo balance. A 15% drawdown on a $200,000 demo is a very different experience to 15% on the $2,000 you actually funded.

### Why is martingale the one feature that should disqualify a gold EA?

Because it converts a known, bounded loss into an unknown, unbounded one.

Here is the mechanism. A martingale gold scalper takes a trade and loses. Instead of closing that loss and moving on, it opens another position in the same direction at a larger size, hoping a small retrace recovers both. If price keeps going, it opens a third, larger still. The equity curve stays flat and comfortable for weeks, because each recovery pushes the whole ladder back to breakeven plus a little. Then gold trends, the ladder grows past what the margin can carry, and the account is closed out at the worst possible price.

There is a second layer of danger specific to gold. Retail leverage on gold is capped at 20:1 in the EU under the European Securities and Markets Authority's product intervention measures — 30:1 on major currency pairs and 20:1 for gold and major indices. That cap exists precisely because leveraged positions in volatile instruments destroy retail accounts. A martingale system is a machine for building a position that the leverage cap was designed to prevent.

How to spot it without reading code:

- An input named `LotMultiplier`, `Multiplier`, `RecoveryFactor` or `GridStep`.
- A maximum-positions setting of 10 or more.
- A statement with an unusual pattern: many small wins, no single loss larger than the wins.
- Any sentence on the sales page like "recovers losing trades" or "no losing months".

The shape is the tell. A real scalper's statement has clusters of losses. A martingale statement looks like a savings account until it doesn't.

### How much does spread and slippage cost a gold scalper per month?

More than most people calculate before they buy. Run the numbers on your own broker, because they change the verdict.

Take a scalper that places 10 trades a day, 20 days a month, at a 25-point round-trip spread on XAUUSD with 0.01 lots. That is 200 trades and 5,000 points of spread paid in a month. At $0.10 per point on a 0.01 lot, the spread bill alone is around $500 — against a $2,000 account. The robot can be right 60% of the time and still finish the month behind.

| Trades per month | Round-trip cost | Cost in points | Rough cost on 0.01 lots |
|---|---|---|---|
| 50 | 25 points | 1,250 | ~$125 |
| 100 | 25 points | 2,500 | ~$250 |
| 200 | 25 points | 5,000 | ~$500 |
| 200 | 15 points | 3,000 | ~$300 |

Now the same logic on a demo account, where the spread is often tighter than your live account will be. This is why a demo that looks flat at best can look strong. The MetaTrader 5 documentation is explicit that during testing the spread is not modelled but taken from historical data, so the backtest inherits whatever spread values the history file carries — which is usually your broker's older, better spread. Before you trust any gold backtest, check what the spread assumptions were.

Practical rules:

- Set a maximum spread filter in the EA and make it realistic. If your broker quotes 20 points at 10am London and 90 at 2:30pm New York, a 30-point filter kills most of your New York trades — which may be the right outcome.
- Trade the sessions where the cost-to-range ratio is best. London and the New York open carry the volume; the late Asian session on gold is usually thin.
- Count commission as part of the spread, not separately. Every broker eventually charges it in some form.

### MT4 or MT5 for gold scalping?

If you are starting fresh with gold automation, use MetaTrader 5. The reason is testing, not trading. MetaTrader 5's Strategy Tester supports real tick data from your broker and the "Every tick" generation mode, and the MQL5 documentation is blunt about why that matters: the faster "1 minute OHLC" mode can produce what it calls a "Testing Grail" — a beautiful curve that a strategy cannot reproduce in live conditions. If your gold scalper's results look unrealistically smooth on a rough testing mode, the documentation's own advice is to re-run it in "Every tick" mode.

MetaTrader 4 is still fine for live execution and has the larger library of legacy gold EAs. But it gives you less ability to prove that a strategy worked for the right reason. If you are choosing between the two, our comparison of the [best MT4 EAs](/best-mt4-ea/) covers where MT4 still makes sense, and the [geraked MT5 expert advisors](/geraked-mt5-expert-advisors-free-download/) collection is a useful second open-source reference to test alongside this one.

### Can a gold scalper EA pass a prop firm challenge in 2026?

It can, but the constraints are tighter than most EA marketing suggests, and the pass depends more on the risk inputs than on the strategy.

Here are the actual FTMO numbers, from their published trading objectives. On the 2-Step programme the targets are 10% then 5%, with a 5% maximum daily loss and a 10% maximum loss, and a minimum of four trading days. On the 1-Step programme the target is 10%, the maximum daily loss is 3%, the maximum loss is 10% on a trailing end-of-day basis, and there is a Best Day Rule that caps your best day at 50% of total positive days' profit.

That arithmetic is unforgiving for a scalper running default settings:

| Risk per trade | Three losses in one day | Against FTMO 1-Step daily limit (3%) |
|---|---|---|
| 0.5% | 1.5% | Survives |
| 1.0% | 3.0% | Breaches |
| 2.0% | 6.0% | Breaches badly |

This is why the number that matters on a funded account is not the profit factor. It is the daily loss limit, and the discipline to stop trading when it is hit. Our [gold prop firm robot guide](/gold-prop-firm-robot-free-download-7-powerful-secrets-to-maximize-funded-trading-success/) goes deeper on presets and programme rules, and the [top ranking](/top-ranking/) tables compare funded programmes directly.

If you are testing a gold EA on a funded account, run the same EA on a free trial first with the exact risk inputs you intend to use. The trial is free and the lesson is inexpensive.

## Exactly what you get in this download

The download is the complete repository: the MQL source tree, the licence, and the project's documentation. You are not getting a compiled binary, because you do not want one.

| Component | Detail |
|---|---|
| File | The MQL source tree (compile it yourself in MetaEditor) |
| Platform | MetaTrader 4 and MetaTrader 5 |
| Instrument | Any symbol your broker lists, including XAUUSD |
| Strategy set | Many independent strategies you enable or disable, each able to read its own timeframe |
| Risk inputs | A configurable risk percentage, plus account-level guards |
| Filters | Per-strategy and order-layer conditions that decide whether a signal becomes a trade |
| Trade management | Shared sizing, stop placement and order handling across the enabled strategies |
| Dependencies | Standard MetaTrader includes — no external DLLs |
| Licence | GPL-3.0. Free to use and modify; anything you distribute must stay under the same licence |
| Author | EA31337 project |
| Cost | Free |

### What it does not do

This is the section that most download pages skip, and it is the one worth reading.

- **It does not include a compiled `.ex5`.** You compile it in MetaEditor. That takes thirty seconds and means you know exactly which code is running.
- **It is not a gold-only scalper.** It is a general multi-strategy robot. It will trade XAUUSD, but nothing in it is tuned to gold's spread and volatility, so expect to configure and test it rather than attach and forget it.
- **It does not configure itself.** You choose which strategies run, on which symbols and timeframes. The default set is a starting point, not a finished strategy.
- **It does not have a support desk.** It is a community project with a public repository. Bug reports go to the project or to your own editor.
- **It does not come with a verified live track record for your broker.** Any published results are the authors'. Your spread, commission and server time are different, so no third party has confirmed them on your account.
- **It does not guarantee anything about your result.** No EA can. The market you are trading it on is the same market that has bankrupted professional desks.
- **It does not detect your broker's symbol.** You have to check that `XAUUSD` is spelled the same way in Market Watch as the chart you attach it to. Brokers use `XAUUSD.m`, `GOLD` or `XAUUSD_raw`.
- **It does not fix a bad account size.** Below a few hundred dollars, the minimum lot and the spread cost dominate everything the strategy does.

If you want a licensed, supported alternative with presets and a developer behind it, the site's own gold scalpers are worth reading about on their product pages: [Zenith Matrix EA](/product/zenith-matrix-ea-ai-gold-scalper-for-mt5/), [Nexora Manus EA](/product/nexora-manus-ea-ai-gold-scalper-for-mt5/), [Mythos Epic EA](/product/mythos-epic-ea-ai-gold-scalper-for-mt5/) and [Onix Stratos XAUUSD EA](/product/onix-stratos-xauusd-ea-ai-smart-scalper-for-mt5/). The trade-off is honest and symmetrical: you get support and tested presets, and you give up the ability to read the code. Read the specifications, check the refund terms, and apply the same six checks above to them as to anything else.

## How do you install and set up a gold scalper EA?

Installation is the easy part. Configuration and testing are where the outcome is decided, and they take longer than the download.

1. **Save the source into the terminal.** Download the repository, then in MetaTrader go to **File → Open Data Folder** and copy the source tree into `MQL5/Experts` for MetaTrader 5, or `MQL4/Experts` for MetaTrader 4.
2. **Compile it.** Press F4 for MetaEditor, open the main source file, press F7. You should get zero errors and a compiled file beside the source. If the compiler complains, read the messages — they point at line numbers, and this is a readable project.
3. **Open a XAUUSD chart on demo.** Confirm the symbol against Market Watch. A chart on `GOLD` with an EA expecting `XAUUSD` will simply not trade, and the log will tell you so.
4. **Choose strategies and set risk before anything else.** Enable only the strategies you intend to test, set the risk percentage to 1.0 or lower, and tighten the account guard if you are on a funded account.
5. **Enable AutoTrading.** The button in the toolbar must be green and the chart corner should show a smiley face rather than a cross. Watch the Experts tab for the initialisation line and a magic number.
6. **Test it in the Strategy Tester on real ticks.** One year minimum, real ticks enabled, and the same symbol and period you intend to run. Rough tick modes are for a first sanity check only.
7. **Forward-test on demo for two to four weeks.** Then compare the demo behaviour to the backtest: number of trades, average duration, worst day. If they differ wildly, the backtest was describing a different market to the one your broker provides.

The short version of these steps is in the install panel above, which generates the page's HowTo data. Do the long version anyway.

## Questions traders ask before they put a gold EA on a chart

**Do I need a VPS?** For live gold scalping, yes, at least while you are evaluating whether the EA works. Gold scalpers are sensitive to latency because the targets are small. A cheap VPS in a data centre near your broker's trading server costs a few dollars a month and removes a variable you cannot otherwise control. On demo, latency matters less, so test the logic first and move to a VPS when you go live.

**Which session should a gold scalper trade?** The London session and the first two hours of New York carry the volume and the cleanest directional moves in gold. That is why you should restrict the robot to those two windows yourself and leave the Asian session off. If you enable the Asian session, expect fewer valid signals, because the ATR and spread filters you set will reject most of them on a thin book.

**What lot size should I start with?** Whatever the risk setting produces, and never larger. Set the robot's risk percentage to 1.0 and a 1% loss is the target if its stop is hit. On a $1,000 account that is $10, which is near the minimum lot on some brokers anyway — check the broker's minimum lot and its value per point before you assume the setting is doing what you expect.

**Can I run two gold EAs on the same account?** Technically yes, and it is a common way to double your daily drawdown without noticing. Two EAs each risking 1% per trade can put 4% at risk on the same hour, and if they trade the same signal you have effectively doubled your position, not diversified. If you run more than one, set a combined daily loss cap and check that the magic numbers differ.

**What should I do when the EA hits a losing streak?** Nothing, until the streak exceeds the worst losing run in your test data. That threshold is the reason you should log it before you start. Interfering with a system that is behaving within its tested range is how a planned 8% drawdown becomes a 25% one, because the position you closed manually was the trade that was going to recover the account.

**Is MetaTrader 5's Strategy Tester enough on its own?** No. It is a filter, not a verdict. It tells you whether the logic is coherent and whether the risk controls work. It cannot tell you how the EA handles your broker's real spreads at 2:30pm on a payrolls day, and that is exactly the scenario that shows up in the drawdown.

## What to do next, in the next ten minutes

Download the repository. Compile the source. Put it on a XAUUSD demo chart with the risk percentage at 1.0 and a spread cap set to something your broker actually quotes outside news. Run one year of real ticks in the Strategy Tester. Then leave it on demo for a fortnight and watch how it behaves on the day gold moves 3% while you are not paying attention.

That fortnight tells you more about gold scalping than any review page can, including this one. You will see the spread widen and the EA stand aside. You will see a losing run and be forced to decide, in advance, what your response is. You will find out what your worst day looks like in currency rather than in percent.

Then, and only then, decide whether this robot or any other deserves real money.

For more free, licence-verified tools to run alongside it, the [free download library](/free-download-forex-ea-indicator/) is the place to start, and [EA31337 Libre](/ea31337-libre-free-download/) is the strongest open-source multi-strategy EA available if you want a second codebase to study. If you would rather compare licensed options first, the [product pages](/shop/) carry the specifications and the pricing.

Trading forex and CFDs on gold carries a high risk of loss and is not suitable for everyone. Leverage magnifies both directions. Past performance, including every backtest and every track record on this page, does not indicate future results. Test on a demo account first, and only ever risk money you can afford to lose.
