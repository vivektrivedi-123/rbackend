const interviewController = require("../controllers/interviewController");
const express = require("express");
const {
  interviewValidation,
  validateSchema,
} = require("../validation/interviewValidation");
const _ = require("lodash");
const router = express.Router();
const auth = require("../middleware/auth");
const Interview = require("../models/interview");

/**
 * @swagger
 * components: 
 *  schemas: 
 *   Interview:
 *    type: object
 *    required: 
 *      - application
 *      - stages
 *      - subject
 *      - scheduled_date
 *      - scheduled_time
 *      - scheduled_timezone
 *      - duration
 *      - recommmendations
 *      - interviewer
 *      - rating
 *      - notes
 *      - overall_comments
 *      - status
 *    properties:
 *                          application:
 *                              type: string
 *                              description: ID of the application
 *                          stages:
 *                               type: string
 *                               description: ID of the stage
 *                          subject:
 *                               type: string
 *                               description: Subject of the interview
 *                          scheduled_date:
 *                               type: string
 *                               description: scheduled_date of the interview
 *                          scheduled_time:
 *                               type: string
 *                               description: scheduled_time of the interview
 *                          scheduled_timezone:
 *                               type: string
 *                               description: scheduled_timezone of the interview
 *                          duration:
 *                               type: string
 *                               description: duration of the interview
 *                          recommendations:
 *                               type: string
 *                               description: recommendations of the interview
 *                          interviewer:
 *                               type: string
 *                               description: interviewer of the interview
 *                          rating:
 *                               type: Number
 *                               description: rating of the interview
 *                          notes:
 *                               type: string
 *                               description: notes of the interview
 *                          overall_comments:
 *                               type: string
 *                               description: overall_comments of the Interview
 *                          status: 
 *                               type: string
 *                               description: status of the interview
 *                              
*/
/**
 * @swagger
 * tags:
 *  name: Interview
 * /api/v1/interview:
 *  get:
 *      security:
 *        - Bearer: []
 *      tags: [Interview]
 *      summary: Get all Interviews
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.get("/api/v1/interview", auth, interviewController.getInterview);
/**
 * @swagger
 * tags:
 *  name: Interview
 * /api/v1/interview/{id}:
 *  get:
 *   security:
 *        - Bearer: []
 *   tags: [Interview]
 *   summary: Get Interview by ID
 *   description: Get Interview data by ID
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the Interview
 *      example: id
 *   responses:
 *    200:
 *     description: success
 *    404:
 *     description: Id not found
 */
router.get("/api/v1/interview/:id", auth, interviewController.getInterviewById);
/**
 * @swagger
 * tags:
 *  name: Interview
 * /api/v1/interview:
 *  post:
 *      security:
 *        - Bearer: []
 *      tags: [Interview]
 *      summary: Add Interview
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          application:
 *                              type: string
 *                              description: ID of the application
 *                          stages:
 *                               type: string
 *                               description: ID of the stage
 *                          subject:
 *                               type: string
 *                               description: Subject of the interview
 *                          scheduled_date:
 *                               type: string
 *                               description: scheduled_date of the interview
 *                          scheduled_time:
 *                               type: string
 *                               description: scheduled_time of the interview
 *                          scheduled_timezone:
 *                               type: string
 *                               description: scheduled_timezone of the interview
 *                          duration:
 *                               type: string
 *                               description: duration of the interview
 *                          recommendations:
 *                               type: string
 *                               description: recommendations of the interview
 *                          interviewer:
 *                               type: string
 *                               description: interviewer of the interview
 *                          rating:
 *                               type: Number
 *                               description: rating of the interview
 *                          notes:
 *                               type: string
 *                               description: notes of the interview
 *                          overall_comments:
 *                               type: string
 *                               description: overall_comments of the Interview
 *                          status: 
 *                               type: string
 *                               description: status of the interview
 *      responses:
 *          200:
 *             description: A successful response
 *          default:
 *              description: This is the default response for it
 */
router.post(
  "/api/v1/interview",
  auth,
  interviewValidation(),
  validateSchema,
  interviewController.addInterview
);
/**
 * @swagger
 * tags:
 *  name: Interview
 * /api/v1/interview/{id}:
 *  put:
 *   security:
 *        - Bearer: []
 *   tags: [Interview]
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
 *       type: string
 *      required: true
 *      description: id of the role
 *      example: 2
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *        type: object
 *        properties:
 *                          application:
 *                              type: string
 *                              description: ID of the application
 *                          stages:
 *                               type: string
 *                               description: ID of the stage
 *                          subject:
 *                               type: string
 *                               description: Subject of the interview
 *                          scheduled_date:
 *                               type: string
 *                               description: scheduled_date of the interview
 *                          scheduled_time:
 *                               type: string
 *                               description: scheduled_time of the interview
 *                          scheduled_timezone:
 *                               type: string
 *                               description: scheduled_timezone of the interview
 *                          duration:
 *                               type: string
 *                               description: duration of the interview
 *                          recommendations:
 *                               type: string
 *                               description: recommendations of the interview
 *                          interviewer:
 *                               type: string
 *                               description: interviewer of the interview
 *                          rating:
 *                               type: Number
 *                               description: rating of the interview
 *                          notes:
 *                               type: string
 *                               description: notes of the interview
 *                          overall_comments:
 *                               type: string
 *                               description: overall_comments of the Interview
 *                          status: 
 *                               type: string
 *                               description: status of the interview
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *                          application:
 *                              type:  string
 *                              description: ID of the application
 *                          stages:
 *                               type: string
 *                               description: ID of the stage
 *                          subject:
 *                               type: string
 *                               description: Subject of the interview
 *                          scheduled_date:
 *                               type: string
 *                               description: scheduled_date of the interview
 *                          scheduled_time:
 *                               type: string
 *                               description: scheduled_time of the interview
 *                          scheduled_timezone:
 *                               type: string
 *                               description: scheduled_timezone of the interview
 *                          duration:
 *                               type: string
 *                               description: duration of the interview
 *                          recommendations:
 *                               type: string
 *                               description: recommendations of the interview
 *                          interviewer:
 *                               type: string
 *                               description: interviewer of the interview
 *                          rating:
 *                               type: Number
 *                               description: rating of the interview
 *                          notes:
 *                               type: string
 *                               description: notes of the interview
 *                          overall_comments:
 *                               type: string
 *                               description: overall_comments of the Interview
 *                          status: 
 *                               type: string
 *                               description: status of the interview
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *         type: object
 *         properties:
 *                          application:
 *                              type: string
 *                              description: ID of the application
 *                          stages:
 *                               type: string
 *                               description: ID of the stage
 *                          subject:
 *                               type: string
 *                               description: Subject of the interview
 *                          scheduled_date:
 *                               type: string
 *                               description: scheduled_date of the interview
 *                          scheduled_time:
 *                               type: string
 *                               description: scheduled_time of the interview
 *                          scheduled_timezone:
 *                               type: string
 *                               description: scheduled_timezone of the interview
 *                          duration:
 *                               type: string
 *                               description: duration of the interview
 *                          recommendations:
 *                               type: string
 *                               description: recommendations of the interview
 *                          interviewer:
 *                               type: string
 *                               description: interviewer of the interview
 *                          rating:
 *                               type: Number
 *                               description: rating of the interview
 *                          notes:
 *                               type: string
 *                               description: notes of the interview
 *                          overall_comments:
 *                               type: string
 *                               description: overall_comments of the Interview
 *                          status: 
 *                               type: string
 *                               description: status of the interview
 */
router.put(
  "/api/v1/interview/:id",
  auth,
  interviewValidation(),
  validateSchema,
  interviewController.updateInterview
);
/**
 * @swagger
 * tags:
 *  name: Interview
 * /api/v1/interview/{id}:
 *  delete:
 *   security:
 *        - Bearer: []
 *   tags: [Interview]
 *   summary: delete interview
 *   description: delete interview
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the interview
 *      example: 2
 *   responses:
 *    200:
 *     description: success
 *    404:
 *     description: Id not found
 */
router.delete(
  "/api/v1/interview/:id",
  auth,
  interviewController.deleteInterview
);

module.exports = router;
