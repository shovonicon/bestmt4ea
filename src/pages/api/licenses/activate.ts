import type { APIRoute } from 'astro';
import { getDb } from '../../../db/client';
import { activateLicense, getLicense } from '../../../server/licenses';
import { json, jsonError, readBody, redirect, wantsHtml } from '../../../lib/http';

export const prerender = false;

/** Activate a PENDING licence by binding the customer's trading account. */
export const POST: APIRoute = async ({ request, locals }) => {
  const session = locals.session;
  if (!session || session.subjectType !== 'customer') {
    return wantsHtml(request) ? redirect('/login/', 303) : jsonError(401, 'unauthorized');
  }

  const body = await readBody(request);
  const db = getDb();

  const license = await getLicense(db, body.licenseId ?? '');
  if (!license || license.customerId !== session.subjectId) return jsonError(404, 'not_found');

  const accountNumber = (body.accountNumber ?? '').trim();
  if (!/^\d{4,12}$/.test(accountNumber)) return jsonError(400, 'invalid_account');

  const result = await activateLicense(db, {
    licenseId: license.id,
    accountNumber,
    broker: body.broker ?? null,
    // Only consulted when the product ships for both terminals; ignored otherwise.
    platform: body.platform ?? null,
    actorId: session.subjectId,
  });
  if (!result.ok) return jsonError(result.reason === 'max_accounts' ? 409 : 400, result.reason);

  return wantsHtml(request)
    ? redirect('/dashboard/licenses/', 303)
    : json({ ok: true, status: result.license.status, key: result.license.licenseKey });
};
