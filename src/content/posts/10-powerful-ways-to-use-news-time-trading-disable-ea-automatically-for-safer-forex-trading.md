---
title: "Disable Your EA During News Automatically to Protect Trades"
slug: "10-powerful-ways-to-use-news-time-trading-disable-ea-automatically-for-safer-forex-trading"
description: "Learn how to disable an EA during news automatically on MT4 or MT5, cap spread and slippage, and follow a pre-news checklist before high-impact releases."
publishedAt: 2025-12-07T02:41:04.000Z
updatedAt: 2026-10-11T00:00:00.000Z
categories:
  - "MT4 & MT5 Expert Advisors"
  - "EA Settings & Optimization Guides"
categoryPaths:
  - "/category/mt4-mt5-expert-advisors/"
  - "/category/mt4-mt5-expert-advisors/ea-settings-optimization/"
tags: []
quickAnswer: "To disable an EA during news automatically, you give it a blackout window around scheduled high-impact releases so it stops opening orders, and optionally stops managing them, while spreads widen and slippage spikes. You can do this with a built-in news filter, a calendar feed, or a manual time filter. It reduces one specific risk; it does not remove risk or predict any result."
keyTakeaways:
  - "An expert advisor only avoids news if someone taught it to watch the calendar; by default it trades straight through a release, taking its ordinary entries at abnormal cost."
  - "High-impact releases widen spreads and slip fills, so a stop loss limits your intent, not your fill, and an EA can be stopped well beyond its planned level."
  - "Automatic news handling comes in three forms — a time filter, a calendar-based filter and a platform-level pause — and they differ in how they detect an event and what they do with open trades."
  - "A blackout window must match your broker's server clock and cover the right events; the wrong time zone is the most common reason a filter fails quietly."
  - "Test the filter on demo and confirm it actually fires; an untested blackout is a hope, not a control, and the free checklist records the decision."
faqs:
  - question: "What does it mean to disable an EA during news automatically?"
    answer: "It means the EA stops opening new orders for a set window around scheduled releases, resumes on its own when the window closes, and follows a rule you chose about the positions it was already holding. The aim is to keep an ordinary strategy out of a market whose spreads and fills have briefly stopped behaving normally, without you having to remember any of it."
  - question: "Why is trading through news riskier for an EA than for a human?"
    answer: "A person can look at the calendar, see that a release is due, and decide to wait. An EA follows coded rules and does not know the event exists unless the developer built that awareness in. It will take a technically valid entry into the widest spreads and fastest moves of the day, which is exactly when its tested assumptions are least reliable."
  - question: "Can MetaTrader 4 disable an EA automatically around news?"
    answer: "Not natively. MetaTrader 4 has no built-in economic calendar for an EA to read, so MT4 tools detect news through a hard-coded schedule, a fixed time window, or an external calendar pulled in another way. MetaTrader 5 does include calendar functions a robot can call directly. On either platform, confirm which time zone the filter uses against your broker's server clock."
  - question: "How far before and after a release should a blackout window run?"
    answer: "There is no fixed answer, because it depends on the release and the strategy. A common starting point is a few minutes before and a few minutes after, but the minutes following a release are often the most dangerous, so an asymmetric window such as five minutes before and fifteen after can make sense. Watch the same release on demo and size the window from what the spread and the first move actually do."
  - question: "Which news events deserve a blackout window?"
    answer: "Rank them by impact and cover the top tier: US Non-Farm Payrolls, CPI inflation prints, and central-bank interest rate decisions and statements are the classic ones. Second-tier numbers rarely move price far enough to justify the same window. Covering every calendar entry usually widens the blackout until it removes your best trading hours, which is a different problem rather than a solution."
  - question: "Should the EA close open trades before news, or just stop opening new ones?"
    answer: "That is a decision, not a default. Closing everything removes exposure but locks in the exit at whatever the widened spread offers. Leaving positions with their existing stops keeps the plan intact but accepts that a stop can fill beyond its level. Some designs keep managing trades through the window. Whichever route your EA takes, know it in advance rather than discovering it during a spike."
  - question: "Does a news filter improve the result?"
    answer: "It removes one specific, recurring risk: trading an ordinary strategy through abnormal spread, slippage and volatility. It does not turn a losing system into a winning one, it does not remove the risk of loss, and it predicts nothing about any individual release. Think of it as one layer of risk control, not an edge, and keep your stops, sizing and drawdown limit independent of it."
  - question: "Where does the free checklist fit in?"
    answer: "It is the working record for the decision. You use it to note where an EA's file came from, write its strategy in your own words, demand its five risk numbers, stress a backtest for dishonesty, run a fixed demo protocol, size positions on paper, check red flags, and close with a signed go or no-go verdict. News handling is one of the behaviours it forces you to write down and test."
sources:
  - label: "MQL5 Documentation"
    url: "https://www.mql5.com/en/docs"
  - label: "Forex Factory Economic Calendar"
    url: "https://www.forexfactory.com/calendar"
  - label: "MetaTrader 5 Help — Strategy Tester and Automated Trading"
    url: "https://www.metatrader5.com/en/terminal/help"
  - label: "Investopedia"
    url: "https://www.investopedia.com"
primaryKeyword: "disable ea during news"
download:
  name: "News Event EA Protection Plan"
  origin: "own"
  license: "Free to use, print and share with credit to bestmt4ea.com"
  version: "1.0"
  fileKey: "resources/news-event-ea-protection-plan.pdf"
---
## Why does your expert advisor keep losing money in the minutes after a big release?

You spent weeks choosing an expert advisor, then more weeks watching it trade. On ordinary days it does exactly what the download page described. It opens, manages and closes its positions, the equity curve drifts the right way, and you begin to trust it. Then a data release lands at 13:30, the market jumps both ways inside a single minute, and the same robot that looked calm all week books its worst loss of the month. Nothing in its settings changed. The market changed, and the robot could not tell.

That is the problem this page exists to solve. An expert advisor, or EA, is a rule follower. It reads price, checks its coded conditions and acts, tick after tick. It has no built-in awareness that a central-bank decision, an inflation print or a jobs report is about to hit unless the person who built it taught it to look at a calendar. Most EAs never were taught. They trade straight through the release, taking the orders their logic produces in a market where spreads have widened, fills have slipped, and price is moving several times faster than the strategy was sized for.

The result is a specific kind of loss. It is not that the EA's idea is wrong. It is that the conditions it was tested in are not the conditions it is now trading in. A breakout that works on a quiet Tuesday can be triggered by noise two minutes before a release and stopped seconds later. A mean-reversion robot can average into a spike and hold a basket it never planned to carry. The losses cluster around the same handful of scheduled moments, which is both the bad news and the clue.

The direct answer is this. To disable an EA during news automatically, you give it a blackout window around scheduled high-impact releases so it stops opening new orders — and, depending on its design, stops managing existing ones — while spreads widen and slippage spikes. You can do that with a news filter built into the EA, with a calendar feed it reads, or with a simple time filter you set yourself. It reduces one specific risk. It does not remove risk, and it predicts nothing about the outcome of any trade.

Everything below is about doing it deliberately. You will see why releases break otherwise-sound logic, the difference between the three ways to pause a robot, how each one detects an event, how to size the blackout window, how to test that it actually fires, the mistakes that make a filter useless, and what to do when your EA has no news handling at all. Then you will see how the free checklist with this guide turns the decision into a page you can sign before the next release.

## The 13:30 release that turned a calm account upside down

One trader called his setup boring, and he meant it as a compliment. A small live account, a single EA on EUR/USD, fixed lots, a modest take profit and a real stop on every position. For three weeks the robot ticked along, and he stopped watching it during the day.

Then came a Friday with a US jobs report at 13:30 platform time. He had an errand and did not think about the calendar. The EA held a position from the London session, a few pips in profit. Two minutes before the number, the spread on EUR/USD began to breathe — first a pip wider, then several. The robot saw its conditions line up and opened a second position, because nothing in its logic said "not now". The release printed hot. Price jumped, whipped, and jumped again. The stop was filled well past its level, because at that moment the next available price was several pips beyond it. The second position, opened into the widest spread of the day, was underwater from its first tick.

By the time he checked his phone, the account had given back a chunk of the month in less than two minutes. The strategy was not broken. The robot had done exactly what it was coded to do. What it could not do was notice that the market had briefly stopped behaving like a market — that dealing costs had multiplied, that the first fill had slipped, and that the next few seconds belonged to nobody.

Here is the part that stings. The loss was avoidable without any clever edge. A blackout window of five minutes before and five minutes after the release would have kept the robot out of the worst of it. Not a better strategy, not a new indicator — just a rule that said "stand aside when the calendar says the market is about to be dangerous". Most traders learn this the way he did, by paying for it. The cost of doing nothing is not abstract; it is the exact difference between that Friday's balance and the one before it, repeated across every release you leave uncovered. And the releases never stop. They arrive every week, so the choice to ignore them is a choice you keep making.

## What does it actually mean to disable an EA during news automatically?

It means three separate decisions, and it is worth separating them because most tutorials blur them into one. First, the EA stops opening new orders for a period around a scheduled release. Second, you decide what happens to positions already open when the window begins: leave them with their stops, tighten those stops, close them, or close only the winners. Third, the EA resumes normal trading when the window ends, without you clicking anything.

The word "automatically" is doing real work in that definition. You can always disable an EA by hand before a release and re-enable it after. Many traders do, and it works — when they remember. The failure mode is human, not technical: you sleep through an Asian-session release, you are in a meeting when a central bank speaks, or you simply forget one Friday. Automation exists so the rule runs whether or not you are watching. The robot should not need your memory to protect your account.

It also helps to separate "no new trades" from "no management". These are different protections with different consequences. Stopping entries keeps the EA from adding a position into the spike, which is the most common way a normal trade becomes an oversized one. Stopping management is heavier: it means the EA also holds off from trailing a stop, closing at a target, or adding to a basket. Some designs keep managing open trades through the window because abandoning them mid-move can be worse; others close everything and stand flat. Neither answer is universally right. What matters is that you know which one your EA does, and that it does it on purpose rather than by omission.

Finally, "automatically" does not mean "blindly". A blackout is still a rule someone wrote, and rules can be wrong. If the filter window is set to a time zone your broker does not use, it will protect you at the wrong moment and leave you exposed at the real one. That failure is worth dwelling on, because it quietly ruins otherwise sensible setups, and we return to it below.

## Why do scheduled releases break a strategy that works every other day?

Because a scheduled release changes the market's conditions in ways a strategy tuned on ordinary days does not expect. The signals can look identical on the chart. The cost of acting on them is not.

The first change is the spread. On EUR/USD in a calm London session the spread might be a single pip. In the seconds around a release it can widen several times over, and on an instrument such as XAUUSD the widening is larger in money terms. Every position the EA opens in that window pays that wider spread twice, on entry and on exit. A scalping strategy that needs a tight average spread is suddenly trading with a fraction of its edge, or with none.

The second is slippage. Slippage is the gap between the price an order was triggered at and the price it was actually filled at. Most of the time it is small. Around a release it is not, because the queue of orders and the speed of the move mean the next available price can be several pips from the one the robot saw. A stop loss does not protect you from slippage; it triggers the exit and then fills at whatever price the market gives, which can be worse than the level drawn on the chart. This is the most counter-intuitive fact for new automation users: a stop limits your intent, not your fill.

The third is gap risk. Between two ticks, price can simply skip a level. If the EA has a pending order or a stop sitting inside that gap, it is filled on the far side, wherever liquidity first appears. On a one-minute candle the move looks small. At the tick level it can be a jump no setting anticipated.

The fourth is the change in behaviour itself. A range-bound market can turn into a trending one for a few minutes and then revert. Trend-following, mean-reversion and breakout logic are each designed for a particular regime, and a release briefly destroys the assumptions all three depend on. A robot that will spend the next hour being right can spend the next ninety seconds being very wrong, in a market with the highest costs of the day. Crowded levels make it worse, because many automated systems watch the same obvious prices; the first move can be a fake-out that stops the latecomers before the real direction resolves. If your robot can open several positions at once, a release is also the moment that exposure multiplies fastest — the [safe-settings method for a grid EA](/10-powerful-grid-trading-ea-safe-settings-for-mt4-to-reduce-risk-and-boost-profitability/) shows how quickly a chain of levels turns a small loss into an account-level one.

None of this means you should never trade a release. It means you should choose. Either you build a strategy specifically for release volatility, with the costs and the fill risk priced in, or you keep your ordinary strategy out of the window it was not built for. What you should not do is let a normal robot wander into the release because nobody told it the calendar existed.

## What is the difference between a time filter, a news filter and a manual pause?

All three can keep an EA out of a release. They differ in how they know an event is coming, and how well they adapt when the schedule changes.

| Method | How it detects the event | Strength | Weakness |
|---|---|---|---|
| Time filter | A fixed daily or weekly window you define, such as no trading 12:00–14:00 server time | Simple, works in MT4 and MT5, needs no external data | Blocks the same hours every day, including quiet ones; misses unscheduled events |
| Calendar-based filter | An economic calendar feed the EA reads, usually filtered by impact level | Targets real events and can use different buffers by importance | Depends on the feed and on your time zone; can fail without an error |
| Manual pause | You switch auto-trading off, or remove the EA, before the release | No code and no dependency; full control | Relies on memory and availability; fails when you are asleep or busy |

The time filter is the blunt instrument, and blunt is not the same as bad. If your strategy only suffers around the same daily window — say, the US session open — a fixed block of hours removes a real chunk of risk with no external data and nothing to go wrong. Its cost is opportunity: it also blocks the quiet days inside that window. For many traders that is a fair trade.

A calendar-based filter is more precise. It reads scheduled events and applies a buffer that can vary with their importance, so a top-tier release gets a wider window than a second-tier one. The trade-off is dependency. A calendar feed is another thing that can be delayed, mistranslated or read in the wrong time zone, and when it fails it usually fails quietly: the EA simply does not pause, and you find out only when the loss lands.

A manual pause sits at the other end. It is the most reliable method when you are present and the most fragile when you are not, because it turns a technical control into a scheduling problem with you as the single point of failure. It also does not scale — three EAs across three charts and two sessions is more than anyone tracks by hand without a mistake.

The strongest setups combine them. A calendar filter handles the scheduled events; a time filter catches the daily windows where spreads misbehave even without news; a manual override stays available for the unexpected, such as a surprise headline or a platform glitch. Each layer covers a weakness in the others. The mistake is assuming one layer is enough because it held through the last few releases you happened to notice.

## How does an EA detect a news event in MT4 or MT5?

There are four broad ways, and they differ between the two platforms.

The simplest is a hard-coded schedule. The developer decides which recurring events matter and bakes their typical release times into the EA, often with a day-of-week rule. This is cheap, fast and needs no network. Its weakness is maintenance: when a release time moves, or a new event becomes important, the baked-in list is wrong until someone updates it.

The second is a fixed time window you configure yourself — the time filter described above. It does not really detect news at all; it simply refuses to trade during hours when news tends to land, using your broker's server clock as its reference.

The third is an economic calendar feed. In MetaTrader 5, the terminal includes calendar functions an EA can call to read scheduled events, filter them by currency and importance, and act on the results; the platform fetches the data so the EA does not have to. That is the most native way to build a calendar filter on MT5, and it is the approach worth looking for in a modern EA. MetaTrader 4 has no equivalent built-in calendar, so MT4 tools usually pull the data another way — through a web request to a calendar endpoint, a shared file the EA reads, or a separate utility that toggles the terminal's trading state. Each of those adds a moving part.

The fourth is an external service: a web request from the EA to a news or calendar endpoint, or a companion tool running alongside the platform. This can work well, but it depends on the connection, the endpoint's uptime and the format of the response. When any of those change, the filter can stop working with no error you would notice.

Whatever the method, one detail decides whether it works: the clock. News is published in a reference time zone, usually UTC or a major financial centre's time, but your EA trades against your broker's server time, which can be offset by several hours and can shift with daylight saving on a different date from the news source. If the EA compares a UTC release time against a server clock without converting, its blackout window is simply wrong — early in some seasons, late in others, and correct only by luck. Ask the developer explicitly which time zone the filter uses and whether a daylight-saving offset is applied. A filter that cannot answer that question is a filter you cannot trust.

You can watch the schedule yourself on an [economic calendar](/forex-calendar/) to know which events matter and when they print in your own time zone, and it is worth doing for a few weeks even if the EA handles the timing, because understanding what is coming is the human half of the control. If you want the opposite approach — trading the release on purpose rather than standing aside — the mechanics of a [news straddle setup](/news-straddle-expert-advisor-setup-tutorial-the-ultimate-step-by-step-guide/) show how much of that risk lives in spread and fills.

## How do you choose a blackout window that is wide enough, but not too wide?

You size it from the release's behaviour, not from a number you copied. The goal is to cover the minutes when costs and volatility are abnormal, and to be trading again as soon as they normalise. Too narrow and the spike escapes the window; too wide and you remove a lot of ordinary trading for no benefit.

Start with the events, not the clock. Rank the releases you care about. Top-tier data and central-bank decisions — US Non-Farm Payrolls, CPI inflation, interest-rate announcements and rate statements — earn a wider window than second-tier numbers that rarely move price far. If you cannot rank them, you will end up using one window for everything, which is either too narrow for the big ones or needlessly wide for the rest.

Then pick the buffer by what the market actually does. A common starting point is a few minutes before and a few minutes after, but "common" is not "correct" for your strategy. A scalper trading minute candles needs its window to match the minute the costs blow out; a swing system that opens one position a day barely needs the exact second, only the hour. Watch the same release a handful of times on demo and note how long the spread stays wide and how long the first move takes to settle. That observation, repeated, is worth more than any default.

Consider asymmetry. The minutes after a release are often more dangerous than the minutes before, because that is when the market has repriced and the widest spreads and fastest moves happen. A window of five minutes before and fifteen after is not unreasonable, and it does not need to be symmetric. Equally, the very first tick can be untradeable while the following minutes are merely fast — in which case a short, sharp window does the job and a long one costs you trades you did not need to lose.

Account for your strategy's holding time and for pending orders. An EA that leaves limit or stop orders resting in the market is exposed during the window even if it opens nothing new, because price can reach those orders while the spread is wide. If your design uses pending orders, the blackout must either cancel them for the window or place them deliberately outside it. A window that only stops new market orders, while stale pendings sit in the book, is a half-measure.

Finally, review the window the way you review any setting: log what each release did, and adjust only when the record says the window was wrong. Changing it after every single loss is fitting the window to the past, which is exactly the trap the next section describes. A stable window you can defend beats a perfect one you keep rewriting.

## How do you test whether a news blackout actually works?

Two tests, and the order matters. A backtest can show what the strategy would have done historically and warn you about fragile logic, but it usually cannot prove that a live news filter works, because most historical price data does not include the spread spikes and slippage that make a release dangerous. A spotless backtest around news is often a spotless lie.

Use the backtest for what it is good at: rejecting weak ideas, and checking that the blackout does not quietly destroy the strategy's edge on ordinary days. If adding a news window turns a workable system into a losing one, that is useful information — it means the strategy was leaning on release trades, and you now have to decide whether that dependence is acceptable. The [step-by-step backtesting tutorial](/forex-tester-online-backtesting-with-eas-tutorial-the-ultimate-step-by-step-guide/) covers the settings and the honesty checks; the short version is to run the same file with realistic spread and slippage assumptions and see what survives.

The test that matters for the filter itself is forward and small. Put the EA on a demo account that mirrors your intended live setup, keep one configuration, and run it through several real releases with the blackout enabled. Then verify, release by release, that the EA actually stood aside. You are checking three things: that it did not open a position inside the window, that it left no pending order resting through it, and that it resumed on time afterwards. The profit and loss of the demo matters far less than those three facts. A filter that did not fire is a filter you do not have.

Keep a log. For each release, note the event, its time in server time, whether the EA traded, and what the spread did. This record does two things. It tells you whether the blackout window is the right width, and it catches the one failure that is almost impossible to spot any other way: a time-zone error. If the EA traded two minutes before a release it was supposed to avoid, its clock is off, and no amount of widening the window fixes a wrong clock — it only masks the symptom.

Then compare the demo against what you expected. If the strategy traded on the quiet days and stood aside on the loud ones, the filter is doing its job. If it stood aside at the wrong times, or traded through the events, you have found the problem before it cost you real money. That is the same behaviour-first discipline you would apply to any EA, and the same one a careful evaluation enforces: watch what the robot does, not what the page says it does. The method in the [EUR/USD expert advisor vetting guide](/eur-usd-expert-advisor-ea-overview-free-download-guide/) follows exactly this logic and extends it to every other part of an EA's behaviour.

## Which mistakes make a news filter useless, or worse than useless?

A filter can fail loudly, by crashing or refusing to trade, or it can fail quietly, which is far more dangerous. The quiet failures all look the same in a statement: the EA traded through a release it was supposed to avoid, and you did not know until the drawdown appeared. Here are the mistakes that cause them.

The wrong clock is the first and most common. A filter built on UTC data, compared against a server clock several hours away, protects the wrong window. In summer, when different regions change daylight saving on different dates, the offset itself can shift mid-year. If the developer cannot say which time zone the filter uses, treat the filter as unverified.

Blocking entries but leaving orders in the book is the second. Stale pending orders and resting stops are exposure. A blackout that stops new market orders while leaving a buy stop five pips above price does nothing about the scenario it was meant to prevent.

Continuing to manage open trades is the third. Some EA news filters only stop entries but keep managing positions — trailing stops, closing at targets, adding levels. That may be the right choice, but it should be a choice. If a grid or averaging robot keeps adding during the window, the blackout has not reduced the risk it was meant to reduce; it has stopped only the first order and left the compounding in place. The [grid EA safe-settings guide](/10-powerful-grid-trading-ea-safe-settings-for-mt4-to-reduce-risk-and-boost-profitability/) covers how fast that exposure grows when levels keep opening.

An oversized window is the fourth, and it is the quieter cousin of the third. A filter set so wide that it blocks most of the active session removes the strategy's best hours along with the risky ones. If the EA stops trading almost entirely, that is not a filter doing its job; it is a filter hiding a system that depended on the very conditions you are now avoiding.

Over-fitting is the fifth. Tuning the window until the last six months look clean teaches the window to the past. Real releases do not repeat last year's pattern, so a window optimised on history will miss the next surprise. Keep the window stable and defensible.

Finally, there is the mistake of assuming news handling is your only control. A blackout window reduces the chance of a release-driven loss. It does nothing about a broker that widens spreads for the whole session, a weekend gap, or a strategy with no stop. News handling is one layer, and the rest of your risk stack still has to hold. If the account depends on release avoidance alone, that dependence is itself a risk.

| Mistake | How it shows up | What fixes it |
|---|---|---|
| Wrong time zone | EA trades minutes before or after the release it should avoid | Confirm the filter's reference clock and its daylight-saving handling |
| Pending orders left live | Price reaches a resting order during the window | Cancel or exclude pending orders for the window |
| Management continues | A grid adds levels or trails a stop through the spike | Decide explicitly what happens to open trades |
| Window too wide | The strategy stops trading in its best hours | Narrow the window to the events that actually move price |
| Over-fitting | Clean on old releases, exposed on the next surprise | Keep a stable window and log the outcomes |
| No other controls | One wide-spread session or gap still ends the account | Keep stops, sizing and a drawdown limit independent of news |

## What are your options if your EA has no built-in news filter?

You still have choices, and none of them require modifying the EA.

The first is to run it only when you can supervise it, standing aside manually around releases you have marked on the calendar. This is free and needs no tools. Its limit is obvious: it stops working the moment your attention does.

The second is to add the control at the platform level rather than inside the EA. MetaTrader lets you disable automated trading globally, and a small utility or script can toggle that state on a schedule, or read a calendar and switch trading off for the window. The EA keeps running on the chart; it simply cannot place orders while automated trading is off. This is a clean way to protect a robot you cannot edit, and it protects every EA on the platform at once. Its weakness is that it is all-or-nothing: you cannot keep one robot trading while another stands aside.

The third is to host the decision outside the terminal and act on it by hand or by tool — monitoring a calendar and stopping the account's exposure on a schedule. This is common among traders running several systems, but it adds a component that itself has to be tested, or you have moved the single point of failure rather than removed it.

The fourth, and the most durable, is to choose an EA that already handles news and can show you how. A filter is not a headline feature; it is a piece of engineering, and a developer who built one can explain which calendar it reads, which time zone it uses, how far the buffer extends, and what it does with open trades. If an EA cannot answer those questions, the honest position is that it has no news handling, whatever the marketing says.

Whichever route you take, the point is the same: the control has to exist outside your memory. A robot with no news filter is not automatically dangerous. A robot with no news filter and no other rule to keep it out of releases is the one that hands the market its best opportunity at your expense.

## What is in the free EA evaluation checklist?

The free download with this guide is a printable EA evaluation checklist, eight sections long, built to be filled in by hand for any expert advisor before it trades real money. It is a resource, not software; there is nothing to install, and it analyses no specific product. It exists so that the decision about a robot is made once, calmly, with your own numbers, instead of in the middle of a losing position.

The eight sections walk through the whole evaluation in order.

**Where the file came from.** You record the file's origin, its version, whether it targets MetaTrader 4 or MetaTrader 5, and who published it. Provenance is the first gate because a mismatched or unsigned build can harm an account before strategy even matters.

**Reading the strategy before the curve.** You write, in your own words, what triggers an entry, what ends a trade, how many positions can be open, and when the robot stands aside. If you cannot fill that page in, the evaluation stops here — which is the correct outcome.

**The five numbers to demand.** You log drawdown depth and length, peak exposure, trade sample size and period coverage, cost sensitivity, and loss structure. Each number needs a source file or statement attached, because a number without a source is a rumour.

**Testing a backtest for dishonesty.** You run the vendor's settings on your own data, widen the spread and slippage assumptions, test nearby input values and out-of-sample dates, and record where the result bends gracefully and where it breaks.

**A fixed demo protocol.** You keep one configuration for a set period and log daily behaviour — exposure peaks, filter triggers, disconnects, and how the robot behaved around them — rather than only the balance line.

**A position-size worksheet.** You turn your balance, your loss limits and your stop handling into a written sizing rule, so the maximum exposure is something you chose on paper rather than something the defaults decided.

**Red flags.** You check for opacity, pressure to deposit quickly, curves without trade lists, risky logic such as averaging with no halt, and missing support — any one of which is enough to walk away.

**A go or no-go gate.** You sign one of two statements: the robot passed every gate and earns a longer demo or a small live probation, or it failed a named gate for a named reason. Both outcomes protect you.

How this connects to news handling is straightforward. The checklist is where you record what an EA does around scheduled releases — whether it has a filter at all, which events it covers, what it does with open trades, and whether you have watched that behaviour on demo. A robot's news handling is one of the behaviours the checklist forces you to write down and test rather than assume. If you are evaluating an EA whose only claim about news is a sentence on a sales page, the red-flag section is where that sentence gets marked as unproven.

Being precise about what it is not: this checklist contains no news filter, connects to no calendar, and does not trade. It will not tell you that any EA is safe or that any release will be avoided; it predicts no result and carries no performance figures. It cannot replace your broker's contract specification, your platform's server time, or your own demo. What it does is turn the evaluation of a robot — including its news behaviour — into a written record with a decision at the end, so the go or no-go call rests on evidence you collected rather than a feeling you had. It is free to use, print and share with credit to bestmt4ea.com, and it carries version 1.0.

## What should you do before the next high-impact release?

Start by finding out what your robot currently does when the calendar lights up. Open its settings and look for anything about news, filters, trading hours or a pause. If there is nothing, you now know the answer: it trades straight through, and every release it has met has been an unplanned test of your risk controls. That is the thing to fix before the next print, not after.

Then pick your layer. If you can supervise the release, mark it on the calendar and stand aside. If you cannot, set a blackout window — or a platform-level pause — that runs whether or not you are at the screen, and check that its clock matches your broker's. Choose the events worth covering and skip the rest. Wider is not safer if it means you stop trading the conditions your system was built for.

Then prove it. Run the EA on demo through several real releases, keep one configuration, and confirm release by release that it stood aside, left no orders resting and resumed on time. Write down what you saw. When the record says the filter fires and the costs stay off your account, you have turned a hope into a control, and you can decide about live money with your eyes open. Until then, the honest position is that the robot is untested around the moments that hurt most.

Use the free checklist to hold the whole decision. Fill it in for the EA you already own as well as any you are considering, and keep each completed sheet with its settings file and statements. Over time that shelf becomes your own evidence of what survives a release, which is worth more than any single download. When you want broader context while you evaluate, compare cost structures through a [broker shortlist](/best-forex-brokers/), see how transparent records present drawdown on the [ranking hub](/top-ranking/), and read how managed accounts mirror trades on the [copy trading page](/copy-trading/). Keep the [shop](/shop/) for later, once your own record says a system has earned a longer test. Tools support judgement. They do not replace it.

> Trading foreign exchange on margin carries a high level of risk and may not be suitable for every reader. Economic releases can move price sharply and unpredictably, spreads widen and slippage can turn a planned entry or exit into a far worse fill, and pending orders may be rejected or filled away from their trigger. Leverage magnifies both favourable and adverse moves, automation can malfunction or disconnect, and historical or demo results do not predict future performance. Test every system on demo, size positions so an ordinary losing sequence cannot end your account, and never commit funds you cannot afford to lose.
