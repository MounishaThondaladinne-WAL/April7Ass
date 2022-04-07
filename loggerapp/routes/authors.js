var express = require("express");
var router = express.Router();
const authorController = require("../controllers/authors");
router.get("/", authorController.getAuthors);
router.post("/", authorController.createAuthor);
router.delete("/:_id", authorController.deleteAuthor);
module.exports = router;
