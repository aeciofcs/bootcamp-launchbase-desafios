const Chef = require('../models/Chef')

exports.index = async (request, response) => {
    try {
        const Chefs = ( await Chef.all() ).rows

        response.render('Admin/chefs/index', { Chefs })
    } catch (error) {
        console.error(`INDEX => ${error}`)
    }
}

exports.create = (request, response) => {
    return response.render('Admin/Chefs/create')
}

exports.post = async (request, response) => {
    try {
        const keys = Object.keys(request.body)
        for (const key of keys) {
            if( request.body[key] == "")
                return response.send('Por favor, preencha todos os campos.')
        }

        const data    = request.body
        const results = await Chef.create(data)
        console.log(`Chef criado com ID: ${results.rows[0].id}`)
        
        return response.redirect('/admin/chefs')
    } catch (error) {
        console.log(`POST => ${error}`)
    }
}

exports.show = async (request, response) => {
    try {
        const { id }      = request.params
        const showChef    = ( await Chef.find(id) ).rows[0]
        const listRecipes = ( await Chef.findRecipesByChef(id) ).rows
    
        return response.render('Admin/Chefs/show', { Chef: showChef, Recipes: listRecipes })
    } catch (error) {
        console.error(`SHOW => ${error}`)
    }
}

exports.edit = async (request, response) => {
    try {
        const { id }   = request.params
        const editChef = ( await Chef.find(id) ).rows[0]
    
        return response.render('Admin/Chefs/edit', { Chef: editChef })
    } catch (error) {
        console.error(`EDIT => ${error}`)
    }
}

exports.put = async (request, response) => {    
    try {
        const data = request.body
        await Chef.update(data)

        return response.redirect('/admin/chefs')
    } catch (error) {
        console.error(`PUT => ${error}`)
    }
}

exports.delete = async (request, response) => {
    try {
        const { id }  = request.body
        const results = await Chef.delete(id)

        return response.redirect('/admin/chefs')
    } catch (error) {
        console.error(`DELETE CONTROLLER => ${error}`)
    }
}
