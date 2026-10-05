import type { APIRoute } from 'astro';
import { getDb } from '../../../db/client';
import { getBuildProgressByLicense, listCustomerBuilds } from '../../../server/portal';
import { json, jsonError } from '../../../lib/http';

export const prerender = false;

/**
 * Build progress for the signed-in customer — polled by the dashboard so it can
 * say "being generated" and then announce the moment a download is ready.
 */
export const GET: APIRoute = async ({ locals }) => {
  const session = locals.session;
  if (!session || session.subjectType !== 'customer') return jsonError(401, 'unauthorized');

  const db = getDb();
  const [progress, builds] = await Promise.all([
    getBuildProgressByLicense(db, session.subjectId),
    listCustomerBuilds(db, session.subjectId),
  ]);
  const states = [...progress.values()];
  return json(
    {
      generating: states.filter((state) => state === 'generating').length,
      failed: states.filter((state) => state === 'failed').length,
      ready: builds.map((build) => ({ id: build.buildId, title: build.productTitle })),
    },
    { headers: { 'cache-control': 'no-store' } }
  );
};
