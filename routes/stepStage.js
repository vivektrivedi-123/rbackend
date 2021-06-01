const stepStageController = require("../controllers/stepStageController");
const express = require("express");
const {
  stepValidation,
  validateSchema,
} = require("../validation/stepValidation");
const router = express.Router();
const auth = require("../middleware/auth");
const Step = require("../models/stepStage");

/**
 * @swagger
 * components:
 *  schemas:
 *   Step:
 *    type: object
 *    required:
 *     - stepName
 *     - order
 *    properties:
 *                          id:
 *                              type: string
 *                              description: Auto-Generated ID of steps
 *                          stepName:
 *                              type: string
 *                              description: The ID of the job
 *                          order:
 *                               type: integer
 *                               description: step of the job
 *
 */
/**
 * @swagger
 * tags:
 *  name: Step
 * /api/v1/step:
 *  get:
 *      security:
 *        - Bearer: []
 *      tags: [Step]
 *      summary: Get all step
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.get("/api/v1/step", auth, stepStageController.getStep);
/**
 * @swagger
 * tags:
 *  name: Step
 * /api/v1/step/{id}:
 *  get:
 *   security:
 *        - Bearer: []
 *   tags: [Step]
 *   summary: Get step by ID
 *   description: Get step data by ID
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the step
 *      example: id
 *   responses:
 *    200:
 *     description: success
 *    404:
 *     description: Id not found
 */
router.get("/api/v1/step/:id", auth, stepStageController.getStepById);
/**
 * @swagger
 * tags:
 *  name: Step
 * /api/v1/step:
 *  post:
 *      security:
 *        - Bearer: []
 *      tags: [Step]
 *      summary: Add step
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          stepName:
 *                               type: string
 *                               description: step of the job
 *                          order:
 *                               type: integer
 *                               description: The order of the job
 *
 *      responses:
 *          200:
 *             description: A successful response
 *          default:
 *              description: This is the default response for it
 */
router.post(
  "/api/v1/step",
  auth,
  stepValidation(),
  validateSchema,
  stepStageController.addStep
);
/**
 * @swagger
 * tags:
 *  name: Step
 * /api/v1/step/{id}:
 *  put:
 *   security:
 *        - Bearer: []
 *   tags: [Step]
 *   summary: update step
 *   description: update step
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
 *      description: id of the step
 *      example: 2
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *        type: object
 *        properties:
 *
 *                          stepName:
 *                               type: string
 *                               description: step of the job
 *                          order:
 *                               type: integer
 *                               description: The order of the job
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *                          job:
 *                              type: string
 *                              description: The ID of the job
 *                          step:
 *                               type: string
 *                               description: step of the job
 *                          order:
 *                               type: integer
 *                               description: The order of the job
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *
 *                          stepName:
 *                               type: string
 *                               description: step of the job
 *                          order:
 *                               type: integer
 *                               description: The order of the job
 */
router.put(
  "/api/vs1/step/:id",
  auth,
  stepValidation(),
  validateSchema,
  stepStageController.putStep
);
/**
 * @swagger
 * tags:
 *  name: Step
 * /api/v1/step/{id}:
 *  delete:
 *   security:
 *        - Bearer: []
 *   tags: [Step]
 *   summary: delete step
 *   description: delete step
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the step
 *      example: 2
 *   responses:
 *    200:
 *     description: success
 *    404:
 *     description: Id not found
 */
router.delete("/api/v1/step/:id", auth, stepStageController.deleteStep);

/**
 * @swagger
 * tags:
 *  name: Step
 * /api/v1/step/{id}:
 *  patch:
 *   security:
 *        - Bearer: []
 *   tags: [Step]
 *   summary: update step
 *   description: update step
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
 *      description: id of the step
 *      example: 2
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *        type: object
 *        properties:
 *
 *                          stepName:
 *                               type: string
 *                               description: step of the job
 *                          order:
 *                               type: integer
 *                               description: The order of the job
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *
 *                          stepName:
 *                               type: string
 *                               description: step of the job
 *                          order:
 *                               type: integer
 *                               description: The order of the job
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *                          stepName:
 *                               type: string
 *                               description: step of the job
 *                          order:
 *                               type: integer
 *                               description: The order of the job
 */

//patch
router.patch("/api/v1/step/:id", auth, stepStageController.patchStep);
module.exports = router;
