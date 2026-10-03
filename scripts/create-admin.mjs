#!/usr/bin/env node
// Creates (or replaces) an admin user. Usage:
//   node scripts/create-admin.mjs --email you@bestmt4ea.com --password 'secret' [--remote]
//
// Password hashing mirrors src/lib/password.ts: PBKDF2-SHA256, 100000 iterations,
// 16-byte salt, 32-byte key, stored as `pbkdf2$<iterations>$<salt>$<key>` (base64url).

import { randomBytes, webcrypto, randomUUID } from 'node:crypto';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const ITERATIONS = 100_000;
const KEY_BYTES = 32;
const DATABASE = 'bestmt4ea';

function parseArgs(argv) {
  const args = { remote: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--remote') args.remote = true;
    else if (arg === '--email') args.email = argv[++i];
    else if (arg === '--password') args.password = argv[++i];
  }
  return args;
}

function base64Url(bytes) {
  return Buffer.from(bytes)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

async function hashPassword(password) {
  const salt = randomBytes(16);
  const material = await webcrypto.subtle.importKey('raw', Buffer.from(password), 'PBKDF2', false, [
    'deriveBits',
  ]);
  const bits = await webcrypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: ITERATIONS, hash: 'SHA-256' },
    material,
    KEY_BYTES * 8
  );
  return `pbkdf2$${ITERATIONS}$${base64Url(salt)}$${base64Url(new Uint8Array(bits))}`;
}

const quote = (value) => `'${String(value).replace(/'/g, "''")}'`;

async function main() {
  const { email, password, remote } = parseArgs(process.argv.slice(2));
  if (!email || !password) {
    console.error('Usage: node scripts/create-admin.mjs --email <email> --password <password> [--remote]');
    process.exit(1);
  }

  const passwordHash = await hashPassword(password);
  const sql = `INSERT INTO admin_users (id, email, password_hash, role, totp_secret, totp_enabled_at, disabled_at, created_at)
VALUES (${quote(randomUUID())}, ${quote(email.toLowerCase())}, ${quote(passwordHash)}, 'admin', NULL, NULL, NULL, ${Date.now()})
ON CONFLICT(email) DO UPDATE SET password_hash = excluded.password_hash, disabled_at = NULL;
`;

  const dir = mkdtempSync(join(tmpdir(), 'bmt4-admin-'));
  const file = join(dir, 'create-admin.sql');
  writeFileSync(file, sql, 'utf8');

  const target = remote ? '--remote' : '--local';
  const result = spawnSync(
    'npx',
    ['wrangler', 'd1', 'execute', DATABASE, target, `--file=${file}`, '--yes'],
    { stdio: 'inherit', shell: true }
  );

  rmSync(dir, { recursive: true, force: true });

  if (result.status !== 0) process.exit(result.status ?? 1);
  console.log(`\nAdmin ready: ${email} (${remote ? 'remote' : 'local'})`);
  console.log('First login enrols TOTP before the panel unlocks.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
