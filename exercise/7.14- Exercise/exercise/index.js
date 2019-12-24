const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect ot MongoDB...', err));

const coruseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now},
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', coruseSchema);

async function getCourses () {
    const courses = await Course
        .find({ isPublished: true, tags: 'backend' })
        .sort({ name: 1 })
        .select({ name: 1, author: 1});
    
    return courses;

}

async function getBackFrontCourses () {
    const backFrontCourses = await Course
        //.find({ isPublished: true, tags: { $in: ['frontend', 'backend'] }})
        .find({ isPublished: true})
        .or([ {tags: 'frontend'}, {tags: 'backend'} ])
        //.sort( { price: -1 })
        .sort('-price')
        //.select({ name: 1, author: 1, tags: 1});
        .select('name author price')
    return backFrontCourses;
}

async function getFifteenDollarCourse() {
    const fifteenDollarCourse = await Course
        .find({ isPublished: true})
        .or([{price: { $gte: 15 }}, {name: /.*by.*/i}])
        .sort('-price')
        .select('name author price')
    return fifteenDollarCourse;
}
/**
 * The following script can be used to console out the result
 * of the getCourse() function which returns a promise but
 * a better solution is offered following.
 */
//getCourses().then(result => console.log(result));

/**
 * The following is a better practice.
 */

 async function run() {
    //const courses = await getCourses();
    //const courses = await getBackFrontCourses();
    const courses = await getFifteenDollarCourse();
    console.log(courses);
 }

 run();