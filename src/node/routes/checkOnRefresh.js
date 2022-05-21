var express = require("express");
const { get } = require("express/lib/response");
var router = express.Router();
const { v4 } = require("uuid");
const pgClient = require("../db");
const { checkAdmin, checkToken } = require("../check");

router.get("/", async (req, res) => {
  if (req.cookies && req.cookies.token && req.cookies.token.tokenId) {
    let tokenId = req.cookies.token.tokenId;
    if (await checkToken(req, res)) {
      let isAdmin = await checkAdmin(tokenId);
      if (isAdmin) {
        //console.log("admin", isAdmin);
        res.sendStatus(202);
      } else {
        //console.log("no admin", isAdmin);
        res.sendStatus(200);
      }
    } else {
      console.log("here**********************");
      res.sendStatus(400);
    }
  }
});

module.exports = router;
