import Stripe from 'stripe';

/**
 * Thin Stripe wrapper. Stripe-hosted Checkout only — we never see card details.
 * Every function takes the secret key explicitly so the module stays free of
 * `cloudflare:workers` and can be reasoned about in isolation.
 */

export function stripeClient(secretKey: string): Stripe {
  return new Stripe(secretKey, {} as unknown as Stripe.StripeConfig);
}

export interface CreateCheckoutInput {
  orderId: string;
  orderNumber: string;
  customerEmail: string;
  /** Charge the authoritative order total, in USD cents. */
  amountCents: number;
  description: string;
  successUrl: string;
  cancelUrl: string;
}

export async function createCheckoutSession(
  client: Stripe,
  input: CreateCheckoutInput
): Promise<{ url: string | null; sessionId: string }> {
  const session = await client.checkout.sessions.create({
    mode: 'payment',
    ui_mode: 'hosted_page',
    customer_email: input.customerEmail,
    client_reference_id: input.orderId,
    metadata: { order_id: input.orderId, order_number: input.orderNumber },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: input.amountCents,
          product_data: { name: input.description },
        },
      },
    ],
    success_url: input.successUrl,
    cancel_url: input.cancelUrl,
  } as Stripe.Checkout.SessionCreateParams);

  return { url: session.url, sessionId: session.id };
}

export interface VerifiedSession {
  status: string;
  currency: string | null;
  chargedAmount: number;
  orderId: string | null;
  transactionId: string | null;
  raw: Record<string, unknown>;
}

export async function verifyCheckoutSession(client: Stripe, sessionId: string): Promise<VerifiedSession> {
  const session = await client.checkout.sessions.retrieve(sessionId);
  const intent = session.payment_intent;
  return {
    status: session.payment_status,
    currency: session.currency,
    chargedAmount: session.amount_total ?? 0,
    orderId: session.metadata?.order_id ?? session.client_reference_id ?? null,
    transactionId: typeof intent === 'string' ? intent : (intent?.id ?? null),
    raw: session as unknown as Record<string, unknown>,
  };
}

export async function constructWebhookEvent(
  secretKey: string,
  payload: string,
  signature: string,
  webhookSecret: string
): Promise<Stripe.Event> {
  const client = stripeClient(secretKey);
  return client.webhooks.constructEventAsync(payload, signature, webhookSecret);
}
