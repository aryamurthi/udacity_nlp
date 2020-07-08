const dotenv = require("dotenv").config();

var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
var bodyParser = require("body-parser");
var cors = require("cors");

var aylien = require("aylien_textapi");

var textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY,
});

var json = {
  title: "test json response",
  message: "this is a message",
  time: "now",
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

console.log(JSON.stringify(mockAPIResponse));

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

app.get("/test", function (req, res) {
  res.json(mockAPIResponse);
});

// designates what port the app will listen to for incoming requests
app.listen(8082, function () {
  console.log("Example app listening on port 8082!");
});

// textapi.classifyByTaxonomy({
//     'url': 'http://techcrunch.com/2015/07/16/microsoft-will-never-give-up-on-mobile',
//     'taxonomy':'iptc-subjectcode'
//   }, function(error, response) {
//     if (error === null) {
//       console.log(response);
//     }
//   });
