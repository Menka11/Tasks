import {test, expect} from "@playwright/test";

test("Handling checkboxes",async({page})=>{
    await page.goto('/checkboxes');
    // await page.getByText("Checkboxes").click();
    await expect(page.getByText("Checkboxes")).toBeVisible();

    await page.locator("//input[@type='checkbox']").nth(0).check();
    await expect(page.locator("//input[@type='checkbox']").nth(0)).toBeChecked();

    await page.locator("//input[@type='checkbox']").nth(1).uncheck();
    await expect(page.locator("//input[@type='checkbox']").nth(1)).not.toBeChecked();
})