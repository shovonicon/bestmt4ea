import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getDb } from '../../../db/client';
import { markOrderFailed } from '../../../server/orders';
import { markWebhookProcessed, reconcileStripeSession, recordWebhookEvent, refundOrderForPaymentIntent } from '../../../server/payments';
import { constructWebhookEvent } from '../../../server/stripe';

export const prerender = false;

/**
 * Stripe webhook. The signature is authenticated over the raw body, the delivery
 * is de-duplicated, and settlement reuses the same reconcile path as the return
 * page. A duplicate or a forged body unlocks nothing.
 */
export const POST: APIRoute = async ({ request }) => {
  const signature = request.headers.get('stripe-signature') ?? '';
  const payload = await request.text();

  let event;
  try {
    event = await constructWebhookEvent(
      env.STRIPE_SECRET_KEY,
      payload,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.warn('stripe_webhook_invalid', error);
    return new Response('Invalid signature', { status: 400 });
  }

  const db = getDb();
  const object = (event.data?.object ?? {}) as { id?: string; metadata?: { order_id?: string } };
  const sessionId = typeof object.id === 'string' ? object.id : null;
  const orderId = object.metadata?.order_id ?? null;

  const isNew = await recordWebhookEvent(db, {
    provider: 'stripe',
    dedupeKey: event.id,
    invoiceId: sessionId,
    payload: event as unknown as Record<string, unknown>,
  });
  if (!isNew) return new Response('ok', { status: 200 });

  let result = `ignored_${event.type}`;
  if (
    (event.type === 'checkout.session.completed' ||
      event.type === 'checkout.session.async_payment_succeeded') &&
    sessionId
  ) {
    const outcome = await reconcileStripeSession(db, env.STRIPE_SECRET_KEY, sessionId, orderId);
    result = outcome.result;
  } else if (event.type === 'charge.refunded') {
    /*
     * Stripe sets `refunded: true` only once the charge has been returned in full,
     * so this branch is a full refund. A part-refund is a goodwill gesture and
     * deliberately leaves the licence running.
     */
    const charge = (event.data?.object ?? {}) as {
      id?: string;
      payment_intent?: string | { id?: string } | null;
      amount_refunded?: number;
      refunded?: boolean;
    };
    const intentId =
      typeof charge.payment_intent === 'string' ? charge.payment_intent : (charge.payment_intent?.id ?? null);

    if (charge.refunded && intentId) {
      const refunded = await refundOrderForPaymentIntent(db, intentId, {
        amountCents: charge.amount_refunded ?? 0,
        providerRefundId: charge.id ?? null,
      });
      result = refunded.result;
    } else {
      result = 'partial_refund_ignored';
    }
  } else if (event.type === 'checkout.session.expired' && orderId) {
    await markOrderFailed(db, orderId);
    result = 'expired';
  }

  await markWebhookProcessed(db, event.id, result);
  return new Response('ok', { status: 200 });
};
