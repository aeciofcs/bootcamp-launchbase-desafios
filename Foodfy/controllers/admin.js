const data = require('../data.json')

exports.index = (request, response) => {    
    return response.render('Admin/index', { recipes: data.recipes })
}

exports.create = (request, response) => {
    return response.send('Mostrar formulário de nova receita')
}

exports.post = (request, response) => {
    return response.send('GRAVAÇÃO do novo Cadastro da nova receita')
}

exports.show = (request, response) => {
    return response.send('Exibir detalhes de uma receita')
}

exports.edit = (request, response) => {
    return response.send('Mostrar formulário de edição de receita')
}

exports.put = (request, response) => {
    return response.send('GRAVAÇÃO da Edição uma receita')
}

exports.delete = (request, response) => {
    return response.send('Deletar uma receita')
}
