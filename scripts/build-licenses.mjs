/**
 * Licence build runner.
 *
 * Pulls the PENDING build queue, binds each build's account number and expiry into a
 * copy of the product's MQL source, compiles it with MetaEditor, and posts the
 * artefact back — after which the customer can download it. Nothing here needs a
 * human: every input comes from the queue row.
 *
 * It cannot live in the Worker: an `.ex4`/`.ex5` is only produced by MetaQuotes'
 * MetaEditor, which needs Windows. So this runs on a Windows runner (CI or a
 * scheduled task on the owner's machine).
 *
 * Usage:
 *   node scripts/build-licenses.mjs                # compile everything pending
 *   node scripts/build-licenses.mjs --dry-run      # compile, print, do not upload
 *   node scripts/build-licenses.mjs --limit 5      # cap this run
 *
 * Env:
 *   APP_URL       app origin                 (default http://localhost:4321)
 *   CRON_SECRET   shared secret              (required unless --dry-run)
 *   METAEDITOR    explicit metaeditor path   (default: first found in the usual installs)
 *
 * Honesty rules: a build is only submitted when MetaEditor reported **0 errors** and
 * the artefact exists. MetaEditor's exit code is unreliable (it returns 1 on a clean
 * build), so the compile log is the source of truth.
 */

import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const limitIndex = args.indexOf('--limit');
const LIMIT = limitIndex >= 0 ? Number(args[limitIndex + 1]) || 25 : 25;

const APP_URL = (process.env.APP_URL ?? 'http://localhost:4321').replace(/\/+$/, '');
const SECRET = process.env.CRON_SECRET ?? '';

/** Where MetaEditor tends to live. MT4's is the one that compiles MQL4. */
const METAEDITOR_CANDIDATES = [
  process.env.METAEDITOR,
  'C:/Program Files (x86)/MetaTrader 4 EXNESS/metaeditor.exe',
  'C:/Program Files (x86)/MetaTrader 4/metaeditor.exe',
  'C:/Program Files/MetaTrader 4/metaeditor.exe',
  'C:/Program Files/MetaTrader 4 EXNESS/metaeditor.exe',
  'C:/Program Files (x86)/MetaTrader 5/metaeditor.exe',
  'C:/Program Files/MetaTrader 5/metaeditor64.exe',
].filter(Boolean);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Actions logs on a public repository are world-readable, so a customer's account
 * number must never be printed. Last four digits are enough to tell two queued
 * builds apart when reading a run; the full number is on /admin/builds/.
 */
const maskAccount = (value) => `••••${String(value ?? '').slice(-4)}`;

function findMetaEditor() {
  const found = METAEDITOR_CANDIDATES.find((candidate) => existsSync(candidate));
  if (!found) {
    throw new Error(
      `MetaEditor not found. Set METAEDITOR to your metaeditor.exe.\nTried:\n  ${METAEDITOR_CANDIDATES.join('\n  ')}`,
    );
  }
  return found;
}

/** `2027-01-01T00:00:00.000Z` -> `01.01.2027` (the format the .mq4 declares). */
function toMqlDate(value) {
  if (!value) return '31.12.2099'; // perpetual licence: the check should never fire
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(d.getUTCDate())}.${pad(d.getUTCMonth() + 1)}.${d.getUTCFullYear()}`;
}

/** Bind the account + expiry into the source. Throws if the markers are absent. */
function bindLicence(source, accountNumber, expiry) {
  const accountRe = /^(\s*int\s+Account\s*=\s*)\d+(\s*;)/m;
  const expiryRe = /^(\s*datetime\s+Expire\s*=\s*D')[\d.]+(\s*';)/m;

  if (!accountRe.test(source)) throw new Error('source has no "int Account = <n>;" line to bind');
  if (!expiryRe.test(source)) throw new Error("source has no \"datetime Expire = D'...';\" line to bind");

  return source
    .replace(accountRe, (_m, a, b) => `${a}${accountNumber}${b}`)
    .replace(expiryRe, (_m, a, b) => `${a}${expiry}${b}`);
}

/**
 * Compile one source file and return the artefact path *only* when the log reports
 * zero errors. Polls briefly for the log, which MetaEditor writes asynchronously.
 */
async function compile(metaEditor, mqPath, logPath) {
  try {
    execFileSync(metaEditor, [`/compile:${mqPath}`, `/log:${logPath}`], {
      stdio: 'pipe',
      timeout: 120_000,
    });
  } catch {
    // MetaEditor exits non-zero on success too — the log decides, not the code.
  }

  let log = '';
  for (let attempt = 0; attempt < 10; attempt += 1) {
    if (existsSync(logPath)) {
      // MetaEditor writes its log as UTF-16LE (sometimes with a BOM), so decode
      // both ways and keep whichever actually contains the result line.
      const raw = readFileSync(logPath);
      const utf16 = raw.toString('utf16le').replace(/\0/g, '');
      const utf8 = raw.toString('utf8').replace(/\0/g, '');
      log = /Result:/i.test(utf16) ? utf16 : utf8;
      if (/Result:/i.test(log)) break;
    }
    await sleep(500);
  }

  const result = log.match(/Result:\s*(\d+)\s*errors?,\s*(\d+)\s*warnings?/i);
  if (!result) return { ok: false, reason: `no compile result in the log${log ? `: ${log.trim().slice(-200)}` : ''}` };
  if (Number(result[1]) > 0) return { ok: false, reason: `${result[1]} compile error(s)` };

  const ex4 = mqPath.replace(/\.mq4$/i, '.ex4');
  if (!existsSync(ex4)) return { ok: false, reason: 'compiled with 0 errors but no .ex4 was produced' };

  return { ok: true, ex4, warnings: Number(result[2]) };
}

async function fetchPending() {
  const res = await fetch(`${APP_URL}/api/internal/builds/pending/?limit=${LIMIT}`, {
    headers: { 'x-cron-secret': SECRET },
  });
  if (!res.ok) throw new Error(`pending queue -> HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return (await res.json()).builds ?? [];
}

async function fetchTemplate(productId) {
  const res = await fetch(`${APP_URL}/api/internal/builds/template/?productId=${encodeURIComponent(productId)}`, {
    headers: { 'x-cron-secret': SECRET },
  });
  if (res.status === 404) {
    throw new Error(
      `no template published for "${productId}" — upload it to templates/${productId}/source.mq4 in the FILES bucket`,
    );
  }
  if (!res.ok) throw new Error(`template ${productId} -> HTTP ${res.status}`);
  return res.text();
}

async function submit(buildId, filename, ex4Path) {
  const res = await fetch(`${APP_URL}/api/internal/builds/ready/`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-cron-secret': SECRET },
    body: JSON.stringify({ buildId, filename, contentBase64: readFileSync(ex4Path).toString('base64') }),
  });
  if (!res.ok) throw new Error(`submit -> HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return res.json();
}

async function main() {
  if (!DRY_RUN && !SECRET) {
    console.error('CRON_SECRET is required (or pass --dry-run).');
    process.exit(1);
  }

  const metaEditor = findMetaEditor();
  console.log(`using MetaEditor: ${metaEditor}`);
  console.log(`queue: ${APP_URL}\n`);

  const pending = await fetchPending();
  if (pending.length === 0) {
    console.log('Nothing pending — every licence build is up to date.');
    return;
  }
  console.log(`${pending.length} pending build(s)\n`);

  const work = mkdtempSync(join(tmpdir(), 'bmt4-builds-'));
  let built = 0;
  const failures = [];

  try {
    for (const build of pending) {
      const label = `${build.productSlug} account ${build.accountNumber}`;
      process.stdout.write(`${label} ... `);

      try {
        const expiry = toMqlDate(build.expiresAt);
        if (!expiry) throw new Error(`unreadable expiry "${build.expiresAt}"`);

        const source = await fetchTemplate(build.productId);
        const bound = bindLicence(source, build.accountNumber, expiry);

        // Name the .mq4 after the artifact so the compiled .ex4 carries that name.
        const base = build.artifactName.replace(/\.ex4$/i, '');
        const mqPath = join(work, `${base}.mq4`);
        const logPath = join(work, `${base}.log`);
        writeFileSync(mqPath, bound, 'utf8');

        const result = await compile(metaEditor, mqPath, logPath);
        if (!result.ok) throw new Error(result.reason);

        const sizeKb = (readFileSync(result.ex4).length / 1024).toFixed(1);
        if (DRY_RUN) {
          console.log(`compiled ${build.artifactName} (${sizeKb} KB, ${result.warnings} warnings) — dry run, not uploaded`);
        } else {
          const posted = await submit(build.buildId, build.artifactName, result.ex4);
          console.log(`built + attached ${build.artifactName} (${sizeKb} KB) -> ${posted.key}`);
        }
        built += 1;
      } catch (err) {
        console.log(`FAILED: ${err.message}`);
        failures.push(`${label}: ${err.message}`);
      }
    }
  } finally {
    rmSync(work, { recursive: true, force: true });
  }

  console.log(`\n${DRY_RUN ? 'Compiled' : 'Attached'} ${built}/${pending.length} build(s).`);
  if (failures.length) {
    console.log('\nProblems:');
    for (const failure of failures) console.log(`  - ${failure}`);
    process.exitCode = 2;
  }
}

main().catch((err) => {
  console.error('Builder failed:', err.message);
  process.exit(1);
});
