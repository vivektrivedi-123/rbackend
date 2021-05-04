const fieldController = require("../controllers/fieldController");
const express = require("express");
const {
  fieldValidation,
  validateSchema,
} = require("../validation/fieldValidation");
const auth = require("../middleware/auth");
const router = express.Router();
const Field = require("../models/field");

router.get("/api/v1/field", fieldController.getField);

router.get("/api/v1/field/:id", fieldController.getFieldById);

router.post(
  "/api/v1/field",
  auth,
  fieldValidation(),
  validateSchema,
  fieldController.addField
);

router.put("/api/v1/field/:id", auth, fieldController.updateField);

router.delete("/api/v1/field/:id", auth, fieldController.deleteField);

module.exports = router;
