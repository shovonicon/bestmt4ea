import { defineConfig, devices } from '@playwright/test';

/**
 * Browser + accessibility tests.
 *
 * These run against the production build served from `dist/`, not the dev
 * server, so what is tested is what ships. Two viewports are covered: desktop
 * (1440×1100) and mobile (390×844).
 *
 * The web server is `scripts/serve-dist.mjs` rather than `astro preview`, which
 * did not bind reliably here; the script applies the same trailing-slash and
 * 404 rules the site uses.
 *
 * `npm run test:e2e` starts the server itself; the release gate has already run
 * the build by the time it reaches this step.
 */

const PORT = 4322;
const BASE_URL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['list']],
  use: {
    baseURL: BASE_URL,
    trace: 'off',
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 1100 } },
    },
    {
      name: 'mobile',
      use: { ...devices['Pixel 5'], viewport: { width: 390, height: 844 } },
    },
  ],
  webServer: {
    command: `node scripts/serve-dist.mjs --port ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
