const data = require('../../../data.json')
const fs   = require('fs')
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
    const index = request.params.id
    const recipe = data.recipes[index]

    return response.render('Admin/Recipes/edit', {recipe, index})
}

exports.put = (request, response) => {
    const index       = request.body.id
    const foundRecipe = data.recipes[index]
    if (!foundRecipe) return response.send(`Receita não encontrada. index: ${index}`)

    let {imagem_url, nome_receita, autor_receita, ingrediente, modo_preparo, informacoes_adicionais} = request.body
    
    const newRecipe = {
        ...foundRecipe,
        image: imagem_url,
        title: nome_receita,
        author: autor_receita,
        ingredients: ingrediente,
        preparation: modo_preparo,
        information: informacoes_adicionais
    }

    data.recipes[index] = newRecipe

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err)=>{
        if(err) return response.send('Erro na gravação do arquivo DATA.JSON')
        return response.redirect('/admin/recipes')
    })
}

exports.delete = (request, response) => {
    const recipeIndex  = request.body.id
    const foundRecipes = data.recipes.filter( (membro, index) => {
        return index != recipeIndex
    })
    
    data.recipes = foundRecipes
    
    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err)=>{
        if(err) return response.send('Erro na gravação do arquivo DATA.JSON')
    })
    return response.redirect('/admin/recipes')
}
