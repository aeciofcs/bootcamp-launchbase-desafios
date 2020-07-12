const fs                      = require('fs')
const data                    = require('../data.json')
const {age, graduation, date} = require('../../lib/Utils')
const Intl                    = require('intl')

exports.index = (request, response) => {

    const teachersList = data.teachers.map( (teacher)=>{
        return {
            ...teacher,
            acting: teacher.acting.split(",")
        }        
    } )
    
    return response.render('teachers/index', {teachers: teachersList})
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

    let {avatar_url, name, birth, schooling, typeclass, acting} = request.body

    birth            = Date.parse(birth)
    const id         = Number(data.teachers.length + 1)
    const created_at = Date.now()

    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        schooling,
        typeclass,
        acting,
        created_at
    })

    fs.writeFile("data.JSON", JSON.stringify(data, null, 2), (err)=>{
        if (err) return request.send("Erro na gravação do arquivo DATA.JSON")
        return response.redirect('/teachers')
    })
}

exports.show = (request, response) => {
    const id            = request.params.id
    const foundTeachers = data.teachers.find( (teacher) => {
        return teacher.id == id
    })

    if (!foundTeachers) return response.send(`Teacher ${id} not found.`)

    const teacher = {
        ...foundTeachers,
        age: age(foundTeachers.birth),
        schooling: graduation(foundTeachers.schooling),
        actings: foundTeachers.acting.split(","),
        created_at: Intl.DateTimeFormat('pt-BR').format(foundTeachers.created_at)
    }

    return response.render('teachers/show', { teacher })
}

exports.edit = (request, response) => {
    const id            = request.params.id
    const foundTeachers = data.teachers.find( (teacher) => {
        return teacher.id == id
    })

    if (!foundTeachers) return response.send(`Teacher ${id} not found.`)

    const teacher = {
        ...foundTeachers,
        birth: date(foundTeachers.birth).iso
    }

    return response.render('teachers/edit', { teacher })
}

exports.update = (request, response) => {
    const {id}     = request.body
    let index      = 0

    const foundTeacher = data.teachers.find((teacher, indexTeacher)=>{
        if (teacher.id == id){
            index = indexTeacher
            return true
        }
    })
    
    console.log(request.body.id)
    if (!foundTeacher) return response.send('Teacher not found for edit')

    const teacher = {
        ...foundTeacher,
        ...request.body,
        id: Number(id),
        birth: Date.parse(request.body.birth)
    }
    
    data.teachers[index] = teacher

    fs.writeFile("data.JSON", JSON.stringify(data, null, 2), (err)=>{
        if (err) return response.send('Erro na gravação do arquivo DATA.JSON')
    })

    return response.redirect(`/teachers`)
}

exports.delete = (request, response) => {
    const {id} = request.body

    const teachersFiltered = data.teachers.filter( (teacher) => {
        return teacher.id != id
    } )

    data.teachers = teachersFiltered

    fs.writeFile("data.JSON", JSON.stringify(data, null, 2), (err) => {
        if (err) return response.send('Erro na gravação do arquivo DATA.JSON')
    })

    return response.redirect('/teachers')
}