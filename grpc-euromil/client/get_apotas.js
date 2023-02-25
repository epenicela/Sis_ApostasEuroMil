const client = require('./client-grpc')

client.list({}, (error, apostas) => {
    if (!error) {
        console.log(apostas)
    } else {
        console.error(error)
    }
})