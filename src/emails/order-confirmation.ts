import { htmlEscape } from '../lib/http';

/**
 * The purchase receipt.
 *
 * Delivery is pull-based — nothing is attached here. The email confirms the
 * order, tells the customer exactly where to collect it, and (for an EA) that
 * they must activate the licence against their MT4/MT5 account first.
 */
export interface OrderConfirmationInput {
  orderNumber: string;
  items: Array<{ title: string; amount: string }>;
  total: string;
  dashboardUrl: string;
  loginUrl: string;
}

export function orderConfirmationEmail(input: OrderConfirmationInput): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `Your BESTMT4EA order ${input.orderNumber}`;

  const text = [
    'Payment received — thank you.',
    '',
    `Order: ${input.orderNumber}`,
    '',
    ...input.items.map((item) => `${item.title} — ${item.amount}`),
    `Total: ${input.total}`,
    '',
    'To collect it:',
    `1. Sign in at ${input.loginUrl}`,
    `2. Open your dashboard: ${input.dashboardUrl}`,
    '3. If you bought an expert advisor, activate your licence with the MT4/MT5',
    '   account number you will run it on — the file unlocks once the licence is active.',
    '4. Download your file from the Downloads page.',
    '',
    'Your licence key and downloads live in your dashboard, not in this email.',
    '',
    'Run any EA on a demo account first. Trading carries risk, and nothing here is',
    'a promise of profit.',
    '',
    'If anything looks wrong, reply to this email or message us on Telegram.',
  ].join('\n');

  const html = `<!doctype html>
<html><body style="margin:0;background:#000;color:#e7f5ef;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif">
  <div style="max-width:520px;margin:0 auto;padding:32px 24px">
    <h1 style="font-size:22px;margin:0 0 8px">Payment received</h1>
    <p style="color:#9fb8ae;margin:0 0 24px">Thank you — your order is confirmed.</p>

    <p style="margin:0 0 4px;color:#6f8a80;font-size:13px">Order ${htmlEscape(input.orderNumber)}</p>
    <table style="width:100%;border-collapse:collapse;margin:0 0 20px">
      ${input.items
        .map(
          (item) =>
            `<tr><td style="padding:6px 0;border-bottom:1px solid #16241f;font-size:14px">${htmlEscape(
              item.title
            )}</td><td style="padding:6px 0;border-bottom:1px solid #16241f;font-size:14px;text-align:right;white-space:nowrap">${htmlEscape(
              item.amount
            )}</td></tr>`
        )
        .join('')}
      <tr><td style="padding:8px 0;font-weight:600">Total</td><td style="padding:8px 0;font-weight:600;text-align:right">${htmlEscape(
        input.total
      )}</td></tr>
    </table>

    <p style="margin:0 0 8px"><a href="${htmlEscape(
      input.loginUrl
    )}" style="display:inline-block;background:#00c190;color:#001b12;padding:12px 20px;border-radius:10px;font-weight:600;text-decoration:none">Sign in and collect your order</a></p>
    <p style="margin:0 0 20px;color:#9fb8ae;font-size:13px">Your licence key and downloads are in <a href="${htmlEscape(
      input.dashboardUrl
    )}" style="color:#00c190">your dashboard</a> — not in this email.</p>

    <ol style="color:#9fb8ae;font-size:13px;padding-left:18px;margin:0 0 20px">
      <li>Sign in with the link above.</li>
      <li>If you bought an expert advisor, activate your licence with the MT4/MT5 account number you will run it on.</li>
      <li>Download your file from the Downloads page.</li>
    </ol>

    <p style="color:#6f8a80;font-size:13px;margin:0 0 16px">Run any EA on a demo account first. Trading carries risk, and nothing here is a promise of profit.</p>
    <p style="color:#6f8a80;font-size:13px;margin:0">If anything looks wrong, reply to this email or message us on Telegram.</p>
  </div>
</body></html>`;

  return { subject, html, text };
}
