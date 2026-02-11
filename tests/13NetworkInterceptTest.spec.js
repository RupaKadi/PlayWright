const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils')

const loginPayload = { userEmail: "roopapadmasri@gmail.com", userPassword: "Hayaan123&" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
const fakePayloadOrders = { data: [], message: "No Orders" };

let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);

});

test.beforeEach(() => {

});

test.only('@API API Testing using Playwright to place the order', async ({ page }) => {

    //we are saving that token in local storage (in application->storage we can see this in web)
    //addInitScript is used to add desired value whenever page is navigated
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token); //here this token value will go to Value in javascript code. then do store it in localStorage

    await page.goto("https://rahulshettyacademy.com/client/");

    //Here we are faking the response verifying 'No orders' message - in myOrders page
    //intercepting the response- API response->{playwright fake response}->browser->render data on frontend

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {

            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayloadOrders); //stringify will convert javascript to json string.we are trying to pass fake payload into response body
            route.fulfill(
                {
                    response,
                    body,       //this will replace original response in route to fake body
                });


        });

    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator(".mt-4").textContent());

});