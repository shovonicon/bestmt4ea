import type { APIRoute } from 'astro';
import { eq } from 'drizzle-orm';
import { env } from 'cloudflare:workers';
import { getDb } from '../../../db/client';
import { adminUsers } from '../../../db/schema';
import {
  adminSessionCookie,
  audit,
  createRecoveryCodes,
  enableTotp,
  recoveryCodesCookie,
  verifySecondFactor,
} from '../../../server/admin-auth';
import { issueSession } from '../../../lib/session';
import { json, jsonError, readBody, redirect, wantsHtml } from '../../../lib/http';

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
    return wantsHtml(request)
      ? redirect('/admin/verify/?error=invalid_code', 303)
      : jsonError(400, 'invalid_code');
  }

  // The first accepted code finishes enrolment, and that is the only moment the
  // recovery codes can be shown in the clear — so they are minted here and
  // handed to the display page through a short-lived cookie.
  const enrolledNow = !admin.totpEnabledAt;
  let recoveryCodes: string[] = [];
  if (enrolledNow) {
    await enableTotp(db, admin.id);
    recoveryCodes = await createRecoveryCodes(db, admin.id);
  }

  const verified = await issueSession(db, env.SESSION_SECRET, {
    subjectType: 'admin',
    subjectId: admin.id,
    mfaVerified: true,
  });
  await audit(db, {
    adminUserId: admin.id,
    action: enrolledNow ? 'admin.totp.enrolled' : 'admin.login.mfa_ok',
  });

  if (wantsHtml(request)) {
    const headers = new Headers({
      location: enrolledNow ? '/admin/recovery-codes/' : '/admin/',
      'cache-control': 'no-store',
    });
    headers.append('set-cookie', adminSessionCookie(verified.token));
    if (enrolledNow) headers.append('set-cookie', recoveryCodesCookie(recoveryCodes));
    return new Response(null, { status: 303, headers });
  }

  const headers = new Headers({ 'set-cookie': adminSessionCookie(verified.token) });
  if (enrolledNow) headers.append('set-cookie', recoveryCodesCookie(recoveryCodes));
  return json({ ok: true }, { headers });
};
