---
title: "Dark Mimas EA: 7 Settings to Check Before You Go Live"
slug: "dark-mimas-highly-customizable-ea-mt4-mt5-free-download-7-powerful-features-every-trader-must-know"
description: "Dark Mimas is marketed as a highly customizable MT4/MT5 EA. Learn the seven setting groups, size positions from risk, and demo test it before you go live."
publishedAt: 2026-02-13T07:28:58.000Z
updatedAt: 2026-10-07T00:00:00.000Z
categories:
  - "Free Forex EA"
tags: []
quickAnswer: "Dark Mimas is marketed as a highly customizable expert advisor for MetaTrader 4 and MetaTrader 5, and customization is where the risk hides. Before attaching it to any account, understand seven setting groups: risk per trade, stop and target, maximum exposure, sessions, news and spread filters, entry filters, and recovery logic. This guide teaches you to set and demo test each one, and the free calculator sizes your positions."
keyTakeaways:
  - "A customizable EA does not decide your risk for you. It exposes the settings where you must decide it, so the panel is a list of decisions, not a feature list."
  - "Read the risk inputs before the strategy inputs. Risk per trade, stops, maximum open trades and recovery logic decide whether your account survives long enough for an edge to appear."
  - "A .set file carries someone else's numbers but not their balance, broker, spread or drawdown tolerance. Translate a preset to your account instead of copying it."
  - "Size every position from the loss you accept, not from a round lot number, and write the maximum open trades and the equity stop on the same page."
  - "A backtest can reject an idea. Only a fixed-configuration forward demo test shows how your settings behave on live prices, so change nothing mid-test."
  - "The free download is a risk and position-size calculator with a pip-value table. It sizes positions, and it does not contain or run the Dark Mimas EA."

faqs:
  - question: "What is the Dark Mimas highly customizable EA?"
    answer: "Dark Mimas is the name of a forex expert advisor that is marketed as highly customizable for MetaTrader 4 and MetaTrader 5. The name tells you it is an automated trading program and that its developer exposed many inputs to the user. It does not tell you how the logic performs, and this guide makes no performance claim about it. What it does is teach you how to read, set and test a customizable EA so you can judge it yourself, on demo, from your own record."
  - question: "Is Dark Mimas free to download on this page?"
    answer: "No. This page does not host, link to or redistribute the Dark Mimas EA. The free download here is a risk and position-size calculator with a pip-value table, and it is a worksheet rather than a trading system. If you find a copy of the EA elsewhere, treat the source with the same suspicion you would give any executable file, scan it, and confirm which platform build you actually have before you run it."
  - question: "What does highly customizable mean in an MT4/MT5 expert advisor?"
    answer: "It means the developer exposed the robot's internal rules as inputs you can edit on the Properties tab. That is usually more control, but it is also a transfer of responsibility. A robot with one fixed setting makes the maker own that setting's outcome. A robot with twenty inputs makes you own all twenty, whether you understand them or not, which is why the settings panel deserves reading before the strategy does."
  - question: "Which settings matter most on a customizable expert advisor?"
    answer: "The risk inputs matter first: risk per trade, stop and target handling, the maximum number of open trades, and any recovery, grid or martingale logic. These decide whether the account survives a losing run. The strategy inputs, such as indicator thresholds and session filters, decide whether the idea has an edge. Both need attention, but the risk inputs can end an account before the edge ever appears, so review them first."

  - question: "Can I use Dark Mimas on both MT4 and MT5?"
    answer: "A MetaTrader 4 build and a MetaTrader 5 build are separate programs. An .ex4 compiled for MT4 does not run on MT5, and an .ex5 does not run on MT4. The code, execution handling and backtesting engine differ between the two platforms, so a result produced on one tells you nothing certain about the other. Confirm which build you have and test that exact version on the platform you intend to trade."
  - question: "Should I load a .set preset file I found online?"
    answer: "Only after you can see what is inside it. A preset carries risk percentages, maximum trades, session hours and recovery multipliers chosen for someone else's balance, broker and pair. Load it and you inherit their risk without their reasons. Read the risk fields, translate them to your own account, and keep the preset as a starting point rather than a finished configuration."
  - question: "How do I size positions for a customizable EA?"
    answer: "Start from the loss you are willing to accept on a trade, not from a lot size you like the look of. Divide that money by the stop distance in pips to get the value per pip, then divide by the pip value of your pair and lot type to get the size. The free calculator with this guide does the arithmetic and includes a pip-value table so the number is written down rather than guessed."

  - question: "How long should I demo test a customizable EA?"
    answer: "Run one fixed configuration for at least fourteen days, or until you have twenty to thirty closed trades, whichever takes longer. That is enough to cover more than one session and at least one difficult period. Change a setting mid-test and the result belongs to no configuration, so the test restarts. Log the peak number of open trades, the widest spread you paid, and every manual intervention."
  - question: "Does the free calculator include the EA or any trading system?"
    answer: "No. It is a printable risk and position-size calculator with a pip-value table. It contains no expert advisor, it cannot place a trade, and it does not predict a result. Its only job is to turn the risk settings from this guide into a lot size and a written risk plan before the robot places an order. A demo test is still the only way to learn how any configuration behaves."
  - question: "Do I need a VPS to run a customizable EA?"
    answer: "If the robot manages open positions, a stable always-on machine matters a great deal. A home connection that drops or a laptop that sleeps can leave positions unmanaged exactly when the exit logic should have run. A virtual private server keeps the terminal online continuously so the behaviour you tested is the behaviour you get. If you plan to run the EA on a VPS live, use one for the demo test too so the two are comparable."

sources:
  - label: "MQL5 Documentation"
    url: "https://www.mql5.com/en/docs"
  - label: "MetaTrader 5 Help — Strategy Tester and Automated Trading"
    url: "https://www.metatrader5.com/en/terminal/help"
  - label: "Investopedia"
    url: "https://www.investopedia.com"
primaryKeyword: "dark mimas ea"
download:
  origin: "own"
  license: "Free to use, print and share with credit to bestmt4ea.com"
  version: "1.0"
  fileKey: "resources/ea-risk-position-size-calculator.pdf"
---

## Why does a customizable EA turn into a risk you did not choose?

You searched for Dark Mimas because the idea of a robot you can tune to your own style is appealing. A fixed expert advisor makes decisions for you. A customizable one hands them back. That sounds strictly better, and in the right hands it is. It is also where the danger starts.

Every input in a customizable EA's settings panel is a question the developer declined to answer on your behalf. How much of the account do you risk on a single trade? Where is the stop, and who moves it? How many positions may run at once? Which hours may the robot trade, and when must it stand aside? How does it behave after a loss? The panel looks like a feature list. It is really a list of places where your money can go wrong if you accept the defaults or load someone else's file.

Here is how it usually ends. A trader downloads a popular customizable robot, grabs a `.set` file from a group chat, and attaches it without reading a single field. The robot trades well for two weeks. Then a trending week arrives. The recovery logic opens position after position against the move and holds them all. The floating loss climbs through a Friday afternoon. The trader closes everything by hand at a loss he will remember for months, and blames the robot. The robot did exactly what it was configured to do. Nobody ever told it not to.

That is the real cost of skipping the settings. You do not lose because the strategy is worthless. You lose because you ran a configuration you could not describe, at a size you never calculated, with no plan for the day it turns against you.

This guide uses Dark Mimas as the example of a category — a robot marketed as highly customizable for MetaTrader 4 and MetaTrader 5 — and teaches the seven setting groups you should read before any expert advisor like it receives a live order. It makes no performance claim about the product. No description of a settings panel can promise an outcome, and you should distrust any page that implies otherwise. What you get here is control over the parts you genuinely control: risk, exposure, cost, and the decision to test before you fund.

One note about the download before we go further. The free file on this page is not the Dark Mimas EA, and this page neither hosts nor redistributes that EA. It is a printable risk and position-size calculator with a pip-value table, built to turn the settings below into a single number you are willing to lose. Everything else here is method.

## What does "highly customizable" actually mean for an MT4/MT5 expert advisor?

An expert advisor is a program that runs inside MetaTrader 4 or MetaTrader 5 and sends trades according to coded rules. "Customizable" means the developer exposed those rules as inputs you can change: sliders, toggles, numbers and drop-downs on the EA's Properties tab.


Mechanically, that is more control. But there is a second meaning that matters more. Customization is the transfer of responsibility. When a robot has one fixed risk setting, the maker owns the result of that setting. When the same robot exposes twenty inputs, you own all twenty, whether you understand them or not.

It helps to sort the inputs into two kinds.

**Behaviour inputs** change what the robot does. They decide how it enters, which sessions it trades, whether it pauses for news, and how it manages a loss. Change one and you have a different strategy, not a tuned version of the same one.

**Risk inputs** change what the robot can cost you. They decide the size of a position, the number of positions, the distance to the stop, and how the next trade reacts to a loss. Change one and the strategy is identical, but your account's survival is not.

The order matters. Behaviour inputs decide whether an idea has an edge. Risk inputs decide whether you last long enough to find out. Read the risk inputs first, because they can end you before the edge ever appears.

Why does this matter for Dark Mimas in particular? Because the more freedom a robot offers, the more its live behaviour depends on your configuration rather than its code. Two traders can run identical files and live with completely different risk. That is not a defect in the design. It is the nature of a customizable system, and it is why "is this EA good?" is the wrong question. The right question is narrower and answerable: "is this EA, with the settings I chose and tested, one my account can survive?"

## What are the seven setting groups you must understand before you attach it?

Most customizable expert advisors expose roughly the same seven groups. Learn to locate them and you can read a new robot in minutes. Take them in this order, because each one constrains the next.


### 1. Risk per trade and position size

This is the input that decides how much of your account one losing trade can remove. If the panel offers a risk percentage, use it and keep it low while you are testing. If it offers only a fixed lot size, you do the sizing yourself — from the stop distance and the risk you accept, not from a round number.

What to watch: a risk field that quietly assumes a stop distance you did not set. If the robot sizes from a default stop, your real risk can be larger than the number on the label suggests.

### 2. Stop loss and take profit

Every position needs a defined worst case. The stop loss is the price at which the robot closes a losing trade; the take profit is where it closes a winner. Some EAs let you enter both as distances in points, as money, or as an "auto" value derived from volatility.

What to watch: "auto" is not automatically safe. A volatility-based stop widens in fast markets, which is reasonable, but if the position size is fixed it also widens your risk. Confirm whether the stop distance feeds back into the size calculation or is set independently.

### 3. Maximum open trades and total exposure

A customizable EA may hold a single position at a time or many. The maximum-open-trades setting caps how many can run together. This is the difference between a bounded risk and a basket that shares one outcome.

What to watch: correlated positions. Five EUR/USD trades in the same direction are not five separate risks. They are one larger risk wearing five tickets. Count exposure, not tickets.


### 4. Trading sessions and time filters

Sessions define the hours in which the robot may trade. The London and New York overlap carries the most volume and movement; the Asian session is quieter and often thinner for majors. A time filter keeps the robot out of the hours when spreads are widest and edges are thinnest.

What to watch: a strategy tuned in one session but allowed to trade all of them. If the panel exposes session hours, use them to match the period the strategy was actually built for.

### 5. News and spread filters

A news filter pauses trading around scheduled high-impact events. A spread filter blocks entries when the spread exceeds a threshold. Both exist for a single reason: to stop the robot trading the worst possible moments in the day.

What to watch: filters that are switched off by default. If the robot was tested with them on, turning them off is not a cosmetic change. It is a different risk profile, and your test result no longer applies.

### 6. Entry and indicator filter settings

These are the parameters of the strategy itself: moving-average lengths, oscillator thresholds, breakout distances, a minimum range for the day. They decide how often the robot trades and how selective it is.

What to watch: over-tuning. Finely tuned values that make a single backtest look clean usually describe the past rather than the future. Change them only with a written reason, and test the change like a new strategy.


### 7. Recovery, grid and martingale settings

This is the group that ends accounts. A grid adds positions at set price steps. A martingale-style multiplier increases size after a loss. Averaging adds to a losing position to improve the average entry price. If the panel has a multiplier, a step distance, or a maximum grid level, that is what it is, whatever the label calls it.

What to watch: all of it. Work out the maximum number of positions and the worst-case exposure the recovery can build. If that exposure could exceed your account's loss limit, the setting is not aggressive. It is unaffordable. Traders who want specifics on safer grid behaviour can start with our guide to [safe grid EA settings](/10-powerful-grid-trading-ea-safe-settings-for-mt4-to-reduce-risk-and-boost-profitability/).

You will not remember these values tomorrow. Write them down, one line per group, before the robot trades. That written configuration is the version you test, and it is the only version whose result means anything.

| Group | What it controls | Why it deserves your attention first |
| --- | --- | --- |
| Risk per trade | The size of one position | Sets how much a single loss removes |
| Stop and target | The exit levels | Defines the worst case and the target |
| Maximum open trades | Simultaneous exposure | Turns separate trades into one bigger risk |
| Sessions | The hours traded | Matches the robot to the market it was built for |
| News and spread filters | The pauses | Keeps it out of the most expensive moments |
| Entry filters | The number and quality of signals | Decides how selective the robot is |
| Recovery settings | The behaviour after a loss | Can scale exposure faster than the account can bear |


## Why is a preset file the fastest way to inherit someone else's risk?

Because a preset — a `.set` file — is a complete configuration someone else chose for their account, their broker and their market, and almost none of that context travels with the file.

Presets circulate freely, which is convenient and is exactly the problem. The trader who built the one you downloaded may run a $50,000 account, a raw-spread broker, a single pair, and a drawdown tolerance you would never accept. Load their numbers and you inherit their risk without any of their reasons. The robot cannot tell the difference, because from the robot's side the file is simply the truth.

A vendor's defaults are a different case, though not a safer one. Defaults are usually set conservative so the robot survives its first contact with a live account. That makes them a reasonable place to begin, not a finished plan. They were chosen before anyone knew your balance, your broker or your pair.


Before you load any preset, check four things. The balance and account currency it was built for. The broker type and the spread at the hours it trades. The pair and timeframe. And the risk inputs: risk percentage or lot size, maximum open trades, and recovery settings. If you cannot see those four, do not load the file. If you can, translate them to your account instead of copying them.

| What a `.set` file carries | What it does not carry |
| --- | --- |
| Risk percentage or lot size | The account balance it was sized for |
| Maximum open trades | Your available margin and loss limit |
| Session hours | The timezone of the developer's platform |
| Stop and target distances | Your broker's spread, commission and slippage |
| Recovery multiplier | Your tolerance for drawdown |

Read a preset as a hypothesis, not a verdict. Used that way, it is genuinely useful: someone has already done the tedious setup work, and you can learn from their choices. Loaded blindly, it is a way to borrow a stranger's risk while taking none of their precautions.


## How do you turn those settings into a position size you can survive?

Position size is the bridge between a configuration and an account. The arithmetic is simple, and it is the single most valuable habit in automated trading.

Start from the loss, not the lot. Decide the money you are willing to lose if the stop is reached. For a system you are still testing, that is commonly a small fraction of the account — half a percent to one percent per trade — never a figure chosen because it makes the lot size look tidy.

Then divide. Take the money at risk and divide it by the stop distance in pips. That gives you the value per pip you can tolerate. Divide that by the pip value of your pair and lot type, and you have your size.

A worked example makes it concrete. On a $5,000 account, risking one percent means $50 per trade. With a twenty-five pip stop, that is $2 per pip. On a standard lot of EUR/USD, a pip is roughly $10, so the size is about 0.2 lots. Change the pair, the lot type or the account currency and the pip value changes, which is why a pip-value table saves you from doing this in your head — and from doing it wrong at the moment it matters most.


Two constraints matter as much as the size itself:

- **A maximum number of open trades.** A recovery system does not trade one position at your chosen risk. It trades a sequence that shares one outcome. Cap the count, not only the size of each entry.
- **An equity level at which you stop.** Decide, while you are calm, the account value at which you will close everything by hand. Write it somewhere you will look when the screen is red.

Sizing and drawdown control are really the same subject. If you want the deeper version of how losses compound and how a system can be built to reduce the depth of a drawdown, read our guide to [drawdown reduction](/drawdown-reduction-ea-free-download-7-powerful-benefits-every-trader-must-know/).

The calculator that comes with this guide exists for this exact step. It is a printable worksheet for working out risk and position size, with a pip-value table, so the number is written down rather than guessed.


## Why do spreads, commissions and slippage decide a customizable EA's real risk?

Because every trade pays them, and a configuration that ignores them is describing a market that does not exist.

Spread is the difference between the price you can buy at and the price you can sell at. Commission is the per-lot charge on many raw-spread accounts. Slippage is the gap between the price the robot expected and the price it actually got, and it is worst exactly when the market moves fastest — which is when a breakout or recovery configuration is most active.

These three do not weigh on every strategy equally, and a customizable EA lets you move between strategies without changing the code. A configuration that takes many small trades pays the spread many times. A configuration that holds one position for days pays it rarely but sits through swap charges overnight. A recovery configuration pays the spread again on every added position, sometimes at the worst price of the day.


This is why a setting that looks harmless in isolation can be expensive in combination. A tight take profit with a wide spread filter switched off is a recipe for paying more to enter than the trade targets. A grid with a small step distance adds costs at every level. You do not need to memorise the arithmetic. You need to check three things: that your spread filter is switched on, that your grid or recovery step distances clear the spread, and that your test record logs the cost of each trade rather than only its result.

Brokers differ meaningfully here, and execution quality matters more than the headline spread. Compare account types, commission, and the spread you actually see in the hours you trade rather than the marketing figure, then look at our [best forex brokers](/best-forex-brokers/) page for what to weigh up before you open or move an account.

## How should you test a customizable EA before it trades real money?

Testing is the difference between a configuration and a guess. There are three stages, and each one proves less than the next one will.

**The backtest proves the least.** It replays the robot over historical prices using your settings. It is useful for rejecting obviously broken ideas — a configuration that cannot survive its costs over a long history is not worth a demo run. It is not useful as approval. Historical prices are fixed, execution is modelled, and small changes in spread or slippage assumptions can rewrite the result. If you want the method rather than the summary, work through our [step-by-step backtesting tutorial](/forex-tester-online-backtesting-with-eas-tutorial-the-ultimate-step-by-step-guide/).


**The forward test proves more.** This runs the robot on live prices as they arrive, usually on a demo account. It faces real spread movement, real session behaviour and real timing, even though the fills are simulated. The developer cannot tune entries to candles that have not printed yet, which is why a forward test is worth more than any backtest. For a customizable EA, it does one more thing a backtest cannot: it shows you how your configuration behaves while you are not touching it.

**A structured demo period turns the forward test into evidence.** Fix one configuration and change nothing. Run it for at least fourteen days, or until you have twenty to thirty closed trades, so the result covers more than one session and at least one difficult period. Record the peak number of open trades, the widest spread you paid, how the robot handled news, and every time you intervened by hand. Then compare what actually happened with what the settings panel promised.

Three rules keep the test honest:

- **One configuration per test.** Change a setting mid-run and the result belongs to no configuration at all. Restart the log and the trade count.
- **Record the exposure, not only the balance.** The closed-trade line can look calm while floating risk is high. The worst moment is usually a point during the run, not one of the closed trades.
- **Match the platform.** An MT4 build and an MT5 build are separate programs with different execution behaviour. Test the build you will actually run, on the platform you will actually use.


| Stage | What it can tell you | What it cannot tell you | What it decides |
| --- | --- | --- | --- |
| Backtest | Whether the idea survives its costs on past data | How it behaves on unseen prices | Whether to bother with a demo run |
| Forward demo test | How your settings behave on live pricing | How live fills will differ from demo fills | Whether the configuration is worth more testing |
| Small live probation | How it behaves with real fills and real money | Whether it will keep behaving that way | Whether to continue at that size |

If the robot behaves as documented and the record is clean, the next step is a small live probation at the smallest size your broker allows. Treat the first live trades as a continuation of the test, not as a reward for passing it. Automation deserves evidence, and the evidence has to come from you.


## Where should a customizable EA run while it trades?

It should run wherever the exit logic can keep running, which usually means somewhere other than your laptop.

A customizable EA often manages open positions: trailing stops, break-even moves, partial closes, session exits. Those actions happen on the robot's own schedule, not yours. If the platform is closed when the exit logic should have fired, the position stays open with no one watching it. A home connection that drops, a laptop that sleeps, or a power cut in the middle of the New York session all produce the same result — a trade running without the management you configured.


A virtual private server, usually called a VPS, keeps the terminal online continuously. For a robot that opens and manages trades through the night, that is not a luxury. It is the condition under which the behaviour you tested is still the behaviour you get. A [VPS built for MT4 and MT5](/product/vps/) keeps the platform and the expert advisor running when your own machine is off.

There is a second reason this matters for a customizable EA specifically. Your settings were chosen for the market hours you expect. If the platform is offline through part of them, the system trades a different schedule than the one you planned, and the demo result you recorded no longer describes the live account. Test the hosting the way you intend to run it: if you plan to use a VPS live, use one for the demo test too, so the two are comparable.

## Why do funded accounts and copy trading raise the stakes?

Because both replace your own tolerance for loss with someone else's written limit, and a number in a rulebook does not negotiate.


On a funded account — a prop challenge or an evaluation — you are usually bound by a daily loss limit and a total loss limit. Breach either and the account closes, often with no second attempt. That changes what sizing means. A configuration that would merely be uncomfortable on your own account can be fatal on a funded one, because the drawdown that ends the account may be shallower than the drawdown you were prepared to accept. If you trade a customizable EA on funded capital, the exposure limits are the first inputs you set, not the last.

Copy trading adds a second layer: you are following someone else's system, and the decisions inside it are not yours. Understanding how published track records are built tells you how much of a result is the system and how much is the account it happened on. It is worth reading how [copy trading](/copy-trading/) records are assembled before you follow one, and how [ranked systems](/top-ranking/) present drawdown, history length and exposure. The same discipline you would apply to your own settings — is this a configuration I can survive? — applies to the ones you copy.

The point is not that funded trading or copy trading is wrong. It is that both raise the price of a setting you did not understand. On your own small account, a misunderstanding costs some equity. On a funded account it costs the account, and on a copied system it costs you the ability to tell whether the fault was the system or the copy. Understand the settings before either.


## What exactly does the free risk and position-size calculator give you?

This is the practical part, and it is deliberately narrow. The download is a printable calculator for risk and position size, and it comes with a pip-value table. Its whole job is to turn the risk inputs from the sections above into a lot size and a written risk plan before the robot places an order.

Here is what is inside:

- **A position-size worksheet.** You enter the account balance, the percentage you are willing to risk on a trade, and the stop distance in pips. The worksheet turns those into the money at risk and the value per pip, and then into a size you can read straight off the platform's lot field.
- **A pip-value table.** The worksheet's output depends on what a pip is worth for your pair, your lot type and your account currency. The table removes the guesswork, so a plan built for one pair does not quietly become a different risk on another.


| Item | Detail |
| --- | --- |
| What it is | A printable risk and position-size calculator |
| Includes | A position-size worksheet and a pip-value table |
| Format | A printable PDF you can fill in on screen or on paper |
| Platform | Not tied to MetaTrader, because it is a worksheet, so it works alongside MT4, MT5 or any platform |
| Licence | Free to use, print and share with credit to bestmt4ea.com |
| Version | 1.0 |
| Cost | Free |

Using it takes a few minutes. Open it before you attach the EA, not after. Fill in the balance you are actually trading. Choose a risk figure you would still be comfortable with after three losses in a row. Enter the stop distance the robot will use. Read the size. Then write, on the same page, the maximum number of open trades you will allow and the equity level at which you stop. That page is your risk plan, and it is the standard every later decision gets measured against.

### What the calculator does not do

Honesty about limits is worth more than a longer feature list, so here is what this file is not:


- It does not contain, install or run the Dark Mimas EA, or any other expert advisor. It is a worksheet, not a trading system.
- It does not predict a result, project a profit, or tell you whether any setting will make money.
- It does not know your broker's spread, commission or swap. You enter those, and if you leave them out, the plan is incomplete.
- It does not test a strategy. It sizes positions. A demo test is still the only way to learn how the robot behaves.
- It does not connect to MetaTrader or manage your account in any way.
- It does not replace advice from a licensed professional, and it assumes you already accept that losses are a normal part of trading.

Read it that way and it earns its place. It is a small, specific tool that stops one of the most common and most expensive errors in automated trading: a position sized by feel instead of by arithmetic.


## What should you do next?

The order is the whole point, and it is the reverse of the usual one. Most traders install the robot first and look for understanding afterwards. Build the plan first and every robot you consider is judged by the same standard, and the standard is yours.

So do this, in this order:

1. Open the free risk and position-size calculator and fill it in for the account you actually trade.
2. Read the seven setting groups in your Dark Mimas panel, or any customizable EA, and write down what each one is set to.
3. Load no preset until you can explain the four things a preset does not carry.
4. Run one configuration on a demo account for at least fourteen days, and change nothing.
5. Decide from the record — not from the balance line on a good day — whether a small live probation is justified.


That is a slower start than attaching a file from a group chat. It is also the difference between owning your risk and discovering it later, at the worst possible moment. If you want to see how transparent, verified systems present their numbers before you commit to any of this, browse the [best MT4 EA](/best-mt4-ea/) comparisons, and read them with the same scepticism you would bring to a settings panel.

Download the calculator, print it, and fill in the risk plan before the first trade. Everything after that is easier to judge, because you will know what you were willing to lose.

> Trading foreign exchange on margin carries a high level of risk and may not be suitable for every reader. Leverage magnifies both gains and losses, and you can lose more than you expect on any single trade. Automation can malfunction, disconnect, or behave differently on a live account than it did on demo. Nothing here is investment advice, and no setting, configuration or calculator can remove the possibility of loss. Test on demo first, size positions so that a normal losing sequence cannot end your account, and never trade money you cannot afford to lose.