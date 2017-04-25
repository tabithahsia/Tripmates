var express = require('express')
var knex = require('knex')
var path = require('path');

var db = require('./db/database.js')
var app = express()

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../client')));

app.listen(3000, function () {
  console.log('Listening on port 3000!')
})
