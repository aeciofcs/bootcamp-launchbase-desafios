const db       = require('../../config/db')
const { date } = require('../../lib/Utils')

module.exports = {
    all(callback){
        db.query('SELECT * FROM teachers', (err, results) => {
            if(err) throw `SELECT => Database Error! ${err}`
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
            date(Date.now()).iso
        ]
        db.query(query, values, (err, results) => {
            if(err) throw `POST => Database Error! ${err}`
            return callback(results.rows[0])
        })
    },

    find(id, callback){
        db.query(`SELECT * FROM teachers WHERE ID = $1`, [id], (err, results) => {
            if(err) throw `QTD Registros => Database Error! ${err}`
            return callback(results.rows[0])
        })
    },

    update(data, callback){
        const query = `
            UPDATE teachers SET
                AVATAR_URL      = ($1),
                NAME            = ($2),
                BIRTH_DATE      = ($3),
                EDUCATION_LEVEL = ($4),
                CLASS_TYPE      = ($5),
                SUBJECTS_TAUGHT = ($6)
            WHERE ID = $7
        `
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth_date).iso,
            data.education_level,
            data.class_type,
            data.subjects_taught,
            data.id
        ]
        db.query(query, values, (err, results) => {
            if(err) throw `UPDATE => Database Error! ${err}`
            return callback()
        })
    },

    delete(id, callback){
        db.query('DELETE FROM teachers WHERE ID = $1', [id], (err, results) => {
            if(err) throw `DELETE => Database Error! ${err}`
            return callback()
        })
    },

    qtdRegisters(callback){
        db.query(`SELECT ID FROM teachers ORDER BY ID DESC Limit 1`, (err, results) => {
            if(err) throw `QTD Registros => Database Error! ${err}`
            return callback(results.rows[0].id)
        })
    }

}