/**
 * The Promise() constructor takes an arqument that is a function with two arguments 
 * (resolve and reject) such that, function(resolve, reject). The resolve and reject arquments
 * in this function are infact methods of the Promise class. We send the resolve() in to the consumer
 * of the promise object.
 */
const p = new Promise((resolve, reject) => {
    //kick off some async work
    //The result of the above async oberation is either a value or an error.
    setTimeout(() => {
        //resolve(1);
        reject(new Error('This error has happend'));
    }, 2000)
    
    
});

p.then(result => console.log('result', result)).catch(err => console.log('Error: ', err.message));