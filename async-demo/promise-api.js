/**
 * If you are processing a promise that is already resolved you can use the follwoing,
 */

const p_resolve =  Promise.resolve({id: 1});
p_resolve.then(result => console.log(result));

/**
 * Dealing with a already rejected promise
 */
// const p_reject = Promise.reject(new Error('reason for rejection...'));
// p.catch(err => console.log(err));

/**
 * If you need to run a few async operation in pararel.
 * Here we still don't have multi treading, or concurrancy, and we are processing with one thread
 * but our single thread is running/kicking off multiple async operation almost at the same time.
 * In this case results will be available in form of an array. In this case if one of the 
 * promises rejected the array of result won't be returned instead all promises will be rejected.
 */
const p1 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operation 1...');
        resolve(1);
    }, 2000);
});

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operation 2...');
        resolve(2);
    }, 2000);
});

// Promise.all([p1, p2])
//     .then(result => console.log(result));

/**
 * If you don't need all promises to be resolved to do you next operation, instead you need to 
 * to do somthing after gitting result for the first promise you do the following:
 */

 Promise.race([p1, p2])
    .then(result => console.log(result))
    .catch(err => console.log('Error', err.message));
     