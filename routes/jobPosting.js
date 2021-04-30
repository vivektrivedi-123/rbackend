const jobController = require("../controllers/jobController");
const express = require("express");
const {
  jobValidation,
  validateSchema,
} = require("../validation/jobValidation");
const router = express.Router();
const job = require("../models/job");

router.get("/api/v1/job", jobController.getJob);

router.get("/api/v1/job/:id", jobController.getJobById);

router.post(
  "/api/v1/job",
  jobValidation(),
  validateSchema,
  jobController.addJob
);

router.put(
  "/api/v1/job/:id",
  jobValidation(),
  validateSchema,
  jobController.updateJob
);

router.delete("/api/v1/job/:id", jobController.deleteJob);

module.exports = router;
