import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getDb } from '../../../../db/client';
import { listPendingBuilds } from '../../../../server/builds';
import { json, jsonError } from '../../../../lib/http';
import { timingSafeEqual } from '../../../../lib/crypto';

export const prerender = false;

/**
 * The licence build queue, for the automated builder.
 *
 * The runner holds `CRON_SECRET`; the browser never reaches this. Each entry
 * carries everything a build needs — the account number and expiry to bind, the
 * template key, and the name the compiled artefact should carry.
 */
async function run(request: Request): Promise<Response> {
  const provided = request.headers.get('x-cron-secret') ?? '';
  if (!env.CRON_SECRET || !timingSafeEqual(provided, env.CRON_SECRET)) {
    return jsonError(401, 'unauthorized');
  }

  const limitParam = Number(new URL(request.url).searchParams.get('limit') ?? '');
  const limit = Number.isFinite(limitParam) && limitParam > 0 ? Math.min(limitParam, 100) : 25;
  const builds = await listPendingBuilds(getDb(), limit);

  return json({ builds });
}

/** GET and POST, so a runner can use either. */
export const GET: APIRoute = ({ request }) => run(request);
export const POST: APIRoute = ({ request }) => run(request);
