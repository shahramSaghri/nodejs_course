const express = require('express');
const app = express();
const logger = require('./logger');
const auth = require('./auth');
const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
/**
 * To use pug npm package for sending html templates to the client, instread of require() it we should
 * set it as follow:
 */
app.set('view engine', 'pug');
app.set('views', './views');
//The following require() method returns a function which needs an argument that is in fact the
//Name of namespace that is created for this debuging function. This name can be anything
//such as 'app:startup' as following. To use each debugger we need to set DEBUG env variable into
//the spacename of the debugger we want to use for example if we need to use startupDebugger then
//DEBUG=app:startup. To run both debuggers DEBUG=app:startup,app:db.
//to see all debuggers DEBUG=app:* 
const startupDebugger = require('debug')('app:startup');
const databaseDebugger = require('debug')('app:db');
//############## How to activate or deactivate certain functionalities based on the Environment (development or production)
/**
 * Global process object provide us with the env property that contains info regarding the
 * current environment. 
 */
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
/**
 * The following script does same thing the above script does, but if NODE_ENV is not defined,
 * by defualt, the follwoing code return development
 */
console.log(`app: ${app.get('env')}`); 
/**
 * Using this feature we can enable or disable certain features of application based on the
 * environment. For instance if we want to enable the morgan middleware only in development 
 * environment, then:
 */
if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    /**
     * So for better debugging we used debug package, to create startupDebugger() function.
     * So we are going to use this debugger instead of debugging with console.log()
     */
    //console.log('Morgan enabled...');
    startupDebugger('Morgan enabled...');
}

//Assuming you have read some data from the database then you can debug as follwo
databaseDebugger('Connected to the database...');

//############## How to store configuration for the application environment instead of defining in terminal
/**
 * rc npm package can be used for configuring the application environment. this package is the most 
 * popular configuration loader pachekge but, there is another environment configuration package
 * that is not as populare but is't easier to use that is config.
 */
console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail server: ${config.get('mail.host')}`);
console.log(`Mail password: ${config.get('mail.password')}`);

//############# Better approach for Debugging
/**
 * Instead using console.log() for the purpose of the debugging it's better to use npm package
 * 
 */


//############## express Built in middlewares
/**
 * express.json() which looks in to the request pipline and parses any part of the body
 * that is in form of json object. In other word the following middleware parses the body
 * of the request and if there is and json onject populates it in req.body
 */
app.use(express.json());

/**
 * The following middleware parses the body of the request with url's incoming payloads
 * that is in form of key=value&key=value and subsequently populated req.body
 */

app.use(express.urlencoded({ extended: true }));

/**
 * The following middleware function is used to serve the statc files like a txt file, images or css files
 * This middleware takes an argument that is the name of the folder in wich these assest are included.
 */

app.use(express.static('public'));


//############## Custom Middleware function
/**
 * We call app.use() to install a middleware function in the
 * request processing pipeline.
 */
app.use(logger);

app.use(auth);

//############# Third party middlewares
/**
 * One usefull third party middleware is helmet that helps you secure your Express apps
 * by setting various HTTP headers. it's not a silver bullet, but it can help!
 */

app.use(helmet());

/**
 * morgan is another usefull third party middleware which is used for logging.
 */
//app.use(morgan('tiny'));

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
]

app.get('/', (req, res) => {
    //res.send('Hello World!!')
    res.render('index', {title: 'My Express App', message: 'Hello'})
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.post('/api/courses', (req, res) => {
    const { error } = inputValidation(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const newCoruse = {
        id: courses.length + 1,
        name: req.body.name
    }

    courses.push(newCoruse);
    res.send(newCoruse);

});

//################# Input validation
function inputValidation(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

//################# Listening On port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));