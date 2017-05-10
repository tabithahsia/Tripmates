var express = require('express');
// var knex = require('knex');
var path = require('path');
var bodyParser = require('body-parser');

var db = require('./db/database.js');
var app = express();

app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../client')));

app.get('/signup', function (req, res) {
  res.render('/Signup')
})


app.get('/profile', function (req, res) {
  var userData = {};

  var query = `SELECT username FROM logIns ORDER BY id DESC LIMIT 1`;
  db.dbConnection.query(query, function(error,results,fields) {
    if(error) {
      console.error(error)
    }

    userData['user'] = results;

    var currentUserQuery = `SELECT id FROM users WHERE username = '${results[0].username}'`
    db.dbConnection.query(currentUserQuery, function(error1, currentUser, fields) {
      if(error) {
        console.log(error1)
      }
      
      console.log('currentUser', currentUser)

        var tripsQuery = `SELECT tripName FROM trips INNER JOIN user_trips ON trips.id = user_trips.trip_id WHERE user_id = '${currentUser[0].id}'`
        db.dbConnection.query(tripsQuery, function (error, tripList, fields) {
          if (tripList[0]) {
          console.log('tripList', tripList[0].tripName)

          userData['trips'] = tripList[0].tripName;
          res.send(userData);
          }
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

app.post('/tripInfo', function(req, res) {
  console.log(req.body)
  var query = `SELECT username FROM logIns ORDER BY id DESC LIMIT 1`;
  db.dbConnection.query(query, function(error, username, fields) {
    if(error) {
      console.error(error)
    }
    var query1 = `SELECT id FROM users WHERE username = '${username[0].username}'`;
    db.dbConnection.query(query1, function(error1, userid, fields1) {
      if(error1) {
        console.log(error1)
      }
      var query2 = `INSERT INTO trips (tripName, destination, est_cost) VALUES ('${req.body.tripName}', '${req.body.destination}', '${req.body.estCost}')`
      db.dbConnection.query(query2, function(error2, results2, fields2) {
        if(error2) {
          console.error(error2)
        }
        var query3 = `SELECT id FROM trips WHERE tripName = '${req.body.tripName}'`
        db.dbConnection.query(query3, function(error3, tripid, fields3) {
          if(error3) {
            console.error(error3)
          }

          for(var j = 0; j < req.body.dates.length; j++) {
            var query6 = `INSERT INTO dates (dateOption, trip_id) VALUES ('${req.body.dates[j]}', ${tripid[0].id})`
            db.dbConnection.query(query6, function(err,res,fie) {
              if(err) {
                console.error(err)
              }
            })
          }
          var query5 = `INSERT INTO user_trips (user_id, trip_id) VALUES (${userid[0].id}, ${tripid[0].id})`
          db.dbConnection.query(query5, function(error5, userTripId, field5) {
            if(error5) {
              console.error(error5);
            }
            for(var i = 0; i < req.body.activities.length;i++) {
              var query4 = `INSERT INTO activities (activityName, activityDescription, est_cost, vote_count, trip_id) VALUES ('${req.body.activities[i].activity}', '${req.body.activities[i].activityDescription}', '${req.body.activities[i].activityCost}', 0, ${tripid[0].id})`
              db.dbConnection.query(query4, function(err,res,fie) {
                if(err) {
                  console.error(err)
                }
              })
            }
          })
        })
      })
    })
  })
      
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







