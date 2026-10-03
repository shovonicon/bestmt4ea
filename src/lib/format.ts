/** Formatting helpers shared across pages. */

export function formatMoney(amount: number, currency = 'USD'): string {
  const symbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : currency === 'BDT' ? '৳' : '$';
  const value = amount.toLocaleString('en-US', {
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });
  return `${symbol}${value}`;
}

export function formatPriceRange(
  min: number | undefined,
  max: number | undefined,
  currency = 'USD',
): string {
  if (min == null && max == null) return 'See checkout';
  if (min == null) return formatMoney(max!, currency);
  if (max == null) return formatMoney(min, currency);
  if (min === max) return formatMoney(min, currency);
  return `${formatMoney(min, currency)} – ${formatMoney(max, currency)}`;
}

export function formatPercent(value: number, digits = 2): string {
  return `${value.toFixed(digits).replace(/\.?0+$/, '')}%`;
}

export function formatSignedPercent(value: number, digits = 2): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(digits)}%`;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Strip HTML tags for meta descriptions. */
export function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}
