const expres = require('express')
const routes = expres.Router()

routes.get('/', (request, response) => {
    return response.render('layout.njk')
})



module.exports = routes