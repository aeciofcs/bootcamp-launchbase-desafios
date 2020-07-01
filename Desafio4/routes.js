const express  = require('express')
const router   = express.Router()
const teachers = require('./teachers')

router.get('/', (request, response) => {
    return response.render('index')
})

router.get('/teachers', (request, response) => {
    return response.render('teachers/index')
})

router.get('/teachers/create', (request, response) => {
    return response.render('teachers/create')
})

router.get('/teachers/:id', teachers.show)

router.get('/teachers/:id/edit', teachers.edit)

router.post('/teachers', teachers.post)

router.put('/teachers', teachers.update) //No arquivo de confg do Server, colocar a configuração do method override.

router.delete('/teachers', teachers.delete)

router.get('/students', (request, response) => {
    return response.render('students/index')
})

module.exports = router