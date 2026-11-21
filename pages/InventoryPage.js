class InventoryPage {
  constructor(page) { this.page = page; }
  title() { return this.page.locator('.title'); }
  firstAddButton() { return this.page.locator('.inventory_item').first().locator('button'); }
  cartLink() { return this.page.locator('.shopping_cart_link'); }
}
module.exports = { InventoryPage };
