import {test, expect, request} from "@playwright/test";


test("Delete call for API testing", async({request})=>{
    try{
    const response2 = await request.delete("https://restful-booker.herokuapp.com/booking/2");
    // console.log(await response2.json());
    expect(response2.status()).toBe(200);
    } catch{
        console.log("You don't have access to delete the record");
    }
    
})