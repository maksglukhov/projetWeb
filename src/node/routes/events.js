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
    console.log(allEvents.rows);
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

module.exports = router;
