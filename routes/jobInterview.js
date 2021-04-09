const interviewController = require("../controllers/interviewController");
const express = require("express");
const _ = require("lodash");
const router = express.Router();
const Interview = require("../models/job_app_interview");

router.get("/api/v1/interview", interviewController.getInterview);

router.get("/api/v1/interview/:id", interviewController.getInterviewById);

router.post("/api/v1/interview", interviewController.addInterview);

router.put("/api/v1/interview/:id", interviewController.updateInterview);

router.delete("/api/v1/interview/:id", interviewController.deleteInterview);

module.exports = router;
