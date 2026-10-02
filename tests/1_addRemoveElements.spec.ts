import {test, expect} from "@playwright/test";

test("Add and Remove element",async({page})=>{
    await page.goto("https://the-internet.herokuapp.com/");
    await page.locator("//a[text()='Add/Remove Elements']").click();
    
    let pageURL = page.url(); //get the page URL
    let pageTitle = await page.title(); //get the page title
   
    await expect(page).toHaveURL(pageURL);
    await expect(page).toHaveTitle(pageTitle);

    await page.getByRole("button",{name: "Add Element"}).click();
    await expect(page.getByRole("button", {name: "Delete"})).toBeVisible();

    await page.getByRole("button", {name:"Delete"}).click();
    await expect(page.getByRole("button", {name: "Delete"})).toBeHidden();
})