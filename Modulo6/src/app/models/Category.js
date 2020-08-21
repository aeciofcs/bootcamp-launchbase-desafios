const db = require('../../config/db')

module.exports = {
    all() {
        return db.query(`Select * From categories`)
    }
}