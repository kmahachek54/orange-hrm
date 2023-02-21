import { test } from '@playwright/test';

test.describe('Create vacancies', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.BASEURL}/web/index.php/recruitment/addJobVacancy`);
  });

  test('should add new vacancy filled all fields', async ({ page }) => {
  });

  test('should add new vacancy filled required fields', async ({ page }) => {
  });

  test('should add new vacancy inactive', async ({ page }) => {
  });

  test('should not add new vacancy on aborting', async ({ page }) => {
  });

  test('should not add new vacancy with empty required fields', async ({ page }) => {
  });

  test('should not add new vacancy with blocked request', async ({ page }) => {
  });
});

test.describe('Edit vacancies', () => {

  test.beforeEach(async ({ page }) => {
    let vacancyID: any; // Add vacancy via API
    await page.goto(`${process.env.BASEURL}/web/index.php/recruitment/addJobVacancy/${vacancyID}`);
  });

  test.afterEach(async () => {
    // Delete vacancy via API
  });

  test('should edit vacancy change required fields', async ({ page }) => {
  });

  test('should edit vacancy change status', async ({ page }) => {
  });

  test('should not edit vacancy on aborting', async ({ page }) => {
  });

  test('should not edit vacancy with empty required fields', async ({ page }) => {
  });

  test('should not edit vacancy with blocked request', async ({ page }) => {
  });
});

test.describe('Attachments', () => {

  test.beforeEach(async ({ page }) => {
    let vacancyID: any; // Add vacancy with attachments via API
    await page.goto(`${process.env.BASEURL}/web/index.php/recruitment/addJobVacancy/${vacancyID}`);
  });

  test.afterEach(async () => {
    // Delete vacancy via API
  });

  test('should add attachment with comment', async ({ page }) => {
  });

  test('should not add attachment on aborting', async ({ page }) => {
  });

  test('should not add attachment with no file', async ({ page }) => {
  });

  test('should not add attachment with blocked request', async ({ page }) => {
  });

  test('should download attachment from table', async ({ page }) => {
  });

  test('should download attachment from edit', async ({ page }) => {
  });

  test('should edit attachment replace file', async ({ page }) => {
  });

  test('should edit attachment change comment', async ({ page }) => {
  });

  test('should not edit attachment on aborting', async ({ page }) => {
  });

  test('should not edit attachment with no file', async ({ page }) => {
  });

  test('should not edit attachment with blocked request', async ({ page }) => {
  });

  test('should delete single attachment', async ({ page }) => {
  });

  test('should not delete attachment on aborting', async ({ page }) => {
  });

  test('should not delete attachment with blocked request', async ({ page }) => {
  });

  test('should delete selected attachments via bulk', async ({ page }) => {
  });

  test('should delete all attachments via bulk', async ({ page }) => {
  });
});

test.describe('ListActions', () => {
  test.beforeAll(async () => {
    // Delete all vacancies via API
    // Add vacancies via API
  });

  test.afterAll(async () => {
    // Delete all vacancies via API
  });

  test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.BASEURL}/web/index.php/recruitment/viewJobVacancy`);
  });

  test('should open add vacancy page via add button', async ({ page }) => {
  });
  
  test('should open edit vacancy page via edit button', async ({ page }) => {
  });

  test('should not preserve previous filters on open', async ({ page }) => {
  });

  test('should preserve selected filters after search', async ({ page }) => {
  });

  test('should remove selected filters on reset', async ({ page }) => {
  });

  test('should show filtered vacancies by status', async ({ page }) => {
  });

  test('should show filtered vacancies by manager title', async ({ page }) => {
  });

  test('should show all vacancies with no filters', async ({ page }) => {
  });

  test('should show sorted vacancies asc', async ({ page }) => {
  });

  test('should show sorted vacancies desc', async ({ page }) => {
  });

  test('should delete single vacancy', async ({ page }) => {
  });

  test('should not delete vacancy on aborting', async ({ page }) => {
  });

  test('should not delete vacancy with blocked request', async ({ page }) => {
  });

  test('should delete selected vacancies via bulk', async ({ page }) => {
  });

  test('should delete all vacancies via bulk', async ({ page }) => {
  });
});
