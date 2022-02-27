const { Router } = require("express");

const PessoaController = require("./../controllers/PessoaController");

const router = Router();

router
  .route("/")
  .get(PessoaController.obterTodasAsPessoas)
  .post(PessoaController.criaPessoa);

router
  .route("/:id")
  .get(PessoaController.obterUmaPessoa)
  .put(PessoaController.atualizarPessoa)
  .delete(PessoaController.deletarPessoa);

router
  .route("/:estudanteId/matriculas")
  .post(PessoaController.criaMatricula)
  .get(PessoaController.obterTodasAsMatriculas);

router
  .route("/:estudanteId/matriculas/:matriculaId")
  .put(PessoaController.atualizarMatricula)
  .get(PessoaController.obterUmaMatricula)
  .delete(PessoaController.deletarMatricula);

module.exports = router;
