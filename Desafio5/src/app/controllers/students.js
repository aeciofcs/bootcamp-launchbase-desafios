const {age, grade, date} = require('../../lib/Utils')
const Intl               = require('intl')
const Student            = require('../models/Student')

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
        callback(Students){
            let dataStudents = []
            for (const student of Students) {
                dataStudents.push({
                    ...student,
                    school_year: grade(student.school_year)
                })
            }
            const pagination = {
                total: Students.length == 0 ? 0 : Math.ceil( Students[0].total / limit),
                page
            }
            return response.render('students/index', {students: dataStudents, filter, pagination })
        }
    }
    
    Student.paginate(params)
}

exports.create = (request, response) => {
    Student.teachersOptions( (Options) => {        
        return response.render('students/create', { teachersOptions: Options })
    })
}

exports.post = (request, response) => {
    // Validação: Verificar dados não preenchidos.
    const keys = Object.keys(request.body)
    for (const key of keys) {
        if(request.body[key] == "")
            return response.send('Por favor, preencha todos os campos.')        
    }

    Student.qtdRegisters( (lastID) => {
        let id = Number(lastID) + 1
        const {avatar_url, name, birth, email, school_year, workload, teacher_id} = request.body
        const data = {
            id,
            avatar_url,
            name,
            birth,
            email,
            school_year,
            workload, 
            teacher_id
        }
        Student.create(data, (Students) => {
            return response.redirect('/students')
        })
    })
}

exports.show = (request, response) => {
    Student.find(request.params.id, (Students) => {
        if(!Students) return response.send('Student not found.')
        const student = {
            ...Students,
            birth      : date(Students.birth).birthDay,
            school_year: grade(Students.school_year)
        }
        return response.render('students/show', { student } )
    })
}

exports.edit = (request, response) => {    
    Student.find(request.params.id, (Students) => {
        if(!Students) return response.send('Student not found.')
        const student = {
            ...Students,
            birth: date(Students.birth).iso
        }
        Student.teachersOptions( (Options) => {        
            return response.render('students/edit', { student, teachersOptions: Options })
        })
    })
}

exports.update = (request, response) => {
    const data = {
        ...request.body,        
        birth: Date.parse(request.body.birth)
    }
    Student.update(data, () => {
        return response.redirect(`/students`)
    })
}

exports.delete = (request, response) => {
    Student.delete(request.body.id, () => {
        return response.redirect('/students')
    })
}