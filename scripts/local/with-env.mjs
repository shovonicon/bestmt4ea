/**
 * Run one of the operator scripts with the environment it expects.
 *
 * The repo's two scheduled jobs — the licence builder and the performance
 * collector — are written to read plain environment variables, because in CI that
 * is what they get. On the owner's machine those values live in `.dev.vars`
 * instead, so this loads that file and then runs the command.
 *
 * An explicitly-set environment variable always wins over `.dev.vars`, so a task
 * can point the script at production while the file keeps pointing at localhost.
 *
 *   node scripts/local/with-env.mjs node scripts/build-licenses.mjs
 */

import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';

const [command, ...args] = process.argv.slice(2);
if (!command) {
  console.error('usage: node scripts/local/with-env.mjs <command> [args…]');
  process.exit(1);
}

const file = existsSync('.dev.vars') ? '.dev.vars' : null;
const fromFile = file
  ? Object.fromEntries(
      readFileSync(file, 'utf8')
        .split(/\r?\n/)
        .map((line) => line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/))
        .filter(Boolean)
        .map((m) => [m[1], m[2].trim().replace(/^"|"$/g, '')])
    )
  : {};

// process.env last: what the caller set explicitly beats the file.
const env = { ...fromFile, ...process.env };

const result = spawnSync(command, args, { stdio: 'inherit', env, shell: true });
process.exit(result.status ?? 1);
