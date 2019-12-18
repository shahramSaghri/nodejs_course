//MongoDB is not a Relational Database, in fact it is a document or no SQL database, so you basically
//Store your data in form of JSON oabjects.

/**
 * To install mongodb for MAC and Linux, we can use brew.sh website, and perform 
 * /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
 * then using brew pacakge management we can install mongo db by, brew install mongodb
 * mongodn stores data in the /data/db directory, so you need to create this directory, by
 * mkdir -p /data/db, then you need to make sure that this directory have right permissions so,
 * sudo chown -R `id -un` /data/db then we need to run mongodamon which is a service that runs
 * in the background and listens for connections on the given port. in the browser go to
 * www.mongodb.com and download a client to connect to mongodb, so you neex to download MongoDB Compass
 * that is under the compass tab.
 */

/**
 * Non of the above methods work on my computer so I had to use the following script.
 * apt install linuxbrew-wrapper, then I was able to perform brew install mongodb.
 * Befor installing mongodb I had to run,
 * git -C "$(brew --repo homebrew/core)" fetch --unshallow.
 * 
 * To run mongod on the background for listening, sudo apt install mongodb-server-core
 * then run it by entering mongod on the terminal
 * 
 * To use MongoDB, after installing it we still need a right driver which we can use with 
 * Express, there are few of these dirvers but
 */

const mongoose = require('mongoose');

/**
 * To connect to mongoDB ve need to use the above mogoose object, to call the .connect('') method.
 * we need to pass the connection string 'mongodb://localhost', in to this method. The best practice is
 * to get connection string from a configuration file.
 */

mongoose.connect('mongodb://localhost/playgournd')
   .then(() => console.log('Connected to MongoDB...'))
   .catch(err => console.error('Could not connect to MongoDB...', err));

/**
 * After connecting in to the mongoDB, we need to create a schema. schema is how to shape the 
 * documents Within a collection in mongoDB. A collection in mongoDB is like a table
  * in the relational database. Each collection might have as many documents which is like rows of
  * a table. The list of types that we can use in a schema are:
  * 1- String
  * 2- Number
  * 3- Date
  * 4- Buffer which is used for storing binary data
  * 5- Boolean
  * 6- ObjectID which is used for assigning unique identifires, like primary key in realational database.
  * 7- Array
  * 
 */

const courseSchema = new mongoose.Schema({
   name: String,
   author: String,
   tags: [String],
   //date: Date     OR you can use the following script to give a defualt date value
   date: { type: Date, default: Date.now },
   isPublished: Boolean
});

/**
 * How to create and save a document based on the document's schema, to do so we need to
 * compile the above schema into a model. So we need to create a course class and then create 
 * an instance of it, which we can save this instance to our data base. To create a class
 * like Course we need to compile it's schema into a model, using .model() method with mongoose
 * object offers. this method receives two arguments, one is the singular name of the collection which
 * this model is for. For instance if we want to create a collection (a table in RDB) of classes then each instance of
 * a class (each row record in RDB), then the first argument of the .mode() method would be 'Course'.  
 * and the second argument is the schema which shapes each documents of this database. What .model()
 * method returns is a class so that's why we used the pascal naming convention for naming the
 * Course variable.
 */
const Course = mongoose.model('Course', courseSchema);

/**
 * Each decument of our collection is infact a new instance of the above course class, which
 * should be instanciated as follow.
 */


async function createCourse() {
   const course = new Course({
      name: 'Angular Course',
      author: 'Mosh',
      tags: ['Angular', 'frontend'],
      isPublished: true
   })


   try {

      const result = await course.save();
      console.log(result);
   }
   catch (err) {
      console.log('Error: ', err.message);
   }
}

//createCourse();

/**
 * How to retrive documents from a mongoDB database.
 */
async function getCourses() {
   const courses= await Course.find();
   console.log(courses);
}

getCourses();



