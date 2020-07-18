const { blood, formatDate } = require('../../lib/Utils')
const Membro                = require('../models/Membro')

module.exports = {
    index: (request, response) => {
        Membro.all( (Membros) => {
            let { filter, page, limit } = request.query
        
            page  = page || 1
            limit = limit || 3
            let offset = limit * (page - 1)

            const params = {
                filter,
                page,
                limit,
                offset,
                callback(Membros){
                    const pagination = {
                        total: Membros.length == 0 ? 0 : Math.ceil( Membros[0].total / limit),
                        page
                    }
                    return response.render('membros/index', { Membros, pagination, filter })
                }
            }
            Membro.paginate(params)
        } )
    },

    create: (request, response) => {
        Membro.instructorsSelectOptions( (Options) => {            
            return response.render('membros/create', { instructorOptions: Options })
        } )
    },

    post: (request, response) => {
        // Pega todas as keys do request.body
        const keys = Object.keys(request.body)
        
        // Pega as keys e varre o body para validar os dados
        for (const key of keys) {
            if( request.body[key] == "")
                return response.send('Por favor, preencha todos os campos.')
        }
        Membro.create(request.body, (Membro) => {
            return response.redirect(`/membros/${Membro.id}`)
        })
    },

    show: (request,response) => {
        Membro.find(request.params.id, (Membro) => {
            if(!Membro) return response.send('Membro não localizado')
            Membro.birth = formatDate(Membro.birth).dateBirth
            Membro.blood = blood(Membro.blood)

            return response.render('membros/show', { Membro })
        })
    },

    edit: (request, response) => {
        Membro.find(request.params.id, (Member) => {
            if(!Member) return response.send('Membro não encontrado.')
            Member.birth = formatDate(Member.birth).iso
            
            Membro.instructorsSelectOptions( (Options) => {            
                return response.render('membros/edit', {Membro: Member, instructorOptions: Options })
            } )
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
        Membro.update(request.body, () => {
            return response.redirect(`/membros/${request.body.id}`)
        })
    },

    delete: (request,response) =>{
        Membro.delete(request.body.id, () => {
            return response.redirect(`/membros`)
        })
    }

}