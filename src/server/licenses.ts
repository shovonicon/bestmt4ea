import { and, desc, eq, isNotNull, isNull, or, sql } from 'drizzle-orm';
import type { Db } from '../db/client';
import {
  licenseAccounts,
  licenseBuilds,
  licenseEvents,
  licenses,
  products,
  type License,
  type LicenseAccount,
  type LicenseBuild,
} from '../db/schema';
import { randomInt, uuid } from '../lib/crypto';

/**
 * Licence management (plan §6c).
 *
 * An **entitlement** is what a customer bought; a **licence** is the concrete
 * activation of it — a key, a status window, the bound MT5 account(s) and the
 * compiled EX5 build(s). Every state change writes a `license_events` row so the
 * whole life of a licence is auditable.
 */

// Unambiguous alphabet: no 0/O, 1/I/L.
const KEY_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
const KEY_GROUP = 4;

/** `BMT4-ONX7-92KQ-X8F2` — non-sequential, from an unambiguous alphabet. */
export function generateLicenseKey(prefix = 'BMT4'): string {
  const group = () =>
    Array.from({ length: KEY_GROUP }, () => KEY_ALPHABET[randomInt(KEY_ALPHABET.length)]).join('');
  return `${prefix}-${group()}-${group()}-${group()}`;
}

export type LicenseStatus = 'PENDING' | 'ACTIVE' | 'EXPIRED' | 'SUSPENDED' | 'REVOKED';
type ActorType = 'customer' | 'admin' | 'system';

export async function getLicense(db: Db, id: string): Promise<License | null> {
  const row = await db.select().from(licenses).where(eq(licenses.id, id)).get();
  return row ?? null;
}

export async function getLicenseByKey(db: Db, key: string): Promise<License | null> {
  const row = await db.select().from(licenses).where(eq(licenses.licenseKey, key)).get();
  return row ?? null;
}

export async function listLicensesForCustomer(db: Db, customerId: string): Promise<License[]> {
  return db.select().from(licenses).where(eq(licenses.customerId, customerId)).all();
}

export async function listActiveAccounts(db: Db, licenseId: string): Promise<LicenseAccount[]> {
  return db
    .select()
    .from(licenseAccounts)
    .where(and(eq(licenseAccounts.licenseId, licenseId), eq(licenseAccounts.active, true)))
    .all();
}

/** An ACTIVE licence inside its window — the gate premium downloads use. */
export async function getActiveLicense(
  db: Db,
  customerId: string,
  productId: string
): Promise<License | null> {
  const row = await db
    .select()
    .from(licenses)
    .where(
      and(
        eq(licenses.customerId, customerId),
        eq(licenses.productId, productId),
        eq(licenses.status, 'ACTIVE'),
        or(isNull(licenses.expiresAt), sql`${licenses.expiresAt} > ${Date.now()}`)
      )
    )
    .get();
  return row ?? null;
}

/** True when this customer has any licence for the product (so it is per-account gated). */
export async function hasAnyLicense(db: Db, customerId: string, productId: string): Promise<boolean> {
  const row = await db
    .select({ id: licenses.id })
    .from(licenses)
    .where(and(eq(licenses.customerId, customerId), eq(licenses.productId, productId)))
    .get();
  return Boolean(row);
}

async function logEvent(
  db: Db,
  licenseId: string,
  action: string,
  actorType: ActorType,
  actorId: string | null,
  meta?: Record<string, unknown>
): Promise<void> {
  await db.insert(licenseEvents).values({
    id: uuid(),
    licenseId,
    action,
    actorType,
    actorId,
    meta: meta ?? null,
    createdAt: new Date(),
  });
}

async function enqueueBuild(
  db: Db,
  licenseId: string,
  accountNumber: string,
  expiresAt: Date | null,
  productVersionId?: string | null
): Promise<string> {
  const id = uuid();
  await db.insert(licenseBuilds).values({
    id,
    licenseId,
    productVersionId: productVersionId ?? null,
    accountNumber,
    expirationDate: expiresAt,
    buildStatus: 'PENDING',
    requestedAt: new Date(),
  });
  return id;
}

export interface CreateLicenseInput {
  entitlementId: string;
  customerId: string;
  productId: string;
  maxAccounts?: number;
  expiresAt?: Date | null;
}

/** Create a PENDING licence (on purchase, or by an admin). */
export async function createLicense(db: Db, input: CreateLicenseInput): Promise<License> {
  const id = uuid();
  const now = new Date();
  const licenseKey = generateLicenseKey();
  await db.insert(licenses).values({
    id,
    entitlementId: input.entitlementId,
    customerId: input.customerId,
    productId: input.productId,
    licenseKey,
    status: 'PENDING',
    maxAccounts: input.maxAccounts ?? 1,
    startsAt: null,
    expiresAt: input.expiresAt ?? null,
    createdAt: now,
    updatedAt: now,
  });
  await logEvent(db, id, 'created', 'system', null, { licenseKey });
  const row = await getLicense(db, id);
  if (!row) throw new Error('license_create_failed');
  return row;
}

/**
 * A trial is live the moment it is bought. There is no account to bind, so the
 * only thing compiled into its build is the expiry.
 *
 * The bound `Account` value carries the whole rule, because the compiled source
 * tests `(AccountNumber() != Account && Account != 0) && !IsDemoAccount()`:
 *
 *   `0`       any account at all   (the source's own default — never shipped)
 *   `-1`      any demo account     (a trial: demos pass, a live terminal is refused)
 *   `1234567` that one account     (a paid licence)
 *
 * `-1` is also why this is deliberately *not* `activateLicense` — that one requires
 * an account number and a binding, which is exactly what a trial does not have.
 */
export const TRIAL_ACCOUNT = '-1';

export async function activateTrialLicense(db: Db, licenseId: string): Promise<LicenseActionResult> {
  const license = await getLicense(db, licenseId);
  if (!license) return { ok: false, reason: 'not_found' };
  if (license.status === 'REVOKED') return { ok: false, reason: 'revoked' };
  if (license.status === 'ACTIVE') return { ok: true, license };

  const now = new Date();
  await db
    .update(licenses)
    .set({ status: 'ACTIVE', startsAt: license.startsAt ?? now, updatedAt: now })
    .where(eq(licenses.id, license.id));
  await enqueueBuild(db, license.id, TRIAL_ACCOUNT, license.expiresAt);
  await logEvent(db, license.id, 'activated', 'system', null, { trial: true, accountNumber: null });

  const updated = await getLicense(db, license.id);
  return updated ? { ok: true, license: updated } : { ok: false, reason: 'not_found' };
}

export interface ActivateInput {
  licenseId: string;
  accountNumber: string;
  broker?: string | null;
  /** Which terminal, when the product ships for both. Ignored for a single-platform product. */
  platform?: string | null;
  actorId?: string | null;
}

export type LicenseActionResult =
  | { ok: true; license: License }
  | { ok: false; reason: string };

/**
 * Which terminal an activation is for.
 *
 * The product decides whenever it was built for one terminal — the customer is
 * never asked, and cannot get it wrong. Only a product published for both takes
 * the customer's answer, and then a missing or contradictory one is refused
 * rather than guessed: a build compiled for the wrong terminal simply will not run.
 */
async function resolvePlatform(
  db: Db,
  productId: string,
  requested: string | null | undefined
): Promise<string | null | 'invalid'> {
  const product = await db
    .select({ platform: products.platform })
    .from(products)
    .where(eq(products.id, productId))
    .get();
  const platform = product?.platform ?? 'none';
  if (platform === 'MT4' || platform === 'MT5') return platform;
  if (platform !== 'MT4/MT5') return null;
  return requested === 'MT4' || requested === 'MT5' ? requested : 'invalid';
}

/** Bind an MT4/MT5 account and switch the licence on (PENDING → ACTIVE), then queue a build. */
export async function activateLicense(db: Db, input: ActivateInput): Promise<LicenseActionResult> {
  const license = await getLicense(db, input.licenseId);
  if (!license) return { ok: false, reason: 'not_found' };
  if (license.status === 'REVOKED') return { ok: false, reason: 'revoked' };

  const platform = await resolvePlatform(db, license.productId, input.platform);
  if (platform === 'invalid') return { ok: false, reason: 'platform_required' };

  const accounts = await listActiveAccounts(db, license.id);
  if (accounts.length >= license.maxAccounts) return { ok: false, reason: 'max_accounts' };

  const now = new Date();
  await db.insert(licenseAccounts).values({
    id: uuid(),
    licenseId: license.id,
    accountNumber: input.accountNumber,
    broker: input.broker ?? null,
    active: true,
    createdAt: now,
  });
  await db
    .update(licenses)
    .set({ status: 'ACTIVE', startsAt: license.startsAt ?? now, updatedAt: now })
    .where(eq(licenses.id, license.id));
  await enqueueBuild(db, license.id, input.accountNumber, license.expiresAt);
  await logEvent(db, license.id, 'activated', input.actorId ? 'customer' : 'system', input.actorId ?? null, {
    accountNumber: input.accountNumber,
    platform,
  });

  const updated = await getLicense(db, license.id);
  return updated ? { ok: true, license: updated } : { ok: false, reason: 'not_found' };
}

/** Extend the window and rebuild (expiry is compiled into the EX5). */
export async function extendLicense(
  db: Db,
  input: { licenseId: string; expiresAt: Date | null; actorId?: string | null }
): Promise<LicenseActionResult> {
  const license = await getLicense(db, input.licenseId);
  if (!license) return { ok: false, reason: 'not_found' };

  const status: LicenseStatus = license.status === 'EXPIRED' ? 'ACTIVE' : license.status;
  await db
    .update(licenses)
    .set({ expiresAt: input.expiresAt, status, updatedAt: new Date() })
    .where(eq(licenses.id, license.id));

  const account = (await listActiveAccounts(db, license.id))[0];
  if (account) await enqueueBuild(db, license.id, account.accountNumber, input.expiresAt);
  await logEvent(db, license.id, 'extended', 'admin', input.actorId ?? null, {
    expiresAt: input.expiresAt ? input.expiresAt.toISOString() : null,
  });
  const updated = await getLicense(db, license.id);
  return updated ? { ok: true, license: updated } : { ok: false, reason: 'not_found' };
}

/** Move the licence to a new MT5 account: deactivate the old binding, add the new, rebuild. */
export async function changeLicenseAccount(
  db: Db,
  input: {
    licenseId: string;
    accountNumber: string;
    broker?: string | null;
    actorId?: string | null;
  }
): Promise<LicenseActionResult> {
  const license = await getLicense(db, input.licenseId);
  if (!license) return { ok: false, reason: 'not_found' };

  const now = new Date();
  await db
    .update(licenseAccounts)
    .set({ active: false, deactivatedAt: now })
    .where(and(eq(licenseAccounts.licenseId, license.id), eq(licenseAccounts.active, true)));
  await db.insert(licenseAccounts).values({
    id: uuid(),
    licenseId: license.id,
    accountNumber: input.accountNumber,
    broker: input.broker ?? null,
    active: true,
    createdAt: now,
  });
  await enqueueBuild(db, license.id, input.accountNumber, license.expiresAt);
  await logEvent(db, license.id, 'account_changed', 'admin', input.actorId ?? null, {
    accountNumber: input.accountNumber,
  });
  const updated = await getLicense(db, license.id);
  return updated ? { ok: true, license: updated } : { ok: false, reason: 'not_found' };
}

export async function setLicenseStatus(
  db: Db,
  input: { licenseId: string; status: LicenseStatus; action: string; actorId?: string | null }
): Promise<LicenseActionResult> {
  const license = await getLicense(db, input.licenseId);
  if (!license) return { ok: false, reason: 'not_found' };
  if (license.status === 'REVOKED' && input.status !== 'REVOKED') {
    return { ok: false, reason: 'revoked_is_terminal' };
  }
  await db
    .update(licenses)
    .set({
      status: input.status,
      updatedAt: new Date(),
      ...(input.status === 'REVOKED' ? { revokedAt: new Date() } : {}),
    })
    .where(eq(licenses.id, license.id));
  await logEvent(db, license.id, input.action, 'admin', input.actorId ?? null, { status: input.status });
  const updated = await getLicense(db, license.id);
  return updated ? { ok: true, license: updated } : { ok: false, reason: 'not_found' };
}

export const suspendLicense = (db: Db, licenseId: string, actorId?: string | null) =>
  setLicenseStatus(db, { licenseId, status: 'SUSPENDED', action: 'suspended', actorId });
export const resumeLicense = (db: Db, licenseId: string, actorId?: string | null) =>
  setLicenseStatus(db, { licenseId, status: 'ACTIVE', action: 'resumed', actorId });
export const revokeLicense = (db: Db, licenseId: string, actorId?: string | null) =>
  setLicenseStatus(db, { licenseId, status: 'REVOKED', action: 'revoked', actorId });

/**
 * A customer asking to move the licence to a different MT5 account. This records
 * the request only — an admin approves it (P7) via `changeLicenseAccount`, since
 * account changes are limited, not unlimited.
 */
export async function requestAccountChange(
  db: Db,
  input: {
    licenseId: string;
    customerId: string;
    accountNumber: string;
    broker?: string | null;
  }
): Promise<{ ok: boolean; reason?: string }> {
  const license = await getLicense(db, input.licenseId);
  if (!license || license.customerId !== input.customerId) return { ok: false, reason: 'not_found' };
  await logEvent(db, license.id, 'account_change_requested', 'customer', input.customerId, {
    accountNumber: input.accountNumber,
    broker: input.broker ?? null,
  });
  return { ok: true };
}

/** Expire ACTIVE licences whose window has passed. Returns how many moved. */
export async function expireLicenses(db: Db, now = Date.now()): Promise<number> {
  const due = await db
    .select({ id: licenses.id })
    .from(licenses)
    .where(
      and(
        eq(licenses.status, 'ACTIVE'),
        isNotNull(licenses.expiresAt),
        sql`${licenses.expiresAt} < ${now}`
      )
    )
    .all();
  for (const row of due) {
    await db
      .update(licenses)
      .set({ status: 'EXPIRED', updatedAt: new Date(now) })
      .where(eq(licenses.id, row.id));
    await logEvent(db, row.id, 'expired', 'system', null, {});
  }
  return due.length;
}

/* -------------------------------------------------------------- build queue */

export async function listPendingBuilds(db: Db): Promise<LicenseBuild[]> {
  return db.select().from(licenseBuilds).where(eq(licenseBuilds.buildStatus, 'PENDING')).all();
}

export async function markBuildReady(db: Db, buildId: string, r2Key: string): Promise<void> {
  await db
    .update(licenseBuilds)
    .set({ buildStatus: 'READY', r2Key, builtAt: new Date() })
    .where(eq(licenseBuilds.id, buildId));
}

export async function markBuildFailed(db: Db, buildId: string, error: string): Promise<void> {
  await db
    .update(licenseBuilds)
    .set({ buildStatus: 'FAILED', error, builtAt: new Date() })
    .where(eq(licenseBuilds.id, buildId));
}

/**
 * Record that a customer downloaded their compiled build.
 *
 * A build is not a `product_file`, and `download_events.product_file_id` is NOT
 * NULL, so the audit entry belongs on the licence timeline rather than in the
 * file-download log.
 */
export async function recordBuildDownload(db: Db, build: LicenseBuild, customerId: string): Promise<void> {
  await logEvent(db, build.licenseId, 'build_downloaded', 'customer', customerId, {
    buildId: build.id,
    accountNumber: build.accountNumber,
  });
}

/** Record that a compiled artefact was attached to a build (builder or admin). */
export async function recordBuildReady(
  db: Db,
  build: LicenseBuild,
  r2Key: string,
  actorType: 'admin' | 'system' = 'system',
  actorId: string | null = null
): Promise<void> {
  await logEvent(db, build.licenseId, 'build_ready', actorType, actorId, {
    buildId: build.id,
    accountNumber: build.accountNumber,
    r2Key,
  });
}

/** Re-queue a build for the licence's active account (e.g. after a version bump). */
export async function rebuildLicense(
  db: Db,
  licenseId: string,
  actorId?: string | null
): Promise<LicenseActionResult> {
  const license = await getLicense(db, licenseId);
  if (!license) return { ok: false, reason: 'not_found' };
  const account = (await listActiveAccounts(db, license.id))[0];
  if (!account) return { ok: false, reason: 'no_account' };
  await enqueueBuild(db, license.id, account.accountNumber, license.expiresAt);
  await logEvent(db, license.id, 'rebuild_requested', 'admin', actorId ?? null, {});
  const updated = await getLicense(db, license.id);
  return updated ? { ok: true, license: updated } : { ok: false, reason: 'not_found' };
}

export interface PendingAccountChange {
  accountNumber: string;
  broker: string | null;
}

/** The most recent un-actioned account-change request an admin can approve. */
export async function getPendingAccountChangeRequest(
  db: Db,
  licenseId: string
): Promise<PendingAccountChange | null> {
  const row = await db
    .select()
    .from(licenseEvents)
    .where(
      and(eq(licenseEvents.licenseId, licenseId), eq(licenseEvents.action, 'account_change_requested'))
    )
    .orderBy(desc(licenseEvents.createdAt))
    .get();
  const meta = row?.meta as Record<string, unknown> | undefined;
  if (!meta || typeof meta.accountNumber !== 'string') return null;
  return {
    accountNumber: meta.accountNumber,
    broker: typeof meta.broker === 'string' ? meta.broker : null,
  };
}
