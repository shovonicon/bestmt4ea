---
title: "Hamster Scalping EA Review: The Night Scalper, Examined"
slug: "hamster-scalping-ea-review-can-this-robot-assist-your-short-term-trading"
description: "Hamster Scalping is a famous night scalper for EURUSD. This review covers its strategy, its virtual-stop risk, the settings that matter, and honest testing."
publishedAt: 2026-10-22
updatedAt: 2026-10-22
categories:
  - "EA Reviews & Comparisons"
categoryPaths:
  - "/category/mt4-mt5-expert-advisors/ea-reviews-comparisons/"
tags: []
draft: false
quickAnswer: "Hamster Scalping is a well-known MetaTrader night scalping expert advisor that trades short moves during the quiet hours, mainly on EURUSD, using RSI and ATR-based logic with virtual stop levels. It has a long public history and many users, but night scalping lives or dies on your broker's overnight spreads and execution, so its results vary far more between brokers than its sales page suggests."
keyTakeaways:
  - "Hamster Scalping is a night scalper: it trades small, frequent moves in the low-liquidity hours, mainly on EURUSD M5."
  - "Its virtual stop loss is the key risk to understand: the stop exists inside the EA, so a disconnect or crash can leave a position unprotected."
  - "Broker choice matters more for this EA than for almost any other type: overnight spreads and slippage decide whether its small targets survive."
  - "Judge it on your own broker's demo for at least four weeks, through the workbook process, not on the vendor's screenshots or community set files."
  - "Community preset files are a starting point for study, not a substitute for testing; the same .set file behaves differently on every broker's feed."
faqs:
  - question: "What strategy does Hamster Scalping use?"
    answer: "It is a night scalping system. During the quiet session it looks for short-term overextensions using RSI-based signals filtered with ATR, and it aims for small take-profit distances with a larger protective stop. Versions exist for both MT4 and MT5 on the MQL market, and the input list is long, covering session times, filters and position management."
  - question: "Why do Hamster Scalping results differ so much between users?"
    answer: "Night scalping takes a few points at a time in thin markets, so the broker's overnight spread, swap and slippage are a large share of the result. Two users with identical settings on different brokers are effectively running different strategies. The rollover window, when spreads widen sharply for a few minutes, is where many accounts lose what the quiet hours made."
  - question: "What does virtual stop loss mean in Hamster Scalping?"
    answer: "The stop level is watched by the EA and executed by closing the position when price reaches it, rather than being placed as an order on the broker's server. While the terminal is connected this behaves like a normal stop. If the terminal, VPS or connection fails while a trade is open, no stop exists on the server, so the position is unprotected until you reconnect."
  - question: "Which pairs and timeframe is Hamster Scalping designed for?"
    answer: "It is best known on EURUSD, on the M5 timeframe, trading the night session. Users apply it to other majors, but each added pair multiplies the overnight-spread problem and the chance of correlated losses on a bad night. Start with the vendor's recommended setup before experimenting."
  - question: "Is Hamster Scalping good for beginners?"
    answer: "It is easy to install and heavily discussed, which makes it approachable, but night scalping is not a forgiving first strategy: small edges, broker sensitivity and virtual stops all demand understanding. A beginner who runs it on demo for a month and learns to read its logs will get more from it than a beginner who buys it for a live account in week one."
  - question: "Does Hamster Scalping use martingale or grid?"
    answer: "In its common configurations it opens individual scalping trades rather than a recovery grid, and it is not marketed as a martingale. Settings shared in communities sometimes enable additional position behaviour, so check exactly what a preset does, especially any option that adds positions to a losing trade, before running it."
sources:
  - label: "MQL5 Market: expert advisors and product listings"
    url: "https://www.mql5.com/en/market"
  - label: "MetaQuotes: MQL5 documentation"
    url: "https://www.mql5.com/en/docs"
primaryKeyword: "Hamster Scalping EA review"
download:
  name: "Scalping EA Demo Test Log"
  origin: "own"
  license: "Free to use, print and share with credit to bestmt4ea.com"
  version: "1.0"
  fileKey: "resources/scalping-ea-demo-test-log.pdf"
---

Few expert advisors have been discussed, copied, tuned and argued about as much as Hamster Scalping. It has been on the MQL market for years, it has an enormous user community with libraries of shared preset files, and its name comes up whenever traders talk about night scalping: the approach of trading the quiet hours, when most of the retail world is asleep and price drifts in small, mean-reverting steps. This review treats it the way we treat every robot on this site. What does it actually do, mechanically? Where does its risk hide? What will decide whether it works on your account specifically? And how do you test it so that the answer you get is evidence rather than mood?

One disclosure before anything else, because our regular readers know the pattern and new readers should: we do not sell you a download of this EA, here or anywhere. It is a commercial product sold through the MQL market by its author, and any site offering you a free copy of it is offering you someone else's property, often an old or tampered build. Review the product, by all means. Buy it from its source if it earns your money, or walk away informed. Both are good outcomes. A cracked file is neither.

## What Hamster Scalping does, in plain mechanics

Hamster Scalping is a night scalper built for MetaTrader, with MT4 and MT5 versions, and its home ground is EURUSD on the M5 timeframe during the late-evening to early-morning window, roughly the period after the New York session winds down and before London wakes up. The logic, in the terms its author describes and its inputs expose, looks for short-term overextension: RSI-based readings identify when price has stretched in one direction during a quiet market, ATR measurements scale how far it has stretched relative to recent volatility, and the EA takes the other side expecting a partial snap back, targeting a small distance with a protective stop set wider than the target.

That profile explains both its appeal and its reputation. In a genuinely quiet market, small overextensions do tend to correct, and a disciplined machine can collect those corrections night after night while a human is asleep. The win rate in such a regime looks wonderful in reports, because most trades close at their small target. The losses, when they come, are fewer and larger, arriving on the nights the market is not quiet at all: a late news shock, a central banker speaking in the Asian session, a geopolitical headline at 3 a.m. The whole character of the EA is in that sentence, and everything else in this review is commentary on it.

The input list is long, and that cuts both ways. You can shape session times, signal sensitivity, virtual stop and target distances, filters, spread limits and position behaviour in real detail. You can also destroy the strategy completely with plausible-looking changes, which is why the community around this EA is full of both devoted users with careful records and angry ex-users who loaded a stranger's preset file, ran it on a broker it was never tuned for, and concluded the product was a scam. Both groups used the same robot. The difference was process, and process is what a review can actually teach you.

## The virtual stop: the risk you must understand before any other

Hamster Scalping is known for using virtual stops in its common configurations. A virtual stop loss is not placed on the broker's server as an order. The EA itself watches the price and sends the close command when the level is reached. In normal operation, connected and running, the result looks identical to a server-side stop, and there are legitimate reasons developers do this, including hiding stop levels and managing baskets as one position.

The difference appears on the worst night, not the average one. If your terminal disconnects, your VPS restarts for an update, your home internet drops, or the platform freezes while a trade is open, there is no stop anywhere. The position rides until you reconnect, and in a fast market that gap is exactly when an unprotected loss grows teeth. This is not a defect unique to this EA; it is a property of the design, shared by many scalpers. But it converts infrastructure from a convenience into part of the risk system: a reliable VPS stops being optional, a written maximum-loss habit stops being theoretical, and position sizes must be set so that even a stop that never fires cannot end the account. If any part of that paragraph makes you uncomfortable, this category of EA is not for you yet, and knowing that is a successful review outcome.

Ask the same question of the take-profit side and of any basket behaviour in the preset you plan to use. Options that average into positions deserve particular scrutiny: averaging feels like rescue right up until the trend that does not come back, and a night scalper's whole premise is that tonight is a ranging night. Settings that bet against that premise, inside the same product, should be understood line by line before they are enabled, not discovered from a margin call.

## Why your broker decides more than your settings

Every EA is broker-sensitive; night scalpers are broker-dominated. The arithmetic is unforgiving. If your average target is a handful of points and the spread during the night session eats a meaningful share of it on entry and exit, the strategy's edge can go negative without a single signal changing. Brokers widen spreads dramatically around the daily rollover, exactly inside this EA's working window, and the width and timing of that widening differ by broker and by account type. Swap charges on positions carried across the rollover add a second quiet cost that demo accounts often model kindly and live accounts do not.

So the practical evaluation of Hamster Scalping is inseparable from the practical evaluation of your broker's night feed. Before judging the EA, measure the feed: record EURUSD spreads on your account across the session for a week, note the rollover spike, and compare with what the strategy needs to survive. An honest week of that data will tell you more about your likely result than any review, including this one, because reviews describe the average user and your result will be produced by your specific combination of robot, settings, broker and hours.

Execution quality belongs in the same measurement. Slippage of a point on a target of six is a sixth of the trade. Demo accounts fill instantly in a way live accounts do not, which is why this EA has a particular reputation for demo results that flatter it. The demo test still matters, because it teaches you the EA's behaviour, rhythm and logging, but treat its profit figure as an upper bound, and apply a discount in your head proportional to how much of the edge is small scalps in thin hours.

## Settings: what to touch, what to leave, and the preset trap

The community around this EA shares .set files freely, and they are the most misunderstood part of the product. A preset is a record of choices made for a specific broker, account size and period. Transplanted whole, it imports all three assumptions silently. The settings that matter most, and that you should understand individually rather than inherit, are these. Session hours, because they must match your broker's server time, not the sharer's. The spread filter, which should be set from your measured night spreads, not from hope. The virtual stop distance, which is your real per-trade risk and should be chosen from your account size and loss limit, not copied. The lot mode, fixed or balance-based, where a balance-based formula on a different account size quietly rescales the entire risk. And any news or Friday filters, which encode someone else's risk opinions.

Our standard advice applies with extra force here: run the vendor's recommended configuration first, unchanged, for the full test period. You are establishing a baseline for a product, not expressing yourself. Creativity with settings is for after you have a baseline and a log; it is how you improve a measured thing rather than how you guess at an unmeasured one. Keep a settings record of everything you later change, one change at a time, or leave the inputs alone entirely. Both are respectable. The middle path, changing five inputs on a feeling and then arguing about the result, is where most Hamster Scalping disappointment is manufactured.

## Position sizing for a wide-stop scalper

Sizing deserves its own section because this EA's shape breaks the method most traders bring from elsewhere. When the stop is many times wider than the target, the familiar habit of risking a fixed percentage per trade produces lot sizes that look absurdly small next to the wins the EA collects — and that is the correct result, not an error. The stop defines the risk; a trade that can lose sixty points to make eight must be sized on the sixty. Traders who instead size on what "feels" proportionate to the target are quietly risking four, five, eight percent on single trades while telling themselves they risk one.

Do the arithmetic on your own account before the demo even starts. Take the virtual stop distance in your intended configuration, convert it to money at a 0.01 lot on your broker's contract specification, and scale up to the lot size that makes one full stop equal to the percentage of your balance you have written down as a single-trade loss — for most traders somewhere between a quarter and one percent. Then ask the harder question: what do three consecutive full stops in one night do to the account, and what does a stop that never fires because the terminal was down do at that same size? If either answer is unacceptable, the size comes down again. An EA with this profile is not improved by courage. Its edge, if your broker lets it exist, is a law-of-large-numbers edge, and large numbers only arrive for traders whose sizing lets them stay in the game long enough to collect them.

## The costs nobody puts in the listing

Budget for this EA the way you would budget for any small operation, because the purchase price is the smallest line in it. The VPS is a monthly cost for as long as you run it, and for a virtual-stop scalper it is not optional in any serious sense. Your time is a cost: a scalper that trades while you sleep still needs its logs read, its nights reviewed, and its settings governed, and traders who skip the governance eventually pay for the lesson in a worse currency. Swap and spread are costs already covered, but there is a subtler one worth naming: the opportunity cost of capital locked behind wide virtual stops. Money reserved as margin for the bad night is money not working elsewhere, and strategies with large stop-to-target ratios need more of your account standing guard per trade than their lot sizes suggest.

None of this makes the EA expensive in an absolute sense; it makes it honest. A trader who adds up the real carrying cost of running a night scalper properly — product, infrastructure, attention, reserved margin — can compare it fairly against simpler strategies that ask for none of those things. Many will still choose the scalper, for its rhythm and its genuine fit with a quiet-hours edge. They will simply be choosing the real product instead of the advertised one, which is the entire purpose of a review.

## What would change our mind about it

Reviews should say what evidence would move them, so here is ours. We would rate night scalping as a category more warmly the day brokers publish and guarantee their overnight spread behaviour the way some now publish execution statistics, because the strategy's fate is decided there more than in any input. We would rate this EA more warmly if a future version made a server-side hard stop the un-disableable floor beneath its virtual one, because the disconnect scenario is its largest single tail risk and it is solvable in code. And we would cool on it if its public record shifted from its long pattern — modest expectations, heavy discussion, visible bad periods — toward miracle marketing, because in this market that transition reliably marks the moment a product stops being maintained as a tool and starts being harvested as a name. Until one of those things happens, our assessment stands as written: a durable, narrow, demanding implementation of a real idea, whose results will be decided mainly by your broker, your infrastructure and your discipline.

## Reading its public history like an adult

Hamster Scalping has something most EAs never accumulate: years of public discussion, user journals, shared settings, and complaint threads. That archive is more valuable than any single review, if you read it with the right filters. Look for users who show broker names, full input lists, and equity curves that include bad months; their results, good or bad, carry information. Discount any post, positive or negative, that shows a balance curve without the equity curve beneath it, because a scalper that holds losers can make a balance line climb while the equity line is drowning below it. Discount results from periods you cannot identify, on brokers you cannot identify, with settings nobody lists. And pay special attention to the long, boring journals: the user who has run the same configuration for eleven months and reports a modest return with two ugly drawdowns is describing the product. The user reporting a fortune from a screenshot is describing a screenshot.

Notice, too, what the archive says about versions. Long-lived EAs change: signals get adjusted, defaults move, the market they were tuned in drifts away. A glowing thread from years ago describes a build and a market that may both be gone, and a furious thread from the same era may describe a bug fixed two versions later. Date everything you read. In this market, stale praise and stale condemnation are equally worthless, and this EA has accumulated enough of both to mislead anyone who reads without a calendar.

## A four-week test protocol for this specific EA

General demo advice is in our testing workbook; here is how it specialises for a night scalper. Week zero is measurement, not trading: record your broker's EURUSD spread across the EA's intended session for five nights, including the rollover minutes, and decide whether the feed gives the strategy room to exist. If the typical night spread plus the rollover spike already consumes the target distances in the default settings, stop there — you have your answer at the cost of a spreadsheet instead of an account.

Weeks one and two run the vendor's recommended configuration, untouched, on the broker you actually intend to fund. Your job is observation: read the log each morning, note which nights it traded and which it sat out, and check that its session hours line up with your broker's server clock rather than your wall clock. Week three is the stress diary: identify the worst night in the log and reconstruct it. What happened in the market, how wide did spreads go, did the virtual stop behave as designed, and how large was the floating loss at its worst moment? That night, not the average night, is your sizing input.

Week four is the decision, made against numbers you wrote down before the test began: the maximum floating loss you said you could accept, the minimum activity that makes the strategy worth its monitoring cost, and the behaviour standard — no unexplained trades, no positions held past their logic, no surprises in the log. If the EA passes, the live step is a small account at conservative size, where the remaining unknowns (live slippage, real swap, your own discipline at 3 a.m. alerts) can finish the education cheaply. If it fails, it fails with a record you can learn from, which is the most a losing test can offer and considerably more than most traders get.

## The failure stories, and what actually happened in them

Because this EA is famous, its failure stories are famous too, and they repeat with unusual consistency. Read enough of them and four plots account for nearly all of it. In the first, the trader ran a community preset tuned on a different broker, on an account a tenth of the intended size, and the balance-based lot formula scaled risk into territory where one bad night was a third of the account. The EA did what it was told; the instructions were addressed to someone else. In the second, the trader's home connection dropped during the one violent night of the month, the virtual stop never fired because nothing was running to fire it, and the position they found in the morning bore no resemblance to the risk they thought they had accepted. In the third, the strategy was sound and the broker was not: rollover spreads of several dozen points turned a month of small wins into a loss, one invisible tax at a time. In the fourth, the trader kept improving the settings every losing week, so the EA never traded the same strategy twice, and after three months of this they concluded, with total sincerity and no evidence, that the product simply does not work.

We tell these because each is preventable by something in this review: measured spreads, real infrastructure, settings discipline, a baseline held long enough to mean something. Hamster Scalping will still have bad nights if you do everything right; mean-reversion in thin markets guarantees them. The question the product asks of you is whether those nights arrive as budgeted costs inside a tested system, or as ambushes inside a hopeful one. That is mostly not the EA's decision. It is yours, made in advance, on paper.

## Running it alongside other EAs: magic numbers and margin

Sooner or later, most owners of this EA run something else on the same account — a trend follower on another pair, a second scalper, a manual hedge they swear is temporary. Hamster Scalping tolerates company worse than most robots, for two mechanical reasons worth understanding before you mix portfolios on one balance.

The first is the magic number, the identifier an EA stamps on its orders so it can recognise and manage its own positions. Every instance of every EA on the account needs a unique one. If Hamster shares a magic number with another system — through a careless default, a copied chart setup, or a second instance of Hamster itself on another pair left at the same value — each robot will treat the other's trades as its own: closing them at its targets, counting them in its exposure, and in the worst cases fighting over them tick by tick. The symptom is trades vanishing early or positions held past their logic, and the diagnosis lives in the order comments and magic column of the account history, not in anyone's settings panel. Give each chart its own number, write the assignments in your settings record, and treat a duplicate as a fault, not a coincidence.

The second reason is margin, and it is subtler. A wide-stop night scalper's true margin footprint is not its open positions; it is the loss it can be carrying, unprotected by any server-side stop, at the moment the market jumps. If a second EA opens its own positions on the same account, the two systems' bad nights can coincide — a violent headline rarely respects which strategy it is hurting — and the account discovers their combined worst case in a single rollover. Size the account for the sum of the strategies' worst nights, not for each one's average night, and consider honestly whether a small account should be running a portfolio at all. Separation is the cleaner engineering: one EA per account, each sized against its own balance, each judged on its own record. Traders share accounts to save VPS hassle and capital, and the savings are real, but with a virtual-stop scalper in the mix they are bought with a correlated tail risk that no input in either product can see, let alone manage.

## Who this EA suits, and who should walk away

It suits a trader who already understands scalping economics, who has a broker whose night feed they have measured, who runs infrastructure they trust, and who enjoys the process of testing and logging enough to maintain it. That trader gets a mature, heavily documented product with a large community and a long public track record to study. It does not suit a trader looking for passive income in the literal sense, because nothing with virtual stops and thin-hour edges is passive in any honest meaning of the word. It does not suit small accounts at brokers with wide retail night spreads, where the costs are structurally larger than the targets. And it does not suit anyone whose plan, stated plainly, is to buy it tonight and fund it tomorrow.

A note on expectations, because this EA attracts a particular fantasy. It trades while you sleep, in small pieces, and reports a high win rate. Combined, those three facts let people imagine a salary: modest, regular, hands-free. Resist the picture. The return distribution of a wide-stop scalper is a staircase with occasional missing steps, and the missing steps do not schedule themselves considerately outside your rent week. If a strategy's marketing shape suggests an income and its actual shape is a probability distribution with a fat left tail, plan your finances on the actual shape. Traders get into genuine trouble not when an EA loses money — that is a budgeted event inside any honest test — but when they have already spent, mentally or literally, the smooth income an irregular strategy never promised in writing.

The fairest summary we can give Hamster Scalping is that it is a real implementation of a real, narrow idea, sold into a market that constantly asks it to be a different, broader one. Night mean-reversion exists. It is small, conditional and perishable, and this EA harvests it with the strengths and fragilities that implies. Judge it by a four-week demo on your own broker, with the workbook process, the virtual stop understood, and your night spreads measured first. That test, and only that test, answers the question in the way that matters: not whether Hamster Scalping works, but whether it works where you intend to run it.

## Related reading

- [Alfa Scalper EA review](/alfa-scalper-ea-review-does-this-mt4-expert-advisor-deliver-profits/)
- [EA not working? The fix list](/mt4-ea-not-working-after-update-fix-best-proven-solutions/)
- [Best forex robots by Myfxbook results](/best-forex-robot-independent-myfxbook-results-top-performers/)
- [Forex session and rollover discipline for scalpers](/7-powerful-strategies-to-use-a-gold-xauusd-scalping-robot-best-risk-to-reward/)
