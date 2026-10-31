import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getDb } from '../../../db/client';
import { json, jsonError } from '../../../lib/http';
import { timingSafeEqual } from '../../../lib/crypto';
import { runPaymentReminders } from '../../../server/payment-reminders';

export const prerender = false;

/**
 * Daily job: send the next automatic payment reminder for each unpaid order that
 * is due (3 days, then 7 days, then 30 days after the previous one). Cron-guarded.
 */
async function run(request: Request): Promise<Response> {
  const provided = request.headers.get('x-cron-secret') ?? '';
  if (!env.CRON_SECRET || !timingSafeEqual(provided, env.CRON_SECRET)) {
    return jsonError(401, 'unauthorized');
  }

  const result = await runPaymentReminders(getDb());
  return json({ ok: true, ...result });
}

/** GET too, so the cron can use either method. */
export const GET: APIRoute = ({ request }) => run(request);
export const POST: APIRoute = ({ request }) => run(request);
