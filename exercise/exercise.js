/**
 * Rewrite the following script in  async await fashion.
 */
getCustomer(1, (customer) => {
    console.log('Customer: ', customer);
    if(customer.isGold) {
        getTopMovies((topMovi) => {
            console.log('Top Movies: ', topMovi);
            sendEmail(customer.email, topMovi, () => {
                console.log('Email sent...');
            });
        });

    }
});



function getCustomer(id, callback) {
    setTimeout(() => {
        callback({
            id: 1,
            name: 'Mosh Hamedani',
            isGold: true,
            email: 'email'
        })
    }, 4000);
}

function getTopMovies(callback) {
    setTimeout(() => {
        callback(['movie1', 'movie2']);
    }, 4000)
}

function sendEmail(email, movies, callback) {
    setTimeout(() => {
        callback();
    }, 4000);
}