import {test, expect} from '@playwright/test';

test("API Testing PUT call 1", async({request})=>{
    const respon2 = await request.put("/booking/2",{
        headers:{
            Authorization: "YWRtaW46cGFzc3dvcmQxMjM=] Basic"},
        data:{
            "firstname": "Mark123",
            "lastname": "Smith123",
            "totalprice": 999,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2023-06-27",
                "checkout": "2025-04-14"
            }
        }
   })
    expect(respon2.status()).toBe(200);
});