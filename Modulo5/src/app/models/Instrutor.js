const db             = require('../../config/db')
const { formatDate } = require('../../lib/Utils')

module.exports = {
    all(callback) {
        db.query('SELECT * FROM instructors', (err, results) => {
            if(err) throw `SELECT => Database Error! ${err}`
            return callback(results.rows)
        })
    },

    create(data, callback) {
        const query = `
            INSERT INTO instructors (
                name, 
                avatar_url, 
                gender, 
                services, 
                birth, 
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `
        const values = [
            data.name,
            data.avatar_url,
            data.gender,
            data.services,
            formatDate(data.birth).iso,
            formatDate(Date.now()).iso,
        ]
        
        db.query(query, values, (err, results) => {
            if(err) throw `POST => Database Error! ${err}`
            return callback(results.rows[0])
        })
    },

    find(id, callback) {
        db.query('SELECT * FROM instructors WHERE id = $1', [id], (err, results) => {
            if(err) throw `FIND => Database Error! ${err}`
            return callback(results.rows[0])
        })
    },

    update(data, callback) {
        const query = `
            UPDATE instructors SET
                avatar_url = ($1),
                name = ($2),
                birth = ($3),
                gender = ($4),
                services = ($5)
            WHERE id = $6                
        `
        const values = [
            data.avatar_url,
            data.name,
            formatDate(data.birth).iso,
            data.gender,
            data.services,
            data.id
        ]
        db.query(query, values, (err, results) => {
            if(err) throw `UPDATE => Database Error! ${err}`
            return callback()
        })
    },

    delete(id, callback) {
        db.query('DELETE FROM instructors WHERE id = $1', [id], (err) => {
            if(err) throw `DELETE => Database Error! ${err}`
            return callback()
        })
    }
}