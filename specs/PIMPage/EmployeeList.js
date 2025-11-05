import { Login } from "../../pageobjects/Login.js";
import { faker } from '@faker-js/faker';

describe('Employee Management Flow', () => {

    let firstName, middleName, lastName;

    it('Should add a new employee and verify they appear in the Employee List', async () => {
        
        await Login();

        const pimMenu = await $('//span[text()="PIM"]');
        await pimMenu.waitForClickable({ timeout: 10000 });
        await pimMenu.click();

        const addEmployeeButton = await $('//button[normalize-space()="Add"]');
        await addEmployeeButton.waitForClickable({ timeout: 10000 });
        await addEmployeeButton.click();

        firstName = faker.person.firstName();
        middleName = faker.person.middleName();
        lastName = faker.person.lastName();
        console.log(`Creating employee: ${firstName} ${middleName} ${lastName}`);

        await $('input[name="firstName"]').setValue(firstName);
        await $('input[name="middleName"]').setValue(middleName);
        await $('input[name="lastName"]').setValue(lastName);

        const saveButton = await $('button[type="submit"]');
        await saveButton.waitForClickable({ timeout: 10000 });
        await saveButton.click();

        const successToast = await $('//p[contains(@class,"oxd-text--toast-message")]');
        await successToast.waitForDisplayed({ timeout: 10000 });
        const toastText = await successToast.getText();
        console.log(`Toast Message: ${toastText}`);
        await expect(toastText).toMatch(/success/i);
    });

    it('Should search for the newly added employee and verify they appear in the list', async () => {
        
        const pimMenu = await $('//span[text()="PIM"]');
        await pimMenu.waitForClickable({ timeout: 10000 });
        await pimMenu.click();

        const employeeNameField = await $('//label[text()="Employee Name"]/ancestor::div[contains(@class,"oxd-input-group")]/descendant::input');
        await employeeNameField.waitForDisplayed({ timeout: 15000 });

        await employeeNameField.clearValue();
        await employeeNameField.setValue(firstName);
        await browser.pause(1000);

        const dropdownOption = await $(`//div[@role="listbox"]//span[text()="${firstName} ${lastName}"]`);
        if (await dropdownOption.isDisplayed()) {
            await dropdownOption.click();
        }

        const searchButton = await $('//button[normalize-space()="Search"]');
        await searchButton.waitForClickable({ timeout: 10000 });
        await searchButton.click();

        const results = await $$('div.oxd-table-body div.oxd-table-card');
        const firstResultText = await results[0].getText();

        console.log('Search Results:\n', firstResultText);

        await expect(firstResultText).toContain(firstName);

        console.log(`Employee "${firstName}" found in search results.`);
    });
});
