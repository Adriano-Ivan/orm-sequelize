const Services = require("./Services");
const database = require("./../models");

class MatriculasServices extends Services {
  constructor() {
    super("Matriculas");
  }
  async obterUmaMatricula(matriculaId, estudanteId) {
    const registro = await database[this.nomeDoModelo].findOne({
      where: {
        id: parseInt(matriculaId),
        estudante_id: Number(estudanteId),
      },
    });
    return registro;
  }

  async atualizarMatricula(matriculaId, estudanteId, novasInfos) {
    await database[this.nomeDoModelo].findOne({
      where: {
        id: parseInt(matriculaId),
        estudante_id: Number(estudanteId),
      },
    });
  }

  async restaurarMatricula(matriculaId, estudanteId) {
    await database[this.nomeDoModelo].restore({
      where: { id: Number(matriculaId), estudante_id: Number(estudanteId) },
    });
  }

  async obterMatriculasPorTurma(turmaId) {
    const matriculas = await database[this.nomeDoModelo].findAndCountAll({
      where: {
        turma_id: Number(turmaId),
        status: "confirmado",
      },
      limit: 20,
      order: [["estudante_id", "DESC"]],
    });
    return matriculas;
  }

  async obterTurmasLotadas(lotacaoTurma) {
    const turmas = await database[this.nomeDoModelo].findAndCountAll({
      where: {
        status: "confirmado",
      },
      attributes: ["turma_id"],
      group: ["turma_id"],
      having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`),
    });
    return turmas;
  }
}

module.exports = MatriculasServices;
