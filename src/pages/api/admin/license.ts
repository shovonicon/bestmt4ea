import type { APIRoute } from 'astro';
import { getDb } from '../../../db/client';
import { requireAdminMfa, audit } from '../../../server/admin-auth';
import {
  changeLicenseAccount,
  extendLicense,
  getPendingAccountChangeRequest,
  rebuildLicense,
  resumeLicense,
  revokeLicense,
  suspendLicense,
} from '../../../server/licenses';
import { json, jsonError, readBody, redirect, wantsHtml } from '../../../lib/http';

export const prerender = false;

type ActionResult = { ok: boolean; reason?: string };

/** Admin licence actions: suspend / resume / revoke / extend / rebuild / approve a change. */
export const POST: APIRoute = async ({ request, locals }) => {
  const session = locals.session;
  if (!requireAdminMfa(session)) {
    return wantsHtml(request) ? redirect('/admin/login/', 303) : jsonError(401, 'unauthorized');
  }

  const body = await readBody(request);
  const db = getDb();
  const licenseId = body.licenseId ?? '';
  const action = body.action ?? '';

  let result: ActionResult = { ok: false, reason: 'unknown_action' };

  if (action === 'suspend') result = await suspendLicense(db, licenseId, session.subjectId);
  else if (action === 'resume') result = await resumeLicense(db, licenseId, session.subjectId);
  else if (action === 'revoke') result = await revokeLicense(db, licenseId, session.subjectId);
  else if (action === 'extend') {
    const days = Number(body.days) > 0 ? Number(body.days) : 365;
    result = await extendLicense(db, {
      licenseId,
      expiresAt: new Date(Date.now() + days * 86_400_000),
      actorId: session.subjectId,
    });
  } else if (action === 'rebuild') result = await rebuildLicense(db, licenseId, session.subjectId);
  else if (action === 'approve-account-change') {
    const pending = await getPendingAccountChangeRequest(db, licenseId);
    if (!pending) result = { ok: false, reason: 'no_request' };
    else
      result = await changeLicenseAccount(db, {
        licenseId,
        accountNumber: pending.accountNumber,
        broker: pending.broker,
        accountType: pending.accountType,
        actorId: session.subjectId,
      });
  }

  if (!result.ok) return jsonError(400, result.reason ?? 'failed');
  await audit(db, {
    adminUserId: session.subjectId,
    action: `license.${action}`,
    entity: 'license',
    entityId: licenseId,
  });

  return wantsHtml(request)
    ? redirect('/admin/licenses/', 303)
    : json({ ok: true });
};
