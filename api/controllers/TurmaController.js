const { TurmasServices } = require("./../services");
const turmasServices = new TurmasServices();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class TurmaController {
  static async pegaTodasAsTurmas(req, res) {
    const { data_inicial, data_final } = req.query;
    const where = {};
    data_inicial || data_final ? (where.data_inicio = {}) : null;

    data_inicial ? (where.data_inicio[Op.gte] = data_inicial) : null;

    data_final ? (where.data_inicio[Op.lte] = data_final) : null;

    try {
      const todasAsTurmas = await turmasServices.obterTodosOsRegistros(where);
      return res.status(200).json(todasAsTurmas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  //   {
  //       where:{
  //           data_inicio:{
  //               [Op.gte]:data,
  //               [Op.lte]:data
  //           }
  //       }
  //   }

  static async pegaUmaTurma(req, res) {
    const { id } = req.params;
    try {
      const umaTurma = await turmasServices.obterUmRegistro(id);
      return res.status(200).json(umaTurma);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async criaTurma(req, res) {
    const novaTurma = req.body;
    try {
      const novaTurmaCriada = await turmasServices.criarRegistro(novaTurma);
      return res.status(200).json(novaTurmaCriada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async atualizaTurma(req, res) {
    const { id } = req.params;
    const novasInfos = req.body;
    try {
      await turmasServices.atualizarRegistro(novasInfos, id);
      const turmaAtualizada = await turmasServices.obterUmRegistro(id);
      return res.status(200).json(turmaAtualizada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async apagaTurma(req, res) {
    const { id } = req.params;
    try {
      await turmasServices.apagarRegistro(id);
      return res.status(200).json({ mensagem: `id ${id} deletado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async restaurarTurma(req, res) {
    const { id } = req.params;
    try {
      await turmasServices.restaurarRegistro(id);
      res.status(200).json({ mensagem: `registro de id ${id} restaurado.` });
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }
}

module.exports = TurmaController;
