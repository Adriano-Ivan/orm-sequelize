const { Router } = require("express");

const nivelController = require("./../controllers/NivelController");

const router = Router();

router
  .route("/")
  .get(nivelController.pegaTodosOsNiveis)
  .post(nivelController.criaNivel);

router
  .route("/:id")
  .get(nivelController.pegaUmNivel)
  .put(nivelController.atualizaNivel)
  .delete(nivelController.apagaNivel);

router.route("/:id/restaurar").post(nivelController.restaurarNivel);

module.exports = router;
