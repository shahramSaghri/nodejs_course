/**
 * The following statement retuns a function, so express
 * is in fact a function and you can call it like
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

const Joi = require('joi');
const express = require('express');
const app = express(); //in fact app is an alias for the 
                       //express fucntion

 //express.json() returns a piece of middleware
 //and then we call app.use() to use that middleware in the
 //request processing pipeline
app.use(express.json());


const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
];

/**
 * For example the app.get() method takes two arguments
 * The first argument is the path or url which exposes
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
 * gives us information about incoming request
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
    //Here we need some logic to retreive the course
    //with the given id
    //.find((element, index, array) => {}, thisValue) 
    //is an array method in JavaScript that 
    //you can call it through an existing array.
    //This fucntion has two arguments, the first argument
    //is a function that itself has three arguments
    //one of the three arguments is the current element
    //of the array. in other word, this callback function
    //takes each element of the array as its argument and 
    //applies some logic to it. the return value of this
    //call back function should be boolean, such that 
    //if the call back function returns true the find fucntion
    //returns the corresponding element.
    //find() function will be used to find a course with
    //the given criteria, such that this callback function
    //will return a boolean value. The req.params.id
    //returns string, so for the following comparision to 
    //work we need to pars it to an integer which can be done
    //with '+' alternatively you can use the
    //parseInt() method.
    const course =  courses.find(c => c.id === +req.params.id)
    if(!course) {
        res.status(404).send('The course with the given ID was not found');
        return;
    }else{
        res.send(course);
    }

     
});

//We use http post request to create a new course
/**
 * pay attension that when you post you post to the
 * collection of the courses that's why we post to the
 * courses.
 * In the following route handler, we need to read
 * the course object that is contained in the body
 * of the request which itself contains the new course's info,
 * use its properties to create a new course object and
 * add that course object to the courses array.
 * 
 */
app.post('/api/courses/add', (req, res) => {
    //since we are not working with an accuall database
    //we need to manually assign an id. When there is
    //a database that we get data from the id would be
    //assigned by database

    /**
     * Never ever trust the client input, and always
     * validate the client input, for example in follwoing example
     * we are validating if a client forgot to enter the name
     * of the course that she/he is creating and if she/he
     * entered the name is it more than 3 character?
     */

    /** 
     * Instead the following validation method we can
     * use Joi API for validating the user input 
     */
    /*
    if(!req.body.name || req.body.name.length < 3) {
        //The RESTful application convention is
        //to return a bad request code and messeage
        //400 Bad Request
        res.status(400).send('Name is required and should be minimum 3 characters.');
        return;
    }
    */
    /**
     * To use Joi fist we need to set a schema which
     * basically determines what needs to be validated
     * and how it should be validated by determining 
     * certain creteria.
     * if the input that you are validating has the 
     * json structure the schema should have the same
     * structure with the same fields as follwoing:
     */

     const schema = {
         name: Joi.string().min(3).required()
     }
    
    
    /**
     * To validate the user input then we can use the 
     * .validate() method that Joi provides us.
     * This method takes two argument the first arqument
     * is what ever you want to validate and the second
     * argument is the schema. Note that for first 
     * argument we passd the entire body of the request not
     * just a property of it.
     */
    const result = Joi.validate(req.body, schema);
    /**
     * what Joi.validate() returns, is a specific object
     * whith the follwoing structure:
     * { 
     *   error: null,  //if ther is no error it would be null
     *   value: { this would be the json from the req body},
     *   then: [Function: then],
     *   catch: [Function: catch]
     * }
     * So you can have access to any of the above properties
     * through the dot ( . ) operator
     * note that only eigther of error or value properties 
     * could have value.
     */
    console.log(result);

    /**
     * Now we can use the result variable to validate
     * the user's input, such that
     */

    if(result.error) {
        //400 Bad Request
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        //we need to read the name of the new course
        //from the body of the request.
        //for the following line to work
        //we need to enable parsing up our json object
        //in the body of the request. Because by default
        //this feature is not enabled in express
        //so we enable this feature by app.use(express.json())
        //which adds a peace of middleware to this file.
        name: req.body.name
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

//A route can have multiple parameters such as
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params) //here you are accessing
                         //the params object as a whole
                         //but you can access each individual
                         //property of this opject by dot
                         //operator
});

app.put('/api/courses/:id', (req, res) => {
    /**
     * Logic that we need to implement here:
     * Look up the course.
     * if the course does not exist return 404 status code
     * Otherwiese validate the user input
     * if invalid return an error send status code 400 
     * and a message indicating the problem
     * if valid update the course as:
     */

    const id = +req.params.id;
    const course = courses.find(course => course.id === id);
    if(!course) {
        res.status(404).send(`The course with ID: ${id}, was not found`);
        return;
    }else{
        
        //const userInput = validateCourse(req.body);
        const { error } = validateCourse(req.body);
        if(error /*userInput.error*/) {
            res.status(400).send(userInput.error.details[0].message);
            return;
        }
        //For updating the course we just reassign 
        //each filed that has been updated separately
        course.name = req.body.name;
        res.send(course);
    }
});

/**
 * As a best practice is better not to define the same
 * schema that you might use for different validation over
 * and over, instead we can define a validation function
 * as follow.
 */
function validateCourse(course) {
    schema = {
        name: Joi.string().min(3).required()
    }
    /**
     * Note that the .validate() function returns 
     * a spesific object that contains error and value
     * properties so the return value of validateCourse
     * would be the same object.
     */

    return Joi.validate(course, schema);
}

//To handel a HTTP delete request.
app.delete('/api/courses/:id', (req, res) => {
    // Look up the course
    // if it course does not exist return 404 Bad request

    const id = parseInt(req.params.id);
    const course = courses.find(c => c.id === id);

    if(!course) {
        res.status(404).send(`Course with ID: ${id} was not found`);
        return;
    }

    //Otherwise delete the course and by convention
    /**
     * To delete a courese first we need to find the 
     * index of the element we need to delete such that
     */

     const index = courses.indexOf(course);
     const removedElement = courses.splice(index, 1);

    //return the deleted course
    res.send(removedElement);

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


 



