/**
 * Country availability for the brokers page.
 *
 * `src/data/brokers.json` keeps each broker's accepted and restricted countries as
 * the free text the broker publishes ("SE Asia, South Asia, GCC, Africa"). This
 * module turns that text into a status per country, so the page can order brokers
 * for a visitor and label the ones that do not take their country.
 *
 * Rules, in order of precedence:
 *   1. RESTRICTED always wins. A country named in the restricted list is restricted
 *      even when a wider accepted region (for example "Asia") would include it.
 *   2. Everything else is ACCEPTED (owner rule, 2026-11-06): a broker is available in
 *      every country it does not restrict. The accepted text is no longer used to
 *      decide availability, so nothing falls to UNKNOWN.
 *
 * Restricted region boundaries still matter: when one is arguable (for example
 * whether "Middle East" includes Turkey), the country is left out of the region,
 * so it is shown as available.
 *
 * A word this module does not recognise throws. That is deliberate: silently
 * ignoring a new restriction would show a restricted country as available, so an
 * edit to brokers.json that adds an unfamiliar word fails the build and the tests
 * until it is mapped here.
 *
 * Only erasable TypeScript is used, so Node can import this file directly (the
 * check script does).
 */

export type CountryStatus = 'accepted' | 'restricted' | 'unknown';

export interface Country {
  code: string;
  name: string;
}

/* ------------------------------------------------------------------ regions */

const EU = [
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
  'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
];
const GCC = ['AE', 'SA', 'QA', 'KW', 'BH', 'OM'];
const SE_ASIA = ['MY', 'ID', 'TH', 'VN', 'PH', 'SG', 'KH', 'LA', 'MM', 'BN', 'TL'];
const SOUTH_ASIA = ['IN', 'PK', 'BD', 'LK', 'NP', 'BT', 'MV'];
const EAST_ASIA = ['JP', 'CN', 'HK', 'KR', 'TW', 'MO', 'MN'];
const CENTRAL_ASIA = ['KZ', 'UZ', 'KG', 'TJ', 'TM'];

const REGIONS: Record<string, string[]> = {
  eu: EU,
  /** The EU plus Iceland, Liechtenstein and Norway, the rest of the European Economic Area. */
  eea: [...EU, 'IS', 'LI', 'NO'],
  /** The EU plus the non-EU western European countries. Turkey and Russia are not in it. */
  europe: [...EU, 'GB', 'CH', 'NO', 'IS', 'LI'],
  gcc: GCC,
  /** The Gulf plus its immediate neighbours. Israel and Turkey are left out on purpose. */
  'middle east': [...GCC, 'IR', 'IQ', 'JO', 'LB'],
  'se asia': SE_ASIA,
  'south asia': SOUTH_ASIA,
  /** Asia without the Middle East: brokers that list "Asia" rarely mean the Gulf or Israel. */
  asia: [...SE_ASIA, ...SOUTH_ASIA, ...EAST_ASIA, ...CENTRAL_ASIA],
  apac: [...SE_ASIA, ...SOUTH_ASIA, ...EAST_ASIA, 'AU', 'NZ'],
  africa: [
    'ZA', 'NG', 'KE', 'GH', 'EG', 'MA', 'DZ', 'TN', 'ET', 'TZ', 'UG', 'ZM', 'ZW', 'BW', 'SN', 'CI', 'CM', 'AO', 'MZ', 'RW',
    'NA', 'MU', 'LY', 'SD', 'SO', 'ML', 'BF', 'NE', 'TD', 'MW', 'LS', 'SZ', 'GA', 'CG', 'CD', 'BJ', 'TG', 'SL', 'LR', 'GM',
  ],
  latam: ['BR', 'MX', 'AR', 'CO', 'CL', 'PE', 'UY', 'EC', 'BO', 'PY', 'VE', 'CR', 'PA', 'DO', 'GT', 'HN', 'SV', 'NI', 'CU'],
  /** Ukraine and Georgia are left out: whether a broker's "CIS" includes them varies. */
  cis: ['RU', 'KZ', 'BY', 'UZ', 'KG', 'TJ', 'AM', 'AZ', 'MD'],
  /** Comprehensive sanctions programmes. A restriction on "sanctioned countries" means these. */
  sanctioned: ['IR', 'KP', 'CU', 'SY'],
};

/* ------------------------------------------------------------------ aliases */

/** Words that mean "no restriction" or "no country named". */
const NOTHING = new Set(['none', 'n/a', '']);

/** Words that mean every country (the restricted list is then applied on top). */
const WORLDWIDE = new Set(['worldwide', 'global', 'global crypto traders']);

const COUNTRY_ALIASES: Record<string, string> = {
  usa: 'US',
  us: 'US',
  'united states': 'US',
  canada: 'CA',
  uk: 'GB',
  'united kingdom': 'GB',
  japan: 'JP',
  australia: 'AU',
  'new zealand': 'NZ',
  brazil: 'BR',
  indonesia: 'ID',
  india: 'IN',
  iran: 'IR',
  'north korea': 'KP',
  israel: 'IL',
  china: 'CN',
  singapore: 'SG',
  'south korea': 'KR',
  belgium: 'BE',
  netherlands: 'NL',
  uae: 'AE',
  'united arab emirates': 'AE',
  saudi: 'SA',
  'saudi arabia': 'SA',
  'south africa': 'ZA',
  's. africa': 'ZA',
  russia: 'RU',
  ukraine: 'UA',
  belarus: 'BY',
  turkey: 'TR',
  liberia: 'LR',
  'south sudan': 'SS',
  'guinea-bissau': 'GW',
  'east timor': 'TL',
  micronesia: 'FM',
  'northern mariana islands': 'MP',
  saipan: 'MP',
  tahiti: 'PF',
  curaçao: 'CW',
  bonaire: 'BQ',
  'sint eustatius': 'BQ',
  'svalbard and jan mayen': 'SJ',
  curacao: 'CW',
  cuba: 'CU',
  sudan: 'SD',
  afghanistan: 'AF',
  mauritius: 'MU',
  congo: 'CG',
  palestine: 'PS',
  iraq: 'IQ',
  syria: 'SY',
  yemen: 'YE',
  myanmar: 'MM',
  somalia: 'SO',
  libya: 'LY',
  venezuela: 'VE',
  zimbabwe: 'ZW',
  haiti: 'HT',
  suriname: 'SR',
  'puerto rico': 'PR',
  mali: 'ML',
  lebanon: 'LB',
  'central african republic': 'CF',
  uganda: 'UG',
  laos: 'LA',
  guyana: 'GY',
  'papua new guinea': 'PG',
  'bosnia and herzegovina': 'BA',
  'hong kong': 'HK',
  spain: 'ES',
  'czech republic': 'CZ',
  'vatican city': 'VA',
  'american samoa': 'AS',
  andorra: 'AD',
  guam: 'GU',
  monaco: 'MC',
  liechtenstein: 'LI',
  palau: 'PW',
  'marshall islands': 'MH',
  norway: 'NO',
  iceland: 'IS',
  austria: 'AT',
  bulgaria: 'BG',
  croatia: 'HR',
  cyprus: 'CY',
  denmark: 'DK',
  estonia: 'EE',
  finland: 'FI',
  france: 'FR',
  germany: 'DE',
  greece: 'GR',
  hungary: 'HU',
  ireland: 'IE',
  italy: 'IT',
  latvia: 'LV',
  lithuania: 'LT',
  luxembourg: 'LU',
  malta: 'MT',
  poland: 'PL',
  portugal: 'PT',
  romania: 'RO',
  slovakia: 'SK',
  slovenia: 'SI',
  sweden: 'SE',
  uruguay: 'UY',
  // Territories and provinces. Codes outside the picker's country list only
  // matter for the restriction check, and they keep the words mapped.
  'baker island': 'UM',
  'howland island': 'UM',
  'jarvis island': 'UM',
  'johnston atoll': 'UM',
  'kingman reef': 'UM',
  'midway islands': 'UM',
  'navassa island': 'UM',
  'palmyra atoll': 'UM',
  'wake island': 'UM',
  'heard and mcdonald islands': 'HM',
  'us virgin islands': 'VI',
  'british virgin islands': 'VG',
  'north cyprus': 'CY-N',
  'occupied area of cyprus': 'CY-N',
  quebec: 'CA-QC',
  québec: 'CA-QC',
  malaysia: 'MY',
  vanuatu: 'VU',
  ontario: 'CA-ON',
};

/** Region words, including phrasings seen in the broker text. */
const REGION_ALIASES: Record<string, string> = {
  eu: 'eu',
  eea: 'eea',
  'european union': 'eu',
  'registered eu markets': 'eu',
  europe: 'europe',
  gcc: 'gcc',
  'middle east': 'middle east',
  'se asia': 'se asia',
  'south asia': 'south asia',
  asia: 'asia',
  apac: 'apac',
  africa: 'africa',
  latam: 'latam',
  cis: 'cis',
  'ofac-sanctioned countries': 'sanctioned',
};

/* ------------------------------------------------------------------ parsing */

export interface ParsedCountries {
  /** ISO 3166-1 alpha-2 codes named directly or through a region. */
  codes: Set<string>;
  /** The text says "worldwide": every country not otherwise restricted is accepted. */
  worldwide: boolean;
}

const normalise = (token: string) =>
  token
    .toLowerCase()
    .replace(/\([^)]*\)/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\.+$/, '')
    .trim();

/**
 * Parse one free-text country list. Throws on a word it cannot map, so a new
 * restriction can never be dropped without anyone noticing.
 */
export function parseCountryList(text: string | null | undefined): ParsedCountries {
  const result: ParsedCountries = { codes: new Set(), worldwide: false };
  if (!text) return result;

  // "130+ countries: Asia, Africa" -> "Asia, Africa". The count says how many, not which.
  const cleaned = String(text).replace(/\b\d+\+?\s*countries\b:?/gi, ' ');

  for (const raw of cleaned.split(/[,/]/)) {
    const token = normalise(raw);
    if (NOTHING.has(token)) continue;
    if (WORLDWIDE.has(token)) {
      result.worldwide = true;
      continue;
    }
    const country = COUNTRY_ALIASES[token];
    if (country) {
      result.codes.add(country);
      continue;
    }
    const region = REGION_ALIASES[token];
    if (region) {
      for (const code of REGIONS[region]) result.codes.add(code);
      continue;
    }
    throw new Error(`brokerCountry: cannot map "${raw.trim()}" (from "${text}"). Add it to the alias tables.`);
  }
  return result;
}

/* ------------------------------------------------------------------- status */

export interface BrokerCountryText {
  key: string;
  acceptedCountries?: string | null;
  restrictedCountries?: string | null;
}

export interface BrokerCountryRule {
  accepted: ParsedCountries;
  restricted: ParsedCountries;
}

export function parseBroker(broker: BrokerCountryText): BrokerCountryRule {
  return {
    accepted: parseCountryList(broker.acceptedCountries),
    restricted: parseCountryList(broker.restrictedCountries),
  };
}

export function statusFor(rule: BrokerCountryRule, code: string): CountryStatus {
  if (rule.restricted.codes.has(code)) return 'restricted';
  // Owner rule: a country is allowed unless the broker restricts it. The accepted
  // list no longer gates availability.
  return 'accepted';
}

/** Compact flag used in the page payload: a for accepted, r for restricted, u for unknown. */
const FLAG: Record<CountryStatus, 'a' | 'r' | 'u'> = { accepted: 'a', restricted: 'r', unknown: 'u' };

/** broker key -> country code -> status flag, for the countries the picker offers. */
export function buildStatusTable(
  brokers: BrokerCountryText[],
  countries: Country[],
): Record<string, Record<string, 'a' | 'r' | 'u'>> {
  const table: Record<string, Record<string, 'a' | 'r' | 'u'>> = {};
  for (const broker of brokers) {
    const rule = parseBroker(broker);
    table[broker.key] = {};
    for (const country of countries) table[broker.key][country.code] = FLAG[statusFor(rule, country.code)];
  }
  return table;
}
