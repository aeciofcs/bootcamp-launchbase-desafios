const Website = require('../models/Website')

exports.index = async (request, response)=>{
    try {
        //Substituir pelas receitas mais acessadas.
        const Recipes = ( await Website.all() ).rows

        return response.render('Site/index', { Recipes })
    } catch (error) {
        console.error(`INDEX => ${error}`)
    }
}

exports.recipes = async (request, response) => {
    try {
        const Recipes = ( await Website.all() ).rows
        
        return response.render('Site/Recipes/recipes', { Recipes })
    } catch (error) {
        console.error(`RECIPES => ${error}`)
    }
}

exports.recipe = async (request, response) => {
    try {
        const { id } = request.params
        const Recipe = ( await Website.findRecipes(id) ).rows[0]
        
        return response.render('Site/Recipes/recipe', { Recipe } )
    } catch (error) {
        console.error(`Recipe => ${error}`)
    }
}

exports.chefs = (request, response) => {
    try {
        const Chefs = [{
            avatar_url: '',
            name: 'Aecio', 
            total_recipes: 0,
        }]

        return response.render('Site/Chefs/index', { Chefs })
    } catch (error) {
        console.error(`INDEX CHEFS => ${error}`)
    }
}

exports.about = (request, response) => {
    return response.render('Site/about')
}