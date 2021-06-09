const stageDataController = require("../controllers/stageDataController");
const express = require("express");
const {
  stageDataValidation,
  validateSchema,
} = require("../validation/stageDataValidation");
const router = express.Router();
const auth = require("../middleware/auth");
const Stage = require("../models/stageData");

/**
 * @swagger
 * components:
 *  schemas:
 *   StageData:
 *    type: object
 *    required:
 *     - name
 *     - stages
 *     - stage
 *     - stepName
 *     - order
 *    properties:
 *              name:
 *                type: string
 *                description: Nmae of the Stage Data
 *              stages:
 *                type: string
 *                description:
 *
 */
/**
 * @swagger
 * tags:
 *  name: StageData
 * /api/v1/stageData:
 *  get:
 *      security:
 *        - Bearer: []
 *      tags: [StageData]
 *      summary: Get all stage
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.get("/api/v1/stageData", auth, stageDataController.getStageData);
/**
 * @swagger
 * tags:
 *  name: StageData
 * /api/v1/stageData/{id}:
 *  get:
 *   security:
 *        - Bearer: []
 *   tags: [StageData]
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
router.get("/api/v1/stageData/:id", auth, stageDataController.getStageDataById);
/**
 * @swagger
 * tags:
 *  name: StageData
 * /api/v1/stageData:
 *  post:
 *      security:
 *        - Bearer: []
 *      tags: [StageData]
 *      summary: Add stageData
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: The name of the Stage Data
 *                          stageData:
 *                               type: string
 *                               description: ID of the Stages
 *      responses:
 *          200:
 *             description: A successful response
 *          default:
 *              description: This is the default response for it
 */
router.post(
  "/api/v1/stageData",
  auth,
  stageDataValidation(),
  validateSchema,
  stageDataController.addStageData
);
/**
 * @swagger
 * tags:
 *  name: StageData
 * /api/v1/stageData/{id}:
 *  put:
 *   security:
 *        - Bearer: []
 *   tags: [StageData]
 *   summary: update stageData
 *   description: update stageData
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
 *      description: id of the stageData
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
  "/api/v1/stageData/:id",
  auth,
  stageDataValidation(),
  validateSchema,
  stageDataController.putStageData
);

/**
 * @swagger
 * tags:
 *  name: StageData
 * /api/v1/stageData/{id}:
 *  delete:
 *   security:
 *        - Bearer: []
 *   tags: [StageData]
 *   summary: delete stageData
 *   description: delete stageData
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
router.delete(
  "/api/v1/stageData/:id",
  auth,
  stageDataController.deleteStageData
);

/**
 * @swagger
 * tags:
 *  name: StageData
 * /api/v1/stageData/{id}:
 *  patch:
 *   security:
 *        - Bearer: []
 *   tags: [StageData]
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
router.patch("/api/v1/stageData/:id", auth, stageDataController.patchStageData);
module.exports = router;
