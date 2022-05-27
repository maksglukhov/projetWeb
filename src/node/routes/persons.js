var express = require("express");
var router = express.Router();
const { v4 } = require("uuid");
const pgClient = require("../db");
const { checkToken, checkAdmin } = require("../check.js");

/*router.get("/", async (req, res) => {
  if (req.cookies && req.cookies.token && req.cookies.token.tokenId) {
    let tokenId = req.cookies.token.tokenId;
    if (await checkToken(req, res)) {
      let isAdmin = await checkAdmin(tokenId);
      if (isAdmin) {
        try {
          const allPersons = await pgClient.query(
            "SELECT * FROM person WHERE is_admin = false"
          );
          console.log("hereeeeeeeeeeeeeee", allPersons.rows);
          if (allPersons) {
            res.send(allPersons.rows);
          } else {
            res.sendStatus(400);
          }
        } catch (error) {
          console.log(error.message);
          res.sendStatus(400);
        }
      }
    }
  }
});*/

router.get("/", async (req, res) => {
  try {
    const allPersons = await pgClient.query(
      "SELECT * FROM person WHERE is_admin = false"
    );
    console.log("hereeeeeeeeeeeeeee", allPersons.rows);
    if (allPersons) {
      res.send(allPersons.rows);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.log(error.message);
    res.sendStatus(400);
  }
});

module.exports = router;
/*
const allPersons = await pgClient.query("SELECT * FROM person");
      console.log(allPersons.rows);
      res.send(allPersons.rows);*/
