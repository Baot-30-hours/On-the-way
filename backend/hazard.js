//const config = require("./config")();
var nconf = require("nconf");
nconf.argv().env();
nconf.file({ file: "./config.json" });
var express = require("express");

var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectId;
var mongodb_url = nconf.get("mongodb_url");
var db_name = nconf.get("db_name");

module.exports = async function (app) {
  await app.post("/api/createhazard", function (req, res) {
    const multer = require("multer");
    app.use(
      "/public/uploaded",
      express.static(__dirname + "/public/uploaded/")
    );
    var now = Date.now();
    const storage = multer.diskStorage({
      destination: "./public/uploaded",
      filename: function (req, file, cb) {
        var name = now + "-" + file.originalname;
        cb(null, name);
      },
    });

    const upload = multer({ storage: storage }).array("file");
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        console.log("multer upload error");
      } else if (err) {
        // An unknown error occurred when uploading.
        console.log("multer unknown error");
      }

      // Everything went fine.
      var newId = createHazard(req, now);
      //console.log("newId", newId);

      res.sendStatus(200);
    });
  });

  await app.get("/api/gethazards", (req, res) => {
    app.use(
      "/public/uploaded",
      express.static(__dirname + "/public/uploaded/")
    );

    getHazards(req, res);
  });

  await app.post("/api/updatehazard", (req, res) => {});

  await app.post("/api/deletehazard", (req, res) => {});
};

async function createHazard(req, now) {
  MongoClient.connect(mongodb_url, async function (err, db) {
    if (err) throw err;
    var dbo = db.db(db_name);

    var newHazard = req.body;

    // save up to 5 images
    if (req.files.length > 0)
      newHazard.file1 = now + "-" + req.files[0].originalname;
    if (req.files.length > 1)
      newHazard.file2 = now + "-" + req.files[1].originalname;
    if (req.files.length > 2)
      newHazard.file3 = now + "-" + req.files[2].originalname;
    if (req.files.length > 3)
      newHazard.file4 = now + "-" + req.files[3].originalname;
    if (req.files.length > 4)
      newHazard.file5 = now + "-" + req.files[4].originalname;

    // create the hazard document
    const result = await dbo.collection("hazards").insertOne(newHazard);
    /* console.log(
      `New hazard created with the following id: ${result.insertedId}`
    ); */
    db.close();

    var newId = result.insertedId;
    return newId;
  });
}

async function getHazards(req, res) {
  const url = require("url");
  const queryObject = url.parse(req.url, true).query;
  var hazardId = queryObject.hazardId;

  MongoClient.connect(mongodb_url, async function (err, db) {
    if (err) throw err;
    var dbo = db.db(db_name);

    if (hazardId) {
      const hazard = await dbo
        .collection("hazards")
        .findOne(ObjectId(hazardId));
      if (hazard.anonymousReport != "true") {
        const user = await dbo
          .collection("users")
          .findOne({ email: hazard.userEmail });

        hazard.firstName = user.firstName;
        hazard.lastName = user.lastName;
        hazard.phone = user.phone;
      }

      res.send({ hazards: JSON.stringify(hazard) });
      db.close();
    } else {
      await dbo
        .collection("hazards")
        .find({})
        .toArray(function (err, result) {
          if (err) throw err;
          if (result) {
            //console.log("result", result);
            res.send({ hazards: JSON.stringify(result) });
          } else {
            console.log(`No hazards found.`);
            res.send("no hazards found");
          }
          //console.log(`-------------------`);
          db.close();
        });
    }
  });
}
