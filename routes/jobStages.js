const stagesController = require("../controllers/stagesController");
const express = require("express");
const _ = require("lodash");
const router = express.Router();
const Stage = require("../models/job_stages");

router.get("/api/v1/stage", stagesController.getStage);

router.get("/api/v1/stage/:id", stagesController.getStageById);

router.post("/api/v1/stage", stagesController.addStage);

router.put("/api/v1/stage/:id", stagesController.updateStage);

router.delete("/api/v1/stage/:id", stagesController.deleteStage);

module.exports = router;
