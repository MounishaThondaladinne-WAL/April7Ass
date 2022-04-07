var express = require("express");
var router = express.Router();
/*const bookController = require("../controllers/books");
router.get("/", bookController.getBooks);
router.post("/", bookController.createBook);
router.get("/bookandauthor", bookController.getBooksWithAuthor);
router.get("/bookwithcondition/:name", bookController.getBookWithCondition);*/
router.get("/islogged", function (req, res) {
  /*res.send(req.session.isLoggedIn);*/
  let { city, hobby, username } = req.session;
  console.log(req.session);
  res.send(`username =${username} and city = ${city} and hobby=${hobby}`);
});

module.exports = router;
