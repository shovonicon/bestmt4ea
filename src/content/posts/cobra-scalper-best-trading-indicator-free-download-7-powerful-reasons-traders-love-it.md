---
title: "Cobra Scalper Indicator: Scalp Without the Blowup"
slug: "cobra-scalper-best-trading-indicator-free-download-7-powerful-reasons-traders-love-it"
description: "Cobra Scalper indicator guide: read the signals honestly, check for repainting, and stress-test the grid recovery layer before you trade it with real money."
publishedAt: "2026-02-20T18:40:28.000Z"
updatedAt: "2026-10-08T00:00:00.000Z"

categories:
  - "Forex Scalping"
  - "Forex Trading Strategies"

tags: []

quickAnswer: "The Cobra Scalper is a free scalping indicator name used across several MetaTrader 4 and MetaTrader 5 builds, so the version you download decides the behaviour. Read it honestly: only act on signals that survive the candle close, test for repainting yourself, and treat the grid or averaging layer around it as the real risk. The free worksheet with this guide stress-tests that layer."

keyTakeaways:
  - "The Cobra Scalper is a name shared by several free scalping builds for MetaTrader 4 and MetaTrader 5, so the exact version you install decides how it behaves â€” verify the one you have."
  - "Two signals can look identical on a finished chart and completely different while the candle is still forming; trade confirmed closes, not live arrows."
  - "Repainting is the first thing to prove or disprove on your own charts, because a signal that moves after the fact cannot be traded."
  - "An indicator has no position size; the grid, martingale or averaging layer you attach to it is what can turn an ordinary losing run into an account-level loss."
  - "Stress-test that recovery layer with real numbers â€” maximum levels, margin use, stop-out level and the loss you can survive â€” before it trades a single lot."

faqs:
  - question: "What is the Cobra Scalper indicator?"
    answer: "It is a free scalping indicator that circulates for MetaTrader 4 and MetaTrader 5. Several independent developers have used the Cobra Scalper name for their own arrow systems, so it is not one fixed product with one fixed logic. Most builds blend a moving average, a momentum reading and a trend or volatility filter to print buy and sell arrows. Because the code varies, you judge the exact build you have rather than the name."
  - question: "Is a Cobra Scalper free download safe?"
    answer: "Only as safe as its source. A free .ex4 or .ex5 file from an anonymous upload can be modified, and you cannot inspect compiled code. Prefer a version whose origin you can trace, scan every archive before you open it, keep the file out of your live terminal until you have tested it, and never run an indicator that asks for your broker password or master account details."
  - question: "Does Cobra Scalper repaint its signals?"
    answer: "It depends on the build. Repainting means an arrow that appears on the live bar later moves or disappears once the candle closes. Some free arrow indicators recalculate on the current bar, which makes them look accurate in hindsight and unreliable in real time. You cannot trust a vendor's answer here. Prove it on your own charts with bar replay before you trade the signals."
  - question: "Which timeframe and markets suit the Cobra Scalper?"
    answer: "Scalping builds are usually aimed at short timeframes such as M1, M5 and M15, and at liquid instruments where spreads are tight â€” EUR/USD, GBP/USD and, on many brokers, XAUUSD. Higher volatility cuts both ways: gold and news-driven pairs produce more signals and also more false ones. Match the timeframe and symbol to how the build behaves in your own tests, not to a marketing list."

  - question: "Can I automate the Cobra Scalper with an expert advisor?"
    answer: "You can, but that changes what you are really trading. An EA does not just follow arrows; it decides position size, and many free recovery experts add to losing trades with grid, martingale or averaging logic. That layer, not the arrow, is what usually empties an account. Before you automate any signal, stress-test the recovery rules and prove the exposure on a demo account."
  - question: "Why is a grid or averaging recovery dangerous with a scalping signal?"
    answer: "Because it converts a series of small, bounded losses into one large, unbounded position. Grids open orders at set price steps, martingale increases size after a loss, and averaging adds to a losing trade to improve the entry. They show calm equity for long stretches and then a single large loss when price trends one way. Leverage lets the system keep adding levels until the loss is too big to recover, which is the opposite of safety."
  - question: "How much capital do I need to scalp with the Cobra Scalper?"
    answer: "There is no correct figure, and any number you see quoted is a claim rather than a rule. What matters is that your balance and leverage let you size each position so an ordinary losing streak, a spread spike and one gap all stay inside the loss limits you can actually afford. If the setup only works on a large balance or with very tight stops, it does not fit your account."
  - question: "How do I test the Cobra Scalper before going live?"
    answer: "Run it on a demo account that matches your intended live conditions, keep one fixed configuration, and log every signal: whether it survived the candle close, the spread you paid, the slippage you saw and why each trade closed. Then stress-test any recovery layer with a printable worksheet so you know your worst-case exposure in advance. Demo first, live capital last, and only after the numbers agree."

sources:
  - label: "MQL5 Documentation â€” Custom Indicators"
    url: "https://www.mql5.com/en/docs/indicators"
  - label: "MetaTrader 5 Help â€” Automated Trading and Strategy Tester"
    url: "https://www.metatrader5.com/en/terminal/help"
  - label: "Investopedia â€” Scalping"
    url: "https://www.investopedia.com/terms/s/scalping.asp"
  - label: "Investopedia â€” Leverage"
    url: "https://www.investopedia.com/terms/l/leverage.asp"

primaryKeyword: "cobra scalper indicator"

download:
  origin: "own"
  license: "Free to use, print and share with credit to bestmt4ea.com"
  version: "1.0"
  fileKey: "resources/grid-ea-drawdown-stress-test.pdf"
---

## Why does the Cobra Scalper look obvious on a closed chart and impossible in real time?

You open an M1 chart on EUR/USD. An arrow prints. Price runs twenty pips in your favour. You scroll back and it happens again, twenty candles earlier, and again before that. Sitting still on a finished chart, a scalping indicator looks like a machine that hands you the answer.

Then you trade it. Live, the arrow appears on the candle that is still moving. You wait for confirmation and price walks away. You enter anyway and it snaps back. You close for a small loss, and the deeper signal â€” the one that only settles at the close â€” turns out to have been the good one. The two experiences are not the indicator lying and then telling the truth. They are the difference between what you can know while price is still forming and what a chart shows once the story is over.

If you are honest with yourself, the real problem is narrower than "is this indicator good". You cannot tell, from a clean screenshot, whether a signal was available in real time or drawn after the fact. You cannot tell, from a free forum download, how the version in your hands behaves when a trend refuses to turn. And you cannot tell, from a smooth demo line, what will happen to your account when the recovery logic you bolt onto the signal starts adding size to a losing trade.

Here is the direct answer, before any of the detail. Cobra Scalper is not one product. It is a name that several independent developers have used for free scalping indicators on MetaTrader 4 and MetaTrader 5. Different builds, different logic, different behaviour. So there is no single honest review of "the" Cobra Scalper, and anyone who offers you one is describing the version they happened to hold â€” or a version they made up. What you can do, and what this page teaches, is judge the build in front of you: read its signals honestly, prove whether it repaints, and stress-test the recovery layer you wrap around it. That last part, not the arrow, is what decides whether you survive a bad week.

This guide is education first and product second. It walks through how to read a scalping signal without chasing it, how to test any free build for repainting, why the grid or averaging layer underneath is the real danger, how to size a position so a normal losing run cannot end the account, and how to run a demo period that actually tells you something. The free download attached to this page is a working tool for one specific job â€” putting numbers on the hidden risk in a grid or averaging system â€” not a promise about the outcome. Nothing here can promise an outcome, and you should distrust any page that does.

## The recovery habit that turns one calm week into a closed account

It starts the same way almost every time. You download the free build from a thread. You drop it on a demo chart. Tuesday is quiet: five arrows, five small winners. By Friday the demo account is up a little and you can already picture the live version. So you fund an account and trade a normal-looking lot size.

Then London opens on a Wednesday with a rate decision in the air. An arrow fires long on GBP/USD. Price drifts twelve pips against you. You have read that the system "recovers" its trades, so you add a second position. It drifts another twenty and you add a third. Nothing looks like a disaster while it is happening, because each individual loss is small. That is exactly how grid and averaging systems feel right up until the moment they do not.

Then the move accelerates. The floating loss grows past everything the quiet week taught you. By the time you close, one session has erased three weeks of small wins and then taken a slice of the account with it. The next morning you are not asking whether the indicator was accurate. You are asking how a tool that looked so reliable could end a week like that.

Here is the uncomfortable part, and the reason this page exists. The indicator did not lie. Every arrow was a real arrow. What failed was the layer you added on top of it â€” the decision to keep adding size to an idea that had already gone wrong. The same trap waits for anyone who hands a scalping signal to a free expert advisor with grid or martingale recovery, or who improvises that recovery by hand. The expensive part of scalping is rarely the signal. It is the position management nobody stress-tested.

## What is the Cobra Scalper indicator, and what does a free download actually give you?

A Cobra Scalper build is a technical indicator for MetaTrader 4 or MetaTrader 5 that tries to mark short-term buy and sell points on a chart. Most free versions blend a few familiar parts: a fast and slow moving average for direction, a momentum or oscillator reading such as RSI or a stochastic, a trend or volatility filter, and arrow markers that print when those conditions line up. The blend is the selling point. Instead of reading four separate tools, you look at one chart and wait for an arrow.

The trouble is the name. "Cobra Scalper" has been reused across forums, download sites and marketplaces by different people, some of whom copied and renamed an older build. That means two files with the same label can contain different logic, different defaults and different behaviour. It also means there is no central record of what the indicator does, who wrote it, or how it performed. You are not buying a documented product. You are picking up an unnamed file that carries a popular label.

That is not automatically bad. Free indicators can be useful study tools, and a simple arrow system can teach you how you react to signals in real time. But you need to hold the right expectation while you evaluate one.

| What traders assume | What a free build usually is |
|---|---|
| One fixed product called Cobra Scalper | Several unrelated builds sharing one name |
| A documented strategy | Closed code with defaults you cannot fully inspect |
| Verified past performance | No verifiable record attached to the file |
| Free, so safe to run | Unknown provenance; a compiled file can be altered |
| A complete trading plan | A location on a chart that still needs your rules |

The honest position is this: I will not tell you that a particular Cobra Scalper file uses a specific formula, or that it produced a specific result, because those things change from build to build and I have not tested yours. Anyone who states them with confidence is guessing or selling. What I can give you is a way to judge whatever version you are holding, and a way to make sure the system around it cannot quietly undo you.

## How do you read a scalping indicator's signal instead of chasing it?

Every scalping signal exists in two states, and the difference between them is the whole game. There is the signal as it looks while the candle is still open, and the signal as it looks after the candle closes. A reliable build behaves the same in both states. A weak one shows you a tidy arrow on the live bar and then quietly revises it once the bar settles.

The single most useful habit you can build is this: act only on signals that are confirmed by a closed candle, and give yourself a fixed rule for what "confirmed" means. For a 5-minute chart, that might be waiting for the 5-minute bar to close above or below the marker. For an M1 chart, it might be a set delay of a few ticks before you consider the arrow real. The exact number matters less than the discipline. You are trading a decision you could have made in advance, not a feeling you had while the bar was moving.

Confirmation is only the first layer. Scalping signals get much more usable when they agree with the bigger picture, so build in simple confluence:

- Trade in the direction of a higher-timeframe trend, such as a 200-period moving average on H1, rather than against it.
- Favour signals that appear during active sessions for the instrument, because thin hours widen spreads and dull follow-through.
- Skip signals when the spread is wider than normal, because a scalping edge is small and cost eats it first.
- Treat the arrow as a location, not a plan. You still choose the stop, the target and the position size.

Then write the whole thing down as a procedure you could hand to someone else. For example: "On EUR/USD M5, during London and New York only, if the H1 200 EMA is rising and a buy arrow is confirmed by the close above it, I enter on the next candle, place a stop below the swing low, target one and a half times the stop, and risk one percent of the account." That sentence is worth more than any indicator setting, because it survives the moment when the arrow fades and your pulse rises.

What you are deliberately avoiding is signal chasing: entering late because the move already started, doubling after a loss because the next arrow "has to" work, and jumping timeframes until you find one whose arrows look neatest in hindsight. A scalping indicator shows you opportunities. It does not show you how much of your balance to risk on each one, and it has no idea what your losing streak feels like. Those are yours to control, and they matter more than the arrow.

## Does the Cobra Scalper repaint, and how do you check it on your own charts?

Repainting is the name for a signal that changes after the fact. An arrow appears on the current candle, you act on it, and later the arrow is gone or has been redrawn somewhere more convenient. On a finished chart the repainted indicator looks almost perfect, because every surviving arrow sits at a turning point. In real time it is untradeable, because the signal you acted on was not the signal the finished chart shows.

Repainting usually comes from how an indicator is coded. Many arrows are recalculated on the still-forming bar, so their value changes with every tick until the bar closes. Others read a moving average or oscillator that is allowed to update intrabar, which drags the marker with it. Some builds repaint only occasionally, which is worse in a way, because the behaviour looks fine until the one signal you most needed to trust turns out to have moved. Free builds are especially prone to this, because they are often shared without documentation or a maintained version history.

You do not need to read the code to catch it. You need a few minutes with bar replay and a little discipline. Here is a workable check:

1. Load the indicator on a demo chart with the settings you intend to trade, and let the market run for a session while you keep a screenshot of what it shows live.
2. Compare the live screenshots to the finished chart the next day. Note every arrow that vanished, moved, or appeared after the fact.
3. Use MetaTrader's bar replay or the Strategy Tester's visual mode to step through past days candle by candle, and watch whether a marker that is present on the live bar stays put once the bar closes.
4. Change the timeframe and step through again, because a build can be stable on M15 and unstable on M1.
5. Record what you find, because "it repainted twice on news days" is a fact you can act on, while a memory of "it seemed fine" is not.

| What you see | What it usually means | What to do |
|---|---|---|
| Arrows vanish after the candle closes | Classic current-bar repainting | Do not trade the live signal; wait for the close or reject the build |
| Arrows appear only on the finished chart | The signal is drawn after the fact | The indicator is a study tool, not a live trigger |
| Arrows shift a few pips before settling | Minor recalculation, still forming | Trade confirmed closes only, never the first tick |
| Arrows stay exactly where they printed | The build is stable in your test window | Still verify across sessions and timeframes |
| You cannot tell either way | Your test was too short or too casual | Re-run bar replay properly before risking anything |

Do this before you risk money, not after. If the build repaints, that is not necessarily the end of the story. You may still find a way to trade the confirmed close, or use it only for context. But you must know which you are dealing with, and you must stop letting a hindsight-perfect chart convince you that the live version was just as clean.

## Why does the recovery layer, not the indicator, decide whether your account survives?

An arrow on a chart has no size. It does not know whether you are risking fifty dollars or five thousand. It does not know whether you hold one position or eleven. That gap is where accounts die, because the moment you automate a scalping signal or decide to "recover" a losing trade, you are no longer trading an indicator. You are trading a position-management system, and those systems have their own behaviour that nobody advertises.

Three patterns do most of the damage, and they often appear together.

- **Grid.** The system opens orders at fixed price steps as price moves against the first one. Instead of one stop, you get a ladder of positions, each adding exposure.
- **Martingale.** The system increases the size of each new position after a loss, so the next trade needs to win less to cover the last ones. It works often enough to feel safe and fails completely when it does not work.
- **Averaging.** The system adds to an open losing position to improve the average entry, betting that price will return far enough to exit the whole basket at a small profit.

Each pattern produces the same shape: a long stretch of small, calm gains, followed by one large loss when price trends one way and refuses to come back. On a scrolled-back equity curve that looks like a reliable machine. In the moment it is a bet that the market will be reasonable, and the market is not obliged to be. A scalping signal makes this feel urgent, because scalpers take many trades â€” and a recovery layer attaches itself to every one that goes the wrong way.

The detail that surprises most traders is how leverage fits in. You might assume more leverage gives a grid more room to survive. The opposite is true. Higher leverage lets each added level consume less margin, so the system can keep stacking positions further than it should, right up to the point where the floating loss is too large to recover. Lower leverage stops the expansion earlier and caps the damage at a smaller number. A "recovery" expert that needs high leverage to reach all its levels is telling you something important about its risk, whether it means to or not.

That is why the honest answer to "is Cobra Scalper worth using" is incomplete without a second question: what will you wrap around it? If the answer is one position with a defined stop and a size you chose, the risk is bounded and knowable. If the answer is a free expert advisor that adds size into losses, the indicator's accuracy stops mattering, because a good signal and a bad recovery rule still end in the same place. You can see how serious traders compare and control this kind of exposure in the [drawdown control method](/drawdown-reduction-ea-free-download-7-powerful-benefits-every-trader-must-know/) and in the [safe grid settings breakdown](/10-powerful-grid-trading-ea-safe-settings-for-mt4-to-reduce-risk-and-boost-profitability/), and the pattern they share is simple: know your worst case before it happens.

## How do you stress-test a grid or averaging system before it trades a cent?

Talking about "worst case" is easy and useless. Writing the number down is what changes behaviour. That is the single job of the free worksheet attached to this page: to make you do the arithmetic on a grid, martingale or averaging system before the account does it for you.

The worksheet is a printable PDF, and it is built in four parts. The first is a settings audit: you list the controls that actually define your exposure â€” base lot, grid step, lot multiplier, maximum levels or trades, basket take profit, stop loss, drawdown limit, trading-hours filter and news filter â€” and next to each you write the value from your own terminal and the cap you are willing to accept. A setting you cannot explain is a setting you should set to its most conservative value, or switch the system off until you can.

The second part runs three stress scenarios in writing, because these are the conditions that break grids in practice:

- a sustained one-way trend of several hundred pips over two or three sessions, the kind that follows a rate decision;
- a news spike, where price jumps in seconds and the spread widens several times normal;
- a weekend gap, where Friday's close and Sunday's open leave no price in between to trade out at.

For each one you estimate your exposure at the worst point, express it as a percentage of the account, and decide your action now, while you are calm. The purpose is not to predict which will happen. It is to know the number in advance so a decision is not made for you while a position bleeds.

The third part is the arithmetic that really settles the ending: margin and stop-out. It walks through the formula for margin per lot and for margin level, and shows how a broker's stop-out threshold, commonly around fifty percent, turns a floating loss into a forced close. The worked comparison on the sheet uses EUR/USD near 1.10 on a one-thousand-dollar account and shows why the higher leverage is the less protective choice, then leaves blank fields for your own balance, leverage, contract size and caps.

The fourth part is a decision record with a signed verdict: proceed or do not proceed. You write the worst-case loss you accept, the equity level at which you would close everything by hand, the maximum number of levels you permit, and how often you will check that the system is behaving. You sign and date it. It is the one version of your judgement that a losing position cannot argue with later.

| Worksheet part | What it makes you write down | Why it matters |
|---|---|---|
| Settings audit | Each control, its current value and your cap | Turns vague defaults into limits you chose |
| Three stress scenarios | Exposure and account percentage at the worst point | Reveals the risk before the market does |
| Margin and stop-out | Leverage, margin used, stop-out equity and loss | Shows whether one event can end the account |
| Decision record | Worst-case loss, halt level, level cap, signed verdict | Commits you while you are still calm |

Used properly, the sheet is arithmetic on your own inputs, and that is all it is. It predicts nothing, it analyses no specific product, and no set of settings can make a grid or averaging system safe. But it replaces a feeling with a number, and a trader who knows the number behaves differently from one who does not. Write the worst-case exposure on the page, look at it next to your balance, and decide whether you could live with that loss if it arrived tomorrow. Most people discover the honest answer at exactly that moment.

## How do you size a scalping position so one losing run cannot end the account?

Position sizing is where the whole method becomes personal, because a signal can be perfect and still drain the account if the size is wrong. Start from the account, not the arrow. If you trade a funded challenge or a live account with a daily and a total loss limit, those limits set the heat you can take before the account closes. Your sizing has to keep a normal losing streak â€” several trades in a row, plus a spread spike â€” comfortably inside those lines.

Then translate the design into exposure. A single-position scalping approach with a real stop risks a bounded amount per trade, and the maths is straightforward: the distance to your stop, multiplied by the value per pip, multiplied by the lot size. A grid or averaging layer is different, because several positions share the same direction and can be open at once, so the amount at risk is the sum of the whole basket, not one trade. Ask for that maximum exposure in plain terms and map it to your balance. If the answer is unclear, the size is too large or the design is too opaque for your account.

Two habits make this stick. First, use a written rule rather than judgement in the moment: state the balance you sized for, the maximum number of open positions you allow, and the point at which you stop for the day. Second, sanity-check every new control on demo before you rely on it. A maximum-spread filter, a news pause and a daily halt are only real if you have watched them trigger. A control you have never seen fire is a hope, not a control.

There is no single dollar figure that is right, and you should be suspicious of any page that hands you one. The number depends on your balance, your stop distance, your leverage and the loss limits that apply to you. The worksheet includes a position-size area exactly so that the answer is written for your account rather than borrowed from someone else's. Check your broker's contract specification for pip value and margin on your own platform, because those details decide the maths long before any indicator does. Comparing a [low-spread broker shortlist](/best-forex-brokers/) can help you understand account types and cost structures, but the final check always happens on your own feed, with your own settings.

## How do you run a demo period that tells you something?

A casual demo proves almost nothing. You glance at the balance, ignore the exposure, change a setting after a losing day, and declare the tool ready. A structured demo does the opposite. It fixes one configuration, records behaviour signal by signal, and forces a decision from evidence rather than mood. Fourteen days is a reasonable minimum to see quiet sessions, active sessions and at least one difficult stretch, and longer is better when signals are rare.

Preparation comes first. Build a demo account that mirrors your intended live conditions: the same MetaTrader version, a similar balance and leverage, and the same symbol specification. Load the exact settings you plan to judge, including any spread filter or news pause. If you plan to run the terminal on a virtual private server, usually called a VPS, host it there now, because connection behaviour is part of what you are testing.

During the test, change nothing unless safety demands it, and log every trade. Capture whether the signal existed at the candle close, the spread you actually paid, any slippage between the price the arrow implied and the fill you got, and the reason each trade closed. If you find yourself tempted to tune the settings after a losing day, write the urge down instead of acting on it, because a mid-test change restarts the clock and the result no longer belongs to one configuration.

Behaviour is the test; balance is only one output. Compare the demo to what the indicator showed live. Did arrows behave the same way they did in bar replay, or did they start moving? Did the spread widen during the busiest minutes and eat the edge? Did the exposure peak stay inside the limit you wrote on the worksheet? Small differences are normal between a chart and a demo fill, but large or repeated mismatches are information, and the right response to them is caution, not optimism. When the demo and the documentation agree, extend the test. When they do not, reject it and keep your evidence â€” a written record is the one thing marketing cannot rewrite.

## What red flags and honest limits should you accept before you install anything?

Red flags save you time, so treat them as hard stops rather than debate points. One clear flag is usually enough to walk away, because a serious build rarely triggers any of them.

Provenance is the first. If there is no traceable origin, no version note and no way to know who compiled the file, you are running an unknown executable inside your terminal. Scan every archive before you open it, keep it off your live terminal until it has survived a demo test, and never give an indicator or expert advisor your broker password, investor password or account details. Software that asks for credentials is not an indicator problem; it is a security problem, and it ends the review immediately.

Repainting and hidden automation are the second and third flags. A build that revises its signals after the fact cannot be traded live, no matter how tidy the finished chart looks. A build that wants to place orders on your behalf is no longer an indicator at all â€” it is an automated system, with all the recovery and exposure questions that came with it. Force the question: does this file only draw, or does it trade? If it trades, apply the same grid and sizing stress test you would apply to any recovery expert.

Pressure is the fourth. A download page with a countdown, a "today only" bonus or a demand that you fund a specific account before you can see evidence is telling you who benefits from your haste. Sound evaluation takes days. Keep the pace that suits you, and let urgency disqualify an offer. A related flag is the fake-proof post: anonymous screenshots, borrowed lifestyle images and unverifiable account pictures. They prove nothing about execution, costs or drawdown, so ignore them and look for files, statements and your own demo record instead. If you are weighing up handling signals yourself against letting someone else trade for you, read the [copy trading and fund management overview](/copy-trading/) and notice how it separates evidence from a pitch.

Two honest limits apply to this guide, and you should hold them as firmly as the flags. First, no indicator and no worksheet can tell you the future or protect an account by itself; losses are possible on any trade in any market, and a scalping signal is a location on a chart, not a result. Second, results you may find claimed for "Cobra Scalper" online belong to the build that produced them, under settings and conditions you cannot see. Treat every such number as a question to verify, never as evidence. If removing the sales language leaves no method and no record to judge, the product was never evaluable in the first place.

## What exactly do you get, and what does it not do?

By now the honest shape of this page should be clear. It is not another Cobra Scalper download link dressed up as a promise. It is a method for judging a free scalping build, plus one practical tool for the part of scalping that actually ends accounts: the grid, martingale or averaging layer underneath. Here is exactly what the download is.

| Item | Detail |
|---|---|
| Format | Printable PDF worksheet |
| Purpose | Stress-test a grid or averaging system before it trades |
| Part 1 | Settings audit â€” each control, its value and your cap |
| Part 2 | Three stress scenarios â€” sustained trend, news spike, weekend gap |
| Part 3 | Margin and stop-out arithmetic, with a worked EUR/USD example and blank fields |
| Part 4 | Decision record with a proceed or do-not-proceed verdict to sign |
| Who it is for | Any trader using or automating grid, martingale or averaging systems |
| Cost | Free |
| Licence | Free to use, print and share with credit to bestmt4ea.com |
| Version | 1.0 |

Used properly, the worksheet turns a vague sense that "recovery is probably fine" into a set of numbers you can see next to your balance. You will know your maximum cumulative position size, the margin it eats, the equity level at which your broker's stop-out would fire, and the loss you would need to survive if it did. That is the kind of information a highlight reel never gives you, and it is the information that lets you walk away from a setup before it walks away with your account.

Now the honest limits, because they matter more than the features.

- It is a worksheet, not a strategy. It records and tests your own numbers. It does not analyse the market, open trades or tell you whether any indicator is good.
- It predicts nothing. The three scenarios are prompts for your own arithmetic, and the worked figures are illustrative. Your broker's contract specifications and your results will differ.
- It cannot make a grid safe. No set of settings removes the risk that a sustained move leaves several positions open at a loss. The sheet measures that risk; it does not delete it.

- It does not verify a developer's claims. The numbers are your inputs, not proof about anyone else's backtest or live record.
- It cannot see live fills. Demo execution is simulated, and real slippage, requotes and rejected orders only appear with a live broker, which is why the demo step is a filter rather than a finish line.
- It is not financial advice. Nothing here tells you to trade, to use a particular build or to risk a particular amount. You decide, and you own the outcome.

Read that list twice. If a page like this one had promised a profit figure or a tested win rate, you would be right to close the tab. This page deliberately does not, because inventing a number would be a lie and borrowing someone else's would be someone else's result on someone else's account. What it offers instead is a method you can repeat and a tool you can print.

If you want to see how serious indicator and system write-ups separate method from marketing, study the [scalper-style indicator breakdown](/best-scalping-indicator-scalper-inside-v7-9-free-download-7-powerful-reasons-traders-love-it/) and see how transparent records are presented on the [ranking hub](/top-ranking/) before you apply the same lens to every Cobra Scalper file you meet. When you are ready to compare systems properly, browse the [best MT4 EA shortlist](/best-mt4-ea/) and the [shop](/shop/) â€” but only after your own gate says a longer test is justified. Tools support judgement. They do not replace it.

## Your next step: stress-test the layer that can actually end your account

You now have a method and a tool. The only thing left is to use them on the next free scalping build that catches your eye, instead of installing it and hoping.

Here is the one action to take now. Download the free Grid EA Settings Audit and Stress Test, print it, and fill in the settings audit and all three stress scenarios for whatever grid, martingale or averaging system you are considering â€” including any expert advisor you plan to point at a Cobra Scalper signal. Write your maximum levels, your margin use, your stop-out equity and the worst-case loss you are willing to accept. Then sign the verdict. If any scenario has no number, or the loss is money you cannot afford to part with, the answer is do not proceed, and that answer just protected you.

After that, put the indicator itself through the same discipline. Trade only confirmed closes, verify repainting on your own charts, keep one fixed configuration on a demo account for at least two weeks, and log every signal with the spread and slippage you actually saw. Move to live capital last, sized so an ordinary losing streak and one bad gap stay well inside your limits.

That is how you use a free scalping indicator well. Not by trusting arrows, and not by trusting a recovery system that looks calm until it is not. By reading the signal honestly, testing the build on your own charts, and putting the real risk on paper before it ever reaches your account.

> Trading forex and CFDs on margin carries a high level of risk and is not suitable for everyone. Price can move sharply against an open position, leverage magnifies both gains and losses, and a grid, martingale or averaging system can hold several losing positions at once. A free indicator is a tool, not advice: signals can repaint, demo results differ from live fills, and money you risk can be lost. Test every system on a demo account first, size positions so an ordinary losing streak cannot end your account, and never commit funds you cannot afford to lose.
