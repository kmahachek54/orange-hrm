import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Read from default ".env" file.
dotenv.config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: +process.env.TEST_TIMEOUT || 30000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: +process.env.EXPECT_TIMEOUT || 5000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: +process.env.RETRIES || 0,
  /* Opt out of parallel tests on CI. */
  workers: +process.env.WORKERS || 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Global setup file must export a single function. This function will be run once before all the tests */
  globalSetup: require.resolve('./globalSetup'),
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    storageState: path.join(process.cwd(), 'auth/storageState.json'),
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: +process.env.ACTION_TIMEOUT || 30000,
    /* Collect screenshot after each test failure. See https://playwright.dev/docs/test-configuration#automatic-screenshots */
    screenshot: 'only-on-failure',
    /* Record video only when retrying a test for the first time. See https://playwright.dev/docs/test-configuration#automatic-screenshots */
    video: 'on-first-retry',
    /* Run in headless mode by default (if process.env.HEADLESS is not specified) */
    headless: !process.env.HEADLESS || process.env.HEADLESS === 'true' ? true : false,
    /* Slow down Playwright operations by the specified amount of milliseconds */
    launchOptions: {
      slowMo: +process.env.SLOWMO || 0,
    },
    /* Configure projects for major browsers */
    projects: [
      {
        name: 'chromium',
        use: { ...devices['Desktop Chrome'] },
      },
      // {
      //   name: 'firefox',
      //   use: { ...devices['Desktop Firefox'] },
      // },

      // {
      //   name: 'webkit',
      //   use: { ...devices['Desktop Safari'] },
      // },
    ],
  }
});
