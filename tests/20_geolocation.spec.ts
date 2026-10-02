import {test, expect} from "@playwright/test";

test("Handle geolocation",async({page})=>{
    await page.goto("/geolocation");
    await expect(page.getByText("Geolocation")).toBeVisible();
})