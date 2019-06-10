var x =;

//This moduls is for logging messages

//we are going to send a http request to the
//following logging service to log our messages
var url = 'http://mylogger.io/log';

//
function log(message) {
    //Send an http request
    console.log(message);
}

//Follwoing we are adding a function named
//log to the export property of module opject
//that is an nested js object intself, and we 
//are assigning the above log function to it.
module.exports = log

//Making a function or variable exportable is like
//make it public in opp context the other entities
//of the module that are not exported they are private
//for that module
