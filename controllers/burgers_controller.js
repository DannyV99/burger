var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// IF GIVEN NOTHING BUT LOCAL HOST AND PORT NUMBER WILL REDIRECT TO /BURGERS
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

router.get("/", function (req, res) {
  res.redirect("/burgers");
});


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// USING GET METHOD TO READ, SELECT ALL FROM BURGERS TABE  AND RETURNING THE DATA AS AN OBJECT
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

router.get("/burgers", function (req, res) {
  burger.selectAll(function (data) {
    var hbsObject = {
      burgers: data
    };
    res.render("index", hbsObject);
  });
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// POST METHOD USING THE INSERT FUNCTION TO INSERT NEW BURGER AND GIVE DEFAULT FALSE FOR DEVOURED
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

router.post("/api/burgers", function (req, res) {
  console.log('this here runs maybe?')


  burger.insertOne([
    "burger_name", "devoured"
  ], [
      req.body.burger_name, false
    ], function () {
      res.redirect("/burgers");
    });
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// POST METHOD UPDATING WHETHER OR NOT DEVOURED OR NOT, THEN REDIRECTING BACK TO /BURGERS OR IN THIS CASE, THE SAME PAGE
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

router.post("/api/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;
  console.log("burger created??");
  burger.updateOne({
    devoured: req.body.devoured
  }, condition, function (data) {
    res.redirect("/burgers");
  });
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = router;