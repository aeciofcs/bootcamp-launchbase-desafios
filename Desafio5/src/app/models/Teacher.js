const db       = require('../../config/db')
const { date } = require('../../lib/Utils')

module.exports = {
    all(callback){
        db.query('SELECT * FROM teachers', (err, results) => {
            if(err) throw `SELECT => Database Error! ${err}`
            return callback(results.rows)
        })
    },

    qtdRegisters(callback){
        db.query('SELECT ID FROM teachers ORDER BY ID DESC Limit 1', (err, results) => {
            if(err) throw `QTD Registros => Database Error! ${err}`
            return callback(results.rows)
        })
    },

    create(data, callback){
        const query = `
            INSERT INTO teachers(
                id, 
                avatar_url,
                name,
                birth_date,
                education_level,
                class_type,
                subjects_taught,
                created_at
            ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING ID
        `
        const values = [
            data.id,
            data.avatar_url,
            data.name,
            date(data.birth_date).iso,
            data.education_level,
            data.class_type,
            data.subjects_taught,
            date(data.created_at).iso
        ]
        db.query(query, values, (err, results) => {
            if(err) throw `POST => Database Error! ${err}`
            return callback(results.rows[0])
        })
    }
}