import { defineConfig } from "@playwright/test";

const port = Number(process.env.PLAYWRIGHT_PORT || 3100);
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 2,
  retries: 0,
  timeout: 90000,
  use: { baseURL, trace: "retain-on-failure" },
  webServer: {
    command: `npm start -- --port ${port}`,
    url: `${baseURL}/fr`,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
