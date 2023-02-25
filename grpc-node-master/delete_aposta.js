const client =require('./client')

client.delete({ key : 'KEY-1000' },(error,_) => {
    if(!error){
        console.log('REMOVIDO COM SUCESSO')
    }
    else{
        console.error(error)
    }

})
