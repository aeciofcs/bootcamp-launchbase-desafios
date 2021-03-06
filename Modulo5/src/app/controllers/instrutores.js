const Instrutor           = require('../models/Instrutor')
const { age, formatDate } = require('../../lib/Utils')

module.exports = {
    index: (request, response) => {
        let { filter, page, limit } = request.query
        
        page  = page || 1
        limit = limit || 3
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(Instrutores){
                const pagination = {
                    total: Instrutores.length == 0 ? 0 : Math.ceil( Instrutores[0].total / limit),
                    page
                }
                return response.render('instrutores/index', { Instrutores, pagination, filter })
            }
        }

        Instrutor.paginate(params)
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
        Instrutor.create(request.body, (Instrutor) => {
            return response.redirect(`/instrutores/${Instrutor.id}`)
        })
        
    },

    show: (request,response) => {
        Instrutor.find(request.params.id, (Instrutor) => {
            if(!Instrutor) return response.send('Instrutor não encontrado.')
            Instrutor.age        = age(Instrutor.birth)
            Instrutor.services   = Instrutor.services.split(',')
            Instrutor.created_at = formatDate(Instrutor.created_at).format
            
            return response.render('instrutores/show', { Instrutor })
        })
    },

    edit: (request, response) => {
        Instrutor.find(request.params.id, (Instrutor) => {
            if(!Instrutor) return response.send('Instrutor não encontrado.')
            Instrutor.birth      = formatDate(Instrutor.birth).iso
            
            return response.render('instrutores/edit', { Instrutor })
        })
    },

    put: (request, response) => {
        // Pega todas as keys do request.body
        const keys = Object.keys(request.body)
        
        // Pega as keys e varre o body para validar os dados
        for (const key of keys) {
            if( request.body[key] == "")
                return response.send('Por favor, preencha todos os campos.')
        }

        Instrutor.update(request.body, () => {
            return response.redirect(`/instrutores/${request.body.id}`)
        })
    },

    delete: (request,response) =>{
        Instrutor.delete(request.body.id, () => {
            return response.redirect(`/instrutores`)
        })
    }
    
}