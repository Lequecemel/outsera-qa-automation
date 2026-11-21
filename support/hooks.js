
const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

// Define o timeout padrão de 30 segundos
setDefaultTimeout(30 * 1000);

Before(async function () {
  this.browser = await chromium.launch({
    headless: process.env.HEADLESS !== 'false'
  });

  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function (scenario) {
  if (scenario.result?.status === 'FAILED' && this.page) {
    try {
      await this.page.screenshot({
        path: `screenshots/failure-${Date.now()}.png`,
        fullPage: true
      });
    } catch (_) {}
  }

  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();
});