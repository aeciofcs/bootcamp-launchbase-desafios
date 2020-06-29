const express = require('express')
const router  = express.Router()

router.get('/', (request, response) => {
    return response.render('index')
})

router.get('/teachers', (request, response) => {
    return response.render('teachers/index')
})

router.get('/teachers/create', (request, response) => {
    return response.render('teachers/create')
})

router.post('/teachers', (request, response) => {
    return response.send('DADOS DO PROFESSOR RECEBIDO !')
})

router.get('/students', (request, response) => {
    return response.render('students/index')
})

module.exports = router