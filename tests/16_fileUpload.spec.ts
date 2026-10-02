import {test, expect} from "@playwright/test";
import path from 'path';

test(" Download file",async({page})=>{
    await page.goto("/upload");
    await expect(page.getByText('File Uploader')).toBeVisible();

    //setInputFiles used when in HTML file type="file"
    const fileToUpload = 'browserContextPage.spec.ts';
    await page.locator("//input[@id='file-upload']").setInputFiles(path.join(__dirname, fileToUpload));
    await page.getByRole("button",{name:'Upload'}).click();

    await expect(page.getByText("File Uploaded!")).toBeVisible();
    await expect(page.locator("//div[@id='uploaded-files']")).toContainText(fileToUpload);

    await page.goBack();

    //using file chooser
    const fileChooserPromises = page.waitForEvent('filechooser');
    await page.locator("//div[@id='drag-drop-upload']").click();
    const fileChooser = await fileChooserPromises;
    await fileChooser.setFiles(path.join(__dirname, fileToUpload));
    await page.getByRole("button",{name:'Upload'}).click();
     await expect(page.getByText("File Uploaded!")).toBeVisible();
    await expect(page.locator("//div[@id='uploaded-files']")).toContainText(fileToUpload);
    
})