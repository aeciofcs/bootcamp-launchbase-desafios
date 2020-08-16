const Recipes = require('../models/Recipes')

exports.index = (request, response) => {
    Recipes.all( (Recipes) => {
        return response.render('Admin/Recipes/index', { recipes: Recipes })
    })
}

exports.create = (request, response) => {
    Recipes.allChefs((Chefs) => {
        return response.render('Admin/Recipes/create', { Chefs })
    })
}

exports.post = (request, response) => {
    const keys = Object.keys(request.body)
    for (const key of keys) {
        if( request.body[key] == "")
            return response.send('Por favor, preencha todos os campos.')
    }
    Recipes.create(request.body, (Recipes) => {
        return response.redirect('/admin/recipes')
    })
}

exports.show = (request, response) => {
    const { id } = request.params
    Recipes.find(id, (Recipe) => {
        return response.render('Admin/Recipes/recipe', {recipe: Recipe})
    })
}

exports.edit = (request, response) => {
    Recipes.allChefs( (Chefs) => {
        const { id } = request.params
        Recipes.find(id, (Recipe) => {
            return response.render('Admin/Recipes/edit', { Recipe, Chefs })
        })
    } )

}

exports.put = (request, response) => {
    Recipes.update(request.body, () => {
        return response.redirect('/admin/recipes')
    })
}

exports.delete = (request, response) => {
    const { id } = request.body
    Recipes.delete(id, () => {
        return response.redirect('/admin/recipes')
    })
}
