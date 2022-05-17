var express = require("express");
var router = express.Router();
const { v4 } = require("uuid");
const pgClient = require("../db");

router.delete("/", async (req, res) => {
  try {
    const id = req.body.id;
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
