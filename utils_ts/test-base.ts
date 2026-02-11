import {test as baseTest} from '@playwright/test'

//To define type for testDataForOrder(object) we should first create interface with types(just like how we define types for objects in TS) and then pass it into our extend
interface TestDataForOrder {
    userName : string;
    password : string;
    product : string;
};


export const customtest = baseTest.extend<{testDataForOrder:TestDataForOrder}>(
{
testDataForOrder : {
    userName : "roopapadmasri@gmail.com",
    password : "Hayaan123&",
    product : "ZARA COAT 3"
}

}

)