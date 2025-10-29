import { Login } from "../Login.js";

describe('PIM Employee List Test', () => {
    beforeEach(async () => {
        await Login();
    });

    it('Should search for an existing employee in the list', async () => {

        // Navigate to PIM → Employee List
        const pimMenu = await $('//span[text()="PIM"]');
        await expect(pimMenu).toBeDisplayed();
        await pimMenu.click();

        await browser.pause(1000);

        // Enter employee name to search
        const employeeName = await $('input[placeholder="Type for hints..."]');
        await employeeName.setValue('John');
        
        // Click Search
        const searchButton = await $('//button[@type="submit"]');
        await searchButton.click();

        // Wait for results to load
        await browser.pause(2000);

        // Verify result contains the name
        const results = await $$('div.oxd-table-body div.oxd-table-card');
        const firstResultText = await results[0].getText();

        console.log('Search Results:\n', firstResultText);

    await expect(firstResultText).toContain('John');

    });
});
