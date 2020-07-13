const {age, grade, date} = require('../../lib/Utils')
const Intl               = require('intl')
const Student            = require('../models/Student')

exports.index = (request, response) => {
    Student.all( (Students) => {
        let dataStudents = []
        for (const student of Students) {
            dataStudents.push({
                ...student,
                school_year: grade(student.school_year)
            })
        }
        return response.render('students/index', {students: dataStudents})        
    })
    /*
    const studentList = data.students.map( (student)=>{
        return {
            ...student,
            school_year: grade(student.school_year)
        }
    } )*/
    //return response.render('students/index', {students: studentList})
    return
}

exports.create = (request, response) => {
    return response.render('students/create')
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
        const {avatar_url, name, birth, email, school_year, workload} = request.body
        const data = {
            id,
            avatar_url,
            name,
            birth,
            email,
            school_year,
            workload
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
        return response.render('students/edit', { student })
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