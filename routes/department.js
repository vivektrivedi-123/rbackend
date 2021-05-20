const deptController = require("../controllers/deptController");
const {
  deptValidation,
  validateSchema,
} = require("../validation/deptValidation");
const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();


/**
 * @swagger
 * tags :
 *  name: Department
 * /api/v1/department:
 *  get:
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
router.get("/api/v1/department/:id", auth, deptController.getDeptById);
/**
 * @swagger
 * tags:
 *  name: Department
 * /api/v1/department:
 *  post:
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
 *       type: integer
 *      required: true
 *      description: id of the department
 *      example: 2
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *             id:
 *              type: string
 *              description: The auto-generated id of the department
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
 *             id:
 *              type: string
 *              description: The auto-generated id of the department
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
 *             id:
 *              type: string
 *              description: The auto-generated id of the department
 *             location:
 *              type: string
 *              description: The location ID
 *             department_name:
 *              type: string
 *              description: The department name
 */
//update
router.put(
  "/api/v1/department/:id",
  auth,
  deptValidation(),
  validateSchema,
  deptController.updateDept
);
/**
 * @swagger
 * tags:
 *  name: Department
 * /api/v1/department/{id}:
 *  delete:
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
router.delete("/api/v1/department/:id", auth, deptController.deleteDept);
module.exports = router;
