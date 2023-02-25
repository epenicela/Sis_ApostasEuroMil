const grpc = require('grpc');

const PROTO_PATH = './euromil.proto'

const EuroMil = grpc.load(PROTO_PATH).EuroMil

const client = new EuroMil('localhost:50051',
grpc.credentials.createInsecure())

module.exports = client