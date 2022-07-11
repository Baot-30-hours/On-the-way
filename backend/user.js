var nconf = require("nconf");
nconf.argv().env();
nconf.file({ file: "./config.json" });

var MongoClient = require("mongodb").MongoClient;
var mongodb_url = nconf.get("mongodb_url");
var db_name = nconf.get("db_name");

module.exports = function (app) {
  app.get("/api/getusers", (req, res) => {
    /*
  var objUsers = new Object();
  listUsers(objUsers);
  var users = JSON.stringify(objUsers);
  console.log(users);
  res.send({ 
    : `This is the users list: ${users}` });
  */
    listUsers(res);
  });

  app.post("/api/adduser", (req, res) => {
    createUser(req.body, res);
  });

  app.post("/api/getUserByEmailAndPassword", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    findOneUserByEmailAndPassword(email, password, res);
  });

  app.post("/api/finduser", (req, res) => {
    var userEmail = req.body.userEmail;
    findOneUserByEmail(userEmail, res);
  });

  async function createUser(newUser, res) {
    console.log("newUser: " + newUser);
  
    MongoClient.connect(mongodb_url, async function (err, db) {
      if (err) throw err;
      var dbo = db.db(db_name);
  
      // create the users document
      const result = await dbo.collection("users").insertOne(newUser);
      console.log(
        `New user created with the following id: ${result.insertedId}`
      );
      res.send(result.insertedId);
      db.close();
    });
  }

  function listUsers(res) {
    MongoClient.connect(mongodb_url, function (err, db) {
      if (err) throw err;
      var dbo = db.db(db_name);

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

  function findOneUserByEmailAndPassword(email, password, res) {
    MongoClient.connect(mongodb_url, function (err, db) {
      if (err) throw err;
      var dbo = db.db(db_name);

      dbo
        .collection("users")
        .findOne({ email: email }, function (err, result) {
          if (err) {
            throw err;
          }
          if (result) {
            if(password === result.password){
              res.send({ user: result });
            }
            else{
              res.send({error: 'The email exist but the password is incorrect'});
            }
          } else {
            res.send(null);
          }
          db.close();
        });
    });
  }

  function findOneUserByEmail(email, res) {
    MongoClient.connect(mongodb_url, function (err, db) {
      if (err) throw err;
      var dbo = db.db(db_name);

      dbo
        .collection("users")
        .findOne({ email: email }, function (err, result) {
          if (err) {throw err;}
          if (result) {
            res.send({user : result});
          } else {
            res.send(null);
          }
          db.close();
        });
    });
  }

  function findOneUserByUserame(username, res) {
    MongoClient.connect(mongodb_url, function (err, db) {
      if (err) throw err;
      var dbo = db.db(db_name);

      dbo
        .collection("users")
        .findOne({ username: username }, function (err, result) {
          if (err) throw err;
          if (result) {
            res.send({ user: result });
          } else {
            res.send(null);
          }
          db.close();
        });
    });
  }
};
