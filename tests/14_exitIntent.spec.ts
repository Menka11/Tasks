import{test, expect} from "@playwright/test";

test("Handling exit intent",async({page})=>{
    await page.goto("/exit_intent");

    await expect(page.getByText("Exit Intent")).toBeVisible();
    const viewPortSize = page.viewportSize();

    // if(viewPortSize){
    //     await page.mouse.move(viewPortSize.height+100, viewPortSize.width+100);
    // }
    // else{
        await page.mouse.move(-50, -50);
    // }
    await expect(page.getByText("This is a modal window")).toBeVisible();
    await page.locator("//div[@class='modal-footer']").click();

})