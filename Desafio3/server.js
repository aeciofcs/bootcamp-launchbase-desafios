const Express  = require('express');
const Nunjucks = require('nunjucks');

const Server = Express();

// Usar arquivos estáticos. 
Server.use(Express.static('public'));

// Configurando Nunjucks.
Server.set('view engine', 'html');
Nunjucks.configure('views', {
    express: Server
});

// Rota para / => raiz da pagina
Server.get('/', (request, response)=>{
    return response.render('index');    
});

Server.get('/courses', (request, response)=>{
    return response.render('courses');
});

Server.get('/about', (request, response)=>{
    return response.render('about');
});

//Ligando o Server, porta
Server.listen(5000, ()=>{
    console.log('Server is Running...')
});