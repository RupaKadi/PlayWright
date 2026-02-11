const { test, expect } = require('@playwright/test');
const {customtest} = require('../utils/test-base')   //to pass data from fixture file.(second testcase here)
const { POManager } = require('../pageObjects/POManager')
//Json-->string-->JavaScript object
const dataSet = JSON.parse(JSON.stringify(require('../utils/TestDataForPlaceOrder.json')));

for(const data of dataSet)
{
test(`Test end to end flow with Page Object Model for ${data.product}`, async ({ page }) => {
    const poManager = new POManager(page);
    //for login page
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.userName, data.password);

    //for dashboardpage and navigate to cart page
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.product);
    await dashboardPage.navigateToCart();

    //for cart page and navigate to checkout page
    const cartPage = poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(data.product);
    await cartPage.Checkout();

    //for checkout page and get orderId
    const countryCode = "ind";
    const countryName = "India";
    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.checkCountryAndSelect(countryCode, countryName);
    await checkoutPage.validateForEmail(data.userName);
    const orderID = await checkoutPage.SubmitAndGetOrderId();
    console.log(orderID);
    await dashboardPage.navigateToOrders();


    //for Orders page
    const ordersPage = poManager.getOrdersPage();
    await ordersPage.searchOrderAndSelect(orderID);
    const orderIdDetails = await ordersPage.getOrderIdDetails();
    expect(orderID.includes(orderIdDetails)).toBeTruthy();
});
}

//to get test data from customtest which is a fixture file
customtest.only('Test using fixture file', async ({ page, testDataForOrder }) => {
    const poManager = new POManager(page);
    //for login page
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.userName, testDataForOrder.password);

    //for dashboardpage and navigate to cart page
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(testDataForOrder.product);
    await dashboardPage.navigateToCart();

    //for cart page and navigate to checkout page
    const cartPage = poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(testDataForOrder.product);
    await cartPage.Checkout();

    //for checkout page and get orderId
    const countryCode = "ind";
    const countryName = "India";
    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.checkCountryAndSelect(countryCode, countryName);
    await checkoutPage.validateForEmail(testDataForOrder.userName);
    const orderID = await checkoutPage.SubmitAndGetOrderId();
    console.log(orderID);
    await dashboardPage.navigateToOrders();


    //for Orders page
    const ordersPage = poManager.getOrdersPage();
    await ordersPage.searchOrderAndSelect(orderID);
    const orderIdDetails = await ordersPage.getOrderIdDetails();
    expect(orderID.includes(orderIdDetails)).toBeTruthy();
});