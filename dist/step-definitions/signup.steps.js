import { Given, When, Then } from '@cucumber/cucumber';
import { SignupPage } from '../pages/SignupPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { AccountPage } from '../pages/AccountPage.js';
import { expect } from '@playwright/test';
let user = {
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main St',
    city: 'Metropolis',
    state: 'NY',
    zipCode: '12345',
    phone: '1234567890',
    ssn: '123-45-6789',
    username: 'john_doe_' + Date.now(),
    password: 'Password123'
};
Given('I am on the Parabank sign up page', async function () {
    this.signupPage = new SignupPage(this.page);
    await this.signupPage.goto();
});
When('I create a new account with valid details', async function () {
    await this.signupPage.fillForm(user);
    await this.signupPage.submit();
});
When('I log in with the new account', async function () {
    this.loginPage = new LoginPage(this.page);
    await this.loginPage.goto();
    await this.loginPage.login(user.username, user.password);
});
Then('I should see my account balance and print it', async function () {
    this.accountPage = new AccountPage(this.page);
    const balance = await this.accountPage.getBalance();
    console.log('Account Balance:', balance);
    expect(balance).not.toBeNull();
});
