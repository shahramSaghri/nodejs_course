/**
 * The following statement retuns a function, so express
 * is infact a function and you can call it like
 * express()
 * Through express() function you can get access to some
 * methods like:
 * get()
 * post()
 * put()
 * delete()
 * 
 * so you can call these methods like:
 * express().get()
 * However this is not a convention follow the following
 * example.
 */
const express = require('express');

const app = express();

/**
 * For example the app.get() method takes two arguments
 * The first argument is the path or url which expose
 * the desired resource, and the second argument is a
 * callback function that is called whenever we receive
 * a http request to the given url (first arqument).
 * The method would then look like:
 * app.get('/url', (reg, res) => {
 * 
 * });
 * 
 * The callback function (also called rout handler )
 * itself has two arguments which are two objects as,
 *  reg and res (request and response)
 * the reg object has a lot of usefull properties that
 * gives us information about incomming request
 * Check the express documentation and look under API
 * Regrence version 4
 *  */ 

app.get('/', (reg, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (reg, res) => {
    res.send([1, 2, 3]);
});
/**
 * Finally we need to listen from a given port for the 
 * client request. this would be done by employeeing
 * the .listen() method which takes a port number as
 * its first argument and an optional callback function
 * as its second argument. The callback fanction would
 * executed whenever a request is sent to the given
 * port.
 */

 app.listen(8080, () => console.log('Listening on port 8080'));


 



