const commentController = require("../controllers/commentController");
const express = require("express");
const {
  commentValidation,
  validateSchema,
} = require("../validation/commentValidation");
const router = express.Router();
const auth = require("../middleware/auth");
const Comment = require("../models/comments");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./attachments");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const attachments = multer({ storage: storage }).array("attachments", 4);
/**
 * @swagger
 * components:
 *  schemas:
 *   Comment:
 *    type: object
 *    required:
 *      - application
 *      - comments
 *      - attachments
 *      - status
 *    properties:
 *                           id:
 *                            type: string
 *                            description: The auto-generated id of the comment
 *                           application:
 *                            type: string
 *                            description: The ID of the application
 *                           comments:
 *                            type: string
 *                            description: The comments for the job
 *                           attachments:
 *                            type: string
 *                            description: The attachments for the comments
 *                           status:
 *                            type: boolean
 *                            description: The status of the comment
 *
 */

/**
 * @swagger
 * tags:
 *  name: Comment
 * /api/v1/comment:
 *  get:
 *      security:
 *        - Bearer: []
 *      tags: [Comment]
 *      summary: Get all comments
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.get("/api/v1/comment",auth,  commentController.getComment);
/**
 * @swagger
 * tags:
 *  name: Comment
 * /api/v1/comment/{id}:
 *  get:
 *   security:
 *        - Bearer: []
 *   tags: [Comment]
 *   summary: Get comment by ID
 *   description: Get comment data by ID
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the comment
 *      example: id
 *   responses:
 *    200:
 *     description: success
 *    404:
 *     description: Id not found
 */
router.get("/api/v1/comment/:id", auth, commentController.getCommentById);
/**
 * @swagger
 * tags:
 *  name: Comment
 * /api/v1/comment:
 *  post:
 *      security:
 *        - Bearer: []
 *      tags: [Comment]
 *      summary: Add comment
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                           application:
 *                            type: string
 *                            description: The ID of the application
 *                           comments:
 *                            type: string
 *                            description: The comments for the job
 *                           attachments:
 *                            type: string
 *                            description: The attachments for the comments
 *                           status:
 *                            type: boolean
 *                            description: The status of the comment
 *      responses:
 *          200:
 *             description: A successful response
 *          default:
 *              description: This is the default response for it
 */
router.post(
  "/api/v1/comment",
  auth,
  attachments,
  commentValidation(),
  validateSchema,
  commentController.addComment
);
/**
 * @swagger
 * tags:
 *  name: Comment
 * /api/v1/comment/{id}:
 *  put:
 *   security:
 *        - Bearer: []
 *   tags: [Comment]
 *   summary: update comment
 *   description: update comment
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
 *      description: id of the comment
 *      example: 2
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *         type: object
 *         properties:
 *             application:
 *              type: string
 *              description: The ID of the application
 *             comments:
 *              type: string
 *              description: The comments for the job
 *             attachments:
 *              type: string
 *              description: The attachments for the comments
 *             status:
 *              type: boolean
 *              description: The status of the comment
 *   requestBody:
 *    content:
 *     multipart/form-data:
 *      schema:
 *         type: object
 *         properties:
 *             application:
 *              type: string
 *              description: The ID of the application
 *             comments:
 *              type: string
 *              description: The comments for the job
 *             attachments:
 *              type: string
 *              description: The attachments for the comments
 *             status:
 *              type: boolean
 *              description: The status of the comment
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      multipart/form-data:
 *       schema:
 *          type: object
 *          properties:
 *             application:
 *              type: string
 *              description: The ID of the application
 *             comments:
 *              type: string
 *              description: The comments for the job
 *             attachments:
 *              type: string
 *              description: The attachments for the comments
 *             status:
 *              type: boolean
 *              description: The status of the comment
 */
router.put(
  "/api/v1/comment/:id",
  auth,
  attachments,
  commentValidation(),
  validateSchema,
  commentController.putComment
);
/**
 * @swagger
 * tags:
 *  name: Comment
 * /api/v1/comment/{id}:
 *  delete:
 *   security:
 *        - Bearer: []
 *   tags: [Comment]
 *   summary: delete comment
 *   description: delete comment
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the comment
 *      example: 2
 *   responses:
 *    200:
 *     description: success
 *    404:
 *     description: Id not found
 */
router.delete("/api/v1/comment/:id", auth, commentController.deleteComment);

/**
 * @swagger
 * tags:
 *  name: Comment
 * /api/v1/comment/{id}:
 *  patch:
 *   security:
 *        - Bearer: []
 *   tags: [Comment]
 *   summary: update comment
 *   description: update comment
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
 *      description: id of the comment
 *      example: 2
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *         type: object
 *         properties:
 *             application:
 *              type: string
 *              description: The ID of the application
 *             comments:
 *              type: string
 *              description: The comments for the job
 *             attachments:
 *              type: string
 *              description: The attachments for the comments
 *             status:
 *              type: boolean
 *              description: The status of the comment
 *   requestBody:
 *    content:
 *     multipart/form-data:
 *      schema:
 *         type: object
 *         properties:
 *             application:
 *              type: string
 *              description: The ID of the application
 *             comments:
 *              type: string
 *              description: The comments for the job
 *             attachments:
 *              type: string
 *              description: The attachments for the comments
 *             status:
 *              type: boolean
 *              description: The status of the comment
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      multipart/form-data:
 *       schema:
 *          type: object
 *          properties:
 *             application:
 *              type: string
 *              description: The ID of the application
 *             comments:
 *              type: string
 *              description: The comments for the job
 *             attachments:
 *              type: string
 *              description: The attachments for the comments
 *             status:
 *              type: boolean
 *              description: The status of the comment
 */

//patch
router.patch(
  "/api/v1/comment/:id",
  auth,
  attachments,
  commentController.patchComment
);
module.exports = router;
