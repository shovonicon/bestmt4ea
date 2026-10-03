import { eq } from 'drizzle-orm';
import type { Db } from '../db/client';
import { rateLimits } from '../db/schema';

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Fixed-window rate limit backed by D1. One row per key; the window resets when
 * it ages out. Used to keep login requests and downloads from being hammered.
 */
export async function rateLimit(
  db: Db,
  key: string,
  limit: number,
  windowMs: number
): Promise<RateLimitResult> {
  const now = Date.now();
  const row = await db.select().from(rateLimits).where(eq(rateLimits.key, key)).get();

  if (!row || now - row.windowStart.getTime() >= windowMs) {
    await db
      .insert(rateLimits)
      .values({ key, windowStart: new Date(now), count: 1 })
      .onConflictDoUpdate({
        target: rateLimits.key,
        set: { windowStart: new Date(now), count: 1 },
      });
    return { allowed: true, remaining: limit - 1, resetAt: now + windowMs };
  }

  const resetAt = row.windowStart.getTime() + windowMs;
  if (row.count >= limit) {
    return { allowed: false, remaining: 0, resetAt };
  }

  await db
    .update(rateLimits)
    .set({ count: row.count + 1 })
    .where(eq(rateLimits.key, key));
  return { allowed: true, remaining: limit - row.count - 1, resetAt };
}
