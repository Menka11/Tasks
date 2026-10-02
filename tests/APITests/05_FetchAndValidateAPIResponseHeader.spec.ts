import {test, expect, request} from "@playwright/test";

test(" Fetch and validate API response headed", async({request})=>{
    const responseAPI = await request.get("https://restful-booker.herokuapp.com/booking/2");
    const responseHeaded = responseAPI.headers();

    console.log(responseHeaded);
    expect(responseHeaded.server).toEqual('Heroku');
    expect(responseHeaded["x-powered-by"]).toEqual('Express');
    expect(responseHeaded["content-type"]).toEqual('application/json; charset=utf-8');

    console.log("********************************************");

    const responseHeaderArray = responseAPI.headersArray();
    console.log(responseHeaderArray);
    expect(responseHeaderArray.length).toEqual(10);


    responseHeaderArray.forEach((element) =>{
        console.log(element);
    })
})