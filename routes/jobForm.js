const formController = require("../controllers/formController");
const express = require("express");
const _ = require("lodash");
const router = express.Router();
const Form = require("../models/job_form");

router.get("/api/v1/form", formController.getForm);

//router.get("/api/v1/form/:id", formController.getFormById);

router.post("/api/v1/form", formController.addForm);

router.put("/api/v1/form/:id", formController.updateForm);

router.delete("/api/v1/form/:id", formController.deleteForm);

module.exports = router;
