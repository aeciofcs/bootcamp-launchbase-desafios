const Express = require('express');
const Server = Express();

Server.get('/', (request, response)=>{
    response.send('Oi');    
});


Server.listen(5000, ()=>{
    console.log('Server is Running...')
}); // Iniciando o Servidor.. porta 5000