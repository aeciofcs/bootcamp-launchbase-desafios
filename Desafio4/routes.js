const express = require('express')
const router  = express.Router()

router.get('/', (request, response) => {
    return response.render('index')
})

router.get('/teachers', (request, response) => {
    return response.render('teachers/index')
})

router.get('/students', (request, response) => {
    return response.render('students/index')
})

module.exports = router