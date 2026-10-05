import { htmlEscape } from '../lib/http';
import {
  DELIVERY_LABEL,
  TELEGRAM_FULFILMENT_URL,
  deliverySteps,
  type DeliveryChannel,
} from '../lib/delivery';

/**
 * The purchase receipt.
 *
 * Delivery is pull-based — nothing is attached here. The email confirms the order
 * and tells the customer exactly where to collect it, using the same delivery
 * vocabulary as the post-payment page and the dashboard: an EA needs its licence
 * activated, a tool unlocks on the Downloads page at payment, and a service (the
 * VPS) is arranged over Telegram.
 */
export interface OrderConfirmationInput {
  orderNumber: string;
  items: Array<{ title: string; amount: string }>;
  total: string;
  dashboardUrl: string;
  loginUrl: string;
  /** One entry per delivery channel present in the order. */
  channels: DeliveryChannel[];
}

export function orderConfirmationEmail(input: OrderConfirmationInput): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `Your BESTMT4EA order ${input.orderNumber}`;
  const { channels } = input;

  const text = [
    'Payment received — thank you.',
    '',
    `Order: ${input.orderNumber}`,
    '',
    ...input.items.map((item) => `${item.title} — ${item.amount}`),
    `Total: ${input.total}`,
    '',
    'How you get it:',
    ...channels.flatMap((channel) => [
      '',
      `${DELIVERY_LABEL[channel]}:`,
      ...deliverySteps(channel).map((step, index) => `  ${index + 1}. ${step.title} — ${step.body}`),
    ]),
    '',
    `Sign in at ${input.loginUrl}`,
    '',
    ...(channels.includes('telegram')
      ? [`Arrange it on Telegram: ${TELEGRAM_FULFILMENT_URL}`, '']
      : []),
    'Run any EA on a demo account first. Trading carries risk, and nothing here is',
    'a promise of profit.',
    '',
    'If anything looks wrong, reply to this email or message us on Telegram.',
  ].join('\n');

  const stepList = (channel: DeliveryChannel) =>
    `<ul style="color:#9fb8ae;font-size:13px;padding-left:18px;margin:6px 0 0">${deliverySteps(channel)
      .map((step) => `<li><strong style="color:#e7f5ef">${htmlEscape(step.title)}</strong> — ${htmlEscape(step.body)}</li>`)
      .join('')}</ul>`;

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
    )}" style="display:inline-block;background:#00c190;color:#001b12;padding:12px 20px;border-radius:10px;font-weight:600;text-decoration:none">Sign in to your account</a></p>
    <p style="margin:0 0 8px;color:#9fb8ae;font-size:13px">Your account is at <a href="${htmlEscape(
      input.dashboardUrl
    )}" style="color:#00c190">your dashboard</a>.</p>

    <h2 style="font-size:14px;margin:24px 0 0;color:#e7f5ef">How you get it</h2>
    ${channels
      .map(
        (channel) =>
          `<p style="margin:12px 0 0;color:#6f8a80;font-size:13px">${htmlEscape(DELIVERY_LABEL[channel])}</p>${stepList(
            channel
          )}`
      )
      .join('')}

    ${
      channels.includes('telegram')
        ? `<p style="margin:16px 0 0;font-size:13px"><a href="${htmlEscape(
            TELEGRAM_FULFILMENT_URL
          )}" style="color:#00c190">Message us on Telegram to arrange it →</a></p>`
        : ''
    }

    <p style="color:#6f8a80;font-size:13px;margin:16px 0 0">Run any EA on a demo account first. Trading carries risk, and nothing here is a promise of profit.</p>
    <p style="color:#6f8a80;font-size:13px;margin:8px 0 0">If anything looks wrong, reply to this email or message us on Telegram.</p>
  </div>
</body></html>`;

  return { subject, html, text };
}
