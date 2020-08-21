const Category = require('../models/Category')

module.exports = {
    create (request, response) {
        //Pegar Categorias
        Category.all()
        .then((Results)=>{

            const Categories = Results.rows
            return response.render('products/create.njk', {Categories})
            
        }).catch((err) => {
            throw new Error(err)
        })
    },

    post(request, response) {
        // Lógica para Salvar o Produto
    }

}