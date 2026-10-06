/**
 * Cloudflare Turnstile verification.
 *
 * The widget renders on the client with a public site key and posts a token back
 * with the form. This module verifies that token against Turnstile's `siteverify`
 * endpoint before any protected action is allowed. It runs in the Worker
 * (server-side), never the browser, so the secret never leaves the Worker.
 */

const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

/**
 * Verify a Turnstile token. Returns `false` on a missing/invalid token, a failed
 * exchange, or a network error — a protected action should treat any of those as
 * "did not pass", never as "pass".
 */
export async function verifyTurnstile(
  secret: string,
  token: string,
  remoteip?: string | null
): Promise<boolean> {
  if (!secret || !token) return false;

  const body = new URLSearchParams();
  body.set('secret', secret);
  body.set('response', token);
  if (remoteip) body.set('remoteip', remoteip);

  try {
    const res = await fetch(SITEVERIFY_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}
