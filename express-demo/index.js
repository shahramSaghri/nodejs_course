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

const app = express(); //in fact app is an alias for the 
                       //express fucntion

 //express.json() returns a piece of middleware
 //and then we call app.use() to use that middleware in the
 //request processing pipeline
 //app.use(express.json());                      


const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
];

/**
 * For example the app.get() method takes two arguments
 * The first argument is the path or url which expose
 * the desired resource, and the second argument is a
 * callback function that is called whenever we receive
 * an http request to the given url (first arqument).
 * The method would then look like:
 * app.get('/url', (req, res) => {
 * 
 * });
 * 
 * The callback function (also called route handler )
 * itself has two arguments which are two objects as,
 * req and res (request and response)
 * the req object has a lot of usefull properties that
 * gives us information about incomming request
 * Check the express documentation and look under API
 * Refrence version 4
 *  */ 

app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    //here we need some logic to retreive the course
    //with the given id
    //.find() is an array method in JavaScript
    //that retrives an array element as an arqument to this
    //fucntion we need to pass a callback function
    //this function will bw used to find a course with
    //the given criteria, such that this callback function
    //will return a boolean value. The req.params.id
    //returns string, so for the following comparision to 
    //work we need to pars it to an integer which can be done
    //with '+' alternatively you can use the
    //parseInt() method.
    const course =  courses.find(c => c.id === +req.params.id)
    if(!course) {
        res.status(404).send('The course with the given ID was not found');
    }else{
        res.send(course);
    }

     
});

//We use http post request ot create a new course
/**
 * pay attension that when you post you post to the
 * collection of the courses that's why we post to the
 * courses.
 * In the following rout handler, we need to read
 * the course object that is contained in the body
 * of the request and which itself contains the new course's info,
 * use its properties to create a new course object and
 * add that course object to the courses array.
 * 
 */
app.post('/api/courses/add', (req, res) => {
    //since we are not working with an accuall database
    //we need to manually assign an id. When there is
    //a database that we get data from the id would be
    //assigned by database
    const course = {
        id: courses.length + 1,
        //we need to read the name of the new course
        //from the body of the request.
        //Inorder for the following line to work
        //we need to enable parsing up our json object
        //in the body fo the request. Because by default
        //this feature is not enabled in express
        //so we enable this feature by app.use(express.json())
        //which adds a peace of middleware to this file
        //we propable can use json.parse(req.body.name) as well
        name: json.parse(req.body.name)
    };
    courses.push(course);
    /**
     * by convention when you post a new object to a server
     * and server creates a new object or a new resourse,
     * you should return that object in the body of the 
     * response. as follow. The reason is since we create the
     * object on the server the user cant see the new id
     * which she/he may need.
     */
     res.send(course);
    
});

//A rout can have multiple parameters such as
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query) //here you are accessing
                         //the params object as a whole
                         //but you can access each individual
                         //property of this opject by dot
                         //operator
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

 
 /**
  * in prodoction environment hardcoding port in
  * .listen() fucntion does not work, because when you
  * you deploy this application to a hosting environment
  * the port is dynamically assigned by the hosting
  * environment. So the way to fix this is using an
  * environment variable. 
  */
 
 const port = process.env.PORT || 8080;
 app.listen(port, () => console.log(`Listening on port ${port}...`));


 



