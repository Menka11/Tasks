import { test, chromium, expect } from "@playwright/test";

test("Basic Authentication", async()=>{
    const newBrowser= await chromium.launch();
    const context = await newBrowser.newContext({
        httpCredentials: {
            username:"admin",
            password:"admin"
        }
    });
    const page = await context.newPage();
    await page.goto("https://the-internet.herokuapp.com/basic_auth");

    await expect(page.getByText("Basic Auth")).toBeVisible();
    await expect(page.getByText("Congratulations! You must have the proper credentials.")).toBeVisible();

})