import {test, expect} from "@playwright/test";

test("Dynamic content", async({page})=>{
    await page.goto("/dynamic_content");

    await expect(page.getByText("Dynamic Content")).toBeVisible();

    await page.screenshot({path:"screenShot/firstScreenshot.png"});

    await page.reload();

    await expect(page).not.toHaveScreenshot('firstScreenshot.png');

    
})