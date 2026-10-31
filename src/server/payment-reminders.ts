import { and, asc, eq, lte, lt, or, isNull } from 'drizzle-orm';
import { env } from 'cloudflare:workers';
import type { Db } from '../db/client';
import { customers, orderItems, orders } from '../db/schema';
import { sendEmail } from '../emails/send';
import { paymentReminderEmail } from '../emails/payment-reminder';

/**
 * Payment reminders for unpaid orders.
 *
 * Automatic schedule, counted from the order's creation and from the last
 * reminder:
 *   reminder 1 — 3 days after the order was placed
 *   reminder 2 — 7 days after reminder 1
 *   reminder 3 — 30 days after reminder 2
 * Then nothing more. An order stops being reminded as soon as it is no longer
 * pending, whatever the count.
 *
 * Manual reminders from the admin Orders page are sent whenever the order is
 * pending. They do not move the automatic schedule.
 */
const FIRST_AFTER_MS = 3 * 86_400_000;
const SECOND_AFTER_MS = 7 * 86_400_000;
const THIRD_AFTER_MS = 30 * 86_400_000;
const MAX_AUTOMATIC = 3;
/** Keep one daily run well inside the email daily ceilings. */
const BATCH_LIMIT = 50;

const money = (cents: number) => `$${(cents / 100).toFixed(2)}`;

export type ReminderResult =
  | { sent: true; step: number }
  | { sent: false; reason: 'not_found' | 'not_pending' | 'no_email' | 'not_due' | 'send_failed' };

interface SendOptions {
  /** Manual sends skip the schedule and leave the automatic counter alone. */
  manual: boolean;
  now?: number;
}

async function loadOrderForReminder(db: Db, orderId: string) {
  const order = await db.select().from(orders).where(eq(orders.id, orderId)).get();
  if (!order) return null;
  const customer = await db
    .select({ email: customers.email })
    .from(customers)
    .where(eq(customers.id, order.customerId))
    .get();
  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id)).all();
  return { order, email: customer?.email ?? null, items };
}

/** Whether the automatic schedule has a reminder due for this order right now. */
export function automaticStepDue(
  order: { reminderCount: number; lastReminderAt: Date | null; createdAt: Date },
  now: number
): number | null {
  if (order.reminderCount >= MAX_AUTOMATIC) return null;
  if (order.reminderCount === 0) {
    return order.createdAt.getTime() <= now - FIRST_AFTER_MS ? 1 : null;
  }
  const last = order.lastReminderAt?.getTime() ?? 0;
  if (order.reminderCount === 1) return last <= now - SECOND_AFTER_MS ? 2 : null;
  return last <= now - THIRD_AFTER_MS ? 3 : null;
}

export async function sendPaymentReminder(
  db: Db,
  orderId: string,
  options: SendOptions
): Promise<ReminderResult> {
  const now = options.now ?? Date.now();
  const loaded = await loadOrderForReminder(db, orderId);
  if (!loaded) return { sent: false, reason: 'not_found' };
  const { order, email, items } = loaded;

  if (order.status !== 'pending') return { sent: false, reason: 'not_pending' };
  if (!email) return { sent: false, reason: 'no_email' };

  // The step to send: the automatic schedule for the daily job, or the next step
  // for a manual send (the counter is only read, never advanced by a manual send).
  const step = options.manual
    ? Math.min(order.reminderCount + 1, MAX_AUTOMATIC)
    : automaticStepDue(order, now);
  if (step === null) return { sent: false, reason: 'not_due' };

  const mail = paymentReminderEmail({
    orderNumber: order.orderNumber,
    items: items.map((item) => ({
      title: item.titleSnapshot,
      amount: money(item.unitPriceCents * item.quantity),
    })),
    total: money(order.totalCents),
    step,
    dashboardUrl: `${env.APP_URL}/dashboard/`,
    productsUrl: `${env.APP_URL}/best-forex-ea/`,
  });

  const sent = await sendEmail(db, env, {
    to: email,
    subject: mail.subject,
    html: mail.html,
    text: mail.text,
    template: 'payment-reminder',
  });
  if (!sent) return { sent: false, reason: 'send_failed' };

  if (!options.manual) {
    await db
      .update(orders)
      .set({ reminderCount: step, lastReminderAt: new Date(now) })
      .where(eq(orders.id, order.id));
  }
  return { sent: true, step };
}

/** The daily job: find pending orders with a reminder due and send it. */
export async function runPaymentReminders(db: Db, now = Date.now()): Promise<{ sent: number; checked: number }> {
  const candidates = await db
    .select({ id: orders.id })
    .from(orders)
    .where(
      and(
        eq(orders.status, 'pending'),
        lt(orders.reminderCount, MAX_AUTOMATIC),
        lte(orders.createdAt, new Date(now - FIRST_AFTER_MS)),
        or(isNull(orders.lastReminderAt), lte(orders.lastReminderAt, new Date(now - SECOND_AFTER_MS)))
      )
    )
    .orderBy(asc(orders.createdAt))
    .limit(BATCH_LIMIT)
    .all();

  let sent = 0;
  for (const candidate of candidates) {
    const result = await sendPaymentReminder(db, candidate.id, { manual: false, now });
    if (result.sent) sent += 1;
  }
  return { sent, checked: candidates.length };
}
