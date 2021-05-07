const userController = require("../controllers/userController");
const express = require("express");
const {
  userValidation,
  validateSchema,
} = require("../validation/userValidation");
const router = express.Router();
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
//getMe
router.get("/api/v1/user/me", auth,userController.getMe);
//get all
router.get("/api/v1/user", userController.getUser);
//get by ID
router.get("/api/v1/user/:id", userController.getUserById);
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
