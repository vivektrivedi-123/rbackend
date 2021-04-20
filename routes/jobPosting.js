const jobController = require("../controllers/jobController");
const express = require("express");
const {
  jobValidation,
  validateSchema,
} = require("../validation/jobValidation");
const router = express.Router();
const job = require("../models/job");

router.get("/api/v1/job", jobController.getjob);

router.get("/api/v1/job/:id", jobController.getjobById);

router.post(
  "/api/v1/job",
  jobValidation(),
  validateSchema,
  jobController.addjob
);

router.put(
  "/api/v1/job/:id",
  jobValidation(),
  validateSchema,
  jobController.updatejob
);

router.delete("/api/v1/job/:id", jobController.deletejob);

module.exports = router;
