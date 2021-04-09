const deptController = require("../controllers/deptController");
const express = require("express");
const _ = require("lodash");
const router = express.Router();

router.get("/api/v1/dept", deptController.getDept);
//get all
router.get("/api/v1/dept/:id", deptController.getDeptById);
//post
router.post("/api/v1/dept", deptController.addDept);
//update
router.put("/api/v1/dept/:id", deptController.updateDept);
//delete
router.delete("/api/v1/dept/:id", deptController.deleteDept);
module.exports = router;
