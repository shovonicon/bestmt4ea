/**
 * Money helpers. Every amount is an integer in USD cents (see `src/db/schema.ts`)
 * so no float drift can appear between a price, an order and a payment.
 */

export function parseUsdToCents(value: string | number): number {
  const numeric = typeof value === 'number' ? value : Number.parseFloat(value);
  if (!Number.isFinite(numeric)) throw new Error(`Invalid amount: ${value}`);
  return Math.round(numeric * 100);
}

/** `$49.99` — always two decimals, because a price is not a crypto amount. */
export function formatUsd(cents: number): string {
  return `$${(cents / 100).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/** `49.99` — a plain decimal, for feeding an order total into a quote. */
export function centsToUsdtBase(cents: number): string {
  return (cents / 100).toFixed(2);
}
