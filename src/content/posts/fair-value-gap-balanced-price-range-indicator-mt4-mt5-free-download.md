---
wpId: 135110
title: "FVG & BPR Indicator MT4/MT5: Free Download Guide"
slug: "fair-value-gap-balanced-price-range-indicator-mt4-mt5-free-download"
description: "A fair value gap and balanced price range indicator marks three-candle imbalances and overlap zones on MT4 or MT5. See what it shows and how to test it."
publishedAt: "2026-02-20T05:04:28.000Z"
updatedAt: 2026-10-22
seo: 
  title: "FVG & BPR Indicator MT4/MT5: Free Download Guide 2026"
  description: "A fair value gap and balanced price range indicator marks three-candle imbalances and overlap zones on MT4 or MT5. See what it shows and how to test it."
  canonical: "https://bestmt4ea.com/fair-value-gap-balanced-price-range-indicator-mt4-mt5-free-download/"
  ogImage: "https://bestmt4ea.com/wp-content/uploads/2026/07/post_135110_featured.webp"
sourceUrl: "https://bestmt4ea.com/fair-value-gap-balanced-price-range-indicator-mt4-mt5-free-download/"
categories: 
  - "Free Forex Indicator"
categoryPaths: 
  - "/category/free-forex-indicator/"
tags: []
draft: false
quickAnswer: "A fair value gap (FVG) indicator marks three-candle price imbalances, and a balanced price range (BPR) marks the area where opposing gaps overlap. Both are drawn from past candles, so they show where price moved fast, not where it will turn. Test how often zones are respected and how often they fail on a demo account first."
keyTakeaways:
  - "A fair value gap is a three-candle imbalance where the first and third candles leave an empty price range between them."
  - "A balanced price range is the overlap of a bullish and a bearish gap, so it appears only when two gaps share price."
  - "Gap zones are areas to watch for reaction, not assured fill levels, and many gaps are never revisited."
  - "Low-liquidity sessions and ranging markets produce more zones that fail, so filter by session and trend before acting."
  - "Log every zone on demo, including the ones price ignored, before you size any live position."
faqs:
  - question: "What exactly is a fair value gap?"
    answer: "A fair value gap, often shortened to FVG, is a gap between the wick of the first candle and the wick of the third candle in a three-candle sequence. In a bullish gap the first candle's high sits below the third candle's low. In a bearish gap the reverse is true. The empty range between them is the imbalance."
  - question: "What does a balanced price range show?"
    answer: "A balanced price range is the overlapping area where a bullish gap and a bearish gap share the same price. It marks a zone where the market has traded in both directions. Some traders treat it as an area of indecision, while others watch it as a possible breakout zone. Its value depends on testing."
  - question: "Does an FVG indicator repaint?"
    answer: "Most well-built versions mark a gap only after the third candle has closed, which avoids changing the zone during formation. Some versions still redraw or extend zones in ways that can confuse a backtest. Watch the indicator on demo across several sessions and note any zone that changes after it appears."
  - question: "Is an FVG the same as a support or resistance level?"
    answer: "No. Support and resistance are levels where price has reacted repeatedly. A fair value gap is a zone created by a fast move. It may act as a reaction area, but it has no history of reactions until price tests it, which is why testing matters more than the label."
  - question: "Which markets and timeframes do traders test with gap indicators?"
    answer: "Gap indicators are used on forex pairs, gold and indices, among others, and on timeframes from short intraday charts to daily charts. Behaviour differs by symbol and session, so test each market and timeframe separately rather than assuming one result carries over."
  - question: "Can I use an FVG indicator on its own?"
    answer: "You can, but most traders combine it with a view on trend and a clear rule for confirmation. A zone on its own tells you where price moved fast, not whether the move will continue. Adding a second filter and recording the results usually gives a clearer picture than the zone alone."
sources:
  - label: "MetaQuotes: MetaTrader 4 trading platform"
    url: "https://www.metatrader4.com/"
  - label: "MQL5 community: MQL4 and MQL5 language documentation"
    url: "https://www.mql5.com/en/docs"
  - label: "Babypips: forex education"
    url: "https://www.babypips.com/learn"
primaryKeyword: "fair value gap indicator MT4"
download:
  origin: "shared"
  license: "Unverified third-party bundle (2,000+ EAs and indicators)"
  version: "latest"
  fileSize: "about 577 MB in three zip parts"
  externalUrl: "https://drive.google.com/drive/folders/1w99fcnzD_vfU_tSlc4Pz8zOEX81t5-_l?usp=sharing"
  updatedAt: 2026-10-22
---

If you have searched for a fair value gap and balanced price range indicator for MT4 or MT5, you have probably seen the same claims many times. Gaps are said to be footprints of large orders. Balanced ranges are said to be zones where the market rebalances before a breakout. Charts full of coloured rectangles are presented as a map of where price must return. Some of that language is theory, and some of it is marketing. This guide separates the two, so you can decide what a gap indicator is worth to you.

The honest starting point is simple. A fair value gap is a visible empty range created by a fast move. A balanced price range is the overlap of two such ranges. An indicator finds these shapes automatically and draws them on the chart. That is the entire technical job. Everything after that, including whether price respects a zone, depends on the market and on your rules.

This guide explains what the two concepts mean, how the indicator usually finds them, where the zones tend to fail and how to test a gap indicator on a demo account before you use it with real money.

## Why do fair value gaps look so convincing on a chart?

A fair value gap is easy to see. After a fast move, the chart often shows an empty space between two candles, where price did not trade on the way up or down. The eye reads that empty space as unfinished business, and it is natural to expect price to return and fill it.

That expectation is where the trouble starts. A gap is a fact about past price. It shows that the market moved quickly through a range. It does not show that the market must return to that range, and it does not show how often price returns when it has the chance. Many gaps are never revisited. Some are revisited and then ignored. A smaller number are revisited and become useful reaction areas, and only testing can show which group your symbol and timeframe fall into.

**Illustrative composite, not a real person:** A trader we will call Priya used a gap indicator on XAUUSD M15 and set a limit order inside every bullish gap that appeared after a London session breakout. For the first week, the zones looked excellent, and she counted the touches she remembered. When she reviewed her chart history at the end of the second week, she found that roughly half of the gaps she traded had never been revisited before a major move in the opposite direction. Her memory had kept the times price came back and dropped the times it did not. She began writing every gap into a journal, including the ones she did not trade, and her decisions became much more careful.

## What is a fair value gap, step by step?

A fair value gap is usually defined by three consecutive candles. The first candle comes before the fast move, the second candle is the impulse that drives price forward, and the third candle continues the move. A gap exists when the range of the first candle and the range of the third candle do not overlap.

In a bullish fair value gap, the high of the first candle sits below the low of the third candle. The empty range between those two prices is the gap. In a bearish fair value gap, the low of the first candle sits above the high of the third candle, and the empty range runs the other way.

The middle candle is the one that does the work. It is the strongest candle in the sequence, and it is the reason the gap exists. A small middle candle usually does not create a meaningful imbalance, so many traders look for a clear impulse when they inspect a gap. That is a visual preference, not a law, and it is something you can test.

It is also worth noticing that a gap can be partly filled, fully filled or never touched. A zone that is partly filled may still behave differently from one that is untouched. Your indicator should show you the status of each zone, and your journal should record it.

## What is a balanced price range, step by step?

A balanced price range, often shortened to BPR, is the area where two opposing fair value gaps overlap. Imagine a bullish gap at one price range and a bearish gap that overlaps it. The shared area is the balanced price range. It represents a price zone where the market has traded in both directions, which is why some traders describe it as balanced.

The concept has a clear geometric definition, which makes it easier to test. You do not have to interpret it as a secret signal. You only have to ask whether the overlap appeared, where it sits and what price did the next time it reached the area.

Some traders think of a balanced price range as a zone of indecision, where price may pause before continuing. Others think of it as an area where a breakout is more likely to be decisive. Both readings are possible, and neither is proven by the definition alone. The chart history and your own journal are the only way to decide which reading fits your market.

## How does an FVG and BPR indicator usually work on MT4 and MT5?

On MetaTrader 4 and MetaTrader 5, a custom indicator reads the candle history of the attached chart. It checks each set of three candles for a gap, using the high and low prices. When it finds a gap, it draws a rectangle from the gap's upper edge to its lower edge. It then checks each new rectangle against the others to find overlaps, and it draws a separate rectangle for any overlapping area it identifies as a balanced price range.

Some versions also remove a zone once price has fully filled it, others keep it on the chart until you change the settings, and some extend the rectangle to the right so you can see where the zone sits relative to current price. Those choices matter for testing, because a zone that disappears after being filled is harder to review than one that stays on the chart with its history.

The indicator does not decide which zone is important. It only draws the shapes it has been coded to find. The importance of a zone comes from your rules and your testing, and the indicator is only the tool that shows you the shapes.

For background on how custom indicators read price data, the official language references are useful. You can find the MQL4 and MQL5 documentation at the [MQL5 community documentation](https://www.mql5.com/en/docs), and the platform overview is available from the [MetaTrader 4 site](https://www.metatrader4.com/). Neither source endorses a specific gap indicator, but both explain how the code runs.

## When do gap zones tend to fail?

Gap zones fail in predictable situations, and it is worth learning those situations before you trade any of them.

The first is low liquidity. Thin sessions and quiet hours can produce sharp candles that look like gaps but reflect little real participation. The zone may be drawn correctly, yet it carries little information. Many traders avoid gaps formed in very quiet conditions, or they test those conditions separately.

The second is ranging markets. In a sideways market, gaps appear often and touch each other frequently, which produces many overlapping zones with little direction. A balanced price range inside a range is likely to be noise, not a breakout area.

The third is news. A major release can produce large candles and gaps that are shaped by the event rather than by normal trading. Some gaps created by news are filled quickly, and some are never revisited. Check the economic calendar before a session and decide in advance whether you will trade around events.

The fourth is the trend. A bullish gap inside a strong downtrend may be a short-lived pause rather than a reaction area. Many traders check the higher timeframe direction before accepting a gap as a setup.

The fifth is the zone's age and history. An old zone that price has tested several times may behave differently from a fresh one. That is a question for your journal, not for the indicator.

## What does a gap indicator's output look like in practice?

When you attach a gap indicator to a chart, you will usually see a set of coloured rectangles. Bullish and bearish zones are often shown in different colours, and balanced areas may be drawn in a third shade or with a different border. The chart can look busy within a few days, especially on lower timeframes.

The most useful habit is to read the chart in a fixed order. Start with the higher timeframe trend. Next, look at the zones that sit close to current price. Then check whether any zone has already been tested. Finally, decide whether the zone meets your confirmation rule before you consider an entry. Reading in the same order every time keeps you from jumping to the nearest rectangle.

Keep the display simple while you test. Too many colours and labels make it difficult to review your journal afterwards. Choose one colour scheme, record it, and avoid changing it mid-test.

## How should you confirm a gap zone before acting?

A gap zone is a candidate, not an instruction. Before you act, decide what would make you more confident. Traders use many confirmations, and the most useful ones are simple.

Trend is the first. If the higher timeframe is moving against the zone, a reaction at the gap may be a pause. Some traders only consider gaps that agree with the higher timeframe direction, which reduces the number of setups but usually makes the review easier.

Structure is the second. A break of a recent swing high or low in the direction of the zone can show that the market is shifting. Many traders wait for a structure break after a zone is tested before entering, rather than entering on the first touch.

Session timing is the third. Some traders trade gaps only during specific sessions when liquidity is higher. Test your own sessions and record the results separately, because the answer can differ by symbol and by the hours you are awake.

Confluence is the fourth. If a gap overlaps a clear support or resistance level, a prior swing or a round number, the zone may be more meaningful. Confluence is a reason to look more closely, not a guarantee.

The [top ranking](/top-ranking/) page groups MT4 tools by category, which can help you find other confirmation tools to test alongside a gap indicator. Test any combination on demo before using it live.

Whatever confirmations you choose, write them down before you look at the next zone. If you decide after the trade which confirmation mattered, the journal stops telling you anything useful.

## Gold and indices: do the same rules apply?

Gold and indices move differently from major forex pairs. XAUUSD can make large spikes around news and during the transitions between sessions, and indices can gap at the open. Those features can create many more gaps, and the zones they produce may behave differently from the ones on a quieter pair.

If you trade gold, the [gold indicators guide](/top-10-best-mt4-indicators-for-gold-xauusd-powerful-tools-for-accurate-trading/) covers tools built for that symbol and explains why the same ratios and zones can need different stops. Test the gap indicator on the symbol you trade, rather than assuming a result from another market will carry over.

Pay particular attention to stop placement. A zone on gold or an index can be wide, and a stop placed beyond it may be far from entry. Calculate your position size from that distance, not from the size you would like to trade.

## What are the most common mistakes with gap indicators?

The first mistake is trading every gap. A busy chart can show dozens of zones in a week, and most of them will not be worth your attention. Decide in advance which zones you will consider, and ignore the rest.

The second mistake is placing orders at the first touch without confirmation. A zone can be touched and then run through, so entering on touch alone exposes you to every failed reaction. Many traders wait for a rejection or a structure break before acting.

The third mistake is ignoring the trend. A gap inside a strong move against your bias can carry you into a loss quickly. Check the higher timeframe before you take a zone.

The fourth mistake is confusing a zone with a guarantee. A gap or a balanced range is a reference area. It has no authority over where price goes next, and it does not remove the need for a stop.

The fifth mistake is changing settings after you see the results. If you adjust the sensitivity or the display until the zones look better in hindsight, the test is no longer honest. Fix the settings before the test begins and keep them the same.

## How do you test a gap indicator on demo?

A demo test should be simple, honest and long enough to show real behaviour. Choose one symbol, one timeframe and one indicator version. Run the test for at least several weeks, keep a written journal and record every zone the indicator draws, whether or not you trade it.

For each zone, record the time it formed, the upper and lower edges, whether it was bullish or bearish, whether it was a balanced area and whether price tested it. If price did test it, note the reaction and whether the zone was filled. Also record the confirmation rule you used and the result of any trade.

At the end of the test, count the zones, the tests, the setups and the results. Calculate the maximum drawdown on the demo account, which is the largest fall from a peak balance to a later low. Then ask whether you could have followed the plan through that drawdown, and whether the zones behaved consistently enough to trust.

Pay attention to the zones you did not trade. If many of them were respected and you skipped them, your confirmation rule may be too strict. If many of the zones you traded failed, the rule may be too loose or the market may not suit gap trading. Either conclusion is useful, and both should change what you do next.

## What does a gap indicator not do?

A gap indicator does not predict direction. It does not know the news calendar, your broker's spread, your account size or your risk limits. It does not manage positions or move stops. It does not decide whether a balanced price range will lead to a breakout or to a pause. It only draws the shapes that match its rules.

It also does not carry a verified performance figure that you can rely on. Any win rate or return a seller quotes for a free gap indicator should be checked on your own data. Some indicators are carefully documented and transparent about how they work. Others offer little explanation, and their results cannot be reproduced without guesswork.

Finally, a gap indicator is not a complete trading plan. It is one input into a plan that also needs trend analysis, position sizing and a rule for when to stop trading. A chart with clean rectangles can still lose money if those other parts are missing.

## What is the offer, and what are its limits?

This guide describes the typical components of a gap indicator for MT4 and MT5. Versions differ, so the table below is a checklist for the version you have. It is not a promise about any specific file.

| Component | What it typically does | What to verify on demo |
|---|---|---|
| Fair value gap detection | Finds three-candle gaps and draws rectangles | Each gap matches the three candles you can see on the chart |
| Balanced price range | Draws the overlap of a bullish and a bearish gap | Overlap is correct and updates only when the gaps change |
| Zone status | Some versions show whether a zone has been tested or filled | Status changes match what happened on the chart |
| Colour and display settings | Lets you change colours, borders and extension | Display changes do not alter the zones themselves |
| Multi-timeframe use | Attaches to several chart timeframes | Behaviour is tested on the timeframe you plan to trade |
| Alerts | Some versions offer notifications when a zone is reached | Alerts fire on the rule you intend, and only once per event |

The offer does not include a fill of any gap, a reaction at any balanced range or a verified win rate. It does not replace testing, and it does not make a zone more reliable than your journal shows it to be.

On licence and source, read the terms that come with the file or the page where you obtained it. Free versions vary widely. Some are carefully documented, while others are copied or altered without explanation. A version with clear settings and transparent logic is a better starting point than an unlabelled one.

Be careful with downloads from unknown sources. Scan any file before you run it, and keep a record of the version you tested. An indicator is code, and code can carry risks beyond its trading logic.

## Which market conditions suit gap zones?

Gap zones tend to be easiest to read on liquid symbols with clear swings and regular sessions. In those conditions, a gap is more likely to reflect real movement, and a balanced range is more likely to mark a meaningful pause.

They are harder to use in thin markets, during quiet hours, in long sideways ranges and around major news. Those conditions produce more overlapping zones and more failures. You can still trade them, but you should test them separately and record the results.

Use your journal to find the conditions that suit your symbol. If most of your losing trades come from one session or one kind of market, write that down as a rule to avoid or to test more carefully.

## How do you build a routine around gap zones?

A routine keeps the process steady when the chart is busy. Start with a fixed review time, such as before the session opens or after the daily close. At that time, check the higher timeframe trend, note the zones close to price and record any that were tested since the last review.

Next, write your entry and stop rules in plain language before you look for a trade. For example, you might decide to consider a long only when price returns to a bullish zone that agrees with the higher timeframe trend, and only after a structure break on the lower timeframe. The rule should be short enough to follow without a long debate.

At the end of the day, record the outcome and what you would change. Change one rule at a time, so you can see which change mattered. A routine is not about trading more zones. It is about trading the zones you understand, with a size you can accept.

Review the journal every week. Look at the zones you traded, the ones you skipped and any that behaved unexpectedly. Ask whether your rules helped, whether they were too strict or whether the market simply did not suit the method that week.

## Illustrative composite: a balanced range that did not break out

**Illustrative composite, not a real person:** A trader we will call Tomas tested a balanced price range on EURUSD H1 for a month. He expected a breakout whenever price left the overlapping area, and he entered on the first break. For the first two weeks, several of these breaks ran, and he felt confirmed. Then he began logging the zones he had skipped, and he found that many breakouts he had ignored had reversed back inside the range within a few candles. He changed his rule to require a close beyond the range and a retest before entering. Fewer trades followed, and he wrote down that the retest rule was his own choice, not something the indicator told him.

## Is a fair value gap indicator worth testing?

Yes, if you treat it as a visual research tool. It can make three-candle gaps and overlapping zones easy to see, and it can save you the time of drawing them by hand. For a trader who wants to study price imbalances, that is a real benefit.

It is not worth testing if you expect it to tell you where price must go. A zone describes past movement, and the market does not have to respect it. A trader who treats every zone as a magnet for price will find that many zones are ignored, and that the losses come from the zones that were not ignored in the expected way.

Set a short trial with clear rules and a complete journal. At the end, decide whether the zones were consistent enough to be useful, not whether the trades made money in a short run. A tool that makes the chart easier to review is useful even if it does not produce a single profitable pattern.

## What is the honest bottom line on FVG and BPR indicators?

A fair value gap and balanced price range indicator for MT4 or MT5 draws three-candle imbalances and overlap zones. Its shapes are easy to read, and its logic can be checked against the candles you can see. Those are genuine benefits for a trader who wants to study price structure.

It does not guarantee that gaps will fill, that balanced ranges will break or that any zone will hold. Any performance figure attached to a gap indicator should be treated as a claim to verify on your own data. The only evidence that matters for your account is the record you build on demo.

So test it properly. Record every zone, track how often price tests and respects them, measure drawdown honestly and keep your size small until you know how the tool behaves. That is slower than installing a file and trading the rectangles, but it is the only way to learn what the zones actually do.

## Your next step is a demo journal, not a live account

Choose one gap indicator version you have checked, attach it to one demo chart and one timeframe, and commit to several weeks of logging. Write your confirmation rules, your risk per trade and your review routine before the first zone appears.

When the test ends, compare the journal with the rules you wrote at the start. If the zones behaved consistently and your results stayed within a drawdown you could accept, the tool may deserve a place in your routine as a visual aid. If the zones failed often or your results depended on which zones you remembered, drop it and rethink the approach.

If you want to compare other tools while you test, the [shop](/shop/) groups products by how they are used, and the [top ranking](/top-ranking/) page gives an overview of the wider field. Use them as lists to test, not as verdicts. Start on demo, keep your size small and let your own journal decide what stays on the chart.
