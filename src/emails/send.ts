import type { Db } from '../db/client';
import { emailLogs } from '../db/schema';
import { uuid } from '../lib/crypto';

export interface EmailEnv {
  EMAIL?: SendEmail;
  EMAIL_FROM_EMAIL: string;
  EMAIL_FROM_NAME: string;
}

export interface EmailMessage {
  to: string;
  subject: string;
  html: string;
  text: string;
  template: string;
}

async function logEmail(
  db: Db,
  message: EmailMessage,
  status: string,
  providerMessageId: string | null,
  error: string | null
): Promise<void> {
  try {
    await db.insert(emailLogs).values({
      id: uuid(),
      toEmail: message.to,
      template: message.template,
      providerMessageId,
      status,
      error,
    });
  } catch (logError) {
    console.error('email_log_failed', logError);
  }
}

/**
 * Sending must never break the calling flow. Failures are logged, not thrown.
 *
 * With no `EMAIL` binding (e.g. a local run without Cloudflare Email Service),
 * the message is logged and recorded as `skipped` so the flow still completes
 * and the magic link is visible in the dev console.
 */
export async function sendEmail(db: Db, env: EmailEnv, message: EmailMessage): Promise<boolean> {
  if (!env.EMAIL) {
    console.log('[email skipped — no EMAIL binding]', {
      to: message.to,
      subject: message.subject,
      text: message.text,
    });
    await logEmail(db, message, 'skipped', null, 'no EMAIL binding');
    return false;
  }

  try {
    const result = await env.EMAIL.send({
      from: { name: env.EMAIL_FROM_NAME, email: env.EMAIL_FROM_EMAIL },
      replyTo: env.EMAIL_FROM_EMAIL,
      to: message.to,
      subject: message.subject,
      html: message.html,
      text: message.text,
    });
    await logEmail(db, message, 'sent', result.messageId, null);
    return true;
  } catch (error) {
    const code = (error as { code?: unknown } | null)?.code;
    const detail = [code ? String(code) : '', error instanceof Error ? error.message : String(error)]
      .filter(Boolean)
      .join(': ');
    console.error('email_send_failed', detail);
    await logEmail(db, message, 'failed', null, detail);
    return false;
  }
}
