const {test, expect} = require('@playwright/test')

test("Frames", async({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click(); //here li a[href*='lifetime-access'] locator is showing 2 elements one is visible and one is not visible. If we give :visible then it will consider only visible element from matching elements
    const text = await framesPage.locator(".text h2").textContent();
    console.log(text.split(" ")[1]);

})