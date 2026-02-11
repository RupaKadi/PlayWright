const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils.js');

 const loginPayload = {userEmail: "roopapadmasri@gmail.com", userPassword: "Hayaan123&"};
 const orderPayload = {orders:[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
let response;

test.beforeAll( async()=>
{
const apiContext = await request.newContext();
const apiUtils = new APIUtils(apiContext,loginPayload);
response = await apiUtils.createOrder(orderPayload);

});

test.beforeEach( ()=>
{

});

test.only('API Testing using Playwright to place the order', async ({page})=>
    {

    //we are saving that token in local storage (in application->storage we can see this in web)
    //addInitScript is used to add desired value whenever page is navigated
       await page.addInitScript(value =>{
            window.localStorage.setItem('token',value);
        }, response.token ); //here this token value will go to Value in javascript code. then do store it in localStorage

    await page.goto("https://rahulshettyacademy.com/client/");   


//Click on Orders page and verify if our order Id is present in the table of all orders
await page.locator("button[routerlink*='myorders']").click();
const orderpage = page.locator("tbody"); //line no.93 and 94 are to wait till orders page is loaded completely
await orderpage.waitFor();
const tablerows = await page.locator("tbody tr");
for(let i=0;i<await tablerows.count();++i)
{
    const orderIdfromTable = await tablerows.nth(i).locator("th").textContent();
if(response.orderId.includes(orderIdfromTable))
{
    await tablerows.nth(i).locator("button").first().click();
    break;
}
}
const orderIdDetails = await page.locator(".col-text").textContent();
await page.pause();
expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
    });