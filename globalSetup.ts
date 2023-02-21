import fs from 'fs';
import path from 'path';
import { chromium } from '@playwright/test';

export default async function globalSetup(): Promise<void> {
    // Remove custom sub-folders for test artifacts except auth folder
    const resultsFolder = path.join(process.cwd(), 'results/');
    if (fs.existsSync(resultsFolder)) {
        fs.rmSync(resultsFolder, { recursive: true, force: true });
    }
    // Invoke auth state
    let storageFile = path.join(process.cwd(), `auth/storageState.json`);

    if (!process.env.BASEURL) {
        throw new Error('Set BASEURL variable is not defined. Please set it in the .env file.');
    }

    // Launch browser and log in if storageState.json does not exist OR auth expires soon
    const currentTS = new Date().getTime();
    if (!fs.existsSync(storageFile)) {
        const browser = await chromium.launch({ headless: false }); // { headless: false }
        const context = await browser.newContext({ ignoreHTTPSErrors: true });
        const page = await context.newPage();
        try {
            await page.goto(process.env.BASEURL);
            await page.getByPlaceholder('Username').fill(process.env.USERNAME);
            await page.getByPlaceholder('Password').fill(process.env.PASSWORD);
            await page.getByRole('button', { name: 'Login' }).click();
            await page.waitForURL(/dashboard/);
            await page.context().storageState({ path: storageFile });
        } catch (e) {
            console.log(e);
            throw new Error('Error occurred while running globalSetup.ts file.');
        } finally {
            await browser.close();
        }
    }
}