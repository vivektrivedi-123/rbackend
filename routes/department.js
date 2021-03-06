const deptController = require("../controllers/deptController");
const {
  deptValidation,
  validateSchema,
} = require("../validation/deptValidation");
const express = require("express");
const auth = require("../middleware/auth");
const isValid = require("../middleware/validID")
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   Department:
 *    type: object
 *    required:
 *     - location
 *     - department_name
 *    properties:
 *                          id:
 *                            type: string
 *                            description: Auto-Generated ID of Department
 *                          location:
 *                            type: string
 *                            description: The location ID
 *                          department_name:
 *                            type: string
 *                            description: The department name
 */

/**
 * @swagger
 * tags :
 *  name: Department
 * /api/v1/department:
 *  get:
 *      security:
 *        - Bearer: []
 *      tags: [Department]
 *      summary: Get all departments
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.get("/api/v1/department", auth, deptController.getDept);
/**
 * @swagger
 * tags:
 *  name: Department
 * /api/v1/department/{id}:
 *  get:
 *   security:
 *        - Bearer: []
 *   tags: [Department]
 *   summary: Get department by ID
 *   description: Get department data by ID
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the department
 *      example: id
 *   responses:
 *    200:
 *     description: success
 *    404:
 *     description: Id not found
 */
//get all
router.get("/api/v1/department/:id", auth, isValid, deptController.getDeptById);
/**
 * @swagger
 * tags:
 *  name: Department
 * /api/v1/department:
 *  post:
 *      security:
 *        - Bearer: []
 *      tags: [Department]
 *      summary: Add Department
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          location:
 *                            type: string
 *                            description: The location ID
 *                          department_name:
 *                            type: string
 *                            description: The department name
 *      responses:
 *          200:
 *             description: A successful response
 *          default:
 *              description: This is the default response for it
 */
//post
router.post(
  "/api/v1/department",
  auth,
  deptValidation(),
  validateSchema,
  deptController.addDept
);

/**
 * @swagger
 * tags:
 *  name: Department
 * /api/v1/department/{id}:
 *  put:
 *   security:
 *        - Bearer: []
 *   tags: [Department]
 *   summary: update department
 *   description: update department
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
 *      description: id of the department
 *      example: 2
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *        type: object
 *        properties:
 *             location:
 *              type: string
 *              description: The location ID
 *             department_name:
 *              type: string
 *              description: The department name
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *        type: object
 *        properties:
 *             location:
 *              type: string
 *              description: The location ID
 *             department_name:
 *              type: string
 *              description: The department name
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *             location:
 *              type: string
 *              description: The location ID
 *             department_name:
 *              type: string
 *              description: The department name
 */
//put
router.put(
  "/api/v1/department/:id",
  auth, isValid,
  deptValidation(),
  validateSchema,
  deptController.putDept
);
/**
 * @swagger
 * tags:
 *  name: Department
 * /api/v1/department/{id}:
 *  delete:
 *   security:
 *        - Bearer: []
 *   tags: [Department]
 *   summary: delete department
 *   description: delete department
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the department
 *      example: 2
 *   responses:
 *    200:
 *     description: success
 *    404:
 *     description: Id not found
 */
//delete
router.delete("/api/v1/department/:id", auth,isValid, deptController.deleteDept);

/**
 * @swagger
 * tags:
 *  name: Department
 * /api/v1/department/{id}:
 *  patch:
 *   security:
 *        - Bearer: []
 *   tags: [Department]
 *   summary: update department
 *   description: update department
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
 *      description: id of the department
 *      example: 2
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *        type: object
 *        properties:
 *             location:
 *              type: string
 *              description: The location ID
 *             department_name:
 *              type: string
 *              description: The department name
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *        type: object
 *        properties:
 *             location:
 *              type: string
 *              description: The location ID
 *             department_name:
 *              type: string
 *              description: The department name
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *             location:
 *              type: string
 *              description: The location ID
 *             department_name:
 *              type: string
 *              description: The department name
 */

//patch
router.patch(
  "/api/v1/department/:id",
  auth, isValid,
  deptController.patchDept
);
module.exports = router;
