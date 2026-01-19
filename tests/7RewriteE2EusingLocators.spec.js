const {test, expect} = require('@playwright/test');
const { table } = require('node:console');

test.only('Test end to end flow', async ({page})=>
    {
   await page.goto("https://rahulshettyacademy.com/client/");
   
   const userName = page.getByPlaceholder("email@example.com");
   const password = page.getByPlaceholder("enter your passsword");
   const login = page.getByRole("button", {name:'Login'});   
   const product = "ZARA COAT 3";
   
   await userName.fill("roopapadmasri@gmail.com");
   await password.fill("Hayaan123&");
   await login.click();
   await page.locator(".card-body b").first().waitFor();
   const email = "roopapadmasri@gmail.com";
   
   //To find product- ZARA COAT 3
   await page.locator(".card-body").filter({hasText: "ZARA COAT 3"}).getByRole("button", {name:"Add To Cart"}).click();

    //Clicking on cart option - to go and check in cart page
    await page.getByRole("listItem").getByRole("button",{name:'Cart'}).click();

    //To wait until all items are loaded in cart page(since we are using .isVisible() in next step which is not in auto-waiting. so we should give below line)
    await page.locator("div li").first().waitFor();

    //To validate if ZARA COAT 3 is present in that cart page
    const bool = await page.getByText("ZARA COAT 3").isVisible();   //here it will check tag name should be h3 and it has-text --ZARA COAT 3
    expect(bool).toBeTruthy();

    //To click on CHECKOUT
    await page.getByRole("button",{name:'Checkout'}).click();

    //To fill shipping info in checkout page
    await page.getByPlaceholder("Select Country").pressSequentially("ind", {delay: 150});  //here to enter country name we need to type letters one by one to get suggestions
    //here we are trying to wait till suggestions are loaded completely and select India
    const dropdown = page.locator(".ta-results"); 
    await dropdown.waitFor();
    
    await page.getByRole("button", {name: 'India'}).nth(1).click();

//Assertions
//Assertion to validate email id present in checkout page is same as login email id
expect(page.locator(".user__name [type='text']").first()).toHaveText(email);

//To enter card details in checkout page
await page.locator(".field [type='text']").first().fill("123456");
const expirymonth = page.locator(".ddl").first();
await expirymonth.selectOption("03");
const expiryyear = page.locator(".ddl").nth(1);
await expiryyear.selectOption("20");
await page.locator(".small .txt").first().fill("456");
await page.locator("input[name='coupon']").fill("rahulshettyacademy");
await page.locator("[type='submit']").click();
const couponApplied = page.locator(".mt-1.ng-star-inserted");
await couponApplied.first().waitFor();
await expect(page.locator(".mt-1.ng-star-inserted")).toHaveText("* Coupon Applied");

//To click on Place Order button
await page.getByText("PLACE ORDER").click();

//To validate THAKYOU FOR YOUR ORDER message
await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();

//To grab orderId
const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
console.log(orderId);
const exactOrderId = orderId.split(" ");
const reqOrderId = exactOrderId[2];


//Click on Orders page and verify if our order Id is present in the table of all orders
await page.locator("button[routerlink*='myorders']").click();
const orderpage = page.locator("tbody"); //line no.93 and 94 are to wait till orders page is loaded completely
await orderpage.waitFor();
expect(await page.locator(".table").filter({hasText: reqOrderId}).getByText(reqOrderId)).toHaveText(reqOrderId);
await page.locator(".ng-star-inserted").textContent();

// await page.locator(".ng-star-inserted").filter({hasText: reqOrderId}).getByRole("button", {name:'View'}).click();


// for(let i=0;i<await tablerows.count();++i)
// {
//     const orderIdfromTable = await tablerows.nth(i).locator("th").textContent();
// if(orderId.includes(orderIdfromTable))
// {
//     await tablerows.nth(i).locator("button").first().click();
//     break;
// }
// }
// const orderIdDetails = await page.locator(".col-text").textContent();
// expect(orderId.includes(orderIdDetails)).toBeTruthy();
    });