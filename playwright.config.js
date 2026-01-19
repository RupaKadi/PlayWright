// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  //below timeout is for tests
  timeout:30*1000,
  // below delay for assertions
  expect : {
    timeout:5000,
  },

  // to generate html report
  reporter:'html',

  use: {
    browserName: 'chromium', 
//to make it always run in headed mode give below
     headless : false,
     screenshot : 'on',
      trace : 'on', //to get trace for all tests even if they pass or fail
      //trace :'retain-on-failure' //to get trace only for failed tests
  },

});

// We are preserving all configurations inside cofig and exporting it to all modules
module.exports=config

