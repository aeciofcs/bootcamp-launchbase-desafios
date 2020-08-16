const Chef = require('../models/Chef')

exports.index = (request, response) => {
    Chef.all( (Chefs) => {        
        return response.render('Admin/chefs/index', { Chefs, total_recipes: 0 })
    })
}

exports.create = (request, response) => {
    return response.render('Admin/Chefs/create')
}

exports.post = (request, response) => {
    const keys = Object.keys(request.body)
    for (const key of keys) {
        if( request.body[key] == "")
            return response.send('Por favor, preencha todos os campos.')
    }
    Chef.create(request.body, (Chefs) => {
        return response.redirect('/admin/chefs')
    })
}

exports.show = (request, response) => {
    const { id } = request.params
    Chef.findRecipesByChef(id, (Recipes) => {
        Chef.find(id, (Chef) => {        
            return response.render('Admin/Chefs/show', { Chef, Recipes })
        })
    })
}

exports.edit = (request, response) => {
    const { id } = request.params
    Chef.find(id, (Chef) => {
        return response.render('Admin/Chefs/edit', { Chef })
    })
}

exports.put = (request, response) => {    
    Chef.update(request.body, (Chef) => {
        return response.redirect('/admin/chefs')
    })
}

exports.delete = (request, response) => {
    const { id } = request.body
    Chef.delete(id, (Chefs) => {
        return response.redirect('/admin/chefs')
    })
}
