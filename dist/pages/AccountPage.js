export class AccountPage {
    constructor(page) {
        this.page = page;
    }
    async getBalance() {
        return await this.page.textContent('.smallText'); // Adjust selector as needed
    }
}
