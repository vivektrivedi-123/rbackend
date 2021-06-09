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
 * components:
 *  schemas:
 *   Stage:
 *    type: object
 *    required:
 *     - job
 *     - stage
 *     - status
 *    properties:
 *                          id:
 *                              type: string
 *                              description: Auto-Generated ID of Stages
 *                          job:
 *                              type: string
 *                              description: The ID of the job
 *                          stage:
 *                               type: string
 *                               description: Stage of the job
 *                          status:
 *                               type: string
 *                               description: The status of the job
 *
 *
 */
/**
 * @swagger
 * tags:
 *  name: Stage
 * /api/v1/stage:
 *  get:
 *      security:
 *        - Bearer: []
 *      tags: [Stage]
 *      summary: Get all stage
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.get("/api/v1/stage", auth, stagesController.getStage);
/**
 * @swagger
 * tags:
 *  name: Stage
 * /api/v1/stage/{id}:
 *  get:
 *   security:
 *        - Bearer: []
 *   tags: [Stage]
 *   summary: Get stage by ID
 *   description: Get stage data by ID
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the stage
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
 * tags:
 *  name: Stage
 * /api/v1/stage:
 *  post:
 *      security:
 *        - Bearer: []
 *      tags: [Stage]
 *      summary: Add stage
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          job:
 *                              type: string
 *                              description: The ID of the job
 *                          stage:
 *                               type: string
 *                               description: Stage of the job
 *                          status:
 *                               type: string
 *                               description: The status of the job
 *
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
 * tags:
 *  name: Stage
 * /api/v1/stage/{id}:
 *  put:
 *   security:
 *        - Bearer: []
 *   tags: [Stage]
 *   summary: update stage
 *   description: update stage
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
 *      description: id of the stage
 *      example: 2
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *        type: object
 *        properties:
 *                          job:
 *                              type: string
 *                              description: The ID of the job
 *                          stage:
 *                               type: string
 *                               description: Stage of the job
 *                          status:
 *                               type: string
 *                               description: The status of the job
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *                          job:
 *                              type: string
 *                              description: The ID of the job
 *                          stage:
 *                               type: string
 *                               description: Stage of the job
 *                          status:
 *                               type: string
 *                               description: The status of the job
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *                          job:
 *                              type: string
 *                              description: The ID of the job
 *                          stage:
 *                               type: string
 *                               description: Stage of the job
 *                          status:
 *                               type: string
 *                               description: The status of the job
 */
router.put(
  "/api/v1/stage/:id",
  auth,
  stageValidation(),
  validateSchema,
  stagesController.putStage
);
/**
 * @swagger
 * tags:
 *  name: Stage
 * /api/v1/stage/{id}:
 *  delete:
 *   security:
 *        - Bearer: []
 *   tags: [Stage]
 *   summary: delete stage
 *   description: delete stage
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the stage
 *      example: 2
 *   responses:
 *    200:
 *     description: success
 *    404:
 *     description: Id not found
 */
router.delete("/api/v1/stage/:id", auth, stagesController.deleteStage);

/**
 * @swagger
 * tags:
 *  name: Stage
 * /api/v1/stage/{id}:
 *  patch:
 *   security:
 *        - Bearer: []
 *   tags: [Stage]
 *   summary: update stage
 *   description: update stage
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
 *      description: id of the stage
 *      example: 2
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *        type: object
 *        properties:
 *                          job:
 *                              type: string
 *                              description: The ID of the job
 *                          stage:
 *                               type: string
 *                               description: Stage of the job
 *                          status:
 *                               type: string
 *                               description: The status of the job
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *                          job:
 *                              type: string
 *                              description: The ID of the job
 *                          stage:
 *                               type: string
 *                               description: Stage of the job
 *                          status:
 *                               type: string
 *                               description: The status of the job
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *                          job:
 *                              type: string
 *                              description: The ID of the job
 *                          stage:
 *                               type: string
 *                               description: Stage of the job
 *                          status:
 *                               type: string
 *                               description: The status of the job
 */

//patch
router.patch("/api/v1/stage/:id", auth, stagesController.patchStage);
module.exports = router;
