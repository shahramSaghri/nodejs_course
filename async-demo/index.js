
console.log('Before');
// getUser(1, (user) => {
//     getRepositories(user.gitHubUsername, (repos) => {
//         getCommits(repos[0], (commits) => {
//             console.log(commits);
//         })
//     })
// });

// getUser(1)
//     .then(user => getRepositories(user.gitHubUsername))
//     .then(repos => getCommits(repos[0]))
//     .then(commits => console.log(commits))
//     .catch(err => console.log('Error: ', err.message));

//########################## Async and Await approach
/**
 * To use async/await pattern first you need to decorate any funciton that returns promise
 * with await modifire, and if you are calling and await function inside another function, the
 * caller function needs to be decorated with async modifire, as following. Be aware that await
 * is only valid in a async function so you must call await funciton in an async function otherwise
 * you get error.
 */
async function displyCommits() {
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user.gitHubUsername);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    }
    catch(err) {
        console.log('Error: ', err.message);
    }
}

displyCommits();


console.log('After');

/**
 * To handel an async operation/process, we have three paterns, callback fucntion, promise, and
 * async/await.
 * In callback pattern, assume you have a function which has an async process, this function
 * cannot return any value because you don't know when the value is ready to be return to instead
 * of the return clause you call a callback function that you passed the promissed value as an
 * argument into it. Then at the time you are calling the caller/parent function, of the callback function,
 * you implement the callback function. as follow.
 */

// function getUser(id, callback) {
//   setTimeout(() => {
//     console.log('Reading a user from a database...');
//     callback({ id: id, gitHubUsername: 'mosh' });
//   }, 2000);
// }

/**
 * To use promise patern instead of the callback patern for the above function.
 * 
 */

function getUser(id) {
    return new Promise((resolve, reject) => {
        //kick off some async work 
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({ id: id, gitHubUsername: 'mosh' });
        }, 2000);
    });
}

// function getRepositories(username, callback) {
//   setTimeout(() => {
//     console.log('Calling GitHub API...');
//     callback(['repo1', 'repo2', 'repo3']);
//   }, 2000);
// }

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            //resolve(['repo1', 'repo2', 'repo3']);
            reject(new Error('Could not get the repos.'));
        }, 2000);
    })

}

// function getCommits(repo, callback) {
//     setTimeout(() => {
//         console.log('Calling GitHub API...');
//         callback(['commit']);
//     }, 2000);
// }

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            resolve(['commit']);
        }, 2000);
    });
}