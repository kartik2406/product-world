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

module.exports = app;
