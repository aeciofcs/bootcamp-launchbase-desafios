const express  = require('express')
const router   = express.Router()
const teachers = require('./teachers')

router.get('/', (request, response) => {
    return response.render('index')
})


/* ## ROUTES -> TEACHERS */
router.get('/teachers', teachers.index)

router.get('/teachers/create', teachers.create)

router.post('/teachers', teachers.post)

router.get('/teachers/:id', teachers.show)

router.get('/teachers/:id/edit', teachers.edit)

router.put('/teachers', teachers.update) //No arquivo de confg do Server, colocar a configuração do method override.

router.delete('/teachers', teachers.delete)


/* ## ROUTES -> STUDENTS */
router.get('/students', (request, response) => {
    return response.render('students/index')
})

module.exports = router