var express = require("express");
var router = express.Router();
const { v4 } = require("uuid");
const pgClient = require("../db");

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
});

router.post("/manche", async (req, res) => {
  const eventId = req.body.eventId;
  console.log(eventId);
  const mancheName = req.body.mancheName;
  const mancheOrdre = req.body.mancheOrdre;
  const mancheId = v4();
  try {
    const addMacnhe = await pgClient.query(
      "INSERT INTO manche(id, name, ordre, planning_id) VALUES ($1, $2, $3, $4)",
      [mancheId, mancheName, mancheOrdre, eventId]
    );
    if (addMacnhe) {
      const allManche = await pgClient.query("SELECT * FROM manche");
      if (allManche) {
        res.send(allManche.rows);
      }
    }
  } catch (error) {}
});

module.exports = router;
