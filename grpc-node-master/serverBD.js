const grpc = require('grpc');
//const uuid = require('uuid/v1');
const apostaProto = grpc.load('euromil.proto')
const server = new grpc.Server()

/*
const Loders = require('./loaders')

Loders.start();

const apostaController = require('./controllers/ApostaControl');

let dados=apostaController.findAll();
*/

let apostas = [
    { key: 'KEY-0010', checkid: '5651904096323030', id: '1'}
]

server.addService(apostaProto.EuroMil.service,{
    list : (_,callback) =>{
        callback(null,apostas)
    },
    insert : (call,callback) => {
        let aposta = call.request;
        //aposta.id = uuid()
        apostas.push(aposta)

        callback(null,aposta)
    },
    update : (call,callback) => {
        let aposta = apostas.find((t) => t.key === call.request.key);
        if(aposta){

            aposta.title = call.request.title
            aposta.iscompleted = call.request.iscompleted

            callback(null,aposta)
        }
        else{

            callback({
                code : grpc.status.NOT_FOUND,
                details : "Not Found"
            })

        }
    },
    delete : (call,callback) => {
        let apostaDelete = apostas.find((n) => n.key === call.request.key);
        if(apostaDelete != -1){

            apostas.splice(apostaDelete,1)
            callback(null,{})

        }
        else{

            callback({
                code : grpc.status.NOT_FOUND,
                details : "Not Found"
            })
            
        }
    }

})

server.bind('127.0.0.1:50051',
grpc.ServerCredentials.createInsecure())
console.log('Sevidor ligado em http://127.0.0.1:50051')
server.start()
console.log('')

