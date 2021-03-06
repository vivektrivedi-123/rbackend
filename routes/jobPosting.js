const jobController = require("../controllers/jobController");
const isAdmin = require("../middleware/admin");
const auth = require("../middleware/auth");
const express = require("express");
const {
  jobValidation,
  validateSchema,
} = require("../validation/jobValidation");
const isValid = require("../middleware/validID")
const router = express.Router();
const job = require("../models/job");

/**
 * @swagger
 * components: 
 *  schemas: 
 *   Job:
 *    type: object
 *    required: 
 *      - department
 *      - category
 *      - job_title
 *      - job_type
 *      - branch
 *      - remote_job
 *      - job_description
 *      - experience
 *      - skills
 *      - min_sal
 *      - max_sal
 *      - currency
 *      - allow_employees
 *      - publish

 *    properties:
 *                          id: 
 *                              type: string
 *                              description: Auto-generated ID of Job Post
 *                          department:
 *                              type: string
 *                              description: ID of the department
 *                          category:
 *                              type: string
 *                              description: ID of the category
 *                          job_title:
 *                              type: string
 *                              description: Title of the job
 *                          job_type:
 *                              type: string
 *                              description: Type of the job
 *                          branch:
 *                              type: string
 *                              description: Branch of the job
 *                          remote_job:
 *                              type: string
 *                              description: Remote Job
 *                          job_description:
 *                              type: string
 *                              description: Description of the job
 *                          experience:
 *                              type: string
 *                              description: Experience in the job
 *                          skills:
 *                              type: string
 *                              description: Skills 
 *                          min_sal:
 *                              type: integer
 *                              description: Min_salary of the job
 *                          max_sal:
 *                              type: integer
 *                              description: Max_salary of the job
 *                          currency:
 *                              type: string
 *                              description: Currency of the job
 *                          allow_employees:
 *                              type: boolean
 *                              description: Allow employees
 *                          publish:
 *                              type: boolean
 *                              description: Want to publish?
 *                              
*/

/**
 * @swagger
 * tags:
 *  name: Job
 * /api/v1/job:
 *  get:
 *      security:
 *        - Bearer: []
 *      tags: [Job]
 *      summary: Get all jobs
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.get("/api/v1/job", auth, jobController.getJob);
/**
 * @swagger
 * tags:
 *  name: Job
 * /api/v1/job/{id}:
 *  get:
 *   security:
 *        - Bearer: []
 *   tags: [Job]
 *   summary: Get job by ID
 *   description: Get job data by ID
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the job
 *      example: id
 *   responses:
 *    200:
 *     description: success
 *    404:
 *     description: Id not found
 */
router.get("/api/v1/job/:id", auth, isValid, jobController.getJobById);
/**
 * @swagger
 * tags:
 *  name: Job
 * /api/v1/job:
 *  post:
 *      security:
 *        - Bearer: []
 *      tags: [Job]
 *      summary: Add Job
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          department:
 *                              type: string
 *                              description: ID of the department
 *                          category:
 *                              type: string
 *                              description: ID of the category
 *                          stage:
 *                              type: string
 *                              description: ID of the stage
 *                          job_title:
 *                              type: string
 *                              description: Title of the job
 *                          job_type:
 *                              type: string
 *                              description: Type of the job
 *                          branch:
 *                              type: string
 *                              description: Branch of the job
 *                          remote_job:
 *                              type: string
 *                              description: Remote Job
 *                          job_description:
 *                              type: string
 *                              description: Description of the job
 *                          experience:
 *                              type: string
 *                              description: Experience in the job
 *                          skills:
 *                              type: string
 *                              description: Skills
 *                          min_sal:
 *                              type: integer
 *                              description: Min_salary of the job
 *                          max_sal:
 *                              type: integer
 *                              description: Max_salary of the job
 *                          currency:
 *                              type: string
 *                              description: Currency of the job
 *                          allow_employees:
 *                              type: boolean
 *                              description: Allow employees
 *                          publish:
 *                              type: boolean
 *                              description: Want to publish?
 *      responses:
 *          200:
 *             description: A successful response
 *          default:
 *              description: This is the default response for it
 */
router.post(
  "/api/v1/job",
  auth,
  jobValidation(),
  validateSchema,
  jobController.addJob
);
/**
 * @swagger
 * tags:
 *  name: Job
 * /api/v1/job/{id}:
 *  put:
 *   security:
 *        - Bearer: []
 *   tags: [Job]
 *   summary: update job
 *   description: update job
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
 *      description: id of the jobs
 *      example: 2
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *          type: object
 *          properties:
 *                          department:
 *                              type: string
 *                              description: ID of the department
 *                          category:
 *                              type: string
 *                              description: ID of the category
 *                          stage:
 *                              type: string
 *                              description: ID of the stage
 *                          job_title:
 *                              type: string
 *                              description: Title of the job
 *                          job_type:
 *                              type: string
 *                              description: Type of the job
 *                          branch:
 *                              type: string
 *                              description: Branch of the job
 *                          remote_job:
 *                              type: boolean
 *                              description: Remote Job
 *                          job_description:
 *                              type: string
 *                              description: Description of the job
 *                          experience:
 *                              type: string
 *                              description: Experience in the job
 *                          skills:
 *                              type: string
 *                              description: Skills
 *                          min_sal:
 *                              type: string
 *                              description: Min_salary of the job
 *                          max_sal:
 *                              type: integer
 *                              description: Max_salary of the job
 *                          currency:
 *                              type: integer
 *                              description: Currency of the job
 *                          allow_employees:
 *                              type: boolean
 *                              description: Allow employees
 *                          publish:
 *                              type: boolean
 *                              description: Want to publish?
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *          type: object
 *          properties:
 *                          department:
 *                              type: string
 *                              description: ID of the department
 *                          category:
 *                              type: string
 *                              description: ID of the category
 *                          stage:
 *                              type: string
 *                              description: ID of the stage
 *                          job_title:
 *                              type: string
 *                              description: Title of the job
 *                          job_type:
 *                              type: string
 *                              description: Type of the job
 *                          branch:
 *                              type: string
 *                              description: Want to publish?
 *                          remote_job:
 *                              type: string
 *                              description: Remote Job
 *                          job_description:
 *                              type: string
 *                              description: Description of the job
 *                          experience:
 *                              type: string
 *                              description: Experience in the job
 *                          skills:
 *                              type: string
 *                              description: Skills
 *                          min_sal:
 *                              type: integer
 *                              description: Min_salary of the job
 *                          max_sal:
 *                              type: ineteger
 *                              description: Max_salary of the job
 *                          currency:
 *                              type: string
 *                              description: Currency of the job
 *                          allow_employees:
 *                              type: boolean
 *                              description: Allow employees
 *                          publish:
 *                              type: boolean
 *                              description: Want to Publish?
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *          type: object
 *          properties:
 *                          department:
 *                              type: string
 *                              description: ID of the department
 *                          category:
 *                              type: string
 *                              description: ID of the category
 *                          stage:
 *                              type: string
 *                              description: ID of the stage
 *                          job_title:
 *                              type: string
 *                              description: Title of the job
 *                          job_type:
 *                              type: string
 *                              description: Type of the job
 *                          branch:
 *                              type: string
 *                              description: Branch of the job
 *                          remote_job:
 *                              type: string
 *                              description: Remote Job
 *                          job_description:
 *                              type: string
 *                              description: Description of the job
 *                          experience:
 *                              type: string
 *                              description: Experience in the job
 *                          skills:
 *                              type: string
 *                              description: Skills
 *                          min_sal:
 *                              type: integer
 *                              description: Min_salary of the job
 *                          max_sal:
 *                              type: integer
 *                              description: Max_salary of the job
 *                          currency:
 *                              type: string
 *                              description: Currency of the job
 *                          allow_employees:
 *                              type: boolean
 *                              description: Allow employees
 *                          publish:
 *                              type: boolean
 *                              description: Want to publish?
 *
 */
router.put(
  "/api/v1/job/:id",
  auth, isValid,
  jobValidation(),
  validateSchema,
  jobController.putJob
);
/**
 * @swagger
 * tags:
 *  name: Job
 * /api/v1/job/{id}:
 *  delete:
 *   security:
 *        - Bearer: []
 *   tags: [Job]
 *   summary: delete job
 *   description: delete job
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the job
 *      example: 2
 *   responses:
 *    200:
 *     description: success
 *    404:
 *     description: Id not found
 */
router.delete("/api/v1/job/:id", auth, isValid, jobController.deleteJob);

/**
 * @swagger
 * tags:
 *  name: Job
 * /api/v1/job/{id}:
 *  patch:
 *   security:
 *        - Bearer: []
 *   tags: [Job]
 *   summary: update job
 *   description: update job
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
 *      description: id of the jobs
 *      example: 2
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *          type: object
 *          properties:
 *                          department:
 *                              type: string
 *                              description: ID of the department
 *                          category:
 *                              type: string
 *                              description: ID of the category
 *                          stage:
 *                              type: string
 *                              description: ID of the stage
 *                          job_title:
 *                              type: string
 *                              description: Title of the job
 *                          job_type:
 *                              type: string
 *                              description: Type of the job
 *                          branch:
 *                              type: string
 *                              description: Branch of the job
 *                          remote_job:
 *                              type: boolean
 *                              description: Remote Job
 *                          job_description:
 *                              type: string
 *                              description: Description of the job
 *                          experience:
 *                              type: string
 *                              description: Experience in the job
 *                          skills:
 *                              type: string
 *                              description: Skills
 *                          min_sal:
 *                              type: string
 *                              description: Min_salary of the job
 *                          max_sal:
 *                              type: integer
 *                              description: Max_salary of the job
 *                          currency:
 *                              type: integer
 *                              description: Currency of the job
 *                          allow_employees:
 *                              type: boolean
 *                              description: Allow employees
 *                          publish:
 *                              type: boolean
 *                              description: Want to publish?
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *          type: object
 *          properties:
 *                          department:
 *                              type: string
 *                              description: ID of the department
 *                          category:
 *                              type: string
 *                              description: ID of the category
 *                          stage:
 *                              type: string
 *                              description: ID of the stage
 *                          job_title:
 *                              type: string
 *                              description: Title of the job
 *                          job_type:
 *                              type: string
 *                              description: Type of the job
 *                          branch:
 *                              type: string
 *                              description: Want to publish?
 *                          remote_job:
 *                              type: string
 *                              description: Remote Job
 *                          job_description:
 *                              type: string
 *                              description: Description of the job
 *                          experience:
 *                              type: string
 *                              description: Experience in the job
 *                          skills:
 *                              type: string
 *                              description: Skills
 *                          min_sal:
 *                              type: integer
 *                              description: Min_salary of the job
 *                          max_sal:
 *                              type: ineteger
 *                              description: Max_salary of the job
 *                          currency:
 *                              type: string
 *                              description: Currency of the job
 *                          allow_employees:
 *                              type: boolean
 *                              description: Allow employees
 *                          publish:
 *                              type: boolean
 *                              description: Want to Publish?
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *          type: object
 *          properties:
 *                          department:
 *                              type: string
 *                              description: ID of the department
 *                          category:
 *                              type: string
 *                              description: ID of the category
 *                          stage:
 *                              type: string
 *                              description: ID of the stage
 *                          job_title:
 *                              type: string
 *                              description: Title of the job
 *                          job_type:
 *                              type: string
 *                              description: Type of the job
 *                          branch:
 *                              type: string
 *                              description: Branch of the job
 *                          remote_job:
 *                              type: string
 *                              description: Remote Job
 *                          job_description:
 *                              type: string
 *                              description: Description of the job
 *                          experience:
 *                              type: string
 *                              description: Experience in the job
 *                          skills:
 *                              type: string
 *                              description: Skills
 *                          min_sal:
 *                              type: integer
 *                              description: Min_salary of the job
 *                          max_sal:
 *                              type: integer
 *                              description: Max_salary of the job
 *                          currency:
 *                              type: string
 *                              description: Currency of the job
 *                          allow_employees:
 *                              type: boolean
 *                              description: Allow employees
 *                          publish:
 *                              type: boolean
 *                              description: Want to publish?
 *
 */

//patch
router.patch("/api/v1/job/:id", auth, isValid, jobController.patchJob);
module.exports = router;
