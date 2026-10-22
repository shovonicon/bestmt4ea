---
title: "Gemini AI Smart Trader Pro EA: Settings Guide & Honest Notes"
slug: "gemini-ai-smart-trader-pro-ea-settings-guide"
description: "A settings-first guide to the Gemini AI Smart Trader Pro EA: what the inputs control, which defaults to question, and how to record every change properly."
publishedAt: 2026-10-22
updatedAt: 2026-10-22
categories:
  - "EA Reviews & Comparisons"
categoryPaths:
  - "/category/mt4-mt5-expert-advisors/ea-reviews-comparisons/"
tags: []
draft: false
quickAnswer: "The Gemini AI Smart Trader Pro EA is a third-party automated trading product sold with AI in its name and a long settings list. The settings that decide your outcome are the unglamorous ones: lot sizing and risk, stop and basket behaviour, session and spread filters, and the magic number. Change them one at a time, record every change, and judge the EA on a four-week demo at the settings you actually intend to run."
keyTakeaways:
  - "An 'AI' label on an EA describes marketing, not a verified model. Judge the product by its inputs, its track record evidence and its behaviour in your own test."
  - "Risk inputs outrank signal inputs. Lot mode, maximum exposure and any equity stop decide your worst day; signal tweaks only rearrange the average day."
  - "If the EA can add to positions, find that setting first and understand it completely before anything trades live."
  - "Save a dated .set file for every accepted configuration. Results you cannot trace to a settings file cannot be repeated or debugged."
  - "Settings shared by other users were tuned for their broker, balance and period. Treat them as reading material, never as a configuration."
faqs:
  - question: "What is the Gemini AI Smart Trader Pro EA?"
    answer: "It is a commercial expert advisor for MetaTrader sold by a third-party vendor, positioned around automated entries with an AI-branded decision layer. We do not sell it and we do not offer a download of it; this guide exists because owners search for help understanding its settings, which is a legitimate need regardless of where the EA was bought."
  - question: "Which settings should I change first?"
    answer: "None of them, at first. Run the vendor's defaults on a demo for a baseline period with a written loss limit. After the baseline, adjust risk settings only, one at a time, because risk changes are the ones whose effects you can actually measure and whose mistakes you can survive."
  - question: "Does the AI in the name mean it learns from my account?"
    answer: "Treat any such implication with caution. Most products using AI branding apply fixed models or conventional indicator logic with adaptive parameters. Unless the vendor documents exactly what is trained, on what data, and how it updates, assume the behaviour is fixed logic whose quality must be proven by track record and your own forward test."
  - question: "What lot size should I use?"
    answer: "Work backwards from your written maximum loss per day and per trade, at the EA's actual stop or basket behaviour, not from a percentage you saw in a forum post. If the EA averages into positions, size for the full basket's worst case, not for the first position."
  - question: "Why did the old settings-update page disappear?"
    answer: "The old page sat at a product URL from the WordPress version of this site and did not survive the rebuild. This guide replaces it at a clearer address, and the old URL now redirects here. Settings guidance ages quickly, so treat any dated preset, including ours, as a starting hypothesis to test rather than a current recommendation."
  - question: "Can I run it on a small account?"
    answer: "Only if the maths works at the EA's minimum sensible lot size with your loss limits intact. If the smallest available configuration risks more per basket than your written limit allows, the account is too small for this product, whatever the sales page's minimum deposit claim says."
sources:
  - label: "MQL5 Market: expert advisors and product listings"
    url: "https://www.mql5.com/en/market"
  - label: "MetaQuotes: MQL5 documentation — expert advisor inputs"
    url: "https://www.mql5.com/en/docs"
primaryKeyword: "Gemini AI Smart Trader Pro EA settings"
download:
  name: "EA Settings Record Sheet: Change One Thing, Write It Down"
  origin: "own"
  license: "Free to use, print and share with credit to bestmt4ea.com"
  version: "1.0"
  fileKey: "resources/ea-settings-record-sheet.pdf"
---

Searches for an EA's settings are the most honest searches in this market. Someone owns a product, the results are confusing, and they want to know what the inputs do and which ones are safe to touch. The old version of this site had a settings page for the Gemini AI Smart Trader Pro EA at a product address; it was one of the most-visited pages we ever published on a product we do not sell, and it did not survive the move to the current site. This guide replaces it, properly, at a clearer address, with the old URL redirecting here.

Two ground rules before the settings themselves. First, we do not sell this EA and we will not give you a download of it: it is a third-party commercial product, and the only legitimate copy comes from its vendor. What we can do, and what this page exists for, is help you understand what you own. Second, settings guidance has a half-life. Vendors rename inputs, change defaults and ship updates, so treat everything below as the method for reading any version's input list, with the specific families named, rather than as magic numbers to copy. Numbers age; method does not.

## What the product claims to be, and how to hold the claim

The Gemini name and the AI branding place this EA in the most crowded and least verifiable category in the market: products whose decision layer is described in the language of machine learning. Hold the claim the way you would hold any other: ask what, precisely, is being computed. Some products genuinely apply trained models to features of price data. Many more apply conventional indicator logic whose parameters adapt within ranges, which is a respectable design and a different thing. A few apply the label to fixed rules and hope the question is never asked. The settings list is where the truth leaks out, because a real model's inputs talk about data windows, thresholds and retraining, while a fixed strategy's inputs talk about indicator periods and entry distances. Read the input list first and let it tell you which product you actually bought; the answer calibrates how much trust the rest of the page deserves.

Whatever the layer is, the evaluation standard does not change. A verified, independent track record or the absence of one. Behaviour you can watch in a forward test. Risk you can compute. The settings work below is how you make those three judgements concrete on this specific product.

## The settings map: six families, in the order they matter

Every long input list sorts into families, and the families have a strict order of importance that marketing inverts. Signal inputs get the screenshots; risk inputs decide whether you survive. Work in this order.

**Family one: position and basket behaviour.** Find every input that governs how many positions can be open, whether the EA may add to an existing position, and at what distance it may do so. This family defines the strategy's true shape. A single-position EA with a hard stop is one animal; an EA that layers positions as price moves against it is a grid or averaging system wearing whatever name the vendor chose, and its worst case is a basket, not a trade. Your entire risk plan starts here, and if you read no other family today, read this one until you can explain to another person exactly what the EA does when a trade goes wrong for a long time.

**Family two: size and exposure.** Lot mode (fixed, balance-percentage, or equity-based), the base lot, any lot multiplier between basket layers, and caps on total open volume and total open trades. Compute the worst legal state of the account under these inputs: maximum simultaneous positions at maximum size, all at their adverse extreme. If that state is ruin, the family is misconfigured regardless of what any individual input says. Vendors set defaults for demonstration; your account's survival is your own setting.

**Family three: exits.** Stop loss and take profit, whether they are server-side orders or virtual levels watched by the EA, trailing behaviour, basket-level profit targets and, most important of all, any equity stop or maximum-drawdown input that halts the system. If there is an equity stop, it is the most valuable input in the list; set it from your written loss limit, not from the default. If there is no equity stop anywhere, the honest conclusion is that the product expects you to be its risk manager, permanently, including at night.

**Family four: filters.** Spread limits, session hours, day-of-week switches, news behaviour if present. Filters are where broker reality enters. A spread filter set below your broker's normal spread for the traded hours will simply forbid trading, which produces the mysterious silent EA; set it from spreads you have measured on your account, at your hours. Session hours must be read against your broker's server clock, which is rarely your local time. Day filters encode other people's statistics; know why one is off before you switch it on.

**Family five: signals.** Indicator periods, thresholds, sensitivity and confirmation rules. These are the inputs vendors photograph and users obsess over, and they matter least per unit of attention. Their effects are statistical and slow to measure; a change needs hundreds of trades to judge, which means weeks, which means almost nobody who tweaks them actually knows whether the tweak helped. Touch this family last, rarely, and with a written hypothesis.

**Family six: identity and plumbing.** The magic number, order comments, slippage or deviation allowance. The magic number must be unique to this EA on this account for each symbol it trades, because it is how the EA recognises its own positions; sharing one with another robot invites them to manage each other's trades, a special chaos with its own error stories. Deviation deserves a sane, small value for your broker, not a huge one copied from a forum, because an enormous deviation quietly converts your intended entry price into a suggestion.

## The baseline protocol: defaults first, on purpose

The strongest settings advice for a newly owned EA feels like a refusal to help: change nothing. Run the vendor's default configuration, on a demo account funded at the size you intend to use live, for the full baseline period in the testing workbook — four weeks or a hundred trades, whichever takes longer — with a written abandon limit. The baseline exists because every later question ("is this setting better?") needs an honest "than what?" and the defaults are the only configuration the vendor can be said to stand behind.

Record the baseline the way the attached settings record sheet is laid out: every input family as run, the .set file saved and dated, the broker, the account type, the pairs and timeframes. Log behaviour weekly rather than results daily. What you are buying with this patience is the ability to detect the two failure modes that settings cannot fix: a strategy unsuited to your broker's costs, which the baseline will reveal as a slow bleed with correct behaviour, and a strategy unsuited to current market conditions, which reveals itself as correct behaviour in the wrong regime. Both discoveries are valuable and both are invisible to a trader who started editing inputs on day two, because every later result can be blamed on the edits.

## Changing settings without lying to yourself

When the baseline is done and you change things, the discipline is simple to state and apparently very hard to do. One change at a time. A written reason, phrased as a prediction ("reducing the spread filter to my measured night spread should cut trade count by roughly a third and remove the worst fills"). A fixed evaluation window, stated in advance. And the change recorded on the sheet, with the old .set preserved, so the experiment can be reversed exactly.

The traps are worth naming. The first is the rescue edit: a setting changed mid-drawdown to stop the pain, which corrupts the test and usually locks in the loss while removing the recovery the original configuration was designed around. The second is the victory edit: a setting changed after a good week to press an advantage, which in a small sample is indistinguishable from chasing noise. The third is the compound edit dressed as one change, such as loading someone else's entire preset and describing it as trying their spread filter. Their preset is fifty changes wearing a trench coat. The fourth is editing toward the recent past: optimising this month's settings on last month's trades produces a configuration beautifully fitted to a market that has already left.

If your vendor issues an update that renames or re-defaults inputs, treat it as a new product wearing a familiar name. Save the old set file, re-run a shortened baseline, and diff the input lists if the platform lets you. Updates are where settings knowledge quietly expires, and the traders who get hurt by them are the ones whose records say the EA is "on the usual settings" when the usual settings no longer exist.

## Sizing this EA honestly

However the signal layer works, sizing follows the basket. If the EA can hold several positions, your unit of risk is the whole basket at its worst permitted state: total lots, average adverse distance to the basket exit, plus the gap risk that exits execute worse than planned in fast markets. Divide your written per-idea loss limit by that number. If the result is the minimum lot size and the maths still exceeds the limit, the account is too small for the product at any setting, and the correct configuration is a larger demo and a smaller ambition until the balance supports the design. This conclusion is unglamorous and a great deal cheaper than its alternative.

If the EA trades single positions with a hard server-side stop, sizing is the standard calculation and the EA's settings sheet should show it: risk percentage, the resulting lot at the current stop distance, recomputed as the balance moves. In both shapes, the equity stop from family three is the backstop that makes the arithmetic honest when you are asleep, away, or simply wrong about a number somewhere upstream.

## Worked example: reading a frightening drawdown correctly

Settings literacy is best shown on the moment owners actually search for it: the EA is down, the equity curve looks alarming, and the settings panel is open like a cockpit in a storm. Walk the situation the way this guide orders it, and notice how the answer is rarely in the family people reach for first.

First, position behaviour: open the account history and the current positions. Is the drawdown one trade doing what single trades do, or a basket layered by design? Count the positions and their spacing. If layers were added at distances the inputs allow, the EA is executing its design in adverse weather, and the question is whether the design's worst case still fits your limit. If layers appear at distances the inputs forbid, something else is wrong — a second EA sharing the magic number is the classic discovery at exactly this moment, so check family six before touching anything.

Second, exits: are the open positions inside their stated logic — stops where the inputs say stops live, basket targets calculated as documented? A virtual stop depends on the terminal being alive, so check the Journal for disconnections during the drawdown window before concluding the stop failed. Third, filters: did a news event or a spread explosion pass through a filter that was off, unset, or set from someone else's broker? Half of all "the EA ignored the news" stories end at a filter that was never enabled. Only after those three families are cleared do signal inputs earn a look, and by then, in our experience of these post-mortems, the cause is almost always already found. The drawdown was the tuition; the families are how you collect the education instead of just paying.

## Presets from the community, used safely

Owners of popular EAs inevitably meet shared preset files, and a settings guide that pretends otherwise is not describing the real world. A shared .set is another trader's answers, for their broker, balance, risk appetite and quarter of the market. Used as literature, it is genuinely valuable: diff it against the defaults, input by input, and every difference is a question — why did an experienced user move this, and what were they solving? Used as a configuration, it is a blindfold.

If you are determined to trial one, the safe route is boring and complete. Load it on a fresh demo, never over your baseline demo, because you will want the two running side by side. Read the risk families in the loaded file and recompute the worst legal state for your balance before it trades a single lot; community presets are routinely built for balances ten times yours, with lot formulas that notice no difference. Rename the saved file with the source and date. And judge it on the workbook's terms over its own full window, not against the baseline's best week. A preset that survives that process has been promoted from folklore to a tested configuration of yours, which is the only kind that should ever meet a live account.

## Account and broker fit, checked from the settings side

Two quiet mismatches produce a large share of "the settings don't work" reports for EAs in this category. The first is account mode on MT5: hedging versus netting changes what position-adding logic even means, and an EA whose basket maths assumes hedging will produce nonsense on a netting account while displaying perfectly sensible inputs. The second is the symbol set: an EA tuned on true EURUSD may be attached to a suffixed symbol whose specification — contract size, digits, swap — differs in ways that flow through every calculation. Digits alone deserve a look: stop and target distances expressed in points mean different money on a five-digit broker than the four-digit layout in most screenshots, and an EA that does not detect digits for you must be told correctly.

Neither mismatch lives in the signal family, yet both are routinely "fixed" by owners randomly adjusting signal inputs until the behaviour changes, at which point two errors are compensating for each other and the setup is a house of cards with a profitable week in it somewhere. Check fit first. It is read from the account and the specification window, costs nothing, and cannot be compensated into existence by a better RSI period.

## What we cannot tell you, and what to ask the vendor instead

A settings guide from outside the vendor has limits, and pretending otherwise is how bad advice dresses up. We cannot certify what the current version's inputs are named, because versions change and we do not maintain a copy of a competitor's commercial product for line-by-line documentation. We cannot tell you the configuration that will make this EA profitable, because no honest person can separate that answer from your broker, your account and the coming market. We can tell you the questions whose answers determine it, and we have.

Put these to the vendor, in writing, and weigh the quality of the replies as part of the product: What does the system do, exactly, when a position moves against it — is there adding, and what ends the basket? Are stops server-side or virtual? Is there a verified track record on an independent tracker, and may you have the direct link? What changed in the last update's inputs? A vendor who answers those plainly has sold you a tool. A vendor who answers with adjectives has sold you a mood, and your settings discipline matters even more, because you are the only engineer this product has.

## A starter configuration audit you can finish today

If the families above feel abstract, here is the concrete audit this guide reduces to, in the order to perform it, with no trading required. Print the input list. Mark every input that can open, add to, or resize a position; that marked set is your risk perimeter, and you should be able to state its worst case in money. Mark every input that references time, and convert each from broker server time to your local time on paper; mismatches here are the top cause of EAs trading at hours their owners swear they forbade. Mark every input with the word filter, limit or maximum, and write beside each one the value your own measurements support: your spread at your hours, your daily loss limit in money, your maximum tolerable basket. Any marked input still holding a forum number or an unexamined default after this exercise is a place where the product is configured by strangers. There will be some. There always are. The audit is how they stop being strangers' decisions and become yours, recorded, which is most of what professional operation of any EA consists of.

Then save the audited configuration as your true baseline file, version one, with the date in its name, and let the demo clock start from there rather than from the vendor's defaults if the two differ materially. Your baseline is the configuration you can defend. Everything this guide has asked of you — families, records, single changes, written predictions — is scaffolding around that one idea: at any moment, you should be able to say what your EA is configured to do, why, and what it has done since. Owners who can say that rarely need rescue. Owners who cannot are the audience settings pages exist for, and we would rather you graduated from it.

## Reading the vendor's changelog like an auditor

Vendors of long-lived EAs publish update notes, and almost nobody reads them as documents. They should, because a changelog is the closest thing this market produces to a company's filed accounts: a dated record of what changed, which reveals what the vendor thinks is broken, what they think sells, and how carefully they work. Read the last several versions in sequence rather than the latest one alone, and sort every entry into one of three piles.

The first pile is repairs: named faults, fixed. A changelog dense with specific repairs is quietly good news — it means users report problems, the vendor reproduces them, and the fixes are concrete enough to describe. The second pile is defaults and inputs: renamed settings, changed starting values, families added or removed. Every entry in this pile is a small expiry notice for your own settings knowledge, and each one obliges you to re-check whether your saved .set files still mean what their names claim, because a default that moved under a familiar input name changes your EA's behaviour without changing a single line of your records. The third pile is adjectives: claims of improved intelligence, enhanced profitability, next-generation logic, with no mechanism stated. Adjectives are not evidence of anything except a marketing calendar, and a changelog that is mostly pile three, attached to a product whose pile one is empty, is telling you the development effort goes into the sales page.

Two patterns deserve a colder eye. Updates that arrive suspiciously soon after a widely reported bad period, promising to have solved it, should trigger a fresh shortened baseline rather than relief: a fix written in a hurry, against a recent wound, is fitted to the wound. And an update history that goes silent for a long stretch on a product still being sold at full voice is information too — not proof of abandonment, but a reason to ask the vendor directly what the maintenance position is before your next renewal of faith. Keep your own note of which version your baseline ran. Months later, "the EA changed" is a useless observation; "behaviour shifted at the March update, which renamed two inputs and moved the default basket distance" is an actionable one.

## The two-account trap: demo tuned, live different

The most expensive settings mistake with EAs of this type is not a wrong number. It is a right number discovered on the wrong account. An owner tunes patiently on a demo — adjusts the spread filter until activity looks healthy, trims the basket distance, finds the lot mode that behaves — and then moves the finished configuration to a live account where everything is subtly different, and concludes either that the EA is fraudulent or that the markets conspired. Usually neither happened. The two accounts were never running the same experiment.

Demo and live accounts at the same broker differ in the places settings are most sensitive to. Spreads on demo feeds are often tighter and calmer, so a filter threshold tuned there sits at the wrong height for the live feed: either it forbids most trading, producing the silent live EA its owner then "fixes" by loosening risk inputs, or a market order that demo filled at the requested price slips live by enough to move the basket maths. Symbol specifications differ between servers more often than brokers advertise — swap values, stop levels, contract details — and every one of those flows through the EA's calculations while its inputs sit serenely unchanged. On MT5 there is the structural difference already covered in this guide: demo accounts are commonly hedging, live accounts frequently netting, and basket logic tuned under one model does not merely perform worse under the other; it means something else entirely.

The defence is procedural, and dull, and complete. Treat the demo phase as behaviour training, not as configuration discovery: what you are learning is how the EA acts, what its log looks like when healthy, and which faults look like which symptoms. The configuration itself must be re-derived on the live account's own measurements — your live spread at your trading hours, your live specification window — and then re-baselined on a small live balance or a live-feed demo before any real size is attached. Settings record sheets exist precisely for this: if your sheet does not name the account type and broker beside the configuration, the configuration is only half recorded, and the missing half is the one that changes silently when you move it.

## The bottom line for owners

You bought a long list of inputs and a promise. The promise is the vendor's problem; the inputs are yours. Read them in families, risk first. Baseline the defaults with a written limit. Size for the basket's worst legal state. Change one thing at a time, on paper, with dates. Keep every .set file as if it were an account statement, because months from now it will be the only reliable witness to what actually ran. Do that, and whatever this EA turns out to be — good, mediocre, or unsuited to your account — you will find out cleanly, affordably, and in a form you can act on. That is all settings wisdom ever was.

## Related reading

- [How to fix compile errors in MQL4 & MQL5](/how-to-fix-compile-errors-in-mql4-complete-step-by-step-guide/)
- [Smart Money Engine EA review](/smart-money-engine-ea-review/)
- [Best EA for a prop firm challenge](/best-ea-for-prop-firm-challenge-passing/)
- [Grid EA risk settings explained](/risk-management-settings-for-grid-ea-explained-7-powerful-ways-to-reduce-losses/)
