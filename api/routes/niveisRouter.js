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

module.exports = router;
