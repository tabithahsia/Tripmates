var express = require('express');
// var knex = require('knex');
var path = require('path');
var bodyParser = require('body-parser');

var db = require('./db/database.js');
var app = express();

 app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../client')));

// app.get('/login', function(req, res){
//   res.render("src/components/App.jsx");
// })

app.post('/login', function (req, res){
  res.send("haaaai")
})

app.listen(3000, function () {
  console.log('Listening on port 3000!')
})
