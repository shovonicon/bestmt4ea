---
wpId: 127393
title: "Gold EA Risk Management: Survive the First Drawdown"
slug: "gold-hitter-ea-mt4-free-download-powerful-2026-guide-to-safe-setup-profitable-trading"
description: "Set the limits that keep a gold EA account alive: risk per trade, a drawdown cap, an equity stop, a daily loss rule and a written stop-trading trigger."
publishedAt: "2026-02-13T23:48:37.000Z"
updatedAt: "2026-09-29T00:00:00.000Z"
seo:
  title: "Gold EA Risk Management: Survive the First Drawdown (2026)"
  description: "Set the limits that keep a gold EA account alive: risk per trade, a drawdown cap, an equity stop, a daily loss rule and a written stop-trading trigger."
  canonical: "https://bestmt4ea.com/gold-hitter-ea-mt4-free-download-powerful-2026-guide-to-safe-setup-profitable-trading/"
  ogImage: "https://bestmt4ea.com/wp-content/uploads/2026/07/post_127393_featured.webp"
sourceUrl: "https://bestmt4ea.com/gold-hitter-ea-mt4-free-download-powerful-2026-guide-to-safe-setup-profitable-trading/"
categories:
  - "Gold (XAUUSD) Trading"
  - "Gold EA & Robots"
categoryPaths:
  - "/category/gold-xauusd-trading/"
  - "/category/gold-ea-robots/"
tags: []
draft: false
primaryKeyword: "gold EA risk management"
quickAnswer: "Risk control decides whether a gold EA account survives, not the entries it takes. Before you install anything, set five limits: risk no more than 1 percent of your balance per gold trade, size the lot from the stop distance, cap total drawdown at a fixed percent, wire a broker-side equity stop, and name the daily loss that ends your day. Test every limit on demo first."
keyTakeaways:
  - "A gold EA does not manage your risk. It decides when to buy and sell XAUUSD; you decide the lot size, the drawdown cap and when trading stops."
  - "Risk 0.5 to 1 percent of your balance per gold trade, and always size the position from the stop distance rather than setting the lot first."
  - "Correlated gold positions are one bet. Sum the risk of every trade that would lose together and keep that total near 1 to 2 percent."
  - "A 30 percent drawdown needs a 42.9 percent gain just to get back to even, so the cap protects you more than the return does."
  - "Enforce the cap outside the robot with a broker-side equity stop, because you cannot verify when a compiled EA's own limit fires."
  - "Write a stop-trading rule and rehearse it on demo. Limits do not remove risk; they only bound the damage."
faqs:
  - question: "How much should a gold EA risk per trade?"
    answer: "No more than 1 percent of your account balance per gold trade, and 0.5 percent if you are new. On XAUUSD, one dollar of price movement is worth 100 dollars per lot, so a 1,000-dollar account risking 1 percent can only carry a tiny position once the stop is a realistic 4 to 6 dollars of gold."
  - question: "What is a drawdown cap on a gold trading account?"
    answer: "It is the deepest fall in equity you will allow before trading stops, measured from your account high. Set it at a fixed percentage of your starting balance, for example 10 percent if you are cautious and 20 percent as a ceiling, then enforce it with a broker-side close-all at that equity level instead of trusting the robot's own limit."
  - question: "How do I set a daily loss limit for a gold EA?"
    answer: "Write the limit in money, not percent, so it is easy to see, and measure it by equity rather than closed trades. A workable ceiling is 2 to 3 percent of your balance per day, because a floating loss is real once the stop fills. When you hit it, close the platform for the day and stop averaging."
  - question: "Are two gold positions on different charts two separate risks?"
    answer: "Usually not. XAUUSD, XAUEUR, silver and gold-miner products move together, and two gold EAs both long XAUUSD are one directional bet at double the size. Sum the risk of every open position that would lose in the same scenario and treat that total as your single real risk."
  - question: "Does the EA's own max drawdown setting keep my account safe?"
    answer: "It helps, but it is not enough on its own. A compiled expert advisor is a black box, so you cannot verify exactly when its internal limit fires, and it may stop opening new trades without ever closing the losing ones. Keep the robot's limit and add your own broker-side equity stop as the backstop."
  - question: "Can risk limits stop a gold EA from losing money?"
    answer: "No. Trading XAUUSD carries a real risk of losing capital, and no limit changes that. What limits do is bound the damage: they turn an account-ending month into a bad week you can study and survive. Test every rule and setting on a demo account before you commit real money."
sources:
  - label: "KVignesh122/MT5-SMC-trading-bot — Apache-2.0 Smart Money Concepts expert advisor for MetaTrader 5, full MQL5 source"
    url: "https://github.com/KVignesh122/MT5-SMC-trading-bot"
  - label: "MQL5 Reference — Testing Trading Strategies (Strategy Tester, real ticks and spread simulation)"
    url: "https://www.mql5.com/en/docs/runtime/testing"
  - label: "FTMO — Trading Objectives (maximum daily loss, maximum loss and drawdown rules)"
    url: "https://ftmo.com/en/trading-objectives/"
  - label: "Investopedia — Drawdown definition and how it is measured"
    url: "https://www.investopedia.com/terms/d/drawdown.asp"
installSteps:
  - name: "Download the bot source"
    text: "Download EA_Script.mq5 from the repository on GitHub. Take it from the original project page rather than a mirror, so you know exactly what you are compiling."
  - name: "Copy the file into MetaTrader 5"
    text: "In MetaTrader 5, open File then Open Data Folder, and save EA_Script.mq5 into MQL5/Experts. It is an MQL5 expert advisor, so it belongs in the Experts folder rather than Indicators."
  - name: "Compile it in MetaEditor"
    text: "Open MetaEditor, load EA_Script.mq5 and press F7 to compile. A clean build writes a matching .ex5 file beside the source."
  - name: "Attach it to a gold chart on demo"
    text: "Open a XAUUSD chart on a demo account, drag the expert from the Navigator and allow algorithmic trading."
  - name: "Set your risk inputs before you start"
    text: "Set the lot per $1,000 input, the equity bagging profit and loss percentages, the maximum spread and the session filter. Compare the size it will trade with the risk-per-trade limit on your sheet before you place anything."
download:
  origin: "opensource"
  license: "Apache-2.0"
  licenseUrl: "https://www.apache.org/licenses/LICENSE-2.0"
  author: "KVignesh122"
  sourceUrl: "https://github.com/KVignesh122/MT5-SMC-trading-bot"
  version: "latest"
  platform: "MT5"
  externalUrl: "https://github.com/KVignesh122/MT5-SMC-trading-bot"
  updatedAt: 2026-09-29
---

You are about to hand a robot the password to your gold account. You have read the sales page, you have the file, and you know which button says AutoTrading. You think the decision in front of you is which expert advisor to run. It is not. The decision in front of you is how much of your money that robot is allowed to lose before you switch it off, and almost nobody writes that number down before they start.

Every gold EA page sells the entries. The screenshot shows the arrow, the entry time, the profit. Nobody shows you the size of the position behind the arrow. Nobody shows you the morning the arrows stopped working, the spread doubled, and the account fell further than the trader planned. So you copy a lot size from a Telegram screenshot, press start, and learn the real lesson the expensive way.

Let me say the problem plainly. A gold expert advisor running on MetaTrader 4 or MetaTrader 5 does not control your risk. You do. The robot decides when to buy and sell XAUUSD. It does not decide whether the position is 0.02 lots or 0.20 lots, and it does not decide whether you keep trading after three losing days. Those two decisions sit entirely with you, and they decide whether the account survives its first hard month far more than any entry rule ever will.

That is the whole point of this page. The account survives because of the limits you set, not the entries the robot takes.

Picture a trader we will call Daniel. Daniel opens a 2,000-dollar account on a Tuesday and attaches a free gold scalper he found online. The default lot size is 0.10 on XAUUSD. At that size, every 1.00-dollar move in the gold price is worth 10 dollars to him, and gold can travel a dollar in under a minute during the New York session. Daniel knows this. He has done his reading. He still runs the default, because the vendor screenshot shows the same number and the vendor's account is bigger.

Two weeks later, the United States releases core CPI. Gold whips both directions in nine minutes. The robot opens four longs on the way down, each with a 3.00-dollar stop. Four stops at 30 dollars each is 120 dollars. A fifth position opens as a recovery layer, because the robot was configured to answer a loss with a bigger trade. That one carries double the size and a 6.00-dollar stop, so it is another 60 dollars. On the way to the stop the spread gapes to 90 points, and the fills land worse than the line drawn on the chart. By lunch, Daniel is down 210 dollars, or 10.5 percent of his balance, on a plan he thought was conservative because the lot size said 0.10.

Here is the part that stings. Daniel did not lose because the robot was bad. He lost because nothing in his setup said stop. The robot was doing exactly what its rules told it to do. Nobody had told it, or him, that a 10.5 percent morning ends the week. So it kept trading, and so did he.

That one morning contains the whole problem, and the fix has nothing to do with the robot's entries. Before you place a single live trade, you write down five numbers: the most one gold trade may risk, the total risk allowed across all open gold positions, the maximum drawdown the account may reach, the equity level at which everything closes, and the daily loss that ends your day. Then you enforce them from outside the robot, because you cannot audit a compiled .ex4 file and you should not bet your account on a rule you cannot read. The rest of this page walks through each number, gives you the arithmetic to set it, and shows you what happens when you skip it.

## Why does a gold EA blow up accounts when the entries look fine?

Because on XAUUSD a realistic stop is worth a large slice of a small account, and gold can reach that stop in minutes. The entries are rarely the cause. Position size and the number of open gold trades are.

Gold does not price like a currency pair. One standard lot of XAUUSD is 100 troy ounces, so a 1.00-dollar move in the gold price is 100 dollars of profit or loss on one lot. At 0.10 lots the same move is 10 dollars. At the 0.01 lot minimum most brokers allow, it is 1 dollar. Those three numbers come from the same chart. The chart never changes. Only your size does, and size is the one input you fully control.

Now add volatility. Gold routinely travels 15 to 30 dollars in a day, and it does it in bursts around US data. A 5.00-dollar stop is a normal stop for gold, not a wide one. On a 0.10 lot position that stop is 50 dollars. On a 1,000-dollar account that single stop is 5 percent of everything you own. The robot did nothing wrong. The size turned an ordinary stop into a large event.

Then add spread and slippage. XAUUSD carries one of the widest spreads of any liquid symbol. You might see 20 points round trip on a quiet London morning and 80 or 120 points the moment a US number prints. A stop that looks like 50 points on the chart can fill 30 points worse in a fast market. Scalpers feel this most, but every gold EA feels it eventually.

There is one more way gold EAs blow up accounts, and it hides inside the strategy rather than the size. Any robot that adds to a losing trade, whether it calls itself a grid, a recovery system, or a martingale, is converting an unknown risk into a known one later. The first orders look small and safe. Each layer after them is bigger, and the total exposure grows while the market moves against you. You will not see it in the lot size on the first ticket, because the danger is the sequence, not the entry. A robot with fixed stops and one position at a time has a worst case you can calculate tonight. A recovery robot has a worst case you find out at the moment it happens. For risk control, that difference is everything.

Put those three facts together and you get the sentence that matters. The robot's edge is small and repeated. Your risk per trade is large and fixed. Lose control of the second and the first cannot save you. This is why two traders can run the identical EA, on the same broker, on the same day, and finish the month in completely different places. If you want to see how entries are judged on their own merits, that belongs on the [best gold scalper EA guide](/best-gold-scalper-ea-for-mt4-mt5-the-only-guide-you-need/), not here. This page is about the limits that decide whether you are still trading next month.

## How much should one gold trade be allowed to risk?

No more than 1 percent of your balance per gold trade, and 0.5 percent while you are new. That number is a rule you set before the trade, not an estimate you check afterwards.

Why 1 percent? Because it survives a losing streak. Even a good system loses several trades in a row; that is normal, not broken. At 1 percent risk, ten straight losses is a 9.6 percent drawdown. Painful, survivable, recoverable. At 5 percent risk, the same ten losses is a 40 percent drawdown, and a 40 percent hole needs a 67 percent gain to climb out of. Same strategy. Same win rate. Completely different life.

The trap is that "I risk 1 percent" and "I trade 0.01 lots" are not the same sentence, and most traders treat them as though they are. Risk is not a lot size. Risk is what you lose if the stop is hit. The lot size that produces that loss depends on how far away the stop sits. A tight stop allows a bigger position. A wide stop forces a smaller one. If you set the lot first and then place the stop wherever it fits, you are not controlling risk at all. You are guessing, and the market will grade the guess.

### How do you turn a risk percent into a gold lot size?

You need three numbers: your risk in dollars, the stop distance measured in dollars of gold price, and the value of one dollar of price movement at your size. For XAUUSD, one dollar of price movement is 100 dollars per lot, so the arithmetic is short.

Lots = risk in dollars ÷ (stop distance in dollars × 100).

Two worked examples make it concrete.

- A 5,000-dollar account risking 1 percent carries 50 dollars of risk. With a 5.00-dollar gold stop, lots = 50 ÷ (5 × 100) = 0.10.
- A 1,000-dollar account risking 1 percent carries 10 dollars of risk. With the same 5.00-dollar stop, lots = 10 ÷ (5 × 100) = 0.02.

Same stop, same percentage, five times smaller position, because the account is five times smaller. That is the entire skill, and it takes ten seconds once you know the formula. Do it before every trade, or let a tool do the division for you, but know the number before the order goes live. If you are unsure how a given robot behaves at that size, run it on demo first and compare the actual dollar swings with your plan.

## What is a drawdown cap, and who actually enforces it?

A drawdown cap is the deepest fall in equity you will allow before trading stops, set as a fixed percentage of your starting balance. It is enforced by you and by a broker-side equity stop, never by the robot alone.

First, the definition, because it is where people go wrong. Balance is money already closed. Equity is balance plus the floating profit or loss of everything still open. A 4,000-dollar balance with 500 dollars of open losing trades has an equity of 3,500 dollars, which is a 12.5 percent drawdown even before a single position is closed. Drawdown is measured on equity, from your peak, to the lowest point after that peak.

Why cap it at all? Because every system has regimes where it stops working, and gold EAs are no exception. A trend-following gold robot can spend six weeks giving back the gains it made in one. The cap is what stops a bad stretch from becoming a dead account. A cautious beginner can use 10 percent. A trader comfortable with swings might run 20 percent as the absolute ceiling. Pick the number you can watch it approach without panicking, then treat it as a wall.

Who enforces it is the part most traders skip. Some EAs ship with a maximum drawdown input, and it can help, but a compiled expert advisor is a black box. You cannot verify exactly when its internal check fires, and a robot may simply stop opening new trades while leaving the losers open and floating. The reliable enforcement lives outside the robot: a broker-side equity stop, or a small script that closes everything when equity crosses a line you set in advance. There is a fuller breakdown of the mechanics on the [drawdown reduction EA guide](/drawdown-reduction-ea-free-download-7-powerful-benefits-every-trader-must-know/). Whatever you choose, test the trigger on demo before you ever need it on a live stop-out.

## How do you set a daily loss limit you will actually obey?

Write it in money, measure it by equity, and treat it as the end of the day the moment it is reached. A workable ceiling is 2 to 3 percent of your balance per day, or your prop firm's figure if you trade an evaluation.

The reason to write the limit in dollars is that percentages hide behind a moving balance. "I was down 3 percent" feels abstract. "I was down 150 dollars and my limit is 150" is a stop sign you cannot argue with. Say the number out loud before you start the session. It should feel slightly uncomfortable to lose, which is how you know it will hold.

The reason to measure by equity is that floating losses are real. If you are down 140 dollars on closed trades and one open position is 30 dollars in the red, your day is 170 dollars down, because that loss becomes cash the second the stop fills. Most blown accounts are lost on floating equity the trader kept counting as zero. If you follow a funded-account rulebook, use its exact figure rather than your own; FTMO, for example, runs a 5 percent maximum daily loss, and the [gold prop firm robot guide](/gold-prop-firm-robot-free-download-7-powerful-secrets-to-maximize-funded-trading-success/) walks through how that interacts with an automated gold system.

When the limit hits, you close the platform. Not "reduce size." Not "one more trade to get it back." The daily limit exists precisely for the hours when you are least able to judge a setup, which are the hours right after a loss.

## What does a 10 percent drawdown really cost you to recover?

More than it cost to fall, because recovery is measured from a smaller base. A 10 percent loss needs an 11.1 percent gain to return to even; a 30 percent loss needs 42.9 percent.

That asymmetry is the single strongest argument for a hard cap. The table shows why the deeper you fall, the more the market demands of you on the way back.

| Drawdown from your peak | Gain needed to get back to even |
| --- | --- |
| 10% | 11.1% |
| 20% | 25.0% |
| 30% | 42.9% |
| 50% | 100.0% |
| 70% | 233.3% |

At 50 percent down, you need to double what is left just to stand still. That is a different job from the one you thought you had. And the fall is usually not one dramatic loss; it is a handful of ordinary ones stacking up while the position sizes stay the same.

### A worked drawdown example on a 2,000-dollar gold account

Take a 2,000-dollar account and two versions of the same morning.

Version one is Daniel's. The robot trades 0.10 lots, each stop is 4.00 dollars, so every trade risks 40 dollars, or 2 percent of the balance. It opens three gold positions at once, so 6 percent is exposed at the same moment. A news spike sweeps all three: minus 120 dollars. Equity is 1,880 dollars, down 6 percent. The robot re-enters twice on its recovery logic and both stop out: minus 80 dollars more. Equity is now 1,800 dollars, which is 10 percent below the start. To climb back to 2,000 this account needs 11.1 percent, about 200 dollars, and at the smaller base a full month of careful trading may barely cover it. Three positions, two re-entries, one morning.

Version two is the same account with the limits on. The robot trades one position at a time at 0.02 lots, each stop is 4.00 dollars, so every trade risks 8 dollars, or 0.4 percent. The exact same six losing entries cost 48 dollars. Equity is 1,952 dollars, down 2.4 percent. It needs an 8-dollar winner to make back two of those losses and about six small winners to erase the whole morning. Same robot. Same entries. Same market. The size and the position cap did all the work.

Now look at how long each version takes to recover, because that is where the asymmetry bites. Version two needs 48 dollars back, and even a slow month at half a percent a day covers it well before the month ends. Version one needs 200 dollars back on a 1,800-dollar base, and it has to earn that while the same robot keeps taking the same 2 percent risks. If the robot drops another 6 percent on the next spike, the hole deepens to nearly 16 percent, and the climb back crosses 19 percent. This is why the cap and the position size matter more than the return target: they decide which version of the story you are in when the next bad morning arrives.

The arithmetic also explains a rule worth repeating. Recovery gets harder the deeper you are, not easier, so the cheap moment to act is early. Closing one position at 6 percent down is a decision you make calmly. The same decision at 25 percent down is made by a version of you who is scared, and scared traders add size instead of cutting it.

## How many gold positions are really just one trade?

The number of open tickets on your terminal is not the number of separate risks you are carrying. Correlated gold positions are one bet wearing several names, and you must count them as one.

XAUUSD is not an isolated market. XAUEUR and XAUGBP move with it, silver usually follows closely, gold-miner products track it with leverage, and the US dollar index leans against it. If you run two different gold EAs, both long XAUUSD, you have one directional view at double the size. If a grid EA opens five layers of the same trade, that is one position at five times the risk, not five small positions. A spike that kills the first layer kills all of them together.

The rule that fixes this is simple. Sum the risk of every open position that would lose in the same scenario, and hold that total to the same 1 to 2 percent band you use for a single trade. Then cap the number of gold positions you allow at once. For a small account, that cap is usually one. If you want two, size each so their combined risk still fits the band, and check that they are not effectively the same bet. The [MT4 EA comparison page](/best-mt4-ea/) shows how wildly maximum drawdown varies between listed robots, and most of that difference is correlation and sizing, not entry quality.

## What is the limit sheet you fill in before you install anything?

You fill it in on paper, you set the numbers in the platform, and you keep it next to the screen. Here is the sheet, with the reason for each limit and how to set it.

| Limit | Why it matters | How to set it |
| --- | --- | --- |
| Risk per trade | Keeps any single loss small enough to survive a streak | 0.5 to 1 percent of balance, then size the lot with risk ÷ (stop in dollars × 100) |
| Total open gold risk | Correlated trades are one bet, not several | Cap combined risk across all open gold trades at 1 to 2 percent; allow one position on small accounts |
| Maximum drawdown | Stops one bad regime from ending the account | Fixed percent of starting balance: 10 percent cautious, 20 percent ceiling; track it on equity, not balance |
| Equity stop-out level | Acts when you are asleep or too hopeful to act | Broker-side close-all triggered at equity = balance × (1 − cap); test the trigger on demo first |
| Daily loss limit | Breaks the revenge-trading loop before it compounds | 2 to 3 percent of balance, written in money, measured by equity, reset at the daily close |
| Stop-trading rule | The final circuit breaker for you, not the robot | Two or three consecutive losing days, or a weekly loss of 5 percent, triggers a 48-hour pause and a written review |

Two of these numbers get set in the robot once and never touched. The other four are yours. If you cannot state all six from memory after reading this, you are not ready to fund the account.

## What is your stop-trading rule, and when does it fire?

It is the condition under which you stop trading entirely, disable the EA, and step away for a fixed period. Write the trigger and the restart condition together, in advance, so that neither one is a decision you make while you are upset.

A workable example reads like this. If the account falls 8 percent from its peak, or the EA loses three sessions in a row, I close all trades, remove the robot from the chart, and I do not re-enable it for 48 hours. Before it runs again, I re-run the numbers and can name one specific thing I changed and why. The pause is not punishment. It is the only way to tell a normal losing streak apart from a strategy that has stopped working, without your own money stacked on the answer.

### What should you actually do during the pause?

Three things, and none of them is watching the chart.

First, pull the history and count, not guess. How many trades, what average loss, what average win, and what the worst run of losing trades actually was. Compare that with what the robot's own backtest suggested. If live behaviour is far outside the backtest, the settings or the market have changed, and no amount of patience will fix that.

Second, check the cost side, because gold risk is not only price risk. Commission, swap on positions held overnight, and the average spread you paid all eat into every result. A strategy that looked positive on a zero-cost backtest can be negative once a realistic spread of 20 to 30 points and a round-turn commission are included. If you cannot show the strategy is profitable after costs on paper, the pause should become a full stop until you can.

Third, decide in advance what restarting looks like. The clearest version is a specified number of consecutive demo days that reproduce the strategy's expected behaviour at your chosen size. Until you see that, the robot stays off the chart. Deciding this now, while you are calm, is the whole point of a written rule. Deciding it mid-drawdown is how people talk themselves into a bigger position.

Then be honest about what limits can and cannot do. No set of rules makes gold trading safe, and anyone who tells you otherwise is selling something. Loss of capital is possible, and a bad fill can jump a stop by more than you planned. What the limits do is bound the worst case: they turn an account-ending month into a bad week you can survive, study, and recover from. That is the entire job, and it is worth doing.

Run every number on a demo account first. Trade the limits on demo for two to four weeks before real money touches the plan. Watch what the robot actually does at your chosen size, whether the equity stop fires when it should, and whether a 2 percent day feels as manageable in real time as it looked on the spreadsheet. Demo is where the plan gets tested for free. Real money is where you find out you skipped the test.

## What does the download on this page give you?

It gives you the other half of the argument: a gold expert advisor whose risk inputs you can actually read. It is the MT5 SMC Trading Bot by KVignesh122, an open-source Smart Money Concepts expert for MetaTrader 5 released under the Apache-2.0 licence, with the full MQL5 source in EA_Script.mq5 on GitHub so you can inspect how it sizes positions and manages exposure instead of trusting a screenshot.

What is inside:

- Strategy modes for order blocks, fair value gaps and breaks of structure, plus an automatic mode that combines them.
- A lot-per-$1,000-balance input, so the size it takes follows your balance rather than a number copied from someone else's terminal.
- An equity "bagging" pair of inputs that closes every open trade when account equity reaches a chosen profit or loss percentage.
- A maximum spread input, a session filter that skips the thin Asian hours, and a one-trade-per-bar rule.
- ATR-based stop and target levels, with a regime filter that keeps the breakout mode out of ranging markets.

Quick specs:

| Field | Detail |
| --- | --- |
| Name | MT5 SMC Trading Bot |
| Author | KVignesh122 |
| Platform | MetaTrader 5 |
| Licence | Apache-2.0 |
| Source | Full MQL5 source, EA_Script.mq5, on GitHub |
| Risk inputs | Lot per $1,000 balance, equity bagging profit and loss percentages, maximum spread, session filter |

What it does not do is just as important. It does not choose your limits for you: you still set the lot per $1,000, the bagging percentages and the daily loss number on the sheet. It does not enforce them from outside the robot, and that is the part to keep in mind — the equity bagging lives inside the EA, so read the source to see exactly when it fires and whether it closes the losers or merely stops opening new trades, then keep the broker-side close-all as your backstop. It cannot stop a broker widening the spread past your stop, and it cannot make a risky plan safe. What it does is put the numbers where you can see them, which is more than a compiled .ex4 will ever do. If you would rather compare a broader set of tools before you commit, our [free-download library](/free-download-forex-ea-indicator/) and [ranked top tools](/top-ranking/) list the ones we have looked at in detail.

## Your next step: set the limits before the entries

Do one thing now, before you attach any gold EA to a live chart. Download the bot, compile it, and open it on a demo account, setting the lot-per-$1,000 input so the size it takes matches a 1 percent risk on your real balance. Then write the six limits from the sheet on a card and tape it beside the screen.

When you next feel the pull to skip this and just press start, remember Daniel and his 210-dollar morning. The robot was never going to save him, because a robot cannot see the number you never wrote down. The account survives because of the limits you set, not the entries the robot takes. Set them first, trade them on demo, and only then let the gold EA trade the plan you built around it. If you want more risk-focused reading before you start, the [blog](/blog/) has the rest of the library.
