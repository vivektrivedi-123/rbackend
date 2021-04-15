const categoryController = require("../controllers/categoryController");
const express = require("express");
const category = require("../models/job_category");
const {
  categoryValidation,
  validateSchema,
} = require("../validation/categoryValidation");
const router = express.Router();
const Category = require("../models/job_category");

router.get("/api/v1/category", categoryController.getCategory);

router.get("/api/v1/category/:id", categoryController.getCategoryById);

router.post(
  "/category",
  categoryValidation,
  validateSchema,
  categoryController.addCategory
);

router.put(
  "/api/v1/category/:id",
  categoryValidation,
  validateSchema,
  categoryController.updateCategory
);

router.delete("/api/v1/category/:id", categoryController.deleteCategory);

module.exports = router;
