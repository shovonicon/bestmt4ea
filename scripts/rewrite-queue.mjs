#!/usr/bin/env node
/**
 * Rewrite queue.
 *
 * Drives the phased rewrite rollout in docs/CONTENT-STANDARD.md §12. Reads
 * every post, works out what still needs doing — word count outside the
 * 3,500-7,500 band, and which of quickAnswer / faqs / sources / download /
 * primaryKeyword are missing — and writes a prioritised worklist to
 * src/data/rewrite-queue.json, plus a markdown table on stdout.
 *
 * Priority order:
 *   1  the free-download hub and the money pages
 *      (free-download-forex-ea-indicator, best-mt4-ea, best-forex-ea,
 *      top-ranking), plus every post whose slug names gold / XAUUSD
 *   2  posts missing a `download:` block (the second iron rule)
 *   3  everything else, lowest word count first
 *
 * Within a priority band, lowest word count first — the thinnest page is the
 * one losing the most traffic, and it is the cheapest rewrite.
 *
 * Usage: node scripts/rewrite-queue.mjs
 */

import { readFile, readdir, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import matter from 'gray-matter';
import { countWords } from '../src/lib/reading.ts';

const POSTS_DIR = 'src/content/posts';
const HUB_PAGE = 'src/content/pages/free-download-forex-ea-indicator.md';
const OUT_FILE = 'src/data/rewrite-queue.json';

const MIN_WORDS = 3500;
const MAX_WORDS = 7500;
const MIN_QUICK_ANSWER_WORDS = 40;
const MAX_QUICK_ANSWER_WORDS = 75;
const MIN_FAQS = 4;
const MIN_SOURCES = 2;

/** Batch 1 money pages (docs/CONTENT-STANDARD.md §12) plus the hub itself. */
const MONEY_SLUGS = [
  'free-download-forex-ea-indicator',
  'best-mt4-ea',
  'best-forex-ea',
  'top-ranking',
];

/** Topics carrying the highest commercial intent in this niche. */
const PRIORITY_TOPICS = ['gold', 'xauusd'];

const PRIORITY_LABELS = {
  1: 'money page / hub / gold',
  2: 'missing download',
  3: 'thin content',
};

/* ------------------------------------------------------------ hub links */

/**
 * Slugs of posts linked from the free-download hub page. The hub is what the
 * advertising and affiliate traffic lands on, so everything it points at is
 * worth rewriting first. Returns [] when the page does not exist.
 */
async function hubSlugs() {
  if (!existsSync(HUB_PAGE)) return [];

  const { content } = matter(await readFile(HUB_PAGE, 'utf8'));
  const slugs = new Set();

  for (const match of content.matchAll(/\]\(\/([^)\s#?]+)/g)) {
    let slug = match[1].replace(/\/+$/, '');
    try {
      slug = decodeURIComponent(slug);
    } catch {
      /* keep the encoded form */
    }
    if (slug && !slug.includes('/')) slugs.add(slug);
  }

  return [...slugs];
}

const HUB_SLUGS = await hubSlugs();
const PRIORITY_SLUGS = new Set([...MONEY_SLUGS, ...HUB_SLUGS]);

const isPriorityOne = (slug) => {
  const lower = slug.toLowerCase();
  return PRIORITY_SLUGS.has(slug) || PRIORITY_TOPICS.some((topic) => lower.includes(topic));
};

/* ------------------------------------------------------------------ load */

const files = (await readdir(POSTS_DIR)).filter((f) => f.endsWith('.md'));
const posts = [];

for (const file of files) {
  const raw = await readFile(join(POSTS_DIR, file), 'utf8');
  const { data, content } = matter(raw);

  const slug = data.slug ?? file.replace(/\.md$/, '');
  const words = countWords(content);
  const faqCount = data.faqs?.length ?? 0;
  const sourceCount = data.sources?.length ?? 0;
  const hasDownload = Boolean(data.download);

  const issues = [];
  if (words < MIN_WORDS) issues.push(`words ${words} (below ${MIN_WORDS})`);
  if (words > MAX_WORDS) issues.push(`words ${words} (above ${MAX_WORDS})`);

  if (!data.quickAnswer) {
    issues.push('missing quickAnswer');
  } else {
    const answerWords = countWords(data.quickAnswer);
    if (answerWords < MIN_QUICK_ANSWER_WORDS || answerWords > MAX_QUICK_ANSWER_WORDS) {
      issues.push(`quickAnswer ${answerWords} words (needs 40-75)`);
    }
  }

  if (faqCount < MIN_FAQS) issues.push(`faqs ${faqCount} (needs 4+)`);
  if (sourceCount < MIN_SOURCES) issues.push(`sources ${sourceCount} (needs 2+)`);
  if (!hasDownload) issues.push('missing download');
  if (!data.primaryKeyword) issues.push('missing primaryKeyword');

  const priority = isPriorityOne(slug) ? 1 : hasDownload ? 3 : 2;

  posts.push({
    file: `${POSTS_DIR}/${file}`,
    slug,
    words,
    priority,
    issues,
  });
}

const needsWork = posts
  .filter((p) => p.issues.length > 0)
  .sort((a, b) => a.priority - b.priority || a.words - b.words || a.slug.localeCompare(b.slug))
  .map((p, index) => ({ ...p, rank: index + 1, priorityLabel: PRIORITY_LABELS[p.priority] }));

const byPriority = {
  1: needsWork.filter((p) => p.priority === 1).length,
  2: needsWork.filter((p) => p.priority === 2).length,
  3: needsWork.filter((p) => p.priority === 3).length,
};

const queue = {
  generatedAt: new Date().toISOString(),
  source: POSTS_DIR,
  standards: {
    minWords: MIN_WORDS,
    maxWords: MAX_WORDS,
    minQuickAnswerWords: MIN_QUICK_ANSWER_WORDS,
    maxQuickAnswerWords: MAX_QUICK_ANSWER_WORDS,
    minFaqs: MIN_FAQS,
    minSources: MIN_SOURCES,
    requiresDownload: true,
    requiresPrimaryKeyword: true,
    reference: 'docs/CONTENT-STANDARD.md §12',
  },
  prioritySlugs: { moneyPages: MONEY_SLUGS, hubLinks: HUB_SLUGS, topics: PRIORITY_TOPICS },
  total: posts.length,
  needsWork: needsWork.length,
  clean: posts.length - needsWork.length,
  byPriority,
  queue: needsWork,
};

/* ------------------------------------------------------------------ write */

await mkdir(dirname(OUT_FILE), { recursive: true });
await writeFile(OUT_FILE, `${JSON.stringify(queue, null, 2)}\n`, 'utf8');

/* ----------------------------------------------------------------- report */

console.log('REWRITE QUEUE — docs/CONTENT-STANDARD.md §12');
console.log(`  posts read       ${posts.length}`);
console.log(`  needs work       ${needsWork.length}`);
console.log(`  already clean    ${posts.length - needsWork.length}`);
console.log(`  priority 1       ${byPriority[1]}  (money page / hub / gold)`);
console.log(`  priority 2       ${byPriority[2]}  (missing download)`);
console.log(`  priority 3       ${byPriority[3]}  (thin content, lowest words first)`);
console.log(`  written          ${OUT_FILE}`);

console.log('\n| # | P | Slug | Words | Issues |');
console.log('|---:|:-:|---|---:|---|');
for (const post of needsWork) {
  console.log(
    `| ${post.rank} | ${post.priority} | ${post.slug} | ${post.words} | ${post.issues.join('; ')} |`,
  );
}

console.log(`\n${needsWork.length} of ${posts.length} posts queued — rewrite guide: docs/AI-POST-BRIEF.md`);
