import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getDb } from '../../db/client';
import { authCookie, consumeTokenByCode } from '../../server/auth';
import { issueSession } from '../../lib/session';
import { rateLimit } from '../../lib/rate-limit';
import { verifyCsrf } from '../../lib/csrf';
import { sha256Hex } from '../../lib/crypto';
import { json, jsonError, readBody, redirect, wantsHtml, clientIpFrom } from '../../lib/http';

export const prerender = false;

/**
 * Exchange the one-time code from the sign-in email for a session.
 *
 * The code is a convenience for people reading mail on the same device, so it
 * sits beside the magic link rather than replacing it. A six-digit code is
 * guessable, so this path is rate-limited per IP far tighter than the sign-in
 * request, and the code is still single-use with a 15-minute life.
 */
export const POST: APIRoute = async ({ request, locals }) => {
  const body = await readBody(request);

  if (!verifyCsrf(request, locals.csrfToken, body.csrf)) {
    return wantsHtml(request) ? redirect('/login/?error=csrf', 303) : jsonError(403, 'csrf');
  }

  const db = getDb();
  const ipHash = await sha256Hex(clientIpFrom(request));

  const limited = await rateLimit(db, `code:${ipHash}`, 5, 15 * 60 * 1000);
  if (!limited.allowed) {
    return wantsHtml(request) ? redirect('/login/?error=rate', 303) : jsonError(429, 'rate_limited');
  }

  const email = (body.email ?? '').trim().toLowerCase();
  const code = (body.code ?? '').trim();
  const customer = code ? await consumeTokenByCode(db, env.SESSION_SECRET, email, code) : null;

  if (!customer) {
    return wantsHtml(request) ? redirect('/login/?error=code', 303) : jsonError(400, 'invalid_code');
  }

  const session = await issueSession(db, env.SESSION_SECRET, {
    subjectType: 'customer',
    subjectId: customer.id,
  });

  const headers = new Headers({ location: '/dashboard/', 'cache-control': 'no-store' });
  headers.append('set-cookie', authCookie(session.token));
  return new Response(null, { status: 303, headers });
};
