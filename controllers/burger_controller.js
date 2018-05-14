var express = require("express");

var router = express.Router();

// Import burgers.js model
var burger = require("../models/burgers.js");

// Routes
router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res) {
  burger.insertOne([
    "burger_name", "mcCheeze"
  ], [
    req.body.name, req.body.mcCheeze
  ], function(result) {
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.updateOne({
    mcCheeze: req.body.mcCheeze
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no change ID must not exist = 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.get("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  burger.selectAll(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows selected, something is wrong = 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes
module.exports = router;