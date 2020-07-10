const data = require('../data.json')
const fs   = require('fs')

exports.index = (request, response) => {
    return response.render('Admin/index', { recipes: data.recipes })
}

exports.create = (request, response) => {
    return response.render('Admin/create')
}

exports.post = (request, response) => {
    const keys = Object.keys(request.body)
    for (const key of keys) {
        if( request.body[key] == "")
            return response.send('Por favor, preencha todos os campos.')
    }
    
    let {imagem_url, nome_receita, autor_receita, informacoes_adicionais, ingrediente, modo_preparo} = request.body
    data.recipes.push({
        image: imagem_url,
        title: nome_receita,
        author: autor_receita,
        ingredients: ingrediente,
        preparation: modo_preparo,
        information: informacoes_adicionais
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err)=>{
        if (err) return request.send("Erro na gravação do arquivo DATA.JSON")
        return response.redirect('/admin/recipes')
    })
}

exports.show = (request, response) => {
    const index = request.params.id
    const recipe = data.recipes[index]
    
    return response.render('Admin/recipe', {recipe, index})
}

exports.edit = (request, response) => {
    const index = request.params.id
    const recipe = data.recipes[index]

    return response.render('Admin/edit', {recipe, index})
}

exports.put = (request, response) => {
    

    return response.send('GRAVAÇÃO da Edição uma receita')
}

exports.delete = (request, response) => {
    return response.send('Deletar uma receita')
}
