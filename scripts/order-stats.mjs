/**
 * Derive the storefront's customer figures from the WooCommerce order export.
 *
 * The export is a WordPress eXtended RSS file of `shop_order` posts. Order
 * headers live in `<wp:postmeta>` (billing email, currency, country, total,
 * paid date) — this export carries no line-item meta, so it can answer "how many
 * customers, since when" but not "which product sold".
 *
 * Privacy: this prints aggregates only. Billing emails, names, addresses and IPs
 * are read to count distinct customers and then discarded — never printed, never
 * written anywhere. Do not extend this to dump per-order rows.
 *
 * Usage:
 *   node scripts/order-stats.mjs [path-to-export.xml]
 */

import { readFileSync } from 'node:fs';

const FILE =
  process.argv[2] ??
  'C:/Users/Shovon/Downloads/bestmt4ea2026ai-poweredforexrobotsformt4ampmt5.WordPress.2026-10-05.xml';

const xml = readFileSync(FILE, 'utf8');
const items = xml
  .split('<item>')
  .slice(1)
  .map((chunk) => chunk.slice(0, chunk.indexOf('</item>')));

const orders = items.map((item) => {
  const meta = {};
  for (const m of item.matchAll(
    /<wp:meta_key><!\[CDATA\[(.*?)\]\]><\/wp:meta_key>\s*<wp:meta_value><!\[CDATA\[([\s\S]*?)\]\]><\/wp:meta_value>/g,
  )) {
    meta[m[1]] = m[2];
  }
  return {
    status: item.match(/<wp:status><!\[CDATA\[(.*?)\]\]><\/wp:status>/)?.[1] ?? '',
    date: item.match(/<wp:post_date><!\[CDATA\[(.*?)\]\]><\/wp:post_date>/)?.[1] ?? '',
    email: (meta._billing_email ?? '').trim().toLowerCase(),
    total: Number(meta._order_total ?? 0) || 0,
    currency: meta._order_currency ?? '',
  };
});

/** One row per person, not per order — a customer who bought twice counts once. */
const uniqueEmails = (list) => new Set(list.map((o) => o.email).filter(Boolean));

const completed = orders.filter((o) => o.status === 'wc-completed');
const paid = completed.filter((o) => o.total > 0);
const dates = [...new Set(completed.map((o) => o.date).filter(Boolean))].sort();

const byStatus = {};
for (const o of orders) byStatus[o.status] = (byStatus[o.status] ?? 0) + 1;

const perYear = {};
for (const o of completed) {
  const year = o.date.slice(0, 4);
  perYear[year] = (perYear[year] ?? 0) + 1;
}

console.log(`export:   ${FILE}`);
console.log(`orders:   ${orders.length}`);
for (const [status, n] of Object.entries(byStatus).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${status}: ${n}`);
}

console.log(`\ncompleted orders:      ${completed.length}`);
console.log(`  paid (total > 0):    ${paid.length}`);
console.log(`  free (total == 0):   ${completed.length - paid.length}`);

console.log(`\ncustomers (completed):       ${uniqueEmails(completed).size}`);
console.log(`paying customers:            ${uniqueEmails(paid).size}`);

console.log(`\nfirst completed order: ${dates[0] ?? 'n/a'}`);
console.log(`last completed order:  ${dates[dates.length - 1] ?? 'n/a'}`);
console.log(`completed per year:    ${JSON.stringify(perYear)}`);
