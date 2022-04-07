var express = require("express");
var router = express.Router();
router.get("/setsession/:name/:value", (req, res) => {
  req.session[req.params.name] = req.params.value;
  res.send(
    `Session with name as ${req.params.name} and value as ${req.params.value} is set`
  );
});
router.get("/delete/:name", (req, res) => {
  delete req.session[req.params.name];
  res.send(`Session with name = ${req.params.name} is deleted`);
});
router.get("/destroy", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.send("Error while deleting");
    } else {
      res.send("Session destroyed");
    }
  });
});
/* router.get("/:username/:city", (req, res) => {
  req.session["username"] = req.params.username;
  req.session["city"] = req.params.city;
  res.send(
    `Session with name as ${req.params.username} and value as ${req.params.city} is set`
  );
}); */
module.exports = router;
