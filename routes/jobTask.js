const taskController = require("../controllers/taskController");
const express = require("express");
const {
  taskValidation,
  validateSchema,
} = require("../validation/taskValidation");
const router = express.Router();
const Task = require("../models/task");

router.get("/api/v1/task", taskController.getTask);

router.get("/api/v1/task/:id", taskController.getTaskById);

router.post(
  "/api/v1/task",
  taskValidation(),
  validateSchema,
  taskController.addTask
);

router.put(
  "/api/v1/task/:id",
  taskValidation(),
  validateSchema,
  taskController.updateTask
);

router.delete("/api/v1/task/:id", taskController.deleteTask);

module.exports = router;
