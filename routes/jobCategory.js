const categoryController = require("../controllers/categoryController");
const express = require("express");
const category = require("../models/category");
const {
  categoryValidation,
  validateSchema,
} = require("../validation/categoryValidation");
const router = express.Router();

router.get("/api/v1/category", categoryController.getCategory);

router.get("/api/v1/category/:id", categoryController.getCategoryById);

router.post(
  "/api/v1/category",
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
