const express = require('express');
const app = express();
const logger = require('./logger');
const auth = require('./auth');

//############## Built in middlewares
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

 app.use(express.urlencoded());

/**
 * 
 */


//############## Custom Middleware function
/**
 * We call app.use() to install a middleware function in the
 * request processing pipeline.
 */
app.use(logger);

app.use(auth);

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'},
]

app.get('/', (req, res) => {
    res.send('Hello World!!')
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

//################# Listening On port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));