const grpc = require('grpc')
const apostasProto = grpc.load('euromil.proto')

const apostas = [
    { key: '1', checkid: '5651904096323030'},
    { key: '2', checkid: '6269284518386970'}
]
const server = new grpc.Server();

server.addService(apostasProto.EuroMil.service, {
    list: (_, callback) => {
        callback(null, apostas)
    },
})

server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure());
console.log('Server running at http://127.0.0.1:50051')
server.start()
