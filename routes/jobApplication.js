const applicationController = require("../controllers/applicationController");
const express = require("express");
const _ = require("lodash");
const router = express.Router();
const Application = require("../models/job_applications");

router.get("/api/v1/application", applicationController.getapplication);

router.get("/api/v1/application/:id", applicationController.getapplicationById);

router.post("/api/v1/application", applicationController.addapplication);

router.put("/api/v1/application/:id", applicationController.updateapplication);

router.delete(
  "/api/v1/application/:id",
  applicationController.deleteapplication
);

module.exports = router;
