const grpc = require('grpc')
//const PROTO_PATH = '../notes.proto'
const EuroMil = grpc.load('../euromil.proto').EuroMil

const client = new EuroMil('localhost:50051',
    grpc.credentials.createInsecure())
    
module.exports = client