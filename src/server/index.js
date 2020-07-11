const dotenv = require("dotenv").config();

var path = require("path");
const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

var aylien = require("aylien_textapi");

var textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY,
});

var projectData = {
};


const app = express();
app.use(cors());
// to use json
app.use(bodyParser.json());
// to use url encoded values
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("dist"));

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

app.post("/addUserEntry", addUserEntry);
function addUserEntry(req, res) {
  newEntry = {
   url: req.body.url,
  };

  textapi.sentiment({
    'url': newEntry.url
  }, function(error, response) {
    if (error === null) {
      projectData.text=response.text
      projectData.polarity=response.polarity
      projectData.status="Completed"
      res.send(projectData)
    }else{
      projectData={}
      projectData.status="Failed to Load"
      res.send(projectData)
    }
  });
}
//return projectData
app.get("/projectData", getProjectData);
function getProjectData(req, res) {
  res.send(projectData);
}

// designates what port the app will listen to for incoming requests
app.listen(8082, function () {
  console.log("Example app listening on port 8082!");
});


