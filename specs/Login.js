import dotenv from "dotenv";
dotenv.config();

export const Login = async () => {
  await browser.url("https://opensource-demo.orangehrmlive.com/");
  console.log("Using username:", process.env.USERNAME);
  console.log("Using password:", process.env.PASSWORD);

  const usernameInput = await $('//input[@name="username"]');
  await usernameInput.setValue(process.env.USERNAME);

  const passwordInput = await $('//input[@name="password"]');
  await passwordInput.setValue(process.env.PASSWORD);

  const loginBtn = await $('//button[@type="submit"]');
  await loginBtn.click();
  await browser.pause(3000);
};
