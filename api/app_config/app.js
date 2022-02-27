const express = require("express");
const app = express();

app.use(express.json());

app.get("/teste", (req, res) => {
  res.status(200).send({ mensagem: "Hello API!" });
});
module.exports = app;
