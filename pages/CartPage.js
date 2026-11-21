class CartPage {
  constructor(page) { this.page = page; }
  checkoutButton() { return this.page.locator('[data-test="checkout"]'); }
}
module.exports = { CartPage };
