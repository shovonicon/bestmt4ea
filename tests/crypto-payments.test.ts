import { describe, expect, it } from 'vitest';
import {
  USDT_BEP20_CONTRACT,
  compareAmounts,
  expectedAmountFromCents,
  isExpired,
  matchTransfersToPayments,
  unitsToDecimal,
  verifyTransfer,
  type WaitingPayment,
} from '../src/server/crypto-payments';
import type { TokenTransfer } from '../src/server/bsc';

const RECEIVING = '0x5f46d54f7e039759ca727ca604f45ec30eccc0dd';
const OTHER_ADDRESS = '0x0000000000000000000000000000000000000001';
const FAKE_USDT = '0x000000000000000000000000000000000000dead';

/** A 6-decimal amount expressed as BEP-20 raw units (18 decimals). */
const raw = (amount6dp: string) => `${amount6dp}000000000000`;

let counter = 0;
function transfer(partial: Partial<TokenTransfer> & { rawValue: string }): TokenTransfer {
  counter += 1;
  return {
    txid: partial.txid ?? `tx-${counter}`,
    from: partial.from ?? '0x00000000000000000000000000000000000000aA',
    to: partial.to ?? RECEIVING,
    rawValue: partial.rawValue,
    tokenAddress: partial.tokenAddress ?? USDT_BEP20_CONTRACT,
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
    expect(unitsToDecimal(raw('49037000'))).toBe('49.037');
    expect(unitsToDecimal(raw('1000000'))).toBe('1');
    expect(unitsToDecimal(raw('49000000'))).toBe('49');
    expect(unitsToDecimal('1')).toBe('0.000000000000000001');
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
    const result = verifyTransfer({ ...base, transfer: transfer({ rawValue: raw('49037000') }) });
    expect(result).toEqual({ ok: true, amount: '49.037', comparison: 'exact' });
  });

  it('accepts an overpayment but marks it as over', () => {
    const result = verifyTransfer({ ...base, transfer: transfer({ rawValue: raw('50000000') }) });
    expect(result).toEqual({ ok: true, amount: '50', comparison: 'over' });
  });

  it('rejects an underpayment', () => {
    const result = verifyTransfer({ ...base, transfer: transfer({ rawValue: raw('49036000') }) });
    expect(result).toEqual({ ok: false, reason: 'underpaid' });
  });

  it('rejects a wrong token contract even if it calls itself USDT', () => {
    const result = verifyTransfer({
      ...base,
      transfer: transfer({ rawValue: raw('49037000'), tokenAddress: FAKE_USDT }),
    });
    expect(result).toEqual({ ok: false, reason: 'wrong_contract' });
  });

  it('rejects a transfer sent to someone else', () => {
    const result = verifyTransfer({
      ...base,
      transfer: transfer({ rawValue: raw('49037000'), to: OTHER_ADDRESS }),
    });
    expect(result).toEqual({ ok: false, reason: 'wrong_receiver' });
  });

  it('rejects a transfer from an unexpected sender', () => {
    const result = verifyTransfer({
      ...base,
      expectedSender: '0x1111111111111111111111111111111111111111',
      transfer: transfer({ rawValue: raw('49037000') }),
    });
    expect(result).toEqual({ ok: false, reason: 'wrong_sender' });
  });

  it('rejects an unconfirmed transfer', () => {
    const result = verifyTransfer({
      ...base,
      transfer: transfer({ rawValue: raw('49037000'), confirmed: false }),
    });
    expect(result).toEqual({ ok: false, reason: 'not_confirmed' });
  });
});

describe('matchTransfersToPayments', () => {
  const options = { receivingAddress: RECEIVING, now: Date.now() };

  it('settles a matching order once', () => {
    const outcomes = matchTransfersToPayments(
      [payment({ id: 'p1', expectedAmount: '49.037' })],
      [transfer({ txid: 'tx-a', rawValue: raw('49037000') })],
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
      [transfer({ txid: 'tx-a', rawValue: raw('49037000') })],
      options
    );
    expect(outcomes[0]).toMatchObject({ paymentId: 'p1', outcome: 'settled' });
    expect(outcomes[1]).toEqual({ paymentId: 'p2', outcome: 'no_match' });
  });

  it('refuses a txid already spent by an earlier order', () => {
    const outcomes = matchTransfersToPayments(
      [payment({ id: 'p1', expectedAmount: '49.037' })],
      [transfer({ txid: 'tx-used', rawValue: raw('49037000') })],
      { ...options, usedTxids: ['tx-used'] }
    );
    expect(outcomes[0]).toEqual({ paymentId: 'p1', outcome: 'no_match' });
  });

  it('refuses an ambiguous match (two candidate transfers)', () => {
    const outcomes = matchTransfersToPayments(
      [payment({ id: 'p1', expectedAmount: '49.037' })],
      [
        transfer({ txid: 'tx-a', rawValue: raw('49037000') }),
        transfer({ txid: 'tx-b', rawValue: raw('49037000') }),
      ],
      options
    );
    expect(outcomes[0]).toEqual({ paymentId: 'p1', outcome: 'ambiguous' });
  });

  it('settles a rounded-up payment, within the 1 USDT tolerance', () => {
    // 49.037 -> 50.000: a payer rounding up to the next whole USDT.
    const outcomes = matchTransfersToPayments(
      [payment({ id: 'p1', expectedAmount: '49.037' })],
      [transfer({ txid: 'tx-big', rawValue: raw('50000000') })],
      options
    );
    expect(outcomes[0]).toEqual(
      expect.objectContaining({ paymentId: 'p1', outcome: 'settled', amount: '50', comparison: 'over' })
    );
  });

  it('does not settle on a larger deposit that has nothing to do with the order', () => {
    // A receiving wallet can get unrelated transfers; 192.39 must not pay a 49.037 order.
    const outcomes = matchTransfersToPayments(
      [payment({ id: 'p1', expectedAmount: '49.037' })],
      [transfer({ txid: 'tx-deposit', rawValue: raw('192390000') })],
      options
    );
    expect(outcomes[0]).toEqual({ paymentId: 'p1', outcome: 'no_match' });
  });

  it('draws the tolerance line at exactly 1 USDT over', () => {
    const atLimit = matchTransfersToPayments(
      [payment({ id: 'p1', expectedAmount: '49.037' })],
      [transfer({ txid: 'tx-limit', rawValue: raw('50037000') })],
      options
    );
    expect(atLimit[0]).toMatchObject({ paymentId: 'p1', outcome: 'settled' });

    const overLimit = matchTransfersToPayments(
      [payment({ id: 'p2', expectedAmount: '49.037' })],
      [transfer({ txid: 'tx-over', rawValue: raw('50038000') })],
      options
    );
    expect(overLimit[0]).toEqual({ paymentId: 'p2', outcome: 'no_match' });
  });

  it('gives an overpayment to the closest order it covers', () => {
    const outcomes = matchTransfersToPayments(
      [
        payment({ id: 'small', expectedAmount: '49.037', createdAt: 1 }),
        payment({ id: 'close', expectedAmount: '55', createdAt: 2 }),
      ],
      [transfer({ txid: 'tx-55-8', rawValue: raw('55800000') })],
      options
    );
    expect(outcomes).toEqual([
      { paymentId: 'small', outcome: 'no_match' },
      expect.objectContaining({ paymentId: 'close', outcome: 'settled', amount: '55.8', comparison: 'over' }),
    ]);
  });

  it('prefers an exact match over an overpayment', () => {
    const outcomes = matchTransfersToPayments(
      [
        payment({ id: 'exact', expectedAmount: '49.037', createdAt: 1 }),
        payment({ id: 'over', expectedAmount: '48.5', createdAt: 2 }),
      ],
      [transfer({ txid: 'tx-49', rawValue: raw('49037000') })],
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
      [transfer({ txid: 'tx-a', rawValue: raw('49037000') })],
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
        transfer({ txid: 'tx-1', rawValue: raw('49037000') }),
        transfer({ txid: 'tx-2', rawValue: raw('99042000') }),
      ],
      options
    );
    expect(outcomes).toEqual([
      expect.objectContaining({ paymentId: 'p1', outcome: 'settled', amount: '49.037' }),
      expect.objectContaining({ paymentId: 'p2', outcome: 'settled', amount: '99.042' }),
    ]);
  });
});
