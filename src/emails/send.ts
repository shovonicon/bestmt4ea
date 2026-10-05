import { and, count, eq, gte } from 'drizzle-orm';
import type { Db } from '../db/client';
import { emailLogs } from '../db/schema';
import { uuid } from '../lib/crypto';
import { sendViaBrevo } from './brevo';

export interface EmailEnv {
  /** Cloudflare Email binding (free sending). Tried first. */
  EMAIL?: SendEmail;
  EMAIL_FROM_EMAIL: string;
  EMAIL_FROM_NAME: string;
  /** Brevo transactional API key (free tier). The fallback sender. */
  BREVO_API_KEY?: string;
}

export interface EmailMessage {
  to: string;
  subject: string;
  html: string;
  text: string;
  template: string;
}

/**
 * Two free senders, tried in order, behind one combined daily ceiling:
 *   Cloudflare Email  ~100/day  (tried first — the smaller quota)
 *   Brevo             ~300/day  (fallback)
 *
 * The per-provider caps are enforced by the providers themselves: when
 * Cloudflare refuses, the send falls through to Brevo on the same attempt. Once
 * the combined ceiling is reached the message is recorded as `skipped` rather
 * than failing the flow the caller is in the middle of.
 */
const CLOUDFLARE_DAILY_CAP = 100;
const BREVO_DAILY_CAP = 300;
const DAILY_CAP = CLOUDFLARE_DAILY_CAP + BREVO_DAILY_CAP;

async function sentInLast24h(db: Db): Promise<number> {
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const row = await db
    .select({ total: count() })
    .from(emailLogs)
    .where(and(eq(emailLogs.status, 'sent'), gte(emailLogs.createdAt, since)))
    .get();
  return Number(row?.total ?? 0);
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

function failureDetail(error: unknown): string {
  const code = (error as { code?: unknown } | null)?.code;
  return [code ? String(code) : '', error instanceof Error ? error.message : String(error)]
    .filter(Boolean)
    .join(': ');
}

/**
 * Sending must never break the calling flow. Failures are logged, not thrown.
 *
 * With neither sender configured (a local run without a key or binding), the
 * message is logged and recorded as `skipped`, so the flow still completes and
 * the magic link is visible in the dev console.
 */
export async function sendEmail(db: Db, env: EmailEnv, message: EmailMessage): Promise<boolean> {
  if (!env.EMAIL && !env.BREVO_API_KEY) {
    console.log('[email skipped — no sender configured]', {
      to: message.to,
      subject: message.subject,
      text: message.text,
    });
    await logEmail(db, message, 'skipped', null, 'no sender configured');
    return false;
  }

  try {
    const used = await sentInLast24h(db);
    if (used >= DAILY_CAP) {
      console.warn('email_daily_cap_reached', { used, cap: DAILY_CAP });
      await logEmail(db, message, 'skipped', null, `daily cap reached (${used}/${DAILY_CAP})`);
      return false;
    }
  } catch (error) {
    // The guard must never itself block a send.
    console.error('email_cap_check_failed', failureDetail(error));
  }

  // 1) Cloudflare Email — free, tried first.
  if (env.EMAIL) {
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
      // Expected once its daily quota is used — fall through to Brevo.
      console.warn('email_cloudflare_failed_falling_back', failureDetail(error));
    }
  }

  // 2) Brevo — free fallback.
  if (env.BREVO_API_KEY) {
    try {
      const result = await sendViaBrevo(
        {
          to: message.to,
          subject: message.subject,
          html: message.html,
          text: message.text,
          fromName: env.EMAIL_FROM_NAME,
          fromEmail: env.EMAIL_FROM_EMAIL,
          tags: [message.template],
        },
        { apiKey: env.BREVO_API_KEY }
      );
      await logEmail(db, message, 'sent', result.messageId, null);
      return true;
    } catch (error) {
      const detail = failureDetail(error);
      console.error('email_send_failed', detail);
      await logEmail(db, message, 'failed', null, detail);
      return false;
    }
  }

  await logEmail(db, message, 'failed', null, 'cloudflare send failed and no brevo key set');
  return false;
}
