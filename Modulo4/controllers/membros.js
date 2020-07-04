const fs                    = require('fs')
const data                  = require('../data.json')
const intl                  = require('intl')
const { blood, formatDate } = require('../Utils')

exports.index = (request, response) => {
    return response.render('members/index', {membros: data.members})
}

exports.create = (request, response) => {
    return response.render('members/create')
}

exports.post = (request, response) => {    
    // Pega todas as keys do request.body
    const keys = Object.keys(request.body)
    
    // Pega as keys e varre o body para validar os dados
    for (const key of keys) {
        if( request.body[key] == "")
            return response.send('Por favor, preencha todos os campos.')
    }
    
    let {avatar_url, name, email, birth, gender, blood, weight, height} = request.body

    const id         = Number(data.members.length + 1)
    const created_at = Date.now()
    birth            = Date.parse(birth)
    
    data.members.push({
        id,
        avatar_url,
        name,
        email,
        birth,
        gender,
        blood,
        weight,
        height,
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err)=>{
        if (err) return request.send("Erro na gravação do arquivo DATA.JSON")
        return response.redirect('/membros')
    })
}

exports.show = (request,response) => {
    const { id } = request.params
    const foundMembro = data.members.find((membro)=>{
        return membro.id == id 
    })

    if(!foundMembro) return response.send('Membro não encontrado.')
        
    const membro = {
        ...foundMembro,
        birth: formatDate(foundMembro.birth).dateBirth,
        blood: blood(foundMembro.blood)
    }

    return response.render('members/show', { membro })
}

exports.edit = (request, response) => {
    const { id } = request.params
    const foundMembro = data.members.find((membro)=>{
        return membro.id == id 
    })

    if(!foundMembro) return response.send('Membro não encontrado.')

    const membro = {
        ...foundMembro,
        birth: formatDate(foundMembro.birth).iso
    }

    return response.render('members/edit', { membro })
}

exports.put = (request, response) => {
    const { id } = request.body
    let index    = 0    
    const foundMembro = data.members.find((membro, foundIndex)=>{
        if ( membro.id == id ){
            index = foundIndex
            return true
        }
    })
    if(!foundMembro) return response.send('Membro not found')
    const membro = {
        ...foundMembro,
        ...request.body,
        id: Number(request.body.id),
        birth: Date.parse(request.body.birth)
    }
    data.members[index] = membro
    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err)=>{
        if(err) return response.send('Erro na gravação do arquivo DATA.JSON')
        return response.redirect(`/members`)
    })
}

exports.delete = (request,response) =>{
    const {id}                 = request.body
    const membersFiltrados = data.members.filter( (membro) => {
        return membro.id != id
    })
    data.members = membersFiltrados
    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err)=>{
        if(err) return response.send('Erro na gravação do arquivo DATA.JSON')
    })
    return response.redirect('/members')
}