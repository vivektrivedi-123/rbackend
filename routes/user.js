const auth = require("../middleware/auth");
const userController = require("../controllers/userController");
const express = require("express");
const {
  userValidation,
  validateSchema,
} = require("../validation/userValidation");
const router = express.Router();
const company = require("../models/company");
const Comp = require("../models/user");
const role = require("../models/role");
const app = express();
app.use(express.json());

//get all
router.get("/api/v1/user", userController.getUser);
//get by ID
router.get("/api/v1/user/:id", userController.getUserById);
//post
router.post(
  "/api/v1/user",
  userValidation(),
  validateSchema,
  userController.addUser
);
//update
router.put(
  "/api/v1/user/:id",
  userValidation(),
  validateSchema,
  userController.updateUser
);
//delete
router.delete("/api/v1/user/:id", userController.deleteUser);

module.exports = router;
