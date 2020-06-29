const express     = require('express')
const router      = express.Router()
const instrutores = require('./instrutores') 

router.get('/', (request, response) => {
    return response.redirect('instrutores')
})

router.get('/instrutores', (request, response) => {
    return response.render('instrutores/index')
})

router.get('/instrutores/create', (request, response) => {
    return response.render('instrutores/create')
})

router.post('/instrutores', instrutores.post)

router.get('/membros', (request, response) => {
    return response.send('membros')
})

module.exports = router