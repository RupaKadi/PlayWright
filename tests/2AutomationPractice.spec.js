const {test, expect} = require('@playwright/test')

test.only('Test Automation Practice page', async ({browser})=>
    {
   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
   console.log(await page.title());
   
   const userName = page.locator('#userEmail');
   const password = page.locator('#userPassword');
   const login = page.locator("#login");
   const productName = page.locator('.card-body b');
   
   await userName.fill("roopapadmasri@gmail.com");
   await password.fill("Hayaan123&");
   await login.click();

//    console.log(await productName.nth(0).textContent()); 
    await page.waitForLoadState('networkidle');
    const titles =await productName.allTextContents();
    console.log(titles);


    //The above step is failing as networkidle is not ideal way to give wait. So giving below code
    await page.locator('.card-body b').first().waitFor();
    // This above step will wait till first element of given css selector is loaded. If there is only one element then no need to give first()
    const alltitles =await productName.allTextContents();
    console.log(alltitles);
   });