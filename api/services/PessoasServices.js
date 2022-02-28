const Services = require("./Services");
const database = require("./../models");

class PessoasServices extends Services {
  constructor() {
    super("Pessoas");
    this.matriculas = new Services("Matriculas");
  }

  async obterRegistrosAtivos(where = {}) {
    const registros = await database[this.nomeDoModelo].findAll({
      where: { ...where },
    });
    return registros;
  }

  async obterTodosOsRegistros(where = {}) {
    const registros = await database[this.nomeDoModelo]
      .scope("todos")
      .findAll({ where: { ...where } });
    return registros;
  }

  async cancelaPessoaEmatriculas(estudanteId) {
    return database.sequelize.transaction(async (transacao) => {
      await super.atualizarRegistro({ ativo: false }, estudanteId, {
        transaction: transacao,
      });
      await this.matriculas.atualizarRegistros(
        { status: "cancelado" },
        { estudante_id: estudanteId },
        { transaction: transacao }
      );
    });
  }

  async restaurarPessoa(id) {
    await database[this.nomeDoModelo].restore({ where: { id: Number(id) } });
  }
}

module.exports = PessoasServices;
