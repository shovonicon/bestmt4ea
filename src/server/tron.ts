/**
 * TronGrid client for the USDT (TRC20) rail.
 *
 * Reads *inbound* TRC20 transfers for our receiving address, filtered to the
 * official USDT contract. Deliberately narrow: it only ever fetches what the
 * verifier needs, and it normalises the API response into a small shape so the
 * domain logic (`crypto-payments.ts`) never depends on the provider's JSON.
 *
 * The API key is passed in, never read from the environment here — this module
 * stays pure and testable.
 */

import { USDT_DECIMALS, USDT_TRON_CONTRACT } from './crypto-payments';

const DEFAULT_BASE_URL = 'https://api.trongrid.io';

/** One normalised inbound TRC20 transfer. */
export type TokenTransfer = {
  txid: string;
  from: string;
  to: string;
  /** Raw integer in the token's base units (USDT has 6 decimals). */
  rawValue: string;
  tokenAddress: string;
  /** True only when the transaction is finalised enough to settle on. */
  confirmed: boolean;
  blockTimestamp: number;
};

export type TronGridConfig = {
  apiKey?: string;
  baseUrl?: string;
  usdtContract?: string;
};

export type FetchTransfersOptions = {
  /** Only return transfers at/after this epoch-ms. */
  minTimestamp?: number;
  limit?: number;
  /** Require finalised transactions (default true). */
  onlyConfirmed?: boolean;
};

type Trc20ApiItem = {
  transaction_id?: string;
  from?: string;
  to?: string;
  value?: string;
  block_timestamp?: number;
  token_info?: { address?: string; decimals?: number; symbol?: string };
};

type Trc20ApiResponse = {
  data?: Trc20ApiItem[];
  success?: boolean;
};

function normalise(item: Trc20ApiItem, fallbackContract: string, onlyConfirmed: boolean): TokenTransfer {
  return {
    txid: String(item.transaction_id ?? ''),
    from: String(item.from ?? ''),
    to: String(item.to ?? ''),
    rawValue: String(item.value ?? ''),
    tokenAddress: String(item.token_info?.address ?? fallbackContract),
    confirmed: onlyConfirmed,
    blockTimestamp: Number(item.block_timestamp ?? 0),
  };
}

/**
 * Fetch inbound USDT transfers for `address`.
 *
 * Ascending by time, so the verifier sees the oldest unmatched payment first.
 */
export async function fetchUsdtTransfers(
  address: string,
  config: TronGridConfig = {},
  options: FetchTransfersOptions = {}
): Promise<TokenTransfer[]> {
  const baseUrl = (config.baseUrl ?? DEFAULT_BASE_URL).replace(/\/+$/, '');
  const contract = config.usdtContract ?? USDT_TRON_CONTRACT;
  const onlyConfirmed = options.onlyConfirmed ?? true;
  const limit = Math.min(Math.max(options.limit ?? 200, 1), 200);

  const url = new URL(`${baseUrl}/v1/accounts/${encodeURIComponent(address)}/transactions/trc20`);
  url.searchParams.set('limit', String(limit));
  url.searchParams.set('contract_address', contract);
  url.searchParams.set('only_confirmed', String(onlyConfirmed));
  url.searchParams.set('only_to', 'true');
  if (options.minTimestamp && options.minTimestamp > 0) {
    url.searchParams.set('min_timestamp', String(options.minTimestamp));
  }

  const headers: Record<string, string> = { accept: 'application/json' };
  if (config.apiKey) headers['TRON-PRO-API-KEY'] = config.apiKey;

  const response = await fetch(url.toString(), { headers });
  if (!response.ok) {
    throw new Error(`TronGrid request failed: ${response.status} ${response.statusText}`);
  }
  const body = (await response.json()) as Trc20ApiResponse;
  const items = Array.isArray(body.data) ? body.data : [];

  return items
    .map((item) => normalise(item, contract, onlyConfirmed))
    .filter((transfer) => transfer.txid && transfer.rawValue)
    .sort((a, b) => a.blockTimestamp - b.blockTimestamp);
}

export { USDT_DECIMALS, USDT_TRON_CONTRACT };
