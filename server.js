// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.json())
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/timestamp/:date_string?", function (req, res) {
  
  let regex = (/^\d+/g)
  let date_string = req.params.date_string;
  let dateFormat = {
    year: 'numeric',
    month: 'long',
    day : 'numeric'
  };
  
  if(isNaN(date_string)) {
    let natural = new Date(date_string);
    natural = natural.toUTCString("en-us", dateFormat);
    let unix = new Date(date_string).getTime()/1000;
    res.json({"unix": unix, "utc": natural})

    
  } else if (date_string.match(regex)) {
    let unix = date_string;
    let natural = new Date(date_string * 1000);
    natural = natural.toUTCString("en-us", dateFormat);
    res.json({"unix": unix, "utc": natural})

  } else {
    res.json({"unix": null, "utc": "Invalid Date"})
    
  }
  

});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
