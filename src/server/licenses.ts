import { and, eq, isNull, or, sql } from 'drizzle-orm';
import type { Db } from '../db/client';
import {
  licenseAccounts,
  licenseBuilds,
  licenseEvents,
  licenses,
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

export interface ActivateInput {
  licenseId: string;
  accountNumber: string;
  broker?: string | null;
  accountType?: 'real' | 'demo';
  actorId?: string | null;
}

export type LicenseActionResult =
  | { ok: true; license: License }
  | { ok: false; reason: string };

/** Bind an MT5 account and switch the licence on (PENDING → ACTIVE), then queue a build. */
export async function activateLicense(db: Db, input: ActivateInput): Promise<LicenseActionResult> {
  const license = await getLicense(db, input.licenseId);
  if (!license) return { ok: false, reason: 'not_found' };
  if (license.status === 'REVOKED') return { ok: false, reason: 'revoked' };

  const accounts = await listActiveAccounts(db, license.id);
  if (accounts.length >= license.maxAccounts) return { ok: false, reason: 'max_accounts' };

  const now = new Date();
  await db.insert(licenseAccounts).values({
    id: uuid(),
    licenseId: license.id,
    accountNumber: input.accountNumber,
    broker: input.broker ?? null,
    accountType: input.accountType ?? 'demo',
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
    accountType?: 'real' | 'demo';
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
    accountType: input.accountType ?? 'demo',
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
    accountType?: 'real' | 'demo';
  }
): Promise<{ ok: boolean; reason?: string }> {
  const license = await getLicense(db, input.licenseId);
  if (!license || license.customerId !== input.customerId) return { ok: false, reason: 'not_found' };
  await logEvent(db, license.id, 'account_change_requested', 'customer', input.customerId, {
    accountNumber: input.accountNumber,
    broker: input.broker ?? null,
    accountType: input.accountType ?? 'demo',
  });
  return { ok: true };
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
