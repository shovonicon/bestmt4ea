/**
 * Linked USDT (BEP-20 / BSC) wallets.
 *
 * A customer connects their MetaMask (or any EVM) wallet once, and the address is
 * bound to the account for the life of the account: it identifies the payer when
 * a USDT transfer is matched, so a payment is credited to the account that owns
 * the wallet that sent it, not merely to whichever order had the matching amount.
 *
 * The link is deliberately irreversible — it is a payer identity, not a
 * preference — so both the account and the address are one-to-one.
 */

import { eq } from 'drizzle-orm';
import type { Db } from '../db/client';
import { customers, type Customer } from '../db/schema';

/** EVM address: `0x` followed by 40 hex characters. */
const EVM_ADDRESS_RE = /^0x[0-9a-fA-F]{40}$/;

export function isValidEvmAddress(value: string): boolean {
  return EVM_ADDRESS_RE.test(value.trim());
}

export type LinkWalletResult =
  | { ok: true; customer: Customer }
  | { ok: false; reason: 'not_found' | 'invalid_address' | 'already_linked' | 'wallet_in_use' };

/**
 * Bind a wallet to an account. Fails when the account is unknown, the address is
 * not an EVM address, the account already holds a wallet, or the address is
 * already bound to another account. The unique index on `usdt_wallet_address` is
 * the real guard; the pre-checks turn a constraint failure into a clear reason.
 */
export async function linkWallet(db: Db, customerId: string, address: string): Promise<LinkWalletResult> {
  const normalized = address.trim().toLowerCase();
  if (!isValidEvmAddress(normalized)) return { ok: false, reason: 'invalid_address' };

  const customer = await db.select().from(customers).where(eq(customers.id, customerId)).get();
  if (!customer) return { ok: false, reason: 'not_found' };
  if (customer.usdtWalletAddress) return { ok: false, reason: 'already_linked' };

  const taken = await db
    .select({ id: customers.id })
    .from(customers)
    .where(eq(customers.usdtWalletAddress, normalized))
    .get();
  if (taken) return { ok: false, reason: 'wallet_in_use' };

  await db
    .update(customers)
    .set({ usdtWalletAddress: normalized, updatedAt: new Date() })
    .where(eq(customers.id, customerId));

  const updated = await db.select().from(customers).where(eq(customers.id, customerId)).get();
  return updated ? { ok: true, customer: updated } : { ok: false, reason: 'not_found' };
}

/** The wallet an account sends USDT from, when one is linked. */
export async function getWalletForCustomer(db: Db, customerId: string): Promise<string | null> {
  const row = await db
    .select({ address: customers.usdtWalletAddress })
    .from(customers)
    .where(eq(customers.id, customerId))
    .get();
  return row?.address ?? null;
}
