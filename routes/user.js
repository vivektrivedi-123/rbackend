const userController = require("../controllers/userController");
const express = require("express");
const {
  userValidation,
  validateSchema,
} = require("../validation/userValidation");
const router = express.Router();
const swagger = require("swagger-ui-express");
const auth = require("../middleware/auth");
const company = require("../models/company");
const user = require("../models/user");
const role = require("../models/role");
const multer = require("multer");
const app = express();
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/PNG" ||
      file.mimetype == "image/JPG" ||
      file.mimetype == "image/JPEG"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
}).single("profile_image");

/**
 * @swagger
 * components:
 *  schemas:
 *   User:
 *    type: object
 *    required:
 *      - company
 *      - role
 *      - first_name
 *      - last_name
 *      - mobile_number
 *      - profile_image
 *      - email
 *      - password
 *    properties:
 *                          company:
 *                              type: string
 *                              description: ID of the company
 *                          role:
 *                              type: string
 *                              description: ID of the role
 *                          id:
 *                              type: string
 *                              description: Auto-Generated ID of User
 *                          first_name:
 *                              type: string
 *                              default: Apurva
 *                          last_name:
 *                              type: string
 *                              default: Jaitly
 *                          mobile_number:
 *                              type: integer
 *                              default: 8765759456
 *                          profile_image:
 *                              type: string
 *                              default: pic.jpg
 *                          email:
 *                              type: string
 *                              default: apurva@gmail.com
 *                          password:
 *                              type: string
 *                              default: apurva1234
 *
 */
/**
 * @swagger
 * tags:
 *  name: User
 * /api/v1/user:
 *  get:
 *      security:
 *        - Bearer: []
 *      tags: [User]
 *      summary: Get all users
 *      responses:
 *          default:
 *              description: This is the default response for it
 */

//get all
router.get("/api/v1/user", auth, userController.getUser);
/**
 * @swagger
 * tags:
 *  name: User
 * /api/v1/user/{id}:
 *  get:
 *   security:
 *        - Bearer: []
 *   tags: [User]
 *   summary: Get user by ID
 *   description: Get user data by ID
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the user
 *      example: id
 *   responses:
 *    200:
 *     description: success
 *    404:
 *     description: Id not found
 */
//get by ID
router.get("/api/v1/user/:id", auth, userController.getUserById);
//getMe
// router.get("/api/v1/user/me", auth, userController.getMe);
/**
 * @swagger
 *  tags:
 *  name: Access
 * /api/v1/userLogin:
 *  post:
 *      security:
 *        - Bearer: []
 *      tags: [Access]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          company:
 *                              type: string
 *                              description: ID of the company
 *                          email:
 *                              type: string
 *                              default: apurvajaitly@gmail.com
 *                          password:
 *                              type: string
 *                              default: apurva12
 *      responses:
 *          200:
 *              description: Token
 *          default:
 *              description: This is the default response for it
 */
//login user
router.post("/api/v1/userLogin", userController.userLogin);

/**
 * @swagger
 * tags:
 *  name: User
 * /api/v1/user:
 *  post:
 *      security:
 *        - Bearer: []
 *      tags: [User]
 *      summary: Add user
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          company:
 *                              type: string
 *                              description: ID of the company
 *                              example: 2
 *                          role:
 *                              type: string
 *                              description: ID of the role
 *                              example: 2
 *                          first_name:
 *                              type: string
 *                              default: Apurva
 *                          last_name:
 *                              type: string
 *                              default: Jaitly
 *                          mobile_number:
 *                              type: integer
 *                              default: 8765759456
 *                          profile_image:
 *                              type: string
 *                              default: logo.jpeg
 *                          email:
 *                              type: string
 *                              default: apurva@gmail.com
 *                          password:
 *                              type: string
 *                              default: apurva133
 *      responses:
 *          200:
 *             description: Success
 *          default:
 *              description: This is the default response for it
 */

//post
router.post(
  "/api/v1/user",
  auth,
  upload,
  userValidation(),
  validateSchema,
  userController.addUser
);
/**
 * @swagger
 * tags:
 *  name: User
 * /api/v1/user/{id}:
 *  put:
 *   security:
 *        - Bearer: []
 *   tags: [User]
 *   summary: update user
 *   description: update user
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
 *      description: id of the user
 *      example: id
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *       type: object
 *       properties:
 *          company:
 *              type: string
 *              description: ID of the company
 *          role:
 *              type: string
 *              description: ID of the role
 *          first_name:
 *              type: string
 *              default: Apurva
 *          last_name:
 *              type: string
 *              default: Jaitly
 *          mobile_number:
 *              type: integer
 *              default: 9878765689
 *          email:
 *              type: string
 *              default: apurva@gmail.com
 *          profile_image:
 *              type: string
 *              default: abcd.jpeg
 *   requestBody:
 *    content:
 *     multipart/form-data:
 *      schema:
 *        type: object
 *        properties:
 *          company:
 *              type: string
 *              description: ID of the company
 *          role:
 *              type: string
 *              description: ID of the role
 *          first_name:
 *              type: string
 *              default: Apurva
 *          last_name:
 *              type: string
 *              default: Jaitly
 *          mobile_number:
 *              type: integer
 *              default: 9878765689
 *          email:
 *              type: string
 *              default: apurva@gmail.com
 *          profile_image:
 *              type: string
 *              default: abcd.jpeg
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      multipart/form-data:
 *       schema:
 *        type: object
 *        properties:
 *          company:
 *             type: string
 *             description: ID of the company
 *          role:
 *             type: string
 *             description: ID of the role
 *          first_name:
 *             type: string
 *             default: Apurva
 *          last_name:
 *             type: string
 *             default: Jaitly
 *          mobile_number:
 *             type: integer
 *             default: 9878765689
 *          email:
 *             type: string
 *             default: apurva@gmail.com
 *          profile_image:
 *             type: string
 *             default: abcd.jpeg
 */

//put
router.put(
  "/api/v1/user/:id",
  auth,
  upload,
  userValidation(),
  validateSchema,
  userController.putUser
);
/**
 * @swagger
 * tags:
 *  name: User
 * /api/v1/user/{id}:
 *  delete:
 *   security:
 *        - Bearer: []
 *   tags: [User]
 *   summary: delete user
 *   description: delete user
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the user
 *      example: 2
 *   responses:
 *    200:
 *     description: success
 *    404:
 *     description: Id not found
 */

//delete
router.delete("/api/v1/user/:id", auth, userController.deleteUser);

//patch
router.patch(
  "/api/v1/user/:id",
  auth,
  upload,
  userController.patchUser
);
module.exports = router;
