/**
 * Shared content validation rules — docs/CONTENT-STANDARD.md.
 *
 * Single source of truth for every content gate in this repo:
 *   - scripts/check-content.mjs  (report + strict-all)
 *   - scripts/rewrite-queue.mjs  (prioritised worklist)
 *   - scripts/release-gate.mjs   (changed-content strict + production gate)
 *   - src/data/content-debt.json (reviewed legacy baseline)
 *
 * OWNERSHIP RULE (Phase 0 contract):
 *   `faqs`, `sources` and `installSteps` live in frontmatter. Layouts render
 *   those sections. Markdown bodies must NOT contain a visible H1, FAQ,
 *   Sources or Install section — those would render twice.
 */

import { countWords } from '../src/lib/reading.ts';

export const LIMITS = {
  MIN_WORDS: 3500,
  MAX_WORDS: 7500,
  MIN_QUICK_ANSWER_WORDS: 40,
  MAX_QUICK_ANSWER_WORDS: 75,
  MIN_TAKEAWAYS: 3,
  MAX_TAKEAWAYS: 6,
  MIN_FAQS: 4,
  MAX_FAQS: 8,
  MIN_SOURCES: 2,
  MIN_INTERNAL_LINKS: 4,
  MIN_CITATIONS: 2,
  MAX_TITLE_CHARS: 60,
  MIN_DESC_CHARS: 150,
  MAX_DESC_CHARS: 160,
  DUPLICATE_THRESHOLD: 0.25,
};

/**
 * Claim phrases banned by docs/CONTENT-STANDARD.md §4 (Google + Meta policy).
 * Matched case-insensitively against the raw body — regexes stay stateless
 * (no /g flag) so repeated .test() calls are safe.
 */
export const BANNED_CLAIMS = [
  { label: 'guaranteed', pattern: /\bguaranteed\b/i },
  { label: 'risk-free', pattern: /\brisk-free\b/i },
  { label: "can't lose", pattern: /\bcan'?t lose\b/i },
  { label: 'get rich', pattern: /\bget rich\b/i },
  { label: '100% profitable', pattern: /\b100%\s*profit(?:able)?\b/i },
  { label: 'no loss', pattern: /\bno loss\b/i },
  { label: 'passive income guaranteed', pattern: /\bpassive income guaranteed\b/i },
];

/** Violation codes, stable — content-debt.json keys off these. */
export const CODES = {
  WORD_COUNT: 'word-count',
  MISSING_QUICK_ANSWER: 'missing-quickanswer',
  QUICK_ANSWER_LENGTH: 'quickanswer-length',
  TAKEAWAYS_COUNT: 'takeaways-count',
  FAQS_COUNT: 'faqs-count',
  SOURCES_COUNT: 'sources-count',
  MISSING_DOWNLOAD: 'missing-download',
  DOWNLOAD_INVALID: 'download-invalid',
  MISSING_KEYWORD: 'missing-primary-keyword',
  BANNED_CLAIM: 'banned-claim',
  DUPLICATE_PAIR: 'duplicate-pair',
  BODY_H1: 'body-h1',
  DUP_FAQ_SECTION: 'dup-faq-section',
  DUP_SOURCES_SECTION: 'dup-sources-section',
  DUP_INSTALL_SECTION: 'dup-install-section',
  TITLE_LENGTH: 'title-length',
  DESCRIPTION_LENGTH: 'description-length',
  BAD_SOURCE_URL: 'bad-source-url',
  FUTURE_DATE: 'future-date',
  DATE_ORDER: 'date-order',
  MISSING_INSTALL_STEPS: 'missing-install-steps',
  THIN_LINKS: 'thin-links',
};

const ISSUE = (code, detail = '') => ({ code, detail });

/** True when a date value parses to a real date later than now. */
export function isFutureDate(value) {
  if (!value) return false;
  const t = new Date(value).getTime();
  return Number.isFinite(t) && t > Date.now();
}

/** Absolute http(s) URL, no spaces. */
export function isAbsoluteUrl(value) {
  return typeof value === 'string' && /^https?:\/\/\S+$/i.test(value.trim());
}

/** Count root-relative internal links (`](/slug...)`) in the body. */
export function countInternalLinks(content) {
  return (content.match(/\]\(\/[^)]*\)/g) ?? []).length;
}

/** A body H1 (`# ...` at line start, outside fences) duplicates the layout H1. */
export function hasBodyH1(content) {
  let inFence = false;
  for (const line of content.split('\n')) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (!inFence && /^#{1}\s+\S/.test(line)) return true;
  }
  return false;
}

/**
 * Visible `## FAQ` / `## Sources` / install-steps sections in the body render
 * a second copy of what the layout already renders from frontmatter.
 * Headings are matched outside fences, case-insensitively, on `##` or `###`.
 */
export function bodySectionKinds(content) {
  const found = new Set();
  let inFence = false;
  for (const line of content.split('\n')) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = line.match(/^#{2,3}\s+(.+?)\s*#*\s*$/);
    if (!m) continue;
    const text = m[1]
      .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/[*_`~]/g, '')
      .trim()
      .toLowerCase();
    if (/^(frequently asked questions|faqs?)\b/.test(text)) found.add('faq');
    else if (/^sources?\b/.test(text)) found.add('sources');
    else if (/^(install(ation|ing)?( steps?| guide)?|how to install.*|setup( steps?| guide)?)\b/.test(text)) {
      found.add('install');
    }
  }
  return found;
}

/** Validate the `download:` frontmatter shape (mirrors src/content.config.ts). */
export function validateDownloadShape(download) {
  if (!download) return [ISSUE(CODES.MISSING_DOWNLOAD)];
  const issues = [];
  if (!['own', 'opensource'].includes(download.origin)) {
    issues.push(ISSUE(CODES.DOWNLOAD_INVALID, 'origin must be own|opensource'));
  }
  if (!download.license) issues.push(ISSUE(CODES.DOWNLOAD_INVALID, 'missing license'));
  if (download.origin === 'opensource' && (!download.author || !download.sourceUrl)) {
    issues.push(ISSUE(CODES.DOWNLOAD_INVALID, 'opensource needs author + sourceUrl'));
  }
  if (!download.fileKey && !download.externalUrl) {
    issues.push(ISSUE(CODES.DOWNLOAD_INVALID, 'needs fileKey or externalUrl'));
  }
  if (download.externalUrl && !isAbsoluteUrl(download.externalUrl)) {
    issues.push(ISSUE(CODES.DOWNLOAD_INVALID, 'externalUrl not absolute'));
  }
  return issues;
}

/**
 * Full validation of one post/product document. Returns issue codes.
 * `kind` is 'post' | 'product'. Products skip download/install/link rules —
 * a product page is a sales page, not a hub (matches check-content today).
 */
export function validateDoc({ data, content, kind = 'post' }) {
  const issues = [];
  const words = countWords(content);

  /*
   * The word band applies to POSTS only.
   *
   * A product page is a buying decision, not an essay. Padding it to hit a word
   * count makes it worse at its actual job, so products are judged on evidence
   * instead — real metrics, a chart drawn from real data, specs, licence tiers,
   * account type and honest limits (docs/CONTENT-STANDARD.md §3b). The rendered
   * checks in scripts/check-rendered-html.mjs enforce that instead.
   */
  if (kind === 'post' && (words < LIMITS.MIN_WORDS || words > LIMITS.MAX_WORDS)) {
    issues.push(ISSUE(CODES.WORD_COUNT, `${words} words`));
  }

  if (!data.quickAnswer) {
    issues.push(ISSUE(CODES.MISSING_QUICK_ANSWER));
  } else {
    const qa = countWords(data.quickAnswer);
    if (qa < LIMITS.MIN_QUICK_ANSWER_WORDS || qa > LIMITS.MAX_QUICK_ANSWER_WORDS) {
      issues.push(ISSUE(CODES.QUICK_ANSWER_LENGTH, `${qa} words`));
    }
  }

  const take = data.keyTakeaways?.length ?? 0;
  if (take < LIMITS.MIN_TAKEAWAYS || take > LIMITS.MAX_TAKEAWAYS) {
    issues.push(ISSUE(CODES.TAKEAWAYS_COUNT, `${take} bullet(s)`));
  }
  const faqs = data.faqs?.length ?? 0;
  if (faqs < LIMITS.MIN_FAQS || faqs > LIMITS.MAX_FAQS) {
    issues.push(ISSUE(CODES.FAQS_COUNT, `${faqs} Q&A(s)`));
  }
  const sources = data.sources?.length ?? 0;
  if (sources < LIMITS.MIN_SOURCES) {
    issues.push(ISSUE(CODES.SOURCES_COUNT, `${sources} source(s)`));
  }
  if (!data.primaryKeyword) issues.push(ISSUE(CODES.MISSING_KEYWORD));

  if (kind === 'post') {
    issues.push(...validateDownloadShape(data.download));
    if (data.download && (data.installSteps?.length ?? 0) === 0) {
      issues.push(ISSUE(CODES.MISSING_INSTALL_STEPS));
    }
    if (words >= LIMITS.MIN_WORDS && countInternalLinks(content) < LIMITS.MIN_INTERNAL_LINKS) {
      issues.push(ISSUE(CODES.THIN_LINKS, `${countInternalLinks(content)} link(s)`));
    }
  }

  for (const claim of BANNED_CLAIMS) {
    if (claim.pattern.test(content)) {
      issues.push(ISSUE(CODES.BANNED_CLAIM, claim.label));
      break;
    }
  }

  // Single-source ownership (Phase 0 contract).
  if (hasBodyH1(content)) issues.push(ISSUE(CODES.BODY_H1));
  const sections = bodySectionKinds(content);
  if (sections.has('faq')) issues.push(ISSUE(CODES.DUP_FAQ_SECTION));
  if (sections.has('sources')) issues.push(ISSUE(CODES.DUP_SOURCES_SECTION));
  if (sections.has('install') && kind === 'post' && data.download) {
    issues.push(ISSUE(CODES.DUP_INSTALL_SECTION));
  }

  // Meta + source hygiene.
  if (typeof data.title === 'string' && data.title.length > LIMITS.MAX_TITLE_CHARS) {
    issues.push(ISSUE(CODES.TITLE_LENGTH, `${data.title.length} chars`));
  }
  const desc = data.seo?.description || data.description || '';
  if (desc && (desc.length < LIMITS.MIN_DESC_CHARS || desc.length > LIMITS.MAX_DESC_CHARS)) {
    issues.push(ISSUE(CODES.DESCRIPTION_LENGTH, `${desc.length} chars`));
  }
  for (const s of data.sources ?? []) {
    if (!isAbsoluteUrl(s?.url)) {
      issues.push(ISSUE(CODES.BAD_SOURCE_URL, String(s?.url ?? '')));
      break;
    }
  }
  if (isFutureDate(data.publishedAt) || isFutureDate(data.updatedAt)) {
    issues.push(ISSUE(CODES.FUTURE_DATE));
  }
  if (data.publishedAt && data.updatedAt && new Date(data.updatedAt) < new Date(data.publishedAt)) {
    issues.push(ISSUE(CODES.DATE_ORDER));
  }

  return issues;
}
