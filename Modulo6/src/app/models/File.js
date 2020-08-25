const db = require('../../config/db')
const fs = require('fs')

module.exports = {
    create({filename, path, product_id}) {
        const query = 
            `INSERT INTO files (
                    name,
                    path,
                    product_id
                ) VALUES ($1, $2, $3)
                RETURNING id            
            `        
        const values = [
            filename,
            path,
            product_id
        ]

        return db.query(query, values)
    },

    async delete(id){

        try {
            const results = await db.query(`SELECT * FROM files WHERE id = ${id}`)
            const file    = results.rows[0]
            
            fs.unlink(file.path, (err) => {
                if (err) throw err
                return db.query(`DELETE FROM files WHERE id = ${id}`)
            })
            
        } catch (error) {
            console.error(error)
        }

    }
}