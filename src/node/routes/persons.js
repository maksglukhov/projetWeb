var express = require("express");
var router = express.Router();
const { v4 } = require("uuid");
const pgClient = require("../db");
const { checkToken, checkAdmin } = require("../check.js");

router.get("/", async (req, res) => {
  if (await checkToken(req, res)) {
    if (await checkAdmin(req, res)) {
      try {
        const allPersons = await pgClient.query("SELECT * FROM person");
        console.log(allPersons.rows);
        res.send(allPersons.rows);
      } catch (error) {
        console.log(error.message);
        res.sendStatus(404);
      }
    }
  }
});

module.exports = router;
/*
const allPersons = await pgClient.query("SELECT * FROM person");
      console.log(allPersons.rows);
      res.send(allPersons.rows);*/
