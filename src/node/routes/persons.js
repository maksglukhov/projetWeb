var express = require("express");
var router = express.Router();
const { v4 } = require("uuid");
const pgClient = require("../db");
const { checkToken, checkAdmin } = require("../check.js");

router.get("/", async (req, res) => {
  if (await checkToken(req, res)) {
    let tokenId = req.cookies.token.tokenId;
    let isAdmin = await checkAdmin(tokenId);
    if (isAdmin) {
      try {
        const allPersons = await pgClient.query(
          "SELECT * FROM person WHERE is_admin = false"
        );
        //console.log("hereeeeeeeeeeeeeee", allPersons.rows);
        if (allPersons) {
          res.send(allPersons.rows);
        } else {
          res.sendStatus(401);
        }
      } catch (error) {
        console.log(error.message);
        res.sendStatus(401);
      }
    }
  }
});

router.get("/forselect", async (req, res) => {
  try {
    const getPersons = await pgClient.query(
      "SELECT id as value, username as label FROM person WHERE is_admin = false"
    );
    res.send(getPersons.rows);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(401);
  }
});

module.exports = router;
