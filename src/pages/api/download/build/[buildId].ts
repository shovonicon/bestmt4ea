import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getDb } from '../../../../db/client';
import { authorizeBuildDownload } from '../../../../server/downloads';
import { recordBuildDownload } from '../../../../server/licenses';
import { jsonError, redirect, wantsHtml } from '../../../../lib/http';

export const prerender = false;

/**
 * Stream a customer's compiled EA build.
 *
 * This is the delivery half of the licence-build queue: `markBuildReady()` records
 * an R2 key, and this route is the only thing that ever serves it. The bucket is
 * private and there is no permanent URL, so a build is released only after a
 * session resolves and every gate in `authorizeBuildDownload` passes — the build
 * belongs to this customer's licence, that licence is ACTIVE, and the build has
 * actually been compiled (READY). A PENDING build is never served.
 */
export const GET: APIRoute = async ({ params, request, locals }) => {
  const session = locals.session;
  if (!session || session.subjectType !== 'customer') {
    return wantsHtml(request) ? redirect('/login/', 303) : jsonError(401, 'unauthorized');
  }

  const buildId = params.buildId ?? '';
  const db = getDb();
  const result = await authorizeBuildDownload(db, { customerId: session.subjectId, buildId });

  if (!result.ok) {
    if (result.status === 404) return jsonError(404, 'not_found');
    if (result.status === 403) return jsonError(403, result.reason);
    if (result.status === 429) return jsonError(429, result.reason);
    return jsonError(result.status, result.reason);
  }

  // Non-null: `authorizeBuildDownload` only succeeds on a READY build with a key.
  const key = result.build.r2Key as string;
  const object = await env.FILES.get(key);
  if (!object) return jsonError(404, 'file_missing');

  await recordBuildDownload(db, result.build, session.subjectId);

  const filename = key.split('/').pop() || `build-${result.build.accountNumber}.ex4`;
  const headers = new Headers();
  headers.set('content-type', object.httpMetadata?.contentType ?? 'application/octet-stream');
  headers.set('content-length', String(object.size));
  headers.set('content-disposition', `attachment; filename="${filename.replace(/["\\\r\n]/g, '')}"`);
  headers.set('cache-control', 'private, no-store');

  return new Response(object.body, { headers });
};
