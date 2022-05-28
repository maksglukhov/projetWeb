var express = require("express");
var router = express.Router();
const { v4 } = require("uuid");
const pgClient = require("../db");
const { checkToken, checkAdmin, getUserId } = require("../check.js");

router.post("/", async (req, res) => {
  //console.log(req.body.event);
  try {
    const event = req.body.event;
    const date = req.body.date;

    const newEvent = await pgClient.query(
      "INSERT INTO planning (id, name, date ) VALUES($1, $2, $3)",
      [v4(), event, date]
    );
    const allEvents = await pgClient.query("SELECT * FROM planning");
    res.send(allEvents.rows);
  } catch (error) {
    console.error(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const allEvents = await pgClient.query("SELECT * FROM planning");
    //console.log(allEvents.rows);
    res.send(allEvents.rows);
  } catch (error) {
    console.error(error.message);
  }
});

router.delete("/", async (req, res) => {
  if (await checkToken(req, res)) {
    let tokenId = req.cookies.token.tokenId;
    let isAdmin = await checkAdmin(tokenId);
    if (isAdmin) {
      try {
        const id = req.body.id;
        const delEvent = await pgClient.query(
          "DELETE FROM planning WHERE id = $1",
          [id]
        );
        const allEvents = await pgClient.query("SELECT * FROM planning");
        res.send(allEvents.rows);
      } catch (error) {
        console.error(error.message);
      }
    }
  }
});

router.get("/inscriptions", async (req, res) => {
  if (await checkToken(req, res)) {
    let tokenId = req.cookies.token.tokenId;
    let userId = await getUserId(tokenId);
    try {
      const allInscriptions = await pgClient.query(
        "SELECT planning.name AS eventName, manche.name as mancheName, manche.ordre, planning.date FROM planning, manche, inscription WHERE planning.id = inscription.planning_id AND manche.planning_id = inscription.planning_id AND manche.id = inscription.manche_id AND user_id = $1",
        [userId]
      );
      //console.log(allInscriptions.rows);
      if (allInscriptions) {
        res.send(allInscriptions.rows);
      }
    } catch (error) {
      console.error(error.message);
    }
  } else {
    res.sendStatus(401);
  }
});

router.get("/inscriptionstest", async (req, res) => {
  console.log("we are here");
  let userId = req.query.id;
  try {
    const allInscriptions = await pgClient.query(
      "SELECT planning.name, manche.name, manche.ordre, planning.date FROM planning, manche, inscription WHERE planning.id = inscription.planning_id AND manche.planning_id = inscription.planning_id AND manche.id = inscription.manche_id AND user_id = $1",
      [userId]
    );
    console.log(allInscriptions.rows);
    if (allInscriptions) {
      res.send(allInscriptions.rows);
    }
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
