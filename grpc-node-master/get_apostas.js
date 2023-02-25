const client = require('./client')

client.list({},(error,apostas) => {
    if(!error){
        console.log('LISTA DE APOSTAS');
        console.log(apostas);
    }
    else{
        console.error(error);
    }
});

