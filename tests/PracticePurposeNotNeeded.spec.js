const {test,expect} = require('@playwright/test');

test('Practice Purpose', async ({page})=>
{

await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
await page.toHaveTitle("Practice Page");
await expect(page.locator("h1")).toHaveText("Practice Page");
const dropdown = page.locator("#dropdown-class-example");
await dropdown.selectOption("Option2");

test('Child window',async ({browser})=>
{
 const context = browser.newContext();
const page = context.newPage();
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
await page.toHaveTitle("Practice Page");

const [newPage] = await Promise.all([
  context.waitForEvent('page'),
  docLink.click(),

])

const text = await newPage.locator(".red").textContent();
console.log(text);

page.locator("#username").fill(text);

}
)
});