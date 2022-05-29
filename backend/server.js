const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://127.0.0.1:27017/";

app.get("/api/getusers", (req, res) => {
  /*
  var objUsers = new Object();
  listUsers(objUsers);
  var users = JSON.stringify(objUsers);
  console.log(users);
  res.send({ express: `This is the users list: ${users}` });
  */
  listUsers(res);
});

app.post("/api/finduser", (req, res) => {
  console.log(req.body);
  var username = req.body.post;
  findOneUserByUserame(username, res);
});

app.listen(port, () => console.log(`Listening on port ${port}`));

function listUsers(res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("local");

    dbo
      .collection("users")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        if (result) {
          //console.log(`Users found:`);
          //console.log(result);
          res.send({ users: JSON.stringify(result) });
        } else {
          //console.log(`No users found.`);
          //res.send({ express: `No users found` });
          res.send(null);
        }
        //console.log(`-------------------`);
        db.close();
      });
  });
}

function findOneUserByUserame(username, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("local");

    dbo
      .collection("users")
      .findOne({ username: username }, function (err, result) {
        if (err) throw err;

        if (result) {
          //var user = JSON.stringify(result);
          //res.send(`Found user: ${user}`);
          res.send({ user: result });
          //console.log(`Found a user in the collection with username '${username}':`);
          //console.log(`ID: '${result._id}':`);
          //console.log(`First Name: '${result.first_name}':`);
          //console.log(`Last Name: '${result.last_name}':`);
          //console.log(`Password: '${result.password}':`);
        } else {
          //res.send(`User not found`);
          res.send(null);
          //console.log(`No user found with the username '${username}'`);
        }
        //console.log(`-------------------`);
        db.close();
      });
  });
}
