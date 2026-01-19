const {test, expect, request} = require('@playwright/test');

const loginPayload = {userEmail: "roopapadmasri@gmail.com", userPassword: "Hayaan123&"};
const orderPayload = {orders:[{country:"India",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
let token;
let orderId1;

test.beforeAll( async()=>
{
const apiContext = await request.newContext();
const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
{
 data:loginPayload
})
expect(loginResponse.ok()).toBeTruthy(); //to validate statuscode to be 200 OK
const loginReponseJson = await loginResponse.json();
token = loginReponseJson.token; //to grab token from json response. here response is containing - { token, userid, password}
console.log("toekn is:"+token);

//create-oder To interact with order page
const orderResponse= await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
       data:orderPayload,
       headers:{
                    'Authorization':token,
                    'Content-Type' : 'application/json'
               }
    }
)

const orderResponseJson = await orderResponse.json();
console.log(orderResponseJson);
orderId1 = orderResponseJson.orders[0]; //to get order id
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
        }, token ); //here this token value will go to Value in javascript code. then do store it in localStorage

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");   


   const productName = page.locator('.card-body b');
   const products = page.locator(".card-body");
   const product = "ZARA COAT 3";

   await productName.first().waitFor();
   const titles = await productName.allTextContents();
   console.log(titles);
   const email = "roopapadmasri@gmail.com";
   
   //To find product- ZARA COAT 3
const count = await products.count();
for(let i=0;i<count;++i)
    {
       if(await products.nth(i).locator("b").textContent()=== product)
       {
         //add product to cart
         await products.nth(i).locator("text= Add To Cart").click();
         break;
       }
    }

    //Clicking on cart option - to go and check in cart page
    await page.locator("[routerlink*='cart']").click();

    //To wait until all items are loaded in cart page(since we are using .isVisible() in next step which is not in auto-waiting. so we should give below line)
    await page.locator("div li").first().waitFor();

    //To validate if ZARA COAT 3 is present in that cart page
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();   //here it will check tag name should be h3 and it has-text --ZARA COAT 3
    expect(bool).toBeTruthy();

    //To click on CHECKOUT
    await page.locator("button[type='button']").last().click();

    //To fill shipping info in checkout page
    await page.locator("[placeholder*='Country']").pressSequentially("ind", {delay: 150});  //here to enter country name we need to type letters one by one to get suggestions
    //here we are trying to wait till suggestions are loaded completely and select India
    const dropdown = page.locator(".ta-results"); 
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for(let i=0;i<optionsCount;++i)
        {
           const text = await dropdown.locator("button").nth(i).textContent();
            if(text.trim() === "India")
            {
                await dropdown.locator("button").nth(i).click();
                break;
            }
        }
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
await page.locator(".action__submit").click();

//To validate THAKYOU FOR YOUR ORDER message
await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");


//Click on Orders page and verify if our order Id is present in the table of all orders
await page.locator("button[routerlink*='myorders']").click();
const orderpage = page.locator("tbody"); //line no.93 and 94 are to wait till orders page is loaded completely
await orderpage.waitFor();
const tablerows = await page.locator("tbody tr");
for(let i=0;i<await tablerows.count();++i)
{
    const orderIdfromTable = await tablerows.nth(i).locator("th").textContent();
if(orderId1.includes(orderIdfromTable))
{
    await tablerows.nth(i).locator("button").first().click();
    break;
}
}
const orderIdDetails = await page.locator(".col-text").textContent();
await page.pause();
expect(orderId1.includes(orderIdDetails)).toBeTruthy();
    });