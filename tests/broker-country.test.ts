import { describe, expect, it } from 'vitest';
import brokerData from '../src/data/brokers.json';
import countryData from '../src/data/broker-countries.json';
import { buildStatusTable, parseBroker, parseCountryList, statusFor, type BrokerCountryText } from '../src/lib/brokerCountry';

const brokers = (brokerData as unknown as { brokers: BrokerCountryText[] }).brokers;
const countries = (countryData as { countries: { code: string; name: string }[] }).countries;
const rule = (key: string) => parseBroker(brokers.find((b) => b.key === key)!);

describe('parseCountryList', () => {
  it('maps every word in brokers.json, so a new restriction can never be dropped silently', () => {
    for (const broker of brokers) {
      expect(() => parseBroker(broker), broker.key).not.toThrow();
    }
  });

  it('throws on a word it does not know', () => {
    expect(() => parseCountryList('Atlantis')).toThrow(/cannot map/);
  });

  it('reads "none", empty and missing as no countries', () => {
    expect(parseCountryList('None').codes.size).toBe(0);
    expect(parseCountryList('').codes.size).toBe(0);
    expect(parseCountryList(undefined).codes.size).toBe(0);
  });

  it('ignores the count in "130+ countries: Asia, Africa" and keeps the regions', () => {
    const parsed = parseCountryList('130+ countries: Asia, Africa, LATAM');
    expect(parsed.codes.has('BD')).toBe(true);
    expect(parsed.codes.has('NG')).toBe(true);
    expect(parsed.codes.has('BR')).toBe(true);
    expect(parsed.worldwide).toBe(false);
  });

  it('splits "UK/EU" and "UAE/Saudi"', () => {
    const parsed = parseCountryList('UK/EU, UAE/Saudi');
    for (const code of ['GB', 'IT', 'DE', 'AE', 'SA']) expect(parsed.codes.has(code), code).toBe(true);
  });

  it('treats "worldwide" as every country', () => {
    expect(parseCountryList('190+ countries worldwide').worldwide).toBe(true);
  });
});

describe('statusFor', () => {
  it('accepts a country through a named region (Bangladesh is South Asia)', () => {
    expect(statusFor(rule('hfm'), 'BD')).toBe('accepted');
    expect(statusFor(rule('hfm'), 'KW')).toBe('accepted'); // GCC
  });

  it('restricts a named country', () => {
    expect(statusFor(rule('exness'), 'US')).toBe('restricted');
    expect(statusFor(rule('exness'), 'JP')).toBe('restricted');
    expect(statusFor(rule('xm'), 'IL')).toBe('restricted');
  });

  it('lets a restriction beat a wider accepted region', () => {
    // Exness accepts "Asia" but restricts the UAE and Saudi Arabia by name.
    expect(statusFor(rule('exness'), 'AE')).toBe('restricted');
    expect(statusFor(rule('exness'), 'SA')).toBe('restricted');
    // Avatrade accepts the EU but restricts Belgium by name.
    expect(statusFor(rule('avatrade'), 'BE')).toBe('restricted');
    expect(statusFor(rule('avatrade'), 'DE')).toBe('accepted');
    // Binance's registered EU markets, minus the Netherlands.
    expect(statusFor(rule('binance'), 'NL')).toBe('restricted');
    expect(statusFor(rule('binance'), 'DE')).toBe('accepted');
  });

  it('says unknown, not accepted, when the text does not cover the country', () => {
    expect(statusFor(rule('hfm'), 'DE')).toBe('unknown');
    expect(statusFor(rule('exness'), 'FR')).toBe('restricted'); // EU is restricted by name
    expect(statusFor(rule('icmarkets'), 'TR')).toBe('unknown'); // Türkiye is not in "Asia"
  });

  it('accepts everywhere for a worldwide broker, except the restricted list', () => {
    expect(statusFor(rule('tradingview'), 'US')).toBe('accepted');
    expect(statusFor(rule('xm'), 'BD')).toBe('accepted');
    expect(statusFor(rule('xm'), 'US')).toBe('restricted');
    expect(statusFor(rule('xm'), 'IR')).toBe('restricted');
  });

  it('applies "sanctioned countries" to Iran', () => {
    expect(statusFor(rule('xbtfx'), 'IR')).toBe('restricted');
    expect(statusFor(rule('xbtfx'), 'IN')).toBe('accepted');
    expect(statusFor(rule('xbtfx'), 'US')).toBe('restricted');
  });
});

describe('buildStatusTable', () => {
  it('has a status for every broker and every picker country', () => {
    const table = buildStatusTable(brokers, countries);
    for (const broker of brokers) {
      for (const country of countries) {
        expect(['a', 'r', 'u'], `${broker.key} ${country.code}`).toContain(table[broker.key][country.code]);
      }
    }
  });

  it('lists the countries Search Console shows as biggest', () => {
    const codes = new Set(countries.map((c) => c.code));
    for (const code of ['IN', 'ZA', 'MY', 'NG', 'ID', 'PK', 'IT', 'IR', 'TH', 'US', 'JP', 'BR', 'GB', 'BD']) {
      expect(codes.has(code), code).toBe(true);
    }
  });

  it('lists the countries the WooCommerce order history shows as biggest', () => {
    const codes = new Set(countries.map((c) => c.code));
    // Distinct paying customers per billing country, 2026-10-05 export, top 40.
    const top = ['US', 'IN', 'ZA', 'GB', 'NG', 'ID', 'BD', 'MY', 'IT', 'BR', 'DE', 'PK', 'TH', 'ES', 'FR', 'VN', 'PH', 'AU', 'AE', 'CA',
      'KE', 'EG', 'SG', 'IR', 'JP', 'MA', 'SA', 'MX', 'PT', 'TR', 'CH', 'LK', 'RU', 'BW', 'NL', 'IQ', 'CN', 'IL', 'CO', 'DZ'];
    for (const code of top) expect(codes.has(code), code).toBe(true);
  });

  it('has no duplicate country codes', () => {
    const codes = countries.map((c) => c.code);
    expect(new Set(codes).size).toBe(codes.length);
  });
});
