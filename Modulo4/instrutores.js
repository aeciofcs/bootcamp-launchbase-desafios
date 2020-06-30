const fs                  = require('fs')
const data                = require('./data.json')
const intl                = require('intl')
const { age, formatDate } = require('./Utils')

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