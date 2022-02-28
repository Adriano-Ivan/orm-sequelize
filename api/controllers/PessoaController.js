const database = require("./../models");

class PessoaController {
  static async obterPessoasAtivas(req, res) {
    try {
      const pessoasAtivas = await database.Pessoas.findAll();
      return res.status(200).json(pessoasAtivas);
    } catch (erro) {
      res.status(500).json(erro.message);
    }
  }

  static async obterTodasAsPessoas(req, res) {
    try {
      const todasAsPessoas = await database.Pessoas.scope("todos").findAll();
      return res.status(200).json(todasAsPessoas);
    } catch (erro) {
      res.status(500).json(erro.message);
    }
  }
  static async obterUmaPessoa(req, res) {
    const { id } = req.params;
    try {
      const umaPessoa = await database.Pessoas.findOne({
        where: {
          id: parseInt(id),
        },
      });
      return res.status(200).json(umaPessoa);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  static async criaPessoa(req, res) {
    const novaPessoa = req.body;
    try {
      console.log(novaPessoa);
      const novaPessoaCriada = await database.Pessoas.create(novaPessoa);
      return res.status(200).json(novaPessoaCriada);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  static async atualizarPessoa(req, res) {
    const novasInfos = req.body;
    const { id } = req.params;

    try {
      await database.Pessoas.update(novasInfos, {
        where: {
          id: parseInt(id),
        },
      });
      const pessoaAtualizada = await database.Pessoas.findOne({
        where: {
          id: parseInt(id),
        },
      });
      return res.status(200).json(pessoaAtualizada);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  static async deletarPessoa(req, res) {
    const { id } = req.params;
    try {
      await database.Pessoas.destroy({
        where: {
          id: parseInt(id),
        },
      });
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
      await database.Pessoas.restore({ where: { id: Number(id) } });
      res.status(200).json({ mensagem: `registro de id ${id} restaurado.` });
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  static async obterTodasAsMatriculas(req, res) {
    const { estudanteId } = req.params;
    try {
      const pessoa = await database.Pessoas.findOne({
        where: {
          id: Number(estudanteId),
        },
      });
      const matriculas = await pessoa.getAulasMatriculadas();
      return res.status(200).json(matriculas);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  static async obterUmaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      const umaMatricula = await database.Matriculas.findOne({
        where: {
          id: parseInt(matriculaId),
          estudante_id: Number(estudanteId),
        },
      });
      return res.status(200).json(umaMatricula);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }

  static async criaMatricula(req, res) {
    const { estudanteId } = req.params;
    const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) };
    try {
      const novaMatriculaCriada = await database.Matriculas.create(
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
      await database.Matriculas.update(novasInfos, {
        where: {
          id: parseInt(matriculaId),
          estudante_id: Number(estudanteId),
        },
      });
      const MatriculaAtualizada = await database.Matriculas.findOne({
        where: {
          id: parseInt(matriculaId),
        },
      });
      return res.status(200).json(MatriculaAtualizada);
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }
  static async deletarMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      await database.Matriculas.destroy({
        where: {
          id: parseInt(matriculaId),
        },
      });
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
      await database.Matriculas.restore({
        where: { id: Number(matriculaId), estudante_id: Number(estudanteId) },
      });
      res.status(200).json({ mensagem: `registro de id ${id} restaurado.` });
    } catch (erro) {
      return res.status(500).json(erro.message);
    }
  }
}

module.exports = PessoaController;
