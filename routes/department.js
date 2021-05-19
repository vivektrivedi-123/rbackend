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
 *   definitions:
 *     Department:
 *         type: object
 *         properties:
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

/**
 * @swagger
 * /api/v1/department:
 *  get:
 *      summary: Get all departments
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.get("/api/v1/department", auth, deptController.getDept);
/**
 * @swagger
 * /api/v1/department/{id}:
 *  get:
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
 * /api/v1/department:
 *  post:
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
 * /api/v1/department/{id}:
 *  put:
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
 *       $ref: '#/definitions/Department'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Department'
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/Department'
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
 * /api/v1/department/{id}:
 *  delete:
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
