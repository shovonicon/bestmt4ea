---
title: "Monte Carlo Test for MT4 Backtests: A Robustness Guide"
slug: "monte-carlo-test-for-mt4-backtesting-the-complete-robustness-guide-for-traders"
description: "Learn how a Monte Carlo test reshuffles your MT4 backtest trades to reveal drawdown risk, then use the simulator to stress-test an EA before any live money."
publishedAt: 2026-11-02T00:00:00.000Z
updatedAt: 2026-11-02T00:00:00.000Z
categories:
  - "EA Settings & Optimization Guides"
categoryPaths:
  - "/category/mt4-mt5-expert-advisors/ea-settings-optimization/"
tags: []
primaryKeyword: "monte carlo test mt4 backtest"
quickAnswer: "A Monte Carlo test takes the closed trades from one backtest and reshuffles their order many times, then measures the range of drawdowns those orders could produce. The test does not change the average result. It shows how bad a losing streak could get from the same trades. Use it to check whether an EA's drawdown is a fair picture or a lucky ordering of results."
keyTakeaways:
  - "A single backtest shows one order of trades, and the order of losses changes the drawdown you would have lived through."
  - "Monte Carlo reshuffles the same trades many times, so you see a range of drawdowns instead of one number."
  - "Read the worst-case drawdown at the 95th percentile, not only the average, when you size your account."
  - "The test cannot fix an EA with a weak edge, and it does not predict the future."
  - "The simulator linked in this post runs fifty reshuffles on a list of trade results, so you can test your own robot."
faqs:
  - question: "What is a Monte Carlo test in trading?"
    answer: "It is a method that reorders or resamples a set of past trades many times and measures the spread of outcomes. In trading it is used mainly to estimate how deep a drawdown could get from the same trades in a different order."
  - question: "Does Monte Carlo change the profit of my EA?"
    answer: "No. Reshuffling the trades keeps the same total and average result. It changes the path, so it changes the drawdown and the ending balance a particular run reaches."
  - question: "How many runs should I use?"
    answer: "A thousand runs gives a stable picture in a dedicated tool. The simulator in this post runs fifty, which is enough to see the shape of the spread, but use more runs in a professional tool for a final decision."
  - question: "Can Monte Carlo prove an EA is safe?"
    answer: "No. It is a stress test on the trades you already have. An EA can pass the test and still fail when market conditions change, so combine it with forward demo testing and a strict risk limit."
  - question: "Where do I get the trade list from my MT4 backtest?"
    answer: "Open the Strategy Tester report, use the results or the history tab to list each closed trade, and convert each result to a percentage or R multiple. Paste the list into the simulator."
sources:
  - label: "MetaTrader 4 trading platform help"
    url: "https://www.metatrader4.com/en/trading-platform/help"
  - label: "MetaTrader 5 help: strategy tester and testing"
    url: "https://www.metatrader5.com/en/terminal/help/algotrading/testing"
installSteps:
  - name: "Open the simulator"
    text: "Download the Monte Carlo drawdown simulator and open it in a spreadsheet app. The starting balance and risk per trade are the yellow inputs."
  - name: "Paste your trade results"
    text: "Paste the R multiple of each closed trade into the trade column. Use +1 for a full-risk win, minus one for a full-risk loss, or your own multiple."
  - name: "Read the drawdown spread"
    text: "Look at the drawdown column across the fifty runs. Note the worst result, then size your account so that a bad run stays inside your loss limit."
download:
  name: "Monte Carlo drawdown simulator (Excel)"
  origin: "own"
  license: "Free for personal and educational use"
  licenseUrl: "https://bestmt4ea.com/disclaimer/"
  version: "1.0"
  fileKey: "downloads/monte-carlo-drawdown-simulator.xlsx"
  updatedAt: 2026-11-02T00:00:00.000Z
---

## Why can the same backtest look safe and still ruin an account?

You run a backtest on an MT4 expert advisor and the report looks calm. The equity curve rises with few sharp falls, the maximum drawdown is modest and the profit factor is comfortable. You feel ready to trade it. Then a live stretch arrives with the same robot, the same settings and no obvious change in the market, and the account falls much further than the report ever showed.

The report did not lie. It showed one ordering of the trades. The same closed trades, arranged differently, can produce a far deeper drawdown, because a cluster of losses may arrive together in one order and be spread out in another. A single backtest cannot show you the alternatives, and that is the blind spot a Monte Carlo test is designed to fill.

This guide explains the idea in plain terms, shows how to run the test on your own backtest results, and gives you a simulator so you can stress-test an EA before you trust it with money.

## What is a Monte Carlo test, in plain words?

A Monte Carlo test is a way of asking what else could have happened with the same ingredients. You take the trades a robot produced in its backtest, treat each trade result as a unit, and shuffle the order many times. Each shuffle produces a new equity path with the same trades, the same total profit and the same average result. The difference is the sequence.

Because each shuffle is a different path, each one produces a different maximum drawdown. Run the shuffle many times and you get a spread of drawdowns instead of a single number. That spread is the information you want. It shows how bad the sequence could have been, and how often a bad sequence appears among the possible orders.

The name comes from the random sampling used to explore possible outcomes, a method that has been used in many fields long before trading. In this context it is simple, and you do not need advanced mathematics to use it. You need the list of trades and a way to reshuffle them.

## Why does trade order matter so much?

Think about a robot with ten trades, six winners and four losers. Suppose the losers come one after another in the middle of the sequence. The account falls steadily for four trades and then recovers. Now suppose the same four losers are spread out with winners between them. The account dips and recovers several times, and the deepest fall is much shallower. The total result is identical. The experience is not.

Real markets do not deliver trades in a neat order. A bad month can produce several losers together, because the same condition, such as a trend reversal or a volatility spike, affects many trades at once. A backtest that happens to contain a calm sequence will show a shallow drawdown, even if the strategy is exposed to clusters in real life. Monte Carlo helps you see that exposure without waiting years for the cluster to arrive.

The effect is larger with bigger position sizes. A deep drawdown in percentage terms can wipe out an account that cannot absorb the fall, and that depth depends on the order of the losses. Read the drawdown spread rather than the single figure, and size the account so that the bad end of the spread stays inside your loss limit.

## How do I prepare the trade list from an MT4 backtest?

Start with the Strategy Tester in MT4. Run the test on the pair, timeframe and period you want to check, with a realistic spread and a fixed lot or a fixed risk setting. When the test finishes, open the report and find the list of closed trades. Some versions show them in the results tab, and others let you export the report.

Convert each closed trade into a common unit. The simplest is an R multiple, where a full-risk loss is minus one and a win equals the reward divided by the risk. You can also use a percentage of the balance at entry. Either works, as long as every trade uses the same method. Mixing fixed lots with percentage risk will distort the test.

Check the list for completeness. Make sure the number of trades matches the report summary, that no trades are missing from the export, and that the results are in the order the trades closed. A list with missing trades will give a misleading spread, however carefully you reshuffle it.

Then paste the results into the simulator's trade column. The yellow inputs are the starting balance and the risk per trade, which convert the R multiples into money. Set them to match the account you plan to use, not the account that ran the backtest, if the two differ.

## How do I read the simulator output?

The simulator runs fifty reshuffles of your trade list, each drawing sixty results with replacement. For each run it calculates an ending balance and a maximum drawdown. The sheet shows the drawdown for every run, so you can see the spread rather than a single figure.

Sort the drawdown column from smallest to largest and look at the worst results. In a fifty-run sample, the worst few values give you a rough sense of the bad end of the range. A professional tool would use a thousand or more runs for a steadier picture, but fifty is enough to see whether the spread is narrow or wide.

Compare the worst drawdown with your risk limit. If the bad end of the spread is deeper than you can accept, the robot is either too aggressive for the account or too exposed to clusters. Reduce the risk per trade, or choose a different robot, and run the test again.

Remember that the simulator samples with replacement. That means some trades appear more than once in a run and others not at all, which is a different experiment from a pure reshuffle. The aim is still the same: to see how much the outcome depends on sequence. A reshuffle without replacement gives a similar picture when the sample is large, and professional tools often offer both methods.

## What does Monte Carlo not tell me?

A Monte Carlo test does not change the strategy. It cannot turn a weak edge into a strong one, and it cannot remove the risk of a losing period. If the backtest average is poor, the reshuffles will show poor averages in every path. The test answers a narrower question: given these trades, how much could the sequence matter?

It also does not predict the future. The trades in your backtest are a sample of past conditions. A market regime change, a new spread regime or a broker difference can produce a different set of trades, and no reshuffle of the old set can anticipate that. Use the test to understand the shape of the risk, not to forecast the next month.

Finally, the test depends on the quality of the trade list. If the backtest used unrealistic spread, no slippage and perfect fills, the trades will flatter the robot, and the reshuffles will flatter it too. Use a realistic spread assumption, and confirm the results on a demo account before you commit money.

## How does Monte Carlo fit with other robustness checks?

Monte Carlo is one step in a sequence of checks. Start with the backtest on the full history, then test the robot on a period it was not optimised on. Next, run a forward demo test for at least a month, and compare the results with the backtest. Finally, use the Monte Carlo spread to set the account size and the risk limit.

The forward test is essential because it checks the robot against conditions the backtest did not see. A robot that passes the Monte Carlo test but fails the forward test is not robust, however neat its reshuffles look. Keep the forward test separate from the optimisation, so the result is honest.

Read the [Sortino ratio guide on this site](/how-to-calculate-sortino-ratio-for-forex-eas-7-powerful-steps-to-improve-trading-performance/) alongside this post. The Sortino ratio measures the quality of the downside, and the Monte Carlo spread measures how that downside could arrange itself over time. Together they give you a better picture than either one alone.

If you use an expert advisor from the [directory on this site](/best-forex-ea/), check that the reviewed figures match your own tests before you rely on them. A review shows one author's sample, and your own runs are the evidence that counts for your account.

## How do I size an account from the spread?

Start from the worst drawdown you can tolerate. Suppose you accept a maximum fall of twenty percent of the account. Look at the bad end of the Monte Carlo spread, for example the worst five percent of runs, and see whether its drawdown is inside that limit at your planned risk per trade.

If the bad end is too deep, reduce the risk per trade and run the simulator again. The drawdown scales with the risk, so halving the risk roughly halves the depth of the fall in each run. Keep reducing until the worst runs fit inside your limit, then choose the size that leaves you with a comfortable margin for error.

Do not size the account from the average run. The average tells you the typical outcome, but the account must survive the bad end of the range. A robot that looks profitable on average can still destroy an account if the bad sequence arrives early, before the balance has grown enough to absorb it.

Write the chosen risk level and the worst-case drawdown in your journal. When live results arrive, compare them with the spread. If the live drawdown falls outside the range the simulator predicted, the robot is behaving differently from the test, and you should pause and investigate before you continue.

The [risk-reward guide on this site](/how-to-calculate-risk-reward-ratio-in-forex-powerful-guide-for-traders/) explains how to convert a dollar risk into a lot size, which is the step that follows the Monte Carlo sizing. Use both guides together, so the account size and the trade size agree.

## What mistakes make the test misleading?

The first mistake is testing a single short period. A year of trades can look excellent in a trend and then show a different picture in a range. Include several market conditions in the trade list, and check whether the spread changes between them.

The second mistake is running the test on an optimised result. If you tuned the settings until the backtest looked best, the trade list reflects that tuning, and the reshuffles inherit the bias. Test on data the optimisation did not use, or accept that the Monte Carlo result is optimistic.

The third mistake is ignoring the tail. A spread that looks narrow in the middle can still hide a catastrophic run at the far end. Always read the worst results, not only the median or the average.

The fourth mistake is changing the simulator inputs to get a better answer. Keep the risk per trade and the starting balance fixed when you compare robots, and record any change you make, so the comparison stays fair.

## What does a bad sequence look like in practice?

Numbers in a table are abstract until you picture the account going down. Imagine a robot with a sixty percent win rate and a reward-to-risk ratio of about 1.5 to 1. On paper it is profitable, and the backtest shows a comfortable equity curve. Now picture the losing trades arriving together, as they often do when a trend turns against the strategy and stays against it for several weeks.

Suppose the account risks one percent per trade. Five losses in a row cost about five percent of the balance. Eight losses in a row cost about eight percent. The account is still intact, but the trader has watched the balance fall for a month, and many people change their behaviour at that point. They skip signals, double the size to recover, or switch the robot off just before the next winning stretch.

The Monte Carlo spread shows how often such a run appears among the possible orderings of the same trades. In a sample where the losses are scattered, the worst run may be a fall of ten percent. In a sample where a cluster exists, the worst run may be a fall of twenty percent or more. The average trade result is the same in both cases, which is why an average-only report never reveals the difference.

Human reactions amplify the damage. A deep drawdown tempts the trader to increase size, because the recent losses feel like a debt to repay quickly. That increase turns an ordinary cluster into a serious event. A Monte Carlo result that shows the bad end of the spread gives you a number to plan around before the cluster arrives, so the response is decided in advance rather than in the middle of the fall.

Write the worst-case drawdown from the simulator in your journal before you go live. Add a line that says what you will do if that level is reached, such as reducing the size by half or pausing the robot for a review. A written response is much easier to follow than a decision made while the balance is falling.

## How do correlated pairs change the spread?

Many robots trade several pairs at once, and some pairs move together. EURUSD and GBPUSD often rise and fall in the same direction, while EURUSD and USDCHF often move in opposite directions. When pairs are correlated, a single market move can trigger losses across several positions simultaneously, and that clustering is exactly what a shuffled trade list can miss.

A Monte Carlo test on a combined trade list treats each trade as independent. In reality, a run of losses across correlated pairs may be far more likely than the test assumes. The reshuffles can therefore understate the bad end of the spread for multi-pair robots. Check the correlations between the pairs your robot trades, and consider the test a lower bound on the risk rather than an upper one.

One practical step is to run the test separately for each pair, and then for the combined list. If a single pair produces a much deeper spread than the others, that pair is the concentration of risk, and you may decide to remove it or reduce its size. If the combined list is much worse than the sum of the individual results, correlation is probably adding risk that the individual tests do not show.

Watch for hidden correlation across robots as well. Two different robots on the same account may both be long the same currency at the same time. Each robot's trade list can look safe on its own, while the account carries a concentrated exposure. Combine the lists from all robots on the same account, and run the test on the combined sequence, to see the real exposure.

The [market session guide on this site](/how-does-the-forex-market-work-explained-simply-the-ultimate-beginners-guide/) explains why certain pairs tend to move together in particular hours. Use that background when you judge whether a cluster in the trade list is likely to recur in live trading.

Correlation is not a reason to avoid multi-pair robots. It is a reason to measure the combined risk honestly and size the account for it. A robot that trades several pairs with low correlation can have a smoother spread than a single-pair robot, and the test will show you that benefit if the trade list includes the pairs together.

When you present the results to yourself, state which assumption you made about correlation. Write down whether the combined list was tested as independent trades or as a joint sequence. That note makes the result honest and tells you when to be more cautious.

## How often should I rerun the test as the trade list grows?

A Monte Carlo result depends on the trades you feed it, so it changes as the list grows. A list of thirty trades gives a rough spread, and a list of three hundred gives a steadier one. Each new block of live or forward trades is new evidence about the robot, and the test should be repeated when that evidence arrives.

Set a schedule. For an active robot, rerun the test each month with the closed trades from that month added to the list. For a slower robot, a quarterly rerun may be enough. Keep the schedule simple so you actually follow it, and record the date, the number of trades and the worst drawdown from each run in one sheet.

Compare the new spread with the previous one. If the bad end has grown noticeably while the average has held, the robot is producing deeper clusters than it did before. That change may come from the market, from a shift in spread or from a change in how the robot manages trades. Investigate the cause before you decide what to do.

Be careful with reruns that follow a bad month. A trader who reruns the test only after a loss, and then changes the risk because the spread looks worse, is reacting to noise. Keep the schedule fixed so the reruns are not triggered by emotion. A fixed schedule is the safeguard against changing the plan for the wrong reason.

Do not rerun the test after every trade. A few trades move the spread a great deal in a small sample, and frequent reruns encourage overreaction. The monthly or quarterly rhythm gives the result enough time to mean something.

When a robot has traded for a year or more, the sample is large enough to be informative. Check whether the spread from the early trades still matches the spread from the recent trades. If it does, the robot is behaving consistently. If the spreads have drifted apart, the robot is changing, and you should treat its historical test with less confidence.

Keep the history of reruns with the robot's settings. If you change a setting, record the change and the date, then compare the spread before and after. Without that record, you will not know whether an improvement came from the setting or from a favourable run of trades. Store each rerun as a separate row, with the settings version beside it, so the history can be read at a glance. A simple note on why each rerun happened, whether scheduled or prompted, keeps the record honest.

## What is the offer in this guide?

The offer is a free Excel Monte Carlo drawdown simulator. You paste the R multiple of each closed trade, set the starting balance and risk per trade, and the sheet runs fifty reshuffles, each drawing sixty results with replacement. It shows the ending balance and maximum drawdown for every run, so you can see the spread.

Here is what it gives you:

| Feature | What it does | Limit |
|---|---|---|
| Trade column | Holds up to sixty trade results in R multiples | You must enter the results yourself |
| Balance and risk inputs | Convert R multiples into money and percentages | Assumes a fixed risk per trade |
| Fifty runs | Produces a spread of ending balances and drawdowns | A professional tool would use more runs |
| Drawdown column | Shows the fall from peak for each run | Measures the maximum fall only, not the time taken |
| Recalculation | Re-runs the sample each time you press F9 | Each press gives a new random sample |

The simulator does not read your MT4 report automatically. It does not model slippage, spread changes or correlated losses across pairs. It does not replace a forward test, and it does not tell you whether the robot will work in the future. It is a stress test on the trades you already have.

Use it to see the range of outcomes, and to choose a risk level that keeps the worst runs inside your limit. Keep a copy with each robot you test, so you can compare the spreads later.

## How do I run this test this week?

Choose one robot and run its backtest on a period of at least two years, with a realistic spread. Export or copy the trade list, convert each trade to an R multiple, and paste the values into the simulator. Press F9 a few times and note the range of worst drawdowns.

Compare the bad end of the spread with your loss limit. If it fits, plan a forward demo test for at least four weeks, with the same risk per trade. If it does not fit, reduce the risk, or set the robot aside and test another one. Record the result in your journal before you decide.

Once the forward test matches the backtest closely, consider a small live account, with the risk level you chose. Keep the Monte Carlo sheet with your records, and compare the live drawdown with the spread every month. A test is only useful when it stays connected to what happens in your account.
