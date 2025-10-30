import { Login } from "../../pageobjects/Login.js";

describe('Employee List Test', () => {
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
        const employeeName = await $('#app > div.oxd-layout.orangehrm-upgrade-layout > div.oxd-layout-container > div.oxd-layout-context > div > div.oxd-table-filter > div.oxd-table-filter-area > form > div.oxd-form-row > div > div:nth-child(1) > div > div:nth-child(2) > div > div > input');
        await employeeName.waitForDisplayed({ timeout: 20000 }); // wait up to 20s
        await employeeName.clearValue();
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
