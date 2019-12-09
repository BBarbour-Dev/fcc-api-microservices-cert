const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", function(_req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// Request Handler Functions
const timestamp = require("./handlers/timestamp");
const headerparser = require("./handlers/headerparser");

app.get("/api/timestamp", (req, res) => timestamp(req, res));
app.get("/api/timestamp/:date_string", (req, res) => timestamp(req, res));
app.get("/api/whoami", (req, res) => headerparser(req, res));

const listener = app.listen(process.env.PORT || 5000, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
