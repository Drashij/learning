const chalk1 = require("chalk");
const validator1= require("validator");
//console.log(chalk1.blue("hello!"));
const res= validator1.isEmail("drashi@gmail.com");
console.log(res?chalk1.green.inverse(res):chalk1.red.inverse(res));
