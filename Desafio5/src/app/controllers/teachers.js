const {age, graduation, date} = require('../../lib/Utils')
const Intl                    = require('intl')
const Teacher                 = require('../models/Teacher')

exports.index = (request, response) => {
    let {filter, page, limit} = request.query

    page       = page || 1
    limit      = limit || 3
    let offset = limit * (page - 1)
    
    const params = {
        filter,
        page,
        limit,
        offset,
        callback(Teachers){
            let dataTeachers = []
            for (const teacher of Teachers) {
                dataTeachers.push({
                    ...teacher,
                    subjects_taught: teacher.subjects_taught.split(',')
                })
            }
            const pagination = {
                total: Teachers.length == 0 ? 0 : Math.ceil( Teachers[0].total / limit),
                page
            }
            return response.render('teachers/index', { Teachers: dataTeachers, filter, pagination })
        }
    }

    Teacher.paginate(params)
}

exports.create = (request, response) => {
    return response.render('teachers/create')
}

exports.post = (request, response) => {
    // Validação: Verificar dados não preenchidos.
    const keys = Object.keys(request.body)
    for (const key of keys) {
        if(request.body[key] == "")
            return response.send('Por favor, preencha todos os campos.')        
    }

    Teacher.qtdRegisters( (lastID) => {
        let id = Number(lastID) + 1
        
        const {avatar_url, name, birth, schooling, typeclass, acting} = request.body
    
        const data = {
            id,
            avatar_url,
            name,
            birth_date: birth,
            education_level: schooling,
            class_type: typeclass,
            subjects_taught: acting
        }

        Teacher.create(data, (Teacher) => {
            return response.redirect('/teachers')
        })
    })
}

exports.show = (request, response) => {
    Teacher.find(request.params.id, (Teacher) => {
        if(!Teacher) return response.send(`Teacher not found.`)
        const teacher = {
            ...Teacher,
            age: age(Teacher.birth_date),
            schooling: graduation(Teacher.education_level),
            actings: Teacher.subjects_taught.split(','),
            created_at: Intl.DateTimeFormat('pt-BR').format(Teacher.created_at)
        }
        return response.render('teachers/show', { teacher })
    })
}

exports.edit = (request, response) => {
    Teacher.find(request.params.id, (Teacher) => {
        if(!Teacher) return response.send(`Teacher not found.`)
        const teacher = {
            ...Teacher,
            birth: date(Teacher.birth_date).iso,
            schooling: Teacher.education_level,
            typeclass: Teacher.class_type,
            acting: Teacher.subjects_taught
        }
        return response.render('teachers/edit', { teacher })
    })
}

exports.update = (request, response) => {
    // Validação: Verificar dados não preenchidos.
    const keys = Object.keys(request.body)
    for (const key of keys) {
        if(request.body[key] == "")
            return response.send('Por favor, preencha todos os campos.')
    }
    const {avatar_url, name, birth, schooling, typeclass, acting, id} = request.body
    const data = {
        avatar_url,
        name,
        birth_date     : birth,
        education_level: schooling,
        class_type     : typeclass,
        subjects_taught: acting,
        id
    }
    Teacher.update(data, () => {
        return response.redirect(`/teachers`)
    })
}

exports.delete = (request, response) => {
    Teacher.delete(request.body.id, () => {
        return response.redirect('/teachers')
    })
}