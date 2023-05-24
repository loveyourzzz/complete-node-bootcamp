// console.log(arguments);

// console.log(require('module').wrapper);

// module.exports
const Calculator = require(`${__dirname}/modules/Calculator-v1`);
const calc1 = new Calculator();
console.log(calc1.add(2, 3));

// exports
const calc2 = require(`${__dirname}/modules/Calculator-v2`);
console.log(calc2.multiply(2, 3));

// caching
require(`${__dirname}/modules/test`)();
require(`${__dirname}/modules/test`)();
require(`${__dirname}/modules/test`)();
