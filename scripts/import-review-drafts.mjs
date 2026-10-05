/**
 * Import the review drafts into `src/data/reviews.json`.
 *
 * The source file labels every entry "AI DRAFT — customer approval/edit required
 * before publication", so each is imported with `status: "draft"` and
 * `provenance: "ai-draft"`. Nothing with that status is rendered publicly; the
 * site shows a review only once its status is `approved`, which is a deliberate
 * one-field action taken after the customer confirms the wording.
 *
 * Usage: node scripts/import-review-drafts.mjs "<path-to-html>"
 */

import { readFileSync, writeFileSync } from 'node:fs';

const SRC =
  process.argv[2] ?? 'C:/Users/Shovon/Downloads/bestmt4ea_100_review_drafts.html';
const OUT = 'src/data/reviews.json';

const decode = (value = '') =>
  String(value)
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&hellip;/g, '…')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–');

const tidy = (value = '') => decode(value).replace(/\s+/g, ' ').trim();

const html = readFileSync(SRC, 'utf8');
const cards = [...html.matchAll(/<article class="review-card" data-review="(\d+)">([\s\S]*?)<\/article>/g)];

const grab = (block, re) => {
  const match = block.match(re);
  return match ? tidy(match[1]) : '';
};

const reviews = cards.map(([, id, block]) => {
  const rating = Number((block.match(/Draft rating: (\d) out of 5/) ?? [])[1] ?? 5);
  const reviewerLine = grab(block, /<div class="reviewer">[\s\S]*?<span>([\s\S]*?)<\/span>/);
  const [location, month] = reviewerLine.split('·').map((part) => part.trim());
  const productRaw = grab(block, /<div class="meta">([\s\S]*?)<\/div>/);

  return {
    id: Number(id),
    status: 'draft',
    provenance: 'ai-draft',
    rating,
    title: grab(block, /<h3>([\s\S]*?)<\/h3>/),
    body: grab(block, /<blockquote>([\s\S]*?)<\/blockquote>/),
    reviewer: grab(block, /<div class="reviewer">[\s\S]*?<strong>([\s\S]*?)<\/strong>/),
    location: location || null,
    month: month || null,
    product: productRaw.replace(/^Order-derived draft\s*·\s*/, '').trim() || null,
  };
});

const out = {
  _note:
    'Source: bestmt4ea_100_review_drafts.html. Every entry is an AI-assisted draft built from WooCommerce order records — the customer/order details are real, the wording is generated — so each is imported as status: "draft" / provenance: "ai-draft". Only status: "approved" is rendered publicly (see src/pages/reviews/index.astro). Approve one only after the customer confirms the wording.',
  reviews,
};

writeFileSync(OUT, `${JSON.stringify(out, null, 2)}\n`, 'utf8');
console.log(`imported ${reviews.length} drafts → ${OUT}`);
console.log('all statuses:', [...new Set(reviews.map((r) => r.status))].join(', '));
console.log('sample:', JSON.stringify({ ...reviews[0], body: reviews[0].body.slice(0, 60) + '…' }, null, 2));
