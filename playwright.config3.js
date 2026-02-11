// @ts-check
import { defineConfig, devices } from '@playwright/test';

//This config file created for viewport and devices and SSL certificate issues(ignoreHttpsErrors) and allow location(permissions)
//Viewport-- we can set width and height of browser window while executing
//If we give devices -- we can specify any device name then it will pick dimensions of that device
// ignoreHttpsErrors-- if we give it as true then it will accept certificate errors by default
//permissions -- if we want to allow location access

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
         headless : false,
         screenshot : 'on',
          trace : 'on',
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

