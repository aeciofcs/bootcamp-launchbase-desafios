const fs   = require('fs')
const data = require('./teachers.json')

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

    fs.writeFile("teachers.JSON", JSON.stringify(data, null, 2), (err)=>{
        if (err) return request.send("Erro na gravação do arquivo DATA.JSON")
        return response.redirect('/teachers')
    })

    //return response.send(keys)
}