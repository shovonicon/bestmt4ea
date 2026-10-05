import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getDb } from '../../../../db/client';
import { MAX_BUILD_BYTES, storeBuild } from '../../../../server/builds';
import { json, jsonError } from '../../../../lib/http';
import { timingSafeEqual } from '../../../../lib/crypto';

export const prerender = false;

/**
 * Accept a compiled artefact from the automated builder.
 *
 * Base64 JSON rather than multipart, so the runner needs nothing but `fetch`. The
 * bytes go straight to the private bucket and the build flips PENDING → READY,
 * which is what makes it downloadable by the customer it was built for.
 */
export const POST: APIRoute = async ({ request }) => {
  const provided = request.headers.get('x-cron-secret') ?? '';
  if (!env.CRON_SECRET || !timingSafeEqual(provided, env.CRON_SECRET)) {
    return jsonError(401, 'unauthorized');
  }

  let payload: { buildId?: string; filename?: string; contentBase64?: string };
  try {
    payload = JSON.parse(await request.text());
  } catch {
    return jsonError(400, 'invalid_json');
  }

  const buildId = payload.buildId ?? '';
  const filename = payload.filename ?? '';
  const contentBase64 = payload.contentBase64 ?? '';
  if (!buildId || !filename) return jsonError(400, 'missing_fields');
  // Reject an oversized payload before decoding it.
  if (contentBase64.length > MAX_BUILD_BYTES * 1.4) return jsonError(413, 'file_too_large');

  let bytes: Uint8Array;
  try {
    const binary = atob(contentBase64);
    bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  } catch {
    return jsonError(400, 'bad_base64');
  }

  const result = await storeBuild(getDb(), env.FILES, buildId, filename, bytes, {
    type: 'system',
    id: 'builder',
  });
  if (!result.ok) {
    const status = result.reason === 'build_not_found' ? 404 : 400;
    return jsonError(status, result.reason);
  }

  return json({ ok: true, key: result.key });
};
