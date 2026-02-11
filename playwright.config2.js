// @ts-check
import { defineConfig, devices } from '@playwright/test';

//It's not good to create multiple config files for single single change
//So we are creating this config file to accomodate different changes. We can include them with name and use inside projects array and give below command to run
//npx playwright test tests/TestForPageObject.spec.js --config playwright.config2.js --project=Chrome
//If we are not specifying which project name it should pick then it will run in all settings which we included inside 'projects'

const config = ({
  testDir: './tests',
  timeout:30*1000,
  expect : {
    timeout:5000,
  },

  reporter:'html',
  projects : [
    {
      name : 'Safari',
      use: {
        browserName: 'webkit',
         headless : true,
         screenshot : 'on',
          trace : 'on',
      }
    },

    {
      name : 'Chrome',
      use: {
        browserName: 'chromium',
         headless : true,
         screenshot : 'on',
          trace : 'on',
      }
    }

  ]

  

});

// We are preserving all configurations inside cofig and exporting it to all modules
module.exports=config

