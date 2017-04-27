var express = require('express');
// var knex = require('knex');
var path = require('path');
var bodyParser = require('body-parser');

var db = require('./db/database.js');
var app = express();

 app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../client')));

app.post('/login', function (req, res){
  console.log("username", req.body.username);
  res.send(req.body.username)
})

app.listen(3000, function () {
  console.log('Listening on port 3000!')
})
