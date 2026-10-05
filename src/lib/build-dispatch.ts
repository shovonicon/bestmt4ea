/**
 * Ask GitHub to run the licence build workflow now, instead of waiting for its
 * 6-hour schedule. A compile needs MetaEditor on Windows, so it cannot run in the
 * Worker — this only pokes the runner that does.
 *
 * Best-effort by design: the queue row is already saved, and the schedule remains
 * the safety net, so a missing token or a GitHub outage must never fail a licence
 * activation. Returns whether GitHub accepted the event.
 */
const REPO = 'shovonicon/bestmt4ea';

export async function dispatchLicenseBuild(): Promise<boolean> {
  try {
    const { env } = await import('cloudflare:workers');
    const token = (env as { GITHUB_DISPATCH_TOKEN?: string }).GITHUB_DISPATCH_TOKEN;
    if (!token) return false;

    const res = await fetch(`https://api.github.com/repos/${REPO}/dispatches`, {
      method: 'POST',
      headers: {
        accept: 'application/vnd.github+json',
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
        'user-agent': 'bestmt4ea-worker',
        'x-github-api-version': '2022-11-28',
      },
      body: JSON.stringify({ event_type: 'license-build' }),
      signal: AbortSignal.timeout(4000),
    });
    return res.status === 204;
  } catch {
    return false;
  }
}
