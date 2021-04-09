const fieldController = require("../controllers/fieldController");
const express = require("express");
const _ = require("lodash");
const router = express.Router();
const Field = require("../models/field");

router.get("/api/v1/field", fieldController.getField);

//router.get("/api/v1/field/:id", fieldController.getFieldById);

router.post("/api/v1/field", fieldController.addField);

router.put("/api/v1/field/:id", fieldController.updateField);

router.delete("/api/v1/field/:id", fieldController.deleteField);

module.exports = router;
