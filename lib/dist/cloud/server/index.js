
const express = require('express')
const path = require('path')
const website =  path.join(__dirname,'../public')

const app = express()
app.use('/',express.static(website))

module.exports = app