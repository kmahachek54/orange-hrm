import { BasePage } from './basePage';
import type { RandPerson, Candidate } from './types';
import { faker } from '@faker-js/faker';

export class Candidates extends BasePage {

  // Rand candidate

  createRandomPerson(): RandPerson {
    return {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
    };
  }

  // Add candidate

  firstNameInput = this.page.getByPlaceholder('First Name');

  lastNameInput = this.page.getByPlaceholder('Last Name');

  emailInput = this.page.locator('div.oxd-input-group').filter({ hasText: 'Email' }).getByPlaceholder('Type here');

  saveButton = this.page.getByRole('button', { name: 'Save' });

  // Candidate list

  addButton = this.page.getByRole('button', { name: 'Add' });

  candidateList = this.page.locator('div.oxd-table-body').getByRole('row');

  async getAllCandidates(): Promise<Candidate[]> {
    const candidatesArray: Candidate[] = [];
    const count = await this.candidateList.count();
    for (let i = 0; i < count; ++i) {
      const [vacancy, candidate, manager, date, status] = await this.candidateList
        .nth(i)
        .locator('div[role=cell]:not(:first-child):not(:last-child)')
        .allTextContents();
      candidatesArray.push({ vacancy, candidate, manager, date, status });
    }
    return candidatesArray;
  }
}
