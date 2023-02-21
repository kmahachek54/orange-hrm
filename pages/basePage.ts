import type { Page, Locator } from '@playwright/test';

// Here we can define some locators and methods that are common for the other pages
export class BasePage {
  readonly page: Page;

  readonly errorAssert: Locator;

  readonly successAssert: Locator;

  readonly loader: Locator;

  constructor(page: Page) {
    this.page = page;

    this.errorAssert = this.page.locator('div.oxd-toast--error');

    this.successAssert = this.page.locator('div.oxd-toast--success');

    this.loader = this.page.locator('div.oxd-form-loader');
  }
}
