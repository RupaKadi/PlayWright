const {test, expect, selectors} = require('@playwright/test');


//First approach - using only browser fixture
test('Browser Context playwright test', async ({browser})=>
 {
//playwright code
//step1 - open browser
//step2 - enter username and password
//step3
//we need to write 'await' before each step in playwright because this is asynchronous. Or else we can write async before function()
//when we are using browser then we should write inside fucntion. Because browser is a playwright fixture. We should give it in {} otherwise it won't recognise browser string


//chrome - plugins/cookies
const context = await browser.newContext();
const page = await context.newPage();
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());

const userName = page.locator('#username');
const password = page.locator("[type='password']");
const signin = page.locator("#signInBtn");
const cardTitles = page.locator(".card-body a");

//css, xpath
await userName.fill("rupaKadi");
await password.fill("learning");
await signin.click();
//when we hit signin button with wrong creds then error message is displaying and disappearing. In playwright we can directly write below step without any wait step 
// console.log(await page.locator("[style*='block']").textContent());
await expect(page.locator("[style*='block']")).toContainText('Incorrect');

// to clear existing content and giving other input
//await userName.fill("");
await userName.fill("rahulshettyacademy");
await signin.click();

// here css---As .card-body is classname in parent and 'a' is tagname of child. If we want to fetch first element we can use either .first() or .nth(0)
console.log(await cardTitles.nth(0).textContent());

// To get second element 
console.log(await cardTitles.nth(1).textContent());

// To get last element
console.log(await cardTitles.last().textContent());

// To get list of all elements 
const allTitles = await cardTitles.allTextContents();
console.log(allTitles);

// In the above steps if we give allTextContents() only then it will fail because playwright have knowledge on textContent() but not on allTextContents(). So we need to include some wait until the page loads completely in the case where we are giving only allTextContents() method
await page.waitForLoadState('networkidle');
});


//Second approach- using browser and page fixtures--when we are not giving any context then we can simply write as below
test('First playwright test', async ({browser,page})=>
    {
   await page.goto("https://google.com");   
   
   });

 
   //giving only page fixture without browser context
   test('Page Playwright test', async ({page})=>
{
await page.goto("https://google.com");

//get title - assertion
console.log(await page.title());
await expect(page).toHaveTitle("Google");


});