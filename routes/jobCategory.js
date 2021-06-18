const categoryController = require("../controllers/categoryController");
const express = require("express");
const auth = require("../middleware/auth");
const category = require("../models/category");
const {
  categoryValidation,
  validateSchema,
} = require("../validation/categoryValidation");
const isValid = require("../middleware/validID")
const router = express.Router();
/**
 * @swagger
 * components:
 *  schemas:
 *   Category:
 *    type: object
 *    required:
 *     - location
 *     - category
 *     - status
 *    properties:
 *                          id:
 *                            type: string
 *                            description: The auto-generated id of the Category
 *                          location:
 *                            type: string
 *                            description: The ID of the location
 *                          category:
 *                            type: string
 *                            description: The category in the company
 *                          status:
 *                            type: string
 *                            description: The status of the category
 *
 */
/**
 * @swagger
 * tags:
 *  name: Category
 * /api/v1/category:
 *  get:
 *      security:
 *        - Bearer: []
 *      tags: [Category]
 *      summary: Get all categories
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.get("/api/v1/category", auth, categoryController.getCategory);
/**
 * @swagger
 * tags:
 *  name: Category
 * /api/v1/category/{id}:
 *  get:
 *   security:
 *        - Bearer: []
 *   tags: [Category]
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
router.get("/api/v1/category/:id", auth, isValid, categoryController.getCategoryById);
/**
 * @swagger
 * tags:
 *  name: Category
 * /api/v1/category:
 *  post:
 *      security:
 *        - Bearer: []
 *      tags: [Category]
 *      summary: Add category
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
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
 * tags:
 *  name: Category
 * /api/v1/category/{id}:
 *  put:
 *   security:
 *        - Bearer: []
 *   tags: [Category]
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
 *       type: string
 *      required: true
 *      description: id of the category
 *      example: 2
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *         type: object
 *         properties:
 *             location:
 *              type: string
 *              description: The ID of the location
 *             category:
 *              type: string
 *              description: The category in the company
 *             status:
 *              type: string
 *              description: The status of the category
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *         type: object
 *         properties:
 *             location:
 *              type: string
 *              description: The ID of the location
 *             category:
 *              type: string
 *              description: The category in the company
 *             status:
 *              type: string
 *              description: The status of the category
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *          type: object
 *          properties:
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
router.put(
  "/api/v1/category/:id",
  auth, isValid,
  categoryValidation(),
  validateSchema,
  categoryController.putCategory
);
/**
 * @swagger
 * tags:
 *  name: Category
 * /api/v1/category/{id}:
 *  delete:
 *   security:
 *        - Bearer: []
 *   tags: [Category]
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
router.delete("/api/v1/category/:id", auth, isValid, categoryController.deleteCategory);

/**
 * @swagger
 * tags:
 *  name: Category
 * /api/v1/category/{id}:
 *  patch:
 *   security:
 *        - Bearer: []
 *   tags: [Category]
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
 *       type: string
 *      required: true
 *      description: id of the category
 *      example: 2
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *         type: object
 *         properties:
 *             location:
 *              type: string
 *              description: The ID of the location
 *             category:
 *              type: string
 *              description: The category in the company
 *             status:
 *              type: string
 *              description: The status of the category
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *         type: object
 *         properties:
 *             location:
 *              type: string
 *              description: The ID of the location
 *             category:
 *              type: string
 *              description: The category in the company
 *             status:
 *              type: string
 *              description: The status of the category
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *          type: object
 *          properties:
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

//patch
router.patch("/api/v1/category/:id", auth,isValid, categoryController.patchCategory);

module.exports = router;
