import { drizzle } from 'drizzle-orm/d1';
import type { BatchItem } from 'drizzle-orm/batch';
import { env } from 'cloudflare:workers';
import * as schema from './schema';

/**
 * D1 client. A single place builds the Drizzle handle from the Worker's `DB`
 * binding, so request handlers and domain modules never touch `env` directly.
 */
export function getDb() {
  return drizzle(env.DB, { schema });
}

export type Db = ReturnType<typeof getDb>;

// D1 executes a batch atomically; drizzle types it as a homogeneous non-empty tuple.
export async function dbBatch(db: Db, statements: BatchItem<'sqlite'>[]): Promise<void> {
  if (statements.length === 0) return;
  const tuple = statements as [BatchItem<'sqlite'>, ...BatchItem<'sqlite'>[]];
  await db.batch(tuple);
}

export * as schema from './schema';
