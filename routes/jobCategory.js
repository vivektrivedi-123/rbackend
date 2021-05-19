const categoryController = require("../controllers/categoryController");
const express = require("express");
const auth = require("../middleware/auth");
const category = require("../models/category");
const {
  categoryValidation,
  validateSchema,
} = require("../validation/categoryValidation");
const router = express.Router();
/**
 * @swagger
 *   definitions:
 *     Category:
 *         type: object
 *         properties:
 *             id:
 *              type: string
 *              description: The auto-generated id of the role
 *             location:
 *              type: string
 *              description: The ID of the location 
 *             category:
 *              type: string
 *              description: The category in the company
 *             status:
 *              type: string
 *              description: The status of the category
 */

/**
 * @swagger
 *  description: This is for the main data
 * /api/v1/category:
 *  get:
 *      summary: Get all categories
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.get("/api/v1/category", auth, categoryController.getCategory);
/**
 * @swagger
 * /api/v1/category/{id}:
 *  get:
 *   summary: Get category by ID
 *   description: Get category data by ID
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the category
 *      example: id
 *   responses:
 *    200:
 *     description: success
 *    404:
 *     description: Id not found
 */
router.get("/api/v1/category/:id", auth, categoryController.getCategoryById);
/**
 * @swagger
 * /api/v1/category:
 *  post:
 *      summary: Add category
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                            type: string
 *                            description: The auto-generated id of the role
 *                          location:
 *                            type: string
 *                            description: The ID of the location 
 *                          category:
 *                            type: string
 *                            description: The category in the company
 *                          status:
 *                            type: string
 *                            description: The status of the category
 *      responses:
 *          200:
 *             description: A successful response
 *          default:
 *              description: This is the default response for it
 */
router.post(
  "/api/v1/category",
  auth,
  categoryValidation(),
  validateSchema,
  categoryController.addCategory
);
/**
 * @swagger
 * /api/v1/category/{id}:
 *  put:
 *   summary: update category
 *   description: update category
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
 *      description: id of the category
 *      example: 2
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *       $ref: '#/definitions/Category'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Category'
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/Category'
 */
router.put(
  "/api/v1/category/:id",
  auth,
  categoryValidation(),
  validateSchema,
  categoryController.updateCategory
);
/**
 * @swagger
 * /api/v1/category/{id}:
 *  delete:
 *   summary: delete category
 *   description: delete category
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the category
 *      example: 2
 *   responses:
 *    200:
 *     description: success
 *    404:
 *     description: Id not found
 */
router.delete("/api/v1/category/:id", auth, categoryController.deleteCategory);

module.exports = router;
