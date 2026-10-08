#!/usr/bin/env node
/**
 * Rewrite a batch of Phase R posts in parallel, one headless CLI process each.
 *
 * Why processes rather than sub-agents: a sub-agent runs the same permission
 * pipeline as the main loop and *fails closed* on anything a human would have
 * been asked about — an `ask` rule, a `deny` rule, plan mode. Headless runs are
 * separate processes with their own permissions, their own context, and their
 * own transcript, so a worker that dies at post 4 does not take the other five
 * with it. That is the whole point of this script.
 *
 * Deliberately, the workers only WRITE. They are told not to build, gate, test
 * or touch git: six concurrent `astro build`s against one working tree would
 * thrash, and the gate belongs in one place. `--gate` runs it once at the end,
 * which is also the moment the batch is ready to push.
 *
 * Usage:
 *   node scripts/rewrite-batch.mjs --dry-run --count 6
 *   node scripts/rewrite-batch.mjs --count 6
 *   node scripts/rewrite-batch.mjs --count 6 --gate
 *   node scripts/rewrite-batch.mjs --slugs a-slug,b-slug
 *   node scripts/rewrite-batch.mjs --count 2 --jobs 2 --model meta/muse-spark-1.3-contributor
 */

import { spawn } from 'node:child_process';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { closeSync, openSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';

const ROOT = process.cwd();
const QUEUE = 'src/data/rewrite-queue.json';
const POSTS_DIR = 'src/content/posts';
const LOG_DIR = 'test-results/rewrite-batch';
const REFERENCE_POST = 'src/content/posts/eur-usd-expert-advisor-ea-overview-free-download-guide.md';

/* ------------------------------------------------------------------ flags */

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : fallback;
};
const has = (name) => args.includes(`--${name}`);

const COUNT = Number(flag('count', '6'));
const JOBS = Number(flag('jobs', String(COUNT)));
/*
 * Default model: DeepSeek V4.1 Flash Fast, chosen for throughput over price.
 * Ids are exact — a model id that is nearly right fails in a way that is painful
 * to diagnose — so check `reference/models.md` before changing one.
 *
 *   deepseek/deepseek-v4.1-flash-fast  $0.16 / $0.58   high-throughput V4.1   <-- default
 *   Qwen/Qwen3.7-Flash                 $0.03 / $0.13   cheapest, fast
 *   stepfun/Step-3.5-Flash             $0.09 / $0.30   fast sparse-MoE
 *   deepseek/deepseek-v4-flash         $0.15 / $0.60   fast hybrid-attention
 *   z-ai/glm-5.3-flash                 $0.15 / $0.50   affordable GLM, 1M ctx
 *
 * Roughly five times the cheapest option, bought deliberately: with six workers
 * running at once, wall-clock throughput is what decides when a batch lands,
 * and the difference between 0.13 and 0.58 per million output tokens is small
 * against the cost of the batch taking twice as long.
 *
 * What price cannot buy is judgement. `check:content:changed` enforces the
 * structure — word count, quickAnswer bounds, FAQ count, banned claims, title
 * length — and cannot judge prose, so whatever model runs here, the reading
 * still has to be done by a person.
 */
const MODEL = flag('model', 'deepseek/deepseek-v4.1-flash-fast');
const MAX_TURNS = flag('max-turns', '120');
const DRY = has('dry-run');
const GATE = has('gate');
const ONLY = flag('slugs', '') ? flag('slugs').split(',').map((s) => s.trim()).filter(Boolean) : null;

/**
 * Posts already rewritten. Kept explicit rather than inferred: the queue is a
 * snapshot and cannot tell a finished post from a stale entry.
 */
const DONE = new Set([
  'eur-usd-expert-advisor-ea-overview-free-download-guide',
  'murasaki-scalper-free-download-powerful-secrets-every-trader-must-know-before-installing',
]);

/* -------------------------------------------------------------- resources */

/**
 * Topic → download. `check-downloads` allows a file to back at most four posts,
 * so this assigns by subject and counts as it goes rather than letting every
 * post claim the same tool.
 */
const RESOURCES = [
  {
    match: /grid|martingale|averag|hedg/i,
    fileKey: 'resources/grid-ea-drawdown-stress-test.pdf',
    about: 'a printable stress-test worksheet for grid and averaging systems',
  },
  {
    match: /scalp|us30|m1|m5|hft|arbitrage|velocity|turbo|hyper/i,
    fileKey: 'resources/scalping-ea-demo-test-log.pdf',
    about: 'a printable 20-trade demo log that records spread, slippage and exit reason',
  },
  {
    match: /review|reviews|comparison|best|vetting|checklist|red flag|before you (buy|install)/i,
    fileKey: 'resources/eurusd-ea-evaluation-checklist.pdf',
    about:
      'a printable eight-section EA evaluation checklist — where the file came from, reading the strategy before the curve, the five numbers to demand, testing a backtest for dishonesty, a fixed demo protocol, a position-size worksheet, red flags and a go / no-go gate',
  },
];
const DEFAULT_RESOURCE = {
  fileKey: 'resources/ea-risk-position-size-calculator.pdf',
  about: 'a printable risk and position-size calculator with a pip-value table',
};
const MAX_REUSE = 4;

/* ------------------------------------------------------------------- main */

const queue = JSON.parse(await readFile(join(ROOT, QUEUE), 'utf8'));

const pending = ONLY
  ? ONLY.map((slug) => queue.queue.find((entry) => entry.slug === slug)).filter(Boolean)
  : queue.queue.filter((entry) => !DONE.has(entry.slug)).slice(0, COUNT);

if (pending.length === 0) {
  console.error('Nothing to do — every selected post is already rewritten, or the slugs did not match.');
  process.exit(1);
}

// Assign resources, honouring the reuse cap.
//
// The counter is seeded from the posts already on disk, not just this batch.
// `check-downloads` counts reuse across the whole site and exits 1 above four
// posts per file, so a batch that only counted its own assignments would sail
// past the cap and fail the gate after the rewrites were already paid for.
const pendingFiles = new Set(pending.map((entry) => entry.file));
const useCount = new Map();
for (const file of (await readdir(POSTS_DIR)).filter((f) => f.endsWith('.md'))) {
  const rel = `${POSTS_DIR}/${file}`;
  if (pendingFiles.has(rel)) continue;
  const { data } = matter(await readFile(join(ROOT, rel), 'utf8'));
  const key = data.download?.fileKey;
  if (typeof key === 'string') useCount.set(key, (useCount.get(key) ?? 0) + 1);
}

const POOL = [...RESOURCES, DEFAULT_RESOURCE];
for (const entry of pending) {
  const preferred = RESOURCES.find((r) => r.match.test(entry.slug)) ?? DEFAULT_RESOURCE;
  const order = [preferred, ...POOL.filter((r) => r !== preferred)];
  const pick = order.find((r) => (useCount.get(r.fileKey) ?? 0) < MAX_REUSE);
  if (!pick) {
    console.error(
      `WARN  ${entry.slug}: every resource is at the ${MAX_REUSE}-post cap — author a new one.`,
    );
  }
  if (pick && pick !== preferred) {
    console.log(`  move   ${entry.slug}: ${preferred.fileKey} is full → ${pick.fileKey}`);
  }
  const chosen = pick ?? preferred;
  useCount.set(chosen.fileKey, (useCount.get(chosen.fileKey) ?? 0) + 1);
  entry.resource = chosen;
}

/* ------------------------------------------------------------- the prompt */

const promptFor = (entry) => `You are rewriting ONE legacy post for bestmt4ea.com. This is Phase R: a WordPress import is replaced with a long-form guide that meets the site's standard on its own.

Read these first. They are the contract, not suggestions:
- docs/CONTENT-STANDARD.md (especially §12 and the copy framework)
- docs/AI-POST-BRIEF.md (the per-post brief)
- ${REFERENCE_POST} - the completed reference post. Copy its frontmatter shape, its section structure, its register, and its honesty about risk.

TARGET FILE, and the ONLY file you may write:
  ${entry.file}

Read it first: it is a ${entry.words}-word import to be replaced, not extended.

Rewrite it to 3,500-7,500 words, education first and promotional second:
- Powerful headline → problem → agitate (short story) → solution → offer breakdown → closing CTA
- Second person, simple and direct. No filler, no padding, no keyword stuffing.
- Required frontmatter: quickAnswer (40-75 words), primaryKeyword, 4-15 faqs, 2+ sources, keyTakeaways, and a download block.
- Risk disclosure and honest limits. Invent nothing - no performance figures, no backtest results, no test results, no download links you were not given.
- Contextual internal links to /top-ranking/, /best-forex-brokers/ and /copy-trading/, plus relevant existing pages. Trailing slashes are mandatory on every internal link.
- Title case the visible H1 correctly (e.g. "EUR/USD", not "eur/usd"). Keep the title under 60 characters or the gate fails.
- Do not use the words "guarantee", "guaranteed" or "risk-free" anywhere - the changed-content gate fails on them.

Use EXACTLY this download block, with this fileKey:
download:
  origin: "own"
  license: "Free to use, print and share with credit to bestmt4ea.com"
  version: "1.0"
  fileKey: "${entry.resource.fileKey}"

That file is ${entry.resource.about}. It already exists and is uploaded; describe it accurately and do not claim anything else about it.

Because that block has no platform field, this download is a resource, not software. Add NO installSteps to the frontmatter and no install, setup or how-to-install section to the body: check-rendered-html fails a download page that has both.

CONSTRAINTS - a batch driver handles these, and doing them yourself would collide with the other workers:
- Do NOT run any build, gate, test, lint or type-check command.
- Do NOT run any git command.
- Do NOT edit, create or delete any file other than the target above.

When you are done, reply with: the final word count, and anything you could not satisfy.`;

/* ------------------------------------------------------------------ spawn */

const cmdc = process.platform === 'win32' ? 'cmdc.cmd' : 'cmdc';

await mkdir(join(ROOT, LOG_DIR), { recursive: true });
const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);

if (DRY) {
  console.log(`DRY RUN — ${pending.length} post(s), jobs ${JOBS}, model ${MODEL}\n`);
  for (const entry of pending) {
    console.log(`  rank ${entry.rank}  ${entry.slug}`);
    console.log(`      ${entry.words} words now → target 3,500-7,500`);
    console.log(`      download  ${entry.resource.fileKey}`);
    console.log(`      prompt    ${promptFor(entry).length} chars\n`);
  }
  console.log('Re-run without --dry-run to execute.');
  process.exit(0);
}

console.log(`Rewriting ${pending.length} post(s) with up to ${JOBS} workers. Logs: ${LOG_DIR}/${stamp}-*.log\n`);

const runOne = async (entry, index) => {
  const slug = entry.slug.replace(/[^a-z0-9-]/gi, '_');
  const promptFile = join(ROOT, LOG_DIR, `${stamp}-${index}-${slug}.prompt.txt`);
  const logFile = join(ROOT, LOG_DIR, `${stamp}-${index}-${slug}.log`);

  await writeFile(promptFile, promptFor(entry), 'utf8');

  // The prompt is piped through a file rather than passed as an argument: it is
  // several kilobytes of Markdown, and shell quoting would mangle it.
  //
  // `shell: true` on Windows is not optional. `cmdc` resolves to `cmdc.cmd`, and
  // Node refuses to spawn a batch file without a shell — it throws, the worker
  // rejects, and the whole batch dies before writing a single post. The argument
  // list is fixed and contains no spaces, so going through the shell is safe.
  // Plain descriptors, not streams. `createWriteStream` opens asynchronously,
  // so at spawn time the stream can still carry `fd: null` and Node rejects the
  // whole stdio array with ERR_INVALID_ARG_VALUE — the intermittent 0.2s batch
  // death with an empty log. A descriptor from `openSync` exists before spawn
  // looks at it. The same log descriptor feeds both stdout and stderr.
  const promptFd = openSync(promptFile, 'r');
  const logFd = openSync(logFile, 'w');

  const child = spawn(
    cmdc,
    [
      '-p',
      '--accept-edits',
      '--skip-onboarding',
      '--model',
      MODEL,
      '--max-turns',
      MAX_TURNS,
      '--output-format',
      'text',
    ],
    { cwd: ROOT, shell: process.platform === 'win32', stdio: [promptFd, logFd, logFd] },
  );

  const started = Date.now();
  const code = await new Promise((resolve) => {
    child.on('exit', (c) => resolve(c ?? -1));
    child.on('error', () => resolve(-1));
  });
  closeSync(promptFd);
  closeSync(logFd);

  return { entry, code, ms: Date.now() - started, logFile };
}

const results = [];
let next = 0;
const worker = async () => {
  while (next < pending.length) {
    const entry = pending[next++];
    const label = `rank ${entry.rank} ${entry.slug}`;
    console.log(`  start  ${label}`);
    const result = await runOne(entry, next);
    results.push(result);
    const ok = result.code === 0;
    console.log(
      `  ${ok ? 'done  ' : `FAIL ${result.code}`} ${label}  (${Math.round(result.ms / 1000)}s)  ${result.logFile}`,
    );
  }
};

await Promise.all(Array.from({ length: Math.min(JOBS, pending.length) }, worker));

const failed = results.filter((r) => r.code !== 0);
console.log(`\n${results.length - failed.length}/${results.length} worker(s) exited 0.`);
for (const f of failed) {
  console.log(`  exit ${f.code} (${f.code === 8 ? 'max turns reached' : f.code === 4 ? 'permission denied' : 'error'}) — ${f.logFile}`);
}

if (GATE) {
  console.log('\nRunning the content gates…');
  const gate = spawn('npm', ['run', 'check:content:changed'], { cwd: ROOT, shell: true, stdio: 'inherit' });
  const gateCode = await new Promise((resolve) => gate.on('exit', (c) => resolve(c ?? -1)));
  const downloads = spawn('npm', ['run', 'check:downloads'], { cwd: ROOT, shell: true, stdio: 'inherit' });
  const downloadCode = await new Promise((resolve) => downloads.on('exit', (c) => resolve(c ?? -1)));
  console.log(`\ngates: content ${gateCode === 0 ? 'PASS' : 'FAIL'}  downloads ${downloadCode === 0 ? 'PASS' : 'FAIL'}`);
  if (gateCode !== 0 || downloadCode !== 0) process.exitCode = 1;
}

console.log('\nNext: read the worker logs, fix anything the gates reject, then `npm run deploy` and commit.');
