---
wpId: 127404
title: "Verify a Gold EA Before Installing It: 5-Minute Audit"
slug: "pharaoh-gold-ea-mt4-free-download-7-powerful-facts-every-trader-must-know-before-installing"
description: "A five-minute pre-install audit for any unknown gold EA: who published it, its licence, where the file came from, the hash, and what the Experts log shows."
publishedAt: "2026-02-13T23:51:13.000Z"
updatedAt: 2026-09-29
seo:
  title: "Verify a Gold EA Before Installing It: 5-Minute Audit"
  description: "A five-minute pre-install audit for any unknown gold EA: who published it, its licence, where the file came from, the hash, and what the Experts log shows."
  canonical: "https://bestmt4ea.com/pharaoh-gold-ea-mt4-free-download-7-powerful-facts-every-trader-must-know-before-installing/"
  ogImage: "https://bestmt4ea.com/wp-content/uploads/2026/07/post_127404_featured.webp"
sourceUrl: "https://bestmt4ea.com/pharaoh-gold-ea-mt4-free-download-7-powerful-facts-every-trader-must-know-before-installing/"
categories:
  - "Gold (XAUUSD) Trading"
  - "Gold EA & Robots"
categoryPaths:
  - "/category/gold-xauusd-trading/"
  - "/category/gold-ea-robots/"
tags: []
draft: false
quickAnswer: "You can verify a gold expert advisor before installing it in about five minutes: check who published the file, read its licence, trace where the download came from, see whether source code ships with it, hash the file, then attach it to a demo chart and read the Experts and Journal logs. None of that proves the strategy works. It tells you what you are about to run."
keyTakeaways:
  - "Six checks — publisher, licence, origin, source, hash, first-attach logs — plus a read of the EA's default inputs, cover almost everything knowable before installation."
  - "An .ex4 or .ex5 file is compiled and unreadable; if the publisher ships .mq4 or .mq5 source, you can read the logic and compile the build yourself."
  - "A SHA-256 hash is a fingerprint, not a safety certificate. It tells you two files match, which is how you catch a mirror site serving something else."
  - "The Experts and Journal tabs show what the EA really does on a demo chart: rejected stops, invalid lot sizes, wrong symbol names, and trades placed without a stop loss."
  - "Verification removes the unknown, not the risk. Even a clean file can lose money, so test on demo first and fund nothing you would need back."
faqs:
  - question: "How long does it take to verify a gold EA before installing it?"
    answer: "About five minutes for the six checks: publisher identity, licence, download origin, source availability, file hash and reputation, then a first attach on a demo chart to read the Experts and Journal logs. Reading the default inputs adds another minute. It is the cheapest part of the whole exercise, because everything you learn afterwards costs a demo or live account."
  - question: "Can antivirus software tell me if a free gold EA is safe?"
    answer: "No. Scanners detect known malware signatures, and a compiled MetaTrader EA is a small binary that most engines have never seen, so a clean scan says more about the scanner than the file. Antivirus can catch a bundled downloader, but it cannot see a missing stop loss, an averaging loop, or a broken session filter. Those are the things that actually cost money."
  - question: "What does an error 130 in the Experts log mean?"
    answer: "Error 130 means invalid stops: the EA sent stop-loss or take-profit prices your broker rejected, usually because the code ignores the symbol's minimum stop distance. It is one of the most common errors in free gold EAs, and behaviour that fails on a demo account fails the same way on a live one. Fixing it means changing the code or choosing a different EA."
  - question: "Is a free EA from a download site the same as the publisher's file?"
    answer: "Not necessarily. Mirror sites re-upload, rename, and sometimes re-bundle expert advisors, and you have no way to confirm the binary matches the author's build. The check is the SHA-256 hash: if the same version produces different hashes on two sites, at least one of them is not what the developer compiled. When the hashes disagree, download from the publisher's own page or repository."
  - question: "What are the warning signs that I should not install a gold EA?"
    answer: "No identifiable publisher, no licence text, a binary that requires DLL imports, different hashes on different mirrors, a Journal full of order errors, a default lot size with no stop loss, and any page that states a fixed monthly return. None of these prove the file is malicious, but together they mean you cannot price the risk before it reaches your account."
  - question: "Should I run a verified EA on a live account straight away?"
    answer: "No. Attach it to a demo account at the same broker, with the same symbol and account type, and let it trade its own defaults for at least a month before considering real money. Gold spreads widen sharply around news, so the conditions you test on demo are part of what you are verifying. Verification tells you what the file is, not whether its trading idea works."
sources:
  - label: "BAKOME Gold Scalper — open-source XAUUSD expert advisor (source repository)"
    url: "https://github.com/BAKOME-Hub/BAKOMEGoldScalper"
  - label: "MIT License — official licence text"
    url: "https://opensource.org/license/mit"
  - label: "VirusTotal — how file and hash reputation checks work"
    url: "https://docs.virustotal.com/docs/how-it-works"
  - label: "Microsoft — certutil reference (file hashing on Windows)"
    url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/certutil"
  - label: "MetaTrader 5 Help — automated trading and expert advisors"
    url: "https://www.metatrader5.com/en/terminal/help/algotrading"
primaryKeyword: "verify a gold EA before installing"
installSteps:
  - name: "Download the source from the repository"
    text: "Open the project repository and download Ultimate_ICT_Gold_Scalper_v3.0.mq5 from the main branch. You are taking the file from the author's own publication, which is the only origin the checklist treats as authoritative."
  - name: "Hash the file you downloaded"
    text: "Run certutil -hashfile Ultimate_ICT_Gold_Scalper_v3.0.mq5 SHA256 on Windows, or shasum -a 256 on macOS and Linux, and write the hash down. It is the fingerprint you compare against the repository if anything ever looks different."
  - name: "Compile it in MetaEditor"
    text: "Open the .mq5 file in MetaEditor and press F7 to compile. Compiling yourself means the expert advisor running on your chart was built from code you can read, rather than from a binary you have to trust."
  - name: "Attach it to a demo XAUUSD chart"
    text: "Open a demo account at the broker you intend to use, attach the expert advisor to an XAUUSD M5 chart, and enable AutoTrading. Use the demo to verify behaviour, not to judge profitability."
  - name: "Read the Journal and Experts tabs"
    text: "Look for load confirmation, symbol errors, invalid stop prices, and position sizing complaints. Then check the Trade tab to see whether opened positions carry a stop loss."
  - name: "Write the audit note and let it run"
    text: "Record the hash, licence, publisher, log findings and default inputs in one dated page, then leave the defaults untouched for several weeks on demo before deciding anything. Never fund an account you would need back."
download:
  origin: "opensource"
  license: "MIT"
  licenseUrl: "https://opensource.org/license/mit"
  author: "BAKOME-Hub"
  sourceUrl: "https://github.com/BAKOME-Hub/BAKOMEGoldScalper"
  version: "main"
  platform: "MT5"
  externalUrl: "https://github.com/BAKOME-Hub/BAKOMEGoldScalper"
  updatedAt: 2026-09-29
---

You have a file on your desktop. Maybe it is called `Pharaoh_Gold_EA.ex4`; the name changes every few months and the situation does not. There is no publisher you can look up, no source code, no licence, and no way to see what the file will do until it is already doing it. There is a screenshot of a rising equity curve above a download button, and a line telling you to attach it to a gold chart today.

That is the entire problem in one paragraph.

Attaching an expert advisor is not like adding an indicator. An indicator reads price data and draws on your screen. An EA can open orders, close orders, move stop losses, read your account balance and equity, write to your terminal's logs, and — if the terminal permits it — call external libraries through DLL imports. On a demo account, that is a simulation. On a live XAUUSD account at three in the morning, it is your money and your broker relationship, running unattended.

Most free gold EAs are not malware. That is not the reassurance it sounds like. The point is that you cannot tell the harmless ones from the rest before you install, and the free-EA market is built on exactly that gap: one binary renamed three times, uploaded to four mirror sites, wrapped in a fresh screenshot and a fresh promise.

**The five minutes before installation is the cheapest part of the whole exercise.** Everything you learn before the file runs costs you attention. Everything you learn after it runs costs you a demo account, a live account, or both.

The fastest way to see what that costs is one story. Rashid had traded XAUUSD for nine months when a friend forwarded him a `.ex4` in a Telegram group. Gold scalper. Ninety-two percent win rate. Free. The file was 240 KB. The group admin vouched for it. The screenshot showed a line that only went up.

He skipped the five minutes, and honestly, why wouldn't he? The file was small, the group was friendly, and the person who sent it had nothing obvious to gain.

On demo it worked. Six days, mostly green, no drawdown worth mentioning. So he funded a live account, installed it on a VPS, and left the defaults untouched.

Three weeks later, a US inflation release landed. Gold moved forty dollars in four minutes. The EA had no stop-loss input at all — the author called it "dynamic recovery". It added to a losing position twice while the spread widened from 18 points to 60, then sat still while the market walked away from it. By the London close, more than half the account was gone.

Here is the part that matters. Afterwards, Rashid spent eight minutes on three checks and found all of it in plain sight. The "developer" had no site, no name, and no history. The same file hash appeared on four unrelated download sites under three different names. And in the Experts tab, the EA had printed an order error on almost every attempt during those three weeks — nobody had read it, because the equity line was green.

None of that needed skill or experience. It needed five minutes of reading, before installation, while the information was still free.

You cannot verify a trading strategy in five minutes. Nobody can. What you can verify is a **file**: who published it, what rights came with it, where it actually came from, and what it does on the first attach. That is the whole job of this page.

## What can you actually check before you install a gold EA?

Six things, in a sequence that takes about five minutes in total: who published the file, what licence it carries, where the download really came from, whether source code ships with it, the file's hash and reputation, and what the Experts and Journal logs print the first time you attach it. None of those checks tells you whether the EA makes money. All of them tell you what you are about to run, before it costs you anything.

Here is the entire checklist on one screen. The sections that follow walk each line in order.

| # | Check | What a pass looks like | What a fail looks like |
|---|---|---|---|
| 1 | Publisher | A named person or company with a site, history or repository | No name anywhere, or a name that returns nothing |
| 2 | Licence and origin | Licence text, file taken from the publisher's own page | "Free download" with no terms, hosted on a mirror |
| 3 | Source code | Readable `.mq4` / `.mq5` you can compile | Binary only (`.ex4` / `.ex5`), no source |
| 4 | Hash and reputation | Identical SHA-256 everywhere, clean scan | Different hashes per mirror, a flagged file |
| 5 | First attach | Journal free of order errors, behaviour matching the description | Error 130, 131 or 4109 on every attempt |
| 6 | Defaults | Stop loss defined, sizing and risk stated | No stop-loss input, a recovery multiplier |

Notice what the list does not contain: any opinion about profitability. Judging the trading idea itself needs months of forward testing on your own broker. This page is about the part you can settle today, with evidence instead of hope.

Keep something open to write in while you run the checks. The output is not a feeling about the EA; it is a short record you can compare against the next version, and against the next file someone forwards you.

## Who published this gold EA, and can you prove they exist?

Check 1 is the publisher: a person or a company with a name, a history, and something to lose. If you cannot describe who made the file and where they publish in one sentence, you have already found your answer, and no amount of demo testing will change it.

A real publisher leaves fingerprints, and they are easy to spot once you know what to look for.

- A website or repository that has existed for more than a few weeks, with more than one page of substance.
- A name used consistently — the same handle on the site, in the source file header, and on any marketplace profile.
- A track record you can inspect: an MQL5 Market seller profile, a GitHub account with commits spread over months, a company registration, a support address that is not a disposable Telegram handle.
- Somewhere to complain. Serious developers answer questions in public, including the unglamorous ones.

The red flags survive a two-minute search, which is why they are worth two minutes.

- A domain registered this year, no company name, no address, and no human name attached to anything.
- An EA whose name changes between sites while the screenshots stay identical.
- Support that exists only inside a group where awkward questions get deleted.
- Performance screenshots with no broker name, no account number, no dates, and no drawdown visible.
- Any page that states a fixed monthly return. A verified third-party statement is evidence; a promise is marketing.

Where to look, in order: search the EA name together with the site name; check whether the developer has an MQL5 Market seller profile, since those are tied to a real identity and a payment method; check whether the site publishes terms or a licence page at all, because many do not; and open the EA's file properties to see whether an author name was ever compiled in.

None of this proves quality. It proves accountability, which is the only thing available at this stage. A publisher who exists can be asked questions and corrected in public. A file that appeared from nowhere can do neither, and when it misbehaves you have nobody to write to. For a sense of how much variation exists in this market, browse our [free gold EA and robot library](/free-download-forex-ea-indicator/) and compare the named projects against the anonymous ones.

## Where did the file come from, and what licence is attached to it?

Check 2 is origin plus licence, and they belong together, because a copy of a file carries no rights with it. There are only two legitimate origins for an expert advisor: the publisher's own site or repository, and a distributor the publisher actually named. Anything else is a copy, and a copy tells you nothing about what was inside the original.

Mirror sites exist to earn advertising revenue, and the cheapest way to fill a page is to re-upload someone else's file. Some rename it. Some re-bundle it with an installer, a "crack", or an "unlocked" build. You have no way to confirm that the binary they serve matches the one the author compiled, and a repackaged EA with a bundled loader is the classic route by which malware reaches a trading account.

Tracing a file back to its origin takes about three minutes.

1. Look at the exact filename and the date on the download page, then search the filename in quotes.
2. If the top results are three unrelated download blogs and no developer page, you are holding a copy.
3. Check whether the developer's own page links the file you downloaded. If it does, you found the origin. If it does not, you are on your own.

Licence comes next, and it is not paperwork. A licence is the legal statement of what you may do with the software. Four situations cover almost everything you will meet.

| Licence you see | What it means for you |
|---|---|
| MIT or Apache-2.0 | You may read, modify and redistribute the code, keeping the copyright notice |
| GPL-3.0 | The same freedoms, but any version you distribute must stay under GPL |
| Proprietary or commercial "demo" | Usually demo-only, no redistribution, sometimes no live use at all |
| No licence text at all | All rights reserved by default; "free to download" grants you nothing |
| "Unlocked", "cracked", "full version" | A breach of the author's terms; never run it |

Free and licensed are different words. A file can be free to download and still be a copy of a paid product with the serial removed, which means whoever distributed it already broke one agreement and has no reason to care about your account. If the licence is missing, assume the file is a copy of something commercial and treat the download page the way you would treat any reseller of stolen goods — as a reason to close the tab.

## Can you read the source, or are you trusting a sealed binary?

Check 3 decides how much you can ever know about the file. An `.ex4` or `.ex5` is compiled bytecode: you cannot read it, and decompiling it breaches most licences and risks running something different from what you inspected. If the publisher ships `.mq4` or `.mq5` source, you can read the logic and compile the build yourself, and that is a different category of product.

With source in hand, you can answer questions that no screenshot will ever answer.

- Where is the stop loss set, and what happens when it is not set at all?
- Is there an averaging loop that adds to losing positions?
- Does the code read the system clock to avoid Fridays or news windows?
- Does it import DLLs or call `WebRequest`?
- How many positions can it hold at once, and is that number capped?

Compiling is the part people skip. Open the file in MetaEditor and press F7. The `.ex4` that runs on your chart is then the output of the code you read, not a binary you have to trust. If the author also publishes a compiled build, compare its hash with a build of your own — if they differ, do not assume the source you read explains the binary you were handed.

Most free gold EAs on download blogs are binaries only, so the useful question becomes: how much surface can I close off?

- Open the EA's properties in MetaTrader and look at the Common tab. If the EA cannot load unless DLL imports or WebRequest are allowed, then something inside it wants system access you cannot audit.
- Refuse anything described as cracked, unlocked, or patched. Those builds are modified by definition.
- Treat a binary that has to run on a VPS with your broker credentials as what it is: an unreadable program with order permissions.

A sealed binary is not automatically bad, and plenty of commercial EAs ship that way and behave. But be explicit about what you are doing: you are trusting the publisher's competence and intent with no way to check either. Say that out loud before you click OK.

## Does the file hash and reputation check tell you anything useful?

Check 4 produces a fingerprint, not a verdict. A SHA-256 hash tells you whether two files are byte-for-byte identical, and a reputation service tells you whether anyone else has already reported that exact file. Both take a minute, and both are filters rather than certificates.

Hash the file yourself.

- Windows: `certutil -hashfile "Pharaoh_Gold_EA.ex4" SHA256`
- macOS or Linux: `shasum -a 256 Pharaoh_Gold_EA.ex4`, or `sha256sum` on Linux

Write the result down next to the filename. Then compare across sources. If the same version of the same EA produces different hashes on two download pages, at least one of them is not what the developer built, and the only safe move is to go to the publisher. The same trick works when a site quietly updates a file under an unchanged name — your recorded hash catches it.

For reputation, upload the file or the hash to a service like VirusTotal, and scan the download folder with Microsoft Defender. Read both results honestly. Compiled MetaTrader binaries are small and rare enough that most engines have nothing to match, so a clean report says more about the scanners than about the EA. A detection, on the other hand, is a stop sign: do not test it "just to see", delete it and find the original.

The limitation is worth stating plainly, because it is where this check fails people. No scanner can see a missing stop loss, an averaging loop, or a session filter that trades through the news. The most expensive things inside a gold EA are not viruses; they are ordinary code making unwise decisions. Checks 5 and 6 are where you find those.

One more expectation to set: almost every free EA is unsigned, and digital signatures are effectively absent from this market. That is exactly why Check 1 carries so much weight — with no cryptographic identity available, a public identity is the best substitute.

## What do the Experts and Journal logs show on the first attach?

Check 5 is the first ten minutes on a demo chart, and it is the only check that shows behaviour rather than paperwork. The Experts tab prints whatever the EA chooses to announce. The Journal tab prints what MetaTrader itself did. Read both before you look at the equity line, because the equity line cannot tell you why anything happened.

Open a demo account at the broker you intend to use, same account type and same gold symbol, then work through this in order.

1. Attach the EA to your XAUUSD chart and confirm AutoTrading is on. A smiley face in the corner means it is live; no smiley face means you are testing nothing at all.
2. In the Journal, find the "expert loaded successfully" line and read the path. Confirm it matches the file you hashed. If you audited one copy and MetaTrader loaded another, every later conclusion is worthless.
3. Read every error. Error 130, invalid stops, means the EA sent stop prices the broker rejected, usually because the code ignores the symbol's minimum stop distance — and it will fail the same way on a live account. Error 131, invalid volume, means lot sizes the broker will not accept. Error 134, not enough money, on a demo holding ten thousand dollars means the sizing logic is broken rather than the account being small. Error 4109, trading not allowed, is usually just AutoTrading switched off, so check the environment before blaming the file.
4. Watch the Experts tab for a rhythm. Printing on every tick is noise. Silence for twenty minutes is normal for a bar-based EA. Silence for two hours from an EA that claims to scalp every session means its time filter, its symbol check, or its entry condition never became true.
5. Check the symbol name against the code. Brokers list gold as `XAUUSD.pro`, `XAUUSDm`, or `GOLD`, and an EA that hard-codes `XAUUSD` will sit there doing nothing. The Experts log usually prints the symbol it looked for, which makes this a ten-second diagnosis.
6. Open the Trade tab and look at the SL and TP columns of the first positions. If both are empty, the EA is trading without a broker-side stop and its risk lives entirely inside code you may not be able to read.
7. Watch the first entry on live spreads. If it enters during the rollover window or a news spike with a 60-point spread, then the edge it showed you in a backtest is not the edge it will trade.

You can also run it through the Strategy Tester on XAUUSD, ideally with "every tick" modelling, but be clear about the purpose. That is a smoke test for crashes and identical behaviour, not a forecast. If you want the mechanics of that step, our walkthrough of [backtesting EAs online](/forex-tester-online-backtesting-with-eas-tutorial-the-ultimate-step-by-step-guide/) covers the settings in detail.

All of it on demo. If you find yourself debugging an EA on a live account, you have already spent the money the five minutes would have saved.

## What do the EA's own defaults tell you about its risk?

Check 6 reads the inputs before you change a single one. Defaults are a statement of intent from the author: the lot size, risk setting and stop parameters they shipped are what they expect the EA to run with. Your job here is not to optimise anything. It is to write down what the file will do the moment you press OK.

Record these values on the same page as the hash.

- **Lot size and RiskPercent**, and whether money management is switched on by default.
- **StopLoss** — a value of `0` does not mean "no risk"; it usually means the exit is managed somewhere in code, and you should find out where.
- **TakeProfit** — a profit target with no stop loss is a different strategy from the one being advertised.
- **MaxOpenTrades or MaxOrders** — how many positions can exist at once.
- **GridStep, Averaging, Multiplier** — any multiplier above 1 means your exposure grows after a loss.
- **TimeFilter** — which hours it trades, in the broker's server time, not yours.
- **MaxSpread** — whether it refuses to trade when gold spreads blow out.
- **DailyLoss or EquityStop** — a real equity stop is a feature; a line of marketing copy is not.
- **MagicNumber** — the identifier that lets you separate its trades from your own in the order list.

The most common fatal combination on gold is a wide default lot, no stop loss, and an averaging function. You can find all three in the input list in under a minute, and in the wrong order — after the first bad day — they cost a great deal more to discover.

No default is a defect by itself. Someone can run a grid or a recovery multiplier deliberately, with position sizing built around it. What makes defaults dangerous is meeting them for the first time after a loss, on a live account, with no idea how far the recovery ladder goes.

So leave them alone and let the EA trade its own plan on demo for a few weeks. If you later change a setting, understand that you have become the author of your own version: the description on the download page, and any review you read, no longer describes your setup. One exception: if the default position size would be reckless on your account, do not run the demo at that size either, because the point is to observe realistic behaviour.

## What should make you walk away in the first five minutes?

Most findings are questions. A few are answers. If the publisher cannot be identified, if there is no licence, if the only artefact is a binary that requires DLL access, or if every order attempt in the Journal lands on error 130, stop. You do not need to be clever to avoid the worst outcomes. You need to be quick to leave.

| Finding | What it means | What to do |
|---|---|---|
| No publisher name anywhere | Nobody is accountable for the file | Walk away |
| "Free" download with no licence text | Rights reserved by default; possibly a cracked copy | Do not run it |
| Binary only, and it needs DLL imports | Unreadable code with system access | Stop, find a source build |
| Different hashes on different mirrors | You do not know which file you have | Delete it, go to the publisher |
| Journal full of 130, 131 or 134 | Broken or broker-mismatched execution | Never on a live account |
| Default lot 1.00 with no stop loss | Sizing that cannot survive a normal gold move | Do not attach to live |
| A recovery multiplier you did not notice | Exposure grows after losses | Decide deliberately, or leave |
| A page promising a fixed monthly return | Marketing, not evidence | Treat everything there as unverified |

None of these findings proves the EA is malicious. They prove you cannot price the risk, and unpriced risk is the kind that takes an account apart in an afternoon. Walking away from a file costs nothing; walking away from an open position costs whatever the market decides.

## Should you keep a record of the checks you ran?

Yes — one dated page, kept next to the file. A five-minute check you did not record gets repeated from memory next time, and memory is generous to files that have not hurt you yet.

A usable audit note has nine lines: filename; SHA-256; the URL you actually downloaded from; licence and author; what you found about the publisher; the Journal lines from the first attach; default lot size, risk setting, and whether a stop loss exists; the broker and account type you tested on; and the date. Fill it in while the terminal is still open, because half of it stops being checkable the moment you close the chart.

That note connects to two habits worth building. The first is keeping a [trading journal and record template](/the-best-forex-trading-journal-template-excel-download-complete-guide-free-resources/) for the EA's behaviour, so demo results are comparable over time rather than remembered as impressions. The second is checking performance with actual numbers, which our round-up of [free tools for tracking MT4 EA performance](/top-10-free-tools-for-mt4-ea-performance-monitoring-powerful-ways-to-track-improve-results/) covers.

Re-run the checks when the version changes. A version bump is a new file with a new hash, and a download site that quietly replaces a file under the same name is precisely what your record was for.

## Is a clean checklist the same as a good strategy?

No, and this is the honest part of the page. The checks tell you what you are running; they say nothing about whether the idea behind it works. A file can pass all six and still lose money, because a market that behaved one way for two years can behave differently for the next two, and because spread, slippage and news gaps never appear in a marketing screenshot.

Verification removes the unknown. It does not remove the risk. Trading XAUUSD with leverage carries a high risk of losing money, and most retail accounts that try it do lose money — that is the base rate, not a scare line. Gold can move forty dollars in a few minutes around inflation data, and a strategy sized for a quiet Asian session can meet that with a position far larger than its rules ever assumed.

Demo-first is not a formality either. Run the EA on a demo at the same broker, with the same symbol and account type, for at least a month or roughly a hundred trades, and compare what it did against what the Strategy Tester said. If the two disagree, the difference is your broker's spread and execution, and it will not improve when real money is attached. Only then consider a live account, at the smallest size the broker allows, with a daily loss limit set before the first trade rather than after the first bad day. Never fund an account with money you would need back.

## What you get: an open-source gold EA you can read and compile

The download on this page is **BAKOME Gold Scalper** (BAKOMEGoldScalper), an open-source XAUUSD expert advisor published under the MIT licence with its logic in a single readable MQL5 file. Its job here is practical: it gives you a real gold EA to run all six checks against — publisher, licence, origin, source, hash, logs and defaults — without guessing, because you can open the code and find the stop loss yourself.

| Detail | Value |
|---|---|
| Project | `BAKOMEGoldScalper` (Ultimate ICT Gold Scalper) |
| Author | Bakome Fabrice Kitoko (BAKOME-Hub) |
| Licence | MIT — read, modify, redistribute, keep the notice |
| Source | A single `Ultimate_ICT_Gold_Scalper_v3.0.mq5` file |
| Platform | MetaTrader 5, since the repository ships MQL5 source |
| Market | XAUUSD |
| Timeframe the author suggests | M5 |
| Position handling | Risk-based position sizing with max-position and daily-risk caps; trailing stop, break-even and partial close |
| Inputs named by the author | ATR-based sizing, Silver Bullet kill-zone and session filters, a spread cap, trailing stop and break-even |
| Cost | Nothing |

Why this file, for this checklist: because Check 3 is normally the one you fail. Most free gold EAs arrive as a binary, so you spend the whole process guessing. Here you compile the source in MetaEditor yourself, and the build running on your chart was produced from code you can read line by line. The MIT licence makes the next step possible as well — you may change it, including adding a broker-side stop loss or tightening the session filter, and share your version as long as it stays under the same licence.

It is a repository rather than a vendor page, so you bring the plan and the code is the artefact. It does publish the author's own backtest figures, though, so read them the way you would any claim until you have reproduced them. If you want a second open-source project to practise the same checks on, our [library of open-source MT5 expert advisors](/geraked-mt5-expert-advisors-free-download/) is a reasonable starting point.

One honest note about platforms. The repository ships a single `.mq5` file, so plan for MetaTrader 5 and treat any `.ex4` build you find elsewhere as somebody else's modification. The README also suggests a minimum deposit and account type; those are the author's views, not recommendations, and your own risk plan should decide position size.

## What this download does not do

- It does not deliver a result. Any expert advisor, including this one, can lose money, and past behaviour on historical data is not a forecast of anything.
- It does not come with a verified track record. The repository publishes the author's own backtest numbers, not a broker-connected live account, so there is nothing to audit on performance — only on code.
- It is not a MetaTrader 4 file. The source is `.mq5`, so the honest path is MetaTrader 5 and a compile you run yourself.
- It does not remove gold's spread risk. Session and kill-zone filters reduce exposure to bad conditions; they cannot delete a forty-dollar gap or a 60-point spread.
- It does not replace your risk plan. Lot sizing, a daily stop, and the decision to fund an account are yours, and no input on the panel changes that.
- It does not come with support. This is a repository maintained by a developer, not a vendor with a help desk and a refund policy.

If you would rather start with something that draws instead of trades, our free [MT4 indicators and downloads](/free-download-forex-ea-indicator/) are a safer first experiment, and the [blog](/blog/) carries the rest of our setup guides.

## The next five minutes

You do not need a better checklist. You need to run this one once, before you install, and then keep running it on every file that lands in front of you.

Open the BAKOME Gold Scalper repository, download `Ultimate_ICT_Gold_Scalper_v3.0.mq5`, and put the sequence to work on it. Hash the file and write the hash down. Compile it in MetaEditor and confirm the build runs. Attach it to a demo XAUUSD chart with the defaults untouched, read the Journal line by line, and check the Trade tab for stop losses. Then record what you found on one dated page and leave it running for a few weeks before you decide anything.

Notice what that process gives you. By the end of the first evening you will know who wrote the code, what licence governs it, where the file came from, whether your broker accepts its orders, and how much it risks per position. That is more than most people know about an EA they have been running for a year.

The five minutes before installation is the cheapest part of the exercise, and the only part you can never get back once it is gone. Spend them here. Then let the remaining risk be the honest one: a trading idea that might not work, rather than a file nobody ever checked.

Trading gold and other leveraged instruments carries a high risk of losing money. Nothing on this page is financial advice, and no expert advisor — free, paid, or open source — changes that or promises a result.
