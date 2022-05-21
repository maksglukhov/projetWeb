const pgClient = require("./db");

async function checkAdmin(tokenId) {
  try {
    const isAdmin = await pgClient.query(
      "SELECT is_admin FROM person, token WHERE person.id = token.user_id AND token.token = $1",
      [tokenId]
    );
    if (!isAdmin.rows) {
      return false;
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

async function checkToken(req, res) {
  if (req.cookies && req.cookies.token && req.cookies.token.tokenId) {
    let tokenId = req.cookies.token.tokenId;
    if (await existsToken(tokenId, res)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

async function existsToken(tokenId, res) {
  try {
    let token = await pgClient.query("SELECT * FROM token WHERE token = $1", [
      tokenId,
    ]);
    if (token) {
      if (checkTime(token)) {
        return true;
      } else {
        try {
          const deleteToken = await pgClient.query(
            "DELETE FROM token WHERE token =$1",
            [tokenId]
          );
          res.clearCookie("token");
          return false;
        } catch (error) {
          console.log(error.message);
        }
      }
    } else {
      return false;
    }
  } catch (error) {
    console.log(error.message);
    return false;
  }
}

function checkTime(token) {
  let currentTime = Date.now() / 1000;
  let tokenTime = token.rows[0].expired_date + 1200;
  if (currentTime < tokenTime) {
    return true;
  } else return false;
}

module.exports = { checkToken, checkAdmin };

/*
async function checkToken(req, res) {
  if (req.cookies && req.cookies.token && req.cookies.token.tokenId) {
    let tokenId = req.cookies.token.tokenId;
    console.log("token", tokenId);
    try {
      const checkToken = await pgClient.query(
        "SELECT * FROM token WHERE token = $1",
        [tokenId]
      );
      //console.log(checkToken.rows);
      let currentTime = Date.now() / 1000;
      let tokenTime = checkToken.rows[0].expired_date + 1200;
      //console.log("token from db", tokenTime);
      if (currentTime >= tokenTime) {
        console.log("time---------------");
        const deleteToken = await pgClient.query(
          "DELETE FROM token WHERE token =$1",
          [tokenId]
        );
        res.clearCookie("token");
        return true;
      } else {
        //console.log("here is true $$$$$$$$$$$$$$");
        return false;
      }
    } catch (error) {
      console.error(error.message);
    }
  } else return true;
}
*/
