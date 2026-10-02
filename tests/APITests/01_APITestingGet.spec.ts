import {test, request, expect} from '@playwright/test';

//way-3
// let responseContext: any;
// test.beforeAll("Before All the test", async()=>{
//     responseContext = await request.newContext({
//         baseURL: "https://restful-booker.herokuapp.com/",
//         extraHTTPHeaders: {
//             Accept: "application/json"
//         },
//     });
// });

//way-1
// test("Get call of API Testing Practice-1", async({request})=>{
//     const response1= await request.get("https://restful-booker.herokuapp.com/booking",{
//         headers:{
//             Accept: "application/json"
//         }
//     });
//     console.log(await response1.json());
// })

//way-2
// test("Get  call of API Testing Practice-2",async()=>{
//     const responseContext = await request.newContext({
//         baseURL: "https://restful-booker.herokuapp.com/",
//         extraHTTPHeaders: {
//             Accept: "application/json"
//         }
//     });
//     const response2 = await responseContext.get('/booking');
//     console.log(response2.json());
// })

//way-3
// test("Get call of API Testing Practice-3",async()=>{
//     const response2 = await responseContext.get('/booking');
//     console.log(response2.json());
// }) 

// //way-4 - add baseURL in playwright.config 
// test("Get call of API Testing Practice-4",async({request})=>{
//     const respopnse2 = await request.get('/booking');
//     console.log(respopnse2.json());
//     console.log(respopnse2.status());
// })

//path parameters

test("Get booking id", async({request})=>{
    const response2 = await request.get('/booking/2');
    console.log(await response2.json());
    expect(response2.status()).toBe(200);
    expect(response2.ok()).toBeTruthy();
    expect(await response2.json()).toMatchObject({
     "firstname": "Susan",
    "lastname": "Ericsson",
    "totalprice": 606,
    "depositpaid": true,
    "bookingdates": {
        "checkin": "2019-12-17",
        "checkout": "2026-08-03"
    }
    })
    const jsonResp = await response2.json();
    expect(jsonResp.firstname).toEqual('Susan')
})

//way-1
test("Filtered by name", async({request})=>{
    const response2 = await request.get('/booking?firstname=Susan&lastname=Ericsson');
    console.log(await response2.json());
})

//way-2 for filter 
test("Filtered by name way-2", async({request})=>{
    const response2 = await request.get('/booking',{
        params:{
            firstname: 'Susan',
            lastname: 'Ericsson'
        }
    })
    console.log(await response2.json());
})

test("API with UI verification",async({request, page})=>{
    const resp2 = await request.get("https://api.demoblaze.com/entries");
    const jsonResp2 = await resp2.json();
    console.log(jsonResp2.Items[0].title);

    await page.goto("https://www.demoblaze.com/index.html#");
    await expect(page.locator("//a[text()='Samsung galaxy s6']")).toHaveText("Samsung galaxy s6");

})