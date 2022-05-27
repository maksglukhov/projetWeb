var express = require("express");
var router = express.Router();
const { v4 } = require("uuid");
const pgClient = require("../db");
const { checkToken, checkAdmin, updateUserStatus } = require("../check.js");

router.delete("/logoutuser/:id", async (req, res) => {
  let userId = req.params.id;
  //console.log("userId", userId);
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
            let updateUser = await updateUserStatus(userId, false);
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
