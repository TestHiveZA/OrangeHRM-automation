import { Login } from "../../pageobjects/Login.js";

describe('Employee List Test', async() => {
    beforeEach(async () => {
        await Login();
    });

    it('Should search for an existing employee in the list', async () => {

        // Navigate to PIM → Employee List
        const pimMenu = await $('//span[text()="PIM"]');
        await expect(pimMenu).toBeDisplayed();
        await pimMenu.click();

        await pimMenu.waitForDisplayed({ timeout: 5000 });

        // Enter employee name to search
        const employeeName = await $('input[placeholder="Type for hints..."]');
        await employeeName.waitForDisplayed({ timeout: 20000 }); // wait up to 20s
        await employeeName.clearValue();
        await employeeName.setValue('Penelope');
        
        // Click Search
        const searchButton = await $('//button[@type="submit"]');
        await searchButton.click();

        // Wait for results to load
        await browser.waitUntil(async () => {
            const results = await $$('div.oxd-table-body div.oxd-table-card');
            return results.length > 0;
        }, { timeout: 10000, timeoutMsg: 'Expected search results to load within 10s' });

        // Verify result contains the name
        const results = await $$('div.oxd-table-body div.oxd-table-card');
        const firstResultText = await results[0].getText();

        console.log('Search Results:\n', firstResultText);

       await expect(firstResultText).toContain('Penelope');

    });
});
