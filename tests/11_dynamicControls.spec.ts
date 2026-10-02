import {test, expect} from "@playwright/test";

test("Handling Dynamic Controls", async({page})=>{
    await page.goto("/dynamic_controls");

    await expect(page.getByText("Dynamic Controls")).toBeVisible();

    //check the checkbox and remove 
    await page.locator("//input[@type='checkbox']").check();
    await page.getByRole("button", {name:"Remove"}).click();

    await expect(page.getByText("It's gone!")).toBeVisible();
    await expect(page.getByText(" A checkbox")).toBeHidden();

    await page.getByRole("button",{name:"Add"}).click();
    await expect(page.getByText("It's back!")).toBeVisible();
    await expect(page.locator("//input[@type='checkbox']")).toBeVisible();

    //enable/ disable
    await expect(page.locator("//input[@type='text']")).toBeDisabled();
    await page.getByRole("button",{name: "Enable"}).click();
    
    await expect(page.locator("//input[@type='text']")).toBeVisible();
    await page.locator("//input[@type='text']").click();
    await page.locator("//input[@type='text']").pressSequentially("It's enabled");
})