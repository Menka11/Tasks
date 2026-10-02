import {test, expect} from "@playwright/test";

test("Dropdown", async({page})=>{
    await page.goto("/dropdown");
    await page.selectOption("//select[@id='dropdown']","1");
    await page.selectOption("//select[@id='dropdown']","2");


    //if element is without using select can't use selectOption. 
    // in that case, need to perfrom sequence of operations:
    //1. click on dropdown element 2. select an element 
})