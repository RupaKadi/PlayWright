const { LoginPage } = require("./LoginPage");
const { DashboardPage } = require("./DashboardPage");
const { CheckoutPage } = require("./CheckoutPage");
const { OrdersPage } = require("./OrdersPage");
const { CartPage } = require("./CartPage");


//Instead of creating all objects in test, we can create them in this Page Object Manager and import this class in our actual test file
class POManager {

    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
        this.ordersPage = new OrdersPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getCartPage() {
        return this.cartPage;
    }

    getCheckoutPage() {
        return this.checkoutPage;
    }

    getOrdersPage() {
        return this.ordersPage;
    }

}

module.exports={POManager};