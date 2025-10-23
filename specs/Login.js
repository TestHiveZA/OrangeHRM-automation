import dotenv from 'dotenv';
dotenv.config({ override: true });

export const Login = async () => {
  await browser.maximizeWindow();
  await browser.url("https://opensource-demo.orangehrmlive.com/");
  console.log("Using username:", process.env.USERNAME);
  console.log("Using password:", process.env.PASSWORD);

  const usernameInput = await $('//input[@name="username"]'); 
  await usernameInput.waitForDisplayed();
  await usernameInput.setValue(process.env.USERNAME);

  const passwordInput = await $('//input[@name="password"]');
  await passwordInput.waitForDisplayed();
  await passwordInput.setValue(process.env.PASSWORD);

  const loginBtn = await $('//button[@type="submit"]');
  await loginBtn.click();
  await browser.waitUntil(
    async () => (await browser.getUrl()).includes('dashboard'),
    {
      timeout: 5000,
      timeoutMsg: 'Expected URL to include OrangeHRM dashboard after login'
    }
  );
};
