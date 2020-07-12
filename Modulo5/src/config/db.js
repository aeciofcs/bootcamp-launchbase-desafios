// Jeito do banco de dados fazer conexão sem usuario e senha
const { Pool } = require('pg')

module.exports = new Pool({
    user: 'postgres',
    password: 'postgres123',
    host: 'localhost',
    port: 5432,
    database: 'gymmanager'
})