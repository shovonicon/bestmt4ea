import type { APIRoute } from 'astro';
import { eq } from 'drizzle-orm';
import { getDb } from '../../../db/client';
import { entitlements, orders } from '../../../db/schema';
import { audit, requireAdminMfa } from '../../../server/admin-auth';
import { getOrder, settleOrder } from '../../../server/orders';
import { json, jsonError, readBody, redirect, wantsHtml } from '../../../lib/http';

export const prerender = false;

/**
 * Admin order actions.
 *
 * `approve` settles a pending order by hand — for money that arrived while the
 * provider still shows the order unpaid. It runs the same `settleOrder()` the
 * Stripe webhook and the USDT rail use, so a hand-approved order grants exactly
 * what an automatic one does: paid, a payment row, the entitlement, and a
 * PENDING licence for an EA.
 *
 * `delete` removes an order that never granted anything (junk, a test, an
 * abandoned checkout). An order that *did* grant access is refused: its
 * entitlement still points at the row, and losing access to a real purchase is
 * a refund's job, not a delete's.
 */
export const POST: APIRoute = async ({ request, locals }) => {
  const session = locals.session;
  if (!requireAdminMfa(session)) {
    return wantsHtml(request) ? redirect('/admin/login/', 303) : jsonError(401, 'unauthorized');
  }

  const body = await readBody(request);
  const db = getDb();
  const orderId = body.orderId ?? '';
  const action = body.action ?? '';

  const order = await getOrder(db, orderId);
  if (!order) {
    return wantsHtml(request) ? redirect('/admin/orders/?error=not_found', 303) : jsonError(404, 'not_found');
  }

  const back = (query: string) => redirect(`/admin/orders/?${query}`, 303);

  if (action === 'approve') {
    if (order.status !== 'pending') {
      const reason = order.status === 'paid' ? 'already_paid' : 'not_pending';
      return wantsHtml(request) ? back(`error=${reason}`) : jsonError(400, reason);
    }

    const settled = await settleOrder(db, {
      orderId: order.id,
      invoiceId: `manual-${Date.now()}`,
      transactionId: null,
      paymentMethod: 'manual',
    });
    if (!settled.applied) {
      return wantsHtml(request) ? back('error=not_applied') : jsonError(400, 'not_applied');
    }

    await audit(db, {
      adminUserId: session.subjectId,
      action: 'order.approve',
      entity: 'order',
      entityId: order.id,
      meta: { orderNumber: order.orderNumber },
    });
    return wantsHtml(request) ? back('done=approved') : json({ ok: true });
  }

  if (action === 'delete') {
    const granted = await db
      .select({ id: entitlements.id })
      .from(entitlements)
      .where(eq(entitlements.orderId, order.id))
      .get();
    if (granted) {
      return wantsHtml(request) ? back('error=has_entitlements') : jsonError(400, 'has_entitlements');
    }

    await db.delete(orders).where(eq(orders.id, order.id));
    await audit(db, {
      adminUserId: session.subjectId,
      action: 'order.delete',
      entity: 'order',
      entityId: order.id,
      meta: { orderNumber: order.orderNumber, status: order.status },
    });
    return wantsHtml(request) ? back('done=deleted') : json({ ok: true });
  }

  return wantsHtml(request) ? back('error=unknown_action') : jsonError(400, 'unknown_action');
};
