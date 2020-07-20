const Chefs = require('../models/Chef')
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
    return response.send('TELA DE VISUALIZAR UM CHEF')
}

exports.edit = (request, response) => {
    return response.send('ABRIR TELA DE EDIÇÃO DO CHEF')
}

exports.put = (request, response) => {
    return response.send('GRAVAR ALTERAÇÃO DE UM CHEF')
}

exports.delete = (request, response) => {
    return response.send('DELETAR UM CHEF')
}
