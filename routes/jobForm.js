const formController = require("../controllers/formController");
const express = require("express");
const {
  formValidation,
  validateSchema,
} = require("../validation/formValidation");
const router = express.Router();
const auth = require("../middleware/auth");
const Form = require("../models/forms");

router.get("/api/v1/form", formController.getForm);

router.get("/api/v1/form/:id", formController.getFormById);

router.post(
  "/api/v1/form",
  auth,
  formValidation(),
  validateSchema,
  formController.addForm
);

router.put(
  "/api/v1/form/:id",
  auth,
  formValidation(),
  validateSchema,
  formController.updateForm
);

router.delete("/api/v1/form/:id", auth, formController.deleteForm);

module.exports = router;
