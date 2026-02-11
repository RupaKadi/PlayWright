//const { LoginPage } = require("./LoginPage");
import {LoginPage} from './LoginPage';  //this is how we should import other class in TS and add export keyword before class name of LoginPage.ts
import {DashboardPage} from './DashboardPage';
import {CheckoutPage} from './CheckoutPage';
import {OrdersPage} from './OrdersPage';
import {CartPage} from './CartPage';
import {Page} from '@playwright/test'

export class POManager {

    page : Page;
    loginPage : LoginPage;
    dashboardPage : DashboardPage;
    cartPage : CartPage;
    checkoutPage : CheckoutPage;
    ordersPage : OrdersPage;

    constructor(page:Page) {
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