const db             = require('../../config/db')
const { formatDate } = require('../../lib/Utils')

module.exports = {
    all(callback) {
        db.query(`  Select instructors.*, Count(members.name) As total_students
                    From instructors
                    Left Join members On (members.instructor_id = instructors.id)
                    Group By instructors.ID 
                    Order by total_students desc`, (err, results) => {
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

    findBy(filter, callback) {
        db.query(`  Select instructors.*, Count(members.name) As total_students
                    From instructors
                    Left Join members On (members.instructor_id = instructors.id)
                    WHERE instructors.name ILIKE '%${filter}%' OR
                          instructors.services ILIKE '%${filter}%'
                    Group By instructors.ID 
                    Order by total_students desc`, (err, results) => {
            if(err) throw `FINDBY => Database Error! ${err}`
            return callback(results.rows)
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
    },

    paginate(params){
        const { filter, limit, offset, callback } = params
        
        let query =`Select instructors.*, Count(members.name) As total_students
                    From instructors
                    Left Join members On (members.instructor_id = instructors.id)`        
        
        if( filter ){
            query = `${query}
                WHERE instructors.name ILIKE '%${filter}%' OR
                      instructors.services ILIKE '%${filter}%' `
        }
        query = `${query}
                Group By instructors.ID 
                Order by instructors.ID, total_students DESC 
                LIMIT $1 OFFSET $2 ` // PODEMOS COLOCAR ${limit} ${offset} NO LUGAR DE $1 e $2;
        
        db.query(query, [limit, offset], (err, results) => {
            if (err) throw 'PAGINATE => Database Error!!'
            callback(results.rows)
        })
    }
}