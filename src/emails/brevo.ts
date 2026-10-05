/**
 * Brevo transactional-email client.
 *
 * The API key is passed in and never read from the environment here, so this
 * module stays pure and testable — the same shape as `src/server/tron.ts`.
 * Brevo's SMTP relay is unusable from a Worker (no raw SMTP), so every send
 * goes through the HTTPS API.
 */

export interface BrevoConfig {
  apiKey: string;
  baseUrl?: string;
}

export interface BrevoMessage {
  to: string;
  subject: string;
  html: string;
  text: string;
  fromName: string;
  fromEmail: string;
  tags?: string[];
}

const DEFAULT_BASE_URL = 'https://api.brevo.com/v3';

function base(config: BrevoConfig): string {
  return (config.baseUrl ?? DEFAULT_BASE_URL).replace(/\/+$/, '');
}

/** Send one transactional email. Throws on a non-2xx so the caller can log it. */
export async function sendViaBrevo(
  message: BrevoMessage,
  config: BrevoConfig
): Promise<{ messageId: string | null }> {
  const response = await fetch(`${base(config)}/smtp/email`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': config.apiKey,
    },
    body: JSON.stringify({
      sender: { name: message.fromName, email: message.fromEmail },
      to: [{ email: message.to }],
      replyTo: { email: message.fromEmail },
      subject: message.subject,
      htmlContent: message.html,
      textContent: message.text,
      ...(message.tags?.length ? { tags: message.tags } : {}),
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(
      `Brevo send failed: ${response.status} ${response.statusText}${detail ? ` — ${detail.slice(0, 300)}` : ''}`
    );
  }

  const body = (await response.json().catch(() => null)) as { messageId?: string } | null;
  return { messageId: body?.messageId ?? null };
}
