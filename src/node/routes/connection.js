var express = require("express");
var router = express.Router();
const { v4 } = require("uuid");
const pgClient = require("../db");
var cookieParser = require("cookie-parser");

router.post("/", async (req, res) => {
  //console.log(req.body.event);
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    if (!userExist(firstName, lastName)) {
      const newPerson = await pgClient.query(
        "INSERT INTO person (id, first_name, last_name, password) VALUES($1, $2, $3, $4)",
        [v4(), firstName, lastName, password]
      );
    } else {
      res.json("-1");
    }

    //const allPersons = await pgClient.query("SELECT * FROM user");
    //res.send(allPersons.rows);
  } catch (error) {
    console.error(error.message);
  }
});

async function userExist(firstName, lastName) {
  try {
    console.log(firstName, lastName);
    const allPersons = await pgClient.query("SELECT * FROM person");
    let person = allPersons.rows.find(
      (element) =>
        element.first_name === firstName && element.last_name === lastName
    );
    console.log("***************");
    console.log(person);
    return person;
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = router;
