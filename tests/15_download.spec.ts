import{test, expect} from "@playwright/test";

test(" File Download", async({page})=>{
    await page.goto("/download");
    await expect(page.getByText("File Downloader")).toBeVisible();

    //single file download
    const downloadPromises = page.waitForEvent("download"); //listener returns promises
    await page.getByRole("link",{name:"some-file.txt"}).click(); //trigger event
    const download = await downloadPromises; // assign results either resolve or reject as final object to download

    await download.saveAs('downloadedFile/1.txt'+ download.suggestedFilename())

    //handle multiple downloaded files
    const downloadPromises1 = Promise.all([
        page.waitForEvent("download"),
        page.waitForEvent("download"),
        page.waitForEvent("download"),
        await page.getByRole("link",{name:"hands-on-automated-testing-with-playwright-create-fast-reliable-and-scalable-tests-for-modern-web-apps-with-microsofts-automation-framework-1_compress.pdf"}).click(),
        await page.locator("//a[text()='upload-test.txt']").click(),
        await page.getByRole("link",{name:"test-upload-b4.pdf"}).click(),
    ])

    const download1 = await downloadPromises1;
    await download1[0].saveAs('downloadedFile/2.txt' + download.suggestedFilename());
    await download1[1].saveAs('downloadedFile/3.txt' + download.suggestedFilename());
    await download1[2].saveAs('downloadedFile/4.txt' + download.suggestedFilename());
})