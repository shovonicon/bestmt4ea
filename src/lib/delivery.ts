/**
 * How a purchase reaches the customer.
 *
 * The product type decides it, and it is the same distinction the backend already
 * acts on in `settleOrder()`: an `ea` is account-bound (a licence, then a compiled
 * build for that account), a `service` is fulfilled by hand, and a `tool` is a file
 * that unlocks the moment payment settles — no licence, no account number.
 *
 * Every customer-facing surface uses this one vocabulary so the promise cannot
 * drift: the order confirmation email, the post-payment page, and the dashboard.
 */

export type DeliveryChannel = 'licence' | 'download' | 'telegram';

/** Where a hand-fulfilled purchase is arranged. */
export const TELEGRAM_FULFILMENT_URL = 'https://t.me/pizion';
export const TELEGRAM_FULFILMENT_HANDLE = '@pizion';

export function deliveryChannelFor(productType: string): DeliveryChannel {
  if (productType === 'ea') return 'licence';
  if (productType === 'service') return 'telegram';
  // Tools (indicators, scripts) and anything else file-based.
  return 'download';
}

/** Short label for a spec row or a table. */
export const DELIVERY_LABEL: Record<DeliveryChannel, string> = {
  licence: 'Dashboard download, per licence',
  download: 'Dashboard download, unlocked at payment',
  telegram: 'Delivered over Telegram',
};

export interface DeliveryStep {
  title: string;
  body: string;
}

/** What a buyer of this channel has to do, in order. */
export function deliverySteps(channel: DeliveryChannel): DeliveryStep[] {
  switch (channel) {
    case 'licence':
      return [
        {
          title: 'Your licence is on the dashboard',
          body: 'A 30-day trial is usable straight away — no account number, and its expiry is built into the file. A paid licence is bound to the trading account you activate, for the terminal it was built for.',
        },
        {
          title: 'Download your build',
          body: 'The file is compiled per licence and appears on your Downloads page as soon as it is ready.',
        },
      ];
    case 'download':
      return [
        {
          title: 'Download it now',
          body: 'Payment unlocks the file on your Downloads page immediately — no licence and no account number needed.',
        },
      ];
    case 'telegram':
      return [
        {
          title: 'Message us on Telegram',
          body: `Your credentials are sent over Telegram rather than from the dashboard. Message ${TELEGRAM_FULFILMENT_HANDLE} with your order number and we will set it up.`,
        },
      ];
  }
}

/** One line for a product page or a summary row. */
export function deliveryPromise(channel: DeliveryChannel): string {
  switch (channel) {
    case 'licence':
      return 'Delivered to your dashboard — a 30-day trial runs straight away, a paid licence is bound to the account you activate.';
    case 'download':
      return 'Delivered to your dashboard — the download unlocks the moment your payment settles.';
    case 'telegram':
      return `Delivered over Telegram — message ${TELEGRAM_FULFILMENT_HANDLE} after payment and we will send your credentials.`;
  }
}
