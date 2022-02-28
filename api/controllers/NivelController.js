// const database = require("./../models")

const { NiveisServices } = require("./../services");
const niveisServices = new NiveisServices();

class NivelController {
  static async pegaTodosOsNiveis(req, res) {
    try {
      const todosOsNiveis = await niveisServices.obterTodosOsRegistros();
      return res.status(200).json(todosOsNiveis);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async pegaUmNivel(req, res) {
    const { id } = req.params;
    try {
      const umNivel = await niveisServices.obterUmRegistro(id);
      return res.status(200).json(umNivel);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async criaNivel(req, res) {
    const novoNivel = req.body;
    try {
      const novoNivelCriado = await niveisServices.criarRegistro(novoNivel);
      return res.status(200).json(novoNivelCriado);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async atualizaNivel(req, res) {
    const { id } = req.params;
    const novasInfos = req.body;
    try {
      await niveisServices.atualizarRegistro(novasInfos, id);
      const nivelAtualizado = await niveisServices.obterUmRegistro(id);
      return res.status(200).json(nivelAtualizado);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async apagaNivel(req, res) {
    const { id } = req.params;
    try {
      await niveisServices.apagarRegistro(id);
      return res.status(200).json({ mensagem: `id ${id} deletado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async restaurarNivel(req, res) {
    const { id } = req.params;
    try {
      await niveisServices.restaurarRegistro(id);
      res.status(200).json({ mensagem: `registro de id ${id} restaurado.` });
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }
}

module.exports = NivelController;
