import { Login } from "../../pageobjects/Login.js";

describe("Timesheets Page Tests", () => {
    beforeEach(async () => {
        await Login();
    });

    it("should navigate to Timesheets page", async () => {
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
});