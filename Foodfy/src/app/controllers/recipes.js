const Recipes = require('../models/Recipes')

exports.index = async (request, response) => {
    try {
        const indexRecipes = ( await Recipes.all() ).rows

        return response.render('Admin/Recipes/index', { Recipes: indexRecipes })
    } catch (error) {
        console.error(`INDEX => ${error}`)
    }
}

exports.create = async (request, response) => {
    try {
        const Chefs = ( await Recipes.allChefs() ).rows

        return response.render('Admin/Recipes/create', { Chefs })
    } catch (error) {
        console.error(`CREATE => ${error}`)
    }
}

exports.post = async (request, response) => {
    try {
        const keys = Object.keys(request.body)
        for (const key of keys) {
            if( request.body[key] == "")
                return response.send('Por favor, preencha todos os campos.')
        }
        
        const data     = request.body
        const recipeId = ( await Recipes.create(data) ).rows[0].id
        console.log(`ID da Receita criada: ${recipeId}`)

        return response.redirect('/admin/recipes')
    } catch (error) {
        console.error(`POST => ${error}`)
    }
}

exports.show = async (request, response) => {
    try {
        const { id }     = request.params
        const showRecipe = ( await Recipes.find(id) ).rows[0]
        
        return response.render('Admin/Recipes/recipe', { Recipe: showRecipe })
    } catch (error) {
        console.error(`SHOW => ${error}`)
    }
}

exports.edit = async (request, response) => {
    try {
        const { id }      = request.params
        const Chefs       = ( await Recipes.allChefs() ).rows
        const recipeFound = await Recipes.find(id)

        const Recipe  = {
            ...recipeFound.rows[0],
            Chefs
        }

        return response.render('Admin/Recipes/edit', { Recipe })
    } catch (error) {
        console.error(`EDIT => ${error}`)
    }
}

exports.put = async (request, response) => {
    try {
        const data = request.body
        await Recipes.update(data)

        return response.redirect('/admin/recipes')
    } catch (error) {
        console.error(`PUT => ${error}`)
    }
}

exports.delete = async (request, response) => {
    try {
        const { id } = request.body
        await Recipes.delete(id)

        return response.redirect('/admin/recipes')
    } catch (error) {
        console.error(`DELETE CONTROLLER => ${error}`)
    }
}
