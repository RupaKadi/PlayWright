const {test, expect} = require('@playwright/test')

test.only('UI Controls', async ({page})=>
 {

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

const userName = page.locator('#username');
const password = page.locator("[type='password']");
const signin = page.locator("#signInBtn");
const dropdown = page.locator("select.form-control");
const radiobtn = page.locator(".radiotextsty");
const popupOkay = page.locator("#okayBtn");
const documentLink = page.locator("[href*='documents-request']");

await userName.fill("rahulshettyacademy");
await password.fill("learning");

// for static dropdown
await dropdown.selectOption("consult");

// for radio button - there are 2 elements with same css so giving last()
await radiobtn.last().click();

//for popups - to click on okay btn
await popupOkay.click();

//ASSERTION sample for radio btn
await expect(radiobtn.last()).toBeChecked();

// ASSERTION samples for checkbox
await page.locator("#terms").click();
await expect(page.locator("#terms")).toBeChecked();
await page.locator("#terms").uncheck();
expect(await page.locator("#terms").isChecked()).toBeFalsy();

// ASSERTION for blinkingText
await expect(documentLink).toHaveAttribute("class","blinkingText");


// To pause page and inspect we use page.pause()
await page.pause();
await signin.click();

 });