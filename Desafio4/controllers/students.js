const fs                 = require('fs')
const data               = require('../data.json')
const {age, grade, date} = require('../Utils')
const Intl               = require('intl')

exports.index = (request, response) => {
    const studentList = data.students.map( (student)=>{
        return {
            ...student,
            school_year: grade(student.school_year)
        }
    } )
    return response.render('students/index', {students: studentList})
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

    let {avatar_url, name, birth, email, school_year, workload} = request.body    
    
    birth            = Date.parse(birth)
    const created_at = Date.now()
    let id           = 1
    const lastId     = data.students[data.students.length - 1]
    
    if(lastId) {
        id = lastId.id + 1
    }
    
    data.students.push({
        id,
        avatar_url,
        name,
        birth,
        email,
        school_year,
        workload,
        created_at
    })

    fs.writeFile("data.JSON", JSON.stringify(data, null, 2), (err)=>{
        if (err) return request.send("Erro na gravação do arquivo DATA.JSON")
        return response.redirect('/students')
    })
}

exports.show = (request, response) => {
    const id           = request.params.id
    const foundStudent = data.students.find( (student) => {
        return student.id == id
    })

    if (!foundStudent) return response.send(`Student ${id} not found.`)

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).birthDay,
        school_year: grade(foundStudent.school_year)
    }
    return response.render('students/show', { student })
}

exports.edit = (request, response) => {
    const id           = request.params.id
    const foundStudent = data.students.find( (student) => {
        return student.id == id
    })

    if (!foundStudent) return response.send(`Student ${id} not found.`)

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).iso
    }

    return response.render('students/edit', { student })
}

exports.update = (request, response) => {
    const { id } = request.body
    let index    = 0

    const foundStudent = data.students.find((student, indexStudent)=>{
        if (student.id == id){
            index = indexStudent
            return true
        }
    })
    
    if (!foundStudent) return response.send('Student not found for edit')

    const student = {
        ...foundStudent,
        ...request.body,
        id: Number(id),
        birth: Date.parse(request.body.birth)
    }
    
    data.students[index] = student

    fs.writeFile("data.JSON", JSON.stringify(data, null, 2), (err)=>{
        if (err) return response.send('Erro na gravação do arquivo DATA.JSON')
    })

    return response.redirect(`/students`)
}

exports.delete = (request, response) => {
    const { id } = request.body

    const studentsFiltered = data.students.filter( (student) => {
        return student.id != id
    } )

    data.students = studentsFiltered

    fs.writeFile("data.JSON", JSON.stringify(data, null, 2), (err) => {
        if (err) return response.send('Erro na gravação do arquivo DATA.JSON')
    })

    return response.redirect('/students')
}