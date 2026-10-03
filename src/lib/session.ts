import { and, eq, isNull } from 'drizzle-orm';
import type { Db } from '../db/client';
import { sessions } from '../db/schema';
import { hmacHex, randomToken, uuid } from './crypto';

export const SESSION_COOKIE = 'bmt4_session';
export const DEFAULT_SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30;
export const ADMIN_SESSION_TTL_MS = 1000 * 60 * 60 * 12;

export type SubjectType = 'customer' | 'admin';

export interface ResolvedSession {
  sessionId: string;
  subjectType: SubjectType;
  subjectId: string;
  mfaVerified: boolean;
  expiresAt: number;
}

export interface IssueSessionInput {
  subjectType: SubjectType;
  subjectId: string;
  mfaVerified?: boolean;
  ttlMs?: number;
  uaHash?: string | null;
  ipHash?: string | null;
}

export interface IssuedSession {
  token: string;
  sessionId: string;
  expiresAt: number;
}

function hashToken(secret: string, token: string): Promise<string> {
  return hmacHex(secret, `session:${token}`);
}

export async function issueSession(
  db: Db,
  secret: string,
  input: IssueSessionInput
): Promise<IssuedSession> {
  const token = randomToken(32);
  const id = uuid();
  const expiresAt = new Date(Date.now() + (input.ttlMs ?? DEFAULT_SESSION_TTL_MS));
  await db.insert(sessions).values({
    id,
    tokenHash: await hashToken(secret, token),
    subjectType: input.subjectType,
    subjectId: input.subjectId,
    mfaVerified: input.mfaVerified ?? false,
    uaHash: input.uaHash ?? null,
    ipHash: input.ipHash ?? null,
    expiresAt,
  });
  return { token, sessionId: id, expiresAt: expiresAt.getTime() };
}

export async function resolveSession(
  db: Db,
  secret: string,
  token: string | undefined | null
): Promise<ResolvedSession | null> {
  if (!token) return null;
  const row = await db
    .select()
    .from(sessions)
    .where(and(eq(sessions.tokenHash, await hashToken(secret, token)), isNull(sessions.revokedAt)))
    .get();
  if (!row) return null;
  if (row.expiresAt.getTime() <= Date.now()) return null;
  return {
    sessionId: row.id,
    subjectType: row.subjectType,
    subjectId: row.subjectId,
    mfaVerified: row.mfaVerified,
    expiresAt: row.expiresAt.getTime(),
  };
}

export async function revokeSession(db: Db, secret: string, token: string): Promise<void> {
  await db
    .update(sessions)
    .set({ revokedAt: new Date() })
    .where(eq(sessions.tokenHash, await hashToken(secret, token)));
}

// Host-only cookie: this is a single-origin site, so no Domain attribute is
// needed (and its absence is safer).
export function buildSessionCookie(token: string, opts: { maxAgeSeconds: number }): string {
  return [
    `${SESSION_COOKIE}=${token}`,
    'Path=/',
    'HttpOnly',
    'Secure',
    'SameSite=Lax',
    `Max-Age=${opts.maxAgeSeconds}`,
  ].join('; ');
}

export function buildClearSessionCookie(): string {
  return [`${SESSION_COOKIE}=`, 'Path=/', 'HttpOnly', 'Secure', 'SameSite=Lax', 'Max-Age=0'].join('; ');
}
