const jwt = require("jsonwebtoken");
const companyController = require("../controllers/companyController");
const express = require("express");
const {
  compValidation,
  validateSchema,
} = require("../validation/companyValidation");
const router = express.Router();
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/admin");
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

/**
 * @swagger
 * tags:
 *   name: Company
 * /api/v1/company:
 *  get:
 *      tags: [Company]
 *      summary: Get all companies
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: Bad Request
 */
//get all
router.get("/api/v1/company", auth, companyController.getCompany);
/**
 * @swagger
 * tags:
 *   name: Company
 * /api/v1/company/{id}:
 *  get:
 *   tags: [Company]
 *   summary: Get company by ID
 *   description: Get company data by ID
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the company
 *      example: id
 *   responses:
 *    200:
 *     description: success
 *    404:
 *     description: Id not found
 */
//get by ID
router.get("/api/v1/company/:id", auth, companyController.getCompanyById);
/**
 * @swagger
 * tags:
 *  name: Company
 * /api/v1/company:
 *  post:
 *      tags: [Company]
 *      summary: Add company
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          company_name:
 *                            type: string
 *                            description: The company name
 *                            example: Rudra Innovative Software
 *                          industry:
 *                            type: string
 *                            description: The Industry type
 *                            example: IT
 *                          company_language:
 *                            type: string
 *                            description: The Language of the company
 *                            example: English
 *                          date_format:
 *                            type: string
 *                            description: The Date format
 *                            example: dd/mm/yy
 *                          employee_portal_name:
 *                            type: string
 *                            description: The Employee Portal name
 *                            example: Apurva
 *                          company_logo:
 *                            type: string
 *                            description: The company logo
 *                            example: logo.jpeg
 *                          change_favicon:
 *                            type: string
 *                            description: The company favicon
 *                            example: favicon.jpeg   
 *      responses:
 *          200:
 *             description: A successful response
 *          default:
 *              description: This is the default response for it
 */
//post
router.post(
  "/api/v1/company",
  auth,
  upload,
  compValidation(),
  validateSchema,
  companyController.addCompany
);
/**
 * @swagger
 * tags:
 *  name: Company
 * /api/v1/company/{id}:
 *  put:
 *   tags : [Company]
 *   summary: update company
 *   description: update company
 *   consumes:
 *    - application/json
 *   produces:
 *    - application/json
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: id of the company
 *      example: 2
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *             id:
 *              type: string
 *              description: The auto-generated id of the company
 *             company_name:
 *              type: string
 *              description: The company name
 *              example: Rudra Innovative Software
 *             industry:
 *              type: string
 *              description: The Industry type
 *              example: IT
 *             company_language:
 *              type: string
 *              description: The Language of the company
 *              example: English
 *             date_format:
 *              type: string
 *              description: The Date format
 *              example: dd/mm/yy
 *             employee_portal_name:
 *              type: string
 *              description: The Employee Portal name
 *              example: Apurva
 *             company_logo:
 *              type: string
 *              description: The company logo
 *              example: logo.jpeg
 *             change_favicon:
 *              type: string
 *              description: The company favicon
 *              example: favicon.jpeg 
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *             id:
 *              type: string
 *              description: The auto-generated id of the company
 *             company_name:
 *              type: string
 *              description: The company name
 *              example: Rudra Innovative Software
 *             industry:
 *              type: string
 *              description: The Industry type
 *              example: IT
 *             company_language:
 *              type: string
 *              description: The Language of the company
 *              example: English
 *             date_format:
 *              type: string
 *              description: The Date format
 *              example: dd/mm/yy
 *             employee_portal_name:
 *              type: string
 *              description: The Employee Portal name
 *              example: Apurva
 *             company_logo:
 *              type: string
 *              description: The company logo
 *              example: logo.jpeg
 *             change_favicon:
 *              type: string
 *              description: The company favicon
 *              example: favicon.jpeg 
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *             id:
 *              type: string
 *              description: The auto-generated id of the company
 *             company_name:
 *              type: string
 *              description: The company name
 *              example: Rudra Innovative Software
 *             industry:
 *              type: string
 *              description: The Industry type
 *              example: IT
 *             company_language:
 *              type: string
 *              description: The Language of the company
 *              example: English
 *             date_format:
 *              type: string
 *              description: The Date format
 *              example: dd/mm/yy
 *             employee_portal_name:
 *              type: string
 *              description: The Employee Portal name
 *              example: Apurva
 *             company_logo:
 *              type: string
 *              description: The company logo
 *              example: logo.jpeg
 *             change_favicon:
 *              type: string
 *              description: The company favicon
 *              example: favicon.jpeg 
 */
//update
router.put(
  "/api/v1/company/:id",
  auth,
  compValidation(),
  validateSchema,
  companyController.updateCompany
);
/**
 * @swagger
 * tags:
 *  name: Company
 * /api/v1/company/{id}:
 *  delete:
 *   tags: [Company]
 *   summary: delete company
 *   description: delete company
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the company
 *      example: 2
 *   responses:
 *    200:
 *     description: success
 *    404:
 *     description: Id not found
 */
//delete
router.delete("/api/v1/company/:id", auth, companyController.deleteCompany);

module.exports = router;
