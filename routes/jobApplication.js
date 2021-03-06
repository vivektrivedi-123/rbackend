const applicationController = require("../controllers/applicationController");
const express = require("express");
const {
  appValidation,
  validateSchema,
} = require("../validation/appValidation");
const router = express.Router();
const auth = require("../middleware/auth");
const isValid = require("../middleware/validID")
const Application = require("../models/application");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./resume");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const resume = multer({ storage: storage }).single("resume");

/**
 * @swagger
 * components:
 *  schemas:
 *   Application:
 *    type: object
 *    required:
 *     - job
 *     - forms
 *     - form_values
 *     - resume
 *     - origin
 *     - tags
 *     - status
 *     - overall_rating
 *     - lead_owner
 *     - is_deleted
 *     - is_blocked
 *     - social_profiles
 *     - refer_by
 *     - add_to_talent_pool
 *    properties:
 *                        id:
 *                          type: string
 *                          description: Auto-Generated ID of Application
 *                        job:
 *                          type: string
 *                          description: The job ID
 *                        forms:
 *                          type: string
 *                          description: The form ID
 *                        form_values:
 *                          type: string
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
 *                          type: integer
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
 */

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

//get all
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

//get by ID
router.get(
  "/api/v1/application/:id",
  auth, isValid,
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
 *      summary: Add Application
 *      requestBody:
 *       required: true
 *       content:
 *        multipart/form-data:
 *            schema:
 *                type: object
 *                properties:
 *                    job:
 *                     type: string
 *                     description: The job ID
 *                    forms:
 *                     type: string
 *                     description: The form ID
 *                    form_values:
 *                     type: string
 *                     description: The value of the form
 *                     example: 1234
 *                    resume:
 *                      type: string
 *                      description: Applicant's resume
 *                      example: resume.pdf
 *                    origin:
 *                      type: string
 *                      description: Origin
 *                    tags:
 *                      type: string
 *                      description: Applicant's Tags
 *                      example: #node #javascript
 *                    status:
 *                      type: string
 *                      description: Status of the applicant
 *                      example: active
 *                    overall_rating:
 *                      type: integer
 *                      description: Applicant's Overall Rating
 *                      example: 4
 *                    lead_owner:
 *                      type: string
 *                      description: Lead owner of the applicant
 *                      example: Abcdef
 *                    is_deleted:
 *                      type: boolean
 *                      description: Is the applicant deleted?
 *                      example: true
 *                    is_blocked:
 *                      type: boolean
 *                      description: Is the applicant blocked?
 *                      example: false
 *                    social_profiles:
 *                      type: string
 *                      description: Applicant's Social Profiles
 *                      example: LinkedIn account -abcdef
 *                    refer_by:
 *                      type: string
 *                      description: Reference of the applicant
 *                      example: XYZ
 *                    add_to_talent_pool:
 *                      type: string
 *                      description: Add to talent pool
 *                      example: Yes
 *      responses:
 *          200:
 *             description: Success
 *          default:
 *              description: This is the default response for it
 */
//post
router.post(
  "/api/v1/application",
  auth,
  resume,
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
 *    - multipart/form-data
 *   produces:
 *    - multipart/form-data
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the application
 *      example: 2
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *         type: object
 *         properties:
 *             job:
 *              type: string
 *              description: The job ID
 *             forms:
 *              type: string
 *              description: The form ID
 *             form_values:
 *              type: string
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
 *               type: integer
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
 *     multipart/form-data:
 *      schema:
 *         type: object
 *         properties:
 *             job:
 *              type: string
 *              description: The job ID
 *             forms:
 *              type: string
 *              description: The form ID
 *             form_values:
 *              type: string
 *              description: The value of the form
 *              example: 1234
 *             resume:
 *              type: string
 *              description: Applicant's resume
 *              example: resume.pdf
 *             origin:
 *              type: string
 *              description: Origin
 *             tags:
 *              type: string
 *              description: Applicant's Tags
 *              example: #node #javascript
 *             status:
 *              type: string
 *              description: Status of the applicant
 *              example: active
 *             overall_rating:
 *              type: integer
 *              description: Applicant's Overall Rating
 *              example: 4
 *             lead_owner:
 *              type: string
 *              description: Lead owner of the applicant
 *              example: Abcdef
 *             is_deleted:
 *              type: boolean
 *              description: Is the applicant deleted?
 *              example: true
 *             is_blocked:
 *              type: boolean
 *              description: Is the applicant blocked?
 *              example: false
 *             social_profiles:
 *              type: string
 *              description: Applicant's Social Profiles
 *              example: LinkedIn account -abcdef
 *             refer_by:
 *              type: string
 *              description: Reference of the applicant
 *              example: XYZ
 *             add_to_talent_pool:
 *              type: string
 *              description: Add to talent pool
 *              example: Yes
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      multipart/form-data:
 *       schema:
 *          type: object
 *          properties:
 *             job:
 *              type: string
 *              description: The job ID
 *             forms:
 *              type: string
 *              description: The form ID
 *             form_values:
 *              type: integer
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
 *               type: integer
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

//put
router.put(
  "/api/v1/application/:id",
  auth,
  isValid,
  resume,
  appValidation(),
  validateSchema,
  applicationController.putApplication
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

//delete
router.delete(
  "/api/v1/application/:id",
  auth,isValid,
  applicationController.deleteApplication
);

/**
 * @swagger
 * tags:
 *  name: Application
 * /api/v1/application/{id}:
 *  patch:
 *   security:
 *        - Bearer: []
 *   tags: [Application]
 *   summary: update application
 *   description: update application
 *   consumes:
 *    - multipart/form-data
 *   produces:
 *    - multipart/form-data
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the application
 *      example: 2
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *         type: object
 *         properties:
 *             job:
 *              type: string
 *              description: The job ID
 *             forms:
 *              type: string
 *              description: The form ID
 *             form_values:
 *              type: string
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
 *               type: integer
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
 *     multipart/form-data:
 *      schema:
 *         type: object
 *         properties:
 *             job:
 *              type: string
 *              description: The job ID
 *             forms:
 *              type: string
 *              description: The form ID
 *             form_values:
 *              type: string
 *              description: The value of the form
 *              example: 1234
 *             resume:
 *              type: string
 *              description: Applicant's resume
 *              example: resume.pdf
 *             origin:
 *              type: string
 *              description: Origin
 *             tags:
 *              type: string
 *              description: Applicant's Tags
 *              example: #node #javascript
 *             status:
 *              type: string
 *              description: Status of the applicant
 *              example: active
 *             overall_rating:
 *              type: integer
 *              description: Applicant's Overall Rating
 *              example: 4
 *             lead_owner:
 *              type: string
 *              description: Lead owner of the applicant
 *              example: Abcdef
 *             is_deleted:
 *              type: boolean
 *              description: Is the applicant deleted?
 *              example: true
 *             is_blocked:
 *              type: boolean
 *              description: Is the applicant blocked?
 *              example: false
 *             social_profiles:
 *              type: string
 *              description: Applicant's Social Profiles
 *              example: LinkedIn account -abcdef
 *             refer_by:
 *              type: string
 *              description: Reference of the applicant
 *              example: XYZ
 *             add_to_talent_pool:
 *              type: string
 *              description: Add to talent pool
 *              example: Yes
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      multipart/form-data:
 *       schema:
 *          type: object
 *          properties:
 *             job:
 *              type: string
 *              description: The job ID
 *             forms:
 *              type: string
 *              description: The form ID
 *             form_values:
 *              type: integer
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
 *               type: integer
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

//patch
router.patch(
  "/api/v1/application/:id",
  auth, isValid,
  resume,
  applicationController.patchApplication
);

module.exports = router;
