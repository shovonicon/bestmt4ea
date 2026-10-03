import type { APIRoute } from 'astro';
import { and, inArray, lt } from 'drizzle-orm';
import { env } from 'cloudflare:workers';
import { getDb } from '../../../db/client';
import { cryptoPayments, rateLimits } from '../../../db/schema';
import { json, jsonError } from '../../../lib/http';
import { timingSafeEqual } from '../../../lib/crypto';

export const prerender = false;

/**
 * Daily housekeeping: drop settled/expired USDT payment rows older than 30 days
 * and stale rate-limit windows older than a day. Cron-guarded.
 */
async function run(request: Request): Promise<Response> {
  const provided = request.headers.get('x-cron-secret') ?? '';
  if (!env.CRON_SECRET || !timingSafeEqual(provided, env.CRON_SECRET)) {
    return jsonError(401, 'unauthorized');
  }

  const db = getDb();
  const now = Date.now();
  await db.delete(cryptoPayments).where(
    and(
      inArray(cryptoPayments.status, ['EXPIRED', 'FAILED']),
      lt(cryptoPayments.createdAt, new Date(now - 30 * 86_400_000))
    )
  );
  await db.delete(rateLimits).where(lt(rateLimits.windowStart, new Date(now - 86_400_000)));

  return json({ ok: true });
}

/** GET too, so the cron can use either method. */
export const GET: APIRoute = ({ request }) => run(request);
export const POST: APIRoute = ({ request }) => run(request);
