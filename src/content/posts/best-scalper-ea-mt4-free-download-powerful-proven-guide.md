---
title: "Scalper EA MT4 vetting guide: avoid hidden drawdown"
slug: "best-scalper-ea-mt4-free-download-powerful-proven-guide"
description: "Vet a scalper EA on MT4 before it touches real money: read the logic, check the drawdown, stress-test grid or averaging risk and run a strict demo first."
publishedAt: 2026-02-13T19:23:50.000Z
updatedAt: 2026-10-08T00:00:00.000Z
categories:
  - "Free Forex EA"
tags: []
quickAnswer: "A scalper EA on MT4 is only worth running after it passes a risk-first check: you can explain its logic, you have verified how it draws down, you know whether it hides grid or averaging exposure, and a structured demo test confirms it behaves as described. If any step fails, reject it. The free printable worksheet with this guide helps you stress-test that drawdown."
keyTakeaways:
  - "Never attach a scalper EA to a live or funded account before you can explain, in plain language, how it enters, how it limits losses and how many positions it can hold."
  - "A small stop on every trade and a basket that averages into losses are two different risks, so check the position list for grid, averaging or martingale behaviour before you trust the label."
  - "Spread, slippage and uptime quietly decide whether a high-frequency strategy keeps its edge, so judge any robot on costs and execution, not only on its signals."
  - "Ask for drawdown depth over time, peak exposure, trade sample, cost sensitivity and loss structure, then refuse any offer that answers with screenshots instead of files."
  - "Stress-test the floating drawdown with your own lot sizes and settings, then run a fixed-configuration demo before a small, carefully sized live probation."

faqs:
  - question: "What is a scalper EA on MT4?"
    answer: "It is a program that runs inside MetaTrader 4 and opens, manages and closes trades automatically using rules coded by its developer, usually aiming to capture small and frequent moves. It follows its logic on every new tick, so you must understand that logic before you let it trade your account. It does not think like a human, and it cannot judge when its rules no longer fit the market."
  - question: "Is a free scalper EA safe to use?"
    answer: "It can be, but only after you test it on a demo account and understand its exposure. A free download carries no less risk than a paid one, and the price tells you nothing about quality. Check where the file came from, scan it, confirm the correct MetaTrader build, and run it on demo before any live money is involved."
  - question: "How do I know if a scalper EA is really a grid or martingale system?"
    answer: "Look at the position list, not the label. If the robot can hold several positions at once, adds to a losing trade, or increases size after a loss, it is using grid, averaging or martingale logic. Those designs can carry deep floating drawdown, so judge them with a drawdown stress test before you trust the margin."
  - question: "Why does spread matter so much for scalping?"
    answer: "Scalping targets tiny price moves, so the cost of entering and leaving takes a large share of each trade. Averages hide the spikes that appear around news, rollover and thin liquidity. If a robot trades through those minutes, its real cost is higher than its backtest assumed, and the edge can disappear."
  - question: "Do I need a VPS to run a scalper EA?"
    answer: "You do not strictly need one, but automation that depends on constant uptime is more reliable on a virtual private server, usually called a VPS. If your computer sleeps or loses its connection while the robot is managing open positions, that management stops with it. A VPS keeps the terminal online when your own machine is not."
  - question: "How long should I demo test a scalper EA?"
    answer: "Run a fixed configuration for at least two weeks and change nothing unless safety demands it. You want enough trades across quiet and active sessions, and at least one difficult period, before you judge behaviour. If trade frequency is low, extend the test rather than guessing from a small sample."
  - question: "What does the free worksheet include?"
    answer: "It is a printable stress-test worksheet for grid and averaging systems. You use it to record an adverse move, the orders the strategy would add, the floating drawdown that builds, and the point where the account would break. It is a resource, not software, so there is nothing to install, and it makes no claim about results."
  - question: "Can a scalper EA lose money even if it is well made?"
    answer: "Yes. Losses are possible on any trade, and past behaviour does not predict future results. Spread, slippage, disconnects and changes in the market can turn a strategy that worked in testing into one that struggles live. Position sizing, a demo first and honest limits are how you keep a normal losing run from becoming an account-level event."
sources:
  - label: "MQL5 Documentation"
    url: "https://www.mql5.com/en/docs"
  - label: "MetaTrader 5 Help - Strategy Tester and Automated Trading"
    url: "https://www.metatrader5.com/en/terminal/help"
  - label: "Investopedia - Risk Management"
    url: "https://www.investopedia.com/terms/r/riskmanagement.asp"
primaryKeyword: "scalper ea mt4"
download:
  origin: "own"
  license: "Free to use, print and share with credit to bestmt4ea.com"
  version: "1.0"
  fileKey: "resources/grid-ea-drawdown-stress-test.pdf"
---

## Why does a scalper EA look unbeatable until it meets a real account?

A scalper EA for MT4 is sold to you as speed. It opens and closes trades in minutes or seconds, it never sleeps, and it never hesitates. Then you attach it to a real account and the picture changes inside a week. Spread widens at the exact moment the robot wants to enter. The fill arrives a fraction late. The first losing day becomes a second, and the position list that looked clean on a demo now shows several trades open at once, all leaning the same way. You are no longer watching a strategy. You are watching exposure you did not understand.

Here is the uncomfortable part. Most people who download a scalper EA never ask what happens when it is wrong. They ask what it returns. That one question hides the whole risk. A robot can win nine trades in a row and still end your account on the tenth, if the tenth is large enough, or if nine small wins are followed by one basket that keeps adding positions while price runs against it. The curve on the marketing page is a summary. The exposure behind it is the story.

Picture a common scenario. A trader finds a scalper EA that runs on the one-minute chart of EUR/USD. The vendor page shows a rising line and a small drawdown figure. The trader funds a modest balance at a broker that advertises tight spreads, leaves the terminal open on a laptop, and lets the robot run. For four days the account creeps upward. On the fifth day a central bank headline lands, the spread on EUR/USD jumps, and the robot does exactly what its code says. If that code opens one trade with a hard stop, the day is a scratch, maybe a small loss. If that code averages into the move or stacks a grid, the floating loss grows while the trader sleeps, and the margin call arrives before the spreadsheet ever did.

The cost of not understanding this is not abstract. It is a funded challenge failed on day five. It is a withdrawal you cannot make. It is a lesson about leverage you paid for in full. The worst part is that none of it required a bad robot. It only required a robot you never vetted.

So the goal here is narrow and practical. Before you trust a scalper EA on MT4, you will learn what it actually does, why scalping punishes poor execution, how to spot grid and averaging logic hiding under a "scalper" label, which numbers reveal the real risk, and how to stress-test the drawdown those systems can create. You will also get a free printable worksheet built for that last step: a grid and averaging drawdown stress test you fill in by hand.

One warning before we start. Nothing here predicts what any robot will do next. Past behaviour does not repeat on demand, and a system that behaves well in testing can still lose money live. What you can control is your process: understand the tool, size the risk, test on demo, and refuse anything you cannot explain. Do that and you will reject most scalper EAs in minutes. That is a feature, not a flaw.

## What is a scalper EA on MT4 actually doing under the hood?

A scalper EA is a program that runs inside MetaTrader 4 and sends trade instructions without asking you each time. When you attach it to a chart and allow automated trading, it reads price on every new tick, checks its coded conditions, and then opens, modifies or closes a position. It can place a market order, set a pending order, attach a stop loss and a take profit, move a stop, close half a position, or close everything when a rule triggers. It repeats those steps constantly while it is active.

Scalping is the name of a style, not a mark of quality. A true scalper aims for small, frequent moves: a few pips captured quickly, many times a day. That style depends on three things working together. Price has to move enough to cover costs. The robot has to enter near the price it intended. The exit has to happen before the small edge fades. If any of those three breaks, a strategy that looked consistent starts bleeding spread and commission instead of collecting pips.

That is why the code behind the label matters more than the name on the box. Two robots can both call themselves scalpers and behave nothing alike. One might trade a breakout of the previous candle range with a fixed stop on every order. Another might drop a grid of buy limits below price and wait for a pullback that improves the average entry. The first has a defined loss per trade. The second can hold many positions at once, and its loss keeps growing as long as price keeps moving. Same word on the tin. Completely different risk.

To evaluate any scalper EA, start with entry logic. Ask what triggers a trade. Common answers include momentum continuation, mean reversion to a moving average, a breakout of a session range, a time-of-day rule, or an indicator cross. Then ask about exit logic, because exits decide how losses behave. Does every position carry a hard stop loss? Is there a take profit target? Does the robot trail the stop, close on an opposite signal, or close only when the trade turns positive? Marketing screenshots love entries. Survival lives in exits.

Then ask the question the label tries to avoid. How many positions can be open at once, and can the robot add to a losing trade? If it can, you are looking at grid or averaging behaviour, whether or not the sales page admits it. That single design choice changes everything about how much of your account is exposed at any moment, and it is the reason this guide ships a drawdown stress-test worksheet at all.

Finally, look at how the robot behaves when conditions turn hostile. Does it stop trading when the spread widens past a set level? Does it pause around scheduled news? Does it cap the number of trades per day or per session? Does it halt after a daily loss? A serious design answers those questions in its settings. A weak design trades straight through them and hopes. Hope is not a risk control, and the market does not reward it.

If you take one line from this section, take this. You should be able to describe what the robot does in plain language before you let it trade your money. If you cannot say what triggers an entry, what caps the loss, how many positions can be open, and when the robot stands aside, you do not understand it well enough to run it.

## Why does scalping punish your broker and your machine as much as your strategy?

Scalping lives on tiny edges, so the costs around each trade matter as much as the signal. Three of them decide whether a scalper EA ever gets a fair chance: spread, slippage and uptime. None of them appear on a marketing curve, and all of them sit between the strategy and your balance.

Spread is the gap between the bid and the ask, and it is the price of entering and leaving. On a major pair such as EUR/USD, the quoted spread can look tiny during active hours. That number is an average, and averages hide spikes. Around data releases, at the daily rollover, and in the thin hours before a session opens, the spread can widen several times over for short stretches. A robot that trades through those minutes pays far more per round trip than its backtest assumed. A robot with a spread filter simply stands aside. Across hundreds of trades, that difference is not small.

Slippage is the gap between the price the robot expected and the price it got. Scalping asks for quick fills near a specific level, so any delay between signal and fill works against the strategy. During fast moves or crowded moments the fill can be worse than intended, and on exits it can be worse again. You cannot remove slippage from live trading. You can only prefer strategies that tolerate it, and reject strategies that need perfect fills to work.

Uptime is the third cost, and it is easy to underestimate. An EA depends on your platform staying connected to your broker. If your computer sleeps, loses its connection, or restarts for an update while the robot is managing open positions, the management stops with it. That is why many traders run MetaTrader on a virtual private server, usually called a VPS, so the terminal stays online when their own machine does not. Automation that needs a human to reopen the terminal is not really automation.

Broker rules matter too. Not every account welcomes high-frequency trading. Some brokers restrict certain behaviour, some widen spreads in ways that hurt scalpers, and some route orders differently depending on account type. Before you judge any scalper EA, check the contract specification on your own platform: spread behaviour, commission, swap, execution model, and any rule about short-term trading. The same robot on two accounts can produce two different outcomes, and the account is part of the strategy whether the vendor admits it or not.

Put together, these costs explain a pattern you will see again and again. A scalper EA that looks strong on a clean backtest can stumble in its first week of live trading, not because the logic is broken but because the world is messier than the simulation. Your defence is not to find a robot with no costs, because none exists. Your defence is to measure the costs, choose a robot whose edge survives them, and test on demo long enough to watch them appear.

## How do you tell a real scalper from a hidden grid or averaging system?

This is the question that saves accounts. Many products sold as scalpers are not pure scalpers at all. Under the surface they run a grid, a martingale, or an averaging recovery, and those designs carry a very different risk. Learning to spot the difference is worth more than any single download, because it lets you filter offers in minutes.

A grid places multiple orders at set price intervals. Instead of one entry, it may open buys every ten pips as price falls, expecting a bounce that turns the basket positive. An averaging system is closely related: it adds to an open losing position to improve the average entry price, so a smaller recovery move can close the whole group at a small profit. A martingale system increases the size of the next order after a loss, aiming to recover the earlier loss with one larger win. Each of these can produce long, calm-looking stretches followed by a sharp surge in exposure. That shape is what makes them attractive on a chart and dangerous in the account.

The tell is in the position list, not the marketing text. Ask how many positions can be open at once. Ask whether the robot adds to a trade that is already losing. Ask whether size increases after a loss. Ask whether the exit depends on price returning to an average rather than on a fixed stop. If any answer is yes, treat the product as a grid or averaging system and judge it on those terms. Do not let a "scalper" label lower your guard for a design that can hold a dozen correlated positions through a trend.

Why does this matter so much? Because the failure mode is not a normal losing streak. A bounded strategy with a real stop on each trade loses a known amount per loss and survives a bad run if it is sized correctly. A grid or averaging system can lose far more than any single trade suggests, because the loss is the whole basket, and the basket grows while the market keeps moving one way. The number that matters is not the win rate. It is how deep and how long the floating drawdown can go before the account runs out of room.

That is exactly the exposure a stress test is built to measure. A stress test asks the uncomfortable question on purpose: if price moves against the basket by a given distance and stays there, how much of the account is gone? You run it on paper, before live money is involved, with the numbers the strategy actually uses. Those numbers are the size of each added order, the spacing between them, the maximum number of orders, and the leverage on the account. When you write them down and walk them forward through a sustained move, the risk stops being abstract. It becomes a figure you can compare against your balance and your loss limits.

The free worksheet with this guide exists for that step. It is a printable stress-test worksheet for grid and averaging systems, so you have a structured place to work through the drawdown arithmetic instead of guessing. It is not a robot and it does not trade. It is a thinking tool, and like any tool it only helps if you use it honestly with your own numbers.

For related reading on the two recovery designs most often mistaken for scalpers, see the notes on [grid trading EA settings for MT4](/10-powerful-grid-trading-ea-safe-settings-for-mt4-to-reduce-risk-and-boost-profitability/) and the breakdown of a [martingale EA with a recovery system](/best-martingale-ea-for-mt4-with-a-recovery-system/). Both are worth understanding before you trust any product that adds to a losing position.

## Which numbers expose the real risk before you download anything?

Vendors sell totals: total profit, total trades, a single drawdown percentage. Totals hide behaviour. If you want to know how a scalper EA will treat your account, ask for the numbers that describe how it loses, how long it suffers, and how much it carries at the worst moment. Five of them do most of the work.

First, drawdown depth through time, measured on equity rather than just closed trades. Balance can look smooth while floating loss dips deep between closes, especially with grid or averaging logic. You want to see when the drawdown happened, how long it lasted, and what the market was doing. A single summary figure without a timeline tells you almost nothing about the pain you would have felt.

Second, exposure at the worst point. Ask for the maximum number of positions open at once, the total size held at that moment, and how long it stayed open. This number connects the strategy to survival. A robot that once held a large basket for hours is a different proposition from one that never exceeds a single bounded position. The trade list and the account statement should support the answer.

Third, sample size and coverage. Ask how many trades the result contains, over what period, and across what conditions. A result built on a handful of trades, or on a calm stretch with no trend weeks, proves very little. You want trades across quiet and active sessions, across ranges and trends, and across more than one news cycle. Small samples are easy to fit by accident.

Fourth, cost sensitivity. Ask how the result changes when spread and slippage become less friendly. A serious developer can show the same test with higher costs and point to the level where the edge fades. A scalper that only works with perfect fills is not robust enough for live conditions, where fills vary and spreads breathe. This is the single most useful question you can ask about a high-frequency strategy.

Fifth, loss structure. Ask for the largest single loss, the average win compared with the average loss, and the longest run of consecutive losses. Then ask which stop or account halt would have contained a worse run. These figures describe the tail you must be able to survive. Leverage magnifies both directions, and a strategy that needs an unusually gentle tail to survive is asking the market for a favour.

| Number to demand | Why it matters | What to ask for |
|---|---|---|
| Equity drawdown with dates | Shows the real pain, including open trades | A dated equity series with notes on cause and length |
| Peak exposure | Shows how much was at risk at once | Maximum open positions, total size and holding time |
| Trade count and period | Shows whether the sample means anything | A full trade list across varied market conditions |
| Cost sensitivity | Shows whether the edge survives real fills | The same test with higher spread and slippage |
| Loss structure and stops | Shows whether one bad run can end the account | Largest loss, loss run and the halt mechanism |

Ask for files, not screenshots. A Strategy Tester report, the settings file, the symbol and timeframe, and the exact inputs used beat any cropped image. For any live or demo record, ask for read-only investor access so you can check deposits, withdrawals and open trades yourself. A developer who trades transparently will expect the request. A developer who stalls has told you what you need to know. You can see how complete records look on a [public ranking page](/top-ranking/), which trains your eye for what an honest answer contains.

## How do you stress-test a scalper EA's drawdown before you go live?

A stress test is a simple idea executed carefully. Instead of asking how the robot performs on average, you ask how it behaves when the market moves hard against it and stays there. You run the test on paper, with the strategy's real settings, so that no live dollar is at risk while you learn the worst case.

Start by collecting the inputs that define the basket. If the strategy opens one position with a fixed stop, your inputs are the stop distance, the lot size, and the account balance. If it uses a grid or averaging recovery, you need more: the distance between added orders, the size of each order, the maximum number of orders it will hold, and whether the size doubles, steps up, or stays fixed. Write each one down. If a vendor cannot give you these, that is your answer, and you can stop the test before it starts.

Next, choose a move that is uncomfortable but realistic for the pair and timeframe. A sustained trend of a few hundred pips on a major pair is not exotic; it happens in a trending week. Sketch the adverse move in steps and walk the basket into it. At each step, add the next order the strategy would add, recompute the average entry, and write down the floating loss. Keep going until the strategy would stop adding orders, or until the loss reaches your account's danger line. The deepest point of that walk is the number you came for.

Then turn that floating loss into a decision. Compare it with your balance and with any loss limit that applies to the account. If the floating loss at the worst step exceeds what you can survive without a margin call or a rule breach, then the size is too large, the spacing too tight, or the recovery too aggressive for your account. A stress test rarely tells you a strategy is fine. It tells you where it breaks, and whether that break happens inside or outside your limits.

Do the same exercise for duration. Depth is only half the risk. A basket that floats deep for a day is one thing; a basket that floats deep for three weeks ties up the account and drains patience. Ask how long the strategy can hold a losing basket, and what happens if the trend simply continues. Time turns a temporary drawdown into a decision about whether to intervene, and intervention is exactly what a purely automated system cannot do for you.

This is where the free worksheet earns its place. Instead of juggling the arithmetic in your head or across a scattered spreadsheet, you work through it in a printable document you can fill in by hand and keep. It is a stress-test worksheet for grid and averaging systems: a structured way to record the adverse move, the added orders, the floating drawdown and the point where the account would give out. Because it is printable, you can sit with your broker statement, your settings and a pen, and build the worst case slowly and honestly.

Run the test for more than one scenario. A slow grind against the basket, a sharp spike, and a gap over a weekend are three different stresses that can produce three different results. Note each one. Then note the assumption you are least sure about, because that is where reality will surprise you first. A stress test is not a prediction. It is a rehearsal, and rehearsal is how you find out whether your size can survive the day the market refuses to bounce.

Keep the completed sheet. When you later compare it with live behaviour, it becomes a reference point. If the real drawdown stays inside the range you sketched, you learned something reassuring. If it blows past it, you learned that your inputs or your broker differ from your assumptions, and you can act before the account decides for you. Either way, the worksheet turns a vague worry into a written record.

For the mechanics of testing strategies on historical data, work through a [step-by-step backtesting tutorial](/forex-tester-online-backtesting-with-eas-tutorial-the-ultimate-step-by-step-guide/). For cutting the size of the drawdown once you understand it, see the ideas in [drawdown reduction for MT4 EAs](/drawdown-reduction-ea-free-download-7-powerful-benefits-every-trader-must-know/).

## What does the free drawdown stress-test worksheet include?

The download with this guide is a printable worksheet, not an EA. It does not trade, it does not connect to a broker, and it makes no claim about results. What it gives you is a structured place to run the grid and averaging drawdown stress test described above, by hand, with your own numbers, so the worst case stops being a vague fear and becomes a figure you can compare with your account.

Here is what you are getting, and how to judge it.

| Item | Detail |
|---|---|
| What it is | A printable stress-test worksheet for grid and averaging systems |
| Format | A PDF designed to be printed or filled in on a device |
| Purpose | Work through drawdown depth and duration before risking live money |
| Platform | None - it is a resource, not software, and it installs nothing |
| Best used with | Your own broker statement, lot sizes and EA settings |
| Licence | Free to use, print and share with credit to bestmt4ea.com |
| Version | 1.0 |

The workflow is deliberately low-tech. You print the sheet, or open it beside your trading platform, and you work through the scenarios one at a time: the sustained adverse move, the sharp spike, and the gap. For each, you record the added orders the strategy would place, the floating loss that builds, and the point where the account would breach your limit. The value is not in the paper. It is in the discipline of writing the numbers down and looking at them before real money is involved.

What it does not do is just as important as what it does. It does not predict the market, and it does not tell you whether any particular EA will make money. It does not replace a proper backtest, a forward test or a demo period. It does not connect to MetaTrader, and it will not read your account for you; the numbers come from you. It is not investment advice, and it is not tailored to your broker, your currency or your risk rules. It is a thinking tool, and a thinking tool only works when the person holding it is honest about the inputs.

That honesty is the real requirement. The easiest way to make any stress test reassure you is to use a gentle move, a generous balance, or a spacing that flatters the design. The worksheet will not stop you from doing that. Only you can decide to use a trend that actually hurt, a drawdown that actually went deep, and a size that reflects what you would really trade. Used that way, the sheet is a fast way to find the break point. Used carelessly, it is just paperwork.

You will also notice what the worksheet cannot capture on its own. It will not model every tick, every requote, or every moment when your connection drops. Real drawdown can be messier than a clean scenario, which is why the sheet sits alongside demo testing rather than replacing it. Treat the printed worst case as a floor for your planning, not a ceiling for reality, and keep some room for the unexpected. If a strategy is only comfortable when everything goes exactly as sketched, it is not comfortable enough.

Keep the completed worksheet with your other records for that robot. When builds change, so does the risk, and a new version deserves a fresh sheet. Over time, a folder of completed stress tests becomes a personal record of what you checked, what you assumed and what you learned, which is worth more than any single download. If you want to look at other tools and resources after you finish the test, the [shop](/shop/) and the [scalper EA library](/top-7-best-free-forex-scalper-ea-for-mt4-download/) are reasonable places to browse, but only after your numbers say a longer test is justified.

## What should you do on demo, and what should make you walk away?

A stress test and a backtest reduce uncertainty. They do not remove it. The last gate before live money is a demo test run under a fixed configuration, with a written decision at the end. Treat it as a trial, not a formality, because a demo is where the messy parts, spread, timing and disconnects, show up for free.

Set the demo up to mirror the account you intend to use. Match the MetaTrader version, choose a similar broker type and balance, and keep the symbol specification close to your live feed. Load the exact settings file you plan to judge, turn on any spread or news filters you intend to use, and host the terminal the way you plan to host it live. If you intend to run on a virtual private server, test on one, because an EA that depends on constant uptime should prove it on the setup it will actually use.

Then change nothing during the test unless safety demands it. One configuration, one record. Log the date, the sessions traded, the number of trades, the peak open exposure, the behaviour of the spread, and any news events or disconnects. Save the daily statements and keep a note of the floating drawdown whenever a basket stays open. If a losing day tempts you to tweak the inputs, write the temptation down instead of acting on it, because a mid-test change resets the clock and the result no longer belongs to one configuration.

After a couple of weeks, compare behaviour rather than balance. Did the fills match what the backtest assumed? Did spread widen during the robot's favourite minutes? Did it respect its time and news filters? Did peak exposure stay inside the limit you set on the worksheet? Small differences between simulation and demo are normal. Large or repeated mismatches suggest the backtest was optimistic or the settings differ from the advertised ones, and that is a reason to pause, not push on.

Walk away when the warning signs appear, and do not argue with them. Opacity is the first: no strategy explanation, no settings documentation, no trade history, and no willingness to discuss losing periods. Refusal to explain how a robot loses is not protecting intellectual property. It is hiding risk. Pressure is the second: countdown timers, deposit demands before you see evidence, and no demo-readable version. Serious evaluation takes time, and anyone rushing you past it benefits from your haste. Curve games are the third: equity lines without trade lists, balance charts that hide floating drawdown, and verified badges that link nowhere.

| Warning sign | What it looks like | What to do |
|---|---|---|
| Opacity | No logic, no settings guide, no losing periods shared | Ask once, then reject if refused |
| Pressure | Deposit before demo evidence, expiring deals | Step back and let the offer die |
| Curve games | Screenshots with no trades or settings files | Demand files and verified history, or walk away |
| Recovery logic | Adds to losers with no hard limit | Require the stress-test numbers, default to rejection |
| No support | No update path, no guidance on disconnects | Reject for unattended use |

If the demo behaviour matches the documented strategy, the worksheet worst case stays inside your limits, and nothing on the warning list appears, you have earned the right to a small, carefully sized live probation, not a victory lap. Start smaller than feels exciting, keep the same controls, and let the account confirm what you think you know. For ideas on indicators that pair with manual scalping while you test, the notes on [custom MT4 scalping indicators](/best-custom-mt4-indicators-for-scalping/) are a fair starting point.

## How does this fit into a wider trading plan?

A scalper EA is a tool inside a plan, never the plan itself. Before a robot earns space in your account, three things should already be in place: a broker whose costs and rules suit short-term trading, a clear idea of how much of the account can be at risk at once, and a habit of tracking results honestly. Get those right and the robot becomes easier to judge. Get them wrong and no EA will save the account.

Start with the broker. Spread, commission, execution and any rule about high-frequency trading change the arithmetic before a single trade is placed. Compare specifications rather than promises, and shortlist accounts that publish their costs clearly. A [broker comparison](/best-forex-brokers/) is a sensible place to narrow the field. If you would rather let another trader's process carry some of the work, understand the trade-offs of [copy trading](/copy-trading/) and how it differs from running your own EA, because copying someone else's risk is still your risk.

Then set your own ceiling. Decide the maximum drawdown you are willing to accept before you stop, and turn it into a number of lots and open positions the stress test can check against. This is the step most traders skip, and it is the step that keeps a bad week from becoming a closed account.

Finally, keep records. The worksheet from this guide, your demo statements, your settings files and your notes belong in one place. When a build changes or a broker adjusts its spread, that record lets you notice the difference instead of guessing. Tools support judgement. They do not replace it, and they never remove the chance of loss. For a broader view of what other traders run, browse the [scalper guide hub](/top-ranking/) with a sceptical eye.

## What is the one thing to do before your next scalper EA goes live?

Before any scalper EA touches real money, know its worst case. Not its best week, not its smoothest curve, but the depth and the duration of the drawdown it can produce when the market refuses to cooperate. That single number decides whether the robot belongs on your account or on your watchlist.

You now have the method: read the logic instead of the label, check whether a grid or averaging recovery is hiding underneath, demand the numbers that reveal exposure and loss structure, and stress-test the floating drawdown with your own settings before you trust it. That sequence separates a considered decision from an expensive one, and it takes an afternoon, not a month.

Download the free stress-test worksheet, print it, and run it against the next scalper EA that tempts you. Fill in the added orders, the adverse move and the floating loss until you reach the point where your account would break. If the break comes sooner than you expected, you just saved yourself a costly lesson. If it stays outside your limits, you have earned the confidence to demo the robot properly.

Grab the worksheet, keep it with your records, and make the stress test a habit rather than a one-off. Your account will thank you far more for a routine than for a hopeful download. And if you are still shortlisting candidates, compare them on a [ranking page](/top-ranking/) only after the numbers pass, never before.

> Trading foreign exchange on margin carries a high level of risk and may not be suitable for every reader. Prices can move sharply against open positions, leverage magnifies both favourable and adverse moves, automation can malfunction or disconnect, and historical or simulated results do not predict future performance. Test every system on a demo account first, size positions so a normal losing sequence cannot end the account, and never commit funds you cannot afford to lose.
