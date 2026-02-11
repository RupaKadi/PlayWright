import {test, expect, Page, Locator} from '@playwright/test';

export class LoginPage{
    page: Page;
    signInButton : Locator;
    userName : Locator;
    password : Locator;

constructor(page:Page)
{
    this.page = page;
    this.signInButton = page.locator("#login"); //we are initialising all locators inside constructor so that when object is created then these will be called by default
   this.userName = page.locator("#userEmail");
    this.password = page.locator("#userPassword");
}

async goTo()
{
    await this.page.goto("https://rahulshettyacademy.com/client/");
}

async validLogin(username:string, password:string)
{
    await this.userName.fill(username);
   await this.password.fill(password);
   await this.signInButton.click();
}


}

module.exports={LoginPage};