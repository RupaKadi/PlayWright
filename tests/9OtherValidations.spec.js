const {test, expect} = require('@playwright/test')

test("Navigations", async({page})=>
{
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
await page.goto("https://google.com");
await page.goBack();
await page.goForward();
});

test("Hidden ELements", async({page})=>
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


