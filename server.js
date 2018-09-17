// ++++++++++++++++++++++++++++++NPM PACKAGES+++++++++++++++++++++++++++++++++

const bodyParser = require("body-parser");
const express = require("express");
const methodOverride = require("method-override");

var routes = require("./controllers/burgers_controller.js");
var app = express();
var exphbs = require("express-handlebars");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", routes);

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// +++++++++++++++++++++++++++SERVER CONNECTION+++++++++++++++++++++++++++++++++

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('The app is listening on port ' + port);
});

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++