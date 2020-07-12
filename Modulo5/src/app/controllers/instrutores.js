const Instrutor           = require('../models/Instrutor')
const { age, formatDate } = require('../../lib/Utils')

module.exports = {
    index: (request, response) => {
        Instrutor.all( (Instrutores) => {
            return response.render('instrutores/index', { Instrutores })
        } )
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