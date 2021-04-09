const companyController = require("../controllers/companyController");
const express = require("express");
const _ = require("lodash");
const router = express.Router();
//const { body, validationResult } = require("express-validator");
const Company = require("../models/company");

//get all
router.get("/api/v1/company", companyController.getCompany);
//get by ID
router.get("/api/v1/company/:id", companyController.getCompanyById);
//post
router.post("/api/v1/company", companyController.addCompany);
//update
router.put("/api/v1/company/:id", companyController.updateCompany);
//delete
router.delete("api/v1/company/:id", companyController.deleteCompany);

module.exports = router;
