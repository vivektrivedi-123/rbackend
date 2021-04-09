const optionsController = require("../controllers/optionsController");
const express = require("express");
const _ = require("lodash");
const router = express.Router();
const Options = require("../models/options");

router.get("/api/v1/option", optionsController.getOptions);

//router.get("/api/v1/option/:id", optionsController.getOptionsById);

router.post("/api/v1/option", optionsController.addOptions);

router.put("/api/v1/option/:id", optionsController.updateOptions);

router.delete("/api/v1/option/:id", optionsController.deleteOptions);
module.exports = router;
