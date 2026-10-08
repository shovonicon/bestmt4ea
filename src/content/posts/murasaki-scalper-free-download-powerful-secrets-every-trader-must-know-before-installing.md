---
wpId: 134168
title: "Murasaki Scalper EA: test it on demo before you install"
slug: "murasaki-scalper-free-download-powerful-secrets-every-trader-must-know-before-installing"
description: "A scalper's edge is decided by spread, slippage and exit logic, not by signals. Learn how to test any scalping indicator on demo before it touches real money."
publishedAt: "2026-02-19T13:45:52.000Z"
updatedAt: "2026-10-07T00:00:00.000Z"
seo:
  title: "Murasaki Scalper EA: test it on demo before you install"
  description: "A scalper's edge is decided by spread, slippage and exit logic, not by signals. Learn how to test any scalping indicator on demo before it touches real money."
  canonical: "https://bestmt4ea.com/murasaki-scalper-free-download-powerful-secrets-every-trader-must-know-before-installing/"
  ogImage: "https://bestmt4ea.com/wp-content/uploads/2026/07/post_134168_featured.webp"
sourceUrl: "https://bestmt4ea.com/murasaki-scalper-free-download-powerful-secrets-every-trader-must-know-before-installing/"
categories:
  - "Forex Scalping"
  - "Forex Trading Strategies"
categoryPaths:
  - "/category/forex-scalping/"
  - "/category/forex-trading-strategies/"
tags: []
quickAnswer: "A scalping indicator tells you when its rule fired, not whether the trade survives the cost of taking it. Before installing one, measure three things on demo: the spread paid at entry, the slippage between signal and fill, and the average loss against the average win. If two pips of cost turns a profitable sample into a losing one, the edge is smaller than the spread. The free test log records all three."
keyTakeaways:
  - "A scalping signal is a trigger, not an edge. The edge — or the absence of one — lives in the spread, the fill and the exit."
  - "Win rate is the most misleading number in scalping. Seven wins out of ten can still lose money if one loss erases eight wins."
  - "Demo results on a raw-spread account flatter a scalper. Test on the account type you intend to trade live."
  - "Record spread at entry and slippage per trade. Without those two columns you cannot tell a strategy problem from a cost problem."
  - "Twenty trades is the floor for detecting a broken system, not a verdict on a working one. Keep logging, and do not change settings mid-run."
  - "Never install any indicator on a funded or live account before a written demo test says it behaves the way it was described."
faqs:
  - question: "What is Murasaki Scalper EA?"
    answer: "Murasaki Scalper is the name of a forex scalping tool marketed for MetaTrader platforms. As with any third-party indicator or expert advisor, the name tells you almost nothing about the method inside it. What matters is whether you can establish, from your own recorded trades, that the signals survive the spread and slippage you actually pay. This guide gives you the method for testing that, and it makes no performance claim about the product itself."
  - question: "Is a scalping indicator the same as a scalping expert advisor?"
    answer: "No. An indicator draws or alerts — you decide whether to act. An expert advisor places the order itself. The distinction matters because an indicator cannot be judged on a backtest the way an EA can, and because with an indicator your own hesitation and discretion become part of the result, which makes the test harder to interpret."
  - question: "How long should I test a scalping indicator before going live?"
    answer: "At least twenty closed trades across more than one week and more than one session, using the same account type and settings you intend to trade live. That is enough to detect a system that cannot survive its own costs. It is not enough to confirm a working one, so keep logging and treat the first live period as a continuation of the test, at the smallest size your broker allows."
  - question: "Why does a scalping strategy look better on demo than live?"
    answer: "Three reasons, all about execution rather than logic. Demo accounts often fill at the quoted price with no slippage, spreads may be narrower or more stable than on a live account, and requotes and rejections do not affect a demo the same way. A strategy that needs every fill to be perfect will look profitable on demo and lose on live. Recording slippage is how you find out before funding the account."
  - question: "What spread can a scalper tolerate?"
    answer: "Work it out from the strategy, not from a rule of thumb. If the average win is six pips and you pay 1.2 pips of spread plus 0.5 pips of slippage per trade, you are handing over roughly 28% of your gross target before the trade does anything. Compare the gross and net columns in your log. When one pip per trade flips the result from profit to loss, the strategy is trading the spread, not the market."
  - question: "Do scalpers need a VPS?"
    answer: "If the tool manages open positions, or closes on a time or signal rule, a VPS matters a great deal. A home connection that drops, or a laptop that sleeps, can leave positions unmanaged at exactly the moment the exit logic was supposed to act. A VPS keeps the platform live continuously so the strategy runs as tested. If you cannot keep the platform online, test it that way too — because that is the version you will actually be running."
  - question: "What is the most common reason a scalping test fails?"
    answer: "Costs. Most failures are not bad signals. They are an average win too small to absorb the spread, plus slippage that was never measured, plus a single large loss that erases a long run of small wins. The second most common is an inadequate sample — drawing a conclusion from five trades that happened to fall in a quiet session."
  - question: "Should I change the settings while testing?"
    answer: "No. Change a setting and the test restarts, because the result was produced by one exact configuration and you no longer have one. If you want to compare two configurations, run them as two separate logs with the same start and end dates and record the setup details for each."
  - question: "What if the indicator turns out not to work?"
    answer: "Reject it and move on, and treat that as a successful outcome rather than a failure. You spent demo time and a worksheet instead of account equity. The test log that disqualified it is your record of why, which is worth keeping — most traders repeat the same mistakes because they never wrote down the reason the last system was rejected."
  - question: "Can I use the free test log with any scalping tool?"
    answer: "Yes. Recording spread, slippage, exit reason and loss size per trade is a general method, not something tied to a particular product. It works for an indicator, an expert advisor, or your own manual scalping. That is deliberate: the point is to make you measure the numbers that decide the outcome, whatever is generating the signals."
sources:
  - label: "MQL5 Documentation"
    url: "https://www.mql5.com/en/docs"
  - label: "MetaTrader 5 Help — Strategy Tester and Automated Trading"
    url: "https://www.metatrader5.com/en/terminal/help"
  - label: "Investopedia"
    url: "https://www.investopedia.com"
primaryKeyword: "murasaki scalper"
download:
  origin: "own"
  license: "Free to use, print and share with credit to bestmt4ea.com"
  version: "1.0"
  fileKey: "resources/scalping-ea-demo-test-log.pdf"
---
## Why does a scalping indicator work for a week and then stop working?

It usually does not stop working. It was never working in the way you thought it was.

Here is the sequence that catches almost every scalper. You find a tool, install it, and watch it fire signals that look uncannily well timed. You place a few trades by hand and they land in profit. The equity curve you build over a fortnight climbs. You increase the size, because the evidence seems to be accumulating. Then a week arrives where every signal seems to arrive a moment late, the winners are slightly smaller than they used to be, and one loss is much larger than any you saw during the good run. The account gives back three weeks of progress in two sessions.

Nothing broke. What happened is that the first fortnight was a sample of a favourable market, and the size increase converted a small measurement error into a large one. Scalping compresses everything — the edge, the cost, and the noise — into a few pips, so the margin for being wrong about which of them you are looking at is very thin.

This guide is the method for not fooling yourself. It is not a review of any specific product, and it will not tell you whether the tool you are curious about makes money. It will show you how to find out for yourself, on a demo account, with numbers you recorded — which is the only kind of knowledge about a scalping system that survives contact with a live account. The free test log that accompanies this guide is the worksheet for doing exactly that.

## What is Murasaki Scalper EA, and what does the name actually tell you?

Murasaki Scalper is the name of a forex scalping tool marketed for MetaTrader platforms, and it is the phrase most readers arrive searching for. That is the honest extent of what a name can tell you.

Names describe categories and aspirations, not methods. "Scalper" tells you the intended holding period is short. It does not tell you how the tool decides to enter, how it decides to exit, whether it repaints, whether it has been forward tested, or what happens when the market trends through its signals for three days. Those are the questions that decide whether using it is a reasonable idea, and none of them are answered by the branding.

The same applies to every tool in this category. A signal that appears on a chart after the fact — because the indicator recalculates as new bars form — will look far better in a screenshot than it behaved in real time. A tool whose stop is wider than its target can hold a high win rate and still lose money. A tool optimised on one year of one pair can be precisely tuned to conditions that will not return.

So this guide takes the only defensible position available for third-party software you have not tested: it makes no performance claim, and it gives you the method to generate one of your own. When you have finished the process below, you will know more about whether this category of tool suits you than any review could tell you, because you will be reading your own recorded trades rather than someone else's marketing.

## Why does cost decide a scalper's outcome more than signals do?

Because a scalper's target is small, and costs are not.

Consider a strategy with an average win of six pips and an average loss of twelve pips, which is a realistic profile for a short-term system that takes profits quickly and gives losses room. At a 60% win rate, expectancy per trade is:

(0.60 × 6) − (0.40 × 12) = 3.6 − 4.8 = **−1.2 pips per trade**

That system loses money before costs are applied at all. Raise the win rate to 70% and it becomes (0.70 × 6) − (0.30 × 12) = 4.2 − 3.6 = +0.6 pips. A positive edge — but a tiny one, and now subtract the costs.

Spread varies by pair, session and broker, but for a major pair on a retail account, something in the region of a pip is ordinary, and it is wider at the daily rollover and around news. Slippage — the difference between the price your signal fired at and the price your order filled at — adds more, and it is worst exactly when the market moves fastest. Add two pips of combined cost to the +0.6 above and the system is losing again.

This is why the questions that matter about a scalping tool are not primarily about its signals. Signals are easy to make look good. What is hard to make look good is a strategy that must extract its profit from the gap between the spread it pays and the move it captures. That gap is narrow, and it is the thing your test log exists to measure.

| Evidence level | What it actually proves | Weight for a scalping decision |
| --- | --- | --- |
| Vendor screenshot or marketing curve | That someone can draw a chart | None on its own |
| Long backtest on historical data | That the logic fits the past, subject to how honestly it was run | Low — useful only for rejecting obviously broken ideas |
| Demo forward test, recorded by you | How the tool behaves on live prices, including costs, in the sessions you tested | Moderate, and the minimum bar before risking money |
| Small live test, smallest allowed size | How it behaves when fills are real and money is at stake | High, and the only level that includes everything |
| Nothing recorded | Nothing | — |

## What is a scalping signal actually telling you?

It is telling you that a condition the developer defined has become true. That is all. Buy when fast average crosses slow average, sell when an oscillator reaches an extreme, enter when price closes beyond the previous range — the logic is finite and the tool applies it without hesitation or interpretation.

Understanding this changes what you would reasonably expect from it. A signal is not a prediction. It is a statement about the past few bars. Whether the next few bars continue in the same direction is a property of the market, not of the indicator.

Three consequences follow, and they explain most disappointment with scalping tools:

**The tool cannot know why the market is moving.** A rate decision, a central bank comment, an unexpected data release — these change the character of price action instantly. An indicator applying the same rule through the announcement as before it is not being stupid; it is being exactly what it is. If the rule does not include a filter for those conditions, you are the filter. That means deciding, in advance, whether you will trade through scheduled events.

**A signal has no position size attached to it.** The tool will fire the same signal on a $500 account and a $50,000 account. Sizing is your responsibility, and it is the difference between a losing week and a losing account. Working out the lot size from the risk you are willing to accept, rather than from what the platform defaults to, is the single highest-value hour you can spend before starting any test.

**A signal has no exit attached to it.** Some tools suggest a stop and target; many do not. If the exit is yours to choose, then the exit — not the entry — is what you are really testing, because a scalper's survival is decided by how losses behave. A system that wins six pips and loses twelve needs a win rate above 67% merely to break even. That arithmetic is worth writing on the wall.

## Why does the same indicator behave differently on demo and live?

Because demo accounts are not simply live accounts without money in them. The differences are specifically the ones that matter to a scalper.

Demo pricing is often generated or filled more permissively. Orders may fill at the quoted price when a live account would have filled a fraction worse. During fast markets, demo servers typically do not reproduce the rejections, requotes and partial fills that a live account encounters. Spreads on demo may be narrower or more stable than the live feed you will eventually trade.

None of this is dishonest. It is a consequence of demo environments having no real liquidity to match against. But it means a demo result is an upper bound on a live result, and the gap between the two is widest precisely for short-term strategies — the ones that need every fill to be clean.

You cannot eliminate this, but you can reduce the surprise:

- Test on the **same account type** you intend to trade live. A raw-spread demo and a standard live account are not comparable.
- Record **spread at entry** and **slippage** on every trade, so the difference becomes a number in your log rather than a vague feeling later.
- Include at least one **difficult period** — a trending week, a news week, a session that does not usually move. Calm sample periods flatter every strategy.
- If the tool manages open positions, run the test with the **platform online continuously**, because that is the only way to see its exit logic working.

Brokers differ meaningfully in execution quality, and it is worth choosing one on that basis rather than on the size of its welcome offer. Our [best forex brokers](/best-forex-brokers/) page covers what to compare.

## What should you check before you install anything?

Five checks, all of them quick, and any one of them can save you the entire exercise.

**Provenance.** Where did the file come from, who published it, and is there a version you can identify later? Scalping tools circulate through file-sharing sites and Telegram groups, and a modified build of a known tool is indistinguishable from the original by inspection. If you cannot name the source, you cannot assess the tool.

**Platform version.** A build compiled for MetaTrader 4 does not run on MetaTrader 5. Indicator code, execution handling and the backtesting engine differ between the two, so a result produced on one tells you nothing certain about the other. Confirm the file matches your platform before you plan a test around it.

**Whether it repaints.** Many signals are drawn from closed bars and are stable; others recalculate intrabar and effectively move the arrow to wherever price went. Test in a live chart, not from screenshots: watch what a signal looked like when it appeared, then whether it stayed. A repainting tool is untestable and should be discarded, because you can never act on a signal you only see afterwards.

**What the tool claims, in writing.** Take note of the specific claim — an accuracy percentage, a fixed monthly return, an assurance that losses are not possible — because that claim is what your test will either support or contradict. Claims of assured outcomes are a reason to walk away on their own.

**Whether a stop loss is part of the logic.** If the method is described as not needing one, or as always recovering, you are looking at grid, averaging or martingale behaviour whether or not it is named. That does not make it unusable, but it changes what you are testing entirely: you are no longer asking whether the signal works, but how large the exposure grows before it recovers. That arithmetic deserves its own worksheet, completed before running any such system on an account you care about.

## How do you tell an edge from a lucky week?

By measuring distributions rather than outcomes.

A lucky week and a real edge can produce identical equity curves over twenty trades. What separates them is what the curve is made of. Four figures do the work:

**Expectancy per trade** — (win rate × average win) − (loss rate × average loss). This is the number the whole exercise exists to produce. Positive after costs is the minimum bar; not in the first twenty trades, and not by a rounding error.

**Largest single loss against average win.** If one loss erases eight or ten wins, the strategy is one event away from a large drawdown regardless of how good the win rate looks. Divide the largest loss by the average win and note the result. A ratio above eight should make you cautious about size, whatever the other numbers say.

**Total cost as a share of gross profit.** Add spread and slippage across the sample and compare with the gross result. If costs consume more than about a third of gross profit, the strategy is working for the broker at least as hard as it is working for you, and any deterioration in spreads will finish it.

**Behaviour in the worst session.** Look at the single worst day or the worst run of losses. Then ask whether the account — at the size you intend to trade — would still have met its obligations, including any drawdown rule if you are on a funded programme. That is the question a funded trader must answer, and it is answered by the worst period, never by the average.

If you are considering a funded account or copy-trading arrangement rather than your own capital, the same measurement applies but the consequences of being wrong are sharper. Our pages on [top-ranked systems](/top-ranking/) and [copy trading](/copy-trading/) explain how published track records are constructed, which will tell you what to look for in your own log.

## What position size should you use while testing?

The smallest one that produces meaningful numbers, calculated from risk rather than chosen by feel.

The arithmetic is not complicated: decide the money you are willing to lose if the stop is hit, divide by the pip value and the stop distance, and that is your lot size. On a $10,000 account risking 1% with a twenty-pip stop on a pair worth $10 per pip per standard lot, that is 0.50 lots. Run the same calculation on a $1,000 account and it is 0.05.

What matters is the discipline of starting from the loss rather than the position. Traders who pick a lot size first and then set a stop to fit it are, in effect, letting the platform decide their risk. And when the tool is a scalping tool with a small average win, the temptation to size up in order to make the pips worth something is exactly how a test budget becomes a real loss.

Two further constraints are worth writing down before you begin:

- **A maximum number of open positions.** A scalping tool that adds to a losing position is not trading one position at your chosen risk; it is trading a sequence that shares one outcome. Cap the count, not just the size per entry.
- **An equity figure at which you stop.** Decide the level at which you will close everything by hand, and write it somewhere you will look when the account is red and your judgement is at its worst.

## Why does a scalper need a broker and hosting built for fills?

Because a scalper's margin for error is measured in fractions of a pip, and both of those choices determine how much of it is lost to the plumbing.

On the broker side, what matters is not the marketing spread but the spread you actually receive in the sessions you trade, plus execution quality during fast markets. A broker advertising 0.0 pips on a raw account is quoting the best case; your concern is the case at 14:30 on a data release, which is when your signals will fire and when the quote is widest. Slippage is also a broker property, not a strategy property — the same signal costs different amounts to act on at different venues.

On the hosting side, the question is whether the platform stays online. A home connection drops; a laptop sleeps; a power cut ends the session. For a manual scalper that is an inconvenience. For a tool that manages open positions, it means the exit logic did not run — and the position stays open, unmanaged, through whatever happens next. A [VPS](/product/vps/) running the platform continuously is not a luxury for this style of trading; it is the condition under which the test you ran is still valid on the account you run it on.

Both of these show up in the test log as measurable columns rather than assumptions: average spread at entry, and total slippage. If the log cannot tell you what execution actually cost you, the result is not yet a result.

## How do you run a demo test that tells you something real?

Protocol rather than enthusiasm. Fourteen days and at least twenty closed trades, recorded in the worksheet as you go.

**Day 0 — record the setup.** Tool name and version, platform, pair, timeframe, broker, account type, balance, leverage, typical spread observed, risk setting and maximum positions. Every one of these changes how the result should be read. A test without them is not comparable to anything, including a repeat of itself.

**Days 1–14 — one row per closed trade.** Entry time and session, direction, size, entry, stop, target, spread at entry, slippage, exit reason, result in pips, result in currency, notes. Log the exit reason honestly, including manual interventions — writing down what prompted you to override the tool is one of the most useful things the log does, because a pattern of manual interventions means the strategy and your temperament disagree, and that will not improve with size.

**Continuously — track floating exposure.** Record the maximum number of simultaneous positions, the worst floating loss in money and as a percentage, and how close the account came to stop-out. The worst moment is usually not any of the closed trades; it is a point during the run you would not otherwise have noticed.

**Also record the benchmark.** What did the pair actually do over the test window — trend, range, or news-driven? How many days did the tool not trade? A strategy that performed well in a clean trend is untested in the range that follows it, and the only way to know which you had is to write it down.

**At the end — answer, in writing, before you change anything.** Does it survive its costs? Is the win rate hiding the loss size? Is twenty trades enough to mean anything yet? How much of the result was the market? Then decide, and record the decision with a date.

The free download with this guide is the worksheet for all of it. It enforces the fields — spread, slippage, exit reason, largest loss, floating exposure — that are usually omitted from a hand-kept record and are the reason hand-kept records so often conclude that everything is fine.

## What ends a scalping test early?

Some things disqualify a run outright, and recognising them early saves the time as well as the money.

- **Changing settings mid-run.** The result belonged to one configuration. Change it and you have two half-results, neither of them usable. Restart the log and the trade count.
- **Editing the record.** Closing trades by hand to protect the curve and then reporting the curve without those trades is not a test, it is a story. Log the intervention as an intervention.
- **Testing on a different account type from the one you will trade.** The whole point is to measure your costs, and you measured someone else's.
- **Calling a backtest a test.** A backtest answers whether the logic is worth forward-testing. It cannot include the fills, spreads or behaviour of your live venue, and treating it as evidence is how most bad systems get funded.
- **Drawing a conclusion from too few trades.** Five trades in a quiet week is not a sample. It is an anecdote with a chart attached.
- **Ignoring an already-visible failure.** A tool that demonstrably repaints, that widens its stop after entry, or whose owner promises an outcome has failed the checks above. No length of demo run will make those facts less true.

## What should you do if it turns out not to work?

Reject it, and count that as the system working correctly.

The outcome of a disciplined test is a decision, and "no" is a legitimate and frequent one. Most tools, most of the time, will not survive a cost-aware test on your own account — and every rejection you complete with a worksheet is equity you did not lose while finding out the expensive way.

Keep the record. Note the tool, the version, the dates and the specific reason — costs too high, sample insufficient, exposure unbounded, repainting signals, personal overrides too frequent. That note is what stops you re-installing the same thing in six months when it appears under slightly different branding, and it is what makes your next test faster than this one.

Then either test the next tool with the same protocol, or decide that the honest conclusion is that this style of trading does not suit your available time, your capital or your tolerance for drawdown. Both are good outcomes. Handing your account to a signal you have not measured is the only genuinely bad one.

## Risk disclosure

Trading foreign exchange and leveraged instruments carries a high level of risk and can result in the loss of all of your capital, and it is not suitable for every investor. Most retail accounts trading leveraged products lose money. Nothing in this guide is investment advice, and no part of it predicts a future result.

Speak to an independent licensed adviser if you are unsure whether trading suits your circumstances, and never risk money you cannot afford to lose. Demo results do not reproduce live fills, requotes or the effect of trading under pressure, and past performance — including your own recorded results — does not indicate future performance.

## Start the log before you start the search

The order matters, and it is the reverse of the usual one. Most traders install the tool first and look for evidence afterwards, which is why the evidence they find is the evidence they wanted. Building the log first — fields, thresholds and a written go-or-no-go decision — means every tool you consider is judged by the same standard, and the standard is yours.

Download the free scalping test log, print it, fill in the setup page before the first trade, and give any tool you are considering fourteen days to prove it can survive its own costs.

That is a shorter road to a real answer than any review you will read, including this one.
