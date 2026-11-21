const { defineConfig } = require('@playwright/test');
require('dotenv').config();

module.exports = defineConfig({
  testDir: './tests/api',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { outputFolder: 'reports/api-html', open: 'never' }], ['json', { outputFile: 'reports/api-results.json' }]],
  use: { baseURL: process.env.API_BASE_URL || 'https://restful-booker.herokuapp.com' }
});
