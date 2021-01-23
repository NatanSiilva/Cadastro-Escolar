require('dotenv/config')

const { Pool} = require('pg')

module.exports = new Pool ({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    database_url: process.env.DATABASE_URL
})