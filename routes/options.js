const optionsController = require("../controllers/optionsController");
const express = require("express");
const {
  optionsValidation,
  validateSchema,
} = require("../validation/optionsValidation");
const router = express.Router();
const auth = require("../middleware/auth");
const Options = require("../models/options");
/**
 * @swagger
 * components:
 *  schemas:
 *   Options:
 *    type: object
 *    requires:
 *     - option_key
 *     - option_value
 *     - location
 *    properties:
 *             id:
 *              type: string
 *              description: The auto-generated id of the role
 *             option_key:
 *              type: number
 *             option_value:
 *              type: number
 *             location:
 *              type: string
 *      
 */
/**
 * @swagger
 * tags:
 *  name: Options
 * /api/v1/option:
 *  get:
 *      security:
 *        - Bearer: []
 *      tags: [Options]
 *      summary: Get all Options
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.get("/api/v1/option", auth, optionsController.getOptions);
/**
 * @swagger
 * tags:
 *  name: Options
 * /api/v1/option/{id}:
 *  get:
 *   security:
 *        - Bearer: []
 *   tags: [Options]
 *   summary: Get options by ID
 *   description: Get options data by ID
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the option
 *      example: id
 *   responses:
 *    200:
 *     description: success
 *    404:
 *     description: Id not found
 */
router.get("/api/v1/option/:id", auth, optionsController.getOptionsById);
/**
 * @swagger
 * tags:
 *  name: Options
 * /api/v1/option:
 *  post:
 *      security:
 *        - Bearer: []
 *      tags: [Options]
 *      summary: Add option
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          option_key:
 *                              type: number
 *                          option_value:
 *                              type: number
 *                          location:
 *                              type: string
 *      responses:
 *          200:
 *             description: A successful response
 *          default:
 *              description: This is the default response for it
 */
router.post(
  "/api/v1/option",
  auth,
  optionsValidation(),
  validateSchema,
  optionsController.addOptions
);
/**
 * @swagger
 * tags:
 *  name: Options
 * /api/v1/option/{id}:
 *  put:
 *   security:
 *        - Bearer: []
 *   tags: [Options]
 *   summary: update options
 *   description: update options
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
 *      description: id of the options
 *      example: 2
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *         type: object
 *         properties:
 *             id:
 *              type: string
 *              description: The auto-generated id of the role
 *             option_key:
 *              type: number
 *             option_value:
 *              type: number
 *             location:
 *              type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *         type: object
 *         properties:
 *             id:
 *              type: string
 *              description: The auto-generated id of the role
 *             option_key:
 *              type: number
 *             option_value:
 *              type: number
 *             location:
 *              type: string
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *          type: object
 *          properties:
 *             id:
 *              type: string
 *              description: The auto-generated id of the role
 *             option_key:
 *              type: number
 *             option_value:
 *              type: number
 *             location:
 *              type: string
 */
router.put(
  "/api/v1/option/:id",
  auth,
  optionsValidation(),
  validateSchema,
  optionsController.updateOptions
);
/**
 * @swagger
 * tags:
 *  name: Options
 * /api/v1/option/{id}:
 *  delete:
 *   security:
 *        - Bearer: []
 *   tags: [Options]
 *   summary: delete options
 *   description: delete options
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the options
 *      example: 2
 *   responses:
 *    200:
 *     description: success
 *    404:
 *     description: Id not found
 */
router.delete("/api/v1/option/:id", auth, optionsController.deleteOptions);
module.exports = router;
