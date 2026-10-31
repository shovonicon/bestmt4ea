---
title: "Do Brokers Allow EAs and Scalping? What the Terms Say"
slug: "do-brokers-allow-eas-and-scalping"
description: "Brokers allow EAs and scalping only as far as their contract says. These clauses decide it, and this is how to check them before you open and fund an account."
publishedAt: "2026-10-31T11:00:00.000Z"
updatedAt: "2026-10-31T11:00:00.000Z"
categories:
  - "Brokers & Trading Platforms Reviews"
  - "Risk & Money Management"
categoryPaths:
  - "/category/ai-powered-trading-tools/brokers-trading-platforms/"
  - "/category/risk-money-management/"
tags: []
seo:
  title: "Do Brokers Allow EAs and Scalping? Read the Terms"
  description: "Do brokers allow EAs and scalping? The contract clauses that decide it, how latency rules work, and how to check your broker terms before you fund them."
quickAnswer: "Most brokers permit expert advisors and scalping in general, but the answer for your account sits in the client agreement and the execution policy. Look for wording on latency, minimum holding times, hedging and abusive trading. A broker can allow automated trading and still reject or reverse trades that breach its rules, so read the clauses and ask for the answer in writing before you run a live system."
primaryKeyword: "do brokers allow EAs and scalping"
keyTakeaways:
  - "Permission to run an EA is not the same as permission to run it in any way. The restrictions sit in clauses about latency, holding time and abusive trading."
  - "Scalping is a trading style, not a breach. The risk comes when a broker's wording defines a pattern of trades as abuse and reserves the right to reverse them."
  - "Hedging, minimum lot sizes and order handling change how an EA behaves, so check them before you test."
  - "Brokers can change their terms. Save a dated copy of the version you accepted."
  - "Ask support to confirm your strategy in writing. A verbal yes from a chat window does not bind the broker."
faqs:
  - question: "Can I scalp with an expert advisor?"
    answer: "Often yes, but it depends on the broker's wording. Some agreements allow scalping outright, some restrict it with minimum holding times or latency rules, and some reserve the right to cancel trades they judge to be abusive. Read the clauses for your account type and ask the broker to confirm your strategy in writing."
  - question: "What is latency arbitrage and why do brokers ban it?"
    answer: "Latency arbitrage is trading on a price that a broker has not yet updated, usually by exploiting a delay between the broker's feed and a faster source. Brokers restrict it because it takes value from their pricing. A scalping EA can fall into this category if its entries depend on stale quotes, so check the wording and test the fills."
  - question: "Will a broker close my EA's trades?"
    answer: "A broker may reverse or cancel trades that breach its terms. That is why the clause on abusive trading matters. Keep records of your settings, your test results and the broker's replies, so you can show that your strategy is ordinary trading and not a breach."
  - question: "Do I need to tell my broker I use an EA?"
    answer: "Not always, but some brokers ask. If the agreement or support asks you to declare automated trading, answer honestly and keep the reply. An undeclared system can be a reason to reverse trades later."
  - question: "Where do I find the rules on EAs?"
    answer: "Start with the client agreement and the execution policy, then check any account-type terms and the terms of any bonus you accept. The rules are often split across several documents, so search each one for words such as automated, EA, scalping, latency, hedging and abusive."
sources:
  - label: "XM regulation and legal documents index (client terms are published here)"
    url: "https://www.xm.com/legal-documents"
  - label: "XM execution policy (order handling wording)"
    url: "https://www.xm.com/execution-policy"
  - label: "Our XM review (document-based check of the broker's published pages)"
    url: "https://bestmt4ea.com/xm-review/"
download:
  origin: own
  name: "Broker terms checklist for EA and scalping"
  license: "Free to use and share; provided without warranty"
  fileKey: "posts/broker-terms-checklist.txt"
---

Ask a forum whether a broker allows expert advisors and you will get three answers before lunch. One person says yes without qualification. Another says the broker closed their account for scalping. A third says it depends on the account. All three can be telling the truth, because the answer is written in the broker's contract, not in its advertising, and contracts differ in ways a short reply cannot capture.

This guide is about reading that contract. It does not name a broker as safe or unsafe for scalping, because we cannot make that claim for most brokers without a document check, and a document check is exactly what this guide teaches you to do. If you want to see how the three brokers we have reviewed compare on their own terms, the [best brokers for EA trading](/best-brokers-for-ea-trading/) page sets out the ranking and the reasons for it.

Some links on this page are affiliate links. If you open one and open an account, we may earn a commission at no extra cost to you. It does not change the advice here.

## Why the question is worded wrongly

Most people ask whether a broker allows EAs. That question is too broad to answer. An expert advisor is software that places orders, and the same software can be used in ways a broker welcomes or ways it restricts. A system that opens and closes a trade every few minutes is a different case from one that holds a position for a week, even though both are EAs.

The better question is what the broker's terms say about the way your system trades. That means its speed, its holding time, its order size, its hedging behaviour and its use of price feeds. Once you know the pattern, you can search the agreement for the clauses that govern it.

## What scalping means to a broker

Scalping is a trading style. It means taking small profits over short holding times, sometimes seconds or minutes, and repeating the pattern many times a day. Retail traders scalp manually, and EAs scalp automatically. Nothing about scalping is illegal, and it is not a breach of most brokers' terms by itself.

The risk comes from how a broker classifies certain trading patterns. Brokers worry about two things in particular. The first is latency arbitrage, which means profiting from a price the broker has not yet updated. The second is abusive trading, a broad phrase that can cover anything the broker judges to exploit its pricing or its systems. The wording of these two ideas is where scalping restrictions live, and it differs from one agreement to the next.

When a broker says it may reverse or cancel trades, it is usually describing its power to undo fills it considers abusive. That power is the reason a scalping EA needs its wording checked before it runs live, not after.

## The clauses that decide the answer

Read the client agreement with a short list of words in mind. The words are automated, expert advisor, EA, scalping, latency, minimum holding time, hedging, abusive, manipulation and reversal. Search each document for them. A clause that uses one of these words is worth reading in full, even if its heading sounds harmless.

Automated trading clauses state whether the broker allows software to place orders, and whether there are conditions. Some agreements allow automated trading in general and restrict specific strategies. Others require you to declare automation to support. Note the exact wording and the clause number, because a verbal assurance from support does not change what the document says.

Latency clauses are where most scalping risk sits. They describe what the broker considers an unfair delay, and they may set out a minimum time an order must stay open. If your EA opens and closes trades faster than the minimum, the clause may apply even if you did nothing deliberate to exploit a feed. Write the minimum in your notes, and compare it with the shortest holding time your system produces in its test results.

Minimum holding time clauses are the most direct form of restriction. They say that a position must remain open for a specified period. A scalping EA can break such a clause without any error on screen, which is why you should check the number against your backtest distribution of holding times.

Hedging clauses decide whether you can hold a buy and a sell on the same symbol at the same time. Some EAs depend on hedging, and some break when the broker closes one side. The agreement and the account type page should say which applies. Test your system on demo before you rely on it.

Abusive trading clauses are the broadest and the most important to read carefully. They list examples of behaviour the broker considers abusive and reserve its right to act. Look for the phrase that gives the broker discretion, because a broad discretion means the broker decides what counts, and your evidence of ordinary trading matters more than the wording.

## How the execution policy changes the picture

The client agreement sets the legal rules, and the execution policy describes how orders are handled. The two should agree, but they do not always cover the same ground. The execution policy is where you will find information about requotes, slippage, order rejection and the handling of price feeds during news.

Read the execution policy for any sentence about delayed, rejected or reversed orders during volatile periods. Those sentences tell you what happens to a scalping EA exactly when it most needs a clean fill. A policy that allows the broker to reject orders during news is not a ban, but it changes the cost of trading around scheduled releases, and your EA should be tested for that case.

XM publishes an execution policy page, and it is the right place to look for the wording on how orders are handled. A policy is a statement of intent, though. It does not show measured results, so it cannot tell you the fills your own EA will get. The demo test is the measurement, and the policy is the text to check against it.

## Scalping on demo does not prove a live account is safe

A demo account can show that your EA runs and that its signals fire. It cannot show that the broker will accept the trades on a live account, because the risk of reversal depends on how the broker monitors and classifies trading, and that monitoring is not visible from a demo session.

That is why the terms matter more than the demo. A demo result tells you about your system. The terms tell you how the broker will treat its trades. You need both before you scale.

If the broker's terms are unclear, test the question directly. Open a small live account with the smallest deposit that gives you useful fills, run your EA for a set period, and keep a record of every order. If the broker reverses a trade, read the reason it gives, and compare it with the clause it cites. A reversal with a clear reason is information. A reversal with no reason is a question to put to support in writing.

## Questions to put to the broker in writing

Support replies are informal, and a chat transcript can be lost. Write your question as an email or a support ticket and keep the reply. Ask whether your EA type is allowed on the account you intend to open. Ask for the clause number that covers it. Ask whether the minimum holding time applies, and what it is. Ask whether hedging is allowed. Ask what the broker does if it judges a trade to be abusive, and whether it will tell you before reversing.

Describe your system in plain terms. Say how long a typical trade lasts, how many trades it opens per day, and whether it trades around news. A vague description produces a vague answer, and a vague answer protects the broker, not you.

Keep the question and the reply together with the date. If the broker later changes its position, you can show what you were told when you opened the account.

## Latency arbitrage, explained without jargon

Latency arbitrage is trading on a price that is out of date. Suppose a broker's price for a pair updates a fraction of a second after a faster source has moved. A trader who sees the faster source and places an order at the old price is taking the difference from the broker. Brokers call this unfair because it does not come from a view on the market. It comes from timing.

An EA can fall into this category without intending it. If its entry rules depend on a quote that the broker has not yet refreshed, its fills may look like latency arbitrage to the broker. That is why the wording on latency and the feed the broker uses matter for a scalping system.

To test this on demo, record the price your EA sees when it decides to trade, the price it receives on the fill, and the time difference between the two. A consistent gap in your favour is a pattern worth checking against the broker's latency clause before you go live.

## Hedging, lot sizes and the rules of the account

Hedging deserves its own section because it changes how an EA handles positions. On an account that allows hedging, an EA can hold a buy and a sell at the same time, which some systems rely on for risk control. On an account that does not, the broker may net the two positions, and the EA's logic may fail silently.

Lot sizes matter too. Each account type has a minimum lot, and an EA set to trade a smaller size may be rejected or rounded. Check the minimum lot on the account page and in the agreement, then set your EA's lot sizing to respect it. An EA that sizes its positions in fractions of a lot will not trade on an account whose minimum is larger.

Account type changes the rules as well. A cent account, a standard account and a zero-spread account can carry different hedging rules, different minimum lots and different latency wording. If you switch accounts, reread the terms, because the answer for one account may not apply to another.

## A checklist for reading the terms in one sitting

Set aside one hour before you fund an account. Open the client agreement, the execution policy and the account type terms. Search each for the words listed earlier. For each match, write down the clause number, a one-sentence summary and whether it affects your system. Then answer three questions: is automated trading permitted, is my holding time allowed, and is my hedging behaviour supported.

If any answer is no or unclear, put the question to support in writing and wait for the reply before you deposit. If the answer is yes, save a dated copy of every document, because brokers update their terms and a later version may read differently.

The downloadable broker terms checklist attached to this guide follows the same steps, so you can complete it for each broker you are considering.

## What scalping costs beyond the spread

A scalping EA pays the spread many times a day, so the spread is the first cost to test. But the terms can add costs that do not appear in the spread. A reversed trade may leave you with a result you did not expect, and a rejected order during news can mean a missed exit at a worse price.

Commission matters for the same reason. An account that charges commission per lot can cost far more for a high-frequency system than the spread suggests. Work out the monthly lot volume from your test results and multiply it by the commission rate before you decide.

Swap matters for any system that holds positions over the rollover. Scalping systems usually avoid it, but a system that occasionally holds overnight should be checked against the swap rates for its symbols.

## When a broker reverses or cancels a trade

If a broker reverses or cancels a trade, the first step is to read the notice. It should name the trade, give a reason and cite a clause. If it does not, ask for those details in writing before you accept the result.

The second step is to compare the trade with your records. Find the order, the signal, the fill, the time and the price. A clear record can show that the trade was ordinary and that the EA behaved as designed. A record that shows a consistent pattern of fills at stale prices is a warning you should act on before the next trade.

The third step is to decide whether to continue. If the reversal was a single event with a clear reason, you may be able to keep trading and adjust the system. If the broker reverses trades repeatedly, stop the EA, take the question to support, and consider moving the system to a broker whose terms suit it.

## Who should be most careful

Traders with very short holding times should be the most careful, because their trades sit closest to the latency and holding-time clauses. Traders who use news trading should check the execution policy for news handling, because that is when the broker's rules are most likely to matter. Traders who use bonus accounts should read the bonus terms too, since a bonus can add conditions to the account that the base agreement does not mention.

Traders who copy another system should be careful for a different reason. A system that works on one broker's terms may break on another's, and the original author may not have tested it on your account type. Test the copied system on your own broker before you trust its results.

## Common mistakes and how to avoid them

The first mistake is to assume that because a broker allows EAs in its marketing, it allows every EA. Marketing describes the product, while the clauses describe the limits. Read the limits.

The second mistake is to trust a verbal answer from a chat window. A support agent may give a sensible answer that the agreement does not support. Put the question in writing and keep the reply.

The third mistake is to test only on demo and then deposit without reading the clauses. A demo account cannot show you how the broker will treat live trades, and the clauses are the only evidence of that.

The fourth mistake is to ignore a reversal because it was small. A single reversal can be a sign of a clause you have not understood, and it is cheaper to find that out with a small account than with a large one.

## What this guide does not decide

This guide does not decide whether any particular broker allows your EA. It gives you the method to decide for yourself, using the broker's own documents and written replies. We have not verified every clause of every broker in this guide, and the three brokers we review elsewhere are described only as far as their own published pages allow.

It also does not give legal advice. If a dispute arises, the client agreement and the broker's complaint process govern it, and a regulator's complaint route may apply depending on the entity that holds your account.

## How a scalping EA usually gets flagged

Brokers rarely flag a single trade. They look at patterns over days or weeks: how many trades a system opens, how long they stay open, how often they open at the same instant as a price update, and whether the timing clusters around moments when the feed is most likely to lag. A scalping EA that trades steadily at the same few seconds after each tick can look very different from a discretionary trader, even when both are placing ordinary orders.

That is why a one-off trade rarely causes a problem and a repeated pattern can. If your EA places many orders in the same narrow window, the broker may see a signature it has defined as abusive, even if your intention was simply to trade a sound signal. You cannot change how the broker monitors its clients, but you can understand the pattern your EA produces and check it against the wording.

Write down three numbers from your demo results: the median time a trade stays open, the number of trades per day, and the share of trades that open within a few seconds of a major price move. Compare those figures with the holding-time clause and with any wording about frequency. If the numbers sit close to a limit, the question for support becomes sharper, and the answer will mean more.

## Pairs, sessions and news as risk factors

The terms do not only restrict how an EA trades. They also shape where the risk sits. A system that trades a quiet pair during a quiet session faces different terms in practice from one that trades a volatile pair across the London and New York overlap. The broker's rules on news, on spread widening and on feed delays matter most when the market is moving.

Check which sessions your EA trades and which pairs it uses, then read the execution policy for anything about news, volatility and order handling at those times. A broker that reserves the right to reject or requote during scheduled releases is describing a cost that falls on exactly the trades a scalping system makes. Test your EA through a major release on demo before you rely on it, and record the fills.

If your EA avoids news by design, write that rule down and check that the filter uses the broker's server time. A filter that uses your local clock can leave the EA trading through a release it was meant to avoid.

## A trade journal that protects you later

A journal is the cheapest protection you can give yourself. For every trade the EA opens, record the time on the broker's server, the symbol, the signal that triggered the entry, the requested price, the fill price, the spread at that moment, and the outcome. Keep the same format for every trade, and keep the journal in a folder with the EA settings file and the broker documents you relied on.

The journal is the evidence you will need if a broker questions a trade. A reversal notice names a trade and a clause. A clear journal shows the signal, the timing and the fill, and makes it possible to explain the trade in ordinary terms. Without a journal, you are relying on memory, and memory is weakest exactly when a dispute begins.

Review the journal weekly during the first month of any live test. Look for trades that cluster in time, fills far from the signal price, and spreads that widen at the moment of entry. Those are the patterns that can trigger a broker's review, and finding them yourself is far better than learning about them from a notice.

## Reading the terms as a set of tests

It helps to treat the client agreement as a list of tests your EA must pass. Each clause is a condition. Automated trading is permitted or it is not. Holding time is above the minimum or it is not. Hedging is supported on the account or it is not. Abusive trading is defined in a way your system does or does not match.

Set up a simple table, not in the post but in your own notes, with one row per clause and three columns: what the clause says, what your EA does, and whether it passes. Fill the third column only from your demo results and the written reply from support. An entry that says "probably passes" is not a pass, and it should go back to support as a question.

Once every row is filled, look at the rows marked as unclear. Those are the ones that will cost you the most if you guess. Resolve each one before you fund the account, and if a broker cannot give you a clear answer, treat that as information about the broker.

## What to do if the terms change after you open

Brokers update their agreements, and a clause that suited your EA last year may read differently today. Most brokers publish a notice when they change the terms, and some send an email. Read the notice and compare the new wording with the version you saved when you opened the account.

If the change affects your system, test it on demo before you continue on the live account. If the change restricts your strategy, you have three choices: adjust the EA to fit the new rule, move the system to another broker, or stop trading it. The right choice depends on how much the restriction costs your edge, and that is a number you can only get from testing.

Keep the notice and your comparison with the date. If a dispute later turns on which version of the terms applied, the saved copies decide the question.

## The bottom line

Brokers allow and restrict EAs and scalping through their contracts, and the wording on automation, latency, holding time, hedging and abusive trading decides the answer for your system. Read those clauses, put unclear points to support in writing, keep a journal, and test on demo before a small live account.

For the brokers we have checked in detail, our reviews show how these clauses sit alongside the rest of the terms: read the [RoboForex review](/roboforex-review/), the [Exness review](/exness-review/) and the [XM review](/xm-review/). If your system needs a stable connection through the reading and the testing, the [VPS product page](/product/vps/) explains what a dedicated server does and does not change.

Trading leveraged products carries a high risk of losing money quickly, and an EA does not remove that risk. Only fund an account with money you can afford to lose, and only after you understand the rules that govern the trades it places.
