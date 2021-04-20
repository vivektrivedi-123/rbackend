const deptController = require("../controllers/deptController");
const {
  deptValidation,
  validateSchema,
} = require("../validation/deptValidation");
const express = require("express");
const router = express.Router();

router.get("/api/v1/dept", deptController.getDept);
//get all
router.get("/api/v1/dept/:id", deptController.getDeptById);
//job
router.post(
  "/api/v1/dept",
  deptValidation(),
  validateSchema,
  deptController.addDept
);
//update
router.put("/api/v1/dept/:id", deptController.updateDept);
//delete
router.delete("/api/v1/dept/:id", deptController.deleteDept);
module.exports = router;
