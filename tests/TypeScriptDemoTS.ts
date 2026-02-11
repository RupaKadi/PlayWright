import {expect, type Locator, type Page} from '@playwright/test'; //this line should be included to convert our page object model class to TS

//TO run TS code first give, 
// For compile ==== tsc demo.ts
// to run ==== node demo.js


let message1 : string = "Hello";

// message1=2;  -error as we already gave string as datatype for message1

message1="World"; //this is fine as we reassigning another string type

let age1:number =20;
console.log(age1);

let bool1 : boolean = true;

let numArray: number[] = [1,2,3];   //for arrays
console.log(numArray)

let data : any = "this is anything";   //we can give "any" if we are unsure about data type. It just behave like JS

data=42; //this is fine now even if we reassign the value with other data type


//functions
function add(a:number,b:number): number  //here number outside is data type of return type
{
    return a+b;
}
console.log(add(2,4));   //6

//Objects
let user: {name:string, age:number} = {name: 'Bob', age: 34};
// user.location = "Hyderabad";  //it will throw error as this type is not defined

let user1: {name:string, age:number, location:string} = {name: 'Bob', age: 34, location : "Delhi"};
user1.location = "Hyderabad";   //this is fine because we already defined data type of location in above step

//Class
class CartPage
{
  page : Page;
  cartProducts : Locator;
  productsText : Locator;
  cart : Locator;
  orders : Locator;
  checkout : Locator;

constructor(page:Page){
        this.page = page;
        this.cartProducts = page.locator("div li").first();
        this.productsText = page.locator(".card-body b");
    this.cart =  page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
    this.checkout = page.locator("text=Checkout");
    }


async verifyProductIsDisplayed(productName)
{
 await this.cartProducts.waitFor();
 const bool = await this.page.locator("h3:has-text('"+productName+"')").isVisible();
 expect(bool).toBeTruthy();
}

async Checkout()
{
    await this.checkout.click();
}


}
