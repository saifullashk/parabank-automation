export class LoginPage {
    constructor(page) {
        this.page = page;
    }
    async goto() {
        await this.page.goto('https://parabank.parasoft.com/parabank/index.htm');
    }
    async login(username, password) {
        await this.page.fill('input[name="username"]', username);
        await this.page.fill('input[name="password"]', password);
        await this.page.click('input[value="Log In"]');
    }
}
