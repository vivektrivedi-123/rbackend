const deptController = require("../controllers/deptController");
const express = require("express");
const _ = require("lodash");
const router = express.Router();

router.get("/api/v1/getDept", deptController.getDept);
//get all
router.get("/api/v1/getDeptById", deptController.getDeptById);
//get by ID
router.get("/api/v1/user/:id", deptController.getUserById);
//post
router.post("/api/v1/addDept", deptController.addDept);
//update
router.put("/api/v1/updateDept/:id", deptController.updateDept);
//delete
router.delete("/api/v1/userDelete/:id", deptController.deleteUser);
