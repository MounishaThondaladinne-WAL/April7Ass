var express = require("express");
var router = express.Router();
const custommiddleware = require("../middlewares/custommiddleware");
router.get("/setcookie/:name/:value", [
  custommiddleware,
  function (req, res) {
    res.cookie(req.params.name, req.params.value);
    res.send(
      `cookie with name ${req.params.name} and value ${req.params.value}`
    );
  },
]);
/*router.get("/setcookie/:name/:value", function (req, res) {
  res.cookie(req.params.name, req.params.value);
  res.send(`cookie with name ${req.params.name} and value ${req.params.value}`);
});*/
router.get("/setcookiewithtime/:name/:value/:time", function (req, res) {
  res.cookie(req.params.name, req.params.value, {
    maxAge: req.params.time * 60 * 1000,
  });
  res.send(`cookie with name ${req.params.name} and value ${req.params.value}`);
});
router.get("/viewcookies", function (req, res) {
  res.send(req.cookies);
});
router.get("/delete/:name", function (req, res) {
  res.clearCookie(req.params.name);
  res.send(`cookie with name ${req.params.name} is deleted`);
});
/*router.get("/cookies", function (req, res) {
  const cookieObj = {
    name: "Joe",
    age: 21,
    city: "Hyderabad",
    hobby: "Coding",
  };
  const cnvrtJson = JSON.stringify(cookieObj);
  res.cookie("cookie", cnvrtJson);
  res.send(cnvrtJson);
});*/
/*var express = require("express");
var router = express.Router();

router.post("/cookies", function (req, res) {
  let cookieobj = req.body;
  let cookiekeys = Object.keys(cookieobj);
  let cookievalues = Object.values(cookieobj);
  for (let i = 0; i <= cookiekeys.length; i++) {
    res.cookie(cookiekeys[i], cookievalues[i]);
  }
  res.send("Multiple Cookies set successfully");
});

module.exports = router;*/
module.exports = router;
