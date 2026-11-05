#!/usr/bin/env node
/**
 * Broker country lists gate.
 *
 * `src/data/brokers.json` keeps accepted and restricted countries as free text, and
 * `src/lib/brokerCountry.ts` turns it into the per-country status the brokers page
 * shows. This check keeps the two honest:
 *
 *   FAIL  a word in the text that brokerCountry.ts cannot map. An unmapped word
 *         would silently drop a restriction, so a country the broker excludes could
 *         be shown as available.
 *   WARN  the lists have never been checked against the brokers' own terms, or the
 *         last check is older than 45 days. The monthly check is described in
 *         docs/BROKER-COUNTRY-CHECK.md and is what sets the date.
 *
 * Usage: node scripts/check-broker-countries.mjs
 */

import { readFileSync } from 'node:fs';
import { parseBroker } from '../src/lib/brokerCountry.ts';

const STALE_AFTER_DAYS = 45;

const brokers = JSON.parse(readFileSync('src/data/brokers.json', 'utf8')).brokers ?? [];
const verification = JSON.parse(readFileSync('src/data/site-verification.json', 'utf8'));
const verifiedAt = verification.brokerCountriesVerifiedAt ?? null;

const problems = [];
let withCountries = 0;
for (const broker of brokers) {
  if (broker.acceptedCountries == null && broker.restrictedCountries == null) {
    problems.push(`${broker.key}: no accepted or restricted country text at all`);
    continue;
  }
  withCountries++;
  try {
    parseBroker(broker);
  } catch (error) {
    problems.push(`${broker.key}: ${error.message}`);
  }
}

if (problems.length) {
  console.error(`check-broker-countries FAIL: ${problems.length} problem(s)`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}

console.log(`check-broker-countries PASS: ${withCountries} broker(s), every country word maps.`);

if (!verifiedAt) {
  console.warn(
    '  WARN: brokerCountriesVerifiedAt is null. The lists have not been checked against the brokers\' own terms, and the page says so. See docs/BROKER-COUNTRY-CHECK.md.',
  );
} else {
  const days = Math.floor((Date.now() - new Date(verifiedAt).getTime()) / 86_400_000);
  if (days > STALE_AFTER_DAYS) {
    console.warn(`  WARN: the country lists were last checked ${days} days ago (${verifiedAt}). The monthly check is overdue.`);
  } else {
    console.log(`  Country lists last checked ${verifiedAt} (${days} days ago).`);
  }
}
