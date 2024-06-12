// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:data?", (req, res) => {
  data = req.params.data;

  const validUnixDate = (str) => {
    const parsedInt = parseInt(str, 10);
    return !isNaN(parsedInt) && parsedInt.toString().length >= 10;
  };

  if(!data) {
    let date = new Date();
    const unixDate = Math.floor(date.getTime()/1000);
    res.json({unix: unixDate, utc: date.toUTCString()});
  }
  else if (validUnixDate(data)) {
    const date = new Date(parseInt(data, 10));
    const UTCDate = date.toUTCString();
    const parsedInt = parseInt(data, 10);
    res.json({ unix: parsedInt, utc: UTCDate });
  } else {
    const date = new Date(data);
    if (date.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: date.valueOf(), utc: date.toUTCString() });
    }
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
