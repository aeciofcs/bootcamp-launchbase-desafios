const expres            = require('express')
const routes            = expres.Router()
const ProductController = require('./app/controllers/ProductController')
const multer            = require('./app/midddlewares/multer')

routes.get('/', (request, response) => {
    return response.render('layout.njk')
})

routes.get('/products/create', ProductController.create)
routes.get('/products/:id/edit', ProductController.edit)
routes.get('/products/:id', ProductController.show)

routes.post('/products', multer.array('photos', 6), ProductController.post)
routes.put('/products', multer.array('photos', 6), ProductController.put)
routes.delete('/products', ProductController.delete)


// Alias
routes.get('/ads/create', (request, response) => {
    return response.redirect('/products/create')
})



module.exports = routes