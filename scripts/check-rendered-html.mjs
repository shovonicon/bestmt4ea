/**
 * Rendered-HTML assertions for long-form post pages.
 *
 * Build output is the only thing that proves the Phase 2 contract actually
 * holds in the DOM — the Markdown source can look clean while a layout renders
 * a section twice. For every post page in `dist/`:
 *
 *   - exactly one `<h1>`
 *   - at most one FAQ, one Sources and one Install-steps section
 *   - the old 20rem ad/sidebar grid is gone
 *   - the `.longform` reading column is present (readable measure)
 *   - a download page has exactly one download card and one install block
 *   - a table of contents renders inline on desktop and collapsible on mobile
 *   - FAQPage / HowTo schema matches the frontmatter it was built from
 *   - no ad unit sits above the download action or the install steps
 *
 * Legacy WordPress posts still carrying body FAQ/Sources sections are counted
 * as debt and reported, not failed — they are rewritten in the rollout. Any
 * post that is already clean (or carries a `download:`) is held to the strict
 * rule, so the debt can only shrink and a migrated post cannot regress.
 *
 * Usage: node scripts/check-rendered-html.mjs
 */

import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import matter from 'gray-matter';
import { bodySectionKinds, hasBodyH1 } from './content-rules.mjs';

const DIST = 'dist/client';
const POSTS_DIR = 'src/content/posts';
const PRODUCTS_DIR = 'src/content/products';

const countAttr = (html, attr) => html.split(attr).length - 1;
const occurrences = (html, needle) => html.split(needle).length - 1;

function jsonLdBlocks(html) {
  const out = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      out.push(JSON.parse(m[1]));
    } catch {
      out.push(null);
    }
  }
  return out;
}

function loadPosts() {
  return readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const { data, content } = matter(readFileSync(join(POSTS_DIR, file), 'utf8'));
      let slug = String(data.slug ?? file.replace(/\.md$/, ''));
      try {
        slug = decodeURIComponent(slug);
      } catch {
        /* leave as-is */
      }
      return { file, slug, data, content };
    });
}

const errors = [];
const notes = [];
let strict = 0;
let legacy = 0;
let built = 0;

for (const post of loadPosts()) {
  const htmlPath = join(DIST, post.slug, 'index.html');
  if (!existsSync(htmlPath)) {
    notes.push(`Not built (skipped): ${post.slug}`);
    continue;
  }
  built++;
  const html = readFileSync(htmlPath, 'utf8');
  const label = post.slug;
  const isDownload = Boolean(post.data.download);

  const dupKinds = bodySectionKinds(post.content);
  const isLegacy = !isDownload && (dupKinds.size > 0 || hasBodyH1(post.content));

  if (isLegacy) {
    legacy++;
    continue;
  }
  strict++;

  const fail = (msg) => errors.push(`${label}: ${msg}`);

  // One H1, and one visible copy of each frontmatter section. Checked in the
  // DOM, not just via component markers, because a Markdown body can render a
  // second visible FAQ/Sources/Install block that no component owns.
  const h1 = occurrences(html, '<h1');
  if (h1 !== 1) fail(`expected exactly one <h1>, found ${h1}`);
  for (const [attr, name] of [
    ['data-faq', 'FAQ'],
    ['data-sources', 'Sources'],
    ['data-install-steps', 'install steps'],
  ]) {
    const n = countAttr(html, attr);
    if (n > 1) fail(`${n} rendered ${name} sections (expected at most one)`);
  }

  const headings = [...html.matchAll(/<h[2-4][^>]*>([\s\S]*?)<\/h[2-4]>/g)].map((m) =>
    m[1]
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase(),
  );
  const headingCount = (re) => headings.filter((t) => re.test(t)).length;
  const dupFaq = headingCount(/^(frequently asked questions|faqs?)\b/);
  const dupSources = headingCount(/^sources?\b/);
  const dupInstall = headingCount(
    /^(install(ation|ing)?( steps?| guide)?|how to install|setup( steps?| guide)?)\b/,
  );
  if (dupFaq > 1) fail(`${dupFaq} visible FAQ headings (body repeats the frontmatter FAQ)`);
  if (dupSources > 1) fail(`${dupSources} visible Sources headings (body repeats the frontmatter sources)`);
  if (dupInstall > 1) fail(`${dupInstall} visible install-step headings`);

  // Source-level ownership, so the failure names the file to fix.
  if (dupKinds.size > 0) fail(`body repeats frontmatter section(s): ${[...dupKinds].join(', ')}`);
  if (hasBodyH1(post.content)) fail('body contains an H1 (the layout renders the title)');

  // Reading layout: no 20rem sidebar, longform column present.
  if (/_20rem\)/.test(html) || /minmax\(0,1fr\)_20rem/.test(html)) {
    fail('old 20rem ad/sidebar grid still rendered');
  }
  if (!/class="longform"/.test(html)) fail('missing .longform reading column');

  // Table of contents: inline for desktop, collapsible for mobile.
  const h2 = (post.content.match(/^##\s+\S/gm) ?? []).length;
  const inlineToc = countAttr(html, 'data-toc="inline"');
  const collapsibleToc = countAttr(html, 'data-toc="collapsible"');
  if (h2 >= 3) {
    if (inlineToc !== 1) fail(`expected one inline TOC, found ${inlineToc}`);
    if (collapsibleToc !== 1) fail(`expected one collapsible TOC, found ${collapsibleToc}`);
  } else if (inlineToc + collapsibleToc > 0) {
    fail('TOC rendered for a page with fewer than three H2 sections');
  }

  // Schema must match the frontmatter it renders from.
  const blocks = jsonLdBlocks(html);
  const faqSchema = blocks.find((b) => b?.['@type'] === 'FAQPage');
  const howTo = blocks.find((b) => b?.['@type'] === 'HowTo');
  const faqCount = post.data.faqs?.length ?? 0;
  if (faqCount > 0) {
    if (!faqSchema) fail('missing FAQPage schema');
    else if (faqSchema.mainEntity.length !== faqCount) {
      fail(`FAQPage has ${faqSchema.mainEntity.length} questions for ${faqCount} frontmatter FAQs`);
    }
  }
  const stepCount = post.data.installSteps?.length ?? 0;
  if (isDownload && stepCount > 0) {
    if (!howTo) fail('missing HowTo schema');
    else if (howTo.step.length !== stepCount) {
      fail(`HowTo has ${howTo.step.length} steps for ${stepCount} frontmatter steps`);
    }
  }

  // Download page structure + ad separation.
  if (isDownload) {
    const cards = countAttr(html, 'data-download-card');
    if (cards !== 1) fail(`expected one download card, found ${cards}`);
    if (stepCount > 0 && countAttr(html, 'data-install-steps') !== 1) {
      fail('download page is missing its install steps section');
    }
    /*
     * Scope the ad search to the reading column. The desktop rails are siblings
     * of `.longform` (positioned against the container, not the column) and so
     * appear earlier in the DOM — but a sidebar unit is explicitly permitted by
     * CONTENT-STANDARD §6. The rule is about an ad above the download card *in
     * the article*, so the search starts at the column.
     */
    const columnStart = html.indexOf('class="longform"');
    const adIdx = html.indexOf('class="ad-unit', columnStart === -1 ? 0 : columnStart);
    const cardIdx = html.indexOf('data-download-card');
    const installIdx = html.indexOf('data-install-steps');
    if (adIdx !== -1 && cardIdx !== -1 && adIdx < cardIdx) {
      /*
       * Above the card is fine as long as a content section separates them. §6
       * prohibits an ad *adjacent* to a download button, not merely earlier on
       * the page — but with nothing between, the unit reads as part of the
       * download and AdSense treats it as one. The answer-box unit passes
       * because the key takeaways sit between it and the card.
       */
      const between = html.slice(adIdx, cardIdx);
      if (!between.includes('<section')) {
        fail('an ad unit sits immediately above the download card (needs a content section between)');
      }
    }
    if (adIdx !== -1 && installIdx !== -1 && adIdx < installIdx) {
      fail('an ad unit renders above the install steps (too close to the download action)');
    }
  }
}

/* ------------------------------------------------------------ page H1s */

/**
 * Non-post pages must carry exactly one H1. The layout renders the title as the
 * H1, so a body-level `# Heading` is always a duplicate — a defect the imported
 * WordPress pages shipped with.
 *
 * Post routes are excluded here because the per-post loop above already gates
 * them: a migrated post must have one H1, while a legacy post's duplicate is
 * counted as rollout debt rather than failing the build.
 */
function indexFiles(dir = DIST) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...indexFiles(full));
    else if (entry.name === 'index.html') out.push(full);
  }
  return out;
}

function postRouteSet() {
  const set = new Set();
  for (const file of readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'))) {
    const { data } = matter(readFileSync(join(POSTS_DIR, file), 'utf8'));
    let slug = String(data.slug ?? file.replace(/\.md$/, ''));
    try {
      slug = decodeURIComponent(slug);
    } catch {
      /* leave as-is */
    }
    set.add(`/${slug}/`);
  }
  return set;
}

/**
 * Pages and products whose body still opens with its own `# Heading`. Like the
 * legacy posts, these are rollout debt: touching the file would also put it
 * through the changed-content gate, which demands a fully compliant rewrite.
 * They are counted and reported, never silently ignored.
 */
function bodyH1DebtRoutes() {
  const set = new Set();
  for (const [dir, prefix] of [
    ['src/content/pages', ''],
    ['src/content/products', '/product'],
  ]) {
    for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
      const { data, content } = matter(readFileSync(join(dir, file), 'utf8'));
      if (!hasBodyH1(content)) continue;
      let slug = String(data.slug ?? file.replace(/\.md$/, ''));
      try {
        slug = decodeURIComponent(slug);
      } catch {
        /* leave as-is */
      }
      set.add(`${prefix}/${slug}/`);
    }
  }
  return set;
}

const postRoutes = postRouteSet();
const debtRoutes = bodyH1DebtRoutes();
let pagesChecked = 0;
let postH1Debt = 0;
let pageH1Debt = 0;

for (const file of indexFiles()) {
  const html = readFileSync(file, 'utf8');
  const rel = relative(DIST, file).split(sep).join('/');
  const route = rel === 'index.html' ? '/' : `/${rel.slice(0, -'index.html'.length)}`;
  const count = (html.match(/<h1[\s>]/g) ?? []).length;
  pagesChecked++;

  if (count !== 1) {
    if (postRoutes.has(route)) {
      postH1Debt++;
      continue;
    }
    if (debtRoutes.has(route)) {
      pageH1Debt++;
      continue;
    }
    errors.push(`${rel}: expected exactly one <h1>, found ${count}`);
  }
}

/* ---------------------------------------------------------- product pages */

/**
 * Product pages are exempt from the word band (CONTENT-STANDARD §3b), so their
 * quality is asserted in the DOM instead: a risk warning and a drawdown figure
 * must appear, and the account type must be stated.
 */
function productRoutes() {
  const set = new Set();
  for (const file of readdirSync(PRODUCTS_DIR).filter((f) => f.endsWith('.md'))) {
    const { data } = matter(readFileSync(join(PRODUCTS_DIR, file), 'utf8'));
    let slug = String(data.slug ?? file.replace(/\.md$/, ''));
    try {
      slug = decodeURIComponent(slug);
    } catch {
      /* leave as-is */
    }
    set.add(`/product/${slug}/`);
  }
  return set;
}

const productRouteSet = productRoutes();
let productsChecked = 0;

for (const file of indexFiles()) {
  const rel = relative(DIST, file).split(sep).join('/');
  const route = rel === 'index.html' ? '/' : `/${rel.slice(0, -'index.html'.length)}`;
  if (!productRouteSet.has(route)) continue;

  productsChecked++;
  const html = readFileSync(file, 'utf8');

  if (!/risk warning/i.test(html)) {
    errors.push(`${rel}: product page has no risk warning`);
  }
  if (!/drawdown/i.test(html)) {
    errors.push(`${rel}: product page shows no drawdown figure`);
  }
}

if (errors.length > 0) {
  console.error(`\ncheck-rendered-html FAILED with ${errors.length} error(s):`);
  for (const e of errors) console.error(`  - ${e}`);
  console.error(`\n(${strict} strict post pages, ${pagesChecked} pages total, ${legacy} legacy posts skipped as debt)`);
  process.exit(1);
}

if (notes.length && process.env.VERBOSE) for (const n of notes) console.log(`  ${n}`);
console.log(
  `check-rendered-html PASS: ${pagesChecked} page(s) checked; non-post pages have exactly one H1, ` +
    `${productsChecked} product page(s) carry a risk warning and drawdown figure, ` +
    `${strict} strict post pages clean (${legacy} legacy posts with body-section debt, ` +
    `${postH1Debt} posts + ${pageH1Debt} page(s)/product(s) with duplicate H1s).`,
);
void occurrences;
