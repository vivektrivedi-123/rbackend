const uCompanyController = require("../controllers/uCompanyController");
const express = require("express");
const _ = require("lodash");
const router = express.Router();
const company = require("../models/company");
const Comp = require("../models/company_users");
const role = require("../models/role");

//get all
router.get("/api/v1/userComp", uCompanyController.getUser);
//get by ID
router.get("/api/v1/userComp/:id", uCompanyController.getUserById);
//post
router.post("/api/v1/userCompReg", uCompanyController.addUser);
//update
router.put("/api/v1/userComp/:id", uCompanyController.updateUser);
//delete
router.delete("/api/v1/userComp/:id", uCompanyController.deleteUser);

module.exports = router;
