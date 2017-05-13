var express = require('express');
// var session = require('express-session');
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
// app.use(session({secret: 'encryption_secret'}));

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../client')));



app.get('/yelp', function (req, res) {
  const resultArray = [];

  yelp.accessToken(yelpAPI.clientId, yelpAPI.clientSecret).then(response => {
    const client = yelp.client(response.jsonBody.access_token);

    client.search(req.query).then(response => {
      for (var i = 0; i < 3; i++) {
        currentResult = response.jsonBody.businesses[i];
        resultArray.push(currentResult);
      }
      res.send({resultArray});
    })
    
      // const firstResult = response.jsonBody.businesses[0];
      // const prettyJson = JSON.stringify(firstResult, null, 4);
      // console.log(prettyJson);
  }).catch(e => {
    console.log(e);
  });
})



app.get('/profile', function (req, res) {
  var userData = {};
  var tripArray = [];

    var currentUserIDQuery = `SELECT id FROM users WHERE username = '${req.query.loggedInUser}'`; 
    db.dbConnection.query(currentUserIDQuery, function(error, currentUser, fields) {
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

        var query3 = `SELECT * FROM dates WHERE trip_id = ${tripId[0].id}`;

        db.dbConnection.query(query3, function(error, dateRow,fields){
          if(error) {
            console.error(error);
          }
            res.send(dateRow);
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
  var tripNameQuery = `SELECT trip FROM tripNames ORDER BY id DESC LIMIT 1`;
  db.dbConnection.query(tripNameQuery, function(error,trip,fields) {
    if(error) {
      console.error(error)
    }
    var tripIDQuery = `SELECT id FROM trips WHERE tripName = '${trip[0].trip}'`;
    db.dbConnection.query(tripIDQuery, function(error, tripId, fields) {
      if(error) {
        console.error(error);
      }

      var commentsQuery = `SELECT comment, username FROM comments INNER JOIN users ON comments.user_id = users.id WHERE trip_id = ${tripId[0].id}`
      db.dbConnection.query(commentsQuery, function(error,comments,fields){
        if(error) {
          console.error(error);
        }
        res.send(comments);
      })
    })
  })
})

app.post('/tripName', function(req, res) {
  var trip = req.body.trip;

  var query = `INSERT INTO tripNames (trip) VALUES ('${trip}')`
  db.dbConnection.query(query);
  res.send("Added to DB");
})

app.post('/signup', function (req, res){
  var username = req.body.username;
  var password = req.body.password;

  if(username && password) {
    // req.session.username = username;
    var encryptedPassword = bcrypt.hashSync(password, salt)

    var insertEncryptedPwQuery = `INSERT INTO users (username, password) VALUES ('${username}', '${encryptedPassword}')`;

    db.dbConnection.query(insertEncryptedPwQuery);
    res.send("Added to DB");
  }
})


app.post('/login', function (req, res) {

  var username = req.body.username;
  var password = req.body.password;

  // If username or password is blank, send back 'false'
  if(!username || !password) {
    return res.send(false);
  }

  var doesUserExist = `SELECT username FROM users WHERE username = '${username}'`;
  db.dbConnection.query(doesUserExist, function (error, result, fields) {
    // If username does not exist in database, send back 'false'
    if(!result[0]) {
      return res.send(false);
    } else {
        // req.session.username = username;
        // If username exists, check password
        var query = `SELECT password from users WHERE username = '${username}'`;
        db.dbConnection.query(query, function (error, encryptedPassword, fields) {
          if (error) {
            console.error(error)
          }
          bcrypt.compare(password, encryptedPassword[0].password).then(function(match) {
            return res.send(match);
          })
          .catch(function (error) {
            console.log(error);
          });;
        });
      }
    });
})

app.get('/logout',function(req,res){
  // req.session.destroy(function(err) {
  //   if(err) {
  //     console.log(err);
  //   } else {
  //     res.redirect('/');
  //   }
  // });
});


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
  var tripNameQuery = `SELECT trip FROM tripNames ORDER BY id DESC LIMIT 1`;
  db.dbConnection.query(tripNameQuery, function(error,trip,fields) {
   if(error) {
      console.error(error)
    }
    var tripIDQuery = `SELECT id FROM trips WHERE tripName = '${trip[0].trip}'`;
    db.dbConnection.query(tripIDQuery, function(error, tripId, fields){
      if(error) {
        console.error(error)
      }
      var commentOwnerQuery = `SELECT id FROM users WHERE username = '${req.body.commentOwner}'`;
      db.dbConnection.query(commentOwnerQuery, function(error, userid, fields) {
        if(error) {
          console.log(error)
        }
        var insertCommentQuery = `INSERT INTO comments (comment, user_id, trip_id) VALUES ('${req.body.comment}',${userid[0].id},${tripId[0].id})`;
        db.dbConnection.query(insertCommentQuery, function(error, results, fields) {
          if(error) {
            console.error(error)
          }
          res.send('inserted comments to database');
        })
      })
    })
  })
})

app.post('/addVote', function(req,res) {
  var nameQuery = `SELECT trip FROM tripNames ORDER BY id DESC LIMIT 1`;
  db.dbConnection.query(nameQuery, function(error, trip, fields) {
    if(error) {
      console.log(error)
    }
    var idQuery = `SELECT id FROM trips WHERE tripName = '${trip[0].trip}'`
    db.dbConnection.query(idQuery, function(error, id, fields) {

      var tripQuery = `SELECT votes FROM dates WHERE dateOption = '${req.body.date}' AND trip_id = ${id[0].id}`;
      db.dbConnection.query(tripQuery, function(error, votes, fields) {

        var updateDateVoteQuery = `UPDATE dates SET votes = ${votes[0].votes + 1} WHERE dateOption = '${req.body.date}' AND trip_id = ${id[0].id}`;
        db.dbConnection.query(updateDateVoteQuery, function(error, voteCount, fields){
          if(error) {
          console.error(error)
          }
          res.send('updated date vote');
        })
      })
    })
  })
 })

app.post('/addActivityVote', function(req,res) {

  var nameQuery = `SELECT trip FROM tripNames ORDER BY id DESC LIMIT 1`;
  db.dbConnection.query(nameQuery, function(error, trip, fields) {
    if(error) {
      console.log(error)
    }
    var idQuery = `SELECT id FROM trips WHERE tripName = '${trip[0].trip}'`
    db.dbConnection.query(idQuery, function(error, id, fields) {

       var tripQuery = `SELECT vote_count FROM activities WHERE activityName = '${req.body.activityName}' AND trip_id = ${id[0].id}`;
       db.dbConnection.query(tripQuery, function(error, votes, fields) {
      
        var updateActivityVoteQuery = `UPDATE activities SET vote_count = ${votes[0].vote_count + 1} WHERE activityName = '${req.body.activityName}' AND trip_id = ${id[0].id}`;
        db.dbConnection.query(updateActivityVoteQuery, function(error, voteCount, fields){
          if(error) {
          console.error(error)
          }
          res.send('updated activity vote');
      })
    })
  })
 })
})


app.post('/tripInfo', function(req, res) {
  var currentUserID_query = `SELECT id FROM users WHERE username = '${req.body.loggedInUser}'`;
  db.dbConnection.query(currentUserID_query, function(error, currentUser, fields1) {
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
        for(var z = 0; z < req.body.friend.length; z++) {
          var friendIDQuery = `SELECT id FROM users WHERE username = '${req.body.friend[z]}'`
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
        }
        var insertUserTripsQuery = `INSERT INTO user_trips (user_id, trip_id) VALUES ('${currentUser[0].id}', '${tripID[0].id}')`

        db.dbConnection.query(insertUserTripsQuery, function(error, result, fields) {
          if(error) {
            console.error(error);
          }
          res.send('Inserted trip into DB');
        })
      })
    })
  })
})

app.listen(3000, function () {
  console.log('Listening on port 3000!')
})
