// @ts-check
import { defineConfig, devices } from '@playwright/test';

//This config file created to know how to deal with flaky tests
//if we give 'retires' at config level then it will retry failed testcases those many times

const config = ({
  testDir: './tests',
  retires : 2, //this will rerun failed tests 2 times
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
         headless : false,
         screenshot : 'on',
         video : 'retain-on-failure',  //video will be taken only for failed tests
          trace : 'on',   //if we give trace as 'retain-on-failure' then it will take traces of only failed tests
          ignoreHttpsErrors : true,
          permissions : ['geolocation'],
          // viewport : {width:720,height:720}
         ...devices['iPhone 11 Pro Max']  //Here ... to represent it as an array
         
      }
    }

  ]

  

});

// We are preserving all configurations inside cofig and exporting it to all modules
module.exports=config

