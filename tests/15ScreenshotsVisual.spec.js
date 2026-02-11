const { test, expect } = require('@playwright/test')

test("Screenshots", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();

    //To take screenshot of locator level and store as screenshot.png file
    await page.locator('#displayed-text').screenshot({path: 'screenshot.png'});
    await page.locator("#hide-textbox").click();

    //to take screenshot of particular step and store as screenshot.png file
    await page.screenshot({path: 'screenshot.png'});

    await expect(page.locator("#displayed-text")).toBeHidden();
});

//take screenshot before and after test and comparing them
test.only("Visual testing", async({page})=>
{
await page.goto("https://flightaware.com/");

//below step will take screenshot and match it with existing 'landing.png' screenshot.
//This will fail for the first time as there is no screenshot present. on first run it will create one folder with the screenshot
expect(await page.screenshot()).toMatchSnapshot('landing.png');


})


