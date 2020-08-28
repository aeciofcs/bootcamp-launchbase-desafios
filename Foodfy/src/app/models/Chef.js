const db           = require('../../config/db')
const {formatDate} = require('../../lib/Utils')

module.exports = {
    all(){
        try {
            const query = ` SELECT chefs.ID, 
                                   chefs.Name, 
                                   chefs.Avatar_URL,
                                   (Select Count(recipes.id) From recipes Where chef_id = chefs.id) As total_recipes
                            FROM chefs
                        `

            return db.query(query)
        } catch (error) {
            console.error(`ALL => DATABASE ERROR ==> ${error}`)
        }
    },

    create(data){
        try {
            const query = `
                INSERT INTO chefs(
                    NAME,
                    AVATAR_URL,
                    CREATED_AT
                ) VALUES ( $1, $2, $3 )
                RETURNING ID
            `
            const values = [
                data.name,
                data.avatar_url,
                formatDate(Date.now()).iso
            ]

            return db.query(query, values)
        } catch (error) {
            console.error(`CREATE => ${error}`)
        }
    },

    find(chefId){
        try {
            const query = `SELECT chefs.ID, 
                                  chefs.Name, 
                                  chefs.Avatar_URL,
                                  (Select Count(recipes.id) From recipes Where chef_id = chefs.id) As total_recipes
                           FROM chefs WHERE id = ${chefId}
                        `

            return db.query(query)
        } catch (error) {
            console.error(`FIND => ${error}`)
        }
    },

    findRecipesByChef(chefId){
        try {
            const query = `Select Recipes.ID,
                                  Recipes.title,
                                  Recipes.image,
                                  chefs.name As chef_name
                            From Recipes
                            inner join Chefs on (Chefs.id = Recipes.chef_id)
                            Where Chefs.ID = ${chefId}
                        `

            return db.query(query)
        } catch (error) {
            console.error(`FIND RECIPE BY CHEF => ${error}`)
        }
    },
    
    update(data){
        try {
            const query = `
                UPDATE chefs SET
                    name       = $2,
                    avatar_url = $3
                WHERE id = $1
            `
            const values = [
                data.id,
                data.name,
                data.avatar_url
            ]

            return db.query(query, values)
        } catch (error) {
            console.error(`UPDATE => ${err}`)
        }
    },

    delete(chefId){
        try {
            const query = `DELETE FROM chefs WHERE id = ${chefId}`

            return db.query(query)
        } catch (error) {
            console.error(`DELETE => ${err}`)
        }
    }
}