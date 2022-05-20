const pg = require("pg");
const dotenv = require("dotenv");

dotenv.config();
console.log("connecting to", process.env.POSTGRESQL_ADDON_URI);

const pgClient = new pg.Client(process.env.POSTGRESQL_ADDON_URI);
if (pgClient.connect()) {
  console.log("db connected");
}

module.exports = pgClient;
