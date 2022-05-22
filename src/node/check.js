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
  //console.log(currentTime);
  let tokenTime = token.rows[0].expired_date;
  //console.log(token.rows[0].expired_date);
  if (currentTime < tokenTime) {
    return true;
  } else return false;
}

module.exports = { checkToken, checkAdmin };
