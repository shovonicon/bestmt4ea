import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getDb } from '../../../db/client';
import { pollUsdtPayments } from '../../../server/usdt-payments';
import { json, jsonError } from '../../../lib/http';
import { timingSafeEqual } from '../../../lib/crypto';

export const prerender = false;

/**
 * Cron entry — the 60s USDT sweep.
 *
 * The Cloudflare adapter owns the Worker entrypoint, so the Cron Trigger lives
 * on a small companion Worker that calls this endpoint with `x-cron-secret`.
 * Guarded by a shared secret; the browser never reaches it.
 *
 * Callers must send `Content-Type: application/json` (or a matching `Origin`):
 * Astro rejects form-shaped POSTs from elsewhere, by design.
 */
async function run(request: Request): Promise<Response> {
  const provided = request.headers.get('x-cron-secret') ?? '';
  if (!env.CRON_SECRET || !timingSafeEqual(provided, env.CRON_SECRET)) {
    return jsonError(401, 'unauthorized');
  }
  const address = env.USDT_RECEIVING_ADDRESS;
  if (!address) return jsonError(503, 'usdt_not_configured');

  const result = await pollUsdtPayments(getDb(), {
    walletAddress: address,
    bsc: {
      baseUrl: env.ETHERSCAN_BASE_URL || undefined,
      apiKey: env.ETHERSCAN_API_KEY || undefined,
    },
  });
  return json(result);
}

export const GET: APIRoute = ({ request }) => run(request);
export const POST: APIRoute = ({ request }) => run(request);
