import { desc, eq } from 'drizzle-orm';
import type { Db } from '../db/client';
import {
  performanceAccounts,
  performanceSnapshots,
  trades,
  type PerformanceSnapshot,
} from '../db/schema';
import { uuid } from '../lib/crypto';

/**
 * MyFxBook performance store. The scheduled browser collector POSTs snapshots
 * and trades here; product pages read the latest snapshot. The DB holds the
 * history the site was previously missing (everything was hand-transcribed).
 */

export interface AccountInput {
  productId: string;
  myfxbookAccountId?: string | null;
  url?: string | null;
  accountType?: 'real' | 'demo' | null;
}

export interface SnapshotInput {
  productId: string;
  capturedAt: number;
  balanceCents?: number | null;
  equityCents?: number | null;
  profitCents?: number | null;
  growthPct?: string | null;
  drawdownPct?: string | null;
  profitFactor?: string | null;
  winRatePct?: string | null;
  openTrades?: number | null;
  /** The full Myfxbook metric set for this capture. */
  raw?: Record<string, unknown> | null;
}

export interface TradeInput {
  myfxbookTradeId: string;
  symbol?: string | null;
  type?: string | null;
  lots?: string | null;
  openPrice?: string | null;
  closePrice?: string | null;
  openTime?: number | null;
  closeTime?: number | null;
  profitCents?: number | null;
  commissionCents?: number | null;
  swapCents?: number | null;
}

async function ensureAccount(db: Db, input: AccountInput): Promise<string> {
  const existing = await db
    .select({ id: performanceAccounts.id })
    .from(performanceAccounts)
    .where(eq(performanceAccounts.productId, input.productId))
    .get();

  if (existing) {
    // Only patch fields that were actually provided — a later call that knows
    // nothing about the account (e.g. trades-only) must not null them out.
    const patch: {
      lastSyncedAt: Date;
      myfxbookAccountId?: string | null;
      url?: string | null;
      accountType?: 'real' | 'demo' | null;
    } = { lastSyncedAt: new Date() };
    if (input.myfxbookAccountId !== undefined) patch.myfxbookAccountId = input.myfxbookAccountId ?? null;
    if (input.url !== undefined) patch.url = input.url ?? null;
    if (input.accountType !== undefined) patch.accountType = input.accountType ?? null;
    await db.update(performanceAccounts).set(patch).where(eq(performanceAccounts.id, existing.id));
    return existing.id;
  }

  const id = uuid();
  await db.insert(performanceAccounts).values({
    id,
    productId: input.productId,
    myfxbookAccountId: input.myfxbookAccountId ?? null,
    url: input.url ?? null,
    accountType: input.accountType ?? null,
    active: true,
    lastSyncedAt: new Date(),
    createdAt: new Date(),
  });
  return id;
}

export async function recordSnapshot(db: Db, input: SnapshotInput, account?: AccountInput): Promise<string> {
  const accountId = await ensureAccount(db, account ?? { productId: input.productId });
  const id = uuid();
  await db.insert(performanceSnapshots).values({
    id,
    accountId,
    capturedAt: new Date(input.capturedAt),
    balanceCents: input.balanceCents ?? null,
    equityCents: input.equityCents ?? null,
    profitCents: input.profitCents ?? null,
    growthPct: input.growthPct ?? null,
    drawdownPct: input.drawdownPct ?? null,
    profitFactor: input.profitFactor ?? null,
    winRatePct: input.winRatePct ?? null,
    openTrades: input.openTrades ?? null,
    raw: input.raw ?? null,
    createdAt: new Date(),
  });
  return id;
}

export async function recordTrades(db: Db, productId: string, rows: TradeInput[]): Promise<number> {
  if (rows.length === 0) return 0;
  const accountId = await ensureAccount(db, { productId });
  let inserted = 0;
  for (const row of rows) {
    await db
      .insert(trades)
      .values({
        id: uuid(),
        accountId,
        myfxbookTradeId: row.myfxbookTradeId,
        symbol: row.symbol ?? null,
        type: row.type ?? null,
        lots: row.lots ?? null,
        openPrice: row.openPrice ?? null,
        closePrice: row.closePrice ?? null,
        openTime: row.openTime ? new Date(row.openTime) : null,
        closeTime: row.closeTime ? new Date(row.closeTime) : null,
        profitCents: row.profitCents ?? null,
        commissionCents: row.commissionCents ?? null,
        swapCents: row.swapCents ?? null,
        createdAt: new Date(),
      })
      .onConflictDoNothing({ target: [trades.accountId, trades.myfxbookTradeId] });
    inserted += 1;
  }
  return inserted;
}

export interface LatestPerformance {
  capturedAt: Date;
  accountType: 'real' | 'demo' | null;
  sourceUrl: string | null;
  balanceCents: number | null;
  equityCents: number | null;
  profitCents: number | null;
  growthPct: string | null;
  drawdownPct: string | null;
  profitFactor: string | null;
  winRatePct: string | null;
  openTrades: number | null;
  /** The full Myfxbook metric set, for the "every figure" panel. */
  raw: Record<string, unknown> | null;
}

export async function getLatestSnapshot(db: Db, productId: string): Promise<LatestPerformance | null> {
  const account = await db
    .select()
    .from(performanceAccounts)
    .where(eq(performanceAccounts.productId, productId))
    .get();
  if (!account) return null;

  const snap = await db
    .select()
    .from(performanceSnapshots)
    .where(eq(performanceSnapshots.accountId, account.id))
    .orderBy(desc(performanceSnapshots.capturedAt))
    .get();
  if (!snap) return null;

  return {
    capturedAt: snap.capturedAt,
    accountType: account.accountType ?? null,
    sourceUrl: account.url ?? null,
    balanceCents: snap.balanceCents,
    equityCents: snap.equityCents,
    profitCents: snap.profitCents,
    growthPct: snap.growthPct,
    drawdownPct: snap.drawdownPct,
    profitFactor: snap.profitFactor,
    winRatePct: snap.winRatePct,
    openTrades: snap.openTrades,
    raw: (snap.raw as Record<string, unknown> | null) ?? null,
  };
}

export async function getSeries(db: Db, productId: string, limit = 200): Promise<PerformanceSnapshot[]> {
  const account = await db
    .select({ id: performanceAccounts.id })
    .from(performanceAccounts)
    .where(eq(performanceAccounts.productId, productId))
    .get();
  if (!account) return [];
  return db
    .select()
    .from(performanceSnapshots)
    .where(eq(performanceSnapshots.accountId, account.id))
    .orderBy(desc(performanceSnapshots.capturedAt))
    .limit(limit)
    .all();
}
