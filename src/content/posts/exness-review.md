---
title: "Exness Review 2026: Regulation, Entities and Running an EA"
slug: "exness-review"
description: "EA-focused Exness review: which entity serves retail clients, what FCA and CySEC cover, account types, and the execution tests to run before you fund."
publishedAt: "2026-10-30T09:30:00.000Z"
updatedAt: "2026-10-30T09:30:00.000Z"
categories:
  - "Brokers & Trading Platforms Reviews"
  - "Forex Risk & Money Management"
categoryPaths:
  - "/category/ai-powered-trading-tools/brokers-trading-platforms/"
  - "/category/risk-money-management/"
tags: []
seo:
  title: "Exness Review 2026: Which Entity, Which Account, Which Risks"
  description: "Exness reviewed for EA traders: the retail entity behind the logo, what FCA and CySEC actually cover here, account types, and the execution tests that matter."
quickAnswer: "Exness is a multi-entity broker: the FCA and CySEC licensed companies state they do not serve retail clients, so a retail account sits with an offshore entity such as Exness (SC) Ltd in Seychelles. MT4 and MT5 run expert advisors natively, but check the entity in your client agreement before funding — it decides the regulator, the leverage and the dispute route."
primaryKeyword: "Exness review"
keyTakeaways:
  - "The FCA (730729) and CySEC (178/12) entities are Exness (UK) Ltd and Exness (Cy) Ltd, and Exness states neither offers trading services to retail clients."
  - "Retail accounts are opened with offshore entities — Exness (SC) Ltd in Seychelles (FSA SD025), Exness (VG) Ltd in the BVI (SIBA/L/20/1133), Exness B.V. in Curaçao, Forexite Ltd in Belize, and others by region."
  - "For an EA trader the entity decides the leverage cap, the swap terms, the complaint route and the compensation question, so confirm it before funding."
  - "MT4 and MT5 are supported and run expert advisors natively; test the spread your system actually pays before scaling, because published pricing sits behind a login."
  - "Treat any 'FCA/CySEC regulated' badge on a comparison site with care: on this broker those licences apply to non-retail entities."
faqs:
  - question: "Is Exness regulated?"
    answer: "Yes, but the entity matters. Exness operates under multiple licences: FSA Seychelles (Exness SC Ltd, SD025), FSC British Virgin Islands (Exness VG Ltd, SIBA/L/20/1133), CBCS Curaçao (Exness B.V., 0003LSI), FSC Belize (Forexite Ltd, 9110312), FSCA South Africa (Exness ZA, FSP 51024), CMA Kenya (162), JSC Jordan, and FCA and CySEC licences held by Exness (UK) Ltd (730729) and Exness (Cy) Ltd (178/12). Exness states that the UK and Cyprus entities do not offer trading services to retail clients."
  - question: "Does Exness have FCA regulation?"
    answer: "Exness (UK) Ltd is authorised by the Financial Conduct Authority under register number 730729. On Exness's own regulation page, however, the company states that Exness (UK) Ltd does not offer services to retail clients. If you are a retail trader, the FCA licence is not the one your account sits under, and you should not treat it as the protection behind your deposit."
  - question: "Which Exness entity will my account be with?"
    answer: "It depends on your country of residence and the product you open. Exness states that Exness (SC) Ltd, Exness B.V., Exness (VG) Ltd and Forexite Ltd operate for selected jurisdictions outside the European Economic Area. The entity is shown in your client area and on the client agreement before you fund; check it there rather than on a marketing page."
  - question: "Can you run expert advisors on Exness?"
    answer: "Yes. Exness supports MetaTrader 4 and MetaTrader 5, both of which run expert advisors natively. As with any broker, read the client agreement for the clauses that affect automation — hedging, scalping, latency-based strategies and any minimum holding period — because those terms attach to the entity your account is with, not to the brand."
  - question: "Why can I not see Exness pricing without an account?"
    answer: "Exness gates much of its pricing, account and promotion content behind sign-in on the main site. That is a usability complaint as much as anything: it means you cannot compare spreads, commissions and account minimums properly until you have registered. Use the public regulation and about pages for entity facts, and get the numbers inside the client area before you fund."
  - question: "What should an EA trader test at Exness first?"
    answer: "Spread at the hours your system trades, the swap on the instruments it holds overnight, the slippage between requested and filled price, and whether the position sizing behaves the same on a demo and a live account of the same type. A month of logged fills on a demo, then a small live account, answers more than any published average."
  - question: "Is Exness suitable for a first expert advisor?"
    answer: "It is workable, but only once you know which entity you are onboarding to and what its leverage and swap terms are. A first EA needs predictable execution and a cost you can measure, and the entity question at a multi-licence broker like this one is part of the due diligence, not an afterthought."
sources:
  - label: "Exness — Regulation and group licences"
    url: "https://www.exness.com/regulation/"
  - label: "Exness — Corporate information"
    url: "https://www.exness.org/"
  - label: "FCA Financial Services Register — Exness (UK) Ltd, 730729"
    url: "https://register.fca.org.uk/s/firm?id=001b000003587sXAAQ"
  - label: "CySEC — Exness (Cy) Ltd, licence 178/12"
    url: "https://www.cysec.gov.cy/en-GB/entities/investment-firms/cypriot/37681/"
download:
  origin: own
  name: "Exness entity and account verification checklist"
  license: "Free to use and share; provided without warranty"
  fileKey: "posts/exness-entity-verification-checklist.txt"
---

Exness is one of the two brokers this site builds and tests expert advisors on, and it is also the one where the gap between the marketing and the paperwork is widest. The marketing says "regulated by the FCA and CySEC". The paperwork says something narrower, and the difference matters to anyone about to fund an account and attach an EA to it.

This review is written from that position rather than from a spreadsheet of spreads. If you want the ranked comparison across platforms, the [full broker list](/best-forex-brokers/) carries it. What follows is what an EA trader needs to understand before trusting a logo.

Some links on this page are affiliate links. If you open one and fund an account we may earn a commission at no extra cost to you, and it does not change what is written here.

## Exness at a glance

| | |
|---|---|
| **Group** | Exness, operating since 2009, with multiple regulated entities |
| **Retail entities (non-EEA)** | Exness (SC) Ltd, Seychelles — FSA licence SD025 |
| | Exness (VG) Ltd, BVI — SIBA/L/20/1133 |
| | Exness B.V., Curaçao — CBCS 0003LSI |
| | Forexite Ltd, Belize — FSC 9110312 |
| **Regional entities** | Exness ZA (FSCA FSP 51024), Exness (KE) (CMA 162), Exness Limited Jordan (JSC) |
| **Non-retail licences** | Exness (UK) Ltd — FCA 730729 · Exness (Cy) Ltd — CySEC 178/12 |
| **Platforms** | MetaTrader 4, MetaTrader 5 |
| **Automation** | Expert advisors supported natively in MT4 and MT5 |
| **Best for** | Traders who will check the entity and test execution rather than trusting the badge |
| **Watch out for** | The retail account is not with the FCA or CySEC entity, whatever the marketing implies |

The single most useful thing this review can do is explain that table, because almost everything else about the broker follows from which row your account lands in.

## The entity question, which is the whole question

Exness is not one company. It is a group of licensed entities, each serving different jurisdictions, and the entity you sign with decides the regulator, the leverage cap, the swap terms, the dispute route and what happens if something goes wrong.

Exness's own regulation page is unusually clear about this, and three points from it deserve to be quoted rather than paraphrased.

The first: **Exness (SC) Ltd** is a Securities Dealer authorised and regulated by the Seychelles Financial Services Authority with licence number **SD025**, and it operates for selected jurisdictions outside the European Economic Area.

The second: **Exness (VG) Ltd** is authorised by the Financial Services Commission in the British Virgin Islands under registration 2032226 and investment business licence **SIBA/L/20/1133**, again for selected jurisdictions outside the EEA.

The third, and the one that gets buried on comparison sites: **Exness (Cy) Ltd** holds CySEC licence **178/12** and **Exness (UK) Ltd** holds FCA register number **730729**, and Exness states that *neither offers trading services to retail clients*.

Read that again. The two licences most often used to sell this broker to European and British traders are held by entities that, by the broker's own statement, do not serve retail clients. If you are a retail trader, your account is with one of the offshore entities. The FCA and CySEC permissions exist and are real, but they are not the permissions behind your deposit.

This is not a scandal and it is not unique to Exness. Many large brokers run tiered structures exactly this way. It is simply the thing you have to know before the leverage number means anything, because the leverage cap, the swap terms and the complaint route all come from the entity, not the brand.

Our own comparison table previously listed Exness as "FCA, CySEC", and that was misleading for a retail audience. It now names the retail entities and marks the UK and Cyprus companies as non-retail, which is what the broker's own page says.

## What protection actually applies

Because the retail account sits with an offshore entity, the protection question is different from what a UK or EU trader might expect.

There is no FSCS-style statutory compensation for a Seychelles or BVI account. If the entity fails, the schemes that operate in the UK and Cyprus do not apply to you. What you have instead is the entity's own regulatory obligations, its client-money arrangements, and whatever dispute mechanism the licence provides. That is a real difference in kind, not degree, and it should shape how much capital you keep at any offshore broker.

Exness publishes its licence details and links to the public registers for each entity, which is the right way to do it: the FCA register entry for 730729, the CySEC listing for 178/12, the FSA Seychelles business search for Exness SC Ltd, the BVI FSC register for Exness VG Ltd, the FSCA search for FSP 51024, and the CMA Kenya licence list for 162. Verifying the number on the regulator's own register takes a few minutes and is the only check that does not depend on the broker's word.

For an EA trader the practical consequence is this: keep on the account what the strategy needs to trade, not what you would keep at a bank. Offshore entity, no statutory scheme, automated system running unattended — the combination argues for a working balance and periodic withdrawal, not a single large deposit.

## Accounts and platforms, and why the details are hard to check

Exness supports MetaTrader 4 and MetaTrader 5, and expert advisors run natively in both. That is the part that matters most for automation: the terminal behaves the way the documentation says, and an EA attached to a chart executes without a proprietary wrapper changing how orders are handled.

The account line-up is where the review becomes deliberately cautious. Exness gates much of its account and pricing content behind sign-in on the main site — the public pricing page asks you to authenticate before it will show anything useful. So the figures a comparison table quotes for this broker, including ours, are tracked from the client area and from public material, and they should be confirmed inside the Members Area before you fund.

What we can say with confidence is structural rather than numerical. Exness runs multiple account types aimed at different cost structures — a standard account with the spread built into pricing, and lower-spread accounts where the cost moves into commission. The right one for an EA depends entirely on trade frequency, which is the arithmetic every broker review should force you to do.

Here is the test that settles it without relying on anyone's published average. Take your system's own statistics: round turns per month, average hold time, and the instruments it trades. Compare the total cost per round turn on each account type at the hours you actually trade — not the "from" figure. If the system trades twenty times a month, the commission account rarely wins. If it trades two hundred times a month, it usually does. The account choice is derivative of the strategy, not a preference.

## Running an EA: what to measure, not what to assume

### Spread at your hours, not theirs

Published spreads are a floor measured at some hour on some instrument. Your EA trades at the hours it trades, including the rollover window and the minutes around scheduled releases. Log the spread at entry and exit for a month before you decide the broker is cheap. This is the single most useful measurement an EA trader can make, and it costs nothing but a CSV file and patience.

### Swap and overnight exposure

Any system that holds positions overnight pays or receives financing. On a pair with a wide swap differential, a week of holding can cost more than the spread did. Whether swap-free options exist, and on which instruments, depends on the account type and the entity, so check the financing line in the terminal rather than trusting a marketing page.

### Leverage is a margin setting

Exness, like most brokers, advertises high leverage on some accounts. Treat that as a margin setting. A strategy that sizes positions from free margin will scale its risk automatically when leverage changes, which means the risk model you tested is not the one that runs. Fixed-fractional or fixed-lot sizing removes the problem; margin-based sizing invites it.

### Server time and EA time filters

Every broker runs its server on a clock, and every EA with a session filter, news blackout or end-of-day rule is comparing against that clock. Before attaching a time-sensitive system, read the server time in the terminal and convert your intended trading window into it. This is the most common reason an EA that performed well elsewhere underperforms here, and it is entirely preventable.

### Execution, measured honestly

The only defensible way to judge execution is to log it. Requested price, filled price, timestamp, for every order. Do it on a demo first, then on a small live account of the same type, because demo fills can flatter a broker. What you are looking for is not perfection but a stable distribution: if the slippage is small and consistent, your backtest assumptions survive. If it is large or erratic around specific times, no account type fixes that.

## What we have tested, and what we have not

We run our own expert advisors on Exness accounts, concentrated on the instruments our published systems trade, in the same sequence we recommend to anyone: demo, then a small live account, then scale only after the logs agree.

That gives us a view on the operational questions — how the terminal behaves, how a cent-style account compares with a standard one for validation, how orders fill outside liquid hours. It does not give us a performance audit, and we do not claim one. We have not verified every advertised spread, we have not tested every payment method in every jurisdiction, and we do not maintain accounts with every entity in the group.

Where this review quotes a licence number, that is verified against the regulator's register. Where it repeats a broker figure, it is labelled as the broker's. Where the detail is behind a login, we say so instead of inventing a number. That is the honest position, and it is more useful than a table of figures nobody can check.

## A worked cost model you can apply yourself

Published spreads are not a cost model, and a comparison table that lists "from 0.0 pips" tells you almost nothing about what your expert advisor will pay. Here is the arithmetic to run instead, using round numbers so you can substitute your own.

Start with the spread. On EUR/USD, one pip at 1.0 standard lot is about $10. At 0.10 lots it is about $1.00, and at 0.01 lots about $0.10. A system paying a 1.0-pip spread on 0.10 lots therefore spends about $1.00 per round turn before slippage. Twenty round turns a month is about $20, or $240 a year. Two hundred round turns a month is about $200, or $2,400 a year. Same strategy, same spread, ten times the cost — and this is the number that should decide your account type, not the headline pip figure.

Now add commission, because a lower-spread account usually charges one. If the account charges $3.50 per lot per side, a 0.10-lot round turn costs about $0.70. Pair that with a 0.2-pip spread ($0.20 at 0.10 lots) and the total is about $0.90 per round turn — cheaper than the plain account in this example, on these numbers, at this spread. Change the spread to 1.5 pips and the plain account costs $1.50 while the commission account still costs about $0.90. Change the spread to 0.1 pips and the plain account costs $0.10 against $0.90.

The point is that the choice is a per-round-turn comparison at the spread your system actually pays, not a volume threshold. Volume determines how much the difference costs you across a year; it does not change which option is cheaper per trade. A review that tells you "the commission account is better once you trade more than X lots" is usually hiding the real variable, which is spread behaviour at the hours you trade.

Then add the two costs nobody publishes. Slippage of 0.2 pips on entry and exit at 0.10 lots is about $0.40 per round turn — 40 percent on top of a 1.0-pip spread. On twenty trades a month that is $96 a year, which is the difference between two account types for most retail systems. And swap, if positions are held overnight, accrues while you sleep and is invisible in any spread comparison.

Do this with your own numbers once, and you will never need a broker's published average again. It also explains why the account-type question at Exness cannot be answered from a marketing page: the answer depends on your system, and the numbers you need are inside the client area.

## Six mistakes that break an EA at a multi-entity broker

These are the failures we see repeatedly, in roughly the order they cost people money.

**One: treating the brand's licence as your licence.** A group with twelve regulated entities is not a single regulated company. The protection, the leverage cap and the complaint route come from the entity named in your client agreement. Traders who assumed an FCA or CySEC badge covered their retail account discover the difference at the worst possible moment, when they need to escalate something.

**Two: ignoring server time.** An EA with a session filter compares against the broker's server clock, not UTC and not your local time. A London-session system built elsewhere can open its first trade two hours late and its last one two hours early, and the equity curve changes shape without a single line of code changing. Read the clock in the terminal, write the offset down, and test the filter against it.

**Three: hard-coded symbol names.** Symbols differ between brokers and between account types: a suffix, a prefix, a different contract name for the same instrument. An EA that expects `EURUSD` and receives `EURUSD.a` does not always fail loudly; sometimes it simply never trades, and the log looks clean. Make the symbol name an input and verify it in the Market Watch window before attaching.

**Four: assuming the demo account is the live account.** Demo fills can be better than live fills, and demo spreads are often the best-case spread at the quietest hour. Any comparison that does not run on a live account of the same type is a hypothesis, not a result. This is why the sequence — demo, then a small live account, then scale — matters more than the size of the first deposit.

**Five: sizing from free margin.** If an EA calculates lot size as a percentage of available margin, then a change in leverage automatically changes position size and the risk model you tested no longer exists. Fixed-fractional or fixed-lot sizing keeps the risk constant across leverage settings, account types and entities. Check the lot logic before you blame the broker for a drawdown.

**Six: assuming swap-free is universal.** Swap-free terms are attached to specific accounts and instruments, and exempting an instrument from financing usually comes with its own conditions. A grid or recovery system that holds positions for days can see its entire edge eaten by financing on a pair that is not covered. Read the financing column for the instruments your EA actually holds.

None of these is a reason to avoid the broker. They are reasons to treat a broker change the way you would treat a server migration: verify, instrument, then scale.

## KYC, entity switching and the paperwork worth keeping

Most reviews stop at the trade. The operational side is where multi-entity brokers surprise people, and an automated system is more exposed to it than a discretionary trader, because a change in terms can invalidate a risk model silently.

**Verification varies by entity.** Identity and address documents are standard, but the accepted documents, the thresholds that trigger enhanced checks and the timelines differ between entities and jurisdictions. Start verification before you fund, not after, because a deposit sitting in an account that cannot be withdrawn until documents clear is a stranded balance and nothing else.

**Your entity can change without your strategy changing.** If you relocate, or if the group re-onboards a jurisdiction, the account can move to a different entity with different leverage, different swap terms and a different regulator. For a discretionary trader that is an inconvenience. For an EA sized against a specific margin assumption it can be a forced change in position sizing overnight. When the entity changes, re-run the numbers before the next session opens.

**Withdrawal routes differ by entity and country.** The methods offered to a Seychelles account, a BVI account and a South African account are not identical, and neither are the processing times once a request leaves the broker. Make a small test withdrawal early — before the balance matters — and time how long it takes to arrive at your bank or wallet, not how long it takes to show as processed.

**Keep the working balance small.** This is the practical conclusion of the regulation section. The retail entity is offshore, there is no statutory compensation scheme behind it, and the account is running software unattended. Keeping a trading balance rather than a savings balance on the account is not pessimism; it is the correct response to the protection that actually exists.

**Keep a record of what you agreed to.** Save the client agreement with its date, the entity name, the licence numbers, the account type, the leverage cap and the server name and time zone. When a term changes — and terms do change — the saved version is the only way to show what your EA was configured against.

None of this is exotic. It is the same discipline you would apply to any counterparty you leave money with. At a single-entity broker some of it is implicit; at a multi-entity one it has to be explicit.

## Where Exness falls short

**The retail entity is offshore.** No matter how many licences the group holds, the FCA and CySEC companies do not serve retail clients by the broker's own statement. That is the first thing to understand and the last thing most reviews mention.

**Pricing is gated.** Needing an account before you can see account terms properly is a poor experience for anyone comparing brokers, and it pushes comparison sites into quoting stale numbers.

**Brand and entity are easy to confuse.** A licence on a marketing page is not a licence on your client agreement. Check the agreement.

**No broker removes strategy risk.** None of the above makes a weak system work. It only changes what happens when it fails.

## Who Exness suits, and who it does not

It suits a trader who is comfortable with an offshore retail entity, who will verify the licence number on the regulator's register, and who will measure spread and slippage rather than trust a published average. It suits someone running a system on MT4 or MT5 who wants a large, established broker with multiple entities and a serious technology stack, and who keeps a working balance rather than a bank deposit on the account.

It does not suit anyone who needs a UK or EU retail account with statutory compensation, because this broker does not offer one through those entities. It does not suit a trader who will not read which entity they are onboarding to, and it does not suit anyone looking for the broker to validate their strategy.

## How to verify before you fund

1. Open Exness's regulation page and note every entity and licence number.
2. Check the register for the entity named in your client agreement — FCA, CySEC, FSA Seychelles, BVI FSC, FSCA, CMA Kenya or JSC, depending on where you are.
3. Read the client agreement's automation clauses: hedging, scalping, latency strategies, any minimum holding period.
4. Confirm the account type, minimum deposit and leverage cap inside the Members Area, for your country and currency.
5. Read the server time in the terminal and convert your EA's time filters.
6. Run a month on demo, then a small live account, logging spread and slippage throughout.
7. Make a small test withdrawal before scaling.

The checklist linked below is the one-page version of that list, specific to Exness's entity structure.

## The bottom line

Exness is a capable, established broker with a genuine technology operation and a licence structure that is disclosed properly, if not prominently. For an EA trader the review reduces to two questions. Which entity is your account with, and what does your own execution data say? Answer both before funding and the broker is workable. Skip either and you are trading on a logo.

[Open an Exness account](affiliate:exness) — and compare the entity structure against the other platforms on our [best forex brokers page](/best-forex-brokers/) before you commit.

If you are moving from a home PC to a machine that stays connected, the [VPS plans](/product/vps/) we provision for the systems sold here are the infrastructure side of the same problem, and the [position size calculator](/tools/pip-calculator/) handles the lot maths that sits underneath it.

**Risk warning:** trading forex and CFDs carries a high level of risk and can result in the loss of all of your capital. Nothing on this page is financial advice, and past performance of any expert advisor is not indicative of future results.
