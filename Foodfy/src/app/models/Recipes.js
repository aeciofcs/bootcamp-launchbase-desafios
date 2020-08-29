const db             = require('../../config/db')
const { formatDate } = require('../../lib/Utils')

module.exports = {
    all(){
        try {
            const query = `
                SELECT
                    rec.id,
                    rec.image,
                    rec.title,
                    chf.name As Chef_Name
                FROM recipes rec
                Inner Join chefs chf On (chf.id = rec.chef_id)
            `

            return db.query(query)
        } catch (error) {
            console.error(`SELECT = > ${error}`)
        }
    },

    create(data){
        try {
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
                RETURNING ID
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

            return db.query(query, values)
        } catch (error) {
            console.error(`CREATE => ${error}`)
        }
    },

    find(recipeId){
        try {
            const query = `SELECT recipes.chef_id,
                                  recipes.id, 
                                  recipes.title, 
                                  recipes.image, 
                                  recipes.ingredients, 
                                  recipes.preparation, 
                                  recipes.information, 
                                  chefs.name As author
                           FROM recipes
                           INNER JOIN chefs ON (chefs.id = recipes.chef_id)
                           WHERE recipes.id = ${recipeId} `

            return db.query(query)
        } catch (error) {
            console.error(`FIND => ${error}`)
        }
    },

    update(data){
        try {
            const query = `
                UPDATE recipes SET
                    CHEF_ID     = $1,
                    IMAGE       = $2,
                    TITLE       = $3,
                    INGREDIENTS = $4,
                    PREPARATION = $5,
                    INFORMATION = $6
                WHERE id = $7
            `
            const values = [
                data.chef_id,
                data.image,
                data.title,
                data.ingredients,
                data.preparation,
                data.information,
                data.id
            ]

            return db.query(query, values)
        } catch (error) {
            console.error(`UPDATE => ${error}`)
        }
    },

    delete(recipeId){
        try {
            const query = `DELETE FROM recipes WHERE id = ${recipeId}`

            return db.query(query)
        } catch (error) {
            console.error(`DELETE => ${err}`)
        }
    },

    allChefs(){
        try {
            const query = `SELECT id, name FROM chefs`

            return db.query(query)
        } catch (error) {
            console.error(`ALLCHEFs => ${error}`)
        }
    }

}
