import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getDb } from '../../db/client';
import { requestLogin, pendingLoginEmailCookie } from '../../server/auth';
import { verifyTurnstile } from '../../server/turnstile';
import { rateLimit } from '../../lib/rate-limit';
import { verifyCsrf } from '../../lib/csrf';
import { sha256Hex } from '../../lib/crypto';
import { json, jsonError, readBody, redirect, wantsHtml, clientIpFrom } from '../../lib/http';
import { sendEmail } from '../../emails/send';
import { magicLinkEmail } from '../../emails/magic-link';

export const prerender = false;

/** Request a one-time sign-in link. Always aims to succeed quietly. */
export const POST: APIRoute = async ({ request, locals }) => {
  const body = await readBody(request);

  if (!verifyCsrf(request, locals.csrfToken, body.csrf)) {
    return wantsHtml(request) ? redirect('/login/?error=csrf', 303) : jsonError(403, 'csrf');
  }

  // Turnstile is optional: when the Worker holds a secret the challenge must pass,
  // and when it does not (dev / a deployment without the secret) the check is
  // skipped so the sign-in flow still works.
  if (env.TURNSTILE_SECRET_KEY) {
    const turnstileOk = await verifyTurnstile(
      env.TURNSTILE_SECRET_KEY,
      body['cf-turnstile-response'] ?? '',
      clientIpFrom(request)
    );
    if (!turnstileOk) {
      return wantsHtml(request) ? redirect('/login/?error=turnstile', 303) : jsonError(400, 'turnstile_failed');
    }
  }

  const db = getDb();
  const ipHash = await sha256Hex(clientIpFrom(request));

  const limited = await rateLimit(db, `login:${ipHash}`, 5, 15 * 60 * 1000);
  if (!limited.allowed) {
    return wantsHtml(request) ? redirect('/login/?error=rate', 303) : jsonError(429, 'rate_limited');
  }

  const result = await requestLogin(db, env.SESSION_SECRET, { email: body.email ?? '', ipHash });
  if (!result) {
    return wantsHtml(request) ? redirect('/login/?error=email', 303) : jsonError(400, 'invalid_email');
  }

  const url = `${env.APP_URL}/auth/verify?token=${encodeURIComponent(result.token)}`;
  const mail = magicLinkEmail({ url, code: result.code });
  await sendEmail(db, env, {
    to: (body.email ?? '').trim().toLowerCase(),
    subject: mail.subject,
    html: mail.html,
    text: mail.text,
    template: 'magic-link',
  });

  const response = wantsHtml(request) ? redirect('/login/?sent=1', 303) : json({ ok: true });
  // Remember the address so the "check your inbox" step can offer the one-time
  // code without asking for the email a second time.
  response.headers.append('set-cookie', pendingLoginEmailCookie((body.email ?? '').trim().toLowerCase()));
  return response;
};
