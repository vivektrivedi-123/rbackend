const stagesController = require("../controllers/stagesController");
const express = require("express");
const {
  stageValidation,
  validateSchema,
} = require("../validation/stageValidation");
const router = express.Router();
const auth = require("../middleware/auth");
const Stage = require("../models/stage");
/**
 * @swagger
 *   definitions:
 *     Role:
 *         type: object
 *         properties:
 *             id:
 *              type: string
 *              description: The auto-generated id of the role
 *             role_name:
 *              type: string
 *              description: The role name
 */

/**
 * @swagger
 *  description: This is for the main data
 * /api/v1/role:
 *  get:
 *      summary: Get all roles
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.get("/api/v1/stage", auth, stagesController.getStage);
/**
 * @swagger
 * /api/v1/role/{id}:
 *  get:
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
router.get("/api/v1/stage/:id", auth, stagesController.getStageById);
/**
 * @swagger
 * /api/v1/role:
 *  post:
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
  "/api/v1/stage",
  auth,
  stageValidation(),
  validateSchema,
  stagesController.addStage
);
/**
 * @swagger
 * /api/v1/role/{id}:
 *  put:
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
 *       $ref: '#/definitions/Role'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Role'
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/Role'
 */
router.put(
  "/api/v1/stage/:id",
  auth,
  stageValidation(),
  validateSchema,
  stagesController.updateStage
);
/**
 * @swagger
 * /api/v1/role/{id}:
 *  delete:
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
router.delete("/api/v1/stage/:id", auth, stagesController.deleteStage);

module.exports = router;
