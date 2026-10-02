import {test, chromium,expect} from '@playwright/test';

test("test",async({browser})=>{
  const browserNew = await chromium.launch();
  const contextNew = await browserNew.newContext();
  const pageNew = await contextNew.newPage();

  await pageNew.goto("https://playwright.dev/docs/api/class-browser");

  await expect(pageNew).toHaveURL(/playwright.dev/i);
  





})