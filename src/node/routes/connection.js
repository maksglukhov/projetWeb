var express = require("express");
const { get } = require("express/lib/response");
var router = express.Router();
const { v4 } = require("uuid");
const pgClient = require("../db");
const { checkAdmin, checkToken } = require("../check");

router.post("/createuser", async (req, res) => {
  try {
    if (await checkToken(req, res)) {
      res.send(409);
    }
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    const username = req.body.username;
    let id = v4();
    const newPerson = await pgClient.query(
      "INSERT INTO person (id, first_name, last_name, password, username) VALUES($1, $2, $3, $4, $5)",
      [id, firstName, lastName, password, username]
    );
    let token = await createToken(id);
    //console.log("token in then", token);
    res.cookie("token", token.tokenId);
    res.sendStatus(200);
    //console.log("token", token);
    //res.cookie("token", token);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(400);
    //console.error(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    if (await checkToken(req, res)) {
      res.send(409);
    }
    const username = req.body.username;
    const password = req.body.password;
    let id = v4();
    const newPerson = await pgClient.query(
      "SELECT * FROM person WHERE username = $1 and password = $2",
      [username, password]
    );

    if (newPerson.rows.length === 1) {
      //console.log("user id", newPerson.rows[0].id);
      console.log("connection: user exists");
      let token = await createToken(newPerson.rows[0].id);
      console.log("connection line: cookie", token);
      res.cookie("token", token);
      let isAdmin = await checkAdmin(token.tokenId);
      if (isAdmin) {
        console.log("**********************", isAdmin);
        res.sendStatus(202);
      } else {
        console.log("**********************", isAdmin);
        res.sendStatus(200);
      }
    } else res.sendStatus(403);
  } catch (error) {
    console.error(error.message);
  }
});

router.get("/logout", async (req, res) => {
  try {
    //let tokenId = req.cookies("token");
    //console.log(tokenId);
    //res.clearCookie('token');
    //console.log(req.cookies.token.tokenId);
    const delToken = await pgClient.query(
      "DELETE FROM token WHERE token = $1",
      [req.cookies.token.tokenId]
    );
    res.clearCookie("token");
    res.sendStatus(200);
  } catch (error) {
    console.error(error.message);
  }
});

async function createToken(userId) {
  try {
    let tokenId = v4();
    var time = Date.now() / 1000;
    //console.log(time);
    let lifetimeToken = time + 1200;
    //console.log(lifetimeToken, tokenId, userId);

    const getToken = await pgClient.query(
      "INSERT INTO token(token, user_id, expired_date) VALUES ($1, $2, $3)",
      [tokenId, userId, lifetimeToken]
    );
    let token = { tokenId: tokenId };
    //console.log("71", token);
    return token;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = router;
