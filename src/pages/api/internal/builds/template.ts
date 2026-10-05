import type { APIRoute } from 'astro';
import { eq } from 'drizzle-orm';
import { env } from 'cloudflare:workers';
import { getDb } from '../../../../db/client';
import { products } from '../../../../db/schema';
import { templateKeyFor } from '../../../../server/builds';
import { jsonError } from '../../../../lib/http';
import { timingSafeEqual } from '../../../../lib/crypto';

export const prerender = false;

/**
 * Hand a product's MQL source template to the builder.
 *
 * The bucket key is derived from the catalogue, never taken from the request: the
 * caller passes a product id, it is looked up, and only then is
 * `templates/<productId>/source.mq4` read — so this cannot be turned into an
 * arbitrary-object reader. Token-guarded, and no-store: the source is the owner's
 * IP and must not sit in any cache.
 */
async function run(request: Request): Promise<Response> {
  const provided = request.headers.get('x-cron-secret') ?? '';
  if (!env.CRON_SECRET || !timingSafeEqual(provided, env.CRON_SECRET)) {
    return jsonError(401, 'unauthorized');
  }

  const productId = new URL(request.url).searchParams.get('productId') ?? '';
  if (!productId) return jsonError(400, 'missing_product');

  const db = getDb();
  const product = await db
    .select({ id: products.id })
    .from(products)
    .where(eq(products.id, productId))
    .get();
  if (!product) return jsonError(404, 'unknown_product');

  const key = templateKeyFor(product.id);
  const object = await env.FILES.get(key);
  if (!object) return jsonError(404, 'template_missing');

  const headers = new Headers();
  headers.set('content-type', 'text/plain; charset=utf-8');
  headers.set('content-length', String(object.size));
  headers.set('cache-control', 'no-store');

  return new Response(object.body, { headers });
}

export const GET: APIRoute = ({ request }) => run(request);
export const POST: APIRoute = ({ request }) => run(request);
