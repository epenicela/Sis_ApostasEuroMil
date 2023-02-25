const client = require('./client');

let aposta = {
    key: 'KEY-0010', 
    checkid: '5651904096323030',
    id: '1'
}

client.update(aposta,(error,aposta) => {
    if(!error){
        console.log('ATUALIZADO COM SUCESSO',aposta)
    }
    else{
        
        console.error(error)
    }
})