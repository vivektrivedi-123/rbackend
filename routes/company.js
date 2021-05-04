const jwt = require("jsonwebtoken");
const companyController = require("../controllers/companyController");
const express = require("express");
const {
  compValidation,
  validateSchema,
} = require("../validation/companyValidation");
const router = express.Router();
const auth = require("../middleware/auth");
const Company = require("../models/company");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
}).single("company_logo");

//get all
router.get("/api/v1/company",companyController.getCompany);
//get by ID
router.get("/api/v1/company/:id", companyController.getCompanyById);
//job
router.post(
  "/api/v1/company",
  auth,
  upload,
  compValidation(),
  validateSchema,
  companyController.addCompany
);
//update
router.put(
  "/api/v1/company/:id",
  auth,
  compValidation(),
  validateSchema,
  companyController.updateCompany
);
//delete
router.delete("/api/v1/company/:id", auth, companyController.deleteCompany);

module.exports = router;
