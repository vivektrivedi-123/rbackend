const fieldController = require("../controllers/fieldController");
const express = require("express");
const {
  fieldValidation,
  validateSchema,
} = require("../validation/fieldValidation");
const auth = require("../middleware/auth");
const isValid = require("../middleware/validID")
const router = express.Router();
const Field = require("../models/field");
/**
 * @swagger
 * components:
 *  schemas:
 *   Field:
 *    type: object
 *    required:
 *     - location
 *     - field_name
 *     - field_type
 *     - field_options
 *    properties:
 *                          id:
 *                            type: string
 *                            description: Auto-Generated ID of Fields
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
 *
 */

/**
 * @swagger
 * tags:
 *  name: Field
 * /api/v1/field:
 *  get:
 *      security:
 *        - Bearer: []
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
 *   security:
 *        - Bearer: []
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
router.get("/api/v1/field/:id", auth, isValid, fieldController.getFieldById);
/**
 * @swagger
 * tags:
 *  name: Field
 * /api/v1/field:
 *  post:
 *      security:
 *        - Bearer: []
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
 *   security:
 *        - Bearer: []
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
 *       type: string
 *      required: true
 *      description: id of the field
 *      example: 2
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *         type: object
 *         properties:
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
 *         type: object
 *         properties:
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
 *         type: object
 *         properties:
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
router.put(
  "/api/v1/field/:id",
  auth, isValid,
  fieldValidation(),
  validateSchema,
  fieldController.putField
);
/**
 * @swagger
 * tags:
 *  name: Field
 * /api/v1/field/{id}:
 *  delete:
 *   security:
 *        - Bearer: []
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
router.delete("/api/v1/field/:id", auth,isValid, fieldController.deleteField);

/**
 * @swagger
 * tags:
 *  name: Field
 * /api/v1/field/{id}:
 *  patch:
 *   security:
 *        - Bearer: []
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
 *       type: string
 *      required: true
 *      description: id of the field
 *      example: 2
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *         type: object
 *         properties:
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
 *         type: object
 *         properties:
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
 *         type: object
 *         properties:
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

//patch
router.patch(
  "/api/v1/field/:id",
  auth, isValid,
  fieldController.patchField
);
module.exports = router;
