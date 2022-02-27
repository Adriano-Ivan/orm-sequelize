const pessoas = require("./pessoasRouter");
const niveis = require("./niveisRouter");
const turmas = require("./turmasRouter");

module.exports = (app) => {
  app.use("/pessoas", pessoas);
  app.use("/turmas", turmas);
  app.use("/niveis", niveis);
};
