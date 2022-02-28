const database = require("./../models");

class Services {
  constructor(nomeDoModelo) {
    this.nomeDoModelo = nomeDoModelo;
  }

  async obterTodosOsRegistros() {
    return database[this.nomeDoModelo].findAll();
  }

  async obterUmRegistro(id) {
    const registro = await database[this.nomeDoModelo].findOne({
      where: { id: parseInt(id) },
    });
    return registro;
  }

  async criarRegistro(dados) {
    const registro = await database[this.nomeDoModelo].create(dados);
    return registro;
  }

  async atualizarRegistro(dadosAtualizados, id, transacao = {}) {
    return database[this.nomeDoModelo].update(
      dadosAtualizados,
      {
        where: {
          id: id,
        },
      },
      transacao
    );
  }

  async atualizarRegistros(dadosAtualizados, where, transacao = {}) {
    return database[this.nomeDoModelo].update(
      dadosAtualizados,
      {
        where: {
          ...where,
        },
      },
      transacao
    );
  }

  async apagarRegistro(id) {
    await database[this.nomeDoModelo].destroy({ where: { id: id } });
  }

  async restaurarRegistro(id) {
    await database[this.nomeDoModelo].restore({
      where: { id: Number(id) },
    });
  }
}

module.exports = Services;
