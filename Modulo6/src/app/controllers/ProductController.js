const { formatPrice, formatDate } = require('../../lib/Utils')
const Category                    = require('../models/Category')
const Product                     = require('../models/Product')
const File                        = require('../models/File')

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

        if (request.files.length == 0 ) return response.send('Por favor, envie pelo menos uma imagem.')

        let results      = await Product.create(request.body)
        const productId  = results.rows[0].id
        
        const filesPromises = request.files.map(file => File.create({ ...file, product_id: productId}))
        await Promise.all(filesPromises)

        return response.redirect(`/`)
    },

    async show(request, response){
        let results   = await Product.find(request.params.id)
        const product = results.rows[0]

        if (!product) return response.send('Produto não encontrado.')

        const { day, hour, minutes, month } = formatDate(product.updated_at)
        product.published = {
            day: `${day}/${month}`,
            hour: `${hour}h${minutes}m`,
            minutes,
            month
        }

        product.old_price = formatPrice(product.old_price)
        product.price     = formatPrice(product.price)

        return response.render('products/show', { Product: product })
    },

    async edit(request, response){
        let results    = await Product.find(request.params.id)
        const product  = results.rows[0]
        
        if(!product) return response.send('Produto não encontrado.')

        product.old_price = formatPrice(product.old_price)
        product.price     = formatPrice(product.price)

        results          = await Category.all()
        const categories = results.rows

        // Get Images
        results   = await Product.files(product.id)
        let files = results.rows
        files = files.map(file => ({
            ...file,
            src: `${request.protocol}://${request.headers.host}${file.path.replace('public','')}`
        }))

        return response.render('products/edit.njk', { Product: product, Categories: categories, files })
    },

    async put(request, response) {
        const keys = Object.keys(request.body)
        for (key of keys) {
            if(request.body[key] == "" && key != "removed_files"){
                return response.send('Todos os campos são Obrigatórios.')
            }
        }

        if(request.files.length != 0 ){
            const newFilesPromises = request.files.map(file => File.create({...file, product_id: request.body.id}))
            await Promise.all(newFilesPromises)
        }

        if(request.body.removed_files){
            // 1,2,3,
            const removedFiles = request.body.removed_files.split(",") // [1,2,3,]
            const lastIndex    = removedFiles.length - 1
            removedFiles.splice(lastIndex, 1) // [1,2,3]

            const removedFilesPromises = removedFiles.map(id => File.delete(id))
            await Promise.all(removedFilesPromises)
            
        }

        request.body.price = request.body.price.replace(/\D/g,"")
        if(request.body.old_price != request.body.price){
            const oldProduct = await Product.find(request.body.id)
            request.body.old_price = oldProduct.rows[0].price
        }

        await Product.update(request.body)

        return response.redirect(`/products/${request.body.id}`)
    },

    async delete(request, response) {
        const { id } = request.body
        
        await Product.delete(id)

        return response.redirect('/')
    }

}