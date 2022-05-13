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

router.post("/", async (req, res) => {
  //console.log(req.body.event);
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const newPerson = await pgClient.query(
      "INSERT INTO person (id, first_name, last_name) VALUES($1, $2, $3)",
      [v4(), firstName, lastName]
    );
    //const allPersons = await pgClient.query("SELECT * FROM user");
    //res.send(allPersons.rows);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
