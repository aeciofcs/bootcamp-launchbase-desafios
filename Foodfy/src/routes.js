const express           = require('express')
const webSiteController = require('./app/controllers/webSite')
const recipesController = require('./app/controllers/recipes')
const adminController   = require('./app/controllers/admin')
const chefsController   = require('./app/controllers/chefs')

const routes  = express.Router()
// ### ROTAS DO WEBSITE ### //
routes.get('/', webSiteController.index)
routes.get('/recipes/:index', webSiteController.recipe)
routes.get('/recipes', webSiteController.recipes)
routes.get('/about', webSiteController.about)

/* ### => ROTAS DA ADMINISTRAÇÃO ### */

/* # PAGINA INICIAL DA ADMINISTRAÇÃO */
routes.get('/admin', adminController.index)

/* # CRUD DE RECEITAS */
routes.get('/admin/recipes', recipesController.index)
routes.get("/admin/recipes/create", recipesController.create)
routes.post("/admin/recipes", recipesController.post)
routes.get("/admin/recipes/:id", recipesController.show)
routes.get("/admin/recipes/:id/edit", recipesController.edit)
routes.put("/admin/recipes", recipesController.put)
routes.delete("/admin/recipes", recipesController.delete)

/* # CRUD DOS CHEFs */
routes.get('/admin/chefs', chefsController.index)
routes.get("/admin/chefs/create", chefsController.create)
routes.post("/admin/chefs", chefsController.post)
routes.get("/admin/chefs/:id", chefsController.show)
routes.get("/admin/chefs/:id/edit", chefsController.edit)
routes.put("/admin/chefs", chefsController.put)
routes.delete("/admin/chefs", chefsController.delete)

/* ### <= ROTAS DA ADMINISTRAÇÃO ### */

module.exports = routes