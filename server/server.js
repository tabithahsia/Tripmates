var express = require('express')
var knex = require('knex')

var db = require('./db/database.js')
var app = express()

app.get('/', function(req, res) {
  res.send('db', db)
})

app.listen(3000, function () {
  console.log('Listening on port 3000!')
})
