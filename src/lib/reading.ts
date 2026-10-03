/**
 * Content analysis helpers: word counts, reading time, heading extraction.
 *
 * Heading ids are produced with the same slugger Astro's markdown pipeline
 * uses (github-slugger), so table-of-contents anchors always match the ids on
 * the rendered headings.
 */

import GithubSlugger from 'github-slugger';

/** Strip markdown syntax so the word count reflects prose, not code or URLs. */
export function toPlainText(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^\s{0,3}#{1,6}\s+/gm, '')
    .replace(/^\s{0,3}>\s?/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/[*_~|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function countWords(markdown: string): number {
  const text = toPlainText(markdown);
  if (!text) return 0;
  return text.split(/\s+/).filter((w) => /[a-zA-Z0-9]/.test(w)).length;
}

export function readingMinutes(words: number): number {
  return Math.max(1, Math.round(words / 225));
}

export type Heading = { depth: number; text: string; id: string };

/** Extract h2/h3 headings from raw markdown, with Astro-compatible ids. */
export function extractHeadings(markdown: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  let inFence = false;

  for (const line of markdown.split('\n')) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = line.match(/^(#{2,3})\s+(.+?)\s*#*\s*$/);
    if (!match) continue;

    const depth = match[1].length;
    const text = match[2]
      .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/[*_`~]/g, '')
      .trim();
    if (!text) continue;

    headings.push({ depth, text, id: slugger.slug(text) });
  }

  return headings;
}

/** 8-word shingles used for duplicate detection. */
export function shingles(markdown: string, size = 8): Set<string> {
  const words = toPlainText(markdown).toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(Boolean);
  const out = new Set<string>();
  for (let i = 0; i + size <= words.length; i++) {
    out.add(words.slice(i, i + size).join(' '));
  }
  return out;
}

export function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let intersection = 0;
  const [small, large] = a.size <= b.size ? [a, b] : [b, a];
  for (const item of small) if (large.has(item)) intersection++;
  return intersection / (a.size + b.size - intersection);
}
