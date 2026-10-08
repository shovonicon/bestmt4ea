import { and, eq, sql } from 'drizzle-orm';
import { env } from 'cloudflare:workers';
import type { Db } from '../db/client';
import { dbBatch } from '../db/client';
import {
  coupons,
  customers,
  entitlements,
  licenses,
  orderItems,
  orders,
  payments,
  productPlans,
  products,
  refunds,
  type Coupon,
  type Order,
} from '../db/schema';
import { randomToken, uuid } from '../lib/crypto';
import { deliveryChannelFor, type DeliveryChannel } from '../lib/delivery';
import { sendEmail } from '../emails/send';
import { orderConfirmationEmail } from '../emails/order-confirmation';
import { grantEntitlement, revokeEntitlement } from './entitlements';
import { activateTrialLicense, createLicense, revokeLicense } from './licenses';

/**
 * Orders and the single settlement path.
 *
 * Every provider — Stripe, USDT, a manual admin action — settles through
 * `settleOrder`. It marks the order paid, records one payment row, and grants
 * the entitlements. Nothing else may mark an order paid or grant access, so a
 * forged or replayed payment cannot unlock anything.
 */

export class OrderError extends Error {
  constructor(
    public code: string,
    message?: string
  ) {
    super(message ?? code);
    this.name = 'OrderError';
  }
}

function newOrderNumber(): string {
  const d = new Date();
  const stamp = `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, '0')}${String(
    d.getUTCDate()
  ).padStart(2, '0')}`;
  const rand = randomToken(6).replace(/[^A-Za-z0-9]/g, '').slice(0, 6).toUpperCase();
  return `BMT-${stamp}-${rand}`;
}

export interface CreateOrderInput {
  customerId: string;
  items: Array<{ productId: string; planCode: string; quantity?: number }>;
  /** A discount code from checkout. Unusable codes are refused, not ignored. */
  couponCode?: string | null;
}

export interface CreatedOrder {
  order: Order;
  items: Array<{ productId: string; titleSnapshot: string; unitPriceCents: number; quantity: number }>;
  coupon: Coupon | null;
}

/**
 * What a code takes off a subtotal. A percentage rounds *down*, so the discount
 * can never exceed the fraction it claims, and a fixed amount is capped at the
 * subtotal so an order can reach zero but never go negative.
 */
export function computeDiscount(subtotalCents: number, coupon: Coupon): number {
  if (coupon.type === 'percent') {
    return Math.floor((subtotalCents * coupon.value) / 100);
  }
  return Math.min(coupon.value, subtotalCents);
}

/** Whether a code can be used right now: switched on, unexpired, and not used up. */
function isCouponUsable(coupon: Coupon, now: number): boolean {
  if (!coupon.active) return false;
  if (coupon.expiresAt && coupon.expiresAt.getTime() < now) return false;
  if (coupon.maxRedemptions !== null && coupon.redemptions >= coupon.maxRedemptions) return false;
  return true;
}

/**
 * Look up a code by what the customer typed. Returns null for a code that does
 * not exist *and* for one that exists but is unusable — checkout shows the same
 * message either way, so a disabled code is not a way to probe which codes exist.
 */
export async function loadCoupon(db: Db, code: string): Promise<Coupon | null> {
  const coupon = await db
    .select()
    .from(coupons)
    .where(eq(coupons.code, code.trim().toUpperCase()))
    .get();
  if (!coupon) return null;
  return isCouponUsable(coupon, Date.now()) ? coupon : null;
}

export async function createOrder(db: Db, input: CreateOrderInput): Promise<CreatedOrder> {
  if (input.items.length === 0) throw new OrderError('empty_order');

  const resolved: Array<{
    productId: string;
    priceCents: number;
    title: string;
    planId: string;
    planLabel: string | null;
    durationDays: number | null;
    maxAccounts: number;
    quantity: number;
  }> = [];
  let subtotal = 0;

  for (const item of input.items) {
    const product = await db.select().from(products).where(eq(products.id, item.productId)).get();
    if (!product || !product.active) throw new OrderError('product_not_found');
    const plan = await db
      .select()
      .from(productPlans)
      .where(and(eq(productPlans.productId, item.productId), eq(productPlans.code, item.planCode)))
      .get();
    if (!plan || !plan.active) throw new OrderError('plan_not_found');

    const quantity = item.quantity ?? 1;
    subtotal += plan.priceCents * quantity;
    resolved.push({
      productId: product.id,
      priceCents: plan.priceCents,
      title: product.title,
      planId: plan.id,
      planLabel: plan.label,
      durationDays: plan.durationDays,
      maxAccounts: plan.maxAccounts,
      quantity,
    });
  }

  let coupon: Coupon | null = null;
  let discount = 0;
  if (input.couponCode) {
    coupon = await loadCoupon(db, input.couponCode);
    // Refused rather than ignored: silently charging full price for a code the
    // customer typed is worse than telling them it did not work.
    if (!coupon) throw new OrderError('invalid_coupon');
    discount = computeDiscount(subtotal, coupon);
  }

  const id = uuid();
  const now = new Date();
  await db.insert(orders).values({
    id,
    orderNumber: newOrderNumber(),
    customerId: input.customerId,
    status: 'pending',
    subtotalCents: subtotal,
    discountCents: discount,
    totalCents: Math.max(0, subtotal - discount),
    currency: 'USD',
    couponId: coupon?.id ?? null,
    createdAt: now,
  });

  /*
   * The use is counted here, when the order is created rather than when it is
   * paid. A capped code has to reserve its place: if the count moved only on
   * payment, two buyers could both pass a `maxRedemptions: 1` check and only one
   * of them would be right. The cost of that choice is that an abandoned
   * checkout spends a use, which is visible in the admin's usage column and can
   * be corrected by turning the code off or deleting it.
   */
  if (coupon) {
    await db
      .update(coupons)
      .set({ redemptions: sql`${coupons.redemptions} + 1` })
      .where(eq(coupons.id, coupon.id));
  }

  for (const row of resolved) {
    await db.insert(orderItems).values({
      id: uuid(),
      orderId: id,
      productId: row.productId,
      planId: row.planId,
      planLabel: row.planLabel,
      durationDays: row.durationDays,
      maxAccounts: row.maxAccounts,
      titleSnapshot: row.title,
      unitPriceCents: row.priceCents,
      quantity: row.quantity,
    });
  }

  const order = await db.select().from(orders).where(eq(orders.id, id)).get();
  if (!order) throw new OrderError('order_create_failed');

  return {
    order,
    items: resolved.map((row) => ({
      productId: row.productId,
      titleSnapshot: row.title,
      unitPriceCents: row.priceCents,
      quantity: row.quantity,
    })),
    coupon,
  };
}

export async function getOrder(db: Db, orderId: string): Promise<Order | null> {
  const row = await db.select().from(orders).where(eq(orders.id, orderId)).get();
  return row ?? null;
}

export async function markOrderFailed(db: Db, orderId: string): Promise<void> {
  const order = await getOrder(db, orderId);
  if (!order || order.status === 'paid') return;
  await db.update(orders).set({ status: 'failed' }).where(eq(orders.id, orderId));
}

const money = (cents: number) => `$${(cents / 100).toFixed(2)}`;

/**
 * Best-effort purchase receipt. `sendEmail` never throws, so a mail failure can
 * never undo a settled order — the customer still has the dashboard.
 */
async function sendReceipt(
  db: Db,
  order: Order,
  items: Array<{ titleSnapshot: string; unitPriceCents: number; quantity: number }>,
  channels: DeliveryChannel[]
): Promise<void> {
  try {
    const customer = await db
      .select({ email: customers.email })
      .from(customers)
      .where(eq(customers.id, order.customerId))
      .get();
    if (!customer?.email) return;

    const mail = orderConfirmationEmail({
      orderNumber: order.orderNumber,
      items: items.map((item) => ({
        title: item.titleSnapshot,
        amount: money(item.unitPriceCents * item.quantity),
      })),
      total: money(order.totalCents),
      dashboardUrl: `${env.APP_URL}/dashboard/`,
      loginUrl: `${env.APP_URL}/login/`,
      channels,
    });

    await sendEmail(db, env, {
      to: customer.email,
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
      template: 'order-confirmation',
    });
  } catch (error) {
    console.error('receipt_failed', error);
  }
}

export interface SettleOrderInput {
  orderId: string;
  /** Unique provider reference (Stripe session id, crypto payment id, or manual-<n>). */
  invoiceId: string;
  transactionId: string | null;
  paymentMethod: string | null;
  /** Cents actually collected; defaults to the order total. */
  chargedCents?: number;
  rawPayload?: Record<string, unknown>;
}

export interface SettleOrderResult {
  applied: boolean;
  productIds: string[];
}

/**
 * Mark an order paid, record the payment, and grant entitlements. Idempotent:
 * an already-paid order returns `applied: false` and grants nothing again.
 */
export async function settleOrder(db: Db, input: SettleOrderInput): Promise<SettleOrderResult> {
  const order = await getOrder(db, input.orderId);
  if (!order) return { applied: false, productIds: [] };
  if (order.status === 'paid') return { applied: false, productIds: [] };
  if (order.status === 'refunded' || order.status === 'cancelled') {
    return { applied: false, productIds: [] };
  }

  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id)).all();
  const now = new Date();
  // `coupon` is its own provider: a code that covered the whole total settled
  // without money changing hands, and the payment row should say so rather than
  // claiming a manual collection nobody made.
  const provider =
    input.paymentMethod === 'usdt'
      ? 'usdt'
      : input.paymentMethod === 'card'
        ? 'stripe'
        : input.paymentMethod === 'coupon'
          ? 'coupon'
          : 'manual';

  await dbBatch(db, [
    db.update(orders).set({ status: 'paid', paidAt: now }).where(eq(orders.id, order.id)),
    db.insert(payments).values({
      id: uuid(),
      orderId: order.id,
      provider,
      invoiceId: input.invoiceId,
      transactionId: input.transactionId,
      paymentMethod: input.paymentMethod,
      amountCents: input.chargedCents ?? order.totalCents,
      status: 'completed',
      rawPayload: input.rawPayload ?? null,
      createdAt: now,
      updatedAt: now,
    }),
  ]);

  const deliveryChannels = new Set<DeliveryChannel>();

  for (const item of items) {
    const entitlementId = await grantEntitlement(db, {
      customerId: order.customerId,
      productId: item.productId,
      orderId: order.id,
      source: 'purchase',
      expiresAt: item.durationDays ? new Date(now.getTime() + item.durationDays * 86_400_000) : null,
    });

    // Only an EA is account-bound: it needs the MT4/MT5-bound activation,
    // created PENDING so the customer can activate it. A tool (indicator) and a
    // service (VPS) deliver on the entitlement alone.
    const product = await db
      .select({ type: products.type })
      .from(products)
      .where(eq(products.id, item.productId))
      .get();
    if (product?.type) deliveryChannels.add(deliveryChannelFor(product.type));
    if (product?.type === 'ea') {
      const expiresAt = item.durationDays ? new Date(now.getTime() + item.durationDays * 86_400_000) : null;
      const license = await createLicense(db, {
        entitlementId,
        customerId: order.customerId,
        productId: item.productId,
        maxAccounts: item.maxAccounts ?? 1,
        expiresAt,
      });

      /*
       * A trial has no account to bind, so its build carries only the expiry and
       * nothing is left for the customer to do — it goes live here, and the build
       * is queued immediately. A paid licence stays PENDING until the customer
       * activates it on their own account.
       */
      const plan = item.planId
        ? await db
            .select({ code: productPlans.code, priceCents: productPlans.priceCents })
            .from(productPlans)
            .where(eq(productPlans.id, item.planId))
            .get()
        : null;
      if (plan && (plan.code.startsWith('trial') || plan.priceCents === 0)) {
        await activateTrialLicense(db, license.id);
      }
    }
  }

  // The receipt describes how to collect what was actually bought.
  await sendReceipt(
    db,
    order,
    items,
    (['licence', 'download', 'telegram'] as DeliveryChannel[]).filter((channel) =>
      deliveryChannels.has(channel)
    )
  );

  return { applied: true, productIds: items.map((item) => item.productId) };
}

export interface RefundOrderInput {
  orderId: string;
  amountCents: number;
  /** The provider's charge or refund id, for the audit trail. */
  providerRefundId?: string | null;
  reason?: string | null;
}

/**
 * Undo a settled order: mark it refunded, record the refund, and revoke what that
 * order granted. Only a *full* refund reaches here (see the Stripe webhook) — a
 * goodwill part-refund should leave the licence running.
 *
 * Revocation is scoped to what *this* order created. Buying the same product twice
 * re-points the entitlement at the newer order, so refunding the older one must
 * leave the newer purchase's access alone rather than revoking it by product.
 */
export async function refundOrder(db: Db, input: RefundOrderInput): Promise<{ applied: boolean }> {
  const order = await getOrder(db, input.orderId);
  if (!order) return { applied: false };
  if (order.status === 'refunded') return { applied: false };

  const payment = await db
    .select({ id: payments.id })
    .from(payments)
    .where(eq(payments.orderId, order.id))
    .get();

  await db.update(orders).set({ status: 'refunded' }).where(eq(orders.id, order.id));

  if (payment) {
    await db.insert(refunds).values({
      id: uuid(),
      paymentId: payment.id,
      amountCents: input.amountCents,
      reason: input.reason ?? null,
      status: 'processed',
      providerRefundId: input.providerRefundId ?? null,
      processedAt: new Date(),
    });
  }

  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id)).all();
  for (const item of items) {
    const entitlement = await db
      .select({ id: entitlements.id })
      .from(entitlements)
      .where(
        and(
          eq(entitlements.customerId, order.customerId),
          eq(entitlements.productId, item.productId),
          eq(entitlements.orderId, order.id)
        )
      )
      .get();
    if (!entitlement) continue;

    const licenceRows = await db
      .select({ id: licenses.id, status: licenses.status })
      .from(licenses)
      .where(eq(licenses.entitlementId, entitlement.id))
      .all();
    for (const licence of licenceRows) {
      if (licence.status !== 'REVOKED') await revokeLicense(db, licence.id, null);
    }
    await revokeEntitlement(db, order.customerId, item.productId);
  }

  return { applied: true };
}
