const express     = require('express')
const nunjucks    = require('nunjucks')
const dataRecipes = require('./data') 

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
    return res.render('index', {dataRecipes})
})

server.get('/recipes', (req,res) => {
    //console.log(dataRecipes.findIndex( (recipe)=>{ return recipe.title === 'Asinhas de frango ao barbecue'} ))
    return res.render('recipes', {dataRecipes})
})

server.get('/about', (req,res) => {
    return res.render('about')
})

server.listen(5000, () => {
    console.log('Server is runnnig... ')
})