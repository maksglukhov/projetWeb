const express = require("express");
const res = require("express/lib/response");
const app = express();
const port = 3000;
const fs = require("fs");
const persons = require("./routes/persons");
const events = require("./routes/events");
const connection = require("./routes/connection");
const admin = require("./routes/admin");
const checkOnRefresh = require("./routes/checkOnRefresh");
const manche = require("./routes/manche");
var cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

app.use("/api/persons", persons);
app.use("/api/events", events);
app.use("/api/manche", manche);
app.use("/api/connection", connection);
app.use("/api/admin", admin);
app.use("/api/check", checkOnRefresh);
//app.use("/api/admin", admin);

app.get("/*", (req, res) => {
  let filePath = "./src/node/index.html";
  fs.readFile(filePath, function (error, data) {
    if (error) {
      res.statusCode = 404;
      res.end("Resourse not found!");
    } else {
      res.end(data);
    }
  });
});

app.listen(port, () => {
  console.log("Server has started on port", port);
});
