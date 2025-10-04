import { Page } from '@playwright/test';

export class SignupPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://parabank.parasoft.com/parabank/register.htm');
  }

  async fillForm(user: { firstName: string; lastName: string; address: string; city: string; state: string; zipCode: string; phone: string; ssn: string; username: string; password: string; }) {
    await this.page.fill('input[name="customer.firstName"]', user.firstName);
    await this.page.fill('input[name="customer.lastName"]', user.lastName);
    await this.page.fill('input[name="customer.address.street"]', user.address);
    await this.page.fill('input[name="customer.address.city"]', user.city);
    await this.page.fill('input[name="customer.address.state"]', user.state);
    await this.page.fill('input[name="customer.address.zipCode"]', user.zipCode);
    await this.page.fill('input[name="customer.phoneNumber"]', user.phone);
    await this.page.fill('input[name="customer.ssn"]', user.ssn);
    await this.page.fill('input[name="customer.username"]', user.username);
    await this.page.fill('input[name="customer.password"]', user.password);
    await this.page.fill('input[name="repeatedPassword"]', user.password);
  }

  async submit() {
    await this.page.click('input[value="Register"]');
  }
}
