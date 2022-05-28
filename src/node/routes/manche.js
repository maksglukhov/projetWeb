var express = require("express");
var router = express.Router();
const { v4 } = require("uuid");
const pgClient = require("../db");
const { checkToken, checkAdmin, getUserId } = require("../check.js");

router.post("/addmanche", async (req, res) => {
  if (await checkToken(req, res)) {
    let tokenId = req.cookies.token.tokenId;
    let isAdmin = await checkAdmin(tokenId);
    if (isAdmin) {
      const eventId = req.body.eventId;
      //console.log(eventId);
      const mancheName = req.body.mancheName;
      const mancheOrdre = req.body.mancheOrdre;
      const mancheId = v4();
      try {
        const addMacnhe = await pgClient.query(
          "INSERT INTO manche(id, name, ordre, planning_id) VALUES ($1, $2, $3, $4)",
          [mancheId, mancheName, mancheOrdre, eventId]
        );
        if (addMacnhe) {
          const allManche = await pgClient.query(
            "SELECT * FROM manche where planning_id = $1",
            [eventId]
          );
          if (allManche) {
            res.send(allManche.rows);
          }
        }
      } catch (error) {
        console.error(error.message);
        res.send(error.message);
      }
    }
  }
});

router.get("/:id", async (req, res) => {
  let eventId = req.params.id;
  //console.log("hereeeeeeeeee", eventId);
  try {
    const allManche = await pgClient.query(
      "SELECT * FROM manche where planning_id = $1",
      [eventId]
    );
    if (allManche) {
      res.send(allManche.rows);
    }
  } catch (error) {
    console.error(error.message);
  }
});

router.post("/inscription", async (req, res) => {
  if (await checkToken(req, res)) {
    let tokenId = req.cookies.token.tokenId;
    let eventId = req.body.eventId;
    let mancheId = req.body.mancheId;
    let userId = await getUserId(tokenId);
    try {
      const addInscription = await pgClient.query(
        "INSERT INTO inscription(planning_id, manche_id, user_id) VALUES ($1, $2, $3)",
        [eventId, mancheId, userId]
      );
      if (addInscription) {
        res.sendStatus(200);
      } else {
        res.sendStatus(500);
      }
    } catch (error) {
      res.sendStatus(501);
      console.error(error.message);
    }
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
