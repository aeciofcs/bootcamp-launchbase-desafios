const expres            = require('express')
const routes            = expres.Router()
const ProductController = require('./app/controllers/ProductController')

routes.get('/', (request, response) => {
    return response.render('layout.njk')
})

routes.get('/products/create', ProductController.create)
routes.get('/products/:id/edit', ProductController.edit)

routes.post('/products', ProductController.post)
routes.put('/products', ProductController.put)
routes.delete('/products', ProductController.delete)


// Alias
routes.get('/ads/create', (request, response) => {
    return response.redirect('/products/create')
})



module.exports = routes