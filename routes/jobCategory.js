const categoryController = require("../controllers/categoryController");
const express = require("express");
const _ = require("lodash");
const router = express.Router();
const Category = require("../models/job_category");

router.get("/api/v1/category", categoryController.getCategory);

router.get("/api/v1/category/:id", categoryController.getCategoryById);

router.post("/api/v1/category", categoryController.addCategory);

router.put("/api/v1/category/:id", categoryController.updateCategory);

router.delete("/api/v1/category/:id", categoryController.deleteCategory);

module.exports = router;
