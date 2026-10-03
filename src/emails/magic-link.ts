import { htmlEscape } from '../lib/http';

/** The magic-link sign-in email. One clear action, no tracking, honest wording. */
export function magicLinkEmail(input: { url: string; code: string }): {
  subject: string;
  html: string;
  text: string;
} {
  const safeUrl = htmlEscape(input.url);
  const subject = 'Your BestMT4EA sign-in link';
  const text = [
    'Sign in to BestMT4EA',
    '',
    'Open this link to sign in (valid for 15 minutes):',
    input.url,
    '',
    `Or enter this code: ${input.code}`,
    '',
    'If you did not request this, you can ignore this email.',
  ].join('\n');

  const html = `<!doctype html>
<html><body style="margin:0;background:#000;color:#e7f5ef;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif">
  <div style="max-width:520px;margin:0 auto;padding:32px 24px">
    <h1 style="font-size:22px;margin:0 0 8px">Sign in to BestMT4EA</h1>
    <p style="color:#9fb8ae;margin:0 0 24px">This link is valid for 15 minutes and can be used once.</p>
    <p style="margin:0 0 24px"><a href="${safeUrl}" style="display:inline-block;background:#00c190;color:#001b12;padding:12px 20px;border-radius:10px;font-weight:600;text-decoration:none">Open BestMT4EA</a></p>
    <p style="margin:0 0 8px;color:#9fb8ae">Or enter this code:</p>
    <p style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:26px;letter-spacing:4px;margin:0 0 24px">${htmlEscape(input.code)}</p>
    <p style="color:#6f8a80;font-size:13px;margin:0">If you did not request this, you can safely ignore this email.</p>
  </div>
</body></html>`;

  return { subject, html, text };
}
