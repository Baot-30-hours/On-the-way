//const config = require("./config")();
var nconf = require("nconf");
nconf.argv().env();
nconf.file({ file: "./config.json" });

var MongoClient = require("mongodb").MongoClient;
var mongodb_url = nconf.get("mongodb_url");
var db_name = nconf.get("db_name");

module.exports = async function (app) {
  await app.post("/api/createhazard", (req, res) => {
    //var params = req.body;
    //console.log("params: " + params);
    var username = req.body.username;
    var description = req.body.description;
    var type = req.body.type;

    createHazard(
      {
        username: username,
        type: type,
        description: description,
      },
      res
    );
  });

  await app.get("/api/gethazards", (req, res) => {
    getHazards(res);
  });

  await app.post("/api/updatehazard", (req, res) => {});

  await app.post("/api/deletehazard", (req, res) => {});
};

async function createHazard(newHazard, res) {
  console.log("username: " + newHazard.username);
  console.log("type: " + newHazard.type);
  console.log("description: " + newHazard.description);

  MongoClient.connect(mongodb_url, async function (err, db) {
    if (err) throw err;
    var dbo = db.db(db_name);

    // create the hazard document
    const result = await dbo.collection("hazards").insertOne(newHazard);
    console.log(
      `New hazard created with the following id: ${result.insertedId}`
    );
    res.send({ hazardid: JSON.stringify(result.insertedId) });
    db.close();
  });
}

async function getHazards(res) {
  MongoClient.connect(mongodb_url, async function (err, db) {
    if (err) throw err;
    var dbo = db.db(db_name);

    await dbo
      .collection("hazards")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        if (result) {
          console.log(`Hazards found:`);
          console.log(result);
          res.send({ hazards: JSON.stringify(result) });
        } else {
          console.log(`No hazards found.`);
          res.send("no hazards found");
        }
        //console.log(`-------------------`);
        db.close();
      });
  });
}
