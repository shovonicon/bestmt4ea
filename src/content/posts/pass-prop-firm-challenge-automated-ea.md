---
title: "Passing a Prop Firm Challenge With an EA"
slug: "pass-prop-firm-challenge-automated-ea"
description: "What it takes to pass a prop firm challenge with an automated EA: rule mapping, sizing, buffers, the common failure points and the checks before the fee is."
publishedAt: "2026-08-21T18:00:00.000Z"
updatedAt: "2026-08-21T18:00:00.000Z"
draft: false
categories:
  - "Forex Risk & Money Management"
categoryPaths:
  - "/category/risk-money-management/"
seo:
  title: "Passing a Prop Firm Challenge With an EA"
  description: "What it takes to pass a prop firm challenge with an automated EA: rule mapping, sizing, buffers, the common failure points and the checks before the fee is."
quickAnswer: "Passing a prop firm challenge with an EA depends on fitting the system to the firm's rules: its daily and overall loss limits, its profit target and its trading rules. Map the rules into sizes and buffers, test the system against them, and check the costs before paying the fee."
primaryKeyword: "pass prop firm challenge ea"
keyTakeaways:
  - "Map the firm's loss and target rules into currency limits before choosing a size."
  - "Test the EA on the historical worst drawdown and the longest losing run."
  - "Keep a buffer below every firm limit, and stop for the day when the buffer is reached."
  - "Include the challenge fee and the refund terms in the cost of the attempt."
faqs:
  - question: "Can an EA pass a prop firm challenge?"
    answer: "Some can, but passing depends on the rules, the sizing and the market during the challenge. No EA is guaranteed to pass, and many challenges are failed."
  - question: "What is the most common reason for failing?"
    answer: "Breaching a daily or overall loss limit, often after increasing size following profits or trading through a bad day."
  - question: "Should I run an EA through a challenge without testing?"
    answer: "No. Test it on demo and against the firm's rules first, because a challenge fee is usually lost if the rules are breached."
  - question: "What happens to the fee if I fail?"
    answer: "Check the firm's refund and retry terms before paying. They differ between firms and can change."
sources:
  - label: "Our cent-account guide (minimum lots and small balances)"
    url: "https://bestmt4ea.com/cent-account-dollars-1-deposit-ea/"
  - label: "Our running-costs guide (costs that count against a challenge)"
    url: "https://bestmt4ea.com/ea-running-costs-spread-commission-swap/"
download:
  origin: own
  name: "Prop firm challenge EA playbook"
  license: "Free to use and share; provided without warranty"
  fileKey: "resources/prop-firm-challenge-ea-playbook.pdf"
---
<p>You have found a prop firm that offers the capital you need. You paid the evaluation fee. You installed what you thought was a highly profitable Expert Advisor. For three days, the account grew steadily. Then, a sudden market spike occurred. The EA held the losing trades, expecting a reversal. By the time the New York session closed, your account had breached the 5% daily drawdown limit. The challenge is over. The fee is gone.</p>

<p>This scenario is the reality for thousands of algorithmic traders every month. The problem is not necessarily the trading strategy itself; the problem is a fundamental mismatch between retail Expert Advisor design and the strict mathematical constraints of proprietary trading firm rule sets.</p>

<p>Passing a prop firm challenge requires more than just a high win rate. It requires an automated system engineered to respect hard equity limits, avoid consistency rule breaches, and survive slippage during high-impact news events. This guide will break down exactly how to evaluate, configure, and deploy a prop firm EA to navigate these restrictions without relying on luck.</p>

<h2>Quick Answer</h2>
<p>To pass a prop firm challenge with an automated EA, you must use a "prop firm safe" robot that features a hard stop loss on every trade, an equity-based daily loss circuit breaker set below the firm's maximum limit, and a news filter to avoid high-impact volatility. The EA must be configured to risk no more than 0.5% per trade, ensuring that a string of consecutive losses cannot mathematically breach the daily or overall drawdown rules before the system automatically halts trading.</p>

<h2>Key Takeaways</h2>
<ul>
<li>Prop firm rules prioritize capital preservation over aggressive growth; your EA must be configured to protect equity first.</li>
<li>An equity circuit breaker is mandatory. The EA must monitor real-time equity, not just closed balance, to prevent intraday limit breaches.</li>
<li>Martingale, grid, and hedging recovery strategies are highly likely to violate prop firm rules and result in immediate account termination.</li>
<li>Consistency rules prevent you from passing a challenge with a single "lucky" trade; your EA must be capable of generating distributed, steady returns.</li>
<li>Broker execution, spread, and slippage can trigger drawdown limits even if the EA's internal logic is flawless; a low-latency VPS is essential.</li>
<li>A prop firm safe forex robot allows granular customization of lot sizes, stop losses, and daily loss limits to match specific firm parameters.</li>
</ul>

<h2>The Hidden Trap of Prop Firm Challenges</h2>
<p>The proprietary trading industry has expanded massively, offering traders access to substantial capital without risking their own life savings. However, the business model of a prop firm relies on the statistical probability that most traders will fail the evaluation phase. The rules are designed to filter out reckless risk-taking, but they also inadvertently filter out poorly configured automated systems.</p>

<p>When you trade your personal account, a 10% drawdown is a painful but recoverable setback. When you trade a prop firm evaluation, a 5% daily drawdown or a 10% overall drawdown results in immediate liquidation. Retail EAs are often optimized for personal accounts where the trader can afford to let a floating loss recover over weeks or months. Prop firms do not allow this. They measure your risk in real-time equity.</p>

<p>If your automated system relies on wide stop losses, averaging down, or holding trades through major news events, it is only a matter of time before a standard market fluctuation triggers a rule violation. Understanding the exact mechanics of these rules is the first step in transitioning from a retail trader to a funded professional.</p>

<h2>Prop Firm Trading Rules Explained MT5</h2>
<p>Before you can configure a funded account expert advisor, you must understand the exact parameters the MT5 platform and the prop firm's surveillance systems are monitoring. While rules vary slightly between firms, the core architecture of prop firm evaluations remains consistent.</p>

<h3>1. Maximum Daily Drawdown (Daily Loss Limit)</h3>
<p>This rule calculates the maximum amount your account can lose in a single 24-hour period, typically reset at 5:00 PM EST (New York close). The limit is usually set at 4% to 5% of the initial balance.</p>
<p><strong>The MT5 Trap:</strong> Many EAs calculate daily loss based on the <em>closed balance</em>. Prop firms calculate daily loss based on <em>real-time equity</em> (Balance + Floating Profit/Loss). If your EA opens a trade, and a news spike causes a floating loss of 4.5%, the prop firm will close your account, even if the trade eventually recovers and closes in profit. Your EA must monitor equity, not just closed balance.</p>

<h3>2. Maximum Overall Drawdown</h3>
<p>This is the trailing drawdown or static drawdown limit, typically set at 8% to 12% of the initial account size. It represents the absolute floor your account equity cannot touch. If your equity touches this line at any millisecond, the account is breached.</p>

<h3>3. Consistency Rules</h3>
<p>Prop firms want to see a sustainable edge, not a gambler's luck. Many firms enforce a consistency rule stating that no single trading day can account for more than 30% to 50% of your total cumulative profit. If your EA has one highly volatile day that generates 60% of the total profit required to pass the challenge, the firm may invalidate the results or require you to trade further to prove consistency.</p>

<h3>4. News Trading and Weekend Holding Restrictions</h3>
<p>Most prop firms prohibit trading during high-impact news events (e.g., NFP, CPI, FOMC) usually defined as 2 minutes before and after the release. Additionally, holding trades over the weekend is often restricted due to gap risk and swap fees. An automated system must have built-in mechanisms to respect these time-based blackouts.</p>

<table>
<thead>
<tr>
<th>Prop Firm Rule</th>
<th>Typical Limit</th>
<th>How EAs Violate It</th>
<th>Required EA Feature</th>
</tr>
</thead>
<tbody>
<tr>
<td>Daily Drawdown</td>
<td>5%</td>
<td>Floating losses during news spikes; Martingale recovery.</td>
<td>Real-time Equity Circuit Breaker.</td>
</tr>
<tr>
<td>Max Overall Drawdown</td>
<td>10%</td>
<td>Wide stop losses; holding losing trades for weeks.</td>
<td>Hard Stop Loss per trade; Max floating loss limiter.</td>
</tr>
<tr>
<td>Consistency Rule</td>
<td>Max 30% per day</td>
<td>Over-leveraging on a single high-probability setup.</td>
<td>Daily profit cap; Fixed fractional risk.</td>
</tr>
<tr>
<td>News Restrictions</td>
<td>±2 Minutes</td>
<td>EA triggers market orders during low liquidity.</td>
<td>Integrated News Filter / Time Blackout.</td>
</tr>
</tbody>
</table>

<h2>Why Most Retail EAs Fail Prop Firm Evaluations</h2>
<p>If you attempt to pass a prop firm challenge with a standard retail EA downloaded from a generic marketplace, you are likely to fail. Here is the mechanical breakdown of why these systems are incompatible with proprietary funding.</p>

<h3>The Martingale and Grid Illusion</h3>
<p>Many commercial EAs showcase smooth, upward-sloping equity curves with a 95% win rate. Upon closer inspection, these systems use Martingale (doubling lot sizes after a loss) or Grid (opening multiple positions in the same direction without a stop loss) recovery methods. While these strategies can survive in a personal account with infinite margin, they are mathematically promised to breach a prop firm's 5% daily limit or 10% max drawdown limit during a strong trending market. Prop firms explicitly ban Martingale and Grid strategies, and their surveillance algorithms will flag the lot-size progression.</p>

<h3>Wide Stop Losses and Low Win Rates</h3>
<p>Some trend-following EAs use a 200-pip stop loss to avoid being stopped out by market noise. While this might work on a personal account, a string of just three or four consecutive losses will instantly breach the 5% daily drawdown limit on a standard prop firm account. Prop firm trading rules explained MT5 require tight, predictable risk parameters.</p>

<h3>Ignoring the Equity vs. Balance Discrepancy</h3>
<p>As mentioned earlier, if an EA's internal risk manager only checks the account balance at the end of the day, it is blind to intraday equity spikes. A sudden flash crash can push your equity down 6% in seconds, triggering a breach, even if your EA's internal "daily loss" counter only registers a 2% loss based on closed trades.</p>

<h2>What Makes a "Prop Firm Safe" Forex Robot?</h2>
<p>To successfully pass a prop firm challenge with an EA, the software must be engineered with institutional-grade risk management. When searching for a prop firm safe forex robot, you must verify the presence of the following features.</p>

<h3>1. Hard Stop Loss on Every Trade</h3>
<p>Every single trade opened by the EA must have a hard, unmovable stop loss sent to the broker server at the moment of execution. This ensures that even if the EA crashes or the VPS loses connection, the broker's server will close the trade at a predefined loss limit. This protects the overall max drawdown rule.</p>

<h3>2. Equity-Based Daily Circuit Breaker</h3>
<p>The EA must continuously poll the MT5 terminal for real-time account equity. You must be able to set a "Daily Loss Limit" parameter within the EA that is lower than the prop firm's actual limit. For example, if the prop firm allows a 5% daily loss, the EA's internal circuit breaker should be set to 3.5%. If equity drops by 3.5%, the EA immediately closes all open positions, flattens the account, and disables trading until the next daily reset. This creates a mathematical buffer for slippage and commission.</p>

<h3>3. News Filter and Time Blackouts</h3>
<p>A prop firm safe EA must include a news filter. This can be an integrated API that reads economic calendars and pauses trading 15 minutes before and after high-impact (red folder) events. Alternatively, it should allow the user to input manual time blackouts to avoid trading during illiquid hours or major announcements.</p>

<h3>4. Fixed Fractional Risk (No Martingale)</h3>
<p>The EA must use a fixed percentage of equity per trade (e.g., 0.25% or 0.5%). It must never increase lot sizes to recover losses. The risk per trade must remain static regardless of previous outcomes.</p>

<h3>5. Daily Profit Caps (For Consistency Rules)</h3>
<p>To avoid violating consistency rules, advanced EAs allow you to set a "Max Daily Profit" limit. If the EA reaches this target, it stops trading for the day. This forces the system to distribute profits evenly across multiple days, satisfying the prop firm's consistency requirements.</p>

<h2>How to Configure Your Prop Firm EA Settings</h2>
<p>Configuring an EA for a prop firm is an exercise in defensive mathematics. Let us walk through a practical framework for a standard $100,000 account challenge.</p>

<h3>The $100k Challenge Blueprint</h3>
<ul>
<li><strong>Initial Balance:</strong> $100,000</li>
<li><strong>Profit Target:</strong> $8,000 (8%)</li>
<li><strong>Max Daily Loss:</strong> $5,000 (5%)</li>
<li><strong>Max Overall Loss:</strong> $10,000 (10%)</li>
</ul>

<h3>Step 1: Define Risk Per Trade</h3>
<p>Never risk more than 0.5% of the initial balance per trade. On a $100k account, 0.5% is $500. Your EA's lot size calculator must be set to ensure that if the hard stop loss is hit, the loss is exactly $500.</p>

<h3>Step 2: Set the Equity Circuit Breaker</h3>
<p>Set the EA's internal daily loss limit to 3.5% ($3,500). Why 3.5% and not 4.9%? Because of slippage and commission. If you set it to 4.9%, a minor slippage event on a stop loss could push your actual broker equity to 5.1%, resulting in a breach. The 1.5% buffer is your safety net.</p>

<h3>Step 3: Configure the Hard Stop Loss</h3>
<p>Ensure the EA's maximum stop loss parameter is set to a logical technical level (e.g., 20 to 40 pips for a scalper, 50 to 80 pips for a day trader). Never allow the EA to open a trade without a stop loss.</p>

<h3>Step 4: Implement the Consistency Cap</h3>
<p>If the prop firm has a 30% consistency rule, set the EA's daily profit target to $2,000 (25% of the $8,000 total target). If the EA makes $2,000 on day one, it stops trading. This guarantees that no single day will ever exceed the consistency threshold, regardless of how well the market conditions align.</p>

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Prop Firm Limit</th>
<th>EA Configuration (Safe Buffer)</th>
<th>Purpose</th>
</tr>
</thead>
<tbody>
<tr>
<td>Risk Per Trade</td>
<td>N/A</td>
<td>0.5% ($500)</td>
<td>Ensures 10 consecutive losses only equal 5%.</td>
</tr>
<tr>
<td>Daily Loss Circuit Breaker</td>
<td>5% ($5,000)</td>
<td>3.5% ($3,500)</td>
<td>Prevents intraday equity spikes from breaching the hard limit.</td>
</tr>
<tr>
<td>Max Overall Trailing Stop</td>
<td>10% ($10,000)</td>
<td>8% ($8,000)</td>
<td>EA halts all trading if total account drawdown reaches 8%.</td>
</tr>
<tr>
<td>Daily Profit Cap</td>
<td>N/A</td>
<td>2.5% ($2,500)</td>
<td>Ensures compliance with consistency rules.</td>
</tr>
</tbody>
</table>

<h2>Common Reasons Automated Challenges Fail</h2>
<p>Even with a prop firm safe forex robot, traders frequently fail due to environmental and configuration errors. Understanding these pitfalls is critical to protecting your evaluation fee.</p>

<h3>1. Slippage During High-Impact News</h3>
<p>You set your stop loss at 30 pips. A major central bank announcement occurs. The market gaps 100 pips in a millisecond. Your broker executes your stop loss at 130 pips. Your EA thought the risk was $500, but the broker charged you $1,500. If this happens twice in one day, your daily limit is breached. <strong>Solution:</strong> Use a strict news filter to close positions before the event, or avoid trading the asset entirely during the blackout window.</p>

<h3>2. VPS Latency and Disconnections</h3>
<p>If your EA is running on a home PC, a brief internet outage or a Windows update can cause the MT5 terminal to disconnect. If the EA relies on virtual stop losses (managing the SL via code rather than sending it to the broker), a disconnection means your trades are left unprotected. <strong>Solution:</strong> Always use a dedicated Forex VPS located in the same data center as your prop firm's broker servers to ensure 99.9% uptime and minimal latency.</p>

<h3>3. Ignoring Commission and Swap Fees</h3>
<p>Some EAs calculate drawdown based on gross profit, ignoring the broker's commission and overnight swap fees. Over a 30-day challenge, swap fees on held positions can silently erode your equity, pushing you closer to the max drawdown limit without the EA realizing it. <strong>Solution:</strong> Ensure the EA monitors <em>net equity</em>, and prefer EAs that are designed for day trading or scalping to minimize swap exposure.</p>

<h3>4. Failing the "Trailing Drawdown" Math</h3>
<p>Many prop firms use a trailing drawdown that follows your equity up until it reaches the initial balance. For example, if you make $4,000 in profit, your max overall drawdown limit moves up from $90,000 to $94,000. If your EA is not aware of this trailing threshold, it might risk 1% per trade, unaware that the available "runway" to the breach level has shrunk. <strong>Solution:</strong> As your account grows, manually reduce the EA's risk per trade (e.g., from 0.5% down to 0.25%) to maintain a wide buffer from the trailing drawdown line.</p>

<h2>BestMT4EA: Finding a Funded Account Expert Advisor</h2>
<p>Finding a reliable funded account expert advisor requires looking past marketing claims and focusing on risk management architecture. At <a href="https://bestmt4ea.com/">BestMT4EA.com</a>, the focus is on providing MT4 and MT5 Expert Advisors that offer granular control over risk parameters, allowing traders to adapt the software to the strict realities of prop firm evaluations.</p>

<p>While no EA can guarantee a passing result due to the inherent unpredictability of the markets, the following systems offer the configurability required to implement the defensive strategies outlined above.</p>

<h3>Relevant BestMT4EA Products for Strict Risk Management</h3>

<h4>1. Onix Stratos XAUUSD EA (MT5)</h4>
<p><strong>Strategy:</strong> AI Smart Scalping</p>
<p><strong>Why it fits prop firms:</strong> Gold (XAUUSD) is highly volatile, making it dangerous for prop firm challenges if left unprotected. The Onix Stratos system is designed for smart scalping, meaning it aims to capture short-term momentum and exit quickly. Crucially, it supports hard stop losses and configurable risk parameters, allowing you to set strict equity circuit breakers to protect against Gold's sudden spikes.</p>
<p><a href="https://bestmt4ea.com/product/onix-stratos-xauusd-ea-ai-smart-scalper-for-mt5/">Review Onix Stratos XAUUSD EA</a></p>

<h4>2. Obsidian Aether EURUSD EA (MT5)</h4>
<p><strong>Strategy:</strong> AI Grid Scalping (Requires Strict Configuration)</p>
<p><strong>Why it fits prop firms:</strong> EURUSD is the most liquid pair, offering tight spreads and predictable behavior during the London and New York sessions. While grid systems can be risky, the Obsidian Aether EA includes advanced AI-driven risk management settings. To use this safely on a prop firm account, you must disable aggressive recovery modes and rely solely on the fixed fractional risk and hard stop loss parameters to ensure compliance with daily drawdown limits.</p>
<p><a href="https://strivealgo.com/product/obsidian-aether-eurusd-ea-ai-grid-scalper-for-mt5">Review Obsidian Aether EURUSD EA</a></p>

<h4>3. FXCore100 EA (MT4)</h4>
<p><strong>Strategy:</strong> Grid Scalping</p>
<p><strong>Why it fits prop firms:</strong> For traders who prefer the MT4 environment, the FXCore100 EA offers a structured approach to EURUSD scalping. It allows for detailed customization of trading sessions, meaning you can easily program the EA to avoid trading during high-impact US news events, satisfying the news filter requirement of most prop firms.</p>
<p><a href="https://bestmt4ea.com/product/fxcore100-ea/">Review FXCore100 EA</a></p>

<p><em>Note: Always verify the specific rules of your chosen prop firm before deploying any automated system. Ensure that the firm allows automated trading and that the specific strategy (e.g., scalping vs. grid) does not violate their terms of service.</em></p>

<h2>The Role of a VPS in Prop Firm Trading</h2>
<p>When you are trading a prop firm challenge, your infrastructure is just as important as your strategy. A Virtual Private Server (VPS) is not optional; it is a mandatory component of professional algorithmic trading.</p>

<h3>Why a VPS is Critical for Prop Firm EAs</h3>
<ul>
<li><strong>24/5 Uptime:</strong> Prop firm equity circuit breakers and trailing stop losses must be monitored continuously. If your home PC goes to sleep or loses power, your EA cannot protect your account.</li>
<li><strong>Latency Reduction:</strong> Prop firms often use specific broker servers. By hosting your MT5 terminal on a VPS located in the same Equinix data center (e.g., NY4 or NY5), you reduce execution latency to milliseconds. This minimizes slippage, ensuring your hard stop losses are executed at the price you expect, protecting your daily drawdown limits.</li>
<li><strong>Stability During News:</strong> High-impact news causes massive spikes in CPU usage on local terminals. A high-quality VPS ensures the MT5 platform does not freeze during the exact moments when your equity circuit breaker is most needed.</li>
</ul>

<h2>Broker Execution: Slippage, Spread, and Commission</h2>
<p>An EA is only as good as the execution environment it operates in. Prop firms route your trades through specific liquidity providers or brokerages. You must understand how these conditions affect your prop firm safe forex robot.</p>

<h3>Spread Expansion</h3>
<p>During the daily market rollover (5:00 PM EST) or major news events, spreads can widen by 10x or more. If your EA uses a pending order (like a Buy Stop), a widening spread can trigger the order prematurely at a worse price. <strong>Solution:</strong> Configure your EA to avoid opening new trades during the rollover hour and use market execution with strict equity monitoring.</p>

<h3>Commission Drag</h3>
<p>If your prop firm charges a commission per lot (e.g., $7 per round turn), a high-frequency scalping EA will suffer from commission drag. An EA that makes 50 trades a day to secure a 1% profit might actually be down 2% after commissions are factored into the equity. Always backtest your EA settings including the exact commission structure of the prop firm's broker.</p>

<h2>Risk Management and Financial Reality</h2>
<p>It is vital to approach prop firm trading with a clear understanding of the risks involved. Trading foreign exchange and CFDs carries a high level of risk and may not be suitable for all investors.</p>

<ul>
<li><strong>No Guarantees:</strong> No Expert Advisor, regardless of its historical backtest or live MyFxBook verification, can guarantee that you will pass a prop firm challenge. Market conditions change, and past performance is never a guarantee of future results.</li>
<li><strong>Loss of Evaluation Fee:</strong> You must be financially prepared to lose the fee paid for the prop firm evaluation. Treat this fee as the cost of doing business and acquiring data on your system's performance under strict constraints.</li>
<li><strong>Psychological Pressure:</strong> Even though the EA is automated, watching an account approach the daily drawdown limit can cause emotional interference. Traders often manually intervene, overriding the EA's logic, which usually leads to a breach. Trust your configuration and let the equity circuit breaker do its job.</li>
</ul>

<h2>Final Takeaway</h2>
<p>Passing a prop firm challenge with an automated EA is not about finding a secret algorithm that never loses. It is about mathematical survival. The prop firm trading rules explained MT5 are designed to test your ability to manage risk, not just your ability to predict direction.</p>

<p>By abandoning high-risk recovery systems, implementing strict equity circuit breakers, utilizing hard stop losses, and respecting the consistency rules, you transform your EA from a reckless gambler into a disciplined institutional tool. The goal is to protect the downside first; the upside will take care of itself.</p>

<p>If you are ready to approach proprietary funding with a systematic, risk-first methodology, review the configurable MT4 and MT5 Expert Advisors available at <a href="https://bestmt4ea.com/">BestMT4EA.com</a>. Compare the strategy, supported markets, and risk parameters, and configure your system to survive the strictest evaluations.</p>

<h3>Call to Action</h3>
<p>Stop losing evaluation fees to preventable rule breaches. <a href="https://bestmt4ea.com/">Explore the BestMT4EA catalog</a> to find a funded account expert advisor that gives you the granular control required to navigate prop firm restrictions. Configure your risk, deploy your VPS, and let the mathematics of disciplined automation work in your favor.</p>

<h2>Risk Disclosure</h2>
<p><strong>Important Risk Warning:</strong> Trading foreign exchange (Forex), gold (XAUUSD), and other Contracts for Difference (CFDs) carries a high level of risk and may not be suitable for all investors. The possibility exists that you could sustain a loss of some or all of your initial investment. Past performance of any Expert Advisor, backtest, or MyFxBook verified account is not indicative of future results. Proprietary trading firm challenges involve the risk of losing the evaluation fee. No Expert Advisor can guarantee profits or guarantee that a prop firm challenge will be passed. Always trade with capital you can afford to lose, and ensure you fully understand the risks involved. The content provided is for educational and informational purposes only and does not constitute financial advice.</p>

## Where to Go Next on This Site

A challenge is governed by rules, and the sizing that passes it has to fit those rules. Our [cent-account guide](/cent-account-dollars-1-deposit-ea/) shows how a minimum lot can change the risk a sizing rule produces, and the [running-costs guide](/ea-running-costs-spread-commission-swap/) shows the costs that count against a challenge result. The [demo-to-live guide](/demo-to-live-ea-migration/) covers what to check before a tested EA is used on any funded account.

For the rest of this topic on our site, see [our broker terms guide](/do-brokers-allow-eas-and-scalping/).
