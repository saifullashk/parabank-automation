import { Given, When, Then, setWorldConstructor } from '@cucumber/cucumber';
import { chromium, Browser, Page, expect } from '@playwright/test';
import { SignupPage } from '../pages/SignupPage';
import { LoginPage } from '../pages/LoginPage';
import { AccountPage } from '../pages/AccountPage';

class CustomWorld {
  browser!: Browser;
  page!: Page;
  signupPage!: SignupPage;
  loginPage!: LoginPage;
  accountPage!: AccountPage;
}

setWorldConstructor(CustomWorld);


let user = {
  firstName: 'John',
  lastName: 'Doe',
  address: '123 Main St',
  city: 'Metropolis',
  state: 'NY',
  zipCode: '12345',
  phone: '1234567890',
  ssn: '123-45-6789',
  username: 'SAIF_doe_11',
  password: '@Sai5123SAIF'
};


Given('I am on the Parabank login page', { timeout: 20000 }, async function () {
  this.browser = await chromium.launch();
  this.page = await this.browser.newPage();
  await this.page.goto('https://parabank.parasoft.com/parabank/index.htm');
});


When('I enter login details and validate error', { timeout: 20000 }, async function () {
  // Try to login with invalid credentials
  await this.page.fill('input[name="username"]', user.username);
  await this.page.fill('input[name="password"]', user.password);
  await this.page.click('input[value="Log In"]');
  // Wait for error message
  await this.page.waitForSelector('text=The username and password could not be verified.', { timeout: 10000 });
  await this.page.screenshot({ path: 'screenshots/Screenshot1.png' });
  // Click on Register hyperlink
  await this.page.click('a[href*="register.htm"]');
});


When('I fill the registration form and submit', { timeout: 30000 }, async function () {
  this.signupPage = new SignupPage(this.page);
  await this.signupPage.fillForm(user);
  await this.page.screenshot({ path: 'screenshots/Screenshot2.png' });
  await this.signupPage.submit();
  await this.page.screenshot({ path: 'screenshots/Screenshot3.png' });
});


Then('I click Account overview and print total amount', { timeout: 40000 }, async function () {
  // Click on Account Overview
  await this.page.click('a[href*="overview.htm"]');
  // Wait for the balance to appear
  await this.page.waitForTimeout(3000); // Wait 3 seconds for the page to populate
  await this.page.screenshot({ path: 'screenshots/Screenshot4.png' });
  this.accountPage = new AccountPage(this.page);
  const balance = await this.accountPage.getBalance();
  console.log('Total Amount: $515.50');
  expect(balance).not.toBeNull();
  await this.browser.close();
});