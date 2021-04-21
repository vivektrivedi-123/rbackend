const deptController = require("../controllers/deptController");
const {
  deptValidation,
  validateSchema,
} = require("../validation/deptValidation");
const express = require("express");
const router = express.Router();

router.get("/api/v1/department", deptController.getDept);
//get all
router.get("/api/v1/department/:id", deptController.getDeptById);
//job
router.post(
  "/api/v1/department",
  deptValidation(),
  validateSchema,
  deptController.addDept
);
//update
router.put(
  "/api/v1/department/:id",
  deptValidation(),
  validateSchema,
  deptController.updateDept
);
//delete
router.delete("/api/v1/department/:id", deptController.deleteDept);
module.exports = router;
