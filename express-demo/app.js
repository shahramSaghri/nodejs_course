const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json())

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
]

app.get('/', (req, res) => {
    res.send('Hello world');
})

app.post('/api/courses', (req, res) => {
    /**
     * Instead using the following logic for input validation, we can use joi npm package
     * like following
     */
    // if(!req.body.name || req.body.name.length < 3) {
    //     res.status(400).send('Name is required and shoud be minimum 3 characters.');
    //     return;
    // }

    /**
     * To use joi first we need to install it, then import it. Be aware that require('joi')
     * returns a class.
     * To use joi class:
     * 1- you need to set an schema, that is the conditions you need to be evaluated
     * Schema is inform of a javaScript object.
     * 2- you need to call validate() method of Joi class and send req.body and schema as
     * the first and second arqument. This method returns an object. so you can store it in a 
     * variable. This object has to property which can be used for writing our logic
     * for validation.
     */

    const schema = {
        name: Joi.string().min(3).required()
    }

    const result = Joi.validate(req.body, schema);


    //console.log(result);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const newCourse = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(newCourse);
    res.send(newCourse);
})

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with the given id is not found');
        return;
    }
    
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with the given id was not found');
        return;
    }

    // const schema = {
    //     name: Joi.string().min(3).required()
    // }
    //const validationResult = Joi.validate(req.body, schema);
    /**
     * For input validation here we can use a function instead repeating 
     * the above codes
     */

    /**
     * Since for input validation we only need error property of the Joi.validate(req.body, schema)
     * so instead of assigning the entire object in to a variable, we can extract is with
     * destructuring. as follow
     */

    //const validationResult = validateCourse(req.body)

    const { error } = validateCourse(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    course.name = req.body.name;

    res.send(course);

})

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) {
        res.status(404).send('The course with the given ID was not found');
        return
    } 

    index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});


/**
 * 
 * @param {*} course
 * The following function, which uses Joi class, validates user's inputs and returns
 * a Joi class validation object, which has two properties, error and value.
 */
function validateCourse(course) {
    schema = {
        name: Joi.string().min(3).required()
    }

    const result = Joi.validate(course, schema);

    return result;
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})


