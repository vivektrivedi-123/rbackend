//const auth = require("../middleware/auth");
const companyController = require("../controllers/companyController");
const express = require("express");
const {
  compValidation,
  validateSchema,
} = require("../validation/companyValidation");
const router = express.Router();
const Company = require("../models/company");

//get all
router.get("/api/v1/company", companyController.getCompany);
//get by ID
router.get("/api/v1/company/:id", companyController.getCompanyById);
//job
router.post(
  "/api/v1/company",
  //auth,
  compValidation(),
  validateSchema,
  companyController.addCompany
);
//uploadImage
router.post(
  "/api/v1/compUploadImage",
  compValidation(),
  validateSchema,
  companyController.companyUploadImage
);
//update
router.put(
  "/api/v1/company/:id",
  compValidation(),
  validateSchema,
  companyController.updateCompany
);
//delete
router.delete("api/v1/company/:id", companyController.deleteCompany);

module.exports = router;
