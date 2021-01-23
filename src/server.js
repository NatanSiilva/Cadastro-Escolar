require('dotenv/config')


const express = require('express')
const nunjucks = require('nunjucks')
const routes = require("./routes")
const methodOverride = require('method-override')
const { Client } = require('pg');

const server = express()


const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();


server.use(express.urlencoded({ extended: true }))
server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(routes)

server.set('view engine', 'njk')

nunjucks.configure("src/app/views", {
    express: server,
    autoescape: true,
    noCache: true
})


server.listen(process.env.PORT || 3333, (req, res) => {
    console.log("server is running")
})