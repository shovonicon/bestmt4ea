import { describe, expect, it } from 'vitest';
import {
  USDT_TRON_CONTRACT,
  compareAmounts,
  expectedAmountFromCents,
  isExpired,
  matchTransfersToPayments,
  unitsToDecimal,
  verifyTransfer,
  type WaitingPayment,
} from '../src/server/crypto-payments';
import type { TokenTransfer } from '../src/server/tron';

const RECEIVING = 'TReceiverAddress00000000000000000000';
const OTHER_ADDRESS = 'TOther000000000000000000000000000000';
const FAKE_USDT = 'TFakeToken00000000000000000000000000';

let counter = 0;
function transfer(partial: Partial<TokenTransfer> & { rawValue: string }): TokenTransfer {
  counter += 1;
  return {
    txid: partial.txid ?? `tx-${counter}`,
    from: partial.from ?? 'TSender',
    to: partial.to ?? RECEIVING,
    rawValue: partial.rawValue,
    tokenAddress: partial.tokenAddress ?? USDT_TRON_CONTRACT,
    confirmed: partial.confirmed ?? true,
    blockTimestamp: partial.blockTimestamp ?? counter,
  };
}

function payment(partial: Partial<WaitingPayment> & { expectedAmount: string }): WaitingPayment {
  counter += 1;
  return {
    id: partial.id ?? `pay-${counter}`,
    expectedAmount: partial.expectedAmount,
    expiresAt: partial.expiresAt ?? Date.now() + 60 * 60 * 1000,
    createdAt: partial.createdAt ?? counter,
  };
}

describe('unitsToDecimal', () => {
  it('converts a raw USDT integer to a clean decimal', () => {
    expect(unitsToDecimal('49037000')).toBe('49.037');
    expect(unitsToDecimal('1000000')).toBe('1');
    expect(unitsToDecimal('49000000')).toBe('49');
    expect(unitsToDecimal('1')).toBe('0.000001');
  });

  it('rejects a non-integer', () => {
    expect(() => unitsToDecimal('49.037')).toThrow();
  });
});

describe('expectedAmountFromCents', () => {
  it('appends the identifier as the third decimal', () => {
    expect(expectedAmountFromCents(4900, 37)).toBe('49.037');
    expect(expectedAmountFromCents(4900, 1)).toBe('49.001');
    expect(expectedAmountFromCents(99900, 999)).toBe('999.999');
  });

  it('refuses a bad identifier or base', () => {
    expect(() => expectedAmountFromCents(4900, 0)).toThrow();
    expect(() => expectedAmountFromCents(4900, 1000)).toThrow();
    expect(() => expectedAmountFromCents(0, 5)).toThrow();
  });
});

describe('compareAmounts', () => {
  it('ranks under / exact / over at 6 dp', () => {
    expect(compareAmounts('49.037', '49.037')).toBe('exact');
    expect(compareAmounts('49.037', '49.037000')).toBe('exact');
    expect(compareAmounts('49.037', '49.036999')).toBe('under');
    expect(compareAmounts('49.037', '49.04')).toBe('over');
  });
});

describe('isExpired', () => {
  it('treats the window as inclusive of a grace period', () => {
    expect(isExpired(1000, 1000)).toBe(false);
    expect(isExpired(1000, 1001)).toBe(true);
    expect(isExpired(1000, 1001, 10)).toBe(false);
  });
});

describe('verifyTransfer', () => {
  const base = { expectedAmount: '49.037', receivingAddress: RECEIVING };

  it('accepts an exact, confirmed, correct-token transfer', () => {
    const result = verifyTransfer({ ...base, transfer: transfer({ rawValue: '49037000' }) });
    expect(result).toEqual({ ok: true, amount: '49.037', comparison: 'exact' });
  });

  it('accepts an overpayment but marks it as over', () => {
    const result = verifyTransfer({ ...base, transfer: transfer({ rawValue: '50000000' }) });
    expect(result).toEqual({ ok: true, amount: '50', comparison: 'over' });
  });

  it('rejects an underpayment', () => {
    const result = verifyTransfer({ ...base, transfer: transfer({ rawValue: '49036000' }) });
    expect(result).toEqual({ ok: false, reason: 'underpaid' });
  });

  it('rejects a wrong token contract even if it calls itself USDT', () => {
    const result = verifyTransfer({
      ...base,
      transfer: transfer({ rawValue: '49037000', tokenAddress: FAKE_USDT }),
    });
    expect(result).toEqual({ ok: false, reason: 'wrong_contract' });
  });

  it('rejects a transfer sent to someone else', () => {
    const result = verifyTransfer({
      ...base,
      transfer: transfer({ rawValue: '49037000', to: OTHER_ADDRESS }),
    });
    expect(result).toEqual({ ok: false, reason: 'wrong_receiver' });
  });

  it('rejects an unconfirmed transfer', () => {
    const result = verifyTransfer({
      ...base,
      transfer: transfer({ rawValue: '49037000', confirmed: false }),
    });
    expect(result).toEqual({ ok: false, reason: 'not_confirmed' });
  });
});

describe('matchTransfersToPayments', () => {
  const options = { receivingAddress: RECEIVING, now: Date.now() };

  it('settles a matching order once', () => {
    const outcomes = matchTransfersToPayments(
      [payment({ id: 'p1', expectedAmount: '49.037' })],
      [transfer({ txid: 'tx-a', rawValue: '49037000' })],
      options
    );
    expect(outcomes).toEqual([
      expect.objectContaining({ paymentId: 'p1', outcome: 'settled', amount: '49.037', comparison: 'exact' }),
    ]);
  });

  it('never lets one txid pay two orders', () => {
    const outcomes = matchTransfersToPayments(
      [
        payment({ id: 'p1', expectedAmount: '49.037', createdAt: 1 }),
        payment({ id: 'p2', expectedAmount: '49.037', createdAt: 2 }),
      ],
      [transfer({ txid: 'tx-a', rawValue: '49037000' })],
      options
    );
    expect(outcomes[0]).toMatchObject({ paymentId: 'p1', outcome: 'settled' });
    expect(outcomes[1]).toEqual({ paymentId: 'p2', outcome: 'no_match' });
  });

  it('refuses a txid already spent by an earlier order', () => {
    const outcomes = matchTransfersToPayments(
      [payment({ id: 'p1', expectedAmount: '49.037' })],
      [transfer({ txid: 'tx-used', rawValue: '49037000' })],
      { ...options, usedTxids: ['tx-used'] }
    );
    expect(outcomes[0]).toEqual({ paymentId: 'p1', outcome: 'no_match' });
  });

  it('refuses an ambiguous match (two candidate transfers)', () => {
    const outcomes = matchTransfersToPayments(
      [payment({ id: 'p1', expectedAmount: '49.037' })],
      [
        transfer({ txid: 'tx-a', rawValue: '49037000' }),
        transfer({ txid: 'tx-b', rawValue: '49037000' }),
      ],
      options
    );
    expect(outcomes[0]).toEqual({ paymentId: 'p1', outcome: 'ambiguous' });
  });

  it('settles an overpayment and marks the order paid', () => {
    const outcomes = matchTransfersToPayments(
      [payment({ id: 'p1', expectedAmount: '49.037' })],
      [transfer({ txid: 'tx-big', rawValue: '60000000' })],
      options
    );
    expect(outcomes[0]).toEqual(
      expect.objectContaining({ paymentId: 'p1', outcome: 'settled', amount: '60', comparison: 'over' })
    );
  });

  it('gives an overpayment to the closest order it covers', () => {
    const outcomes = matchTransfersToPayments(
      [
        payment({ id: 'small', expectedAmount: '49.037', createdAt: 1 }),
        payment({ id: 'close', expectedAmount: '55', createdAt: 2 }),
      ],
      [transfer({ txid: 'tx-60', rawValue: '60000000' })],
      options
    );
    expect(outcomes).toEqual([
      { paymentId: 'small', outcome: 'no_match' },
      expect.objectContaining({ paymentId: 'close', outcome: 'settled', amount: '60', comparison: 'over' }),
    ]);
  });

  it('prefers an exact match over an overpayment', () => {
    const outcomes = matchTransfersToPayments(
      [
        payment({ id: 'exact', expectedAmount: '49.037', createdAt: 1 }),
        payment({ id: 'over', expectedAmount: '40', createdAt: 2 }),
      ],
      [transfer({ txid: 'tx-49', rawValue: '49037000' })],
      options
    );
    expect(outcomes).toEqual([
      expect.objectContaining({ paymentId: 'exact', outcome: 'settled', amount: '49.037', comparison: 'exact' }),
      { paymentId: 'over', outcome: 'no_match' },
    ]);
  });

  it('flags an expired order instead of attaching a late payment', () => {
    const outcomes = matchTransfersToPayments(
      [payment({ id: 'p1', expectedAmount: '49.037', expiresAt: options.now - 1 })],
      [transfer({ txid: 'tx-a', rawValue: '49037000' })],
      options
    );
    expect(outcomes[0]).toEqual({ paymentId: 'p1', outcome: 'expired' });
  });

  it('settles several orders in one pass without double-spending a transfer', () => {
    const outcomes = matchTransfersToPayments(
      [
        payment({ id: 'p1', expectedAmount: '49.037', createdAt: 1 }),
        payment({ id: 'p2', expectedAmount: '99.042', createdAt: 2 }),
      ],
      [
        transfer({ txid: 'tx-1', rawValue: '49037000' }),
        transfer({ txid: 'tx-2', rawValue: '99042000' }),
      ],
      options
    );
    expect(outcomes).toEqual([
      expect.objectContaining({ paymentId: 'p1', outcome: 'settled', amount: '49.037' }),
      expect.objectContaining({ paymentId: 'p2', outcome: 'settled', amount: '99.042' }),
    ]);
  });
});
