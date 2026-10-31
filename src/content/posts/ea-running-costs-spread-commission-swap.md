---
title: "What an EA Really Costs to Run for a Year"
slug: "ea-running-costs-spread-commission-swap"
description: "What an EA costs to run for a year: spread, commission, slippage, swap and VPS, worked through step by step, with the break-even pips you must beat."
publishedAt: "2026-10-31T12:00:00.000Z"
updatedAt: "2026-10-31T12:00:00.000Z"
categories:
  - "Brokers & Trading Platforms Reviews"
  - "Risk & Money Management"
categoryPaths:
  - "/category/ai-powered-trading-tools/brokers-trading-platforms/"
  - "/category/risk-money-management/"
tags: []
seo:
  title: "EA Running Costs: A Worked Year of Spreads and Fees"
  description: "What an EA costs to run for a year: spread, commission, slippage, swap and VPS. Worked arithmetic with stated assumptions and the break-even pips to beat."
quickAnswer: "An expert advisor's running cost is the sum of spread, commission, slippage, swap and any server bill, multiplied by the number of trades in a year. For a 0.10 lot system placing 20 trades a month, these lines add up to a few hundred dollars a year before the VPS. Work out the cost per trade in pips, then compare it with the average gross pips your backtest and demo runs actually produced."
primaryKeyword: "ea running costs"
keyTakeaways:
  - "Costs are paid on every trade, so a small per-trade figure becomes a large annual one once the trade count is multiplied in."
  - "The spread you see on the quote screen is not the spread your EA pays on average. Measure the real figure from your own fills."
  - "A cheaper headline spread with a commission can still cost about the same as a wider spread with no commission. Compare the total per trade, not the parts."
  - "Swap only matters for trades held across the broker's rollover time, but it is easy to leave out of an estimate and easy to underestimate on a long-running system."
  - "Break-even is the average gross pips per trade that exactly covers all costs. If your system does not clear that figure on demo, live costs will only make it worse."
faqs:
  - question: "How much does it cost to run an EA for a year?"
    answer: "It depends on trade count, lot size, the spread you actually pay, commission, slippage, swap and the server bill. In the worked example in this guide, a 0.10 lot system placing 240 trades a year pays about $350 in trading costs on a standard account, before a VPS. Your figure will differ, so measure your own fills and use the same method."
  - question: "Is a commission account always cheaper than a spread-only account?"
    answer: "No. A raw spread account with commission can cost about the same as a standard account with a wider spread. The cost depends on the average spread you pay, the commission rate and the lot size. Compare the total cost per trade, not the headline spread on its own."
  - question: "Does swap matter for a scalping EA?"
    answer: "Usually very little, because most scalping trades close before the rollover time. It matters more for swing or trend systems that hold trades overnight. Check how often your EA holds trades past rollover, because a few long trades can change the annual figure."
  - question: "What is break-even pips for an EA?"
    answer: "It is the average gross pips per trade that exactly covers the costs of that trade. Divide the total annual running cost by the number of trades to get the cost per trade, then convert it to pips at your lot size. The EA must produce more than that average gross, before any money is left."
  - question: "Does the VPS count as a running cost?"
    answer: "Yes. A VPS or hosting fee is a fixed annual cost, so it matters more on a small account. Add it to the trading costs to get the full running figure, and compare it with what the EA produces after all costs."
sources:
  - label: "Our Exness review (spread and account structure notes)"
    url: "https://bestmt4ea.com/exness-review/"
  - label: "Our RoboForex review (account costs and EA terms)"
    url: "https://bestmt4ea.com/roboforex-review/"
  - label: "Our broker terms guide (what the contract says about EAs and execution)"
    url: "https://bestmt4ea.com/do-brokers-allow-eas-and-scalping/"
download:
  origin: own
  name: "Annual EA cost worksheet"
  license: "Free to use and share; provided without warranty"
  fileKey: "posts/ea-cost-worksheet.txt"
---

Most people who build an expert advisor look at the strategy first and the costs last. The costs then arrive as a small line on the broker statement, and they are easy to ignore. A spread of 1.2 pips looks trivial on a single trade. Multiply it by a few hundred trades a year, add commission, slippage and a server bill, and the total can decide whether the system is worth running at all.

This guide works through the running cost of one EA for one year, line by line. It uses a single set of assumptions that you can change. Every number is shown, so you can check the arithmetic yourself and then swap in the figures from your own demo or live account. The goal is not to give you a number that applies to everyone. It is to give you a method you can repeat, and a clear view of which inputs move the answer most.

Some links on this page are affiliate links. If you open one and open an account, we may earn a commission at no extra cost to you. The method below does not depend on which broker pays a commission, and the worked example uses the same assumptions for every account type.

## Why the headline spread is the wrong starting point

A broker's marketing usually quotes a typical spread for its most popular pair. That number is measured under normal conditions, often at a particular time of day, and it is a snapshot rather than an average. An EA does not trade under normal conditions only. It trades at the open, around news, during the Asian session when liquidity is thinner, and at whatever moment its signal fires. The spread it actually pays is the average across all of those moments, weighted by how often each one happens.

So the first rule of costing an EA is to measure the cost you actually pay. Export your fills from the terminal or the broker's statement, compare each fill with the quote at the moment the order was sent, and calculate the average gap. That gap, not the advertised figure, belongs in the calculation. If you only have demo data, be careful: demo fills are often more generous than live fills, so treat a demo spread as a lower bound and add a margin.

The second rule is that cost is incurred per trade, not per month. A system that trades twice a day pays its costs about forty-eight times more often than a system that trades once every two weeks, even if each trade is identical. This is why a small per-trade figure can become a large annual one, and why trade count is the input that most people underestimate.

## The five cost lines

A complete running-cost estimate has five trading lines and one fixed line. The trading lines are the spread, the commission, slippage, swap and, less commonly, a fee for deposits or withdrawals that you pay as a routine part of running the account. The fixed line is the server bill, which for most EA users means a virtual private server.

The spread is the difference between the price at which you buy and the price at which you sell. On a round trip, which means one entry and one exit, the EA pays the spread once. It enters at the ask for a buy, which is the higher price, and exits at the bid, which is the lower price. The gap between those two prices is paid to the broker through the quote, not as a separate fee. That is why the spread is a cost even when the broker charges no commission.

Commission is an explicit fee, usually charged per lot per side on raw-spread or ECN-style accounts. It appears as a separate line on the statement, and it is easy to see. Many traders compare accounts by spread alone and forget that the commission is part of the same bill.

Slippage is the difference between the price your EA asked for and the price it got. Positive slippage helps you and negative slippage hurts you. For a costing exercise, use the average negative slippage you observe, and do not net off the occasional lucky fill, because the lucky fills are not something you can plan around.

Swap is the overnight financing charge, or credit, that applies to a position still open when the broker rolls its trades over. It depends on the pair, the direction of the trade and the broker's published rates, which can change. Swap affects only the trades that cross the rollover time, so its effect depends heavily on how long your EA holds positions.

The fixed line is the server bill. An EA that runs on a home computer depends on that computer staying on and connected. Most users move the EA to a VPS, which is a rented machine that stays online. Its monthly fee is a fixed cost, so it weighs more on a small account than on a large one.

## The worked example: the assumptions

The example uses one system with the following profile. It places an average of twenty trades a month, which is 240 trades in a year. Each trade uses a lot size of 0.10. On EUR/USD, one pip is worth about one dollar at that size, so every pip you pay or gain is worth $1.00 on a trade of this size. The system holds its trades for a few hours on average, and about one trade in five stays open across the broker's rollover time.

The standard account in the example has an average spread of 1.2 pips on the entry and exit combined, with no separate commission. Average negative slippage is 0.2 pips per trade. Swap on a trade held over one rollover is a charge of $0.30 for a 0.10 lot position in the direction the EA trades. The VPS costs $12 a month. These are illustrative figures chosen to make the arithmetic easy to follow. They are not a quote from any broker, and your broker's live figures will differ.

You can change any of these inputs and rerun the sums. The method is the same. What matters is that every assumption is written down, so you can see which one is doing the work when the answer changes.

## Step one: the spread cost

The spread cost for one trade is the average spread in pips multiplied by the value of one pip. With 1.2 pips and a pip value of $1.00, the spread cost is $1.20 per round trip.

Across the year, multiply that by the number of trades. Two hundred and forty trades at $1.20 each gives $288.00. That is the largest single line in the example, and it is the one most people underestimate, because it never appears as a bill. It shows up only as the difference between the price the EA wanted and the price it received, which is why it is easy to leave out of a plan.

Notice what happens if the average spread is wider. Every extra 0.1 pip of average spread adds $0.10 per trade at this lot size. Across 240 trades, that is an extra $24.00 a year. A system that moves from an average spread of 1.2 pips to 1.5 pips, for example because it trades more around the London and New York overlap or more often near news, adds $72.00 a year on the same trade count. The spread is not a fixed property of the broker. It is a property of the moments your EA chooses to trade.

## Step two: slippage

Slippage is paid on every trade in the same way as the spread, but it is harder to predict. In the example, average negative slippage is 0.2 pips, which is $0.20 per trade at 0.10 lot. Across 240 trades, that comes to $48.00 a year.

Slippage tends to be larger in fast markets, at the open, and in the moments after a news release. An EA that trades only in quiet conditions may see almost none. An EA that reacts to momentum may see a good deal more, and its slippage can cluster on exactly the days when it most needs to fill cleanly. This is why measuring slippage from live or near-live fills matters more than estimating it. A demo account rarely reproduces the worst fills, so a demo slippage figure is usually an optimistic one.

There is also a subtle point about how slippage interacts with the target. If your EA targets four pips of profit and gives back 0.2 pips to slippage on the way in and 0.2 on the way out, it keeps about 3.6 pips. The strategy has not changed, but the profit it reports will be smaller than the profit its signal implies. Backtests usually assume no slippage at all, and that gap is one of the most common reasons a tested system underperforms live.

## Step three: swap

Swap applies only to positions that remain open across the rollover time. The broker sets that time, and it is usually at the end of the trading day in the broker's server time zone. In the example, one trade in five crosses it, and each such trade pays $0.30 at 0.10 lot.

The average swap cost per trade is therefore one fifth of $0.30, which is $0.06. Across 240 trades, that is $14.40 a year. That is small compared with the spread in this example, but it is not zero, and it can change sign. Some pairs and directions earn swap, and the broker's rates can change without much notice.

Two details are worth checking in the broker's contract. The first is the day on which the rollover charge is tripled to account for weekend settlement, which is usually a Wednesday for spot forex. A trade held across that rollover pays three times the normal charge. The second is whether the broker publishes its swap rates per instrument and whether those rates are updated. If you do not record the rates you were charged, you cannot reconcile your statement against the expected cost later.

Swap is the cost most likely to be ignored by a scalping system and the cost most likely to matter for a swing system. Check how often your EA holds trades past rollover before you decide how much attention swap deserves. A system that never holds overnight can leave swap out of its estimate, but it should record that assumption explicitly, so that a later change in behaviour does not go unnoticed.

## Step four: the standard account total

Add the three trading lines for the standard account. Spread is $288.00, slippage is $48.00 and swap is $14.40. The total is $350.40 a year for 240 trades.

Divide that by the trade count to get the average cost per trade. $350.40 divided by 240 is $1.46 per trade. That figure is the one to carry into the break-even calculation later, because it is the cost the EA must overcome on each trade before it earns anything.

It is worth stating the per-trade figure in pips as well as dollars. At 0.10 lot on EUR/USD, one dollar is one pip, so $1.46 is 1.46 pips. If you change the lot size, the dollar figure changes but the pip figure does not, which is why it is the more portable measure. A system that costs 1.46 pips per trade at 0.10 lot costs 1.46 pips per trade at 0.20 lot too, but each pip is now worth $2.00, so the dollar cost doubles.

## Step five: the raw spread and commission comparison

Many brokers offer a second account structure with a lower spread and an explicit commission. This is where comparison most often goes wrong, so it is worth working through carefully.

In the example, a raw spread account has an average spread of 0.3 pips and a commission of $3.50 per lot per side. At 0.10 lot, that commission is $0.35 per side, which is $0.70 for the round trip. The spread cost on this account is $0.30 per trade, so the spread plus commission is $1.00 per trade. That is $0.20 cheaper than the standard account's spread alone, before slippage and swap.

Add the same slippage and swap as before, which are $0.20 and $0.06 per trade. The raw account's total per trade is $1.26. Across 240 trades, that is $302.40 a year. The difference from the standard account is $48.00 a year in this example, which is real, but it is far smaller than the headline difference in spread would suggest.

The comparison depends on lot size. Commission is charged per lot, so it grows with size, while the spread cost also grows with size. At a larger lot size, the commission element of a raw account rises in proportion, and the gap between the two account types can shrink or reverse. A trader who runs a larger position size needs to repeat this comparison at that size before choosing an account.

The lesson is not that one structure is always better. It is that the comparison has to be made on the total cost per trade, at the lot size you actually trade, using the average spread you actually measure. A broker that looks cheaper on the quote screen can cost more on the statement, and the statement is what the EA pays.

## Step six: the fixed cost of the server

The VPS is a fixed cost, and at $12 a month it adds $144 a year. It does not depend on how many trades the EA places. A system that trades a little will pay the same server bill as one that trades a lot, so the server takes a larger share of the total for a low-activity system.

Whether a VPS is worth paying for depends on what you lose without it. A home computer that sleeps, loses its connection or restarts during an update will leave the EA idle at the moments it is needed, and missed trades are a cost too, although they do not appear on the statement. If you run the EA on a machine you do not control, a VPS is usually the more reliable option. Our [VPS guide](/product/vps/) covers the latency and uptime questions in more detail, and we explain how to choose a specification that matches the EA's needs rather than paying for the largest plan.

When you compare account structures, the figures to measure are the average spread on your own fills and the commission on your statement. [Fusion Markets](affiliate:fusion-markets) publishes its account structure in its own terms, so you can check those figures against the method in this guide. Measure the spread on your own fills rather than relying on any published average, and record the date. The figure you measure is the one that belongs in the calculation.

## Step seven: the full annual running cost

Now bring the lines together for the standard account. Trading costs are $350.40. The VPS is $144.00. The total running cost is $494.40 a year.

That total is larger than the trading costs alone, and it is the figure that matters when you decide whether the EA is worth running. On a $1,000 account, the running cost is 49.4 per cent of the starting balance. That is not a forecast of what will happen to your account, and it does not account for any gross profit the EA produces. It is a measure of how much of the starting capital the cost structure consumes before the strategy has done anything at all.

This is why small accounts are harder to run profitably. A fixed cost of $144 a year is a small percentage of a $50,000 account, but it is nearly half of a $300 account. The trading costs also scale with lot size, so a small account that trades a fixed number of lots has the same problem in a different form. Before you fund an account, check whether the running cost is a reasonable share of the capital you are prepared to commit.

## Step eight: the break-even pips

The break-even figure is the average gross pips per trade that exactly covers the running cost. It answers a single question: how much must the EA earn on each trade, before costs, for the annual result to reach zero?

Take the full running cost of $494.40 and divide it by 240 trades. That is $2.06 per trade. At 0.10 lot, $2.06 is 2.06 pips. So the EA must produce an average gross of more than 2.06 pips per trade to make any money after costs.

Now test that against a realistic picture of the system. Suppose a demo run shows an average gross of 4 pips per trade. Across 240 trades that is $960 of gross result, less the $494.40 running cost, which leaves $465.60 a year. That figure depends entirely on the 4-pip gross being representative of live trading, and on the trade count and cost assumptions holding. Change the gross to 2 pips and the result becomes a loss of $14.40 a year, because 2 pips per trade across 240 trades is $480, which is less than the $494.40 cost.

The gap between those two cases is the important lesson. A system whose gross edge is close to the break-even figure has very little room for error. A small rise in spread, a few more slippage events, or a slightly lower win rate can take it from profit to loss. A system with a gross edge well above break-even has room to absorb those shocks. Before running an EA, find out which side of break-even your demo result sits, and by how much.

Be careful about what you do with the gross figure. Demo gross results are often optimistic, because demo fills are better than live fills and because a short test may not contain a difficult market regime. Use the demo gross as a ceiling, not a forecast, and ask how much of it survives when you add the live cost figures.

## Step nine: what moves the answer

Once the method is in place, you can ask which input matters most. For this example, the answer is usually trade count, then spread, then lot size, then the server bill.

Trade count multiplies every per-trade cost. Doubling the number of trades doubles the trading costs, but it does not double the VPS. A system that doubles its trade frequency without doubling its gross edge per trade will see its break-even figure stay the same while its annual cost grows. That is why a higher trade count is not automatically better, and why a strategy change that adds trades should be costed again before it goes live.

Spread is the input most affected by market conditions. Its average depends on when the EA trades. An EA that avoids the thinnest sessions and the most volatile minutes will pay a lower average spread than one that trades around the clock. If you cannot restrict the hours, measure the spread by hour and see where the cost concentrates.

Lot size scales the dollar figure but not the pip figure. Doubling the lot doubles the dollar cost per trade and doubles the dollar gross per trade, so the pip break-even is unchanged. What changes is the share of the account at risk and the share of the account consumed by the fixed VPS bill. A larger lot size makes fixed costs look smaller in percentage terms, but it also makes every pip of slippage matter more in dollars.

The server bill matters most on small accounts and for low-frequency systems. A cheap VPS that is unreliable can cost more than an expensive one that is stable, because a missed trade is an unrecorded loss of opportunity. Choose the server for uptime first and price second.

## Mistakes that make cost estimates useless

Most cost estimates go wrong in the same few ways. The first is using the advertised spread instead of the measured spread. The second is ignoring slippage on the grounds that the EA uses limit orders, when in practice many fills are market fills or partial fills. The third is leaving out swap entirely, which is harmless for a scalper that never holds overnight but is wrong for any system that does.

The fourth mistake is comparing account types without normalising the lot size and the trade count. A comparison made at 0.01 lot and then applied to a 0.50 lot system will give the wrong answer, because commission and spread both scale with size. The fifth mistake is treating the server bill as a footnote. For a small account it is one of the largest lines in the whole estimate.

The sixth mistake is updating the estimate once and never again. Spreads, commissions and swap rates change. An EA that trades more often after a change in its code, or in a different market regime, has a different cost profile from the one you first measured. Re-run the calculation at least once a quarter, and every time the EA's trade count or hold time changes noticeably.

## How to run the same calculation on your own EA

The method is simple, and you can do it with a notebook and a calculator. Start by counting the trades your EA placed over a recent period, and divide by the number of months to get a monthly average. Multiply that by twelve to get the annual trade count. Use demo or live data, and say which in your notes.

Next, measure the average spread from your fills. For each trade, compare the price you received with the quote at the moment the order was sent, and record the gap. Average the figures, and convert them to pips for your pair. Do the same for slippage, recording only the adverse fills in the average, because those are the costs you pay. Note the lot size and the pip value at that size.

Then work out swap. Count the trades held across the rollover time, and multiply each by the swap charge per lot for its direction and size, taking account of the tripled Wednesday charge. Divide by the total trade count to get the average per trade. Record the rates you used and the date you used them.

Add the per-trade lines together to get the cost per trade in pips. Multiply by the annual trade count to get the trading cost. Add the annual server bill. Divide the total by the trade count to get the break-even pips per trade. Then compare that figure with the average gross pips your demo or live results show.

The worksheet offered with this guide sets out these steps as a form you can fill in. It does the same arithmetic as this article, so you can check your own numbers against the worked example before you trust them.

## Where to go next on this site

If you are comparing brokers, the costs above are the easiest way to separate them on paper. Our [Exness review](/exness-review/) covers the account structures and the entity split, and our [RoboForex review](/roboforex-review/) covers the account costs and the EA terms in more detail. Our [XM review](/xm-review/) sets out the accounts and a thirty-day EA test plan that you can use to measure your own costs before funding.

Before you choose an account, read the contract as well as the price list. Our [broker terms guide](/do-brokers-allow-eas-and-scalping/) explains which clauses decide whether your EA's trading pattern is allowed, and how latency and holding-time rules can change what the broker does with the trades you place. A cheap account that restricts your EA is not cheap.

If the running cost makes you reconsider the system, the next step is usually to reduce the number of trades or the spread you pay, not to add more trades to recover the cost. Our [pip calculator](/tools/pip-calculator/) gives the pip value for your pair and lot size, which you need for every line above, and our [regulation check](/broker-regulation-client-funds-check/) explains how to confirm who holds your money before you fund the account.

## Get the worksheet

The worksheet is a plain text form, not a spreadsheet, so it opens in any editor and does not need a macro. It lists each input, the formula that combines it, and space to record your measured figures and the date you measured them. It follows the method in this article, and it is written so you can complete it once for each account and each EA version.

Keep your completed copy with your trade records, your statements and the broker terms that applied when you measured the costs. Brokers change their terms, so keep a dated copy of each version you use.

## The bottom line

An EA's running cost is not a single number. It is the sum of the spread you actually pay, the commission on your account type, the slippage on your fills, the swap on the trades that cross rollover and the fixed bill for the server, all multiplied by the number of trades in a year. The break-even figure turns that sum into a test: the EA must produce more gross pips per trade than the costs consume, or the result is a loss.

Use measured figures, not advertised ones. Compare accounts by their total cost per trade at the lot size you trade. Check whether the fixed server bill is a reasonable share of the capital you are putting at risk. And treat any gross edge from a demo run as a ceiling to test against live costs, not as a forecast. Trading carries a real risk of loss, and a system that looks profitable before costs can lose money once they are included.

Model used: claude-haiku-5-5
