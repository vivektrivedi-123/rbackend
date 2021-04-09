const taskController = require("../controllers/taskController");
const express = require("express");
const _ = require("lodash");
const router = express.Router();
const Task = require("../models/job_app_tasks");

router.get("/api/v1/task", taskController.getTask);

router.get("/api/v1/task/:id", taskController.getTaskById);

router.post("/api/v1/task", taskController.addTask);

router.put("/api/v1/task/:id", taskController.updateTask);

router.delete("/api/v1/task/:id", taskController.deleteTask);

module.exports = router;
