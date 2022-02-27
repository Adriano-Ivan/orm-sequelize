const { Router } = require("express");

const turmaController = require("./../controllers/TurmaController");

const router = Router();

router
  .route("/")
  .get(turmaController.pegaTodasAsTurmas)
  .post(turmaController.criaTurma);

router
  .route("/:id")
  .get(turmaController.pegaUmaTurma)
  .put(turmaController.atualizaTurma)
  .delete(turmaController.apagaTurma);

module.exports = router;
