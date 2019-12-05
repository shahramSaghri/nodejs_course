const EventEmitter = require('events');
//const emitter = new EventEmitter();

//This moduls is for logging messages

//we are going to send a http request to the
//following logging service to log our messages
var url = 'http://mylogger.io/log';


class Logger extends EventEmitter {
    //
    log(message) {
        //Send an http request
        console.log(message);
    
        //Rasie an event
        this.emit('messageLogged', {id: 1, url: 'http://'})
        
    }

}

//Follwoing we are adding a function named
//log to the export property of module opject
//that is an nested js object intself, and we 
//are assigning the above log function to it.
module.exports = Logger;

//Making a function or variable exportable is like
//make it public in opp context the other entities
//of the module that are not exported they are private
//for that module
