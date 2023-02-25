const grpc = require('grpc');
const apostaProto = grpc.load('euromil.proto')
const server = new grpc.Server()

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); // Conexão com o banco de dados em memória

// Criação da tabela de apostas
db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS apostas (key TEXT, checkid TEXT, id INTEGER)');
});

server.addService(apostaProto.EuroMil.service,{
    list : (_,callback) =>{
        // Consulta ao banco de dados para listar as apostas
        db.all('SELECT * FROM apostas', (err, rows) => {
            if (err) {
                callback(err);
            } else {
                callback(null, rows);
            }
        });
    },
    insert : (call,callback) => {
        let aposta = call.request;
        // Inserção da nova aposta no banco de dados
        db.run('INSERT INTO apostas (key, checkid, id) VALUES (?, ?, ?)', [aposta.key, aposta.checkid, aposta.id], (err) => {
            if (err) {
                callback(err);
            } else {
                callback(null, aposta);
            }
        });
    },
    update : (call,callback) => {
        let aposta = call.request;
        // Atualização da aposta no banco de dados
        db.run('UPDATE apostas SET checkid = ?, id = ? WHERE key = ?', [aposta.checkid, aposta.id, aposta.key], (err) => {
            if (err) {
                callback(err);
            } else {
                callback(null, aposta);
            }
        });
    },
    delete : (call,callback) => {
        let key = call.request.key;
        // Remoção da aposta no banco de dados
        db.run('DELETE FROM apostas WHERE key = ?', [key], (err) => {
            if (err) {
                callback(err);
            } else {
                callback(null, {});
            }
        });
    }
});

server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure());
console.log('Sevidor ligado em http://127.0.0.1:50051')
server.start();
console.log('');
