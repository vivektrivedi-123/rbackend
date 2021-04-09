const emailController = require("../controllers/emailController");
const express = require("express");
const _ = require("lodash");
const router = express.Router();
const Email = require("../models/job_app_email");

router.get("/api/v1/email", emailController.getEmail);

//router.get("/api/v1/email/:id", emailController.getEmailById);

router.post("/api/v1/email", emailController.addEmail);

router.put("/api/v1/email/:id", emailController.updateEmail);

router.delete("/api/v1/email/:id", emailController.deleteEmail);
module.exports = router;
