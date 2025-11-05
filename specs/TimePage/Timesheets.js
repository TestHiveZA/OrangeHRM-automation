import { Login } from "../../pageobjects/Login.js";

describe("Timesheets Page Tests", () => {
    before(async () => {
        await Login();
    });

    it("should navigate to Timesheets page - FUNCTIONALITY", async () => {
        const timeButton = await $('span=Time');
        await expect(timeButton).toBeDisplayed();
        await timeButton.click();

        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('time/viewEmployeeTimesheet'),
            {
                timeout: 5000,
                timeoutMsg: "Expected to be on the Timesheets page after clicking Time button",
            }
        );

        const selectEmployeeLabel = await $('h6=Select Employee');
        await expect(selectEmployeeLabel).toBeDisplayed();

        const timesheetsPendingLabel = await $('h6=Timesheets Pending Action');
        await expect(timesheetsPendingLabel).toBeDisplayed();

    });

    it("Verify the Employee Name field is required - UI", async () => {
        const viewButton = await $('button=View');
        await viewButton.click();

        const errorMessage = await $('span=Required');
        await expect(errorMessage).toBeDisplayed();
    });

    it("Verify user can view Timesheet for a specific employee - FUNCTIONALITY", async () => { 
        const searchInput = await $('input[placeholder="Type for hints..."]');
        await searchInput.setValue('Jo');

        //select first option from the dropdown
        const optionsListSelector = '.oxd-autocomplete-option';

        //wait until the first span element within the options list is displayed+        await browser.waitUntil(async () => {
        await browser.waitUntil(async () => {
            const firstOptionSpan = await $(`${optionsListSelector} span`);
            return firstOptionSpan.isExisting() && await firstOptionSpan.isDisplayed();
        }, { 
            timeout: 5000, 
            timeoutMsg: `Expected a span option within "${optionsListSelector}" to be displayed after 5s` 
        });

        //once we know it exists, click the first span element in the list.
        const firstOptionSpan = await $(`${optionsListSelector} span`);
        await firstOptionSpan.click();

        //console.log(`Successfully selected the first option: ${await searchInput.getValue()}`);

        const viewButton = await $('button=View');
        await viewButton.click();

        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('time/viewTimesheet/employeeId'),
            {
                timeout: 5000,
                timeoutMsg: "Expected to be on the selected Employee Timesheet page after clicking View button",
            }
        );
    });
});