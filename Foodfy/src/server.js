const express         = require('express')
const nunjucks        = require('nunjucks')
const routes          = require('./routes')
const methodOverrride = require('method-override') 

const server       = express()
const PORT_CONNECT = 4000;

//Informando ao servidor a pasta dos arquivos estáticos --> app.use('/static', express.static())
server.use(express.urlencoded( {extended: true} ))
server.use(express.static('public'))
server.use(methodOverrride('_method'))
server.use(routes)

server.set('view engine', 'njk')
nunjucks.configure('src/app/views', {
    express: server,
    autoescape: false,
    noCache: true
})

server.listen(PORT_CONNECT, () => {
    console.log(`Server is runnnig in port ${PORT_CONNECT}... `)
})