const deptController = require("../controllers/deptController");
const {
  deptValidation,
  validateSchema,
} = require("../validation/deptValidation");
const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/api/v1/department", auth, deptController.getDept);
//get all
router.get("/api/v1/department/:id", auth, deptController.getDeptById);
//job
router.post(
  "/api/v1/department",
  auth,
  deptValidation(),
  validateSchema,
  deptController.addDept
);
//update
router.put(
  "/api/v1/department/:id",
  auth,
  deptValidation(),
  validateSchema,
  deptController.updateDept
);
//delete
router.delete("/api/v1/department/:id", auth, deptController.deleteDept);
module.exports = router;
