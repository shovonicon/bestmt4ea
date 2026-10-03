import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getDb } from '../../../db/client';
import { expireLicenses } from '../../../server/licenses';
import { json, jsonError } from '../../../lib/http';
import { timingSafeEqual } from '../../../lib/crypto';

export const prerender = false;

/** Daily sweep: ACTIVE licences past their window become EXPIRED. Cron-guarded. */
async function run(request: Request): Promise<Response> {
  const provided = request.headers.get('x-cron-secret') ?? '';
  if (!env.CRON_SECRET || !timingSafeEqual(provided, env.CRON_SECRET)) {
    return jsonError(401, 'unauthorized');
  }
  const expired = await expireLicenses(getDb());
  return json({ ok: true, expired });
}

export const GET: APIRoute = ({ request }) => run(request);
export const POST: APIRoute = ({ request }) => run(request);
