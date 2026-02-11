const base = require('@playwright/test')

//here testDataForOrder is fixture

exports.customtest = base.test.extend(
{
testDataForOrder : {
    userName : "roopapadmasri@gmail.com",
    password : "Hayaan123&",
    product : "ZARA COAT 3"
}

}

)