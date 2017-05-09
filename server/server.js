var express = require('express');
// var knex = require('knex');
var path = require('path');
var bodyParser = require('body-parser');

var db = require('./db/database.js');
var app = express();

app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../client')));

app.get('/profile', function (req, res) {
  var query = `SELECT username FROM logIns ORDER BY id DESC LIMIT 1`;
  db.dbConnection.query(query, function(error,results,fields) {
    if(error) {
      console.error(error)
    }
    res.send(results)
    var query1 = `SELECT id FROM users WHERE username = '${results[0].username}'`
    db.dbConnection.query(query1, function(error1, results1, fields) {
      if(error) {
        console.log(error1)
      }
      console.log('result1', results1)
      var query2 = `SELECT tripName FROM trips INNER JOIN user_trips ON trips.id = user_trips.trip_id WHERE user_id = '${results1[0].id}'`
      db.dbConnection.query(query2, function(error,results2,fields){
        console.log('result2', results2)
      })
    })
  });
})



// app.post('/login', function (req, res){
//   console.log("log in username", req.body.username);
//   var userName = req.body.username;
//   var password = req.body.password;
//   res.send(req.body.username)
// })

app.post('/signup', function (req, res){
  console.log("inpost request", req.body);

  var username = req.body.username;
  var password = req.body.password;

  var query1 = `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`;
  var query2 = `INSERT INTO logIns (username, password) VALUES ('${username}', '${password}')`;

  db.dbConnection.query(query1);
  db.dbConnection.query(query2);
  res.send("Added to DB");
})

app.post('/login', function (req, res) {
  console.log("inpost request", req.body);

  var username = req.body.username;
  var password = req.body.password;

  var query2 = `INSERT INTO logIns (username, password) VALUES ('${username}', '${password}')`;

  db.dbConnection.query(query2);
  res.send("Added to DB");
})

app.get('/userTable', function(req, res) {
  var query = `SELECT * FROM users`;
  db.dbConnection.query(query, function (error, results, fields) {
    if (error) {
      console.error(error)
    }
    res.send(results)
  });
})

// var addAlbum = function(album, cb) {
//   var query = `INSERT INTO kanyes(era,year,description,imageURL) VALUES('${album.era}','${album.year}','${album.description}','${album.imageURL}')`;
//   connection.query(query, (err,results,fields) => {
//     if (err) {
//       cb(err, false);
//     } else {
//       console.log('Added new album to db');
//       cb(null, true);
//     }
//   });
// }


app.listen(3000, function () {
  console.log('Listening on port 3000!')
})
