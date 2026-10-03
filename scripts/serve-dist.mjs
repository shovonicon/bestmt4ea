/**
 * Minimal static server for `dist/`.
 *
 * `astro preview` does not bind reliably for this project, and the browser tests
 * need a real server to drive. This serves the actual build output with the
 * routing rules the site uses (trailing-slash directories resolve to
 * `index.html`, unknown paths fall back to `404.html`) so Playwright tests a
 * faithful copy of production.
 *
 * Usage:
 *   node scripts/serve-dist.mjs [--port 4322]
 */

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';

const args = process.argv.slice(2);
const portArg = args[args.indexOf('--port') + 1];
const PORT = Number(portArg) || 4322;
const DIST = 'dist';

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.pdf': 'application/pdf',
  '.zip': 'application/zip',
};

const decode = (value) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

async function resolveFile(pathname) {
  const clean = decode(pathname).split('?')[0].split('#')[0];
  const rel = normalize(clean).replace(/^(\.\.[/\\])+/, '').replace(/^[/\\]+/, '');
  const candidates = [];

  if (rel === '' || rel === '.') candidates.push('index.html');
  else {
    candidates.push(rel);
    candidates.push(join(rel, 'index.html'));
    if (!extname(rel)) candidates.push(`${rel}.html`);
    if (rel.endsWith('/')) candidates.push(`${rel}index.html`);
  }

  for (const candidate of candidates) {
    const full = join(DIST, candidate);
    try {
      const info = await stat(full);
      if (info.isFile()) return full;
    } catch {
      /* try the next candidate */
    }
  }
  return null;
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', `http://127.0.0.1:${PORT}`);
  const file = await resolveFile(url.pathname);

  if (!file) {
    try {
      const notFound = await readFile(join(DIST, '404.html'));
      res.writeHead(404, { 'content-type': TYPES['.html'] });
      res.end(notFound);
    } catch {
      res.writeHead(404, { 'content-type': 'text/plain' });
      res.end('Not found');
    }
    return;
  }

  const body = await readFile(file);
  res.writeHead(200, {
    'content-type': TYPES[extname(file)] ?? 'application/octet-stream',
    'cache-control': 'no-store',
  });
  res.end(body);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Serving ${DIST}/ at http://127.0.0.1:${PORT}`);
});
