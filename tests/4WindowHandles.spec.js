const {test, expect} = require('@playwright/test')

test.only('Child Window Handles', async ({browser})=>
 {

    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator("#username");
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const documentLink = page.locator("[href*='documents-request']");

// below step will wait if there is any new page is opened. As it returns new page so we are storing in const page2
// const page2 = context.waitForEvent('page'); //listen for any new page pending, rejected, fulfilled

const [newPage]=await Promise.all([
context.waitForEvent('page'),  //this step should be fulfilled
documentLink.click(),
])

const text = await newPage.locator(".red").textContent();
const arrayText = text.split("@");
const domainName = arrayText[1].split(" ")[0];
console.log(text);
console.log(domainName);

await page.locator("#username").fill(domainName);
console.log(await page.locator("#username").inputValue());

//If 2 new pages are opening then,
const [newPage1, newPage2]=await Promise.all([
    context.waitForEvent('page'),  //this step should be fulfilled
    documentLink.click(),
    ])

    newPage1.locator("").textContent; //like this for each newPage in array
 });