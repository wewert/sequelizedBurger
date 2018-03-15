var express = require('express');
var burger = require('../models/burger.js');
var router = express.Router();

router.get("/", function(req, res) {
  burger.selectAll(function(data) {
    var hbsObject = {
      burgers: data
    };
    // console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res) {
  var createdBurger = false;
  burger.insertOne([
    "burger_name", "devoured", "date_entered"
  ], [
    req.body.burger_name, req.body.devoured, req.body.date_entered
  ], function (results) {
    // console.log("You created a burger yah");
    // res.redirect("/");
    res.json({id: result.insertId});
  });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  // console.log("condition", condition);
console.log(req.body.devoured);
  burger.updateOne({
    devoured: req.body.devoured
  }, condition, function(result) {
    // console.log(result, "hey yo");
    if(result.changeRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
    // res.redirect("/");
  });
});

module.exports = router;
