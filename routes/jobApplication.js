const applicationController = require("../controllers/applicationController");
const express = require("express");
const _ = require("lodash");
const router = express.Router();
const Application = require("../models/job_application");

router.get("/api/v1/application", applicationController.getApplication);

//router.get("/api/v1/application/:id", applicationController.getApplicationById);

router.post("/api/v1/application", applicationController.addApplication);

router.put("/api/v1/application/:id", applicationController.updateApplication);

router.delete(
  "/api/v1/application/:id",
  applicationController.deleteApplication
);

module.exports = router;
