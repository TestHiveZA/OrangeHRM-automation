import { Login } from "../Login.js";

describe("Timesheets Page Tests", () => {
    beforeEach(async () => {
        await Login();
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('dashboard/index'),
            {
                timeout: 5000,
                timeoutMsg: "Expected to be on the OrangeHRM dashboard after login",
            }
        );
    });

    it("should navigate to Timesheets page", async () => {
        const timeButton = await $('span=Time');
        await expect(timeButton).toBeDisplayed();
        await timeButton.click();

    });
});