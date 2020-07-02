const express     = require('express')
const router      = express.Router()
const instrutores = require('./instrutores') 

router.get('/', (request, response) => {
    return response.redirect('instrutores')
})

router.get('/instrutores', instrutores.index)

router.get('/instrutores/create', (request, response) => {
    return response.render('instrutores/create')
})

router.get('/instrutores/:id', instrutores.show)

router.get('/instrutores/:id/edit', instrutores.edit)

router.put('/instrutores', instrutores.put)

router.post('/instrutores', instrutores.post)

router.delete('/instrutores', instrutores.delete)

router.get('/membros', (request, response) => {
    return response.send('membros')
})

module.exports = router