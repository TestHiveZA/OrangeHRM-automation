import dotenv from 'dotenv';
dotenv.config({ override: true });

export const Login = async () => {
  const username = String(process.env.ORANGEHRM_USERNAME ?? process.env.USERNAME ?? '');
  const password = String(process.env.ORANGEHRM_PASSWORD ?? process.env.PASSWORD ?? '');

  if (!username || !password) {
    throw new Error('Missing ORANGEHRM_USERNAME / ORANGEHRM_PASSWORD (or USERNAME / PASSWORD) environment variables');
  }

  await browser.maximizeWindow();
  await browser.url("https://opensource-demo.orangehrmlive.com/");
  console.log("Using username:", username);
  console.log("Using password:", password);

  const usernameInput = await $('//input[@name="username"]'); 
  await usernameInput.waitForDisplayed();
  await usernameInput.setValue(username);

  const passwordInput = await $('//input[@name="password"]');
  await passwordInput.waitForDisplayed();
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
