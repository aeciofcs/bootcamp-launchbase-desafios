const Express  = require('express');
const Nunjucks = require('nunjucks');
const Courses  = require('./data');

const Server = Express();

// Usar arquivos estáticos. 
Server.use(Express.static('public'));

// Configurando Nunjucks.
Server.set('view engine', 'njk');
Nunjucks.configure('views', {
    express: Server,
    autoescape: false
});

// Rota para / => raiz da pagina
Server.get('/', (request, response)=>{
    return response.render('contents');    
});

Server.get('/courses', (request, response)=>{
    return response.render('courses', {Courses});
});

Server.get('/about', (request, response)=>{
    const data = {
        title: "Rocketseat",
        description: 'Somos uma comunidade incrível de programadores em busca do próximo nível.</br> Por isso a Rocketseat oferece através de uma plataforma inteligente e metodologia prática, além de comunidade, eventos, conteúdo e conexão com o mercado de trabalho, todas as ferramentas que você precisa para masterizar no menor tempo possível as tecnologias mais modernas de desenvolvimento web e mobile, e dessa forma avançar para o próximo nível como programador.',
        tecnologies: ['HTML5','CSS','JavaScript','JavaScript ES6','NodeJS','ReactJS','React Native'],
        networks: [
            {name: "GitHub", url: "https://github.com/rocketseat"},
            {name: "Facebook", url: "https://facebook.com/rocketseat"},
            {name: "Twitter", url: "https://twitter.com/rocketseat"},
        ]
    };
    return response.render('about', {data});
});

// Rota para pagina não encontrada.
Server.use(function(req, res) {
    res.status(404).render("not-found");
});

//Ligando o Server, porta
Server.listen(5000, ()=>{
    console.log('Server is Running...')
});