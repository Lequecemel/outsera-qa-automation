class CheckoutPage {
  constructor(page) { this.page = page; }
  firstName() { return this.page.locator('[data-test="firstName"]'); }
  lastName() { return this.page.locator('[data-test="lastName"]'); }
  postalCode() { return this.page.locator('[data-test="postalCode"]'); }
  continueButton() { return this.page.locator('[data-test="continue"]'); }
  finishButton() { return this.page.locator('[data-test="finish"]'); }
  errorMessage() { return this.page.locator('[data-test="error"]'); }
  confirmation() { return this.page.locator('.complete-header'); }
}
module.exports = { CheckoutPage };
