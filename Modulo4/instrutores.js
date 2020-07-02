const fs                  = require('fs')
const data                = require('./data.json')
const intl                = require('intl')
const { age, formatDate } = require('./Utils')

exports.index = (request, response) => {
    return response.render('instrutores/index', {Instrutores: data.instrutores})
}

exports.post = (request, response) => {
    
    // Pega todas as keys do request.body
    const keys = Object.keys(request.body)
    
    // Pega as keys e varre o body para validar os dados
    for (const key of keys) {
        if( request.body[key] == "")
            return response.send('Por favor, preencha todos os campos.')
    }
    
    let {avatar_url, name, birth, gender, services} = request.body

    const id         = Number(data.instrutores.length + 1)
    const created_at = Date.now()
    birth            = Date.parse(birth)
    
    data.instrutores.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err)=>{
        if (err) return request.send("Erro na gravação do arquivo DATA.JSON")
        return response.redirect('/instrutores')
    })
}

exports.show = (request,response) => {
    const { id } = request.params
    const foundInstrutores = data.instrutores.find((instrutor)=>{
        return instrutor.id == id 
    })

    if(!foundInstrutores) return response.send('Instrutor não encontrado.')
        
    const instrutor = {
        ...foundInstrutores,
        age       : age(foundInstrutores.birth),        
        services  : foundInstrutores.services.split(","),
        created_at: intl.DateTimeFormat("pt-BR").format(foundInstrutores.created_at)
    }

    return response.render('instrutores/show', {Instrutores: instrutor})
}

exports.edit = (request, response) => {
    const { id } = request.params
    const foundInstrutores = data.instrutores.find((instrutor)=>{
        return instrutor.id == id 
    })

    if(!foundInstrutores) return response.send('Instrutor não encontrado.')

    const Instrutor = {
        ...foundInstrutores,
        birth: formatDate(foundInstrutores.birth)
    }

    return response.render('instrutores/edit', { Instrutor })
}

exports.put = (request, response) => {
    const { id } = request.body
    let index    = 0
    console.log(id)
    const foundInstrutor = data.instrutores.find((instrutor, foundIndex)=>{
        if ( instrutor.id == id ){
            index = foundIndex
            return true
        }
    })
    if(!foundInstrutor) return response.send('Instrutor not found')
    const Instrutor = {
        ...foundInstrutor,
        ...request.body,
        birth: Date.parse(request.body.birth)
    }
    data.instrutores[index] = Instrutor
    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err)=>{
        if(err) return response.send('Erro na gravação do arquivo DATA.JSON')
        return response.redirect(`/instrutores/${id}`)
    })
}

exports.delete = (request,response) =>{
    const {id}                 = request.body
    const instrutoresFiltrados = data.instrutores.filter( (instrutor) => {
        return instrutor.id != id
    })
    data.instrutores = instrutoresFiltrados
    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err)=>{
        if(err) return response.send('Erro na gravação do arquivo DATA.JSON')
    })
    return response.redirect('/instrutores')
}