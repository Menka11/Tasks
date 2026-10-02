import{test, expect} from '@playwright/test';

test("Nested Frame Handling",async({page})=>{
    await page.goto("/frames");
    
    //nested frame
    await expect(page.locator("//div[@class='example']")).toHaveText(/\Frames/);

    await page.getByText("Nested Frames").click();

    await expect(page).toHaveURL("https://the-internet.herokuapp.com/nested_frames");

    await page.waitForTimeout(10000);

    let topFrame = page.frameLocator("//frame[@name='frame-top']");
    let bottomFrame = page.frameLocator("//frame[@name='frame-bottom']");

    let leftFrame = topFrame.frameLocator("//frame[@name='frame-left']");
    let middleFrame = topFrame.frameLocator("//frame[@name='frame-middle']");
    let rightFrame = topFrame.frameLocator("//frame[@name='frame-right']");

    await expect(leftFrame.locator("body")).toContainText("LEFT");
    await expect(middleFrame.locator("//div[@id='content']")).toContainText("MIDDLE");
    await expect(rightFrame.locator("body")).toContainText("RIGHT");

    await expect(bottomFrame.locator("body")).toContainText("BOTTOM");

})

test("iFrame Handling", async({page})=>{
    await page.goto("/frames");
    await page.locator("//a[text()='iFrame']").click();
    await expect(page.locator("//h3[text()='An iFrame containing the TinyMCE WYSIWYG Editor']")).toBeVisible();

    await page.locator("//div[@class='tox-icon']").click();

    await expect(page.locator("//div[@class='tox-icon']")).toBeHidden();

    await page.frameLocator("//iframe[@id='mce_0_ifr']").locator("//p[text()='Your content goes here.']").isVisible();
    
})