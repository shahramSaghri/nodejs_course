
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
// ./ indicate the current folder. it tells
//node in current folder look for logger file
//if it was in a parent folder you would need
// ../parentFolderName/siblingFolderName/fileName
// const logger = require('./logger');

//###################### fs module #########################
/**
 * Another useful global modul of node is fs module that stands for file system module.
 * This module is used to working with files and directories for example: 
 */
const fs = require('fs');

//The readdirSync is a syncronous method for reading the content of a given file
const files = fs.readdirSync('./');
console.log(`
The current directory 
includes the following files: 
${files} \n`)

//Using asyncronous version of the above method
//The socond argument of all async methods is a callback function.
fs.readdir('./', (err, files) => {
    if(err) console.log('Error: ', err);
    else console.log('Result: ', files);

})

//########################## Events ###########################
/**
 * An event is a signal that indicates that somthing has happend in our
 * application. In nodejs documentdation look under Events modul.
 * One of the usefull classes of this module is EventEmitter, which is used to
 * raise different kind of events.
 * 
 * Recap
 * If you want to raise event in your application to signal that somthing has happend,
 * you need to creat a class that extends event emitter, with this that class will have
 * all the functionality that is defined in EventEmitter but you can add aditional functionalities
 * like logging an additional message, for instanse the following Logger class, and then inside that
 * class when ever you need to raise an event you simply use this.emit('eventName', {any argument you want to pass inside this JS object})
 * and finally in the host module you need to register the event before any use.
 */

 const EventEmitter = require('events');
 //const emitter = new EventEmitter();

 //Register a listener (we changed the emitter to logger in the following implementation since we have created the Logger class which extends EventEmitter)
//  emitter.addListener('messageLogged', (arg) => {
//      console.log('listener is called', arg);
//  });

const Logger = require('./logger');
const logger = new Logger();


logger.addListener('messageLogged', (arg) => {
    console.log('listener is called', arg);
});

logger.log('message');

// The following code is moved to logger.js file/module
//  // Raise an event
//  emitter.emit('messageLogged', {id: 1, url: 'http://'});

//####################### HTTP ###########################
/**
 * One of the powerfull building blocks of the node module is the HTTP module that we use for creating
 * Networkinng applications.
 */

const http = require('http')

/**
 * The follwoing server object is infact an event emitter object, such that it has all the
 * capabilites of an event emmiter. To use coonection event for building an http event, first
 * we need create a http.createServer object then using this object that is an extention of 
 * EventEmitter we can register, raise and handel an http event like a regular custom event. However
 * there is a more common way to hadel a http event/request that is explain in below. 
 */
//const server = http.createServer();

/**
 * Using the connection event for building a http evetn is not common in real work application
 * since it is very low level. Instead we are using onaly a callback function with req and res arguments
 * 
 */
// server.addListener('connection', (socket) => {
//     console.log('New connection.');
// });

/**
 * A more common way to handel an http request/event is as follwo:
 */

 const server = http.createServer((req, res) => {
     if (req.url === '/') {
         res.write('Hello world');
         res.end();
     }

    if (req.url === '/api/courses' ) {
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    } 
 })


server.listen(3000);

console.log('Listening on port 3000...')

 console.log('\n Salam Shahram \n');

 function sayHello(name) {
     console.log('Hello' + name  + '\n');
 }

sayHello('Mosh');
//console.log(window);
console.log(module);
console.log("Exportes files are" + exports);
console.log("imported files are" + require);
console.log("file name is: " + __filename);
console.log("the path is: " + __dirname);