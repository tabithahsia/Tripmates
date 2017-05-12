var express = require('express');
var session = require('express-session');
// var knex = require('knex');
var path = require('path');
var bodyParser = require('body-parser');

var db = require('./db/database.js');
var app = express();
var bcrypt = require('bcrypt');

var salt = bcrypt.genSaltSync(10);

var yelp = require('yelp-fusion');
var yelpAPI = require('./yelpApi.js');

app.use(bodyParser.json());
app.use(session({secret: 'encryption_secret'}));

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../client')));



app.get('/yelp', function (req, res) {

  yelp.accessToken(yelpAPI.clientId, yelpAPI.clientSecret).then(response => {
    const client = yelp.client(response.jsonBody.access_token);

    client.search(req.query).then(response => {
      const firstResult = response.jsonBody.businesses[0];
      const prettyJson = JSON.stringify(firstResult, null, 4);
      console.log(prettyJson);
    });
  }).catch(e => {
    console.log(e);
  });
})



app.get('/profile', function (req, res) {
  var userData = {};
  var tripArray = [];

  var query = `SELECT username FROM logIns ORDER BY id DESC LIMIT 1`;
  db.dbConnection.query(query, function(error,results,fields) {
    if(error) {
      console.error(error)
    }

    userData['user'] = results;

    var currentUserQuery = `SELECT id FROM users WHERE username = '${results[0].username}'`
    db.dbConnection.query(currentUserQuery, function(error1, currentUser, fields) {
      if(error) {
        console.log(error)
      }

      var tripsQuery = `SELECT tripName FROM trips INNER JOIN user_trips ON trips.id = user_trips.trip_id WHERE user_id = '${currentUser[0].id}'`
      db.dbConnection.query(tripsQuery, function (error, tripList, fields) {
        if (tripList[0]) {

        for (var i = 0; i < tripList.length; i++) {
          tripArray.push(tripList[i].tripName)
        }
        userData['trips'] = tripArray;
        }
        res.send(userData);
      })
    })
  });
})

app.get('/tripName', function(req,res) {

    var query = `SELECT trip from tripNames ORDER BY id DESC LIMIT 1`;
    db.dbConnection.query(query, function(error,trip,fields) {
      if(error) {
        console.error(error)
      }
      var query2 = `SELECT * FROM trips WHERE tripName = '${trip[0].trip}'`;
      db.dbConnection.query(query2, function(error, results, fields) {
        res.send(results);
      })
    })
})

app.get('/dates', function(req,res) {
    var query = `SELECT trip FROM tripNames ORDER BY id DESC LIMIT 1`;
    db.dbConnection.query(query, function(error,trip,fields) {
      if(error) {
        console.error(error)
      }
      var query2 = `SELECT id FROM trips WHERE tripName = '${trip[0].trip}'`;
      db.dbConnection.query(query2, function(error, tripId, fields) {

        var query3 = `SELECT dateOption FROM dates WHERE trip_id = ${tripId[0].id}`;
        db.dbConnection.query(query3, function(error, date,fields){
          if(error) {
            console.error(error);
          }
            res.send(date);
        })
      })
    })
})

app.get('/activities', function(req,res) {
    var query = `SELECT trip FROM tripNames ORDER BY id DESC LIMIT 1`;
    db.dbConnection.query(query, function(error,trip,fields) {
      if(error) {
        console.error(error)
      }
      var query2 = `SELECT id FROM trips WHERE tripName = '${trip[0].trip}'`;
      db.dbConnection.query(query2, function(error, tripId, fields) {
       if(error) {
          console.error(error);
        }

      var query3 = `SELECT * FROM activities WHERE trip_id = ${tripId[0].id}`;
      db.dbConnection.query(query3, function(error, activities,fields){
        if(error) {
          console.error(error);
        }
          res.send(activities);
        })
      })
    })
})

app.get('/comments', function (req, res) {
     var query = `SELECT trip FROM tripNames ORDER BY id DESC LIMIT 1`;
      db.dbConnection.query(query, function(error,trip,fields) {
      if(error) {
        console.error(error)
      }
      var query2 = `SELECT id FROM trips WHERE tripName = '${trip[0].trip}'`;
      db.dbConnection.query(query2, function(error, tripId, fields) {
       if(error) {
          console.error(error);
        }

      var query3 = `SELECT * FROM comments WHERE trip_id = ${tripId[0].id}`;
      db.dbConnection.query(query3, function(error, comments,fields){
        if(error) {
          console.error(error);
        }
          console.log(comments);
          res.send(comments);
        })
      })
    })
})

app.get('/commentOwner', function (req,res){
    var query1 = `SELECT username FROM logIns ORDER BY id DESC LIMIT 1`;
    db.dbConnection.query(query1, function(error, username, fields) {
    if(error) {
      console.error(error)
    }
      res.send(username);
  })
})

app.post('/tripName', function(req, res) {
  var trip = req.body.trip

  var query = `INSERT INTO tripNames (trip) VALUES ('${trip}')`
  db.dbConnection.query(query);
  res.send("Added to DB");
})

app.post('/signup', function (req, res){
  var username = req.body.username;
  var password = req.body.password;

  req.session.username = username;
  var encryptedPassword = bcrypt.hashSync(password, salt)

  var insertEncryptedPwQuery = `INSERT INTO users (username, password) VALUES ('${username}', '${encryptedPassword}')`;
  var insertUserPwLoginQuery = `INSERT INTO logIns (username, password) VALUES ('${username}', '${encryptedPassword}')`;

  db.dbConnection.query(insertEncryptedPwQuery);
  db.dbConnection.query(insertUserPwLoginQuery);
  res.send("Added to DB");
})


app.post('/login', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  var doesUserExist = `SELECT username FROM users WHERE username = '${username}'`;
  db.dbConnection.query(doesUserExist, function (error, result, fields) {
    // If username does not exist in database, send back 'false'
    if(!result[0]) {
      res.send(false);
    } else {
        req.session.username = username;
        // If username exists, check password
        var query = `SELECT password from users WHERE username = '${username}'`;
        db.dbConnection.query(query, function (error, encryptedPassword, fields) {
          if (error) {
            console.error(error)
          }
          bcrypt.compare(password, encryptedPassword[0].password).then(function(match) {
            res.send(match);
          })
          .catch(function (error) {
            console.log(error);
          });;
        });

        // Not sure if this is needed anymore - or should be able to refactor?
        var insertUserLoginQuery = `INSERT INTO logIns (username, password) VALUES ('${username}', '${password}')`;
        db.dbConnection.query(insertUserLoginQuery);
      }
    });
})

app.get('/logout',function(req,res){
  req.session.destroy(function(err) {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

app.get('/userTable', function(req, res) {
  var query = `SELECT * FROM users`;
  db.dbConnection.query(query, function (error, results, fields) {
    if (error) {
      console.error(error)
    }
    res.send(results)
  });
})


app.post('/newactivity', function(req,res) {
  var query = `SELECT trip FROM tripNames ORDER BY id DESC LIMIT 1`;
    db.dbConnection.query(query, function(error,trip,fields) {
      if(error) {
        console.error(error)
      }
      var query2 = `SELECT id FROM trips WHERE tripName = '${trip[0].trip}'`;
      db.dbConnection.query(query2, function(error, tripId, fields) {
      if(error) {
        console.error(error)
      }
      console.log('new activity added by friend', req.body)
      var query3 = `INSERT INTO activities (activityName, activityDescription, est_cost, vote_count, trip_id) VALUES ('${req.body.activity}','${req.body.activityDescription}',${req.body.activityCost}, 0, ${tripId[0].id})`
      db.dbConnection.query(query3, function(error, friendActivity, fields) {
        if(error) {
          console.error(error)
        }
        res.send('added friend activity to db');
      })
  })
 })
})

app.post('/comments', function(req,res) {

  var query = `SELECT trip FROM tripNames ORDER BY id DESC LIMIT 1`;
  db.dbConnection.query(query, function(error,trip,fields) {
   if(error) {
        console.error(error)
      }
  var query2 = `SELECT id FROM trips WHERE tripName = '${trip[0].trip}'`;
  db.dbConnection.query(query2, function(error, tripId, fields){
    if(error) {
    console.error(error)
    }
   var query3 = `SELECT username FROM logIns ORDER BY id DESC LIMIT 1`;
   db.dbConnection.query(query3, function(error, username, fields) {
    if(error) {
      console.error(error)
    }
    var query4 = `SELECT id FROM users WHERE username = '${username[0].username}'`;
    db.dbConnection.query(query4, function(error, userid, fields1) {
      if(error) {
        console.log(error)
      }
      var query5 = `INSERT INTO comments (comment, user_id, trip_id) VALUES ('${req.body.comment}',${userid[0].id},${tripId[0].id})`;
      db.dbConnection.query(query5, function(error2, results2, fields2) {
        if(error) {
          console.error(error)
        }
        res.send('inserted comments to database');
     })
    })
   })
  })
 })
})

app.post('/addVote', function(req,res) {
  console.log('reqbody', req.body);
  var tripQuery = `SELECT trip FROM tripNames ORDER BY id DESC LIMIT 1`;
  db.dbConnection.query(tripQuery, function(error,trip,fields) {
   if(error) {
        console.error(error)
      }
  var tripIdQuery = `SELECT id FROM trips WHERE tripName = '${trip[0].trip}'`;
  db.dbConnection.query(tripIdQuery, function(error, tripId, fields){
    if(error) {
    console.error(error)
    }
  var updateDateVoteQuery = `UPDATE dates SET votes = ${req.body.vote} WHERE trip_id = ${tripId[0].id}`;
  console.log('tripid', tripId);
  db.dbConnection.query(updateDateVoteQuery, function(error, voteCount, fields){
    if(error) {
    console.error(error)
    }
    res.send('updated date vote');
  })
 })
})
})

app.post('/tripInfo', function(req, res) {

  var currentUser_query = `SELECT username FROM logIns ORDER BY id DESC LIMIT 1`;
  db.dbConnection.query(currentUser_query, function(error, currentUser, fields) {
    if(error) {
      console.error(error)
    }

    var currentUserID_query = `SELECT id FROM users WHERE username ='${currentUser[0].username}'`;
    db.dbConnection.query(currentUserID_query, function(error, currentUserID, fields1) {
      if(error) {
        console.log(error)
      }

      var insertTripQuery = `INSERT INTO trips (tripName, destination, est_cost) VALUES ('${req.body.tripName}', '${req.body.destination}', '${req.body.estCost}')`
      db.dbConnection.query(insertTripQuery, function(error, result, fields) {
        if(error) {
          console.error(error)
        }

        var tripIDQuery = `SELECT id FROM trips WHERE tripName = '${req.body.tripName}'`
        db.dbConnection.query(tripIDQuery, function(error, tripID, fields) {
          if(error) {
            console.error(error)
          }

          for(var j = 0; j < req.body.dates.length; j++) {
            var insertDatesQuery = `INSERT INTO dates (dateOption, trip_id, votes) VALUES ('${req.body.dates[j]}', ${tripID[0].id}, ${req.body.votes})`
            db.dbConnection.query(insertDatesQuery, function(error,result,fields) {
              if(error) {
                console.error(error)
              }
            })
          }
          for(var i = 0; i < req.body.activities.length;i++) {
            var insertActivitiesQuery = `INSERT INTO activities (activityName, activityDescription, est_cost, vote_count, trip_id) VALUES ('${req.body.activities[i].activity}', '${req.body.activities[i].activityDescription}', '${req.body.activities[i].activityCost}', 0, ${tripID[0].id})`
            db.dbConnection.query(insertActivitiesQuery, function(error,result,fields) {
              if(error) {
                console.error(error)
              }
            })
          }

          var friendIDQuery = `SELECT id FROM users WHERE username = '${req.body.friend}'`
          db.dbConnection.query(friendIDQuery, function(error, friendID, fields) {
            // If friend invited
            if(friendID[0]) {
              var insertFriendUserTripsQuery = `INSERT INTO user_trips (user_id, trip_id) VALUES('${friendID[0].id}', '${tripID[0].id}')`
              db.dbConnection.query(insertFriendUserTripsQuery, function(error, result, fields) {
                if(error) {
                  console.error(error);
                }
              })
            }
          })

          var insertUserTripsQuery = `INSERT INTO user_trips (user_id, trip_id) VALUES ('${currentUserID[0].id}', '${tripID[0].id}')`

          db.dbConnection.query(insertUserTripsQuery, function(error, result, fields) {
            if(error) {
              console.error(error);
            }
          })
        })
      })
    })
  })

})

app.listen(3000, function () {
  console.log('Listening on port 3000!')
})
