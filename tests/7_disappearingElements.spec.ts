import {test, expect} from "@playwright/test";

test("disappearing Elements",async({page})=>{
    await page.goto("/disappearing_elements");

    await expect(page.getByText("Disappearing Elements")).toBeVisible();
    
    await page.getByText("Home").click();
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/");
    await page.goBack();

    await expect(page).toHaveURL("https://the-internet.herokuapp.com/disappearing_elements");
    await page.goForward();
    await page.goBack();

    await page.getByText("About").click();
    await expect(page.getByText("Not Found")).toBeVisible();
    await page.goBack();

    await page.getByText("Contact Us").click();
    await expect(page.getByText("Not Found")).toBeVisible();
    await expect(page.getByText("Contact Us")).toBeHidden();
    await page.goBack();

    await page.getByText("Portfolio").click();
    await expect(page.getByText("Not Found")).toBeVisible();
    await expect(page.getByText("Portfolio")).toBeHidden();
    await page.goBack();
})