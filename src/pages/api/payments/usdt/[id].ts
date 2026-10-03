import type { APIRoute } from 'astro';
import { getDb } from '../../../../db/client';
import { getUsdtPayment } from '../../../../server/usdt-payments';
import { getOrder } from '../../../../server/orders';
import { json, jsonError } from '../../../../lib/http';

export const prerender = false;

/** Poll a USDT payment's status. The browser never decides validity — this does. */
export const GET: APIRoute = async ({ params, locals }) => {
  const session = locals.session;
  if (!session || session.subjectType !== 'customer') return jsonError(401, 'unauthorized');

  const db = getDb();
  const payment = await getUsdtPayment(db, params.id ?? '');
  if (!payment) return jsonError(404, 'not_found');

  const order = await getOrder(db, payment.orderId);
  if (!order || order.customerId !== session.subjectId) return jsonError(403, 'forbidden');

  return json({
    id: payment.id,
    status: payment.status,
    network: payment.network,
    address: payment.walletAddress,
    amount: payment.expectedAmount,
    received: payment.receivedAmount,
    txid: payment.txid,
    expiresAt: payment.expiresAt.getTime(),
    orderStatus: order.status,
  });
};
