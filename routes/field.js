const fieldController = require("../controllers/fieldController");
const express = require("express");
const {
  fieldValidation,
  validateSchema,
} = require("../validation/fieldValidation");
const auth = require("../middleware/auth");
const router = express.Router();
const Field = require("../models/field");


/**
 * @swagger
 * tags:
 *  name: Field
 *  description: This is for the main data
 * /api/v1/field:
 *  get:
 *      tags: [Field]
 *      summary: Get all field
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.get("/api/v1/field", auth, fieldController.getField);
/**
 * @swagger
 * tags:
 *  name: Field
 * /api/v1/field/{id}:
 *  get:
 *   tags: [Field]
 *   summary: Get field by ID
 *   description: Get field data by ID
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the field
 *      example: id
 *   responses:
 *    200:
 *     description: success
 *    404:
 *     description: Id not found
 */
router.get("/api/v1/field/:id", auth, fieldController.getFieldById);
/**
 * @swagger
 * tags:
 *  name: Field
 * /api/v1/field:
 *  post:
 *      tags: [Field]
 *      summary: Add field
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          location:
 *                            type: string
 *                            description: The location ID
 *                          field_name:
 *                            type: string
 *                            description: Name of the field
 *                          field_type:
 *                            type: string
 *                            description: The field type
 *                          field_options:
 *                            type: string
 *                            description: The options of the field
 *      responses:
 *          200:
 *             description: A successful response
 *          default:
 *              description: This is the default response for it
 */
router.post(
  "/api/v1/field",
  auth,
  fieldValidation(),
  validateSchema,
  fieldController.addField
);
/**
 * @swagger
 * tags:
 *  name: Field
 * /api/v1/field/{id}:
 *  put:
 *   tags: [Field]
 *   summary: update field
 *   description: update field
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
 *      description: id of the field
 *      example: 2
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *             id:
 *              type: string
 *              description: The auto-generated id of the role
 *             location:
 *              type: string
 *              description: The Location ID
 *             field_name:
 *              type: string
 *              description: The field name
 *             field_type:
 *              type: string
 *              description: The field type
 *             field_options:
 *              type: string
 *              description: The field_options
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *             id:
 *              type: string
 *              description: The auto-generated id of the role
 *             location:
 *              type: string
 *              description: The Location ID
 *             field_name:
 *              type: string
 *              description: The field name
 *             field_type:
 *              type: string
 *              description: The field type
 *             field_options:
 *              type: string
 *              description: The field_options
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *             id:
 *              type: string
 *              description: The auto-generated id of the role
 *             location:
 *              type: string
 *              description: The Location ID
 *             field_name:
 *              type: string
 *              description: The field name
 *             field_type:
 *              type: string
 *              description: The field type
 *             field_options:
 *              type: string
 *              description: The field_options
 */
router.put("/api/v1/field/:id", auth, fieldController.updateField);
/**
 * @swagger
 * tags:
 *  name: Field
 * /api/v1/field/{id}:
 *  delete:
 *   tags: [Field]
 *   summary: delete field
 *   description: delete field
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the field
 *      example: 2
 *   responses:
 *    200:
 *     description: success
 *    404:
 *     description: Id not found
 */
router.delete("/api/v1/field/:id", auth, fieldController.deleteField);

module.exports = router;
