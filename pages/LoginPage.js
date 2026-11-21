class LoginPage {
  constructor(page) { this.page = page; }
  async open() { await this.page.goto(process.env.E2E_BASE_URL || 'https://www.saucedemo.com'); }
  async login(username, password) {
    return this.page.locator('#user-name').fill(username)
      .then(() => this.page.locator('#password').fill(password))
      .then(() => this.page.locator('#login-button').click());
  }
  errorMessage() { return this.page.locator('[data-test="error"]'); }
}
module.exports = { LoginPage };
