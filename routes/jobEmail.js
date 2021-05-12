const emailController = require("../controllers/emailController");
const express = require("express");
const {
  emailValidation,
  validateSchema,
} = require("../validation/emailValidation");
const router = express.Router();
const auth = require("../middleware/auth");
const Email = require("../models/email");

router.get("/api/v1/email", auth, emailController.getEmail);

router.get("/api/v1/email/:id", auth, emailController.getEmailById);

router.post(
  "/api/v1/email",
  emailValidation(),
  auth,
  validateSchema,
  emailController.addEmail
);

router.put("/api/v1/email/:id", auth, emailController.updateEmail);

router.delete("/api/v1/email/:id", auth, emailController.deleteEmail);
module.exports = router;
