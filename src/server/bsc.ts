/**
 * BNB Smart Chain (BSC) client for the USDT (BEP-20) rail, via the Etherscan V2
 * multichain API (chainid=56) — BscScan's API is now served through it.
 *
 * Reads *inbound* BEP-20 transfers for our receiving address, filtered to the
 * official USDT contract. Deliberately narrow: it only fetches what the verifier
 * needs, and normalises the response into a small shape so the domain logic
 * (`crypto-payments.ts`) never depends on the provider's JSON.
 *
 * The API key is passed in, never read from the environment here — this module
 * stays pure and testable.
 */

import { USDT_DECIMALS, USDT_BEP20_CONTRACT } from './crypto-payments';

const DEFAULT_BASE_URL = 'https://api.etherscan.io/v2/api';
const BSC_CHAIN_ID = 56;
/** A BSC block is ~3s; a transfer with at least this many confirmations is settled on. */
const CONFIRMATION_THRESHOLD = 1;

/** One normalised inbound BEP-20 transfer. */
export type TokenTransfer = {
  txid: string;
  from: string;
  to: string;
  /** Raw integer in the token's base units (USDT BEP-20 has 18 decimals). */
  rawValue: string;
  tokenAddress: string;
  /** True only when the transaction has enough confirmations to settle on. */
  confirmed: boolean;
  blockTimestamp: number;
};

export type BscScanConfig = {
  apiKey?: string;
  baseUrl?: string;
  chainId?: number | string;
  usdtContract?: string;
};

export type FetchTransfersOptions = {
  /** Only return transfers at/after this epoch-ms. */
  minTimestamp?: number;
  limit?: number;
  /** Require at least one confirmation (default true). */
  onlyConfirmed?: boolean;
};

type TokentxItem = {
  hash?: string;
  from?: string;
  to?: string;
  value?: string;
  contractAddress?: string;
  timeStamp?: string;
  confirmations?: string;
};

type TokentxResponse = {
  status?: string;
  message?: string;
  result?: TokentxItem[];
};

function normalise(item: TokentxItem, fallbackContract: string, onlyConfirmed: boolean): TokenTransfer | null {
  const to = String(item.to ?? '').toLowerCase();
  if (!item.hash || !item.value || !to) return null;
  return {
    txid: String(item.hash),
    from: String(item.from ?? ''),
    to,
    rawValue: String(item.value),
    tokenAddress: String(item.contractAddress ?? fallbackContract),
    confirmed: !onlyConfirmed || Number(item.confirmations ?? 0) >= CONFIRMATION_THRESHOLD,
    // Etherscan returns a Unix timestamp in *seconds*.
    blockTimestamp: Number(item.timeStamp ?? 0) * 1000,
  };
}

/**
 * Fetch inbound USDT (BEP-20) transfers for `address`.
 *
 * Ascending by time, so the verifier sees the oldest unmatched payment first.
 * Etherscan's `tokentx` returns transfers in *both* directions, so the result is
 * filtered to `to === address` here.
 */
export async function fetchBep20Transfers(
  address: string,
  config: BscScanConfig = {},
  options: FetchTransfersOptions = {}
): Promise<TokenTransfer[]> {
  const baseUrl = (config.baseUrl ?? DEFAULT_BASE_URL).replace(/\/+$/, '');
  const chainId = config.chainId ?? BSC_CHAIN_ID;
  const contract = config.usdtContract ?? USDT_BEP20_CONTRACT;
  const onlyConfirmed = options.onlyConfirmed ?? true;
  const limit = Math.min(Math.max(options.limit ?? 200, 1), 200);

  const url = new URL(baseUrl);
  url.searchParams.set('chainid', String(chainId));
  url.searchParams.set('module', 'account');
  url.searchParams.set('action', 'tokentx');
  url.searchParams.set('contractaddress', contract);
  url.searchParams.set('address', address);
  url.searchParams.set('page', '1');
  url.searchParams.set('offset', String(limit));
  url.searchParams.set('sort', 'asc');
  if (config.apiKey) url.searchParams.set('apikey', config.apiKey);

  const response = await fetch(url.toString(), { headers: { accept: 'application/json' } });
  if (!response.ok) {
    throw new Error(`Etherscan request failed: ${response.status} ${response.statusText}`);
  }
  const body = (await response.json()) as TokentxResponse;
  if (body.status !== '1') {
    throw new Error(`Etherscan error: ${body.message ?? 'unknown'} (${body.status ?? 'no status'})`);
  }

  const wanted = address.toLowerCase();
  const items = Array.isArray(body.result) ? body.result : [];

  return items
    .map((item) => normalise(item, contract, onlyConfirmed))
    .filter((transfer): transfer is TokenTransfer => Boolean(transfer))
    .filter((transfer) => transfer.to === wanted)
    .filter((transfer) => !options.minTimestamp || transfer.blockTimestamp >= options.minTimestamp)
    .sort((a, b) => a.blockTimestamp - b.blockTimestamp);
}

export { USDT_DECIMALS, USDT_BEP20_CONTRACT };
