const db           = require('../../config/db')
const {formatDate} = require('../../lib/Utils')

module.exports = {
    all(callback){
        db.query('SELECT ID, Name, Avatar_URL FROM chefs', (err, results) => {
            if(err) throw `ALL => Database Error.`
            return callback(results.rows)
        })

    },

    create(data, callback){
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

        db.query(query, values, (err, results) => {
            if(err) throw `CREATE => Database Error.`
            return callback(results.rows[0])
        })
    },

    find(id, callback){
        const query = `SELECT id, name, avatar_url FROM chefs WHERE id = ${id}`
        
        db.query(query, (err, results) => {
            if(err) throw `FIND => Database Error ${err}`
            return callback(results.rows[0])
        })
    },
    
    update(data, callback){
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

        db.query(query, values, (err, results) => {
            if (err) throw `UPDATE => Database Error. ${err}`
            return callback(results.rows)
        })
    }
}