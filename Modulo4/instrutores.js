const fs   = require('fs')
const data = require('./data.json') 

exports.post = (request, response) => {
    
    // Pega todas as keys do request.body
    const keys = Object.keys(request.body)
    
    // Pega as keys e varre o body para validar os dados
    for (const key of keys) {
        if( request.body[key] == "")
            return response.send('Por favor, preencha todos os campos.')
    }
    
    request.body.id         = Number(data.instrutores.length + 1)
    request.body.birth      = Date.parse(request.body.birth)
    request.body.created_at = Date.now()
    
    data.instrutores.push(request.body)

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err)=>{
        if (err) return request.send("Erro na gravação do arquivo DATA.JSON")
        return response.redirect('/instrutores')
    })

    //return response.send(keys)
    //return response.send('Informações Recebidas')
}