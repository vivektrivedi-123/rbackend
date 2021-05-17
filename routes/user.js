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
const Comp = require("../models/user");
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
 * definitions:
 *  User:
 *   type: object
 *   properties:
 *    company:
 *     type: string
 *     description: name of the company
 *     example: 'Rudra Innovative Software'
 *    role:
 *     type: string
 *     description:Role of the user
 *     example: 'User/Admin'
 *    first_name:
 *     type: string
 *     description: First_name of the user
 *     example: 'Anmol'
 *    last_name:
 *     type: string
 *     description: Last name of the user
 *     example: 'Sharma'
 *    email:
 *     type: string
 *     description: Email of the User
 *     example: 'anmol@gmail.com'
 *    password:
 *     type: string
 *     description: password of the user
 *    mobile_number:
 *     type:number
 *     description:Mobile NUmber of the user
 *    profile_image:
 *     type:string
 *     description:Profile Picture of the user
 */

//get all
router.get("/api/v1/user", auth, userController.getUser);
//get by ID
router.get("/api/v1/user/:id", auth, userController.getUserById);
//getMe
router.get("/api/v1/user/me", auth, userController.getMe);
//login user
router.post("/api/v1/userLogin", userController.userLogin);
//post
router.post(
  "/api/v1/user",
  upload,
  auth,
  userValidation(),
  validateSchema,
  userController.addUser
);
//update
router.put(
  "/api/v1/user/:id",
  auth,
  userValidation(),
  validateSchema,
  userController.updateUser
);
//delete
router.delete("/api/v1/user/:id", auth, userController.deleteUser);

module.exports = router;
