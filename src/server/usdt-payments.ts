import { eq, isNotNull } from 'drizzle-orm';
import type { Db } from '../db/client';
import { cryptoPayments, paymentEvents, type CryptoPayment } from '../db/schema';
import { uuid } from '../lib/crypto';
import {
  DEFAULT_PAYMENT_TTL_MS,
  expectedAmountFromCents,
  matchTransfersToPayments,
  randomIdentifier,
} from './crypto-payments';
import { fetchBep20Transfers, type TokenTransfer, type BscScanConfig } from './bsc';
import { settleOrder } from './orders';

/**
 * USDT (BEP-20) orchestration over the pure engine (P0) and the BSC block-explorer API.
 *
 * `pollUsdtPayments` is what a 60s Cron Trigger runs: it fetches the wallet's
 * recent transfers once, matches them against every WAITING order in a single
 * pass, and settles the ones that fit. The DB rows are the source of truth; the
 * blockchain is only evidence.
 */

export interface CreateUsdtPaymentInput {
  orderId: string;
  baseCents: number;
  walletAddress: string;
  /** The payer's linked wallet, when they have one — the matcher then requires it. */
  expectedSender?: string | null;
  ttlMs?: number;
}

export async function createUsdtPayment(db: Db, input: CreateUsdtPaymentInput): Promise<CryptoPayment> {
  const id = uuid();
  const now = new Date();
  await db.insert(cryptoPayments).values({
    id,
    orderId: input.orderId,
    currency: 'USDT',
    network: 'BEP20',
    walletAddress: input.walletAddress,
    expectedSender: input.expectedSender ?? null,
    expectedAmount: expectedAmountFromCents(input.baseCents, randomIdentifier()),
    status: 'WAITING',
    createdAt: now,
    expiresAt: new Date(now.getTime() + (input.ttlMs ?? DEFAULT_PAYMENT_TTL_MS)),
  });
  const row = await db.select().from(cryptoPayments).where(eq(cryptoPayments.id, id)).get();
  if (!row) throw new Error('usdt_payment_create_failed');
  return row;
}

export async function getUsdtPayment(db: Db, id: string): Promise<CryptoPayment | null> {
  const row = await db.select().from(cryptoPayments).where(eq(cryptoPayments.id, id)).get();
  return row ?? null;
}

export async function getUsdtPaymentForOrder(db: Db, orderId: string): Promise<CryptoPayment | null> {
  const row = await db.select().from(cryptoPayments).where(eq(cryptoPayments.orderId, orderId)).get();
  return row ?? null;
}

export interface PollResult {
  matched: number;
  expired: number;
  fetched: number;
}

/** Expire stale WAITING payments, fetch transfers once, match, and settle. */
export async function pollUsdtPayments(
  db: Db,
  config: { walletAddress: string; bsc?: BscScanConfig; now?: number }
): Promise<PollResult> {
  const now = config.now ?? Date.now();
  const waiting = await db.select().from(cryptoPayments).where(eq(cryptoPayments.status, 'WAITING')).all();
  if (waiting.length === 0) return { matched: 0, expired: 0, fetched: 0 };

  let expired = 0;
  const open: CryptoPayment[] = [];
  for (const payment of waiting) {
    if (payment.expiresAt.getTime() < now) {
      await db.update(cryptoPayments).set({ status: 'EXPIRED' }).where(eq(cryptoPayments.id, payment.id));
      expired += 1;
    } else {
      open.push(payment);
    }
  }
  if (open.length === 0) return { matched: 0, expired, fetched: 0 };

  const minTimestamp = Math.min(...open.map((p) => p.createdAt.getTime())) - 60_000;
  let transfers: TokenTransfer[];
  try {
    transfers = await fetchBep20Transfers(config.walletAddress, config.bsc ?? {}, { minTimestamp });
  } catch (error) {
    console.error('bsc_fetch_failed', error);
    return { matched: 0, expired, fetched: 0 };
  }

  const spent = new Set<string>();
  const used = await db
    .select({ txid: cryptoPayments.txid })
    .from(cryptoPayments)
    .where(isNotNull(cryptoPayments.txid))
    .all();
  for (const row of used) if (row.txid) spent.add(row.txid);

  const outcomes = matchTransfersToPayments(
    open.map((p) => ({
      id: p.id,
      expectedAmount: p.expectedAmount,
      senderAddress: p.expectedSender ?? undefined,
      expiresAt: p.expiresAt.getTime(),
      createdAt: p.createdAt.getTime(),
    })),
    transfers,
    { receivingAddress: config.walletAddress, now, usedTxids: spent }
  );

  let matched = 0;
  for (const outcome of outcomes) {
    if (outcome.outcome !== 'settled') continue;
    const payment = open.find((p) => p.id === outcome.paymentId);
    if (!payment) continue;

    await db
      .update(cryptoPayments)
      .set({
        status: 'PAID',
        txid: outcome.transfer.txid,
        senderAddress: outcome.transfer.from,
        receiverAddress: outcome.transfer.to,
        receivedAmount: outcome.amount,
        detectedAt: new Date(now),
        confirmedAt: new Date(now),
      })
      .where(eq(cryptoPayments.id, payment.id));

    await db.insert(paymentEvents).values({
      id: uuid(),
      provider: 'usdt',
      reference: payment.id,
      kind: 'paid',
      detail: { txid: outcome.transfer.txid, amount: outcome.amount, comparison: outcome.comparison },
      createdAt: new Date(now),
    });

    await settleOrder(db, {
      orderId: payment.orderId,
      invoiceId: payment.id,
      transactionId: outcome.transfer.txid,
      paymentMethod: 'usdt',
      rawPayload: { txid: outcome.transfer.txid, amount: outcome.amount, comparison: outcome.comparison },
    });
    matched += 1;
  }

  return { matched, expired, fetched: transfers.length };
}

/** Expire stale WAITING payments without touching the blockchain. */
export async function expireUsdtPayments(db: Db, now = Date.now()): Promise<number> {
  const waiting = await db.select().from(cryptoPayments).where(eq(cryptoPayments.status, 'WAITING')).all();
  let expired = 0;
  for (const payment of waiting) {
    if (payment.expiresAt.getTime() < now) {
      await db.update(cryptoPayments).set({ status: 'EXPIRED' }).where(eq(cryptoPayments.id, payment.id));
      expired += 1;
    }
  }
  return expired;
}
