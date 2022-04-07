const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  res.send({ response: "Welcome to live app" });
});
module.exports = router;
