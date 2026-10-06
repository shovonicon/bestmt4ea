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
 * Platform: the queue row carries the template key, and its extension decides
 * everything else. An `.mq4` is compiled by MT4's MetaEditor into an `.ex4`; an
 * `.mq5` needs MT5's editor and produces an `.ex5`. The two editors are not
 * interchangeable — each one only understands its own language.
 *
 * Usage:
 *   node scripts/build-licenses.mjs                # compile everything pending
 *   node scripts/build-licenses.mjs --dry-run      # compile, print, do not upload
 *   node scripts/build-licenses.mjs --limit 5      # cap this run
 *
 * Env:
 *   APP_URL          app origin               (default http://localhost:4321)
 *   CRON_SECRET      shared secret            (required unless --dry-run)
 *   METAEDITOR       MT4 metaeditor path      (default: first found in the usual installs)
 *   METAEDITOR_MT5   MT5 metaeditor path      (default: first found in the usual installs)
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

/**
 * Where MetaEditor tends to live, keyed by the source extension it can compile.
 * MT4's editor compiles MQL4 only and MT5's compiles MQL5 only, so the choice
 * follows the template rather than one global path.
 */
const METAEDITOR_CANDIDATES = {
  '.mq4': [
    process.env.METAEDITOR,
    'C:/Program Files (x86)/MetaTrader 4 EXNESS/metaeditor.exe',
    'C:/Program Files (x86)/MetaTrader 4/metaeditor.exe',
    'C:/Program Files/MetaTrader 4/metaeditor.exe',
    'C:/Program Files/MetaTrader 4 EXNESS/metaeditor.exe',
  ].filter(Boolean),
  '.mq5': [
    process.env.METAEDITOR_MT5,
    'C:/Program Files/MetaTrader 5/metaeditor64.exe',
    'C:/Program Files/MetaTrader 5/metaeditor.exe',
    'C:/Program Files (x86)/MetaTrader 5/metaeditor64.exe',
    'C:/Program Files (x86)/MetaTrader 5/metaeditor.exe',
  ].filter(Boolean),
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** The source extension a template key ends in. */
const sourceExtFor = (key) => (/\.mq5$/i.test(String(key ?? '')) ? '.mq5' : '.mq4');

/** What MetaEditor produces from that source. */
const compiledExtFor = (sourceExt) => (sourceExt === '.mq5' ? '.ex5' : '.ex4');

/**
 * Actions logs on a public repository are world-readable, so a customer's account
 * number must never be printed. Last four digits are enough to tell two queued
 * builds apart when reading a run; the full number is on /admin/builds/.
 */
const maskAccount = (value) => `••••${String(value ?? '').slice(-4)}`;

/** The queue's marker for a trial: any demo account, no live account. */
const TRIAL_ACCOUNT = '-1';

const metaEditorCache = new Map();

/** The compiler for a source extension. Throws, naming the env var, when none is installed. */
function findMetaEditor(sourceExt) {
  const cached = metaEditorCache.get(sourceExt);
  if (cached) return cached;

  const candidates = METAEDITOR_CANDIDATES[sourceExt] ?? METAEDITOR_CANDIDATES['.mq4'];
  const found = candidates.find((candidate) => existsSync(candidate));
  if (!found) {
    const envVar = sourceExt === '.mq5' ? 'METAEDITOR_MT5' : 'METAEDITOR';
    throw new Error(
      `No MetaEditor for ${sourceExt} found. Set ${envVar} to your metaeditor${
        sourceExt === '.mq5' ? '64' : ''
      }.exe.\nTried:\n  ${candidates.join('\n  ') || '(nothing configured)'}`,
    );
  }

  metaEditorCache.set(sourceExt, found);
  return found;
}

/** `2027-01-01T00:00:00.000Z` -> `01.01.2027` (the format the .mq4/.mq5 declares). */
function toMqlDate(value) {
  if (!value) return '31.12.2099'; // perpetual licence: the check should never fire
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(d.getUTCDate())}.${pad(d.getUTCMonth() + 1)}.${d.getUTCFullYear()}`;
}

/**
 * Bind the account + expiry into the source. Throws if the markers are absent.
 *
 * The account value is signed, because a trial binds `-1` — the source's "any demo
 * account" value — rather than a customer's account number.
 */
function bindLicence(source, accountNumber, expiry) {
  // Two declaration styles ship across the templates. MQL4 and a few MQL5 files
  // declare plain `int Account` / `datetime Expire`; the rest declare the constants
  // as `const long c_AccountID` / `const datetime c_Expire`. Both gate identically
  // (`!= 0` means the account is restricted; `-1` is the builder's demo marker).
  const accountRe = /^(\s*(?:int\s+Account|const\s+long\s+c_AccountID)\s*=\s*)-?\d+(\s*;)/m;
  const expiryRe = /^(\s*(?:datetime\s+Expire|const\s+datetime\s+c_Expire)\s*=\s*D')[\d.]+(\s*';)/m;

  if (!accountRe.test(source)) {
    throw new Error('source has no account declaration to bind (expected "int Account" or "const long c_AccountID")');
  }
  if (!expiryRe.test(source)) {
    throw new Error('source has no expiry declaration to bind (expected "datetime Expire" or "const datetime c_Expire")');
  }

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
    // MQL_PORTABLE=1 (CI): use the install folder as the data folder, where the
    // standard Include/ libraries live once the terminal has initialised it.
    const args = [`/compile:${mqPath}`, `/log:${logPath}`];
    if (process.env.MQL_PORTABLE === '1') args.unshift('/portable');
    execFileSync(metaEditor, args, {
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
  if (Number(result[1]) > 0) {
    // Surface the actual error lines — the count alone is undiagnosable from CI.
    // Account numbers are masked by the caller; the log lines only quote source.
    const lines = log
      .split(/\r?\n/)
      .filter((l) => /\berror\b/i.test(l) && !/^Result:/i.test(l.trim()))
      .map((l) => l.trim().replace(/^.*[\/]/, '').slice(0, 240))
      .slice(0, 5);
    return { ok: false, reason: `${result[1]} compile error(s)${lines.length ? `: ${lines.join(' | ')}` : ''}` };
  }

  const sourceExt = sourceExtFor(mqPath);
  const outputExt = compiledExtFor(sourceExt);
  const artifact = mqPath.replace(/\.(mq4|mq5)$/i, outputExt);
  if (!existsSync(artifact)) {
    return { ok: false, reason: `compiled with 0 errors but no ${outputExt} was produced` };
  }

  return { ok: true, artifact, warnings: Number(result[2]) };
}

async function fetchPending() {
  const res = await fetch(`${APP_URL}/api/internal/builds/pending/?limit=${LIMIT}`, {
    headers: { 'x-cron-secret': SECRET },
  });
  if (!res.ok) throw new Error(`pending queue -> HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return (await res.json()).builds ?? [];
}

async function fetchTemplate(productId, templateKey) {
  const res = await fetch(`${APP_URL}/api/internal/builds/template/?productId=${encodeURIComponent(productId)}`, {
    headers: { 'x-cron-secret': SECRET },
  });
  if (res.status === 404) {
    throw new Error(`no template published for "${productId}" — upload it to ${templateKey} in the FILES bucket`);
  }
  if (!res.ok) throw new Error(`template ${productId} -> HTTP ${res.status}`);
  return res.text();
}

async function submit(buildId, filename, artifactPath) {
  const res = await fetch(`${APP_URL}/api/internal/builds/ready/`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-cron-secret': SECRET },
    body: JSON.stringify({ buildId, filename, contentBase64: readFileSync(artifactPath).toString('base64') }),
  });
  if (!res.ok) throw new Error(`submit -> HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return res.json();
}

async function main() {
  if (!DRY_RUN && !SECRET) {
    console.error('CRON_SECRET is required (or pass --dry-run).');
    process.exit(1);
  }

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
      /*
       * Never print a real account number: a public repository's Actions logs are
       * world-readable. A trial carries the source's "any account" marker, which
       * is not a customer's number, so it is named rather than masked.
       */
      const accountLabel = build.accountNumber === TRIAL_ACCOUNT ? 'demo' : maskAccount(build.accountNumber);
      const sourceExt = sourceExtFor(build.templateKey);
      const label = `${build.productSlug} ${sourceExt} account ${accountLabel}`;
      process.stdout.write(`${label} ... `);

      try {
        const expiry = toMqlDate(build.expiresAt);
        if (!expiry) throw new Error(`unreadable expiry "${build.expiresAt}"`);

        const source = await fetchTemplate(build.productId, build.templateKey);
        const bound = bindLicence(source, build.accountNumber, expiry);

        // Name the source after the artefact, so the compiled file carries that name.
        const base = build.artifactName.replace(/\.(ex4|ex5)$/i, '');
        const mqPath = join(work, `${base}${sourceExt}`);
        const logPath = join(work, `${base}.log`);
        writeFileSync(mqPath, bound, 'utf8');

        const result = await compile(findMetaEditor(sourceExt), mqPath, logPath);
        if (!result.ok) throw new Error(result.reason);

        const sizeKb = (readFileSync(result.artifact).length / 1024).toFixed(1);
        /*
         * The artefact is *named* after the account, so the name is masked here
         * before printing — otherwise the mask on the label above is pointless on a
         * public repository. The file the customer receives keeps its real name.
         */
        const shownName = build.artifactName.split(build.accountNumber).join(accountLabel);
        if (DRY_RUN) {
          console.log(`compiled ${shownName} (${sizeKb} KB, ${result.warnings} warnings) — dry run, not uploaded`);
        } else {
          const posted = await submit(build.buildId, build.artifactName, result.artifact);
          const shownKey = posted.key.split(build.accountNumber).join(accountLabel);
          console.log(`built + attached ${shownName} (${sizeKb} KB) -> ${shownKey}`);
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
