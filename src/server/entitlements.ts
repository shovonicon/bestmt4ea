import { and, eq, isNull, or, sql } from 'drizzle-orm';
import type { Db } from '../db/client';
import { entitlements, type Entitlement } from '../db/schema';
import { uuid } from '../lib/crypto';

/**
 * Entitlements — "what a customer has bought". A licence (P5) is the concrete
 * MT5-bound activation of an entitlement; every download is gated on an active
 * entitlement (or, for the free library, on the product being free at all).
 */

export interface GrantEntitlementInput {
  customerId: string;
  productId: string;
  orderId?: string | null;
  source?: string;
  downloadLimit?: number | null;
  /** null means access never expires. */
  expiresAt?: Date | null;
}

export async function grantEntitlement(db: Db, input: GrantEntitlementInput): Promise<void> {
  await db
    .insert(entitlements)
    .values({
      id: uuid(),
      customerId: input.customerId,
      productId: input.productId,
      orderId: input.orderId ?? null,
      source: input.source ?? 'purchase',
      downloadLimit: input.downloadLimit ?? null,
      expiresAt: input.expiresAt ?? null,
    })
    .onConflictDoUpdate({
      target: [entitlements.customerId, entitlements.productId],
      set: {
        orderId: input.orderId ?? null,
        source: input.source ?? 'purchase',
        grantedAt: new Date(),
        revokedAt: null,
        expiresAt: input.expiresAt ?? null,
      },
    });
}

export async function getActiveEntitlement(
  db: Db,
  customerId: string,
  productId: string
): Promise<Entitlement | null> {
  const row = await db
    .select()
    .from(entitlements)
    .where(
      and(
        eq(entitlements.customerId, customerId),
        eq(entitlements.productId, productId),
        isNull(entitlements.revokedAt),
        or(isNull(entitlements.expiresAt), sql`${entitlements.expiresAt} > ${Date.now()}`)
      )
    )
    .get();
  return row ?? null;
}

export async function revokeEntitlement(
  db: Db,
  customerId: string,
  productId: string
): Promise<void> {
  await db
    .update(entitlements)
    .set({ revokedAt: new Date() })
    .where(and(eq(entitlements.customerId, customerId), eq(entitlements.productId, productId)));
}
