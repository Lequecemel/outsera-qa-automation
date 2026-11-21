const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');

Given('I open the Sauce Demo login page', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.open();
});
When('I log in with valid credentials', async function () {
  await this.loginPage.login(process.env.E2E_USERNAME || 'standard_user', process.env.E2E_PASSWORD || 'secret_sauce');
});
When('I log in with username {string} and password {string}', async function (username, password) {
  await this.loginPage.login(username, password);
});
When('I submit the login form without credentials', async function () {
  await this.page.locator('#login-button').click();
});
Then('I should see the inventory page', async function () {
  this.inventoryPage = new InventoryPage(this.page);
  await expect(this.inventoryPage.title()).toHaveText('Products');
  await expect(this.page).toHaveURL(/inventory.html/);
});
Then('I should see a login error', async function () {
  await expect(this.loginPage.errorMessage()).toBeVisible();
});
Given('I am logged in to Sauce Demo', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.open();
  await this.loginPage.login(process.env.E2E_USERNAME || 'standard_user', process.env.E2E_PASSWORD || 'secret_sauce');
  await expect(this.page).toHaveURL(/inventory.html/);
  this.inventoryPage = new InventoryPage(this.page);
});
