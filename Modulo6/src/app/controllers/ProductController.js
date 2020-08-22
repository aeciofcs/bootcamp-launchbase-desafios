const Category = require('../models/Category')
const Product  = require('../models/Product')

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

    async post(request, response) {
        // Lógica para Salvar o Produto
        const keys = Object.keys(request.body)
        for (key of keys) {
            if(request.body[key] == ""){
                return response.send('Todos os campos são Obrigatórios.')
            }
        }

        let results      = await Product.create(request.body)
        const productId  = results.rows[0].id

        return response.redirect(`/products/${productId}`)
    },

    async edit(request, response){
        let results    = await Product.find(request.params.id)
        const product  = results.rows[0]
        
        if(!product) return response.send('Produto não encontrado.')

        results          = await Category.all()
        const categories = results.rows

        return response.render('products/edit.njk', { Product: product, Categories: categories })
    }

}