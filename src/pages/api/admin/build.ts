import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getDb } from '../../../db/client';
import { requireAdminMfa, audit } from '../../../server/admin-auth';
import { storeBuild } from '../../../server/builds';
import { json, jsonError, redirect, wantsHtml } from '../../../lib/http';

export const prerender = false;

/**
 * Attach a compiled build to a queued licence build — the manual fallback for when
 * the automated builder has not run (or a build needs a hand-made artefact).
 *
 * The bytes go to the private bucket, the build flips PENDING → READY, and that is
 * what makes it downloadable at `/api/download/build/<id>/`.
 */
export const POST: APIRoute = async ({ request, locals }) => {
  const session = locals.session;
  if (!requireAdminMfa(session)) {
    return wantsHtml(request) ? redirect('/admin/login/', 303) : jsonError(401, 'unauthorized');
  }

  const form = await request.formData().catch(() => null);
  const buildId = String(form?.get('buildId') ?? '');
  const file = form?.get('file');

  if (!buildId) return jsonError(400, 'missing_build');
  if (!(file instanceof File) || file.size === 0) return jsonError(400, 'missing_file');

  const db = getDb();
  const result = await storeBuild(db, env.FILES, buildId, file.name || 'build.ex4', await file.arrayBuffer(), {
    type: 'admin',
    id: session.subjectId,
  });
  if (!result.ok) {
    const status = result.reason === 'build_not_found' ? 404 : result.reason === 'file_too_large' ? 413 : 400;
    return jsonError(status, result.reason);
  }

  await audit(db, {
    adminUserId: session.subjectId,
    action: 'build.ready',
    entity: 'license_build',
    entityId: buildId,
    meta: { key: result.key, filename: file.name, bytes: file.size },
  });

  return wantsHtml(request) ? redirect('/admin/builds/', 303) : json({ ok: true, key: result.key });
};
