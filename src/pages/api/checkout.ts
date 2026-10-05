import type { APIRoute } from 'astro';
import { eq } from 'drizzle-orm';
import { env } from 'cloudflare:workers';
import { getDb } from '../../db/client';
import { customers } from '../../db/schema';
import { createOrder, OrderError, settleOrder } from '../../server/orders';
import { createUsdtPayment } from '../../server/usdt-payments';
import { createCheckoutSession, stripeClient } from '../../server/stripe';
import { json, jsonError, readBody, redirect, wantsHtml } from '../../lib/http';

export const prerender = false;

/** Start a purchase: create the order, then a card session or a USDT payment. */
export const POST: APIRoute = async ({ request, locals }) => {
  const session = locals.session;
  if (!session || session.subjectType !== 'customer') {
    return wantsHtml(request) ? redirect('/login/', 303) : jsonError(401, 'unauthorized');
  }

  const body = await readBody(request);
  const db = getDb();

  try {
    const { order, items } = await createOrder(db, {
      customerId: session.subjectId,
      items: [{ productId: body.productId ?? '', planCode: body.plan ?? '', quantity: 1 }],
    });
    // A free tier (the 30-day trial) has nothing to charge, so it settles right
    // here instead of going to a provider. This is the same `settleOrder` every
    // paid rail uses, so the entitlement and licence are identical either way.
    if (order.totalCents === 0) {
      await settleOrder(db, {
        orderId: order.id,
        invoiceId: `free-${order.orderNumber}`,
        transactionId: null,
        paymentMethod: 'free',
        chargedCents: 0,
      });
      return wantsHtml(request)
        ? redirect(`/checkout/return/?order=${encodeURIComponent(order.orderNumber)}`, 303)
        : json({ ok: true, orderNumber: order.orderNumber, method: 'free' });
    }

    const method = body.method === 'usdt' ? 'usdt' : 'card';

    if (method === 'usdt') {
      const address = env.TRON_RECEIVING_ADDRESS;
      if (!address) return jsonError(503, 'usdt_unavailable');
      const payment = await createUsdtPayment(db, {
        orderId: order.id,
        baseCents: order.totalCents,
        walletAddress: address,
      });
      return wantsHtml(request)
        ? redirect(`/checkout/usdt/?id=${payment.id}`, 303)
        : json({
            ok: true,
            orderNumber: order.orderNumber,
            method: 'usdt',
            payment: {
              id: payment.id,
              address: payment.walletAddress,
              amount: payment.expectedAmount,
              network: payment.network,
              expiresAt: payment.expiresAt.getTime(),
            },
          });
    }

    const secret = env.STRIPE_SECRET_KEY;
    if (!secret) return jsonError(503, 'stripe_unavailable');
    const customer = await db
      .select({ email: customers.email })
      .from(customers)
      .where(eq(customers.id, session.subjectId))
      .get();

    const checkout = await createCheckoutSession(stripeClient(secret), {
      orderId: order.id,
      orderNumber: order.orderNumber,
      customerEmail: customer?.email ?? '',
      amountCents: order.totalCents,
      description: items.map((item) => item.titleSnapshot).join(', '),
      successUrl: `${env.APP_URL}/checkout/return/?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${env.APP_URL}/checkout/cancel/?order=${encodeURIComponent(order.orderNumber)}`,
    });

    return wantsHtml(request)
      ? redirect(checkout.url ?? '/checkout/?error=checkout_failed', 303)
      : json({ ok: true, orderNumber: order.orderNumber, method: 'card', paymentUrl: checkout.url });
  } catch (error) {
    if (error instanceof OrderError) {
      return wantsHtml(request)
        ? redirect(`/checkout/?error=${encodeURIComponent(error.code)}`, 303)
        : jsonError(400, error.code);
    }
    console.error('checkout_failed', error);
    return jsonError(500, 'checkout_failed');
  }
};
