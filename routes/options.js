const optionsController = require("../controllers/optionsController");
const express = require("express");
const {
  optionsValidation,
  validateSchema,
} = require("../validation/optionsValidation");
const router = express.Router();
const auth = require("../middleware/auth");
const Options = require("../models/options");

router.get("/api/v1/option", optionsController.getOptions);

router.get("/api/v1/option/:id", optionsController.getOptionsById);

router.post(
  "/api/v1/option",
  auth,
  optionsValidation(),
  validateSchema,
  optionsController.addOptions
);

router.put(
  "/api/v1/option/:id",
  auth,
  optionsValidation(),
  validateSchema,
  optionsController.updateOptions
);

router.delete("/api/v1/option/:id", auth, optionsController.deleteOptions);
module.exports = router;
