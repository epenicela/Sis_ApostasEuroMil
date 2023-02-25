const client = require('./client')

let novaAposta = {
    key: 'KEY-1001', 
    checkid: '5651904096323030', 
    id: '1'
 }

 client.insert(novaAposta,(error,aposta) => {
     if(!error){
         console.log('NOVA APOSTA INSERIDA COM SUCCESSO');

     }
     else{
         console.error(error);
     }
 })