import {test, expect} from "@playwright/test";

test("API testing Post call-1 ", async({request}) =>{
    const resp1 = await request.post("/booking", {
        data: {
    "firstname" : "Jim",
    "lastname" : "Brown",
    "totalprice" : 111,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : "Breakfast"
}    });
const jsonResp1 = await resp1.json();
console.log(jsonResp1);
expect(resp1.status()).toBe(200);
expect(resp1.statusText()).toBe('OK');
expect(resp1.ok()).toBeTruthy();
expect(jsonResp1.booking).toMatchObject({
    firstname: 'Jim',
    lastname: 'Brown',
    totalprice: 111,
    depositpaid: true,
    bookingdates: { checkin: '2018-01-01', checkout: '2019-01-01' },
    additionalneeds: 'Breakfast' })
})

test.only("API with UI verification", async({request})=>{
    const respo2 = await request.post("https://api.demoblaze.com/addtocart",{
        data: {"id":"9a382daa-cec6-ef9a-cf28-60f07be15db4","cookie":"user=a4df180e-bf85-ae72-4121-61c80877446c","prod_id":1,"flag":false}
        });
        expect(respo2.status()).toBe(200);

        const viewCartResponse = await request.post("https://api.demoblaze.com/viewcart",{
            data: {cookie: "user=a4df180e-bf85-ae72-4121-61c80877446c", flag: false}
        });
        expect(viewCartResponse.status()).toBe(200);



})