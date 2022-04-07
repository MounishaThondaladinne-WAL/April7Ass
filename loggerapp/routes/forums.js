var express = require("express");
var router = express.Router();
var forumController = require("../controllers/Forums");
router.get("/", forumController.getForums);
router.post("/", forumController.createForum);
router.put("/:_id", forumController.editForum);
router.delete("/:_id", forumController.deleteForum);
module.exports = router;
