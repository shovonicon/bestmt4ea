import { and, eq, isNull } from 'drizzle-orm';
import type { Db } from '../db/client';
import { adminRecoveryCodes, adminUsers, auditLog, type AdminUser } from '../db/schema';
import { randomToken, sha256Hex, timingSafeEqual, uuid } from '../lib/crypto';
import { verifyPassword } from '../lib/password';
import { ADMIN_SESSION_TTL_MS, buildSessionCookie, type ResolvedSession } from '../lib/session';
import { buildOtpAuthUrl, generateTotpSecret, verifyTotp } from '../lib/totp';

/**
 * Admin authentication: password, then a TOTP second factor (or a recovery
 * code). An admin session is only usable once `mfaVerified` is true.
 */

export const ADMIN_ISSUER = 'BestMT4EA';

export function adminSessionCookie(token: string, ttlMs = ADMIN_SESSION_TTL_MS): string {
  return buildSessionCookie(token, { maxAgeSeconds: Math.floor(ttlMs / 1000) });
}

export function requireAdminMfa(session: ResolvedSession | null): session is ResolvedSession {
  return Boolean(session && session.subjectType === 'admin' && session.mfaVerified);
}

export function isPendingAdmin(session: ResolvedSession | null): session is ResolvedSession {
  return Boolean(session && session.subjectType === 'admin' && !session.mfaVerified);
}

export async function findAdminByEmail(db: Db, email: string): Promise<AdminUser | null> {
  const admin = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.email, email.trim().toLowerCase()))
    .get();
  return admin ?? null;
}

export async function authenticatePassword(
  db: Db,
  email: string,
  password: string
): Promise<AdminUser | null> {
  const admin = await findAdminByEmail(db, email);
  if (!admin || admin.disabledAt) return null;
  return (await verifyPassword(password, admin.passwordHash)) ? admin : null;
}

export async function enrollTotpSecret(
  db: Db,
  admin: AdminUser
): Promise<{ secret: string; otpauthUrl: string }> {
  const secret = generateTotpSecret();
  await db
    .update(adminUsers)
    .set({ totpSecret: secret, totpEnabledAt: null })
    .where(eq(adminUsers.id, admin.id));
  return { secret, otpauthUrl: buildOtpAuthUrl(admin.email, ADMIN_ISSUER, secret) };
}

export async function enableTotp(db: Db, adminId: string): Promise<void> {
  await db.update(adminUsers).set({ totpEnabledAt: new Date() }).where(eq(adminUsers.id, adminId));
}

export async function createRecoveryCodes(
  db: Db,
  adminUserId: string,
  count = 10
): Promise<string[]> {
  const codes: string[] = [];
  for (let i = 0; i < count; i += 1) {
    // 12 bytes b64url-decodes to 16 characters, so stripping the `-`/`_` still
    // leaves at least 10 — every code comes out the same `XXXXX-XXXXX` shape
    // rather than the ragged length an 8-byte token produced.
    const raw = randomToken(12).replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    codes.push(`${raw.slice(0, 5)}-${raw.slice(5, 10)}`);
  }
  await db.delete(adminRecoveryCodes).where(eq(adminRecoveryCodes.adminUserId, adminUserId));
  await db.insert(adminRecoveryCodes).values(
    await Promise.all(
      codes.map(async (code) => ({
        id: uuid(),
        adminUserId,
        codeHash: await sha256Hex(code),
      }))
    )
  );
  return codes;
}

/**
 * The codes are hashed in the database, so a plaintext copy has to reach the
 * page that shows them. They ride a short-lived, HttpOnly cookie set at
 * enrolment and are cleared the moment that page renders — shown once, then gone.
 */
export const RECOVERY_CODES_COOKIE = 'bmt4_admin_codes';
const RECOVERY_CODES_TTL_S = 10 * 60;

export function recoveryCodesCookie(codes: string[]): string {
  return [
    // `.` is cookie-safe and cannot appear in a code (base36 + a single dash).
    `${RECOVERY_CODES_COOKIE}=${codes.join('.')}`,
    'Path=/',
    'HttpOnly',
    'Secure',
    'SameSite=Lax',
    `Max-Age=${RECOVERY_CODES_TTL_S}`,
  ].join('; ');
}

async function consumeRecoveryCode(db: Db, adminUserId: string, code: string): Promise<boolean> {
  const normalized = code.trim().toUpperCase();
  const rows = await db
    .select()
    .from(adminRecoveryCodes)
    .where(and(eq(adminRecoveryCodes.adminUserId, adminUserId), isNull(adminRecoveryCodes.usedAt)))
    .all();

  for (const row of rows) {
    if (timingSafeEqual(row.codeHash, await sha256Hex(normalized))) {
      await db
        .update(adminRecoveryCodes)
        .set({ usedAt: new Date() })
        .where(eq(adminRecoveryCodes.id, row.id));
      return true;
    }
  }
  return false;
}

export async function verifySecondFactor(db: Db, admin: AdminUser, code: string): Promise<boolean> {
  if (!code) return false;
  if (admin.totpSecret && (await verifyTotp(admin.totpSecret, code))) return true;
  return consumeRecoveryCode(db, admin.id, code);
}

export interface AuditInput {
  adminUserId?: string | null;
  action: string;
  entity?: string | null;
  entityId?: string | null;
  meta?: Record<string, unknown> | null;
  ipHash?: string | null;
}

export async function audit(db: Db, input: AuditInput): Promise<void> {
  await db.insert(auditLog).values({
    id: uuid(),
    adminUserId: input.adminUserId ?? null,
    action: input.action,
    entity: input.entity ?? null,
    entityId: input.entityId ?? null,
    meta: input.meta ?? null,
    ipHash: input.ipHash ?? null,
  });
}
