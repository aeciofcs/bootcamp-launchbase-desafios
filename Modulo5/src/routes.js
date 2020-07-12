const express     = require('express')
const router      = express.Router()
const instrutores = require('./app/controllers/instrutores')
const membros     = require('./app/controllers/membros')

router.get('/', (request, response) => {
    return response.redirect('instrutores')
})

/* ## Rotas -> Instrutores */
router.get('/instrutores', instrutores.index)
router.get('/instrutores/create', instrutores.create)
router.post('/instrutores', instrutores.post)
router.get('/instrutores/:id', instrutores.show)
router.get('/instrutores/:id/edit', instrutores.edit)
router.put('/instrutores', instrutores.put)
router.delete('/instrutores', instrutores.delete)

/* ## Rotas -> Membros */
router.get('/membros', membros.index)
router.get('/membros/create', membros.create)
router.post('/membros', membros.post)
router.get('/membros/:id', membros.show)
router.get('/membros/:id/edit', membros.edit)
router.put('/membros', membros.put)
router.delete('/membros', membros.delete)

module.exports = router