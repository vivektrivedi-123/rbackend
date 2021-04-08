const userController = require("../controllers/userController");
const express = require("express");
const _ = require("lodash");
const router = express.Router();
const company = require("../models/company");
const Comp = require("../models/company_users");
const role = require("../models/role");

//get all
router.get("/api/v1/user", userController.getUser);
//get by ID
router.get("/api/v1/user/:id", userController.getUserById);
//post
router.post("/api/v1/userRegister", userController.addUser);
//update
router.put("/api/v1/userUpdate/:id", userController.updateUser);
//delete
router.delete("/api/v1/userDelete/:id", userController.deleteUser);

module.exports = router;