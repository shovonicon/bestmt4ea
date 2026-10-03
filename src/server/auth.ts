import { and, desc, eq, gt, isNull } from 'drizzle-orm';
import type { Db } from '../db/client';
import { customers, loginTokens, type Customer } from '../db/schema';
import { hmacHex, randomToken, timingSafeEqual, uuid } from '../lib/crypto';
import {
  buildClearSessionCookie,
  buildSessionCookie,
  DEFAULT_SESSION_TTL_MS,
} from '../lib/session';

/**
 * Passwordless (magic-link / one-time-code) customer auth, ported from the
 * proven BD MARKET reference. There is no password to store or steal: a signed,
 * single-use token is emailed and exchanged for a D1-backed session.
 */

export const LOGIN_TOKEN_TTL_MS = 15 * 60 * 1000;

export function authCookie(token: string): string {
  return buildSessionCookie(token, {
    maxAgeSeconds: Math.floor(DEFAULT_SESSION_TTL_MS / 1000),
  });
}

export function authClearCookie(): string {
  return buildClearSessionCookie();
}

// Remembers which address a sign-in code was just sent to, so the code step
// never has to ask for the email a second time. Short-lived on purpose.
export const PENDING_LOGIN_EMAIL_COOKIE = 'bmt4_login_email';
export const PENDING_LOGIN_EMAIL_TTL_S = 15 * 60;

export function pendingLoginEmailCookie(email: string): string {
  return [
    `${PENDING_LOGIN_EMAIL_COOKIE}=${email}`,
    'Path=/',
    'HttpOnly',
    'Secure',
    'SameSite=Lax',
    `Max-Age=${PENDING_LOGIN_EMAIL_TTL_S}`,
  ].join('; ');
}

export function clearPendingLoginEmailCookie(): string {
  return [
    `${PENDING_LOGIN_EMAIL_COOKIE}=`,
    'Path=/',
    'HttpOnly',
    'Secure',
    'SameSite=Lax',
    'Max-Age=0',
  ].join('; ');
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export interface RequestLoginInput {
  email: string;
  ipHash: string | null;
}

export interface RequestLoginResult {
  token: string;
  code: string;
  expiresAt: number;
}

export async function requestLogin(
  db: Db,
  secret: string,
  input: RequestLoginInput
): Promise<RequestLoginResult | null> {
  const email = normalizeEmail(input.email);
  if (!isValidEmail(email)) return null;

  const token = randomToken(32);
  const code = String(Math.floor(100000 + Math.random() * 900000));
  const id = uuid();

  await db.insert(loginTokens).values({
    id,
    email,
    tokenHash: await hmacHex(secret, `login:${token}`),
    codeHash: await hmacHex(secret, `code:${id}:${code}`),
    expiresAt: new Date(Date.now() + LOGIN_TOKEN_TTL_MS),
    ipHash: input.ipHash,
  });

  return { token, code, expiresAt: Date.now() + LOGIN_TOKEN_TTL_MS };
}

export async function upsertCustomer(db: Db, email: string): Promise<Customer> {
  const normalized = normalizeEmail(email);
  const existing = await db.select().from(customers).where(eq(customers.email, normalized)).get();
  const now = new Date();

  if (existing) {
    await db
      .update(customers)
      .set({
        lastLoginAt: now,
        emailVerifiedAt: existing.emailVerifiedAt ?? now,
        updatedAt: now,
      })
      .where(eq(customers.id, existing.id));
    return { ...existing, lastLoginAt: now, emailVerifiedAt: existing.emailVerifiedAt ?? now };
  }

  const id = uuid();
  await db.insert(customers).values({
    id,
    email: normalized,
    emailVerifiedAt: now,
    lastLoginAt: now,
  });
  return {
    id,
    email: normalized,
    name: null,
    phone: null,
    emailVerifiedAt: now,
    lastLoginAt: now,
    createdAt: now,
    updatedAt: now,
  };
}

export async function consumeTokenByLink(
  db: Db,
  secret: string,
  token: string
): Promise<Customer | null> {
  const row = await db
    .select()
    .from(loginTokens)
    .where(
      and(
        eq(loginTokens.tokenHash, await hmacHex(secret, `login:${token}`)),
        isNull(loginTokens.consumedAt),
        gt(loginTokens.expiresAt, new Date())
      )
    )
    .get();
  if (!row) return null;
  await db.update(loginTokens).set({ consumedAt: new Date() }).where(eq(loginTokens.id, row.id));
  return upsertCustomer(db, row.email);
}

export async function consumeTokenByCode(
  db: Db,
  secret: string,
  email: string,
  code: string
): Promise<Customer | null> {
  const normalized = normalizeEmail(email);
  const row = await db
    .select()
    .from(loginTokens)
    .where(
      and(
        eq(loginTokens.email, normalized),
        isNull(loginTokens.consumedAt),
        gt(loginTokens.expiresAt, new Date())
      )
    )
    .orderBy(desc(loginTokens.createdAt))
    .get();
  if (!row) return null;

  const expected = await hmacHex(secret, `code:${row.id}:${code.trim()}`);
  if (!timingSafeEqual(expected, row.codeHash)) return null;

  await db.update(loginTokens).set({ consumedAt: new Date() }).where(eq(loginTokens.id, row.id));
  return upsertCustomer(db, normalized);
}
