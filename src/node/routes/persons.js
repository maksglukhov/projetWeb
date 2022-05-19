var express = require("express");
var router = express.Router();
const { v4 } = require("uuid");
const pgClient = require("../db");

router.get("/", async (req, res) => {
  try {
    const allPersons = await pgClient.query("SELECT * FROM person");
    console.log(allPersons.rows);
    res.send(allPersons.rows);
  } catch (error) {
    console.error(error.message);
  }
});

router.delete("/", async (req, res) => {
  try {
    const id = req.body.id;
    //console.log(req.cookies);
    const delToken = await pgClient.query(
      "DELETE FROM token WHERE user_id = $1",
      [id]
    );
    const delPerson = await pgClient.query("DELETE FROM person WHERE id = $1", [
      id,
    ]);
    const allPersons = await pgClient.query("SELECT * FROM person");
    res.send(allPersons.rows);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
