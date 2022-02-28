const Services = require("./Services");
const database = require("./../models");
class TurmasServices extends Services {
  constructor() {
    super("Turmas");
  }
  async obterTodosOsRegistros(where) {
    const registros = await database.Turmas.findAll({ where });
    return registros;
  }
}

module.exports = TurmasServices;
