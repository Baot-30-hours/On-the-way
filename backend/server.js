var nconf = require("nconf");
nconf.argv().env();
nconf.file({ file: "./config.json" });

const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use('/login', (req, res) => {
    res.send({
      token: 'test123'
    });
  });
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./user")(app);
require("./hazard")(app);

const port = process.env.PORT || nconf.get("port");
app.listen(port, () => console.log(`Listening on port ${port}`));
