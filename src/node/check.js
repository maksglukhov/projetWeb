const req = require("express/lib/request");
const pgClient = require("./db");

async function checkToken(req, res) {
  if (req.cookies && req.cookies.token && req.cookies.token.tokenId) {
    let tokenId = req.cookies.token.tokenId;
    try {
      const checkToken = await pgClient.query(
        "SELECT FROM token WHERE token = $1",
        [tokenId]
      );
      let currentTime = Date.now() / 1000;
      let tokenTime = checkToken.rows[0].token;
      if (currentTime >= tokenTime) {
        const deleteToken = await pgClient.query(
          "DELETE FROM token WHERE tonek =$1",
          [tokenId]
        );
        res.clearCookie("token");
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error(error.message);
    }
  } else return false;
}

async function checkAdmin(tokenId) {
  try {
    const isAdmin = await pgClient.query(
      "SELECT is_admin FROM person, token WHERE person.id = token.user_id AND token.token = $1",
      [token.tokenId]
    );
    if (!isAdmin.rows) {
      res.send(400);
    }
    if (isAdmin.rows[0].is_admin) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = { checkToken, checkAdmin };
