const data = require('../data.json')
const fs   = require('fs')

exports.index = (request, response) => {
    return response.send('TELA DE LISTAGEM DOS CHEFs')
}

exports.create = (request, response) => {
    return response.send('TELA DE CRIAÇÃO DE UM NOVO CHEF')
}

exports.post = (request, response) => {
    return response.send('GRAVAÇÃO DE UM NOVO CHEF')
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
