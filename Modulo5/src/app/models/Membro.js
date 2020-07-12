const db             = require('../../config/db')
const { formatDate } = require('../../lib/Utils')

module.exports = {
    all(callback) {
        db.query('SELECT * FROM members ORDER BY ID', (err, results) => {
            if(err) throw `SELECT => Database Error! ${err}`
            return callback(results.rows)
        })
    },

    create(data, callback) {
        const query = `
            INSERT INTO members (
                name,
                avatar_url,
                email,
                birth,
                gender,
                blood,
                weight,
                height,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id
        `
        const values = [
            data.name,
            data.avatar_url,
            data.email,
            formatDate(data.birth).iso,
            data.gender,
            data.blood,
            data.weight,
            data.height,
            formatDate(Date.now()).iso,
        ]
        
        db.query(query, values, (err, results) => {
            if(err) throw `POST => Database Error! ${err}`
            return callback(results.rows[0])
        })
    },

    find(id, callback) {
        db.query('SELECT * FROM members WHERE id = $1', [id], (err, results) => {
            if(err) throw `FIND => Database Error! ${err}`
            return callback(results.rows[0])
        })
    },

    update(data, callback) {
        const query = `
            UPDATE members SET
                name       = ($1),
                avatar_url = ($2),
                birth      = ($3),
                gender     = ($4),
                blood      = ($5),
                weight     = ($6),
                height     = ($7),
                email      = ($8)
            WHERE id = $9
        `
        const values = [
            data.name,
            data.avatar_url,
            formatDate(data.birth).iso,
            data.gender,
            data.blood,
            data.weight,
            data.height,
            data.email,
            data.id
        ]

        db.query(query, values, (err, results) => {
            if(err) throw `UPDATE => Database Error! ${err}`
            return callback()
        })
    },

    delete(id, callback) {
        db.query('DELETE FROM members WHERE id = $1', [id], (err) => {
            if(err) throw `DELETE => Database Error! ${err}`
            return callback()
        })
    }
}