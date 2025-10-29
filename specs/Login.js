import dotenv from 'dotenv';
dotenv.config({ debug: false });

export const Login = async () => {
  const username = process.env.ORANGEHRM_USERNAME;
  const password = process.env.ORANGEHRM_PASSWORD;
  
  if (!username || !password) {
    throw new Error(
      `Missing credentials!\n` +
      `Username exists: ${!!username}\n` +
      `Password exists: ${!!password}\n` +
      `Available env vars: ${Object.keys(process.env).filter(k => k.includes('ORANGE')).join(', ') || 'none'}`
    );
  }

  await browser.maximizeWindow();
  await browser.url("https://opensource-demo.orangehrmlive.com/");

  const usernameInput = await $('//input[@name="username"]'); 
  await usernameInput.waitForDisplayed();
  await usernameInput.clearValue();
  await usernameInput.setValue(username);

  const passwordInput = await $('//input[@name="password"]');
  await passwordInput.waitForDisplayed();
  await passwordInput.clearValue();
  await passwordInput.setValue(password);

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

