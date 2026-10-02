import { test, expect } from "@playwright/test";


let bookingId: any;
let jsonDataPost: any;
let jsonDataPut: any;
let jsonDataPatch: any;
let createdToken: string;
let token: string;

test("TC-00- POST: Auth-Create Token",async({request})=>{
    const responseData = await request.post("https://restful-booker.herokuapp.com/auth",{
        data:{        
                "username" : "admin",
                "password" : "password123"
        }
    })
    createdToken = await responseData.json();
    token = `token=${Object.values(createdToken)}`;
})

test("TC-01- POST: Verify that create booking is working fine", async ({ request }) => {
    const responseData = await request.post("https://restful-booker.herokuapp.com/booking",
        {
            headers: {
                "Content-type": "application/json"
            },
            data: {
                "firstname": "Jim",
                "lastname": "Brown",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2018-01-01",
                    "checkout": "2019-01-01"
                },
                "additionalneeds": "Breakfast"
            }
        });
    console.log(await responseData.json());
    expect(responseData.status()).toBe(200);
    jsonDataPost = await responseData.json();
    bookingId = jsonDataPost.bookingid;
    expect(jsonDataPost.bookingid).toBeTruthy();
    console.log(`Created booking id is ${jsonDataPost.bookingid}`);
})

test("TC-02- PUT: Updated the data for created booking", async ({ request }) => {
    const responseData = await request.put(`https://restful-booker.herokuapp.com/booking/${jsonDataPost.bookingid}`,
        {
            headers: {
                "Cookie": `${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            data: {

                "firstname": "Tiger",
                "lastname": "Richard",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2018-01-01",
                    "checkout": "2019-01-01"
                },
                "additionalneeds": "Breakfast"
            }
            

        });
        expect(responseData.status()).toBe(200);
        jsonDataPut = await responseData.json();
        console.log(jsonDataPut);
})

test("TC-03- Get: Verify  data update operation done correctly", async({request})=>{
    const responseData = await request.get(`https://restful-booker.herokuapp.com/booking/${jsonDataPost.bookingid}`);
    expect(responseData.status()).toBe(200);
    const jsonDataGet = await responseData.json();
    expect(jsonDataGet.firstname).toEqual(jsonDataPut.firstname);
    expect(jsonDataGet.lastname).toEqual(jsonDataPut.lastname);
})

test("TC- 04- Patch: Verify to Partially Update the existing data", async({request})=>{
    const responseData = await request.patch(`https://restful-booker.herokuapp.com/booking/${jsonDataPost.bookingid}`,{
        headers:{
            "Cookie" : `${token}`
        },
        data:{
            "firstname": "Richard",
            "lastname": "Parker"
        }
    });
    expect(responseData.status()).toBe(200);
    jsonDataPatch = await responseData.json();
    expect(responseData.ok).toBeTruthy();
    expect(jsonDataPatch.firstname).toEqual("Richard");
    expect(jsonDataPatch.lastname).toEqual("Parker");
})

test("TC-05- Delete: Verify to delete the created data",async({request})=>{
    const responseData = await request.delete(`https://restful-booker.herokuapp.com/booking/${jsonDataPost.bookingid}`,{
        headers:{
            "Cookie" : `${token}`
        },
    });
    expect(responseData.status()).toBe(201);
    expect(responseData.statusText()).toBe("Created");

})

