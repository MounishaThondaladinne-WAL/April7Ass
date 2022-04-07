var express = require("express");
var router = express.Router();
const tweetController = require("../controllers/tweets");
router.get("/", tweetController.getTweets);
router.post("/", tweetController.createTweet);
router.delete("/:indexToDelete", tweetController.deleteTweet);
router.put("/deleteall", tweetController.deleteAll);
module.exports = router;
