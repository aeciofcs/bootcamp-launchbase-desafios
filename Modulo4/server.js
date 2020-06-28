const express      = require('express');
const nunjucks     = require('nunjucks');
const routes       = require('./routes')

const server       = express();
const PORT_CONNECT = 3000;

server.use(express.urlencoded( {extended: true} ));
server.use(express.static('public'));
server.use(routes)

server.set('view engine', 'njk');
nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true
});

server.listen(PORT_CONNECT, ()=>{
    console.log(`Server is Running... Port ${PORT_CONNECT}`)
});