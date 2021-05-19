const emailController = require("../controllers/emailController");
const express = require("express");
const {
  emailValidation,
  validateSchema,
} = require("../validation/emailValidation");
const router = express.Router();
const auth = require("../middleware/auth");
const Email = require("../models/email");
/**
 * @swagger
 *   definitions:
 *     Email:
 *         type: object
 *         properties:
 *             id:
 *              type: string
 *              description: The auto-generated id of the email
 *             application:
 *              type: string
 *              description: The application ID 
 *             from:
 *              type: string
 *              description: The sender of the email
 *             to:
 *              type: string
 *              description: The receiver of the email
 *             body:
 *              type: string
 *              description: The body of the email
 *             status:
 *              type: string
 *              description: The status of the email
 */

/**
 * @swagger
 *  description: This is for the main data
 * /api/v1/email:
 *  get:
 *      summary: Get all email
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.get("/api/v1/email", auth, emailController.getEmail);
/**
 * @swagger
 * /api/v1/email/{id}:
 *  get:
 *   summary: Get email by ID
 *   description: Get email data by ID
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the email
 *      example: id
 *   responses:
 *    200:
 *     description: success
 *    404:
 *     description: Id not found
 */
router.get("/api/v1/email/:id", auth, emailController.getEmailById);
/**
 * @swagger
 * /api/v1/email:
 *  post:
 *      summary: Add email
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                           type: string
 *                           description: The auto-generated id of the email
 *                          application:
 *                           type: string
 *                           description: The application ID 
 *                          from:
 *                           type: string
 *                           description: The sender of the email
 *                          to:
 *                           type: string
 *                           description: The receiver of the email
 *                          body:
 *                           type: string
 *                           description: The body of the email
 *                          status:
 *                           type: string
 *                           description: The status of the email
 *      responses:
 *          200:
 *             description: A successful response
 *          default:
 *              description: This is the default response for it
 */
router.post(
  "/api/v1/email",
  emailValidation(),
  auth,
  validateSchema,
  emailController.addEmail
);
/**
 * @swagger
 * /api/v1/email/{id}:
 *  put:
 *   summary: update email
 *   description: update email
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
 *      description: id of the email
 *      example: 2
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *       $ref: '#/definitions/Email'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Email'
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/Email'
 */
router.put("/api/v1/email/:id", auth, emailController.updateEmail);
/**
 * @swagger
 * /api/v1/email/{id}:
 *  delete:
 *   summary: delete email
 *   description: delete email
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the email
 *      example: 2
 *   responses:
 *    200:
 *     description: success
 *    404:
 *     description: Id not found
 */
router.delete("/api/v1/email/:id", auth, emailController.deleteEmail);
module.exports = router;
