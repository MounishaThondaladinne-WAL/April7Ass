var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
const { writeFile, readFile } = require("fs");
router.get("/createfile", function (req, res) {
  writeFile(
    "fs-file.txt",
    "Writing first contents to the file using fs",
    (err) => {
      if (err) {
        throw err;
      } else {
        res.send("file created/modified");
      }
    }
  );
});
router.get("/readfile/:filename", function (req, res) {
  const filePath = path.join(__dirname, "../", req.params.filename);
  console.log(filePath);
  readFile(filePath, (err, content) => {
    if (err) {
      res.json(err);
    } else {
      res.send(content);
    }
  });
});
router.get("/readdirectory", function (req, res) {
  fs.readdir(__dirname, (err, files) => {
    if (err) res.json(err);
    console.log(files);
    res.send(files);
  });
});
router.get("/addcontent/:filename", function (req, res) {
  const filePath = path.join(__dirname, "../", req.params.filename);
  fs.appendFile(filePath, "\n Mounisha \n Thondaladinne", (err) => {
    if (err) res.json(err);
    res.send(`file with name ${req.params.filename} modified`);
  });
});
router.get("/deletefile/:filename", function (req, res) {
  const filePath = path.join(__dirname, "../", req.params.filename);
  fs.unlink(filePath, (err) => {
    if (err) res.json(err);
    res.send(`file with name ${req.params.filename} deleted`);
  });
});
module.exports = router;
