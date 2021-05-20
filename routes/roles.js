const rolesController = require("../controllers/rolesController");
const express = require("express");
const {
  roleValidation,
  validateSchema,
} = require("../validation/rolesValidation");
const router = express.Router();
const auth = require("../middleware/auth");
const Role = require("../models/role");

/**
 * @swagger
 * tags:
 *  name: Role
 * /api/v1/role:
 *  get:
 *      tags: [Role]
 *      summary: Get all roles
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.get("/api/v1/role", auth, rolesController.getRoles);
/**
 * @swagger
 * tags:
 *  name: Role
 * /api/v1/role/{id}:
 *  get:
 *   tags: [Role]
 *   summary: Get role by ID
 *   description: Get role data by ID
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the role
 *      example: id
 *   responses:
 *    200:
 *     description: success
 *    404:
 *     description: Id not found
 */
router.get("/api/v1/role/:id", auth, rolesController.getRolesById);
/**
 * @swagger
 * tags:
 *  name: Role
 * /api/v1/role:
 *  post:
 *      tags: [Role]
 *      summary: Add role
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          role_name:
 *                              type: string
 *                              default: admin
 *      responses:
 *          200:
 *             description: A successful response
 *          default:
 *              description: This is the default response for it
 */
router.post(
  "/api/v1/role",
  auth,
  roleValidation(),
  validateSchema,
  rolesController.addRoles
);
/**
 * @swagger
 * tags:
 *  name: Role
 * /api/v1/role/{id}:
 *  put:
 *   tags: [Role]
 *   summary: update role
 *   description: update role
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
 *      description: id of the role
 *      example: 2
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *             id:
 *              type: string
 *              description: The auto-generated id of the role
 *             role_name:
 *              type: string
 *              description: The role name
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *             id:
 *              type: string
 *              description: The auto-generated id of the role
 *             role_name:
 *              type: string
 *              description: The role name         
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *             id:
 *              type: string
 *              description: The auto-generated id of the role
 *             role_name:
 *              type: string
 *              description: The role name
 */
router.put(
  "/api/v1/role/:id",
  auth,
  roleValidation(),
  validateSchema,
  rolesController.updateRoles
);
/**
 * @swagger
 * tags:
 *  name: Role
 * /api/v1/role/{id}:
 *  delete:
 *   tags: [Role]
 *   summary: delete role
 *   description: delete role
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the role
 *      example: 2
 *   responses:
 *    200:
 *     description: success
 *    404:
 *     description: Id not found
 */
router.delete("/api/v1/role/:id", auth, rolesController.deleteRoles);
module.exports = router;
