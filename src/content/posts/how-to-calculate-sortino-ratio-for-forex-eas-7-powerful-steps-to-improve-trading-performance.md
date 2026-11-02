---
title: "Sortino Ratio for Forex EAs: How to Calculate It"
slug: "how-to-calculate-sortino-ratio-for-forex-eas-7-powerful-steps-to-improve-trading-performance"
description: "Learn how to calculate the Sortino ratio for a forex EA in seven clear steps, read it against drawdown, and judge a robot before trusting it with real money."
publishedAt: 2026-11-02T00:00:00.000Z
updatedAt: 2026-11-02T00:00:00.000Z
categories:
  - "EA Settings & Optimization Guides"
categoryPaths:
  - "/category/mt4-mt5-expert-advisors/ea-settings-optimization/"
tags: []
primaryKeyword: "sortino ratio forex ea"
quickAnswer: "The Sortino ratio measures the average return of an expert advisor against the volatility of its losing trades only. Divide the average result per trade, minus your target, by the downside deviation of the results below that target. A higher figure means the EA earns more for each unit of bad volatility. Read it together with maximum drawdown and the number of trades, never on its own."
keyTakeaways:
  - "The Sortino ratio penalises only the downside, so big winning trades do not make a robot look riskier than it is."
  - "Calculate it from at least thirty closed trades, with each result expressed as a percentage of the account."
  - "A high Sortino from a short sample can disappear within a few months, so treat early numbers as provisional."
  - "Always read the Sortino alongside maximum drawdown, because a robot can have a good ratio and still deliver a deep fall."
  - "The calculator linked in this post computes the figure from a pasted list of results, so you can check any EA report yourself."
faqs:
  - question: "What is a good Sortino ratio for a forex EA?"
    answer: "There is no universal threshold. Compare the figure across robots tested over the same period and on the same data. A higher number is better only if the sample is large enough and the drawdown is acceptable to you."
  - question: "How is the Sortino ratio different from the Sharpe ratio?"
    answer: "The Sharpe ratio uses the total volatility of returns, both up and down. The Sortino ratio uses only the downside deviation, so it does not punish a robot for large winning trades."
  - question: "Can I trust an EA sold with a high Sortino ratio?"
    answer: "Not on its own. Sellers choose the period and settings that look best. Ask for the full trade list, test the robot on a demo account, and check the drawdown and the broker's real spreads."
  - question: "Where do I get the trade results to calculate it?"
    answer: "Use your own backtest report, a forward demo test, or your live account history. Export the closed trades, convert each result to a percentage of the balance at entry, and paste the list into the calculator."
  - question: "Does the Sortino ratio tell me the risk of ruin?"
    answer: "No. It describes how returns behaved in one sample. Risk of ruin depends on position size, the worst streaks and the account's cushion, so run a Monte Carlo test as well."
sources:
  - label: "MetaTrader 5 help: strategy tester and testing"
    url: "https://www.metatrader5.com/en/terminal/help/algotrading/testing"
  - label: "MetaTrader 4 trading platform help"
    url: "https://www.metatrader4.com/en/trading-platform/help"
installSteps:
  - name: "Open the metrics calculator"
    text: "Download the EA performance metrics file and open it in a spreadsheet app. The yellow cells are the inputs, and the metrics calculate from them."
  - name: "Paste your trade results"
    text: "Paste the percentage result of each closed trade into the Result column, in order. Set the target return per trade in the yellow cell, usually zero."
  - name: "Read the ratios with the drawdown"
    text: "Read the Sortino ratio alongside your maximum drawdown and trade count. A ratio from a short list of trades needs more data before you trust it."
download:
  name: "EA performance metrics calculator (Excel)"
  origin: "own"
  license: "Free for personal and educational use"
  licenseUrl: "https://bestmt4ea.com/disclaimer/"
  version: "1.0"
  fileKey: "downloads/ea-performance-metrics.xlsx"
  updatedAt: 2026-11-02T00:00:00.000Z
---

## Why does a robot with a good win rate still disappoint?

You bought an expert advisor after reading a report that showed a high win rate and a smooth equity curve. Three months later the account is down, and the robot has had a few bad weeks that the report never mentioned. The win rate was true. The report simply did not show how the losses were distributed, or how bad the worst stretch had been.

Many traders compare robots using one or two headline numbers. The most common are profit, win rate and maximum drawdown. Those figures matter, but they do not describe the quality of the returns on their own. The Sortino ratio adds a missing piece. It asks how much return the robot produces for each unit of harmful volatility, and it ignores the swings that work in your favour.

This post explains the Sortino ratio in plain terms, shows how to calculate it step by step, and gives you a calculator so you can check any EA report yourself.

## What does the Sortino ratio measure?

The Sortino ratio is a measure of return relative to downside risk. It takes the average return per trade, subtracts a target return, and divides by the downside deviation. The downside deviation is the typical size of the results that fall below the target. Results above the target do not enter that calculation.

That last point is what makes the ratio useful for trading. A robot that occasionally makes a large winning trade has a high total volatility, because big swings in either direction add to the spread of results. The Sharpe ratio counts both directions, so it can make such a robot look riskier than it feels to the trader. The Sortino ratio counts only the losses, which matches how a trader experiences risk.

The ratio is a comparison tool. A number on its own has no meaning. You use it to rank robots tested over the same period, on the same data, with the same assumptions. A robot with a higher Sortino than its competitors has, on that sample, earned more per unit of bad volatility.

## Why does downside matter more than total volatility?

Think about what you actually fear. You are not upset that a trade won forty pips more than you expected. You are upset when a losing trade costs more than you planned, or when a run of losses arrives together. Downside deviation captures that concern, while total volatility also counts the upside, which you usually welcome.

This does not mean the upside is irrelevant. A robot that wins large amounts occasionally can still be excellent, and the Sortino ratio will reflect that through a higher average return. The key difference is that the ratio does not treat a large winner as a sign of danger. It treats large losers as the danger they are.

Downside focus also helps when comparing strategies with different trade sizes. A scalper that makes many small wins and few losses may show a modest total volatility. A trend robot that makes rare large wins may show a higher total volatility. Sortino lets you compare how each one handles its losing trades, which is closer to what matters when you place real money on the line.

## How do I calculate the Sortino ratio step by step?

Start by gathering the closed trades. Use your backtest report, a forward demo test, or your live account history. You need the result of each trade, not the final balance. Convert each result into a percentage of the account balance at the time of entry, so trades of different sizes can be compared.

Next, choose a target return per trade. Many people use zero, which means any loss counts as downside. Some use a higher figure, such as the return they would get from a savings account per trade. Write the target down, because the ratio depends on it.

Then calculate the average result per trade. Add all the percentage results and divide by the number of trades. Subtract the target from that average. This gives you the excess return per trade.

Now find the downside deviation. For each trade, take the result if it falls below the target, and subtract the target from it to get a negative amount. Square each of those amounts, add them together, divide by the total number of trades, and take the square root. Trades that beat the target contribute zero to the sum, but they still count in the denominator, which keeps the measure fair.

Finally, divide the excess return by the downside deviation. The result is the Sortino ratio. The calculator in this post does these steps for you when you paste the results into the yellow column.

## What is a worked example?

Suppose a robot has ten closed trades, with results of 1.2, minus 0.5, 0.8, minus 0.6, 1.5, minus 1.0, 0.4, minus 0.3, 0.9 and 0.6 percent. The target is zero. The average result is 0.40 percent per trade. The results below zero are minus 0.5, minus 0.6, minus 1.0 and minus 0.3. Squaring them gives 0.25, 0.36, 1.00 and 0.09, which sum to 1.70. Divided by ten trades, that is 0.17, and its square root is about 0.41 percent.

The Sortino ratio is therefore 0.40 divided by 0.41, which is about 0.98. That number tells you the robot earned roughly one unit of average return for each unit of downside deviation, on this sample. Whether 0.98 is good depends on what other robots achieved on the same data and whether the drawdown suits you.

Notice what happens if you add one more big winner, say a 3 percent trade. The average rises and the downside deviation does not change, so the Sortino ratio rises too. Sharpe would also rise, but it would also rise in ways that include the upside volatility. The example shows why the downside measure fits the way traders judge a bad stretch.

## What does a high Sortino ratio not prove?

A high Sortino ratio does not prove that a robot will keep working. It describes one sample. Change the period, the broker, the spread or the market regime, and the figure can fall. Robots are often optimised until the sample looks excellent, and an optimised sample flatters the result. Test the robot on data it has not seen, and compare the figure to the out-of-sample result.

Sample size matters enormously. Ten trades can produce almost any ratio, because a single outlier moves the average and the deviation a great deal. Aim for at least thirty trades before you read the figure seriously, and prefer a few hundred if the strategy trades often. A ratio from a tiny sample is a rumour, not evidence.

The ratio also ignores the order of the losses. A robot that loses five trades in a row can show the same Sortino as one that spreads the same losses out, yet the first one can wipe out an account that cannot absorb the streak. That is why the drawdown, which measures the fall from a peak, must be read beside the ratio.

## How do I use Sortino alongside other measures?

Read the Sortino ratio with four other figures: the number of trades, the maximum drawdown, the average loss and the longest losing streak. Together they tell you whether the ratio reflects a steady strategy or a lucky sample. A high ratio with a deep drawdown and a long losing streak is a warning, not a recommendation.

Test the robot on a demo account to see the real behaviour. Use the [pip guide on this site](/what-is-a-pip-in-forex-simple-explanation-the-ultimate-beginner-friendly-guide/) to convert the results into dollars for your account size, so the figures become concrete. Then compare the demo results with the backtest, and note any gap in spread, fills or slippage.

Size the trades from a fixed dollar limit, not from the robot's own lot setting. The [risk-reward guide on this site](/how-to-calculate-risk-reward-ratio-in-forex-powerful-guide-for-traders/) explains how to do that. A robot with a good Sortino ratio can still cause damage if the lot size is too large for your account.

Compare robots only on fair terms. Use the same pair, the same period, the same spread assumption and the same starting balance. A robot tested on a calm month and another tested on a volatile year cannot be compared fairly, however good the ratios look.

## Which mistakes make the ratio misleading?

The first mistake is cherry-picking the period. A seller may show the best twelve months of a robot's history and hide the rest. Ask for the full record, and check that the period covers both calm and volatile markets.

The second mistake is ignoring costs. A backtest that uses zero spread and no commission can produce a far better ratio than real trading will. Add realistic spread and commission to your calculation, or use a demo account to measure them directly.

The third mistake is treating the ratio as a ranking of safety. Sortino measures return against downside volatility, and it says nothing about the chance of a catastrophic event. A robot can have a strong ratio and still be exposed to a rare shock that the sample never contained.

The fourth mistake is mixing gross and net results. If the sample is gross of costs, the ratio will look better than the account will experience. Confirm whether the figures are before or after costs, and recalculate with net results before you decide.

## How do I run a fair comparison of three robots?

Comparing robots is where most mistakes happen, because the figures are rarely produced under the same conditions. One seller reports a backtest from a trending year, another reports a live account in a quiet month, and a third shows a forward test with a different broker. Each ratio may be accurate for its own sample, and the three still cannot be ranked against each other.

Start by setting the rules of the comparison before you look at any numbers. Choose one pair, one period, one starting balance and one spread assumption. Use the same target return for all three robots, and the same definition of a closed trade. Write these conditions down. If a seller cannot match them, ask for a fresh test under your conditions rather than accepting their version.

Next, load the trade lists into the calculator, one robot per sheet tab. Read the Sortino ratio, the drawdown, the trade count and the longest losing streak for each. Put the four figures in a small table, so you can see the full picture. A robot with the highest Sortino might also have the longest losing streak, and that trade-off is what the table is meant to reveal.

Then check the sample size for each robot. A robot with eighty trades and a robot with twelve trades should not be ranked on the same scale. Give more weight to the robot with the larger sample, or ask the smaller one for more data before deciding. A ratio from a tiny sample tells you very little about the next year.

Finally, consider the cost of each approach. A robot that needs a fast VPS, a particular broker or constant monitoring may have a better ratio on paper but a higher real cost to run. The [VPS hosting guide on this site](/best-forex-vps-for-mt4-mt5-in-2026-low-latency-24-7-uptime-expert-advisor-hosting/) explains why server location and uptime can change the results you actually get.

## How often should I recalculate the ratio?

A ratio is not a fixed property of a robot. It changes as the sample grows and as market conditions shift. Recalculate it on a regular schedule, such as monthly for an active robot or quarterly for a slower one, and record each result in the same sheet. Watching the trend tells you more than a single snapshot.

When a new month of trades arrives, paste them into the calculator and read the updated figures. Look for three things. Is the ratio drifting down while the number of trades rises? Is the drawdown deepening? Is the average loss growing relative to the average win? Any of these can signal that the robot is behaving differently from the original sample.

Record the date of each recalculation, the number of trades and the settings used. This record makes it possible to see whether a change in the ratio came from the robot, the market or a change you made yourself. Many traders alter settings after a bad month and then cannot tell whether the change helped, because the record is missing.

Do not recalculate after every trade. A small sample moves violently, and daily checks encourage overreaction. Choose a schedule and stick to it, so the figures reflect a real trend rather than the noise of a few closed positions.

## What if the ratio falls after I start running a robot?

A fall in the Sortino ratio after launch is common. The original sample was usually optimised, and live conditions rarely match it exactly. Spreads widen at certain hours, news breaks the usual pattern and fills differ from the backtest. A drop from a high figure toward a more modest one is often normal, and it is not automatically a reason to abandon the robot.

The key question is whether the fall is within the range you accepted before you started. Write down, before launch, the minimum Sortino ratio and the maximum drawdown you would tolerate. If the live figures stay within those limits, continue and keep monitoring. If they breach either limit, pause the robot and investigate before you resume.

Investigate the cause. Check whether the spread has widened at the times the robot trades, whether the broker's execution differs from the test, and whether a single bad period has distorted the average. Separate the one-off shock from the structural problem, because they need different responses. A shock may pass, while a structural mismatch between the robot and the broker will not.

Avoid the urge to re-optimise the robot straight away. Changing settings to recover a ratio on recent data usually fits the new sample to noise, and the robot then performs worse in the future. Test any change on a demo account over a fresh period first, and compare the result with the original plan before you touch the live account.

If the ratio keeps falling despite these checks, reduce the lot size or stop the robot. Protecting capital is more important than defending a strategy you have already paid for. The [funding checklist on this site](/how-to-fund-a-forex-account-safely-10-powerful-steps-every-trader-must-follow/) includes a stopping rule that you can adapt for this purpose.

## How do stop losses and trade management change the ratio?

The Sortino ratio is only as honest as the trade results that feed it. A robot that uses a fixed stop loss, a trailing stop or a partial exit will produce a different set of results from the same signals, and the ratio will change with each rule. Before you compare figures, check how each robot manages its trades, because the management rules shape the downside distribution as much as the entries do.

A tight stop loss tends to produce many small losses. Those small losses add to the count below the target, but each one is modest, so the downside deviation can stay low. The ratio may look attractive while the robot is in a benign market. When volatility rises, the same tight stop can be hit more often, and the number of small losses grows, which lowers the ratio sharply. A wide stop does the opposite: fewer losses, each larger, so one bad trade can dominate the deviation.

Trailing stops and partial exits change the shape of the winners as well. A robot that locks in profits early may show a steady stream of small winners, which lifts the average but also compresses the upside. The ratio can look smooth, but the robot may have given up the large moves that make trend systems worthwhile. Compare the trade list by size, not just by count, to see whether the management is cutting off the good tail.

Check whether the robot uses a hard stop, a mental stop that closes the trade manually, or no stop at all. A robot without a hard stop can show a very high ratio for a long period, then deliver one large loss that the ratio only reflects after it happens. Ask for the stop rule in writing, and confirm that the trade list includes the full loss on any trade that was closed by a stop or a margin event.

Grid and martingale-style robots deserve particular care. They add to losing positions, so each losing trade is a cluster of exposures rather than a single trade. The reported trade count can understate the true risk, and the Sortino ratio can look high right up to the event that ends the account. For those robots, read the drawdown and the worst single sequence before you give the ratio any weight. The [blog index](/blog/) on this site lists further articles on how position adding changes risk, and this pattern needs extra caution.

Finally, consider how the broker's execution changes the trades. Slippage on a stop, a delayed fill or a requote can turn a planned loss into a larger one, and the backtest may not show it. Compare the average realised loss with the planned stop distance on demo. If the realised loss is consistently larger, the ratio from the backtest is too optimistic, and you should recalculate with the live figures.

The practical conclusion is simple. The ratio measures the shape of the results, and the rules that produce those results matter as much as the ratio itself. Read the robot's stop, exit and add-on rules first, then calculate the figure, and finally check the figure against the rules. A high ratio that comes from a rule you do not understand is a number you cannot trust. When you write the rules into your notes, add one line for each rule that states what happens in a fast market, a wide-spread hour and a broker requote. Those three situations expose most of the gaps between a backtest and a live account, and they take only a few minutes to check on a demo account before you commit any money. Keep those notes next to the calculator, so each new report is read against the same checklist. Reviewing the same three questions every time keeps the comparison consistent, even when the reports arrive in different formats.

## What is the offer in this guide?

The offer is a free Excel calculator for performance metrics. You paste the percentage result of each closed trade into one column, set the target return, and the sheet calculates the average result, the standard deviation, a Sharpe-style ratio, the downside deviation and the Sortino ratio.

Here is what it gives you:

| Feature | What it does | Limit |
|---|---|---|
| Trade result column | Holds up to sixty closed trade results as percentages | Results must be entered by you, in the same order |
| Target input | Sets the threshold below which results count as downside | Changing the target changes the ratio, so note the value you used |
| Average and deviation | Calculates mean and standard deviation of the results | Requires at least two trades for the deviation |
| Sharpe-style ratio | Gives the total-volatility comparison for reference | Not the same as a full Sharpe ratio with a benchmark rate |
| Sortino ratio | Divides excess return by downside deviation | Only as reliable as the sample you enter |

The calculator does not download trades from your platform, and it does not test a robot for you. It does not account for drawdown, which you must read separately from your report. Use it to check the numbers in any report you receive, and to track your own robot over time.

Keep the sheet with your journal, and update it each month with the new closed trades. Watching the ratio change over time shows whether the robot is still behaving as it did in the original sample.

## How do I check an EA report this week?

Ask the seller, or open your own test report, and find the full trade list. Export the closed trades if the platform allows it, or copy the results from the report table. Convert each trade into a percentage of the account balance at entry, and paste the values into the calculator.

Read the Sortino ratio, the drawdown, the number of trades and the longest losing streak. Write down whether the sample is large enough to trust. If it is not, schedule a forward demo test of at least thirty trades, and repeat the calculation afterwards.

Once you have the numbers, compare them with the risk limit you wrote for your account. A robot that meets your return target but breaks your drawdown limit is not suitable, however good the Sortino looks. The ratio is one tool in the decision, not the decision itself.

For more background on the platform tools that generate these reports, the [blog index](/blog/) on this site lists related articles, and the [expert advisor directory](/best-forex-ea/) shows the robots reviewed here. Read the figures carefully, test on demo, and only then decide whether a robot belongs on a live account.
