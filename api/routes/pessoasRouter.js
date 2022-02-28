const { Router } = require("express");

const PessoaController = require("./../controllers/PessoaController");

const router = Router();

router.get("/todas", PessoaController.obterTodasAsPessoas);

router
  .route("/")
  .get(PessoaController.obterPessoasAtivas)
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

router.route("/:id/restaurar").post(PessoaController.restaurarPessoa);

router
  .route("/matriculas/:turmaId/confirmadas")
  .get(PessoaController.obterMatriculasPorTurma);

router.route("/matriculas/lotadas").get(PessoaController.obterTurmasLotadas);

router
  .route("/:estudanteId/matriculas/:matriculaId/restaurar")
  .post(PessoaController.restaurarMatricula);

module.exports = router;
