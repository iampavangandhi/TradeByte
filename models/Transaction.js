// Adding / Spending Balance History
const uuid = require("uuid");
const { random, set } = require("lodash");

function uniqueID() {
    random_number = [];
    for (let i = 0; i < 1000000; i++) {
        random_number.push(Math.random()) // math.random .to fixed(13)// depends decimal default 16

    }
    if (i === 1000000)
        console.log("before checking duplicate")
    console.log(random_number.length)
    console.log("After checking duplicate ")
    random_set = new set(random_number)
    console.log([...random_set].length) // the length is still same
}