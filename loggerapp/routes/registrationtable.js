var express = require("express");
var router = express.Router();
const connector = require("../poolconnect");
const jwt = require("jsonwebtoken");
router.get("/createtable", (req, res) => {
  const sql =
    "CREATE TABLE registrationtable( id  INT  PRIMARY KEY AUTO_INCREMENT,username varchar(30),password varchar(100))";
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
router.get("/", (req, res) => {
  const sql = "SELECT * FROM registrationtable";
  connector.query(sql, function (err, results, fields) {
    if (err) {
      res.json(err);
    } else {
      res.json({ results });
    }
  });
});
router.post("/", (req, res) => {
  const { id, username, password } = req.body;
  const checksql = `SELECT * FROM registrationtable WHERE username ="${username}"`;
  connector.query(checksql, function (err, results, fields) {
    if (err) {
      res.json(err);
    } else {
      if (results.length > 0) {
        res.json({
          status: 0,
          msg: "Username already exists",
        });
      } else {
        const sql = "INSERT INTO registrationtable VALUES(?,?,?)";
        connector.query(
          sql,
          [id, username, password],
          function (err, results, fields) {
            if (err) {
              res.json(err);
            } else {
              res.json({ status: 1, msg: "Registered Successfully" });
            }
          }
        );
      }
    }
  });
});
router.post("/login", (req, res) => {
  const { id, username, password } = req.body;
  const checksql = `SELECT * FROM registrationtable WHERE username ="${username}" and password="${password}"`;
  connector.query(checksql, [username, password], (err, results) => {
    if (err) {
      res.json(err);
    } else {
      if (results.length === 0) {
        res.json({ status: 0, data: "incorrect login details" });
      } else {
        const payLoad = {
          user: {
            username: username,
            password: password,
          },
        };
        jwt.sign(
          payLoad,
          "secret_string",
          {
            expiresIn: 1200,
          },
          (err, token) => {
            if (err) {
              throw (
                (error,
                res.json({
                  status: 0,
                  debug_data: "Temorary error in backend",
                }))
              );
            }
            res.status(200).json({
              token,
            });
          }
        );
      }
    }
  });
});
module.exports = router;
