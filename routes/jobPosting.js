const postingController = require("../controllers/postingController");
const express = require("express");
const {
  postValidation,
  validateSchema,
} = require("../validation/postValidation");
const router = express.Router();
const Post = require("../models/post");

router.get("/api/v1/post", postingController.getPost);

router.get("/api/v1/post/:id", postingController.getPostById);

router.post(
  "/api/v1/post",
  postValidation(),
  validateSchema,
  postingController.addPost
);

router.put(
  "/api/v1/post/:id",
  postValidation(),
  validateSchema,
  postingController.updatePost
);

router.delete("/api/v1/post/:id", postingController.deletePost);

module.exports = router;
