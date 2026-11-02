---
title: "Fix Compile Errors in MQL4 & MQL5: A Step-by-Step Guide"
slug: "how-to-fix-compile-errors-in-mql4-complete-step-by-step-guide"
description: "Your EA or indicator will not compile in MetaEditor. This guide decodes the errors you will actually meet, in the order to fix them, for MQL4 and MQL5."
publishedAt: 2026-10-22
updatedAt: 2026-10-22
categories:
  - "EA Settings & Optimization Guides"
categoryPaths:
  - "/category/mt4-mt5-expert-advisors/ea-settings-optimization/"
tags: []
draft: false
quickAnswer: "Most MQL4 and MQL5 compile errors come from a short list of causes: a misspelled or undeclared name, a missing include file, MQL4 code compiled as MQL5, unbalanced brackets, or a function called with the wrong number of arguments. Fix the first error in the list, recompile, and repeat, because later errors are usually echoes of the first one."
keyTakeaways:
  - "Fix errors from the top of the MetaEditor list downwards: the first error is normally the cause and the rest are consequences."
  - "An .mq4 file is not an .mq5 file. Code written for one language needs real conversion, not a rename, before it compiles in the other."
  - "Warnings do not block compilation. A file with warnings still produces a working .ex4 or .ex5 you can attach to a chart."
  - "Never edit a purchased EA's risk logic to silence an error. If the file does not compile as delivered, that is the vendor's bug to fix."
  - "Keep the compiler's build number and the first error line when you contact a vendor: it is everything a developer needs to reproduce your problem."
faqs:
  - question: "Why does my EA show errors when I open it in MetaEditor but the seller says it works?"
    answer: "Usually a version or language mismatch. The seller compiled it in a different MetaEditor build, or the file is MQL5 while you opened it in MT4's editor, or an include file the code needs was not in the folder you received. Check the language first, then the Includes folder, then ask the seller which build they compiled with."
  - question: "What is the difference between an error and a warning in MetaEditor?"
    answer: "An error stops compilation and no executable file is produced. A warning is advice about risky or sloppy code, such as a possible data loss in a type conversion, and the file still compiles. Vendors ship code with warnings all the time; errors are the blocker."
  - question: "Can I convert an MQL4 EA to MQL5 by changing the file extension?"
    answer: "No. The trading functions, order model and event handling differ between the two languages. Renaming .mq4 to .mq5 produces a pile of undeclared identifier and wrong parameter errors because MQL5 does not contain the MQL4 order functions at all. A real conversion rewrites the trade logic."
  - question: "MetaEditor says it cannot open an include file. Where do include files go?"
    answer: "Include files have the .mqh extension and belong in the Include folder of your data directory: MQL4/Include for MT4 or MQL5/Include for MT5, keeping any subfolder structure the vendor used. Open the data folder from File, Open Data Folder inside the terminal rather than guessing a path in Program Files."
  - question: "I fixed one error and ten more appeared. Did I break it?"
    answer: "Probably not. The compiler stops understanding the code at the first serious problem, so one missing bracket can hide or invent errors further down. Keep fixing the first error in the list and recompiling. The total count often jumps before it collapses."
  - question: "Should I edit a purchased EA's code to make it compile?"
    answer: "Only trivial, safe things you fully understand, such as correcting a file path. Do not touch lot sizing, stop logic, martingale steps or licence checks. If a commercial file does not compile as delivered, send the vendor the first error and your MetaEditor build number and let them fix their own code."
sources:
  - label: "MetaQuotes: MQL4 language documentation"
    url: "https://docs.mql4.com/"
  - label: "MetaQuotes: MQL5 language documentation"
    url: "https://www.mql5.com/en/docs"
  - label: "MetaQuotes: MetaEditor guide"
    url: "https://www.metatrader5.com/en/metaeditor/help"
primaryKeyword: "how to fix compile errors in MQL4"
download:
  name: "MQL4/MQL5 Compile Error Fix Guide"
  origin: "own"
  license: "Free to use, print and share with credit to bestmt4ea.com"
  version: "1.0"
  fileKey: "resources/mql-compile-error-fix-guide.pdf"
installSteps:
  - name: "Open the failing file in MetaEditor"
    text: "Open MetaEditor from your terminal (F7) and open the .mq4 or .mq5 file that is failing."
  - name: "Compile and read the first error"
    text: "Press F7 or click Compile and read the Errors tab from the top; double-click the first error to jump to its line."
  - name: "Fix the first error only"
    text: "Fix only the first error using the matching section of this guide, then compile again and read the new first error."
  - name: "Place the compiled file in its folder"
    text: "When the result line shows 0 errors, find the new .ex4 or .ex5 beside the source file and copy it into the Experts or Indicators folder."
  - name: "Verify on a demo chart"
    text: "Restart the terminal or refresh the Navigator, attach the file to a demo chart, and confirm the Experts log shows it initialised without errors."
---

You pressed Compile and MetaEditor answered with a wall of red. Maybe you bought an expert advisor and the source file will not build. Maybe a free indicator from a forum came with code that fails on your machine. Maybe your own small edit to a working EA broke it, and now the error list is longer than the code you changed. Whatever brought you here, the situation is the same: until the file compiles, nothing else about the strategy matters, because a file that does not compile cannot run at all.

The good news is that compile errors are the most mechanical problem in MetaTrader. The compiler is not judging your trading. It is reading text, following strict grammar rules, and stopping at the first place the text breaks those rules. Almost every failed compile you will ever see traces back to a short list of causes: a name the compiler does not recognise, a missing include file, code written for the other language, a bracket that never closes, a function called with the wrong arguments, or a value used as the wrong type. This guide works through each of them in the order you should attack them, for both MQL4 and MQL5, and it ends with the judgement call that matters most: when to stop fixing and send the file back to the person who sold it to you.

## First, learn how the compiler talks to you

Open the file in MetaEditor and press Compile. The Errors tab at the bottom shows each problem with a description, the file name, and a line and column number. Three habits will save you more time than any single fix in this guide.

The first habit is to always start at the top. Double-click the first error and MetaEditor jumps to the exact line. Fix that one thing, compile again, and read the new list from the top. The reason is how compilers work: once the code stops making sense at one point, everything after it is guesswork. A missing closing brace on line 40 can produce thirty errors between lines 60 and 400, none of which exist once line 40 is repaired. Fixing errors in any other order is chasing echoes.

The second habit is to separate errors from warnings. An error means no executable file was produced: there is no .ex4 or .ex5 to attach, or the one in your folder is the old build from before your change. A warning means the compiler disliked something, often a possible precision loss when converting between number types, but still produced a working file. Beginners burn hours polishing warnings on a file that already compiles while the actual error sits two lines above. Errors first, warnings when you have spare time and curiosity.

The third habit is to read the summary line after each compile. It tells you the count of errors and warnings and, on success, the name of the file produced. When it says zero errors, your new executable is sitting next to the source file with the same name and a different extension. That is the file that goes into the terminal, not the source.

## Error family one: names the compiler does not know

The single most common error in both languages is "undeclared identifier", followed by its close cousin "unexpected token". The compiler met a word it does not recognise as a variable, a function, or a keyword. There are four usual reasons, and you can check them in under a minute.

Spelling and capitalisation come first. MQL4 and MQL5 are case-sensitive: `lotSize` and `Lotsize` are two different names to the compiler. Compare the failing line character by character with the place the variable is declared, which is normally near the top of the file or just above the function that uses it. Copy and paste the name rather than retyping it, because the mistake is usually invisible to the eye that made it. For the next step, read [Gold Scalping EA for Beginners: Low Drawdown, Real Rules](/7-best-top-gold-scalping-ea-for-beginners-with-low-drawdown-ultimate-safe-trading-guide/).

Second, the variable may genuinely never be declared. This happens when code was copied from a forum post and a piece was left behind, or when a vendor shipped a partial file. Search the whole file for the name (Ctrl+F). If it appears only where it is used and never on the left side of a declaration such as `double`, `int` or `string`, the declaration is missing and you add it above the first use, choosing the type from how the value is used: prices and lots are `double`, counts are `int`, text is `string`.

Third, the name may belong to a function defined in an include file that is not loading, which takes you to the missing-include family below. If several undeclared identifiers appear at once and they all sound like parts of a library, such as order helpers or string utilities, suspect the include before you suspect each name.

Fourth, and most important for buyers of second-hand code, the name may be an MQL4 function being used inside MQL5, or the reverse. That deserves its own section, because it is the biggest single cause of "the seller says it works" failures.

## Error family two: MQL4 code inside MQL5, and the reverse

MQL4 and MQL5 look alike. They are both C-like, they share many keywords, and a page of one can pass for the other at a glance. Underneath, their trading models are completely different, and the compiler knows it instantly.

MQL4 works with orders: functions such as `OrderSend`, `OrderSelect`, `OrderModify` and `OrderClose` manage a pool of individual orders, each with a ticket number. MQL5 works with positions and deals, and its built-in functions are different: you trade through the `CTrade` class, or through `OrderSend` used with a completely different request structure, and you read state with `PositionSelect` and position properties instead. When MQL4 code is opened in MT5's editor, the compiler reports the classic MQL4 function names as undeclared identifiers, because in MQL5 those functions simply do not exist. Dozens of errors naming familiar trading functions is the signature of a language mismatch, not of broken code.

The fix is not a rename and not a find-and-replace. Changing the file extension from .mq4 to .mq5 converts nothing. A genuine conversion rewrites every trade operation, replaces the order-selection loops with position logic, and adjusts how history is read, because MQL5 separates orders, deals and positions where MQL4 merged them. Indicators convert far more easily than EAs, because drawing code is similar in both languages; a simple indicator might need only small changes, while a trading robot needs its core rebuilt.

So the practical rules are these. If you bought an EA, confirm before purchase which platform the file is for, and treat an .ex4 as MT4-only and an .ex5 as MT5-only, because the compiled files are never interchangeable. If a seller sends you source and it fails with a screen of undeclared trading functions, you have almost certainly been sent the other platform's code, and the correct move is to ask for the right file, not to attempt a conversion of a product you paid for. If the code is a free indicator and you want to try converting it yourself, work on a copy, expect to replace the buffer and drawing calls that changed between versions, and test the result against the original side by side, because a conversion that compiles can still draw different values.

## Error family three: the missing include file

Many EAs and indicators are not one file. The main file pulls in libraries with lines near the top that look like `#include <Trade\Trade.mqh>` or `#include "MyLibrary.mqh"`. Those .mqh files must exist in a place the compiler looks: the Include folder inside your terminal's data directory, meaning MQL4/Include or MQL5/Include, or the same folder as the main file for quoted local includes. When one is absent, MetaEditor reports that it cannot open the file, and then adds a string of undeclared identifier errors for everything the library was supposed to provide. If this topic is new to you, [Best Free Alternatives to TradingView for Custom Indicators](/best-free-alternatives-to-tradingview-for-custom-indicators/) covers the basics.

Fix it methodically. Read the error: it names the missing file exactly. First, check whether the file arrived with your download and simply landed in the wrong place; vendor packages often contain an Include folder whose contents need to be copied into your data folder's Include directory, preserving any subfolders. Open the data folder through the terminal itself (File, then Open Data Folder) because the real data directory is rarely the Program Files path people guess. Second, if the include is one of the standard library files that ship with the terminal, such as the Trade classes in MQL5, its absence points to a damaged installation, and updating the terminal from MetaQuotes is the honest cure. Third, if the file is the vendor's own library and it simply was not in the package, stop: you are missing a part of the product, and the vendor needs to send it. Do not download a same-named .mqh from a random site and drop it in. Include files are code, they run with the same powers as the EA itself, and a stranger's library is a security risk as well as a version mismatch waiting to happen.

## Error family four: brackets, and the error that lies about its line

The "unexpected token" and "expression has no effect" family, and errors that point at a line which looks perfectly fine, usually share one cause: somewhere above, a bracket or a quote never closed, so the compiler is reading your code with the sentences joined together wrongly. A missing `}` at the end of a function makes the next function look like it is written inside the first one. A missing `"` makes half a line of code get swallowed as text. A missing `;` makes two statements fuse into one long expression the compiler cannot parse.

MetaEditor gives you the tool for this: place the cursor on any bracket and its matching partner lights up. When you suspect structure, go to the function named near the first error and walk its brackets from the opening one, confirming each pair closes where you expect. Indentation is your second tool. Code whose closing brackets do not line up with the indentation of the lines they close is telling you where the structure slipped, because the author indented by structure even when the structure later broke. And if you recently edited the file, look at your own edit first. Compilers fail on the file as it is, but humans break files at the point they touched them, and an honest look at the last change finds most self-inflicted bracket and semicolon errors in seconds.

There is a cousin worth naming: the error that names a line inside a standard include file rather than your code. That almost never means the standard file is broken. It means your code called something in it with arguments the current version does not accept, which leads directly to the next family.

## Error family five: wrong arguments and wrong types

"Wrong parameters count" means a function was called with more or fewer values than its definition accepts. This appears when vendor documentation and vendor code disagree, when a standard library was updated and a call written for the older version survives in the file, or when you paste a call from an example written for a different function with a similar name. The fix is to compare the call with the definition: press F1 with the cursor on the function name for built-ins, or find the function's own definition in the file or its include for custom ones, and match argument by argument, including order. Optional arguments can be omitted, but an omitted middle argument is not allowed just because a later one is optional.

Type errors are the gentler relatives: assigning a price into an integer variable, adding a string to a number, passing a whole array where a single value belongs. MQL is strict because trading code handles money, and a silent conversion can cost real money: a price of 1.08552 stored in an `int` becomes 1, and a stop loss computed from it is fiction. When the compiler warns about possible data loss on a line involving prices, lots or stops, treat that specific warning as an error in your head even though the compiler let it pass, and check what the line is really doing.

Array errors deserve one practical note because they show up after a successful compile, in the Experts log at runtime rather than in the editor: "array out of range" means the code asked for an element that does not exist, most often reading indicator or price data before enough bars have loaded. If an EA compiles cleanly but throws this in the log on a fresh chart, give it history: scroll the chart back, wait for bars to load, and check whether the code waits for a minimum number of bars before it starts. That behaviour is a code quality clue about the whole product.

## When the file compiles but still will not run

A clean compile produces a file; it does not promise the terminal will use it well, and three post-compile failures are worth knowing so you do not mistake them for compile problems. The first is the wrong folder: the .ex4 belongs in MQL4/Experts for a robot or MQL4/Indicators for an indicator, and the .ex5 mirrors that under MQL5. A file in the wrong folder simply never appears in the Navigator. Refresh the Navigator or restart the terminal after copying. The second is the stale file: you compiled successfully but the chart is still running the older build because the EA is already attached. Remove and re-attach it, or restart, and confirm the build date in the Experts log's initialisation line. The third is the platform wall: an .ex4 will never run on MT5 and an .ex5 will never run on MT4, no matter which folder you choose. If you only have the compiled file and it is for the wrong platform, no setting fixes that; you need the other build from the vendor. Compare this with [Disable Your MT4 EA During News: 9 Methods Compared](/how-to-disable-mt4-ea-during-news-events-9-powerful-methods-for-safer-trading/) before you decide.

## A worked example: nine errors, one cause

Abstract rules land better after one concrete walk-through, so here is the shape of a real session. A trader downloads a free MQL4 indicator, opens the source in MetaEditor, presses Compile, and gets nine errors. The first reads: undeclared identifier, pointing at a name used to store the indicator's period setting. The next several errors name other settings from the same block of inputs, and the last few complain about functions with names that sound like helpers.

Nine errors, but the pattern gives it away: everything missing belongs to one family, the settings and helpers, and families live together. Scrolling to the top of the file shows the input declarations commented out with `//` at the start of each line, something forum software or a careless copy-paste did when the code was posted. The helper functions were inside a block that got commented along with them. Removing the stray comment markers from the declaration block, and only from there, takes the next compile to zero errors and one warning. Total time, once you know to read the shape of the list instead of its size: about four minutes, most of it scrolling.

The lesson generalises. Before fixing anything, spend thirty seconds reading the whole list and asking what the errors have in common: same area of the file, same kind of name, same function. Errors that share a cause announce themselves as a family, and families are fixed at their root, which is nearly always at or before the first error in the list. The traders who struggle with compile errors are not missing knowledge of any particular error. They are fixing error number six while error number one quietly regenerates it.

## Why a working file breaks after a terminal update

The most confusing compile failure is the one where nothing changed in the file. You compiled it last year, it worked, the terminal updated itself, and now the same source produces errors. This is real, and it has a specific mechanism: MetaQuotes periodically tightens the language. Functions are deprecated and eventually removed, type conversions that were once automatic become warnings and then errors, and reserved words grow as new features take names that old code may have used for variables. An EA that used a perfectly legal variable name in an old build can collide with a keyword in a new one.

There are three sane responses. The first is to read the first error with fresh eyes, because update breakage is usually shallow: a renamed function here, a stricter conversion there, each fixable in a line or two, and the compiler's message often names the modern replacement. The second is to keep your own archive: whenever a file compiles cleanly, keep a copy of the source, the compiled file, and a note of the MetaEditor build number that produced it. Rebuilding an old EA after an update then starts from a known-good state instead of from memory. The third, for purchased products, is to treat update breakage as a support event: a vendor who still sells the EA owes you a build that compiles on the current terminal, and "use an old terminal version" is not a support answer, because old builds eventually stop connecting to broker servers at all.

What you should not do is hunt the internet for an ancient MetaEditor installer to freeze your setup in time. It postpones the problem while adding a security problem, since old terminal builds stop receiving fixes. Code that cannot survive its platform's updates is a liability in a trading account, and learning that from a compile error is cheaper than learning it from a missed stop.

## Prevention: keeping a library that never scares you

Most compile pain is organisational, not technical. Four habits keep a personal library of EAs and indicators in a state where errors are rare and small. Keep source and compiled files together, in the same folder per product, so you always know which .mq4 made which .ex4. Keep the vendor's original download untouched in an archive folder and edit only copies, so any experiment can be abandoned by recopying the original. Name your own modified copies with the date in the file name, because "final", "final2" and "really_final" is not a versioning system. And compile every new file the day it arrives, even if you plan to test it next month: a broken delivery reported to a vendor in the first week is a refund conversation, while the same discovery in month three is an argument.

None of this requires programming skill. It requires treating code files with the same record-keeping discipline you would apply to account statements, for the same reason: when something goes wrong, the person investigating will be you, later, with less memory of the details than you have today. You can also check [EA Not Working? The MT4 & MT5 Fix List, Updates Included](/mt4-ea-not-working-after-update-fix-best-proven-solutions/) for a second view.

## Keeping a personal error notebook

There is one habit that separates traders who fear MetaEditor from traders who barely notice it, and it costs almost nothing: a notebook, paper or plain text file, in which every compile error you solve earns a three-line entry. The error text, copied exactly as the compiler phrased it. The file and the cause. And the fix, in your own words, short enough that future-you can apply it without thinking.

The reason this works is that your error history is far more repetitive than it feels in the moment. The same half-dozen causes produce nearly every failure you will ever meet, but they arrive wearing different file names and different line numbers, and memory is poor at recognising the family resemblance. A notebook makes the resemblance impossible to miss. The third time you write "undeclared identifier — include file missing from data folder" you will never spend twenty minutes on it again, because the recognition happens at the first line of the list instead of the last.

Keep the notebook beside your library archive, and add two columns of discipline to it. Note the MetaEditor build number for each entry, because the day an update changes the language, your notebook is what tells you whether this error is an old friend or a new arrival wearing similar clothes. And note whether the file was yours, free, or purchased, because a purchased product that keeps appearing in your notebook is generating the evidence for a refund or support conversation all by itself. Fifteen honest entries will teach you more about your own setup than any course, because they are a map of the specific ways your specific files break — and maps of your own territory are the only kind that never go out of date.

## The judgement call: fix it yourself or send it back

Everything above is for code you own, code that is free, and small accidents in files you understand. A commercial EA you bought this week is a different matter. If it does not compile as delivered, the product is faulty in a way the vendor can reproduce from two pieces of information: the first error line and your MetaEditor build number, shown in the editor's About window. Send those, with the exact file name you opened. Do not let support talk you into editing position sizing, removing licence checks, or replacing library files with ones from a chat message; each of those moves you further from the product that was tested by whoever wrote it, and quietly transfers the blame for the next failure onto you.

Keep your own changes to purchased code in the narrow lane: file paths, chart defaults, and nothing that decides how much money is risked or when trades open and close. And keep notes. The settings record habit that good traders keep for inputs applies doubly to code: if you changed it, write down what and why, or the next compile error will find you trying to remember which version of the file ever worked. A compile error is annoying for an afternoon. An undocumented change is a mystery that returns every few months for the life of the product.

One last reassurance for the reader who arrived here frustrated: a compile error is the cheapest failure in trading. It costs you an afternoon at worst, it announces itself in plain text, and it happens before any money is involved. The same cannot be said for most of the ways an EA can disappoint you. If this stage feels tedious, that is the platform doing its one undeniably kind thing: refusing to run code it cannot understand, loudly, in advance, for free.

The through-line of every fix in this guide is patience with order: first error first, one change at a time, recompile and read again. The compiler is strict, literal and completely without malice, which makes it the easiest counterparty you will ever deal with in this market. Learn its half-dozen favourite complaints and the wall of red turns back into what it always was: a short list, in order, that ends.
