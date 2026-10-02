import {test, expect} from "@playwright/test";

test("Verify valid credential",async({page})=>{
    await page.goto("/login");

    await page.locator("//input[@id='username']").fill("tomsmith");
    await page.locator("//input[@id='password']").fill("SuperSecretPassword!");
    await page.getByRole("button",{name:" Login"}).click();

    await expect(page.locator("//div[@id='flash']")).toHaveText(/\You logged into a secure area!/);
    await expect(page.locator("//h2[text()=' Secure Area']")).toBeVisible();
    await expect(page.locator("//h4[text()='Welcome to the Secure Area. When you are done click logout below.']")).toBeVisible();

    await page.getByRole("link",{name:'logout'}).click();

    await expect(page.locator("//div[@id='flash']")).toHaveText(/\You logged out of the secure area!/)
})
