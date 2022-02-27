const express = require("express");
const app = express();
const routes = require("./../routes");

app.use(express.json());

routes(app);

module.exports = app;
