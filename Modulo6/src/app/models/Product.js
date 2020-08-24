const db = require('../../config/db')
const fs = require('fs')

module.exports = {
    create(data) {
        const query = 
            `INSERT INTO products (
                    category_id,
                    user_id,
                    name,
                    description,
                    old_price,
                    price,
                    quantity,
                    status
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING id            
            `
        data.price = data.price.replace(/\D/g, "")
        const values = [
            data.category_id,
            data.user_id || 1,
            data.name,
            data.description,
            data.old_price || data.price,
            data.price,
            data.quantity,
            data.status || 1
        ]

        return db.query(query, values)
    },

    find(productId){
        return db.query(`SELECT * FROM products WHERE id = ${productId}`)
    },

    update(data) {
        const query = `
            UPDATE products SET
                category_id = ($1),
                user_id     = ($2),
                name        = ($3),
                description = ($4),
                old_price   = ($5),
                price       = ($6),
                quantity    = ($7),
                status      = ($8)
            WHERE id = $9
        `
        const values = [
            data.category_id,
            data.user_id || 1,
            data.name,
            data.description,
            data.old_price,
            data.price,
            data.quantity,
            data.status,
            data.id
        ]

        return db.query(query, values)
    },

    delete(productId) {
        return db.query(`DELETE FROM products WHERE id = ${productId}`)
    },

    files(productId){
        return db.query(`SELECT * FROM files WHERE product_id = ${productId}`)
    },

    async delete(id){

        try {
            const results = await db.query(`SELECT * FROM files WHERE id = ${id}`)
            const file    = results.rows[0]
            
            fs.unlinkSync(file.path)
            
            return db.query(`DELETE FROM files WHERE id = ${id}`)
        } catch (error) {
            console.error(error)
        }

    }
}