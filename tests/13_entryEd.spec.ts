import {test, expect} from "@playwright/test";

test("Entry Edvt-- handling modal",async({page})=>{
    await page.goto("/entry_ad");
    await expect(page.getByText("Entry Ad")).toBeVisible();

    const modalWindow = page.locator("//div[@id='modal']");
    if(await modalWindow.isVisible()){
        await expect(page.getByText("This is a modal window")).toBeVisible();
        await expect(page.locator("//div[@class='modal-body']")).toBeVisible();
        await expect(page.locator("//p[text()='Close']")).toBeVisible();
    }
    else{
        await page.getByRole("link",{name:"click here"}).click();
        await expect(page.getByText("This is a modal window")).toBeVisible();
        await expect(page.locator("//div[@class='modal-body']")).toBeVisible();
        await expect(page.locator("//p[text()='Close']")).toBeVisible();
    }
    await page.locator("//p[text()='Close']").click();
    

})