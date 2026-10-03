---
title: "EA31337 Libre: Free, Readable MT4/MT5 EA Framework"
slug: "ea31337-libre-free-download"
description: "EA31337 Libre is a free, GPL-3.0, open-source multi-strategy MetaTrader 4 and 5 framework. See what 35+ readable strategies give you — and what they do not."
publishedAt: 2026-09-28
updatedAt: 2026-09-29
categories:
  - "Free EA"
categoryPaths:
  - "/category/free-forex-ea/"
tags:
  - "open source"
  - "MT4"
  - "MT5"
  - "multi-strategy"
quickAnswer: "EA31337 Libre is a free, GPL-3.0, open-source multi-strategy framework for MetaTrader 4 and MetaTrader 5, written in MQL4 and MQL5. It ships over 35 configurable strategies you can enable, disable or rewrite, with the full source code included. It is an education and research framework, not a tuned, ready-to-run trading product."
keyTakeaways:
  - "Licence: GNU GPL-3.0 — you can use, modify and redistribute it, but any version you distribute must stay free under the same licence."
  - "A framework, not a product: 35+ strategies you can switch on or off, each reading its own timeframe independently."
  - "Full MQL source for MetaTrader 4 and MetaTrader 5, so you can audit the risk logic instead of trusting a compiled file."
  - "The author states plainly that it is not suitable for real trading without relevant knowledge — no presets, no tuning, no commercial support."
  - "Free to download from GitHub (about 257 stars and 110 forks), with community help through discussions, issues and a Telegram channel."
faqs:
  - question: "Is EA31337 Libre really free to use?"
    answer: "Yes. It is released under GNU GPL-3.0, which lets you use, modify and redistribute it for any purpose. The single condition is that any modified version you distribute must also stay free under the same licence."
  - question: "Can I run EA31337 Libre on a live account?"
    answer: "Technically yes, but the author advises against it. The project README states it is not suitable for real trading without relevant knowledge, and points traders who want a more advanced implementation at the main EA31337 project instead."
  - question: "Does EA31337 Libre work on both MT4 and MT5?"
    answer: "Yes. The source is written to be compatible with both MQL4 and MQL5 and runs on either terminal. The author recommends MetaTrader 5 for backtesting and optimisation because its tick modelling is more accurate."
  - question: "Do I need to know MQL to use it?"
    answer: "No, but it helps a great deal. A compiled build runs once it is attached to a chart. Because the full source ships with the project, being able to read MQL means you can verify the logic yourself rather than trusting a binary."
  - question: "What does GPL-3.0 force me to do if I change the code?"
    answer: "Nothing while the changes stay private. GPL-3.0 only binds you when you distribute the software: a version you share or sell must be licensed under GPL-3.0, keep the original notices, and make its source available."
  - question: "Does EA31337 Libre come with preset or optimised settings?"
    answer: "No. There is a sets/optimize folder for optimiser inputs, but you generate your own set files. There is no tuned, set-and-forget configuration, and nothing in the project is optimised for your broker, symbol or timeframe."
  - question: "Is EA31337 Libre the same as the main EA31337 project?"
    answer: "No. Libre is deliberately the simpler implementation. The author describes it as a simple build of the EA31337 framework and strategies, and points traders who need the more advanced version at the separate EA31337 project."
  - question: "Where do I get help or report a bug?"
    answer: "Through GitHub. The project uses discussions for questions, issues for bugs and feature requests, and a Telegram channel for news and general help. It is community support, so there is no service-level promise on a reply."
sources:
  - label: "EA31337 Libre repository (GPL-3.0) — EA31337"
    url: "https://github.com/EA31337/EA31337-Libre"
  - label: "GNU GPL-3.0 licence text"
    url: "https://www.gnu.org/licenses/gpl-3.0.html"
  - label: "EA31337 framework (EA31337-classes)"
    url: "https://github.com/EA31337/EA31337-classes"
  - label: "A quick guide to GPLv3 — GNU Project"
    url: "https://www.gnu.org/licenses/quick-guide-gplv3.html"
primaryKeyword: "EA31337 Libre"
installSteps:
  - name: "Clone or download the repository"
    text: "Open the EA31337/EA31337-Libre repository on GitHub and clone it or download the ZIP. Read the README and the source before you compile anything — you are getting the project from the original publisher, not a re-upload."
  - name: "Open your MetaTrader data folder"
    text: "In MetaTrader, go to File, then Open Data Folder. This opens the directory the terminal actually reads, which is where the expert advisor has to live."
  - name: "Copy the source into the Experts folder"
    text: "Move the source files into MQL4/Experts for MetaTrader 4 or MQL5/Experts for MetaTrader 5. If you want to change the logic, edit the .mq4 or .mq5 file in MetaEditor before you build it."
  - name: "Compile in MetaEditor"
    text: "Open the project file in MetaEditor and press F7 to build it. A clean compile writes a compiled file beside the source, which confirms the code you read is the code that will run."
  - name: "Backtest in MT5, then forward-test on demo"
    text: "Refresh the Navigator, run the expert advisor in the MetaTrader 5 Strategy Tester on your own broker's data, then move it to a demo account. Do not put it on a live account."
download:
  origin: "opensource"
  license: "GPL-3.0"
  licenseUrl: "https://www.gnu.org/licenses/gpl-3.0.html"
  author: "EA31337"
  sourceUrl: "https://github.com/EA31337/EA31337-Libre"
  version: "latest"
  platform: "MT4/MT5"
  externalUrl: "https://github.com/EA31337/EA31337-Libre"
  updatedAt: 2026-09-29
---

Most "free EA" downloads are a closed box.

You get a compiled `.ex4` or `.ex5` file, a screenshot of someone else's equity curve, and a promise. You cannot read the code that decides when to buy. You cannot see how much it risks on a trade. You cannot tell whether it holds one position or quietly stacks twenty against you.

That is the problem this page is about. The free expert advisors most traders find are not tools you can inspect — they are black boxes with a sales page bolted on. And a black box inside your trading account is not a shortcut. It is a liability you cannot see.

## The week a black-box EA turns against you

Picture a sequence that plays out somewhere every week.

You find a robot in a Telegram group. It is free, the screenshots look strong, and a few people in the chat say it "prints". You put it on a $2,000 live account, because demo felt slow and you wanted to see real fills.

For six days it behaves. Small wins, small losses, nothing dramatic. On day seven, gold (XAUUSD) makes a clean run in one direction and refuses to come back. The robot has been holding every losing position it opened, waiting for a pullback and adding to the pile. Your drawdown jumps from a mild 3% to a brutal 38% in an afternoon, and you close the worst of it by hand. The rest arrives on day ten, when the robot simply stops opening trades. It was a fourteen-day build that quietly expired.

Here is what you cannot do at any point in that story. You cannot open the file and read the rule that says "keep adding to losing trades". You cannot confirm whether the time limit was in the code or in your head. You cannot check the position sizing, the stop logic, or the maximum number of open trades. There is nothing to read, so there is nothing to verify.

The account size and the percentages are illustrative. The pattern is not. Position stacking and quiet expiry dates are two of the most common things hidden inside a compiled expert advisor, and the only reliable way to find them is to read the source. You cannot read source that was never shipped.

## The cost that outlasts the deposit

The lost money is the obvious cost. The quieter one is that you learned nothing you can reuse.

A closed EA teaches you a single fact: whether that black box made or lost money in one particular week. It does not show you why. The entry rule, the position size, the exit, the maximum exposure — all of it stays hidden, so you cannot carry any of it into your next decision. You are exactly as good at judging the next robot as you were before you downloaded this one.

That is the real trap. Free-but-opaque software is not cheap. It moves the price from your wallet to your time, then charges you again the next time you install something you cannot inspect.

There has to be a third option between "buy a tuned robot you cannot see inside" and "write an expert advisor from scratch". There is, and it is called an open-source framework. **EA31337 Libre** is one of the clearest examples on MetaTrader.

If your goal is a shortlist of finished, reviewed robots, our [best MT4 EA](/best-mt4-ea/) roundup and the [top ranking](/top-ranking/) table are the right pages. If your goal is to understand *how* automated trading actually works — and to own something you can inspect and change — keep reading.

## What exactly is EA31337 Libre?

EA31337 Libre is a free, open-source, multi-strategy trading robot for MetaTrader 4 and MetaTrader 5, written in MQL and released under GNU GPL-3.0. It ships with the full source code, so you can read and change every rule instead of trusting a compiled binary.

The project's own description is short: it aims to deliver a simple implementation of the EA31337 framework and the EA31337 strategies. Those are two separate repositories. The framework (`EA31337-classes`) holds the shared machinery — order handling, position management, indicator wrappers. The strategy library (`EA31337-strategies`) holds the decision rules. Libre wires the two together into one robot you can compile and run.

Concrete numbers, because they matter more than adjectives:

- **Over 35 strategies** ship with the robot, and each one can analyse the market on a different timeframe independently.
- The analysis is built on standard technical indicators you already recognise — moving averages, RSI, Bollinger Bands, MACD, Stochastic and others.
- The code is **compatible with both MQL4 and MQL5**, so the same project runs on either terminal.
- You are free to write your own custom strategies and add them to the set.
- The repository sits at roughly **257 stars and 110 forks** on GitHub, published as a public template you can copy.

What you are holding, then, is not a single expert advisor. It is a framework with a stack of strategies wired in. That word — framework — is the whole point of this page, and it is the difference between a tool you own and a tool you rent.

A framework is a starting point you can inspect, not a finished product you can trust blindly.

## What does a framework give you that a tuned commercial product does not?

Answer first: a framework gives you three things a tuned commercial EA cannot — readable source code, strategies you can switch on or off, and a risk model you can audit. A commercial product gives you its *conclusions*. A framework gives you its *reasoning*.

### 1. Source code you can actually read

With a compiled EA, the strategy is a claim. With EA31337 Libre, it is code you can open in MetaEditor and step through.

You can find the exact condition that opens a trade. You can see how position size is calculated. You can check whether the stop-loss is fixed, ATR-based, or missing entirely. None of that is hidden, so none of it has to be taken on faith. When a vendor tells you their EA "manages risk intelligently", you normally have to guess what that means. Here, you can look.

That auditability is the most underrated feature in free software. It does not make a strategy profitable. It makes a strategy *knowable*, which is the only honest starting point.

### 2. Strategies you can enable, disable or replace

A finished commercial EA is one opinion, frozen. EA31337 Libre hands you a stack of strategies and lets you decide which ones run.

Because each strategy can work off its own timeframe, you can run a fast, short-term rule on M5 while a slower rule reads H4. You can switch off the ones you have not tested. You can replace one entirely with your own logic without rewriting the order-management layer — the part most people get wrong when they build an EA by hand.

This is what "multi-strategy" buys you in practice: the ability to build a book of systems instead of betting everything on a single rule. It is also work. Bolting together strategies that all lose money in the same market conditions gives you a bigger version of the same weakness, not diversification.

### 3. A risk model you can audit

Most retail blow-ups in automated trading come from three things: position sizing that grows too fast, systems that add to losing trades (grid or martingale logic), and no hard cap on how many positions can be open at once.

In a closed EA, you discover all three after the fact, usually with a screenshot of the damage. In a readable framework, you can search the source for them before you attach it to anything. You can see whether the code averages down, whether it multiplies lot size, and whether it limits exposure. You can change any of it and recompile.

That is what an auditable risk model means in plain terms. Not a safer system by default — a system whose risks you are allowed to see and correct.

### The trade-off, stated plainly

| Option | What you get | What it costs you |
|---|---|---|
| Tuned commercial EA | A developed edge, hidden logic, a price tag | Visibility — you cannot inspect the rules |
| Open-source framework | Full visibility, control, no promises | Work — you do the testing and tuning |
| Build from scratch | Total control | Months of effort, most people never finish |

EA31337 Libre sits in the middle column, and it is honest about being there.

## How does EA31337 Libre split strategy from execution?

Answer first: it separates the *strategy* — the rule that decides to trade — from the *execution layer* — the code that places and manages orders. That split is what makes the project a framework rather than a single robot.

In a typical home-made EA, the two are tangled together. The entry condition, the position size, the stop-loss and the exit all live in one file, often in one function. Change the entry rule and you risk breaking the order handling. That is why so many DIY robots are never finished: every improvement threatens the machinery around it.

EA31337 Libre organises things differently. The framework repository (`EA31337-classes`) owns the shared parts — talking to the terminal, opening and closing positions, tracking the order pool, wrapping indicators. The strategies repository (`EA31337-strategies`) owns the decisions — when to signal a buy, a sell, or nothing. Libre itself is the thin layer that wires the two into a buildable expert advisor.

The practical result is that a strategy becomes a small, self-contained unit. You can add one, remove one, or swap one out without touching the code that manages money and orders. For someone learning automation, that is the most useful structural lesson in the project, because it is the shape professional trading systems are built in.

There is a second benefit hidden in the same design. Because the framework abstracts the terminal, the same strategy source can be compiled for MetaTrader 4 and MetaTrader 5. MQL4 and MQL5 are not interchangeable, so most developers maintain two products or support only one. Writing once and building twice is a genuine engineering saving, not a marketing line.

None of this makes the strategies good. It makes them *modular*, which means you can judge and replace them one at a time instead of treating the whole robot as an indivisible bet. That is the difference between a framework you can improve and a product you can only accept or discard.

## What does EA31337 Libre not give you?

Answer first: it does not give you a tuned edge, ready-made presets, or commercial support. The author says so directly — the project is intended for education and research, and is not suitable for real trading without relevant knowledge.

That warning is worth quoting rather than paraphrasing:

> "You can freely use this project for education or research purposes. However, this project is not suitable for the real trading without relevant knowledge."

Read that as a feature, not a flaw. A vendor who told you the truth this plainly would sell fewer copies. Here is what each part of it costs you in practice.

- **No tuned edge.** The strategies are raw building blocks. Nothing is optimised for your broker, your symbol, or your timeframe. The edge, if there is one, is whatever you create by testing and combining.
- **No presets.** There is a `sets/optimize` folder for optimiser inputs, but you generate your own set files. There is no set-and-forget configuration, and no "install and profit" story.
- **No commercial support.** Help comes from GitHub discussions, issues, and a Telegram channel. That community is genuinely useful, but there is no service-level promise and no guarantee anyone answers in your timezone.
- **No plug-and-play for live accounts.** The author recommends MetaTrader 5 for backtesting and says plainly that backtesting cannot reliably simulate future outcomes.
- **No warranty.** Like all GPL software, it is provided as-is. If it loses money, the licence and the author say the same thing: the outcome is yours.

| What it gives you | What it does not give you |
|---|---|
| Full, readable MQL source | A strategy tuned for your account |
| 35+ strategies you control | Optimised preset files |
| MetaTrader 4 and 5 support | A promise it makes money |
| A community on GitHub and Telegram | Commercial support with a service-level promise |
| GPL-3.0 freedom to modify and share | Any warranty at all |

## Why does GPL-3.0 matter if you modify and redistribute it?

Answer first: GPL-3.0 is a *copyleft* licence. You can use, change and share the software for any purpose. The condition is that any version you *distribute* must stay free under the same licence.

Two words carry all the weight: "distribute" and "copyleft".

**Distribute** is the trigger. If you change the code and keep it to yourself — on your demo account, on your own live account — you have no obligation to publish anything. Modify it freely. The licence simply does not reach private use.

**Copyleft** is what happens when you hand it to someone else. The moment you share or sell a modified version, GPL-3.0 requires you to:

1. Licence that version under GPL-3.0 as well.
2. Keep the original copyright and licence notices in place.
3. Make the corresponding source code available to whoever receives it.
4. Add no extra restriction that removes a freedom the licence already grants.

That is why you will not find a GPL expert advisor sold as a closed premium product with the logic hidden. The licence forbids closing it back up. It protects the commons: whatever anyone builds on the project publicly stays open for the next person.

What the licence does **not** require is just as important. It does not force you to publish your private changes, it does not stop you trading your own modified build on your own account, and it does not demand royalties or a fee. GPL-3.0 is not a paywall or a permission slip you have to request. It is a condition that travels with the code: share the freedoms you were given when you pass the work on.

### How GPL-3.0 compares to the permissive licences

Not every open EA project works this way, and the difference changes what you can legally do with a fork.

| Licence | Copyleft? | Must you share changes you distribute? | Commercial use |
|---|---|---|---|
| GPL-3.0 (EA31337 Libre) | Yes | Yes | Allowed |
| MIT (many MT5 libraries) | No | No | Allowed |
| Apache-2.0 (many small EAs) | No | No | Allowed |

The practical reading:

- If you want to **sell a modified EA as a closed product**, GPL-3.0 is the wrong licence for you. Choose a permissive one, or open your fork.
- If you want a **permanent, inspectable tool you can keep**, copyleft is a feature, because nobody can take the community's work, improve it, and close it off.

If you want to compare licences in the wild, the [geraked MT5 collection](/geraked-mt5-expert-advisors-free-download/) is MIT, the [TeknoTrader MQL4 indicators](/teknotrader-mql4-indicators-free-download/) are Apache-2.0, and Libre is GPL-3.0. Three permissive-to-copyleft examples, all free, all readable.

One more clause matters to anyone trading money: GPL-3.0 disclaims warranty. The software comes as-is, and no one is liable for what it does on your account. Read that as the honest baseline, not a technicality.

## How do you evaluate EA31337 Libre on demo before risking real money?

Answer first: put it in the MetaTrader 5 Strategy Tester on your own broker's data, then forward-test it on a demo account for several weeks, changing one variable at a time. No framework earns trust by reading alone.

Here is the sequence that actually filters out bad configurations instead of flattering them.

**1. Start in the Strategy Tester, not on a live account.** The author recommends MetaTrader 5 because its tick modelling is more accurate than MetaTrader 4's. Same code, better evidence.

**2. Understand what modelling quality does and does not tell you.** A 99% modelling-quality backtest means the price data was detailed. It does not mean the strategy is valid. High quality with a bad idea is still a bad idea.

**3. Backtest on the broker you will actually trade.** Spread, commission, swap and execution differ between brokers. A result on one feed is not the same system on another's.

**4. Change one parameter at a time.** If an improvement only appears at one specific setting, you have fitted noise, not found an edge. Real edges survive small changes; curve-fits do not.

**5. Hold back data you never optimised on.** Tune on one period, then check the result on a later period you did not touch. If it collapses out of sample, it was fitted.

**6. Forward-test on demo for at least a month.** You want quiet weeks, volatile weeks, and a news event or two. Demo fills are not real fills, but a month of forward behaviour still exposes logic that backtests hide.

**7. Record the numbers, not the vibes.** Track drawdown and profit factor with a tool such as Myfxbook so you have a written record. Decide your maximum acceptable drawdown *before* you start, and stop if it is reached.

| Evaluation check | What you are looking for |
|---|---|
| Same code, both terminals | A clean compile on MetaTrader 4 and 5 |
| Out-of-sample test | Performance that survives unseen data |
| Broker-specific data | Results that hold on your real spread |
| One-variable changes | Robustness, not a single lucky setting |
| Forward demo month | Behaviour across different market conditions |
| Position limits | A visible cap on open trades |

The point of all this is not to find a robot that always wins — that does not exist. It is to find out, cheaply and on demo, whether a system behaves the way you expect when the market stops cooperating. That is the question a compiled EA lets you answer only with real money.

## Which mistakes do traders make with a free framework?

Answer first: they skip the backtest, trust the code because it is open, and treat "free" as "safe". Openness removes one risk — opacity — and leaves every other risk exactly where it was.

The most common errors, roughly in order of how much they cost:

- **Assuming open source means safe.** Readable code is not good code, and good code is not a profitable strategy. You still have to test the logic, because a clean, honest rule can still lose money steadily.
- **Running it live before forward-testing.** Backtest results, however detailed, are not live behaviour. A month on demo costs nothing and catches the things a backtest hides.
- **Ignoring the grid and martingale question.** Search the source for averaging-down and lot multiplication before you accept any equity curve. A smooth curve built on stacked losing positions is a drawdown waiting for the right trend.
- **Over-optimising.** The more parameters you tune to one history, the worse the system tends to do on the next one. Fewer knobs, set robustly, usually beats a perfect fit.
- **Betting on one strategy.** The framework's value is combination — several rules that fail at different times. Running a single strategy you found in the repo throws that away.
- **Forgetting the licence.** If you plan to redistribute what you build, GPL-3.0 has terms. Know them before you ship a fork.

Every one of these is avoidable with demo work and a little reading. None of them is fixed by choosing a different download.

## Who is EA31337 Libre for — and who should skip it?

It is for people who want to build understanding, not buy it. Specifically:

- **MQL developers** who want a working multi-strategy framework to study or extend.
- **Traders learning automation** who would rather read real source than trust a black-box `.ex5`.
- **Researchers** combining strategies and wanting a free, licence-clear base to test against.

It is not for you if:

- You want a finished EA to attach to a funded account and leave running. The author says no, and we agree.
- You will not backtest. A framework rewards testing and punishes guessing.
- You expect presets, signals, or someone to tune it for you. None of that is in the box.

If those last three sound like you, a framework is the wrong tool, and that is fine. A curated shortlist is the right tool — our [top ranking](/top-ranking/) page ranks finished robots, and if you would rather mirror other traders than run your own code, [copy trading](/copy-trading/) is a completely different route.

## What do you actually get when you download it?

You get the whole project from its origin, with nothing held back and nothing charged. There is no upsell, no licence key, and no "pro" tier where the good version lives.

| Spec | Detail |
|---|---|
| Product | EA31337 Libre |
| Type | Multi-strategy expert advisor framework |
| Platforms | MetaTrader 4 and MetaTrader 5 |
| Languages | MQL4 / MQL5 from a single codebase |
| Strategies | 35+, individually configurable, per-strategy timeframes |
| Source code | Included — full MQL source |
| Underlying projects | EA31337 framework and EA31337 strategies |
| Licence | GNU GPL-3.0 |
| Author | EA31337 project |
| Price | Free |
| Hosting | External — the source repository on GitHub |
| Recommended testing | MetaTrader 5 Strategy Tester, then a demo account |

The repository itself is organised the way a real software project is: a `src` folder for the code, a `sets/optimize` folder for optimiser inputs, a `docs` folder, and a `.gitmodules` file that pulls in the framework and strategy libraries. That structure is part of the value — you are not just getting an idea, you are getting a codebase you can build on.

Because it is hosted at the source, you always get the current version rather than a copy that has drifted. The download button below links straight to the project.

And the same honest list from earlier still stands, because it is the reason this page exists:

- It is **not** a tuned edge, and it is **not** a preset configuration.
- It is **not** supported as a commercial product — help is community-based.
- It is **not** suitable for real trading without relevant knowledge, in the author's own words.

What it *is*: a free, inspectable, GPL-3.0 framework you can read, compile, test, and modify. For a lot of traders, that is worth more than another tuned robot they cannot see inside. For our broader library of tools you can actually inspect, the [free download hub](/free-download-forex-ea-indicator/) collects them in one place, and the [blog](/blog/) covers the testing method end to end.

## Your next move: read the source before you risk a cent

One action. Open the EA31337 Libre repository, read the strategy code, compile it in MetaEditor, and run it in the MetaTrader 5 Strategy Tester on a single symbol. Then move it to a demo account and let it run.

That is the whole play. Not because the robot will be profitable — nobody can tell you that, and anyone who does is selling something. Because by the end of it, you will understand what this expert advisor does, how it sizes positions, and how it exits, instead of guessing from a screenshot.

A framework is a starting point you can inspect, not a finished product you can trust blindly. EA31337 Libre is a strong, genuinely free starting point for anyone who wants to stop taking software on faith. Whether you keep it or replace every strategy with your own, the source is right there — and that is the part no closed EA can ever give you.

Before anything real: test on demo first. Trading forex and CFDs carries a high risk of loss and is not suitable for everyone, and leverage can work against you as easily as for you. Nothing on this page is financial advice, and neither we nor the original author accept liability for trading losses. Only ever risk money you can afford to lose.
