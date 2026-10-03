/**
 * Strip duplicated frontmatter sections from post bodies.
 *
 * The Phase 0 contract makes frontmatter the only owner of FAQs, sources and
 * install steps. The imported WordPress posts repeat those sections in the
 * Markdown, so the layout renders them twice. This removes the body copies.
 *
 * Usage:
 *   node scripts/strip-dup-sections.mjs --dry-run
 *   node scripts/strip-dup-sections.mjs --write
 *
 * Scope: by default only posts carrying a `download:` block, because those are
 * the pages whose FAQs/sources/install steps are owned by frontmatter — the
 * body copies are pure duplicates and removing them loses nothing. Some legacy
 * posts keep their only FAQ copy in the body; those are migrated during the
 * content rollout (frontmatter written first), not by this script. Pass
 * `--all` to widen the scope once a post's frontmatter owns its sections.
 */

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { bodySectionKinds, hasBodyH1 } from './content-rules.mjs';

const DIR = 'src/content/posts';
const WRITE = process.argv.includes('--write');
const ALL = process.argv.includes('--all');

const plain = (c) =>
  c.replace(/```[\s\S]*?```/g, ' ').replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ').replace(/^\s{0,3}#{1,6}\s+/gm, '')
    .replace(/^\s{0,3}>\s?/gm, '').replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '').replace(/[*_~|]/g, ' ')
    .replace(/\s+/g, ' ').trim();
const wc = (c) => { const t = plain(c); return t ? t.split(/\s+/).filter((w) => /[a-zA-Z0-9]/.test(w)).length : 0; };

/** Split a document into its frontmatter block and its body, byte-exact. */
function splitDoc(raw) {
  const lines = raw.split('\n');
  let end = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') { end = i; break; }
  }
  return { fm: lines.slice(0, end + 1).join('\n'), body: lines.slice(end + 1).join('\n') };
}

/** Drop every level-2 section whose heading is a frontmatter-owned section. */
function stripSections(body) {
  const out = [];
  let dropping = false;
  let inFence = false;
  for (const line of body.split('\n')) {
    if (/^\s*```/.test(line)) inFence = !inFence;
    if (!inFence) {
      const m = line.match(/^##\s+(.+?)\s*#*\s*$/);
      if (m) {
        const kind = bodySectionKinds(`## ${m[1]}\n`).size > 0;
        dropping = kind;
        if (dropping) continue;
      }
    }
    if (!dropping) out.push(line);
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n').replace(/\s+$/, '\n');
}

const rows = [];
for (const file of readdirSync(DIR).filter((f) => f.endsWith('.md'))) {
  const raw = readFileSync(join(DIR, file), 'utf8');
  if (!ALL && !matter(raw).data.download) continue;

  const { fm, body } = splitDoc(raw);
  const kinds = bodySectionKinds(body);
  if (kinds.size === 0 && !hasBodyH1(body)) continue;

  const nextBody = stripSections(body);
  const before = wc(body);
  const after = wc(nextBody);
  rows.push({ file, kinds: [...kinds].join('+') || 'h1', before, after, delta: after - before });

  if (WRITE) writeFileSync(join(DIR, file), `${fm}\n${nextBody}`, 'utf8');
}

for (const r of rows.sort((a, b) => a.delta - b.delta)) {
  console.log(`${r.file.slice(0, 58).padEnd(60)} [${r.kinds.padEnd(14)}] ${String(r.before).padStart(4)} -> ${String(r.after).padStart(4)}  (${r.delta >= 0 ? '+' : ''}${r.delta})`);
}
console.log(`\n${rows.length} file(s) ${WRITE ? 'REWRITTEN' : 'would change'} (dry run: ${!WRITE}).`);
