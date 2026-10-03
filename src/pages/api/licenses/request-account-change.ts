import type { APIRoute } from 'astro';
import { getDb } from '../../../db/client';
import { requestAccountChange } from '../../../server/licenses';
import { json, jsonError, readBody, redirect, wantsHtml } from '../../../lib/http';

export const prerender = false;

/** A customer requests a different MT5 account; an admin approves it (P7). */
export const POST: APIRoute = async ({ request, locals }) => {
  const session = locals.session;
  if (!session || session.subjectType !== 'customer') {
    return wantsHtml(request) ? redirect('/login/', 303) : jsonError(401, 'unauthorized');
  }

  const body = await readBody(request);
  const accountNumber = (body.accountNumber ?? '').trim();
  if (!/^\d{4,12}$/.test(accountNumber)) return jsonError(400, 'invalid_account');

  const result = await requestAccountChange(getDb(), {
    licenseId: body.licenseId ?? '',
    customerId: session.subjectId,
    accountNumber,
    broker: body.broker ?? null,
    accountType: body.accountType === 'real' ? 'real' : 'demo',
  });
  if (!result.ok) return jsonError(404, result.reason ?? 'not_found');

  return wantsHtml(request)
    ? redirect('/dashboard/licenses/?requested=1', 303)
    : json({ ok: true });
};
