const interviewController = require("../controllers/interviewController");
const express = require("express");
const {
  interviewValidation,
  validateSchema,
} = require("../validation/interviewValidation");
const _ = require("lodash");
const router = express.Router();
const Interview = require("../models/interview");

router.get("/api/v1/interview", interviewController.getInterview);

router.get("/api/v1/interview/:id", interviewController.getInterviewById);

router.post(
  "/api/v1/interview",
  interviewValidation(),
  validateSchema,
  interviewController.addInterview
);

router.put(
  "/api/v1/interview/:id",
  interviewValidation(),
  validateSchema,
  interviewController.updateInterview
);

router.delete("/api/v1/interview/:id", interviewController.deleteInterview);

module.exports = router;
