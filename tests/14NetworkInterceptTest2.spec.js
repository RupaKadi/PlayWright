//In this test we are checking if we are providing wrong orderId which is not present in myOrders list. It should throw 403 error

const { test, expect } = require('@playwright/test');

test('Security test request intercept', async ({page}) => {
    //login and reach order page
    await page.goto("https://rahulshettyacademy.com/client");
    const userName = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const login = page.locator("#login");
    const productName = page.locator('.card-body b');
    await userName.fill("roopapadmasri@gmail.com");
    await password.fill("Hayaan123&");
    await login.click();
    await productName.first().waitFor();

    await page.locator("button[routerlink*='myorders']").click();

    //When we click on view button for order Id it will open that particular order with all details by taking that orderId in url

    //We use page.route to intercept the request. here we are manipulating orderId in url with some dummy value(696f6f0ec941646b7aa95d12).
    //we can fake url, data, headers or anything in request using route.continue
    //We can intercept multiple things in a single request also
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=696f6f0ec941646b7aa95d12' })
    );
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");


})