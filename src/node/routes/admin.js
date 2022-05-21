var express = require("express");
var router = express.Router();
const { v4 } = require("uuid");
const pgClient = require("../db");
const { checkToken, checkAdmin } = require("../check.js");

router.post("/", async (req, res) => {
  if (await checkAdmin(req, res)) {
    try {
      console.log("******************");
      //let tokenId = req.cookies("token");
      //console.log(tokenId);
      //res.clearCookie('token');
      //console.log(req.cookies.token.tokenId);
      const delToken = await pgClient.query(
        "DELETE FROM token WHERE user_id = $1",
        [req.body.id]
      );
      res.clearCookie("token");
      res.sendStatus(200);
    } catch (error) {
      console.error(error.message);
    }
  }
});

module.exports = router;
