---
title: "Forex Tester Online Backtesting: Separate Good EAs From Bad"
slug: "forex-tester-online-backtesting-with-eas-tutorial-the-ultimate-step-by-step-guide"
description: "Learn how to backtest an expert advisor in Forex Tester Online and the MetaTrader Strategy Tester, read the report honestly, and reject bad EAs on demo."
publishedAt: 2025-12-09T01:50:26.000Z
updatedAt: 2026-10-07T00:00:00.000Z
categories:
  - "MT4/MT5 Expert Advisors"
tags: []
quickAnswer: "A backtest of an expert advisor is only useful when it is honest. Load the EA in Forex Tester Online or the MetaTrader Strategy Tester, use tick data and a realistic spread, split the results by year, and stress the settings. You are looking for reasons to reject the EA, not a curve to believe in."
keyTakeaways:
  - "A backtest is a stress tool, not proof. Set it up to reject an expert advisor, not to confirm one."
  - "Match the data, spread, commission and symbol settings to your own broker before you believe any report."
  - "Read the report by drawdown, loss structure and trade count, not by the shape of the equity curve."
  - "Stress every result with wider spread, another data set and an out-of-sample period before you give it weight."
  - "Optimise on one period, verify on another, then forward test on demo with the exact settings file you plan to run."
faqs:
  - question: "Can I use a MetaTrader expert advisor in Forex Tester Online?"
    answer: "Sometimes, but not always. Some MetaTrader 4 and MetaTrader 5 expert advisors can be loaded or converted for Forex Tester Online, and some cannot. Check the vendor's own documentation for the formats it accepts, and remember that an MT4 build and an MT5 build are different files that must be tested separately."
  - question: "How many years of history should a backtest cover?"
    answer: "Cover enough history to include a trending market, a quiet range and at least one stressful event, which usually means several years or more. Data quality matters more than length. Ten clean years from your own broker beat twenty patchy years from a source you cannot verify."
  - question: "Is tick data necessary for a backtest?"
    answer: "For scalping robots and any logic that reacts to news, yes. Tick data shows how price actually moved inside a candle, while minute-level modelling guesses. If real tick history is unavailable, treat the result as weaker and lean harder on a forward test before risking capital."
  - question: "Why is my backtest result different from my demo result?"
    answer: "Spread, slippage, commission, swap and the data feed all differ between the two. A demo forward test also runs on a live feed with real spread behaviour, which the tester only models. Small differences are normal. Large or repeated gaps suggest the backtest was optimistic or the settings file differs from the one you ran."
  - question: "Should I optimise my expert advisor's inputs?"
    answer: "Only lightly. Optimisation searches for settings that fit one period, so the more you tune, the more you risk fitting the past rather than a real edge. Change a few meaningful parameters, keep to a broad plateau of decent settings, and verify on data the tuning never saw."
  - question: "Can I backtest more than one symbol at once?"
    answer: "MetaTrader 5 can test multi-currency expert advisors across several symbols in one run, while MetaTrader 4 tests one symbol per run. Forex Tester Online works with multiple symbols as well. Test each pair your EA trades, because strength on one symbol says little about another."
  - question: "What is the most important number in a backtest report?"
    answer: "There is no single number. Total profit and profit factor flatter a strategy that hides deep drawdowns, so look at equity-based drawdown, the longest losing streak and the biggest single loss together with trade count. A report you cannot survive is a report you cannot use."
  - question: "Where does the free checklist fit into this process?"
    answer: "It is the written record that sits beside the tester. You log where the file came from, the strategy in your own words, the five numbers you demanded, the honesty tests you ran, the demo protocol, the position-size worksheet, the red flags you found and your go or no-go decision."
sources:
  - label: "MQL5 Documentation — Strategy Tester"
    url: "https://www.mql5.com/en/docs"
  - label: "MetaTrader 5 Help — Strategy Tester and Automated Trading"
    url: "https://www.metatrader5.com/en/terminal/help"
  - label: "Myfxbook — Verified Trading Accounts"
    url: "https://www.myfxbook.com/"
  - label: "Investopedia — Backtesting and Drawdown"
    url: "https://www.investopedia.com"
primaryKeyword: "forex tester online backtesting"
download:
  origin: "own"
  license: "Free to use, print and share with credit to bestmt4ea.com"
  version: "1.0"
  fileKey: "resources/eurusd-ea-evaluation-checklist.pdf"
---

## Why does a backtest look perfect and still lose money live?

You load a robot into a tester, run a few years of history, and watch a tidy equity curve climb from left to right. The report says the strategy wins more often than it loses, profit factor looks healthy, and drawdown barely dips. You feel certain you have found something. You move the same robot to a live or funded account, and within weeks it is underwater, taking losses you did not see coming. The first thought is that the market changed. The more useful thought is that the test never told you the truth in the first place.

This is the trap at the centre of Forex Tester Online backtesting and every other simulator. A backtest answers the exact question you set up, using the exact data and assumptions you gave it. If you told the tester that spread stays tight, it believes you. If you fed it one broker's smooth history, it believes that too. If you tuned the inputs until the curve looked good, it happily reports a beautiful result built on the past repeating itself. The simulator is not lying. It is doing arithmetic on your assumptions, and your assumptions are usually kinder than the market.

Consider a trader who did everything by the book, or so he thought. He downloaded a EUR/USD scalper, ran a two-year test on minute data, and liked the row of winning months. He set up a demo challenge with the vendor's settings file and let it run. Every result he had seen assumed a spread that never moved. The first busy London open after a central-bank decision widened that spread several times over, his stop filled far from its trigger, and a stretch of losses consumed the buffer he had promised himself he would protect. The robot was not broken. The test was. Nothing in the process had asked the one question that mattered: what happens to this thing when conditions get ugly?

The cost of skipping that question is not just money. It is time you cannot get back and confidence you cannot fake. You second-guess every robot you meet, because your first one taught you that a good-looking curve means nothing. Traders who never learn this either give up on automation or keep donating to the market through the same three mistakes: no realistic costs, no out-of-sample check, and no forward test before real money.

Here is the direct answer this guide is built around. A backtest is a stress tool, not proof. You use it to find reasons to reject an expert advisor, cheaply and fast, before it ever touches capital. You test the way the robot will actually trade, you read the report for how it loses, and you treat demo forward testing as the real gate. If the robot survives honest pressure, you continue. If it does not, you saved yourself the account. The rest of this guide walks through the tools, the settings, the report, the honesty tests and the checklist that keeps the whole process honest.

## What is Forex Tester Online, and how is it different from the MetaTrader Strategy Tester?

Forex Tester Online is a browser-based backtesting simulator that streams historical price data so you or an expert advisor can trade it as if it were live. The MetaTrader Strategy Tester is the testing engine built into MetaTrader 4 and MetaTrader 5. Both replay history and both let an EA trade that history, so both are useful. They differ in where they run, which data they use and how closely they mirror live execution.

The MetaTrader Strategy Tester is tied to the terminal that hosts it. MetaTrader 4 tests one symbol per run and runs compiled MQL4 expert advisors, building its ticks from the symbol's minute history. It reports a modelling-quality figure that tells you how much of the price action was guessed between bars. MetaTrader 5 runs MQL5 expert advisors, can test multi-currency systems across several symbols in one pass, and can use real broker tick history when the broker provides it, which lifts the modelling quality far higher than minute-level interpolation.

Forex Tester Online works in your browser and ships its own data library, so it is not chained to your broker's downloaded history. That is convenient when you want to test an idea on a clean, consistent feed, and it also means you must check whether the vendor's data and spreads match your broker. Some MetaTrader expert advisors load or convert into it and some do not, so read the vendor documentation before you plan a test around it.

| Tool | Where it runs | Data it uses | EA format | Best suited to |
|---|---|---|---|---|
| MetaTrader 4 Strategy Tester | Inside the MT4 terminal | Your broker's downloaded history | Compiled .ex4 | Testing one MT4 EA against your own broker feed |
| MetaTrader 5 Strategy Tester | Inside the MT5 terminal | Broker history, with real ticks when available | Compiled .ex5 | Testing MT5 and multi-currency EAs at high modelling quality |
| Forex Tester Online | In a web browser | Vendor data library | Native or converted EAs | Testing ideas on a consistent feed outside the terminal |

Whichever you choose, hold onto the same idea. The tester models execution, it does not promise the fills you will get. Spread widens, orders slip, and a server can lag. Your job is not to find the most flattering simulator. It is to use the one you have honestly, then confirm the result on demo before you commit.

## What has to be right before you press start?

The single biggest cause of a misleading backtest is a setup that does not match how the EA will actually trade. Get these foundations right first, because no amount of report reading can rescue a test run on the wrong conditions.

Start with data. Longer is not automatically better; clean and varied is better. You want enough history to include a trending market, a quiet range and at least one stressful event, which is usually several years or more. Check the modelling quality the tester reports and be suspicious when it is low. If the source is your own broker, you are testing the feed you will trade, which is the closest match you can get. If the source is a third-party library, verify the spread and symbol specification before you trust the result.

Next, match the symbol. Contract size, minimum lot, tick value, digits and margin requirements all live in the symbol specification, and a mismatch quietly changes every position size and every result. Confirm the symbol you test matches the symbol you will trade, down to the suffix your broker adds to the pair name.

Then set realistic costs. Spread, commission and swap are not details you fix later; they are the headwind the strategy must beat. Set the spread to your broker's normal level and then test it again at a wider level. Add commission if your account type charges it, and make sure swap is applied. A strategy that only works with a spread you never see is not a strategy, it is an assumption.

Finally, match the account. Set a deposit and leverage that reflect the account you will actually run, and use the same account currency. A large demo deposit can make a dangerous position size look harmless. Before you compare brokers or account types, read the contract specification on your own platform, and use a [broker shortlist](/best-forex-brokers/) only to compare what those specifications usually look like.

| Setting | What to check | Why it changes the result |
|---|---|---|
| History range | Includes trends, ranges and one stressful event | A calm window flatters every strategy |
| Modelling quality | As high as the tester allows | Low quality guesses price between bars |
| Symbol specification | Contract size, lot, tick value, digits | Wrong spec distorts every position and profit figure |
| Spread and commission | Your broker's normal level, then wider | Cost is the headwind the edge must clear |
| Deposit and leverage | Match the real account, not a demo fantasy | Overstated size hides real risk |

## How do you load and configure an expert advisor for a backtest?

Loading an EA correctly is mechanical, but the details decide whether your test is valid. MetaTrader expert advisors come in two forms. MQ4 and MQ5 files are editable source code, and EX4 and EX5 files are the compiled builds the platform actually runs. Compiled files are what you will usually get, and source code is valuable because you can read the logic instead of guessing at it.

In MetaTrader, the expert advisor has to sit in the right folder before the terminal will see it: the Experts folder inside MQL4 for MetaTrader 4, or MQL5 for MetaTrader 5. Refresh the Navigator, confirm the EA appears, and check that automated trading is enabled both in the terminal and inside the tester, or the EA will simply do nothing while the run reports an empty result.

In the Strategy Tester, choose the expert advisor, the symbol and the timeframe, then set the dates, deposit and leverage. Pick the modelling method deliberately. Every-tick modelling is the most realistic but the slowest, minute-level OHLC is faster but guesses intrabar paths, and open-prices-only is useful for rough checks but useless for anything with tight stops. Visual mode is worth using once, because watching the EA trade teaches you more in ten minutes than a summary table does in an hour.

Then set the inputs, and write down exactly what you used. Lot size or risk percentage, stop and take-profit handling, trading hours, spread filter and news filter all belong in one recorded configuration. A result you cannot reproduce with a saved settings file is a result you cannot defend. Some expert advisors ship with documentation and some do not; if the inputs are a mystery, that is a finding in itself. A tutorial such as this [news straddle expert advisor walkthrough](/news-straddle-expert-advisor-setup-tutorial-the-ultimate-step-by-step-guide/) shows how much the surrounding discipline of a repeatable process matters.

## How do you read a backtest report without being fooled?

Most traders read the total profit first, which is exactly the number that hides the most. Read the report the other way round: start with how the strategy loses, how deep the pain goes and how long it lasts. A report is a description of risk before it is a description of reward.

Begin with drawdown. Look at the equity drawdown, not only the closed-trade balance drawdown, because equity includes open positions and shows the real hole the account sat in. Then look at how long the deepest drawdown lasted. A strategy that spends months underwater is harder to run than one that recovers quickly, even if both end on the same number.

Then examine the loss structure. What was the largest single loss, and how did it compare with the average win? How long was the longest run of consecutive losses? A high win rate with a handful of huge losses is a different animal from a lower win rate with steady small losses, and only the loss structure tells you which one you have.

Then check the sample. How many trades are in the result, and across which years? A handful of trades proves nothing, and a result built mostly on one quiet regime is fragile. Look for trades across trending and ranging conditions, and across the sessions the EA actually targets.

Finally, weigh the cost drag and the holding time. If a large share of gross profit disappears once realistic spread and commission are applied, the edge is thin. Average trade duration matters too, because long holds carry overnight swap and event risk while very short holds are the most sensitive to slippage.

| Metric | What it tells you | The trap |
|---|---|---|
| Equity drawdown | The real hole the account sat in, including open trades | A smooth balance line hides floating loss |
| Drawdown duration | How long you stay underwater | A deep, short dip is easier to hold than a shallow, endless one |
| Loss structure | Biggest loss and longest losing streak | A high win rate can mask a devastating tail |
| Trade count and range | Whether the sample is worth anything | Small samples and single regimes fit easily |
| Profit factor and expectancy | Reward per unit of risk, after costs | Both flatter strategies with hidden exposure |
| Average holding time | Sensitivity to swap and slippage | Very short holds are fragile on real fills |

Keep a short written record of your reading, because the mind remembers the curve and forgets the drawdown. A [trading journal template](/the-best-forex-trading-journal-template-excel-download-complete-guide-free-resources/) or a simple spreadsheet, used for the backtest as well as live trading, is enough to stop the highlights from overwriting the evidence.

## How do you stress a backtest until it tells the truth?

A backtest does not prove an expert advisor works. It proves the EA survives the conditions you chose to test. Your goal is to make those conditions harder and watch how the result bends. A sound idea degrades gracefully. A fitted idea collapses.

Start with cost stress. Re-run the exact same test with a wider spread and with slippage applied, then compare. If the edge disappears the moment fills get realistic, you have learned the strategy depends on assumptions you cannot rely on. Do the same with commission if your account charges it, because a scalper that trades often feels every fraction of cost.

Change the data. Run the same settings on a different data source, ideally your own broker's history, and see whether the result holds. If the outcome swings wildly when only the feed changes, the strategy is data-dependent rather than robust.

Split the result by time. Break the run into years and check each one rather than reading a single total. Then split by session, because a EUR/USD robot can look strong in quiet hours and weak during the active ones. Both splits show you where the strength and the risk actually live.

Reserve an out-of-sample period. Take the robot off the period you have been staring at, run it unchanged on a later stretch of history it never saw, and judge that. If it only shines on the window everyone shows you, you have found fitting, not an edge.

Read the trade list line by line. Look for growing size after losses, for an absence of stops, for long holds on losers and quick exits on winners, and for profit concentrated in a few unusual trades. A trade list is honest in a way a headline never is. Strategies built on grid or martingale sizing deserve the closest reading, so it is worth understanding how [grid trading risk](/10-powerful-grid-trading-ea-safe-settings-for-mt4-to-reduce-risk-and-boost-profitability/) behaves before you accept a smooth curve at face value.

| Stress test | What you change | What you learn |
|---|---|---|
| Wider spread and slippage | Costs on the same run | Whether the edge survives real fills |
| Different data source | History, ideally your broker's | Whether the result depends on the feed |
| Split by year and session | The reporting window | Where strength and weakness really sit |
| Out-of-sample period | A window the tuning never saw | Whether it is edge or fitting |
| Trade-list reading | Nothing, you just read it | How the EA behaves when it loses |

## How do you use optimization without curve fitting?

Optimisation sounds like progress. You let the tester search thousands of input combinations and pick the one with the best result. Used carelessly, it is the fastest way to turn an average strategy into a beautiful backtest that fails live, because the tester finds the settings that happen to fit that one stretch of history. The more parameters you let it adjust, the more room it has to fit noise.

Keep the number of parameters small and meaningful. Two or three values that genuinely change behaviour are sensible. A dozen finely tuned numbers are a warning sign, because the odds of them describing a real edge rather than a coincidence drop sharply. When you do optimise, look at the shape of the results, not just the single best combination. A broad plateau of decent settings suggests something real. A lone spike surrounded by poor ones suggests you have fitted the past.

Always verify on data the optimisation never touched. Optimise on an earlier period, then run the chosen settings unchanged on a later one. If the result holds up, confidence grows modestly. If it falls apart, the optimisation was describing history rather than preparing you for the future. This in-sample and out-of-sample split is the heart of honest testing, and it is the reason a walk-forward routine beats a single best-fit search.

Genetic and brute-force search modes make it easy to test enormous numbers of combinations, which is exactly why they are dangerous without discipline. The tool is fine. The temptation to trust its winner is the problem. Treat every optimised result as a hypothesis to be tested, never as a conclusion, and remember that a settings file tuned on a smooth market often behaves worst in the conditions that hurt most.

## Why is a backtest not enough on its own?

A backtest looks backwards at a fixed history. Live trading looks forwards at prices nobody has seen yet. That gap is why a backtest, however clean, is never the final word, and why every serious workflow ends with a forward test on demo. A forward test runs the EA on current prices as they arrive, so the market is unknown in advance and the developer cannot have tuned the entries to candles that had not printed.

Set the forward test up to match the backtest as closely as you can: the same platform version, the same broker, the same symbol and the same saved settings file. Change nothing during the run unless safety demands it, because a mid-test adjustment restarts the clock and the result no longer belongs to one configuration. Let the terminal run on stable hosting if you plan to trade that way, since a robot that needs to manage open trades will miss its exits the moment your computer sleeps.

Then compare the two honestly. Did spread widen in the EA's favourite minutes? Did slippage appear on exits? Did the robot respect its time and news filters? Did the deepest drawdown match the backtest's shape? Small differences are normal because demo fills are still simulated. Large or repeated mismatches tell you the backtest was optimistic or the settings file was not the one you thought.

If a live verified record exists, it carries real weight, but only when it is transparent and long enough. Verified tracking on a service such as Myfxbook ties trades to an account and shows deposits, withdrawals and open exposure, which you can check yourself. A short record, a tiny balance, frequent deposits or hidden open trades all weaken the signal. Studies of how accounts are compared side by side, such as the public [ranking hub](/top-ranking/), train your eye for what a complete record looks like. If you prefer to watch proven systems before committing, [copy trading](/copy-trading/) is another way to study live behaviour, but it is not a shortcut around testing your own setup.

## What does the free EA evaluation checklist contain?

The free download with this guide is a printable eight-section worksheet that keeps your backtesting honest from start to finish. It is a checklist you print and fill in, not software you install. Each page forces a specific decision in writing, so your conclusion rests on evidence instead of the feeling a nice curve leaves behind.

The eight sections follow the method above. Where the file came from records provenance: which version you tested, whether it targets MetaTrader 4 or MetaTrader 5, and who published it. Reading the strategy before the curve makes you describe the entry logic, the exit logic and the maximum exposure in your own words. The five numbers to demand captures the figures that reveal risk rather than reward. Testing a backtest for dishonesty records the data source, spread, slippage and out-of-sample runs you used.

The last four sections turn testing into a decision. A fixed demo protocol gives you daily rows for a forward test so behaviour and balance stay tied to one configuration. A position-size worksheet translates the strategy's exposure into a lot size your account can survive. The red flags page lists the hard stops that end a review early. The go / no-go gate closes the loop with a written verdict: either the EA earns a longer test, or it fails a named gate for a named reason.

Be clear about what the checklist is not, because honest limits matter more than a sales pitch. It does not trade for you. It does not predict the market or tell you which expert advisor to buy. It does not run a backtest or a forward test on its own; the simulator and the demo account do that. It does not replace MetaTrader, Forex Tester Online or your own judgement. It cannot make a weak strategy strong. What it does is stop a good process from being forgotten, and it gives you a written record to compare against when later results look different from the ones you remember.

| Field | Detail |
|---|---|
| Format | Printable PDF checklist |
| Sections | Eight, from provenance to go / no-go gate |
| Licence | Free to use, print and share with credit to bestmt4ea.com |
| Version | 1.0 |
| Best for | MT4 and MT5 traders evaluating any EA or indicator |
| Platform | None — it is a paper resource, not software |

Used properly, the checklist becomes a personal database. Every completed copy records one candidate, one configuration and one decision. Over time you learn which kinds of logic survive contact with real spread, slippage and session behaviour, and which merely looked good on a chart. That knowledge is worth more than any single download, and it is the reason the worksheets ask you to write rather than just tick boxes.

## What should you do next?

Pick one expert advisor, in MetaTrader or in Forex Tester Online, and run a single honest backtest this week. Match the data, spread and symbol to your own account. Read the drawdown and the loss structure before the profit. Stress the result with wider costs and an out-of-sample period. Then let it forward test on demo with the exact settings file you plan to run, and change nothing while it works.

Print the checklist before you start and keep it beside the tester. When the test ends, you will have a set of pages that explains what you tested, what you found and why you decided what you decided. That record is what protects you from the next smooth curve that quietly assumes conditions you will never get.

Download the checklist, work through the eight sections in order, and let your first decision be to reject anything that cannot survive honest testing. Rejection is not failure here. It is the entire point of testing, and it is how you keep capital out of the reach of a strategy that only ever worked on paper.

If you want to go deeper while you work, study how an [honest assessment of an EA](/eur-usd-expert-advisor-ea-overview-free-download-guide/) separates evidence from marketing, review how [loss control](/drawdown-reduction-ea-free-download-7-powerful-benefits-every-trader-must-know/) is managed on live accounts, and use [performance monitoring tools](/top-10-free-tools-for-mt4-ea-performance-monitoring-powerful-ways-to-track-improve-results/) to track your forward test the way a professional would.

> Trading foreign exchange on margin carries a high level of risk and may not be suitable for every reader. Prices can move sharply against open positions, leverage magnifies both favourable and adverse moves, automated systems can malfunction or disconnect, and historical simulations do not predict future performance. Test every strategy on demo first, size positions so a normal losing sequence cannot end the account, and never commit funds you cannot afford to lose.
