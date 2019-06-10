
//#####################################################
//################### Path Module #####################
//Path is a node built in module like Express or react
//The argument of the require() function is eigther 
//a built in module or an address for an existing
//file in this application
//Example:

// const path = require('path')

// var pathObj = path.parse(__filename);

// console.log(pathObj);

// the result of the above console.log is a JavaScript
//Object
//####################################################
//################# OS Module ##########################
//This module provide you with usefull methods for 
//getting usfull information about Operation System
//Example:
const os = require('os');

var totalMemory = os.totalmem();
var freeMemory = os.freemem();

console.log('Total Memory: ' + totalMemory);

//Using template string to console.log
//with template string we don't need concatination by +
//such that
console.log(`Free Memory: ${freeMemory}`);


//#####################################################
// ./ indicate the current folder. it tels
//node in current folder look for logger file
//if it was in a parent folder you would need
// ../parentFolderName/siblingFolderName/fileName
// const logger = require('./logger');

// console.log('Salam Shahram');

// function sayHello(name) {
//     console.log('Hello' + name);
// }

// //sayHello('Mosh');
// console.log(window);