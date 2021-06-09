const candidateController = require("../controllers/candidateController");
const express = require("express");
const {
  candidateValidation,
  validateSchema,
} = require("../validation/candidateValidation");
const router = express.Router();
const swagger = require("swagger-ui-express");
const auth = require("../middleware/auth");
const company = require("../models/company");
const app = express();

/**
 * @swagger
 * components:
 *  schemas:
 *   User:
 *    type: object
 *    required:
 *      - candidate_name
 *      - applied_for
 *      - owner
 *      - applied_date
 *      - star
 *      - stage
 *    properties:
 *                          candidate_name:
 *                              type: string
 *                          applied_for:
 *                              type: string
 *                          owner:
 *                              type: string
 *                          applied_date:
 *                              type: string
 *                          star:
 *                              type: string
 *                          stage:
 *                              type: string
 *
 */

/**
 * @swagger
 * tags:
 *  name: Candidate
 * /api/v1/candidate/{id}:
 *  get:
 *   security:
 *        - Bearer: []
 *   tags: [Candidate]
 *   summary: Get candidate by ID
 *   description: Get candidate data by ID
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the candidate
 *      example: id
 *   responses:
 *    200:
 *     description: success
 *    404:
 *     description: Id not found
 */

//get by ID
router.get("/api/v1/candidate/:id", auth, candidateController.getCandidateById);

/**
 * @swagger
 * tags:
 *  name: Candidate
 * /api/v1/candidate:
 *  post:
 *      security:
 *        - Bearer: []
 *      tags: [Candidate]
 *      summary: Add Candidate
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          candidate_name:
 *                             type: string
 *                          applied_for:
 *                             type: string
 *                          owner:
 *                             type: string
 *                          applied_date:
 *                             type: string
 *                          star:
 *                             type: string
 *                          stage:
 *                             type: string
 *      responses:
 *          200:
 *             description: A successful response
 *          default:
 *              description: This is the default response for it
 */

//post
router.post(
  "/api/v1/candidate",
  auth,
  candidateValidation(),
  validateSchema,
  candidateController.addCandidate
);
/**
 * @swagger
 * tags:
 *  name: Candidate
 * /api/v1/candidate/{id}:
 *  put:
 *   security:
 *        - Bearer: []
 *   tags: [Candidate]
 *   summary: update candidate
 *   description: update candidate
 *   consumes:
 *    - application/json
 *   produces:
 *    - applicatin/json
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the candidate
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *       type: object
 *       properties:
 *          candidate_name:
 *             type: string
 *          applied_for:
 *             type: string
 *          owner:
 *             type: string
 *          applied_date:
 *             type: string
 *          star:
 *             type: string
 *          stage:
 *             type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *        type: object
 *        properties:
 *          candidate_name:
 *             type: string
 *          applied_for:
 *             type: string
 *          owner:
 *             type: string
 *          applied_date:
 *             type: string
 *          star:
 *             type: string
 *          stage:
 *             type: string
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *          candidate_name:
 *             type: string
 *          applied_for:
 *             type: string
 *          owner:
 *             type: string
 *          applied_date:
 *             type: string
 *          star:
 *             type: string
 *          stage:
 *             type: string
 */

//put
router.put(
  "/api/v1/candidate/:id",
  auth,
  candidateValidation(),
  validateSchema,
  candidateController.patchCandidate
);
/**
 * @swagger
 * tags:
 *  name: User
 * /api/v1/user/{id}:
 *  delete:
 *   security:
 *        - Bearer: []
 *   tags: [User]
 *   summary: delete candiate
 *   description: delete candidate
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the candidate
 *   responses:
 *    200:
 *     description: success
 *    404:
 *     description: Id not found
 */

//delete
router.delete(
  "/api/v1/candidate/:id",
  auth,
  candidateController.deleteCandidate
);

/**
 * @swagger
 * tags:
 *  name: Candidate
 * /api/v1/candidate/{id}:
 *  patch:
 *   security:
 *        - Bearer: []
 *   tags: [User]
 *   summary: update candidate
 *   description: update candidate
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
 *      description: id of the candidate
 *      example: id
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *       type: object
 *       properties:
 *          candidate_name:
 *             type: string
 *          applied_for:
 *             type: string
 *          owner:
 *             type: string
 *          applied_date:
 *             type: string
 *          star:
 *             type: string
 *          stage:
 *             type: string   
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *        type: object
 *        properties:
 *          candidate_name:
 *             type: string
 *          applied_for:
 *             type: string
 *          owner:
 *             type: string
 *          applied_date:
 *             type: string
 *          star:
 *             type: string
 *          stage:
 *             type: string   
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *          candidate_name:
 *             type: string
 *          applied_for:
 *             type: string
 *          owner:
 *             type: string
 *          applied_date:
 *             type: string
 *          star:
 *             type: string
 *          stage:
 *             type: string        

 */

//patch
router.patch("/api/v1/candidate/:id", auth, candidateController.patchCandidate);

module.exports = router;
