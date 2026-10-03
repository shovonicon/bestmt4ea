/**
 * BestMT4EA companion cron Worker.
 *
 * The Astro Cloudflare adapter owns the main Worker's entrypoint, so scheduled
 * jobs live here. This Worker holds **no** D1/R2 bindings: it is a thin
 * scheduler that calls the app's secret-guarded internal endpoints.
 *
 *   every minute  -> POST /api/internal/usdt-poll/     (settle incoming USDT)
 *   daily 03:00   -> POST /api/internal/license-expiry/ (expire licences)
 *                 -> POST /api/internal/cleanup/        (housekeeping)
 */

interface Env {
  /** Origin of the main site (e.g. https://bestmt4ea.com). */
  APP_URL: string;
  /** Shared secret the internal endpoints check. */
  CRON_SECRET: string;
}

interface ScheduledEvent {
  cron: string;
}

const USDT_CRON = '* * * * *';

async function call(env: Env, path: string): Promise<void> {
  const base = env.APP_URL.replace(/\/+$/, '');
  const response = await fetch(`${base}${path}`, {
    method: 'POST',
    headers: { 'x-cron-secret': env.CRON_SECRET, 'content-type': 'application/json' },
    body: '{}',
  });
  if (!response.ok) {
    console.error('cron_job_failed', path, response.status);
  }
}

export default {
  async scheduled(event: ScheduledEvent, env: Env): Promise<void> {
    const jobs = [call(env, '/api/internal/usdt-poll/')];
    if (event.cron !== USDT_CRON) {
      jobs.push(call(env, '/api/internal/license-expiry/'), call(env, '/api/internal/cleanup/'));
    }
    await Promise.allSettled(jobs);
  },

  async fetch(request: Request): Promise<Response> {
    return new Response('bestmt4ea-cron', {
      status: 200,
      headers: { 'content-type': 'text/plain' },
    });
  },
};
