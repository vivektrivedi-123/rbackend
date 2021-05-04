const jobController = require("../controllers/jobController");
const isAdmin = require("../middleware/admin");
const auth = require("../middleware/auth");
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
  auth,
  jobValidation(),
  validateSchema,
  jobController.addJob
);

router.put(
  "/api/v1/job/:id",
  auth,
  jobValidation(),
  validateSchema,
  jobController.updateJob
);

router.delete("/api/v1/job/:id", auth, jobController.deleteJob);

module.exports = router;
