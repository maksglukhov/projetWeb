var express = require("express");
var router = express.Router();
const { v4 } = require("uuid");
const pgClient = require("../db");
const { checkToken, checkAdmin } = require("../check.js");

router.post("/", async (req, res) => {
  let userId = req.body.id;
  if (req.cookies && req.cookies.token && req.cookies.token.tokenId) {
    let tokenId = req.cookies.token.tokenId;
    if (await checkToken(req, res)) {
      let isAdmin = await checkAdmin(tokenId);
      if (isAdmin) {
        try {
          const delToken = await pgClient.query(
            "DELETE FROM token WHERE user_id = $1",
            [userId]
          );
          if (delToken) {
            res.sendStatus(200);
          }
        } catch (error) {
          res.sendStatus(404);
        }
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
