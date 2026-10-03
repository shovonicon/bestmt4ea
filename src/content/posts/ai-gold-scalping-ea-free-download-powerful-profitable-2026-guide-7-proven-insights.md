---
wpId: 127111
title: "AI Gold Scalping EA: What “AI” Really Means in Code"
slug: "ai-gold-scalping-ea-free-download-powerful-profitable-2026-guide-7-proven-insights"
description: "Most AI gold scalping EA claims hide a simple switching rule. This guide explains what AI really means in MQL code and what it can and cannot do on XAUUSD."
publishedAt: "2026-02-13T21:28:14.000Z"
updatedAt: "2026-09-29"
seo:
  title: "AI Gold Scalping EA: What “AI” Really Means in Code"
  description: "AI gold scalping EA marketing hides what the code does. Learn the four levels of “AI” in retail EAs and how to test whether the model layer adds anything."
  canonical: "https://bestmt4ea.com/ai-gold-scalping-ea-free-download-powerful-profitable-2026-guide-7-proven-insights/"
  ogImage: "https://bestmt4ea.com/wp-content/uploads/2026/07/post_127111_featured.webp"
sourceUrl: "https://bestmt4ea.com/ai-gold-scalping-ea-free-download-powerful-profitable-2026-guide-7-proven-insights/"
categories:
  - "Free Forex EA"
categoryPaths:
  - "/category/free-forex-ea/"
tags: []
draft: false
quickAnswer: "Inside a retail gold EA, “AI” usually means one of four things: a rule that switches between pre-set behaviours, parameters recalculated from recent bars, a small regression or classification model trained offline, or a model exported to ONNX and loaded by MetaTrader 5. On XAUUSD, spread, latency and short samples limit all four. Most “AI” EAs are a switching rule, and that is fine where it is described honestly."
keyTakeaways:
  - "Most “AI” in retail gold EAs is a switching rule: fixed conditions pick between two or three pre-set behaviours. That is a valid design, not a lie — as long as the seller says so."
  - "There are four real levels: switching rules, adaptive parameters, small offline-trained models, and models exported to ONNX inside MetaTrader 5. Each adds capability and each adds a new way to fail."
  - "On XAUUSD you pay the spread on every trade, so a model layer has to improve the average trade by more than a few tens of cents per ounce just to pay for itself."
  - "A model trained on a few years of gold bars is a small sample. It can look excellent in the MetaTrader 5 Strategy Tester and still be noise."
  - "You can check any AI gold EA with an ablation test: same period, model layer on versus off, then compare net profit, trade count and maximum drawdown."
faqs:
  - question: "Is an AI gold scalping EA actually using machine learning?"
    answer: "Usually not in the strict sense. Most gold EAs sold as AI are rule-based systems whose conditions switch between two or three pre-set behaviours. A smaller number add a regression or classification model trained offline, and fewer still load a real ONNX model inside MetaTrader 5."
  - question: "What does “AI-powered” mean in an EA description?"
    answer: "In practice it means the EA changes what it does based on something it measures, such as volatility, spread, session time or recent results. That is a control layer, not a brain. Ask which input it reads and what changes as a result."
  - question: "Can a Python-trained model run inside MetaTrader 4?"
    answer: "Not natively. MetaTrader 4 has no ONNX runtime, so a trained model reaches an MT4 EA through a bridge such as ZeroMQ, through a DLL, or by having its learned thresholds copied into MQL and written out as ordinary rules."
  - question: "Why is XAUUSD harder for a model than EURUSD?"
    answer: "Gold moves further in a day, so a wrong position costs more, and spreads are wider in dollar terms. It also reacts violently to rate and inflation news, so the same logic that worked in a quiet month can invert in a volatile one. Fewer stable patterns mean a shorter usable sample."
  - question: "How long should a demo test run before trading real money?"
    answer: "Long enough to cover at least two different market regimes and one major news cycle, measured on real spreads — usually three months or more. If the EA only looks good in one of those months, you have measured luck rather than behaviour."
  - question: "Does adding an ONNX model make a gold EA better?"
    answer: "Only if the model has an edge that survives costs. ONNX is a file format plus functions such as OnnxCreate and OnnxRun; it adds no predictive power by itself. Measure net profit and drawdown with the model on and off, and keep it only if the change is bigger than the noise."
sources:
  - label: "BAKOME-Hub/gold_bakome — open-source XAUUSD expert advisor, MIT-licensed MQL5 source"
    url: "https://github.com/BAKOME-Hub/gold_bakome"
  - label: "MQL5 Reference — ONNX models in MetaTrader 5"
    url: "https://www.mql5.com/en/docs/onnx"
  - label: "MQL5 Reference — Python integration for MetaTrader 5"
    url: "https://www.mql5.com/en/docs/python_metatrader5"
primaryKeyword: "AI gold scalping EA"
installSteps:
  - name: "Read the repository and the licence"
    text: "Open the project page and read the README and the MIT licence before you download anything, so you know what the expert advisor claims to do and what you are permitted to do with it."
  - name: "Download the MQL5 source"
    text: "Take the .mq5 source rather than a compiled .ex5. Source is the whole point of an open-source robot: you can read the entry logic and the stop before it ever touches a chart."
  - name: "Open your MetaTrader 5 data folder"
    text: "In MetaTrader 5 choose File, then Open Data Folder, and place the source in MQL5/Experts. MetaTrader 4 will not compile MQL5 files, so this is an MT5-only download."
  - name: "Compile in MetaEditor"
    text: "Open the .mq5 in MetaEditor and press F7. A clean build writes a compiled expert beside the source, and any error line points at the exact problem rather than hiding inside a binary."
  - name: "Attach it to a demo XAUUSD chart"
    text: "Drag the expert onto a XAUUSD chart on a demo account and confirm the symbol name matches Market Watch, because a suffix mismatch means the EA will never trade."
  - name: "Backtest, then forward-test on demo"
    text: "Run the Strategy Tester on real ticks, then leave it on a demo account for at least four weeks and thirty closed trades before any live order is considered."
download:
  origin: "opensource"
  license: "MIT"
  licenseUrl: "https://opensource.org/license/mit"
  author: "BAKOME-Hub"
  sourceUrl: "https://github.com/BAKOME-Hub/gold_bakome"
  version: "latest"
  platform: "MT5"
  externalUrl: "https://github.com/BAKOME-Hub/gold_bakome"
  updatedAt: "2026-09-29"
---

Search for a free "AI gold scalping EA" and you land on a wall of pages that all say the same thing. The robot is powered by artificial intelligence. It learns the market. It never sleeps. Not one of them tells you what the AI is.

That silence is the real problem. Someone is asking you to trust a black box with money, and the words on the sales page give you nothing you can check. So you do what most traders do. You download it, run it on demo for two weeks, watch the equity curve climb, go live, and then discover that the "AI" was a spread filter with a clever name.

Here is the honest version, up front. Most retail "AI" gold EAs are not learning anything. They are a switching rule — a short list of conditions that decides which of two or three pre-set behaviours runs right now. That is a legitimate design. It is also nothing like what the marketing implies, and the gap matters when you decide how much of your account sits behind it.

This page is not a review of any product, and it is not a setup walkthrough. It is the vocabulary you need to look at any AI gold scalping EA and answer one question: what is actually making the decision? Answer that, and you can decide rationally whether to run it — and how much risk it deserves.

## Why did the robot that looked good for eleven days fall apart on the twelfth?

A reader wrote in during June 2026 with a story worth reading slowly. He had paid $399 for a gold scalping robot advertised with three phrases he still remembered word for word: adaptive neural engine, self-learning risk model, and tunes itself to volatility. The vendor showed a rising equity curve. Nothing described how the thing decided to buy.

He ran it on a demo for two weeks. Gold was calm and trending. The account grew, the win rate looked healthy, and the familiar pull arrived: this is working, why waste time on a simulated account? He funded a live account with $5,000 and kept the same settings.

Eleven days later, gold reacted to a US inflation release. The spread on XAUUSD widened from roughly 25 cents to more than a dollar for several minutes. The robot had never met that condition. It kept trading. It took a run of entries into the wide spread, held the losers, then took the next position the same way. By the time he closed the terminal, about a third of the account was gone. The "self-learning risk model" had not changed a single setting, because there was nothing inside it that learned. There was one rule about volatility, and that rule had been built on a demo fortnight that contained no inflation release.

The expensive part was not the trade. It was that he had nothing to check before funding the account. He could not read the code. The vendor would not describe the logic. The only evidence on offer was a two-week demo in a market that no longer existed.

That is the cost of doing nothing here. Not the $399 — the funded account you hand to a mechanism you cannot describe. The fix is cheap. Learn the four things "AI" can mean, learn which of them survives contact with XAUUSD, and learn one test that shows whether the model layer is doing any work at all.

## What does “AI” actually mean inside a retail gold EA?

Inside a retail gold EA, "AI" almost always means one of four things, and only two of them involve a trained model. They are a switching rule, adaptive parameters, a small model trained offline, and a model exported to a file that MetaTrader runs directly. Every product you will ever see marketed as AI sits somewhere on that short ladder, and knowing which rung it stands on tells you more than any backtest screenshot.

**Level 1 — a switching rule.** The most common by a wide margin. The EA measures a handful of things — spread, average true range, hour of the day, the outcome of the last twenty trades — and uses straightforward if/else logic to pick a mode. Trend mode trails a stop. Range mode takes profit at a fixed level. There is no model file. Nothing is trained. There is a decision table, and a human wrote it. Most "AI" gold EAs live here, and the honest ones describe themselves as adaptive rather than intelligent.

**Level 2 — adaptive parameter selection.** Same shape, but the numbers move. The EA recalculates stop distance, position size or a threshold from recent data, such as the average true range of the last 200 bars. Nothing is trained. A formula is applied, and the formula's inputs change. This genuinely helps on gold, because gold's daily range in a quiet summer week can be a fraction of what it is around a Federal Reserve decision.

**Level 3 — a small regression or classification model.** Now a model exists. It was trained offline, in Python, on historical gold bars using features someone engineered by hand. Live, it outputs a probability, and the EA uses that number as a filter: take the setup if the score clears 0.6, skip it otherwise. Usually it is logistic regression, a shallow decision tree, or a small gradient boosting model, loaded either as a set of coefficients written in MQL or as a compact file.

**Level 4 — a model exported to MQL or ONNX.** MetaTrader 5 ships an ONNX runtime. You can train in PyTorch or scikit-learn, export the model, and call `OnnxCreate` and `OnnxRun` straight from an expert advisor. MetaTrader 4 has no equivalent runtime, so an MT4 product claiming a neural network is either shipping a DLL, talking to an external process, or exaggerating the part about the network.

Level 4 is not automatically better. A badly trained level 4 model is worse than a well-tested level 1 rule, because it adds a failure mode you cannot read. What the ladder gives you is a question to ask, and a way to judge the answer.

## Which marketing words map to which pieces of code?

Treat the table below as a translation dictionary. When a term appears in the left column, the middle column is what usually sits inside the file, and the right column is what to ask before you install anything.

| Marketing term | What it usually means in code | What to ask |
|---|---|---|
| "AI engine", "AI-powered" | A switching rule: a few measured inputs select between two or three pre-set behaviours | Which inputs does it read, and what changes when they move? |
| "Neural network" | Either a real exported model, or a fixed set of hand-tuned weights wearing a neural name | Which framework trained it, and can I see the model file? |
| "Self-learning" | Parameters recalculated from recent bars, such as ATR-based stops or dynamic position sizing | What is the lookback window, and does the EA report when it changes? |
| "Machine learning" | A small classification or regression model trained offline and used as an entry filter | What are the input features, and how many bars were used? |
| "Deep learning", "LSTM" | Frequently an ordinary indicator until you ask for the model file | Where is the model file, and how large is it? |
| "Predicts the market" | A breakout, momentum or mean-reversion rule with a confidence threshold bolted on | What is the base rule the prediction is throttling? |
| "Learns while it trades" | Almost never. Usually a one-off optimisation pass that ran before delivery | When was it tuned, on which dates, and how many parameters moved? |
| "Quantum", "Neuro", "Cyber" | Branding. Nothing technical survives the first question. | Nothing. Ignore it. |

If a page uses the left column and cannot answer the middle column, you have learned something worth having without spending a cent. That alone puts you ahead of most buyers of gold robots.

## Is a switching rule actually a problem?

No. A switching rule is a good engineering choice, and calling it AI is where the trouble starts. Rules are fast, they run happily on a modest VPS, you can read them line by line, and they behave in a backtest roughly the way they behave live — provided the backtest used realistic spreads and real commission.

There is a second, less obvious advantage. A rule has few parameters, and few parameters are hard to overfit. When you tune two thresholds against 20,000 gold bars, you will usually find a setting that worked in the past and will not work again. When you tune forty parameters against the same bars, you are close to certain to. Model-heavy systems sit in that second category by default, which is why so many of them look superb in the Strategy Tester and ordinary a month later. If you want the wider comparison, [what the main MT4 EA families actually do](/best-mt4-ea/) is a useful companion to this page.

So the honest description of a level 1 product is not a confession. It sounds like this: "An adaptive XAUUSD rule set. It switches between a trend mode and a range mode using average true range and session time. It does not use a trained model. It took an average of X trades a day from 2019 to 2026, with a maximum drawdown of Y, and it lost money in Z separate months."

That paragraph is worth more to you than every neural badge on the internet, because you can check it.

What a rule cannot do is the other half of the story. It cannot recognise a condition nobody wrote a branch for. That is exactly what happened to the reader above: his EA had a volatility rule, the rule was built on quiet data, and the one week that mattered was not quiet.

## What does adaptive parameter selection actually change on XAUUSD?

Adaptive logic changes the size of your risk, not the quality of your signal, and that distinction is the whole section. When an EA recalculates its stop from recent average true range, it is not getting smarter about direction. It is holding the distance between price and stop roughly constant in volatility terms, so an ordinary gold swing does not knock it out by accident.

On XAUUSD that matters more than it sounds. Gold's daily range is not stable. A quiet week and a Federal Reserve week can differ by a factor of three. A fixed 200-cent stop that sits comfortably outside the noise on a Monday can sit inside the noise on a Thursday, which is how traders end up with the same strategy producing two completely different equity curves in the same month.

What adaptive sizing can do:

- Keep stop distance proportional to current volatility instead of a constant.
- Scale position size down when range expands, so each trade risks a similar share of the account.
- Reduce the number of stop-outs caused by ordinary noise rather than by a genuine reversal.

What it cannot do:

- Improve your hit rate. A better-fitting stop does not find better entries.
- Detect a scheduled news release. A 200-bar window on M5 covers about sixteen hours, so it is still describing yesterday's calm while the release is happening.
- Rescue a wrong idea. If the entry has no edge, adaptive sizing just loses money in a tidier pattern.

The trap to watch for is the lookback window. An EA that recalibrates itself on Friday's data has already forgotten Monday. Ask what the window is, and test what happens when you change it. If a strategy only works at one window length, the window is a fitted parameter, not a reflection of how gold behaves.

## Do regression and classification models belong in an EA?

Yes, but as a filter rather than an oracle, and only when you can show the filter earns more than it costs. A small classifier that says "skip this setup" is a realistic use of machine learning in a retail EA. A model that says "buy now" is a much taller order, because the question changes from "is this a decent setup?" to "is this better than every other moment in the sample?"

The part that decides whether it works is not the algorithm. It is the label. If you define a winning bar as "price rose 50 cents within 60 bars", you have not discovered a market truth — you have restated a strategy. Many people then train a model that rediscovers the label rule and call the result an edge. That is the single most common mistake in retail machine learning on gold.

Sample size is the second problem. M5 gold gives you roughly 288 bars a day and about 72,000 a year, which sounds like plenty until you count independent trades instead of bars. Overlapping trades, repeated setups in the same hour and the same news-driven moves mean your real sample is often a few hundred observations. Fit twelve parameters to 400 observations and you will be fitting noise more often than signal.

Keep models small, keep features few, and judge them on data they have never seen. If a model needs a GPU to run, you probably should not trust it with a gold position, and you almost certainly cannot explain it to yourself when it starts losing.

## What can an offline-trained model exported to MQL really do?

An exported model can turn engineered inputs into a probability inside your terminal, and nothing more than that. It is a function: you hand it numbers, it hands back a number. There are three realistic ways to deliver it, and each has a different cost.

### Route 1: ONNX inside MetaTrader 5

MetaTrader 5 loads ONNX models natively. You create a session with `OnnxCreate`, set the input and output shapes, run the model with `OnnxRun`, and release it with `OnnxRelease`. Two advantages matter: inference happens in the terminal, so no second process has to stay alive, and the whole thing runs inside the Strategy Tester.

The limits are practical. Not every operation a modern framework emits is supported, and you usually discover that when the session fails to load. Input shapes and data types have to line up, though MQL5 converts many types for you. And because the model is a file, it ages: a model trained on data up to 2024 is a model describing 2024. Retraining has to be a scheduled, boring routine, or you are trading stale parameters while believing you are trading intelligence.

### Route 2: weights copied into MQL

For a small model, the most honest delivery is no delivery at all. A logistic regression is a dot product and an intercept. Write the coefficients into the MQL source, and the EA suddenly has no model file, no DLL, no version drift, and no dependency that can break on a client update. You can also read the weights and ask whether they make sense for gold.

The trade-off is maintenance. Retraining means editing and recompiling code. If you want to see what readable automation logic looks like in practice, [the EA31337 Libre build](/ea31337-libre-free-download/) is a good study: full source, no hidden binary, and a licence that tells you plainly what you may do with it.

### Route 3: a bridge to Python

When the model is too large to port, or when you are on MetaTrader 4 and have no ONNX runtime at all, the model can live in Python and the EA can talk to it. The EA keeps its rules, the model stays in the environment where it was trained, and the two pass messages over a socket.

This is the most flexible route and the most fragile. You now have two processes that must both stay alive, error handling for a connection that drops mid-trade, a VPS that has to run both, and a round-trip delay you did not have before. It is a reasonable engineering choice. It is not a shortcut.

## Why do spread, latency and sample size decide the answer on XAUUSD?

Gold is not difficult because it is volatile; it is difficult because volatility, cost and sample size push against you at the same time. Those three limits decide whether a model layer helps or hurts, and no amount of training changes them.

### Spread is a cost you pay on every trade

A typical XAUUSD spread sits somewhere between 20 and 35 cents, and it widens sharply during scheduled news. One standard lot of gold is 100 ounces, so a 25-cent spread is about $25 in and out on a single lot, before commission.

Now look at the target. A scalper aiming for a dollar and a half of movement per trade is paying roughly a sixth of the gross move in spread. For a model layer to be worth anything, it has to improve the average trade by more than that cost, consistently, on data it has never seen. This is why a filter that raises your win rate by a couple of percentage points can still reduce net profit: it may remove the trades that were covering the spread.

### Latency turns a signal into a guess

If your decision has to travel to another process and back, you are deciding on a price that may already be gone. On a quiet gold afternoon a full round trip is invisible. During a release, price can move tens of cents in the time it takes a message to cross a socket twice.

Keep the decision inside the terminal whenever you can. If you bridge, measure the round trip yourself instead of assuming it, compare the fill you assumed with the fill you received, and treat slippage as a first-class number in your test — not something you discover on a live account at the worst moment of the month.

### Short samples make every result look clever

Here is the arithmetic that ruins most gold-EA claims. Suppose your EA takes 30 trades a month. Over a year that is 360 trades. A result built on 360 trades and a dozen tuned parameters is well inside the range that luck can produce, and a profitable year tells you almost nothing about the next one.

This is not a reason to avoid testing. It is a reason to test properly: use tick data rather than modelled prices, test on a spread that matches your broker's worst hours rather than its best, and prefer a strategy that survives small parameter changes over one that only shines at exactly one setting.

## How can you tell whether the AI is doing anything at all?

Run an ablation test. It is the only test that answers the question, it takes an afternoon, and it does not require trust in anybody's marketing.

The method: change nothing but the thing you are testing. Same symbol, same period, same spread model, same risk settings, same broker data. First run the EA with the model or filter layer switched on. Then run the identical build with that layer bypassed. Compare three numbers — net profit, trade count, and maximum drawdown.

Read the output like this:

- **Trade count falls, profit is flat.** The layer is not adding information. It is only reducing exposure. That can still be useful, but the honest description is "fewer trades", not "smarter entries".
- **Drawdown improves, profit holds.** The filter is doing real work. This is what a genuine edge in a filter looks like.
- **Both get worse.** The layer is decoration, or it is fitted to the past. Turn it off.

Then do the boring checks. Open the EA's input list and see how many parameters you can tune; multiply that number by your sample size and you will know how much of the result is fitted. Ask for the model's training window and whether retraining was scheduled. Run the same strategy on two other brokers' spreads. Run it forward on a demo for at least three months, covering two different regimes, and keep a statement you can audit rather than a curve you can screenshot. A worked method for that is in [how to backtest and forward-test EAs](/forex-tester-online-backtesting-with-eas-tutorial-the-ultimate-step-by-step-guide/), and it applies to a Python bridge exactly as it does to a plain MQL rule.

If you are comparing EAs across brokers or accounts, publish the verified results on a third-party tracker such as Myfxbook rather than showing a platform screenshot. A monitored account is evidence. A screenshot is a picture.

## What does an honest AI gold EA description look like?

An honest description names the mechanism, states the sample and admits the conditions where it loses. That is the entire standard. Here is the same system written twice.

| What a weak page says | What an honest page says about the same system |
|---|---|
| "Powered by AI" | "An adaptive rule set with two modes, selected by average true range and session time" |
| "Self-learning" | "Stop distance recalculated from a 200-bar ATR window at the start of each session" |
| "High accuracy" | "1,840 trades on M5 XAUUSD from 2019 to 2026, 58% win rate, 1.21 profit factor before commission" |
| "Low risk" | "Maximum drawdown 22% at 1% risk per trade; losses happen and a losing month is normal" |
| "Works in all market conditions" | "Performs poorly in the 90 minutes around scheduled US data and in thin holiday sessions" |
| "No experience needed" | "You need to be able to read an input list and check a drawdown number" |

Neither column promises anything. Only the right-hand column gives you something you can decide on, and only the right-hand column survives being read next to a live account statement.

## What you get with this download

The download on this page is **Gold Bakome EA**, an open-source XAUUSD expert advisor for MetaTrader 5 released with full MQL5 source under the MIT licence. It is not a neural network and it does not pretend to be one. It is a working, readable gold robot — the concrete level 1 or level 2 system described above, sitting on a page about how to tell that kind of code apart from marketing.

Why this instead of another "AI" robot: because the point of this page is that you should be able to see what makes the decision. With the source in hand you can read every branch the EA takes, check that it exits on a stop rather than averaging into a loser, and run the ablation test yourself instead of trusting a curve. Nothing is sealed inside a file you cannot open.

| Component | Detail |
|---|---|
| What it is | An XAUUSD expert advisor with adaptive logic and a fixed stop |
| Platform | MetaTrader 5 (MQL5), full source provided |
| Risk model | No grid and no martingale — losers are cut on a stop, not averaged into |
| Licence | MIT, as stated on the repository |
| Author | BAKOME-Hub |
| Symbol focus | Built around gold, so test it on your own broker's XAUUSD |
| Requirement | A MetaTrader 5 build new enough to compile and run the source |

The wider free-download library on this site is worth a look while you are here — [the free EA and indicator index](/free-download-forex-ea-indicator/) covers tools grouped by what they actually do, and [the open builds in the free-forex-EA category](/category/free-forex-ea/) are documented with credit to their authors.

### What it does not do

It does not bring a trained model. There is no ONNX file, no offline classifier and no learning layer inside it. If you want to build the level 3 or level 4 setups described above, the EA is your starting point and the model work is still yours to do — features, labels, training and a validation split.

It does not promise an edge. It is an adaptive rule set, which means it can be right about volatility and wrong about direction, and it can lose money in exactly the sustained conditions the levels above describe. Read the logic and decide for yourself which rung of the ladder it stands on.

It does not remove latency, and it does not fix a bad idea. Running everything inside the terminal is a shorter route than a Python bridge, but no stop, session filter or adaptive setting changes the fact that gold can gap through the level you planned to exit at.

Trading gold with leverage carries a high risk of loss and is not suitable for everyone. Nothing here is financial advice, and no configuration of these tools changes the fact that a session can end with less money in the account than it started with.

## Start on demo, then decide with your own numbers

Here is the one action worth taking today. Open the repository, read the source, and put the expert advisor into a demo terminal. Not a funded account. A demo, where a mistake costs you an afternoon instead of a rent payment.

Then run the ablation test on your own idea. Log the inputs. Log the probability. Log the fill. Compare the run with the model layer against the run without it, on the same period and the same spread. If the model earns its keep, you will see it in net profit and drawdown, and you will be able to explain why to someone else. If it does not, you have saved yourself the exact mistake the reader above paid for — and that is a far better outcome than a rising demo curve.

Most "AI" gold EAs are a switching rule. That is not a scandal; it is a design. What matters is whether the description tells you the truth about it, and whether you took the time to measure the thing yourself before you funded the account. Start with the demo. Then let the numbers argue.

For more on evaluating automation honestly rather than quickly, the guides on the [BESTMT4EA blog](/blog/) are written for exactly this job.
