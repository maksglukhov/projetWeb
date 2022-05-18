var express = require("express");
var router = express.Router();
const { v4 } = require("uuid");
const pgClient = require("../db");

router.post("/createuser", async (req, res) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    let id = v4();
    const newPerson = await pgClient.query(
      "INSERT INTO person (id, first_name, last_name, password) VALUES($1, $2, $3, $4)",
      [id, firstName, lastName, password]
    );
    let token = createToken(id);
    res.cookie("token", token);
    res.send("0");
  } catch (error) {
    res.send("-1");
    console.error(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    let id = v4();
    const newPerson = await pgClient.query(
      "SELECT * FROM person WHERE first_name = $1 AND last_name = $2 AND password = $3",
      [firstName, lastName, password]
    );
    if (newPerson) {
      let token = createToken(id);
      res.cookie("token", token);
      res.send("0");
    } else res.send("wrong");
  } catch (error) {
    res.send("-1");
    console.error(error.message);
  }
});

async function userExist(firstName, lastName) {
  try {
    //console.log(firstName, lastName);
    /*const allPersons = await pgClient.query("SELECT * FROM person");
    console.log(allPersons.rows);
    let person = allPersons.rows.find(
      (element) =>
        element.first_name === firstName && element.last_name === lastName
    );
    console.log("***************");
    console.log(person);
    return person;*/

    const findPerson = await pgClient.query(
      "SELECT * FROM person WHERE first_name = $1 AND last_name = $2",
      [firstName, lastName]
    );
    console.log(findPerson.rows.length);
    if (findPerson.rows.length === 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error.message);
  }
}

async function createToken(userId) {
  try {
    let tokenId = v4();
    var time = Date.now() / 1000;
    console.log(time);
    let lifetimeToken = time + 1200;
    console.log(lifetimeToken);
    const getToken = await pgClient.query(
      "INSERT INTO token(token, user_id, expired_date) VALUES ($1, $2, $3)",
      [tokenId, userId, lifetimeToken]
    );
    let token = { tokeId: tokenId };
    console.log(tokenId);
    return token;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = router;
