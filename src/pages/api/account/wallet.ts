import type { APIRoute } from 'astro';
import { getDb } from '../../../db/client';
import { linkWallet } from '../../../server/wallets';
import { json, jsonError, readBody, redirect, wantsHtml } from '../../../lib/http';

export const prerender = false;

/**
 * Link the signed-in customer's MetaMask wallet (one per account, irreversible).
 * The client reads the address from `window.ethereum` and posts it here; the
 * browser never decides whether the link succeeded.
 */
export const POST: APIRoute = async ({ request, locals }) => {
  const session = locals.session;
  if (!session || session.subjectType !== 'customer') {
    return wantsHtml(request) ? redirect('/login/', 303) : jsonError(401, 'unauthorized');
  }

  const body = await readBody(request);
  const result = await linkWallet(getDb(), session.subjectId, (body.address ?? '').trim());

  if (!result.ok) {
    const status =
      result.reason === 'invalid_address' ? 400 : result.reason === 'not_found' ? 404 : 409;
    return jsonError(status, result.reason);
  }

  return json({ ok: true, address: result.customer.usdtWalletAddress });
};
