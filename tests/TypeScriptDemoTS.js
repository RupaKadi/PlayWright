//TO run TS code first give, 
// For compile ==== tsc demo.ts
// to run ==== node demo.js
var message1 = "Hello";
// message1=2;  -error as we already gave string as datatype for message1
message1 = "World"; //this is fine as we reassigning another string type
var age1 = 20;
console.log(age1);
var bool1 = true;
var numArray = [1, 2, 3]; //for arrays
console.log(numArray);
var data = "this is anything"; //we can give "any" if we are unsure about data type. It just behave like JS
data = 42; //this is fine now even if we reassign the value with other data type
//functions
function add(a, b) {
    return a + b;
}
console.log(add(2, 4)); //6
//Objects
var user = { name: 'Bob', age: 34 };
user.location = "Hyderabad"; //it will throw error as this type is not defined
