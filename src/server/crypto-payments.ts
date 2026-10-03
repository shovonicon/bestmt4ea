/**
 * USDT (TRC20) payment engine — pure, Astro-free, environment-free.
 *
 * This is the whole of §6b that can be reasoned about without a database or a
 * network: how a per-order amount is minted, how a transfer is checked, and how
 * a batch of transfers is matched against the orders waiting for them. The DB
 * orchestration and the cron that calls TronGrid layer on top of this.
 *
 * The rules are deliberately strict, because they are the difference between a
 * paid order and a lost one:
 *   - only the official USDT contract is accepted (never a symbol from a response);
 *   - the receiver must be our address, and the transfer must be confirmed;
 *   - an underpayment never settles;
 *   - an overpayment *does* settle the order — the customer paid at least what was
 *     asked, so the payment completes; the closest order is chosen when several
 *     are open, and an exact match always wins over an overpayment;
 *   - a txid settles at most one order, ever;
 *   - one candidate settles, several is `ambiguous`, none is `no_match`;
 *   - an expired order is flagged, never silently re-used.
 */

import { randomInt } from '../lib/crypto';
import type { TokenTransfer } from './tron';

/** Official Tether USDT contract on TRON mainnet. */
export const USDT_TRON_CONTRACT = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';
export const USDT_DECIMALS = 6;
export const DEFAULT_PAYMENT_TTL_MS = 30 * 60 * 1000;

/** Convert a raw token integer string to a decimal string: `'49037000'` → `'49.037'`. */
export function unitsToDecimal(rawValue: string, decimals = USDT_DECIMALS): string {
  const value = String(rawValue).trim();
  if (!/^\d+$/.test(value)) throw new Error(`unitsToDecimal: not an integer string: ${rawValue}`);
  const padded = value.padStart(decimals + 1, '0');
  const whole = padded.slice(0, padded.length - decimals);
  const fraction = padded.slice(padded.length - decimals).replace(/0+$/, '');
  return fraction ? `${whole}.${fraction}` : whole;
}

/** Exact decimal comparison at 6 dp. */
function toMicro(amount: string): bigint {
  const value = String(amount).trim();
  if (!/^\d+(\.\d+)?$/.test(value)) throw new Error(`toMicro: not a decimal amount: ${amount}`);
  const [whole, fraction = ''] = value.split('.');
  const paddedFraction = (fraction + '000000').slice(0, 6);
  return BigInt(whole) * 1_000_000n + BigInt(paddedFraction);
}

export type AmountComparison = 'under' | 'exact' | 'over';

export function compareAmounts(expected: string, received: string): AmountComparison {
  const want = toMicro(expected);
  const got = toMicro(received);
  if (got < want) return 'under';
  if (got > want) return 'over';
  return 'exact';
}

/**
 * Mint this order's expected amount: the base price plus a small identifier, so
 * two shoppers paying the same price at the same time do not collide.
 *
 * `4900` cents + identifier `37` → `'49.037'`.
 */
export function expectedAmountFromCents(baseCents: number, identifier: number): string {
  if (!Number.isInteger(baseCents) || baseCents <= 0) {
    throw new Error(`expectedAmountFromCents: bad baseCents ${baseCents}`);
  }
  if (!Number.isInteger(identifier) || identifier < 1 || identifier > 999) {
    throw new Error(`expectedAmountFromCents: identifier must be 1..999, got ${identifier}`);
  }
  const milli = baseCents * 10 + identifier; // amount * 1000
  return (milli / 1000).toFixed(3);
}

/** A fresh 1..999 identifier. */
export function randomIdentifier(): number {
  return randomInt(999) + 1;
}

export function isExpired(expiresAt: number, now: number, graceMs = 0): boolean {
  return now > expiresAt + graceMs;
}

export type VerifyFailure =
  | 'wrong_contract'
  | 'wrong_receiver'
  | 'not_confirmed'
  | 'underpaid'
  | 'invalid_amount';

export type VerifyResult =
  | { ok: true; amount: string; comparison: 'exact' | 'over' }
  | { ok: false; reason: VerifyFailure };

export interface VerifyInput {
  transfer: TokenTransfer;
  expectedAmount: string;
  receivingAddress: string;
  contractAddress?: string;
  /** Default true — only a finalised transaction may settle. */
  requireConfirmed?: boolean;
}

/**
 * Check a single transfer against one order's expectations.
 *
 * Duplicate-txid is *not* decided here: it depends on other rows, so it belongs
 * to the matcher (below) which holds the set of spent txids.
 */
export function verifyTransfer(input: VerifyInput): VerifyResult {
  const contract = input.contractAddress ?? USDT_TRON_CONTRACT;
  const { transfer } = input;

  if (transfer.tokenAddress.toLowerCase() !== contract.toLowerCase()) {
    return { ok: false, reason: 'wrong_contract' };
  }
  if (transfer.to.toLowerCase() !== input.receivingAddress.toLowerCase()) {
    return { ok: false, reason: 'wrong_receiver' };
  }
  if ((input.requireConfirmed ?? true) && !transfer.confirmed) {
    return { ok: false, reason: 'not_confirmed' };
  }

  let amount: string;
  try {
    amount = unitsToDecimal(transfer.rawValue);
  } catch {
    return { ok: false, reason: 'invalid_amount' };
  }

  const comparison = compareAmounts(input.expectedAmount, amount);
  if (comparison === 'under') return { ok: false, reason: 'underpaid' };

  return { ok: true, amount, comparison };
}

export interface WaitingPayment {
  id: string;
  expectedAmount: string;
  /** epoch-ms */
  expiresAt: number;
  /** epoch-ms; oldest first for deterministic matching. */
  createdAt?: number;
}

export type MatchOutcome =
  | {
      paymentId: string;
      outcome: 'settled';
      transfer: TokenTransfer;
      amount: string;
      comparison: 'exact' | 'over';
    }
  | { paymentId: string; outcome: 'no_match' | 'expired' | 'ambiguous' };

export interface MatchOptions {
  receivingAddress: string;
  now: number;
  contractAddress?: string;
  /** txids already used by earlier payments — a txid settles at most one order. */
  usedTxids?: Iterable<string>;
  graceMs?: number;
}

/**
 * Match every waiting order against a batch of transfers in one pass.
 *
 * Two passes, so a transfer can never settle the wrong order:
 *   1. **Exact** — an amount that fits to the cent always wins, across every order,
 *      before any overpayment is considered.
 *   2. **Over** — an unspent transfer that covers an order settles it, and the
 *      order completes. Each transfer is given to the *closest* open order it
 *      covers (the largest expected amount ≤ received), so a large payment is
 *      never absorbed by a tiny order when a better fit exists.
 *
 * A transfer is consumed by at most one order, so a batch fetched once can settle
 * several orders without double-spending a single transaction.
 */
export function matchTransfersToPayments(
  payments: WaitingPayment[],
  transfers: TokenTransfer[],
  options: MatchOptions
): MatchOutcome[] {
  const spent = new Set<string>(options.usedTxids ?? []);
  const graceMs = options.graceMs ?? 0;
  const ordered = [...payments].sort((a, b) => (a.createdAt ?? 0) - (b.createdAt ?? 0));

  const outcomes = new Map<string, MatchOutcome>();
  const open: WaitingPayment[] = [];

  for (const payment of ordered) {
    if (isExpired(payment.expiresAt, options.now, graceMs)) {
      outcomes.set(payment.id, { paymentId: payment.id, outcome: 'expired' });
    } else {
      open.push(payment);
    }
  }

  const check = (payment: WaitingPayment, transfer: TokenTransfer): VerifyResult =>
    verifyTransfer({
      transfer,
      expectedAmount: payment.expectedAmount,
      receivingAddress: options.receivingAddress,
      contractAddress: options.contractAddress,
    });

  const settled = new Set<string>();

  // Pass 1 — exact amounts win outright.
  for (const payment of open) {
    const matches = transfers.filter((transfer) => {
      if (spent.has(transfer.txid)) return false;
      const result = check(payment, transfer);
      return result.ok && result.comparison === 'exact';
    });

    if (matches.length === 1) {
      const transfer = matches[0];
      spent.add(transfer.txid);
      settled.add(payment.id);
      outcomes.set(payment.id, {
        paymentId: payment.id,
        outcome: 'settled',
        transfer,
        amount: unitsToDecimal(transfer.rawValue),
        comparison: 'exact',
      });
    } else if (matches.length > 1) {
      outcomes.set(payment.id, { paymentId: payment.id, outcome: 'ambiguous' });
    }
  }

  // Pass 2 — an overpayment settles the order it best covers.
  const unspent = [...transfers]
    .filter((transfer) => !spent.has(transfer.txid))
    .sort((a, b) => a.blockTimestamp - b.blockTimestamp);

  for (const transfer of unspent) {
    let best: { payment: WaitingPayment; amount: string } | null = null;
    for (const payment of open) {
      if (settled.has(payment.id)) continue;
      if (outcomes.get(payment.id)?.outcome === 'ambiguous') continue;
      const result = check(payment, transfer);
      if (!result.ok || result.comparison !== 'over') continue;
      // Prefer the largest expected amount that is still within the payment.
      if (!best || toMicro(best.payment.expectedAmount) < toMicro(payment.expectedAmount)) {
        best = { payment, amount: result.amount };
      }
    }
    if (best) {
      spent.add(transfer.txid);
      settled.add(best.payment.id);
      outcomes.set(best.payment.id, {
        paymentId: best.payment.id,
        outcome: 'settled',
        transfer,
        amount: best.amount,
        comparison: 'over',
      });
    }
  }

  for (const payment of open) {
    if (!outcomes.has(payment.id)) {
      outcomes.set(payment.id, { paymentId: payment.id, outcome: 'no_match' });
    }
  }

  return ordered.map((payment) => {
    const outcome = outcomes.get(payment.id);
    if (!outcome) throw new Error(`matchTransfersToPayments: no outcome for ${payment.id}`);
    return outcome;
  });
}
