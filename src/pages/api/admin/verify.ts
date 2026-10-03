import type { APIRoute } from 'astro';
import { eq } from 'drizzle-orm';
import { env } from 'cloudflare:workers';
import { getDb } from '../../../db/client';
import { adminUsers } from '../../../db/schema';
import { adminSessionCookie, audit, enableTotp, verifySecondFactor } from '../../../server/admin-auth';
import { issueSession } from '../../../lib/session';
import { json, jsonError, readBody, wantsHtml } from '../../../lib/http';

export const prerender = false;

/** Admin step 2: the TOTP code (or a recovery code). Promotes the session to verified. */
export const POST: APIRoute = async ({ request, locals }) => {
  const session = locals.session;
  if (!session || session.subjectType !== 'admin') return jsonError(401, 'unauthorized');

  const db = getDb();
  const admin = await db.select().from(adminUsers).where(eq(adminUsers.id, session.subjectId)).get();
  if (!admin) return jsonError(401, 'unauthorized');

  const body = await readBody(request);
  const ok = await verifySecondFactor(db, admin, body.code ?? '');
  if (!ok) {
    return wantsHtml(request) ? jsonError(400, 'invalid_code') : jsonError(400, 'invalid_code');
  }

  if (!admin.totpEnabledAt) await enableTotp(db, admin.id);

  const verified = await issueSession(db, env.SESSION_SECRET, {
    subjectType: 'admin',
    subjectId: admin.id,
    mfaVerified: true,
  });
  await audit(db, { adminUserId: admin.id, action: 'admin.login.mfa_ok' });

  if (wantsHtml(request)) {
    const headers = new Headers({ location: '/admin/', 'cache-control': 'no-store' });
    headers.append('set-cookie', adminSessionCookie(verified.token));
    return new Response(null, { status: 303, headers });
  }
  return json({ ok: true }, { headers: { 'set-cookie': adminSessionCookie(verified.token) } });
};
