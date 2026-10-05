import { and, eq, gte, sql } from 'drizzle-orm';
import type { Db } from '../db/client';
import { dbBatch } from '../db/client';
import {
  downloadEvents,
  entitlements,
  licenseBuilds,
  licenses,
  productFiles,
  products,
  type Entitlement,
  type License,
  type LicenseBuild,
  type ProductFile,
} from '../db/schema';
import { uuid } from '../lib/crypto';
import { getActiveEntitlement } from './entitlements';
import { getActiveLicense } from './licenses';

export const DEFAULT_HOURLY_DOWNLOAD_LIMIT = 30;

export interface AuthorizeDownloadInput {
  customerId: string;
  productFileId: string;
  ipHash: string | null;
  uaHash: string | null;
  hourlyLimit?: number;
}

export type AuthorizeDownloadResult =
  | { ok: true; file: ProductFile; entitlement: Entitlement | null; productId: string }
  | { ok: false; status: number; reason: string };

/**
 * Decide whether a signed-in customer may download a file, then record it.
 *
 * Two gates, matching §5 of the plan:
 *  - a **free** product is downloadable by any signed-in customer;
 *  - a **premium** product needs an active entitlement (download count and
 *    expiry included).
 * A per-customer hourly cap (default 30) still applies to both. Every granted
 * download writes a `download_events` row, so usage is auditable.
 */
export async function authorizeDownload(
  db: Db,
  input: AuthorizeDownloadInput
): Promise<AuthorizeDownloadResult> {
  const file = await db
    .select()
    .from(productFiles)
    .where(eq(productFiles.id, input.productFileId))
    .get();
  if (!file) return { ok: false, status: 404, reason: 'not_found' };

  const product = await db
    .select({ id: products.id, isFree: products.isFree, active: products.active, type: products.type })
    .from(products)
    .where(eq(products.id, file.productId))
    .get();
  if (!product || !product.active) return { ok: false, status: 404, reason: 'not_found' };

  let entitlement: Entitlement | null = null;
  if (!product.isFree) {
    entitlement = await getActiveEntitlement(db, input.customerId, file.productId);
    if (!entitlement) return { ok: false, status: 403, reason: 'not_entitled' };
    if (
      entitlement.downloadLimit !== null &&
      entitlement.downloadsUsed >= entitlement.downloadLimit
    ) {
      return { ok: false, status: 429, reason: 'download_limit_reached' };
    }

    // An EA is account-bound: the compiled EX5 only runs for a licensed account,
    // so the file is only released when the licence itself is ACTIVE.
    if (product.type === 'ea') {
      const license = await getActiveLicense(db, input.customerId, file.productId);
      if (!license) return { ok: false, status: 403, reason: 'license_not_active' };
    }
  }

  const hourlyLimit = input.hourlyLimit ?? DEFAULT_HOURLY_DOWNLOAD_LIMIT;
  const windowStart = new Date(Date.now() - 60 * 60 * 1000);
  const recent = await db
    .select({ count: sql<number>`count(*)` })
    .from(downloadEvents)
    .where(
      and(
        eq(downloadEvents.customerId, input.customerId),
        gte(downloadEvents.createdAt, windowStart)
      )
    )
    .get();
  if ((recent?.count ?? 0) >= hourlyLimit) {
    return { ok: false, status: 429, reason: 'rate_limited' };
  }

  const event = db.insert(downloadEvents).values({
    id: uuid(),
    entitlementId: entitlement?.id ?? null,
    customerId: input.customerId,
    productFileId: file.id,
    ipHash: input.ipHash,
    uaHash: input.uaHash,
  });

  if (entitlement) {
    await dbBatch(db, [
      db
        .update(entitlements)
        .set({ downloadsUsed: sql`${entitlements.downloadsUsed} + 1` })
        .where(eq(entitlements.id, entitlement.id)),
      event,
    ]);
  } else {
    await event;
  }

  return { ok: true, file, entitlement, productId: product.id };
}

export interface AuthorizeBuildInput {
  customerId: string;
  buildId: string;
  hourlyLimit?: number;
}

export type AuthorizeBuildResult =
  | { ok: true; build: LicenseBuild; license: License }
  | { ok: false; status: number; reason: string };

/**
 * Decide whether a signed-in customer may download a compiled EA build.
 *
 * A build is account-bound — it is compiled from the product's source with the
 * customer's account number and expiry baked in — so unlike a `product_files`
 * download there is no shared artifact to hand out. Four gates: the build exists,
 * it belongs to *this* customer's licence, the licence is ACTIVE, and the build has
 * actually been compiled (READY). A PENDING build is never served.
 *
 * The per-customer hourly cap is shared with file downloads, so a customer cannot
 * bypass it by pulling builds instead of files.
 */
export async function authorizeBuildDownload(
  db: Db,
  input: AuthorizeBuildInput
): Promise<AuthorizeBuildResult> {
  const build = await db
    .select()
    .from(licenseBuilds)
    .where(eq(licenseBuilds.id, input.buildId))
    .get();
  if (!build) return { ok: false, status: 404, reason: 'not_found' };

  const license = await db.select().from(licenses).where(eq(licenses.id, build.licenseId)).get();
  if (!license) return { ok: false, status: 404, reason: 'not_found' };

  // Someone else's build must not be distinguishable from one that does not exist
  // — but a wrong-owner request is worth naming in the reason for support.
  if (license.customerId !== input.customerId) return { ok: false, status: 403, reason: 'not_yours' };
  if (license.status !== 'ACTIVE') return { ok: false, status: 403, reason: 'license_not_active' };
  if (build.buildStatus !== 'READY' || !build.r2Key) {
    return { ok: false, status: 403, reason: 'build_not_ready' };
  }

  const hourlyLimit = input.hourlyLimit ?? DEFAULT_HOURLY_DOWNLOAD_LIMIT;
  const windowStart = new Date(Date.now() - 60 * 60 * 1000);
  const recent = await db
    .select({ count: sql<number>`count(*)` })
    .from(downloadEvents)
    .where(
      and(
        eq(downloadEvents.customerId, input.customerId),
        gte(downloadEvents.createdAt, windowStart)
      )
    )
    .get();
  if ((recent?.count ?? 0) >= hourlyLimit) {
    return { ok: false, status: 429, reason: 'rate_limited' };
  }

  return { ok: true, build, license };
}
