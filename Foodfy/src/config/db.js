const { Pool } = require('pg')

module.exports = new Pool({
    user: 'postgres',
    password: 'postgres123',
    host: 'localhost',
    port: 5432,
    database: 'foodfy'
})