const db             = require('../../config/db')
const { formatDate } = require('../../lib/Utils')

module.exports = {
    all(callback){
        const query = `
            SELECT  
                rec.id,
                rec.image,
                rec.title,
                chf.name As Chef_Name
            FROM recipes rec
            Inner Join chefs chf On (chf.id = rec.chef_id)
        `
        db.query(query, (err, results) => {
            if(err) throw `SELECT = > Database Error!`
            return callback(results.rows)
        })
    },

    create(data, callback){
        const query = `
            INSERT INTO recipes (
                image,
                title,
                ingredients,
                preparation,
                information,
                created_at,
                chef_id
            ) values ($1,$2,$3,$4,$5,$6,$7)
        `
        const values = [
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            formatDate(Date.now()).iso,
            data.chef_id
        ]

        db.query(query, values, (err, results) => {
            if(err) throw `CREATE => Database Error. ${err}`
            return callback(results.rows[0])
        })
    },

    find(id, callback){
        const query = `SELECT recipes.chef_id,
                              recipes.id, 
                              recipes.title, 
                              recipes.image, 
                              recipes.ingredients, 
                              recipes.preparation, 
                              recipes.information, 
                              chefs.name As author
                        FROM recipes
                        inner join chefs on (chefs.id = recipes.chef_id)
                        WHERE recipes.id = ${id}`
        
        db.query(query, (err, results) => {
            if(err) throw `FIND => Database ${err}`
            return callback(results.rows[0])
        })
    },

    allChefs(callback){
        const query = `SELECT id, name FROM chefs`
        db.query(query, (err, results) => {
            if(err) throw `ALLCHEFS => Database Error. ${err}`
            return callback(results.rows)
        })
    }

}
