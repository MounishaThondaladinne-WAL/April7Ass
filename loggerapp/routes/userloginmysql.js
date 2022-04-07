var express = require("express");
var router = express.Router();
const connector = require("../poolconnect");
router.get("/createtable", (req, res) => {
  const sql =
    "CREATE TABLE usersinfotable( id  INT  PRIMARY KEY AUTO_INCREMENT,username varchar(25),password varchar(100),date_of_creation date )";
  connector.query(sql, function (err, results, fields) {
    res.json({ err, results, fields });
  });
});
router.get("/", (req, res) => {
  const sql = "SELECT * FROM usersinfotable";
  connector.query(sql, function (err, results, fields) {
    if (err) {
      res.json(err);
    } else {
      res.json({ results });
    }
  });
});
router.post("/", (req, res) => {
  const { id, username, password, date_of_creation } = req.body;
  const checksql = `SELECT * FROM usersinfotable WHERE username ="${username}"`;
  connector.query(checksql, function (err, results, fields) {
    if (err) {
      res.json(err);
    } else {
      if (results.length > 0) {
        res.json({
          status: 0,
          data: "Username already exists",
        });
      } else {
        const sql = "INSERT INTO usersinfotable VALUES(?,?,?,?)";
        connector.query(
          sql,
          [id, username, password, date_of_creation],
          function (err, results, fields) {
            if (err) {
              res.json(err);
            } else {
              res.json({ results });
            }
          }
        );
      }
    }
  });
});
router.put("/:id", (req, res) => {
  const { username, password, date_of_creation } = req.body;
  const sql = `UPDATE usersinfotable SET username=?, password=?, date_of_creation=? WHERE id=${req.params.id}`;
  connector.query(
    sql,
    [username, password, date_of_creation],
    (err, results, fields) => {
      if (err) {
        res.json(err);
      } else {
        res.json(results);
      }
    }
  );
});
router.delete("/:id", (req, res) => {
  const sql = `DELETE FROM usersinfotable WHERE id=${req.params.id}`;
  connector.query(sql, (err, results, fields) => {
    if (err) {
      res.json(err);
    } else {
      res.json(results);
    }
  });
});
router.get("/checklogin/:username/:password", (req, res) => {
  const { username, password } = req.params;
  const sql = `SELECT * FROM usersinfotable WHERE username=? and password=?`;
  connector.query(sql, [username, password], (err, results) => {
    if (err) {
      res.json(err);
    } else {
      if (results.length === 0) {
        req.session["isLoggedIn"] = 0;
        res.json({ status: 0, data: "incorrect login details" });
      } else {
        req.session["username"] = req.params.username;
        req.session["isLoggedIn"] = 1;
        res.json({ status: 1, data: req.params.username });
      }
    }
  });
});
router.get("/loggeduser", (req, res) => {
  if (req.session.isLoggedIn === 1) {
    const sql = `SELECT * FROM usersinfotable WHERE username=?`;
    connector.query(sql, [req.session.username], (err, results) => {
      if (err) {
        res.json(err);
      } else {
        res.json({ status: 1, data: results });
      }
    });
  } else {
    res.json({ status: 0, debug_data: "you are not logged in" });
  }
});
module.exports = router;
