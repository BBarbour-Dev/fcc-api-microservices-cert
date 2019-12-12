const express = require("express");
const app = express();

// Dependencies

const multer = require("multer");
const upload = multer({
  dest: "uploads/"
});

// Middleware

const cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 }));
app.use(express.urlencoded());
app.use(express.static("public"));

// Request Handler Functions
const timestamp = require("./handlers/timestamp");
const headerparser = require("./handlers/headerparser");
const newshorturl = require("./handlers/newshorturl");
const getshorturl = require("./handlers/getshorturl");
const exercise = require("./routes/exercise");
const filemetadata = require("./handlers/filemetadata");

// Routes

app.get("/", function(_req, res) {
  res.sendFile(__dirname + "/views/index.html");
});
app.get("/api/timestamp", (req, res) => timestamp(req, res));
app.get("/api/timestamp/:date_string", (req, res) => timestamp(req, res));
app.get("/api/whoami", (req, res) => headerparser(req, res));
app.post("/api/shorturl/new", (req, res) => newshorturl(req, res));
app.get("/api/shorturl/:id", (req, res) => getshorturl(req, res));
app.post("/api/filemetadata", upload.single("upfile"), (req, res) =>
  filemetadata(req, res)
);
app.use("/api/exercise", exercise);

// Listener

const listener = app.listen(process.env.PORT || 5000, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
