const client = require('./client-grpc')

let newApostas = {
    key: '3', 
    checkid: '7768573471959418'
 }

 client.Add(newApostas,(error,apostas) => {
     if(!error){
         console.log('New Todo inserted successfully');
     }
     else{
         console.error(error);
     }
 })