import { eq } from 'drizzle-orm';
import type { Db } from '../db/client';
import { webhookEvents } from '../db/schema';
import { uuid } from '../lib/crypto';
import { settleOrder } from './orders';
import { stripeClient, verifyCheckoutSession } from './stripe';

/**
 * The Stripe reconcile path. The return page and the webhook both call this,
 * and both re-verify with Stripe — neither ever trusts the caller. Settlement
 * itself is delegated to `settleOrder`, so Stripe and USDT share one trust path.
 */

export type ReconcileResult =
  | 'settled'
  | 'already_settled'
  | 'verify_failed'
  | 'no_order_reference'
  | 'metadata_mismatch'
  | `status_${string}`;

export interface ReconcileOutcome {
  result: ReconcileResult;
  orderId: string | null;
}

export async function reconcileStripeSession(
  db: Db,
  secretKey: string,
  sessionId: string,
  expectedOrderId?: string | null
): Promise<ReconcileOutcome> {
  let verified;
  try {
    verified = await verifyCheckoutSession(stripeClient(secretKey), sessionId);
  } catch (error) {
    console.error('stripe_verify_failed', { sessionId, error });
    return { result: 'verify_failed', orderId: null };
  }

  const orderId = verified.orderId ?? expectedOrderId ?? null;
  if (!orderId) return { result: 'no_order_reference', orderId: null };
  if (expectedOrderId && verified.orderId && verified.orderId !== expectedOrderId) {
    return { result: 'metadata_mismatch', orderId };
  }
  if (verified.status !== 'paid') return { result: `status_${verified.status}`, orderId };

  const settled = await settleOrder(db, {
    orderId,
    invoiceId: sessionId,
    transactionId: verified.transactionId,
    paymentMethod: 'card',
    chargedCents: verified.chargedAmount,
    rawPayload: verified.raw,
  });

  return { result: settled.applied ? 'settled' : 'already_settled', orderId };
}

/** Insert the webhook delivery if new; returns false when it is a replay. */
export async function recordWebhookEvent(
  db: Db,
  input: { provider: string; dedupeKey: string; invoiceId?: string | null; payload?: Record<string, unknown> }
): Promise<boolean> {
  const inserted = await db
    .insert(webhookEvents)
    .values({
      id: uuid(),
      provider: input.provider,
      dedupeKey: input.dedupeKey,
      invoiceId: input.invoiceId ?? null,
      payload: input.payload ?? null,
    })
    .onConflictDoNothing({ target: webhookEvents.dedupeKey })
    .returning({ id: webhookEvents.id });
  return inserted.length > 0;
}

export async function markWebhookProcessed(db: Db, dedupeKey: string, result: string): Promise<void> {
  await db
    .update(webhookEvents)
    .set({ processedAt: new Date(), result })
    .where(eq(webhookEvents.dedupeKey, dedupeKey));
}
