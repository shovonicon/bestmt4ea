import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getDb } from '../../../db/client';
import { recordSnapshot, recordTrades } from '../../../server/performance';
import { json, jsonError } from '../../../lib/http';
import { timingSafeEqual } from '../../../lib/crypto';

export const prerender = false;

/**
 * Performance ingest — the endpoint the scheduled browser collector POSTs to.
 *
 * MyFXBook returns 403 to plain server-side fetches, so the scrape runs outside
 * the Worker (a headless browser on a schedule). Guarded by a shared token; the
 * browser never reaches it. Expects JSON (Astro's CSRF guard rejects form POSTs).
 */
export const POST: APIRoute = async ({ request }) => {
  const token = request.headers.get('x-ingest-token') ?? '';
  if (!env.PERF_INGEST_TOKEN || !timingSafeEqual(token, env.PERF_INGEST_TOKEN)) {
    return jsonError(401, 'unauthorized');
  }

  let payload: {
    productId?: string;
    capturedAt?: number;
    metrics?: Record<string, unknown>;
    account?: { myfxbookAccountId?: string; url?: string; accountType?: string };
    trades?: Array<Record<string, unknown>>;
    /** The full Myfxbook metric set, rendered verbatim in the "every figure" panel. */
    raw?: Record<string, unknown>;
  };
  try {
    payload = JSON.parse(await request.text());
  } catch {
    return jsonError(400, 'invalid_json');
  }

  const productId = payload.productId ?? '';
  if (!productId) return jsonError(400, 'missing_product');

  const db = getDb();
  const accountType =
    payload.account?.accountType === 'real' || payload.account?.accountType === 'demo'
      ? payload.account.accountType
      : null;

  const snapshotId = await recordSnapshot(
    db,
    {
      productId,
      capturedAt: payload.capturedAt ?? Date.now(),
      balanceCents: numberOrNull(payload.metrics?.balanceCents),
      equityCents: numberOrNull(payload.metrics?.equityCents),
      profitCents: numberOrNull(payload.metrics?.profitCents),
      growthPct: stringOrNull(payload.metrics?.growthPct),
      drawdownPct: stringOrNull(payload.metrics?.drawdownPct),
      profitFactor: stringOrNull(payload.metrics?.profitFactor),
      winRatePct: stringOrNull(payload.metrics?.winRatePct),
      openTrades: numberOrNull(payload.metrics?.openTrades),
      raw: payload.raw ?? null,
    },
    {
      productId,
      myfxbookAccountId: payload.account?.myfxbookAccountId ?? null,
      url: payload.account?.url ?? null,
      accountType,
    }
  );

  let tradesInserted = 0;
  if (Array.isArray(payload.trades) && payload.trades.length > 0) {
    tradesInserted = await recordTrades(
      db,
      productId,
      payload.trades.map((trade) => ({
        myfxbookTradeId: String(trade.myfxbookTradeId ?? trade.id ?? ''),
        symbol: stringOrNull(trade.symbol),
        type: stringOrNull(trade.type),
        lots: stringOrNull(trade.lots),
        openPrice: stringOrNull(trade.openPrice),
        closePrice: stringOrNull(trade.closePrice),
        openTime: numberOrNull(trade.openTime),
        closeTime: numberOrNull(trade.closeTime),
        profitCents: numberOrNull(trade.profitCents),
        commissionCents: numberOrNull(trade.commissionCents),
        swapCents: numberOrNull(trade.swapCents),
      }))
    );
  }

  return json({ ok: true, snapshotId, tradesInserted });
};

function numberOrNull(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null;
  const n = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(n) ? n : null;
}
function stringOrNull(value: unknown): string | null {
  return value === null || value === undefined ? null : String(value);
}
