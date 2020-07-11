const intl                = require('intl')
const { age, formatDate } = require('../../lib/Utils')

module.exports = {
    index: (request, response) => {
        return response.render('instrutores/index')
    },
    create: (request, response) => {
        return response.render('instrutores/create')
    },
    post: (request, response) => {
        // Pega todas as keys do request.body
        const keys = Object.keys(request.body)
        
        // Pega as keys e varre o body para validar os dados
        for (const key of keys) {
            if( request.body[key] == "")
                return response.send('Por favor, preencha todos os campos.')
        }
        return
    },
    show: (request,response) => {
        return        
    },
    edit: (request, response) => {
        return
    },
    put: (request, response) => {
        // Pega todas as keys do request.body
        const keys = Object.keys(request.body)
        
        // Pega as keys e varre o body para validar os dados
        for (const key of keys) {
            if( request.body[key] == "")
                return response.send('Por favor, preencha todos os campos.')
        }
        return
    },
    delete: (request,response) =>{
        return
    }
}