// const database = require("./../models");
// const Sequelize = require("sequelize");

const { PessoasServices, MatriculasServices } = require("./../services");
const pessoasServices = new PessoasServices();
const matriculasServices = new MatriculasServices();

class PessoaController {
  static async obterPessoasAtivas(req, res) {
    try {
      const pessoasAtivas = await pessoasServices.obterRegistrosAtivos();
      return res.status(200).json(pessoasAtivas);
    } catch (erro) {
      res.status(500).json(erro.message);
    }
  }

  static async obterTodasAsPessoas(req, res) {
    try {
      const todasAsPessoas = await pessoasServices.obterTodosOsRegistros();
      return res.status(200).json(todasAsPessoas);
    } catch (erro) {
      res.status(500).json(erro.message);
    }
  }
  static async obterUmaPessoa(req, res) {
    const { id } = req.params;
    try {
      const umaPessoa = await pessoasServices.obterUmRegistro(id);
      return res.status(200).json(umaPessoa);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  static async criaPessoa(req, res) {
    const novaPessoa = req.body;
    try {
      console.log(novaPessoa);
      const novaPessoaCriada = await pessoasServices.criarRegistro(novaPessoa);
      return res.status(200).json(novaPessoaCriada);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  static async atualizarPessoa(req, res) {
    const novasInfos = req.body;
    const { id } = req.params;

    try {
      await pessoasServices.atualizarRegistro(novasInfos, id);
      const pessoaAtualizada = await pessoasServices.obterUmRegistro(id);
      return res.status(200).json(pessoaAtualizada);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  static async deletarPessoa(req, res) {
    const { id } = req.params;
    try {
      await pessoasServices.apagarRegistro(id);
      return res
        .status(200)
        .json({ mensagem: `registro de id ${id} deletado.` });
    } catch (erro) {
      res.status(500).json(erro.message);
    }
  }
  static async restaurarPessoa(req, res) {
    const { id } = req.params;
    try {
      await pessoasServices.restaurarPessoa(id);
      res.status(200).json({ mensagem: `registro de id ${id} restaurado.` });
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  static async obterTodasAsMatriculas(req, res) {
    const { estudanteId } = req.params;
    try {
      const pessoa = await pessoasServices.obterUmRegistro(estudanteId);
      const matriculas = await pessoa.getAulasMatriculadas();
      return res.status(200).json(matriculas);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  static async obterUmaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      const umaMatricula = await matriculasServices.obterUmaMatricula(
        matriculaId,
        estudanteId
      );
      return res.status(200).json(umaMatricula);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  static async criaMatricula(req, res) {
    const { estudanteId } = req.params;
    const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) };
    try {
      const novaMatriculaCriada = await matriculasServices.criarRegistro(
        novaMatricula
      );
      return res.status(200).json(novaMatriculaCriada);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }
  static async atualizarMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    const novasInfos = req.body;

    try {
      await matriculasServices.atualizarMatricula(
        matriculaId,
        estudanteId,
        novasInfos
      );

      const MatriculaAtualizada = await matriculasServices.obterUmaMatricula(
        matriculaId,
        estudanteId
      );
      return res.status(200).json(MatriculaAtualizada);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }
  static async deletarMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      await matriculasServices.apagarRegistro(matriculaId);
      return res
        .status(200)
        .json({ mensagem: `registro de id ${matriculaId} deletado.` });
    } catch (erro) {
      res.status(500).json(erro.message);
    }
  }

  static async restaurarMatricula(req, res) {
    const { matriculaId, estudanteId } = req.params;
    try {
      await matriculasServices.restaurarMatricula(matriculaId, estudanteId);
      res.status(200).json({ mensagem: `registro de id ${id} restaurado.` });
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  static async obterMatriculasPorTurma(req, res) {
    const { turmaId } = req.params;
    try {
      const todasAsMatriculas =
        await matriculasServices.obterMatriculasPorTurma(turmaId);

      return res.status(200).json(todasAsMatriculas);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  static async obterTurmasLotadas(req, res) {
    const lotacaoTurma = 2;
    try {
      const turmasLotadas = await matriculasServices.obterTurmasLotadas(
        lotacaoTurma
      );
      return res.status(200).json(turmasLotadas);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  static async cancelarPessoa(req, res) {
    const { estudanteId } = req.params;

    try {
      await pessoasServices.cancelaPessoaEmatriculas(Number(estudanteId));
      res.status(200).json({
        message: `matrículas ref. a estudante ${estudanteId} canceladas`,
      });
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }
}

module.exports = PessoaController;
