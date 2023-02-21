import { test, expect } from '@playwright/test';
import { Candidates } from '../../pages/Candidates';

let candidate: Candidates;
const ts = new Date();

test.beforeEach(async ({ page }) => {
  candidate = new Candidates(page);
  await page.goto(`${process.env.BASEURL}`);
  await page.getByRole('link', { name: 'Recruitment' }).click();
  await expect(page,
    `Proper redirect is not occured after clicking Recruitment menu.`
  ).toHaveURL(`${process.env.BASEURL}/web/index.php/recruitment/viewCandidates`);
  await candidate.addButton.click();
  await expect(page,
    `Proper redirect is not occured after clicking Add button.`
  ).toHaveURL(`${process.env.BASEURL}/web/index.php/recruitment/addCandidate`);
});

test('should add new candidate filled required fields', async ({ page }) => {
  const randPerson = candidate.createRandomPerson();
  await candidate.firstNameInput.fill(randPerson.firstName);
  await candidate.lastNameInput.fill(randPerson.lastName);
  await candidate.emailInput.fill(randPerson.email);
  await candidate.saveButton.click();
  await expect(candidate.successAssert,
    `Success assert is not shown after creating: ${JSON.stringify(randPerson)}.`
  ).toBeVisible();
  await expect(page,
    `Proper redirect is not occured after creating: ${JSON.stringify(randPerson)}.`
  ).toHaveURL(new RegExp(`${process.env.BASEURL}/web/index.php/recruitment/addCandidate/[0-9]+`));
  await page.goto(`${process.env.BASEURL}/web/index.php/recruitment/viewCandidates`);
  await expect.poll(async () => {
    return await candidate.candidateList.count();
  },
    `Candidates list is empty after creating: ${JSON.stringify(randPerson)}.`
  ).toBeGreaterThan(0);
  expect(await candidate.getAllCandidates(),
    `Candidate data is incorrect after creating: ${JSON.stringify(randPerson)}.`
  ).toContainEqual({
    vacancy: '',
    candidate: `${randPerson.firstName}  ${randPerson.lastName}`,
    manager: '',
    date: `${ts.toISOString().split('T')[0]}`,
    status: '',
  });
});

test('should not add new candidate with blocked request', async ({ page }) => {
  const randPerson = candidate.createRandomPerson();
  await candidate.firstNameInput.fill(randPerson.firstName);
  await candidate.lastNameInput.fill(randPerson.lastName);
  await candidate.emailInput.fill(randPerson.email);
  await page.route('**/recruitment/candidates', route => {
    route.abort();
  });
  await candidate.saveButton.click();
  await expect(candidate.errorAssert,
    `Error assert is not shown after creating: ${JSON.stringify(randPerson)} with blocked: **/recruitment/candidates.`
  ).toBeVisible();
  await expect(page,
    `Url is not preserved after creating: ${JSON.stringify(randPerson)} with blocked: **/recruitment/candidates.`
  ).toHaveURL(`${process.env.BASEURL}/web/index.php/recruitment/addCandidate`);
  await expect(candidate.loader,
    `Loader is not shown after creating: ${JSON.stringify(randPerson)} with blocked: **/recruitment/candidates.`
  ).toBeVisible();
  await page.unroute('**/recruitment/candidates');
  await page.goto(`${process.env.BASEURL}/web/index.php/recruitment/viewCandidates`);
  await expect.poll(async () => {
    return await candidate.getAllCandidates();
  },
    `Candidates list is empty after creating: ${JSON.stringify(randPerson)}.`
  ).not.toContain({
    vacancy: '',
    candidate: `${randPerson.firstName}  ${randPerson.lastName}`,
    manager: '',
    date: `${ts.toISOString().split('T')[0]}`,
    status: '',
  });
});
