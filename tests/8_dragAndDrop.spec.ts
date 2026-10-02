import {test, expect} from "@playwright/test";

test("Drag and Drop",async({page})=>{
    await page.goto("/drag_and_drop");

    const columnALocator = page.locator("//div[@id='column-a']");
    const columnBLocator = page.locator("//div[@id='column-b']");

    await columnALocator.dragTo(columnBLocator);
    //drapTo internally perfroming mousedown- to pick element , 
    // mousemove- to reach on destination, mouseup - to release element

    await expect(page.locator("//div[@id='columns']//header").first()).toContainText("B");
})