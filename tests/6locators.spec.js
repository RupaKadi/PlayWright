import {test, expect} from '@playwright/test'

test('Playwright locators', async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    //getByLabel - can be used with selections(dropdown, checkbox, radiobutton etc.)
    await page.getByLabel("Check me out if you Love IceCreams!").click(); //for checkbox. Here we can use .check() also
    await page.getByLabel("Employed").check(); //we can use either .check() or .click()
    await page.getByLabel("Gender").selectOption("Female");

    //getByPlaceholder - if there is placeholder attribute in html line
    await page.getByPlaceholder("Password").fill("Hayaan123&");

 //getByRole- we need to specify if it is button or alert or checkbox etc. And we should specify what is it's name on webpage
 await page.getByRole("button", {name: 'Submit'}).click();
 await page.getByRole("link",{name: "Shop"}).click();

 //getByText - it will scan entire page where the text we specify is present
  await page.getByText(" The Form has been submitted successfully!.").isVisible();

  //filter-- here page.locator("app-card") will return list of elements. We are filtering the product which hasText as Nokia Edge. To click on add we are doing getByRole
  await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();


  
})