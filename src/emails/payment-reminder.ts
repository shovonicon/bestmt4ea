import { htmlEscape } from '../lib/http';

/**
 * The payment reminder for an order that is still unpaid.
 *
 * Plain and factual on purpose: it says what is open, what the customer can do,
 * and that no more reminders follow after the third. No deadline pressure and no
 * scarcity language, because the order is only held open by the customer's own
 * choice to pay.
 */
export interface PaymentReminderInput {
  orderNumber: string;
  items: Array<{ title: string; amount: string }>;
  total: string;
  /** 1, 2 or 3. Only the wording changes, the layout does not. */
  step: number;
  dashboardUrl: string;
  productsUrl: string;
}

const LEAD: Record<number, string> = {
  1: 'Your order is still waiting for payment.',
  2: 'A reminder: your order is still unpaid.',
  3: 'This is the last reminder for this order.',
};

export function paymentReminderEmail(input: PaymentReminderInput): {
  subject: string;
  html: string;
  text: string;
} {
  const lead = LEAD[input.step] ?? LEAD[1];
  const subject = `Your BESTMT4EA order ${input.orderNumber} is unpaid`;
  const closing =
    input.step >= 3
      ? 'We will not send further reminders about this order.'
      : 'If you no longer want it, you do not need to do anything.';

  const text = [
    lead,
    '',
    `Order: ${input.orderNumber}`,
    ...input.items.map((item) => `${item.title} — ${item.amount}`),
    `Total: ${input.total}`,
    '',
    'No payment has been received for this order, so no access has been granted yet.',
    '',
    `To pay, open your dashboard: ${input.dashboardUrl}`,
    `Or place a new order from the product page: ${input.productsUrl}`,
    '',
    'If you have already paid, reply to this email with the transaction ID and we will check it.',
    '',
    closing,
    '',
    'Trading carries risk, and nothing here is a promise of profit.',
  ].join('\n');

  const itemRows = input.items
    .map(
      (item) =>
        `<tr><td style="padding:6px 0;border-bottom:1px solid #16241f;font-size:14px">${htmlEscape(
          item.title
        )}</td><td style="padding:6px 0;border-bottom:1px solid #16241f;font-size:14px;text-align:right;white-space:nowrap">${htmlEscape(
          item.amount
        )}</td></tr>`
    )
    .join('');

  const html = `<!doctype html>
<html><body style="margin:0;background:#000;color:#e7f5ef;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif">
  <div style="max-width:520px;margin:0 auto;padding:32px 24px">
    <h1 style="font-size:22px;margin:0 0 8px">Payment still open</h1>
    <p style="color:#9fb8ae;margin:0 0 24px">${htmlEscape(lead)}</p>

    <p style="margin:0 0 4px;color:#6f8a80;font-size:13px">Order ${htmlEscape(input.orderNumber)}</p>
    <table style="width:100%;border-collapse:collapse;margin:0 0 20px">
      ${itemRows}
      <tr><td style="padding:8px 0;font-size:14px;font-weight:600">Total</td><td style="padding:8px 0;font-size:14px;font-weight:600;text-align:right">${htmlEscape(
        input.total
      )}</td></tr>
    </table>

    <p style="color:#9fb8ae;font-size:14px;margin:0 0 16px">No payment has been received for this order, so no access has been granted yet.</p>
    <p style="margin:0 0 24px">
      <a href="${htmlEscape(input.dashboardUrl)}" style="display:inline-block;background:#00c190;color:#000;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px">Open your dashboard</a>
    </p>
    <p style="color:#9fb8ae;font-size:13px;margin:0 0 12px">Or place a new order from <a href="${htmlEscape(
      input.productsUrl
    )}" style="color:#00c190">the product page</a>.</p>
    <p style="color:#9fb8ae;font-size:13px;margin:0 0 12px">If you have already paid, reply to this email with the transaction ID and we will check it.</p>
    <p style="color:#6f8a80;font-size:12px;margin:24px 0 0">${htmlEscape(closing)} Trading carries risk, and nothing here is a promise of profit.</p>
  </div>
</body></html>`;

  return { subject, html, text };
}
