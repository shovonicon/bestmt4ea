# Monthly check of the broker country lists

The brokers page (`/best-forex-brokers/`) tells a visitor which brokers list their
country as available, which restrict it, and which do not say. That comes from the
free text in `src/data/brokers.json` (`acceptedCountries`, `restrictedCountries`),
turned into statuses by `src/lib/brokerCountry.ts`.

A restriction list is a compliance statement, so it must not go stale. This is the
procedure for the monthly check (owner decision, 2026-11-05: once a month, by AI).

## What to do

For **each** broker in `brokers.json`:

1. Open the broker's **own** terms: its "restricted jurisdictions", "countries we do
   not accept", "regulation" or "legal documents" page. Use the broker's site, not a
   review site or an affiliate page.
2. Compare it with `restrictedCountries` and `acceptedCountries`.
3. If they differ, update the text in `brokers.json`. Use only words the normaliser
   knows (see `COUNTRY_ALIASES`, `REGION_ALIASES` and `WORLDWIDE` in
   `src/lib/brokerCountry.ts`). If the broker names a country or region that is not
   there, add it to the alias table **and** add a test in
   `tests/broker-country.test.ts`.
4. When a broker's page cannot be read, leave its text unchanged and write the broker
   down as **not checked** in the log below. Do not guess.

## Rules that matter

- **Restricted wins.** A country named as restricted is shown as restricted even when
  a wider accepted region would include it.
- **Doubt falls to "check with the broker".** If a region's edge is arguable, leave the
  country out of the region.
- **Never set the date without doing the check.** `brokerCountriesVerifiedAt` in
  `src/data/site-verification.json` is shown on the page ("Country lists last checked
  …"). Set it to the check date only when **every** broker was checked. If any broker
  was not, leave the date as it was.

## Then verify

```bash
npm test                     # unit tests, including every word in brokers.json
node scripts/check-broker-countries.mjs
npm run build
```

`check-broker-countries` fails the release on a word the normaliser cannot map, and
warns when the date is missing or older than 45 days.

## Prompt for the scheduled run

> Run the monthly broker country check described in `docs/BROKER-COUNTRY-CHECK.md`.
> For every broker in `src/data/brokers.json`, read the broker's own restricted-country
> terms, update `acceptedCountries` and `restrictedCountries` where they differ, keep to
> the aliases in `src/lib/brokerCountry.ts` (add an alias and a test for anything new),
> and set `brokerCountriesVerifiedAt` only if every broker was checked. Run `npm test`,
> `node scripts/check-broker-countries.mjs` and `npm run build`. Do not commit or deploy.
> Report what changed, which brokers could not be read, and what needs a human decision.

## Log

| Date | Checked by | Result |
| --- | --- | --- |
| 2026-11-05 | Not yet checked | Lists were normalised from the existing text. No broker's own terms have been re-read. |
