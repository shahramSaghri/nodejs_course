
// getCustomer(1, (customer) => {
//     console.log('Customer: ', customer);
//     if(customer.isGold) {
//         getTopMovies((topMovi) => {
//             console.log('Top Movies: ', topMovi);
//             sendEmail(customer.email, topMovi, () => {
//                 console.log('Email sent...');
//             });
//         });

//     }
// });

async function notifyCustomer() {
    const customer = await getCustomer(1);
    console.log('Customer: ', customer);
    if(customer.isGold) {
        const topMovi = await getTopMovies();
        console.log('Top Movies: ', topMovi);
        const results = await sendEmail(customer.email, topMovi);
        console.log('Email sent...');

    }
}

notifyCustomer();

function getCustomer(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                id: 1,
                name: 'Mosh Hamedani',
                isGold: true,
                email: 'email'
            })
        }, 4000);
    })
}

function getTopMovies(callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['movie1', 'movie2']);
        }, 4000)
    })
}

function sendEmail(email, movies) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 4000);
    })
}