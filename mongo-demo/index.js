//MongoDB is not a Relational Database, in fact it is a document or no SQL database, so you basically
//Store your data in form of JSON objects.

/**
 * To install mongodb for MAC and Linux, we can use brew.sh website, and perform 
 * /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
 * then using brew pacakge management we can install mongo db by, brew install mongodb
 * mongodb stores data in the /data/db directory, so you need to create this directory, by
 * mkdir -p /data/db, then you need to make sure that this directory have right permissions so,
 * perform, sudo chown -R `id -un` /data/db, then we need to run mongodamon which is a service that 
 * runs in the background and listens for connections on the given port. in the browser go to
 * www.mongodb.com and download a client to connect to mongodb, so you need to download MongoDB 
 * Compass that is under the compass tab.
 */

/**
 * Non of the above methods worked on my computer so I had to use the following script.
 * apt install linuxbrew-wrapper, then I was able to perform brew install mongodb.
 * Befor installing mongodb I had to run,
 * git -C "$(brew --repo homebrew/core)" fetch --unshallow.
 * 
 * brew didnt work on my computer so I used npm to install mongodb
 * To run mongod on the background for listening, sudo apt install mongodb-server-core
 * then run it by entering mongod on the terminal
 * 
 * To use MongoDB, after installing it we still need a right driver which we can use with 
 * Express, there are few of these dirvers but we are going to use mongoose.
 */

const mongoose = require('mongoose');

/**
 * To connect to mongoDB we need to use the above mogoose object, to call the .connect('') method.
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
 * this model is for. For instance if we want to create a collection (a table in RDB) of classes then 
 * each instance of a class (each row/record in RDB), then the first argument of the .mode() method would be 'Course',
 * and the second argument is the schema which shapes each documents of this database. What .model()
 * method returns is a class so that's why we used the pascal nameing convention for nameing the
 * Course variable.
 */
const Course = mongoose.model('Course', courseSchema);

/**
 * Each decument of our collection is infact a new instance of the above Course class, which
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
 * 
 */
async function getCourses() {
   /**
    * ############################ How to retrive documents from a mongoDB database.
    * 
    * .find() method is a mongoose.model() object which returns all documents in the given collection
    * which in following example is Course. You can pass a filter in to the find to filter the results.
    * For instance, following we are retriving all the published courses which Mosh is the author.
    * Like RDB you can sort the results, limit the number of retuned results, and you also can select a
    * specific properties/attributes in a documents
    * 
    * ########################### Comparision Operators.
    * In mongodb there are multiple operators which can be used for comparing value, these mongoDB
    * Standard operators are available in mongoose as well. These operators are as follow:
    * eq (for equal)
    * ne (for not equal)
    * gte (for greater than or equal to)
    * lt (less than)
    * lte (less than or equal to)
    * in
    * nin (not in)
    * 
    * ########################## Logical Operators ###################
    * .or() to use this method you should call it after .find() wich does not have any filter. However
    * you need to pass in an aray of object into the .or() method for retriveing the alternate values.
    * 
    * .and() method, on the other hand prety much does same thig that filter in .find() method does
    * but somtimes for more complex qeuries it's better to use .and(). like .or() mothod you need to 
    * pass and arry of key value object in to the .and() mothodS
    * 
    * ######################### Regular Expressions ###################
    * Regular Expressions do the samething which - Like '%somthing' - does. So for example if you need to 
    * retrive data that it's author starts with Mosh you need:
    * .find({ author: /^Mosh/ }) - The ^ indicates that the following value should be the begining of the
    * string you are looking for.
    * 
    * On the other hand of you need to look for a value that comes at the end of the string you need:
    * .find('/Hamedani$/') - $ indicates the preceding value should be at the end of the string you are
    * looking for.
    * the above query is case sensitive if you want to ignore case you need to use
    * /^Mosh/i or /Hamedani$/i
    * 
    * If you are looking for string or values which contain a sertain value/string, you need to use
    * the follwoing regular expression:
    * /.*Mosh.*/                                                                                    /*
    * .* in reqular expression means you can have zero or more characters, so in the abavoe regular
    * expression we say we can have zero or more character before or after Mosh
    * 
    * ################################## Counting ###############################
    * If you need to count the number of documents in the result instead using .select(),
    * you can use .count() like following example. Be aware that, .count() returns the number of documents
    * which maches any criteria you have specified 
    * 
    * ################################## Pagination #############################
    * .skip() method is used hand to hand with .limit() method for pagination. The following pageNumber
    * and pageSize variables are to be used for pagination. In real world applications, these values are
    * usually aquired through such as - /api/courses?pageNumber=2&pageSize=10.
    * In order to implement pagination we need to skip all the documents in the previous page. 
    * 
    * ################################## How to update documents in a mongoDB data base ###############
    * There are two approaches to update a document in MongoDB.
    * 1- Frist Approach: Query first
    *       - find by id
    *       - Modyfy its properties
    *       - Then call the .save() mothod
    * 
    * 2- The other Approch is: Update first
    *       - Instead retriveing the document first.
    *       - Connect in to the Database and update directly in database.
    *       - Optionally: get the updated document.   
    * 
    */
   const pageNumber = 2; //This should be page number not page index
   const pageSize = 10;

    const courses = await Course
      //.find({ price: { $gte: 10, $lte: 20 }})
      //.find({ price: { $in: [10, 15, 20] }})
      //.find({ author: 'Mosh', isPublished: true })
      .find({ author: /.*mosh.*/i } )
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .sort({ name: 1}) //the object which is passed sorts the results based on the name and 1 is for
                        //ascending order. For descending order though you can use -1.
      //.select({ name: 1, tags: 1}); //With .select() mothod we can retrive the properties (columns in RDB)
                                    //which we want. .select() methods is similar to select keyword in SQL
      .count()
   console.log(courses);
}

//getCourses();


async function updateCourse(id) {
   //First update approach:
   const course = await Course.findById(id)
   if(!course) return;
   course.isPublished = true;
   course.author = 'Another Author'
}

updateCourse();


