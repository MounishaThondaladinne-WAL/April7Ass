var express = require("express");
var router = express.Router();
router.get("/:name/:age/:city", (req, res) => {
  const detailsCookie = {
    name: req.params.name,
    age: req.params.age,
    city: req.params.city,
  };
  const cnvrtJson = JSON.stringify(detailsCookie);
  res.cookie("detailsCookie", cnvrtJson);
  res.send(cnvrtJson);
});
router.get("/view", function (req, res) {
  res.send(req.cookies);
});
module.exports = router;
