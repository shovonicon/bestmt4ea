import { and, eq } from 'drizzle-orm';
import type { Db } from '../db/client';
import { dbBatch } from '../db/client';
import {
  orderItems,
  orders,
  payments,
  productPlans,
  products,
  type Order,
} from '../db/schema';
import { randomToken, uuid } from '../lib/crypto';
import { grantEntitlement } from './entitlements';
import { createLicense } from './licenses';

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
}

export interface CreatedOrder {
  order: Order;
  items: Array<{ productId: string; titleSnapshot: string; unitPriceCents: number; quantity: number }>;
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

  const id = uuid();
  const now = new Date();
  await db.insert(orders).values({
    id,
    orderNumber: newOrderNumber(),
    customerId: input.customerId,
    status: 'pending',
    subtotalCents: subtotal,
    discountCents: 0,
    totalCents: subtotal,
    currency: 'USD',
    createdAt: now,
  });

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
  const provider = input.paymentMethod === 'usdt' ? 'usdt' : input.paymentMethod === 'card' ? 'stripe' : 'manual';

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

  for (const item of items) {
    const entitlementId = await grantEntitlement(db, {
      customerId: order.customerId,
      productId: item.productId,
      orderId: order.id,
      source: 'purchase',
      expiresAt: item.durationDays ? new Date(now.getTime() + item.durationDays * 86_400_000) : null,
    });

    // An EA needs a licence (the MT5-account-bound activation), created PENDING so
    // the customer can activate it. Non-EA products (VPS, tools) need only the
    // entitlement.
    const product = await db
      .select({ platform: products.platform })
      .from(products)
      .where(eq(products.id, item.productId))
      .get();
    if (product && product.platform !== 'none') {
      await createLicense(db, {
        entitlementId,
        customerId: order.customerId,
        productId: item.productId,
        maxAccounts: item.maxAccounts ?? 1,
        expiresAt: item.durationDays ? new Date(now.getTime() + item.durationDays * 86_400_000) : null,
      });
    }
  }

  return { applied: true, productIds: items.map((item) => item.productId) };
}
