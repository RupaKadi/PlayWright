Feature: Error validations

@Error
Scenario Outline: Placing the order
Given a login to Ecommerce2 application with "<username>" and "<pwd>"
Then Verify Error message is displayed

Examples:
| username | pwd      |
| rupaKadi | learning |
| hello123 | learning |