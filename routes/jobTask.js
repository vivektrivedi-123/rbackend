const express = require("express");
const taskController = require("../controllers/taskController");
const {
  taskValidation,
  validateSchema,
} = require("../validation/taskValidation");
const router = express.Router();
const auth = require("../middleware/auth");
const Task = require("../models/task");

router.get("/api/v1/task", taskController.getTask);

router.get("/api/v1/task/:id", taskController.getTaskById);

router.post(
  "/api/v1/task",
  auth,
  taskValidation(),
  validateSchema,
  taskController.addTask
);

router.put(
  "/api/v1/task/:id",
  auth,
  taskValidation(),
  validateSchema,
  taskController.updateTask
);

router.delete("/api/v1/task/:id", auth, taskController.deleteTask);

module.exports = router;
