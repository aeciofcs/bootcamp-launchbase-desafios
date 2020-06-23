const express  = require('express')
const nunjucks = require('nunjucks') 

//Instanciando o Servidor..
const server   = express()

//Informando ao servidor a pasta dos arquivos
//estáticos
//app.use('/static', express.static())
server.use(express.static('public'))

// Configurando Nunjucks.
server.set('view engine', 'njk');
nunjucks.configure('views', {
    express: server,
    autoescape: false
})

server.get('/', (req, res)=>{
    return res.render('index')
})

server.get('/recipes', (req,res) => {
    return res.render('recipes')
})

server.get('/about', (req,res) => {
    return res.render('about')
})

server.listen(5000, () => {
    console.log('Server is runnnig... ')
})