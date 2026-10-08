import type { APIRoute } from 'astro';
import { eq } from 'drizzle-orm';
import { getDb } from '../../../db/client';
import { coupons, orders } from '../../../db/schema';
import { audit, requireAdminMfa } from '../../../server/admin-auth';
import { uuid } from '../../../lib/crypto';
import { json, jsonError, readBody, redirect, wantsHtml } from '../../../lib/http';
import { parseUsdToCents } from '../../../lib/money';

export const prerender = false;

/**
 * Admin coupon actions.
 *
 * `save` creates a code, or updates one that already exists. `toggle` flips a
 * code on or off without touching its history. `delete` removes it, detaching
 * any orders that reference it first.
 *
 * Two rules are deliberate. Editing never changes the on/off switch — that is
 * the toggle's job, and silently re-enabling a code somebody had deliberately
 * switched off would be a nasty surprise. And deleting detaches orders rather
 * than cascading: an order keeps its own `discountCents`, so a past receipt
 * never changes, and the coupon row is only a record of what was applied.
 *
 * A `percent` coupon stores the percentage in `value`; a `fixed` one stores
 * cents, which is why the page shows dollars and converts on the way in.
 */
export const POST: APIRoute = async ({ request, locals }) => {
  const session = locals.session;
  if (!requireAdminMfa(session)) {
    return wantsHtml(request) ? redirect('/admin/login/', 303) : jsonError(401, 'unauthorized');
  }

  const body = await readBody(request);
  const db = getDb();
  const action = body.action ?? 'save';
  const back = (query: string) => redirect(`/admin/coupons/?${query}`, 303);
  const fail = (query: string, status: number, reason: string) =>
    wantsHtml(request) ? back(query) : jsonError(status, reason);

  // Toggle and delete address one row by id, never by code, so a lookup can
  // never land on the wrong coupon.
  if (action === 'toggle' || action === 'delete') {
    const id = (body.id ?? '').trim();
    if (!id) return fail('error=missing_fields', 400, 'missing_fields');

    const coupon = await db.select().from(coupons).where(eq(coupons.id, id)).get();
    if (!coupon) return fail('error=not_found', 404, 'not_found');

    if (action === 'toggle') {
      await db.update(coupons).set({ active: !coupon.active }).where(eq(coupons.id, id));
      await audit(db, {
        adminUserId: session.subjectId,
        action: coupon.active ? 'coupon.disabled' : 'coupon.enabled',
        entity: 'coupon',
        entityId: coupon.code,
        meta: { code: coupon.code, active: !coupon.active },
      });
      return wantsHtml(request) ? back('done=toggled') : json({ ok: true });
    }

    // Orders reference the coupon, so detach them before the delete or the
    // foreign key refuses. Each order keeps its own discount amount.
    await db.update(orders).set({ couponId: null }).where(eq(orders.couponId, id));
    await db.delete(coupons).where(eq(coupons.id, id));
    await audit(db, {
      adminUserId: session.subjectId,
      action: 'coupon.deleted',
      entity: 'coupon',
      entityId: coupon.code,
      meta: { code: coupon.code, type: coupon.type, value: coupon.value, redemptions: coupon.redemptions },
    });
    return wantsHtml(request) ? back('done=deleted') : json({ ok: true });
  }

  const code = (body.code ?? '').trim().toUpperCase();
  if (!code) return fail('error=missing_fields', 400, 'missing_fields');

  const type = body.type === 'fixed' ? 'fixed' : 'percent';
  const raw = body.value ?? '0';
  const value = type === 'fixed' ? parseUsdToCents(raw) : Math.floor(Number(raw));
  if (!Number.isFinite(value) || value <= 0) {
    return fail('error=invalid_value', 400, 'invalid_value');
  }
  if (type === 'percent' && value > 100) {
    return fail('error=invalid_value', 400, 'invalid_value');
  }

  const maxRedemptions = body.maxRedemptions ? Math.floor(Number(body.maxRedemptions)) : null;
  if (maxRedemptions !== null && (!Number.isFinite(maxRedemptions) || maxRedemptions <= 0)) {
    return fail('error=invalid_max', 400, 'invalid_max');
  }

  const expiresAt = body.expiresAt ? new Date(`${body.expiresAt}T23:59:59Z`) : null;
  if (expiresAt && Number.isNaN(expiresAt.getTime())) {
    return fail('error=invalid_expiry', 400, 'invalid_expiry');
  }

  const existing = await db.select().from(coupons).where(eq(coupons.code, code)).get();
  if (existing) {
    await db
      .update(coupons)
      .set({ type, value, maxRedemptions, expiresAt })
      .where(eq(coupons.id, existing.id));
  } else {
    await db.insert(coupons).values({ id: uuid(), code, type, value, maxRedemptions, expiresAt });
  }

  await audit(db, {
    adminUserId: session.subjectId,
    action: existing ? 'coupon.updated' : 'coupon.created',
    entity: 'coupon',
    entityId: code,
    meta: { code, type, value, maxRedemptions, expiresAt: expiresAt?.toISOString() ?? null },
  });

  return wantsHtml(request) ? back('done=saved') : json({ ok: true });
};
