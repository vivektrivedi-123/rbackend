const formController = require("../controllers/formController");
const express = require("express");
const {
  formValidation,
  validateSchema,
} = require("../validation/formValidation");
const router = express.Router();
const auth = require("../middleware/auth");
const Form = require("../models/forms");
/**
 * @swagger
 * tags :
 *   name: Form
 *   definitions:
 *     Form:
 *         type: object
 *         properties:
 *             id:
 *              type: string
 *              description: The auto-generated id of the form
 *             job:
 *              type: string
 *              description: The ID of the job
 *             field:
 *              type: string
 *              description: The ID of the field
 *             label:
 *              type: string
 *              description: The label for the form
 *             placeholder:
 *               type: string
 *               description : The placeholder in the form
 *             is_required:
 *                type: boolean
 *                description: required for not
 */

/**
 * @swagger
 * tags:
 *   name: Form
 * /api/v1/form:
 *  get:
 *      tags: [Form]
 *      summary: Get all form
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.get("/api/v1/form", auth, formController.getForm);
/**
 * @swagger
 * tags:
 *   name: Form
 * /api/v1/role/{id}:
 *  get:
 *   tags: [Form]
 *   summary: Get role by ID
 *   description: Get role data by ID
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the role
 *      example: id
 *   responses:
 *    200:
 *     description: success
 *    404:
 *     description: Id not found
 */
router.get("/api/v1/form/:id", auth, formController.getFormById);
/**
 * @swagger
 * tags:
 *   name: Form
 * /api/v1/role:
 *  post:
 *      tags: [Form]
 *      summary: Add role
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          role_name:
 *                              type: string
 *                              default: admin
 *      responses:
 *          200:
 *             description: A successful response
 *          default:
 *              description: This is the default response for it
 */
router.post(
  "/api/v1/form",
  auth,
  formValidation(),
  validateSchema,
  formController.addForm
);
/**
 * @swagger
 * tags:
 *   name: Form
 * /api/v1/role/{id}:
 *  put:
 *   tags: [Form]
 *   summary: update role
 *   description: update role
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
 *      description: id of the role
 *      example: 2
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *             id:
 *              type: string
 *              description: The auto-generated id of the form
 *             job:
 *              type: string
 *              description: The ID of the job
 *             field:
 *              type: string
 *              description: The ID of the field
 *             label:
 *              type: string
 *              description: The label for the form
 *             placeholder:
 *               type: string
 *               description : The placeholder in the form
 *             is_required:
 *                type: boolean
 *                description: required for not
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *             id:
 *              type: string
 *              description: The auto-generated id of the form
 *             job:
 *              type: string
 *              description: The ID of the job
 *             field:
 *              type: string
 *              description: The ID of the field
 *             label:
 *              type: string
 *              description: The label for the form
 *             placeholder:
 *               type: string
 *               description : The placeholder in the form
 *             is_required:
 *                type: boolean
 *                description: required for not
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *             id:
 *              type: string
 *              description: The auto-generated id of the form
 *             job:
 *              type: string
 *              description: The ID of the job
 *             field:
 *              type: string
 *              description: The ID of the field
 *             label:
 *              type: string
 *              description: The label for the form
 *             placeholder:
 *               type: string
 *               description : The placeholder in the form
 *             is_required:
 *                type: boolean
 *                description: required for not
 */
router.put(
  "/api/v1/form/:id",
  auth,
  formValidation(),
  validateSchema,
  formController.updateForm
);
/**
 * @swagger
 * tags:
 *   name: Form
 * /api/v1/role/{id}:
 *  delete:
 *   tags: [Form]
 *   summary: delete role
 *   description: delete role
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the role
 *      example: 2
 *   responses:
 *    200:
 *     description: success
 *    404:
 *     description: Id not found
 */
router.delete("/api/v1/form/:id", auth, formController.deleteForm);

module.exports = router;
