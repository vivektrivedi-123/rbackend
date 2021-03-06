const jwt = require("jsonwebtoken");
const companyController = require("../controllers/companyController");
const express = require("express");
const {
  compValidation,
  validateSchema,
} = require("../validation/companyValidation");
const path = require("path");
const router = express.Router();
const auth = require("../middleware/auth");
const isValid = require("../middleware/validID")
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
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/PNG" ||
      file.mimetype == "image/JPG" ||
      file.mimetype == "image/JPEG"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
}).fields([{ name: "company_logo" }, { name: "favicon" }]);

/**
 * @swagger
 * components:
 *  schemas:
 *   Company:
 *    type: object
 *    required:
 *     - company_name
 *     - industry
 *     - company_language
 *     - date_format
 *     - employee_portal_name
 *     - employee_portal_url
 *     - company_logo
 *     - favicon
 *    properties:
 *                          id:
 *                            type: string
 *                            description: Auto-Generated ID of Company
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
 *                          employee_portal_url:
 *                            type: string
 *                            description: The employee portal URL
 *                          company_logo:
 *                            type: string
 *                            description: The company logo
 *                            example: logo.jpeg
 *                          favicon:
 *                            type: string
 *                            description: The company favicon
 *                            example: favicon.jpeg
 */
/**
 * @swagger
 * tags:
 *   name: Company
 * /api/v1/company:
 *  get:
 *      security:
 *        - Bearer: []
 *      tags: [Company]
 *      summary: Get all companies
 *      responses:
 *          200:
 *              description: Success
 *          400:
 *              description: Bad Request
 */
//get all
router.get("/api/v1/company",auth, companyController.getCompany);
/**
 * @swagger
 * tags:
 *   name: Company
 * /api/v1/company/{id}:
 *  get:
 *   security:
 *        - Bearer: []
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
router.get("/api/v1/company/:id", auth, isValid, companyController.getCompanyById);
/**
 * @swagger
 * tags:
 *  name: Company
 * /api/v1/company:
 *  post:
 *      security:
 *        - Bearer: []
 *      tags: [Company]
 *      summary: Add company
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
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
 *                            example: IT Industry
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
 *                          employee_portal_url:
 *                            type: string
 *                            description: The employee portal URL
 *                          company_logo:
 *                            type: string
 *                            description: The company logo
 *                            example: logo.jpeg
 *                          favicon:
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
 *   security:
 *        - Bearer: []
 *   tags : [Company]
 *   summary: update company
 *   description: update company
 *   consumes:
 *    - multipart/form-data
 *   produces:
 *    - multipart/form-data
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the company
 *      example: 2
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *         type: object
 *         properties:
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
 *             employee_portal_url:
 *              type: string
 *              description: The employee portal URL
 *             company_logo:
 *              type: string
 *              description: The company logo
 *              example: logo.jpeg
 *             favicon:
 *              type: string
 *              description: The company favicon
 *              example: favicon.jpeg
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *        type: object
 *        properties:
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
 *             employee_portal_url:
 *              type: string
 *              description: The employee portal URL
 *             company_logo:
 *              type: string
 *              description: The company logo
 *              example: logo.jpeg
 *             favicon:
 *              type: string
 *              description: The company favicon
 *              example: favicon.jpeg
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *         type: object
 *         properties:
 *             company_name:
 *              type: string
 *              description: The company name
 *              example: Rudra Innovative Software
 *             industry:
 *              type: string
 *              description: The Industry type
 *              example: IT industry
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
 *             employee_portal_url:
 *              type: string
 *              description: The employee portal URL
 *             company_logo:
 *              type: string
 *              description: The company logo
 *              example: logo.jpeg
 *             favicon:
 *              type: string
 *              description: The company favicon
 *              example: favicon.jpeg
 */
//put
router.put(
  "/api/v1/company/:id",
  auth,isValid,
  upload,
  compValidation(),
  validateSchema,
  companyController.putCompany
);
/**
 * @swagger
 * tags:
 *  name: Company
 * /api/v1/company/{id}:
 *  delete:
 *   security:
 *        - Bearer: []
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
router.delete("/api/v1/company/:id", auth,isValid, companyController.deleteCompany);

/**
 * @swagger
 * tags:
 *  name: Company
 * /api/v1/company/{id}:
 *  patch:
 *   security:
 *        - Bearer: []
 *   tags : [Company]
 *   summary: update company
 *   description: update company
 *   consumes:
 *    - multipart/form-data
 *   produces:
 *    - multipart/form-data
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the company
 *      example: 2
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *         type: object
 *         properties:
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
 *             employee_portal_url:
 *              type: string
 *              description: The employee portal URL
 *             company_logo:
 *              type: string
 *              description: The company logo
 *              example: logo.jpeg
 *             favicon:
 *              type: string
 *              description: The company favicon
 *              example: favicon.jpeg
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *        type: object
 *        properties:
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
 *             employee_portal_url:
 *              type: string
 *              description: The employee portal URL
 *             company_logo:
 *              type: string
 *              description: The company logo
 *              example: logo.jpeg
 *             favicon:
 *              type: string
 *              description: The company favicon
 *              example: favicon.jpeg
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *         type: object
 *         properties:
 *             company_name:
 *              type: string
 *              description: The company name
 *              example: Rudra Innovative Software
 *             industry:
 *              type: string
 *              description: The Industry type
 *              example: IT industry
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
 *             employee_portal_url:
 *              type: string
 *              description: The employee portal URL
 *             company_logo:
 *              type: string
 *              description: The company logo
 *              example: logo.jpeg
 *             favicon:
 *              type: string
 *              description: The company favicon
 *              example: favicon.jpeg
 */

//patch
router.patch("/api/v1/company/:id", auth, upload, isValid, companyController.putCompany);
module.exports = router;
