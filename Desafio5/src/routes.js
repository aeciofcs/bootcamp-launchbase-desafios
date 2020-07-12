const express  = require('express')
const router   = express.Router()
const teachers = require('./app/controllers/teachers')
const students = require('./app/controllers/students')

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
router.get('/students', students.index)
router.get('/students/create', students.create)
router.post('/students', students.post)
router.get('/students/:id', students.show)
router.get('/students/:id/edit', students.edit)
router.put('/students', students.update) //No arquivo de confg do Server, colocar a configuração do method override.
router.delete('/students', students.delete)

module.exports = router