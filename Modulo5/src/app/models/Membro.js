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
                created_at,
                instructor_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
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
            data.instructor
        ]
        
        db.query(query, values, (err, results) => {
            if(err) throw `POST => Database Error! ${err}`
            return callback(results.rows[0])
        })
    },

    find(id, callback) {
        db.query(`  SELECT members.*, instructors.name As instructor_name
                    FROM members
                    LEFT JOIN instructors ON (instructors.id = members.instructor_id) 
                    WHERE members.id = $1`, [id], (err, results) => {
            if(err) throw `FIND => Database Error! ${err}`
            return callback(results.rows[0])
        })
    },

    update(data, callback) {
        const query = `
            UPDATE members SET
                name          = ($1),
                avatar_url    = ($2),
                birth         = ($3),
                gender        = ($4),
                blood         = ($5),
                weight        = ($6),
                height        = ($7),
                email         = ($8),
                instructor_id = ($9)
            WHERE id = $10
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
            data.instructor,
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
    },

    instructorsSelectOptions(callback){
        db.query('SELECT name, id FROM instructors', (err, results) => {
            if(err) throw 'SELECT INSTRUCTORS OPTIONS => Database Error!'
            return callback(results.rows)
        })
    },

    paginate(params){
        const { filter, limit, offset, callback } = params

        let query = "",
            filterQuery = "",
            totalQuery = `( SELECT COUNT(*) FROM members ) AS total`        
                
        if( filter ){
            filterQuery = `WHERE members.name ILIKE '%${filter}%' OR
                                 members.email ILIKE '%${filter}%' `
            totalQuery = `( SELECT COUNT(*) FROM members
                          ${filterQuery} ) AS total`
        }
        query = `Select members.*, ${totalQuery}
                 From members
                 ${filterQuery}
                 Order by members.ID
                 LIMIT $1 OFFSET $2 ` // PODEMOS COLOCAR ${limit} ${offset} NO LUGAR DE $1 e $2;
        
        db.query(query, [limit, offset], (err, results) => {
            if (err) throw 'PAGINATE => Database Error!!'
            callback(results.rows)
        })
    }
}