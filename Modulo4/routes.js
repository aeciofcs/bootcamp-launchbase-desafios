const express = require('express')
const router  = express.Router()

router.get('/', (request, response) => {
    return response.redirect('instrutores')
})

router.get('/instrutores', (request, response) => {
    return response.render('instrutores/index')
})

router.get('/membros', (request, response) => {
    return response.send('membros')
})

module.exports = router