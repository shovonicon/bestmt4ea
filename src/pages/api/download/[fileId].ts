import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getDb } from '../../../db/client';
import { authorizeDownload } from '../../../server/downloads';
import { jsonError, redirect, wantsHtml, clientIpFrom } from '../../../lib/http';
import { sha256Hex } from '../../../lib/crypto';

export const prerender = false;

/**
 * Stream a hosted download. The R2 bucket is private: a file is only ever served
 * here, after a session is resolved and the gate in `authorizeDownload` passes.
 * There is no permanent R2 URL.
 */
export const GET: APIRoute = async ({ params, request, locals }) => {
  const session = locals.session;
  if (!session || session.subjectType !== 'customer') {
    return wantsHtml(request) ? redirect('/login/', 303) : jsonError(401, 'unauthorized');
  }

  const fileId = params.fileId ?? '';
  const db = getDb();
  const ipHash = await sha256Hex(clientIpFrom(request));
  const uaHash = await sha256Hex(request.headers.get('user-agent') ?? '');

  const result = await authorizeDownload(db, {
    customerId: session.subjectId,
    productFileId: fileId,
    ipHash,
    uaHash,
  });

  if (!result.ok) {
    if (result.status === 404) return jsonError(404, 'not_found');
    if (result.status === 403) return jsonError(403, 'not_entitled');
    if (result.status === 429) return jsonError(429, result.reason);
    return jsonError(result.status, result.reason);
  }

  const object = await env.FILES.get(result.file.r2Key);
  if (!object) return jsonError(404, 'file_missing');

  const headers = new Headers();
  headers.set('content-type', object.httpMetadata?.contentType ?? 'application/octet-stream');
  headers.set('content-length', String(object.size));
  headers.set(
    'content-disposition',
    `attachment; filename="${result.file.filename.replace(/["\\\r\n]/g, '')}"`
  );
  headers.set('cache-control', 'private, no-store');

  return new Response(object.body, { headers });
};
