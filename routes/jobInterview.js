const interviewController = require("../controllers/interviewController");
const express = require("express");
const {
  interviewValidation,
  validateSchema,
} = require("../validation/interviewValidation");
const _ = require("lodash");
const router = express.Router();
const auth = require("../middleware/auth");
const Interview = require("../models/interview");

router.get("/api/v1/interview", auth, interviewController.getInterview);

router.get("/api/v1/interview/:id", auth, interviewController.getInterviewById);

router.post(
  "/api/v1/interview",
  auth,
  interviewValidation(),
  validateSchema,
  interviewController.addInterview
);

router.put(
  "/api/v1/interview/:id",
  auth,
  interviewValidation(),
  validateSchema,
  interviewController.updateInterview
);

router.delete(
  "/api/v1/interview/:id",
  auth,
  interviewController.deleteInterview
);

module.exports = router;
