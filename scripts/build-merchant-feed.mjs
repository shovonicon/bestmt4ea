/**
 * Google Merchant Center product feed.
 *
 * Writes public/merchant/google-products.xml (RSS 2.0 + the g: namespace) so
 * Merchant Center can fetch it on a schedule from
 * https://bestmt4ea.com/merchant/google-products.xml
 *
 * One item per PAID licence tier, grouped per product with item_group_id. Free
 * trials are skipped (a price of 0 is rejected), as are withdrawn products
 * (src/data/unpublished.json). Prices and tiers come only from
 * src/data/product-plans.json, the same source the product pages use.
 *
 * Usage: node scripts/build-merchant-feed.mjs
 */

import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';

const ORIGIN = 'https://bestmt4ea.com';
const CURRENCY = 'USD';
// Owner to confirm: the brand the products are sold under. Merchant Center requires one.
const BRAND = 'Strive Algo';
const CATEGORY = 'Software > Computer Software';

const plans = JSON.parse(readFileSync('src/data/product-plans.json', 'utf8'));
const withdrawn = new Set(JSON.parse(readFileSync('src/data/unpublished.json', 'utf8')).products.map((p) => p.slug));

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
const clean = (s) => String(s).replace(/<[^>]+>/g, ' ').replace(/\s+([.,;:!?])/g, '$1').replace(/\s+/g, ' ').trim();
const field = (md, key) => (md.match(new RegExp(`^${key}:\\s*"(.*)"\\s*$`, 'm')) || [])[1];
const money = (n) => `${Number(n).toFixed(2)} ${CURRENCY}`;

const items = [];
const skipped = [];
for (const file of readdirSync('src/content/products').filter((f) => f.endsWith('.md'))) {
  const slug = file.replace(/\.md$/, '');
  if (withdrawn.has(slug)) { skipped.push(`${slug} (withdrawn)`); continue; }
  const tiers = Array.isArray(plans[slug]) ? plans[slug].filter((t) => t.price > 0) : [];
  if (!tiers.length) { skipped.push(`${slug} (no paid tier)`); continue; }

  const md = readFileSync(`src/content/products/${file}`, 'utf8');
  const title = clean(field(md, 'title') ?? slug);
  const image = field(md, 'featuredImage');
  const platform = field(md, 'platform');
  // Neutral, factual copy: the page descriptions carry marketing claims ("high-probability",
  // "steady growth") that Merchant Center rejects and this site's own policy forbids.
  const kind = /vps/i.test(title) ? 'vps' : /indicator/i.test(title) ? 'indicator' : 'ea';
  const description = {
    ea: `${title}. An automated trading expert advisor for MetaTrader ${platform ?? 'MT4/MT5'}, licensed per trading account. The product page states the tracked account type, total gain and maximum drawdown. Trading carries a high risk of loss and past performance does not predict future results.`,
    indicator: `${title}. A chart indicator for MetaTrader ${platform ?? 'MT4/MT5'}, licensed per trading account. It is an analysis tool and does not place trades. Trading carries a high risk of loss.`,
    vps: `${title}. A Windows virtual private server for running MetaTrader terminals and expert advisors around the clock. Trading carries a high risk of loss.`,
  }[kind].slice(0, 4900);
  if (!image) { skipped.push(`${slug} (no image)`); continue; }

  for (const t of tiers) {
    const label = [t.name, t.term].filter(Boolean).join(', ');
    const itemTitle = `${title} - ${label}`.slice(0, 150);
    const lines = [
      `    <g:id>${esc(`${slug}--${t.code}`)}</g:id>`,
      `    <g:item_group_id>${esc(slug)}</g:item_group_id>`,
      `    <title>${esc(itemTitle)}</title>`,
      `    <description>${esc(description)}</description>`,
      `    <link>${ORIGIN}/product/${slug}/</link>`,
      `    <g:image_link>${ORIGIN}${image}</g:image_link>`,
      `    <g:availability>in_stock</g:availability>`,
      t.compareAt && t.compareAt > t.price
        ? `    <g:price>${money(t.compareAt)}</g:price>\n    <g:sale_price>${money(t.price)}</g:sale_price>`
        : `    <g:price>${money(t.price)}</g:price>`,
      `    <g:condition>new</g:condition>`,
      `    <g:brand>${esc(BRAND)}</g:brand>`,
      `    <g:identifier_exists>no</g:identifier_exists>`,
      `    <g:google_product_category>${esc(CATEGORY)}</g:google_product_category>`,
      `    <g:product_type>${esc(`Trading software${platform ? ` > ${platform}` : ''}`)}</g:product_type>`,
      `    <g:custom_label_0>${esc(t.name)}</g:custom_label_0>`,
    ];
    items.push(`  <item>\n${lines.join('\n')}\n  </item>`);
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
  <title>BESTMT4EA</title>
  <link>${ORIGIN}/</link>
  <description>Licences for MT4 and MT5 expert advisors, with account type and drawdown stated on each product page.</description>
${items.join('\n')}
</channel>
</rss>
`;

mkdirSync('public/merchant', { recursive: true });
writeFileSync('public/merchant/google-products.xml', xml);
console.log(`${items.length} items written to public/merchant/google-products.xml`);
if (skipped.length) console.log('skipped:', skipped.join('; '));
