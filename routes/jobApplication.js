const applicationController = require("../controllers/applicationController");
const express = require("express");
const {
  appValidation,
  validateSchema,
} = require("../validation/appValidation");
const router = express.Router();
const auth = require("../middleware/auth");
const Application = require("../models/application");

router.get("/api/v1/application", applicationController.getApplication);

router.get("/api/v1/application/:id", applicationController.getApplicationById);

router.post(
  "/api/v1/application",
  auth,
  appValidation(),
  validateSchema,
  applicationController.addApplication
);

router.put(
  "/api/v1/application/:id",
  auth,
  appValidation(),
  validateSchema,
  applicationController.updateApplication
);

router.delete(
  "/api/v1/application/:id",
  auth,
  applicationController.deleteApplication
);

module.exports = router;
