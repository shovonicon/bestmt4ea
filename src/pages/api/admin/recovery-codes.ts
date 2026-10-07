import type { APIRoute } from 'astro';
import { eq } from 'drizzle-orm';
import { getDb } from '../../../db/client';
import { adminUsers } from '../../../db/schema';
import {
  audit,
  createRecoveryCodes,
  recoveryCodesCookie,
  requireAdminMfa,
} from '../../../server/admin-auth';
import { verifyCsrf } from '../../../lib/csrf';
import { jsonError, readBody, redirect } from '../../../lib/http';

export const prerender = false;

/**
 * Mint a fresh set of recovery codes.
 *
 * Anyone already holding a verified admin session can do this, which also means
 * a lost set is recoverable. The previous codes are deleted by
 * `createRecoveryCodes` before the new ones are written.
 */
export const POST: APIRoute = async ({ request, locals }) => {
  const session = locals.session;
  if (!requireAdminMfa(session)) return jsonError(401, 'unauthorized');

  const body = await readBody(request);
  if (!verifyCsrf(request, locals.csrfToken, body.csrf)) {
    return redirect('/admin/recovery-codes/?error=csrf', 303);
  }

  const db = getDb();
  const admin = await db.select().from(adminUsers).where(eq(adminUsers.id, session.subjectId)).get();
  if (!admin) return jsonError(401, 'unauthorized');

  const codes = await createRecoveryCodes(db, admin.id);
  await audit(db, { adminUserId: admin.id, action: 'admin.recovery_codes.regenerated' });

  const headers = new Headers({ location: '/admin/recovery-codes/', 'cache-control': 'no-store' });
  headers.append('set-cookie', recoveryCodesCookie(codes));
  return new Response(null, { status: 303, headers });
};
