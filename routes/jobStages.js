const stagesController = require("../controllers/stagesController");
const express = require("express");
const {
  stageValidation,
  validateSchema,
} = require("../validation/stageValidation");
const router = express.Router();
const auth = require("../middleware/auth");
const Stage = require("../models/stage");

router.get("/api/v1/stage", stagesController.getStage);

router.get("/api/v1/stage/:id", stagesController.getStageById);

router.post(
  "/api/v1/stage",
  auth,
  stageValidation(),
  validateSchema,
  stagesController.addStage
);

router.put(
  "/api/v1/stage/:id",
  auth,
  stageValidation(),
  validateSchema,
  stagesController.updateStage
);

router.delete("/api/v1/stage/:id", auth, stagesController.deleteStage);

module.exports = router;
