const {test, expect} = require("@playwright/test");

test("Calendar validations", async({page})=>
{

    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expectedList = {monthNumber,date,year};

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();

    //to select year
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();

    //to select month - as month is in text in UI but here we are passing number. SO to select june we use nth(5)
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
   
    //to select date
    await page.locator("//abbr[text()='"+date+"']").click();


    //ASSERTIONS
   const inputs = page.locator(".react-date-picker__inputGroup input");
 for(let i=0;i<expectedList.length;i++)
    {
 const value = await inputs.nth(i).inputValue(); //we are using inputValue() becuase we set that value dynamically
expect(value).toEqual(expectedList[i]); 
}

})