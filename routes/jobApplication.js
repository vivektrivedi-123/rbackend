const applicationController = require("../controllers/applicationController");
const express = require("express");
const {
  appValidation,
  validateSchema,
} = require("../validation/appValidation");
const router = express.Router();
const auth = require("../middleware/auth");
const Application = require("../models/application");

/**
 * @swagger
 * tags:
 *  name: Application
 * /api/v1/application:
 *  get:
 *      security:
 *        - Bearer: []
 *      tags: [Application]
 *      summary: Get all application
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.get("/api/v1/application", auth, applicationController.getApplication);
/**
 * @swagger
 * tags:
 *  name: Application
 * /api/v1/application/{id}:
 *  get:
 *   security:
 *        - Bearer: []
 *   tags: [Application]
 *   summary: Get application by ID
 *   description: Get application data by ID
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the application
 *      example: id
 *   responses:
 *    200:
 *     description: success
 *    404:
 *     description: Id not found
 */
router.get(
  "/api/v1/application/:id",
  auth,
  applicationController.getApplicationById
);
/**
 * @swagger
 * tags:
 *  name: Application
 * /api/v1/application:
 *  post:
 *      security:
 *        - Bearer: []
 *      tags: [Application]
 *      summary: Add application
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: string
 *                          description: The auto-generated id of the role
 *                        job:
 *                          type: string
 *                          description: The job ID
 *                        forms:
 *                          type: string
 *                          description: The form ID
 *                        form_values:
 *                          type: Number
 *                          description: The value of the form
 *                          example: 1234
 *                        resume:
 *                          type: string
 *                          description: Applicant's resume
 *                          example: resume.pdf
 *                        origin:
 *                          type: string
 *                          description: Origin 
 *                        tags:
 *                          type: string
 *                          description: Applicant's Tags
 *                          example: #node #javascript
 *                        status:
 *                          type: string
 *                          description: Status of the applicant
 *                          example: active
 *                        overall_rating:
 *                          type: string
 *                          description: Applicant's Overall Rating
 *                          example: 4
 *                        lead_owner:
 *                          type: string
 *                          description: Lead owner of the applicant
 *                          example: Abcdef
 *                        is_deleted:
 *                          type: boolean
 *                          description: Is the applicant deleted?
 *                          example: true
 *                        is_blocked:
 *                          type: boolean
 *                          description: Is the applicant blocked?
 *                          example: false 
 *                        social_profiles:
 *                          type: string
 *                          description: Applicant's Social Profiles
 *                          example: LinkedIn account -abcdef 
 *                        refer_by:
 *                          type: string
 *                          description: Reference of the applicant
 *                          example: XYZ
 *                        add_to_talent_pool:
 *                          type: string
 *                          description: Add to talent pool
 *                          example: Yes
 *                         
 *      responses:
 *          200:
 *             description: A successful response
 *          default:
 *              description: This is the default response for it
 */
router.post(
  "/api/v1/application",
  auth,
  appValidation(),
  validateSchema,
  applicationController.addApplication
);
/**
 * @swagger
 * tags:
 *  name: Application
 * /api/v1/application/{id}:
 *  put:
 *   security:
 *        - Bearer: []
 *   tags: [Application]
 *   summary: update application
 *   description: update application
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
 *      description: id of the application
 *      example: 2
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *             id:
 *              type: string
 *              description: The auto-generated id of the role
 *             job:
 *              type: string
 *              description: The job ID
 *             forms:
 *              type: string
 *              description: The form ID
 *             form_values:
 *              type: Number
 *              description: The value of the form
 *              example: 1234
 *             resume:
 *               type: string
 *               description: Applicant's resume
 *               example: resume.pdf
 *             origin:
 *               type: string
 *               description: Origin 
 *             tags:
 *               type: string
 *               description: Applicant's Tags
 *               example: #node #javascript
 *             status:
 *               type: string
 *               description: Status of the applicant
 *               example: active
 *             overall_rating:
 *               type: string
 *               description: Applicant's Overall Rating
 *               example: 4
 *             lead_owner:
 *               type: string
 *               description: Lead owner of the applicant
 *               example: Abcdef
 *             is_deleted:
 *               type: boolean
 *               description: Is the applicant deleted?
 *               example: true
 *             is_blocked:
 *               type: boolean
 *               description: Is the applicant blocked?
 *               example: false 
 *             social_profiles:
 *               type: string
 *               description: Applicant's Social Profiles
 *               example: LinkedIn account -abcdef 
 *             refer_by:
 *               type: string
 *               description: Reference of the applicant
 *               example: XYZ
 *             add_to_talent_pool:
 *               type: string
 *               description: Add to talent pool
 *               example: Yes 
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *             id:
 *              type: string
 *              description: The auto-generated id of the role
 *             job:
 *              type: string
 *              description: The job ID
 *             forms:
 *              type: string
 *              description: The form ID
 *             form_values:
 *              type: Number
 *              description: The value of the form
 *              example: 1234
 *             resume:
 *               type: string
 *               description: Applicant's resume
 *               example: resume.pdf
 *             origin:
 *               type: string
 *               description: Origin 
 *             tags:
 *               type: string
 *               description: Applicant's Tags
 *               example: #node #javascript
 *             status:
 *               type: string
 *               description: Status of the applicant
 *               example: active
 *             overall_rating:
 *               type: string
 *               description: Applicant's Overall Rating
 *               example: 4
 *             lead_owner:
 *               type: string
 *               description: Lead owner of the applicant
 *               example: Abcdef
 *             is_deleted:
 *               type: boolean
 *               description: Is the applicant deleted?
 *               example: true
 *             is_blocked:
 *               type: boolean
 *               description: Is the applicant blocked?
 *               example: false 
 *             social_profiles:
 *               type: string
 *               description: Applicant's Social Profiles
 *               example: LinkedIn account -abcdef 
 *             refer_by:
 *               type: string
 *               description: Reference of the applicant
 *               example: XYZ
 *             add_to_talent_pool:
 *               type: string
 *               description: Add to talent pool
 *               example: Yes 
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *             id:
 *              type: string
 *              description: The auto-generated id of the role
 *             job:
 *              type: string
 *              description: The job ID
 *             forms:
 *              type: string
 *              description: The form ID
 *             form_values:
 *              type: Number
 *              description: The value of the form
 *              example: 1234
 *             resume:
 *               type: string
 *               description: Applicant's resume
 *               example: resume.pdf
 *             origin:
 *               type: string
 *               description: Origin 
 *             tags:
 *               type: string
 *               description: Applicant's Tags
 *               example: #node #javascript
 *             status:
 *               type: string
 *               description: Status of the applicant
 *               example: active
 *             overall_rating:
 *               type: string
 *               description: Applicant's Overall Rating
 *               example: 4
 *             lead_owner:
 *               type: string
 *               description: Lead owner of the applicant
 *               example: Abcdef
 *             is_deleted:
 *               type: boolean
 *               description: Is the applicant deleted?
 *               example: true
 *             is_blocked:
 *               type: boolean
 *               description: Is the applicant blocked?
 *               example: false 
 *             social_profiles:
 *               type: string
 *               description: Applicant's Social Profiles
 *               example: LinkedIn account -abcdef 
 *             refer_by:
 *               type: string
 *               description: Reference of the applicant
 *               example: XYZ
 *             add_to_talent_pool:
 *               type: string
 *               description: Add to talent pool
 *               example: Yes 
 */
router.put(
  "/api/v1/application/:id",
  auth,
  appValidation(),
  validateSchema,
  applicationController.updateApplication
);
/**
 * @swagger
 * tags:
 *  name: Application
 * /api/v1/application/{id}:
 *  delete:
 *   security:
 *        - Bearer: []
 *   tags: [Application]
 *   summary: delete application
 *   description: delete application
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the application
 *      example: 2
 *   responses:
 *    200:
 *     description: success
 *    404:
 *     description: Id not found
 */
router.delete(
  "/api/v1/application/:id",
  auth,
  applicationController.deleteApplication
);

module.exports = router;
