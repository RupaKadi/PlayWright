const {test, expect} = require('@playwright/test')

//We can give tags if we want to categorise test cases
test.describe.configure({mode:'parallel'});
test(`@Web Navigations`, async({page})=>
{
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
await page.goto("https://google.com");
await page.goBack();
await page.goForward();
});

test(`@Web Hidden ELements`, async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");  
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

});

//we will call popups as dialog in Playwright
test("PopUp validations", async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/"); 
    await page.pause();
    page.on('dialog', dialog => dialog.accept()); // this step will see if there is any dialog opened and we are saying to accept it
    await page.locator("#confirmbtn").click();
});

//Mouse Hover functions
test.only("MouseHover functions", async({page})=>
    {
        await page.goto("https://rahulshettyacademy.com/AutomationPractice/"); 
        await page.locator("#mousehover").hover();
    })


