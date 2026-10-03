import { defineConfig, devices } from '@playwright/test';

/**
 * Browser + accessibility tests.
 *
 * These run against the production build served from `dist/`, not the dev
 * server, so what is tested is what ships. Two viewports are covered: desktop
 * (1440×1100) and mobile (390×844).
 *
 * The web server is the real Worker (`wrangler dev`). The build now has
 * on-demand routes (product pages, /login, /dashboard, /admin) that a static
 * `dist/` server cannot serve, so the tests run against the Worker. `astro
 * preview` did not bind reliably here; `wrangler dev` serves the built assets
 * and the on-demand routes exactly as production does.
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
    command: `npx wrangler dev --port ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
