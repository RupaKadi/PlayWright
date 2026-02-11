const { POManager } = require('../../pageObjects/POManager')
const playwright = require('@playwright/test')
const {Before,After,BeforeStep,AfterStep,Status} = require('@cucumber/cucumber')

Before(async function(){

    const browser = await playwright.chromium.launch({headless:false}); //these 3 steps to get life for our page variable. We are doing this because in cucumber we cannot pass page fixture directly
    const context = await browser.newContext();
    this.page= await context.newPage();

    this.poManager = new POManager(this.page);  //we are using world constructor for poManager so declared as this.poManager
});

BeforeStep(function(){

});

//we can use AfterStep to capture screenshot when testcase is failed by using 'result'
AfterStep(async function({result}){
if(result.status === Status.FAILED){
    await this.page.screenshot({path: 'screenshot1.png'});
}
});

After(function(){
    console.log("I'm last step to execute");
})