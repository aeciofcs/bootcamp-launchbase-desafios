const express = require('express')
const webSite = require('./controllers/webSite')
const recipes = require('./controllers/admin')

const routes  = express.Router()

/* ### ROTAS DA ADMINISTRAÇÃO ### */
routes.get('/admin/recipes', recipes.index)
routes.get("/admin/recipes/create", recipes.create)
routes.post("/admin/recipes", recipes.post)
routes.get("/admin/recipes/:id", recipes.show)
routes.get("/admin/recipes/:id/edit", recipes.edit)
routes.put("/admin/recipes", recipes.put)
routes.delete("/admin/recipes", recipes.delete)

// ### ROTAS DO WEBSITE ### //
routes.get('/', webSite.index)
routes.get('/recipes/:index', webSite.recipe)
routes.get('/recipes', webSite.recipes)
routes.get('/about', webSite.about)

module.exports = routes