const express = require('express')
const webSite = require('./controllers/webSite')
const recipes = require('./controllers/recipes')
const admin   = require('./controllers/admin')
const chefs   = require('./controllers/chefs')

const routes  = express.Router()
// ### ROTAS DO WEBSITE ### //
routes.get('/', webSite.index)
routes.get('/recipes/:index', webSite.recipe)
routes.get('/recipes', webSite.recipes)
routes.get('/about', webSite.about)

/* ### => ROTAS DA ADMINISTRAÇÃO ### */

/* # PAGINA INICIAL DA ADMINISTRAÇÃO */
routes.get('/admin', admin.index)

/* # CRUD DE RECEITAS */
routes.get('/admin/recipes', recipes.index)
routes.get("/admin/recipes/create", recipes.create)
routes.post("/admin/recipes", recipes.post)
routes.get("/admin/recipes/:id", recipes.show)
routes.get("/admin/recipes/:id/edit", recipes.edit)
routes.put("/admin/recipes", recipes.put)
routes.delete("/admin/recipes", recipes.delete)

/* # CRUD DOS CHEFs */
routes.get('/admin/chefs', chefs.index)
routes.get("/admin/chefs/create", chefs.create)
routes.post("/admin/chefs", chefs.post)
routes.get("/admin/chefs/:id", chefs.show)
routes.get("/admin/chefs/:id/edit", chefs.edit)
routes.put("/admin/chefs", chefs.put)
routes.delete("/admin/chefs", chefs.delete)

/* ### <= ROTAS DA ADMINISTRAÇÃO ### */

module.exports = routes