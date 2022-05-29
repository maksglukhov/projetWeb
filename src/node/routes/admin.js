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

router.post("/inscriptuser", async (req, res) => {
  if (req.cookies && req.cookies.token && req.cookies.token.tokenId) {
    let tokenId = req.cookies.token.tokenId;
    if (await checkToken(req, res)) {
      let isAdmin = await checkAdmin(tokenId);
      if (isAdmin) {
        //console.log("entering inscriptuser");
        let eventId = req.body.eventId;
        let mancheId = req.body.mancheId;
        let userId = req.body.userId;
        //console.log("here userID*******", userId);
        try {
          const checkInscription = await pgClient.query(
            "SELECT * FROM inscription WHERE user_id = $1 AND planning_id = $2 AND manche_id = $3",
            [userId, eventId, mancheId]
          );
          if (checkInscription.rows.length === 0) {
            const addInscription = await pgClient.query(
              "INSERT INTO inscription(planning_id, manche_id, user_id) VALUES ($1, $2, $3)",
              [eventId, mancheId, userId]
            );
            if (addInscription) {
              res.sendStatus(200);
            } else {
              res.sendStatus(500);
            }
          } else {
            res.sendStatus(501);
          }
        } catch (error) {
          res.sendStatus(400);
          console.error(error.message);
        }
      }
    } else {
      res.send(401);
    }
  }
});

module.exports = router;
