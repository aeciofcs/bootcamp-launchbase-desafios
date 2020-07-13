const db       = require('../../config/db')
const { date } = require('../../lib/Utils')

module.exports = {
    all(callback){
        db.query('SELECT * FROM students', (err, results) => {
            if(err) throw `SELECT => Database Error! ${err}`
            return callback(results.rows)
        })
    },

    create(data, callback){
        const query = `
            INSERT INTO students(
                id,
                avatar_url,
                name,
                birth,
                email,
                school_year,
                workload,
                created_at
            ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING ID
        `
        const values = [
            data.id,
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.email,
            data.school_year,
            data.workload,
            date(Date.now()).iso
        ]
        db.query(query, values, (err, results) => {
            if(err) throw `POST => Database Error! ${err}`
            return callback(results.rows[0])
        })
    },

    find(id, callback){
        db.query(`SELECT * FROM students WHERE ID = $1`, [id], (err, results) => {
            if(err) throw `QTD Registros => Database Error! ${err}`
            return callback(results.rows[0])
        })
    },

    update(data, callback){
        const query = `
            UPDATE students SET
                AVATAR_URL  = ($1),
                NAME        = ($2),
                BIRTH       = ($3),
                EMAIL       = ($4),
                SCHOOL_YEAR = ($5),
                WORKLOAD    = ($6)
            WHERE ID = $7
        `
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.email,
            data.school_year,
            data.workload,
            data.id
        ]
        db.query(query, values, (err, results) => {
            if(err) throw `UPDATE => Database Error! ${err}`
            return callback()
        })
    },

    delete(id, callback){
        db.query('DELETE FROM students WHERE ID = $1', [id], (err, results) => {
            if(err) throw `DELETE => Database Error! ${err}`
            return callback()
        })
    },

    qtdRegisters(callback){
        const query = 'SELECT COALESCE((SELECT id FROM students ORDER BY id DESC LIMIT 1), 0) ID'
        db.query(query, (err, results) => {
            if(err) throw `QTD Registros => Database Error! ${err}`
            console.log(results.rows)
            return callback(results.rows[0].id)
        })
    }
    
}