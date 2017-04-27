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
  console.log("log in username", req.body.username);
  var userName = req.body.username;
  var password = req.body.password;
  res.send(req.body.username)
})

app.post('/signup', function (req, res){
  console.log("sign up username", req.body.username);

  var userName = req.body.username;

  var query = `INSERT INTO users(username) VALUES ('${userName}')`;
  db.dbConnection.query(query);

  res.send(req.body.username)
})



app.listen(3000, function () {
  console.log('Listening on port 3000!')
})
