var express = require("express");
var router = express.Router();
const { v4 } = require("uuid");
const pgClient = require("../db");

router.get("/", async (req, res) => {
  if (req.cookies && req.cookies.token && req.cookies.token.tokenId) {
    let tokenId = req.cookies.token.tokenId;
    try {
      const isAdmin = await pgClient.query(
        "SELECT isAdmin FROM person, token WHERE person.id = token.user_id AND token.token = $1",
        [tokenId]
      );
      if (isAdmin.rows[0]) {
        res.sendStatus(200);
      } else {
        res.sendStatus(401);
      }
    } catch (error) {
      res.sendStatus(401);
      console.error(error.message);
    }
  }
});

module.exports = router;
