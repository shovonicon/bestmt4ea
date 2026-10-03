---
wpId: 126982
title: "MT4 Gold Scalper Setup: The Inputs That Decide the Outcome"
slug: "mt4-gold-scalper-ea-free-download-powerful-2026-guide-proven-setup-tips"
description: "How to install a gold scalper on MT4 and set its inputs in the right order: risk per trade, stop distance, spread cap, sessions and a free lot-size tool."
publishedAt: "2026-02-13T20:17:56.000Z"
updatedAt: "2026-09-29T00:00:00.000Z"
seo:
  title: "MT4 Gold Scalper Setup: Inputs That Decide the Outcome"
  description: "How to install a gold scalper on MT4 and set its inputs in the right order: risk per trade, stop distance, spread cap, sessions and a free lot-size tool."
  canonical: "https://bestmt4ea.com/mt4-gold-scalper-ea-free-download-powerful-2026-guide-proven-setup-tips/"
  ogImage: "https://bestmt4ea.com/wp-content/uploads/2026/07/post_126982_featured.webp"
sourceUrl: "https://bestmt4ea.com/mt4-gold-scalper-ea-free-download-powerful-2026-guide-proven-setup-tips/"
categories:
  - "Free Forex EA"
categoryPaths:
  - "/category/free-forex-ea/"
tags: []
draft: false
primaryKeyword: "mt4 gold scalper setup"
quickAnswer: "Set risk per trade first, then the stop distance, then the spread cap, the session filter, the magic number and the maximum number of trades. On XAUUSD that usually means a 200 to 300 point stop, 0.25 to 0.5 percent risk, a 25 to 35 point spread cap and the London session through the New York overlap. The robot is identical for everyone; the inputs never are."
keyTakeaways:
  - "The download is not the product. Severity of outcomes on XAUUSD comes from six inputs, and the entry logic inside the file is the one part you cannot change."
  - "Change the inputs in a fixed order: risk per trade, stop distance, then lot size, then spread cap, session filter, magic number and maximum trades."
  - "Points are not dollars. Confirm your XAUUSD symbol's digits and contract size before copying a stop of 120 or 260 points out of any preset."
  - "A spread cap of zero is not a tight filter, it is no filter at all. On gold that single number can cost more than the stop loss."
  - "Everything here can be audited for free on a demo account in two weeks. Demo first, half risk when you go live, and expect losing runs."
faqs:
  - question: "Which input should I change first on an MT4 gold scalper?"
    answer: "Risk per trade, because it is the only input that is a decision rather than a measurement. Decide the maximum percentage of the account one trade may lose, then measure how far gold's noise forces the stop, then let the arithmetic produce the lot size. Changing the lot size first, which is what most presets do, hides the risk inside a number you cannot see."
  - question: "What stop distance should a gold scalper use?"
    answer: "Between 200 and 300 points on a two-decimal XAUUSD feed, which is 2.00 to 3.00 dollars of price. Measure with ATR(14) on the timeframe you trade and take roughly 1.1 times that value. Below 150 points the stop sits inside gold's ordinary noise and you will be removed from trades that later move your way."
  - question: "How do I know if 120 points means 1.20 dollars on my account?"
    answer: "Check the symbol in Market Watch. A two-decimal gold feed quotes 2650.45, so one point is 0.01 and 120 points is 1.20 dollars. A three-decimal feed quotes 2650.452, so one point is 0.001 and 120 points is 0.12 dollars. Also confirm the contract size, which is 100 ounces per lot at almost every broker. Same preset, ten times the risk, if you skip this check."
  - question: "What spread cap should I set on gold?"
    answer: "Pick a number your broker quotes for at least 80 percent of the hours you intend to trade, which is 25 to 35 points on a raw gold feed. Zero disables the filter entirely, and a number tighter than the market means the robot never opens a trade. Then watch the journal: a cap that blocks entries around US data releases is doing exactly the job you paid it to do."
  - question: "Which session filter works for a gold scalper?"
    answer: "London's 09:00 open through the New York overlap, roughly 09:00 to 16:30 London time. In broker server time that is usually 11:00 to 18:30, because most MT4 servers run on GMT+2 in winter and GMT+3 in summer, so London's offset stays constant. Asian and late-evening hours combine a thin book with spreads of 40 to 90 points."
  - question: "Why does the magic number matter if I only run one robot?"
    answer: "The magic number is the tag MetaTrader 4 uses to recognise the orders an expert placed, and it only matters when a second order source appears: another instance of the same EA, a trade copier, or a second chart. If two experts share one number they will manage and close each other's trades. Set a unique number now, while nothing is at stake."
  - question: "How many trades should a gold scalper be allowed to open?"
    answer: "One open position while you are learning, with a hard cap of four to six entries per day and a daily loss limit you stop trading at. Every additional open position multiplies the same stop: five open trades at 0.5 percent each is 2.5 percent of the account at risk at the same moment, all of it on one symbol that moves as a single unit."
sources:
  - label: "ESMA - product intervention measures on CFDs, including the 20:1 leverage limit on gold and the finding that 74 to 89 percent of retail CFD accounts lose money"
    url: "https://www.esma.europa.eu/press-news/esma-news/esma-agrees-prohibit-binary-options-and-restrict-cfds-protect-retail-investors"
  - label: "MQL4 Reference - OrderSend, the function that stamps every expert's orders with the magic number described on this page"
    url: "https://docs.mql4.com/trading/ordersend"
  - label: "vobornik - MT4 Trade Copier, the GPL-2.0 licensed MT4 tool distributed on this page"
    url: "https://github.com/vobornik/mt4-trade-copy"
installSteps:
  - name: "Get the trade copier source"
    text: "Open the source link in the download panel, use the green Code button on GitHub and choose Download ZIP. You need TradeCopyMaster.mq4 and TradeCopySlave.mq4."
  - name: "Copy the files into the terminal data folder"
    text: "In MetaTrader 4 the folder is MQL4/Experts. Reach it with File, then Open Data Folder, and paste both files there rather than into Program Files."
  - name: "Compile them in MetaEditor"
    text: "Press F4 to open MetaEditor, open each file and press F7. A clean build writes a compiled expert next to each source; an error message points at the exact line that failed."
  - name: "Load the master on the account you trade"
    text: "Attach TradeCopy Master to any chart of the terminal whose trades you want to copy, allow algorithmic trading, and confirm AutoTrading is green."
  - name: "Load a slave on each follower terminal"
    text: "Attach TradeCopy Slave to a chart on every terminal that should follow, make sure all terminals share the same filesystem, and set the lot coefficient or fixed size the follower should use."
download:
  origin: "opensource"
  license: "GPL-2.0"
  licenseUrl: "https://www.gnu.org/licenses/gpl-2.0.html"
  author: "vobornik"
  sourceUrl: "https://github.com/vobornik/mt4-trade-copy"
  version: "latest"
  platform: "MT4"
  externalUrl: "https://github.com/vobornik/mt4-trade-copy"
  updatedAt: "2026-09-29"
---

Two traders download the same MT4 gold scalper on the same Tuesday. Same file, same broker, same XAUUSD chart, the same $3,000 starting balance. Ninety days later one account is intact and the other has lost almost half of it. Nothing inside the robot was different. Everything inside the inputs was.

That is the uncomfortable truth about automating gold. The Expert Advisor is the least important file you will download this year. MetaTrader 4 has no opinion about what you should risk, so it does exactly what the inputs tab tells it to do, on every tick, at 22:00 on a Friday, on the day you are not watching.

So say it plainly: the settings decide the outcome, not the robot. A gold scalper running a 120 point stop with a fixed 0.10 lot is a different instrument from the same file running a 260 point stop and a calculated 0.03 lot. One of those configurations can survive a normal losing week on XAUUSD. The other cannot.

Search for this topic and you will find pages describing the strategy instead: moving averages, breakouts, "smart algorithms", secret entries. You cannot change a single line of that. What you can change is the short list of inputs every MT4 expert exposes: risk per trade, stop distance, spread cap, session filter, magic number and maximum trades. That list is the entire job, and it is where most of the money is won or lost.

## One week, 61 trades, and a preset nobody read

Marcus downloaded a free gold scalper in March. He is not careless. He checked the developer's name, scanned the file, and read the description twice. Then he dragged it onto an M5 XAUUSD chart on a live account, because his demo felt slow, and he left every default exactly where the author had left it.

The defaults were: fixed lot 0.10, stop loss 120 points, take profit 150 points, maximum spread 0, session filter off.

Four things were wrong at the same time, and not one of them was visible on the chart.

The 120 point stop is $1.20 of price on gold. Gold covers that distance while you read a sentence. So the robot was removed from trades by ordinary noise, over and over, in the same direction it had correctly predicted. It was not wrong about the direction half as often as his statement suggests. It was simply stopped before it could be right.

The maximum spread of 0 did not mean "only trade tight spreads". It meant "there is no limit here", and the filter that would have protected him was switched off.

The session filter was open around the clock, so the robot also traded Asian hours, where a decent gold feed quotes 40 to 90 points and the profit target is 150 points before costs.

The 0.10 fixed lot was sized for somebody else's account. On a $3,000 balance with a 120 point stop, each stopped trade costs $12.00, or 0.4 percent. It was survivable, but it was not his decision, and a number chosen by a stranger is not a risk plan.

On Thursday, with US data at 13:30 London, the spread on his gold symbol widened to 180 points. The robot filled eleven times in about forty minutes. Every one of those fills started with a spread larger than its own profit target, which means every one of them began underwater by more than it was designed to earn.

The week closed at 61 trades, 42 winners and a net loss of $418 on a $3,000 account. He won 69 percent of his trades and still lost 14 percent of his account in five days, because wins do not survive a stop inside the noise, a spread cap that does nothing and a lot size nobody calculated.

The fix took eleven minutes: a risk percentage, one open position, a spread cap of 30 and a session window of 11:00 to 18:30 server time. He did not need a better robot. He needed an order of operations, and he found it two weeks and $418 too late.

## What actually decides whether an MT4 gold scalper works?

Six inputs decide, and the strategy inside the file barely moves the result. Risk per trade, stop distance, spread cap, session filter, magic number and maximum trades shape every order the robot sends; the entry logic only decides when a signal appears. That is why two people can run the identical expert on the identical symbol and get results that look like different products.

The mechanism is unglamorous. An edge, if the robot has one, is a small statistical tilt repeated many times. The inputs control how much you pay for each repetition, how much you lose when the tilt goes the wrong way and how often you sit out. Entry logic decides whether the tilt exists; inputs decide whether you survive long enough to collect it.

The table below is the same robot on the same symbol, once at the developer's defaults and once configured on purpose.

| Input | Typical preset | Defensible setting | Mechanical effect on a $2,000 gold account |
| --- | --- | --- | --- |
| Risk per trade | Fixed lot 0.10 | 0.5 percent, calculated | Cost of one stopped trade falls from $12.00 to $7.80 |
| Stop distance | 120 points ($1.20) | 260 points ($2.60) | Stop moves outside a 2.40 dollar M5 noise range |
| Maximum spread | 0, meaning no filter | 30 points | Fills during a 180 point news spike are blocked |
| Session filter | All hours | 09:00 to 16:30 London | Asian spread of 40 to 90 points is skipped |
| Magic number | 0, shared with everything | 20261234, unique | No second expert can manage or close your trades |
| Maximum trades | 5 open positions | 1 open, 4 to 6 per day | Worst-case simultaneous risk falls from 5 stops to 1 |

Every number in the right-hand column is arithmetic, not a promise, and you can verify each one on a demo account in an afternoon. Losses happen on both sides of that table; what changes is the size of the loss you agreed to in advance.

## What order should you change the inputs in?

Risk per trade first, because that number is a decision you make about your own account. Stop distance second, because that number is a measurement the market makes. Lot size third, because it is only the arithmetic that connects the two. Then spread cap, session filter, magic number and maximum trades, in that order.

The order matters more than most traders expect, because later inputs can silently cancel earlier ones. A spread cap of 0 switches off the protection that your risk rule depends on. A stop distance entered in the wrong unit turns a 0.5 percent risk into a 5 percent risk. A shared magic number hands your positions to a second expert that closes them on rules you never enabled. Changing inputs in a random order is how a good risk decision becomes an invisible one.

One more discipline is worth building here. Save the inputs as a named preset before each change, with the date in the name. A folder of dated presets is the only honest way to compare two configurations; without them you are comparing memories, and memories are generous.

### 1. Risk per trade: what number can you live with after five losses in a row?

Start between 0.25 and 0.5 percent per trade while you are learning, and treat 1 percent as an outer limit rather than a target. The question that produces the number is not how much you want to earn, it is what a five-loss run looks like on your balance. Gold produces five-loss runs routinely, and it produces them when the news calendar is busy.

The arithmetic is worth memorising, because it is the only part of this page that never changes with the market:

| Risk per trade | Five losses in a row | Account left | Gain needed to recover |
| --- | --- | --- | --- |
| 0.25 percent | 1.25 percent | 98.75 percent | 1.27 percent |
| 0.5 percent | 2.5 percent | 97.5 percent | 2.56 percent |
| 1 percent | 5 percent | 95 percent | 5.26 percent |
| 2 percent | 10 percent | 90 percent | 11.1 percent |

Notice how fast the recovery column grows. A 10 percent drawdown needs 11.1 percent to undo it, and a 20 percent drawdown needs 25 percent. Small risk keeps that climb shallow, which is what lets you keep trading a robot after a normal losing week instead of switching it off at the worst moment.

MetaTrader 4 gives you two ways to express risk. The first is a fixed lot, which most presets ship with. It is simple and it is wrong on gold, because the same 0.10 lot carries eight times the risk when the stop is 260 points compared to 30. The second is percentage risk, where the expert, or you with a calculator, converts your chosen percentage into a lot size using the actual stop distance. Take the second option. If the robot you downloaded does not calculate the lot, calculate it yourself and enter the result.

### 2. Stop distance: how far does gold have to move before the trade is simply wrong?

For an M5 gold scalper in 2026, plan on 200 to 300 points, which is 2.00 to 3.00 dollars of price. Below roughly 150 points you are placing the stop inside the noise XAUUSD prints every few minutes, and above 400 points the trades stop being scalps and the required lot size shrinks to where the spread dominates everything.

Measure it rather than inventing it. Add ATR(14) to the M5 chart and read the current value. When average true range reads 2.40 dollars, a stop of about 1.1 times that value, so 260 points, sits just outside ordinary movement. When ATR expands to 4.00 dollars around the London open, the same stop is too tight, which is why a fixed stop that ignores volatility gets hammered during fast sessions.

The second half of the stop decision is the ratio to spread, and this is where scalpers quietly bleed. The spread is a cost you pay on entry; the stop is how far the trade must travel before it is wrong. When the spread is a large fraction of the stop, your cost of doing business is a large fraction of your risk:

| Spread | Stop distance | Spread as a share of the stop | Verdict |
| --- | --- | --- | --- |
| 20 points | 260 points | 7.7 percent | Workable |
| 30 points | 260 points | 11.5 percent | Workable, monitor it |
| 60 points | 260 points | 23 percent | Expensive |
| 180 points | 260 points | 69 percent | Do not trade |

Now here is the trap that costs accounts. "120 points" means different money on different gold feeds. A two-decimal symbol quotes 2650.45, so one point is 0.01 and 120 points is $1.20. A three-decimal symbol quotes 2650.452, so one point is 0.001 and 120 points is $0.12. Same preset, same number in the box, one tenth of the intent. Open Market Watch, look at the digits on your XAUUSD symbol and check the contract size, which is 100 ounces per lot at nearly every broker. Then check whether the preset you copied is expressed in points, pips or dollars.

### 3. Spread cap: at what spread should the robot refuse the trade?

Set the cap at a number your broker quotes for at least 80 percent of the hours you trade, which on a raw gold feed means 25 to 35 points. Zero disables the filter, and a cap tighter than the market means the robot never opens anything, which looks like a broken expert and is really a misconfigured one.

Find your number from the platform, not a forum. Watch the XAUUSD spread for a full session, note the typical value and the spike around 13:30 London, and set the cap just above the typical value so it behaves like a fence rather than a wall.

The cost of getting this wrong is easy to see in dollars. At 0.03 lots on gold, one point is worth $0.03, so a 30 point spread costs $0.90 per trade. That is 10 percent of a 300 point target, and it is the price of doing business. Widen the spread to 90 points and the same trade costs $2.70, or 30 percent of the target. Widen it to 180 points and the cost is $5.40, which is more than a 150 point target is worth in the first place. Your robot is not losing those trades. It is losing them before it starts.

One honest note on news. A well-set cap will block many entries around US data releases, and that is the point: you give up some fills to avoid the ones that arrive with a 180 point spread and a stop that cannot be honoured at the price you asked for.

### 4. Session filter: which hours does gold pay for scalping?

Trade the London open into the New York overlap, roughly 09:00 to 16:30 London time, and switch the robot off for the thin evening and Asian hours. Gold's spread is tightest and its ranges are widest in that window, so the cost of doing business is lowest relative to the size of the move you are trying to catch.

The practical problem is time zones. Almost all MT4 brokers run their server on GMT+2 in winter and GMT+3 in summer, which happens to track London's own shift, so London 09:00 sits at 11:00 server time all year. That is why so many gold presets use 11:00 to 18:30. The New York overlap, London 14:30 to 16:30, lands at 16:30 to 18:30 server time. If your expert asks for a start hour and an end hour, you now know what to type without guessing.

Set the window two ways if the robot allows it: a start and end hour, and a separate Friday switch. Gold behaves differently into a Friday close, liquidity drains, and a scalping expert is least suited to that session. Closing entries at 18:30 server on Friday costs you trades you would not want.

### 5. Magic number: why does a duplicate magic number close trades you did not open?

The magic number is the tag MetaTrader 4 attaches to every order a robot places, so the robot can tell its own positions apart from everything else on the account. Two experts sharing one number will manage and close each other's trades, and the loss will look like a platform bug rather than a configuration mistake.

Nothing happens today if you run one expert on one chart. Then one of four things happens: you add a second instance on another timeframe, you attach a trade copier, you move a robot to a new chart without removing the first, or the expert itself uses 0, which tells MetaTrader that manual trades are its property too. In any of those cases a shared tag means a robot closing positions it never opened, using rules that do not belong to them.

So do the boring thing now. Pick a unique number such as 20261234, enter it in the magic input, and keep a note of it next to your dated preset file. When you run two configurations of the same expert on one symbol, give them different numbers. It costs ten seconds and it removes an entire class of unexplainable results from your history.

### 6. Max trades: how many open gold positions can one account survive?

One open position while you are learning, a hard cap of four to six entries per day, and a daily loss limit you stop trading at. Every additional open position multiplies the same risk: five positions at 0.5 percent each is 2.5 percent of the account exposed at one moment, all of it on a single symbol that moves as one block.

Gold is one market, not five. A gold scalper holding five buys on XAUUSD has not diversified anything, it has simply bought the same idea five times, and one adverse move of 260 points closes all five stops together. That is the difference between a losing trade and a losing day.

Leverage is the other half of this input. At 1:500, a 0.03 lot gold position of 3 ounces carries roughly $15.90 of margin. At 1:100 it carries about $79.50, and at the 20:1 cap applied to retail clients in the European Union it carries closer to $397.50. None of those numbers is your risk; your risk is the stop. High leverage does not create losses, but it makes an oversized position look affordable.

| Setting | Learning phase | After two profitable demo months |
| --- | --- | --- |
| Open positions | 1 | 2 maximum |
| Entries per day | 4 | 6 |
| Daily loss limit | 2 percent | 2 percent |
| Weekly loss limit | 4 percent | 5 percent |
| Action when hit | Stop the robot for the day | Stop the robot for the day |

Set the daily limit in the expert if it offers one, and in your own head if it does not: a robot that cannot stop itself must be stopped by the person who configured it, and that person is you.

### The configuration order as one table

If you only keep one thing from this page, keep this sequence, and apply it to the next gold scalper you attach:

| Step | Input | What you are really deciding | Starting value |
| --- | --- | --- | --- |
| 1 | Risk per trade | How much of the account one trade may lose | 0.5 percent |
| 2 | Stop distance | How far XAUUSD must move before you are wrong | ATR(14) on M5, times 1.1 |
| 3 | Lot size | The result of steps 1 and 2, never a preference | Calculated, rounded down |
| 4 | Spread cap | When the robot should sit out and wait | 25 to 35 points |
| 5 | Session filter | Which hours you are willing to pay for | 11:00 to 18:30 server |
| 6 | Magic number | Which orders belong to this expert | Unique, written down |
| 7 | Max trades | How much exposure and how many attempts per day | 1 open, 4 to 6 entries |

## What does this look like on a real $2,000 gold account?

On a $2,000 account risking 0.5 percent per trade with a 260 point stop, the lot size is 0.03 and a stopped trade costs $7.80. None of that is a forecast. It is arithmetic you can do before the trade exists, which is exactly why it is worth doing.

Walk through it once, slowly, because the same four movements apply at every account size.

First, the risk budget. 0.5 percent of $2,000 is $10.00, and that is the maximum this trade is allowed to cost.

Second, the value of a point. On XAUUSD, one lot is 100 ounces, so 0.01 lots is one ounce, and a one cent move in price is worth one cent. That is the single fact that makes gold arithmetic easy: at 0.01 lots, one point equals $0.01.

Third, the stop in dollars. A 260 point stop at 0.01 lots costs $2.60. Divide the budget by that: $10.00 divided by $2.60 is 3.8, and you round down, never up, because rounding up spends money you did not authorise. So 0.03 lots.

Fourth, the real risk. 0.03 lots times 260 points times one cent is $7.80, which is 0.39 percent of the account. You asked for 0.5 percent and you got 0.39 percent, because the trade size comes in whole increments and you always round toward safety.

Now change one number and watch the whole row move:

| Risk per trade | Dollars at risk | Lot size (260 point stop) | Loss per stopped trade | Five losses in a row | Account afterwards |
| --- | --- | --- | --- | --- | --- |
| 0.25 percent | $5.00 | 0.01 | $2.60 | $13.00 | $1,987.00 |
| 0.5 percent | $10.00 | 0.03 | $7.80 | $39.00 | $1,961.00 |
| 1 percent | $20.00 | 0.07 | $18.20 | $91.00 | $1,909.00 |

Three configurations, one robot, one stop distance, and a difference of $78 in how much a normal losing run costs you. That difference was decided before a single candle printed, by a number you typed.

The spread cap deserves the same treatment, because it is the input people leave at zero and then blame the robot. Take a genuinely bad morning: twelve fills during a US data window at a 90 point spread, with the 1 percent setting from the table above, so 0.07 lots. Each fill pays 90 points times $0.07, which is $6.30 in spread. Twelve of them is $75.60, or 3.8 percent of the account, gone before a single stop loss is touched. With a 30 point cap, every one of those twelve trades is declined and the account is untouched.

That is the practical meaning of "the settings decide the outcome". It is not a slogan about expert advisors, it is a sentence about cost.

Two honest qualifications. First, a worked example is not a backtest and not a result. Your broker's spread, your fill quality and the session you trade will move these numbers, sometimes by a lot. Second, none of this makes a weak robot profitable. Good configuration keeps a mediocre edge small enough to be survivable while you find out what you actually have. That is the most a set of inputs can honestly promise you.

## Where do the gold scalper files go, and what do you check before the demo runs?

In MetaTrader 4, the expert file belongs in the MQL4/Experts folder inside the terminal's data folder; restart the platform, then drag the robot from the Navigator onto an M5 XAUUSD chart with AutoTrading enabled. Before you trust a single number in the inputs, confirm three things about the symbol itself: its digits, its contract size and its point value.

Reach the folder with File, then Open Data Folder, then MQL4, then Experts. Paste the .ex4 or .mq4 file there, and do not work inside Program Files. If you have the source file, open MetaEditor with F4, load the file and press F7 to compile; the build either succeeds or names the line that failed. When the expert is attached to a chart, the top-right corner shows a small smiley face while automation is live, and a sad face when the button is off. That face is the difference between a robot trading and a robot sitting there looking competent.

Then run the three checks that catch most configuration errors:

| Check | Where | What you are looking for |
| --- | --- | --- |
| Digits | Market Watch, symbol specification | 2 decimals means a point is 0.01; 3 decimals changes every stop value |
| Contract size | Symbol specification, trade tab | 100 ounces per lot on gold at nearly every broker |
| Point and tick value | Symbol specification, or the calculator | What one point is worth in your account currency |

After that, backtest one full year on your broker's own symbol data before you judge anything. MetaTrader 5 offers real ticks, which is the better choice when you are deciding a stop distance. A 90 percent modelling result tells you the expert runs without errors, not that it earns, so treat the backtest as a check on your inputs rather than evidence about the future.

Then run two weeks on a demo with the exact settings you intend to use, and log every trade by hand. Two weeks will not prove an edge, and it will show you very quickly whether your spread cap blocks most entries, whether the session window matches your broker's clock, and whether you can tolerate watching the thing. Only then go live, at half the risk, on an account whose loss you have already accepted in writing. A VPS helps here, because a scalper that stops when your laptop sleeps is not running the configuration you tested. If you are still choosing what to run, the [gold scalper comparison on this site](/top-ranking/) and the [free EA and indicator library](/blog/) are better places to look than a Telegram channel.

## What exactly is in this download?

The download is the MT4 Trade Copier by vobornik: an open-source tool for MetaTrader 4 that copies every trade from one terminal to one or more other terminals. It fills part of the gap that appears the moment you run your configured expert on more than one account, because MetaTrader will happily run a robot per terminal but it will never replay your fills onto a second one by itself.

| Item | Detail |
| --- | --- |
| Name | MT4 Trade Copier |
| What it does | Copies market, limit and stop orders with their SL and TP from a master terminal to one or more slaves |
| Platform | MetaTrader 4 |
| Source | MQL4 source included (TradeCopyMaster.mq4 and TradeCopySlave.mq4), compiled locally |
| Author | vobornik |
| Licence | GPL-2.0 |
| Origin | github.com/vobornik/mt4-trade-copy |
| Cost | Nothing |
| What you need | Two MT4 terminals sharing a filesystem, or the same machine, and a few minutes |

The master expert writes every change — a new trade, a moved stop, a close — to a status file, and each slave reads that file and reproduces the order. Slaves can copy the lot as-is or scale it with a coefficient or a fixed size, so a $100k account can follow a $5k one without you touching the calculator.

### What does the trade copier do that the terminal cannot?

It replays your configured expert onto other accounts without you re-entering a single input. MetaTrader's own tools cannot mirror one terminal's orders onto another, and running the same file separately on each account usually drifts: a different spread, a different fill, a different preset. The copier makes the master the single source of truth, so the account you watch is the account the others follow — which is exactly the property you want when you move a tested configuration from demo to live, or from a small account to a funded one.

Use it as a deployment tool, not a brain. The settings you already chose still decide the outcome; the copier only decides how faithfully those settings reach the other terminals. If the master is oversized, the slaves copy that mistake at the same size. The [XAUUSD scalping robot settings breakdown](/xauusd-scalping-robot-settings-and-tips-10-powerful-strategies-for-better-trading-results/) reaches the same conclusion from the opposite direction.

### What this download does not do, and what still depends on you

Be clear about the boundaries.

It only copies. It plots no signal and makes no decision of its own, so whatever the master does is what every slave does — good or bad.

It does not predict, and it does not improve an edge. Faithfully mirroring a strategy that loses money just loses money on more terminals at once.

It does not know your broker. Different servers, symbols and contract sizes between the master and a slave can distort a copied lot, so confirm the symbols match before you trust the multiplier.

It does not replace a demo account or the [free EA downloads](/free-download-forex-ea-indicator/) you may already be testing. It sits alongside them as the way to run one tested configuration across several terminals.

It cannot tell you how much you are willing to lose. That is a decision, and the copier only reproduces the position size you already chose.

And one plain statement that belongs on every page like this. Trading leveraged gold carries a real risk of losing money, most retail accounts that trade CFDs do lose money, and no set of inputs changes that fact. Open-source software comes without a support contract or a warranty; verify the source, compile it yourself, and test on a demo. What the correct configuration buys you is smaller, known losses and a system you can actually evaluate, which is the only honest goal of a setup guide.

## Your next step: pick three numbers before your next session

You have read enough to do the useful part in twenty minutes. Download the Trade Copier from the panel above and compile it, but keep it in reserve for now. First pick three numbers, in this order: 0.5 percent risk per trade, a stop of 1.1 times the M5 ATR, and a spread cap of 30 points. Write them down next to today's date.

Open the expert's inputs and enter them. If it wants a fixed lot, take the number the calculator gave you instead of the one in the preset. If it wants a start and end hour, use 11:00 to 18:30 server time and set the daily loss limit to 2 percent. If it wants a magic number, give it one nobody else on the account is using. When the dialog closes, save the whole thing as a preset named with today's date. That file is your baseline, and every future change is compared against it rather than against memory.

Then leave it alone for two weeks. Two weeks proves nothing about an edge, but a demo account is the cheapest place to discover that your spread cap blocks most entries, that your session window was set against the wrong clock, or that you cannot sit still while a robot trades.

You cannot make a gold scalper safe. You can make it yours: your risk, your hours, your stop, your lot size. That is what separates a tool you understand from a file you downloaded and hoped for, and it costs one demo login and an afternoon. Start with the [free downloads library](/free-download-forex-ea-indicator/), or compare the [bots ranked on this site](/best-mt4-ea/) once your first configuration is written down. Deploy the copier once your configuration is fixed, and stop trading somebody else's numbers.
