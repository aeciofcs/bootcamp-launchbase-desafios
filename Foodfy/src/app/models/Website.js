const db = require('../../config/db')

module.exports = {
    all: () => {
        try {
            const query = `
                SELECT
                    rec.id,
                    rec.image,
                    rec.title,
                    chf.name As author
                FROM recipes rec
                Inner Join chefs chf On (chf.id = rec.chef_id)
            `

            return db.query(query)
        } catch (error) {
            console.error(`ALL => ${error}`)
        }
    }, 

    findRecipes: (receipeId) => {
        try {
            const query = `SELECT rec.id, 
                                  rec.title, 
                                  rec.image, 
                                  rec.ingredients, 
                                  rec.preparation, 
                                  rec.information,
                                  chf.name AS author
                           FROM recipes rec
                           INNER JOIN chefs chf ON (chf.id = rec.chef_id)
                           WHERE rec.id = ${receipeId}`

            return db.query(query)
        } catch (error) {
            console.error(`FIND => ${error}`)
        }
    },

    topRecipes: () => {

    },

}