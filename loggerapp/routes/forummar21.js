var express = require("express");
var router = express.Router();
let forums = [
  { title: "Forum1", doc: 12 - 3 - 4890, body: "Bghsmxxx", author: "Mounish" },
];
router.get("/", (req, res) => {
  res.json(forums);
});
router.post("/", (req, res) => {
  let { title, doc, body, author } = req.body;
  forums.push({ title, doc, body, author });
  res.json({ status: "Forum added" });
});
router.delete("/:indexToDelete", function (req, res) {
  console.log(req.params.indexToDelete);
  let newForums = forums.filter((val, index) => {
    if (index === parseInt(req.params.indexToDelete)) {
      return false;
    } else {
      return true;
    }
  });
  forums = newForums;
  res.json({ status: "Forum Deleted Sucessfully" });
});
router.get("/clearall", function (req, res) {
  forums = [];
  res.json({ status: "All Forums are Deleted" });
});
module.exports = router;
