import {test, expect} from "@playwright/test";


//using naturewidth and height 
// test("Count Broken Images",async({page})=>{
//     await page.goto("https://the-internet.herokuapp.com/");

//     await page.locator("//a[text()='Broken Images']").click();

//     const pageURL = page.url();
//     await expect(page).toHaveURL(pageURL);
//     await expect(page.getByText("Broken Images")).toBeVisible();

//     const brokenImages = await page.evaluate(()=>{
//         const countImages = Array.from(document.querySelectorAll('img'));
//         return countImages.filter(img => img.naturalWidth===0 || img.naturalHeight===0)
//         .map(img => img.src || 'Empty or missing image src attribute');


//     });
//     console.log(`Total broken images found: ${brokenImages.length}`);
//   if (brokenImages.length > 0) {
//     console.log('List of broken image URLs:', brokenImages);
//   }
    
// })

test("Count broken images using network interception", async({page})=>{
    
    const brokenImages: string[]= [];
    
    //listen all incoming network response

    page.on("response", Response =>{
        const request = Response.request();
        
        //check if resource type is an image and return a 4xx/5xx status
        if((request.resourceType()=='image') && (Response.status() >= 400)){
            brokenImages.push(Response.url());
        }
    });
    await page.goto("https://the-internet.herokuapp.com/");
    await page.locator("//a[text()='Broken Images']").click();

    const pageURL = page.url();
    await expect(page).toHaveURL(pageURL);
    await expect(page.getByText("Broken Images")).toBeVisible();

    console.log(`Network tracking found ${brokenImages.length} broken images.`);
    // expect(brokenImages.length).toBe(0);
})