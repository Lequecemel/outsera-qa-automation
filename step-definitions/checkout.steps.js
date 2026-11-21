const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

When('I add the first product to the cart', async function () {
  this.inventoryPage = new InventoryPage(this.page);
  await this.inventoryPage.firstAddButton().click();
  await expect(this.page.locator('.shopping_cart_badge')).toHaveText('1');
});
When('I open the cart and start checkout', async function () {
  await this.inventoryPage.cartLink().click();
  this.cartPage = new CartPage(this.page);
  await this.cartPage.checkoutButton().click();
  this.checkoutPage = new CheckoutPage(this.page);
  await expect(this.checkoutPage.firstName()).toBeVisible();
});
When('I complete checkout with first name {string}, last name {string}, and postal code {string}', async function (first, last, zip) {
  await this.checkoutPage.firstName().fill(first);
  await this.checkoutPage.lastName().fill(last);
  await this.checkoutPage.postalCode().fill(zip);
  await this.checkoutPage.continueButton().click();
});
When('I continue and finish the order', async function () {
  await expect(this.page.locator('.summary_info')).toBeVisible();
  await this.checkoutPage.finishButton().click();
});
Then('I should see the order confirmation', async function () {
  await expect(this.checkoutPage.confirmation()).toHaveText('Thank you for your order!');
});
When('I submit checkout with blank customer information', async function () {
  await this.checkoutPage.continueButton().click();
});
Then('I should see a checkout validation error', async function () {
  await expect(this.checkoutPage.errorMessage()).toBeVisible();
  await expect(this.checkoutPage.errorMessage()).toContainText('First Name is required');
});
