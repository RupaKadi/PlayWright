// @ts-check
import { defineConfig, devices } from '@playwright/test';

//This config file is created for custom configuration. We can create a new config file and give below command to run tests using this custom config file
// npx playwright test tests/TestForPageObject.spec.js --config playwright.config1.js

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout:30*1000,
  expect : {
    timeout:5000,
  },

  // to generate html report
  reporter:'html',

  use: {
    browserName: 'chromium',
     headless : true,
     screenshot : 'on',
      trace : 'on', //to get trace for all tests even if they pass or fail
  },

});

// We are preserving all configurations inside cofig and exporting it to all modules
module.exports=config

