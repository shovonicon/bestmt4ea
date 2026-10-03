---
wpId: 142856
title: "Gold M1 Grid EA: Safest Right Before It Blows Up"
slug: "gold-1-minute-grid-forex-ea-reviews-7-powerful-truths-you-must-know-before-investing"
description: "Grid and martingale gold EAs on M1 look safest right before they are most dangerous. See what the win rate hides, plus a free tool to size the worst case."
publishedAt: "2026-02-25T10:02:06.000Z"
updatedAt: 2026-09-29
seo:
  title: "Gold 1 Minute Grid EA Reviews: The Risk Behind 92% Wins"
  description: "Grid and martingale gold EAs on M1 look safest right before they are most dangerous. See what the win rate hides, plus a free tool to size the worst case."
  canonical: "https://bestmt4ea.com/gold-1-minute-grid-forex-ea-reviews-7-powerful-truths-you-must-know-before-investing/"
  ogImage: "https://bestmt4ea.com/wp-content/uploads/2026/07/post_142856_featured-1.webp"
sourceUrl: "https://bestmt4ea.com/gold-1-minute-grid-forex-ea-reviews-7-powerful-truths-you-must-know-before-investing/"
categories:
  - "Gold (XAUUSD) Trading"
  - "Gold EA & Robots"
categoryPaths:
  - "/category/gold-xauusd-trading/"
  - "/category/gold-ea-robots/"
tags: []
draft: false
primaryKeyword: "gold 1 minute grid forex EA"
quickAnswer: "A gold M1 grid EA looks safest exactly when it is most dangerous, because the risk sits in a growing basket of open positions instead of a stop-loss. That is why the win rate stays above 90% until one trend day. Measure the grid's full depth, size every level against it, and demo-test before any real money moves."
keyTakeaways:
  - "Win rate and risk come from the same mechanism in a grid: it closes many small winners and keeps the one large loss open. The smoother the equity curve, the more of that loss is still unpaid."
  - "On XAUUSD the 1-minute chart turns every grid level into a spread and slippage payment, and a single US data release can move gold further than a multiplying lot sequence can absorb."
  - "Before funding any grid, write down how far price must move against you to reach a 20% drawdown, then compare that number with gold's average daily range. If it is smaller, the grid is a countdown."
  - "Four settings decide whether you survive a trend day: a maximum level count, a fixed lot with no multiplier, a hard equity stop, and a news filter. Everything else is decoration."
  - "The download on this page is the EarnForex Trailing Stop on Profit, an Apache-2.0 EA for MT4 and MT5 that trails a position's stop once it reaches a profit you set, so a winner is not handed back."
faqs:
  - question: "Is a gold 1 minute grid EA safe to run?"
    answer: "No timeframe and no setting makes a grid safe in the way the sales page means. A grid converts many small known losses into one large unknown loss. You can make that loss smaller and you can cap it with an equity stop, but you cannot remove it, because the system's whole edge depends on price returning to a level it has already passed."
  - question: "Why do gold grid EAs show a 90% win rate?"
    answer: "Because a grid only takes profit when price retraces into the basket. Most hours, gold retraces, so most cycles close green. The statistic is honest and useless at the same time: it counts wins, not the size of the loss that is still open, and the open loss does not appear in the win rate at all."
  - question: "How much money do you need for a gold grid EA?"
    answer: "There is no honest minimum, so ignore the $200 figures. Work it backwards instead. Take the deepest grid the EA can build, calculate the floating loss at that point, and fund the account so that figure is under 20% of the balance. For most M1 gold grids with a multiplier above 1.0, that number is far higher than any retail account you would want to risk."
  - question: "Can a grid EA blow up a small account?"
    answer: "Yes, and small accounts are the ones it blows up first. With a fixed proportion of margin per level, a small balance runs out of free margin after fewer levels, so the broker stops the basket out at the worst moment. A larger account survives the same price move, which is why the same EA can look stable for its developer and fatal for you."
  - question: "Does a lower lot multiplier make a grid EA safe?"
    answer: "It makes it slower, not safe. Dropping from 2.0 to 1.3 still grows the floating loss faster than linearly with every level, and it doubles the number of levels the grid needs before the basket turns green. The cleanest fix is a multiplier of 1.0, a fixed lot on every level, and a level cap you refuse to raise."
  - question: "What is the trailing-stop EA on this page used for?"
    answer: "It moves a position's stop-loss up behind price once that position reaches a profit you set, so a winner cannot quietly turn back into a loser. It is a management tool for an exit, not a sizing calculator and not a strategy. Use it on top of a correctly sized, fixed-stop system, not as a substitute for one."
  - question: "How long should you test a gold grid EA before going live?"
    answer: "Long enough to see it fail. Thirty days of demo is a start, but it is not enough, because a ranging month is the result the grid is built to produce. Run it through at least one high-impact week on demo and one full year in the MetaTrader Strategy Tester on real ticks, and check the worst floating drawdown rather than the final balance."
sources:
  - label: "ESMA — CFD product intervention measures, including the 20:1 leverage cap on gold and 30:1 on major currency pairs"
    url: "https://www.esma.europa.eu/press-news/esma-news/esma-adopts-final-product-intervention-measures-cfds-and-binary-options"
  - label: "MQL5 Reference — Testing trading strategies: tick generation, the spread model and why a smooth backtest can mislead"
    url: "https://www.mql5.com/en/docs/runtime/testing"
  - label: "MQL5 Reference — OrderSend and order requests: how stops, lot sizes and trailing orders are actually submitted"
    url: "https://www.mql5.com/en/docs/trading/ordersend"
  - label: "World Gold Council — Gold price data and historical spot prices for XAUUSD research"
    url: "https://www.gold.org/goldhub/data/gold-prices"
  - label: "EarnForex — Trailing Stop on Profit: source repository and documentation"
    url: "https://github.com/EarnForex/Trailing-Stop-on-Profit"
installSteps:
  - name: "Download the project archive"
    text: "Open the EarnForex/Trailing-Stop-on-Profit repository on GitHub and use Code then Download ZIP, or install the latest release build. You get readable source, not an encrypted executable."
  - name: "Copy the files into your terminal's data folder"
    text: "In MetaTrader 4 or 5 choose File then Open Data Folder. Copy the repository's MQL4 files into MQL4, or its MQL5 files into MQL5, so the EA lands in the Experts tree."
  - name: "Compile the expert advisor"
    text: "Open MetaEditor, load the .mq4 or .mq5 file from the Experts tree and press F7. A clean build writes the compiled file next to the source, which confirms you are running the code you just read."
  - name: "Attach it to a demo chart"
    text: "Log in to a demo account, open the symbol you trade, drag the EA from the Navigator and allow algorithmic trading. The symbol has to match your broker's spelling exactly, including any suffix."
  - name: "Set the profit trigger and the trailing distance"
    text: "Enter the profit value after which trailing begins and the distance the stop should follow behind price. Attach it to a position you already hold and watch where the stop sits once the threshold is reached."
  - name: "Forward-test for at least a month"
    text: "Run it through a full month, including a CPI or non-farm payrolls week, and compare the exits it produces with the floating drawdown you recorded for the grid."
download:
  origin: "opensource"
  license: "Apache-2.0"
  licenseUrl: "https://www.apache.org/licenses/LICENSE-2.0"
  author: "EarnForex"
  sourceUrl: "https://github.com/EarnForex/Trailing-Stop-on-Profit"
  version: "latest"
  platform: "MT4/MT5"
  externalUrl: "https://github.com/EarnForex/Trailing-Stop-on-Profit"
---

Every gold grid EA looks safest in the week before it is most dangerous.

That is not a slogan, and it is not a warning about crooked vendors. It is arithmetic. A grid EA does not remove risk from trading. It moves the risk off your statement and into the positions that are still open.

So when the sales page shows a 92% win rate, a staircase equity curve and an 8% maximum drawdown, you are looking at real numbers produced by a real mechanism. You are simply not looking at the number that decides whether the account lives: the worst-case loss on the whole basket of open trades, at the moment price goes one way and does not come back.

You are not naive for finding it attractive. A grid on XAUUSD genuinely does close dozens of small winners while gold chops sideways, and the 1-minute chart gives it the most chances per session. The page is selling you the part that is true.

## What problem are you actually trying to solve?

You want gold trading automated, and you want the drawdown to stay small. Those two wishes are the reason grid systems sell.

You are not shopping for a lottery ticket. You have probably already been burned, or watched a friend get burned, so you are doing the careful thing: reading reviews, comparing settings, checking drawdown figures, watching demo accounts. And on paper, the grid systems keep winning the comparison. Their curves are the smoothest. Their losing stretches are the shortest. Their demo accounts survive whatever test you throw at them.

That is the trap. Every check you use to judge an expert advisor — win rate, maximum drawdown, the calmness of the equity curve — is a number a grid is engineered to flatter. You are grading the system on the exact exam it was designed to pass.

Meanwhile the honest EAs fail your filter. A fixed-stop system takes losses in public, one after another, and its equity curve has visible teeth. The grid closes ninety-two winners out of a hundred and hides the loss inside floating positions where your statement barely notices it.

So here is the reframe this page is built on: with a grid, a calm statement is not evidence of low risk. It is evidence that the risk has not been paid yet.

## What does that look like in one real account?

Names and numbers keep changing, so use the shape rather than the digits.

A trader we will call Marek saves $3,000. He finds a gold 1-minute grid EA with 640 demo trades, a 91% win rate, and a maximum floating drawdown of 6% on a demo account over 31 days. He pays $180 for the licence.

He funds a live account with $2,500, rents a VPS for $12 a month, and runs the defaults: 0.01 lots to start, a 1.6 multiplier after each losing level, a grid step of 150 points, and a basket take-profit of $12 per cycle. No stop-loss on individual trades. Maximum open trades: unlimited.

For six weeks it works. Balance up $310. The worst floating drawdown he sees on the dashboard is about $180. He starts telling people it is a savings account with extra steps.

Then a US inflation release lands on a Tuesday morning. Gold moves $42 in 26 minutes in one direction. The grid opens fourteen more levels on the way down, each one bigger than the last. Marek watches a floating loss of $1,910 build against a $2,810 balance. The margin level drops under 100%. The broker closes every position for him at 10:41am.

He is left with $684. The licence, the VPS and six weeks of work bought him a $2,126 loss and a lesson he could have had for free.

The expensive part was not the $180. It was that he never once asked how much the basket could lose. He measured the system by the number a grid maximises, and ignored the number a grid is built to hide.

## Why does a gold grid EA look safest exactly when it is most dangerous?

Because the smooth part of the curve is the part where the loss is still open. A grid that has opened nine levels and floated $1,400 into the red has not had a losing day yet.

The danger peaks at the point of maximum comfort. That is when the basket is deepest, when the lot sequence has grown the largest, and when the closest thing you have to a stop is a margin level you do not control. A fresh grid with two levels open is far safer than a "proven" grid that has been running smoothly for two months.

| What the statement shows you | What it hides |
|---|---|
| Win rate above 90% | The size of the loss that is still open |
| Maximum closed drawdown of 6% to 8% | Maximum floating drawdown, which is often 3x to 6x larger |
| A flat, calm equity curve | Open lots, distance from the first entry, and total exposure |
| Profit factor near 4.0 | The single trend day that would erase the whole year |
| Demo performance | Real spread, real slippage and the broker's margin rules |

### Why do grid systems fail on a 1-minute chart?

Because M1 does not change the strategy, it multiplies the number of times you pay for it. Each grid level on gold costs you a round-trip spread, and the 1-minute timeframe gives the EA far more opportunities to open levels than an H1 chart does.

Gold's spread is not stable. In quiet London hours your broker may quote 15 to 20 points round trip on XAUUSD. Ten minutes into a US data release that same spread can jump to 80 or 120 points, exactly when your entries are fastest and slippage is worst. A grid with a 150-point step then finds that a single level's entire allocation went to the broker.

Two more M1 effects matter:

- **More levels per move.** Gold can travel 400 points in minutes. On a 150-point grid that is three levels in one candle, at their most expensive prices.
- **Faster margin consumption.** Every new level locks more margin at the same time it adds floating loss. Free margin falls from both directions at once.

None of this is a tuning problem. It is the cost of running a tight grid on the most volatile major symbol there is.

## What actually happens on the day the grid meets a trend?

The exit is not a stop-loss you set. It is the broker's margin engine, and it fires at the worst possible price.

To understand why, look at the two numbers your terminal shows under the positions tab. One is the floating loss. The other is the margin level, which is equity divided by the margin your open positions consume, expressed as a percentage. As the basket deepens, equity falls while used margin climbs, so the margin level drops from both sides at once.

Every broker publishes a stop-out level: the margin level at which it starts closing your positions without asking. The exact figure differs by broker and by account type, but when it is reached, the engine closes positions — often the largest losing one first — and repeats until the margin level is back above the threshold. It does that at market, in the middle of the move, at the moment spreads are widest.

The practical result is that you never get the professional's version of a losing trade. You get liquidated at the extreme of the move, with the positions that would have recovered on the first retrace already gone.

Three details make it worse on gold:

- **The breakeven moves.** Your basket does not need price to return to your first entry. It needs price to return to the volume-weighted average of every open leg, which sits much closer to the current price. That sounds kind, right up to the point where the basket is so large that a normal-sized retrace cannot finish the job.
- **The weekend gap.** Leaving twelve levels open on a Friday means any Sunday gap in your direction adds another leg instantly, at a level no grid step planned for.
- **The running costs.** Swaps and commission keep accruing on a basket you hold for days. On a 2.55-lot position, even a modest swap rate is a real bill every night.

If you want to watch this happen without paying for it, use an account that reports margin level and stop-out level clearly, and monitor the floating drawdown as it grows. Our round-up of [EA performance monitoring tools](/top-10-free-tools-for-mt4-ea-performance-monitoring-powerful-ways-to-track-improve-results/) covers what to track and how often. The point is to see the number climbing before it decides something on your behalf.

## How do you calculate a gold grid's worst case before you fund it?

You multiply. Take the step size, the lot sequence and the level cap, then compute the floating loss and the margin as if price never comes back. This is the one calculation the sales page never does for you.

Here is a plain martingale example: 0.01 lots to start, doubling after each level, a 150-point step, on a gold contract where 0.01 lots equals one ounce and a $1.00 price move equals $1.00 per ounce.

| Level | Lot size opened | Gold below first entry | Total lots open | Floating loss | Ounces held |
|---|---|---|---|---|---|
| 1 | 0.01 | $0.00 | 0.01 | $0 | 1 |
| 2 | 0.02 | $1.50 | 0.03 | $3 | 3 |
| 3 | 0.04 | $3.00 | 0.07 | $15 | 7 |
| 4 | 0.08 | $4.50 | 0.15 | $51 | 15 |
| 5 | 0.16 | $6.00 | 0.31 | $147 | 31 |
| 6 | 0.32 | $7.50 | 0.63 | $387 | 63 |
| 7 | 0.64 | $9.00 | 1.27 | $963 | 127 |
| 8 | 1.28 | $10.50 | 2.55 | $2,307 | 255 |

Read the last row again. Gold moved $10.50 against the position — 1,050 points, a quiet hour on XAUUSD, not a bad day — and the basket now holds 255 ounces and is $2,307 down.

The floating loss grows faster than the level count because every new leg is bigger and further away than the last. Doubling makes it grow roughly with the square of the number of levels. That is why grid traders describe a smooth year and then a single afternoon.

Now add the margin. At 20:1 leverage, the cap ESMA applies to gold for retail accounts in the EU, the 255 ounces held at level 8 require roughly 5% of their value as margin. If gold is trading at $2,400 an ounce, that is about $30,600 of margin supporting a $2,500 account. Your broker will never let you get there. It will liquidate somewhere around level 5 or 6, at a price chosen by the margin engine, not by you.

Do this arithmetic with your own EA's numbers before you fund it. You need three values: the step in points, the lot sequence, and the level cap. If the cap is "unlimited", treat the broker's margin call as your true stop and price it as one.

## Which settings actually reduce grid danger?

Four settings do most of the work, and the rest are decoration. If you cannot change these four, you are not managing the system, you are renting it.

| Setting | Typical gold M1 grid default | Honest value | Why it changes the outcome |
|---|---|---|---|
| Grid step | 100 to 200 points | 400+ points, or run it on M15 and above | Fewer levels are reachable inside one real move |
| Lot multiplier | 1.5 to 2.0 after every loss | 1.0, fixed lot on every level | Turns exponential growth into linear growth |
| Maximum open trades | 20 to 30, often unlimited | 5 or 6, and never raised mid-trade | Caps the size of the basket you must survive |
| Stop-loss per position | None, "the basket manages it" | A hard stop on every position | Gives the loss a floor you chose yourself |
| Equity stop | Absent, or left at 90% margin level | 20% to 25% of balance | You decide when it ends, not the broker |
| News filter | Rare | Pause or flatten before CPI, NFP and FOMC | Removes the trigger that usually ends grids |
| Starting lot | Sized to flatter the demo | Sized from risk, with the whole depth as the stop | The only number that keeps you solvent |

Set the level cap first. Everything else is easier once the basket has a maximum size.

If you want the fuller version of this checklist, including step distances for specific pairs, our [grid trading EA safe settings guide](/10-powerful-grid-trading-ea-safe-settings-for-mt4-to-reduce-risk-and-boost-profitability/) walks through each input, and the [martingale recovery system breakdown](/best-martingale-ea-for-mt4-with-a-recovery-system/) covers what "recovery mode" really does to the sequence.

## What is a gold grid EA's win rate really telling you?

It tells you how often a cycle closes green. It says nothing at all about the trade that never closes.

Run the expectancy arithmetic and the picture changes fast. Suppose the EA wins 92% of its cycles with an average win of $12, and the losing cycles close at an average of $150. Per hundred cycles you collect $1,104 and pay $1,200. The system is behind before spread. Push the average loss to $400 — which is what an eight-level basket in the table above actually costs — and you are paying $3,200 against $1,104 of wins. A 92% win rate is not evidence of edge. It is the shape a losing system takes when the losses are deferred.

That is why "win rate" belongs next to two other numbers whenever you compare systems:

| Number | What a healthy system looks like | What a grid usually shows |
|---|---|---|
| Average win vs average loss | Similar size, or loss smaller | Win is 5% to 20% of the loss |
| Win rate | 45% to 70% | 85% to 97% |
| Expectancy per trade | Positive once costs are counted | Positive until the deferred loss lands |

If a vendor quotes a high win rate and refuses to quote the average losing basket, you have your answer. They are not hiding the number because it is flattering.

## Are gold 1 minute grid EA reviews worth reading?

Usually not the way they are written, because most of them are affiliate pages with a first-person costume. The reviewer earns when you click the buy button, so the "verdict" was decided before the testing started.

That does not mean you should ignore reviews. It means you grade the evidence rather than the score.

- **Is there a third-party track record?** A Myfxbook or similar link that reads the account from the broker's server. Not a screenshot, not a PDF, not a video of a phone.
- **Is it a live account or a demo?** Many "verified" statements are demo. The tag is usually visible on the profile page.
- **What does the equity curve look like, not the balance curve?** On a grid, the balance curve is a staircase and the equity curve is the story. Look for the deepest equity dip and where it sat relative to the balance.
- **Does the position history show a recovery thread?** A stack of orders on the same symbol, opened at similar timestamps and growing in size, is the signature of a multiplied grid. You do not need the source code to see it.
- **Does the review mention the worst period?** A review that only describes the good months is a sales page with a byline.
- **Can you find a withdrawal?** Profit is only real when it leaves the account. A statement with no withdrawals tells you the trader is still financing the experiment.

The most useful thing about reviews is not the verdict on one EA. It is the pattern across twenty of them. When the same complaints appear under five different products — "great for two months", "wiped on Tuesday", "support blamed my broker" — you are reading the mechanics of the strategy, not the quality of the vendor. Our [blog](/blog/) collects the fuller reviews if you want to compare several of these systems side by side.

## Why does the exit matter more than finding a better entry?

Because you cannot audit an entry rule you cannot see, but you can always control what happens after the trade is open. Grid EAs are usually sold as encrypted files. You cannot read the lot sequence, you cannot confirm whether a losing position is ever left without a stop, and you cannot check whether the entries peek at future bars.

Size is the first half of that control, and it is entirely yours to do. With a grid, size is not one decision — it is the whole risk budget, spread across every level the EA might open. Do this arithmetic yourself, on paper, before you fund anything:

1. **Treat the full grid depth as your stop distance.** If the EA can build six levels of 400 points, your effective stop is 2,000 points from the first entry, not 400.
2. **Enter that distance as the stop, not one level's distance.** This is the step almost everyone skips, and it is why grid accounts look correctly sized right up until they are not.
3. **Check the margin figure, not just the lot size.** Work out what the position will tie up, then multiply it by the number of levels your cap allows.
4. **Accept the number or cut the plan.** If the calculated loss on the full basket is more than 20% of your balance, the honest answer is a smaller starting lot, a shallower cap, or a different system.

The exit is the second half, and it is where the free download on this page helps. The EarnForex Trailing Stop on Profit is a small, open-source EA that manages the winning side of this problem: it leaves your stop where you put it until a position reaches a profit you choose, then trails the stop up behind price so a gain cannot quietly turn back into a loss. It will not rescue a multiplying basket — no exit tool will — but on the honest, fixed-lot system described below it is exactly the discipline the sales page never ships. You should know what it is and what it is not before you rely on it, which is what the download section is for.

## What is the honest alternative to a multiplying grid?

Keep the range-trading idea and delete the sequence. Fixed-lot grids are a real strategy; multiplying grids are a deferral mechanism, and the two are not the same product even when vendor pages describe them with the same words.

An honest range system on gold looks like this. A step of 400 points or more, so the levels land on structure rather than on noise. A fixed 0.01 lots on every level, so the floating loss grows in a straight line instead of a curve. A hard cap of five or six levels, with a per-position stop-loss under each one. An equity stop at 20% to 25% that closes the basket and switches the EA off. A news filter that stands down before inflation prints and central bank decisions. And a starting lot sized so the whole depth stays inside your risk, not just the first level.

That version still loses on trend days. It just loses an amount you chose in advance, on a Tuesday you can plan for.

If the numbers do not work even then, the alternative is to step away from the basket shape entirely. A fixed-stop system with a 50% win rate and a 1:2 reward-to-risk ratio is unglamorous, auditable, and survives a trend because it takes its losses one trade at a time. That is the shape most prop-firm passes are built from, for the obvious reason: the daily loss limit does not care how smooth your equity curve is.

Two useful next reads if you are heading that way: the [drawdown reduction EA breakdown](/drawdown-reduction-ea-free-download-7-powerful-benefits-every-trader-must-know/) for the management tools that cap a basket, and the [gold prop firm robot guide](/gold-prop-firm-robot-free-download-7-powerful-secrets-to-maximize-funded-trading-success/) for how daily loss limits change what a system is allowed to do.

## What exactly do you get in this download?

You get a complete, readable Expert Advisor that watches the positions you hold and trails the stop-loss behind price once a position has reached a profit level you set. Before that threshold it leaves your original stop exactly where you put it.

It is not a trading strategy. It is the profit-protection tool your grid is missing.

| Component | Detail |
|---|---|
| Project | Trailing Stop on Profit by EarnForex |
| Platform | MT4 and MT5, with separate MQL4 and MQL5 source |
| What it does | Trails the stop-loss of an open position once it reaches a set profit |
| Activation | Only after the position passes the profit value you enter |
| Trailing | A configurable distance the stop follows behind price |
| Scope | Applies to the positions you choose, on the symbol you attach it to |
| Licence | Apache-2.0 — free to use, modify and redistribute |
| Cost | Free |

### What it does not do

- **It does not replace your risk decisions.** It moves a stop; it does not choose your size. If you risk 5% per trade, a trailing stop only protects the trades that go right.
- **It does not scan, signal or trade a strategy.** There is no entry signal and no position sizing. It manages the exit on a trade you or another EA opened.
- **It does not cap a grid for you.** It cannot close a multiplying basket before the broker does. It trails one position's stop; it will not rescue twelve open legs.
- **It does not come with a support desk or a performance guarantee.** Two things are promised here: the source is readable, and the licence is Apache-2.0. Nothing is promised about your results, because no honest tool can promise that.
- **It does not make a dangerous system safe.** A 30-level multiplying grid is still a countdown with better paperwork. A trailing stop on a winner does nothing to shrink a losing basket.

Two honest limits worth stating. It is a community project maintained by one publisher, so treat bugs and questions as GitHub issues rather than a service contract. And it is MT4/MT5 desktop software — it does not run in a browser and it will not manage an account you cannot connect.

## How do you test this before real money is on the line?

Demo first, and demo long enough to include a bad week. A grid will look excellent on a quiet demo because a quiet market is the exact condition it is designed to exploit.

- Set the profit trigger and the trailing distance, attach the EA to a demo position you already hold, and watch where the stop sits once the trade passes the threshold.
- Do the sizing arithmetic by hand for your grid's full depth and record the calculated worst-case basket loss before you fund anything.
- Run the grid EA itself on demo for at least a month, and pick a month containing a US inflation print or a non-farm payrolls release. Watch the floating drawdown, not the balance.
- Backtest on real ticks in the MetaTrader Strategy Tester. MQL5's own documentation is blunt that faster testing modes can manufacture a curve the strategy cannot reproduce live — the "Testing Grail" problem. Treat any backtest run on 1-minute OHLC data as marketing.
- Check the worst floating drawdown in currency, then compare it with your balance. Repeat the comparison for the trend week, not the average week.
- Write your stop rule before you start: the equity level at which you close the basket and stop the EA. Then honour it in live trading, because that rule is the only thing between you and Marek's Tuesday.

Loss of capital is a real possibility with every leveraged system, grid or otherwise, and no result on any demo account obliges the live market to repeat it. Test first, then risk money you can genuinely afford to lose.

## What should you do in the next ten minutes?

Download the Trailing Stop on Profit and attach it to the next demo trade you open.

Then, on paper, price the whole basket at its deepest allowed level, with the full depth entered as the stop distance. Write down the projected loss. Finally, ask yourself two questions: whether the trailing stop protects the trades that work, and whether you would accept the basket figure on a random Wednesday.

If the answer is yes, you have a system you understand, and you can test it on demo with real numbers behind it. If the answer is no, you just avoided paying for that discovery in live money — which is the whole point of a tool like this.

The [free EA and indicator library](/free-download-forex-ea-indicator/) has more open-source tools for testing, including risk and management utilities, and the [best MT4 EAs](/best-mt4-ea/) comparison covers fixed-stop alternatives if you decide the grid shape itself is the problem. When you do go live, [choose a broker](/best-forex-brokers/) whose margin rules and gold spread you have measured yourself, and read the [online backtesting tutorial](/forex-tester-online-backtesting-with-eas-tutorial-the-ultimate-step-by-step-guide/) before you trust any curve, including your own.
