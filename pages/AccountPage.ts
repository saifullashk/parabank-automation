import { Page } from '@playwright/test';

export class AccountPage {
  constructor(private page: Page) {}

async getBalance() {
  // Try a more specific selector or wait for the element
    // Take a screenshot for debugging
    //await this.page.screenshot({ path: 'screenshots/after-login.png' });
    // Print all visible text on the page for inspection
    const allTexts = await this.page.$$eval('*', nodes => nodes.map(n => n.textContent));
    console.log('All page texts:', allTexts);
    // Try a few common selectors for balance
    const selectors = ['#accountBalance', '.balance', '.smallText'];
    for (const selector of selectors) {
      try {
        await this.page.waitForSelector(selector, { timeout: 5000 });
        const balance = await this.page.textContent(selector);
        if (balance) {
          console.log(`Found balance with selector ${selector}:`, balance);
          return balance;
        }
      } catch (e) {
        // Ignore and try next selector
      }
    }
    throw new Error('Account balance element not found. Please check the selector.');
}
}
