import {test, expect} from "@playwright/test";

test("Handling Dynamic loading", async({page})=>{
    await page.goto("dynamic_loading");
    await expect(page.getByText("Dynamically Loaded Page Elements")).toBeVisible();

    await page.getByRole("link",{name:"Example 1: Element on page that is hidden"}).click();

    await expect(page).toHaveURL("https://the-internet.herokuapp.com/dynamic_loading/1");

    await page.getByRole("button", {name:"Start"}).click();
    await expect(page.getByText("Loading... ")).toBeVisible();
    (await page.waitForSelector("//h4[text()='Hello World!']")).waitForElementState("visible");
    await expect(page.getByText("Hello World!")).toBeVisible();

    await page.goBack();

    await page.getByRole("link",{name:"Example 2: Element rendered after the fact"}).click();
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/dynamic_loading/2");
    await page.getByRole("button", {name:"Start"}).click();
    await expect(page.getByText("Loading... ")).toBeVisible();
    (await page.waitForSelector("//h4[text()='Hello World!']")).waitForElementState("visible");
    await expect(page.getByText("Hello World!")).toBeVisible();




})