import type { APIRoute } from 'astro';
import { getDb } from '../../../db/client';
import { getLatestSnapshot, getSeries } from '../../../server/performance';
import { json, jsonError } from '../../../lib/http';

export const prerender = false;

/** Public read of a product's latest MyFxBook snapshot + recent series. */
export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug ?? '';
  const db = getDb();

  const latest = await getLatestSnapshot(db, slug);
  if (!latest) return jsonError(404, 'no_performance');

  const series = await getSeries(db, slug, 200);

  return json({
    productId: slug,
    latest: {
      capturedAt: latest.capturedAt.getTime(),
      accountType: latest.accountType,
      sourceUrl: latest.sourceUrl,
      balanceCents: latest.balanceCents,
      equityCents: latest.equityCents,
      profitCents: latest.profitCents,
      growthPct: latest.growthPct,
      drawdownPct: latest.drawdownPct,
      profitFactor: latest.profitFactor,
      winRatePct: latest.winRatePct,
      openTrades: latest.openTrades,
    },
    series: series.map((snapshot) => ({
      capturedAt: snapshot.capturedAt.getTime(),
      balanceCents: snapshot.balanceCents,
      equityCents: snapshot.equityCents,
      profitCents: snapshot.profitCents,
      growthPct: snapshot.growthPct,
      drawdownPct: snapshot.drawdownPct,
      profitFactor: snapshot.profitFactor,
      winRatePct: snapshot.winRatePct,
      openTrades: snapshot.openTrades,
    })),
  });
};
