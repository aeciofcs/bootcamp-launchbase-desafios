const express = require('express')
const router  = express.Router()
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

router.post('/teachers', teachers.post)

router.get('/students', (request, response) => {
    return response.render('students/index')
})

module.exports = router