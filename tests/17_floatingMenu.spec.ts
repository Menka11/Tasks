import {test, expect} from "@playwright/test";

test("Verify floating menu after scrolling", async({page})=>{
    await page.goto("/floating_menu");

    await expect(page.locator("//div[@id='menu']")).toBeVisible();
    await page.mouse.wheel(500, 500);
    await expect(page.locator("//div[@id='menu']")).toBeVisible();
})