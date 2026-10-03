---
title: "Free Open-Source MT5 Expert Advisors You Can Read"
slug: "geraked-mt5-expert-advisors-free-download"
description: "A free MIT-licensed collection of MT5 expert advisors you can actually read. Here is how to use a shelf of small, open-source robots as a study corpus."
publishedAt: 2026-09-28
updatedAt: 2026-09-29
seo:
  title: "Free Open-Source MT5 Expert Advisors You Can Read"
  description: "A free MIT-licensed collection of MT5 expert advisors you can actually read. Here is how to use a shelf of small, open-source robots as a study corpus."
  canonical: "https://bestmt4ea.com/geraked-mt5-expert-advisors-free-download/"
categories:
  - "Free EA"
categoryPaths:
  - "/category/free-forex-ea/"
tags:
  - "open source"
  - "MT5"
  - "scalping"
  - "backtesting"
quickAnswer: "The geraked MetaTrader 5 repository is a free, MIT-licensed collection of eleven open-source expert advisors written in MQL5, each with readable source, a compiled build, a backtest report and a strategy video. It is a study corpus, not a product: you use it to compare entry and exit logic, then run the same tests yourself in the MetaTrader 5 Strategy Tester."
keyTakeaways:
  - "Licence: MIT, confirmed in the repository's own LICENSE file — commercial use, modification and redistribution are allowed, as long as the copyright notice and licence text travel with what you share."
  - "Eleven complete MQL5 expert advisors, each with readable source, a compiled build, a per-strategy backtest report and a short walkthrough video."
  - "The value is the shelf, not any single robot: reading eleven entry rules teaches you the vocabulary of decisions that a single closed product hides."
  - "Because the source is open, you can run the same tests on all of them — one symbol, one period, one set of costs — and get a comparison table instead of a story."
  - "The README warns that some of the experts use grid logic. A grid defers losses into floating drawdown, so a smooth equity curve is not a risk profile."
  - "None of it is validated on your broker. The Strategy Tester at your costs, then a demo account, remain the only filters that mean anything."
faqs:
  - question: "Is the geraked MetaTrader 5 collection free to use commercially?"
    answer: "Yes. The repository ships an MIT licence, which permits commercial use, modification and redistribution. The one obligation is that the original copyright notice and the licence text must travel with anything you redistribute. MIT is not copyleft, so you are not required to publish your own changes."
  - question: "Are these expert advisors ready to run on a live account?"
    answer: "No. This is a research library, not a product. The author warns in the README that the optimal symbol, timeframe and parameters differ by broker and account, and asks readers to backtest thoroughly first. Treat every expert here as something to study and test on demo data, not as a finished system."
  - question: "What does the warning about the grid technique actually mean?"
    answer: "It means some of the expert advisors add to losing positions instead of closing them. That makes the equity curve look unusually smooth, because the losses stay floating rather than realised, and it makes the eventual drawdown larger when price trends without returning. It is the single most common way a backtest flatters a strategy."
  - question: "Do I get the source code, or only compiled files?"
    answer: "Both. The Experts folder holds the full MQL5 source for each strategy, the Build folder holds the compiled files, and the Indicators folder holds the custom indicators they depend on. Having both means you can run a robot immediately and still read, audit and recompile its logic."
  - question: "Will these expert advisors work on MetaTrader 4?"
    answer: "No. Everything in the repository is written in MQL5 and targets MetaTrader 5. MQL4 and MQL5 are separate languages with different libraries, so an MT4 user needs a different source entirely — the repository also publishes a TradingView port of the same strategies if you work across platforms."
  - question: "How many expert advisors are in the collection, and what strategies do they cover?"
    answer: "Eleven, ranging from moving-average and Bollinger Band systems to a Nadaraya-Watson envelope, a linear-regression design and one built on Commitments of Traders positioning. Each is a small, self-contained ruleset, which is precisely what makes the collection useful as reading material rather than as a product."
  - question: "Do the expert advisors come with verified live results?"
    answer: "No, and you should be sceptical of anything that claims to. The repository publishes backtest reports, which are simulations under assumptions you did not choose. We have not traded these systems for you, and past performance, simulated or real, does not indicate what will happen next."
sources:
  - label: "geraked/metatrader5 — open-source MetaTrader 5 trading strategies and expert advisors"
    url: "https://github.com/geraked/metatrader5"
  - label: "MIT licence text"
    url: "https://opensource.org/license/mit"
  - label: "MQL5 documentation — Strategy Tester"
    url: "https://www.mql5.com/en/docs/runtime/testing"
  - label: "MQL5 language reference — technical indicators and trading functions"
    url: "https://www.mql5.com/en/docs"
  - label: "CFTC — Commitments of Traders reports"
    url: "https://www.cftc.gov/MarketReports/CommitmentsofTraders/index.htm"
  - label: "geraked/tradingview — the same strategies ported to TradingView"
    url: "https://github.com/geraked/tradingview"
primaryKeyword: "free open-source MT5 expert advisors"
installSteps:
  - name: "Download the repository"
    text: "Open the geraked/metatrader5 repository on GitHub and download it — Code, then Download ZIP, or clone it with git. Take it from the original repository rather than a mirror so you know exactly what you are running."
  - name: "Open your MetaTrader 5 data folder"
    text: "In the terminal, go to File and then Open Data Folder. Everything you are about to copy lives under MQL5, beside the Experts and Indicators folders."
  - name: "Copy the experts and indicators"
    text: "Put the .mq5 files from Experts into MQL5/Experts, and the .mq5 files from Indicators into MQL5/Indicators. The experts call those indicators, so both sets need to be in place before anything compiles."
  - name: "Compile in MetaEditor"
    text: "Open a strategy's .mq5 file in MetaEditor and press F7. A clean build means the code you just read is the code that will run. If you only want to test quickly, the prebuilt files in the Build folder work too."
  - name: "Run one expert in the Strategy Tester"
    text: "Press Ctrl+R in MetaTrader 5, choose the expert, symbol, timeframe and date range, and set the spread and commission to what your broker actually charges. Test one expert at a time so the results stay comparable."
  - name: "Move the shortlist to a demo account"
    text: "Attach only the strategies that survive the tester to a demo account at the broker you intend to use, and log every trade, fill and spread for at least six to eight weeks before any real money is involved."
download:
  origin: "opensource"
  license: "MIT"
  licenseUrl: "https://opensource.org/license/mit"
  author: "geraked"
  sourceUrl: "https://github.com/geraked/metatrader5"
  version: "latest"
  platform: "MT5"
  externalUrl: "https://github.com/geraked/metatrader5"
  updatedAt: 2026-09-29
---

You download an expert advisor, drop the file into your MetaTrader terminal, drag it onto a chart, and it begins trading. Within the hour it has opened a position, moved the stop loss, and opened a second position in the opposite direction. You did not ask it to do either of those things. You also cannot find out why it did them.

That gap — between what a robot did and why it did it — is the part of automated trading that never reaches a sales page. Your account balance shows the result. Nothing on your screen shows the reasoning.

A compiled `.ex5` file is a black box on purpose. The author's logic is the product. Anyone selling that logic to a thousand buyers cannot hand it over in readable form, so you receive machine code, a picture of a rising equity curve, and an instruction to trust both.

This is not a small annoyance. Every decision that matters in automated trading is made inside that box. How much of your account goes into a trade. Whether the stop sits at a fixed number of points or moves with volatility. Whether the robot adds to a losing position. Whether it stands aside before a news release. Whether it holds through the weekend. You can measure the consequences of those choices, but you cannot inspect them, question them, or change them.

So most traders do the only thing available: they judge the box by its latest result. Three good months and it looks like a system. One bad week and it looks broken. Neither conclusion has anything to do with the code.

Here is a concrete version, because it repeats constantly.

A trader — call her Nia — bought a gold expert advisor earlier this year. The vendor's page carried a Myfxbook link with fourteen months of gains, a video of the robot banking profits on XAUUSD, and a description that promised nothing while implying everything. The download was a single compiled file, no source, no manual beyond "attach to M15".

Nia tested it. The backtest looked acceptable. She ran it on a live account with a small balance for three weeks: small wins, a couple of losses, net positive. Then she added capital, because that is what a rising curve invites you to do.

In week four, gold ran hard in one direction. The robot, which had been opening a position every time price moved against it, opened nine of them. All in the same direction. All losing. The floating drawdown passed sixty percent of her account before she closed everything by hand, at a loss she had not planned for and could not have sized for.

The word "recovery" appeared twice on the vendor's page. In this corner of the market, recovery means grid: the robot adds positions as price moves against it, which defers losses instead of taking them, which is why the curve looked smooth for so long. Two lines of source code would have shown her the lot multiplier and the position counter. She never saw two lines of source code, because the business only works while she does not.

The money is the small part. The larger cost is the conclusion she drew: that automated trading does not work. What failed was a business model in which the person running the robot is not allowed to read it.

There is an alternative, and it costs nothing. Instead of one polished black box, you can work through a shelf of small, readable robots — source included, licence stated, logic inspectable — and learn what these programs actually decide. That is what a free collection of open-source MetaTrader 5 expert advisors is genuinely good for. A shelf of readable robots teaches you more than one polished black box ever will.

## What is inside the geraked MetaTrader 5 collection?

It is eleven complete expert advisors written in MQL5, published under the MIT licence with the full source code, a compiled build for each strategy, a folder of backtest material, and a short video per robot. Nothing is locked and nothing is hidden; it is a study library with a market-facing name.

The repository (github.com/geraked/metatrader5) is maintained on GitHub by geraked and credited in the README to Rabist. Each strategy lives in the Experts folder as a readable `.mq5` file, the compiled builds sit in Build, and the backtest material is organised per strategy under Test.

| Expert advisor | The decision it is built around | Published build |
|---|---|---|
| CEZLSMA | Chandelier Exit plus ZLSMA on Heikin Ashi candles | v1.6 |
| 3MAF | Three moving averages with Williams Fractals | v1.5 |
| BBRSI | Bollinger Bands with RSI | v1.6 |
| DHLAOS | Daily high and low with the Andean Oscillator, for scalping | v1.5 |
| 3MACD | Triple MACD, scalping | v1.4 |
| 2MACDSTO | Two MACDs with the Stochastic Oscillator | v1.4 |
| 2MAAOS | Two moving averages with the Andean Oscillator | v1.4 |
| AFAOSMD | Average Force, Andean Oscillator and MACD | v1.5 |
| NWERSIASF | Nadaraya-Watson Envelope with RSI and an ATR stop finder | v1.4 |
| LRCUTB | Linear Regression Candles with the UT Bot | v1.4 |
| COT1 | Commitments of Traders positioning with Super Trend | v1.2 |

Two things about that table matter more than the names. First, every entry is a small, self-contained ruleset — an indicator cross, a band break, an envelope touch — which is exactly what makes it readable in an evening. Second, several are deliberate variations on a theme, which is the point: put 3MACD and 2MACDSTO side by side and you can see how a signal gets assembled from the same building blocks, and how much difference one extra condition makes.

Around the eleven experts sits the supporting material: the custom indicators they depend on (Chandelier Exit, ZLSMA, Daily High/Low, Andean Oscillator, Average Force, Nadaraya-Watson Envelope, an ATR stop-loss finder, Linear Regression Candles, UT Bot and Super Trend), a shared `Cot.mqh` include that pulls Commitments of Traders data, and a companion repository porting the same strategies to TradingView if you work across both platforms.

Then there is the warning the author puts above the download table. Paraphrased from the README: some of these expert advisors have been combined with the Grid technique to enhance profitability, and that approach also introduces significant risk. It is an unusually honest sentence to find on a page of free trading robots, and it tells you what kind of library this is. The author is not selling you a result. He is handing you the material and telling you where the sharp edges are.

The version numbers are worth noticing as well. Almost every expert carries a release label — v1.6, v1.5, v1.4 — and the Build folder holds the compiled file that matches it. A project that keeps shipping point releases is being maintained, and a maintained library makes a better teacher than an abandoned one, because the README, the videos and the code tend to stay in step with each other.

## Why does a shelf of readable robots teach more than one polished product?

Because a library teaches you the vocabulary of decisions, while a single product teaches you one sentence of it. Once you have read eleven entry rules and eleven exit rules, you stop sorting robots into "good" and "bad" and start sorting them into categories.

Here are the categories that actually decide whether a robot survives contact with your account:

- Does it take a loss without hesitation, or does it hold and add?
- Does it cap the number of open positions, or is the cap only the size of your account?
- Does it size by fixed lot, by percentage of equity, or by a multiplier that grows after a loss?
- Does its stop distance adapt to volatility, or is it a fixed number of points?
- Does it filter on spread, news or session, and what happens when it does not?

Those questions have answers, and the answers live in the code. A polished product gives you one data point and a narrative. A shelf gives you a comparison set: you can find which designs refuse to trade in thin liquidity, which ones trail a stop, and which ones will happily open nine positions in the same direction.

It also teaches you something subtler — the difference between a strategy and an implementation. Two robots can share the same idea and behave completely differently because one checks the spread before entering and the other does not. Reading both, side by side, makes that visible. If you want a second reference point, EA31337 Libre is another [open-source expert advisor for MT4 and MT5](/ea31337-libre-free-download/) whose code you can read the same way, and the comparison between the two projects is itself instructive.

## How do you compare the entry logic of eleven expert advisors?

By reading the same things in the same order in each file and writing the answers down. An MQL5 expert is not hard to navigate. `OnTick()` runs on every price tick, and somewhere inside it a signal is evaluated and an order function is called.

Read each file with this list in hand.

| What to look for | Where it normally lives | The question it answers |
|---|---|---|
| Signal source | calls such as `iCustom`, `iMA`, `iRSI`, `iMACD` | What is the robot actually looking at? |
| Bar index | the shift argument — 0, 1 or 2 | Is it reading a closed bar, or the bar still forming? |
| Spread filter | a comparison against the current spread in points | Does it refuse to trade when costs widen? |
| Order type | `OrderSend` or a trade wrapper class | Market, limit or stop order? |
| Direction filter | a trend or higher-timeframe condition | Can it trade both ways, or is it effectively one-sided? |

The bar index is the one to check first, because it is where most invisible optimism lives. A signal read from shift 0 is reading a candle that has not closed. In a backtest that value is a fact from the historical data. On a live chart it is still moving, which is how a strategy can look prescient in the tester and ordinary in an account.

The spread filter is the second. Several of these experts were written for a broker feed the author had in front of him. A robot that enters regardless of spread is not wrong — it is just making an assumption about your costs, and you should know that before you attach it.

## How do you read the exit logic the same way?

Exits decide more about a result than entries do, and they are faster to compare. In a small MQL5 file the whole exit story is usually visible in one pass through the position-management section.

| Exit mechanism | What to search for | Why it changes your risk |
|---|---|---|
| Fixed stop and target | stop-loss and take-profit inputs applied at order time | Nothing, as long as they are actually set |
| Volatility-based stop | an ATR handle feeding the stop distance | The stop widens in fast markets, so position size must shrink |
| Trailing stop | a loop that rewrites the stop as price advances | Turns winners into small winners when the market ranges |
| Break-even move | a rule that shifts the stop once profit reaches a threshold | Caps how often a nearly-won trade becomes a loss |
| Time-based exit | a bar counter that closes after N candles | Prevents a dead position from sitting open indefinitely |
| Position cap | a check on the number of open orders | The single most important number in any grid-adjacent design |

That last row is where the README's warning becomes something you can act on. A robot that allows its position count to grow without a hard limit is not a strategy with a drawdown; it is a strategy whose drawdown has not arrived yet. The repository's backtest folders show you the curve. Reading the position-cap rule and the lot multiplier shows you the shape of the tail that curve is hiding. Both matter, and only one of them is on the equity chart.

## Can you run them all in the Strategy Tester on one symbol and one period?

Yes, and this is where the library stops being reading material and becomes evidence. Eleven robots tested under identical conditions give you a comparison table. Eleven robots tested under eleven different conditions give you eleven sales pitches.

Hold these fixed across every run:

| Setting | Why it must not change |
|---|---|
| Symbol | A robot tested on EURUSD has told you nothing about XAUUSD, where spread and volatility behave differently |
| Timeframe | The timeframe is part of the strategy, not a preference — changing it tests a different system |
| Date range | Overlapping history is what makes two results comparable at all |
| Deposit and account currency | Drawdown as a percentage is meaningless if the balance changes between tests |
| Spread and commission | These are your costs, and they are the easiest thing to accidentally optimise |
| Modelling method | Use the same tick mode for every run, so the errors are shared rather than compared |

Then keep one ledger, one row per robot, and read it honestly.

| Column | What you are looking for |
|---|---|
| Trades | Under about 300 trades, the headline numbers are noise with a chart attached |
| Profit factor and net result | The least interesting column, and the one every vendor shows first |
| Maximum drawdown | The number that decides whether you could actually hold the position |
| Longest losing streak | Your realistic tolerance test, measured in consecutive losses rather than percent |
| Average trade duration | Tells you whether the robot needs a wide spread budget or complains about time |
| Open positions at once | Anything above one is a promise of correlated risk |
| Survives a wider spread? | Re-run at double your normal spread and see what is left |

Two habits make the table trustworthy. First, change one thing at a time, and write down what you changed. If a rule only works at one specific parameter set, you have fitted noise rather than found an edge. Second, re-run the decisive test yourself rather than believing a screenshot. A test you produced is a test you can interrogate. If you want the mechanics of the tester itself — what modelling quality means, how the intrabar path is guessed, where commission is entered — our [step-by-step backtesting walkthrough](/forex-tester-online-backtesting-with-eas-tutorial-the-ultimate-step-by-step-guide/) covers the settings and what each one does to a result.

Gold deserves a special mention here, because most of the drama in this corner of the market happens on XAUUSD. Gold's spread is wider than the majors and it widens violently around news, its tick size makes slippage expensive, and it trends hard enough that two or three large moves can dominate an entire equity curve. Test any of these experts on gold with a fixed spread taken from a quiet hour and you have tested an assumption, not a robot.

### How do you shortlist which robots deserve a demo slot?

By rejecting, not by ranking. A robot that clears all five of these is worth demo time; a robot that fails any of them is worth deleting:

1. It opens one position at a time, with a hard cap in the code.
2. It sets a stop loss, and the stop distance adapts to volatility.
3. It produced at least 300 trades in your test, on the same symbol and period as the others.
4. Its drawdown stayed inside a loss you could hold without closing by hand.
5. It still made sense after you doubled the spread and added commission.

Five out of eleven will not survive that list. That is a good outcome — the shelf did its job, and it cost you an afternoon rather than an account.

## What can you learn from the backtest reports that ship with the repository?

Quite a lot, if you read them as a hypothesis and then try to reproduce them. Every expert in the collection arrives with a Test folder holding its backtest material and a short video walking through the strategy. Used well, that is a syllabus. Used badly, it is somebody else's marketing, and the difference is entirely in how you handle the assumptions.

The author's report tells you what a strategy did under his conditions: his broker's feed, his spread, his deposit, his date range, his tick modelling. It is not evidence about your account, and it never claimed to be. Before you look at the profit factor, find the assumptions listed on the report and write them down — symbol, timeframe, period, modelling quality, deposit. Those five lines tell you how much of the result is even comparable to your own run.

Then reproduce it. Take the same expert, the same version from the Build folder, the same symbol and the same period, and run your own test. Two things can happen. If your numbers land close to his, the strategy is at least not dependent on one particular data feed, and the harder question of costs is worth asking. If they diverge sharply, you have learned something important before spending a cent: the edge lives in a feed or a spread you do not have.

The videos are useful for a different reason. A video shows the strategy in motion, which is how you absorb its rhythm — how often it trades, how long it holds, how it behaves in the quiet hours between sessions. The report shows what that rhythm cost at the worst moment. Watch the video, then read the drawdown, and hold both pictures at once. Most disappointments in this market come from only ever doing one of the two.

Version numbers matter more than they look. A report belongs to a specific release, so if you test a different build from the one it describes, you are comparing two different systems and any conclusion you reach is about your own arithmetic. Match the version before you compare the numbers.

One further exercise is worth an hour: open the companion TradingView repository and read the Pine Script port of a strategy you have already read in MQL5. The same rules written twice is the fastest way to work out which parts of the logic were essential and which were translation detail. It also builds the skill that matters most here — reading a ruleset in a language you do not write fluently — which is exactly what makes a stranger's compiled robot feel less threatening.

## What decisions can you only see by reading the source?

Plenty, and they are the decisions that separate a robot you can live with from one that surprises you.

**Position sizing.** A fixed 0.01 lot behaves completely differently from a percentage-of-equity calculation, and both are common here. Look for how the lot value is computed and whether it changes after a loss.

**Whether losses are deferred.** Grid and martingale logic does not remove risk; it moves risk from realised losses into floating drawdown, where it is invisible until it is very large. The README says plainly that some of these experts use the grid technique. You can find out which ones in a few minutes by looking for a loop that opens additional orders as price moves against the first.

**Trade management after entry.** Break-even moves, trailing stops and partial closes are all optional, and each one changes the distribution of outcomes. A robot with no trade management has a different personality from one that locks in profit at twenty points, even if their entry rules are identical.

**Error handling.** Does the robot retry a rejected order, and does it check that `OrderSend` succeeded before assuming a position exists? Files that skip this look fine in a backtest and behave strangely when a broker rejects an order during a spike.

**Assumptions about your broker.** Stop level minimums, freeze levels, symbol suffixes and fill policies are all broker-specific. Reading the code tells you which of those assumptions the author baked in — and therefore how much re-testing you owe it.

**Execution assumptions.** A robot that assumes its order fills instantly at the price it requested is describing a market that does not exist under load. During a release the price you asked for is not the price you get. Reading the order code tells you how much slippage the author silently assumed, and therefore how much of the backtest's apparent edge actually belongs to the broker rather than to the strategy.

**How much of it is the author's own work.** These experts lean on custom indicators, several of which come from the wider MQL5 community. Reading the includes tells you which parts of the system the author wrote and which parts he is trusting.

None of that is visible from an equity curve. All of it is visible in about ten minutes with the file open in MetaEditor.

## What exactly do you get, and what does the licence allow?

You get a complete, legally usable teaching set: eleven expert advisors with their source, the indicators they need, the compiled builds, the backtest material, and the right to modify and share any of it. That last part is not a footnote. It is the difference between studying a robot and only watching it.

| Item | Detail |
|---|---|
| Name | geraked/metatrader5 — Trading Strategies for MetaTrader 5 |
| Author | geraked (credited in the README to Rabist) |
| Licence | MIT |
| Cost | Free — no licence fee, no paywall, no sign-up |
| Platform | MetaTrader 5 only |
| Contents | 11 expert advisors in MQL5 source, custom indicators, a Commitments of Traders include, compiled builds, per-strategy backtest material |
| Format | Readable `.mq5` source plus prebuilt `.ex5` files |
| Where it comes from | The original GitHub repository, linked in the download card above and in the sources below |
| Support | Community only — the README and the repository's issue tracker |

The licence is MIT, and we confirmed it against the repository's own LICENSE file, which carries a copyright notice for Geraked dated 2023 to 2024. In plain terms, MIT is the most permissive of the common open-source licences. You may use these experts commercially, modify them however you like, and redistribute them, including inside something you sell. The single condition is that the original copyright notice and licence text go with whatever you share. Unlike GPL, MIT does not require you to publish your own modifications — so a strategy you build on top of one of these can stay private.

That combination is unusual in this market. Most free expert advisors arrive as compiled files with an unclear licence and a request to join a Telegram channel. Here, the licence is stated, the source is present, and the only thing the author asks for in return is that you keep the notice attached.

### What does this collection not do?

- **It does not come as a finished product.** There is no vendor, no onboarding, no settings file tuned to your account, and no one to email when a trade goes wrong.
- **It does not make the grid strategies safe.** The README explicitly warns that grid logic adds significant risk. If you run one of those, you are accepting a drawdown profile the equity curve does not show you.
- **It does not ship presets for your broker.** Spread, commission, swap, execution speed and even symbol names differ between brokers. A parameter set that works on one feed is a different system on another.
- **It does not publish a verified live track record.** You get backtests, which are simulations. We have not traded these systems for you, and there is no audited account behind any of them.
- **It does not include MetaTrader 4 experts.** MQL4 and MQL5 are separate languages. If MT4 is your platform, this collection is not for you in its current form.
- **It does not remove the work.** Reading the code tells you what a robot decides. Only the tester at your costs, and then a demo account at your broker, tell you anything about the outcome.

## What should you do first?

Open the repository and pick three experts — one trend-following, one mean-reverting, one that uses a grid. Read those three files end to end before you compile anything. Look for the position cap in each. You will learn more in ninety minutes than from a month of screenshots.

Then run those three in the MetaTrader 5 Strategy Tester on the same symbol, the same period and the same date range, at your broker's real spread and commission. Keep the ledger from earlier in this page. If none of them survives a doubled spread, you have saved yourself a funded account's worth of tuition, and you have learned exactly why the shelf is more honest than a product.

Take the survivor to a demo account at the broker you actually intend to use, and log every trade for six to eight weeks before any real money is involved. Choosing that broker on execution quality rather than on a sign-up bonus matters more than most traders expect — our [forex broker comparison](/best-forex-brokers/) covers what to check, and spread consistency on gold belongs near the top of the list. If you would rather widen the reading list first, the [free MT4 and MT5 download library](/free-download-forex-ea-indicator/) has more readable material, and TeknoTrader's [open-source MQL4 indicators](/teknotrader-mql4-indicators-free-download/) are worth the same treatment. You can also browse the [free forex EA category](/category/free-forex-ea/) or our [MT4 EA round-up](/best-mt4-ea/) if you want to see how these designs compare as products.

Do not skip the reading step because the compiled file is faster. The whole point of a free, MIT-licensed collection is that you are allowed to look inside it. Download it, open one file in MetaEditor, and find the three lines that decide whether it takes a loss. That single habit is worth more than any robot on the shelf.

Trading forex and CFDs with leverage carries a high risk of losing money, and no automated system removes that risk. Some of these strategies — particularly the grid designs — can produce drawdowns far larger than a backtest curve suggests. Nothing on this page is financial advice, and no result here is a promise about your future. Test on demo data first, size positions so that a normal losing run is survivable, and only risk money you can afford to lose.
