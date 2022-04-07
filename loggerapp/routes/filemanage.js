var express = require("express");
var router = express.Router();
var fs = require("fs");
var path = require("path");
const { writeFile, readFile } = require("fs");
router.get("/createfile/:filename/:content", (req, res) => {
  const fileName = path.join(__dirname, "../files", req.params.filename);
  const Content = req.params.content;
  if (fs.existsSync(fileName)) {
    res.send(" File already exists");
  } else {
    writeFile(fileName, Content, (err) => {
      if (err) {
        res.json(err);
      } else {
        res.send("File Created Successfully");
      }
    });
  }
});
router.get("/createfolder/:foldername", (req, res) => {
  const filePath = path.join(__dirname, "../files", `${req.params.foldername}`);
  if (fs.existsSync(filePath)) {
    res.send(" Folder already exists");
  } else {
    fs.mkdir(filePath, (err) => {
      if (err) {
        res.json(err);
      }
      res.send("Directory Created Successfully");
    });
  }
});
router.get("/readdirectory", function (req, res) {
  const filepath = path.join(__dirname, "../files");
  fs.readdir(filepath, (err, files) => {
    if (err) res.json(err);
    console.log(files);
    res.send(files);
  });
});
router.get("/readfile/:filename", function (req, res) {
  const filePath = path.join(__dirname, "../files", req.params.filename);
  console.log(filePath);
  readFile(filePath, (err, content) => {
    if (err) {
      res.json(err);
    } else {
      res.send(content);
    }
  });
});
router.get("/modify/:filename/:filecontent", function (req, res) {
  const filePath = path.join(__dirname, "../files", req.params.filename);
  writeFile(filePath, req.params.filecontent, (err) => {
    if (err) {
      throw err;
    } else {
      res.send("File is Modified Successfully");
    }
  });
});
router.get("/deletefile/:filename", function (req, res) {
  const filePath = path.join(__dirname, "../files", req.params.filename);
  fs.unlink(filePath, (err) => {
    if (err) res.json(err);
    res.send(`file with name ${req.params.filename} deleted`);
  });
});
module.exports = router;
