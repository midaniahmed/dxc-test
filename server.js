const express = require("express");
const favicon = require("serve-favicon");
const app = express();
const port = process.env.PORT || 3000;

app.use(favicon(__dirname + "/public/favicon.png"));

app.get("/bundle.js", function(req, res) {
  res.sendFile(__dirname + "/public/bundle.js");
});

app.use(express.static("public"));

app.get("/*", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
