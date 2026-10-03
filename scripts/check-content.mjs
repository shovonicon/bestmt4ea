/**
 * Content quality gate.
 *
 * Enforces the editorial standard in docs/CONTENT-STANDARD.md:
 *   - flags posts AND products outside the 3,500-7,500 word band
 *   - flags duplicate content between posts (8-word shingle Jaccard)
 *   - flags posts missing the answer-first block or FAQ schema
 *   - flags posts with too few internal links or outbound citations
 *   - flags missing keyTakeaways / faqs / sources / primaryKeyword / download
 *   - flags banned claim phrases anywhere in the body (policy safety, §4)
 *
 * Usage:
 *   node scripts/check-content.mjs                 # report only (exits 0)
 *   node scripts/check-content.mjs --dupes         # duplicate report only
 *   node scripts/check-content.mjs --strict        # strict-all: exit 1 on ANY violation
 *   node scripts/check-content.mjs --strict=true
 *   node scripts/check-content.mjs --changed       # gate only content changed vs the hash baseline
 *   node scripts/check-content.mjs --files a.md,b.md   # gate only these files
 *   node scripts/check-content.mjs --debt          # debt may only shrink vs src/data/content-debt.json
 *
 * Word counts are warnings by default because the 150 imported WordPress
 * posts predate this standard. Non-strict runs are report-only and always
 * exit 0; `--strict` prints every violation grouped by category and exits 1.
 * Run --strict in CI once the rewritten set is the majority.
 *
 * `--changed` and `--files` are the gate that matters day to day: a file a
 * session touched must satisfy the FULL strict standard, regardless of how
 * much legacy debt the rest of the corpus still carries.
 */

import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { countWords, shingles, jaccard } from '../src/lib/reading.ts';
import { validateDoc } from './content-rules.mjs';
import { changedFiles } from './changed-files.mjs';

const POSTS_DIR = 'src/content/posts';
const PRODUCTS_DIR = 'src/content/products';
const MIN_WORDS = 3500;
const MAX_WORDS = 7500;
const MIN_QUICK_ANSWER_WORDS = 40;
const MAX_QUICK_ANSWER_WORDS = 75;
const MIN_TAKEAWAYS = 3;
const MAX_TAKEAWAYS = 6;
const MIN_FAQS = 4;
const MAX_FAQS = 8;
const MIN_SOURCES = 2;
const DUPLICATE_THRESHOLD = 0.25;
const MIN_INTERNAL_LINKS = 4;
const MIN_CITATIONS = 2;
const MAX_SHOWN_PER_CATEGORY = 5;

const args = process.argv.slice(2);
const STRICT = args.some((a) => a === '--strict' || a === '--strict=true');
const DUPES_ONLY = args.includes('--dupes');
const CHANGED = args.includes('--changed');
const DEBT = args.includes('--debt');

/** `--files a.md,b.md` or `--files=a.md,b.md`. */
function parseFilesArg() {
  const i = args.findIndex((a) => a === '--files' || a.startsWith('--files='));
  if (i === -1) return [];
  const raw = args[i].includes('=') ? args[i].split('=').slice(1).join('=') : args[i + 1] ?? '';
  return raw.split(',').map((s) => s.trim()).filter(Boolean);
}
const FILES = parseFilesArg();

/**
 * Claim phrases banned by docs/CONTENT-STANDARD.md §4 (Google + Meta policy).
 * Matched case-insensitively against the raw body — regexes must stay
 * stateless (no /g flag) so repeated .test() calls are safe.
 */
const BANNED_CLAIMS = [
  { label: 'guaranteed', pattern: /\bguaranteed\b/i },
  { label: 'risk-free', pattern: /\brisk-free\b/i },
  { label: "can't lose", pattern: /\bcan'?t lose\b/i },
  { label: 'get rich', pattern: /\bget rich\b/i },
  { label: '100% profitable', pattern: /\b100%\s*profit(?:able)?\b/i },
  { label: 'no loss', pattern: /\bno loss\b/i },
  { label: 'passive income guaranteed', pattern: /\bpassive income guaranteed\b/i },
];

/** Violation categories, in the order they are reported. */
const CATEGORIES = [
  'word count outside 3500-7500',
  'missing quickAnswer',
  'quickAnswer outside 40-75 words',
  'keyTakeaways outside 3-6',
  'faqs outside 4-8',
  'fewer than 2 sources',
  'fewer than 4 internal links',
  'missing download block',
  'missing primaryKeyword',
  'banned claim phrase',
  'duplicate pair at or above 0.25',
];

/* ------------------------------------------------------------------ load */

/**
 * Load one content directory into flat records.
 * `kind` is 'post' or 'product': only posts are compared for duplicates, only
 * posts are expected to carry a `download:` block, and only posts count
 * internal links (a product page is a sales page, not a hub).
 */
async function loadDocs(dir, kind) {
  const files = (await readdir(dir)).filter((f) => f.endsWith('.md'));
  const out = [];

  for (const file of files) {
    const raw = await readFile(join(dir, file), 'utf8');
    const { data, content } = matter(raw);

    const internalLinks = (content.match(/\]\(\/[^)]*\)/g) ?? []).length;
    const outboundLinks = (content.match(/\]\(https?:\/\/(?!(?:www\.)?bestmt4ea\.com)[^)]*\)/g) ?? []).length;

    out.push({
      kind,
      file,
      slug: data.slug ?? file.replace(/\.md$/, ''),
      title: data.title ?? file,
      words: countWords(content),
      internalLinks,
      citations: (data.sources?.length ?? 0) + outboundLinks,
      hasQuickAnswer: Boolean(data.quickAnswer),
      quickAnswerWords: data.quickAnswer ? countWords(data.quickAnswer) : 0,
      hasFaqs: (data.faqs?.length ?? 0) > 0,
      faqCount: data.faqs?.length ?? 0,
      takeawayCount: data.keyTakeaways?.length ?? 0,
      sourceCount: data.sources?.length ?? 0,
      hasPrimaryKeyword: Boolean(data.primaryKeyword),
      isDownload: Boolean(data.download),
      banned: BANNED_CLAIMS.filter((c) => c.pattern.test(content)).map((c) => c.label),
      shingles: kind === 'post' ? shingles(content) : new Set(),
    });
  }

  return out;
}

/* ---------------------------------------------------- changed-content gate */

/**
 * A content file that a session touched must satisfy the FULL strict standard,
 * regardless of how much legacy debt the rest of the corpus still carries.
 * Only posts and products are gated: legal and system pages follow their own
 * rules and are not long-form content.
 */
async function runChangedGate(targets) {
  const scoped = targets.filter((p) => p.includes('/posts/') || p.includes('/products/'));
  const skipped = targets.length - scoped.length;

  if (scoped.length === 0) {
    console.log(
      `changed-content gate PASS: no changed post/product file(s)` +
        (skipped ? ` — ${skipped} changed page file(s) not gated.` : '.'),
    );
    return 0;
  }

  const violations = [];
  for (const rel of scoped) {
    if (!existsSync(rel)) {
      violations.push({ file: rel, code: 'missing-file', detail: 'file not found' });
      continue;
    }
    const { data, content } = matter(await readFile(rel, 'utf8'));
    const kind = rel.includes('/products/') ? 'product' : 'post';
    for (const issue of validateDoc({ data, content, kind })) {
      violations.push({ file: rel, code: issue.code, detail: issue.detail });
    }
  }

  if (violations.length === 0) {
    console.log(`changed-content gate PASS: ${scoped.length} changed file(s) meet the standard.`);
    if (skipped) console.log(`  (${skipped} changed page file(s) not gated)`);
    return 0;
  }

  console.error(`\nchanged-content gate FAILED: ${violations.length} violation(s) in ${scoped.length} file(s):`);
  for (const v of violations) {
    console.error(`  - ${v.file} [${v.code}]${v.detail ? ` ${v.detail}` : ''}`);
  }
  console.error('\nA changed file must be fully compliant — see docs/CONTENT-STANDARD.md.');
  return 1;
}

/* --------------------------------------------------------------- debt gate */

/** Violation codes per doc, in the shape src/data/content-debt.json stores. */
async function computeDebt() {
  const out = {};
  for (const [dir, kind] of [
    [POSTS_DIR, 'post'],
    [PRODUCTS_DIR, 'product'],
  ]) {
    for (const file of (await readdir(dir)).filter((f) => f.endsWith('.md'))) {
      const { data, content } = matter(await readFile(join(dir, file), 'utf8'));
      const codes = [...new Set(validateDoc({ data, content, kind }).map((i) => i.code))].sort();
      if (codes.length === 0) continue;
      out[`${kind}:${data.slug ?? file.replace(/\.md$/, '')}`] = { file: `${dir}/${file}`, codes };
    }
  }
  return out;
}

/**
 * Debt may only shrink: fail on any violation code that is new for a doc, and
 * on any doc that appears with violations for the first time. Codes are
 * compared as sets, so a post getting shorter does not count as a regression —
 * only a new kind of problem does.
 */
async function runDebtGate() {
  const baselinePath = 'src/data/content-debt.json';
  if (!existsSync(baselinePath)) {
    console.error(`Missing ${baselinePath} — run: node scripts/snapshot-debt.mjs --write`);
    return 1;
  }
  const baseline = JSON.parse(await readFile(baselinePath, 'utf8'));
  const baseEntries = baseline.entries ?? {};
  const current = await computeDebt();

  const regressions = [];
  for (const [key, entry] of Object.entries(current)) {
    const base = baseEntries[key];
    if (!base) {
      regressions.push(`${entry.file}: new doc with violations [${entry.codes.join(', ')}]`);
      continue;
    }
    const baseCodes = new Set(Object.keys(base.violations ?? {}));
    const added = entry.codes.filter((c) => !baseCodes.has(c));
    if (added.length) regressions.push(`${entry.file}: new violation(s) [${added.join(', ')}]`);
  }

  const baseCount = Object.keys(baseEntries).length;
  const curCount = Object.keys(current).length;
  const resolved = Object.keys(baseEntries).filter((k) => !current[k]).length;

  console.log(`content debt: ${baseCount} -> ${curCount} doc(s) with violations (${resolved} now clean).`);

  if (regressions.length > 0) {
    console.error(`\ndebt gate FAILED with ${regressions.length} regression(s):`);
    for (const r of regressions.slice(0, 40)) console.error(`  - ${r}`);
    if (regressions.length > 40) console.error(`  ... and ${regressions.length - 40} more`);
    return 1;
  }
  console.log('debt gate PASS: no new violations.');
  return 0;
}

if (FILES.length) process.exit(await runChangedGate(FILES));
if (CHANGED) process.exit(await runChangedGate(changedFiles()));
if (DEBT) process.exit(await runDebtGate());

const docs = await loadDocs(POSTS_DIR, 'post');
const products = await loadDocs(PRODUCTS_DIR, 'product');
const all = [...docs, ...products];

/* ------------------------------------------------------------- duplicates */

const duplicates = [];
for (let i = 0; i < docs.length; i++) {
  for (let j = i + 1; j < docs.length; j++) {
    const score = jaccard(docs[i].shingles, docs[j].shingles);
    if (score >= DUPLICATE_THRESHOLD) {
      duplicates.push({ a: docs[i], b: docs[j], score });
    }
  }
}
duplicates.sort((x, y) => y.score - x.score);

/* ---------------------------------------------------------------- report */

if (!DUPES_ONLY) {
  const under = docs.filter((d) => d.words < MIN_WORDS);
  const over = docs.filter((d) => d.words > MAX_WORDS);
  const inBand = docs.length - under.length - over.length;

  const avg = Math.round(docs.reduce((sum, d) => sum + d.words, 0) / docs.length);
  const sorted = [...docs].sort((a, b) => a.words - b.words);

  console.log('WORD COUNT');
  console.log(`  posts            ${docs.length}`);
  console.log(`  in band          ${inBand}  (${MIN_WORDS}-${MAX_WORDS})`);
  console.log(`  below band       ${under.length}`);
  console.log(`  above band       ${over.length}`);
  console.log(`  average          ${avg} words`);
  console.log(`  shortest         ${sorted[0]?.words} (${sorted[0]?.slug})`);
  console.log(`  longest          ${sorted[sorted.length - 1]?.words} (${sorted[sorted.length - 1]?.slug})`);

  /*
   * Products are exempt from the word band (docs/CONTENT-STANDARD.md §3b): a
   * product page earns the buying decision with evidence, not length. Report the
   * length as information only — `check:rendered` asserts the evidence instead.
   */
  const prodAvg = products.length
    ? Math.round(products.reduce((sum, d) => sum + d.words, 0) / products.length)
    : 0;

  console.log('\nPRODUCT PAGES (exempt from the word band — CONTENT-STANDARD §3b)');
  console.log(`  products         ${products.length}`);
  console.log(`  average          ${prodAvg} words`);
  console.log(`  evidence         asserted by \`npm run check:rendered\` (chart, risk, account type)`);

  const noAnswer = docs.filter((d) => !d.hasQuickAnswer);
  const noFaq = docs.filter((d) => !d.hasFaqs);
  const fewLinks = docs.filter((d) => d.internalLinks < MIN_INTERNAL_LINKS && d.words >= MIN_WORDS);
  const fewCites = docs.filter((d) => d.citations < MIN_CITATIONS && d.words >= MIN_WORDS);

  console.log('\nSTRUCTURE');
  console.log(`  missing quickAnswer     ${noAnswer.length}`);
  console.log(`  missing FAQ schema      ${noFaq.length}`);
  console.log(`  thin internal linking   ${fewLinks.length}  (long posts only)`);
  console.log(`  thin citations          ${fewCites.length}  (long posts only)`);
  console.log(`  free-download posts     ${docs.filter((d) => d.isDownload).length}`);
  console.log(`  missing primaryKeyword  ${docs.filter((d) => !d.hasPrimaryKeyword).length}`);
  console.log(`  missing download        ${docs.filter((d) => !d.isDownload).length}`);
  console.log(`  keyTakeaways off 3-6    ${docs.filter((d) => d.takeawayCount < MIN_TAKEAWAYS || d.takeawayCount > MAX_TAKEAWAYS).length}`);
  console.log(`  faqs off 4-8            ${docs.filter((d) => d.faqCount < MIN_FAQS || d.faqCount > MAX_FAQS).length}`);
  console.log(`  sources under 2         ${docs.filter((d) => d.sourceCount < MIN_SOURCES).length}`);
  console.log(`  banned claim phrases    ${docs.filter((d) => d.banned.length > 0).length}`);
}

console.log('\nDUPLICATE CONTENT');
if (duplicates.length === 0) {
  console.log(`  none above ${DUPLICATE_THRESHOLD} similarity`);
} else {
  console.log(`  ${duplicates.length} pair(s) at or above ${DUPLICATE_THRESHOLD} similarity:`);
  for (const d of duplicates.slice(0, 25)) {
    console.log(`  ${(d.score * 100).toFixed(0).padStart(3)}%  ${d.a.slug}`);
    console.log(`        ${d.b.slug}`);
  }
  if (duplicates.length > 25) console.log(`  ... and ${duplicates.length - 25} more`);
}

/* ------------------------------------------------------------ violations */

/**
 * Every machine-checkable rule, as a flat issue list. Strict mode prints this
 * grouped by category and exits 1 when it is non-empty.
 */
function collectViolations() {
  const issues = [];
  const add = (category, slug, detail) => issues.push({ category, slug, detail: detail ?? '' });

  // Word band — posts and products alike.
  for (const d of all) {
    if (d.words < MIN_WORDS || d.words > MAX_WORDS) {
      add(
        'word count outside 3500-7500',
        d.slug,
        `${d.kind} · ${d.words} words (${d.words < MIN_WORDS ? 'below' : 'above'})`,
      );
    }
  }

  // Answer-first block.
  for (const d of all) {
    if (!d.hasQuickAnswer) {
      add('missing quickAnswer', d.slug, d.kind);
    } else if (d.quickAnswerWords < MIN_QUICK_ANSWER_WORDS || d.quickAnswerWords > MAX_QUICK_ANSWER_WORDS) {
      add('quickAnswer outside 40-75 words', d.slug, `${d.quickAnswerWords} words`);
    }
  }

  // GEO / E-E-A-T frontmatter blocks.
  for (const d of all) {
    if (d.takeawayCount < MIN_TAKEAWAYS || d.takeawayCount > MAX_TAKEAWAYS) {
      add('keyTakeaways outside 3-6', d.slug, `${d.takeawayCount} bullet(s)`);
    }
    if (d.faqCount < MIN_FAQS || d.faqCount > MAX_FAQS) {
      add('faqs outside 4-8', d.slug, `${d.faqCount} Q&A(s)`);
    }
    if (d.sourceCount < MIN_SOURCES) {
      add('fewer than 2 sources', d.slug, `${d.sourceCount} source(s)`);
    }
    if (!d.hasPrimaryKeyword) {
      add('missing primaryKeyword', d.slug, d.kind);
    }
  }

  // Internal linking — long posts only, matching the report above.
  for (const d of docs) {
    if (d.words >= MIN_WORDS && d.internalLinks < MIN_INTERNAL_LINKS) {
      add('fewer than 4 internal links', d.slug, `${d.internalLinks} link(s)`);
    }
  }

  // The second iron rule: a download on every post.
  for (const d of docs) {
    if (!d.isDownload) add('missing download block', d.slug, '');
  }

  // Policy safety.
  for (const d of all) {
    if (d.banned.length > 0) add('banned claim phrase', d.slug, d.banned.join(', '));
  }

  // Duplicate content (existing gate).
  for (const dup of duplicates) {
    add('duplicate pair at or above 0.25', `${dup.a.slug} / ${dup.b.slug}`, `${(dup.score * 100).toFixed(0)}%`);
  }

  return issues;
}

/* ------------------------------------------------------------ exit state */

if (STRICT) {
  const violations = collectViolations();

  console.log('\nSTRICT VIOLATIONS');
  if (violations.length === 0) {
    console.log('  none — every post and product meets the standard.');
  } else {
    let categories = 0;
    for (const category of CATEGORIES) {
      const items = violations.filter((v) => v.category === category);
      if (items.length === 0) continue;
      categories++;
      console.log(`  ${category}  (${items.length})`);
      for (const item of items.slice(0, MAX_SHOWN_PER_CATEGORY)) {
        console.log(`    - ${item.slug}${item.detail ? `: ${item.detail}` : ''}`);
      }
      if (items.length > MAX_SHOWN_PER_CATEGORY) {
        console.log(`    ... and ${items.length - MAX_SHOWN_PER_CATEGORY} more`);
      }
    }
    console.log(
      `\nSTRICT: ${violations.length} violation(s) in ${categories} category(ies) — see docs/CONTENT-STANDARD.md §13.`,
    );
  }

  process.exit(violations.length > 0 ? 1 : 0);
}

if (duplicates.length > 0) {
  console.log(`\nNOTE: ${duplicates.length} duplicate pair(s) at or above ${DUPLICATE_THRESHOLD} — resolve before publishing.`);
}
if (!DUPES_ONLY) {
  console.log('\nNON-STRICT: report only (exit 0). Run --strict to fail on any violation.');
}
