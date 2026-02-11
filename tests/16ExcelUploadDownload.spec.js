const ExcelJs = require('exceljs');
const {test,expect} = require('@playwright/test');

//update mango price to 350- price column value is +2 for fruitName column in our excel sheet. Modifying code to do this price change

async function writeExcelTest(searchText, replaceText, change, filePath)
{
    
    const workbook = new ExcelJs.Workbook();

    await workbook.xlsx.readFile(filePath);
        const workSheet = workbook.getWorksheet('Sheet1');
        const output = await readExcelTest(workSheet,searchText);
    
   const cell = workSheet.getCell(output.row,output.column+change.colChange);  //change is object we are passing. we are interacting using object.colChange 
   cell.value = replaceText;
   await workbook.xlsx.writeFile(filePath);

}

async function readExcelTest(workSheet,searchText) {
    let output = {row:1,column:1};
    workSheet.eachRow((row, rowNumber) =>
        {
       row.eachCell((cell, colNumber) => 
           {
            if(cell.value === searchText)
            {
                output.row = rowNumber;
                output.column = colNumber;
            }
           
       })
   })
   return output;
}


test('Upload download excel validation',async ({page})=>
{
await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
const downloadPromise = page.waitForEvent('download'); //we are saying to wait until the file is downloaded completely
const textSearch = 'Mango';
const updateValue ='350';

//download excel file
await page.getByRole('button',{name:'Download'}).click();

//do modifications
await downloadPromise; //wait for download completed
writeExcelTest("Mango",updateValue,{rowChange:0,colChange:2},"/Users/Administrator/Downloads/download.xlsx");

//click on upload on web
await page.locator("#fileinput").click();
await page.locator("#fileinput").setInputFiles("/Users/Administrator/Downloads/download.xlsx"); //here setInputFiles we should use to access our m/c and take excel file to upload. To use this the upload option webelement should contain type="file"

//ASSERTIONS
//verifying if 350 is updated correctly for mango price
const textLocator = page.getByText(textSearch); //getting locator of mango text
const desiredRow = await page.getByRole('row').filter({has:textLocator}); //filtering all rows with the row which contains mango
await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);

})