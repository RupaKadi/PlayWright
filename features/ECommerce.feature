Feature: Ecommerce validations

//command to run scenarios parallel - npx cucumber-js features/ECommerce.feature --parallel 2 --exit
//Command to run tc with tags - npx cucumber-js --tags "@reg" --exit
//Command to generate html report - npx cucumber-js features/ECommerce.feature --parallel 2 --exit --format html:cucumber-report.html
//Command to rerun flaky tests - npx cucumber-js features/ECommerce.feature --retry 1 --exit

@Regression
Scenario: Placing the order
Given a login to Ecommerce application with "roopapadmasri@gmail.com" and "Hayaan123&"
When Add "ZARA COAT 3" to Cart
Then Verify "ZARA COAT 3" is displayed in the Cart
When Enter valid details and Place the order
Then Verify order is present in OrderHistory page

@Error
Scenario Outline: Placing the order
Given a login to Ecommerce2 application with "<username>" and "<pwd>"
Then Verify Error message is displayed

Examples:
| username | pwd      |
| rupaKadi | learning |
| hello123 | learning |
