import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getDb } from '../../../db/client';
import {
  adminSessionCookie,
  audit,
  authenticatePassword,
  enrollTotpSecret,
} from '../../../server/admin-auth';
import { issueSession } from '../../../lib/session';
import { jsonError, readBody, redirect, wantsHtml } from '../../../lib/http';

export const prerender = false;

/**
 * Admin step 1: email + password. On success an *unverified* admin session is
 * issued and the second factor is required before the panel unlocks. If the
 * admin has no TOTP yet, a secret is enrolled and shown on the verify page.
 */
export const POST: APIRoute = async ({ request }) => {
  const body = await readBody(request);
  const db = getDb();

  const admin = await authenticatePassword(db, body.email ?? '', body.password ?? '');
  if (!admin) {
    return wantsHtml(request) ? redirect('/admin/login/?error=1', 303) : jsonError(401, 'invalid');
  }

  if (!admin.totpEnabledAt) await enrollTotpSecret(db, admin);

  const session = await issueSession(db, env.SESSION_SECRET, {
    subjectType: 'admin',
    subjectId: admin.id,
    mfaVerified: false,
  });
  await audit(db, { adminUserId: admin.id, action: 'admin.login.password_ok' });

  const headers = new Headers({ location: '/admin/verify/', 'cache-control': 'no-store' });
  headers.append('set-cookie', adminSessionCookie(session.token));
  return new Response(null, { status: 303, headers });
};
