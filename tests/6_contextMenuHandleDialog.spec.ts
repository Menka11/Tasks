import {test, expect} from "@playwright/test";

test("Handle context menu", async({page})=>{
    await page.goto("/context_menu");

    await expect(page.getByText("Context Menu").first()).toBeVisible();
    const contextBoxLocator = page.locator("//div[@id='hot-spot']");

    // page.on('dialog', dialog => (
    //     console.log(dialog.message()),
    //     dialog.accept()
    // ));

    let dialogMessage = '';
    page.on('dialog',async(dialog) =>{
        dialogMessage = dialog.message();
        await dialog.accept();
    })

    await contextBoxLocator.click({button:"right"});
    expect(dialogMessage).toContain('You selected a context menu');

})