if (process.env.NODE_ENV === "dev") {
  require("dotenv").config();
}
require("./db");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./api/routes");

app.use(bodyParser.json());

app.use("/api", routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("public"));
  app.get("*", (req, res) => {
    res.sendFile(process.cwd() + "/public/index.html");
  });
}

module.exports = app;
