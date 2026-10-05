/**
 * Seed the D1 catalogue from the product content.
 *
 * Reads `src/content/products/*.md` and `src/data/product-plans.json` and emits
 * `scripts/seed-catalog.sql`:
 *
 *   - `products` + `product_faqs` from frontmatter (accurate data only)
 *   - `product_plans` from `src/data/product-plans.json`, which holds the real
 *     licence tiers taken from each product page's own licence table. Nothing is
 *     invented: a product with no entry simply gets no plans.
 *
 *   node scripts/seed-catalog.mjs            # write the SQL
 *   npm run db:seed:local                    # write + apply to local D1
 *   npm run db:seed:remote                   # write + apply to remote D1
 */

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import matter from 'gray-matter';

const DIR = 'src/content/products';
const PLANS_FILE = 'src/data/product-plans.json';
const OUT = 'scripts/seed-catalog.sql';

const PLATFORMS = new Set(['MT4', 'MT5', 'MT4/MT5', 'none']);

const esc = (value) =>
  value === null || value === undefined || value === '' ? 'NULL' : `'${String(value).replace(/'/g, "''")}'`;
const num = (value) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
};

/**
 * A product's `type` drives delivery: only an `ea` needs an account-bound
 * licence. A hosted service (the VPS) has an MT4/MT5 platform for the brand
 * hubs but delivers no file and no licence, so it is not an `ea`.
 */
function productType(slug, platform) {
  if (slug === 'vps') return 'service';
  return platform === 'none' ? 'tool' : 'ea';
}

const productRows = [];
const faqRows = [];
const slugs = new Set();

for (const file of readdirSync(DIR)) {
  if (!file.endsWith('.md')) continue;
  const { data } = matter(readFileSync(`${DIR}/${file}`, 'utf8'));

  const slug = String(data.slug ?? file.replace(/\.md$/, ''));
  slugs.add(slug);
  const platform = PLATFORMS.has(data.platform) ? data.platform : 'none';
  const type = productType(slug, platform);
  // Free only when every price signal is zero — a paid simple product keeps its
  // number and is therefore not free.
  const isFree = num(data.price) === 0 && num(data.priceMin) === 0 && num(data.priceMax) === 0;
  const imageKey = data.featuredImage ? String(data.featuredImage) : null;
  const now = Date.now();

  productRows.push(
    `INSERT OR REPLACE INTO products (id, slug, type, title, summary, description, platform, currency, is_free, active, image_key, created_at, updated_at) VALUES (${[
      esc(slug),
      esc(slug),
      esc(type),
      esc(data.title),
      esc(data.description),
      esc(data.quickAnswer ?? data.description),
      esc(platform),
      esc(data.currency ?? 'USD'),
      isFree ? 1 : 0,
      1,
      esc(imageKey),
      now,
      now,
    ].join(', ')});`
  );

  const faqs = Array.isArray(data.faqs) ? data.faqs : [];
  faqs.forEach((faq, i) => {
    if (!faq?.question || !faq?.answer) return;
    faqRows.push(
      `INSERT OR REPLACE INTO product_faqs (id, product_id, question, answer, sort_order, created_at) VALUES (${[
        esc(`${slug}-faq-${i}`),
        esc(slug),
        esc(faq.question),
        esc(faq.answer),
        i,
        Date.now(),
      ].join(', ')});`
    );
  });
}

/* ------------------------------------------------------------------ plans */

/** Lifetime tiers store NULL; everything else is a real window in days. */
function durationDays(plan) {
  if (typeof plan.months === 'number') return plan.months === 12 ? 365 : plan.months * 30;
  const term = String(plan.term ?? '');
  if (/lifetime|one payment/i.test(term)) return null;
  const months = term.match(/(\d+)\s*month/i);
  if (months) return Number(months[1]) === 12 ? 365 : Number(months[1]) * 30;
  const days = term.match(/(\d+)\s*day/i);
  if (days) return Number(days[1]);
  return null;
}

/** "2 real accounts" in the tier's own feature list is the account allowance. */
function maxAccounts(plan) {
  const features = Array.isArray(plan.features) ? plan.features : [];
  for (const feature of features) {
    const match = String(feature).match(/(\d+)\s*real account/i);
    if (match) return Number(match[1]);
  }
  return 1;
}

const planRows = [];
const planData = JSON.parse(readFileSync(PLANS_FILE, 'utf8'));
const skipped = [];

for (const [slug, tiers] of Object.entries(planData)) {
  if (slug.startsWith('_')) continue;
  if (!Array.isArray(tiers)) continue;
  if (!slugs.has(slug)) {
    skipped.push(slug);
    continue;
  }

  tiers.forEach((plan, index) => {
    if (!plan?.code || !plan?.name) return;
    const label = plan.term ? `${plan.name} · ${plan.term}` : plan.name;
    planRows.push(
      `INSERT OR REPLACE INTO product_plans (id, product_id, code, label, price_cents, duration_days, max_accounts, badge, sort_order, active, created_at, updated_at) VALUES (${[
        esc(`${slug}--${plan.code}`),
        esc(slug),
        esc(plan.code),
        esc(label),
        Math.round(num(plan.price) * 100),
        durationDays(plan) === null ? 'NULL' : durationDays(plan),
        maxAccounts(plan),
        esc(plan.badge ?? null),
        index,
        1,
        Date.now(),
        Date.now(),
      ].join(', ')});`
    );
  });
}

const sql = [
  '-- generated by scripts/seed-catalog.mjs — do not edit by hand',
  ...productRows,
  ...faqRows,
  ...planRows,
  '',
].join('\n');

writeFileSync(OUT, sql);
console.log(
  `seed-catalog: ${productRows.length} products, ${faqRows.length} faqs, ${planRows.length} plans -> ${OUT}`
);
if (skipped.length) console.log(`  skipped plans for unknown products: ${skipped.join(', ')}`);
