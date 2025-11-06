import { Login } from "../../pageobjects/Login.js";
import { faker } from '@faker-js/faker';

describe('Employee List Tests', () => {
    
    let firstName, middleName, lastName;

    it('Should add a new employee', async () => {

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

    const employeeName = await $('//label[text()="Employee Name"]/ancestor::div[contains(@class,"oxd-input-group")]/descendant::input');
    await employeeName.waitForDisplayed({ timeout: 10000 });

    await employeeName.clearValue();
    await employeeName.setValue(lastName);

    await browser.waitUntil(async () => {
        const suggestions = await $$('//div[@role="listbox"]//span');
        return suggestions.length > 0;
    }, { timeout: 5000, timeoutMsg: 'No autocomplete suggestions appeared' });

    const suggestion = await $(`//div[@role="listbox"]//span[contains(translate(text(), "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "${firstName.toLowerCase()}")]`);
    if (await suggestion.isDisplayed()) {
        await suggestion.click();
    }

    const searchButton = await $('//button[normalize-space()="Search"]');
    await searchButton.waitForClickable({ timeout: 10000 });
    await searchButton.click();

    await browser.waitUntil(async () => {
        const rows = await $$('//div[@role="row" and not(contains(@class,"header"))]');
        return rows.length > 0;
    }, { timeout: 15000, timeoutMsg: 'No employee search results loaded.' });

    const resultNameCell = await $(`//div[@role="cell"]//div[contains(., "${firstName}")]`);
    await resultNameCell.waitForDisplayed({ timeout: 15000 });

    const textValue = await resultNameCell.getText();
    console.log('Found name cell text:', textValue);

    expect(textValue).toContain(firstName);
    if (middleName) {
        expect(textValue).toContain(middleName);
    }

    console.log(` Employee "${firstName} ${middleName}" found successfully in search results.`);
});
});
