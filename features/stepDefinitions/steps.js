const { When, Then, Given } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')


Given('a login to Ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (userName, password) {

    //for login page
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(userName, password);

});

Given('a login to Ecommerce2 application with {string} and {string}', async function (username, pwd) {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());

    const userName = this.page.locator('#username');
    const password = this.page.locator("[type='password']");
    const signin = this.page.locator("#signInBtn");

    //css, xpath
    await userName.fill(username);
    await password.fill(pwd);
    await signin.click();

});

Then('Verify Error message is displayed', async function () {
    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
  });

When('Add {string} to Cart', async function (product) {
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(product);
    await this.dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed in the Cart', { timeout: 100 * 1000 }, async function (product) {
    const cartPage = this.poManager.getCartPage();
    await cartPage.verifyProductIsDisplayed(product);
    await cartPage.Checkout();
});

When('Enter valid details and Place the order', async function () {
    const checkoutPage = this.poManager.getCheckoutPage();
    const countryCode = "ind";
    const countryName = "India";
    const userName = "roopapadmasri@gmail.com";
    await checkoutPage.checkCountryAndSelect(countryCode, countryName);
    await checkoutPage.validateForEmail(userName);
    this.orderID = await checkoutPage.SubmitAndGetOrderId();
    console.log(this.orderID);
});

Then('Verify order is present in OrderHistory page', async function () {
    await this.dashboardPage.navigateToOrders();
    const ordersPage = this.poManager.getOrdersPage();
    await ordersPage.searchOrderAndSelect(this.orderID);
    expect(this.orderID.includes(await ordersPage.getOrderIdDetails())).toBeTruthy();
});