import {test, expect} from "@playwright/test";

test("Challenging DOM", async({page})=>{

    await page.goto("https://the-internet.herokuapp.com/");
    await page.getByRole("link",{name:"Challenging DOM"}).click();

    const pageURL = page.url();
    await expect(page).toHaveURL(pageURL);
    await expect(page.getByText("Challenging DOM")).toBeVisible();

    await page.locator("//a[@class='button']").click();

    await page.locator("//a[@class='button alert']").click();

    await page.locator("//a[@class='button success']").click();

    

})